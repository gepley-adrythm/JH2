/**
 * metadata.ts — maps the site's page-SEO model onto the Next Metadata API.
 * This replaces the render-time <Seo> sink from the Vite build: every page
 * (or its generateMetadata) calls pageMetadata() with the same fields the old
 * <Seo> component took, and Next emits the identical head tags statically.
 */
import type { Metadata } from "next";
import { siteConfig } from "../config/siteConfig";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, absoluteUrl } from "./siteMeta";

export interface PageSeo {
  title?: string;
  description?: string;
  /** Site-relative canonical path, e.g. "/faq/foo". Required — no pathname fallback in static metadata. */
  canonical: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/** The old formatTitle logic — kept for og:/twitter: titles, which don't go through the title template. */
export function formatTitle(title?: string): string {
  const brand = siteConfig.brand.name;
  const t = (title || "").trim();
  if (!t || t.toLowerCase() === brand.toLowerCase()) return brand;
  return `${t} - ${brand}`;
}

export function pageMetadata(p: PageSeo): Metadata {
  const brand = siteConfig.brand.name;
  const t = (p.title || "").trim();
  const description = p.description || DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(p.canonical);
  const image = absoluteUrl(p.image || DEFAULT_OG_IMAGE);
  const fullTitle = formatTitle(p.title);
  return {
    // Plain string goes through the root layout's "%s - Jematell Homes"
    // template; empty/brand titles pin the bare brand name (old behavior).
    title:
      !t || t.toLowerCase() === brand.toLowerCase() ? { absolute: brand } : t,
    description,
    alternates: { canonical },
    robots: p.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      type: p.type || "website",
      url: canonical,
      images: [image],
      siteName: brand,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
