---
name: Hero parallax quality
description: How to build smooth, non-janky scroll parallax with Framer Motion in this project
---

# Hero parallax (smooth, non-janky)

Rule for any scroll-linked parallax (hero or section backgrounds):

1. **Track element progress, not page scroll.** Use `useScroll({ target: ref, offset: ["start start", "end start"] })` → `scrollYProgress` instead of raw `useScroll().scrollY`. Self-contained and resolution-independent.
2. **Always wrap the transform in `useSpring`** (e.g. `{ stiffness: 120, damping: 30, restDelta: 0.001 }`). This is the #1 jank fix — eases the otherwise 1:1 scroll→transform mapping so it never stutters on fast scroll / mousewheel.
3. **Oversize the translated background layer** (e.g. `top: -16%; height: 132%`) so the drift never exposes an edge gap. **The y range is a percentage of the LAYER's own (oversized) height, not the viewport** — so `y:"10%"` of a 132vh layer ≈ 13.2vh of drift, which must stay below the top headroom (16vh here). Getting this ratio wrong (e.g. `y:"18%"` of a 124vh layer = ~22vh drift vs only 12vh headroom) reveals a top gap late in the scroll-out. Always check: `yMax% * layerHeight% ≤ |top%|` (in viewport units).
4. **GPU hints:** `will-change: transform`, `transform: translateZ(0)`, `backface-visibility: hidden` on the moving layer. Only animate `transform`/`opacity` (compositor-only).
5. **Depth ratio:** background drifts down slowly, foreground copy lifts up faster (negative y).
6. **Reduced motion:** short-circuit by passing `{}` (no y/opacity) to `style` when `useReducedMotion()` is true, and add a `transform: none !important` reduced-motion CSS fallback.

**Why:** user reported the old hero (whole-page `scrollY` mapped 0→300px with no spring, 100%-height bg) felt janky and could reveal a gap at the bottom as the bg translated. Researched motion.dev performance/scroll guides; the spring + element-tracking + oversized-layer combo is the established high-quality pattern.

**Note:** Framer may log a one-time "ensure the container has a non-static position" warning during initial mount/HMR even when the target is `position: relative` — it is benign and does not reappear on a clean reload.
