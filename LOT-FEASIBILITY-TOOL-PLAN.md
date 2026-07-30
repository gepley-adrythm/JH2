# Tool Plan: "Can I Even Build on This Lot?" — Arizona Lot Feasibility Engine

Status: **PLANNING ONLY — nothing in this document is built.** Owner directive
2026-07-29: scope the tool in full before any implementation. This file is the
single source of truth for that scope.

Precedent: the construction-loan calculator (`lib/construction-loan` +
`/api/estimate` + 135 prerendered scenario pages + MCP tool). It worked because
it encoded expertise into an interactive surface and fed the content flywheel.
This tool is the same play aimed at the highest-anxiety moment in the entire
buying journey — before a builder is even chosen: **is this parcel buildable at
all, and what will make it painful?**

Why this one is a bigger moat than the calculator:

1. It fires **before** builder selection — first contact with the exact person
   we want.
2. The load-bearing layer is **field experience** (what actually burned us on
   rural Maricopa/Pinal land), which cannot be reverse-engineered from HTML.
3. The lead it produces — *a person with a specific parcel* — is the single
   most qualified lead type in this business, and the tool naturally asks for
   the parcel as its first input.

---

## 1. Product definition

**Input:** an address, an APN (assessor parcel number), or — critically — a
"just looking at an area" mode (pick jurisdiction + community) for people who
don't have a parcel yet. Never dead-end someone who lacks an APN.

**Output:** a **Lot Dossier** — a seven-dimension feasibility walkthrough where
every dimension gets:

- a verdict tier: `Looks clear` / `Verify before you offer` /
  `Known friction in this area` / `Potential dealbreaker`
- a plain-English explanation of *why* (from the knowledge layer)
- the specific thing to verify and *how* (who to call, what document to pull)
- a link to the relevant existing reference/FAQ page (we already wrote them)
- where one exists, a Jematell **field note** — the from-experience warning no
  competitor has

**The seven dimensions** (order matters — water first, because in rural
Maricopa it's the dealbreaker):

1. **Water source** — municipal service area vs private water company (EPCOR
   et al.) vs shared well vs exempt well vs hauled water. Rio Verde Foothills
   post-2023 hauling reality gets first-class treatment. Domestic Water
   Improvement Districts (DWIDs): what they are, whether one exists or is
   forming. Assured/adequate water supply rules where subdivision applies.
2. **Septic / wastewater** — sewer availability vs onsite wastewater; perc
   test reality by area (where perc failures cluster, alternative-system cost
   band); county Environmental Services permitting.
3. **Utility access** — power (SRP vs APS territory, distance-to-line cost
   reality), gas vs propane areas, internet reality. Line-extension quotes:
   what they cost and how long they take.
4. **Zoning & setbacks** — jurisdiction resolution first (city vs county
   island vs county), zoning district, minimum lot size, setbacks, height,
   accessory limits. Links straight into our per-city building-codes spokes.
5. **HOA / CC&R exposure** — is the parcel inside a platted community with
   CC&Rs, design review (DRC/ARC), build-timeline clauses, minimum square
   footage, RV/garage rules. Links into the community-design-guidelines
   module for covered communities.
6. **Environmental overlays** — NAOS (Scottsdale ESL), dark-sky ordinances
   (Cave Creek, Fountain Hills flavor), hillside/slope ordinances, washes and
   FEMA flood zones, fissure areas (Pinal), Sonoran desert tortoise / native
   plant salvage rules.
7. **Access & easements** — legal access vs physical access (the classic
   rural trap), recorded easements, private road maintenance agreements,
   flag lots, county road maintenance status (dirt roads that the county does
   NOT maintain).

**Closing screen:** the dossier summary + two CTAs — "email me this dossier"
(lead capture; see §6) and "walk this lot with us" (the premium ask).

---

## 2. Architecture (fits the existing stack, no new platforms)

Same shape as the calculator, with one structural difference: parcel-specific
answers cannot be prerendered, so the runtime lives in the api-server.

```
lib/lot-feasibility/          <- NEW shared workspace lib (pure, typed)
  src/knowledge/              <- THE MOAT: area profiles + field notes (data)
  src/schema.ts               <- KnowledgeArea, Dimension, Verdict, FieldNote
  src/engine.ts               <- pure evaluation: (parcelFacts, area) -> Dossier
  src/index.ts

artifacts/api-server/
  routes/lot.ts               <- POST /api/lot/resolve (APN/address -> facts)
                                 POST /api/lot/dossier (facts -> dossier JSON)
                                 mounts MCP tool alongside existing /mcp
  services/parcelLookup.ts    <- county assessor/GIS adapters (Phase 2+)

artifacts/jematell-homes/
  app/lot-check/page.tsx      <- the tool page (client island, code-split
                                 exactly like the calculator; route JS budget
                                 applies — audit.mjs gates it)
  app/lot-check/[area]/page.tsx <- ~30-60 PRERENDERED area feasibility pages
                                 (the SEO layer; same pattern as
                                 /financing/estimate/*)
```

Design rules carried over from the calculator build:

- **One engine, three consumers**: the interactive tool, the prerendered area
  pages, and the MCP tool all call the same `lib/lot-feasibility` evaluation
  so they can never disagree.
- The tool page is a client island on its own route; the rest of the site
  ships zero extra JS. Per-route JS budget (200KB gz) is a hard gate.
- Static export stays intact. Only `/api/lot/*` is runtime.
- Every page must hold the current bars: Lighthouse performance ~100 warm,
  **accessibility 100 (non-negotiable, now a standing requirement)**, zero
  CLS, entrance animations per the house system (start at opacity 0.01 —
  see transitions.css note).

---

## 3. The knowledge layer (the actual moat)

A versioned, reviewable dataset — NOT scattered prose. Proposed shape:

```ts
interface KnowledgeArea {
  slug: string;                 // "rio-verde-foothills", "cave-creek", ...
  jurisdiction: string;         // resolves to building-codes module city
  appliesTo: AreaMatcher;       // zip list + optional GIS polygon later
  dimensions: Record<DimensionKey, DimensionProfile>;
}

interface DimensionProfile {
  defaultVerdict: VerdictTier;
  summary: string;              // plain-English area reality
  verifySteps: VerifyStep[];    // who to call / what to pull / what it costs
  referenceLinks: string[];     // slugs into faq/reference/glossary (resolve
                                // against seed.ts + reference.json at build)
  fieldNotes: FieldNote[];      // the Jematell-experience layer
  lastReviewed: string;         // staleness guard — surfaces in admin, not UI
}
```

**Field notes are the differentiator and they cannot be written by an AI or a
researcher.** They come from a structured interview with Joe and Tyler, per
area, per dimension. Draft interview prompts (Phase 0 deliverable):

- "Tell me about a lot in [area] you walked away from. What killed it?"
- "What does a water-hauling setup actually cost a family per month in RVF
  right now, and what do buyers always get wrong about it?"
- "Where have perc tests failed on you? What did the alternative system cost?"
- "What's the worst easement surprise you've hit? How would a buyer have
  caught it before closing?"
- "Which HOAs/DRCs are slow or hostile, and which are easy to work with?"
  (Publish carefully — tone: factual timelines, not opinions.)
- "What line-extension quote shocked a client? Distance, utility, number."

Pilot coverage (Phase 0): **Rio Verde Foothills, Cave Creek/Carefree, North
Scottsdale (ESL), San Tan / Pinal County** — the four areas where feasibility
pain is highest and our existing content is deepest. Then the remaining
service areas.

**Content scaffolding already in place** (link, don't rewrite): shared well
agreement FAQ, Rio Verde water-hauling coverage, DWID explainer, perc test
FAQ/glossary, per-city zoning & setback spokes (all 10 jurisdictions),
Scottsdale ESL/NAOS pillar, Cave Creek dark-sky material, easement/plat/CC&R
glossary entries, community-design-guidelines module. The build step should
resolve exact slugs from `lib/faq/src/seed.ts` and `reference.json` (those are
the operative sources — NOT the markdown mirrors) and fail the build on any
dead link, same standard as content-lint.

---

## 4. The parcel layer (best-effort automation, graceful degradation)

Public lookups that can turn an APN/address into facts. **Every endpoint below
is TO-VERIFY at build time — a Phase 2 spike task, not a settled fact.** Do
not assert any of these in UI copy until proven in code.

| Fact | Candidate source | Notes |
|---|---|---|
| APN -> address, lot size, jurisdiction | Maricopa County Assessor public API; Pinal County parcel search | Maricopa has a documented JSON API (verify current terms + rate limits). Pinal likely scrape-or-GIS. |
| Parcel polygon / GIS | County GIS open-data portals | Needed only for overlay checks; Phase 3. |
| Zoning district | City GIS layers (Scottsdale, Phoenix, Mesa...), county zoning for unincorporated | Phoenix/Mesa blocked automated fetch during content research (403) — expect the same; plan for manual fallback copy. |
| Nearby registered wells | ADWR well registry (Wells55) open data | Strong candidate for a genuinely impressive feature: "N registered wells within half a mile." Verify API. |
| Water provider service area | ADWR / provider boundary data, EPCOR maps | May be partly manual (knowledge layer covers the gaps). |
| Flood zone | FEMA NFHL | Public, stable. Phase 3 overlay. |
| Utility territory (SRP vs APS) | Published territory maps | Possibly knowledge-layer-only (zip granularity is fine). |

Degradation rule: **the tool must be fully useful with zero external APIs
working** — jurisdiction + community selection alone must produce a complete,
honest dossier from the knowledge layer, with "how to verify" steps standing
in for automated facts. APIs upgrade the experience; they are not load-bearing.

Caching: parcel lookups cached server-side (api-server) with short TTL;
assessor data is not ours to redistribute wholesale — we display per-query
facts with attribution, never bulk-store or resell. Check each source's terms
during the Phase 2 spike and record findings in this file.

---

## 5. UX flow (wizard)

1. **Entry**: address / APN / "exploring an area" picker. Set expectations in
   one sentence: educational pre-diligence, not a survey or title search.
2. **Resolve & confirm**: show what we resolved (jurisdiction, community,
   lot size if known) — user confirms or corrects. Wrong-parcel errors die here.
3. **Seven dimension cards**, walked in order, each with verdict tier, the
   why, the verify steps, reference links, field note. Progressive reveal =
   natural narrative tension; verdictless skeleton first so nothing jumps
   (CLS 0 rule).
4. **Dossier summary**: tier rollup (the single headline verdict is the
   worst tier present), the "what to do next week" checklist.
5. **Capture**: email-the-dossier form (name/email/phone optional) and
   book-a-lot-walk CTA. Both feed the existing contact pipeline.
6. Shareable URL for the area-mode (`/lot-check/rio-verde-foothills`);
   parcel-mode results are NOT indexable/shareable (privacy; also parcel data
   freshness).

Design language: house system (Cormorant/DM Sans, warm palette, entrance
system, premium spacing). The seven cards are a natural fit for the section
treatments built for the guide-page quality pass.

---

## 6. Lead capture & attribution

- Reuse `submitContactForm` + `/api/contact` (Gmail connector) with a new
  lead type marker so the subject line reads
  `New LOT CHECK lead: {name} — {area or APN}`.
- The dossier itself goes in the email body — the sales team sees exactly
  what the prospect saw, dimension by dimension.
- Attribution rides automatically: the tracking module (first-touch,
  UTMs > click-ids > referrer; fixed 2026-07-29 so paid never reads organic)
  already attaches to every submission. A lot-check lead that came from a
  Google ad vs an organic guide page will say so in the email.
- Requires extending `SubmitContactBody` (generated zod in
  `lib/api-zod`) with the dossier payload — remember the schema STRIPS
  unknown keys, so this is a schema change, not just a client change. Find
  the generator source first (orval; see `.agents/memory/`).

---

## 7. SEO / AEO surface

- **Area feasibility pages** (`/lot-check/[area]`, prerendered): "Can you
  build on land in Rio Verde Foothills?" etc. — one per knowledge area,
  ~30-60 pages at maturity. Same static-page pattern as the estimate pages;
  each is the area's dossier in narrative form, interlinked with the FAQ/
  reference corpus (the interlink engine already exists).
- The tool itself exposed via **MCP** (`/mcp`) like the estimate tool — AI
  assistants can answer "can I build on a lot in Cave Creek" from our engine,
  with attribution back to the site.
- JSON-LD: the area pages are strong `FAQPage`/`HowTo` candidates; verify
  against current Google policy at build time (don't assume rich-result
  eligibility).
- Route parity gate updates with the new routes; sitemap + llms.txt pick
  them up through the existing generators.

---

## 8. Phasing (each phase independently shippable, all gates green)

| Phase | Deliverable | Depends on |
|---|---|---|
| **0. Knowledge schema + pilot data** | `lib/lot-feasibility` schema + engine + 4 pilot areas fully authored (field-note interviews DONE — this is the long pole and it's human work, schedule it first) | Joe/Tyler interview time |
| **1. Area-mode wizard** | `/lot-check` live with area picker only (no parcel APIs), dossier + capture + email; 4 area pages prerendered | Phase 0 |
| **2. Parcel resolution spike + integration** | APN/address -> facts via whichever county APIs survive the verification spike; graceful fallback proven by turning the APIs off in a test | Phase 1 |
| **3. GIS overlays** | flood zone, wells-nearby, zoning layer where available | Phase 2 |
| **4. Full area buildout + MCP + JSON-LD** | remaining service areas authored; MCP tool; area pages to ~30-60 | Phases 1-3 |

Explicit non-goals (v1): slope analysis from elevation data, title/easement
record retrieval (we tell users HOW to pull title commitments; we don't do
it), cost estimation beyond banded ranges (the calculator handles money),
anything that could read as a survey, appraisal, or legal opinion.

---

## 9. Risks & guardrails

- **Liability**: every dossier carries the dt-disclaimer treatment + a
  tool-specific line ("educational pre-diligence; verify with the county,
  a licensed surveyor, and a title company before purchasing"). Legal review
  of the copy before launch. The verdict tiers deliberately say "verify" and
  "risk," never "you cannot build."
- **Staleness**: RVF water, DWID formation, and ordinances change.
  `lastReviewed` per dimension per area + a quarterly review checklist added
  to the ops docs. Stale (>6 months) dimensions render a "confirm current
  status" banner automatically.
- **API fragility**: covered by the degradation rule (§4). No external call
  on the critical render path; lookups are async enhancements.
- **Perf/a11y**: the standing bars apply (perf ~100 warm, a11y 100, CLS 0,
  route JS budget). The wizard is the heaviest interactive surface after the
  calculator — budget it from day one, don't retrofit.
- **Competitive leakage**: field notes ship as rendered prose, not as a
  downloadable dataset; the MCP tool returns dossier summaries, not the raw
  knowledge base.
- **Repo rules**: images (if any area photos are used) follow the originals-
  protection policy in replit.md; contrast-pinned colors stay pinned.

## 10. Open questions for the team

1. Interview scheduling: 2-3 hours with Joe/Tyler per §3 — who books it?
2. Which four pilot areas — confirm RVF / Cave Creek-Carefree / N Scottsdale
   ESL / Pinal-San Tan, or swap one?
3. Lead routing: does a LOT CHECK lead go to the same inbox, or straight to
   whoever walks lots?
4. Do we want the "book a lot walk" CTA to offer a paid pre-purchase lot
   consult (productizes the expertise), or keep it free as lead-gen?
5. Comfort level publishing HOA/DRC timeline observations by name (§3
   interview note) — factual-only policy proposal attached to the copy
   review.
