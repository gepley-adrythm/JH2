// @workspace/faq — the single source of truth for FAQ content (seed) and the
// FAQ type system. Consumed by the api-server (DB sync, repo, renderers,
// JSON-LD, validation scripts) and by the Jematell Homes web app (the real
// React FAQ pages). Edit content in src/seed.ts.
export * from "./types";
export * from "./seed";
export * from "./dataset";
