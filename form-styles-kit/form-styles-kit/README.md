# Form Styles Kit — ContactFormV5 + EventFormV5

A portable, **site-agnostic** copy of two multi-step, full-screen animated forms:

- **ContactFormV5** — a guided "build your message" contact form (name → contact → message → extras → thank you).
- **EventFormV5** — a seminar/event browser + multi-step registration flow (calendar → details → registration → thank you).

These are 1:1 reproductions of the original production forms **with the CRM
integration removed**. The visual design, animation, copy structure, validation,
accessibility hooks, and step logic are identical. Only the data layer (where
submissions go) and the brand-specific values have been made swappable.

This kit is meant to be dropped into another React project so an agent (or
developer) can reuse and adapt these forms quickly.

---

## What's in the box

```
form-styles-kit/
├── components/
│   ├── ContactFormV5.tsx      # the contact form (unchanged styling)
│   └── EventFormV5.tsx        # the event/seminar form (unchanged styling)
├── hooks/
│   ├── useSafeTimeouts.ts     # leak-safe setTimeout helper
│   └── useEventData.ts        # generic useEvents / useVenuePhotos (event form only)
├── lib/
│   ├── siteConfig.ts          # ⭐ EDIT THIS to rebrand (name, phone, images, copy, colors)
│   ├── formData.ts            # chip options, phone formatter, email validator
│   ├── formHelpers.ts         # toSlug, getIsoDate (pure helpers)
│   ├── formSubmit.ts          # ⭐ the swappable submit layer (replaces the old CRM code)
│   └── analytics.ts           # no-op analytics/tracking stubs (optional to wire up)
├── examples/
│   ├── api-contact.example.ts # example Next.js POST handler for the contact form
│   ├── api-event.example.ts   # example Next.js POST handler for the event form
│   ├── events.example.json    # shape the event form expects from /api/events
│   └── venue-photos.example.json
└── README.md
```

---

## Requirements

The components depend on these packages (install whatever is missing):

| Package | Why |
| --- | --- |
| `react` (18+) | components |
| `framer-motion` | all animations (imported as `m` + `AnimatePresence`) |
| `lucide-react` | icons |
| `@tanstack/react-query` | data fetching in the **event** form only |
| Tailwind CSS | utility classes used throughout |

> The **contact form has no data dependencies** — it only needs React,
> framer-motion, lucide-react, and Tailwind. You can use it without React Query.

### framer-motion `m` + LazyMotion

The components import `m` (not `motion`) for smaller bundles. Wrap your app once:

```tsx
import { LazyMotion, domAnimation } from 'framer-motion';

<LazyMotion features={domAnimation}>
  {/* app */}
</LazyMotion>
```

(Or change every `m.` to `motion.` and import `motion` instead — your call.)

### Fonts

The design uses a **serif** for headings (Tailwind's `font-serif`) and **Mulish**
for sans/body. The components set `fontFamily: "'Mulish', system-ui, sans-serif"`
on the root. Load Mulish (e.g. Google Fonts) and a serif of your choice, or change
the inline `fontFamily` in each component's outer `<div>`.

---

## Quick start (3 steps)

### 1. Copy the folder in and fix the import style

All imports inside the kit are **relative** (`../lib/...`, `../hooks/...`), so it
works as-is if you keep the folder structure. If your project uses a path alias
like `@/`, you can switch the imports to match — nothing else cares.

### 2. Edit `lib/siteConfig.ts`

This is the only file you need to touch to rebrand. Set:

- `businessName`, `websiteUrl` / `websiteLabel`, `phone`
- `links.privacy`, `links.terms`
- `images.*` (background images — see "Images" below)
- `event.*` (seminar title, description, headings, guest offer) — event form only

### 3. Wire up where submissions go

Open `lib/formSubmit.ts`. By default it **POSTs clean JSON** to `/api/contact`
and `/api/event`. Either:

- create those API routes (see `examples/api-contact.example.ts` /
  `examples/api-event.example.ts`), **or**
- change `submitEndpoints`, **or**
- replace the bodies of `submitContactForm` / `submitEventForm` to call your CRM,
  email service, database, Google Sheet webhook, etc.

Each function just has to return `{ success: boolean; error?: string }`.

That's it — render `<ContactFormV5 />` or `<EventFormV5 />` anywhere.

---

## Submission payloads (what your endpoint receives)

These replace the old opaque CRM field codes with clean, semantic objects
(defined in `lib/formSubmit.ts`).

**Contact form → `ContactSubmission`:**

```ts
{
  name: string;
  email: string;
  phone: string;            // formatted "(555) 123-4567"
  message: string;          // composed from the guided builder or free text
  referralSource: string;   // "How did you hear about us" answer (may be "")
  textOptIn: boolean;
  tracking: { gclid; utm_source; utm_medium; trigger_url };
}
```

**Event form → `EventSubmission`:**

```ts
{
  name: string;
  email: string;
  phone: string;
  message: string;          // living-trust answer, guest name, age, etc.
  smsOptIn: boolean;
  campaign: string;         // carried from the seminar / URL params (may be "")
  leadType: 'Seminar';
  tracking: { gclid; utm_source; utm_medium; trigger_url };
}
```

---

## Using the components

### Contact form

```tsx
import ContactFormV5 from './form-styles-kit/components/ContactFormV5';

<ContactFormV5 onClose={() => setOpen(false)} />
// onClose is optional — omit it to hide the close (X) button.
```

The contact form is **full-screen** (`fixed inset-0`). Render it as a route/page
or inside a full-screen modal/overlay.

### Event form

The event form needs a React Query provider and two data sources.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventFormV5 from './form-styles-kit/components/EventFormV5';

const qc = new QueryClient();

<QueryClientProvider client={qc}>
  <EventFormV5 onClose={() => setOpen(false)} />
</QueryClientProvider>
```

**Data:** `hooks/useEventData.ts` fetches:

- `GET /api/events` → array of `Seminar` (see `examples/events.example.json`)
- `GET /api/venue-photos` → array of `VenuePhoto` (optional; used for dynamic
  backgrounds — return `[]` if you don't have venue photos)

Change `dataEndpoints` in `hooks/useEventData.ts` to point elsewhere.

**Deep-linking / auto-open** (optional) via `initialParams`:

```tsx
<EventFormV5 initialParams={{ city: 'Phoenix', autoOpen: true, skipToForm: true }} />
```

Supported keys: `city`, `date`, `venue`, `campaign`, `autoOpen`, `skipToForm`,
`venuePhotoUrl`. If omitted, the form reads the same keys from the URL query string.

---

## Images

Both forms use a subtly panning/zooming background image with a dark gradient
overlay. Point `siteConfig.images` at your own:

- `contactDesktop` + `contactMobile` — contact form background (`<picture>` swaps
  at 601px).
- `eventBackground` — event form fallback background. When a matching venue photo
  is found it animates that in instead.

Use wide landscape images. Full `https://` URLs or local `/public` paths both work.

> No image pipeline is included — supply whatever URLs/paths your host serves.

---

## Analytics (optional)

`lib/analytics.ts` ships **no-op stubs** for `loadGTM`, `reportConversion`,
`getTrackingData`, and two remarketing helpers. The forms call these but work
fine if they do nothing. `getTrackingData` already captures `gclid` / `utm_*` from
the URL so attribution flows into your submission payload out of the box. Fill in
the other function bodies if you want GTM/GA4/remarketing.

---

## Theming / colors

The brand palette is documented in `siteConfig.colors`, but the components
currently **inline** these exact hex/rgba values (to stay byte-for-byte identical
to the originals). To re-theme, search both component files for these strings and
replace them:

| Value | Role |
| --- | --- |
| `#091a33` | page background (deep navy) |
| `#05285d` | button label text on white |
| `rgba(212,168,83,…)` | event accent / active filter chip (gold) |
| `rgba(112,60,88,…)` | contact chip selected state (plum) |
| `#ff6b6b` | validation error red |
| `#ffd700` | event "special offer" highlight |

---

## What was removed vs. the original

- ❌ CRM integration (the original posted opaque field codes to a CRM via a server
  action). Replaced with the clean `formSubmit.ts` adapter.
- ❌ Hardcoded brand values (business name, phone, domain, images, seminar copy).
  Moved to `siteConfig.ts`.
- ❌ Project-specific tracking/remarketing modules. Replaced with safe no-op stubs.

**Everything else — layout, animation, steps, validation, copy structure,
accessibility, `data-testid`s — is preserved 1:1.**
