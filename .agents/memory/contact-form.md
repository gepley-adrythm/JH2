---
name: Universal contact form
description: Jematell Homes has ONE contact form — a modal opened via context, not per-page inline forms.
---

# Universal contact form (ContactV5)

The site has exactly one contact form: an immersive multi-step modal in
`artifacts/jematell-homes/src/contact-form/`. It is mounted once by
`ContactFormProvider` (inside `BrowserRouter`) and opened anywhere via
`useContactForm().open()`.

**Rule:** never add a new inline/page-level contact or lead form. Wire any new
"contact us" / "get started" CTA to `useContactForm().open()` instead.

**Why:** the user explicitly wanted one form everywhere — it replaced both the
old homepage inline lead form (`cta.tsx`) and the old multi-link floating
`ContactWidget` menu. Divergent forms would fragment that UX and the (future)
single delivery path.

**How to apply:**
- Triggers already wired: header CTA (desktop + mobile), hero CTA, homepage CTA
  section button, floating contact widget.
- Submission delivery is NOT connected — `submit.ts` is a local adapter (DEV
  console.log + delay + `{success:true}`) with a TODO. Connect real delivery
  there (email/CRM or a POST to the api-server) when asked.
- Styles are co-located in `contact-form.css` (namespaced `cf-*`), a deliberate
  exception to the single-`index.css` rule.
- Ported from an imported `form-styles-kit`: uses framer-motion via the `m`
  component (LazyMotion `strict` is enabled app-wide in AppShell, so the full
  `motion` component throws), all motion gated on `useReducedMotion()` (including
  `whileTap`), no Tailwind. Dedupe hashing must stay Unicode-safe (no `btoa` on
  user names).
- The form is lazy-loaded: `ContactFormProvider` mounts `ContactForm` via
  `React.lazy` + `<Suspense fallback={null}>` (inside `AnimatePresence`, gated on
  `isOpen`), so its ~47KB chunk only downloads on first open and never renders at
  SSG prerender time.
