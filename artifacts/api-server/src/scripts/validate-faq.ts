// Build-time FAQ validator.
//
// Renders every FAQ page from the SEED (no database needed) and asserts:
//   - /faq                -> exactly one JSON-LD block, @type FAQPage
//   - /faq/topics/:slug   -> exactly one JSON-LD block, @type FAQPage
//   - /faq/:slug          -> exactly one JSON-LD block, @graph = {QAPage, BreadcrumbList}
// Plus content guardrails: unique slugs, required fields, resolvable references,
// and duplicate-intent detection.
//
// Run: pnpm --filter @workspace/api-server run faq:validate

import { buildDatasetFromSeed } from "../lib/faq/dataset";
import { faqSeed } from "../lib/faq/seed";
import {
  renderFaqDetail,
  renderFaqIndex,
  renderFaqTopic,
} from "../lib/faq/render";

const BASE = "https://validate.local";
const errors: string[] = [];
const warnings: string[] = [];

function extractJsonLd(html: string): unknown[] {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const out: unknown[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]));
    } catch (e) {
      errors.push(`Invalid JSON-LD: ${(e as Error).message}`);
    }
  }
  return out;
}

function typeOf(node: unknown): string | undefined {
  if (node && typeof node === "object" && "@type" in node) {
    return (node as { "@type": string })["@type"];
  }
  return undefined;
}

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2),
  );
}

function similarity(a: string, b: string): number {
  const sa = tokens(a);
  const sb = tokens(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let inter = 0;
  for (const t of sa) if (sb.has(t)) inter += 1;
  return inter / (sa.size + sb.size - inter);
}

// ---- Content guardrails ----
const slugs = new Set<string>();
const itemSlugs = new Set(faqSeed.items.map((i) => i.slug));
const categorySlugs = new Set(faqSeed.categories.map((c) => c.slug));
const topicSlugs = new Set(faqSeed.topics.map((t) => t.slug));

for (const it of faqSeed.items) {
  if (slugs.has(it.slug)) errors.push(`Duplicate slug: ${it.slug}`);
  slugs.add(it.slug);

  for (const [field, val] of [
    ["question", it.question],
    ["answer", it.answer],
    ["shortAnswer", it.shortAnswer],
    ["metaDescription", it.metaDescription],
  ] as const) {
    if (!val || !val.trim()) errors.push(`${it.slug}: missing ${field}`);
  }

  if (!categorySlugs.has(it.categorySlug)) {
    errors.push(`${it.slug}: unknown categorySlug "${it.categorySlug}"`);
  }
  for (const t of it.topicSlugs ?? []) {
    if (!topicSlugs.has(t)) errors.push(`${it.slug}: unknown topicSlug "${t}"`);
  }
  for (const r of it.relatedFaqSlugs ?? []) {
    if (!itemSlugs.has(r)) {
      errors.push(`${it.slug}: relatedFaqSlug "${r}" does not exist`);
    }
  }

  const words = it.shortAnswer.trim().split(/\s+/).length;
  if (words < 25 || words > 80) {
    warnings.push(
      `${it.slug}: shortAnswer is ${words} words (target ~40-60).`,
    );
  }
}

// Duplicate intent across questions.
for (let i = 0; i < faqSeed.items.length; i++) {
  for (let j = i + 1; j < faqSeed.items.length; j++) {
    const a = faqSeed.items[i];
    const b = faqSeed.items[j];
    const score = similarity(a.question, b.question);
    if (score >= 0.6) {
      errors.push(
        `Duplicate intent (${score.toFixed(2)}): "${a.slug}" vs "${b.slug}"`,
      );
    } else if (score >= 0.4) {
      warnings.push(
        `Possible overlapping intent (${score.toFixed(2)}): "${a.slug}" vs "${b.slug}"`,
      );
    }
  }
}

// ---- JSON-LD per-page assertions ----
const dataset = buildDatasetFromSeed(faqSeed);

function assertSingleType(label: string, html: string, expected: string): void {
  const ld = extractJsonLd(html);
  if (ld.length !== 1) {
    errors.push(`${label}: expected exactly 1 JSON-LD block, got ${ld.length}`);
    return;
  }
  const t = typeOf(ld[0]);
  if (t !== expected) {
    errors.push(`${label}: expected @type ${expected}, got ${t ?? "none"}`);
  }
}

assertSingleType("/faq", renderFaqIndex(dataset, BASE), "FAQPage");

for (const topic of dataset.topics()) {
  const html = renderFaqTopic(dataset, topic.slug, BASE);
  if (!html) {
    errors.push(`/faq/topics/${topic.slug}: render returned null`);
    continue;
  }
  assertSingleType(`/faq/topics/${topic.slug}`, html, "FAQPage");
}

for (const item of dataset.all()) {
  const label = `/faq/${item.slug}`;
  const html = renderFaqDetail(dataset, item.slug, BASE);
  if (!html) {
    errors.push(`${label}: render returned null`);
    continue;
  }
  const ld = extractJsonLd(html);
  if (ld.length !== 1) {
    errors.push(`${label}: expected exactly 1 JSON-LD block, got ${ld.length}`);
    continue;
  }
  const root = ld[0] as { "@graph"?: unknown[] };
  if (!Array.isArray(root["@graph"])) {
    errors.push(`${label}: expected an @graph`);
    continue;
  }
  const types = root["@graph"].map(typeOf).filter(Boolean).sort();
  const expected = ["BreadcrumbList", "QAPage"];
  if (JSON.stringify(types) !== JSON.stringify(expected)) {
    errors.push(
      `${label}: @graph types must be {QAPage, BreadcrumbList}, got {${types.join(", ")}}`,
    );
  }
}

// ---- Report ----
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(
  `\nFAQ validation: ${faqSeed.items.length} items, ${dataset.topics().length} topics, ${faqSeed.categories.length} categories — ${errors.length} error(s), ${warnings.length} warning(s).`,
);

if (errors.length > 0) process.exit(1);
