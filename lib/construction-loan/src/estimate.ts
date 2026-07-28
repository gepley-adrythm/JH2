/**
 * estimate.ts — the construction-to-permanent payment model, extracted verbatim
 * from ConstructionLoanCalculator so the interactive calculator, the /api/estimate
 * JSON endpoint, the prerendered scenario pages, and the MCP tool all compute from
 * one implementation and can never drift apart.
 *
 * The model (stated in the calculator's visible footnote): during construction the
 * borrower pays interest only on what has been drawn. Draws are assumed to ramp
 * roughly linearly from zero to the full loan across the build, so the final month
 * is interest on the full loan and the total paid during the build averages half of
 * that across the schedule. After conversion the loan amortizes as a standard
 * mortgage. Property taxes default to the average effective rate for the selected
 * city; insurance defaults to the Arizona average per $100,000 of home value.
 *
 * Every function here is pure and free of DOM, network, and formatting concerns.
 * Number formatting stays with the caller so the React component keeps producing
 * byte-identical markup.
 */
import {
  INSURANCE_PER_YEAR_PER_100K,
  TAX_LOCATIONS,
  ZIP_TO_LOCATION,
  type TaxLocation,
} from "./azPropertyTax";

/** Slug of the statewide-average row in TAX_LOCATIONS. */
export const STATEWIDE_SLUG = "elsewhere-in-arizona";

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Strip formatting ("$1,200,000") down to a number; non-numeric input reads as 0. */
export function parseMoney(s: string): number {
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export type ZipResolution =
  | { kind: "city"; slug: string; name: string }
  | { kind: "statewide" }
  | { kind: "outside" };

/**
 * Resolve a 5-digit ZIP to a tax location. ZIPs in ZIP_TO_LOCATION map to their
 * city; other ZIPs in the Arizona 85xxx/86xxx ranges fall back to the statewide
 * average; anything else is outside the service area.
 */
export function resolveZip(zip: string): ZipResolution {
  const slug = ZIP_TO_LOCATION[zip];
  if (slug !== undefined) {
    const loc = TAX_LOCATIONS.find((l) => l.slug === slug);
    return { kind: "city", slug, name: loc ? loc.name : slug };
  }
  if (/^8[56]\d{3}$/.test(zip)) return { kind: "statewide" };
  return { kind: "outside" };
}

/** Look up a tax location by slug, falling back to the first row as the component does. */
export function locationForSlug(slug: string): TaxLocation {
  return TAX_LOCATIONS.find((l) => l.slug === slug) ?? (TAX_LOCATIONS[0] as TaxLocation);
}

export interface EstimateInput {
  /** Land + build, used when the buyer does not already own the lot. */
  totalProjectCost: number;
  /** When true, financing covers the build only and the lot counts as equity. */
  landOwned: boolean;
  landValue: number;
  buildCost: number;
  downPct: number;
  buildRatePct: number;
  permRatePct: number;
  termYears: number;
  buildMonths: number;
  locationSlug: string;
  hoaMonthly: number;
  /** Yearly dollars when the user typed their own figure; null/undefined uses the city default. */
  taxYearlyOverride?: number | null;
  /** Yearly dollars when the user typed their own figure; null/undefined uses the AZ average. */
  insuranceYearlyOverride?: number | null;
}

export interface Estimate {
  /** Value taxed and insured: land plus build on both paths. */
  homeValue: number;
  /** Amount the loan is sized against (build only when the lot is owned). */
  financedBase: number;
  loan: number;
  cashDown: number;
  /** Down payment plus interest paid during the build. */
  cashToPlanFor: number;
  /** Interest on the full loan in the final build month. */
  finalMonthInterest: number;
  /** Interest across the whole build on the linear draw ramp. */
  totalBuildInterest: number;
  /** Principal and interest after the loan converts. */
  permMonthly: number;
  monthlyTax: number;
  monthlyInsurance: number;
  hoaMonthly: number;
  allInMonthly: number;
  taxYearly: number;
  insuranceYearly: number;
  /** The city/statewide default, shown as the placeholder figure even when overridden. */
  autoTaxYearly: number;
  /** The Arizona-average default, shown as the placeholder figure even when overridden. */
  autoInsuranceYearly: number;
  /** True when the tax/insurance figure came from the caller rather than the defaults. */
  taxIsCustom: boolean;
  insuranceIsCustom: boolean;
  location: TaxLocation;
  /** Clamped inputs actually used, so callers can echo back what was computed. */
  used: {
    downPct: number;
    buildRatePct: number;
    permRatePct: number;
    termYears: number;
    buildMonths: number;
  };
}

/**
 * The whole payment model. Input clamps match the calculator's controls exactly:
 * down payment 0-100%, rates 0-30%, term 1-40 years, build 1-36 months, HOA
 * 0-100,000/mo, tax and insurance overrides 0-10,000,000/yr.
 */
export function estimate(input: EstimateInput): Estimate {
  const totalCost = input.landOwned ? input.landValue + input.buildCost : input.totalProjectCost;
  const financedBase = input.landOwned ? input.buildCost : input.totalProjectCost;
  const dp = clamp(input.downPct, 0, 100) / 100;
  const cashDown = financedBase * dp;
  const loan = Math.max(0, financedBase - cashDown);
  const homeValue = totalCost;

  const iBuild = clamp(input.buildRatePct, 0, 30) / 100 / 12;
  const iPerm = clamp(input.permRatePct, 0, 30) / 100 / 12;
  const n = clamp(input.termYears, 1, 40) * 12;
  const months = clamp(input.buildMonths, 1, 36);

  const finalMonthInterest = loan * iBuild;
  const totalBuildInterest = loan * iBuild * months * 0.5;

  const permMonthly =
    iPerm > 0
      ? (loan * iPerm * Math.pow(1 + iPerm, n)) / (Math.pow(1 + iPerm, n) - 1)
      : loan / n;

  const location = locationForSlug(input.locationSlug);
  const autoTax = Math.round(homeValue * (location.effectiveRatePct / 100));
  const taxIsCustom = input.taxYearlyOverride !== null && input.taxYearlyOverride !== undefined;
  const taxYearly = taxIsCustom ? clamp(input.taxYearlyOverride as number, 0, 10000000) : autoTax;
  const monthlyTax = taxYearly / 12;

  const autoInsurance = Math.round((homeValue / 100000) * INSURANCE_PER_YEAR_PER_100K);
  const insuranceIsCustom =
    input.insuranceYearlyOverride !== null && input.insuranceYearlyOverride !== undefined;
  const insuranceYearly = insuranceIsCustom
    ? clamp(input.insuranceYearlyOverride as number, 0, 10000000)
    : autoInsurance;
  const monthlyInsurance = insuranceYearly / 12;

  const hoaMonthly = clamp(input.hoaMonthly, 0, 100000);
  const allInMonthly = permMonthly + monthlyTax + monthlyInsurance + hoaMonthly;
  const cashToPlanFor = cashDown + totalBuildInterest;

  return {
    homeValue,
    financedBase,
    loan,
    cashDown,
    cashToPlanFor,
    finalMonthInterest,
    totalBuildInterest,
    permMonthly,
    monthlyTax,
    monthlyInsurance,
    hoaMonthly,
    allInMonthly,
    taxYearly,
    insuranceYearly,
    autoTaxYearly: autoTax,
    autoInsuranceYearly: autoInsurance,
    taxIsCustom,
    insuranceIsCustom,
    location,
    used: {
      downPct: clamp(input.downPct, 0, 100),
      buildRatePct: clamp(input.buildRatePct, 0, 30),
      permRatePct: clamp(input.permRatePct, 0, 30),
      termYears: clamp(input.termYears, 1, 40),
      buildMonths: months,
    },
  };
}

/**
 * Month-by-month interest during the build, end-of-month drawn-balance convention
 * on the linear ramp: in build month m the borrower pays interest on the fraction
 * of the loan drawn by the end of that month.
 */
export function buildInterestSeries(loan: number, buildRatePct: number, buildMonths: number): number[] {
  const iBuild = clamp(buildRatePct, 0, 30) / 100 / 12;
  const months = clamp(buildMonths, 1, 36);
  const series: number[] = [];
  for (let m = 1; m <= months; m++) {
    series.push(loan * (m / months) * iBuild);
  }
  return series;
}
