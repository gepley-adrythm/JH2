"use client";
import { preload } from "react-dom";

/**
 * Hero <picture> for the floor-plan pages. The plan renderings are PNG
 * originals (kept as the universal fallback, never re-encoded in place) with
 * generated -768/-1280 WebP siblings; sources larger than 1280px don't exist
 * because the renderings top out around 1672px and the generator never
 * upscales. Emits the matching preload so the LCP image is discovered in the
 * document head instead of ~1s later after CSS.
 *
 * Adding a new plan? Run: node scripts/gen-image-variants.mjs
 * --dir=public/images/plans <plan>-rendering — without the variants the
 * srcset here would 404.
 */
export function PlanHeroPicture({ src, alt }: { src: string; alt: string }) {
  const base = /^(\/images\/(?:plans\/)?[\w-]+)\.png$/.exec(src)?.[1];
  const srcSet = base ? `${base}-768.webp 768w, ${base}-1280.webp 1280w` : undefined;
  preload(src, srcSet
    ? { as: "image", fetchPriority: "high", imageSrcSet: srcSet, imageSizes: "100vw", type: "image/webp" }
    : { as: "image", fetchPriority: "high" });
  return (
    <picture className="gallery-detail-hero-picture">
      {srcSet ? <source type="image/webp" srcSet={srcSet} sizes="100vw" /> : null}
      <img src={src} alt={alt} className="page-hero-bg" loading="eager" fetchPriority="high" />
    </picture>
  );
}
