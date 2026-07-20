/**
 * cleanTitle.ts: pure title cleanup, ported verbatim from the old
 * src/pages/ContentPage.tsx (used for <Seo> titles and hero headings).
 * Deliberately data-free: this module is imported by the client component
 * src/views/ContentPage.tsx, so it must NOT pull src/data/pages (208KB of
 * corpus JSON) into any client import graph. Server-side metadata helpers
 * live in ./contentPageMeta.ts, which imports this.
 */
export function cleanTitle(t: string) {
  return t
    .replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "")
    .replace(/\s*\|.*$/, "")
    .replace(/\s*[—–]\s*(Contact Us|Learn More|Explore|Home Warranty|Privacy Options).*$/i, "")
    .trim();
}
