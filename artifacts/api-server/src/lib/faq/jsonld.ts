import type { FaqDetail, FaqSummary } from "@workspace/faq";

// schema.org builders. Each returns a plain object; the renderer serializes them
// with jsonLdScript(). The build-time validator asserts the @type on each page.

export function faqPageJsonLd(
  items: FaqSummary[],
  pageUrl: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faqpage`,
    url: pageUrl,
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      url: `${pageUrl.split("#")[0].replace(/\/$/, "")}`,
      acceptedAnswer: {
        "@type": "Answer",
        // shortAnswer is the schema/AI answer — concise, never rendered visibly.
        text: i.shortAnswer,
      },
    })),
  };
}

export function qaPageJsonLd(
  detail: FaqDetail,
  pageUrl: string,
): Record<string, unknown> {
  return {
    "@type": "QAPage",
    "@id": `${pageUrl}#qapage`,
    url: pageUrl,
    mainEntity: {
      "@type": "Question",
      name: detail.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        // Full plain-text answer — matches the visible on-page answer.
        text: detail.answer,
        url: pageUrl,
      },
    },
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

// Detail pages emit a single @graph holding exactly QAPage + BreadcrumbList.
export function detailGraphJsonLd(
  detail: FaqDetail,
  pageUrl: string,
  crumbs: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [qaPageJsonLd(detail, pageUrl), breadcrumbJsonLd(crumbs)],
  };
}
