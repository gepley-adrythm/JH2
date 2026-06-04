import type {
  CategoryView,
  DuplicateMatch,
  FaqDetail,
  FaqSeed,
  FaqSummary,
  NormalizedItem,
  TopicView,
} from "./types";

// A Dataset is an in-memory view over normalized FAQ items + category/topic
// metadata. It is produced both from the DB (repo.ts) and directly from the
// seed (buildDatasetFromSeed) so renderers and the validator share one code path.

export interface Dataset {
  all(): NormalizedItem[];
  featured(): NormalizedItem[];
  getItem(slug: string): NormalizedItem | undefined;
  summaries(): FaqSummary[];
  categories(): CategoryView[];
  getCategory(slug: string): CategoryView | undefined;
  topics(): TopicView[];
  getTopic(slug: string): TopicView | undefined;
  toSummary(item: NormalizedItem): FaqSummary;
  toDetail(item: NormalizedItem): FaqDetail;
  related(item: NormalizedItem): FaqSummary[];
  search(query: string): NormalizedItem[];
  checkDuplicate(query: string): DuplicateMatch[];
}

interface DatasetInput {
  categories: { slug: string; title: string; description: string; metaDescription: string; sortOrder: number }[];
  topics: { slug: string; title: string; description: string; metaDescription: string; sortOrder: number }[];
  items: NormalizedItem[];
}

function normalizeTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

// Jaccard similarity over question token sets — cheap intent-overlap heuristic
// used by the duplicate-intent guardrail.
function similarity(a: string, b: string): number {
  const sa = new Set(normalizeTokens(a));
  const sb = new Set(normalizeTokens(b));
  if (sa.size === 0 || sb.size === 0) return 0;
  let inter = 0;
  for (const t of sa) if (sb.has(t)) inter += 1;
  return inter / (sa.size + sb.size - inter);
}

export function makeDataset(input: DatasetInput): Dataset {
  const items = [...input.items].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.question.localeCompare(b.question),
  );
  const bySlug = new Map(items.map((i) => [i.slug, i]));
  const catBySlug = new Map(input.categories.map((c) => [c.slug, c]));
  const sortedCats = [...input.categories].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  );
  const sortedTopics = [...input.topics].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  );

  const toSummary = (item: NormalizedItem): FaqSummary => ({
    slug: item.slug,
    question: item.question,
    shortAnswer: item.shortAnswer,
    categorySlug: item.categorySlug,
    categoryTitle: catBySlug.get(item.categorySlug)?.title ?? item.categorySlug,
    topicSlugs: item.topicSlugs,
    tags: item.tags,
  });

  const toDetail = (item: NormalizedItem): FaqDetail => ({
    ...toSummary(item),
    answer: item.answer,
    answerHtml: item.answerHtml,
    metaDescription: item.metaDescription,
    relatedServiceSlugs: item.relatedServiceSlugs,
    relatedFaqSlugs: item.relatedFaqSlugs,
    pillarBlogSlug: item.pillarBlogSlug,
    updatedDate: item.updatedDate,
  });

  const related = (item: NormalizedItem): FaqSummary[] => {
    const out: FaqSummary[] = [];
    const seen = new Set<string>([item.slug]);
    for (const slug of item.relatedFaqSlugs) {
      const r = bySlug.get(slug);
      if (r && !seen.has(r.slug)) {
        out.push(toSummary(r));
        seen.add(r.slug);
      }
    }
    // Fill out with same-category siblings if explicit relations are sparse.
    if (out.length < 3) {
      for (const r of items) {
        if (out.length >= 3) break;
        if (!seen.has(r.slug) && r.categorySlug === item.categorySlug) {
          out.push(toSummary(r));
          seen.add(r.slug);
        }
      }
    }
    return out;
  };

  return {
    all: () => items,
    featured: () => items.filter((i) => i.featured),
    getItem: (slug) => bySlug.get(slug),
    summaries: () => items.map(toSummary),
    categories: () =>
      sortedCats.map((c) => ({
        slug: c.slug,
        title: c.title,
        description: c.description,
        metaDescription: c.metaDescription,
        items: items.filter((i) => i.categorySlug === c.slug).map(toSummary),
      })),
    getCategory: (slug) => {
      const c = catBySlug.get(slug);
      if (!c) return undefined;
      return {
        slug: c.slug,
        title: c.title,
        description: c.description,
        metaDescription: c.metaDescription,
        items: items.filter((i) => i.categorySlug === c.slug).map(toSummary),
      };
    },
    topics: () =>
      sortedTopics
        .map((t) => ({
          slug: t.slug,
          title: t.title,
          description: t.description,
          metaDescription: t.metaDescription,
          items: items.filter((i) => i.topicSlugs.includes(t.slug)).map(toSummary),
        }))
        .filter((t) => t.items.length > 0),
    getTopic: (slug) => {
      const t = sortedTopics.find((x) => x.slug === slug);
      if (!t) return undefined;
      const topicItems = items
        .filter((i) => i.topicSlugs.includes(t.slug))
        .map(toSummary);
      if (topicItems.length === 0) return undefined;
      return {
        slug: t.slug,
        title: t.title,
        description: t.description,
        metaDescription: t.metaDescription,
        items: topicItems,
      };
    },
    toSummary,
    toDetail,
    related,
    search: (query) => {
      const tokens = normalizeTokens(query);
      if (tokens.length === 0) return [];
      return items
        .map((i) => {
          const hay = `${i.question} ${i.shortAnswer} ${i.tags.join(" ")}`.toLowerCase();
          const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
          return { i, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.i);
    },
    checkDuplicate: (query) =>
      items
        .map((i) => ({
          slug: i.slug,
          question: i.question,
          score: Math.round(similarity(query, i.question) * 100) / 100,
        }))
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5),
  };
}

export function buildDatasetFromSeed(seed: FaqSeed): Dataset {
  const updatedDate = new Date("2026-01-01T00:00:00.000Z").toISOString();
  const items: NormalizedItem[] = seed.items.map((it) => ({
    slug: it.slug,
    question: it.question,
    shortAnswer: it.shortAnswer,
    categorySlug: it.categorySlug,
    categoryTitle:
      seed.categories.find((c) => c.slug === it.categorySlug)?.title ??
      it.categorySlug,
    topicSlugs: it.topicSlugs ?? [],
    tags: it.tags ?? [],
    answer: it.answer,
    answerHtml: it.answerHtml ?? null,
    metaDescription: it.metaDescription,
    relatedServiceSlugs: it.relatedServiceSlugs ?? [],
    relatedFaqSlugs: it.relatedFaqSlugs ?? [],
    pillarBlogSlug: it.pillarBlogSlug ?? null,
    updatedDate,
    featured: it.featured ?? false,
    sortOrder: it.sortOrder ?? 0,
  }));
  return makeDataset({
    categories: seed.categories.map((c) => ({
      slug: c.slug,
      title: c.title,
      description: c.description,
      metaDescription: c.metaDescription,
      sortOrder: c.sortOrder ?? 0,
    })),
    topics: seed.topics.map((t) => ({
      slug: t.slug,
      title: t.title,
      description: t.description,
      metaDescription: t.metaDescription,
      sortOrder: t.sortOrder ?? 0,
    })),
    items,
  });
}
