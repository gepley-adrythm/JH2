# FAQ Draft: Building in the Desert (batch 2026-06)

**Prepared:** June 4, 2026
**Status:** Draft for assembly. Nothing here is wired into `lib/faq/src/seed.ts` yet. The assembly task pastes the `item({ ... })` blocks below into the seed under the existing `building-in-the-desert` category, finalizes `relatedFaqSlugs`, then runs the regeneration pipeline (`typecheck:libs` -> `faq:validate` -> `faq:crosslinks` -> `faq:registry`).

This batch adds 4 paste-ready `item({ ... })` blocks to the already-live `building-in-the-desert` category (`categorySlug: "building-in-the-desert"`, `topicSlugs: ["desert-build-essentials"]`). It does NOT add a new category or topic; both already exist in the shipped seed. Voice matches the shipped seed: deep, research-phase, plain-language, statutes and code sections cited by name, every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ). No em dashes, no emojis, no legal advice. Volatile facts (adopted code editions, federal efficiency standards) are date-stamped.

## Assembly notes

- **No new category/topic block.** `building-in-the-desert` and `desert-build-essentials` are already live (see `CONTENT-INTENT-REGISTRY.md`). These 4 items slot into the existing category.
- **`sortOrder`** is set to 100-103 per the writer brief. The shipped category currently ends around `sortOrder: 18`, so these sit cleanly after the live items; the assembler can renumber to a contiguous per-category sequence if it prefers.
- **`relatedFaqSlugs`** reference a mix of (a) live slugs validated against the current registry and (b) the 4 sibling slugs defined in this same batch. All sibling slugs resolve once these items are merged. Live-slug references used: `designing-an-energy-efficient-home-for-the-arizona-desert`, `lot-grading-and-drainage-keeping-water-away-from-the-house`, `going-solar-on-a-new-home-and-hoa-solar-rights`, `what-building-codes-apply-to-a-new-home-in-arizona`, `what-is-the-dust-control-rule-for-valley-construction-sites`, `how-do-i-know-if-a-lot-is-buildable`.
- **`pillarBlogSlug`** values were verified against the keys in `clone-data/extracted/blogs.json`. Where no strong real match exists, the value is `null` (never invented).

---

## Items to add (to `faqSeed.items`)

### 1. Best roofing and exterior materials for the Arizona desert

```ts
item({
  slug: "best-roofing-and-exterior-materials-for-the-desert",
  question: "What are the best roofing and exterior materials for the Arizona desert?",
  answerHtml: `<p><strong>In the Sonoran Desert the roof and the exterior walls are the home's first defense against relentless sun, 115-degree afternoons, sudden monsoon downpours, and blowing dust. The materials that perform best here are the ones that reflect heat instead of soaking it up, shrug off intense ultraviolet (UV) light without breaking down, and shed water fast when the rain finally comes.</strong> Concrete and clay tile, reflective standing-seam metal, and well-detailed foam or single-ply membranes on low-slope roofs all earn their place, paired with masonry or cement-based stucco walls in light, heat-rejecting colors. The right combination keeps a custom home in Scottsdale or Rio Verde cooler, lower to operate, and longer-lasting.</p>
<h2>Why the roof is the most important surface</h2>
<p>A dark roof in direct desert sun can reach 150 degrees or more, and that heat conducts straight down into the attic and the rooms below. The single most effective material decision you can make is to choose a roof that reflects sunlight and releases the heat it does absorb. Two measurable properties describe this:</p>
<ul>
<li><strong>Solar reflectance</strong> is the share of sunlight the surface bounces back rather than absorbs. Higher is better in a cooling-dominated climate.</li>
<li><strong>Thermal emittance</strong> is how readily the surface sheds the heat it does take on, so it cools down quickly after sunset.</li>
</ul>
<p>The Cool Roof Rating Council (CRRC) publishes independent ratings for these values, and the ENERGY STAR program certifies reflective roofing products. A roof that performs well on both measures, often called a "cool roof," reduces attic temperatures, eases the load on the air conditioner, and extends the life of the roofing itself because the material runs cooler.</p>
<h2>Roofing materials that perform in the desert</h2>
<ul>
<li><strong>Concrete and clay tile.</strong> A Southwest classic for good reason. Tile is extremely durable in UV and heat, carries a Class A fire rating, and the air gap under the tiles creates a ventilated layer that interrupts heat transfer into the deck. Light or reflective glazes push the reflectance higher.</li>
<li><strong>Reflective metal (standing seam).</strong> Long-lived, low-maintenance, and available with high-reflectance factory finishes. Metal sheds monsoon rain instantly and resists embers, which matters on foothill lots.</li>
<li><strong>Foam (sprayed polyurethane) and single-ply membranes (TPO or PVC) for low-slope roofs.</strong> Flat and low-slope rooflines are common on contemporary desert homes. A reflective foam roof or a white single-ply membrane gives a continuous, highly reflective surface, but flat roofs live or die on drainage detailing, so scuppers, tapered slope, and overflow drains must be designed in.</li>
<li><strong>Reflective coatings.</strong> Elastomeric and acrylic cool-roof coatings can raise the reflectance of an existing or new low-slope roof and add a waterproof layer.</li>
</ul>
<p>Whatever the material, generous attic insulation, a radiant barrier, and proper roof and attic ventilation work with the roofing to keep heat out of the living space.</p>
<h2>Exterior walls: mass, color, and water management</h2>
<p>For walls, cement-based stucco over masonry or framed walls remains the desert standard. It is durable, fire-resistant, and forgiving of intense sun. Masonry such as block or stone adds thermal mass, which slows the swing between the hot day and the cool desert night. The details that matter most:</p>
<ul>
<li><strong>Light, heat-rejecting colors.</strong> Earth-tone but lighter palettes reflect more solar energy than dark walls, lowering surface temperatures.</li>
<li><strong>A proper water-resistive barrier and flashing.</strong> Even stucco needs a drainage layer behind it and correct flashing at openings so wind-driven monsoon rain cannot get trapped in the wall.</li>
<li><strong>UV-stable finishes.</strong> Coatings and sealants rated for high UV exposure last far longer here than standard products.</li>
<li><strong>Shading.</strong> Deep overhangs and recessed openings protect both the glass and the wall surface from the harshest sun.</li>
</ul>
<h2>Codes, fire, and date-sensitive details</h2>
<p>Arizona has no statewide building code; each city, town, or county adopts its own edition of the International Residential Code (IRC) and International Energy Conservation Code (IECC), and the IECC sets the floor for roof and envelope performance. Some foothill jurisdictions also require Class A roof assemblies and ember-resistant detailing in wildland-urban interface areas. Adopted editions and local amendments change over time and differ by parcel.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We specify roofing and exterior materials to the home, the lot, and the local code: reflective, UV-durable, fire-appropriate assemblies with the flashing and drainage detailed correctly so they last in the desert. Because adopted code editions, energy requirements, and any wildland-interface roofing rules are set locally and change, we confirm the current requirements with your AHJ for your specific parcel before finalizing the design.</p>`,
  shortAnswer:
    "Choose materials that reflect heat, resist UV, and shed water fast. Concrete or clay tile, reflective standing-seam metal, and well-drained foam or single-ply membranes top the list for roofs, paired with stucco or masonry walls in light, heat-rejecting colors. Look for Cool Roof Rating Council and ENERGY STAR ratings, and confirm fire and energy rules with your AHJ.",
  metaDescription:
    "The best desert roofing and exterior materials: reflective tile, metal, and membranes plus stucco and masonry in light colors, rated by the Cool Roof Rating Council and ENERGY STAR.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["roofing", "exterior-materials", "cool-roof", "stucco", "research-phase"],
  relatedFaqSlugs: [
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "how-do-i-size-hvac-for-extreme-arizona-heat",
    "firewise-and-defensible-space-for-foothill-lots",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "arizona-home-design-trends-for-2026",
  sortOrder: 100,
}),
```

**Sources used (1)**
- [27] U.S. DOE Building America Solution Center, hot-dry climate roof and envelope best practices: https://basc.pnnl.gov
- Cool Roof Rating Council (CRRC), rated products directory and solar reflectance / thermal emittance definitions: https://coolroofs.org
- ENERGY STAR, Roof Products program: https://www.energystar.gov/products/building_products/roof_products
- [32] Insulation Institute, Summary of AZ residential energy code requirements: https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf

---

### 2. Sizing and choosing HVAC for extreme Arizona heat

```ts
item({
  slug: "how-do-i-size-hvac-for-extreme-arizona-heat",
  question: "How do I size and choose HVAC for extreme Arizona heat?",
  answerHtml: `<p><strong>The right way to size air conditioning for the Arizona desert is by calculation, not by rule of thumb. A room-by-room Manual J load calculation tells you exactly how much cooling the home you designed actually needs at the local design temperature, which in the Phoenix metro sits around 110 to 112 degrees. From that load you select right-sized, high-efficiency equipment (Manual S) and a properly designed duct system (Manual D). The most common and most expensive mistake here is oversizing, so bigger is emphatically not better.</strong></p>
<h2>Why "bigger" is the wrong instinct</h2>
<p>It is tempting to assume that brutal summers call for the biggest unit available. In practice an oversized air conditioner cools the air quickly but cycles on and off in short bursts. That short-cycling wears the equipment, leaves the house feeling clammy because the system never runs long enough to pull humidity out during monsoon season, creates hot and cold spots, and costs more to buy and to run. A correctly sized unit runs longer, steadier cycles that hold an even temperature and dehumidify properly.</p>
<h2>The calculation trilogy: Manual J, S, and D</h2>
<p>The Air Conditioning Contractors of America (ACCA) publishes the industry-standard design procedures that a quality builder follows in sequence:</p>
<ul>
<li><strong>Manual J (load calculation).</strong> A detailed, room-by-room accounting of heat gain that considers orientation, window area and performance, insulation levels, air leakage, ceiling height, and the local design temperature, rather than a crude square-footage guess.</li>
<li><strong>Manual S (equipment selection).</strong> Matching the actual equipment to the Manual J load and to the desert design conditions, so the unit is sized to the home and not rounded up "to be safe."</li>
<li><strong>Manual D (duct design).</strong> Sizing and laying out the ducts so each room gets the airflow it needs. Undersized or leaky ducts waste a large share of the capacity you paid for.</li>
</ul>
<h2>Efficiency ratings and what the law requires</h2>
<p>As of January 1, 2023 the U.S. Department of Energy applies regional minimum-efficiency standards measured in SEER2 and EER2. Arizona is in the Southwest region (with California, Nevada, and New Mexico), which carries the strictest limits because of the heat. The current minimums for split-system central air conditioners in the Southwest region are about 14.3 SEER2 for systems under 45,000 BTU per hour and 13.8 SEER2 for larger systems, with companion EER2 floors; heat pumps must meet 14.3 SEER2 and 7.5 HSPF2 nationally. SEER2 measures seasonal cooling efficiency and EER2 measures efficiency at a hot peak, and the EER2 figure is especially meaningful in a climate that spends weeks above 105 degrees. These federal figures change over time, so verify the current standard when you build.</p>
<h2>Equipment choices that fit the desert</h2>
<ul>
<li><strong>Heat pump versus straight AC.</strong> Modern heat pumps cool as well as a conventional air conditioner and heat efficiently through the mild Phoenix winter, often replacing a separate gas furnace.</li>
<li><strong>Variable-speed and two-stage systems.</strong> Equipment that can run at lower capacity for most of the day holds temperature and humidity far better than a single-stage unit that only knows full blast or off.</li>
<li><strong>Ducts in conditioned space.</strong> Ducts run through a 140-degree attic bleed enormous energy. Bringing the ducts, or the whole air handler, into conditioned space is one of the highest-value moves in this climate.</li>
<li><strong>Zoning.</strong> On a larger or multi-level home, zoning lets you cool the occupied parts of the house without overcooling the rest.</li>
</ul>
<h2>The envelope does half the work</h2>
<p>HVAC sizing and the building envelope are two halves of one problem. A tight, well-insulated, well-shaded house with low-solar-heat-gain windows has a smaller cooling load, which means a smaller, cheaper, quieter system and lower bills for the life of the home. Sizing the equipment first and the envelope second gets it backwards. Design them together.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We base mechanical design on a Manual J load calculation for the specific home and lot, select right-sized high-efficiency equipment, design the ducts deliberately, and coordinate the system with a tight, shaded envelope rather than defaulting to oversized tonnage. Adopted energy codes and federal efficiency standards change over time and the energy code edition varies by jurisdiction, so we confirm the current requirements with your local AHJ for your specific parcel before finalizing the design.</p>`,
  shortAnswer:
    "Size cooling by a room-by-room Manual J load calculation at the local design temperature, not by square footage, because oversized units short-cycle and dehumidify poorly. Then select right-sized, high-efficiency equipment (Manual S) and ducts (Manual D), favoring a heat pump, variable-speed operation, and ducts in conditioned space. Confirm current SEER2 and energy-code rules with your AHJ.",
  metaDescription:
    "How do you size HVAC for Arizona heat? Use a Manual J load calculation, not square footage, then pick right-sized SEER2-rated equipment and ducts in conditioned space.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["hvac", "manual-j", "cooling", "seer2", "research-phase"],
  relatedFaqSlugs: [
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "best-roofing-and-exterior-materials-for-the-desert",
    "going-solar-on-a-new-home-and-hoa-solar-rights",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  sortOrder: 101,
}),
```

**Sources used (2)**
- ACCA, Manual J Residential Load Calculation, and the companion Manual S (equipment selection) and Manual D (duct design): https://www.acca.org/standards/technical-manuals/manual-j
- AHRI / U.S. DOE, 2023 regional minimum-efficiency standards (SEER2 / EER2 / HSPF2), Southwest region, effective January 1, 2023: https://www.ahrinet.org/2023-energy-efficiency-standards
- [27] U.S. DOE Building America Solution Center, hot-dry HVAC and duct best practices: https://basc.pnnl.gov
- [32] Insulation Institute, Summary of AZ residential energy code requirements: https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf

---

### 3. Protecting a desert home from monsoon storms, dust, and flash flooding

```ts
item({
  slug: "protecting-a-desert-home-from-monsoon-and-dust",
  question: "How do I protect a desert home from monsoon storms, dust, and flash flooding?",
  answerHtml: `<p><strong>Protecting a desert home from the monsoon and from blowing dust is mostly about how the building itself is detailed: a water-resistive barrier and correct flashing behind the cladding, windows and doors that are pan-flashed and sealed against wind-driven rain, a low-slope roof with redundant drainage, and an air-tight envelope that keeps fine dust out. Site grading and drainage keep water away from the foundation; this answer covers the rest of the house, the envelope and the openings, that has to keep water and dust out once the storm arrives.</strong> (For the lot-level grading and drainage rules, see the separate grading and drainage answer.)</p>
<h2>What a monsoon actually does to a building</h2>
<p>The Arizona monsoon, roughly mid-June through September, brings the year's most violent weather in short bursts: an inch of rain in an hour, 60-mile-per-hour gusts, and walls of dust. Rain does not just fall, it is driven sideways into walls, windows, and door frames. The pressure of that wind-driven rain finds any gap in the flashing or sealant. A home that handles a calm day fine can leak badly in a 20-minute storm if the openings were not detailed for it.</p>
<h2>The envelope: barriers and flashing</h2>
<p>Behind the stucco, stone, or siding, the wall needs a continuous water-resistive barrier (WRB) and a way to drain any water that gets past the cladding. The International Residential Code (IRC) requires this in Section R703: at least one WRB layer over the sheathing, lapped shingle-fashion so water flows down and out, with corrosion-resistant flashing at all openings and penetrations. Done right, the cladding is the first line of defense and the WRB plus flashing is the backup that actually keeps the structure dry.</p>
<h2>Windows and doors: the most common leak points</h2>
<p>Openings are where wind-driven rain gets in, so they deserve the most attention:</p>
<ul>
<li><strong>Pan flashing under every window and door,</strong> sloped to drain water back out to the WRB, is the detail that prevents the classic sill leak.</li>
<li><strong>Integrated head and jamb flashing</strong> that laps correctly over the WRB so water sheds away from, not into, the opening.</li>
<li><strong>Windows rated for the exposure.</strong> Units with good water-penetration and air-infiltration ratings hold up to driven rain and keep dust out.</li>
<li><strong>Quality sealants and backer rod</strong> rated for high UV and movement, since desert heat cycles open up cheap caulk joints within a season or two.</li>
</ul>
<h2>The roof, especially low-slope roofs</h2>
<p>Flat and low-slope rooflines are popular on desert homes and need redundant drainage. That means a tapered slope to the drains, primary scuppers or drains, and overflow scuppers or overflow drains set slightly higher to handle a clogged primary or a cloudburst that outpaces it. Parapet walls need proper coping and flashing, and every roof penetration needs a detailed, UV-stable seal. On pitched roofs, valley and step flashing carry the heavy water safely.</p>
<h2>Keeping dust out</h2>
<p>Blowing dust is the desert's other relentless intruder, and the defense overlaps with energy efficiency: a tight envelope. The same air sealing that lowers cooling bills also keeps fine dust from infiltrating through gaps around windows, doors, and penetrations. Practical measures include:</p>
<ul>
<li><strong>Air-sealing the envelope</strong> and weatherstripping doors and windows so dust has no easy path in.</li>
<li><strong>Quality door sweeps and gasketing,</strong> including at the garage-to-house door.</li>
<li><strong>Sealing and conditioning the duct system,</strong> so the HVAC is not pulling attic or wall-cavity dust into the living space.</li>
<li><strong>Effective air filtration</strong> at the air handler (a higher-MERV filter the system is designed to handle) to capture the fine particulate that does get in.</li>
</ul>
<h2>Flash flooding and the bigger picture</h2>
<p>Where a lot sits near a wash or in a mapped floodplain, building elevation and a floodplain use permit may come into play, which is a site and due-diligence question handled before design. The whole-home detailing above assumes the site drainage has already been solved; the two work together, the lot moves water away from the house, and the envelope keeps out whatever the storm throws at the walls and roof.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We detail the envelope for the monsoon from the start: continuous WRB and flashing, pan-flashed openings, windows rated for driven rain, redundant low-slope roof drainage, and an air-tight, well-filtered envelope that keeps dust out. Adopted code editions and local amendments to the flashing and drainage requirements change and vary by jurisdiction, so we confirm the current requirements with your AHJ for your specific parcel before construction.</p>`,
  shortAnswer:
    "Detail the building to keep weather out: a continuous water-resistive barrier and flashing behind the cladding, pan-flashed windows and doors rated for wind-driven rain, redundant drainage on low-slope roofs, and an air-tight, well-filtered envelope that blocks dust. Site grading handles water away from the foundation; confirm current code details with your AHJ.",
  metaDescription:
    "Protect a desert home from monsoon and dust: water-resistive barriers, pan-flashed windows, redundant low-slope roof drainage, and an air-tight envelope per IRC R703.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["monsoon", "dust", "building-envelope", "flashing", "research-phase"],
  relatedFaqSlugs: [
    "lot-grading-and-drainage-keeping-water-away-from-the-house",
    "what-is-the-dust-control-rule-for-valley-construction-sites",
    "best-roofing-and-exterior-materials-for-the-desert",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "how-to-avoid-common-mistakes-when-building-a-custom-home-in-arizona",
  sortOrder: 102,
}),
```

**Sources used (3)**
- [29] 2024 IRC Section R703, Exterior covering: water-resistive barrier and flashing (ICC Digital Codes): https://codes.iccsafe.org/s/IRC2024P2/chapter-7-wall-covering
- [27] U.S. DOE Building America Solution Center, water management and air-sealing best practices: https://basc.pnnl.gov
- [23] Maricopa County Air Quality Dept., dust context (Rule 310): https://www.maricopa.gov/1913/Dust-Sources-Control-and-Training
- National Weather Service / Arizona monsoon background (wind-driven rain and dust context): https://www.weather.gov/psr/Monsoon

---

### 4. Firewise design and defensible space for foothill lots

```ts
item({
  slug: "firewise-and-defensible-space-for-foothill-lots",
  question: "What is firewise design and defensible space for foothill lots?",
  answerHtml: `<p><strong>Firewise design and defensible space are the two halves of building a home that can survive a wildfire in the wildland-urban interface, the foothill and desert-edge areas where neighborhoods meet open land. "Firewise" or home hardening means building the structure itself from materials and details that resist embers and flame. "Defensible space" means managing the landscape in concentric zones around the house so a fire has less fuel as it approaches. Research from the National Fire Protection Association (NFPA) and federal fire scientists is clear that wind-blown embers, not a wall of flame, ignite the large majority of homes lost to wildfire, so the goal is to give embers nowhere to catch.</strong></p>
<h2>The Home Ignition Zone</h2>
<p>The NFPA organizes the defense around the home into the Home Ignition Zone, divided into three areas measured outward from the structure:</p>
<ul>
<li><strong>Immediate zone (0 to 5 feet).</strong> The most critical area. Keep it free of anything that can burn: no bark mulch, no firewood stacked against the house, no combustible fences touching the wall, no dead leaves in gutters or against the foundation. Some frameworks call this innermost ring Zone 0 and recommend a noncombustible, ember-resistant ground surface such as gravel or pavers.</li>
<li><strong>Intermediate zone (5 to 30 feet).</strong> Break up the fuel. Space and prune plants so fire cannot move continuously from one to the next, keep grass low, and create gaps between tree canopies and the house.</li>
<li><strong>Extended zone (30 to 100 feet).</strong> Reduce and thin fuels so an approaching fire drops from the treetops to the ground and loses intensity before it reaches the home.</li>
</ul>
<h2>Hardening the structure (firewise design)</h2>
<p>The materials and details that make a structure ember-resistant include:</p>
<ul>
<li><strong>A Class A roof assembly.</strong> The roof is the largest target for falling embers. Concrete or clay tile, metal, and other Class A assemblies resist ignition, and the roof valleys and edges should be detailed to shed embers, not trap them.</li>
<li><strong>Ember-resistant vents.</strong> Attic and crawlspace vents are a primary entry point for embers. Use fine corrosion-resistant metal mesh (commonly 1/8-inch) or listed ember-resistant vents.</li>
<li><strong>Noncombustible siding and enclosed eaves.</strong> Stucco, masonry, fiber-cement, and boxed-in (soffited) eaves deny embers a foothold.</li>
<li><strong>Dual-pane and tempered windows.</strong> Multi-pane glass resists the radiant heat that can shatter a single pane and let fire inside.</li>
<li><strong>Noncombustible zone-0 details.</strong> Metal gutters and gutter guards, noncombustible fencing or a metal gate where a fence meets the house, and a clean roof and gutter line.</li>
</ul>
<h2>The codes and agencies behind it</h2>
<p>Wildfire safety in Arizona is shaped by several authorities. The Arizona Department of Forestry and Fire Management (DFFM), operating under A.R.S. Title 37 (roughly sections 37-1301 through 37-1426), leads wildfire prevention and supports community programs. Many foothill jurisdictions adopt the International Wildland-Urban Interface Code (IWUIC), which sets construction and defensible-space requirements in mapped interface areas, layered on top of the local building code. The national Firewise USA recognition program, run by the NFPA, gives communities a framework and is increasingly relevant to wildfire insurance availability. Which rules apply, and how wide the defensible-space requirement is, depends entirely on the parcel and the jurisdiction.</p>
<h2>Why it matters before you design</h2>
<p>Firewise choices are far cheaper and cleaner to build in than to retrofit. Roof class, vent type, siding, window glazing, and where a noncombustible zone falls around the house are all decisions best made on paper, before framing, alongside the rest of the design. On a foothill lot, getting them right can also affect whether, and at what cost, the home can be insured.</p>
<h2>How Jematell Homes approaches it</h2>
<p>On foothill and desert-edge lots we design the home to harden it against embers, Class A roofing, ember-resistant vents, noncombustible siding and eaves, appropriate glazing, and we plan the defensible-space zones around the structure into the site design. Wildland-interface codes, defensible-space requirements, and adopted code editions are set locally and change, so we confirm the current requirements with your local AHJ and fire authority for your specific parcel before finalizing the design.</p>`,
  shortAnswer:
    "Firewise design hardens the house against embers (Class A roof, ember-resistant vents, noncombustible siding and eaves, dual-pane windows), while defensible space manages fuel in concentric zones: 0 to 5 feet kept noncombustible, 5 to 30 feet thinned, and 30 to 100 feet reduced. Many foothill jurisdictions enforce this through the IWUIC, so confirm requirements with your AHJ and fire authority.",
  metaDescription:
    "Firewise design and defensible space for foothill lots: harden the home with a Class A roof and ember-resistant vents, and manage fuel in NFPA Home Ignition Zones.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["wildfire", "firewise", "defensible-space", "wildland-urban-interface", "research-phase"],
  relatedFaqSlugs: [
    "best-roofing-and-exterior-materials-for-the-desert",
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  sortOrder: 103,
}),
```

**Sources used (4)**
- NFPA, Preparing Homes for Wildfire and the Home Ignition Zone: https://www.nfpa.org/education-and-research/wildfire/preparing-homes-for-wildfire
- NFPA, Firewise USA recognition program: https://www.nfpa.org/education-and-research/wildfire/firewise-usa
- Arizona Department of Forestry and Fire Management (DFFM), wildfire programs (A.R.S. Title 37, sections 37-1301 through 37-1426): https://dffm.az.gov/fire
- International Code Council, International Wildland-Urban Interface Code (IWUIC): https://codes.iccsafe.org/codes/i-codes
