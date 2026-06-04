const BASE = import.meta.env.BASE_URL || "/";

export const siteConfig = {
  businessName: "Jematell Homes",

  websiteUrl: "https://jematellhomes.com",
  websiteLabel: "jematellhomes.com",

  phone: {
    display: "(602) 421-5576",
    href: "tel:+16024215576",
  },

  links: {
    privacy: "/privacy",
  },

  images: {
    contactDesktop: `${BASE}images/cta-bg.jpg`,
    contactMobile: `${BASE}images/cta-bg.jpg`,
  },

  conversionValue: {
    newContact: 50,
    existingContact: 1,
  },
} as const;

export type SiteConfig = typeof siteConfig;
