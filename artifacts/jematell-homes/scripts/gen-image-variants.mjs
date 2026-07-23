// Generate high-quality responsive WebP variants for hero/background images.
// Quality ladder mirrors the proven G Bros recipe: sharper quality at the
// smaller widths browsers actually download, slightly lower at the huge
// desktop sizes where DPR makes artifacts invisible. Never upscales.
// Usage: node scripts/gen-image-variants.mjs <name...>   (names in public/images, ext auto)
import sharp from "sharp";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/images";
const LADDER = [ [768, 80], [1280, 80], [1920, 74], [2500, 70] ];
const names = process.argv.slice(2);

for (const name of names) {
  const src = [".jpg", ".jpeg", ".png"].map(e => join(DIR, name + e)).find(existsSync);
  if (!src) { console.log(`SKIP ${name}: no source`); continue; }
  const meta = await sharp(src).metadata();
  console.log(`\n${name}  source ${meta.width}x${meta.height}  ${(statSync(src).size/1024/1024).toFixed(1)}MB`);
  for (const [w, q] of LADDER) {
    if (w > meta.width) { console.log(`  - ${w}w skipped (upscale)`); continue; }
    const out = join(DIR, `${name}-${w}.webp`);
    await sharp(src).resize({ width: w }).webp({ quality: q, effort: 5 }).toFile(out);
    console.log(`  - ${w}w q${q}  ${(statSync(out).size/1024).toFixed(0)}KB`);
  }
}
