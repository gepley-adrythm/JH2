---
name: SSG real-H1 rule (jematell-homes)
description: Why above-the-fold headings on the static (SSG) site must be CSS-driven, not JS-driven.
---

The public site is statically pre-rendered (SSG) and must ship a real, visible H1 + body copy in the first HTML response (curl-verifiable) for SEO/AI crawlers.

**Rule:** above-the-fold H1s (hero titles) use the CSS `hero-title` class for their entrance animation. Do NOT use framer-motion `initial={{ opacity: 0 }}` on a primary heading.

**Why:** a framer-motion `initial={{opacity:0}}` heading renders into the pre-hydration HTML as `opacity:0`. A crawler (or any no-JS fetch) then sees an invisible H1 — defeating the whole point of SSG. The CSS class animates from a visible-by-default baseline and is reduced-motion guarded, so the heading is present and visible in raw HTML and still animates once JS runs.

**How to apply:** any new hero/primary heading on this site — reach for the `hero-title` (and equivalent) CSS classes in `transitions.css`, not a `motion.h1` with inline opacity. Verify with `curl <url> | grep -i "<h1"`.
