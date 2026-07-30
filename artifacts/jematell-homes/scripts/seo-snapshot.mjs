/**
 * seo-snapshot.mjs — hard gate: prove a change made ZERO SEO regressions.
 *
 * route-parity.mjs proves the route SET is unchanged. This proves the SEO
 * SURFACE of every one of those routes is unchanged: titles, descriptions,
 * canonicals, robots directives, lang, headings, Open Graph, Twitter cards,
 * JSON-LD, internal link graph, image alt coverage, and the visible text
 * itself. Anything that moves shows up as a named diff instead of a surprise
 * in Search Console three weeks later.
 *
 * What counts as the SEO surface (and what is deliberately ignored, because
 * perf work is supposed to change it) is defined once in lib/seo-extract.mjs.
 *
 * Usage:
 *   node scripts/seo-snapshot.mjs --write   # record out/ as the baseline
 *   node scripts/seo-snapshot.mjs           # check out/ against the baseline
 *   node scripts/seo-snapshot.mjs --limit=40   # spot check, faster
 *
 * Exits non-zero on any difference. Intentional SEO changes are landed by
 * re-running --write in the SAME commit, so the diff is reviewable in git.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, resolve, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { extract, sha, norm } from "./lib/seo-extract.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = join(root, "out");
const baselinePath = join(here, "seo-baseline.json");

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const limitArg = args.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.slice("--limit=".length)) : Infinity;

if (!existsSync(outDir)) {
  console.error("seo-snapshot: out/ not found — run next build first");
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function routeOf(file) {
  let rel = relative(outDir, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  return "/" + rel.replace(/^\//, "");
}

function globals() {
  const g = {};
  for (const f of ["sitemap.xml", "robots.txt", "llms.txt"]) {
    const p = join(outDir, f);
    if (!existsSync(p)) {
      g[f] = "MISSING";
      continue;
    }
    const body = readFileSync(p, "utf-8");
    g[f] = sha(norm(body));
    if (f === "sitemap.xml") g["sitemap.urlCount"] = (body.match(/<loc>/g) || []).length;
  }
  return g;
}

const files = walk(outDir)
  .filter((f) => f.endsWith(".html"))
  .sort();

const snapshot = { _globals: globals(), routes: {} };
let n = 0;
for (const file of files) {
  if (n >= LIMIT) break;
  const route = routeOf(file);
  if (route === "/_not-found") continue;
  snapshot.routes[route] = extract(readFileSync(file, "utf-8"));
  n++;
  if (n % 200 === 0) process.stderr.write(`  ...${n} routes\n`);
}

if (WRITE) {
  writeFileSync(baselinePath, JSON.stringify(snapshot));
  console.log(
    `seo-snapshot: baseline written — ${Object.keys(snapshot.routes).length} routes, ` +
      `${(statSync(baselinePath).size / 1024).toFixed(0)}KB`,
  );
  process.exit(0);
}

if (!existsSync(baselinePath)) {
  console.error("seo-snapshot: no baseline — run with --write first");
  process.exit(1);
}
const base = JSON.parse(readFileSync(baselinePath, "utf-8"));

const problems = [];
for (const [k, v] of Object.entries(snapshot._globals)) {
  if (base._globals[k] !== v) problems.push(`GLOBAL ${k}: ${base._globals[k]} -> ${v}`);
}

const partial = Number.isFinite(LIMIT);
if (!partial) {
  for (const r of Object.keys(base.routes)) {
    if (!(r in snapshot.routes)) problems.push(`ROUTE REMOVED ${r}`);
  }
  for (const r of Object.keys(snapshot.routes)) {
    if (!(r in base.routes)) problems.push(`ROUTE ADDED ${r}`);
  }
}

let compared = 0;
for (const r of Object.keys(snapshot.routes)) {
  const a = base.routes[r];
  const b = snapshot.routes[r];
  if (!a) continue;
  compared++;
  for (const key of Object.keys(b)) {
    const av = JSON.stringify(a[key]);
    const bv = JSON.stringify(b[key]);
    if (av !== bv) {
      const short = (s) => (s && s.length > 120 ? s.slice(0, 120) + "…" : s);
      problems.push(`${r} :: ${key}\n    was: ${short(av)}\n    now: ${short(bv)}`);
    }
  }
}

console.log(`seo-snapshot: compared ${compared} routes against baseline`);
if (problems.length) {
  console.error(`\nSEO REGRESSIONS: ${problems.length}\n`);
  for (const p of problems.slice(0, 60)) console.error("  " + p);
  if (problems.length > 60) console.error(`  ...and ${problems.length - 60} more`);
  console.error(
    "\nIf these changes are intentional, re-run with --write and commit the\n" +
      "updated seo-baseline.json alongside the change so the diff is reviewable.",
  );
  process.exit(1);
}
console.log("✓ Zero SEO changes: titles, descriptions, canonicals, robots, headings,");
console.log("  JSON-LD, OG/Twitter, internal links, image alts, and page text all identical.");
