/**
 * paymentChartParts.ts — the breakdown segments the payment ring draws.
 *
 * Deliberately NOT inside PaymentCharts.tsx: that file is "use client", and a
 * server component (the prerendered estimate pages) may render a client
 * component but may not call a function exported from one. Keeping this plain
 * module separate lets both sides build the same segments.
 */

export interface DonutPart {
  key: string;
  label: string;
  value: number;
  color: string;
}

/**
 * The standard breakdown, in the order and colours the calculator uses.
 *
 * Colors on the #121415 band: #8fb0c9 is the accent (#3b617f) lightened for the
 * dark background (about 8.2:1), bone is 13.6:1, #c08468 is the warm tone
 * (#8c5a45) lightened to about 6:1, and the HOA grey #9aa0a3 is about 7:1. All
 * clear the 3:1 non-text minimum; legend text is bone and white, both far above
 * 4.5:1.
 */
export function breakdownParts(opts: {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
}): DonutPart[] {
  return [
    {
      key: "pi",
      label: "P&I",
      value: Number.isFinite(opts.principalAndInterest) ? opts.principalAndInterest : 0,
      color: "#8fb0c9",
    },
    { key: "tax", label: "Property tax", value: opts.propertyTax, color: "var(--color-bone)" },
    { key: "ins", label: "Insurance", value: opts.insurance, color: "#c08468" },
    { key: "hoa", label: "HOA", value: opts.hoa, color: "#9aa0a3" },
  ];
}
