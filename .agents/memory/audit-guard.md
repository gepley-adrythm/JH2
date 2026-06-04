---
name: Speed & a11y audit guard
description: How the automated speed/accessibility regression check works and its non-obvious constraints.
---

# Speed & accessibility audit guard

`scripts/audit.mjs` in the jematell-homes artifact is a deterministic, browser-free
regression check run via `pnpm run audit` (against existing `dist/public`) or
`audit:ci` (build first), registered as the `audit` validation command.

## Non-obvious facts

- **The committed `dist/public` can be stale.** Source can be newer than the last
  committed build (e.g. a single 1.2MB bundle pre-code-splitting). Always rebuild
  before trusting audit numbers — `audit:ci` does this; plain `audit` does not.
- **The SSG prerender reuses ONE built `index.html` template for every route.**
  So the entry `<script>` + `<link rel=modulepreload>` set (the "initial JS") is
  identical across all prerendered routes. Route-specific chunks (Blog, blogs
  data ~517KB, faq, pages) are lazy and never appear in the prerendered head.
  Measure the initial-JS budget once, not per route.
- **axe-core's `color-contrast` rule cannot run in jsdom** — jsdom does no layout/
  paint, so contrast only ever reports "incomplete", never a violation. It is
  explicitly disabled in the audit. Real contrast must be checked with a browser
  harness (the `testing` skill), not this guard.
- **`heading-order` is "moderate" impact in axe, not serious/critical.** A gate
  that only fails on serious/critical will silently miss a broken heading
  hierarchy. The audit gates it explicitly via `CONFIG.alwaysFailRules`. The
  `region` (landmark) rule is also moderate and fires on every page from the
  floating contact widget — it's an intentional accepted exception
  (`CONFIG.ignoredRules`).
- **List pages need their item titles to be real headings at the right level.**
  Blog cards and gallery cards must be `<h2>` (page h1 → card h2), not `<h3>` or a
  `<span>` — otherwise the next heading on the page (footer/widget) is a skip and
  trips heading-order. This was a real pre-existing violation fixed alongside the
  guard.

**Why:** these three caught me out — auditing stale dist gives wrong sizes,
per-route JS budgets would be redundant, and a contrast assertion in jsdom is a
false sense of security.

**How to apply:** when extending the audit or its budgets, edit the `CONFIG` block
at the top of `scripts/audit.mjs`; run axe in jsdom via `window.eval(axe.source)`
with `runScripts: "dangerously"` (module/ld+json scripts aren't executed, so safe).
