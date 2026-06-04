---
name: Orval-generated zod request validation footguns
description: Why generated *QueryParams/*Params zod schemas can't be trusted alone to reject bad query/path params.
---

Orval emits request schemas using `zod.coerce.*`. Two coercion footguns mean you must NOT rely on `safeParse(req.query)` alone to reject malformed/missing params:

- `zod.coerce.string()` on a **missing required** field coerces `undefined` → the literal string `"undefined"`, which is truthy and passes validation. Check the raw value (`typeof req.query.q !== "string" || !req.query.q.trim()`) BEFORE parsing, then parse the known-good value.
- `zod.coerce.boolean()` makes ANY non-empty string truthy — including `"false"`. Never use a coerced boolean query flag for branching; read the raw query (`req.query.featured === "true"`).

**Why:** A `/check-duplicate` endpoint returned 200 for a missing required `q` because coercion produced `"undefined"`. Caught only by a live curl, not by typecheck.

**How to apply:** For any Express route validating `req.query`/`req.params` with generated `*QueryParams`/`*Params` zod schemas, guard required strings and boolean flags against the raw request first; use the generated schema for shape/type, not for presence/semantics.
