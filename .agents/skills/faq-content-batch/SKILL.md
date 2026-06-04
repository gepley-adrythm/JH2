---
name: faq-content-batch
description: Plan and produce a batch of new FAQ content for the Jematell Homes site (lib/faq/src/seed.ts). Use whenever the user wants to add, expand, or research new FAQ questions/answers — especially several at once or "across all markets" — or asks to spin up writer agents for FAQ content. Enforces a duplicate-intent check against CONTENT-INTENT-REGISTRY.md before any drafting so two pages never target the same search intent, then runs the parallel-writer → assembly → pipeline workflow.
---

# FAQ Content Batch

How to produce a fresh batch of FAQ content for Jematell Homes without creating duplicate pages or corrupting the shared seed. The FAQ corpus lives in `lib/faq/src/seed.ts` (single source of truth, no DB) and is consumed by both the web app and the api-server.

## When to Use

- The user wants new FAQ questions/answers added, or to expand FAQ coverage (e.g. "add FAQs for X", "cover all 8 markets", "more permitting questions").
- The user wants to run multiple writer agents to produce FAQ content in parallel.
- Any time you are about to add more than one or two FAQ entries.

For a single tiny edit to an existing entry you can skip the parallel-writer machinery, but you still MUST do the duplicate check (step 1) and run the full pipeline (step 5).

## Step 1 — Check the registry FIRST (do not skip)

Before writing a single answer, prevent duplicate content. Two FAQ pages must never own the same search intent — it splits ranking and confuses readers.

1. Read `CONTENT-INTENT-REGISTRY.md` at the repo root. It lists every published FAQ URL and the intent it owns (regenerated from the seed; never hand-edited).
2. For each question you intend to write, confirm no existing row already covers that intent. If something is close, either (a) pick a genuinely distinct angle/slug, or (b) plan to expand the existing entry instead of adding a new one.
3. The registry can lag the seed. If you have edited the seed recently, regenerate it first: `pnpm --filter @workspace/api-server run faq:registry`, then re-read it.
4. The `faq:validate` script also flags duplicate-intent (cosine ≥0.6) at assembly time as a backstop — but catch collisions here, before drafting, to avoid wasted writing.

Capture your planned slugs + one-line intents and sanity-check them against the registry. This list becomes the writer briefs in step 3.

## Step 2 — Decide the batch shape

- Group new questions by FAQ **category** (e.g. `permits-and-codes`, `land-due-diligence`, `water-septic-utilities`, `costs-budget`, `design-zoning-adus`). One category = one writer.
- If a batch needs a brand-new category/topic, note it; the **assembly** step (not the writers) adds it to the seed's `categories`/`topics` arrays (and must give the new category/topic a `sortOrder` that does not collide with existing ones).
- **Do not use `featured` / "pillar" flags.** The FAQ hub's featured section was removed, so nothing on the site renders `featured` — `dataset.featured()` still exists but has no UI consumer. Leave `featured` omitted (defaults to `false`); do not spend any planning effort selecting pillars. On-page order is controlled entirely by `sortOrder` (see assembly pitfalls).

## Step 3 — Parallel writers, each to its OWN draft file

The hard constraint: **writers never touch `lib/faq/src/seed.ts`**. Parallel agents editing the same seed file collide and clobber each other. Instead, each writer drafts paste-ready `item({ ... })` blocks into a dedicated file under `research/faq-drafts/<category>.md`.

Spin up one writer per category (project tasks in Plan mode, or `subagent`/`startAsyncSubagent` in Build mode). Each writer brief must include:

- The category slug + topic slug(s) the entries belong to.
- The specific questions to write (slug + intent from step 1), confirmed non-duplicate.
- The output path `research/faq-drafts/<category>.md` and the rule that NO other file may be modified.
- The schema + voice rules below.
- Pointers: `lib/faq/src/types.ts` (the `SeedItem` shape), `research/jematell-faq-content-plan.md` (the running content plan + numbered sources), and the `faq-seed-pipeline` memory.

### Schema rules for every `item({ ... })` block

Author with the `item()` helper (`Omit<SeedItem,"answer"> & { answerHtml }`), never raw objects. **Wrap each `item({ ... })` block in a fenced ` ```ts ` code block** so the assembly step can extract every block programmatically (the assembler greps for `ts`-fenced blocks; loose blocks get missed).

- `slug` (kebab-case, unique), `question`.
- `answerHtml` — the rich HTML body, 500-1,500 words, using `<p> <h2> <h3> <ul> <ol> <li> <strong>`. The 500-word floor is NOT validator-enforced; an answer under it ships silently. Write to it.
- **Never hand-write the plain `answer` field** — it is derived from `answerHtml` by the `plain()` helper. Writing both reintroduces drift.
- `shortAnswer` (plain, self-contained) and `metaDescription` are **schema/meta only** — they feed JSON-LD and the detail-page lede; they are NOT visible body copy and must not be duplicated into the body. Keep `shortAnswer` **25-80 words** (the validator WARNs outside that range); aim 40-60.
- `categorySlug`, `topicSlugs: [...]`, `tags` (kebab-case).
- `relatedFaqSlugs` — use the **final intended slug** of each target, whether it is a live entry or a sibling being added in the same batch. Every one of these must resolve at assembly or `faq:validate` fails, so do not point at a slug you are guessing about.
- `relatedServiceSlugs` (real services, e.g. `custom-homes`, `build-on-your-lot`).
- `pillarBlogSlug` — a **real** blog slug or `null`, never invented. Verify against the actual blog source (`clone-data/extracted/blogs.json` keys) before using one; when in doubt use `null`.
- `sortOrder` — number your entries sequentially **within your own category**, starting just after the live category's current last value. Ordering is per-category, so cross-category collisions are fine; the assembler finalizes contiguous numbering.
- Below each block add a short "Sources used" list with the plan's `[N]` citation numbers + URLs so the research is auditable.

### Voice + content rules

- Deep, research-phase, plain-language, **Arizona-building-code-grounded**. Cite real statutes/ordinances/agencies by name (e.g. A.R.S. 45-454 exempt domestic well ≤35 gpm, A.R.S. 32-2101 subdivision = 6+ lots vs lot split ≤5, HB 2720 ADU law, Scottsdale ESLO/NAOS, ADWR/ADEQ, the adopted IRC/IBC edition per jurisdiction).
- Close every answer by reminding the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ), because adopted code versions, fees, and timelines change.
- Date-stamp anything volatile (adopted code editions, fee schedules). Never give legal advice.
- NO em dashes, NO emojis (site-wide preference).
- The 500-word floor is a quality standard, not a validator rule — the validator will not catch a thin answer. Write to it.

## Step 4 — Assembly (main agent merges all drafts)

Once the drafts exist, one assembly pass (best done by the main agent) stitches them into the seed:

1. Paste each `item({ ... })` block into `lib/faq/src/seed.ts` under its correct category section.
2. Add any new category + topic to the `categories` / `topics` arrays.
3. Finalize cross-links: make every `relatedFaqSlugs` resolve to a real slug, set real `relatedServiceSlugs`, assign sensible per-category `sortOrder`.
4. Re-confirm no entry duplicates a live question's intent (cross-check the registry again).

### Assembly pitfalls (learned the hard way)

These are the things that bite the assembler agent. Handle them deliberately:

- **`sortOrder` is per-category, not global.** The dataset groups items by `categorySlug` and sorts within each group by `sortOrder`; the order of blocks in the `items` array does NOT affect rendering. So you must renumber each category to a clean contiguous sequence and only worry about collisions *within* a category. A new category/topic also needs a `sortOrder` that does not collide with the existing categories/topics.
- **Extract, then reindent — don't expect paste-ready indentation.** Draft blocks come at varying indentation. Pull every ` ```ts `-fenced `item({...})` block out of the draft files (programmatically), reindent to the seed's nesting, and insert under the right category section. Expect to script this rather than hand-paste 25+ blocks.
- **Validate every `relatedFaqSlug` against (live ∪ new) before running the pipeline.** Gather all live slugs plus all new slugs into one set and confirm each reference resolves. A dangling ref fails `faq:validate` and is the most common assembly error.
- **Verify each `pillarBlogSlug` is a real blog slug (or `null`).** Cross-check against `clone-data/extracted/blogs.json`. Writers sometimes leave placeholders.
- **Ignore `featured`.** The FAQ hub featured section was removed; nothing renders this flag. Leave it omitted/`false` and do not spend assembly time choosing pillars.
- **Keep new content em-dash-free.** Site preference is NO em dashes. Some *live* seed entries still contain them; that is not license to add more. Do not copy that habit into new entries (and normalize stragglers only if explicitly asked).
- **Count check before the pipeline.** Expected total `items` = live count + new count (e.g. 13 live + 26 new = 39). A mismatch means a block was dropped or double-pasted during extraction.

## Step 5 — Run the FAQ pipeline IN ORDER (after ANY seed edit)

The generated files derive purely from the seed and go stale silently if skipped. Run all four, in this order:

1. `pnpm run typecheck:libs` — rebuilds `lib/faq` dist so the web app (which imports the built lib, not the TS source) picks up changes.
2. `pnpm --filter @workspace/api-server run faq:validate` — must be **0 errors** (required fields, valid category/topic/relatedFaq refs, no duplicate-intent ≥0.6, JSON-LD shapes, breadcrumb, related-services when set; shortAnswer 25-80 words or WARN).
3. `pnpm --filter @workspace/api-server run faq:crosslinks` — regenerates `artifacts/jematell-homes/src/data/faqCrossLinks.json` (consumed by `BlogPost.tsx` for related-FAQ links). Skipping this after slug changes leaves stale/broken links.
4. `pnpm --filter @workspace/api-server run faq:registry` — regenerates `CONTENT-INTENT-REGISTRY.md` so the next batch's duplicate check (step 1) sees the new pages.

Resolve every validator finding before moving on.

## Step 6 — Verify rendering

Load `/faq`, a couple of topic pages (`/faq/topics/:slug`), and several new detail pages (`/faq/:slug`). Confirm heading, lede (the `shortAnswer`), body, breadcrumbs, related links, and any new category all render. FAQ pages are SSG-prerendered, so also confirm typecheck is clean rather than relying on `build` (which needs workflow env vars).

## Key files

- `lib/faq/src/seed.ts` — the single source of truth (assembly edits this; writers never do).
- `lib/faq/src/types.ts` — the `SeedItem` shape.
- `CONTENT-INTENT-REGISTRY.md` — generated duplicate-intent ledger; read before drafting.
- `research/jematell-faq-content-plan.md` — running content plan + numbered sources.
- `research/faq-drafts/<category>.md` — per-writer draft output (collision-free).
- `.agents/memory/faq-seed-pipeline.md` — deeper pipeline notes (composable with this skill).
