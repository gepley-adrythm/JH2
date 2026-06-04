/**
 * siteMeta.ts — derived, SEO-facing facts about the site. Pulls from siteConfig
 * (the single source of truth) and exposes the production origin, default head
 * values, a URL absolutizer, and the site-wide JSON-LD graph (emitted once per
 * page). Page-specific JSON-LD lives in jsonld.ts.
 */
import { siteConfig } from "../config/siteConfig";

/** Production origin used for canonical URLs, OG tags, sitemap, and JSON-LD. */
export const SITE_URL = "https://www.jematellhomes.com";

export const DEFAULT_DESCRIPTION =
  "Jematell Homes is a family-owned Arizona custom home builder serving Scottsdale, Rio Verde, and the greater Phoenix metro: semi-custom and fully custom homes built with passion, integrity, and a personal touch.";

export const DEFAULT_OG_IMAGE = "/opengraph.jpg";

/** Turn a site-relative path (or pass-through absolute URL) into an absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith("/") ? pathOrUrl : "/" + pathOrUrl);
}

/**
 * The site-wide JSON-LD graph: Organization + GeneralContractor (LocalBusiness)
 * + WebSite. Emitted exactly once per page. Page components must NOT re-emit any
 * of these @types — they add only page-specific types (Service, BlogPosting,
 * BreadcrumbList, FAQPage, etc.).
 */
export function buildSiteJsonLd(): object[] {
  const { brand, contact, social } = siteConfig;
  const addr = contact.address;
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: addr.street,
    addressLocality: addr.city,
    addressRegion: addr.region,
    postalCode: addr.postalCode,
    addressCountry: addr.country,
  };
  const sameAs = [social.instagram, social.facebook];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: brand.name,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: contact.email.display,
    telephone: contact.phone.display,
    address: postalAddress,
    sameAs,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": SITE_URL + "/#business",
    name: brand.name,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl("/images/logo.png"),
    telephone: contact.phone.display,
    email: contact.email.display,
    priceRange: "$$$",
    address: postalAddress,
    areaServed: [
      "Scottsdale",
      "Rio Verde",
      "Phoenix",
      "Cave Creek",
      "Fountain Hills",
      "Carefree",
      "Casa Grande",
      "Apache Junction",
    ].map((name) => ({ "@type": "City", name })),
    parentOrganization: { "@id": SITE_URL + "/#organization" },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "/#website",
    url: SITE_URL,
    name: brand.name,
    publisher: { "@id": SITE_URL + "/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: SITE_URL + "/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return [organization, localBusiness, website];
}
