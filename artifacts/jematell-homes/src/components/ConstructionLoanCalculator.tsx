"use client";
import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useSafeTimeouts } from "../contact-form/useSafeTimeouts";
import { ContactCta } from "./ContactCta";
import { PaymentDonut, PaymentTimeline } from "./PaymentCharts";
import { breakdownParts } from "./paymentChartParts";
import {
  buildInterestSeries,
  clamp,
  estimate,
  parseMoney,
  resolveZip,
  STATEWIDE_SLUG,
} from "@workspace/construction-loan";
import {
  INSURANCE_AS_OF,
  INSURANCE_PER_YEAR_PER_100K,
  NEW_BUILD_TAX_NOTE,
  TAX_AS_OF,
  TAX_LOCATIONS,
} from "../data/azPropertyTax";

/**
 * ConstructionLoanCalculator v2: a self-contained construction-to-permanent
 * estimator that now covers the full monthly cost of owning the finished home:
 * principal and interest, property taxes for the city you build in, insurance,
 * and HOA dues. Pure client-side arithmetic with typed-in rates: no rate
 * feeds, no network, nothing to go stale. Renders deterministic en-US
 * formatting so the prerendered HTML and the hydrated tree always match.
 *
 * The arithmetic itself lives in @workspace/construction-loan, shared with
 * GET /api/estimate, the prerendered scenario pages, and the MCP tool, so every
 * surface quotes the same number for the same inputs. This file owns the
 * controls, the formatting, and the charts; it owns no math.
 *
 * Model (stated in the UI footnote): during construction the borrower pays
 * interest only on what has been drawn. Draws are assumed to ramp roughly
 * linearly from zero to the full loan across the build, so the final month is
 * interest on the full loan and the total paid during the build averages half
 * of that across the schedule. After conversion the loan amortizes as a
 * standard mortgage. Property taxes default to the average effective rate for
 * the selected city (see src/data/azPropertyTax.ts) and stay editable;
 * insurance defaults to a planning estimate per $100,000 of home value and
 * stays editable too.
 *
 * Shareable: "Copy link to this estimate" writes the inputs into query params
 * and copies a link to /financing/estimate, which renders those exact figures
 * server-side. The address bar of this page is updated with the same params, so
 * a refresh or a bookmark keeps the inputs; on mount (in an effect only, so
 * hydration stays deterministic) any such params are read back and applied.
 */

function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

type CalcView = "breakdown" | "timeline";

/**
 * resolveZip is imported from the shared module. It is pure and callable at
 * render time, but only ever invoked here from event handlers and the mount
 * effect, so the server render and the first client render (both with an empty
 * ZIP) always match.
 */

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
  const [activeView, setActiveView] = useState<CalcView>("breakdown");
  const [downDollarFocused, setDownDollarFocused] = useState(false);
  const [downDollarStr, setDownDollarStr] = useState("");
  const { safeTimeout } = useSafeTimeouts();

  const cost = parseMoney(costStr);
  const landValue = parseMoney(landValueStr);
  const buildCost = parseMoney(buildCostStr);

  // The payment model itself lives in @workspace/construction-loan: loan
  // sizing (when the buyer already owns the lot, financing covers the build
  // only and the lot counts as equity, while the taxed/insured home value is
  // still land plus build on both paths), the construction-phase draw ramp,
  // the permanent-phase amortization, and the ongoing ownership costs. This
  // component feeds it parsed numbers and formats what comes back.
  const est = estimate({
    totalProjectCost: cost,
    landOwned,
    landValue,
    buildCost,
    downPct,
    buildRatePct: buildRate,
    permRatePct: permRate,
    termYears,
    buildMonths,
    locationSlug: locSlug,
    hoaMonthly: parseMoney(hoaStr),
    taxYearlyOverride: taxEdited ? parseMoney(taxStr) : null,
    insuranceYearlyOverride: insEdited ? parseMoney(insStr) : null,
  });

  const totalCost = est.homeValue;
  const financedBase = est.financedBase;
  const cashDown = est.cashDown;
  const loan = est.loan;
  const months = est.used.buildMonths;
  const finalMonthInterest = est.finalMonthInterest;
  const totalBuildInterest = est.totalBuildInterest;
  const permMonthly = est.permMonthly;
  const activeLoc = est.location;
  const autoTax = est.autoTaxYearly;
  const taxYearly = est.taxYearly;
  const monthlyTax = est.monthlyTax;
  const autoInsurance = est.autoInsuranceYearly;
  const insuranceYearly = est.insuranceYearly;
  const monthlyInsurance = est.monthlyInsurance;
  const hoaMonthly = est.hoaMonthly;
  const allInMonthly = est.allInMonthly;
  const cashToPlanFor = est.cashToPlanFor;

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
    // Keep this page's address bar in step with the inputs, so refreshing or
    // bookmarking mid-session keeps the estimate.
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
    // Share the permalink instead of this URL. /financing is prerendered with
    // the default estimate and only applies query params after hydration, so a
    // crawler, a link preview, or an AI assistant reading a shared
    // /financing?... link would report the default numbers rather than these.
    // /financing/estimate renders these exact figures server-side.
    const url = `${window.location.origin}/financing/estimate${query}`;
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
  const buildSeries = buildInterestSeries(loan, buildRate, buildMonths);

  // The ring and the timeline live in PaymentCharts, shared with the
  // prerendered estimate pages so both surfaces animate and behave identically.
  // Segments reuse the exact monthly values shown in the stats, so the ring,
  // the legend, and the stat text can never disagree.
  const donutParts = breakdownParts({
    principalAndInterest: permMonthly,
    propertyTax: monthlyTax,
    insurance: monthlyInsurance,
    hoa: hoaMonthly,
  });

  // WAI-ARIA tabs pattern: roving tabindex, ArrowLeft/ArrowRight move
  // selection and focus. With exactly two tabs both arrows toggle.
  const onTabKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next: CalcView = activeView === "breakdown" ? "timeline" : "breakdown";
    setActiveView(next);
    const el = document.getElementById(next === "breakdown" ? "fin-tab-breakdown" : "fin-tab-timeline");
    if (el) el.focus();
  };

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
            <label className="fin-label" htmlFor="fin-down-dollar">Down payment ($)</label>
            <div className="fin-input-wrap">
              <span className="fin-prefix" aria-hidden="true">$</span>
              <input
                id="fin-down-dollar"
                data-testid="calc-down-dollar"
                type="text"
                inputMode="numeric"
                value={downDollarFocused ? downDollarStr : Math.round(cashDown).toLocaleString("en-US")}
                onFocus={() => {
                  setDownDollarFocused(true);
                  setDownDollarStr(Math.round(cashDown).toLocaleString("en-US"));
                }}
                onChange={(e) => {
                  setDownDollarStr(e.target.value);
                  const dollars = parseMoney(e.target.value);
                  if (financedBase > 0) {
                    setDownPct(Math.round(clamp((dollars / financedBase) * 100, 0, 100) * 10) / 10);
                  }
                }}
                onBlur={() => setDownDollarFocused(false)}
                className="fin-input fin-input--money"
              />
            </div>
          </div>
        </div>

        <div className="fin-field-row">
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
          The chart views live inside the aria-live results container in
          the DOM, but the wrapper opts its whole subtree out of the live
          computation with aria-live="off". Two reasons: (1) toggling the
          hidden attribute on a tabpanel inside a polite region counts as
          an "addition", so every tab switch would announce the entire
          newly revealed panel even though no value changed; (2) the donut
          center total and legend repeat the same P&I / tax / insurance /
          all-in figures the lead stat and stat grid already announce, so
          leaving them live would read every recompute twice. Each value
          is still announced exactly once from the stats and notes (which
          remain inside the polite region), and the charts stay fully
          readable in browse mode. Layout (full-width or column placement)
          is handled in CSS via display: contents on .fin-calc-results,
          never by re-parenting this DOM, and no second announcing
          aria-live region is ever added here.

          Two WAI-ARIA tabs (payment breakdown donut, payment timeline).
          Both panels stay mounted so the timeline keeps its state and the
          live region keeps its DOM; the inactive panel is hidden with the
          hidden attribute only. The donut SVG is decorative (aria-hidden):
          the legend text beside it and the real-text center total carry
          the same information.
        */}
        <div className="fin-views" aria-live="off">
          <div className="fin-view-tabs" role="tablist" aria-label="Payment charts">
            <button
              type="button"
              role="tab"
              id="fin-tab-breakdown"
              data-testid="calc-tab-breakdown"
              aria-selected={activeView === "breakdown"}
              aria-controls="fin-panel-breakdown"
              tabIndex={activeView === "breakdown" ? 0 : -1}
              onClick={() => setActiveView("breakdown")}
              onKeyDown={onTabKeyDown}
              className={`fin-view-tab ${activeView === "breakdown" ? "fin-view-tab--active" : ""}`}
            >
              Payment breakdown
            </button>
            <button
              type="button"
              role="tab"
              id="fin-tab-timeline"
              data-testid="calc-tab-timeline"
              aria-selected={activeView === "timeline"}
              aria-controls="fin-panel-timeline"
              tabIndex={activeView === "timeline" ? 0 : -1}
              onClick={() => setActiveView("timeline")}
              onKeyDown={onTabKeyDown}
              className={`fin-view-tab ${activeView === "timeline" ? "fin-view-tab--active" : ""}`}
            >
              Payment timeline
            </button>
          </div>

          <div
            role="tabpanel"
            id="fin-panel-breakdown"
            aria-labelledby="fin-tab-breakdown"
            className="fin-view-panel"
            hidden={activeView !== "breakdown"}
            tabIndex={0}
          >
            <PaymentDonut
              parts={donutParts}
              total={allInMonthly}
              wrapTestId="calc-breakdown"
              totalTestId="calc-donut-total"
              legendTestId="calc-donut-legend"
            />
          </div>

          <div
            role="tabpanel"
            id="fin-panel-timeline"
            aria-labelledby="fin-tab-timeline"
            className="fin-view-panel"
            hidden={activeView !== "timeline"}
          >
            <PaymentTimeline
              series={buildSeries}
              allInMonthly={allInMonthly}
              months={months}
              finalMonthInterest={finalMonthInterest}
              svgTestId="calc-timeline"
            />
          </div>
        </div>

        <div className="fin-calc-actions">
          <ContactCta className="fin-lead-cta" testid="calc-lead-cta">
            Talk to us about this estimate
          </ContactCta>
          <button
            type="button"
            data-testid="calc-share"
            onClick={onShare}
            className={`fin-share ${copied ? "fin-share-copied" : ""}`}
          >
            {copied ? "Copied" : "Copy link to this estimate"}
          </button>
        </div>

        <div className="fin-calc-notes">
          <details className="fin-calc-info">
            <summary>Calculator info</summary>
            <p className="fin-tax-note" data-testid="calc-tax-note">
              Property taxes default to {activeLoc.effectiveRatePct.toFixed(2)}% for {activeLoc.name}
              {activeLoc.county === "Statewide" ? " (statewide average)" : ` (${activeLoc.county} County)`}, the average
              effective rate as of {TAX_AS_OF}, and are editable. Your parcel will differ. Insurance defaults to a
              planning estimate of about {fmtMoney(INSURANCE_PER_YEAR_PER_100K)} per year per $100,000 of home value
              as of {INSURANCE_AS_OF}, and is editable. {NEW_BUILD_TAX_NOTE}
            </p>
          </details>

          <details className="fin-calc-info">
            <summary>Disclaimer</summary>
            <p className="fin-calc-note">
              Estimates only, not a loan offer, quote, or preapproval. Assumes draws spread evenly across
              the build and excludes closing costs. Taxes, insurance, and HOA dues are editable estimates.
              Tax rates come from published averages, not your parcel or policy. Your lender's terms will differ.
              Enter the rates from your own quote for the closest estimate.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
