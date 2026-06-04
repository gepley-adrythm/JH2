---
name: Fraunces wonky f and J glyphs
description: Why Fraunces headings showed "broken" descending f/J and what actually fixes it
---

# Fraunces descending f / J read as "broken"

Fraunces (Google Fonts variable serif) draws a lowercase `f` with a curling
descender and a `J` that drops below the baseline. Users repeatedly report these
as "messed up" / "broken" letters at heading sizes.

**These are inherent to Fraunces's design (its WONK axis).** They are NOT an
optical-size artifact.

**What does NOT fix it (all tried and rejected):**
- `font-optical-sizing: none` — only falls back to Fraunces's default cut, still wonky.
- Pinning a low `opsz` via `font-variation-settings: "opsz" N` — opsz is the wrong axis.
- Pinning the `WONK`/`SOFT` axes to 0 in the Google Fonts css2 URL
  (`...wght,SOFT,WONK@...,0,0`) — over-constraining the request makes Google
  serve **static per-weight instances baked at display opsz**, so it persists
  (or worsens) even after a hard reload.

**What fixed it:** swap the heading font to a serif with conventional f/J.
Used **Newsreader** (warm editorial serif, clean glyphs) — set in
`artifacts/jematell-homes/src/index.css` (`@import` + `--font-heading`).

**Why:** the descending glyphs cannot be reliably disabled over Google Fonts.
**How to apply:** if a Fraunces glyph complaint comes back, do not chase axes —
switch fonts. Also note FAQ card titles are `<span>`s, so any `h1-h6`-scoped
font rule never reaches them; prefer inherited rules on `body` or the font swap.
