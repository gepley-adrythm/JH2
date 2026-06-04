# Memory index

- [Squarespace image assets + self-host mirror](jematell-squarespace-assets.md) — inner images load from Squarespace CDN (modern host serves max res w/o `?format`); local mirror staged in `clone-data/cdn/` for future self-host.
- [Jematell performance + motion](jematell-performance.md) — WebP pipeline (q92), variant ladders must reach full source width or large/retina upscales→blur; code splitting, fonts, LazyMotion `m`-vs-`motion` traps.
