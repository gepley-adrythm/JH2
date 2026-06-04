---
name: Jematell quality guards (audit + content lint)
description: How the speed/a11y audit and the em-dash/buzzword content lint work for jematell-homes
---

# Jematell quality guards

## Automated speed & a11y guard
`scripts/audit.mjs` (run via `pnpm run audit` / `audit:ci`, registered as the `audit`
validation command) is a deterministic, browser-free regression check against the
built `dist/public`. It asserts:
- a real `<h1>` + `<html lang>` + non-empty `<title>` in the raw prerendered HTML of
  representative routes;
- no render-blocking resources (every local script is `type=module`, no `@import` in
  built CSS, blocking stylesheets <= budget);
- an initial-JS gzip budget (entry + modulepreloads, ~139KB measured, 180KB budget —
  shared across all prerendered routes since they reuse one `index.html` template);
- an accessibility budget of zero *gated* axe-core violations per route (jsdom). A
  violation is gated when its impact is serious/critical OR its rule id is in
  `alwaysFailRules` — `heading-order` is gated explicitly even though axe ranks it
  "moderate", because a broken heading hierarchy is a named regression target.

Budgets/rule sets live in the `CONFIG` block at the top of the script. **Excluded
rules (`CONFIG.ignoredRules`):** `color-contrast` (jsdom does no layout/paint, so axe
can only report it "incomplete" — runtime contrast must be checked with the
browser-based testing harness) and `region` (the floating contact widget is an
intentional fixed element outside page landmarks). Note: blog-card and gallery-card
titles are `<h2>` (not `<h3>`/`<span>`) so list pages keep a valid h1->h2 hierarchy.

## Content style guard (em dashes + AI buzzwords)
`scripts/content-lint.mjs` (standalone via `pnpm run lint:content` /
`lint:content:ci`; in CI it is chained into the `audit:ci` build so it shares one
`dist/` with the audit and the two never race) walks every `dist/public/**/index.html`,
strips tags/scripts/styles to visible text, and asserts:
1. **Em dashes are a hard ERROR everywhere** (em dash U+2014 + horizontal bar U+2015 —
   mechanical regression; house style is a spaced hyphen `" - "`). The en dash U+2013 is
   deliberately NOT flagged: legitimate for numeric/weight ranges (font weights
   `300-600`, price ranges in FAQ copy).
2. **AI buzzwords** (conservative list — e.g. `insights`, `elevate`, `seamless`,
   `robust`, `game changer`, `when it comes to`, `stand the test of time`) are an ERROR
   on the site's own marketing routes but a non-failing WARN on legacy long-form
   (`blog/<slug>`, `faq/<slug>` — the client's own article/answer prose, left in their
   voice). The owned/legacy split is a regex (`CONFIG.legacyRouteRe`); the word list
   lives in `CONFIG`.

The source of cleanup lives upstream: `clone-data/normalize.mjs` exports
`stripEmDashes()` + `cleanText()` (em dash -> `" - "` plus a SAFE 1:1 AI-synonym map —
deliberately excludes context-risky words like `elevate`/`insights` and multi-word
phrases, which are hand-fixed instead), and `clone-data/extract.mjs` runs `cleanText`
on title/description/block text so re-extraction stays clean. The `/blog` index
surfaces legacy article *descriptions* as card copy, so those `description` fields in
`blogs.json` are cleaned (article *bodies* are left as warnings).
