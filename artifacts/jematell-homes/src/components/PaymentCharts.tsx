"use client";
import { useEffect, useState } from "react";
import type { DonutPart } from "./paymentChartParts";

/**
 * PaymentCharts — the payment-breakdown ring and the payment timeline.
 *
 * Lifted verbatim out of ConstructionLoanCalculator so the prerendered estimate
 * pages under /financing/estimate render the same charts the calculator does,
 * with the same sweep-in, the same hover behaviour, and the same classes. An
 * earlier pass gave those pages their own static SVG lookalikes; they animated
 * with CSS keyframes instead of the transition these use and read as a cheaper
 * copy, which is exactly the drift that having two implementations produces.
 *
 * Both are client components because the polish depends on it: the ring's sweep
 * is a CSS transition from a zero-length dash to the real one, flipped one frame
 * after mount, and the timeline's tooltip needs pointer state. The markup still
 * prerenders, so a crawler sees the legend, the centre total, and the chart's
 * title and description as real text.
 */

/** Donut geometry: radius 80 in a 200x200 viewBox, 26px ring stroke. */
const DONUT_R = 80;
const DONUT_C = 2 * Math.PI * DONUT_R;

/** Round to 2 decimals for stable SVG geometry strings. */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/**
 * Payment-breakdown donut. Segments reuse the exact monthly values shown in the
 * stats, so the ring, the legend, and the stat text can never disagree. Angles
 * are normalized over the sum of the parts themselves, never over the displayed
 * all-in total, so display rounding cannot make the ring over- or under-shoot a
 * full turn. Zero or non-finite parts contribute a zero-length dash, which draws
 * nothing (butt line caps).
 *
 * The SVG is decorative (aria-hidden): the legend beside it and the real-text
 * centre total carry the same information.
 */
export function PaymentDonut({
  parts,
  total,
  wrapTestId,
  totalTestId,
  legendTestId,
}: {
  parts: DonutPart[];
  total: number;
  wrapTestId?: string;
  totalTestId?: string;
  legendTestId?: string;
}) {
  const [donutReady, setDonutReady] = useState(false);

  // Trigger the sweep-in one frame after mount: the first painted frame has
  // zero-length arcs, then the CSS transition animates them to their real
  // sizes. Reduced-motion users get the final state instantly via the
  // transition: none override in CSS.
  useEffect(() => {
    const id = requestAnimationFrame(() => setDonutReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const donutSum = parts.reduce((acc, p) => acc + (p.value > 0 ? p.value : 0), 0);
  let donutAcc = 0;
  const donutSegs = parts.map((p) => {
    const frac = donutSum > 0 && p.value > 0 ? p.value / donutSum : 0;
    const seg = { ...p, len: r2(frac * DONUT_C), offset: r2(donutAcc * DONUT_C) };
    donutAcc += frac;
    return seg;
  });
  // P&I, tax, and insurance rows always show (a typed-in $0 is information);
  // the HOA row appears only when there are dues.
  const donutLegend = parts.filter((p) => p.key !== "hoa" || p.value > 0);

  return (
    <div className="fin-donut-wrap" data-testid={wrapTestId}>
      <div className="fin-donut">
        <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <g transform="rotate(-90 100 100)">
            <circle
              cx="100"
              cy="100"
              r={DONUT_R}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="26"
            />
            {donutSegs.map((s) => (
              <circle
                key={s.key}
                className="fin-donut-arc"
                cx="100"
                cy="100"
                r={DONUT_R}
                stroke={s.color}
                strokeDasharray={
                  donutReady ? `${s.len} ${r2(DONUT_C - s.len)}` : `0 ${r2(DONUT_C)}`
                }
                strokeDashoffset={-s.offset}
              />
            ))}
          </g>
        </svg>
        <div className="fin-donut-center">
          <span className="fin-donut-total" data-testid={totalTestId}>{fmtMoney(total)}</span>
          <span className="fin-donut-per">per month</span>
        </div>
      </div>
      <ul className="fin-donut-legend" data-testid={legendTestId}>
        {donutLegend.map((p) => (
          <li key={p.key} className="fin-legend-row">
            <span className="fin-legend-dot" style={{ background: p.color }} aria-hidden="true" />
            <span className="fin-legend-label">{p.label}</span>
            <span className="fin-legend-value">{fmtMoney(p.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Payment timeline: one bar per build month showing interest on the balance
 * drawn so far, then a single brighter bar for the flat all-in payment once the
 * loan converts (the payment does not change after that, so one bar conveys it).
 *
 * The wrapper is focusable because at narrow widths it becomes a horizontal
 * scroll region; keyboard users need focus on it to scroll the hidden months
 * into view.
 */
export function PaymentTimeline({
  series,
  allInMonthly,
  months,
  finalMonthInterest,
  svgTestId,
  idPrefix = "fin-timeline",
}: {
  series: number[];
  allInMonthly: number;
  months: number;
  finalMonthInterest: number;
  svgTestId?: string;
  idPrefix?: string;
}) {
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);

  const totalBars = months + 1;
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
  const tickMonths = Array.from(new Set([1, months]));

  // Tooltip for the hovered bar.
  const TT_W = 160;
  const TT_H = 55;
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;
  const tooltipInfo = hoveredBarIdx === null ? null : (() => {
    const isBuild = hoveredBarIdx < months;
    const val = isBuild ? (series[hoveredBarIdx] ?? 0) : allInMonthly;
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
    <div
      className="fin-timeline"
      tabIndex={0}
      role="group"
      aria-label="Payment timeline chart, scrollable"
    >
      <span className="fin-stat-k">Payment timeline</span>
      <svg
        data-testid={svgTestId}
        viewBox={`0 0 ${chartW} ${chartH}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setHoveredBarIdx(null)}
      >
        <title id={titleId}>Monthly payment timeline</title>
        <desc id={descId}>
          {`Interest-only payments ramp up over the ${months}-month build, from ${fmtMoney(series[0] ?? 0)} in month 1 to ${fmtMoney(finalMonthInterest)} in month ${months}, then the all-in payment of ${fmtMoney(allInMonthly)} per month begins after move-in.`}
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
        {series.map((val, i) => (
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
        {(() => {
          const barIdx = months;
          return (
            <rect
              key="a-0"
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
        })()}
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
  );
}
