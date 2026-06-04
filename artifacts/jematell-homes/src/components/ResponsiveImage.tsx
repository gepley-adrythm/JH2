import { img } from "../layout";

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
 * Renders a <picture> with modern WebP variants (srcset/sizes) and the original
 * JPEG as a universal fallback. `picture { display: contents }` (in index.css)
 * means the wrapper adds no box, so existing CSS targeting the inner <img>
 * (or its class) keeps working unchanged.
 */
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
  const webpSrcSet = widths
    .map((w) => `${img(`${name}-${w}.webp`)} ${w}w`)
    .join(", ");

  return (
    <picture>
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
