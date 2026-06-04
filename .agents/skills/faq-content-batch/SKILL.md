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
- If a batch needs a brand-new category/topic, note it; the **assembly** step (not the writers) adds it to the seed's `categories`/`topics` arrays.
- Decide which 1-2 answers are "pillar" hubs (broad, cross-linked) and mark them `featured` at assembly.

## Step 3 — Parallel writers, each to its OWN draft file

The hard constraint: **writers never touch `lib/faq/src/seed.ts`**. Parallel agents editing the same seed file collide and clobber each other. Instead, each writer drafts paste-ready `item({ ... })` blocks into a dedicated file under `research/faq-drafts/<category>.md`.

Spin up one writer per category (project tasks in Plan mode, or `subagent`/`startAsyncSubagent` in Build mode). Each writer brief must include:

- The category slug + topic slug(s) the entries belong to.
- The specific questions to write (slug + intent from step 1), confirmed non-duplicate.
- The output path `research/faq-drafts/<category>.md` and the rule that NO other file may be modified.
- The schema + voice rules below.
- Pointers: `lib/faq/src/types.ts` (the `SeedItem` shape), `research/jematell-faq-content-plan.md` (the running content plan + numbered sources), and the `faq-seed-pipeline` memory.

### Schema rules for every `item({ ... })` block

Author with the `item()` helper (`Omit<SeedItem,"answer"> & { answerHtml }`), never raw objects:

- `slug` (kebab-case, unique), `question`.
- `answerHtml` — the rich HTML body, 500-1,500 words, using `<p> <h2> <h3> <ul> <ol> <li> <strong>`.
- **Never hand-write the plain `answer` field** — it is derived from `answerHtml` by the `plain()` helper. Writing both reintroduces drift.
- `shortAnswer` (40-60 words, plain, self-contained) and `metaDescription` are **schema/meta only** — they feed JSON-LD and the detail-page lede; they are NOT visible body copy and must not be duplicated into the body.
- `categorySlug`, `topicSlugs: [...]`, `tags` (kebab-case).
- `relatedFaqSlugs` — may reference other planned slugs in the same batch; assembly validates/finalizes them.
- `relatedServiceSlugs` (real services, e.g. `custom-homes`, `build-on-your-lot`), `pillarBlogSlug` (a real blog slug or `null`), `sortOrder`.
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
3. Finalize cross-links: make every `relatedFaqSlugs` resolve to a real slug, set real `relatedServiceSlugs`, mark pillar answers `featured`, assign sensible per-category `sortOrder`.
4. Re-confirm no entry duplicates a live question's intent (cross-check the registry again).

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
