/**
 * Pre-compress the static export in out/ for the production server.
 *
 * Runs after `next build` (see package.json "build"). For every compressible
 * text asset it writes sibling `.br` (brotli, max quality) and `.gz` (gzip -9)
 * files. The api-server's static middleware content-negotiates on
 * Accept-Encoding and serves the smallest variant the client supports, falling
 * back to the original file when no sibling exists — so a build that skips
 * this step still works, just slower.
 *
 * Ported from the G Brothers site server (proven 77 -> 92 mobile Lighthouse).
 * Zero dependencies: node:zlib ships brotli.
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { brotliCompress, gzip, constants } from "node:zlib";
import { promisify } from "node:util";

const brotliAsync = promisify(brotliCompress);
const gzipAsync = promisify(gzip);

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "out");

const COMPRESSIBLE = new Set([
  ".html", ".js", ".mjs", ".css", ".json", ".txt", ".xml", ".svg", ".map", ".webmanifest",
]);
// Below this size compression overhead outweighs the transfer savings.
const MIN_BYTES = 1024;

function extOf(name) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

const t0 = Date.now();
let files = 0;
let rawBytes = 0;
let brBytes = 0;

async function compressOne(file) {
  const s = await stat(file);
  if (s.size < MIN_BYTES) return;

  const body = await readFile(file);
  const [br, gz] = await Promise.all([
    brotliAsync(body, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
        [constants.BROTLI_PARAM_SIZE_HINT]: body.length,
      },
    }),
    gzipAsync(body, { level: constants.Z_BEST_COMPRESSION }),
  ]);

  // Only keep variants that actually save bytes.
  const writes = [];
  if (br.length < body.length) writes.push(writeFile(file + ".br", br));
  if (gz.length < body.length) writes.push(writeFile(file + ".gz", gz));
  await Promise.all(writes);

  files += 1;
  rawBytes += body.length;
  brBytes += Math.min(br.length, body.length);
}

// zlib work runs on the libuv threadpool, so a modest pool of in-flight files
// cuts wall time ~4x versus one-at-a-time.
const CONCURRENCY = 8;
const pending = new Set();
for await (const file of walk(OUT_DIR)) {
  const ext = extOf(file);
  if (!COMPRESSIBLE.has(ext) || file.endsWith(".br") || file.endsWith(".gz")) continue;
  const task = compressOne(file).then(
    () => pending.delete(task),
    (err) => {
      pending.delete(task);
      throw err;
    },
  );
  pending.add(task);
  if (pending.size >= CONCURRENCY) await Promise.race(pending);
}
await Promise.all(pending);

const pct = rawBytes ? Math.round((1 - brBytes / rawBytes) * 100) : 0;
console.log(
  `[precompress] ${files} files: ${(rawBytes / 1024).toFixed(0)} KiB -> ` +
    `${(brBytes / 1024).toFixed(0)} KiB brotli (-${pct}%) in ${Date.now() - t0}ms`,
);
