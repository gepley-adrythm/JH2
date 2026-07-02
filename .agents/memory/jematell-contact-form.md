---
name: Jematell contact form architecture
description: Universal multi-step contact form, Gmail email delivery, lead attribution, co-located CSS for jematell-homes
---

# Jematell contact form

## One universal contact form
A single immersive multi-step form lives in `src/contact-form/`, mounted once via
`ContactFormProvider` (inside `BrowserRouter`) and opened from everywhere via
`useContactForm().open()`: header CTA (desktop + mobile), hero CTA, homepage CTA
section, and the floating contact widget. It replaced the old inline lead form and the
old multi-link floating widget menu. Steps: name -> contact -> message-builder ->
extras -> thank-you. The provider handles Esc, body-scroll-lock, focus trap + focus
restoration.

## Email delivery
`submit.ts` POSTs the lead to `POST /api/contact` (the api-server artifact at the
proxy-root `/api` path; root-relative, NOT `BASE_URL`-prefixed since it is a separate
artifact). The api-server route (`artifacts/api-server/src/routes/contact.ts`)
validates with the generated `SubmitContactBody` zod schema and sends an HTML+text
email via the **Gmail integration** (`@replit/connectors-sdk`, connector
`google-mail`, `POST /gmail/v1/users/me/messages/send` with a base64url MIME message).
Recipients default to two hardcoded notification addresses (see `contact.ts`), overridable via
the `CONTACT_NOTIFY_TO` env var (comma-separated). `Reply-To` is set to the lead's
name+email so replies go straight to the lead. User input is HTML-escaped and header
fields are CRLF-stripped (injection guards).

## Lead attribution (first-touch)
`src/contact-form/analytics.ts` captures first-touch attribution on app mount
(`initTracking()` in `AppShell`, persisted in `sessionStorage` so it survives
client-side navigation before the form opens). UTM params win when present; otherwise
`source`/`medium` are derived dynamically from `document.referrer` (search-engine
hosts -> `organic`, social hosts -> `social`, any other host -> `referral`, a `gclid`
with no UTMs -> `cpc`, no referrer -> `direct`). The full attribution block (source,
medium, campaign, raw UTMs, gclid, referrer, landing page, trigger url) is included in
the notification email.

## Co-located CSS
`src/contact-form/contact-form.css` (imported by the provider) is a deliberate
deviation from the otherwise single-`index.css` convention, to keep the ported form
self-contained. All its classes are namespaced `cf-*`.

## Inline (non-modal) placement
`ContactForm` also accepts `variant="inline"` (default `"modal"`) for embedding
directly in page flow (e.g. next to text in a two-column section) instead of the
full-screen portal. Inline mode skips the fixed-position background image and close
button and instead renders the same dark-themed `cf-*` step content inside a
self-contained rounded card (own `overflow:hidden` + `border-radius`, sized by its
flex container). All the modal's dark-on-dark styling is reused as-is by design — the
card just becomes a dark panel sitting on the page's light background rather than a
full-bleed backdrop. Import it directly with `React.lazy` + `Suspense` at the call
site (don't route inline usage through `ContactFormProvider`, which is portal/modal-only).
