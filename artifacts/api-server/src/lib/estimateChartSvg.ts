/**
 * estimateChartSvg.ts — the payment ring and timeline as plain SVG strings.
 *
 * The React versions in PaymentCharts.tsx draw the ring by flipping state one
 * frame after mount so a CSS transition can sweep it in, and the timeline
 * carries hover state. Neither is available here: this page is rendered by
 * Express with no React on the client. So these emit the FINAL geometry
 * directly, which is the better trade for this page anyway — the chart is fully
 * drawn for a crawler, a link preview, and anyone with JavaScript off.
 *
 * Geometry, palette and class names are kept identical to PaymentCharts so both
 * render through the same stylesheet and look the same.
 */
import type { DonutPart } from "./estimateRequest";

const DONUT_R = 80;
const DONUT_C = 2 * Math.PI * DONUT_R;

const r2 = (n: number): number => Math.round(n * 100) / 100;

const usd = (n: number): string =>
  Math.round(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Payment-breakdown ring plus its legend, matching .fin-donut-wrap. */
export function renderDonut(parts: DonutPart[], total: number): string {
  const sum = parts.reduce((acc, p) => acc + (p.value > 0 ? p.value : 0), 0);
  let acc = 0;
  const arcs = parts
    .map((p) => {
      const frac = sum > 0 && p.value > 0 ? p.value / sum : 0;
      const len = r2(frac * DONUT_C);
      const offset = r2(acc * DONUT_C);
      acc += frac;
      return `<circle class="fin-donut-arc" cx="100" cy="100" r="${DONUT_R}" stroke="${p.color}" stroke-dasharray="${len} ${r2(DONUT_C - len)}" stroke-dashoffset="${-offset}"></circle>`;
    })
    .join("");

  const legend = parts
    .filter((p) => p.key !== "hoa" || p.value > 0)
    .map(
      (p) =>
        `<li class="fin-legend-row"><span class="fin-legend-dot" style="background:${p.color}" aria-hidden="true"></span><span class="fin-legend-label">${esc(p.label)}</span><span class="fin-legend-value">${usd(p.value)}</span></li>`,
    )
    .join("");

  return `<div class="fin-donut-wrap">
  <div class="fin-donut">
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <g transform="rotate(-90 100 100)">
        <circle cx="100" cy="100" r="${DONUT_R}" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="26"></circle>
        ${arcs}
      </g>
    </svg>
    <div class="fin-donut-center">
      <span class="fin-donut-total">${usd(total)}</span>
      <span class="fin-donut-per">per month</span>
    </div>
  </div>
  <ul class="fin-donut-legend">${legend}</ul>
</div>`;
}

/** Build-phase interest ramp plus the flat post-move-in bar, matching .fin-timeline. */
export function renderTimeline(opts: {
  series: number[];
  allInMonthly: number;
  months: number;
  finalMonthInterest: number;
  idPrefix: string;
}): string {
  const { series, allInMonthly, months, finalMonthInterest, idPrefix } = opts;
  const chartW = 720;
  const chartH = 190;
  const plotX0 = 6;
  const plotX1 = 714;
  const plotY0 = 28;
  const plotY1 = 158;
  const totalBars = months + 1;
  const slot = (plotX1 - plotX0) / totalBars;
  const barW = r2(Math.max(2, slot - 2));
  const maxVal = Math.max(allInMonthly, finalMonthInterest, 1);
  const barY = (val: number) => r2(plotY1 - (val / maxVal) * (plotY1 - plotY0));
  const markerX = r2(plotX0 + months * slot);
  const markerLabelLeft = months / totalBars > 0.7;
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;

  const bars = series
    .map(
      (val, i) =>
        `<rect class="fin-bar" x="${r2(plotX0 + i * slot + 1)}" y="${barY(val)}" width="${barW}" height="${r2(plotY1 - barY(val))}" fill="var(--color-bone)" fill-opacity="0.85"></rect>`,
    )
    .join("");

  const afterBar = `<rect class="fin-bar" x="${r2(plotX0 + months * slot + 1)}" y="${barY(allInMonthly)}" width="${barW}" height="${r2(plotY1 - barY(allInMonthly))}" fill="#fff" fill-opacity="0.95"></rect>`;

  const ticks = [...new Set([1, months])]
    .map(
      (m) =>
        `<text x="${r2(plotX0 + (m - 1) * slot + slot / 2)}" y="${plotY1 + 16}" text-anchor="middle" font-size="15" fill="rgba(226, 221, 211, 0.6)">Mo ${m}</text>`,
    )
    .join("");

  const desc = `Interest-only payments ramp up over the ${months}-month build, from ${usd(series[0] ?? 0)} in month 1 to ${usd(finalMonthInterest)} in month ${months}, then the all-in payment of ${usd(allInMonthly)} per month begins after move-in.`;

  return `<div class="fin-timeline" role="group" aria-label="Payment timeline chart">
  <span class="fin-stat-k">Payment timeline</span>
  <svg viewBox="0 0 ${chartW} ${chartH}" role="img" aria-labelledby="${titleId} ${descId}" preserveAspectRatio="xMidYMid meet">
    <title id="${titleId}">Monthly payment timeline</title>
    <desc id="${descId}">${esc(desc)}</desc>
    ${bars}
    ${afterBar}
    <line x1="${markerX}" y1="8" x2="${markerX}" y2="${plotY1 + 4}" stroke="var(--color-bone)" stroke-width="1" stroke-dasharray="3 3"></line>
    <text x="${markerLabelLeft ? markerX - 5 : markerX + 5}" y="16" text-anchor="${markerLabelLeft ? "end" : "start"}" font-size="15" fill="var(--color-bone)">Move-in</text>
    <line x1="${plotX0}" y1="${plotY1}" x2="${plotX1}" y2="${plotY1}" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1"></line>
    ${ticks}
  </svg>
</div>`;
}
