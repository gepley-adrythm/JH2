---
name: ContentPage intro extraction
description: Non-obvious source-content structure that drives ContentPage intro parsing
---

# ContentPage intro extraction (Jematell Homes)

The scraped Squarespace pages routed through `ContentPage` follow this block order:
`[hero-img][h1 on-page headline][h2 subtitle][p intro][img][h2 "Full-Service..."]...`

Key gotcha: the on-page `h1` (e.g. "RIO VERDE", "CREATE YOUR DREAM HOME") usually does
**not** equal the page title/hero title. The intro extractor must skip a leading `h1`
both when it echoes the title AND when it sits directly above an `h2/h3` (the real
subtitle). If you only skip the title-matching case, the `h1` falls through, the
`subtitle`(h2)/`intro`(p) slots stay empty, and `IntroSection` renders an empty text
column beside the intro image — looks like "missing text" on ~8 location/service pages.

**Why:** the source site puts a redundant location/headline `h1` above the real
`h2`+`p` intro. The hero already shows the page title, so this `h1` is dropped.

**How to verify:** replicate the extraction logic in a node script against
`clone-data/extracted/pages.json` for every ContentPage-routed key and assert none
end up with `introImg && !subtitle && !intro` (warranty/thank-you legitimately have
no intro text — that's fine, they have no intro image either).

## Intro h2 == hero description dedupe

On some pages the first intro `h2` is byte-identical to `data.description` (only
`spechomes` today). Do NOT drop the subtitle in that case — that leaves the intro a
bare headingless paragraph. Instead keep the `h2` as the intro heading and hide the
duplicated description from the hero (`heroDescDup` flag → `PageHero hideDescription`).
Net effect: tagline shows exactly once, as the intro `<h2>`.
**Why:** dropping it looked like a "missing heading" bug to the user.
**How to apply:** compare `norm(firstH2) === norm(description)`; the paragraph dedupe
(intro `p` == description) still just drops the paragraph.

## SplitSection eyebrow

The generic fallback `SplitSection` must NOT print a hardcoded `<span class="eyebrow">
Section</span>` — it renders the literal word "SECTION" above every generic section
(visible on /spec-homes "Homes Coming Soon"). There's no meaningful eyebrow to derive
for the fallback, so render the heading alone. Real section renderers (services,
process, floor plans) supply their own meaningful eyebrows.

# Framer Motion scroll reveals (this project)

Prefer `viewport={{ once: true, amount: 0.15-0.2 }}` over negative `margin` rootMargins
("-60px/-80px/-100px"). Negative margins delay reveals (felt "too long") and can fail
to fire on short pages/small viewports, leaving text stuck at `opacity:0`. Wrap pages
in `<MotionConfig reducedMotion="user">` so entry/whileInView animations respect
prefers-reduced-motion (MotionConfig does NOT affect `style`-bound motion values like
the hero parallax — those need their own `useReducedMotion()` short-circuit).
