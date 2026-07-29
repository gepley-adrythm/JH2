import { preload } from "react-dom";
import { img } from "../lib/paths";

interface ResponsiveImageProps {
  /** Base filename without extension, e.g. "hero" (expects hero.jpg + hero-<w>.webp). */
  name: string;
  alt: string;
  /** Available WebP variant widths (must exist as <name>-<width>.webp in public/images). */
  widths: number[];
  /** Responsive sizes attribute, e.g. "100vw" or "(min-width: 900px) 50vw, 100vw". */
  sizes: string;
  /** Intrinsic dimensions of the source image — used for aspect-ratio / zero-CLS. */
  width: number;
  height: number;
  className?: string;
  /** Mark the LCP/above-the-fold image: eager load + high fetch priority. */
  priority?: boolean;
}

/**
 * Renders a <picture> with modern AVIF/WebP variants (srcset/sizes) and the
 * original JPEG as a universal fallback. `picture { display: contents }` (in
 * index.css) means the wrapper adds no box, so existing CSS targeting the
 * inner <img> (or its class) keeps working unchanged.
 *
 * The AVIF rung requires <name>-<w>.avif siblings for every width — the
 * generator (scripts/gen-image-variants.mjs --avif) mirrors the WebP widths
 * 1:1, and originals are never modified.
 */

/**
 * Bases whose AVIF rungs are smaller than their WebP siblings at EVERY width
 * (measured on the generated files, 2026-07-29). The AVIF encode is pinned at
 * conservative quality, which on some photos (hero, where-we-build-hero, ...)
 * produces files LARGER than the webp ladder — browsers always take the first
 * supported <source>, so emitting AVIF there would be a straight delivery
 * regression. Only all-rung winners are listed; everything else serves the
 * existing webp exactly as before. Re-derive after regenerating variants:
 * compare <base>-<w>.avif vs .webp sizes in public/images.
 */
const AVIF_BASES = new Set([
  "city-hero-apache-junction",
  "city-hero-carefree",
  "city-hero-casa-grande",
  "city-hero-cave-creek",
  "city-hero-fountain-hills",
  "city-hero-phoenix",
  "city-hero-rio-verde",
  "city-hero-scottsdale",
  "completion-reveal",
  "cta-bg",
  "custom-home",
  "gallery-2",
  "page-cta-bg",
  "spec-home",
  "surprise-intro",
]);
export function ResponsiveImage({
  name,
  alt,
  widths,
  sizes,
  width,
  height,
  className,
  priority,
}: ResponsiveImageProps) {
  const hasAvif = AVIF_BASES.has(name);
  const avifSrcSet = widths
    .map((w) => `${img(`${name}-${w}.avif`)} ${w}w`)
    .join(", ");
  const webpSrcSet = widths
    .map((w) => `${img(`${name}-${w}.webp`)} ${w}w`)
    .join(", ");

  // Every priority image gets its preload here rather than at call sites, so
  // the hint can never drift from what the <picture> actually renders: the
  // preload's srcset+type must match the first supported <source> or
  // capable browsers double-download the image.
  if (priority) {
    preload(img(`${name}.jpg`), {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: hasAvif ? avifSrcSet : webpSrcSet,
      imageSizes: sizes,
      type: hasAvif ? "image/avif" : "image/webp",
    });
  }

  return (
    <picture>
      {hasAvif ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={img(`${name}.jpg`)}
        alt={alt}
        className={className}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
