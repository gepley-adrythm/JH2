// Generate art-directed PORTRAIT crops of full-bleed hero images.
//
// Why this exists: a landscape hero rendered into a portrait viewport with
// object-fit:cover makes the browser download a wide image and then discard
// most of it. Measured on the live homepage at 375x812 / DPR2: it picked
// hero-1920.webp (320KB) and only 25.9% of those pixels were ever visible,
// while the screen actually wanted 750x1624 — so the hero was simultaneously
// over-fetching AND under-resolving, and it is the LCP element.
//
// This is CROPPING, not recompression. The crop is taken from the untouched
// original at the same quality ladder the landscape rungs use, and it is
// centered — the exact region object-fit:cover already shows — so the
// composition on screen is unchanged. Because the original is far larger than
// the landscape ladder implies (hero.jpg is 4096x2304, not 2500x1406), the
// portrait crop comes out SHARPER than what phones get today.
//
// SOURCES ARE NEVER MODIFIED OR DELETED. This only writes new
// `<name>-portrait-<width>.webp` siblings.
//
// Usage: node scripts/gen-portrait-crops.mjs [--aspect=9:16]
//                                            [--dir=public/images] <name...>
import sharp from "sharp";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const arg = (k, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${k}=`));
  return a ? a.slice(k.length + 3) : d;
};
const DIR = arg("dir", "public/images");
const [aw, ah] = arg("aspect", "9:16").split(":").map(Number);
const TARGET = aw / ah;

// Same quality curve as the landscape ladder: sharper at the small widths
// phones actually download, slightly lower where DPR hides artifacts.
const LADDER = [
  [640, 80],
  [828, 80],
  [1080, 78],
  [1296, 74],
];
const SRC_EXT = [".jpg", ".jpeg", ".png"];

const names = process.argv.slice(2).filter((a) => !a.startsWith("--"));

for (const name of names) {
  const src = SRC_EXT.map((e) => join(DIR, name + e)).find(existsSync);
  if (!src) {
    console.log(`SKIP ${name}: no source`);
    continue;
  }
  const meta = await sharp(src).metadata();

  // Center crop to the target aspect, keeping as many source pixels as
  // possible: take the full height and cut the width (heroes are landscape).
  let cropW = Math.round(meta.height * TARGET);
  let cropH = meta.height;
  if (cropW > meta.width) {
    cropW = meta.width;
    cropH = Math.round(meta.width / TARGET);
  }
  const left = Math.round((meta.width - cropW) / 2);
  const top = Math.round((meta.height - cropH) / 2);

  console.log(
    `\n${name}  source ${meta.width}x${meta.height} -> portrait crop ${cropW}x${cropH} ` +
      `(centered, ${aw}:${ah})`,
  );

  for (const [w, q] of LADDER) {
    if (w > cropW) {
      console.log(`  - ${w}w skipped (would upscale the crop)`);
      continue;
    }
    const out = join(DIR, `${name}-portrait-${w}.webp`);
    await sharp(src)
      .extract({ left, top, width: cropW, height: cropH })
      .resize({ width: w })
      .webp({ quality: q, effort: 5 })
      .toFile(out);
    console.log(
      `  - ${w}w q${q}  ${(statSync(out).size / 1024).toFixed(0)}KB` +
        `  (${w}x${Math.round((w / cropW) * cropH)})`,
    );
  }
}
