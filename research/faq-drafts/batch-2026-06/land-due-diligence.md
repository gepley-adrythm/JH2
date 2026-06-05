# FAQ Drafts — Land & Due Diligence (batch 2026-06)

**Category:** `land-and-due-diligence`
**Topic:** `buying-land-to-build`
**Prepared:** June 4, 2026

Four paste-ready `item({ ... })` blocks for the "Land & Due Diligence" category. These extend the live category (which already covers buildability, soils/geotech, earth fissures, floodplain, caliche/expansive soils, and raw-vs-finished lot) with four new, confirmed non-duplicate research-phase questions: pre-purchase zoning checks, percolation tests, easements and rights-of-way, and legal access to rural or landlocked lots.

Voice and rules follow the live seed: rich `answerHtml` only (the plain `answer` is derived by the `item()` helper, so it is intentionally omitted), `shortAnswer` 40-60 words and self-contained, no em dashes, no emojis, no legal advice, volatile facts date-stamped, and every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ).

`sortOrder` values start at 100 as placeholders so the four stay in order; the assembly task finalizes the real per-category numbering. `relatedFaqSlugs` reference live slugs and the new sibling slugs in this file; the assembly task finalizes them. No existing files are modified by this draft.

---

## 1 — How do I check a lot's zoning before I buy it?

```ts
item({
  slug: "how-do-i-check-zoning-before-buying-a-lot",
  question:
    "How do I check a lot's zoning before I buy it?",
  answerHtml: `<p><strong>Check a lot's zoning before you buy by looking up the parcel on the jurisdiction's official zoning map, confirming the district allows a single-family home at the density you want, and then calling the planning department to verify there are no overlays, pending changes, or conditions that limit what you can build. Zoning is public information tied to the parcel, and it is one of the cheapest and most important pieces of due diligence you can do before making an offer.</strong> A lot that looks perfect can carry a zoning district, a minimum lot size, or an overlay that quietly rules out the home you have in mind.</p>
<h2>Find out which jurisdiction sets the zoning</h2>
<p>The first question is who the Authority Having Jurisdiction is, because that determines whose map and rules apply. If the parcel sits inside a city such as Scottsdale, Phoenix, Cave Creek, Fountain Hills, Carefree, Casa Grande, or Apache Junction, that city's planning or development services department sets and enforces zoning under its municipal authority (A.R.S. 9-462 and related statutes). If the parcel is in unincorporated land, such as the Rio Verde Foothills or rural stretches of Maricopa or Pinal County, the county is the zoning authority under A.R.S. 11-811 and 11-812. Confirming city versus county first saves you from reading the wrong rulebook.</p>
<h2>Look up the parcel and its zoning district</h2>
<p>Once you know the jurisdiction, you can usually find the zoning yourself online:</p>
<ul>
<li><strong>Get the parcel number (APN).</strong> The county assessor's site lets you find a parcel by address or owner and gives you the assessor's parcel number, which is how every other record is keyed.</li>
<li><strong>Open the official zoning map or GIS viewer.</strong> Most cities and both Maricopa and Pinal County publish an online zoning map. Enter the address or APN and read off the zoning district, such as a single-family residential district with a minimum lot size (for example a district requiring 35,000 or 43,000 square feet per home in lower-density desert areas).</li>
<li><strong>Read what the district allows.</strong> The zoning code tied to that district controls the permitted uses, the minimum lot size and density, the building setbacks, the maximum height, and the lot coverage. These together decide whether your house, garage, casita, and pool actually fit.</li>
</ul>
<h2>Check for overlays and special designations</h2>
<p>The base zoning district is only part of the story. Many desert parcels carry an overlay or a special designation layered on top that adds rules:</p>
<ul>
<li><strong>Environmentally sensitive and hillside overlays</strong> such as Scottsdale's Environmentally Sensitive Lands Ordinance with its Natural Area Open Space set-aside, or Fountain Hills hillside disturbance rules, can require you to leave large portions of a lot undisturbed.</li>
<li><strong>Floodplain designations</strong> can require an elevated finished floor and a separate permit.</li>
<li><strong>Planned communities and master plans</strong> can add their own development standards beyond the base zoning.</li>
</ul>
<p>Overlays are exactly the kind of thing a quick map read can miss, so they are worth asking the planning department about directly.</p>
<h2>Zoning is not the same as private restrictions</h2>
<p>Zoning is the government's land-use control. It is separate from private restrictions such as a homeowners association's CC&Rs or recorded deed restrictions, which can be stricter than zoning and are found in the title report rather than the zoning map. A lot can be zoned for a home you want and still be limited by HOA architectural rules, so check both. Recorded easements, which also limit where you can build, show up in the title work too, not in the zoning code.</p>
<h2>Call the planning department before you rely on the map</h2>
<p>Online maps are a screening tool, not a guarantee. Zoning districts get amended, parcels get conditions attached through prior rezoning or variance cases, and maps lag reality. Before you remove your due-diligence contingency, call or email the planning department with the APN and ask three things: confirm the current zoning district, confirm a single-family home is a permitted use, and ask whether any overlays, conditions, pending rezonings, or code amendments affect the parcel. If your plans need something the current zoning does not allow, you would be looking at a rezoning or variance, which is a public, uncertain, and time-consuming process you want to know about before you buy, not after.</p>
<h2>How Jematell Homes helps</h2>
<p>When we evaluate a parcel with a buyer, confirming the zoning district, the minimum lot size, the setbacks, and any overlays is part of the conversation before an offer, so the home we design actually fits the rules of the lot. Because zoning codes and overlays change and because each city and county administers its own, we confirm the current designation and any conditions for your specific parcel with the local Authority Having Jurisdiction (the city planning department, or Maricopa or Pinal County for unincorporated land) before relying on any map.</p>`,
  shortAnswer:
    "Find the parcel number on the county assessor site, open the city or county zoning map, and confirm the district allows a single-family home at your density. Then call the planning department to verify setbacks, overlays such as Scottsdale ESL or floodplain, and any conditions. Check private CC&Rs and easements separately in the title report.",
  metaDescription:
    "How to check a lot's zoning before you buy in Arizona: find the parcel, read the zoning district and overlays, and confirm a single-family home is permitted with the city or county.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["zoning", "due-diligence", "parcel-lookup", "overlays", "research-phase"],
  relatedFaqSlugs: [
    "how-do-i-know-if-a-lot-is-buildable",
    "buying-raw-land-vs-a-finished-lot",
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "easements-rights-of-way-and-where-you-can-build",
  ],
  relatedServiceSlugs: ["buy-a-lot-with-us", "build-on-your-lot", "custom-homes"],
  pillarBlogSlug: "top-strategies-for-finding-the-perfect-building-lot-a-comprehensive-guide",
  featured: false,
  sortOrder: 100,
}),
```

**Sources used (1):**
- [N/A statute] A.R.S. 9-462, Municipal zoning regulations — https://www.azleg.gov/ars/9/00462.htm
- [N/A statute] A.R.S. 11-811 / 11-812, County zoning ordinances — https://www.azleg.gov/ars/11/00811.htm
- [12] Maricopa County Planning & Development — https://www.maricopa.gov/797/Planning-Development
- [15] City of Scottsdale, Environmentally Sensitive Lands (ESL) Overlay — https://www.scottsdaleaz.gov/codes-and-ordinances/eslo

---

## 2 — What is a percolation (perc) test and do I need one?

```ts
item({
  slug: "what-is-a-perc-test-and-do-i-need-one",
  question:
    "What is a percolation (perc) test and do I need one?",
  answerHtml: `<p><strong>A percolation test, or perc test, measures how quickly water drains through the soil on a lot. It is used to design and locate a septic system, so you need one whenever the home will be on an onsite wastewater system instead of a municipal sewer. On most rural lots in the Jematell build area, including the Rio Verde Foothills and outlying parts of Maricopa and Pinal County, there is no sewer, which means a septic system, which means a soil and percolation evaluation is part of due diligence.</strong> The result decides whether a standard septic system works, whether you need a more expensive engineered alternative, and sometimes whether the lot can be developed at the density you want.</p>
<h2>What a perc test actually measures</h2>
<p>A percolation test involves digging or boring test holes at the proposed disposal area, saturating them, and timing how fast the water level drops. That drainage rate, combined with a soil profile showing the soil layers and any restrictive layers, tells a designer how well the ground can absorb and treat the effluent that a septic system discharges. Soil that drains too slowly (heavy clay) cannot accept the flow; soil that drains too fast (loose sand or fractured rock) does not treat the effluent enough before it reaches groundwater. Caliche, a cemented desert layer, and a shallow water table both complicate the picture. The test is the evidence that the leach field, also called the disposal field, will work where you want to put it.</p>
<h2>Why and when you need one in Arizona</h2>
<p>Onsite wastewater systems in Arizona are regulated by the Arizona Department of Environmental Quality under its rules for onsite wastewater treatment facilities (A.A.C. Title 18, Chapter 9), with permitting delegated to county environmental health departments such as Maricopa County Environmental Services. To get a construction authorization or permit for a septic system, the county requires a site investigation that includes a soil evaluation and, depending on the system, a percolation test performed and reported by a qualified professional. In practice you need a perc or soil evaluation when:</p>
<ul>
<li><strong>The lot has no access to a municipal or community sewer</strong>, which is the norm on rural and unincorporated parcels.</li>
<li><strong>You are confirming feasibility before purchase</strong>, so you know the lot can actually support a system before you commit.</li>
<li><strong>You are sizing the system</strong>, because the soil result and the home's number of bedrooms together determine the required disposal area.</li>
</ul>
<p>If the lot connects to a public sewer, you do not need a perc test for wastewater, though you may still want soils information for the foundation, which is a separate geotechnical question.</p>
<h2>What happens if the soil does not perc well</h2>
<p>A poor result is not always a dead end, but it costs money. Where conventional soil absorption will not work, the designer turns to an alternative or engineered system, such as a system with additional treatment before disposal, a different disposal method, or a larger or specially designed field. These cost more to install and sometimes more to maintain than a conventional septic system. A failed or marginal perc result can also limit how large a home the lot will support, because a bigger house with more bedrooms needs a larger disposal area. This is one of the practical reasons two similar-looking rural lots can carry very different all-in costs.</p>
<h2>How it fits the rest of due diligence</h2>
<p>The percolation and soil-absorption evaluation answers the wastewater question. It is separate from the structural geotechnical (soils) report, which tells your engineer how to design the foundation, although both involve looking at the ground and it often makes sense to plan them together early. It is also tied to the water question on a rural lot, because a parcel that needs a well and a septic system has to site the two with the required separation. Confirming septic feasibility, water, and access together before you buy is what keeps a rural lot from turning into an expensive surprise.</p>
<h2>How Jematell Homes helps</h2>
<p>On rural and unincorporated lots, we help buyers scope the wastewater question early, coordinate the soil and percolation evaluation with a qualified professional, and design the home so the disposal field, the well, and the structure all fit with the required separations. Because the rules, required test methods, and fees are set by ADEQ and administered by the county and can change, we confirm exactly what is required for your parcel with the local Authority Having Jurisdiction (Maricopa County Environmental Services, Pinal County, or your city, depending on where the lot sits) before relying on any result.</p>`,
  shortAnswer:
    "A perc test times how fast water drains through a lot's soil, which is how a septic system is designed and sited. You need one whenever the home will use a septic system instead of a municipal sewer, which is most rural Arizona lots. Poor-draining soil can force a costlier engineered system or limit the home size.",
  metaDescription:
    "What a percolation (perc) test is, when you need one for a septic system in Arizona, and what a poor result means for system cost and home size on a rural lot.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["perc-test", "percolation", "septic", "soil-evaluation", "research-phase"],
  relatedFaqSlugs: [
    "how-do-septic-systems-work-for-a-new-home",
    "can-i-build-without-city-water-or-sewer",
    "buying-raw-land-vs-a-finished-lot",
    "caliche-expansive-clay-and-desert-soils",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us", "custom-homes"],
  pillarBlogSlug: null,
  featured: false,
  sortOrder: 101,
}),
```

**Sources used (2):**
- [9] ADEQ, Onsite Wastewater Treatment Program (A.A.C. Title 18, Ch. 9) — https://azdeq.gov/da/osww
- [14] Maricopa County, Onsite Wastewater Forms / Applications — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications
- [8] Maricopa County, Onsite Wastewater Ownership Transfer — https://www.maricopa.gov/2491/Onsite-Wastewater-Ownership-Transfer

---

## 3 — How do easements and rights-of-way affect where I can build?

```ts
item({
  slug: "easements-rights-of-way-and-where-you-can-build",
  question:
    "How do easements and rights-of-way affect where I can build?",
  answerHtml: `<p><strong>An easement is a recorded right for someone else to use part of your land for a specific purpose, and a right-of-way is the strip of land set aside for a road or utility corridor. You generally cannot build a permanent structure on top of an easement, so easements and rights-of-way shrink the usable, buildable area of a lot and shape where the house, garage, driveway, and pool can go.</strong> They are one of the most common reasons a parcel that looks big enough turns out to have a much smaller building envelope than the lot lines suggest, which is why you check for them before you buy.</p>
<h2>What easements and rights-of-way are</h2>
<p>Easements come in several forms, and each affects siting differently:</p>
<ul>
<li><strong>Utility easements</strong> give a power, water, gas, sewer, or telecom provider the right to run and maintain lines across your property. You cannot put a building over them, and they often run along lot lines.</li>
<li><strong>Access easements (ingress and egress)</strong> let another parcel cross yours to reach a road. A shared driveway is a common example.</li>
<li><strong>Drainage easements</strong> preserve a path for stormwater, which matters a great deal on desert lots that flow during monsoon storms.</li>
<li><strong>Conservation or open-space easements</strong>, including required Natural Area Open Space set-asides in places like Scottsdale's environmentally sensitive lands, keep portions of a lot undisturbed.</li>
</ul>
<p>A right-of-way is the public or dedicated corridor for a street or a major utility. Your buildable area is measured from the edge of the right-of-way, not the centerline of the road, so the setback effectively starts further into the lot than people expect.</p>
<h2>How they limit where you can build</h2>
<p>The practical effect is that an easement or right-of-way is carved out of your building envelope. You typically cannot place a house, garage, or other permanent structure over a recorded easement, and some easements restrict even paving, walls, pools, or large landscaping. Combine the easements and rights-of-way with the zoning setbacks, any required open-space set-aside, and any floodplain or hillside limits, and what remains is the true area you can build on. On an otherwise generous lot, a utility easement along one boundary plus a drainage easement across a corner can push the house into a surprisingly narrow band.</p>
<h2>How to find the easements on a lot</h2>
<p>Easements are recorded, which means they are discoverable before you buy if you look in the right places:</p>
<ul>
<li><strong>Order a title commitment.</strong> The title report lists recorded easements and other encumbrances affecting the parcel. Read the exceptions schedule, not just the summary.</li>
<li><strong>Pull the recorded plat and documents.</strong> The subdivision plat or recorded easement documents at the county recorder show the location and width of each easement.</li>
<li><strong>Get a survey.</strong> A survey, ideally one that locates the easements on the ground (an ALTA-style survey), shows exactly where each easement sits relative to your planned building envelope. A list of easements in a title report does not always tell you where they are; a survey does.</li>
<li><strong>Watch for unrecorded or prescriptive use.</strong> A long-used path or utility line that is not formally recorded can still create rights. If you see signs of use that the records do not explain, ask about it.</li>
</ul>
<h2>Why this matters before you make an offer</h2>
<p>Because easements reduce the buildable area and dictate placement, discovering them after you design the home is expensive and sometimes fatal to the plan. A buyer who confirms the easements and rights-of-way during due diligence can design a home that fits, or can walk away from a lot whose building envelope is too small or too awkward for the home they want. This is also closely tied to legal access: the same recorded documents that grant you access across a neighbor's land are easements, and the absence of one can leave a parcel landlocked.</p>
<h2>How Jematell Homes helps</h2>
<p>When we evaluate a lot with a buyer, we factor the recorded easements, rights-of-way, setbacks, and any open-space requirements into the buildable envelope before we design, so the home is placed where it is actually allowed to sit. We work from the title commitment and the survey rather than guessing from the lot lines. Because easements are parcel-specific and the binding record is the recorded document, we confirm the exact location and terms of every easement with a title company, a licensed surveyor, and the county recorder, and we confirm setback and open-space rules with the local Authority Having Jurisdiction, before relying on any building footprint.</p>`,
  shortAnswer:
    "An easement is a recorded right for someone else to use part of your land, and a right-of-way is the corridor for a road or utility. You cannot build permanent structures over them, so they shrink the buildable area. Find them in the title commitment, the recorded plat, and a survey before you buy.",
  metaDescription:
    "How easements and rights-of-way affect where you can build in Arizona: what they are, how they shrink the buildable envelope, and how to find them in title and survey records.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["easements", "rights-of-way", "buildable-envelope", "title", "research-phase"],
  relatedFaqSlugs: [
    "how-do-i-confirm-legal-access-to-a-rural-lot",
    "how-do-i-know-if-a-lot-is-buildable",
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "buying-raw-land-vs-a-finished-lot",
  ],
  relatedServiceSlugs: ["buy-a-lot-with-us", "build-on-your-lot", "custom-homes"],
  pillarBlogSlug: "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
  featured: false,
  sortOrder: 102,
}),
```

**Sources used (3):**
- [13] Maricopa County, Rio Verde Foothills Area Plan (access and easement context) — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087
- [15] City of Scottsdale, Environmentally Sensitive Lands (ESL) Overlay / NAOS — https://www.scottsdaleaz.gov/codes-and-ordinances/eslo
- [12] Maricopa County Planning & Development (recorded plats, setbacks) — https://www.maricopa.gov/797/Planning-Development

---

## 4 — How do I confirm legal access to a rural or landlocked lot?

```ts
item({
  slug: "how-do-i-confirm-legal-access-to-a-rural-lot",
  question:
    "How do I confirm legal access to a rural or landlocked lot?",
  answerHtml: `<p><strong>Confirm legal access by verifying, in the recorded records, that the parcel either fronts a public road or has a recorded easement granting you the right to cross other land to reach one. A dirt road that physically reaches the lot is not the same as a legal right to use it, and a parcel without recorded access is landlocked, which can stop you from getting a building permit, financing, or title insurance.</strong> On rural lots in the Rio Verde Foothills and the outlying parts of Maricopa and Pinal County, access is one of the first things to verify, because it is both common to be missing and expensive to fix after the fact.</p>
<h2>Legal access versus physical access</h2>
<p>Physical access means you can drive to the lot today. Legal access means you have a recorded, enforceable right to do so that runs with the land and cannot be revoked by a neighbor. These are not the same thing. Many rural parcels are reached by a dirt track that crosses someone else's property with no recorded easement, which means the owner could lose access if relations change or the neighboring land sells. A buyer relying on a handshake or long use is taking a real risk. The goal of due diligence is to turn physical access into documented legal access, or to find out before you buy that it does not exist.</p>
<h2>How to confirm legal access</h2>
<ul>
<li><strong>Order a title commitment and read it for access.</strong> A title company can tell you whether the parcel has recorded legal access and will often except from coverage any access that is not insured. If the title company will not insure access, treat that as a serious warning.</li>
<li><strong>Check for road frontage.</strong> If the lot fronts a public, dedicated, county-maintained road, access is generally established. Confirm the road is public and accepted, not a private road that only looks public.</li>
<li><strong>Look for a recorded access easement.</strong> If the lot is reached by crossing other land, there should be a recorded ingress and egress easement at the county recorder describing the route and width. Confirm it actually connects your parcel to a public road, not just to another private parcel.</li>
<li><strong>Get a survey.</strong> A surveyor can show whether the recorded access matches the road on the ground and whether the easement is wide enough for a driveway and for emergency vehicles.</li>
<li><strong>Ask about a road maintenance agreement.</strong> Shared private roads often have, or should have, a recorded maintenance agreement spelling out who pays to keep the road usable.</li>
</ul>
<h2>What landlocked means and how it gets fixed</h2>
<p>A landlocked parcel has no recorded legal access to a public road. Arizona law does provide remedies, but they are slow, uncertain, and sometimes costly. An owner can negotiate and purchase an easement from a neighbor, which depends entirely on the neighbor's willingness and price. In some circumstances a court can recognize an easement by necessity or grant a private way of necessity to a landlocked owner under Arizona statute, but that is a legal proceeding, not a quick fix, and the outcome is not guaranteed. None of this is something to count on after you have already bought; it is a reason to confirm access before you commit.</p>
<h2>Why access also drives permitting</h2>
<p>Access is not only a legal question; it is a permitting one. Building departments and fire authorities require that a homesite be reachable by emergency apparatus, which can mean minimum road width, surface, grade, and turnaround standards for the access route and driveway. A parcel with a marginal track may need road improvements before a permit will issue, which is a cost and a timeline item. Address assignment and utility service also depend on a defined, legal access point. So confirming access early protects the permit, the budget, and the schedule, not just the deed.</p>
<h2>How Jematell Homes helps</h2>
<p>For rural and unincorporated lots, we help buyers treat access as a first-tier question alongside water and septic, working from the title commitment and the survey rather than from how the road looks on a site visit. We help scope what an access route needs to satisfy the building and fire requirements so the driveway and any road work are in the budget from the start. Because access rights live in recorded documents and because permitting standards are set locally, we confirm legal access with a title company and a licensed surveyor and confirm the access and emergency-vehicle requirements with the local Authority Having Jurisdiction (Maricopa County, Pinal County, or your city, plus the fire authority) before relying on any access for your parcel.</p>`,
  shortAnswer:
    "Verify in recorded records that the lot either fronts a public road or has a recorded ingress and egress easement to one. A dirt road you can drive is not legal access, and a landlocked parcel can block your permit, financing, and title insurance. Confirm with a title company and surveyor before you buy.",
  metaDescription:
    "How to confirm legal access to a rural or landlocked lot in Arizona: recorded easements, road frontage, title insurance, and the permitting and emergency-access requirements.",
  categorySlug: "land-and-due-diligence",
  topicSlugs: ["buying-land-to-build"],
  tags: ["legal-access", "landlocked", "ingress-egress", "rural-lots", "research-phase"],
  relatedFaqSlugs: [
    "easements-rights-of-way-and-where-you-can-build",
    "buying-raw-land-vs-a-finished-lot",
    "how-do-i-know-if-a-lot-is-buildable",
    "can-i-build-without-city-water-or-sewer",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us", "custom-homes"],
  pillarBlogSlug: "what-to-do-after-buying-land-in-arizona",
  featured: false,
  sortOrder: 103,
}),
```

**Sources used (4):**
- [13] Maricopa County, Rio Verde Foothills Area Plan (rural access context) — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087
- [12] Maricopa County Planning & Development / Construction Permit Information — https://www.maricopa.gov/1629/Construction-Permit-Information
- [N/A statute] A.R.S. 12-1202, Private ways of necessity for landlocked parcels — https://www.azleg.gov/ars/12/01202.htm
