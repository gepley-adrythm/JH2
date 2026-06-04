# FAQ Drafts — Land & Due Diligence (Section B)

**Category:** `land-and-due-diligence`
**Topic:** `buying-land-to-build`
**Prepared:** June 4, 2026

These are four paste-ready `item({ ... })` blocks (B1-B4) for the "Land & Due Diligence" category. They extend the live category (which already covers "is a lot buildable" and "soils/geotechnical report") rather than repeating it. No existing files are modified by this draft.

Voice and rules follow the live seed: rich `answerHtml` only (the plain `answer` is derived by the `item()` helper, so it is intentionally omitted here), `shortAnswer` 40-60 words and self-contained, no em dashes, no emojis, no legal advice, volatile facts date-stamped, and every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ).

`sortOrder` values below (20-23) are placeholders so the four entries stay in B1-B4 order; the assembly task finalizes the real global ordering. `relatedFaqSlugs` reference both live slugs and the new sibling slugs in this file; the assembly task finalizes them.

---

## B1 — Earth fissures and land subsidence: due diligence for Pinal County lots

```ts
item({
  slug: "earth-fissures-and-land-subsidence-in-pinal-county",
  question:
    "Should I check for earth fissures before buying a lot in Pinal County?",
  answerHtml: `<p><strong>Yes. In parts of Pinal County, including areas around Casa Grande and the edges of Apache Junction, decades of groundwater pumping have caused the land to settle and crack, producing earth fissures. Checking the Arizona Geological Survey (AZGS) earth fissure mapping before you buy is a basic and free step of due diligence.</strong> A fissure on or near a parcel does not always make it unbuildable, but it changes where the house can safely sit and what the site work will cost, so it belongs in your research before you make an offer.</p>
<h2>What earth fissures are and why Pinal County has them</h2>
<p>An earth fissure is a crack in the ground that opens when the land surface subsides unevenly. The mechanism is well documented by the AZGS: when groundwater is withdrawn faster than it is replenished, the aquifer sediments compact and the land above them sinks. This is called land subsidence. Where the underlying bedrock is irregular, the subsidence is uneven, and the surface pulls apart at the weak points. The result can start as a hairline crack and, over time and especially after heavy monsoon runoff funnels water into it, widen and deepen into a gully many feet across.</p>
<p>Pinal County sits in a heavily pumped agricultural and growth corridor, which is why it has some of the most extensive mapped fissures in Arizona. The areas around Casa Grande, Eloy, and the broader Pinal Active Management Area are the classic examples. This is a regional geohazard, not a defect of any one seller's parcel, so it is something a careful buyer screens for as a matter of routine rather than something to be alarmed about.</p>
<h2>How to check before you buy</h2>
<p>The single best starting point is the AZGS Earth Fissure Viewer, the state's online map of fissures its geologists have surveyed and mapped. It is public and free to use. The steps are straightforward:</p>
<ul>
<li><strong>Locate the parcel</strong> on the viewer by address or by panning to the area, and look for mapped fissure traces on or near the land.</li>
<li><strong>Look at the surroundings, not just the lot line.</strong> Fissures can migrate and lengthen over time, so a mapped fissure a short distance away is still relevant to siting.</li>
<li><strong>Note the survey date.</strong> AZGS maps reflect the most recent field survey of an area; new fissures can form between surveys, so the map is a screening tool, not a guarantee of absence.</li>
<li><strong>Walk the land.</strong> Look for linear cracks, sudden small drops in grade, or erosion gullies that run in a straight line, which can be surface signs of a fissure.</li>
</ul>
<p>The viewer is a screening step. If it shows a fissure on or near the parcel, or if the lot is in a known subsidence area, the next step is a site-specific geotechnical investigation by a licensed engineer, who can assess the actual ground conditions and recommend a safe building envelope.</p>
<h2>What a fissure means for siting and building</h2>
<p>Building directly on or across an active fissure is not advisable, because continued movement can damage a foundation. In practice, the engineering response is usually about distance and drainage:</p>
<ul>
<li><strong>Setback from the fissure.</strong> The geotechnical engineer typically recommends a buffer between the structure and any mapped or observed fissure, which reduces the usable building area on the lot.</li>
<li><strong>Drainage control.</strong> Because surface water flowing into a fissure accelerates its growth, the grading and drainage plan has to keep runoff away from it. On a desert lot this matters most during monsoon season.</li>
<li><strong>Foundation design.</strong> Where subsidence is a concern, the engineer may call for a more robust or monitored foundation, which adds cost.</li>
<li><strong>Insurance and disclosure.</strong> Some buyers ask their title and insurance providers about fissure-related coverage. Arizona sellers also have disclosure obligations about known material conditions, which is a question for your real estate professional.</li>
</ul>
<h2>How Jematell Homes helps</h2>
<p>When we evaluate a Pinal County parcel with a buyer, screening the AZGS fissure mapping and walking the land for surface signs is part of the conversation before an offer. If the site warrants it, we coordinate the geotechnical investigation and design the home's placement, foundation, and drainage to the engineer's recommendations. Because the fissure mapping is updated as the AZGS resurveys and because ground conditions are parcel-specific, we treat the public map as a first screen and confirm the specifics for your site with a licensed geotechnical engineer and the local Authority Having Jurisdiction (the City of Casa Grande, the City of Apache Junction, or Pinal County, depending on where the parcel sits) before relying on any conclusion.</p>`,
  shortAnswer:
    "Yes. Groundwater pumping has caused land subsidence and earth fissures across parts of Pinal County near Casa Grande and Apache Junction. Screen any parcel for free on the Arizona Geological Survey earth fissure viewer before you offer, then order a geotechnical study if a fissure is mapped on or near the lot.",
  metaDescription:
    "Earth fissures and land subsidence in Pinal County: why groundwater pumping causes them, how to check the AZGS fissure viewer before buying, and what it means for siting.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["earth-fissures", "land-subsidence", "pinal-county", "casa-grande", "research-phase"],
  relatedFaqSlugs: [
    "how-do-i-know-if-a-lot-is-buildable",
    "caliche-expansive-clay-and-desert-soils",
    "do-i-need-a-soils-or-geotechnical-report",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us", "custom-homes"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 20,
}),
```

**Sources used (B1):**
- [22] Arizona Geological Survey, Earth Fissures Natural Hazards Viewer — https://azgs.arizona.edu/earth-fissures-ground-subsidence/earth-fissures-natural-hazards-arizona-viewer
- [22] Arizona Geological Survey, Earth Fissures & Subsidence — https://azgs.arizona.edu/geohazards/arizona-geohazards-resources/earth-fissures-subsidence

---

## B2 — Is the lot in a floodplain? Maricopa County floodplain use permits

```ts
item({
  slug: "is-my-lot-in-a-floodplain-in-maricopa-county",
  question:
    "How do I find out if a lot is in a floodplain, and what does that mean for building?",
  answerHtml: `<p><strong>Check the lot against the official floodplain maps before you buy, because a parcel inside a Special Flood Hazard Area carries extra rules, a Floodplain Use Permit, and usually a requirement to elevate the home. In Maricopa County the Flood Control District (FCDMC) is the place to start, and its floodplain status can affect your design, your cost, and whether you need flood insurance.</strong> A floodplain designation rarely makes a lot impossible to build on, but it does add engineering and permitting that belong in your budget and timeline from the start.</p>
<h2>How to check a parcel's floodplain status</h2>
<p>Flood risk is mapped on FEMA's Flood Insurance Rate Maps (FIRMs), and in Maricopa County the Flood Control District administers floodplain regulation and maintains lookup tools that let you find a parcel's designation:</p>
<ul>
<li><strong>Look up the parcel</strong> on the Flood Control District of Maricopa County's floodplain mapping, or on FEMA's national Flood Map Service Center, by address or parcel number.</li>
<li><strong>Identify the flood zone.</strong> Zones beginning with A or V are Special Flood Hazard Areas (SFHAs), the areas with a one-percent annual chance of flooding (the "100-year floodplain"). Zone X areas are outside the high-risk SFHA.</li>
<li><strong>Check for washes and drainage.</strong> Much of the desert metro floods through normally dry washes during monsoon storms, so a lot can be near a flood path even if it looks dry most of the year.</li>
<li><strong>Confirm with the floodplain administrator.</strong> If the parcel is inside or near an SFHA, contact the FCDMC (for unincorporated areas) or the relevant city's floodplain administrator to confirm the current designation, because maps are periodically revised.</li>
</ul>
<p>If your lot is inside an incorporated city such as Scottsdale or Phoenix, that city is usually the floodplain administrator for its area, while the Flood Control District handles unincorporated Maricopa County. Confirming which office governs your parcel is the same jurisdiction question that drives every other permit.</p>
<h2>When a Floodplain Use Permit is required</h2>
<p>Development within a regulated floodplain or floodway generally requires a Floodplain Use Permit before you build. The permit is how the floodplain administrator confirms that what you are proposing will not increase flood risk to your home or to neighbors. As part of it you can expect requirements such as:</p>
<ul>
<li><strong>Elevation of the lowest floor</strong> to or above the regulatory flood elevation, which on a custom home often means raising the building pad or the finished floor.</li>
<li><strong>A drainage or hydrology study</strong> by a civil engineer showing how the site handles flood flows and where water goes.</li>
<li><strong>An Elevation Certificate</strong> prepared by a surveyor to document the as-built elevation relative to the flood level.</li>
<li><strong>Restrictions in a floodway</strong>, the central high-velocity portion of a floodplain, where building is far more constrained than in the broader flood-fringe.</li>
</ul>
<h2>The cost and insurance implications</h2>
<p>A floodplain lot adds real line items: engineering studies, extra fill or a raised foundation to meet the elevation requirement, and the permit itself. If the home sits in an SFHA and is financed, the lender will typically require flood insurance for the life of the loan, which is an ongoing ownership cost rather than a one-time fee. None of this is necessarily a reason to walk away, but it should be priced in before you commit, and it is one reason a lower-priced lot near a wash can cost more to build on than it first appears.</p>
<h2>How Jematell Homes helps</h2>
<p>When a parcel we are evaluating with a buyer touches a mapped floodplain or a wash, we flag it early and bring in the civil engineering needed to understand the site. We coordinate the drainage study, design the pad and foundation to meet the elevation requirement, and carry the Floodplain Use Permit through with the building permit so the two stay in step. Because flood maps are revised over time and because the administering office differs between the cities and unincorporated county, we confirm the current designation and requirements with the Flood Control District of Maricopa County or your city's floodplain administrator for your specific parcel rather than relying on an older map.</p>`,
  shortAnswer:
    "Look the parcel up on the Flood Control District of Maricopa County maps or FEMA's flood map service. A lot in a Special Flood Hazard Area (a flood zone starting with A or V) usually needs a Floodplain Use Permit, an elevated finished floor, a drainage study, and flood insurance if financed.",
  metaDescription:
    "How to check if a lot is in a floodplain in Maricopa County, when a Floodplain Use Permit is required, and how elevation and flood insurance affect your build.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["floodplain", "flood-control-district", "maricopa-county", "floodplain-use-permit", "research-phase"],
  relatedFaqSlugs: [
    "how-do-i-know-if-a-lot-is-buildable",
    "buying-raw-land-vs-a-finished-lot",
    "do-i-need-a-permit-to-build-in-maricopa-county",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 21,
}),
```

**Sources used (B2):**
- [31] Flood Control District of Maricopa County, Permits (Floodplain Use Permits) — https://www.maricopa.gov/6412/Permits
- (background) FEMA Flood Map Service Center — https://msc.fema.gov

---

## B3 — Caliche, expansive clay, and desert soils: why the geotech report drives the foundation

```ts
item({
  slug: "caliche-expansive-clay-and-desert-soils",
  question:
    "How do caliche and expansive clay affect a custom home foundation in Arizona?",
  answerHtml: `<p><strong>Arizona's desert soils behave in ways that directly drive how your foundation is designed and what it costs. Expansive clays swell and shrink with moisture, caliche is a rock-hard cemented layer that complicates digging, and collapsible soils settle when first wetted under load. A geotechnical (soils) report identifies which of these are present, and that report, not a standard template, is what your engineer designs the foundation to.</strong> This is why the soils investigation is one of the first studies worth ordering once you are serious about a lot, and why two nearby parcels can carry very different foundation budgets.</p>
<h2>The desert soils that change a foundation</h2>
<ul>
<li><strong>Expansive clay.</strong> Certain fine-grained desert soils absorb water and swell, then shrink as they dry out. That repeated movement can lift and crack a slab or footing that was not designed for it. Engineers respond with measures such as a post-tensioned slab, deepened or stiffened footings, moisture control around the perimeter, or removing and replacing the reactive soil under the building pad.</li>
<li><strong>Caliche.</strong> Caliche is a layer of soil naturally cemented by calcium carbonate, ranging from a chalky crust to a layer nearly as hard as concrete. It can be good bearing material, but it makes excavation, trenching for utilities, and septic work slower and more expensive, and it can require specialized equipment to break through.</li>
<li><strong>Collapsible and low-density soils.</strong> Some soils hold together when dry but lose volume suddenly the first time they are saturated under the weight of a structure. Where these are found, the pad usually has to be over-excavated and recompacted, or the soil otherwise treated, before building.</li>
<li><strong>Rock and shallow bedrock.</strong> Shallow rock can be excellent support but turns excavation into a blasting-or-hammering exercise that adds cost, and it interacts with grading and drainage decisions.</li>
</ul>
<h2>Why the geotechnical report drives the design</h2>
<p>A licensed geotechnical engineer drills test borings, samples the soil, and reports on bearing capacity, soil chemistry such as sulfates that can attack concrete, and how the ground moves with moisture. Those findings translate directly into the foundation type, the reinforcement, the depth of footings, and how much soil has to be removed, imported, or recompacted. Without the report, the structural engineer has to make conservative assumptions, which usually means paying for a heavier foundation than you might need, or, in the worse case, missing a real risk that surfaces as cracking after you move in. The report removes that guesswork from the single most expensive part of the structure to fix later.</p>
<h2>How soils show up in the budget</h2>
<p>Soil conditions are one of the biggest reasons custom-home site costs vary from lot to lot. A benign, well-draining site with good bearing soil supports a conventional foundation at the lower end of cost. A lot with expansive clay, deep caliche, collapsible soil, or a combination can require engineered foundations, soil replacement, or import of structural fill, all of which add to the number before the house itself is framed. This is the practical reason a bargain lot is not always the cheaper place to build, and why the soils report is best ordered early enough that its results inform the design rather than forcing a redo.</p>
<h2>A note on related rural testing</h2>
<p>The structural soils report is about how the ground supports the house. If the homesite uses a septic system, you will also need a separate percolation and soil-absorption evaluation so the system can be sized and sited, and difficult soils can push you toward a more expensive engineered septic system. Both studies are about understanding the ground, so on rural lots it makes sense to plan for them together early in due diligence.</p>
<h2>How Jematell Homes handles it</h2>
<p>We coordinate the geotechnical investigation as part of the design and engineering phase, make sure the foundation is engineered to the report's recommendations, and carry that documentation through plan review. We have built across the soil conditions found from Scottsdale to the Pinal County edge, so we can help you anticipate what a given parcel is likely to require before the borings confirm it. Because soils are parcel-specific and because each jurisdiction sets its own foundation submittal requirements, we confirm exactly what your geotechnical engineer recommends and what your local Authority Having Jurisdiction expects for your site rather than assuming a one-size-fits-all standard.</p>`,
  shortAnswer:
    "Arizona's expansive clay swells and shrinks with moisture, caliche is a rock-hard cemented layer, and collapsible soils settle when first wetted. A geotechnical report identifies what is present, and your engineer designs the foundation to it. Difficult soils mean engineered foundations and soil work that can sharply raise site cost.",
  metaDescription:
    "Caliche, expansive clay, and collapsible desert soils drive Arizona foundation design and cost. Why the geotechnical report determines the foundation and the budget.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["caliche", "expansive-clay", "desert-soils", "foundation", "geotechnical", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-soils-or-geotechnical-report",
    "how-do-i-know-if-a-lot-is-buildable",
    "earth-fissures-and-land-subsidence-in-pinal-county",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 22,
}),
```

**Sources used (B3):**
- [22] Arizona Geological Survey, Earth Fissures & Subsidence / geohazards resources (regional soils and ground conditions) — https://azgs.arizona.edu/geohazards/arizona-geohazards-resources/earth-fissures-subsidence
- (engineering reference) 2024 International Residential Code, Chapter 4 Foundations — https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations
- (engineering reference) ASCE / geotechnical practice on expansive and collapsible soils (background)

---

## B4 — Buying raw land vs. a finished lot in our markets

```ts
item({
  slug: "buying-raw-land-vs-a-finished-lot",
  question:
    "Should I buy raw land or a finished lot to build my custom home on?",
  answerHtml: `<p><strong>The difference between raw land and a finished lot is the work that still has to happen before you can build, and that work can add tens of thousands of dollars and months of time. A finished lot already has utilities, legal access, and entitlements in place; raw land may need a power extension, a well or water provider, a septic system, recorded access, and grading before a house can go up.</strong> Neither is automatically the better choice, but you cannot compare two parcels on price alone. You compare them on the all-in cost to make each one ready to build.</p>
<h2>What "finished" actually means</h2>
<p>A finished or improved lot, the kind common in a master-planned community, typically comes with power, water, and sewer (or an approved septic area) brought to the property, a paved or recorded access, graded buildable area, and zoning and subdivision approvals already secured. Raw or unimproved land may have none of these. The price gap between the two usually reflects exactly that missing work, which is why a cheap parcel can end up costing more once you add what it lacks.</p>
<h2>The due-diligence checklist before you sign</h2>
<p>Whether the land is raw or finished, walk it against this list and put real numbers on each line before you make an offer:</p>
<ul>
<li><strong>Legal access.</strong> You need recorded, legal access to the parcel, not just a dirt road that appears to reach it. Landlocked parcels and unrecorded easements are common and expensive surprises. Confirm access is recorded with the county.</li>
<li><strong>Utilities to the lot.</strong> Find out how far electric power runs and what the utility will charge to extend it, because a long line extension can be a major cost. Confirm whether there is a water provider, a sewer line, or natural gas, or whether you will be providing your own.</li>
<li><strong>Water supply.</strong> On outlying land, water may come from a well, a hauling service with on-site storage, or a private provider. Each has its own permits and costs, and water is often the deciding factor on rural Arizona lots. Understand how the parcel was created, because Arizona's assured-water-supply rules treat subdivisions and lot splits differently.</li>
<li><strong>Wastewater.</strong> If there is no sewer, the lot needs a septic system, which requires a percolation test and county approval. Difficult soils can force a more expensive engineered system, so the feasibility of septic should be confirmed, not assumed.</li>
<li><strong>Easements, CC&Rs, and title.</strong> Recorded easements, HOA restrictions, and title issues all limit where and what you can build. A title report and a careful read of any CC&Rs are part of due diligence.</li>
<li><strong>Zoning and floodplain.</strong> Confirm the parcel is zoned for a single-family home and check whether it sits in a floodplain or a hillside or environmentally sensitive overlay, each of which adds engineering and permitting.</li>
<li><strong>Soils and grading.</strong> Expansive clay, caliche, and slope drive foundation and earthwork cost, which a geotechnical report will quantify.</li>
</ul>
<h2>The well and septic feasibility question</h2>
<p>On raw rural land, the two questions that most often decide whether a parcel works are water and wastewater. Before you sign, it is worth confirming that a well is realistic on the parcel (depth and yield vary by aquifer and are genuine unknowns) or that a provider or hauling option exists, and that the soils will support a septic system the county will approve. These are the items buyers most often underestimate, and they are exactly where a builder who works on unserved lots can help you scope cost early.</p>
<h2>Where each option fits</h2>
<p>A finished lot trades a higher purchase price for speed, predictability, and fewer unknowns, which suits a buyer who wants to move into design and construction quickly. Raw land can deliver more acreage, more privacy, and a lower entry price, which suits a buyer who wants a rural setting and is prepared to invest in the site work, the well and septic, and the longer timeline. The right answer depends on your priorities and on the specific parcels in front of you, not on a general rule.</p>
<h2>How Jematell Homes helps</h2>
<p>We routinely walk both raw and finished lots with prospective buyers and pressure-test them against this checklist, drawing on years of building across Scottsdale, Rio Verde, and the wider Phoenix metro. We can help you put realistic numbers on utilities, access, well and septic, and grading so you are comparing parcels on their true all-in cost, and we can help you find a lot that fits your plans or evaluate one you are considering. None of this replaces formal reports, a title commitment, and the jurisdiction's own determinations, so we confirm the specifics for each parcel with the utility providers, the county, and the local Authority Having Jurisdiction before you rely on any estimate.</p>`,
  shortAnswer:
    "It depends on the all-in cost to make each ready, not the price tag. A finished lot already has utilities, recorded access, and zoning; raw land may need a power extension, a well or provider, septic, recorded access, and grading. Confirm access, utilities, water, septic feasibility, title, and zoning before you sign.",
  metaDescription:
    "Buying raw land vs. a finished lot to build on in Arizona: a utilities, access, easement, and well and septic feasibility checklist to run before you make an offer.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["raw-land", "finished-lot", "utilities", "access", "due-diligence", "research-phase"],
  relatedFaqSlugs: [
    "how-do-i-know-if-a-lot-is-buildable",
    "can-i-build-without-city-water-or-sewer",
    "what-is-arizonas-100-year-water-supply-rule",
  ],
  relatedServiceSlugs: ["buy-a-lot-with-us", "build-on-your-lot", "custom-homes"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 23,
}),
```

**Sources used (B4):**
- [12] Maricopa County Planning & Development / Construction Permit Information — https://www.maricopa.gov/797/Planning-Development ; https://www.maricopa.gov/1629/Construction-Permit-Information
- [14] Maricopa County, Onsite Wastewater Forms / Applications — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications

---

## Assembly notes (for the merge task)

- All four entries use `categorySlug: "land-and-due-diligence"` and `topicSlugs: ["buying-land-to-build"]`, both of which already exist in the live seed.
- `relatedServiceSlugs` use only slugs that exist on the site: `build-on-your-lot`, `buy-a-lot-with-us`, `custom-homes`.
- `relatedFaqSlugs` mix live slugs (`how-do-i-know-if-a-lot-is-buildable`, `do-i-need-a-soils-or-geotechnical-report`, `can-i-build-without-city-water-or-sewer`, `what-is-arizonas-100-year-water-supply-rule`, `do-i-need-a-permit-to-build-in-maricopa-county`) with the new sibling slugs in this file. Validate cross-references during assembly.
- `pillarBlogSlug` is `null` on all four because no existing blog slug clearly maps to these topics; set a real slug during assembly if one fits.
- `sortOrder` values (20-23) are placeholders; finalize global ordering during assembly.
- The live category already covers "is a lot buildable" and "soils/geotechnical report"; B3 deliberately extends the soils answer with AZ-specific soil behavior and foundation/cost impact rather than repeating the existing geotech report answer.
- No em dashes are used in any `answerHtml`, `shortAnswer`, or `metaDescription`.
```
