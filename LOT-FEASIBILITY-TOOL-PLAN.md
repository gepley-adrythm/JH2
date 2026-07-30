# Tool Plan: "Can I Even Build on This Lot?" — Arizona Lot Feasibility Engine

Status: **PLANNING ONLY — nothing here is built.** Owner directive 2026-07-29.
Second pass, written as if build starts tomorrow: endpoints verified live,
corpus slugs resolved, schemas drafted, file manifest concrete. Sections
marked ✅ were verified against the real service or repo on 2026-07-29;
sections marked ⚠ are the known unknowns with their verification step.

Precedent: the construction-loan calculator (`lib/construction-loan`,
`/api/estimate`, 135 prerendered scenario pages, MCP tool). Same play, aimed
earlier in the funnel: **is this parcel buildable, and what will hurt?**

Why this beats the calculator as a moat: it fires before builder selection;
its load-bearing layer is field experience (not reverse-engineerable from
HTML); and its natural first input — a specific parcel — is the most
qualified lead signal that exists in this business.

---

## 1. Product definition

**Input:** address, APN, or "exploring an area" (jurisdiction + community
picker). Never dead-end a visitor without a parcel.

**Output:** a **Lot Dossier** — seven dimensions, each with:
- verdict tier: `looks-clear` / `verify-before-offer` / `known-friction` /
  `dealbreaker-risk`
- plain-English why (knowledge layer)
- concrete verify steps (who to call, what document, rough cost)
- links into our existing corpus (exact slugs — see §3, all confirmed real)
- Jematell **field notes** where they exist (the un-copyable layer)

**Dimensions, in order** (water first — it's the rural-Maricopa dealbreaker):
water source · septic/wastewater · utility access · zoning & setbacks ·
HOA/CC&R exposure · environmental overlays (NAOS/ESL, dark-sky, hillside,
washes/flood, fissures) · access & easements.

**Close:** dossier summary (headline verdict = worst tier present) + "email
me this dossier" (lead capture) + "walk this lot with us" CTA.

---

## 2. Architecture ✅ (mirrors the calculator; verified against repo layout)

```
lib/lot-feasibility/                      NEW workspace lib (pure, typed)
  package.json                            "@workspace/lot-feasibility"
  src/schema.ts                           types below (§3)
  src/engine.ts                           (facts, area) -> Dossier  [pure]
  src/knowledge/index.ts                  registry of KnowledgeArea files
  src/knowledge/rio-verde-foothills.ts    pilot area 1 (worked example §4)
  src/knowledge/cave-creek-carefree.ts    pilot area 2
  src/knowledge/north-scottsdale-esl.ts   pilot area 3
  src/knowledge/pinal-san-tan.ts          pilot area 4

artifacts/api-server/src/
  routes/lot.ts                           POST /api/lot/resolve, /api/lot/dossier
  services/parcel/maricopaParcel.ts       ArcGIS adapter (§5.1)
  services/parcel/adwrWells.ts            Wells55 adapter (§5.2)
  services/parcel/cache.ts                in-memory TTL cache (autoscale-safe:
                                          per-instance, short TTL, no disk)

lib/api-spec/openapi.yaml                 ADD lot paths -> regenerate zod (§7)

artifacts/jematell-homes/
  app/lot-check/page.tsx                  tool page (RSC shell + client island)
  app/lot-check/[area]/page.tsx           prerendered area pages (SSG params
                                          from knowledge registry)
  src/views/LotCheckWizard.tsx            "use client" island, code-split like
                                          ConstructionLoanCalculator
```

Rules carried over: one engine, three consumers (wizard, area pages, MCP) so
they can never disagree; static export untouched (only /api/lot/* is
runtime); tool JS code-split to its route.

**Route JS budget math** ✅ (measured basis: /financing ships ~190KB gz with
the calculator against the 200KB audit gate): the wizard is forms + text +
fetch — no charting, no leaflet. Target: **page chunk ≤ 25KB gz**, route
total ≤ 185KB gz. audit.mjs gains `/lot-check` in its checked-routes list on
day one, plus the standing bars: Lighthouse perf ~100 warm, **accessibility
100 (all 33+ templates hold this today — new templates must too)**, CLS 0,
entrance animations start at opacity 0.01 (never 0 — LCP eligibility, see
transitions.css).

---

## 3. Knowledge schema (concrete)

```ts
export type DimensionKey =
  | "water" | "septic" | "utilities" | "zoning"
  | "hoa" | "overlays" | "access";

export type VerdictTier =
  | "looks-clear" | "verify-before-offer"
  | "known-friction" | "dealbreaker-risk";

export interface VerifyStep {
  action: string;          // "Call Maricopa Environmental Services (602-506-6666)"
  artifact?: string;       // "Septic permit record / perc test on file"
  costBand?: string;       // "$0" | "$1,200-$2,500" ...
  timeBand?: string;       // "same day" | "2-4 weeks"
}

export interface FieldNote {
  note: string;            // first-person, from the team interview
  attributedTo?: string;   // "Joe" | "Tyler" | "Jematell field crew"
}

export interface DimensionProfile {
  defaultVerdict: VerdictTier;
  summary: string;
  verifySteps: VerifyStep[];
  referenceSlugs: string[];   // /faq/<slug> | /reference-library/<module>/<slug>
                              // BUILD GATE: every slug must resolve against
                              // lib/faq/src/seed.ts + reference.json (the
                              // operative sources — NOT the markdown mirrors)
                              // or the build fails, same as content-lint.
  fieldNotes: FieldNote[];
  lastReviewed: string;       // "2026-07"; >6mo stale => "confirm current
                              // status" banner renders automatically
}

export interface KnowledgeArea {
  slug: string;               // route segment for /lot-check/[area]
  title: string;              // "Rio Verde Foothills"
  jurisdictionSlug: string;   // joins to building-codes module city
  zipHints: string[];         // for address->area inference (Phase 2)
  county: "maricopa" | "pinal";
  dimensions: Record<DimensionKey, DimensionProfile>;
}
```

**Corpus backing is already real.** Slugs confirmed present in seed.ts /
reference.json on 2026-07-29 (sample; resolve full list at build):

- water: `how-to-get-water-to-a-home-in-rio-verde-foothills`,
  `how-much-does-it-cost-to-haul-water-in-rio-verde-foothills`,
  `how-big-a-water-storage-tank-do-i-need-for-a-hauled-water-home-in-arizona`,
  `building-in-rio-verde-foothills-water-rules`,
  `assured-vs-adequate-water-supply-and-the-100-year-rule`,
  `does-a-well-or-hauled-water-affect-a-rio-verde-foothills-property-value-and-financing`,
  ref `ars-45-454-exempt-domestic-well-arizona`, ref `ars-45-596-well-drilling-notice-arizona`
- septic: `how-close-can-a-well-be-to-a-septic-system-in-arizona`,
  `septic-permits-and-the-transfer-of-ownership-inspection`,
  ref `maricopa-county-septic-and-well-requirements`,
  ref `pinal-county-septic-and-well-requirements`
- utilities: `how-much-does-it-cost-to-extend-power-or-utilities-to-a-rural-arizona-lot`,
  `how-does-temporary-construction-power-and-the-meter-spot-work-on-a-new-arizona-home`
- zoning: `rural-residential-zoning-districts-in-maricopa-county`, ref
  `maricopa-county-residential-zoning-and-setbacks` (+ all 10 per-city
  zoning/setback spokes exist, incl. `cave-creek-…`, `carefree-…`,
  `pinal-county-…`)
- hoa: `how-does-hoa-design-review-affect-building-a-custom-home`,
  `how-much-are-hoa-design-review-fees-for-a-custom-home-in-arizona`
  (+ community-design-guidelines module for named communities)
- overlays: `what-is-a-building-envelope-or-naos-easement-on-an-arizona-custom-lot`,
  `what-is-plant-salvage-or-cactus-boxing-before-grading-on-a-scottsdale-esl-lot`,
  `desert-and-dark-sky-design-rules-cave-creek-carefree`,
  `do-i-need-a-floodplain-use-permit-to-build-near-a-wash-in-maricopa-county`,
  `earth-fissures-and-land-subsidence-in-pinal-county`
- access: `how-do-i-confirm-legal-access-to-a-rural-lot`

**Field notes come from a structured team interview** (2-3h with Joe/Tyler;
Phase 0's long pole). Question set: the lot you walked away from and why;
real monthly hauling cost a family pays now and what buyers get wrong; where
perc tests failed and what the alternative system cost; the worst easement
surprise and how a buyer could have caught it; which DRCs are slow vs easy
(publish as factual timelines only); the line-extension quote that shocked a
client (utility, distance, number).

---

## 4. Worked example — `rio-verde-foothills.ts` (draft content, water dimension)

```ts
water: {
  defaultVerdict: "known-friction",
  summary:
    "Most RVF lots have no municipal water and never will. Your realistic " +
    "options are an on-site exempt well (hit-or-miss depth and yield in this " +
    "area), a shared well agreement with neighbors, or hauled water into a " +
    "storage tank — which after the 2023 Scottsdale standpipe cutoff means " +
    "knowing exactly which hauler serves your road and at what price.",
  verifySteps: [
    { action: "Search ADWR Wells55 for registered wells within a half mile of the parcel (the tool does this automatically when you enter an APN)", artifact: "Nearby well count, depths, and drill dates", costBand: "$0", timeBand: "instant" },
    { action: "If a shared well is claimed, demand the recorded shared well agreement and check it names this parcel", artifact: "Recorded agreement (county recorder)", costBand: "$0", timeBand: "same day" },
    { action: "Get a written quote from a hauler that actually serves the parcel's road", artifact: "Quote naming the address", costBand: "varies", timeBand: "days" },
  ],
  referenceSlugs: [
    "how-to-get-water-to-a-home-in-rio-verde-foothills",
    "how-much-does-it-cost-to-haul-water-in-rio-verde-foothills",
    "how-big-a-water-storage-tank-do-i-need-for-a-hauled-water-home-in-arizona",
    "building-in-rio-verde-foothills-water-rules",
    "reference-library/arizona-building-law/ars-45-454-exempt-domestic-well-arizona",
  ],
  fieldNotes: [
    // FROM INTERVIEW — placeholders illustrate the shape, do not publish:
    // { note: "…", attributedTo: "Joe" },
  ],
  lastReviewed: "2026-07",
},
```

The other six dimensions follow the same pattern; the numbers inside
summaries/costBands must come from our published pages (which are sourced)
or the interview — never invented.

---

## 5. Parcel layer — VERIFIED endpoints

### 5.1 Maricopa parcels ✅ live (checked 2026-07-29)

`https://gis.mcassessor.maricopa.gov/arcgis/rest/services/Parcels/MapServer`
answered: ArcGIS 11.5, layer 0 "Parcels", esriGeometryPolygon, copyright
Maricopa County Assessor. Query shape (standard ArcGIS REST):

```
GET …/Parcels/MapServer/0/query
  ?where=APN='219-38-016'        ⚠ exact field name TO-CONFIRM via ?f=json fields list
  &outFields=*&returnGeometry=true&outSR=4326&f=json
```

Gives polygon + attributes (APN, situs address, size). Separately, the
Assessor's **documented JSON API** (`mcassessor.maricopa.gov`, PDF docs on
their site) returns richer parcel data **but requires an API key requested
via their contact form ("API Token/Question")** — ⚠ **day-1 action item:
request the key; lead time unknown.** Build against the open ArcGIS layer
first; treat the keyed API as an upgrade.
⚠ Confirm ToS: per-query display with attribution (we never bulk-store or
redistribute), rate limits unknown — cache per-instance, 15-min TTL.

### 5.2 ADWR Wells55 ✅ live (checked 2026-07-29)

`https://services.arcgis.com/C34zQ7veRS0V1t04/ArcGIS/rest/services/Well_Registry_2024/FeatureServer`
answered with the registry description (NOI series 55-500000/55-900000,
existing-well registrations, discovered wells). No key. The killer query:

```
GET …/FeatureServer/0/query
  ?geometry={"x":-111.67,"y":33.72}&geometryType=esriGeometryPoint&inSR=4326
  &distance=805&units=esriSRUnit_Meter
  &outFields=REGISTRY_ID,WELL_DEPTH,INSTALLED&f=json      ⚠ field names TO-CONFIRM
```

→ "**N registered wells within a half mile**, typical depth ~X ft" rendered
on the water card. This is the single most impressive automated fact in v1
and it costs nothing.

### 5.3 The rest

| Fact | Source | Status |
|---|---|---|
| Pinal parcels | Pinal County GIS/parcel search | ⚠ spike: find their ArcGIS REST equivalent |
| City zoning district | city GIS layers | ⚠ Phoenix/Mesa 403'd automated fetches during content research — expect friction; knowledge layer covers with per-city defaults + "look up your district here" links |
| Flood zone | FEMA NFHL ArcGIS services | ⚠ Phase 3; endpoint family well known, confirm layer ids |
| SRP vs APS territory | published maps | knowledge layer at zip granularity (good enough) |
| Water provider boundary | ADWR/EPCOR maps | knowledge layer v1; GIS later |

**Degradation rule (hard requirement):** the tool must produce a complete,
honest dossier with ALL external APIs off — area mode + knowledge layer
only. Prove it with a test that stubs every adapter to fail. APIs are
enhancements, never load-bearing.

---

## 6. API contracts (concrete)

```
POST /api/lot/resolve
  { "query": "219-38-016" | "13822 E Windstone Trl" , "hint": { "county": "maricopa" }? }
→ { "ok": true,
    "parcel": { "apn": "219-38-016", "address": "…", "county": "maricopa",
                "jurisdiction": "maricopa-county", "areaSlug": "rio-verde-foothills",
                "acreage": 1.25, "centroid": { "lat": 33.72, "lon": -111.67 } },
    "confidence": "exact" | "approximate" }
| { "ok": false, "reason": "not-found" | "outside-service-area" | "lookup-unavailable",
    "fallback": { "areas": [ …KnowledgeArea summaries… ] } }

POST /api/lot/dossier
  { "areaSlug": "rio-verde-foothills", "parcel"?: <resolve result>,
    "enrich"?: { "wellsNearby": true } }
→ { "dossier": { "headline": "verify-before-offer",
      "dimensions": [ { "key": "water", "verdict": "known-friction",
        "summary": "…", "verifySteps": […], "references": [{ "title": "…", "url": "/faq/…" }],
        "fieldNotes": […], "auto": { "wellsWithinHalfMile": 14, "medianDepthFt": 540 }? } … ] } }
```

Zod: add both paths to `lib/api-spec/openapi.yaml` and regenerate —
**orval v8.9.1 generates `lib/api-zod/src/generated/api.ts` from that yaml**
(header confirms; the generated file is do-not-edit). ⚠ locate the exact
orval invocation (config file or script) before first regen; record it here.
Remember: generated schemas STRIP unknown keys — the dossier-email payload
(§8) must be IN the yaml, not bolted on client-side.

MCP: add `lot_feasibility` tool beside the existing estimate tool in
`routes/mcp.ts` — input `{ area | apn }`, output the dossier summary (not the
raw knowledge base; competitive-leakage rule).

---

## 7. Wizard UX (screen-by-screen)

1. **Entry** — one field (address or APN) + "just exploring an area" link.
   Sub-line: "Educational pre-diligence for Maricopa & Pinal county land —
   not a survey, appraisal, or title search."
2. **Confirm** — "We found: APN 219-38-016, 1.25 ac, Rio Verde Foothills
   (unincorporated Maricopa County). Right parcel?" [Yes / fix]. On lookup
   failure: area picker, zero friction, no error theatrics.
3. **Dimension cards ×7** — verdict chip + why + verify steps (collapsed
   accordion, the detail-page interaction pattern) + reference links +
   field-note callout (distinct visual voice, e.g. the pull-quote treatment
   from the guide redesign). Skeleton heights fixed (CLS 0). Water card
   renders the wells-nearby auto-fact when available.
4. **Dossier summary** — tier rollup, "this week" checklist (top verify step
   per non-clear dimension), then capture: email-the-dossier (name, email,
   phone optional) + "walk this lot with us."
5. Area mode shares a URL (`/lot-check/rio-verde-foothills`); parcel results
   are not indexable or shareable (privacy + freshness).

Copy tone: house voice. Verdicts never say "you cannot build" — they say
what to verify and what it costs to find out.

---

## 8. Lead capture & attribution ✅ (pipeline verified end-to-end 2026-07-29)

Reuse `submitContactForm` → `/api/contact` (Gmail connector). Subject:
`New LOT CHECK lead: {name} — {areaTitle}{apn ? " / APN " + apn : ""}`.
Body = the dossier the prospect saw, dimension by dimension, above the
existing attribution block (source/medium/campaign/click-ids/referrer —
first-touch, click-ids-before-referrer as of 6a90829, so paid never reads
organic). Requires the openapi.yaml change from §6.

---

## 9. SEO/AEO surface

- `/lot-check/[area]` prerendered pages (start 4, grow to ~30-60): the area
  dossier as narrative, interlinked via the existing "Keep exploring" engine
  into the 40+ backing pages. Sitemap/robots/llms.txt pick them up from the
  route tree automatically; route-parity baseline +N.
- JSON-LD: FAQPage on area pages ⚠ verify current rich-result eligibility
  at build; the tool page itself gets WebApplication markup like the
  calculator.
- MCP exposure per §6.

---

## 10. Phases (each shippable, all gates green)

| Phase | Deliverable | Exit test |
|---|---|---|
| **0** | Schema + engine in `lib/lot-feasibility` with unit tests; 4 pilot areas authored; **interviews done**; Maricopa API key requested (lead time!) | engine snapshot tests; every referenceSlug resolves |
| **1** | `/lot-check` area-mode wizard + 4 area pages + dossier email | all-APIs-off test passes; a11y 100; route JS ≤ budget; lead email lands with attribution |
| **2** | Parcel resolve (Maricopa ArcGIS + address geocode) + Wells55 enrichment | APN + address round-trip on 10 real RVF/Cave Creek parcels; graceful-fail proven |
| **3** | Pinal parcels; FEMA flood layer; zoning-district lookups where cities allow | overlay facts on test parcels match county viewers |
| **4** | Remaining areas; MCP tool; JSON-LD | area pages ~30+; MCP answers area queries |

Non-goals (v1): slope analysis, title/easement retrieval (we teach HOW),
cost estimation beyond bands (calculator's job), anything reading as survey/
legal opinion.

## 11. Risks & guardrails

- **Liability**: dt-disclaimer treatment + tool-specific line on every
  dossier + legal review of verdict copy. Tiers say "verify," never "cannot."
- **Staleness**: `lastReviewed` per dimension; >6mo renders a confirm-status
  banner; quarterly review task in ops docs. RVF water is the volatile one.
- **API fragility**: §5 degradation rule; adapters time-boxed (3s) and
  fire-and-forget enrichments, never render-blocking.
- **Perf/a11y**: §2 budgets; new templates enter the audit route list and
  the 33-template a11y sweep on day one.
- **Leakage**: field notes ship as rendered prose; MCP returns summaries.
- **Repo rules**: originals-protection for any imagery; contrast-pinned
  colors stay pinned.

## 12. Open questions for the team

1. Book the Joe/Tyler interview (2-3h) — the Phase-0 long pole.
2. Confirm pilot areas: RVF / Cave Creek-Carefree / N Scottsdale ESL /
   Pinal-San Tan?
3. Lead routing for LOT CHECK leads — same inbox or straight to whoever
   walks lots?
4. Free lot-walk CTA vs productized paid pre-purchase lot consult?
5. Comfort publishing named-DRC timeline observations (factual-only policy)?
6. Who requests the Maricopa Assessor API token (form asks for requester
   identity), and under whose name?
