---
name: Estimate pages render twice, in two different stacks
description: /financing/estimate exists as both a prerendered Next page and an api-server raw-HTML page; any content change must be made in both, and client components only work in one.
---

# Construction loan estimate pages have two renderers

The estimate experience is served by two independent code paths that produce
near-identical pages:

1. **Indexed / curated scenarios** — a real Next page at
   `/financing/estimate/<slug>`, prerendered from a fixed scenario list
   (`dynamicParams = false`). Full React, so client components work.
2. **Shared-link / arbitrary parameters** — `/financing/estimate?<params>`,
   which `next.config.mjs` rewrites to the **api-server**, which renders the
   HTML itself. A static export cannot prerender arbitrary query params, which
   is why this path exists at all.

## The rule

**Any visible content or CTA change to the estimate page must be applied to
both.** They share class names and the same underlying calculation module, so
they look identical and are easy to mistake for one page.

**Why:** the two were built to always agree — same figures, same design system —
so a change landing in only one produces a silent inconsistency that no
typecheck or build catches. The divergence only shows up when someone opens a
shared link.

## The hydration asymmetry

The api-server page borrows the real stylesheet, header, and footer from the
static export, but **deliberately strips `<script>` tags** — there is no React
tree to hydrate. Consequences:

- Client components (contact-form modal buttons, nav toggles) **do not work**
  there. Use a plain `<a href="/contact">` instead of a modal-opening button.
- This asymmetry is intended, not a bug. A modal button and a link to the
  contact page are both acceptable; a dead button is not.

## Do not lift animated sections out of the static export

The api-server harvests header/footer/CSS from an exported page, so lifting a
whole marketing section from the export looks like an easy way to avoid
duplicating it. It is a trap for any section built with framer-motion.

Those components render their **pre-animation** state into the exported HTML
(`initial={{ opacity: 0 }}` → inline `opacity:0`). On the api-server page,
scripts are stripped, so nothing ever animates it in and the section renders
**invisible** — present in the DOM, silently blank on screen.

**Why:** the export is a snapshot of a tree that expects to hydrate. The
api-server page never hydrates.

**How to apply:** hand-write a static HTML copy for the api-server, with lucide
icon paths inlined (read them from `node_modules/lucide-react/dist/esm/icons/`
rather than writing SVG from memory). Mark it clearly as needing to stay in
sync with its React counterpart.

## How to apply

When told to change "the estimate pages", change both the Next `[slug]` page
and the api-server route. Verify the shared-link half with a request against
the running api-server rather than only screenshotting the Next page — the
Next dev server will happily render the indexed page while the shared-link
half is untouched.
