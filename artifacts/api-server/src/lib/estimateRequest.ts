/**
 * estimateRequest.ts — turn a query string into a construction-loan estimate.
 *
 * One parser and one response shape, shared by:
 *   - GET /api/estimate            (JSON, for agents and integrations)
 *   - GET /financing/estimate      (server-rendered HTML for any parameters)
 *   - the estimate_construction_loan MCP tool
 *
 * The parameter names are deliberately the same ones the calculator's "Copy
 * link to this estimate" button writes (cost, down, br, pr, term, months, loc,
 * zip, land, lv, bc, hoa, tax, ins), so a link copied out of the calculator can
 * be handed to any of these surfaces unchanged.
 *
 * Everything is read-only: no database, no writes, no personal data. That is
 * what makes it safe to expose to anonymous agents.
 */
import {
  INSURANCE_AS_OF,
  INSURANCE_PER_YEAR_PER_100K,
  NEW_BUILD_TAX_NOTE,
  STATEWIDE_SLUG,
  TAX_AS_OF,
  TAX_LOCATIONS,
  buildInterestSeries,
  estimate,
  locationForSlug,
  resolveZip,
} from "@workspace/construction-loan";
import { defaultPermRatePct } from "./mortgageRate";

export const SITE_URL = process.env["SITE_URL"] ?? "https://jematellhomes.com";

export const DISCLAIMER =
  "Estimates only, not a loan offer, quote, or preapproval. Jematell Homes is a home builder, " +
  "not a lender or loan broker. Assumes draws spread evenly across the build and excludes closing " +
  "costs. Taxes, insurance, and HOA dues are editable estimates — tax rates come from published averages — not " +
  "your parcel or policy. Your lender's terms will differ.";

/** Calculator defaults, kept in step with the component's initial state. */
export const DEFAULTS = {
  totalProjectCost: 900000,
  landValue: 250000,
  buildCost: 700000,
  downPct: 20,
  buildRatePct: 7.75,
  termYears: 30,
  buildMonths: 12,
  locationSlug: "scottsdale",
  hoaMonthly: 0,
} as const;

export type QueryLike = Record<string, unknown>;

function str(q: QueryLike, key: string): string | null {
  const raw = q[key];
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0] as string;
  if (typeof raw === "number") return String(raw);
  return null;
}

/** Accepts "1200000", "1,200,000", and "$1,200,000" alike. */
function num(q: QueryLike, key: string): number | null {
  const raw = str(q, key);
  if (raw === null || raw.trim() === "") return null;
  const n = Number(raw.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function bool(q: QueryLike, key: string): boolean {
  const raw = str(q, key);
  return raw === "1" || raw === "true" || raw === "yes";
}

export interface ParsedEstimate {
  /** Rounded dollar figures, ready to quote. */
  body: EstimateResponse;
  /** Anything the caller got wrong, stated rather than silently swallowed. */
  warnings: string[];
}

export interface EstimateResponse {
  input: {
    totalProjectCost: number;
    landOwned: boolean;
    landValue: number | null;
    buildCost: number | null;
    downPaymentPct: number;
    constructionRatePct: number;
    mortgageRatePct: number;
    mortgageRateSource: string;
    termYears: number;
    buildMonths: number;
    location: string;
    locationSlug: string;
    county: string;
    zip: string | null;
    hoaMonthly: number;
  };
  estimate: {
    homeValue: number;
    loanAmount: number;
    downPayment: number;
    cashToPlanFor: number;
    duringConstruction: {
      totalInterest: number;
      finalMonthInterest: number;
      monthlyInterestSeries: number[];
    };
    afterMoveIn: {
      principalAndInterest: number;
      propertyTax: number;
      insurance: number;
      hoa: number;
      allInMonthly: number;
    };
    yearly: { propertyTax: number; insurance: number };
  };
  assumptions: {
    model: string;
    propertyTaxRatePct: number;
    propertyTaxRateIsDefault: boolean;
    propertyTaxSource: string;
    propertyTaxAsOf: string;
    insurancePerYearPer100k: number;
    insuranceIsDefault: boolean;
    insuranceAsOf: string;
    newBuildTaxNote: string;
  };
  summary: string;
  disclaimer: string;
  links: { calculator: string; thisEstimate: string; financingGuide: string; contact: string };
  warnings: string[];
}

const money = (n: number): number => Math.round(n);

const usd = (n: number): string =>
  Math.round(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Rebuild the canonical query string for a parsed estimate, so the response can link to itself. */
function selfQuery(r: EstimateResponse): string {
  const p = new URLSearchParams();
  p.set("cost", String(r.input.totalProjectCost));
  p.set("down", String(r.input.downPaymentPct));
  p.set("br", String(r.input.constructionRatePct));
  p.set("pr", String(r.input.mortgageRatePct));
  p.set("term", String(r.input.termYears));
  p.set("months", String(r.input.buildMonths));
  p.set("loc", r.input.locationSlug);
  p.set("land", r.input.landOwned ? "1" : "0");
  if (r.input.landOwned) {
    p.set("lv", String(r.input.landValue ?? 0));
    p.set("bc", String(r.input.buildCost ?? 0));
  }
  p.set("hoa", String(r.input.hoaMonthly));
  p.set("tax", String(r.estimate.yearly.propertyTax));
  p.set("ins", String(r.estimate.yearly.insurance));
  if (r.input.zip !== null) p.set("zip", r.input.zip);
  return p.toString();
}

/**
 * Parse, clamp, and compute. Unparseable or out-of-range values fall back to the
 * calculator's defaults and are reported in `warnings` rather than failing the
 * request: an agent asking about "a million dollar home in Mesa" should still
 * get a usable answer plus a note that Mesa used the statewide tax average.
 */
export async function buildEstimate(q: QueryLike): Promise<ParsedEstimate> {
  const warnings: string[] = [];

  const landOwned = bool(q, "land");
  const cost = num(q, "cost") ?? DEFAULTS.totalProjectCost;
  const landValue = num(q, "lv") ?? DEFAULTS.landValue;
  const buildCost = num(q, "bc") ?? DEFAULTS.buildCost;

  // Location: an explicit ZIP wins over an explicit slug, matching the
  // calculator, where typing a ZIP moves the city dropdown.
  let locationSlug: string = DEFAULTS.locationSlug;
  const locParam = str(q, "loc");
  if (locParam !== null && locParam !== "") {
    if (TAX_LOCATIONS.some((l) => l.slug === locParam)) {
      locationSlug = locParam;
    } else {
      warnings.push(
        `Unknown location "${locParam}". Using ${DEFAULTS.locationSlug}. Known locations: ${TAX_LOCATIONS.map((l) => l.slug).join(", ")}.`,
      );
    }
  }
  let zip: string | null = null;
  const zipParam = str(q, "zip");
  if (zipParam !== null && zipParam !== "") {
    const cleaned = zipParam.replace(/\D/g, "").slice(0, 5);
    if (cleaned.length === 5) {
      const res = resolveZip(cleaned);
      zip = cleaned;
      if (res.kind === "city") {
        locationSlug = res.slug;
      } else if (res.kind === "statewide") {
        locationSlug = STATEWIDE_SLUG;
        warnings.push(`ZIP ${cleaned} is in Arizona but not a city we publish a rate for; using the statewide average.`);
      } else {
        zip = null;
        warnings.push(`ZIP ${cleaned} looks outside the Arizona service area; using ${locationSlug}.`);
      }
    } else {
      warnings.push(`Ignored zip "${zipParam}": expected 5 digits.`);
    }
  }

  const downPct = num(q, "down") ?? DEFAULTS.downPct;
  const buildRatePct = num(q, "br") ?? DEFAULTS.buildRatePct;
  const termYears = num(q, "term") ?? DEFAULTS.termYears;
  const buildMonths = num(q, "months") ?? DEFAULTS.buildMonths;
  const hoaMonthly = num(q, "hoa") ?? DEFAULTS.hoaMonthly;
  const taxOverride = num(q, "tax");
  const insOverride = num(q, "ins");

  // Mortgage rate: the caller's if given, otherwise today's 30-year fixed, the
  // same number the calculator loads on the page.
  const prParam = num(q, "pr");
  let mortgageRatePct: number;
  let mortgageRateSource: string;
  if (prParam !== null) {
    mortgageRatePct = prParam;
    mortgageRateSource = "caller";
  } else {
    const live = await defaultPermRatePct();
    mortgageRatePct = live.rate;
    mortgageRateSource =
      live.source === "fallback"
        ? "fallback (rate feed unavailable)"
        : "FRED MORTGAGE30US, 30-year fixed average, rounded to the nearest 1/8 point";
  }

  const est = estimate({
    totalProjectCost: cost,
    landOwned,
    landValue,
    buildCost,
    downPct,
    buildRatePct,
    permRatePct: mortgageRatePct,
    termYears,
    buildMonths,
    locationSlug,
    hoaMonthly,
    taxYearlyOverride: taxOverride,
    insuranceYearlyOverride: insOverride,
  });

  const series = buildInterestSeries(est.loan, buildRatePct, buildMonths).map(money);
  const loc = locationForSlug(locationSlug);
  const locationLabel = loc.county === "Statewide" ? "Arizona (statewide average)" : `${loc.name}, Arizona`;

  const summary =
    `Building a ${usd(est.homeValue)} home in ${locationLabel} with ${est.used.downPct}% down: ` +
    `the construction-to-permanent loan is ${usd(est.loan)}` +
    (landOwned ? ` (financing covers the build only; the lot counts as equity)` : "") +
    `. During the ${est.used.buildMonths}-month build you pay interest only on the funds drawn so far, ` +
    `about ${usd(est.totalBuildInterest)} in total, rising to roughly ${usd(est.finalMonthInterest)} in the final month. ` +
    `After move-in the all-in payment is about ${usd(est.allInMonthly)} per month: ` +
    `${usd(est.permMonthly)} principal and interest at ${est.used.permRatePct}% over ${est.used.termYears} years, ` +
    `${usd(est.monthlyTax)} property tax, ${usd(est.monthlyInsurance)} insurance` +
    (est.hoaMonthly > 0 ? `, ${usd(est.hoaMonthly)} HOA` : "") +
    `. Plan for about ${usd(est.cashToPlanFor)} in cash: the ${usd(est.cashDown)} down payment plus interest paid during construction.`;

  const body: EstimateResponse = {
    input: {
      totalProjectCost: money(est.homeValue),
      landOwned,
      landValue: landOwned ? money(landValue) : null,
      buildCost: landOwned ? money(buildCost) : null,
      downPaymentPct: est.used.downPct,
      constructionRatePct: est.used.buildRatePct,
      mortgageRatePct: est.used.permRatePct,
      mortgageRateSource,
      termYears: est.used.termYears,
      buildMonths: est.used.buildMonths,
      location: loc.name,
      locationSlug: loc.slug,
      county: loc.county,
      zip,
      hoaMonthly: money(est.hoaMonthly),
    },
    estimate: {
      homeValue: money(est.homeValue),
      loanAmount: money(est.loan),
      downPayment: money(est.cashDown),
      cashToPlanFor: money(est.cashToPlanFor),
      duringConstruction: {
        totalInterest: money(est.totalBuildInterest),
        finalMonthInterest: money(est.finalMonthInterest),
        monthlyInterestSeries: series,
      },
      afterMoveIn: {
        principalAndInterest: money(est.permMonthly),
        propertyTax: money(est.monthlyTax),
        insurance: money(est.monthlyInsurance),
        hoa: money(est.hoaMonthly),
        allInMonthly: money(est.allInMonthly),
      },
      yearly: { propertyTax: money(est.taxYearly), insurance: money(est.insuranceYearly) },
    },
    assumptions: {
      model:
        "Construction-to-permanent (one-time-close). During the build the borrower pays interest only on " +
        "funds drawn, with draws assumed to ramp linearly from zero to the full loan, so the final month is " +
        "interest on the full loan and the build total averages half of that. After completion the loan " +
        "amortizes as a standard fixed-rate mortgage. Closing costs are excluded.",
      propertyTaxRatePct: loc.effectiveRatePct,
      propertyTaxRateIsDefault: !est.taxIsCustom,
      propertyTaxSource: loc.sourceUrl,
      propertyTaxAsOf: TAX_AS_OF,
      insurancePerYearPer100k: INSURANCE_PER_YEAR_PER_100K,
      insuranceIsDefault: !est.insuranceIsCustom,
      insuranceAsOf: INSURANCE_AS_OF,
      newBuildTaxNote: NEW_BUILD_TAX_NOTE,
    },
    summary,
    disclaimer: DISCLAIMER,
    links: {
      calculator: `${SITE_URL}/financing`,
      thisEstimate: `${SITE_URL}/financing/estimate`,
      financingGuide: `${SITE_URL}/financing`,
      contact: `${SITE_URL}/contact`,
    },
    warnings,
  };

  body.links.thisEstimate = `${SITE_URL}/financing/estimate?${selfQuery(body)}`;
  return { body, warnings };
}

export interface DonutPart {
  key: string;
  label: string;
  value: number;
  color: string;
}

/**
 * Breakdown segments for the payment ring, in the same order and colours the
 * calculator uses (see paymentChartParts.ts on the web side). Colours are
 * chosen for contrast on the #121415 band.
 */
export function breakdownParts(r: EstimateResponse): DonutPart[] {
  const m = r.estimate.afterMoveIn;
  return [
    { key: "pi", label: "P&I", value: m.principalAndInterest, color: "#8fb0c9" },
    { key: "tax", label: "Property tax", value: m.propertyTax, color: "var(--color-bone)" },
    { key: "ins", label: "Insurance", value: m.insurance, color: "#c08468" },
    { key: "hoa", label: "HOA", value: m.hoa, color: "#9aa0a3" },
  ];
}

/** The locations an agent can pass as `loc`, with the rate each one implies. */
export function locationCatalog() {
  return TAX_LOCATIONS.map((l) => ({
    slug: l.slug,
    name: l.name,
    county: l.county,
    effectivePropertyTaxRatePct: l.effectiveRatePct,
    source: l.sourceUrl,
    asOf: TAX_AS_OF,
  }));
}
