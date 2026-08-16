---
name: Partnered-plans widget iframe constraints
description: The Architectural Designs iframes on /floor-plans are cross-origin with infinite scroll — their scrollbar can't be restyled, and wrapper-scroll workarounds break plan loading.
---

The "Partnered Plans" embeds on `/floor-plans` are cross-origin iframes (architecturaldesigns.com widget) with a fixed 580px height.

Hard constraints, both verified by inspection:

- **The iframe's scrollbar cannot be recolored from our CSS.** Cross-origin documents are sealed; `scrollbar-color`/`::-webkit-scrollbar` only apply within our own document. `color-scheme` can only force light/dark system scrollbars, not brand colors. On real phones the indicator is OS-drawn and transient anyway.
- **Do not "fix" this by making the outer wrapper scroll instead of the iframe.** The widget uses infinite scroll (masonry container, `page` param, widgets.js) driven by the *iframe's own* scroll position. If the iframe is made tall and never scrolls internally, only the first batch of plans ever loads and the rest of the catalog becomes silently unreachable.

**Why:** user asked twice to make the mobile scrollbar match the site's blue scrollbar; the first is impossible, the second is a trap that looks like it works until someone notices missing plans.

**How to apply:** any future restyle of the partnered-plans embed must keep the scrolling inside the iframe (current approach: CSS `overflow:auto` under the 600px media query in `index.css`, `.fp-partnered-widget`). Decline scrollbar-color requests for this element with the cross-origin explanation.
