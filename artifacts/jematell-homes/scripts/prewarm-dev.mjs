/**
 * prewarm-dev.mjs — warms the next dev compiler after workspace boot.
 *
 * next dev compiles each route on first visit, which costs 3-15s per route
 * family on the workspace machine. Dynamic routes share one compiled module
 * (visiting one /faq/[slug] page warms all of them), so hitting one
 * representative per route family below makes the whole site feel instant in
 * the preview. With Turbopack's persistent dev cache most of these are
 * near-instant after the first boot; this run mainly re-primes the in-memory
 * server. Runs as a background task in the Dev workflow; failures are
 * non-fatal by design.
 */
const BASE =
  process.env.PREWARM_BASE || `http://localhost:${process.env.PORT || 8080}`;

const ROUTES = [
  "/",
  "/custom-homes",
  "/spec-homes",
  "/floor-plans",
  "/floor-plans/1849",
  "/where-we-build",
  "/where-we-build/scottsdale",
  "/build-on-your-lot",
  "/about",
  "/contact",
  "/gallery",
  "/gallery/crist",
  "/financing",
  "/disclaimer",
  "/resources",
  "/blog",
  "/blog/arizona-home-design-trends-for-2026",
  "/faq",
  "/faq/topics/cost-budget",
  "/faq/construction-loan-requirements-arizona",
  "/glossary",
  "/glossary/draw-schedule",
  "/guides",
  "/reference-library",
  "/reference-library/building-codes",
  "/llm-info",
];

async function up() {
  for (let i = 0; i < 120; i++) {
    try {
      const r = await fetch(BASE + "/", { signal: AbortSignal.timeout(5000) });
      if (r.ok) return true;
    } catch {
      /* server still starting */
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  return false;
}

const t0 = Date.now();
if (!(await up())) {
  console.log("[prewarm] dev server never came up; giving up");
  process.exit(0);
}

let warmed = 0;
for (const route of ROUTES) {
  try {
    const t = Date.now();
    const r = await fetch(BASE + route, { signal: AbortSignal.timeout(90000) });
    console.log(`[prewarm] ${r.status} ${((Date.now() - t) / 1000).toFixed(1)}s ${route}`);
    if (r.ok) warmed++;
  } catch (e) {
    console.log(`[prewarm] FAIL ${route}: ${e.message}`);
  }
}
console.log(
  `[prewarm] done: ${warmed}/${ROUTES.length} routes in ${((Date.now() - t0) / 1000).toFixed(0)}s`,
);
