/**
 * guides.ts — the web app's entry point to the Guides: long-form pillar
 * articles that walk the whole custom-home journey end to end, plus a complete
 * guide for each city we build in. Authored as markdown in the content repo,
 * converted to guides.json. Pure data — SSG and browser.
 */
import guidesJson from "./guides.json";

export interface GuideSource {
  title: string;
  url: string;
}
export interface Guide {
  slug: string;
  title: string;
  summary: string;
  bodyHtml: string;
  metaDescription: string;
  category: string;
  city: string;
  relatedFaqs: string[];
  relatedRefs: string[];
  relatedTerms: string[];
  relatedGuides: string[];
  sources: GuideSource[];
  updatedDate: string;
}

export const guides = guidesJson as unknown as Guide[];

const bySlug = new Map(guides.map((g) => [g.slug, g]));
export function getGuide(slug: string): Guide | undefined {
  return bySlug.get(slug);
}

/** Topic pillars first, then the per-city guides — the two ways people browse. */
export function guideGroups(): { label: string; guides: Guide[] }[] {
  const topic = guides.filter((g) => !g.city).sort((a, b) => a.title.localeCompare(b.title));
  const city = guides.filter((g) => g.city).sort((a, b) => a.city.localeCompare(b.city));
  const out: { label: string; guides: Guide[] }[] = [];
  if (topic.length) out.push({ label: "Guides by topic", guides: topic });
  if (city.length) out.push({ label: "Build in your city", guides: city });
  return out;
}

/** All guide in-app paths — consumed by the prerender route list. */
export function guideRoutes(): string[] {
  return ["/guides", ...guides.map((g) => `/guides/${g.slug}`)];
}
