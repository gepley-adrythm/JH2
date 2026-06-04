// Generate a static FAQ cross-link index for the (fully static) jematell-homes
// SPA. The SPA cannot import server code at runtime, so we emit a JSON file it
// reads at build time to surface "Related questions" on blog posts.
//
// Run: pnpm --filter @workspace/api-server run faq:crosslinks

import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDatasetFromSeed } from "../lib/faq/dataset";
import { faqSeed } from "../lib/faq/seed";

const dataset = buildDatasetFromSeed(faqSeed);

const links = dataset.all().map((i) => ({
  slug: i.slug,
  question: i.question,
  categorySlug: i.categorySlug,
  categoryTitle: i.categoryTitle,
  topicSlugs: i.topicSlugs,
  tags: i.tags,
  pillarBlogSlug: i.pillarBlogSlug,
}));

const here = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(
  here,
  "../../../jematell-homes/src/data/faqCrossLinks.json",
);

writeFileSync(outPath, JSON.stringify(links, null, 2) + "\n", "utf8");
console.log(`Wrote ${links.length} FAQ cross-links to ${outPath}`);
