import { sql, type SQL } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  index,
  uniqueIndex,
  customType,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Postgres full-text search vector. Drizzle has no first-class tsvector type,
// so we declare a minimal custom type and let Postgres compute it.
const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const faqCategories = pgTable(
  "faq_categories",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    // Schema/meta only — never rendered as visible body copy.
    metaDescription: text("meta_description").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("faq_categories_slug_idx").on(t.slug)],
);

export const faqItems = pgTable(
  "faq_items",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    question: text("question").notNull(),
    // Plain-text answer — used for schema.org acceptedAnswer text.
    answer: text("answer").notNull(),
    // Optional rich HTML for on-page display (authored, trusted).
    answerHtml: text("answer_html"),
    // 40-60 word concise answer — used in FAQPage schema + meta, never as visible body.
    shortAnswer: text("short_answer").notNull(),
    // <meta name="description"> only — never rendered as visible body.
    metaDescription: text("meta_description").notNull(),
    // Relational by slug (seed is the source of truth; upserts key on slug).
    categorySlug: text("category_slug").notNull(),
    topicSlugs: text("topic_slugs")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    tags: text("tags")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    relatedFaqSlugs: text("related_faq_slugs")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    relatedServiceSlugs: text("related_service_slugs")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    // Blog post this FAQ rolls up to (pillar page); maps to /blog/:slug on the SPA.
    pillarBlogSlug: text("pillar_blog_slug"),
    featured: boolean("featured").notNull().default(false),
    active: boolean("active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedDate: timestamp("published_date", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedDate: timestamp("updated_date", { withTimezone: true })
      .notNull()
      .defaultNow(),
    searchVector: tsvector("search_vector").generatedAlwaysAs(
      (): SQL =>
        sql`to_tsvector('english', coalesce(question, '') || ' ' || coalesce(short_answer, '') || ' ' || coalesce(answer, ''))`,
    ),
  },
  (t) => [
    uniqueIndex("faq_items_slug_idx").on(t.slug),
    index("faq_items_category_idx").on(t.categorySlug),
    index("faq_items_search_idx").using("gin", t.searchVector),
  ],
);

export const insertFaqCategorySchema = createInsertSchema(faqCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFaqItemSchema = createInsertSchema(faqItems).omit({
  id: true,
  publishedDate: true,
  updatedDate: true,
});

export type FaqCategoryRow = typeof faqCategories.$inferSelect;
export type FaqItemRow = typeof faqItems.$inferSelect;
export type InsertFaqCategory = z.infer<typeof insertFaqCategorySchema>;
export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;
