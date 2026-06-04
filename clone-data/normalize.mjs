/**
 * normalize.mjs — shared text cleanup for the content pipeline (dev-only).
 *
 * Two responsibilities:
 *   1. stripEmDashes — replace the em dash (U+2014) / horizontal bar (U+2015)
 *      with a spaced hyphen. The site preference is NO em dashes anywhere in
 *      rendered copy; this is mechanical and meaning-preserving.
 *   2. cleanText — stripEmDashes PLUS a conservative, context-SAFE AI-buzzword
 *      synonym map. Only 1:1 swaps that read correctly in every context are
 *      included here. Words that are legitimate in real-estate/architecture
 *      writing (e.g. "elevation", "elevated ceilings") or risky to auto-rewrite
 *      ("insights into", phrases) are deliberately NOT in this map — those are
 *      hand-cleaned on owned marketing pages and only WARNED about elsewhere by
 *      scripts/content-lint.mjs.
 *
 * Used by extract.mjs (so re-extraction stays clean) and the one-time codemod.
 */

const EM_DASH_RE = /\s*[\u2014\u2015]\s*/g;

export function stripEmDashes(s) {
  if (typeof s !== "string") return s;
  return s.replace(EM_DASH_RE, " - ");
}

// [pattern, replacement] — pattern matches all word forms; case of the first
// letter is preserved in the replacement.
const AI_MAP = [
  [/\bseamlessly\b/gi, "smoothly"],
  [/\bseamless\b/gi, "smooth"],
  [/\bmeticulously\b/gi, "carefully"],
  [/\bmeticulous\b/gi, "careful"],
  [/\brobustly\b/gi, "strongly"],
  [/\brobust\b/gi, "strong"],
  [/\bdelving\b/gi, "digging"],
  [/\bdelves\b/gi, "digs"],
  [/\bdelve\b/gi, "dig"],
  [/\bleverages\b/gi, "uses"],
  [/\bleveraging\b/gi, "using"],
  [/\bleveraged\b/gi, "used"],
  [/\bleverage\b/gi, "use"],
  [/\bfurthermore\b/gi, "also"],
  [/\bmoreover\b/gi, "also"],
  [/\bcutting-edge\b/gi, "modern"],
  [/\bunleashes\b/gi, "releases"],
  [/\bunleashing\b/gi, "releasing"],
  [/\bunleashed\b/gi, "released"],
  [/\bunleash\b/gi, "release"],
  [/\bunveils\b/gi, "reveals"],
  [/\bunveiling\b/gi, "revealing"],
  [/\bunveiled\b/gi, "revealed"],
  [/\bunveil\b/gi, "reveal"],
  [/\btapestry\b/gi, "mix"],
  [/\brealms\b/gi, "areas"],
  [/\brealm\b/gi, "area"],
  [/\bsynergy\b/gi, "teamwork"],
  [/\bparadigm\b/gi, "model"],
  [/\btestament\b/gi, "proof"],
  [/\bfosters\b/gi, "encourages"],
  [/\bfostering\b/gi, "encouraging"],
  [/\bfostered\b/gi, "encouraged"],
  [/\bfoster\b/gi, "encourage"],
];

function matchCase(sample, replacement) {
  if (sample[0] === sample[0].toUpperCase() && sample[0] !== sample[0].toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function applyAiMap(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, to] of AI_MAP) {
    out = out.replace(re, (m) => matchCase(m, to));
  }
  return out;
}

export function cleanText(s) {
  return applyAiMap(stripEmDashes(s));
}
