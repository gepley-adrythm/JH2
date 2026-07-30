import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Providers from "@/Providers";
import { SITE_URL, DEFAULT_DESCRIPTION, buildSiteJsonLd } from "@/seo/siteMeta";
import { siteConfig } from "@/config/siteConfig";
import "@/index.css";
import "@/transitions.css";

/**
 * Fonts are self-hosted via next/font (subset, preloaded, zero external
 * requests) — this replaces the render-blocking Google Fonts CDN stylesheet
 * from the Vite build. index.css consumes the two CSS variables below in
 * --font-heading / --font-body.
 */
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.brand.name,
    template: `%s - ${siteConfig.brand.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f4f2ec",
};

function jsonLdScript(obj: object): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {/* Site-wide JSON-LD graph (Organization + GeneralContractor + WebSite),
            emitted exactly once per page. Page-specific JSON-LD is added by each
            page via <JsonLd>. */}
        {buildSiteJsonLd().map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            data-site-jsonld=""
            dangerouslySetInnerHTML={{ __html: jsonLdScript(obj) }}
          />
        ))}
        {/* Speculation Rules: prefetch a same-origin page once the pointer has
            settled on its link, so the click lands on an already-fetched
            document. This is a 1,000+ page reference site where readers move
            between pages constantly, and every page now costs ~10KB on the
            wire (the CSS is shared and immutable), so prefetching is cheap.
            "moderate" eagerness, not "eager": it waits for genuine hover
            intent instead of speculating on everything in the viewport.
            Deliberately prefetch, NOT prerender — prerender would execute each
            page's JS ahead of the click and cost main-thread time on the page
            the reader is actually looking at. Ignored by browsers without
            support, and invisible to crawlers. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  source: "document",
                  where: { and: [{ href_matches: "/*" }, { not: { href_matches: "/api/*" } }] },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
