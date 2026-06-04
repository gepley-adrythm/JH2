# Jematell Homes — FAQ / Resource Content Plan

**Prepared:** June 4, 2026
**Scope:** Source-grounded FAQ and resource content for the custom-home buyer in Jematell's build area
**Build markets covered:** Scottsdale, Rio Verde (Foothills), Phoenix, Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, plus Build-on-Your-Lot / Buy-a-Lot programs
**Grounding standard:** Every proposed answer ties to at least one authoritative source. Not every topic is "law" — some are state statute or city code, some are county process, and some are practical building guidance grounded in government, code-body, or institutional references. The numbered sources at the bottom feed the inline `[N]` tags throughout.

---

## 1. How to use this plan

Each proposed piece carries a **scope tag** so we know how widely it applies and how often it needs maintenance:

- **STATE** — Arizona-wide statute or program. Applies to every market; lowest churn.
- **COUNTY** — Maricopa County or Pinal County process (permits, septic, floodplain, dust, fissures). Applies to whole groups of markets.
- **CITY** — One jurisdiction's adopted code or ordinance (Scottsdale ESLO, Fountain Hills hillside, etc.). Highest churn; verify adopted code version yearly.
- **BROAD** — Practical, non-regulatory guidance (cost, timeline, financing, desert design). Grounded in sources but evergreen.

The existing FAQ already follows a "research-phase, building-code-grounded, always-confirm-with-the-AHJ" voice. This plan keeps that voice and extends it across the full build footprint, so a buyer in Casa Grande or Cave Creek finds answers as specific as the Scottsdale buyer does today.

---

## 2. What is already live (do not duplicate)

The shipped FAQ (`lib/faq/src/seed.ts`) covers 5 categories and ~13 questions:

| Category | Live questions |
|---|---|
| Permits, Codes & Inspections | permit in Maricopa County; building codes in AZ; permitting time in Scottsdale |
| Land & Due Diligence | is a lot buildable; soils / geotechnical report |
| Water, Septic & Utilities | build without city water/sewer; how septic works; AZ 100-year water supply rule |
| Costs & Budget | cost to build; allowances & change orders; financing a build |
| Design, Zoning & ADUs | setbacks / lot coverage / NAOS; can I build a casita/ADU |

The plan below **expands breadth (more markets, more scopes)** and **fills gaps (floodplain, fissures, dust, energy, HOA design review, timeline, lot-purchase mechanics)** rather than rewriting what exists.

---

## 3. Proposed content, by category

### A. Permits, Codes & Inspections

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| A1 | Which building codes apply in each city we build in | CITY | All 8 markets | A single comparison page: each city's adopted IRC/IBC edition + local amendments. Phoenix adopted the 2024 I-Codes (PBCC), effective Aug 1, 2025; note AZ has no mandatory statewide building code, so adoption is per-jurisdiction. | [11][16][17][21] |
| A2 | Do I need a permit in unincorporated Maricopa County (Rio Verde Foothills)? | COUNTY | Rio Verde, other unincorporated | County Planning & Development, not a city, is the AHJ; septic clearance from County Environmental Services is required before a building permit releases in unincorporated areas. | [12][13][14] |
| A3 | How permitting works in Pinal County (Casa Grande, Apache Junction edges) | COUNTY | Casa Grande, Apache Junction | Pinal County Community Development process, application packet, exemptions; when the city vs. county is the AHJ. | [19][21] |
| A4 | What inspections happen during a custom-home build (and in what order) | BROAD | All | Standard IRC inspection sequence (footing, foundation, framing, MEP rough-in, final) framed around a custom build. | [29] |
| A5 | The dust-control rule every Valley construction site must follow | COUNTY | Maricopa markets | MCAQD Rule 310 fugitive-dust requirements and dust-control training/permit triggers for earthmoving. | [23] |

### B. Land & Due Diligence

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| B1 | Earth fissures and land subsidence: due diligence for Pinal County lots | COUNTY | Casa Grande, Apache Junction | Why groundwater withdrawal causes fissures, how to check the AZGS fissure viewer before buying, and what it means for siting. | [22] |
| B2 | Is the lot in a floodplain? Maricopa County floodplain use permits | COUNTY | Maricopa markets | FCDMC Special Flood Hazard Area lookup, when a Floodplain Use Permit is required, elevation implications. | [31] |
| B3 | Caliche, expansive clay, and desert soils: why the geotech report drives the foundation | BROAD | All | Extends the live soils answer with AZ-specific soil behavior and how it changes foundation design/cost. | [22] (siting) + builder/eng. references |
| B4 | Buying raw land vs. a finished lot in our markets | BROAD | All | Utilities-to-the-lot, access/easements, well/septic feasibility checklist before you sign. | [12][14] |

### C. Water, Septic & Utilities

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| C1 | Drilling a well in Arizona: the exempt-well rule (A.R.S. 45-454) | STATE | Rural lots (Rio Verde, outlying) | Exempt vs. non-exempt wells, ADWR drilling/registration, well-spacing/impact considerations. | [1][2] |
| C2 | Septic permits and the transfer-of-ownership inspection | STATE+COUNTY | All on septic | ADEQ R18-9 framework + Maricopa County Environmental Services permitting and the resale transfer inspection. | [8][9][14] |
| C3 | Rio Verde Foothills water: what happened and how lots get water now | CITY/COUNTY | Rio Verde | The 2023 cutoff, the standpipe-district / EPCOR fill-station resolution, what a buyer should verify today. | [13][25] |
| C4 | Assured vs. adequate water supply and the 100-year rule | STATE | All (AMA-dependent) | Extends the live 100-year answer with the AWS designation/certificate distinction and recent Phoenix-AMA limits. | [7] |

### D. Costs & Budget

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| D1 | Permit, impact, and development fees: what they add to a build | CITY | Scottsdale (worked example) | Real Scottsdale FY25-26 fee schedule as the worked example; note each city sets its own. | [30] |
| D2 | How a construction-to-permanent (one-time-close) loan works | BROAD | All | Draw schedule, interest-only during build, single close; how it differs from a standard mortgage. | [26] |
| D3 | What drives custom-home cost per square foot in our markets | BROAD | All | Site work, finish level, lot conditions (slope, soils, well/septic) as cost drivers. | [22][26] |

### E. Design, Zoning & ADUs

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| E1 | Casitas and ADUs after HB 2720: what changed statewide | STATE | All (municipal) | The 2024 "Casita Bill" (A.R.S. 9-461.18) and how it constrains city ADU rules; note county/unincorporated nuance. | [5][6] |
| E2 | Scottsdale's Environmentally Sensitive Lands Ordinance (ESLO) and NAOS | CITY | Scottsdale | NAOS set-aside, hillside/native plant rules across the 134-sq-mi ESL overlay. | [15] |
| E3 | Hillside and grading rules in Fountain Hills | CITY | Fountain Hills | Hillside Disturbance §5.04 (20%+ slope) and grading §5.02 standards. | [18] |
| E4 | Desert and dark-sky design rules in Cave Creek and Carefree | CITY | Cave Creek, Carefree | Town zoning/building ordinances, lighting/desert-character standards, development review. | [16][17] |
| E5 | HOA design review: what an architectural committee can require | STATE | All (HOA lots) | A.R.S. 33-1817 limits on design/architectural committees; timelines and the solar-rights carve-out (A.R.S. 33-439). | [10][28] |

### F. Building in the Desert (proposed NEW category)

A practical, source-grounded category that is not "legal" but is exactly what research-phase buyers search for. Differentiates Jematell as the builder who explains the *how*, not just the *rules*.

| # | Working title | Scope | Jurisdiction(s) | Angle | Sources |
|---|---|---|---|---|---|
| F1 | Designing an energy-efficient home for a hot-dry climate | BROAD | All | DOE Building America hot-dry best practices: orientation, shading, envelope, glazing, HVAC sizing. | [27][32] |
| F2 | Lot grading and drainage: keeping water away from the house | BROAD | All | IRC R401.3 site-slope/drainage rule and why monsoon grading matters on desert lots. | [29] |
| F3 | Pool safety barriers: Arizona's pool-fence law (A.R.S. 36-1681) | STATE | All | Barrier height/gate/self-latching rules when a pool is part of the build. | [24] |
| F4 | Going solar on a new build (and your HOA can't say no) | STATE | All | A.R.S. 33-439 voids HOA solar bans; design-in vs. retrofit on a new home. | [10] |
| F5 | How long does a custom home take, phase by phase | BROAD | All | Typical 12-24 month AZ timeline with the milestones that move it. | (industry timeline refs) |

---

## 4. City-by-city coverage matrix

The goal is that every market has at least one genuinely city-specific page plus the shared state/county pieces. Gaps to close are marked **NEW**.

| Market | AHJ for permits | Defining local topic to own | Status |
|---|---|---|---|
| Scottsdale | City of Scottsdale | ESLO / NAOS (E2); fees (D1); permitting time (live) | Strong; add fees + ESLO |
| Rio Verde (Foothills) | Maricopa County | Unincorporated permitting (A2); water situation (C3); wells (C1) | **NEW — high priority** |
| Phoenix | City of Phoenix | 2024 PBCC code adoption (A1) | **NEW** |
| Cave Creek | Town of Cave Creek | Desert/dark-sky + septic zoning (E4) | **NEW** |
| Fountain Hills | Town of Fountain Hills | Hillside disturbance / grading (E3) | **NEW** |
| Carefree | Town of Carefree | Development review + desert standards (E4) | **NEW** |
| Casa Grande | City of Casa Grande / Pinal Co. | Pinal permitting (A3); fissures (B1); water provider | **NEW — high priority** |
| Apache Junction | City of Apache Junction | AJ permits + LDC accessory structures (A3) | **NEW** |

---

## 5. Recommended new structure

- **Add one category — "Building in the Desert"** (section F) to hold practical, grounded guidance that does not fit the legal/process buckets but is high-intent search material.
- **Add city landing-question clusters.** Each `/where-we-build/<city>` location page should link to that city's defining FAQ (matrix in §4), so SEO and the buyer journey reinforce each other.
- **Keep two cross-cutting "pillar" answers** (A1 codes comparison, C2 septic) as the hubs that the city-specific pages link up to.

---

## 6. Prioritization

**Phase 1 (highest buyer-intent + biggest current gap):**
- A2 Rio Verde / unincorporated permitting, C3 Rio Verde water, C1 wells (the rural lot story is unique and underserved)
- A3 Pinal permitting + B1 earth fissures (Casa Grande / Apache Junction have zero city-specific coverage today)
- E1 HB 2720 ADUs (statewide, recent law, high search volume)

**Phase 2 (round out the city set):**
- A1 code-adoption comparison, E2 Scottsdale ESLO, E3 Fountain Hills hillside, E4 Cave Creek/Carefree, D1 fees

**Phase 3 (evergreen desert-build category):**
- F1 energy design, F2 grading/drainage, F3 pools, F4 solar, F5 timeline, B2 floodplain, A5 dust, E5 HOA design review

---

## 7. Sourcing and editorial guidelines

- **One-source-minimum, AHJ-disclaimer-always.** Every answer cites a primary source and closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction, because adopted code versions and fees change per city and per year.
- **Prefer primary sources** (azleg.gov statutes, ADWR/ADEQ/AZGS, city/county code portals, ICC code text) over blogs. Tier-3 sources in the list below are background only.
- **Date-stamp anything volatile** — adopted code editions, fee schedules, and water-program status all move. Flag a yearly review for every CITY-tagged page.
- **Match the existing voice** — 500-1,500 words, plain-language, no emojis, no em dashes, building-code-grounded, never giving legal advice.

---

## 8. Sources

Tier 1 = government / code body / academic. Tier 2 = established publication / institutional. Tier 3 = industry/promotional (background only).

1. A.R.S. 45-454, Exemption of small non-irrigation wells — https://www.azleg.gov/ars/45/00454.htm (Tier 1)
2. ADWR, Well Drilling in Arizona — https://www.azwater.gov/permitting-wells/well-drilling-arizona (Tier 1)
3. A.R.S. 32-1101, Contractor definitions (residential builder) — https://www.azleg.gov/ars/32/01101.htm (Tier 1)
4. AZ Registrar of Contractors, License Classifications — https://roc.az.gov/license-classifications (Tier 1)
5. HB 2720 (2024) bill text, ADU requirements — https://www.azleg.gov/legtext/56leg/2R/bills/HB2720S.pdf (Tier 1)
6. ASU Morrison Institute, ADUs and HB 2720 brief — https://morrisoninstitute.asu.edu/sites/g/files/litvpz841/files/2025-09/arches_accessory_dwelling_unit_hb_2720_brief.pdf (Tier 1, academic)
7. ADWR, Assured & Adequate Water Supply overview — https://www.azwater.gov/aaws/aaws-overview (Tier 1)
8. Maricopa County, Onsite Wastewater Ownership Transfer — https://www.maricopa.gov/2491/Onsite-Wastewater-Ownership-Transfer (Tier 1)
9. ADEQ, Onsite Wastewater Treatment Program — https://azdeq.gov/da/osww (Tier 1)
10. A.R.S. 33-439, Solar access (statute) — https://www.azleg.gov/ars/33/00439.htm ; Arizona Solar Center, Know Your Rights — https://www.azsolarcenter.org/government-stuff/know-your-rights (Tier 1 / Tier 2)
11. City of Phoenix, 2024 IRC amendments (PBCC) — https://www.phoenix.gov/content/dam/phoenix/pddsite/documents/codes-ordinances/amendmentcodes/2024-irc.pdf ; ICC adoption notice — https://www.iccsafe.org/about/periodicals-and-newsroom/city-of-phoenix-strengthens-building-safety-and-accessibility-by-adopting-the-2024-international-codes/ (Tier 1 / Tier 2)
12. Maricopa County Planning & Development — https://www.maricopa.gov/797/Planning-Development ; Construction Permit Information — https://www.maricopa.gov/1629/Construction-Permit-Information (Tier 1)
13. Maricopa County, Rio Verde Foothills Area Plan — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087 (Tier 1)
14. Maricopa County, Onsite Wastewater Forms / Applications — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications (Tier 1)
15. City of Scottsdale, Environmentally Sensitive Lands (ESL) Overlay — https://www.scottsdaleaz.gov/codes-and-ordinances/eslo ; Citizen's Guide to ESL — https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/citizens-guide-to-esl.pdf (Tier 1)
16. Town of Cave Creek, Ordinances & Guidelines — https://www.cavecreekaz.gov/336/Ordinances-Guidelines ; Building Regulations Ch.151 — https://codelibrary.amlegal.com/codes/cavecreek/latest/cavecreek_az/0-0-0-27847 (Tier 1)
17. Town of Carefree, Building — https://www.carefree.org/151/Building ; Ordinances — https://www.carefree.org/163/Ordinances (Tier 1)
18. Town of Fountain Hills, Hillside Disturbance §5.04 — https://fountainhills.town.codes/SO/5.04 ; Grading §5.02 — https://fountainhills.town.codes/SO/5.02 (Tier 1)
19. Pinal County, Building Permit Application — https://www.pinal.gov/DocumentCenter/View/460/Building-Permit-Application-PDF ; Applications & Information Bulletins — https://www.pinal.gov/191/Applications-Information-Bulletins (Tier 1)
20. ABC15, Pinal County water company approval for new homes (Casa Grande context) — https://www.abc15.com/news/region-central-southern-az/casa-grande/pinal-county-water-company-secures-approval-for-80k-new-homes (Tier 2)
21. Apache Junction, Building Permits — https://www.apachejunctionaz.gov/622/Permits ; Work Exempt from Permits — https://www.apachejunctionaz.gov/DocumentCenter/View/26933/Work-Exempt-from-Permits (Tier 1)
22. Arizona Geological Survey, Earth Fissures Natural Hazards Viewer — https://azgs.arizona.edu/earth-fissures-ground-subsidence/earth-fissures-natural-hazards-arizona-viewer ; Earth Fissures & Subsidence — https://azgs.arizona.edu/geohazards/arizona-geohazards-resources/earth-fissures-subsidence (Tier 1)
23. Maricopa County Air Quality Dept., Dust Sources, Control & Training (Rule 310) — https://www.maricopa.gov/1913/Dust-Sources-Control-and-Training (Tier 1)
24. A.R.S. 36-1681, Pool enclosures; requirements — https://azleg.gov/ars/36/01681.htm (Tier 1)
25. EPCOR, Rio Verde Foothills Water Fill Station — https://www.epcor.com/us/en/az/account/start-service/rio-verde-foothills-water-fill-station.html ; 12News, water restored — https://www.12news.com/article/news/local/water-wars/rio-verde-foothill-water-restored-arizona-water-crisis/75-65ffab59-a079-453e-9c4f-1e4cdee644c4 (Tier 1 utility / Tier 2)
26. Arizona Financial CU, Construction Loan Process — https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide (Tier 2)
27. U.S. DOE Building America Solution Center, hot-dry climate best practices — https://basc.pnnl.gov (Tier 1)
28. A.R.S. 33-1817, Design / architectural committees; review — https://www.azleg.gov/ars/33/01817.htm (Tier 1)
29. 2024 IRC R401.3, Drainage (ICC Digital Codes) — https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations/IRC2024P2-Pt03-Ch04-SecR401.3 (Tier 1)
30. City of Scottsdale, Planning & Development Fees — https://www.scottsdaleaz.gov/planning-development/fees (Tier 1)
31. Flood Control District of Maricopa County, Floodplain Use Permits — https://www.maricopa.gov/6412/Permits (Tier 1)
32. Insulation Institute, Summary of AZ residential energy code requirements — https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf (Tier 2)
