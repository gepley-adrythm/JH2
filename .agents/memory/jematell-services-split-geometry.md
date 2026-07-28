---
name: Services split scaleX geometry
description: Why content in the home page services-split right pane clips at rest, and the required translateX compensation
---

The home page services split animates pane widths with `transform: scaleX` + a counter-scale on `.service-pane-inner` (no layout on any frame). Both panes are 56.522% wide but display 50% at rest.

**The trap:** the right pane's inner is right-anchored, so its counter-scale extends the content box LEFT past the pane's visible edge — under the left pane (higher z-index). Any content near the right pane's left padding edge gets hidden at rest.

**The fix in place:** `.service-pane:last-child .service-content` carries `translateX(6.522vw)` at rest (= 56.522% − 50% overhang), `13.044vw` when the sibling is hovered, `0` on its own hover, transitioned with the same 0.6s easing so it tracks the pane expand.

**How to apply:** don't "fix" clipped text there by shrinking fonts or allowing wrap — the geometry compensation is the correct lever. If the scale constants (0.88462/0.76924) change, recompute the translateX offsets in lockstep.
