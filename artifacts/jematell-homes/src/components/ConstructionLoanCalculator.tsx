import { useState } from "react";

/**
 * ConstructionLoanCalculator — a self-contained construction-to-permanent loan
 * estimator. Pure client-side arithmetic with typed-in rates: no rate feeds, no
 * network, nothing to go stale. Renders deterministic en-US formatting so the
 * prerendered HTML and the hydrated tree always match.
 *
 * Model (stated in the UI footnote): during construction the borrower pays
 * interest only on what has been drawn. Draws are assumed to ramp roughly
 * linearly from zero to the full loan across the build, so the final month is
 * interest on the full loan and the total paid during the build averages half
 * of that across the schedule. After conversion the loan amortizes as a
 * standard mortgage.
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

export function ConstructionLoanCalculator() {
  const [costStr, setCostStr] = useState("900,000");
  const [downPct, setDownPct] = useState(20);
  const [buildRate, setBuildRate] = useState(7.75);
  const [permRate, setPermRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [buildMonths, setBuildMonths] = useState(12);

  const cost = parseMoney(costStr);
  const down = cost * clamp(downPct, 0, 100) / 100;
  const loan = Math.max(0, cost - down);

  const iBuild = clamp(buildRate, 0, 30) / 100 / 12;
  const iPerm = clamp(permRate, 0, 30) / 100 / 12;
  const n = clamp(termYears, 1, 40) * 12;
  const months = clamp(buildMonths, 1, 36);

  const permMonthly = iPerm > 0
    ? (loan * iPerm * Math.pow(1 + iPerm, n)) / (Math.pow(1 + iPerm, n) - 1)
    : loan / n;
  const finalMonthInterest = loan * iBuild;
  const totalBuildInterest = loan * iBuild * months * 0.5;

  const onCostBlur = () => {
    setCostStr(cost > 0 ? cost.toLocaleString("en-US") : "");
  };

  return (
    <div className="fin-calc" data-testid="loan-calculator">
      <div className="fin-calc-inputs">
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
              onBlur={onCostBlur}
              className="fin-input fin-input--money"
            />
          </div>
        </div>

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
      </div>

      <div className="fin-calc-results" data-testid="calc-results" aria-live="polite">
        <div className="fin-stat fin-stat--lead">
          <span className="fin-stat-k">Monthly payment after conversion</span>
          <span className="fin-stat-v" data-testid="calc-perm-payment">{fmtMoney(permMonthly)}<em>/mo</em></span>
          <span className="fin-stat-sub">Principal and interest on a {termYears}-year mortgage</span>
        </div>
        <div className="fin-stat">
          <span className="fin-stat-k">Loan amount</span>
          <span className="fin-stat-v" data-testid="calc-loan">{fmtMoney(loan)}</span>
        </div>
        <div className="fin-stat">
          <span className="fin-stat-k">Cash at closing</span>
          <span className="fin-stat-v" data-testid="calc-cash">{fmtMoney(down)}</span>
        </div>
        <div className="fin-stat">
          <span className="fin-stat-k">Interest during the build</span>
          <span className="fin-stat-v" data-testid="calc-build-interest">{fmtMoney(totalBuildInterest)} total</span>
          <span className="fin-stat-sub">
            Payments start small and grow with each draw, reaching about {fmtMoney(finalMonthInterest)}/mo in the final month
          </span>
        </div>
        <p className="fin-calc-note">
          Estimates only, not a loan offer, quote, or preapproval. Assumes draws spread evenly across
          the build and excludes taxes, insurance, HOA dues, and closing costs. Your lender's terms
          will differ. Enter the rates from your own quote for the closest estimate.
        </p>
      </div>
    </div>
  );
}
