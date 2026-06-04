import { db, faqCategories, faqItems } from "@workspace/db";
import { notInArray, sql } from "drizzle-orm";
import type { Logger } from "pino";
import { faqSeed } from "./seed";

// Upsert the seed into the database (idempotent, keyed on slug). Items no longer
// present in the seed are deactivated (not deleted) so URLs can 410/redirect.
export async function syncFaqSeed(
  log?: Logger,
): Promise<{ categories: number; items: number; deactivated: number }> {
  for (const c of faqSeed.categories) {
    await db
      .insert(faqCategories)
      .values({
        slug: c.slug,
        title: c.title,
        description: c.description,
        metaDescription: c.metaDescription,
        sortOrder: c.sortOrder ?? 0,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: faqCategories.slug,
        set: {
          title: c.title,
          description: c.description,
          metaDescription: c.metaDescription,
          sortOrder: c.sortOrder ?? 0,
          updatedAt: new Date(),
        },
      });
  }

  for (const it of faqSeed.items) {
    await db
      .insert(faqItems)
      .values({
        slug: it.slug,
        question: it.question,
        answer: it.answer,
        answerHtml: it.answerHtml ?? null,
        shortAnswer: it.shortAnswer,
        metaDescription: it.metaDescription,
        categorySlug: it.categorySlug,
        topicSlugs: it.topicSlugs ?? [],
        tags: it.tags ?? [],
        relatedFaqSlugs: it.relatedFaqSlugs ?? [],
        relatedServiceSlugs: it.relatedServiceSlugs ?? [],
        pillarBlogSlug: it.pillarBlogSlug ?? null,
        featured: it.featured ?? false,
        active: true,
        sortOrder: it.sortOrder ?? 0,
        updatedDate: new Date(),
      })
      .onConflictDoUpdate({
        target: faqItems.slug,
        set: {
          question: it.question,
          answer: it.answer,
          answerHtml: it.answerHtml ?? null,
          shortAnswer: it.shortAnswer,
          metaDescription: it.metaDescription,
          categorySlug: it.categorySlug,
          topicSlugs: it.topicSlugs ?? [],
          tags: it.tags ?? [],
          relatedFaqSlugs: it.relatedFaqSlugs ?? [],
          relatedServiceSlugs: it.relatedServiceSlugs ?? [],
          pillarBlogSlug: it.pillarBlogSlug ?? null,
          featured: it.featured ?? false,
          active: true,
          sortOrder: it.sortOrder ?? 0,
          updatedDate: new Date(),
        },
      });
  }

  const seedSlugs = faqSeed.items.map((i) => i.slug);
  const deactivated = await db
    .update(faqItems)
    .set({ active: false, updatedDate: new Date() })
    .where(
      seedSlugs.length > 0
        ? notInArray(faqItems.slug, seedSlugs)
        : sql`true`,
    )
    .returning({ slug: faqItems.slug });

  const result = {
    categories: faqSeed.categories.length,
    items: faqSeed.items.length,
    deactivated: deactivated.length,
  };
  log?.info({ faqSync: result }, "FAQ seed synced");
  return result;
}
