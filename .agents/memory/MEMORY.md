# Memory index

- [Squarespace image assets + self-host mirror](jematell-squarespace-assets.md) — inner images load from Squarespace CDN (modern host serves max res w/o `?format`); local mirror staged in `clone-data/cdn/` for future self-host.
- [Jematell performance + motion](jematell-performance.md) — WebP pipeline (q92), variant ladders must reach full source width or large/retina upscales→blur; code splitting, fonts, LazyMotion `m`-vs-`motion` traps.
- [Dev-only tooling pattern](jematell-dev-only-tooling.md) — prod web is static (no server); dev editors use `import.meta.env.DEV` lazy gating + a Vite `apply:"serve"` middleware so they (and their persistence endpoint) can't ship.
- [Jematell audit JS budget drift](jematell-audit-js-budget.md) — the `audit` initial-JS-gzip gate is already over its 180KB budget from accumulated unrelated work; verify pre-existing status before assuming your change caused a failure.
