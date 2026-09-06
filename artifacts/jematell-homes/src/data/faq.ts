/**
 * faq.ts — the web app's single entry point to FAQ content. The seed and the
 * normalizer live in the shared `@workspace/faq` lib (also consumed by the
 * api-server). We build the in-memory dataset once at module load; it is pure
 * (no DB), so it works identically during SSG and in the browser.
 */
import { buildDatasetFromSeed, faqSeed, type FaqSummary } from "@workspace/faq";
import { locations } from "../config/siteConfig";

export const faqDataset = buildDatasetFromSeed(faqSeed);

/**
 * Return FAQ summaries whose `relatedServiceSlugs` overlap any of the given
 * service slugs, most-relevant first (more overlap wins; ties keep the
 * dataset's sortOrder). Used to surface "Common questions" on high-intent
 * service and location pages. Pulls straight from the shared FAQ data — no
 * hardcoded question lists.
 */
export function relatedFaqsForServices(
  serviceSlugs: string[],
  limit = 4,
): FaqSummary[] {
  if (serviceSlugs.length === 0) return [];
  const wanted = new Set(serviceSlugs);
  return faqDataset
    .all()
    .map((item) => ({
      item,
      overlap: item.relatedServiceSlugs.filter((s) => wanted.has(s)).length,
    }))
    .filter((m) => m.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((m) => faqDataset.toSummary(m.item));
}

/** Map a related-service slug to its on-site label + route. */
export const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
  "custom-homes": { label: "Custom Homes", href: "/custom-homes" },
  "spec-homes": { label: "Spec Homes", href: "/spec-homes" },
  "floor-plans": { label: "Floor Plans", href: "/floor-plans" },
  "build-on-your-lot": { label: "Build on Your Lot", href: "/build-on-your-lot" },
  "buy-a-lot-with-us": { label: "Buy a Lot With Us", href: "/buy-a-lot-with-us" },
  "where-we-build": { label: "Where We Build", href: "/where-we-build" },
  // The pages below are not authored in the seed today; the interlink resolver
  // derives them from a question's topic and the city it names, so a reader
  // who just learned what a draw schedule is lands on the financing page and a
  // Rio Verde well question lands on the Rio Verde page, not only on
  // /custom-homes. Keys are stable slugs the seed MAY author later.
  financing: { label: "Construction Financing", href: "/financing" },
  gallery: { label: "Homes We Have Built", href: "/gallery" },
  warranty: { label: "Our Home Warranty", href: "/warranty" },
  "rv-garage-build": { label: "An RV Garage Home We Built in Rio Verde", href: "/gallery/rio-verde-rv" },
  ...Object.fromEntries(
    locations.map((l) => [
      `where-we-build/${l.slug}`,
      { label: `Custom Homes in ${l.name}`, href: `/where-we-build/${l.slug}` },
    ]),
  ),
};

/** All FAQ in-app paths — consumed by the prerender route list. */
export function faqRoutes(): string[] {
  const routes = ["/faq"];
  for (const t of faqDataset.topics()) routes.push(`/faq/topics/${t.slug}`);
  for (const i of faqDataset.all()) routes.push(`/faq/${i.slug}`);
  return routes;
}
