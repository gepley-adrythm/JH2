---
name: Jematell Squarespace image assets + self-host migration
description: How the site sources images from Squarespace CDN, the resolution quirks of each host, and the local mirror staged for the eventual off-Squarespace self-host
---

# Jematell Squarespace image assets

The site is a rebuild of the client's Squarespace site. The homepage hero/section
images are local (`artifacts/jematell-homes/public/images/`), but every inner-page,
gallery, and blog image still loads directly from Squarespace's CDN (URLs live in
`clone-data/extracted/{pages,blogs}.json` as `ogImage` + `img` blocks, plus a couple
hardcoded in `src/`).

## Two Squarespace hosts behave differently
- `images.squarespace-cdn.com` (modern) — returns the **largest available render**
  when the URL has **no `?format=` param**, auto-negotiated to WebP. So the inner
  images are already served at full res (typically 2500px); they are NOT
  under-requested. Adding `?format=2500w`/`original` returns the same bytes.
- `static1.squarespace.com` (legacy) — needs an explicit `?format=` and the scraped
  URLs pin it to `1500w`. To get full quality, bump to `?format=2500w`.

**Why this matters:** when chasing "blurry images", the inner CDN images are usually
fine; suspect the local WebP pipeline (variant width caps) first, not the CDN.

## Local mirror for the future self-host
The client plans to transition off Squarespace and self-host. `node
clone-data/download-cdn.mjs` mirrors every referenced Squarespace image into
`clone-data/cdn/` (dev-only staging, ~190MB, 400+ WebP files) and writes
`clone-data/cdn-manifest.json` mapping each original remote URL → local path. The
script upgrades legacy `static1` `1500w` URLs to `2500w` for best quality and is
idempotent (skips already-downloaded files).

**Deliberately staged, not wired:** the mirror lives under `clone-data/` (not
`public/`) on purpose — anything in `public/` is copied verbatim into every build, so
shipping ~190MB of not-yet-referenced images would bloat builds/deploys. **How to
apply when self-hosting:** copy `clone-data/cdn/` into the artifact `public/` tree and
rewrite the references in `clone-data/extracted/*.json` (+ the hardcoded `src/` URLs)
using the manifest.
