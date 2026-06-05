# FAQ Draft (Competitive batch): Building Science & Structural Systems

**Prepared:** June 5, 2026
**Category:** `building-in-the-desert` (existing) | **Topic:** `desert-build-essentials` (existing)
**Status:** Draft for assembly. Nothing here is wired into `lib/faq/src/seed.ts` yet. The assembly task pastes the `item({ ... })` blocks below into the seed under the **Building in the Desert** section, finalizes `relatedFaqSlugs`/`sortOrder`, then runs the regeneration pipeline (`typecheck:libs` -> `faq:validate` -> `faq:crosslinks` -> `faq:registry`).

This file adds 4 paste-ready `item({ ... })` blocks for the construction-method and building-science questions where AFT Construction ranks with descriptive-but-shallow posts (ICF, SIPs, post-tension slab, spray foam, net-zero). We one-up them with deeper, code-and-climate-grounded answers framed for the Arizona desert. Voice matches the shipped seed: deep, research-phase, plain-language, real codes/standards cited by name, every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ). No em dashes, no emojis, no legal advice. Volatile facts are date-stamped.

---

## Assembly notes

- **`sortOrder`:** numbered 100-103 here (per the writer brief). Assembly finalizes contiguous per-category numbering; the live Building in the Desert category currently ends around 18, so renumber into that sequence.
- **`relatedFaqSlugs`:** every slug referenced below is either (a) a live slug already in the seed, or (b) one of the 4 sibling slugs defined in this same file (all resolve once merged). Live slugs referenced: `designing-an-energy-efficient-home-for-the-arizona-desert`, `going-solar-on-a-new-home-and-hoa-solar-rights`, `lot-grading-and-drainage-keeping-water-away-from-the-house`, `caliche-expansive-clay-and-desert-soils`, `do-i-need-a-soils-or-geotechnical-report`, `what-building-codes-apply-to-a-new-home-in-arizona`. Sibling slugs: `icf-vs-wood-frame-vs-block-construction`, `foundation-types-for-arizona-custom-homes`, `insulation-options-for-an-arizona-home`, `how-a-custom-home-reaches-net-zero-energy`.
- **Distinctness:** kept deliberately separate from the live `designing-an-energy-efficient-home-for-the-arizona-desert` page (whole-house design) and from any in-flight roofing/HVAC-sizing pages. Insulation here is the envelope/material choice; net-zero here is the net-zero target math (load reduction + on-site generation + offset); foundations here are the structural systems (kept distinct from the live soils-report and caliche pages, which cover the geotech study and soil behavior).

---

### 1. ICF vs wood-frame vs block construction

```ts
item({
  slug: "icf-vs-wood-frame-vs-block-construction",
  question: "ICF vs wood-frame vs block: which wall system is best for a desert custom home?",
  answerHtml: `<p><strong>There is no single best wall system, and the question that decides it is not which material is strongest. It is which wall gives you the most continuous insulation and the tightest air seal for your budget. Wood frame is the most common and lowest in first cost, concrete masonry (block, or CMU) adds mass and durability, and insulated concrete forms (ICF) deliver the highest insulation and airtightness at the highest upfront price.</strong> In a hot-dry climate the wall's real job is to slow the heat coming in and keep cooled air from leaking out, so insulation and air sealing matter more than raw mass.</p>
<h2>How does each wall system work?</h2>
<h3>Wood frame</h3>
<p>Dimensional 2x6 (or 2x4) studs at 16 or 24 inches on center, sheathed and insulated in the stud cavities, then finished with stucco over a weather-resistive barrier outside and drywall inside. It is the default for most Arizona custom homes because it is fast, flexible for complex floor plans, and the trades are everywhere. Its weak point is the studs themselves: wood conducts heat, so every framing member is a small thermal bridge unless you add a layer of continuous exterior insulation over the sheathing.</p>
<h3>Concrete masonry (block / CMU)</h3>
<p>Concrete blocks stacked and grouted, with steel reinforcing, then typically stuccoed outside and furred-and-insulated or insulated in the cores inside. Block is durable, fire-resistant, termite-proof, and quiet, which is why it was a Southwest staple for decades. On its own a bare block wall is a mediocre insulator, so the insulation strategy (interior furring with rigid or batt, or insulated cores) is what determines its real-world performance.</p>
<h3>Insulated concrete forms (ICF)</h3>
<p>Hollow rigid-foam blocks are stacked like large bricks, reinforced with steel, and filled with concrete. The foam stays in place permanently as continuous insulation on both faces of a solid concrete core. The result is a wall that is highly insulated, very airtight, strong, and quiet. The Portland Cement Association and the Insulating Concrete Forms Manufacturers Association document typical whole-wall R-values well above a standard insulated wood wall, plus very low air leakage. The trade-offs are higher material and labor cost and the need for a crew experienced in ICF.</p>
<h2>What actually matters in a hot-dry climate?</h2>
<ul>
<li><strong>Continuous insulation and whole-wall R-value.</strong> The number that counts is the performance of the entire assembly, not the insulation in the stud bays. ICF wins here because the foam is unbroken. A wood or block wall can close the gap with a layer of continuous exterior rigid insulation.</li>
<li><strong>Air tightness.</strong> Leaky walls dump your cooled air to the outside and pull hot air in. ICF and well-detailed block are inherently tight; wood frame depends on careful air sealing, verified with a blower-door test on a quality build.</li>
<li><strong>The thermal-mass question.</strong> Mass (block or the concrete core of ICF) stores heat and slows the daily temperature swing, which can help in the high desert where nights cool off. But in the low desert, where summer nights stay warm, mass without good insulation can keep re-radiating heat indoors. Mass helps most when it is paired with insulation on the outside of it, which is exactly how ICF is built.</li>
</ul>
<h2>How do the three compare?</h2>
<ul>
<li><strong>Energy and comfort:</strong> ICF is strongest, well-insulated block is solid, wood frame is good when you add continuous exterior insulation and tight air sealing.</li>
<li><strong>First cost:</strong> wood frame is lowest, block is in the middle, ICF is highest.</li>
<li><strong>Durability and quiet:</strong> ICF and block lead; both resist fire and termites and dampen sound far better than wood.</li>
<li><strong>Design flexibility and speed:</strong> wood frame is the most flexible for intricate plans and the fastest to frame; ICF and block reward simpler, more rectilinear forms.</li>
<li><strong>Resilience:</strong> the concrete systems shrug off the desert's heat cycling, wind-driven debris, and pests with less long-term maintenance.</li>
</ul>
<h2>What does code require, and what about cost?</h2>
<p>All three systems must meet the same baseline. Arizona has no statewide building code, so each jurisdiction adopts its own edition of the International Residential Code (IRC) and the International Energy Conservation Code (IECC), which set the minimum wall U-factor or R-value, the bracing and structural requirements, and termite-protection provisions under IRC Chapter 3. A wall system is a means to hit those numbers, not an exemption from them. On cost, wood frame keeps the lowest entry price, but the gap narrows over the life of the home when you account for lower cooling bills and lower maintenance on the concrete systems. Many desert custom homes land on a hybrid: wood-framed where flexibility matters, with block or ICF where mass, durability, or sound control earn their keep.</p>
<h2>How do you decide?</h2>
<p>Start from your priorities. If first cost and design flexibility lead, a well-insulated, well-sealed wood-frame wall with continuous exterior insulation is hard to beat. If long-term energy performance, quiet, and resilience lead, ICF or insulated block justify the premium. The lot matters too: exposure, views, and how much glass you want all interact with the wall choice. We model the options against your design and budget rather than defaulting to one system.</p>
<h2>Confirm the details for your lot</h2>
<p>Adopted IRC and IECC editions, the required wall performance, and structural and termite provisions are set locally and change over time. Always confirm the current requirements with your Authority Having Jurisdiction (AHJ) for your specific parcel before locking in a wall system.</p>`,
  shortAnswer:
    "There is no single best wall system. Wood frame is cheapest and most flexible, block adds mass and durability, and ICF gives the highest insulation and airtightness for the highest cost. In the desert, continuous insulation and air sealing matter more than raw mass, and all three must meet the same adopted IRC and IECC requirements.",
  metaDescription:
    "ICF vs wood-frame vs block for an Arizona desert custom home: how each wall system compares on energy, cost, comfort, and durability, and what the adopted code requires.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["wall-systems", "icf", "block-construction", "wood-frame", "energy-efficiency", "research-phase"],
  relatedFaqSlugs: [
    "insulation-options-for-an-arizona-home",
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "foundation-types-for-arizona-custom-homes",
    "what-building-codes-apply-to-a-new-home-in-arizona",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  sortOrder: 100,
}),
```

**Sources used (1)**
- U.S. DOE Building America Solution Center, hot-dry climate wall assemblies and continuous insulation: https://basc.pnnl.gov
- Portland Cement Association (PCA), insulating concrete forms / concrete homes: https://www.cement.org
- Insulating Concrete Forms Manufacturers Association (ICFMA), ICF performance: https://www.icf-ma.org
- ICC Digital Codes, IRC Chapter 3 (building planning, termite protection) and IECC: https://codes.iccsafe.org
- [32] Insulation Institute, Summary of AZ residential energy code requirements: https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf

---

### 2. Foundation types for Arizona custom homes

```ts
item({
  slug: "foundation-types-for-arizona-custom-homes",
  question: "What foundation types are used for Arizona custom homes (post-tension slab, conventional slab, stem-wall)?",
  answerHtml: `<p><strong>Most Arizona custom homes sit on one of three foundation systems: a post-tensioned slab-on-ground, a conventionally reinforced (rebar) slab-on-ground, or a stem-wall foundation with footings and a raised slab. Which one fits your home is a structural-engineering decision driven by your soils report, the lot's slope and drainage, and the size of the house.</strong> The geotechnical report tells the engineer how the ground behaves; the foundation system is how the design responds to it.</p>
<h2>How does each foundation system work?</h2>
<h3>Post-tensioned (PT) slab-on-ground</h3>
<p>A concrete slab cast over a grid of high-strength steel tendons that are tensioned after the concrete cures, putting the slab into compression. That compression helps the slab span minor soil movement and resist cracking, which is why PT slabs are common across the Phoenix metro on lots with expansive clays that shrink and swell with moisture. Residential PT slabs are typically designed to the Post-Tensioning Institute standard for slabs-on-ground (PTI DC10.5), using soil parameters from your geotechnical report. The trade-off is that you cannot later cut into the slab casually, because the tendons are under load.</p>
<h3>Conventionally reinforced slab-on-ground</h3>
<p>A monolithic or two-pour slab reinforced with steel rebar rather than tensioned tendons, with thickened edges and interior footings sized by the engineer. It works well on stable, well-drained, low-expansion soils and is straightforward for trades to build and to modify later. On reactive desert soils it can be designed to perform, but the engineer may favor a PT slab or a stiffer stem-wall approach where movement is a concern.</p>
<h3>Stem-wall foundation</h3>
<p>Continuous footings carry short concrete or masonry stem walls that bring the structure up to the desired floor height; the interior is then backfilled and a slab poured on top, or a structural floor is framed over a crawl space. Stem walls shine on sloped lots, where they let the house step up a grade, and where you want the finished floor raised well above surrounding grade for drainage. They cost more than a flat slab but give the design more freedom on uneven desert terrain.</p>
<h2>How do soils and the desert drive the choice?</h2>
<p>Arizona soils are the deciding factor. Two conditions show up constantly in this region and both belong in the foundation conversation:</p>
<ul>
<li><strong>Expansive clays.</strong> These swell when wet and shrink when dry, flexing the ground under the foundation. PT slabs and engineered stiffened slabs are designed specifically to ride out that movement.</li>
<li><strong>Caliche.</strong> A naturally cemented, concrete-hard soil layer that can be excellent bearing material but is expensive and slow to excavate, which affects footing depth and earthwork cost.</li>
</ul>
<p>Slope, drainage, and the depth to firm bearing soil also matter. A lot that needs the finished floor raised for monsoon drainage may point toward a stem-wall; a flat, stable pad may suit a slab. Those soil behaviors are covered in depth on our soils-report and caliche pages; here the point is how they steer the foundation system itself.</p>
<h2>What does code require?</h2>
<p>Foundations are governed by Chapter 4 of the adopted International Residential Code (IRC), which sets minimum footing sizes, depth, reinforcement, and drainage, and requires the design to account for the site's soils. On reactive or questionable soils the building department will expect a geotechnical report and a foundation engineered to it, often stamped by a licensed engineer. Arizona has no single statewide code, so the adopted IRC edition and any local amendments vary by jurisdiction. The IRC also requires the finished grade to fall away from the foundation, which ties your foundation choice to the lot's grading and drainage plan.</p>
<h2>How does Jematell Homes approach it?</h2>
<p>We start with a geotechnical investigation, share it with the structural engineer, and let the soils, slope, drainage, and the home's design select the foundation rather than defaulting to one type. On expansive ground that often means a PT slab; on a sloped view lot it may mean a stem-wall; on stable soil a conventional slab can be the right, economical answer. Because adopted code editions, required studies, and engineering thresholds are set locally and change over time, always confirm the current foundation and soils requirements with your Authority Having Jurisdiction (AHJ) for your specific parcel before design is finalized.</p>`,
  shortAnswer:
    "Arizona custom homes typically use a post-tensioned slab, a conventionally reinforced slab, or a stem-wall foundation. The right one is an engineering call driven by your soils report, the lot's slope and drainage, and the home size. Expansive clays often favor a post-tensioned slab; sloped lots often favor a stem-wall.",
  metaDescription:
    "Foundation types for Arizona custom homes: post-tensioned slab, conventional slab-on-ground, and stem-wall, and how soils, slope, and the adopted IRC drive the choice.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["foundations", "post-tension-slab", "stem-wall", "expansive-soils", "caliche", "research-phase"],
  relatedFaqSlugs: [
    "caliche-expansive-clay-and-desert-soils",
    "do-i-need-a-soils-or-geotechnical-report",
    "icf-vs-wood-frame-vs-block-construction",
    "lot-grading-and-drainage-keeping-water-away-from-the-house",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  sortOrder: 101,
}),
```

**Sources used (2)**
- Post-Tensioning Institute (PTI), DC10.5 standard for design of post-tensioned slabs-on-ground: https://www.post-tensioning.org
- ICC Digital Codes, IRC Chapter 4 (foundations), including R401.3 drainage and soils provisions: https://codes.iccsafe.org
- U.S. DOE Building America Solution Center, slab and foundation guidance: https://basc.pnnl.gov
- Arizona Geological Survey, expansive soils and ground conditions background: https://azgs.arizona.edu

---

### 3. Insulation options for an Arizona home

```ts
item({
  slug: "insulation-options-for-an-arizona-home",
  question: "What are the best insulation options for an Arizona home (spray foam, batt, blown-in)?",
  answerHtml: `<p><strong>For an Arizona home the best insulation is whatever lets you build a tight, well-insulated envelope and, ideally, get the ducts out of a brutally hot attic. Spray foam (open or closed cell) air-seals and insulates in one step and enables a conditioned attic; blown-in cellulose or fiberglass is a cost-effective way to reach high attic R-values; and batts (fiberglass or mineral wool) are the economical choice in walls when paired with careful air sealing.</strong> In this cooling-dominated climate the attic and the air leaks are where most of the heat gets in, so that is where the insulation dollars work hardest.</p>
<h2>What are the main insulation types?</h2>
<h3>Spray polyurethane foam (SPF)</h3>
<p>Sprayed in place, it expands to fill cavities and seal gaps. Closed-cell foam has a high R-value per inch and adds air and moisture control; open-cell foam is lower in R-value per inch but cheaper and still an excellent air seal. Sprayed at the underside of the roof deck, foam creates an unvented, conditioned attic, which is one of the highest-value moves in the desert because it brings the ductwork into cooled space. The trade-offs are higher cost and the need for correct installation and code-required ignition or thermal barriers.</p>
<h3>Blown-in (loose-fill) cellulose or fiberglass</h3>
<p>Blown across an attic floor to a measured depth, loose-fill reaches high R-values economically and fills irregular spaces well. It is the workhorse for a vented attic where you keep the ducts low or, better, eliminate attic ducts entirely. It does not by itself air-seal, so the ceiling plane must be sealed first.</p>
<h3>Batts (fiberglass or mineral wool)</h3>
<p>Pre-cut blankets friction-fit into stud and ceiling cavities. They are the most economical wall insulation and, when installed cleanly with no gaps or compression, perform to their rating. Mineral wool adds fire and sound resistance. Like blown-in, batts rely on a separate air-sealing layer to perform in the real world.</p>
<h2>What matters most in a hot-dry climate?</h2>
<ul>
<li><strong>Air sealing comes first.</strong> Insulation slows heat conduction, but air leaks let hot outdoor air pour in directly. The most effective desert envelopes combine insulation with deliberate air sealing, verified by a blower-door test.</li>
<li><strong>The attic is the battlefield.</strong> A desert attic can hit 140 degrees or more. Generous attic insulation, a radiant barrier or reflective roof, and getting ducts out of that heat (via a conditioned attic or by keeping ducts in conditioned space) drive comfort and bills more than wall insulation does.</li>
<li><strong>Continuous insulation reduces thermal bridging.</strong> A layer of rigid foam outside the framing stops heat from short-circuiting through the studs, lifting whole-wall performance above the cavity-only number.</li>
<li><strong>Vented attic with sealed ceiling versus unvented conditioned attic.</strong> Both work in Arizona. The vented-and-sealed approach is lower cost; the spray-foam conditioned attic costs more but protects the ducts and the mechanical equipment from extreme heat.</li>
</ul>
<h2>How much insulation does code require?</h2>
<p>Arizona's residential energy requirements come from the adopted edition of the International Energy Conservation Code (IECC), which sets minimum R-values and U-factors by climate zone. Most of the Phoenix metro lies in IECC Climate Zone 2B, while higher-elevation areas fall into Zone 3B or cooler, so the required ceiling, wall, and slab insulation levels depend on both your jurisdiction and your elevation. Spray foam used on a roofline must also meet code provisions for unvented attics and for ignition and thermal barriers. Because Arizona has no statewide code, the adopted IECC edition and any local amendments vary by jurisdiction, so the exact R-values are local.</p>
<h2>So which should you choose?</h2>
<p>There is rarely one answer for the whole house. A common high-performing desert recipe is spray foam at the roof deck for a conditioned attic (protecting the ducts), blown-in or batt in any remaining cavities, continuous exterior insulation on the walls to cut thermal bridging, and meticulous air sealing throughout. Budget, whether the ducts run through the attic, and your target energy performance steer the mix. We design the insulation and air-sealing strategy as a system with the wall assembly and the mechanical layout rather than picking a single product.</p>
<h2>Confirm the details for your lot</h2>
<p>The adopted IECC edition, the required R-values for your climate zone, and the rules for unvented attics and foam barriers are set locally and change over time. Always confirm the current energy-code requirements with your Authority Having Jurisdiction (AHJ) for your specific parcel before finalizing the insulation plan.</p>`,
  shortAnswer:
    "The best Arizona insulation is whatever builds a tight, well-insulated envelope and gets ducts out of the hot attic. Spray foam air-seals and enables a conditioned attic, blown-in reaches high attic R-values cheaply, and batts are economical in walls with good air sealing. Required R-values follow the adopted IECC and your climate zone.",
  metaDescription:
    "Best insulation options for an Arizona home: spray foam, batt, and blown-in compared, plus attic strategy, air sealing, and the R-values the adopted IECC requires.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["insulation", "spray-foam", "attic", "air-sealing", "energy-efficiency", "research-phase"],
  relatedFaqSlugs: [
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "how-a-custom-home-reaches-net-zero-energy",
    "icf-vs-wood-frame-vs-block-construction",
    "what-building-codes-apply-to-a-new-home-in-arizona",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "arizona-home-design-trends-for-2026",
  sortOrder: 102,
}),
```

**Sources used (3)**
- U.S. DOE Building America Solution Center, insulation, air sealing, and unvented attic strategies for hot-dry climates: https://basc.pnnl.gov
- [32] Insulation Institute, Summary of AZ residential energy code requirements (IECC R-values by climate zone): https://insulationinstitute.org/wp-content/uploads/2025/05/N143-AZ-Energy-Code-0425.pdf
- ICC Digital Codes, IECC residential provisions and IRC unvented attic / foam barrier requirements: https://codes.iccsafe.org
- ENERGY STAR, residential insulation and air sealing guidance: https://www.energystar.gov

---

### 4. How a custom home reaches net-zero energy

```ts
item({
  slug: "how-a-custom-home-reaches-net-zero-energy",
  question: "How does a custom home reach net-zero energy in Arizona?",
  answerHtml: `<p><strong>A net-zero-energy home produces, over a year, at least as much energy as it uses. You get there with a two-step formula: first drive the home's energy use down as far as it will go with a tight, well-insulated envelope and efficient equipment, then add enough on-site solar generation to offset the remaining annual demand. Arizona's abundant sunshine makes the second step easier here than almost anywhere in the country.</strong> The order matters: every unit of energy you do not use is one you do not have to generate, so load reduction always comes before adding panels.</p>
<h2>Step one: reduce the load</h2>
<p>The cheapest kilowatt-hour is the one you never use, so a net-zero home starts as a very efficient home. The core moves are the same hot-dry best practices the U.S. Department of Energy's Building America program recommends, taken to a higher standard:</p>
<ul>
<li><strong>Orientation and shading</strong> to keep the desert sun off the glass.</li>
<li><strong>A tight, well-insulated envelope</strong> with continuous insulation, verified air sealing, and an attic strategy that protects the ducts.</li>
<li><strong>High-performance windows</strong> with a low Solar Heat Gain Coefficient for this cooling-dominated climate.</li>
<li><strong>A right-sized, high-efficiency cooling system</strong> sized with a Manual J load calculation, not a rule of thumb.</li>
<li><strong>Efficient water heating, lighting, and appliances</strong>, often all-electric so a single energy source can be offset by solar.</li>
</ul>
<p>Performance is usually verified with a Home Energy Rating System (HERS) index: the lower the score, the less energy the house needs. Programs such as DOE's Zero Energy Ready Home and ENERGY STAR set the envelope and equipment bar that a net-zero home builds on.</p>
<h2>Step two: generate on site</h2>
<p>Once the load is low, you size a rooftop or ground-mounted solar photovoltaic (PV) system to produce, across a full year, enough electricity to match what the home consumes. Because Arizona has exceptional solar resource, the array needed to offset an efficient home is smaller and more cost-effective than in cloudier regions. Designing the roof for solar from the start (orientation, pitch, unshaded area, conduit, and electrical capacity) is far cheaper than retrofitting later, which is why net-zero is a design decision, not an add-on.</p>
<h2>Step three: handle the offset and the grid</h2>
<p>Net-zero is an annual balance, not an hourly one. The house makes surplus power on sunny days and draws from the grid at night and in peak summer, and the two are reconciled over the year through your utility's billing arrangement. The terms of that arrangement, including export credit rates and rate plans, are set by your utility and the Arizona Corporation Commission and change over time, so confirm the current program with your specific utility. Battery storage is optional: it lets you use more of your own solar after sundown and adds resilience, but it is not required to reach a net-zero annual balance. Worth knowing: Arizona law (A.R.S. 33-439) voids HOA rules that would prohibit a solar energy device, so an HOA cannot simply ban the panels a net-zero home depends on, though reasonable placement conditions can apply.</p>
<h2>Net-zero, net-zero-ready, and net-positive</h2>
<p>A few terms get used loosely. A <strong>net-zero-ready</strong> home is built efficient enough that solar would bring it to net-zero, but the panels are not yet installed (the roof and electrical are prepared for them). A <strong>net-zero</strong> home has the generation in place to offset its annual use. A <strong>net-positive</strong> home generates more than it uses. The right target depends on your budget, your roof, and your goals; an efficient, net-zero-ready design is a common, sensible stopping point that keeps the door open to full net-zero later.</p>
<h2>How does Jematell Homes approach it?</h2>
<p>We design for net-zero the way it actually works: reduce the load first with orientation, a tight envelope, and load-calculated systems, then size solar to offset the remainder, and prepare the roof and electrical so the path to net-zero stays open even if panels come in a later phase. Energy codes, utility solar programs, and incentive rules are set locally and by the utility and the Arizona Corporation Commission, and they change, so always confirm the current energy-code and solar-interconnection requirements with your Authority Having Jurisdiction (AHJ) and your utility for your specific parcel before you commit to a plan.</p>`,
  shortAnswer:
    "A net-zero home generates at least as much energy as it uses over a year. You get there in two steps: first cut the load with a tight, well-insulated, well-shaded envelope and efficient all-electric systems, then add enough on-site solar to offset the rest. Arizona's strong sun makes the solar step easier and cheaper here.",
  metaDescription:
    "How does a custom home reach net-zero energy in Arizona? Reduce the load with a tight efficient envelope, then offset the rest with on-site solar, plus net-zero-ready options.",
  categorySlug: "building-in-the-desert",
  topicSlugs: ["desert-build-essentials"],
  tags: ["net-zero", "solar", "energy-efficiency", "hers", "all-electric", "research-phase"],
  relatedFaqSlugs: [
    "designing-an-energy-efficient-home-for-the-arizona-desert",
    "insulation-options-for-an-arizona-home",
    "going-solar-on-a-new-home-and-hoa-solar-rights",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "a-comprehensive-guide-to-home-building-with-passive-solar-design",
  sortOrder: 103,
}),
```

**Sources used (4)**
- U.S. DOE Building America Solution Center, hot-dry climate load-reduction best practices: https://basc.pnnl.gov
- U.S. DOE Zero Energy Ready Home (ZERH) program requirements: https://www.energy.gov/eere/buildings/doe-zero-energy-ready-home-zerh
- ENERGY STAR Residential New Construction and HERS index background: https://www.energystar.gov/newhomes
- [10] A.R.S. 33-439, Solar access (voids HOA solar prohibitions): https://www.azleg.gov/ars/33/00439.htm
- Arizona Corporation Commission, utility net-metering / export rules (program terms vary by utility): https://www.azcc.gov

---

## Distinctness check (vs live + in-flight, June 5 2026)

- `icf-vs-wood-frame-vs-block-construction`: no live wall-system page exists; one-ups AFT's `/blog/insulated-concrete-form-walls` and `/blog/building-custom-luxury-home-sips-panels` with a code-and-climate comparison.
- `foundation-types-for-arizona-custom-homes`: distinct from live `caliche-expansive-clay-and-desert-soils` (soil behavior) and `do-i-need-a-soils-or-geotechnical-report` (the study); this page covers the foundation systems themselves (PT slab, conventional slab, stem-wall). One-ups AFT's `/blog/post-tension-concrete-slab` and `/blog/soil-compaction`.
- `insulation-options-for-an-arizona-home`: distinct from live `designing-an-energy-efficient-home-for-the-arizona-desert` (whole-house design) and any in-flight HVAC-sizing/roofing page; focused on the envelope/insulation material choice. One-ups AFT's `/blog/spray-foam-insulation`.
- `how-a-custom-home-reaches-net-zero-energy`: distinct from the live general energy-efficiency page; focused specifically on the net-zero target math (load reduction + on-site generation + annual offset). One-ups AFT's `/blog/net-zero-energy-building`.
