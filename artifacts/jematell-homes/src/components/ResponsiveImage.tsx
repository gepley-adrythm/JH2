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
  /**
   * Art-directed PORTRAIT crop widths (expects <name>-portrait-<w>.webp,
   * written by scripts/gen-portrait-crops.mjs). When set, portrait viewports
   * get a centered crop of the same original instead of the landscape ladder.
   *
   * A landscape hero in a portrait viewport makes object-fit:cover discard most
   * of what it downloaded: measured on the live homepage at 375x812/DPR2, the
   * browser took hero-1920.webp (320KB) and only 25.9% of those pixels were
   * ever visible, while the screen wanted 750x1624 — over-fetching AND
   * under-resolving at the same time, on the LCP element. The crop is centered,
   * so it is the same region cover already showed.
   */
  portraitWidths?: number[];
  /** sizes for the portrait <source>. Defaults to "100vw" (the crop fills it). */
  portraitSizes?: string;
  /**
   * Media query the portrait crop applies to. Defaults to phones only.
   *
   * Scoped to <=600px on purpose. On a phone the 9:16 crop is a SUPERSET of
   * what object-fit:cover already shows (a 375x812 screen sees ~26% of the
   * frame width; the crop keeps ~32%), so cover trims it back and the
   * composition is unchanged. A portrait tablet is far less tall-and-narrow —
   * it currently sees ~42% of the frame — so handing it the same crop would
   * genuinely re-frame the shot. Tablets keep the landscape ladder.
   */
  portraitMedia?: string;
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
  portraitWidths,
  portraitSizes = "100vw",
  portraitMedia = "(orientation: portrait) and (max-width: 500px)",
}: ResponsiveImageProps) {
  const hasAvif = AVIF_BASES.has(name);
  const portraitSrcSet = portraitWidths?.length
    ? portraitWidths.map((w) => `${img(`${name}-portrait-${w}.webp`)} ${w}w`).join(", ")
    : null;
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
  //
  // Art direction is the exception. A single hint cannot describe two crops —
  // it would preload the landscape ladder even on a portrait phone, which then
  // fetches the portrait crop as well and pays for both. Those cases emit two
  // media-scoped <link>s below instead, so each orientation preloads exactly
  // the file its <source> will pick.
  if (priority && !portraitSrcSet) {
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
      {priority && portraitSrcSet ? (
        <>
          {/* React hoists these into <head>. */}
          <link
            rel="preload"
            as="image"
            type="image/webp"
            fetchPriority="high"
            media={portraitMedia}
            imageSrcSet={portraitSrcSet}
            imageSizes={portraitSizes}
          />
          <link
            rel="preload"
            as="image"
            type={hasAvif ? "image/avif" : "image/webp"}
            fetchPriority="high"
            media={`not all and ${portraitMedia}`}
            imageSrcSet={hasAvif ? avifSrcSet : webpSrcSet}
            imageSizes={sizes}
          />
        </>
      ) : null}
      {/* Order matters: the first matching <source> wins, so the portrait crop
          must be offered before the generic landscape ladder. */}
      {portraitSrcSet ? (
        <source
          media={portraitMedia}
          type="image/webp"
          srcSet={portraitSrcSet}
          sizes={portraitSizes}
        />
      ) : null}
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
