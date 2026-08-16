---
name: Contact lead sinks and the never-await rule
description: A contact submission fans out to several sinks with different durability guarantees; which ones may block the visitor's response and which must not.
---

# Contact lead sinks

One contact submission fans out to sinks that are **not** equally important:

- **Postgres `leads` row** — the durable record. Written first, before anything
  is sent, and the only place some attribution survives.
- **Two Gmail messages** — the operational path the team actually works from.
- **Third-party marketing mirrors (AdRhythm)** — reporting copies.

## Rule

A third-party mirror is **never awaited in the request path**. Kick it off, log
its outcome from a `.then`, and let the response go out without it.

**Why:** an outage at a mirror otherwise spends its entire retry/timeout budget
while the visitor sits on a spinner — several seconds added to every single
submission, caused by a service that has no bearing on whether the lead was
captured. Awaiting it converts someone else's downtime into a visibly broken
form. The mirror's own failure is a reconciliation problem, not a lost lead,
precisely because the row and the emails already happened.

**How to apply:** when adding any new outbound integration to a submission
handler, ask whether losing it loses the lead. If not, it does not get to hold
the response. Give it a bounded per-attempt timeout anyway, have it resolve with
an outcome rather than reject, and keep it out of whatever condition decides the
error status code.

## Also worth knowing

- Retries against these webhooks are generally safe (they de-duplicate), but a
  4xx means the *body* is wrong — retrying resends identical bytes for an
  identical rejection, so only retry 5xx/429.
- Blank strings are not the same as absent fields. The tracking payload uses
  `""` for "not captured", which a receiver reads as a real empty value, so
  strip blanks before sending.
