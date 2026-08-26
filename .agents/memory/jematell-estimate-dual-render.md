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

## Assumption copy lives in far more than two places

Changing a calculator assumption (rate, tax, insurance figure or its framing)
is NOT done when both renderers agree. The same claim is repeated in the
calculator's info/disclosure details, the curated scenario prose, the API
`DISCLAIMER` string (`estimateRequest.ts`, surfaced verbatim by `/api/estimate`
and MCP), `llms-full.txt`, `llm-info`, and the financing page's examples note.
The scenario page even hardcoded the insurance figure inline instead of using
the shared constant for a long time.

**Why:** grep over `src/` misses the Next `app/` directory (it sits at the
artifact root, not under `src/`), so a quick search makes the surfaces look
fewer and more constant-driven than they are.

**How to apply:** when touching any financing assumption, grep the whole
artifact roots (not just `src/`) for the figure and its framing words, and
include the agent-facing surfaces (`llms-full`, `llm-info`, MCP/API disclaimer)
in the sweep.

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

## The api-server copy ships zero client JavaScript

siteChrome lifts the real header/footer markup but strips every `<script>`,
because there is no React tree to hydrate. The page therefore *looks* identical
to the Next pages while silently lacking anything driven by JS.

Two things this cost, both reported as separate bugs before the shared cause was
found: Google Tag Manager never loaded (armed from Providers on normal pages, so
every visit through a shared estimate link was invisible to analytics), and the
header never gained its `scrolled` class, so it stayed transparent forever and
scrolled content showed through it.

**Why:** the failure is invisible from the markup and the stylesheet — both are
correct and complete. Only the behaviour is missing, so it reads as a CSS or a
tag-config bug rather than a missing-runtime bug.

**How to apply:** when anything on the site gains behaviour that a shared
estimate link should also have, it will NOT arrive here for free. The inline
script this page now carries duplicates the web artifact's GTM loader and the
Header's scroll threshold across a package boundary that cannot be imported
across; those constants must be changed in both places. A wrong-but-plausible
GTM container id is the dangerous case — traffic lands in another property and
the number still looks believable.

A related trap when lifting chrome: the mobile nav panel is a SIBLING of
`<header>`, not a child, so lifting the header element alone brings the menu
button across with nothing for it to open. Anything else React renders outside
the element being harvested has the same problem. The mobile accordions are
worse still — their children only exist while expanded, so a static export
captures empty groups; the same links can be read off the desktop dropdowns,
which render their panel unconditionally.

Also remember which controls are modal triggers rather than links. The header
and mobile "Start Your Build" buttons open a React contact-form modal, so they
are inert wherever that modal does not exist and have to be pointed at
/contact instead.

Quick check that the page still has its behaviour: the served HTML should have
two `<script>` tags (JSON-LD plus the inline chrome script). One means the
regression is back.
