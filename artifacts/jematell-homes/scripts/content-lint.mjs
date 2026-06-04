/**
 * content-lint.mjs — Editorial content guard for the prerendered site.
 *
 * Runs against the static build in dist/public (produced by `pnpm run build`),
 * mirroring audit.mjs: deterministic, browser-free. It walks EVERY prerendered
 * index.html, extracts the visible text (scripts/styles/JSON-LD stripped), and
 * asserts two editorial rules the project cares about:
 *
 *   1. NO EM DASHES. The em dash (U+2014) / horizontal bar (U+2015) must not
 *      appear in any rendered copy, on any route. This is a HARD ERROR
 *      everywhere (it is mechanical to fix and is a stated brand preference).
 *
 *   2. NO AI BUZZWORDS in the site's own marketing copy. A conservative,
 *      curated list of AI-tell words/phrases (delve, seamless, robust, insights,
 *      elevate, "when it comes to", etc.) is checked. To avoid being "too
 *      aggressive", these only HARD-FAIL on OWNED routes (home, indexes, service
 *      + location pages, contact). On legacy long-form content authored in the
 *      client's own voice — individual blog articles (/blog/<slug>) and FAQ
 *      answers/topics (/faq/<slug>, /faq/topics/<slug>) — they are reported as
 *      WARNINGS only, never failing the build.
 *
 * Deliberately NOT flagged: legitimate real-estate vocabulary (nestled, boasts,
 * vibrant, bustling, stunning, luxurious) and architectural terms (elevation).
 *
 * Usage:
 *   BASE_PATH=/ PORT=5000 pnpm --filter @workspace/jematell-homes run build
 *   pnpm --filter @workspace/jematell-homes run lint:content
 * Or in one shot:
 *   pnpm --filter @workspace/jematell-homes run lint:content:ci
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, relative, sep } from "node:path";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const distPublic = join(root, "dist", "public");

const CONFIG = {
  // Em dash + horizontal bar.
  emDashChars: ["\u2014", "\u2015"],
  // Curated, conservative AI-tell list. [regex, label]. Word forms handled in
  // the pattern; architectural "elevation" is excluded by the \b...\b anchors.
  aiPatterns: [
    [/\bdelv(e|es|ed|ing)\b/gi, "delve"],
    [/\bleverage(s|d|ing)?\b/gi, "leverage"],
    [/\bseamless(ly)?\b/gi, "seamless"],
    [/\brobust(ly)?\b/gi, "robust"],
    [/\bunleash(es|ed|ing)?\b/gi, "unleash"],
    [/\bunveil(s|ed|ing)?\b/gi, "unveil"],
    [/\btapestry\b/gi, "tapestry"],
    [/\brealms?\b/gi, "realm"],
    [/\bsynergy\b/gi, "synergy"],
    [/\bparadigm\b/gi, "paradigm"],
    [/\bfurthermore\b/gi, "furthermore"],
    [/\bmoreover\b/gi, "moreover"],
    [/\bfoster(s|ed|ing)?\b/gi, "foster"],
    [/\btestament\b/gi, "testament"],
    [/\bmeticulous(ly)?\b/gi, "meticulous"],
    [/\bcutting-edge\b/gi, "cutting-edge"],
    [/\binsights?\b/gi, "insights"],
    [/\belevate(s|d|ing)?\b/gi, "elevate"],
    [/in today'?s fast-paced/gi, "in today's fast-paced world"],
    [/it'?s important to note/gi, "it's important to note"],
    [/when it comes to/gi, "when it comes to"],
    [/stand the test of time/gi, "stand the test of time"],
    [/game[ -]changer/gi, "game changer"],
    [/treasure trove/gi, "treasure trove"],
  ],
  // A route is "legacy long-form" (AI words downgraded to warnings) when it is
  // an individual blog article or FAQ answer/topic page. Everything else is
  // owned marketing copy where AI words hard-fail.
  legacyRouteRe: /^(blog\/.+|faq\/.+)$/,
};

const errors = [];
const warnings = [];

function walkHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkHtml(full));
    } else if (entry === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function routeOf(file) {
  const rel = relative(distPublic, dirname(file)).split(sep).join("/");
  return rel; // "" for the home route
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&(#x27|#39|rsquo|lsquo|apos);/gi, "'")
    .replace(/&(quot|ldquo|rdquo);/gi, '"')
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function snippet(text, idx, len) {
  const start = Math.max(0, idx - 28);
  const end = Math.min(text.length, idx + len + 28);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

function checkRoute(route, text) {
  const label = route === "" ? "/" : "/" + route;
  const isLegacy = CONFIG.legacyRouteRe.test(route);

  // 1) Em dashes — always an error.
  for (const ch of CONFIG.emDashChars) {
    let idx = text.indexOf(ch);
    let count = 0;
    let first = -1;
    while (idx !== -1) {
      if (first === -1) first = idx;
      count++;
      idx = text.indexOf(ch, idx + 1);
    }
    if (count > 0) {
      errors.push(
        `[${label}] em dash (U+${ch.charCodeAt(0).toString(16).toUpperCase()}) ×${count} — e.g. "${snippet(text, first, 1)}"`,
      );
    }
  }

  // 2) AI buzzwords — error on owned routes, warning on legacy long-form.
  for (const [re, lab] of CONFIG.aiPatterns) {
    re.lastIndex = 0;
    let m;
    let count = 0;
    let first = null;
    while ((m = re.exec(text))) {
      count++;
      if (!first) first = { idx: m.index, len: m[0].length };
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    if (count > 0) {
      const msg = `[${label}] AI word "${lab}" ×${count} — e.g. "${snippet(text, first.idx, first.len)}"`;
      (isLegacy ? warnings : errors).push(msg);
    }
  }
}

function main() {
  if (!existsSync(join(distPublic, "index.html"))) {
    console.error(
      "✗ dist/public/index.html not found. Run the build first:\n" +
        "  BASE_PATH=/ PORT=5000 pnpm --filter @workspace/jematell-homes run build",
    );
    process.exit(2);
  }

  const files = walkHtml(distPublic);
  for (const file of files) {
    checkRoute(routeOf(file), visibleText(readFileSync(file, "utf-8")));
  }

  console.log("Content lint (em dashes + AI buzzwords)");
  console.log(`  routes scanned: ${files.length}`);

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s) on legacy long-form content (not failing):`);
    for (const w of warnings.slice(0, 40)) console.log("  - " + w);
    if (warnings.length > 40) console.log(`  …and ${warnings.length - 40} more`);
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} content error(s):`);
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }
  console.log("\n✓ No em dashes, and no AI buzzwords on owned marketing pages.");
}

main();
