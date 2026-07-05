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

import { buildDatasetFromSeed, faqSeed } from "@workspace/faq";
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
//
// A pure question-similarity check misfires on intentional programmatic series
// (per-city, per-room, per-type pages) that share a question template but carry
// genuinely different content. A pair is only a HARD duplicate when the
// questions are similar, the answers are ALSO similar, and the two questions do
// not differ by a distinguishing "series" entity (a city / room / structure-type
// token that marks a legitimate parameterized page). Everything else that trips
// the lexical check is surfaced as a warning for human review rather than
// failing the build.
const SERIES_ENTITIES = new Set([
  // cities / jurisdictions
  "scottsdale", "phoenix", "mesa", "chandler", "gilbert", "tempe", "glendale",
  "peoria", "surprise", "buckeye", "goodyear", "avondale", "carefree", "cave",
  "creek", "fountain", "hills", "paradise", "valley", "casa", "grande", "apache",
  "junction", "rio", "verde", "maricopa", "pinal", "county", "anthem", "tucson",
  "prescott", "sedona", "flagstaff",
  // rooms / spaces / structures
  "kitchen", "bathroom", "bath", "primary", "bedroom", "garage", "casita",
  "patio", "ramada", "pool", "spa", "closet", "pantry", "scullery", "laundry",
  "office", "gym", "theater", "basement", "attic", "guest", "courtyard",
  "kitchenette", "workshop", "shed", "barn", "barndominium", "container",
  "landscape", "landscaping",
  // unit / build types and actions that parameterize a series
  "adu", "guesthouse", "rv", "adobe", "icf", "addition", "remodel", "renovation",
  "conversion", "teardown", "rebuild", "attached", "detached",
  // architectural styles
  "hacienda", "spanish", "pueblo", "territorial", "tuscan", "mediterranean",
  "contemporary", "modern", "farmhouse", "ranch", "santa", "barbara",
  "southwest", "desert", "colonial", "tudor", "craftsman",
]);
function differsBySeriesEntity(a: string, b: string): boolean {
  const sa = tokens(a);
  const sb = tokens(b);
  for (const t of sa) if (!sb.has(t) && SERIES_ENTITIES.has(t)) return true;
  for (const t of sb) if (!sa.has(t) && SERIES_ENTITIES.has(t)) return true;
  return false;
}
for (let i = 0; i < faqSeed.items.length; i++) {
  for (let j = i + 1; j < faqSeed.items.length; j++) {
    const a = faqSeed.items[i];
    const b = faqSeed.items[j];
    const qs = similarity(a.question, b.question);
    if (qs < 0.4) continue;
    const as = similarity(a.answer, b.answer);
    const series = differsBySeriesEntity(a.question, b.question);
    if (qs >= 0.6 && as >= 0.55 && !series) {
      errors.push(
        `Duplicate intent (q=${qs.toFixed(2)}, a=${as.toFixed(2)}): "${a.slug}" vs "${b.slug}"`,
      );
    } else if (qs >= 0.6) {
      warnings.push(
        `${series ? "Series sibling" : "Overlapping intent"} (q=${qs.toFixed(2)}, a=${as.toFixed(2)}): "${a.slug}" vs "${b.slug}"`,
      );
    } else {
      warnings.push(
        `Possible overlapping intent (${qs.toFixed(2)}): "${a.slug}" vs "${b.slug}"`,
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

  // Breadcrumb must be the 4-level hierarchy Home > FAQ > Topic > Question.
  // When the item has a topic, the 3rd crumb must point at /faq/topics/<slug>.
  const breadcrumb = root["@graph"].find((n) => typeOf(n) === "BreadcrumbList") as
    | { itemListElement?: { position: number; name: string; item: string }[] }
    | undefined;
  const crumbs = breadcrumb?.itemListElement ?? [];
  if (crumbs.length !== 4) {
    errors.push(
      `${label}: breadcrumb must have 4 levels (Home > FAQ > Topic > Question), got ${crumbs.length}`,
    );
  } else if ((item.topicSlugs ?? []).length > 0) {
    const third = crumbs.find((c) => c.position === 3);
    const primaryTopic = (item.topicSlugs ?? [])
      .map((s) => dataset.getTopic(s))
      .find((t) => t !== undefined);
    if (!third || !third.item.includes("/faq/topics/")) {
      errors.push(
        `${label}: breadcrumb level 3 must be the topic (URL under /faq/topics/), got "${third?.item ?? "none"}"`,
      );
    } else if (primaryTopic && third.name !== primaryTopic.title) {
      errors.push(
        `${label}: breadcrumb level 3 name must be the topic title "${primaryTopic.title}", got "${third.name}"`,
      );
    }
  }

  // Related services/pages must render when the item declares relatedServiceSlugs.
  if ((item.relatedServiceSlugs ?? []).length > 0) {
    if (!html.includes('data-testid="faq-related-services"')) {
      errors.push(
        `${label}: relatedServiceSlugs set but no related-services section rendered`,
      );
    }
  }
}

// ---- Report ----
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(
  `\nFAQ validation: ${faqSeed.items.length} items, ${dataset.topics().length} topics, ${faqSeed.categories.length} categories — ${errors.length} error(s), ${warnings.length} warning(s).`,
);

if (errors.length > 0) process.exit(1);
