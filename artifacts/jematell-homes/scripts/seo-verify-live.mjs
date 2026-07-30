/**
 * seo-verify-live.mjs — post-publish check: does the DEPLOYED site still have
 * the same SEO surface as the build we approved?
 *
 * seo-snapshot.mjs runs before publish, against out/. This runs after publish,
 * against the real origin, and compares the same fields (defined once in
 * lib/seo-extract.mjs) to the committed baseline. It catches the class of
 * problem a local gate structurally cannot: a deploy that serves stale HTML,
 * a proxy that rewrites markup, a route that 404s or 502s in production.
 *
 * Usage:
 *   node scripts/seo-verify-live.mjs                  # sample of every template
 *   node scripts/seo-verify-live.mjs --all            # all 1,012 routes (slow)
 *   node scripts/seo-verify-live.mjs --routes=/,/about
 *   node scripts/seo-verify-live.mjs --base=https://staging.example.com
 *
 * Exits non-zero if any sampled route differs from the baseline or fails to
 * fetch. Fields that legitimately differ between local and origin (absolute
 * canonical/og:url hosts when --base is not the production domain) are
 * host-normalized before comparison.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { extract } from "./lib/seo-extract.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const baselinePath = join(here, "seo-baseline.json");

const args = process.argv.slice(2);
const argVal = (name, dflt) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : dflt;
};
const BASE = argVal("base", "https://jematellhomes.com").replace(/\/$/, "");
const ALL = args.includes("--all");
const CONCURRENCY = Number(argVal("concurrency", "6"));

if (!existsSync(baselinePath)) {
  console.error("seo-verify-live: no baseline — run seo-snapshot.mjs --write first");
  process.exit(1);
}
const base = JSON.parse(readFileSync(baselinePath, "utf-8"));
const allRoutes = Object.keys(base.routes).filter((r) => r !== "/404");

/**
 * One route per page TEMPLATE, plus every top-level page. The corpus routes
 * (faq/glossary/reference-library/guides/estimate) number in the hundreds but
 * share a template, so a couple of each proves the template; --all covers the
 * rest when a change could plausibly be per-page.
 */
function sample() {
  const picked = new Set(allRoutes.filter((r) => (r.match(/\//g) || []).length === 1));
  const families = [
    /^\/faq\//,
    /^\/blog\//,
    /^\/glossary\//,
    /^\/guides\//,
    /^\/where-we-build\//,
    /^\/floor-plans\//,
    /^\/financing\/estimate\//,
    /^\/reference-library\/building-codes\//,
    /^\/reference-library\/arizona-building-law\//,
    /^\/reference-library\/code-library\//,
    /^\/reference-library\/community-design-guidelines\//,
    /^\/resources\//,
    /^\/spec-homes\//,
  ];
  for (const re of families) {
    const hits = allRoutes.filter((r) => re.test(r));
    // First and last in a family: they were usually written by different
    // passes, so they exercise more of the template's optional branches.
    for (const r of [hits[0], hits[hits.length - 1]].filter(Boolean)) picked.add(r);
  }
  return [...picked].sort();
}

const routes = ALL ? allRoutes : sample();
console.log(`seo-verify-live: ${BASE} — checking ${routes.length} routes\n`);

// Compare against the origin we snapshotted for, so a staging host does not
// report every absolute URL as a regression.
const PROD = "https://jematellhomes.com";
const rehost = (v) =>
  typeof v === "string" && BASE !== PROD ? v.split(BASE).join(PROD) : v;

const problems = [];
let ok = 0;

async function check(route) {
  const url = BASE + (route === "/" ? "/" : route);
  let res, html;
  try {
    res = await fetch(url, { redirect: "manual", headers: { "user-agent": "jh2-seo-verify" } });
    html = await res.text();
  } catch (e) {
    problems.push(`${route} :: FETCH FAILED — ${e.message}`);
    return;
  }
  if (res.status !== 200) {
    problems.push(`${route} :: HTTP ${res.status}${res.headers.get("location") ? " -> " + res.headers.get("location") : ""}`);
    return;
  }
  const live = extract(html);
  const want = base.routes[route];
  let clean = true;
  for (const key of Object.keys(want)) {
    const av = JSON.stringify(want[key]);
    const bv = JSON.stringify(
      typeof live[key] === "string" ? rehost(live[key]) : live[key],
    );
    if (av !== bv) {
      clean = false;
      const short = (s) => (s && s.length > 140 ? s.slice(0, 140) + "…" : s);
      problems.push(`${route} :: ${key}\n    built: ${short(av)}\n    live:  ${short(bv)}`);
    }
  }
  if (clean) ok++;
}

// Bounded concurrency: enough to finish a full sweep in reasonable time,
// low enough not to look like an attack to the origin.
const queue = [...routes];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await check(queue.shift());
  }),
);

console.log(`matched baseline: ${ok}/${routes.length}`);
if (problems.length) {
  console.error(`\nLIVE SEO DIFFERENCES: ${problems.length}\n`);
  for (const p of problems.slice(0, 60)) console.error("  " + p);
  if (problems.length > 60) console.error(`  ...and ${problems.length - 60} more`);
  process.exit(1);
}
console.log("✓ Deployed HTML matches the approved build on every SEO field.");
