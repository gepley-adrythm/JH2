import type { FaqSeed } from "./types";

// =============================================================================
// FAQ SEED — SINGLE SOURCE OF TRUTH
// =============================================================================
// This file is synced into the database on server boot (see sync.ts) and is the
// only place FAQ content is authored. The build-time validator and the SPA
// cross-link generator also read from here.
//
// !!! PLACEHOLDER CONTENT !!!
// Every entry below is a clearly-marked PLACEHOLDER. No business facts have been
// fabricated. The client will supply the real questions and answers in a content
// file; swap the `items` (and add real `categories`/`topics`) then re-run:
//   - server boot (re-syncs DB)
//   - pnpm --filter @workspace/api-server run faq:validate
//   - pnpm --filter @workspace/api-server run faq:crosslinks
//   - pnpm --filter @workspace/api-server run faq:registry
// =============================================================================

const PLACEHOLDER_NOTE =
  "PLACEHOLDER — replace with the real, sourced answer before publishing. " +
  "This entry only exists to exercise the FAQ pipeline (DB, SSR, schema.org, sitemap).";

export const faqSeed: FaqSeed = {
  categories: [
    {
      slug: "building-process",
      title: "The Building Process",
      description:
        "PLACEHOLDER — how a custom build comes together, from first conversation to final walkthrough.",
      metaDescription:
        "PLACEHOLDER meta description for the Building Process category — replace before publishing.",
      sortOrder: 1,
    },
    {
      slug: "costs-and-budget",
      title: "Costs & Budget",
      description:
        "PLACEHOLDER — understanding pricing, allowances, and how budgets are managed on a custom home.",
      metaDescription:
        "PLACEHOLDER meta description for the Costs & Budget category — replace before publishing.",
      sortOrder: 2,
    },
    {
      slug: "lots-and-locations",
      title: "Lots & Locations",
      description:
        "PLACEHOLDER — building on your own lot, finding land, and what differs by area.",
      metaDescription:
        "PLACEHOLDER meta description for the Lots & Locations category — replace before publishing.",
      sortOrder: 3,
    },
  ],
  topics: [
    {
      slug: "custom-home-timeline",
      title: "Custom Home Timeline",
      description:
        "PLACEHOLDER — questions about how long each phase of a custom home takes.",
      metaDescription:
        "PLACEHOLDER meta description for the Custom Home Timeline topic — replace before publishing.",
      sortOrder: 1,
    },
    {
      slug: "building-on-your-lot",
      title: "Building On Your Lot",
      description:
        "PLACEHOLDER — questions specific to building on land you already own.",
      metaDescription:
        "PLACEHOLDER meta description for the Building On Your Lot topic — replace before publishing.",
      sortOrder: 2,
    },
  ],
  items: [
    {
      slug: "how-long-does-it-take-to-build-a-custom-home",
      question:
        "[PLACEHOLDER] How long does it take to build a custom home in Arizona?",
      answer: PLACEHOLDER_NOTE,
      answerHtml: `<p>${PLACEHOLDER_NOTE}</p><p>Replace this rich-text body with the real answer (paragraphs, lists, links) once the content file is provided.</p>`,
      shortAnswer:
        "PLACEHOLDER short answer (target 40-60 words). This concise summary is used in the FAQPage structured data and the meta description only — it is never shown as visible body copy. Replace it with the real, sourced one-paragraph answer before this FAQ is published.",
      metaDescription:
        "PLACEHOLDER meta description — replace before publishing.",
      categorySlug: "building-process",
      topicSlugs: ["custom-home-timeline"],
      tags: ["timeline", "custom-home", "process"],
      relatedFaqSlugs: ["what-are-construction-allowances"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "building-your-dream-home-in-2023",
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "what-are-construction-allowances",
      question: "[PLACEHOLDER] What are construction allowances and how do they work?",
      answer: PLACEHOLDER_NOTE,
      answerHtml: `<p>${PLACEHOLDER_NOTE}</p>`,
      shortAnswer:
        "PLACEHOLDER short answer (target 40-60 words) describing what an allowance is in a construction budget and how selections above or below it affect the final price. Schema/meta only — replace with the real, sourced answer before publishing.",
      metaDescription:
        "PLACEHOLDER meta description — replace before publishing.",
      categorySlug: "costs-and-budget",
      topicSlugs: [],
      tags: ["budget", "allowances", "pricing"],
      relatedFaqSlugs: ["how-long-does-it-take-to-build-a-custom-home"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "custom-home-budget-allowances-change-orders",
      featured: true,
      sortOrder: 2,
    },
    {
      slug: "can-i-build-on-my-own-lot",
      question: "[PLACEHOLDER] Can I build a custom home on a lot I already own?",
      answer: PLACEHOLDER_NOTE,
      answerHtml: `<p>${PLACEHOLDER_NOTE}</p>`,
      shortAnswer:
        "PLACEHOLDER short answer (target 40-60 words) covering whether and how you can build on land you already own, and the first checks to run on an existing lot. Schema/meta only — replace with the real, sourced answer before publishing.",
      metaDescription:
        "PLACEHOLDER meta description — replace before publishing.",
      categorySlug: "lots-and-locations",
      topicSlugs: ["building-on-your-lot"],
      tags: ["lot", "land", "build-on-your-lot"],
      relatedFaqSlugs: ["what-should-i-check-before-buying-a-lot"],
      relatedServiceSlugs: ["build-on-your-lot"],
      pillarBlogSlug: "building-on-your-own-lot-arizona",
      featured: false,
      sortOrder: 3,
    },
    {
      slug: "what-should-i-check-before-buying-a-lot",
      question:
        "[PLACEHOLDER] What should I check before buying a lot to build on?",
      answer: PLACEHOLDER_NOTE,
      answerHtml: `<p>${PLACEHOLDER_NOTE}</p>`,
      shortAnswer:
        "PLACEHOLDER short answer (target 40-60 words) listing the due-diligence items — utilities, access, soils, setbacks, HOA — to verify before buying a building lot. Schema/meta only — replace with the real, sourced answer before publishing.",
      metaDescription:
        "PLACEHOLDER meta description — replace before publishing.",
      categorySlug: "lots-and-locations",
      topicSlugs: ["building-on-your-lot"],
      tags: ["lot", "due-diligence", "land"],
      relatedFaqSlugs: ["can-i-build-on-my-own-lot"],
      relatedServiceSlugs: ["buy-a-lot-with-us"],
      pillarBlogSlug:
        "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
      featured: false,
      sortOrder: 4,
    },
    {
      slug: "what-are-the-steps-of-the-building-process",
      question: "[PLACEHOLDER] What are the steps of the custom home building process?",
      answer: PLACEHOLDER_NOTE,
      answerHtml: `<p>${PLACEHOLDER_NOTE}</p>`,
      shortAnswer:
        "PLACEHOLDER short answer (target 40-60 words) outlining the major phases of a custom build from design and permitting through construction and handover. Schema/meta only — replace with the real, sourced answer before publishing.",
      metaDescription:
        "PLACEHOLDER meta description — replace before publishing.",
      categorySlug: "building-process",
      topicSlugs: ["custom-home-timeline"],
      tags: ["process", "phases", "custom-home"],
      relatedFaqSlugs: ["how-long-does-it-take-to-build-a-custom-home"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "building-your-dream-home-in-2023",
      featured: true,
      sortOrder: 5,
    },
  ],
};
