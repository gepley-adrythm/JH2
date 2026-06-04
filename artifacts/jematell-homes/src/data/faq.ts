/**
 * faq.ts — the web app's single entry point to FAQ content. The seed and the
 * normalizer live in the shared `@workspace/faq` lib (also consumed by the
 * api-server). We build the in-memory dataset once at module load; it is pure
 * (no DB), so it works identically during SSG and in the browser.
 */
import { buildDatasetFromSeed, faqSeed } from "@workspace/faq";

export const faqDataset = buildDatasetFromSeed(faqSeed);

/** Map a related-service slug to its on-site label + route. */
export const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
  "custom-homes": { label: "Custom Homes", href: "/custom-homes" },
  "spec-homes": { label: "Spec Homes", href: "/spec-homes" },
  "floor-plans": { label: "Floor Plans", href: "/floor-plans" },
  "build-on-your-lot": { label: "Build on Your Lot", href: "/build-on-your-lot" },
  "buy-a-lot-with-us": { label: "Buy a Lot With Us", href: "/buy-a-lot-with-us" },
  "where-we-build": { label: "Where We Build", href: "/where-we-build" },
};

/** All FAQ in-app paths — consumed by the prerender route list. */
export function faqRoutes(): string[] {
  const routes = ["/faq"];
  for (const t of faqDataset.topics()) routes.push(`/faq/topics/${t.slug}`);
  for (const i of faqDataset.all()) routes.push(`/faq/${i.slug}`);
  return routes;
}
