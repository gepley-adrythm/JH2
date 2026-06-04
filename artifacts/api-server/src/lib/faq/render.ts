import type { Dataset } from "./dataset";
import { escapeHtml, sanitizeHtml } from "./html";
import {
  breadcrumbJsonLd,
  detailGraphJsonLd,
  faqPageJsonLd,
  qaPageJsonLd,
} from "./jsonld";
import { ctaStrip, renderShell } from "./shell";
import type { FaqSummary } from "./types";

const ARROW = `<span class="arrow" aria-hidden="true">&rarr;</span>`;
const SITE = "Jematell Homes";

function questionListItem(item: FaqSummary): string {
  return `<li><a href="/faq/${item.slug}" data-testid="faq-link-${item.slug}">${escapeHtml(
    item.question,
  )}${ARROW}</a></li>`;
}

function answerHtml(answer: string, answerHtmlField: string | null): string {
  if (answerHtmlField && answerHtmlField.trim()) {
    return sanitizeHtml(answerHtmlField);
  }
  return answer
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
    .join("");
}

// ----- /faq (FAQPage) -----
export function renderFaqIndex(dataset: Dataset, baseUrl: string): string {
  const url = `${baseUrl}/faq`;
  const categories = dataset.categories().filter((c) => c.items.length > 0);
  const topics = dataset.topics();

  const topicChips = topics.length
    ? `<div class="topic-chips" aria-label="Topics">${topics
        .map(
          (t) =>
            `<a href="/faq/topics/${t.slug}" data-testid="faq-topic-${t.slug}">${escapeHtml(
              t.title,
            )}</a>`,
        )
        .join("")}</div>`
    : "";

  const sections = categories
    .map(
      (c) => `<section class="faq-cat" data-testid="faq-category-${c.slug}">
<h2>${escapeHtml(c.title)}</h2>
${c.description ? `<p class="cat-desc">${escapeHtml(c.description)}</p>` : ""}
<ul class="faq-list">${c.items.map(questionListItem).join("")}</ul>
</section>`,
    )
    .join("");

  const body = `<section class="faq-hero"><div class="container">
<div class="breadcrumb"><a href="/">Home</a><span>/</span>FAQ</div>
<p class="eyebrow">Answers</p>
<h1>Frequently Asked Questions</h1>
<p>Clear, practical answers about designing and building a custom home in Arizona.</p>
${topicChips}
</div></section>
<main><div class="container">${sections}</div></main>
${ctaStrip}`;

  // Visible answers stay on detail pages; the hub schema uses concise shortAnswers.
  const allSummaries = dataset.summaries();

  return renderShell({
    title: `Frequently Asked Questions | ${SITE}`,
    metaDescription:
      "Answers to common questions about designing and building a custom home in Arizona — process, budget, lots, and locations.",
    canonical: url,
    jsonLd: [faqPageJsonLd(allSummaries, url)],
    body,
  });
}

// ----- /faq/:slug (QAPage + BreadcrumbList @graph) -----
export function renderFaqDetail(
  dataset: Dataset,
  slug: string,
  baseUrl: string,
): string | null {
  const item = dataset.getItem(slug);
  if (!item) return null;
  const detail = dataset.toDetail(item);
  const related = dataset.related(item);
  const url = `${baseUrl}/faq/${slug}`;

  const crumbs = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "FAQ", url: `${baseUrl}/faq` },
    {
      name: detail.categoryTitle,
      url: `${baseUrl}/faq#${detail.categorySlug}`,
    },
    { name: detail.question, url },
  ];

  const relatedHtml = related.length
    ? `<aside class="related" data-testid="faq-related"><h3>Related questions</h3><ul>${related
        .map(
          (r) =>
            `<li><a href="/faq/${r.slug}" data-testid="faq-related-${r.slug}">${escapeHtml(
              r.question,
            )}</a></li>`,
        )
        .join("")}</ul></aside>`
    : "";

  const pillarHtml = detail.pillarBlogSlug
    ? `<a class="pillar-link" href="/blog/${detail.pillarBlogSlug}" data-testid="faq-pillar-link">Read the full guide &rarr;</a>`
    : "";

  const updated = detail.updatedDate.slice(0, 10);

  const body = `<section class="faq-hero"><div class="container">
<div class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/faq">FAQ</a><span>/</span>${escapeHtml(
    detail.categoryTitle,
  )}</div>
<h1>${escapeHtml(detail.question)}</h1>
</div></section>
<main><div class="container qa">
<div class="meta-row"><span class="pill">${escapeHtml(detail.categoryTitle)}</span><span>Updated ${escapeHtml(
    updated,
  )}</span></div>
<div class="answer" data-testid="faq-answer">${answerHtml(detail.answer, detail.answerHtml)}</div>
${pillarHtml}
${relatedHtml}
</div></main>
${ctaStrip}`;

  return renderShell({
    title: `${detail.question.replace(/^\[PLACEHOLDER\]\s*/, "")} | ${SITE}`,
    metaDescription: detail.metaDescription,
    canonical: url,
    jsonLd: [detailGraphJsonLd(detail, url, crumbs)],
    body,
  });
}

// ----- /faq/topics/:slug (FAQPage) -----
export function renderFaqTopic(
  dataset: Dataset,
  slug: string,
  baseUrl: string,
): string | null {
  const topic = dataset.getTopic(slug);
  if (!topic) return null;
  const url = `${baseUrl}/faq/topics/${slug}`;

  const body = `<section class="faq-hero"><div class="container">
<div class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/faq">FAQ</a><span>/</span>${escapeHtml(
    topic.title,
  )}</div>
<p class="eyebrow">Topic</p>
<h1>${escapeHtml(topic.title)}</h1>
${topic.description ? `<p>${escapeHtml(topic.description)}</p>` : ""}
</div></section>
<main><div class="container">
<ul class="faq-list">${topic.items.map(questionListItem).join("")}</ul>
</div></main>
${ctaStrip}`;

  return renderShell({
    title: `${topic.title} — FAQ | ${SITE}`,
    metaDescription: topic.metaDescription,
    canonical: url,
    jsonLd: [faqPageJsonLd(topic.items, url)],
    body,
  });
}

// Re-exported for the build-time validator.
export { breadcrumbJsonLd, faqPageJsonLd, qaPageJsonLd };
