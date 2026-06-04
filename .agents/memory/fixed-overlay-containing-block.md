---
name: Fixed-overlay containing-block trap
description: Why the full-screen mobile nav must live outside the site header (CSS containing-block gotcha)
---

# Fixed-overlay containing-block trap

A `position: fixed; inset: 0` overlay only fills the viewport if NO ancestor
establishes a containing block. `transform`, `filter`, `backdrop-filter`,
`perspective`, `will-change` (and `contain: paint/layout`) on an ancestor all turn
that ancestor into the containing block for fixed/absolute descendants.

In jematell-homes, `.site-header` gets `backdrop-filter: blur(12px)` in its
`.scrolled` state. The full-screen mobile nav (`#mobile-nav-panel`, fixed/inset:0)
was a *child* of `<header>`, so whenever the header was scrolled/solid it collapsed
to the ~90px header box: only the first nav item showed and page content bled through
below it.

**Why "sometimes":** at the very top of the homepage the header is transparent (no
backdrop-filter) so the panel filled the viewport fine; once scrolled — or on the
always-solid /blog, /gallery, /contact pages (forceSolid) — it broke.

**How to apply:** render any full-viewport fixed overlay (mobile nav, modal) as a
SIBLING of the header, not nested inside it. More generally, never nest a
fixed-to-viewport overlay inside an element that has transform/filter/backdrop-filter.
Verified with an e2e check: panel bounding box must equal the viewport size with an
opaque background on a scrolled tablet view.
