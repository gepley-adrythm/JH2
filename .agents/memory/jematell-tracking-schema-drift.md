---
name: Contact tracking fields drift silently at the API boundary
description: The browser's TrackingData and the OpenAPI ContactTracking schema are two separate definitions; zod drops anything the schema omits, with no error anywhere.
---

# Tracking fields drift silently at the API boundary

The attribution the browser collects and the attribution the server accepts are
declared in **two unrelated places**:

- the web artifact's own `TrackingData` interface (what the form gathers and
  posts), and
- `ContactTracking` in the OpenAPI spec under `lib/api-spec`, from which the
  request zod schema is generated.

Zod strips unknown keys rather than rejecting them. So a field the browser has
been faithfully capturing and sending for months arrives at the server and is
**silently discarded** if the spec does not declare it. Nothing fails, nothing
logs, and the field simply appears to have never been collected.

This is not hypothetical: `msclkid` and `fbclid` were captured client-side,
used for paid-vs-organic classification, and sent on every submission — while
being dropped at the boundary, because only `gclid` was in the spec.

**How to apply:** when a lead needs a tracking field, do not assume it reaches
the server just because the form collects it. Check the OpenAPI schema. When
adding one, make it **optional** rather than required — a required field breaks
any visitor still running a cached older bundle that does not send it — then
regenerate. Remember the `leads` table is a third definition: adding a field to
the spec forwards it onward but does not persist it.
