/**
 * smoke-express-pages.mjs — gate for the pages the other gates cannot see.
 *
 * route-parity, audit and seo-snapshot all read artifacts/jematell-homes/out.
 * A handful of public URLs never land there: they are rendered by this Express
 * service because they take arbitrary query parameters or serve machine-facing
 * documents. Nothing checked them, which is how /financing/estimate shipped
 * completely unstyled and stayed that way until a human noticed a broken
 * shared link.
 *
 * That specific break: the page borrows the real stylesheet out of the static
 * export by scanning financing.html for <link rel="stylesheet">, and
 * experimental.inlineCss emits <style> with no link at all, so the scan found
 * nothing. The CSS assertion below is written to catch that class of failure
 * however it happens — inline or linked, it demands real rules from the site
 * stylesheet, and it follows linked hrefs to prove they actually resolve.
 *
 * Usage:
 *   pnpm --filter @workspace/api-server run build   # produces dist/index.mjs
 *   node scripts/smoke-express-pages.mjs
 *
 * Exits non-zero on the first failed assertion.
 */
import { spawn } from "node:child_process";
import { request as httpRequest } from "node:http";
import { existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const entry = join(root, "dist", "index.mjs");
const staticDir = resolve(root, "..", "jematell-homes", "out");

if (!existsSync(entry)) {
  console.error(`smoke-express-pages: ${entry} not found.`);
  console.error("Run: pnpm --filter @workspace/api-server run build");
  process.exit(1);
}
if (!existsSync(join(staticDir, "index.html"))) {
  console.error(`smoke-express-pages: static export not found at ${staticDir}.`);
  console.error("Run: pnpm --filter @workspace/jematell-homes run build");
  process.exit(1);
}

const PORT = 5100 + Math.floor(process.pid % 400);
const BASE = `http://127.0.0.1:${PORT}`;

// The service refuses to boot without DATABASE_URL, and the FAQ seed sync runs
// on startup. This gate does not touch the database: a syntactically valid URL
// pointing nowhere satisfies the env guard, the sync logs one connection error
// and gives up, and the HTTP surface we care about serves normally. Verified —
// do not "fix" the sync error that appears in this gate's output.
const server = spawn(process.execPath, [entry], {
  env: {
    ...process.env,
    PORT: String(PORT),
    NODE_ENV: "production",
    DATABASE_URL: process.env.DATABASE_URL || "postgres://127.0.0.1:1/smoke-no-db",
    STATIC_DIR: staticDir,
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

const shutdown = () => {
  try {
    server.kill();
  } catch {
    /* already gone */
  }
};
process.on("exit", shutdown);

const failures = [];
const check = (name, cond, detail) => {
  if (cond) console.log(`  ok   ${name}`);
  else {
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
    failures.push(name);
  }
};

async function waitForBoot(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      console.error("smoke-express-pages: server exited before it listened\n" + serverLog);
      process.exit(1);
    }
    try {
      const r = await fetch(`${BASE}/openapi.json`);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  console.error("smoke-express-pages: server never came up\n" + serverLog);
  process.exit(1);
}

/**
 * A page is "styled" when real site CSS reaches the browser, by either route:
 * inline <style> blocks, or <link rel="stylesheet"> hrefs that resolve to real
 * CSS. `--color-accent` is a :root custom property from index.css, so finding
 * it proves we got the actual site stylesheet and not some stray fragment.
 */
async function cssReaching(html) {
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join("\n");
  if (/--color-accent/.test(inline)) {
    return { ok: true, via: `inline <style> (${(inline.length / 1024).toFixed(0)}KB)` };
  }

  const hrefs = (html.match(/<link[^>]*rel="stylesheet"[^>]*>/g) ?? [])
    .map((t) => (t.match(/href="([^"]+)"/) || [])[1])
    .filter((h) => h && h.startsWith("/"));
  if (!hrefs.length) {
    return { ok: false, via: "no inline <style> with site CSS and no stylesheet links" };
  }

  let bytes = 0;
  let sawRules = false;
  for (const href of hrefs) {
    const res = await fetch(BASE + href);
    if (!res.ok) return { ok: false, via: `${href} returned HTTP ${res.status}` };
    const css = await res.text();
    bytes += css.length;
    if (/--color-accent/.test(css)) sawRules = true;
  }
  return sawRules
    ? { ok: true, via: `${hrefs.length} stylesheet link(s), ${(bytes / 1024).toFixed(0)}KB, all 200` }
    : { ok: false, via: `${hrefs.length} stylesheet link(s) resolved but carried no site CSS` };
}

await waitForBoot();
console.log(`smoke-express-pages: server up on ${BASE}\n`);

// --- 1. The shared construction-loan estimate page (the regression) ---------
const estimateUrl =
  `${BASE}/financing/estimate?cost=900000&down=20&br=7.75&pr=6.625&term=30` +
  `&months=12&loc=scottsdale&land=0&lv=250000&bc=700000&hoa=0&tax=3330&ins=5400`;
console.log("/financing/estimate?<params>");
{
  const res = await fetch(estimateUrl);
  const html = await res.text();
  check("responds 200", res.status === 200, `HTTP ${res.status}`);
  check("is HTML", /text\/html/.test(res.headers.get("content-type") || ""));

  const css = await cssReaching(html);
  check(`site CSS reaches the page — ${css.via}`, css.ok);

  check("renders the site header", /<header[\s>]/.test(html));
  check("renders the site footer", /<footer[\s>]/.test(html));
  check("has a non-empty <title>", /<title>[^<]{10,}<\/title>/.test(html));
  check("has a meta description", /<meta name="description" content="[^"]{40,}"/.test(html));
  check("has an <h1>", /<h1[\s>]/.test(html));
  // This page is generated per query string; it must never be indexed.
  check("is noindex", /<meta name="robots" content="[^"]*noindex/.test(html));
  // The numbers are the whole point of the page.
  check("shows the computed payment", /\$[\d,]{5,}/.test(html));
}

// --- 2. Machine-facing discovery documents ---------------------------------
for (const [path, assert] of [
  ["/openapi.json", (j) => typeof j.openapi === "string" && !!j.paths],
  ["/.well-known/mcp.json", (j) => !!j && typeof j === "object"],
  ["/.well-known/agents.json", (j) => !!j && typeof j === "object"],
]) {
  console.log(`\n${path}`);
  const res = await fetch(BASE + path);
  check("responds 200", res.status === 200, `HTTP ${res.status}`);
  let json = null;
  try {
    json = await res.json();
  } catch (e) {
    check("is valid JSON", false, e.message);
  }
  if (json) check("has the expected shape", assert(json));
}

// --- 3. The static export is still served through this process -------------
console.log("\nstatic export via the same service");
{
  const res = await fetch(`${BASE}/`);
  check("GET / responds 200", res.status === 200, `HTTP ${res.status}`);
  const html = await res.text();
  const css = await cssReaching(html);
  check(`site CSS reaches the home page — ${css.via}`, css.ok);
}

// --- 4. Canonical host redirect -------------------------------------------
// www and apex both answered 200 with byte-identical responses, so Google
// indexed 249 of ~1,010 pages under both hostnames and the www share of
// impressions was still growing. The 301 consolidates them. These assertions
// exist because the failure modes are severe and silent: a redirect LOOP takes
// the whole site down, a redirect that drops the path dumps every deep link on
// the home page, and an over-broad host rule breaks *.replit.dev and localhost.
console.log("\ncanonical host redirect");
{
  // NOTE: node's global fetch (undici) silently DROPS a Host header — it is a
  // forbidden header name in the fetch spec — so every request would arrive as
  // 127.0.0.1 and the redirect would look broken when it is not. This gate must
  // use node:http, which sends whatever Host it is given.
  const rawGet = (path, host) =>
    new Promise((resolve, reject) => {
      const req = httpRequest(
        { host: "127.0.0.1", port: PORT, path, method: "GET", headers: { Host: host } },
        (res) => {
          res.resume(); // drain, we only need status + headers
          res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location }));
        },
      );
      req.on("error", reject);
      req.end();
    });

  {
    const res = await rawGet(
      "/faq/cost-to-build-a-house-per-square-foot-in-arizona",
      "www.jematellhomes.com",
    );
    check("www request 301s", res.status === 301, `HTTP ${res.status}`);
    check(
      "301 preserves the path on the apex host",
      res.location ===
        "https://jematellhomes.com/faq/cost-to-build-a-house-per-square-foot-in-arizona",
      `Location: ${res.location}`,
    );
  }

  // Query strings must survive — shared estimate links depend on it
  {
    const res = await rawGet(
      "/financing/estimate?cost=900000&down=20&loc=scottsdale",
      "www.jematellhomes.com",
    );
    check(
      "301 preserves the query string",
      res.location ===
        "https://jematellhomes.com/financing/estimate?cost=900000&down=20&loc=scottsdale",
      `Location: ${res.location}`,
    );
  }

  // The canonical host must NEVER redirect — that is the loop
  {
    const res = await rawGet("/", "jematellhomes.com");
    check("apex host does NOT redirect (no loop)", res.status === 200, `HTTP ${res.status}`);
  }

  // Everything else passes through untouched
  for (const host of [
    "localhost",
    "127.0.0.1",
    "jh2.replit.dev",
    "example-00-abc.picard.replit.dev",
  ]) {
    const res = await rawGet("/", host);
    check(`${host} passes through`, res.status === 200, `HTTP ${res.status}`);
  }
}

shutdown();

console.log("");
if (failures.length) {
  console.error(`smoke-express-pages: ${failures.length} FAILED\n  - ${failures.join("\n  - ")}`);
  process.exit(1);
}
console.log("✓ Express-rendered pages render with the real site chrome and stylesheet.");
