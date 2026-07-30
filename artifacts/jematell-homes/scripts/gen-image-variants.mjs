// Generate high-quality responsive WebP/AVIF variants for hero/background images.
// Quality ladder mirrors the proven G Bros recipe: sharper quality at the
// smaller widths browsers actually download, slightly lower at the huge
// desktop sizes where DPR makes artifacts invisible. Never upscales.
//
// SOURCES ARE NEVER MODIFIED OR DELETED — this tool only writes new
// `<name>-<width>.<ext>` sibling files. The originals stay on disk (and remain
// the <img src> fallback in every <picture> that uses these variants).
//
// Usage: node scripts/gen-image-variants.mjs [--avif] [--from-lossy]
//                                            [--dir=public/images/plans] <name...>
//   (names in --dir, default public/images; source ext auto-detected)
// --from-lossy allows an already-compressed .webp as the SOURCE and raises the
// quality ladder, because re-encoding a lossy file compounds generation loss.
// Used for the Squarespace-era cdn/ heroes, where no original exists: the
// alternative is shipping one 377-888KB file to phones, and a high-quality
// downscale is visibly better than the browser's runtime squeeze of the full
// image. The source file itself is still never modified.
// --avif writes AVIF rungs instead of WebP. Widths mirror the base's existing
// WebP variants when any exist (so <source> srcsets pair 1:1 — city heroes
// use a custom 1500w rung), else the standard ladder. AVIF quality numbers
// are NOT comparable to WebP's scale; these values are deliberately high so
// AVIF output stays visually transparent, just smaller on the wire.
import sharp from "sharp";
import { existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dirArg = process.argv.find((a) => a.startsWith("--dir="));
const DIR = dirArg ? dirArg.slice("--dir=".length) : "public/images";
const avif = process.argv.includes("--avif");
const fromLossy = process.argv.includes("--from-lossy");
// Lossy sources get a higher ladder so the second encode does not stack
// visible artifacts on top of the first.
const LADDER = fromLossy
  ? [ [768, 85], [1280, 85], [1920, 82] ]
  : [ [768, 80], [1280, 80], [1920, 74], [2500, 70] ];
const AVIF_Q = { 768: 70, 1280: 70, 1920: 64, 2500: 60 };
const AVIF_Q_DEFAULT = 68;
const SRC_EXT = fromLossy ? [".webp", ".jpg", ".jpeg", ".png"] : [".jpg", ".jpeg", ".png"];
const names = process.argv
  .slice(2)
  .filter((a) => a !== "--avif" && a !== "--from-lossy" && !a.startsWith("--dir="));

function existingWebpWidths(name) {
  const re = new RegExp(`^${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}-(\\d+)\\.webp$`);
  return readdirSync(DIR)
    .map((f) => re.exec(f)?.[1])
    .filter(Boolean)
    .map(Number)
    .sort((a, b) => a - b);
}

for (const name of names) {
  const src = SRC_EXT.map(e => join(DIR, name + e)).find(existsSync);
  if (!src) { console.log(`SKIP ${name}: no source`); continue; }
  const meta = await sharp(src).metadata();
  console.log(`\n${name}  source ${meta.width}x${meta.height}  ${(statSync(src).size/1024/1024).toFixed(1)}MB`);
  const widths = avif
    ? (existingWebpWidths(name).length ? existingWebpWidths(name) : LADDER.map(([w]) => w))
    : LADDER.map(([w]) => w);
  for (const w of widths) {
    if (w > meta.width) { console.log(`  - ${w}w skipped (upscale)`); continue; }
    if (avif) {
      const q = AVIF_Q[w] ?? AVIF_Q_DEFAULT;
      const out = join(DIR, `${name}-${w}.avif`);
      await sharp(src).resize({ width: w }).avif({ quality: q, effort: 6 }).toFile(out);
      console.log(`  - ${w}w avif q${q}  ${(statSync(out).size/1024).toFixed(0)}KB`);
    } else {
      const q = LADDER.find(([lw]) => lw === w)[1];
      const out = join(DIR, `${name}-${w}.webp`);
      await sharp(src).resize({ width: w }).webp({ quality: q, effort: 5 }).toFile(out);
      console.log(`  - ${w}w q${q}  ${(statSync(out).size/1024).toFixed(0)}KB`);
    }
  }
}
