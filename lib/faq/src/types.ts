// Shared types for the FAQ module.
//
// The seed file (seed.ts) is the single source of truth. It is synced into the
// database on boot. Both the DB-backed repo and the hermetic seed-based builder
// produce the same normalized shapes (below) which the renderers consume — so
// the build-time validator can render every page without a database.

export interface SeedCategory {
  slug: string;
  title: string;
  description: string;
  /** Schema/meta only — never rendered as visible body copy. */
  metaDescription: string;
  sortOrder?: number;
}

export interface SeedTopic {
  slug: string;
  title: string;
  description: string;
  /** Schema/meta only — never rendered as visible body copy. */
  metaDescription: string;
  sortOrder?: number;
}

export interface SeedItem {
  slug: string;
  question: string;
  /**
   * Optional <title> override. The question stays the H1 and the QAPage
   * question; this only changes what the search result shows. Keep it under
   * about 50 characters so it survives Google's ~60 character cut with the
   * brand suffix. Absent = the question is the title (the default for every
   * page that has not been tuned against Search Console data).
   */
  seoTitle?: string;
  /** Plain-text answer — used for schema.org acceptedAnswer text. */
  answer: string;
  /** Optional rich HTML for on-page display (authored, trusted). */
  answerHtml?: string;
  /** 40-60 words — used in FAQPage schema + meta, never as visible body. */
  shortAnswer: string;
  /** <meta name="description"> only — never rendered as visible body. */
  metaDescription: string;
  categorySlug: string;
  topicSlugs?: string[];
  tags?: string[];
  relatedFaqSlugs?: string[];
  relatedServiceSlugs?: string[];
  /** Blog post this FAQ rolls up to (pillar page); maps to /blog/:slug. */
  pillarBlogSlug?: string | null;
  featured?: boolean;
  sortOrder?: number;
}

export interface FaqSeed {
  categories: SeedCategory[];
  topics: SeedTopic[];
  items: SeedItem[];
}

// Normalized shapes consumed by renderers / API.

export interface FaqSummary {
  slug: string;
  question: string;
  shortAnswer: string;
  categorySlug: string;
  categoryTitle: string;
  topicSlugs: string[];
  tags: string[];
}

export interface FaqDetail extends FaqSummary {
  seoTitle: string | null;
  answer: string;
  answerHtml: string | null;
  metaDescription: string;
  relatedServiceSlugs: string[];
  relatedFaqSlugs: string[];
  pillarBlogSlug: string | null;
  updatedDate: string;
}

export interface NormalizedItem extends FaqDetail {
  featured: boolean;
  sortOrder: number;
}

export interface TopicView {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  items: FaqSummary[];
}

export interface CategoryView {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  items: FaqSummary[];
}

export interface DuplicateMatch {
  slug: string;
  question: string;
  score: number;
}
