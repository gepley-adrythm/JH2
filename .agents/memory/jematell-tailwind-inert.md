---
name: Tailwind is installed but inert in jematell-homes
description: Tailwind arbitrary-value classes (text-[..], bg-[..], etc.) silently do nothing in this artifact — convert to inline styles instead.
---

Tailwind (`tailwindcss`, `@tailwindcss/vite`) is a dependency and the Vite plugin
is registered in `vite.config.ts`, but no stylesheet in the artifact contains
`@import "tailwindcss";` (or `@tailwind` directives). Without that import the
plugin has no entry point to generate utilities from, so **any Tailwind class
written into JSX compiles and saves fine but has zero visual effect** — the
class name just sits inert in the DOM.

**Why:** The canvas visual-edit UI sometimes emits Tailwind arbitrary-value
classes (e.g. `text-[55px]`, `bg-[color:var(--color-bone)]`) when a user drags
a size/color control. These edits land in the file and git history shows a
real diff, which makes it look like "my edit isn't saving" when actually the
edit saved but rendered invisibly.

**How to apply:** Whenever a diff (yours or a UI-generated one) introduces a
`className` with a bracketed arbitrary value, convert it to an inline
`style={{ ... }}` prop (or a plain CSS rule) immediately — don't leave it as a
Tailwind class. When a user reports a visual edit "not saving" in this
artifact, grep for `text-\[|bg-\[|w-\[|h-\[|p-\[|m-\[` etc. across `src/`
before assuming a persistence bug.
