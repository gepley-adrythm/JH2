/**
 * route-parity.mjs — hard gate: the Next export must contain EXACTLY the same
 * route set as the old Vite SSG build (scripts/routes-baseline.txt, snapshotted
 * from the production sitemap). Any missing or extra route fails the build.
 *
 * Run after `next build` (output: export). Maps out/**.html back to routes:
 *   out/index.html        -> /
 *   out/faq/foo.html      -> /faq/foo
 *   out/faq/foo/index.html-> /faq/foo   (trailingSlash variants both accepted)
 * 404.html and llms.txt/sitemap/robots are ignored (checked separately).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, resolve, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = join(root, "out");

if (!existsSync(outDir)) {
  console.error("route-parity: out/ not found — run next build first");
  process.exit(1);
}

const baseline = readFileSync(join(here, "routes-baseline.txt"), "utf-8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean)
  .map((l) => (l === "" ? "/" : l));

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const exported = new Set();
for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  let rel = relative(outDir, file).replace(/\\/g, "/");
  if (rel === "404.html" || rel === "500.html") continue;
  // Next's static export emits an internal /_not-found route (the source of
  // 404.html); it is not a servable page and is not part of the route set.
  if (rel === "_not-found.html" || rel === "_not-found/index.html") continue;
  rel = rel.replace(/\.html$/, "");
  if (rel === "index") rel = "";
  else if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  exported.add("/" + rel.replace(/^\//, ""));
}

const want = new Set(baseline.map((r) => (r === "" ? "/" : r)));
const missing = [...want].filter((r) => !exported.has(r));
const extra = [...exported].filter((r) => !want.has(r));

console.log(`route-parity: baseline ${want.size}, exported ${exported.size}`);
if (missing.length) {
  console.error(`MISSING ${missing.length} routes:`);
  for (const r of missing.slice(0, 40)) console.error("  " + r);
}
if (extra.length) {
  console.error(`EXTRA ${extra.length} routes:`);
  for (const r of extra.slice(0, 40)) console.error("  " + r);
}
for (const f of ["sitemap.xml", "robots.txt", "llms.txt"]) {
  if (!existsSync(join(outDir, f))) {
    console.error(`MISSING aux file: ${f}`);
    process.exit(1);
  }
}
if (missing.length || extra.length) process.exit(1);
console.log("route-parity: PASS");
