/**
 * gen-images.mjs — Generate responsive, modern-format image variants.
 *
 * Reads the source JPEGs in public/images/ and emits high-quality WebP
 * variants at several widths (for <picture>/srcset). The original JPEGs are
 * kept untouched as the universal fallback. Quality is intentionally high
 * (q90, method 6) so the WebP output is visually indistinguishable from the
 * source while shipping far fewer bytes.
 *
 * Requires ImageMagick (`magick`). Run from the artifact root:
 *   node scripts/gen-images.mjs
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const imagesDir = resolve(here, "..", "public", "images");

// Each source maps to the set of WebP widths to generate. Widths never exceed
// the source's intrinsic width (no upscaling).
const SOURCES = {
  "gallery-1.jpg": [640, 1024, 1280, 1600],
  "gallery-2.jpg": [768, 1280, 1600, 2000],
  "spec-home.jpg": [768, 1280, 1600],
  "cta-bg.jpg": [768, 1280, 1920, 2500],
};

const QUALITY = "90";

for (const [file, widths] of Object.entries(SOURCES)) {
  const src = join(imagesDir, file);
  if (!existsSync(src)) {
    console.warn(`skip (missing): ${file}`);
    continue;
  }
  const base = file.replace(/\.jpe?g$/i, "");
  for (const w of widths) {
    const out = join(imagesDir, `${base}-${w}.webp`);
    execFileSync("magick", [
      src,
      "-resize",
      `${w}x>`,
      "-quality",
      QUALITY,
      "-define",
      "webp:method=6",
      "-strip",
      out,
    ]);
    console.log(`wrote ${base}-${w}.webp`);
  }
}

console.log("Done generating WebP variants.");
