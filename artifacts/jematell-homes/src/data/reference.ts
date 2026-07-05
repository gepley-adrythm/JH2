/**
 * reference.ts — the web app's entry point to the Reference Library: adopted
 * building codes by city, Arizona building-law statutes, the residential code
 * explained, and guard-gated community design guidelines. Authored as markdown
 * in the content repo, converted to reference.json (title + rich HTML +
 * primary-source attribution + related links). Pure data — SSG and browser.
 */
import referenceJson from "./reference.json";

export interface ReferenceSource {
  title: string;
  url: string;
}
export interface ReferenceEntry {
  slug: string;
  module: string;
  title: string;
  shortSummary: string;
  bodyHtml: string;
  metaDescription: string;
  category: string;
  refSchemaType: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceLicense: string;
  relatedTerms: string[];
  relatedFaqs: string[];
  relatedRefs: string[];
  sources: ReferenceSource[];
  updatedDate: string;
}

export interface ReferenceModuleMeta {
  slug: string;
  title: string;
  description: string;
}

/** The four Reference Library modules, in display order. */
export const REFERENCE_MODULES: ReferenceModuleMeta[] = [
  {
    slug: "building-codes",
    title: "City Building Codes",
    description:
      "The adopted building codes, permit requirements, inspections, zoning, and fees for every city and county we build in.",
  },
  {
    slug: "arizona-building-law",
    title: "Arizona Building Law",
    description:
      "The Arizona Revised Statutes that govern custom home building, contractors, liens, water, and land use, explained section by section.",
  },
  {
    slug: "code-library",
    title: "Residential Code Explained",
    description:
      "The International Residential Code in plain language, section by section, as it applies to building a home in the Arizona desert.",
  },
  {
    slug: "community-design-guidelines",
    title: "Community Design Guidelines",
    description:
      "How the design-review standards of Arizona's guard-gated and master-planned communities shape what you can build.",
  },
];

export const referenceEntries = referenceJson as unknown as ReferenceEntry[];

const byKey = new Map(referenceEntries.map((e) => [`${e.module}/${e.slug}`, e]));
const moduleBySlug = new Map(REFERENCE_MODULES.map((m) => [m.slug, m]));

export function getReferenceModule(slug: string): ReferenceModuleMeta | undefined {
  return moduleBySlug.get(slug);
}
export function getReferenceEntry(module: string, slug: string): ReferenceEntry | undefined {
  return byKey.get(`${module}/${slug}`);
}
export function getReferenceByKey(key: string): ReferenceEntry | undefined {
  return byKey.get(key);
}

/** Entries in a module, grouped by category (each group sorted by title). */
export function referencesByCategory(module: string): { category: string; entries: ReferenceEntry[] }[] {
  const groups = new Map<string, ReferenceEntry[]>();
  for (const e of referenceEntries.filter((x) => x.module === module)) {
    (groups.get(e.category) ?? groups.set(e.category, []).get(e.category)!).push(e);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, entries]) => ({
      category,
      entries: entries.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

/** How many entries each module holds — shown on the hub cards. */
export function moduleCount(module: string): number {
  return referenceEntries.filter((e) => e.module === module).length;
}

/** All Reference Library in-app paths — consumed by the prerender route list. */
export function referenceRoutes(): string[] {
  const routes = ["/reference-library"];
  for (const m of REFERENCE_MODULES) routes.push(`/reference-library/${m.slug}`);
  for (const e of referenceEntries) routes.push(`/reference-library/${e.module}/${e.slug}`);
  return routes;
}
