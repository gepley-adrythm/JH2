# FAQ Drafts — Design, Zoning & ADUs (Section E)

**Prepared:** June 4, 2026
**Category:** `design-zoning-adus` · **Topic:** `zoning-setbacks-adus`
**Status:** Paste-ready `item({ ... })` blocks for the assembly task. Do not edit `lib/faq/src/seed.ts` here — the assembly task merges these in and finalizes `relatedFaqSlugs` / `sortOrder`.

Voice notes carried from the live seed: research-phase, plain-language, AZ-code-grounded, no em dashes, no emojis, never legal advice, every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ) and HOA. These five entries extend the live category (which already covers "setbacks / lot coverage / NAOS" and "can I build a casita / ADU") with the statewide ADU law and city-specific design overlays. They do not repeat the live questions.

---

## E1 — Casitas and ADUs after HB 2720: what changed statewide

```ts
item({
  slug: "what-hb-2720-changed-for-adus-in-arizona",
  question: "What did HB 2720 change for building a casita or ADU in Arizona?",
  answerHtml: `<p><strong>House Bill 2720, signed in 2024 and codified at A.R.S. 9-461.18, requires Arizona municipalities with a population of at least 75,000 to allow accessory dwelling units (ADUs) on lots zoned for single-family homes, and it caps how restrictive those cities can be.</strong> The live answer on casitas covers the basics of what an ADU is; this one focuses on what the statute actually changed and where it does and does not reach.</p>
<h2>What the law requires of larger cities</h2>
<p>For covered municipalities, the headline is that an outright ban is no longer allowed. A.R.S. 9-461.18 directs these cities to permit ADUs on parcels with an existing or proposed single-family home, and it limits the conditions a city can attach. The guardrails in the statute generally include the following, though each city writes its own implementing ordinance within them:</p>
<ul>
<li><strong>At least one ADU per lot.</strong> Covered cities must allow at least one attached and one detached ADU on a qualifying single-family lot, subject to the size and setback limits below.</li>
<li><strong>No owner-occupancy requirement.</strong> A city cannot force the property owner to live on site as a condition of having an ADU.</li>
<li><strong>Limited parking demands.</strong> The statute restricts a city from requiring more than a modest amount of added parking for an ADU.</li>
<li><strong>Size floors.</strong> A city cannot cap an ADU below the thresholds set in the statute, which protect a meaningful minimum floor area rather than letting a city permit ADUs in name only.</li>
<li><strong>Setbacks no stricter than the main home.</strong> ADU setbacks generally cannot be made more restrictive than those that apply to the primary dwelling.</li>
<li><strong>No familial-use limits.</strong> A city cannot require that the ADU be occupied only by family members.</li>
</ul>
<p>Cities were directed to bring their ordinances into compliance on the timeline set by the law, so by 2026 the larger Phoenix-metro jurisdictions have adopted implementing rules. Among the markets we build in, Scottsdale and Phoenix clear the 75,000-resident threshold and are covered.</p>
<h2>What the law does not change</h2>
<p>HB 2720 sets a floor, not a free pass. Several things still govern whether and how you can build:</p>
<ul>
<li><strong>Smaller towns are not covered.</strong> Cave Creek, Carefree, Fountain Hills, and similar towns fall under the 75,000-resident threshold, so the statewide mandate does not apply and their local zoning controls.</li>
<li><strong>Unincorporated county land is separate.</strong> Parcels governed by Maricopa County or Pinal County, including much of Rio Verde Foothills, follow county zoning rather than a city ADU ordinance.</li>
<li><strong>Septic and water capacity still bind.</strong> On a lot served by a well and septic, a second dwelling can require a larger or upgraded onsite wastewater system reviewed under Arizona Department of Environmental Quality standards, regardless of what zoning allows.</li>
<li><strong>Short-term rental is regulated separately.</strong> The law addresses the right to build an ADU, not the right to operate it as a nightly rental; those rules live in other ordinances and change.</li>
<li><strong>Overlays still apply.</strong> Hillside, open-space, and design-review rules continue to shape where an ADU can sit even in a covered city.</li>
</ul>
<h2>Why the distinction matters for your lot search</h2>
<p>Two parcels a few miles apart can now carry very different ADU rights purely because one sits in a city above the population threshold and the other in a small town or unincorporated county. If a casita or future rental is part of your plan, the jurisdiction is worth confirming before you make an offer, not after.</p>
<h2>How Jematell Homes helps</h2>
<p>We design custom homes with casitas and ADUs across the metro and tailor each unit to the lot's jurisdiction, zoning, and your goals, whether that is multigenerational living, guests, a home office, or a future rental. Because ADU rules are recent and each covered city implements A.R.S. 9-461.18 differently, and because small towns and county land are outside the statewide mandate, we confirm the current standards with your local AHJ, and any applicable HOA, before finalizing a design.</p>`,
  shortAnswer:
    "Arizona's 2024 HB 2720, codified at A.R.S. 9-461.18, requires cities of 75,000 or more residents to allow ADUs on single-family lots and limits owner-occupancy, parking, and size restrictions. Smaller towns and unincorporated county land are not covered, and septic capacity and overlays still apply.",
  metaDescription:
    "What did HB 2720 (A.R.S. 9-461.18) change for ADUs in Arizona? Larger cities must allow them on single-family lots, but small towns and county land are exempt.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["adu", "casita", "hb-2720", "ars-9-461-18", "research-phase"],
  relatedFaqSlugs: [
    "can-i-build-a-casita-or-adu",
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["custom-homes", "floor-plans"],
  pillarBlogSlug: "guest-house-casita-adu-scottsdale",
  featured: false,
  sortOrder: 14,
}),
```

**Sources used**
- [5] HB 2720 (2024) bill text, ADU requirements — https://www.azleg.gov/legtext/56leg/2R/bills/HB2720S.pdf
- [6] ASU Morrison Institute, ADUs and HB 2720 brief — https://morrisoninstitute.asu.edu/sites/g/files/litvpz841/files/2025-09/arches_accessory_dwelling_unit_hb_2720_brief.pdf
- A.R.S. 9-461.18, Accessory dwelling units — https://www.azleg.gov/ars/9/00461-18.htm

---

## E2 — Scottsdale's Environmentally Sensitive Lands Ordinance (ESLO) and NAOS

```ts
item({
  slug: "scottsdale-esl-ordinance-and-naos-explained",
  question: "How do Scottsdale's ESL ordinance and NAOS rules affect what I can build?",
  answerHtml: `<p><strong>Scottsdale's Environmentally Sensitive Lands Ordinance (ESLO) governs development across roughly 134 square miles of the city's northern and eastern desert and mountain terrain, and it can substantially reduce how much of a lot you may actually build on.</strong> The live setbacks answer introduces NAOS; this one goes deeper into how the overlay works and why a large foothill parcel can yield a small home site.</p>
<h2>What the ESL overlay is</h2>
<p>The ESL overlay sits on top of a property's base zoning. It applies to a large swath of Scottsdale's Sonoran Desert landscape, including the hillsides and upper desert in the city's north. Where it applies, ESLO standards control land disturbance, native vegetation, washes, and slopes in addition to the ordinary setback, height, and lot-coverage limits of the underlying zoning. The city's Citizen's Guide to ESL is the plain-language companion to the ordinance text.</p>
<h2>Natural Area Open Space (NAOS)</h2>
<p>The defining ESL requirement is <strong>Natural Area Open Space</strong>, a percentage of the lot that must be permanently set aside and kept in, or restored to, a natural desert state. NAOS is recorded against the property, so it travels with the land. The required percentage is not a flat number; it scales with the parcel's environmental sensitivity and slope, which means two foothill lots of the same acreage can owe very different amounts of preserved open space. The practical effect is a smaller usable building envelope than the raw lot size suggests.</p>
<h2>Native plants, washes, and slope</h2>
<p>Beyond the open-space set-aside, ESLO typically addresses several site features:</p>
<ul>
<li><strong>Native plant preservation.</strong> Protected desert plants such as saguaros and ironwood often must be preserved in place or salvaged and replanted, with an inventory required as part of review.</li>
<li><strong>Washes and drainage.</strong> Natural desert washes are commonly protected and folded into the open-space and drainage plan rather than graded over.</li>
<li><strong>Hillside and slope limits.</strong> On sloped ESL parcels, the amount of allowed disturbance and grading tightens as the grade steepens, and cut-and-fill is constrained to keep the natural landform.</li>
<li><strong>Building envelope and color/material standards.</strong> The overlay can steer where the home sits and push toward low-reflectivity, desert-appropriate exteriors.</li>
</ul>
<h2>How it changes the design process</h2>
<p>Because ESL review adds steps, an ESL lot generally takes longer through plan review than a flat in-town lot, and the design has to start from the protected areas and work inward. A view lot can look generous on paper and still leave a modest pad once NAOS, washes, native plants, and slope are subtracted. Designing to that real envelope from day one avoids the costly path of drawing a home that the overlay will not allow.</p>
<h2>How Jematell Homes helps</h2>
<p>We design each ESL home around its actual buildable area, integrating the NAOS set-aside, native-plant inventory, wash protection, and slope limits into the site plan from the start so the design fits the ordinance rather than fighting it. Because Scottsdale updates its ordinance and applies it parcel by parcel, we confirm the current ESL and NAOS requirements with the City of Scottsdale, and any applicable HOA, for your specific lot before committing to a plan.</p>`,
  shortAnswer:
    "Scottsdale's Environmentally Sensitive Lands Ordinance covers about 134 square miles of desert and hillside and requires a percentage of the lot to be kept as Natural Area Open Space, scaled by slope and sensitivity. With native-plant, wash, and grading limits, a large foothill lot can yield a small buildable area.",
  metaDescription:
    "How do Scottsdale's ESL ordinance and NAOS rules work? The overlay covers ~134 sq mi and requires preserved Natural Area Open Space, shrinking your buildable envelope.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["esl", "naos", "scottsdale", "hillside", "research-phase"],
  relatedFaqSlugs: [
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "how-do-i-know-if-a-lot-is-buildable",
    "how-long-does-permitting-take-in-scottsdale",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug:
    "designing-a-custom-home-around-your-lot-why-layout-matters-more-than-square-footage",
  featured: false,
  sortOrder: 15,
}),
```

**Sources used**
- [15] City of Scottsdale, Environmentally Sensitive Lands (ESL) Overlay — https://www.scottsdaleaz.gov/codes-and-ordinances/eslo
- [15] City of Scottsdale, Citizen's Guide to ESL — https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/citizens-guide-to-esl.pdf

---

## E3 — Hillside and grading rules in Fountain Hills

```ts
item({
  slug: "hillside-and-grading-rules-in-fountain-hills",
  question: "What are the hillside and grading rules for building in Fountain Hills?",
  answerHtml: `<p><strong>Fountain Hills protects its steep desert terrain through its Zoning Ordinance, with hillside disturbance standards in Section 5.04 and grading standards in Section 5.02 that limit how much of a sloped lot you can disturb and how earthwork is done.</strong> On a hillside parcel these rules, not just setbacks, often decide where the home can sit and how large the pad can be.</p>
<h2>Why slope drives the rules</h2>
<p>Much of Fountain Hills sits on rolling-to-steep ground, and the town's ordinance treats steeper land as more sensitive. As average slope increases, the share of a lot that may be graded or built on decreases, so the natural landform is preserved and erosion and drainage risk are kept down. The steepest portions of a parcel are generally the most restricted, which is why a large lot with a dramatic grade can carry a comparatively small disturbance area.</p>
<h2>Hillside disturbance, Section 5.04</h2>
<p>Section 5.04 sets the framework for development on sloped land. In practice it tends to address:</p>
<ul>
<li><strong>Disturbance limits tied to slope.</strong> The percentage of the lot that may be disturbed steps down as the grade rises, with the steepest bands the most protected.</li>
<li><strong>Hillside protection easements.</strong> Undisturbed portions are often recorded so they stay natural, similar in spirit to a preserved open-space set-aside.</li>
<li><strong>Landform and revegetation.</strong> Cuts and fills are shaped to blend with natural contours, and disturbed areas are revegetated.</li>
<li><strong>Driveway and access constraints.</strong> Grades and alignments for the driveway are reviewed so access does not require excessive cutting.</li>
</ul>
<h2>Grading standards, Section 5.02</h2>
<p>Section 5.02 governs the earthwork itself: how cut-and-fill is engineered, how retaining is handled, how drainage and erosion control are provided, and when a grading permit and plan are required. On a desert lot this matters most during monsoon season, when site drainage has to move stormwater away from the structure without dumping it onto neighbors. Grading review usually runs alongside the building permit, and the two have to agree.</p>
<h2>Washes and natural drainage</h2>
<p>Sloped Fountain Hills lots often carry natural washes that channel monsoon runoff. The grading plan generally has to keep those flow paths working rather than filling them, which can further constrain where the pad and driveway go. Retaining walls, drainage swales, and energy-dissipation at outfalls are common on these sites, and they are reviewed for both function and appearance. Planning the drainage around the existing washes, instead of trying to reroute the whole lot, is usually the cleaner and less costly path.</p>
<h2>What this means for budget and timeline</h2>
<p>Hillside review adds engineering and review steps, so a sloped Fountain Hills lot generally takes longer to permit and costs more to make ready than a flat one. Retaining walls, deeper foundations, longer driveways, and import or export of soil are common cost drivers. Understanding the disturbance limit early tells you the true size of the home the lot can support before you fall for the view.</p>
<h2>How Jematell Homes helps</h2>
<p>We design hillside homes to the lot's allowed disturbance area, coordinating the foundation, grading, drainage, and driveway so the plan respects Sections 5.04 and 5.02 rather than triggering avoidable corrections. Because the town periodically updates its zoning ordinance and applies it parcel by parcel, we confirm the current hillside and grading standards with the Town of Fountain Hills, and any applicable HOA, for your specific lot before design is finalized.</p>`,
  shortAnswer:
    "Fountain Hills limits development on sloped lots through Zoning Ordinance Section 5.04 (hillside disturbance) and Section 5.02 (grading). The steeper the land, the smaller the share you may disturb, with undisturbed areas often preserved. Expect added engineering, drainage review, and cost on a hillside parcel.",
  metaDescription:
    "What are Fountain Hills' hillside and grading rules? Zoning Ordinance 5.04 limits disturbance by slope and 5.02 governs grading, shrinking the buildable area on steep lots.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["hillside", "grading", "fountain-hills", "slope", "research-phase"],
  relatedFaqSlugs: [
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "how-do-i-know-if-a-lot-is-buildable",
    "do-i-need-a-soils-or-geotechnical-report",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "building-on-your-own-lot-arizona",
  featured: false,
  sortOrder: 16,
}),
```

**Sources used**
- [18] Town of Fountain Hills, Hillside Disturbance Section 5.04 — https://fountainhills.town.codes/SO/5.04
- [18] Town of Fountain Hills, Grading Section 5.02 — https://fountainhills.town.codes/SO/5.02

---

## E4 — Desert and dark-sky design rules in Cave Creek and Carefree

```ts
item({
  slug: "desert-and-dark-sky-design-rules-cave-creek-carefree",
  question: "What desert and dark-sky design rules apply in Cave Creek and Carefree?",
  answerHtml: `<p><strong>The Towns of Cave Creek and Carefree both protect their Sonoran Desert character through local zoning and building ordinances, with outdoor-lighting (dark-sky) standards, native-desert and grading provisions, and a development review process that shapes how a custom home looks and how it sits on the land.</strong> Each town is its own Authority Having Jurisdiction, so the rules differ from Scottsdale's and from each other.</p>
<h2>Dark-sky lighting</h2>
<p>Both communities place a high value on a dark night sky, and their lighting standards reflect that. Outdoor lighting on a new home generally must be shielded and aimed downward, kept within brightness limits, and designed to avoid light trespass onto neighbors and the sky. This affects exterior fixtures, landscape lighting, and security lighting, and it is reviewed as part of the plans rather than added as an afterthought. Designing fixtures and a lighting plan that comply from the start avoids redoing them later.</p>
<h2>Desert character and native vegetation</h2>
<p>The towns' ordinances emphasize keeping the natural desert intact:</p>
<ul>
<li><strong>Native plant protection and salvage.</strong> Protected desert plants are commonly inventoried and preserved or relocated rather than cleared.</li>
<li><strong>Grading and natural terrain.</strong> Earthwork is limited so the natural landform, washes, and boulders are retained where possible.</li>
<li><strong>Desert-appropriate exteriors.</strong> Low-reflectivity colors and materials that blend with the surroundings are favored, and heights are kept in scale with the terrain.</li>
<li><strong>Walls and setbacks.</strong> Building regulations and zoning set the envelope, with Cave Creek's building regulations carried in its town code.</li>
</ul>
<h2>Septic, lot size, and rural servicing</h2>
<p>Large stretches of both towns are not on municipal sewer, so many homes run on a septic or onsite wastewater system reviewed under Arizona Department of Environmental Quality standards through the county. Minimum lot sizes in the desert-zoned areas tend to be generous, which preserves the open, low-density character but also means utilities, access, and wastewater all have to be planned for the individual parcel rather than assumed. If a casita or second unit is in the plan, the septic system has to be sized for it from the start.</p>
<h2>Development review</h2>
<p>A custom home in either town moves through the town's review and permitting process, which can include design or site-plan review in addition to the building permit. Because these are smaller towns, the process and contacts differ from a big-city department, and the timeline depends on how complete and desert-sensitive the submittal is. Engaging the town early, before plans are far along, helps surface lighting, grading, and material expectations while they are still easy to address.</p>
<h2>A note on ADUs</h2>
<p>Both Cave Creek and Carefree fall under the 75,000-resident threshold in Arizona's statewide ADU law (HB 2720, A.R.S. 9-461.18), so that mandate does not apply here and any casita or guest house follows the town's own zoning. If a second unit is part of your plan, confirm the town's specific rules early.</p>
<h2>How Jematell Homes helps</h2>
<p>We design homes that read as part of the desert rather than imposed on it, building the dark-sky lighting plan, native-plant preservation, restrained grading, and desert-appropriate materials into the design and carrying them through each town's review. Because Cave Creek and Carefree update their ordinances on their own schedules and apply them parcel by parcel, we confirm the current zoning, lighting, and building standards with the town, and any applicable HOA, for your specific lot before finalizing a plan.</p>`,
  shortAnswer:
    "Cave Creek and Carefree protect their desert and night sky through local zoning and building ordinances: shielded, downward dark-sky lighting, native-plant preservation, restrained grading, and desert-appropriate materials, all run through town development review. Each town is its own AHJ, so the rules differ from Scottsdale's.",
  metaDescription:
    "What desert and dark-sky design rules apply in Cave Creek and Carefree? Shielded outdoor lighting, native-plant preservation, grading limits, and town development review.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["dark-sky", "cave-creek", "carefree", "desert-design", "research-phase"],
  relatedFaqSlugs: [
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "what-hb-2720-changed-for-adus-in-arizona",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug:
    "designing-your-custom-home-in-arizona-maximizing-view-light-and-comfort",
  featured: false,
  sortOrder: 17,
}),
```

**Sources used**
- [16] Town of Cave Creek, Ordinances & Guidelines — https://www.cavecreekaz.gov/336/Ordinances-Guidelines
- [16] Town of Cave Creek, Building Regulations Ch.151 — https://codelibrary.amlegal.com/codes/cavecreek/latest/cavecreek_az/0-0-0-27847
- [17] Town of Carefree, Building — https://www.carefree.org/151/Building
- [17] Town of Carefree, Ordinances — https://www.carefree.org/163/Ordinances

---

## E5 — HOA design review: what an architectural committee can require

```ts
item({
  slug: "what-an-hoa-architectural-committee-can-require",
  question: "What can an HOA's architectural committee require when I build a custom home?",
  answerHtml: `<p><strong>On a lot inside a homeowners association, an architectural or design review committee can regulate the look of your new home, but Arizona law sets limits on how it does so. A.R.S. 33-1817 frames how planned-community associations adopt and apply design guidelines, and A.R.S. 33-439 protects your right to install solar despite an HOA.</strong> Design review runs in parallel with the city or county permit, and both have to be satisfied.</p>
<h2>What design review typically covers</h2>
<p>An architectural committee generally reviews the exterior and site aspects of a build rather than the interior. Common subjects include:</p>
<ul>
<li><strong>Exterior materials and colors,</strong> often steered toward a desert palette.</li>
<li><strong>Roof form, height, and massing,</strong> within the community's standards.</li>
<li><strong>Setbacks and placement</strong> beyond the city minimums, where the community imposes them.</li>
<li><strong>Landscaping, walls, and fencing,</strong> including plant palettes and wall heights.</li>
<li><strong>Driveways, lighting, and accessory structures,</strong> including casitas and detached garages.</li>
</ul>
<h2>What Arizona law constrains</h2>
<p>A.R.S. 33-1817 addresses how a planned-community association regulates design through recorded guidelines and a review process. In general terms, the design framework is expected to be established in the community's documents, and decisions are meant to follow that framework rather than being made arbitrarily. Many associations also commit to a written decision within a set period and to giving reasons when an application is denied, so an applicant knows what to fix. The exact procedures and timelines are set in each community's declaration and design guidelines, which is why two HOAs can run very different processes.</p>
<h2>The solar carve-out</h2>
<p>One clear statutory limit is solar. A.R.S. 33-439 makes void any HOA provision that effectively prohibits the installation or use of a solar energy device. An association may still apply reasonable rules that do not significantly impair the device's function or unreasonably increase its cost, but a flat ban does not hold. If solar is in your plans, it is usually cleanest to design it into the roof from the start so it both performs well and reads as intentional to the committee.</p>
<h2>How it fits the overall timeline</h2>
<p>HOA design approval is separate from, and additional to, the municipal or county permit. Because it can take weeks to months on its own, it is best started in parallel with permitting rather than after. A complete, guideline-compliant submittal is the single biggest lever on getting through review without repeated cycles. None of this is legal advice; how a specific declaration and set of guidelines apply to your lot is a question for the association and, where needed, your own counsel.</p>
<h2>How Jematell Homes helps</h2>
<p>We design to the community's guidelines from the first concept, assemble the architectural-committee submittal, and run it alongside the building permit so the two tracks move together. We also design solar in where you want it, consistent with your rights under A.R.S. 33-439. Because every association's declaration and guidelines differ and are periodically amended, we confirm the current design-review requirements and timelines with your HOA, and the building requirements with your local AHJ, before finalizing the plan.</p>`,
  shortAnswer:
    "Inside an HOA, an architectural committee can regulate your home's exterior materials, colors, roof, placement, landscaping, and accessory structures, but A.R.S. 33-1817 expects decisions to follow recorded design guidelines, and A.R.S. 33-439 voids any flat HOA solar ban. Design review runs alongside, and on top of, your building permit.",
  metaDescription:
    "What can an HOA architectural committee require for a custom home? A.R.S. 33-1817 frames design review and A.R.S. 33-439 protects your right to install solar.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["hoa", "design-review", "ars-33-1817", "solar-rights", "research-phase"],
  relatedFaqSlugs: [
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "what-hb-2720-changed-for-adus-in-arizona",
    "how-long-does-permitting-take-in-scottsdale",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 18,
}),
```

**Sources used**
- [10] A.R.S. 33-439, Solar access (statute) — https://www.azleg.gov/ars/33/00439.htm
- [10] Arizona Solar Center, Know Your Rights — https://www.azsolarcenter.org/government-stuff/know-your-rights
- [28] A.R.S. 33-1817, Declaration; design / architectural review — https://www.azleg.gov/ars/33/01817.htm
