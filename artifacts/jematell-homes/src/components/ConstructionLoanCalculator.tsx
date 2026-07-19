import { useEffect, useState } from "react";
import { useSafeTimeouts } from "../contact-form/useSafeTimeouts";
import {
  INSURANCE_AS_OF,
  INSURANCE_PER_YEAR_PER_100K,
  NEW_BUILD_TAX_NOTE,
  TAX_AS_OF,
  TAX_LOCATIONS,
  ZIP_TO_LOCATION,
} from "../data/azPropertyTax";

/**
 * ConstructionLoanCalculator v2: a self-contained construction-to-permanent
 * estimator that now covers the full monthly cost of owning the finished home:
 * principal and interest, property taxes for the city you build in, insurance,
 * and HOA dues. Pure client-side arithmetic with typed-in rates: no rate
 * feeds, no network, nothing to go stale. Renders deterministic en-US
 * formatting so the prerendered HTML and the hydrated tree always match.
 *
 * Model (stated in the UI footnote): during construction the borrower pays
 * interest only on what has been drawn. Draws are assumed to ramp roughly
 * linearly from zero to the full loan across the build, so the final month is
 * interest on the full loan and the total paid during the build averages half
 * of that across the schedule. After conversion the loan amortizes as a
 * standard mortgage. Property taxes default to the average effective rate for
 * the selected city (see src/data/azPropertyTax.ts) and stay editable;
 * insurance defaults to the Arizona average per $100,000 of home value and
 * stays editable too.
 *
 * Shareable: "Copy link to this estimate" writes the inputs into query params
 * and copies the URL; on mount (in an effect only, so hydration stays
 * deterministic) any such params are read back and applied.
 */

function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function parseMoney(s: string): number {
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Round to 2 decimals for stable SVG geometry strings. */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Slug of the statewide-average row in TAX_LOCATIONS. */
const STATEWIDE_SLUG = "elsewhere-in-arizona";

type ZipResolution =
  | { kind: "city"; slug: string; name: string }
  | { kind: "statewide" }
  | { kind: "outside" };

/**
 * Resolve a 5-digit ZIP to a tax location. Pure and callable at render time,
 * but only ever invoked from event handlers and the mount effect, so the
 * server render and the first client render (both with an empty ZIP) always
 * match. ZIPs in ZIP_TO_LOCATION map to their city; other ZIPs in the
 * Arizona 85xxx/86xxx ranges fall back to the statewide average; anything
 * else is outside the service area.
 */
function resolveZip(zip: string): ZipResolution {
  const slug = ZIP_TO_LOCATION[zip];
  if (slug !== undefined) {
    const loc = TAX_LOCATIONS.find((l) => l.slug === slug);
    return { kind: "city", slug, name: loc ? loc.name : slug };
  }
  if (/^8[56]\d{3}$/.test(zip)) return { kind: "statewide" };
  return { kind: "outside" };
}

export function ConstructionLoanCalculator() {
  const [costStr, setCostStr] = useState("900,000");
  const [landOwned, setLandOwned] = useState(false);
  const [landValueStr, setLandValueStr] = useState("250,000");
  const [buildCostStr, setBuildCostStr] = useState("700,000");
  const [downPct, setDownPct] = useState(20);
  const [buildRate, setBuildRate] = useState(7.75);
  const [permRate, setPermRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [buildMonths, setBuildMonths] = useState(12);
  const [locSlug, setLocSlug] = useState("scottsdale");
  const [zipStr, setZipStr] = useState("");
  const [zipHint, setZipHint] = useState("");
  const [hoaStr, setHoaStr] = useState("0");
  const [taxStr, setTaxStr] = useState("");
  const [taxEdited, setTaxEdited] = useState(false);
  const [insStr, setInsStr] = useState("");
  const [insEdited, setInsEdited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);
  const { safeTimeout } = useSafeTimeouts();

  const cost = parseMoney(costStr);
  const landValue = parseMoney(landValueStr);
  const buildCost = parseMoney(buildCostStr);

  // Loan sizing. When the buyer already owns the lot, financing covers the
  // build only and the lot counts as equity; the taxed/insured home value is
  // still land plus build in both paths.
  const totalCost = landOwned ? landValue + buildCost : cost;
  const financedBase = landOwned ? buildCost : cost;
  const dp = clamp(downPct, 0, 100) / 100;
  const cashDown = financedBase * dp;
  const loan = Math.max(0, financedBase - cashDown);
  const homeValue = totalCost;

  const iBuild = clamp(buildRate, 0, 30) / 100 / 12;
  const iPerm = clamp(permRate, 0, 30) / 100 / 12;
  const n = clamp(termYears, 1, 40) * 12;
  const months = clamp(buildMonths, 1, 36);

  // Construction phase (linear draw ramp): the final month is interest on the
  // full loan; the total across the build averages half of that.
  const finalMonthInterest = loan * iBuild;
  const totalBuildInterest = loan * iBuild * months * 0.5;

  // Permanent phase: standard amortization payment.
  const permMonthly = iPerm > 0
    ? (loan * iPerm * Math.pow(1 + iPerm, n)) / (Math.pow(1 + iPerm, n) - 1)
    : loan / n;

  // Ongoing ownership costs.
  const activeLoc = TAX_LOCATIONS.find((l) => l.slug === locSlug) ?? TAX_LOCATIONS[0];
  const autoTax = Math.round(homeValue * (activeLoc.effectiveRatePct / 100));
  const taxYearly = taxEdited ? clamp(parseMoney(taxStr), 0, 10000000) : autoTax;
  const monthlyTax = taxYearly / 12;
  const autoInsurance = Math.round((homeValue / 100000) * INSURANCE_PER_YEAR_PER_100K);
  const insuranceYearly = insEdited ? clamp(parseMoney(insStr), 0, 10000000) : autoInsurance;
  const monthlyInsurance = insuranceYearly / 12;
  const hoaMonthly = clamp(parseMoney(hoaStr), 0, 100000);

  const allInMonthly = permMonthly + monthlyTax + monthlyInsurance + hoaMonthly;
  const cashToPlanFor = cashDown + totalBuildInterest;

  // ZIP entry: called from the input's onChange and from the mount effect,
  // never during render. Under 5 digits there is no hint and no location
  // change; at 5 digits the ZIP resolves through resolveZip.
  const applyZip = (raw: string) => {
    const zip = raw.replace(/\D/g, "").slice(0, 5);
    setZipStr(zip);
    if (zip.length < 5) {
      setZipHint("");
      return;
    }
    const res = resolveZip(zip);
    if (res.kind === "city") {
      setLocSlug(res.slug);
      setZipHint(`${zip} is in ${res.name}`);
    } else if (res.kind === "statewide") {
      setLocSlug(STATEWIDE_SLUG);
      setZipHint(`Using the Arizona statewide average for ${zip}`);
    } else {
      setZipHint("That ZIP looks outside our Arizona service area");
    }
  };

  // Apply shared-link query params once, after mount only, so the prerendered
  // HTML and the first hydrated render always match.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const num = (key: string): number | null => {
      const raw = sp.get(key);
      if (raw === null || raw === "") return null;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : null;
    };
    const money = (key: string, set: (s: string) => void) => {
      const v = num(key);
      if (v !== null && v >= 0) set(Math.round(v).toLocaleString("en-US"));
    };
    money("cost", setCostStr);
    money("lv", setLandValueStr);
    money("bc", setBuildCostStr);
    const down = num("down");
    if (down !== null) setDownPct(clamp(down, 0, 100));
    const br = num("br");
    if (br !== null) setBuildRate(clamp(br, 0, 30));
    const pr = num("pr");
    if (pr !== null) setPermRate(clamp(pr, 0, 30));
    const term = num("term");
    if (term === 15 || term === 30) setTermYears(term);
    const mo = num("months");
    if (mo !== null) setBuildMonths(clamp(Math.round(mo), 1, 36));
    const loc = sp.get("loc");
    if (loc !== null && TAX_LOCATIONS.some((l) => l.slug === loc)) setLocSlug(loc);
    // Applied after "loc" so a shared ZIP re-resolves through the same
    // function the input uses and wins when both params are present.
    const zip = sp.get("zip");
    if (zip !== null && /^\d{5}$/.test(zip)) applyZip(zip);
    if (sp.get("land") === "1") setLandOwned(true);
    const hoa = num("hoa");
    if (hoa !== null && hoa >= 0) setHoaStr(Math.round(hoa).toLocaleString("en-US"));
    const tax = num("tax");
    if (tax !== null && tax >= 0) {
      setTaxEdited(true);
      setTaxStr(Math.round(tax).toLocaleString("en-US"));
    }
    const ins = num("ins");
    if (ins !== null && ins >= 0) {
      setInsEdited(true);
      setInsStr(Math.round(ins).toLocaleString("en-US"));
    }
  }, []);

  // Fetch the live 30-yr fixed rate from the API server and apply it as the
  // perm-rate default — but only when the user hasn't loaded a shared link
  // that already contains a "pr" param (so shared estimates stay stable).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("pr") !== null) return;
    let cancelled = false;
    fetch("/api/mortgage-rate")
      .then((r) => r.json())
      .then((data: { rate?: number }) => {
        if (cancelled) return;
        if (typeof data.rate === "number" && Number.isFinite(data.rate) && data.rate > 0) {
          setPermRate(Math.round(data.rate * 8) / 8);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const onShare = () => {
    const p = new URLSearchParams();
    p.set("cost", String(Math.round(cost)));
    p.set("down", String(clamp(downPct, 0, 100)));
    p.set("br", String(clamp(buildRate, 0, 30)));
    p.set("pr", String(clamp(permRate, 0, 30)));
    p.set("term", String(termYears));
    p.set("months", String(months));
    p.set("loc", activeLoc.slug);
    p.set("land", landOwned ? "1" : "0");
    p.set("lv", String(Math.round(landValue)));
    p.set("bc", String(Math.round(buildCost)));
    p.set("hoa", String(Math.round(hoaMonthly)));
    p.set("tax", String(Math.round(taxYearly)));
    p.set("ins", String(Math.round(insuranceYearly)));
    if (zipStr.length === 5) p.set("zip", zipStr);
    const query = `?${p.toString()}`;
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
    const url = `${window.location.origin}${window.location.pathname}${query}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => {
          setCopied(true);
          safeTimeout(() => setCopied(false), 2200);
        },
        () => {
          /* Clipboard refused; the URL is already in the address bar. */
        },
      );
    }
  };

  const onMoneyBlur = (value: number, set: (s: string) => void) => {
    set(value > 0 ? value.toLocaleString("en-US") : "");
  };

  // Month-by-month payment series for the timeline chart, end-of-month
  // drawn-balance convention on the linear ramp: in build month m the borrower
  // pays interest on the fraction of the loan drawn by the end of that month.
  const buildSeries: number[] = [];
  for (let m = 1; m <= months; m++) {
    buildSeries.push(loan * (m / months) * iBuild);
  }
  const totalBars = months + 6;
  const chartW = 720;
  const chartH = 190;
  const plotX0 = 6;
  const plotX1 = 714;
  const plotY0 = 28;
  const plotY1 = 158;
  const slot = (plotX1 - plotX0) / totalBars;
  const barW = r2(Math.max(2, slot - 2));
  const maxVal = Math.max(allInMonthly, finalMonthInterest, 1);
  const barY = (val: number) => r2(plotY1 - (val / maxVal) * (plotY1 - plotY0));
  const markerX = r2(plotX0 + months * slot);
  const markerLabelLeft = months / totalBars > 0.7;
  const tickMonths = Array.from(new Set([1, months, totalBars]));

  // Tooltip for the hovered bar.
  const TT_W = 160;
  const TT_H = 55;
  const tooltipInfo = hoveredBarIdx === null ? null : (() => {
    const isBuild = hoveredBarIdx < months;
    const val = isBuild ? (buildSeries[hoveredBarIdx] ?? 0) : allInMonthly;
    const barCenterX = r2(plotX0 + hoveredBarIdx * slot + slot / 2);
    const ttX = r2(Math.max(0, Math.min(chartW - TT_W, barCenterX - TT_W / 2)));
    const ttY = r2(Math.max(2, barY(val) - TT_H - 8));
    return {
      label: isBuild ? `Month ${hoveredBarIdx + 1} of ${months}` : "After move-in",
      amount: fmtMoney(val),
      sub: isBuild ? "interest only" : "all-in per month",
      ttX,
      ttY,
    };
  })();

  return (
    <div className="fin-calc" data-testid="loan-calculator">
      <div className="fin-calc-inputs">
        <div className="fin-field">
          <label className="fin-label" htmlFor="fin-zip">Build ZIP code (optional)</label>
          <input
            id="fin-zip"
            data-testid="calc-zip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zipStr}
            onChange={(e) => applyZip(e.target.value)}
            className="fin-input"
            aria-describedby={zipHint !== "" ? "fin-zip-hint" : undefined}
          />
          <p id="fin-zip-hint" role="status" className="fin-zip-hint" data-testid="calc-zip-hint">{zipHint}</p>
        </div>

        <div className="fin-field">
          <label className="fin-label" htmlFor="fin-location">Where will you build?</label>
          <select
            id="fin-location"
            data-testid="calc-location"
            className="fin-input fin-location"
            value={activeLoc.slug}
            onChange={(e) => {
              setLocSlug(e.target.value);
              setZipStr("");
              setZipHint("");
            }}
          >
            {TAX_LOCATIONS.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name}</option>
            ))}
          </select>
        </div>

        <div className="fin-toggle-row">
          <input
            id="fin-land-owned"
            data-testid="calc-land-owned"
            type="checkbox"
            checked={landOwned}
            onChange={(e) => setLandOwned(e.target.checked)}
          />
          <label className="fin-toggle-label" htmlFor="fin-land-owned">I already own my lot</label>
        </div>

        {landOwned ? (
          <div className="fin-field-row">
            <div className="fin-field">
              <label className="fin-label" htmlFor="fin-land-value">Land value</label>
              <div className="fin-input-wrap">
                <span className="fin-prefix" aria-hidden="true">$</span>
                <input
                  id="fin-land-value"
                  data-testid="calc-land-value"
                  type="text"
                  inputMode="numeric"
                  value={landValueStr}
                  onChange={(e) => setLandValueStr(e.target.value)}
                  onBlur={() => onMoneyBlur(landValue, setLandValueStr)}
                  className="fin-input fin-input--money"
                />
              </div>
            </div>
            <div className="fin-field">
              <label className="fin-label" htmlFor="fin-build-cost">Build cost</label>
              <div className="fin-input-wrap">
                <span className="fin-prefix" aria-hidden="true">$</span>
                <input
                  id="fin-build-cost"
                  data-testid="calc-build-cost"
                  type="text"
                  inputMode="numeric"
                  value={buildCostStr}
                  onChange={(e) => setBuildCostStr(e.target.value)}
                  onBlur={() => onMoneyBlur(buildCost, setBuildCostStr)}
                  className="fin-input fin-input--money"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-cost">Total project cost (land + build)</label>
            <div className="fin-input-wrap">
              <span className="fin-prefix" aria-hidden="true">$</span>
              <input
                id="fin-cost"
                data-testid="calc-cost"
                type="text"
                inputMode="numeric"
                value={costStr}
                onChange={(e) => setCostStr(e.target.value)}
                onBlur={() => onMoneyBlur(cost, setCostStr)}
                className="fin-input fin-input--money"
              />
            </div>
          </div>
        )}

        <div className="fin-field-row">
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-down">Down payment (%)</label>
            <div className="fin-input-wrap">
              <input
                id="fin-down"
                data-testid="calc-down"
                type="number"
                min={0}
                max={100}
                step={1}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="fin-input"
              />
              <span className="fin-suffix" aria-hidden="true">%</span>
            </div>
          </div>
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-months">Build time (months)</label>
            <div className="fin-input-wrap">
              <input
                id="fin-months"
                data-testid="calc-months"
                type="number"
                min={1}
                max={36}
                step={1}
                value={buildMonths}
                onChange={(e) => setBuildMonths(Number(e.target.value))}
                className="fin-input"
              />
              <span className="fin-suffix" aria-hidden="true">mo</span>
            </div>
          </div>
        </div>

        <div className="fin-field-row">
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-buildrate">Construction rate</label>
            <div className="fin-input-wrap">
              <input
                id="fin-buildrate"
                data-testid="calc-buildrate"
                type="number"
                min={0}
                max={30}
                step={0.125}
                value={buildRate}
                onChange={(e) => setBuildRate(Number(e.target.value))}
                className="fin-input"
              />
              <span className="fin-suffix" aria-hidden="true">%</span>
            </div>
          </div>
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-permrate">Mortgage rate after</label>
            <div className="fin-input-wrap">
              <input
                id="fin-permrate"
                data-testid="calc-permrate"
                type="number"
                min={0}
                max={30}
                step={0.125}
                value={permRate}
                onChange={(e) => setPermRate(Number(e.target.value))}
                className="fin-input"
              />
              <span className="fin-suffix" aria-hidden="true">%</span>
            </div>
          </div>
        </div>

        <div className="fin-field">
          <span className="fin-label" id="fin-term-label">Mortgage term</span>
          <div className="fin-term-toggle" role="group" aria-labelledby="fin-term-label">
            {[15, 30].map((t) => (
              <button
                key={t}
                type="button"
                data-testid={`calc-term-${t}`}
                aria-pressed={termYears === t}
                onClick={() => setTermYears(t)}
                className={`fin-term-btn ${termYears === t ? "fin-term-btn--active" : ""}`}
              >
                {t} years
              </button>
            ))}
          </div>
        </div>

        <div className="fin-field-row">
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-tax">Property taxes (per year)</label>
            <div className="fin-input-wrap">
              <span className="fin-prefix" aria-hidden="true">$</span>
              <input
                id="fin-tax"
                data-testid="calc-tax"
                type="text"
                inputMode="numeric"
                value={taxEdited ? taxStr : autoTax.toLocaleString("en-US")}
                onChange={(e) => {
                  setTaxEdited(true);
                  setTaxStr(e.target.value);
                }}
                onBlur={() => {
                  if (taxEdited) setTaxStr(taxYearly > 0 ? taxYearly.toLocaleString("en-US") : "");
                }}
                className="fin-input fin-input--money"
              />
            </div>
          </div>
          <div className="fin-field">
            <label className="fin-label" htmlFor="fin-insurance">Home insurance (per year)</label>
            <div className="fin-input-wrap">
              <span className="fin-prefix" aria-hidden="true">$</span>
              <input
                id="fin-insurance"
                data-testid="calc-insurance"
                type="text"
                inputMode="numeric"
                value={insEdited ? insStr : autoInsurance.toLocaleString("en-US")}
                onChange={(e) => {
                  setInsEdited(true);
                  setInsStr(e.target.value);
                }}
                onBlur={() => {
                  if (insEdited) setInsStr(insuranceYearly > 0 ? insuranceYearly.toLocaleString("en-US") : "");
                }}
                className="fin-input fin-input--money"
              />
            </div>
          </div>
        </div>

        <div className="fin-field">
          <label className="fin-label" htmlFor="fin-hoa">HOA dues (per month)</label>
          <div className="fin-input-wrap">
            <span className="fin-prefix" aria-hidden="true">$</span>
            <input
              id="fin-hoa"
              data-testid="calc-hoa"
              type="text"
              inputMode="numeric"
              value={hoaStr}
              onChange={(e) => setHoaStr(e.target.value)}
              onBlur={() => setHoaStr(hoaMonthly > 0 ? hoaMonthly.toLocaleString("en-US") : "0")}
              className="fin-input fin-input--money"
            />
          </div>
        </div>
      </div>

      <div className="fin-calc-results" data-testid="calc-results" aria-live="polite">
        <div className="fin-stat fin-stat--lead">
          <span className="fin-stat-k">All-in monthly after move-in</span>
          <span className="fin-stat-v" data-testid="calc-all-in">{fmtMoney(allInMonthly)}<em>/mo</em></span>
          <span className="fin-stat-sub">
            P&amp;I <span data-testid="calc-perm-payment">{fmtMoney(permMonthly)}</span>
            {" + taxes "}{fmtMoney(monthlyTax)}
            {" + insurance "}{fmtMoney(monthlyInsurance)}
            {hoaMonthly > 0 ? ` + HOA ${fmtMoney(hoaMonthly)}` : ""}
          </span>
        </div>
        <div className="fin-stat-grid">
          <div className="fin-stat">
            <span className="fin-stat-k">Loan amount</span>
            <span className="fin-stat-v" data-testid="calc-loan">{fmtMoney(loan)}</span>
            {landOwned ? (
              <span className="fin-stat-sub">
                Financing covers the build only; your lot is your equity. Total project value {fmtMoney(totalCost)} with land.
              </span>
            ) : null}
          </div>
          <div className="fin-stat">
            <span className="fin-stat-k">Cash to plan for</span>
            <span className="fin-stat-v" data-testid="calc-cash">{fmtMoney(cashToPlanFor)}</span>
            <span className="fin-stat-sub">Down payment plus interest paid during the build</span>
          </div>
          <div className="fin-stat">
            <span className="fin-stat-k">Interest during the build</span>
            <span className="fin-stat-v" data-testid="calc-build-interest">{fmtMoney(totalBuildInterest)} total</span>
            <span className="fin-stat-sub">
              Payments start small and grow with each draw, reaching about {fmtMoney(finalMonthInterest)}/mo in the final month
            </span>
          </div>
        </div>

        {/*
          The timeline and the notes block stay inside this aria-live
          container so screen readers keep announcing the recalculated
          timeline description, the location-dependent tax note, and the
          share button's "Copied" confirmation. Layout (full-width or
          column placement) is handled in CSS via display: contents on
          .fin-calc-results, never by re-parenting this DOM.

          The wrapper is focusable (tabIndex) because at narrow widths it
          becomes a horizontal scroll region; keyboard users need focus on
          it to scroll the hidden months into view.
        */}
        <div
          className="fin-timeline"
          tabIndex={0}
          role="group"
          aria-label="Payment timeline chart, scrollable"
        >
          <span className="fin-stat-k">Payment timeline</span>
          <svg
            data-testid="calc-timeline"
            viewBox={`0 0 ${chartW} ${chartH}`}
            role="img"
            aria-labelledby="fin-timeline-title fin-timeline-desc"
            preserveAspectRatio="xMidYMid meet"
            onMouseLeave={() => setHoveredBarIdx(null)}
          >
            <title id="fin-timeline-title">Monthly payment timeline</title>
            <desc id="fin-timeline-desc">
              {`Interest-only payments ramp up over the ${months}-month build, from ${fmtMoney(buildSeries[0] ?? 0)} in month 1 to ${fmtMoney(finalMonthInterest)} in month ${months}, then the all-in payment of ${fmtMoney(allInMonthly)} per month begins after move-in.`}
            </desc>
            {hoveredBarIdx !== null && (
              <rect
                x={r2(plotX0 + hoveredBarIdx * slot)}
                y={plotY0}
                width={r2(slot)}
                height={r2(plotY1 - plotY0)}
                fill="rgba(255,255,255,0.05)"
                style={{ pointerEvents: "none" }}
              />
            )}
            {buildSeries.map((val, i) => (
              <rect
                key={`b-${i}`}
                className="fin-bar"
                x={r2(plotX0 + i * slot + 1)}
                y={barY(val)}
                width={barW}
                height={r2(plotY1 - barY(val))}
                fill="var(--color-bone)"
                fillOpacity={hoveredBarIdx === i ? 1 : hoveredBarIdx !== null ? 0.45 : 0.85}
                onMouseEnter={() => setHoveredBarIdx(i)}
                onMouseLeave={() => setHoveredBarIdx(null)}
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const barIdx = months + k;
              return (
                <rect
                  key={`a-${k}`}
                  className="fin-bar"
                  x={r2(plotX0 + barIdx * slot + 1)}
                  y={barY(allInMonthly)}
                  width={barW}
                  height={r2(plotY1 - barY(allInMonthly))}
                  fill="#fff"
                  fillOpacity={hoveredBarIdx === barIdx ? 1 : hoveredBarIdx !== null ? 0.45 : 0.95}
                  onMouseEnter={() => setHoveredBarIdx(barIdx)}
                  onMouseLeave={() => setHoveredBarIdx(null)}
                />
              );
            })}
            <line
              x1={markerX}
              y1={8}
              x2={markerX}
              y2={plotY1 + 4}
              stroke="var(--color-bone)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={markerLabelLeft ? markerX - 5 : markerX + 5}
              y={16}
              textAnchor={markerLabelLeft ? "end" : "start"}
              fontSize={15}
              fill="var(--color-bone)"
            >
              Move-in
            </text>
            <line
              x1={plotX0}
              y1={plotY1}
              x2={plotX1}
              y2={plotY1}
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth={1}
            />
            {tickMonths.map((m) => (
              <text
                key={`t-${m}`}
                x={r2(plotX0 + (m - 1) * slot + slot / 2)}
                y={plotY1 + 16}
                textAnchor="middle"
                fontSize={15}
                fill="rgba(226, 221, 211, 0.6)"
              >
                {`Mo ${m}`}
              </text>
            ))}
            {tooltipInfo && (
              <g aria-hidden="true" style={{ pointerEvents: "none" }}>
                <rect
                  x={tooltipInfo.ttX}
                  y={tooltipInfo.ttY}
                  width={TT_W}
                  height={TT_H}
                  rx={7}
                  fill="rgba(20,18,15,0.93)"
                  stroke="rgba(226,221,211,0.22)"
                  strokeWidth={1}
                />
                <text
                  x={r2(tooltipInfo.ttX + TT_W / 2)}
                  y={tooltipInfo.ttY + 17}
                  textAnchor="middle"
                  fontSize={12}
                  fill="rgba(226,221,211,0.6)"
                >
                  {tooltipInfo.label}
                </text>
                <text
                  x={r2(tooltipInfo.ttX + TT_W / 2)}
                  y={tooltipInfo.ttY + 38}
                  textAnchor="middle"
                  fontSize={21}
                  fontWeight="600"
                  fill="#E2DDD3"
                >
                  {tooltipInfo.amount}
                </text>
                <text
                  x={r2(tooltipInfo.ttX + TT_W / 2)}
                  y={tooltipInfo.ttY + 50}
                  textAnchor="middle"
                  fontSize={10}
                  fill="rgba(226,221,211,0.4)"
                >
                  {tooltipInfo.sub}
                </text>
              </g>
            )}
          </svg>
        </div>

        <div className="fin-calc-notes">
          <p className="fin-tax-note" data-testid="calc-tax-note">
            Property taxes default to {activeLoc.effectiveRatePct.toFixed(2)}% for {activeLoc.name}
            {activeLoc.county === "Statewide" ? " (statewide average)" : ` (${activeLoc.county} County)`}, the average
            effective rate as of {TAX_AS_OF}, and are editable. Your parcel will differ. Insurance defaults to the
            Arizona average of about {fmtMoney(INSURANCE_PER_YEAR_PER_100K)} per year per $100,000 of home value as
            of {INSURANCE_AS_OF}, and is editable. {NEW_BUILD_TAX_NOTE}
          </p>

          <button
            type="button"
            data-testid="calc-share"
            onClick={onShare}
            className={`fin-share ${copied ? "fin-share-copied" : ""}`}
          >
            {copied ? "Copied" : "Copy link to this estimate"}
          </button>

          <p className="fin-calc-note">
            Estimates only, not a loan offer, quote, or preapproval. Assumes draws spread evenly across
            the build and excludes closing costs. Taxes, insurance, and HOA dues are editable estimates
            based on published averages, not your parcel or policy. Your lender's terms will differ.
            Enter the rates from your own quote for the closest estimate.
          </p>
        </div>
      </div>
    </div>
  );
}
