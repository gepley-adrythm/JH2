# FAQ Draft: Building in the Desert (new category F)

**Prepared:** June 4, 2026
**Status:** Draft for assembly. Nothing here is wired into `lib/faq/src/seed.ts` yet. The assembly task pastes the category, topic, and item blocks below into the seed, finalizes `relatedFaqSlugs`, then runs the regeneration pipeline (`typecheck:libs` → `faq:validate` → `faq:crosslinks` → `faq:registry`).

This file defines one new `SeedCategory` (`building-in-the-desert`), one new `SeedTopic` (`desert-build-essentials`), and 5 paste-ready `item({ ... })` blocks (F1–F5). Voice matches the shipped seed: deep, research-phase, plain-language, statutes cited by name, every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ). No em dashes, no emojis, no legal advice. Volatile facts are date-stamped.

---

## New category to add (to `faqSeed.categories`)

```ts
{
  slug: "building-in-the-desert",
  title: "Building in the Desert",
  description:
    "The practical craft of building for a hot-dry climate: energy design, lot grading and drainage, pool safety, solar, and how long a custom home really takes.",
  metaDescription:
    "Building a custom home in the Arizona desert: energy-efficient design, lot grading and drainage, pool-barrier law, solar rights, and realistic build timelines.",
  sortOrder: 6,
},
```

## New topic to add (to `faqSeed.topics`)

```ts
{
  slug: "desert-build-essentials",
  title: "Desert Build Essentials",
  description:
    "How a home is built to thrive in the Sonoran Desert: climate-smart design, drainage that survives the monsoon, pool and solar requirements, and the build timeline.",
  metaDescription:
    "Desert build essentials for an Arizona custom home: hot-dry energy design, grading and drainage, pool safety barriers, going solar, and how long the build takes.",
  sortOrder: 6,
},
```

---

## Items to add (to `faqSeed.items`)

> Assembly note on `sortOrder`: the shipped seed ends at `sortOrder: 13`. These five continue the global sequence at 14–18. Adjust if other parallel drafts also claim those numbers.

> Assembly note on `relatedFaqSlugs`: the slugs referenced below are a mix of (a) existing live slugs (validated to exist in the current seed) and (b) sibling F-slugs defined in this same file. All sibling F-slugs become valid once this category is merged. Existing-slug references used here: `how-do-i-know-if-a-lot-is-buildable`, `do-i-need-a-soils-or-geotechnical-report`, `what-building-codes-apply-to-a-new-home-in-arizona`, `how-do-septic-systems-work-for-a-new-home`, `what-are-setbacks-lot-coverage-and-naos-rules`, `how-long-does-permitting-take-in-scottsdale`, `how-much-does-it-cost-to-build-a-custom-home`.

---

### F1: Designing an energy-efficient home for a hot-dry climate

```ts
item({
  slug: "designing-an-energy-efficient-home-for-the-arizona-desert",
  question: "How do you design an energy-efficient home for the Arizona desert?",
  answerHtml: `<p><strong>In a hot-dry climate the whole job of the design is to keep the desert sun out and the cooled air in. The U.S. Department of Energy's Building America program organizes that into a handful of moves: orient the house to control sun, shade the glass, build a tight and well-insulated envelope, choose the right windows, and size the cooling system to the actual load rather than to habit.</strong> Get those right and a custom home in Scottsdale or Rio Verde stays comfortable through a 115-degree afternoon while running a smaller, quieter, cheaper-to-operate air conditioner.</p>
<h2>Start with orientation</h2>
<p>The cheapest energy upgrade is free: how the house sits on the lot. Building America's hot-dry guidance favors a footprint whose long axis runs roughly east-west, so the big walls and most of the glass face north and south, where overhangs can control the sun. East and especially west exposures take the harshest low-angle summer heat and are the hardest to shade, so you minimize glazing there. On a view lot the view does not always cooperate with the sun, which is exactly the trade-off worth solving on paper before framing.</p>
<h2>Shade the glass, then shade the walls</h2>
<p>Glass is where heat pours in. Deep roof overhangs, covered patios, recessed openings, and exterior shade structures cut the solar gain before it ever reaches the window. Indoor-outdoor living, a hallmark of desert custom homes, doubles as a shading strategy when the ramada and patio roofs are designed to block the high summer sun while still letting in lower winter light.</p>
<h2>Build a tight, well-insulated envelope</h2>
<p>The envelope is the home's defense against the heat. Hot-dry best practice leans on:</p>
<ul>
<li><strong>Continuous insulation and air sealing</strong> so conditioned air does not leak out and radiant heat does not conduct in. Air leakage is verified with a blower-door test on a well-built home.</li>
<li><strong>Roof and attic strategy.</strong> A radiant barrier, a cool or reflective roof, and generous attic insulation attack the single largest heat-gain surface on a one-story desert house.</li>
<li><strong>Duct location.</strong> Ducts in a 140-degree attic waste enormous energy. Bringing the ducts (or the whole mechanical system) into conditioned space is one of the highest-value moves in this climate.</li>
</ul>
<h2>Choose windows for the desert, not the catalog</h2>
<p>For a hot-dry climate you want a low Solar Heat Gain Coefficient (SHGC) to reject heat and a low U-factor for overall efficiency. Low-emissivity (low-e) coatings tuned for cooling-dominated climates make a measurable difference. Arizona's adopted residential energy code, based on the International Energy Conservation Code (IECC), sets the floor for window performance, insulation levels, and air sealing; the adopted edition varies by jurisdiction, so the exact numbers are local.</p>
<h2>Size the cooling system to the load</h2>
<p>Bigger is not better with air conditioning. An oversized unit short-cycles, controls humidity poorly, and costs more to buy and run. Building America points to a room-by-room <strong>Manual J load calculation</strong> to size equipment to the home you actually designed, then a right-sized, high-efficiency system (measured in SEER2) with sealed ducts. A tight, shaded, well-insulated house needs less cooling capacity, so the envelope work pays off twice.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We design each home to its orientation and its lot, shade the glass deliberately, detail a tight envelope, and coordinate a load-calculated mechanical system rather than a rule-of-thumb tonnage. Energy codes and the adopted IECC edition change by jurisdiction and over time, so we confirm the current energy requirements with your local AHJ for your specific parcel before finalizing the design.</p>`,
  shortAnswer:
    "Follow DOE Building America's hot-dry playbook: orient the long axis east-west, keep glass on the shaded north and south, shade every window, build a tight well-insulated envelope with the ducts in conditioned space, pick low-SHGC windows, and size the AC with a Manual J load calculation rather than guesswork.",
  metaDescription:
    "How do you design an energy-efficient home for the Arizona desert? Orientation, shading, a tight envelope, low-SHGC windows, and a load-calculated cooling system.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["energy-efficiency", "passive-design", "hot-dry-climate", "hvac", "research-phase"],
  relatedFaqSlugs: [
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "going-solar-on-a-new-home-and-hoa-solar-rights",
    "lot-grading-and-drainage-keeping-water-away-from-the-house",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "a-comprehensive-guide-to-home-building-with-passive-solar-design",
  featured: true,
  sortOrder: 14,
}),
```

**Sources used (F1)**
- [27] U.S. DOE Building America Solution Center, hot-dry climate best practices: https://basc.pnnl.gov
- [32] Insulation Institute, Summary of AZ residential energy code requirements: https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf

---

### F2: Lot grading and drainage: keeping water away from the house

```ts
item({
  slug: "lot-grading-and-drainage-keeping-water-away-from-the-house",
  question: "How does lot grading and drainage protect a desert home from monsoon flooding?",
  answerHtml: `<p><strong>Grading is the deliberate shaping of the ground so that water runs away from the house instead of toward it. The International Residential Code makes it a requirement, not a preference: under IRC Section R401.3, the lot must be graded so the surface falls away from the foundation. In the desert that rule earns its keep during the summer monsoon, when months of dry, hard-baked ground meet an inch of rain in an hour.</strong></p>
<h2>What the code actually requires</h2>
<p>IRC R401.3 calls for the ground immediately around the foundation to slope down and away. The widely adopted standard is a fall of at least <strong>6 inches within the first 10 feet</strong> measured out from the foundation (roughly a 5 percent slope). Where physical obstructions such as property lines or adjacent structures make that impossible, the code allows swales or drains to be installed to carry water away instead, with a minimum slope to a point of collection or discharge. The adopted edition and any local amendment set the exact figures, so the controlling numbers are jurisdiction-specific.</p>
<h2>Why the desert makes drainage harder, not easier</h2>
<p>Newcomers assume a dry climate means little water to manage. The opposite is true on a build site. Sonoran Desert soils are often low in organic matter and can include caliche or tight clays that shed water rather than absorb it, so monsoon rain runs off fast and concentrates quickly. Natural desert washes can move a startling volume of water in minutes. A pad set too low, a driveway that funnels runoff to the garage, or a patio that slopes back toward the house can all turn a normal storm into standing water against the foundation.</p>
<h2>The pieces of a good drainage plan</h2>
<ul>
<li><strong>Pad elevation.</strong> Setting the finished floor high enough relative to surrounding grade is the first line of defense.</li>
<li><strong>Positive slope at the foundation.</strong> The R401.3 fall-away grade around the entire perimeter.</li>
<li><strong>Swales and drainage channels.</strong> Shaped low paths that intercept sheet flow and route it around and past the house to a safe discharge point.</li>
<li><strong>Retention or detention.</strong> Many jurisdictions require a lot to hold a design storm on site so the build does not worsen runoff onto neighbors.</li>
<li><strong>Respecting existing washes.</strong> Building near or across a natural drainage course can trigger floodplain review and special engineering.</li>
</ul>
<h2>Grading is also a permit and a sequence</h2>
<p>On many lots the earthwork needs its own grading and drainage permit, and the grading plan is reviewed alongside the building plans. The work also has to respect dust-control rules during construction. Because grading sets the pad and the drainage before the foundation goes in, it belongs early in the site sequence, not as an afterthought once the slab is poured.</p>
<h2>How Jematell Homes handles it</h2>
<p>We treat drainage as a design problem from the first site visit, setting pad elevation, perimeter slope, and swales to move monsoon water decisively away from the home, and we coordinate the grading plan and permit with the rest of the package. Drainage standards, retention requirements, and adopted code editions are set locally and change, so we confirm the current grading and drainage requirements with your AHJ for your specific parcel before construction.</p>`,
  shortAnswer:
    "Grading shapes the ground so water flows away from the house. IRC R401.3 requires the surface to fall away from the foundation, commonly 6 inches of drop within the first 10 feet, with swales or drains where that is not possible. In the desert this matters most during monsoon downpours on hard, fast-shedding soils.",
  metaDescription:
    "How does grading and drainage protect a desert home? IRC R401.3 requires the lot to slope away from the foundation, which is critical during Arizona's monsoon.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["grading", "drainage", "monsoon", "foundation", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-soils-or-geotechnical-report",
    "how-do-i-know-if-a-lot-is-buildable",
    "designing-an-energy-efficient-home-for-the-arizona-desert",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 15,
}),
```

**Sources used (F2)**
- [29] 2024 IRC R401.3, Drainage (ICC Digital Codes): https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations/IRC2024P2-Pt03-Ch04-SecR401.3

---

### F3: Pool safety barriers: Arizona's pool-fence law (A.R.S. 36-1681)

```ts
item({
  slug: "arizona-pool-safety-barrier-requirements",
  question: "What are Arizona's pool safety barrier requirements for a new home with a pool?",
  answerHtml: `<p><strong>If your custom home includes a swimming pool, Arizona law requires a safety barrier around it. The statewide baseline is set by A.R.S. 36-1681, which mandates an enclosure that separates the pool from the home and yard, with specific rules for fence height, gaps, and gates. Cities and towns enforce it through their building codes and many add stricter local requirements, so the pool barrier is a code item designed and permitted with the home, not bolted on afterward.</strong></p>
<h2>What the statute covers</h2>
<p>A.R.S. 36-1681 applies to swimming pools, spas, and similar contained bodies of water at residential properties. The law is written to keep young children from reaching the water unsupervised, which is why its details focus on heights, openings, and self-closing hardware. The commonly applied requirements include:</p>
<ul>
<li><strong>Barrier height.</strong> An enclosure at least <strong>5 feet (60 inches)</strong> high measured on the side facing away from the pool.</li>
<li><strong>No footholds or large gaps.</strong> The barrier must not have openings, handholds, or footholds a child could use to climb or pass through; openings are limited so a small sphere cannot pass.</li>
<li><strong>Self-closing, self-latching gates.</strong> Gates must open outward away from the pool, close on their own, and latch automatically, with the latch placed high enough to be out of a young child's reach.</li>
<li><strong>The house as part of the barrier.</strong> Where a wall of the home forms one side of the enclosure, doors with direct pool access generally must have a self-latching device mounted high, an alarm, or another approved safeguard.</li>
</ul>
<p>These are the broadly recognized features of the law; the statute and the adopted building code carry the precise dimensions and exceptions, and those control.</p>
<h2>Local codes can be stricter</h2>
<p>A.R.S. 36-1681 is a floor, not a ceiling. Many Phoenix-metro jurisdictions adopt the pool and spa provisions of the International Codes and layer on their own amendments, which can require a fence physically between the house and the pool, specific gate hardware, or barrier alarms. Because enforcement happens at the city, town, or county level, the exact requirement depends entirely on where you build.</p>
<h2>Design it in, do not retrofit it</h2>
<p>The cleanest pools are the ones whose barrier was planned with the site. Deciding early where the fence runs, how gates serve the patio and yard, and whether a courtyard wall doubles as the barrier keeps the safety enclosure from looking like an afterthought and avoids redoing hardscape later. It also keeps the certificate of occupancy on schedule, since the pool barrier is inspected before the pool can be used.</p>
<h2>How Jematell Homes handles it</h2>
<p>When a pool is part of the build, we design the barrier into the site plan so it meets the law and complements the home, and we coordinate the pool and barrier permitting and inspections with the rest of the project. Pool-barrier rules are set by statute and tightened by local code, and both change, so we confirm the current requirements with your AHJ for your specific parcel before finalizing the design. This is general information, not legal advice.</p>`,
  shortAnswer:
    "Arizona's A.R.S. 36-1681 requires a safety barrier around a residential pool: an enclosure at least 5 feet high, no climbable gaps or footholds, and self-closing, self-latching gates that open away from the pool. Cities often add stricter rules, so design the barrier into the plan and confirm specifics with your AHJ.",
  metaDescription:
    "What are Arizona's pool safety barrier rules? A.R.S. 36-1681 requires a 5-foot enclosure, no climbable gaps, and self-closing self-latching gates around a home pool.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["pool-safety", "pool-barrier", "ars-36-1681", "code", "research-phase"],
  relatedFaqSlugs: [
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "how-long-does-it-take-to-build-a-custom-home",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 16,
}),
```

**Sources used (F3)**
- [24] A.R.S. 36-1681, Pool enclosures; requirements: https://azleg.gov/ars/36/01681.htm

---

### F4: Going solar on a new build (and your HOA can't say no)

```ts
item({
  slug: "going-solar-on-a-new-home-and-hoa-solar-rights",
  question: "Can I put solar on my new Arizona home, and can an HOA stop me?",
  answerHtml: `<p><strong>Yes, you can put solar on a new Arizona home, and a homeowners association generally cannot forbid it. Under A.R.S. 33-439, a covenant or restriction that effectively prohibits the installation or use of a solar energy device is void and unenforceable as a matter of public policy. An HOA may apply reasonable rules about placement and appearance, but it cannot ban solar outright or impose conditions that meaningfully cut its output or raise its cost.</strong></p>
<h2>What the solar-rights statute does</h2>
<p>A.R.S. 33-439 protects a homeowner's right to use solar energy devices, which include rooftop photovoltaic (PV) panels and solar water heating. The practical effect is that an HOA's design or architectural committee cannot tell you "no solar." It can adopt reasonable restrictions, but Arizona's guidance and the statute's intent are that those restrictions may not significantly impair the device's performance or add significant cost. An HOA that drags out approval or demands a placement that guts production is on the wrong side of the law. Architectural review itself is separately governed by A.R.S. 33-1817, which sets limits and timelines on what design committees can require.</p>
<h2>Design it in versus retrofit it later</h2>
<p>Because you are building from scratch, you can do far better than bolting panels onto a finished roof. Designing solar in from the start lets you:</p>
<ul>
<li><strong>Orient and pitch roof planes</strong> to capture the most sun, ideally large unobstructed south-facing surfaces.</li>
<li><strong>Keep the array clean of clutter</strong> by routing plumbing vents, chimneys, and equipment away from the solar roof planes.</li>
<li><strong>Pre-wire conduit and panel capacity</strong> so the electrical system is ready for PV and, increasingly, battery storage and EV charging.</li>
<li><strong>Plan for the load.</strong> A well-insulated, well-shaded house needs less energy, so a smaller, cheaper array can offset more of the bill.</li>
</ul>
<p>Even if you do not install panels on day one, a "solar-ready" roof and electrical rough-in make a future installation simpler and cheaper. In a hot-dry climate the array also does double duty: the panels shade the roof deck they sit on, which modestly reduces attic heat gain on the surface that takes the most sun.</p>
<h2>Batteries, EV charging, and the rest of the electrical plan</h2>
<p>Solar increasingly comes paired with battery storage and electric-vehicle charging, and both are far cheaper to accommodate during construction than after. Designing in a battery location, the conduit runs, and adequate electrical panel capacity means the home can add storage or a second EV charger later without opening walls or upgrading the service. Storage is especially relevant where a utility's export credit for solar sent back to the grid is lower than the retail rate, because keeping your own production to use after sundown can be worth more than exporting it.</p>
<h2>The pieces beyond the panels</h2>
<p>A grid-tied system involves the utility's interconnection process and net-metering or export rules, which are set by your utility and the Arizona Corporation Commission and change over time. Permits and electrical inspections apply as with any electrical work. Federal and state solar incentives also change, so verify what is current when you build rather than relying on last year's figures. The size of the array should follow the home's actual energy use, which is one more reason the envelope and shading work in this category pays off: a more efficient house needs a smaller, less expensive system to reach the same offset.</p>
<h2>How Jematell Homes handles it</h2>
<p>We design roofs and electrical systems with solar in mind, coordinate any HOA architectural submittal so it clears review without compromising production, and sequence the PV and interconnection work with the build. HOA rules, utility interconnection terms, and incentives all change, so we confirm the current requirements with your HOA, your utility, and your local AHJ before finalizing. This is general information, not legal advice.</p>`,
  shortAnswer:
    "Yes. Under A.R.S. 33-439 an HOA covenant that effectively prohibits a solar energy device is void, so an HOA cannot ban rooftop solar, though it may apply reasonable placement rules that do not significantly cut output or add cost. Building new lets you orient the roof and pre-wire for panels from the start.",
  metaDescription:
    "Can an HOA stop you from putting solar on a new Arizona home? No: A.R.S. 33-439 voids covenants that effectively prohibit solar. Design the roof and wiring in early.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["solar", "hoa", "ars-33-439", "solar-rights", "research-phase"],
  relatedFaqSlugs: [
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "what-building-codes-apply-to-a-new-home-in-arizona",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 17,
}),
```

**Sources used (F4)**
- [10] A.R.S. 33-439, Solar access (statute): https://www.azleg.gov/ars/33/00439.htm ; Arizona Solar Center, Know Your Rights: https://www.azsolarcenter.org/government-stuff/know-your-rights
- [28] A.R.S. 33-1817, Design / architectural committees; review: https://www.azleg.gov/ars/33/01817.htm

---

### F5: How long does a custom home take, phase by phase

```ts
item({
  slug: "how-long-does-it-take-to-build-a-custom-home",
  question: "How long does it take to build a custom home in Arizona, phase by phase?",
  answerHtml: `<p><strong>Plan on roughly 12 to 24 months from first design conversation to move-in for a custom home in the Phoenix metro. Construction itself is often 9 to 14 months; the months before the first shovel, design, engineering, and permitting, are what most often stretch the total.</strong> The honest answer depends on your lot, the complexity of the design, and how decisions and approvals move, so treat any single number as a planning range rather than a promise.</p>
<h2>The phases and what each typically takes</h2>
<ul>
<li><strong>Design and pre-construction (about 2 to 6 months).</strong> Programming, schematic design, design development, selections, and a detailed budget. The pace here is driven largely by how quickly decisions get made.</li>
<li><strong>Engineering and permitting (about 2 to 4 months).</strong> Structural engineering, energy calculations, the site and grading plan, then plan review and correction cycles with the AHJ. Overlays such as Scottsdale's ESL or a hillside district, and any HOA design review, add time here.</li>
<li><strong>Site work and foundation (about 1 to 2 months).</strong> Grading, utilities or well and septic, then the foundation. Rural lots with long utility runs take longer.</li>
<li><strong>Framing and dry-in (about 2 to 3 months).</strong> The structure goes up and the home is made weather-tight.</li>
<li><strong>Mechanical, electrical, and plumbing rough-in (about 1 to 2 months).</strong> Systems are installed and inspected inside the walls.</li>
<li><strong>Interior finishes (about 3 to 4 months).</strong> Insulation, drywall, cabinetry, tile, flooring, fixtures, and paint. This is where custom selections most affect the schedule.</li>
<li><strong>Final inspections and certificate of occupancy (a few weeks).</strong> The final inspections, then the certificate of occupancy that clears move-in.</li>
</ul>
<p>These phases overlap in practice rather than running strictly end to end, which is why the total is shorter than adding every range together. A skilled builder sequences trades so that, for example, exterior finishes and landscaping progress while interior work continues inside.</p>
<h2>What moves the timeline</h2>
<ul>
<li><strong>The lot.</strong> A serviced infill lot is faster than raw land that needs a well, septic, long power extension, and heavy grading.</li>
<li><strong>Permitting and overlays.</strong> Plan-review cycles and special overlays or HOA review can add weeks to months.</li>
<li><strong>Design complexity and selections.</strong> Long-lead windows, specialty finishes, and slow decisions all push the date.</li>
<li><strong>Change orders.</strong> Mid-build changes ripple through the schedule.</li>
<li><strong>Weather and supply chain.</strong> Monsoon storms and material lead times can shift milestones.</li>
<li><strong>Inspections.</strong> Each phase has to pass its AHJ inspection before the next begins, so a missed or rescheduled inspection can ripple down the line.</li>
</ul>
<p>It is also worth separating two clocks people tend to merge: the calendar from your first phone call to a signed contract, and the calendar from groundbreaking to keys. The pre-construction clock is mostly about how fast decisions and approvals happen, while the construction clock is about field execution. Knowing which one you are looking at keeps expectations realistic.</p>
<h2>How to keep it on track</h2>
<p>The two biggest levers are decisions and document quality. Finalizing selections early and submitting complete, coordinated plans keeps correction cycles short and the field crews moving. Sequencing rural approvals such as septic and wells early keeps them from holding up the building permit. We manage the schedule across all of these, set realistic milestones, and keep you informed as the project moves. Because permitting times and conditions change by jurisdiction, we confirm the current review timelines with your AHJ for your specific parcel rather than relying on past projects.</p>`,
  shortAnswer:
    "Expect about 12 to 24 months total: roughly 2 to 6 months for design, 2 to 4 for engineering and permitting, then 9 to 14 months of construction from site work and foundation through framing, rough-ins, finishes, and the certificate of occupancy. The lot, overlays, selections, and change orders move the date most.",
  metaDescription:
    "How long does it take to build a custom home in Arizona? Plan on 12 to 24 months: design, engineering and permitting, then construction, phase by phase.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["timeline", "build-schedule", "phases", "process", "research-phase"],
  relatedFaqSlugs: [
    "how-long-does-permitting-take-in-scottsdale",
    "how-much-does-it-cost-to-build-a-custom-home",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "how-long-it-takes-to-build-a-custom-home-in-arizona",
  featured: true,
  sortOrder: 18,
}),
```

**Sources used (F5)**
- Industry build-timeline references for Arizona custom homes; phase ranges are general planning figures, not guarantees, and the permitting phase ties to the live Scottsdale permitting answer (`how-long-does-permitting-take-in-scottsdale`) and its source [30] City of Scottsdale Planning & Development.
- [26] Arizona Financial CU, Construction Loan Process (build-phase context): https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide

---

## Assembly checklist (for the downstream task)

1. Paste the category block into `faqSeed.categories`, the topic block into `faqSeed.topics`, and the five `item({ ... })` blocks into `faqSeed.items`.
2. Confirm `sortOrder` 14–18 do not collide with other merged drafts; renumber if needed.
3. Verify every `relatedFaqSlugs` entry resolves after all drafts are merged (the sibling F-slugs resolve within this set; the existing-slug references are already live).
4. Optionally set `relatedFaqSlugs` on existing live items to point back at these new entries (e.g. link `how-long-does-permitting-take-in-scottsdale` to `how-long-does-it-take-to-build-a-custom-home`). Not required, but improves cross-linking.
5. Run the pipeline in order: `pnpm run typecheck:libs` → `pnpm --filter @workspace/api-server run faq:validate` (0 errors) → `pnpm --filter @workspace/api-server run faq:crosslinks` → `pnpm --filter @workspace/api-server run faq:registry`.
