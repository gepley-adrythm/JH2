/**
 * audit.mjs — Automated speed & accessibility regression guard.
 *
 * Runs against the static Next export in out/ (produced by `pnpm run build`).
 * It is deterministic and browser-free: it parses the prerendered HTML and the
 * built asset bundles, then runs axe-core inside jsdom. This keeps it fast and
 * reliable enough to wire into the validation step.
 *
 * What it asserts (budgets in CONFIG below):
 *   1. Real <h1> with text in the raw, pre-JS HTML (SEO + a11y).
 *   2. <html lang> and a non-empty <title> on every checked route.
 *   3. No render-blocking resources: every local <script src> is async, defer,
 *      or type="module"; no @import in built CSS (chain-blocking); and the
 *      number of render-blocking local stylesheets stays at/under budget.
 *   4. Per-route JS budget: every local <script src> (plus modulepreload /
 *      preload-as-script hints) on each checked route, summed gzipped, stays
 *      under budget. Under the App Router this varies per route, so it runs
 *      per checked route rather than once (the Vite build's set was uniform).
 *   5. Accessibility budget: zero GATED axe-core violations per route. A
 *      violation is gated when its impact is serious/critical OR its rule id is
 *      in alwaysFailRules (heading-order — an explicit regression target, even
 *      though axe ranks it "moderate").
 *
 * Caveat: jsdom does not lay out or paint, so axe's color-contrast rule cannot
 * run here (it reports "incomplete", never a violation) and is excluded. Runtime
 * contrast is best checked with the browser-based testing harness. This guard
 * covers structure (heading order, names, roles, labels, lang, alt text). The
 * `region` landmark rule is also excluded (the floating contact widget is an
 * intentional fixed element outside landmarks). See CONFIG.ignoredRules.
 *
 * Usage:
 *   pnpm --filter @workspace/jematell-homes run build
 *   pnpm --filter @workspace/jematell-homes run audit
 * Or in one shot:
 *   pnpm --filter @workspace/jematell-homes run audit:ci
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { JSDOM } from "jsdom";
import axe from "axe-core";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = join(root, "out");

const CONFIG = {
  // Representative routes: home + portfolio, content page, blog index,
  // a blog article, FAQ hub, and contact.
  routes: [
    "/",
    "/gallery",
    "/custom-homes",
    "/blog",
    "/blog/arizona-home-design-trends-for-2026",
    "/faq",
    "/contact",
  ],
  // Per-route JS: local scripts + preload hints, summed gzipped. The old Vite
  // budget was 180KB; the Next runtime + page chunk must stay inside the same
  // envelope on every checked route.
  routeJsGzipBudgetKB: 180,
  // Render-blocking local stylesheets injected by the framework.
  maxBlockingStylesheets: 3,
  // --- Accessibility budget ---
  // The budget is ZERO gated axe-core violations per route. A violation is gated
  // when its impact is in failImpacts OR its rule id is in alwaysFailRules.
  // axe violations at or above this impact fail the audit.
  failImpacts: new Set(["serious", "critical"]),
  // Rules that always fail regardless of impact. axe classifies heading-order as
  // "moderate", but a broken heading hierarchy is an explicit regression target
  // for this guard, so we gate it directly.
  alwaysFailRules: new Set(["heading-order"]),
  // Rules deliberately excluded from the gate, with rationale:
  //  - color-contrast: jsdom does no layout/paint, so axe can only ever report
  //    it as "incomplete" — never a reliable violation. Use the browser-based
  //    testing harness for runtime contrast.
  //  - region: the site's floating contact widget is an intentional fixed-position
  //    element outside the page landmarks; this moderate rule fires on it on
  //    every route and is an accepted exception.
  ignoredRules: ["color-contrast", "region"],
};

const failures = [];
const notes = [];
function fail(route, msg) {
  failures.push(`[${route}] ${msg}`);
}

/** Resolve a route to its exported HTML file: /foo -> out/foo.html or out/foo/index.html. */
function readRoute(route) {
  const candidates =
    route === "/"
      ? [join(outDir, "index.html")]
      : [join(outDir, `${route.slice(1)}.html`), join(outDir, route.slice(1), "index.html")];
  for (const file of candidates) {
    if (existsSync(file)) return readFileSync(file, "utf-8");
  }
  return null;
}

function textContent(html, tagRe) {
  const m = html.match(tagRe);
  if (!m) return null;
  return m[1].replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

// --- Speed checks (per route: App Router page chunks differ by route) ---
function checkRouteJsBudget(route, html) {
  const re =
    /(?:<script[^>]*\bsrc="(\/[^"]+)")|(?:rel="modulepreload"[^>]*href="(\/[^"]+)")|(?:rel="preload"[^>]*as="script"[^>]*href="(\/[^"]+)")/g;
  const files = new Set();
  let m;
  while ((m = re.exec(html))) files.add(m[1] || m[2] || m[3]);

  let gz = 0;
  for (const f of files) {
    const asset = join(outDir, f.split("?")[0].replace(/^\//, ""));
    if (!existsSync(asset)) {
      fail(route, `JS references missing asset: ${f}`);
      continue;
    }
    gz += gzipSync(readFileSync(asset)).length;
  }
  const gzKB = gz / 1024;
  notes.push(
    `js ${route}: ${files.size} files, ${gzKB.toFixed(1)}KB gzip (budget ${CONFIG.routeJsGzipBudgetKB}KB)`,
  );
  if (gzKB > CONFIG.routeJsGzipBudgetKB) {
    fail(
      route,
      `route JS ${gzKB.toFixed(1)}KB gzip exceeds budget ${CONFIG.routeJsGzipBudgetKB}KB`,
    );
  }
}

function checkRenderBlocking(route, html) {
  // Every local script must be non-blocking (async, defer, or module).
  const scriptRe = /<script\b([^>]*?)\bsrc="(\/[^"]+)"([^>]*)>/g;
  let m;
  while ((m = scriptRe.exec(html))) {
    const attrs = m[1] + m[3];
    if (!/type="module"|\basync\b|\bdefer\b/.test(attrs)) {
      fail(route, `render-blocking local script (not async/defer/module): ${m[2]}`);
    }
  }

  // Count render-blocking local stylesheets and reject @import chains.
  const cssRe = /rel="stylesheet"[^>]*href="(\/[^"]+\.css[^"]*)"/g;
  let blocking = 0;
  while ((m = cssRe.exec(html))) {
    blocking++;
    const asset = join(outDir, m[1].split("?")[0].replace(/^\//, ""));
    if (existsSync(asset)) {
      const css = readFileSync(asset, "utf-8");
      if (/@import\s+(url\()?["']/.test(css)) {
        fail(route, `built CSS uses render-blocking @import: ${m[1]}`);
      }
    }
  }
  notes.push(
    `stylesheets ${route}: ${blocking} render-blocking (budget ${CONFIG.maxBlockingStylesheets})`,
  );
  if (blocking > CONFIG.maxBlockingStylesheets) {
    fail(
      route,
      `${blocking} render-blocking stylesheets exceeds budget ${CONFIG.maxBlockingStylesheets}`,
    );
  }
}

// --- Per-route SEO + structure checks (no browser needed) ---
function checkStaticHtml(route, html) {
  if (!/<html[^>]*\blang="[^"]+"/.test(html)) {
    fail(route, "missing <html lang> attribute");
  }
  const title = textContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) fail(route, "missing or empty <title>");

  const h1 = textContent(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1) {
    fail(route, "no real <h1> with text in raw pre-JS HTML");
  }
}

// --- Per-route accessibility check via axe-core in jsdom ---
async function checkA11y(route, html) {
  const dom = new JSDOM(html, {
    pretendToBeVisual: true,
    runScripts: "dangerously",
  });
  const { window } = dom;
  try {
    // axe-core ships browser-targeted source; eval it inside the window so it
    // binds to this document, then run it.
    window.eval(axe.source);

    const results = await window.axe.run(window.document, {
      resultTypes: ["violations"],
      rules: Object.fromEntries(
        CONFIG.ignoredRules.map((id) => [id, { enabled: false }]),
      ),
    });

    let gated = 0;
    for (const v of results.violations) {
      const isGated =
        CONFIG.failImpacts.has(v.impact) || CONFIG.alwaysFailRules.has(v.id);
      if (!isGated) continue;
      gated++;
      const where = v.nodes
        .slice(0, 2)
        .map((n) => n.target.join(" "))
        .join("; ");
      fail(route, `a11y (${v.impact}) ${v.id}: ${v.help} — at ${where}`);
    }
    notes.push(`a11y ${route}: ${gated} gated violation(s) (budget 0)`);
  } finally {
    window.close();
  }
}

async function main() {
  if (!existsSync(join(outDir, "index.html"))) {
    console.error(
      "✗ out/index.html not found. Run the build first:\n" +
        "  pnpm --filter @workspace/jematell-homes run build",
    );
    process.exit(2);
  }

  for (const route of CONFIG.routes) {
    const html = readRoute(route);
    if (!html) {
      fail(route, "exported HTML not found (route missing from build)");
      continue;
    }
    checkRouteJsBudget(route, html);
    checkRenderBlocking(route, html);
    checkStaticHtml(route, html);
    await checkA11y(route, html);
  }

  console.log("Speed & accessibility audit");
  console.log("  routes checked: " + CONFIG.routes.join(", "));
  for (const n of notes) console.log("  • " + n);

  if (failures.length) {
    console.error(`\n✗ ${failures.length} check(s) failed:`);
    for (const f of failures) console.error("  - " + f);
    process.exit(1);
  }
  console.log("\n✓ All speed & accessibility checks passed.");
}

main().catch((err) => {
  console.error("Audit crashed:", err);
  process.exit(2);
});
