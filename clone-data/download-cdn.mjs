/**
 * download-cdn.mjs — Mirror every Squarespace-hosted image referenced by the
 * site into the local repo so the project can eventually be self-hosted
 * (transitioning off Squarespace).
 *
 * It collects every unique image URL from:
 *   - clone-data/extracted/pages.json  (ogImage + img blocks)
 *   - clone-data/extracted/blogs.json  (ogImage + img blocks)
 *   - hardcoded URLs in artifacts/jematell-homes/src
 * downloads each at the best available resolution, and writes the files into
 *   clone-data/cdn/   (dev-only staging — NOT shipped in the build yet)
 * It also writes a manifest (clone-data/cdn-manifest.json) mapping the original
 * remote URL -> local path so the references can be rewired later. When ready
 * to self-host, copy clone-data/cdn/ into the artifact's public/ tree and
 * rewrite the references using the manifest.
 *
 * Idempotent: already-downloaded files are skipped. Run from the repo root:
 *   node clone-data/download-cdn.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const outDir = resolve(here, "cdn");
const manifestPath = resolve(here, "cdn-manifest.json");
const srcDir = resolve(repoRoot, "artifacts", "jematell-homes", "src");

const CONCURRENCY = 6;
const EXT_BY_TYPE = {
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

// ---- 1. Collect every unique remote image URL ------------------------------

const urls = new Set();

function harvestDoc(file) {
  const doc = JSON.parse(readFileSync(resolve(here, "extracted", file), "utf8"));
  for (const key of Object.keys(doc)) {
    const d = doc[key];
    if (d.ogImage) urls.add(d.ogImage);
    for (const blk of d.blocks || []) {
      if (blk.type === "img" && blk.src) urls.add(blk.src);
    }
  }
}
harvestDoc("pages.json");
harvestDoc("blogs.json");

// Hardcoded URLs inside the app source.
function harvestSource(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      harvestSource(full);
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      const text = readFileSync(full, "utf8");
      const matches = text.match(/https?:\/\/[^\s"'`)]*squarespace[^\s"'`)]*/g) || [];
      for (const m of matches) urls.add(m);
    }
  }
}
harvestSource(srcDir);

const allUrls = [...urls].filter((u) => /squarespace/.test(u));
console.log(`Collected ${allUrls.length} unique Squarespace image URLs.`);

// ---- 2. Helpers ------------------------------------------------------------

/** A unique, stable, filesystem-safe key for an asset, derived from its URL. */
function assetKey(rawUrl) {
  const u = new URL(rawUrl);
  const parts = u.pathname.split("/").filter(Boolean);
  const name = decodeURIComponent(parts[parts.length - 1] || "image");
  // The second-to-last path segment is Squarespace's unique asset id.
  const id = parts.length >= 2 ? parts[parts.length - 2] : "asset";
  const cleanName = name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "image";
  return `${id}__${cleanName}`;
}

/**
 * Build the highest-resolution URL we can for a given reference. Squarespace's
 * modern CDN (images.squarespace-cdn.com) returns the largest available render
 * when no `format` is given; the legacy static1 host needs an explicit format.
 */
function bestUrl(rawUrl) {
  const u = new URL(rawUrl);
  if (u.protocol === "http:") u.protocol = "https:";
  if (u.searchParams.has("format")) {
    const f = u.searchParams.get("format");
    // Bump small fixed-width renders up to 2500w; leave avatars (tiny) modest.
    if (/^\d+w$/.test(f) && parseInt(f) < 2500) u.searchParams.set("format", "2500w");
  }
  return u.toString();
}

async function download(rawUrl) {
  const key = assetKey(rawUrl);
  // Already downloaded? (any extension)
  const existing = readdirSync(outDir).find((f) => f.startsWith(key + "."));
  if (existing) return { url: rawUrl, local: `clone-data/cdn/${existing}`, skipped: true };

  const fetchUrl = bestUrl(rawUrl);
  const res = await fetch(fetchUrl, {
    headers: {
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 (asset-mirror)",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${fetchUrl}`);
  const ct = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  let ext = EXT_BY_TYPE[ct];
  if (!ext) {
    const fromName = extname(new URL(rawUrl).pathname).toLowerCase();
    ext = /^\.(jpe?g|png|gif|webp|avif|svg)$/.test(fromName) ? fromName : ".jpg";
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = `${key}${ext}`;
  writeFileSync(join(outDir, filename), buf);
  return { url: rawUrl, local: `clone-data/cdn/${filename}`, bytes: buf.length };
}

// ---- 3. Run with a small concurrency pool ----------------------------------

mkdirSync(outDir, { recursive: true });
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};

let done = 0;
let downloaded = 0;
let skipped = 0;
const failures = [];

async function worker(queue) {
  while (queue.length) {
    const rawUrl = queue.pop();
    try {
      const r = await download(rawUrl);
      manifest[r.url] = r.local;
      if (r.skipped) skipped++;
      else downloaded++;
    } catch (err) {
      failures.push({ url: rawUrl, error: String(err.message || err) });
    }
    done++;
    if (done % 25 === 0 || done === allUrls.length) {
      console.log(`  ${done}/${allUrls.length} (downloaded ${downloaded}, skipped ${skipped}, failed ${failures.length})`);
    }
  }
}

const queue = [...allUrls];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`\nDone. ${downloaded} downloaded, ${skipped} already present, ${failures.length} failed.`);
console.log(`Manifest: clone-data/cdn-manifest.json (${Object.keys(manifest).length} entries)`);
console.log(`Files:    clone-data/cdn/`);
if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures.slice(0, 30)) console.log(`  ${f.url}\n    -> ${f.error}`);
}
