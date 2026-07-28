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

/** The old formatTitle logic: brands every non-empty title, pins the bare brand otherwise. */
export function formatTitle(title?: string): string {
  const brand = siteConfig.brand.name;
  const t = (title || "").trim();
  if (!t || t.toLowerCase() === brand.toLowerCase()) return brand;
  return `${t} - ${brand}`;
}

export function pageMetadata(p: PageSeo): Metadata {
  const brand = siteConfig.brand.name;
  const description = p.description || DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(p.canonical);
  const image = absoluteUrl(p.image || DEFAULT_OG_IMAGE);
  const fullTitle = formatTitle(p.title);
  // The root route needs its canonical/og:url emitted with the trailing slash
  // ("https://www.jematellhomes.com/", matching the old build and sitemap.xml),
  // but Next's metadata resolver normalizes "/" to the bare origin under
  // trailingSlash:false. So for "/" we omit both here and app/page.tsx renders
  // the <link rel="canonical"> and <meta property="og:url"> tags itself
  // (React hoists them into <head>).
  const isRoot = p.canonical === "/";
  return {
    // Absolute title, NOT the root layout's "%s - Jematell Homes" template:
    // Next does not apply a layout's title.template to a page in the same
    // segment, so the home page (app/page.tsx) would lose the brand suffix.
    // formatTitle() reproduces the template output on every route.
    title: { absolute: fullTitle },
    description,
    ...(isRoot ? {} : { alternates: { canonical } }),
    robots: p.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      type: p.type || "website",
      locale: "en_US",
      ...(isRoot ? {} : { url: canonical }),
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
