/**
 * siteConfig.ts — the single source of truth for brand, contact, social, and
 * the canonical service/location lists. Components, the nav, and the footer all
 * read from here; no brand or contact string is hardcoded in JSX. Re-skin or
 * re-point the whole site by editing this file.
 */

export interface LocationItem {
  /** URL slug under /where-we-build/. */
  slug: string;
  name: string;
}

export interface ServiceItem {
  label: string;
  href: string;
}

/** The regions Jematell builds in, in display order. */
export const locations: LocationItem[] = [
  { slug: "scottsdale", name: "Scottsdale" },
  { slug: "rio-verde", name: "Rio Verde" },
  { slug: "phoenix", name: "Phoenix" },
  { slug: "cave-creek", name: "Cave Creek" },
  { slug: "fountain-hills", name: "Fountain Hills" },
  { slug: "carefree", name: "Carefree" },
  { slug: "casa-grande", name: "Casa Grande" },
  { slug: "apache-junction", name: "Apache Junction" },
];

/** The "Homes" offering pages. */
export const services: ServiceItem[] = [
  { label: "Custom Homes", href: "/custom-homes" },
  { label: "Spec Homes", href: "/spec-homes" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Gallery", href: "/gallery" },
];

/** Build the canonical route for a location slug. */
export const locationHref = (slug: string) => `/where-we-build/${slug}`;

export const siteConfig = {
  brand: { name: "Jematell Homes", href: "/" },
  /** The universal CTA. It opens the contact form rather than navigating. */
  cta: { label: "Start Your Build" },
  blurb:
    "A family-owned Arizona home builder bringing passion, integrity, and a personal touch to every project.",
  tagline: "Quietly Luxurious Arizona Living.",
  contact: {
    phone: { display: "(602) 421-5576", href: "tel:6024215576" },
    email: { display: "info@jematellhomes.com", href: "mailto:info@jematellhomes.com" },
    address: {
      lines: ["8350 E Raintree Dr Ste 210", "Scottsdale, AZ 85260"],
      street: "8350 E Raintree Dr Ste 210",
      city: "Scottsdale",
      region: "AZ",
      postalCode: "85260",
      country: "US",
    },
    roc: "ROC# 339367",
  },
  social: {
    instagram: "https://www.instagram.com/jematellhomes/",
    facebook: "https://www.facebook.com/JematellHomes/",
  },
} as const;
