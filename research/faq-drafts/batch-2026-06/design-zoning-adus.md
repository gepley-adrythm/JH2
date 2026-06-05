# FAQ Drafts — Design, Zoning & ADUs (Batch 2026-06)

**Prepared:** June 4, 2026
**Category:** `design-zoning-adus` · **Topic:** `zoning-setbacks-adus`
**Status:** Paste-ready `item({ ... })` blocks for the assembly task. Do not edit `lib/faq/src/seed.ts` here — the assembly task merges these in and finalizes `relatedFaqSlugs` / `sortOrder`.

Voice notes carried from the live seed: research-phase, plain-language, AZ-code-grounded, no em dashes, no emojis, never legal advice, every answer closes by telling the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ) and HOA. These three entries extend the live category. They are confirmed non-duplicate against `CONTENT-INTENT-REGISTRY.md`:

- The live `can-i-build-a-casita-or-adu` and `what-hb-2720-changed-for-adus-in-arizona` pages are about the right to **build** an ADU. The first new entry below is about **renting** one out and operating a short-term rental, which is a separate body of law.
- No live entry covers Maricopa County's rural-residential zoning districts (RU-43 and friends), and none covers the IRC interior code minimums (room size, ceiling height, bedroom egress).

`sortOrder` continues this batch at 100+ so it never collides with the live 1-17 sequence; the assembly task renumbers per-category.

---

## 1 — Renting out a casita / running a short-term rental

```ts
item({
  slug: "can-i-rent-out-a-casita-or-run-a-short-term-rental",
  question: "Can I rent out a casita or run a short-term rental on my property?",
  answerHtml: `<p><strong>In most cases yes, but the right to build a casita and the right to rent it are governed by two different sets of rules. Arizona limits how cities and counties can regulate short-term and vacation rentals, your HOA can restrict leasing entirely, the casita law lets a city bar nightly rental of an ADU, and you must license and pay tax on rental income. All four have to line up before you can host a guest for money.</strong></p>
<h2>What Arizona law says about short-term rentals</h2>
<p>Arizona broadly protects the ability to operate a short-term or vacation rental. Under A.R.S. 9-500.39 for cities and towns and A.R.S. 11-269.17 for counties, a local government cannot prohibit short-term rentals outright or single them out for a use-permit that long-term rentals do not need. What changed after 2022 is that the same statutes now let local governments regulate them more tightly. A city or county may require you to:</p>
<ul>
<li><strong>Obtain a local permit or license</strong> for the property and renew it periodically.</li>
<li><strong>Carry liability insurance</strong> (commonly at least 500,000 dollars in coverage) for the rental use.</li>
<li><strong>Name a local emergency contact</strong> who can respond to complaints around the clock.</li>
<li><strong>Follow health, safety, noise, occupancy, and parking standards</strong> that apply to the property.</li>
</ul>
<p>So the practical question in a city such as Scottsdale or Phoenix is not whether you can run a short-term rental, but what the registration, insurance, and notification requirements are, and what the penalties are for repeat nuisance violations. Several Valley cities have built active licensing programs with annual fees, so this is a real process, not a formality.</p>
<h2>The casita law has a short-term-rental carve-out</h2>
<p>Arizona's 2024 ADU law, HB 2720, codified at A.R.S. 9-461.18, requires larger cities to allow accessory dwelling units on single-family lots. But the same law expressly lets a covered city prohibit the use of an ADU as a short-term or vacation rental. In other words, a city that must let you build a casita can still forbid you from renting that casita by the night, even while a longer-term lease of the same unit is allowed. If nightly rental income is part of your plan, confirm how your specific city treats ADU short-term use before you design around it.</p>
<h2>Your HOA can restrict rentals more than the city does</h2>
<p>If your lot is inside a homeowners association, the recorded declaration (CC&Rs) is often the real gatekeeper. Arizona law lets planned-community and condominium associations regulate leasing, and many have adopted minimum lease terms (for example a 30-day or 6-month minimum) that effectively bar nightly rental, caps on the number of rented homes, or outright short-term-rental prohibitions. A.R.S. 33-1806.01 for planned communities and A.R.S. 33-1260.01 for condominiums set the framework for how associations handle rental information and restrictions. Always read the CC&Rs and any rental rules before assuming a casita can become an income unit.</p>
<h2>Licensing and taxes</h2>
<p>Renting to short-term guests is a taxable activity. Operators generally must obtain a transaction privilege tax (TPT) license from the Arizona Department of Revenue, register each rental property, and collect and remit state, county, and city TPT plus any applicable transient lodging taxes. Cities also commonly require you to display the TPT and local license numbers in any listing. Treating the rental as a small business from day one, with the right licenses and insurance, avoids fines and back taxes later.</p>
<h2>Design choices that make a casita rent-ready</h2>
<p>Whether the goal is a future nightly rental, a long-term lease, or simply flexibility, certain design moves help: a private entrance and parking separate from the main house, its own kitchenette or full kitchen, a separate HVAC zone and utility metering or submetering where feasible, sound separation, and durable, low-maintenance finishes. On a lot served by a well and septic, the onsite wastewater system has to be sized for the extra occupancy under Arizona Department of Environmental Quality standards, so plan that capacity in early rather than retrofitting it.</p>
<h2>How Jematell Homes helps</h2>
<p>We design casitas and guest houses that can flex into rental use where it is allowed, with the privacy, utilities, and durability that role requires, and we coordinate the septic sizing when a lot is not on city sewer. Because short-term-rental rules, ADU rental carve-outs, HOA restrictions, and tax requirements all change and differ by jurisdiction, confirm the current rules with your local Authority Having Jurisdiction, your HOA, and the Arizona Department of Revenue before counting on rental income. None of this is legal or tax advice.</p>`,
  shortAnswer:
    "Usually yes, but four things must align: Arizona lets cities regulate (not ban) short-term rentals, the HB 2720 casita law lets a city bar nightly rental of an ADU, your HOA can restrict or prohibit leasing, and you must hold a TPT license and pay rental taxes. Confirm each before counting on income.",
  metaDescription:
    "Can you rent out a casita or run a short-term rental in Arizona? Cities can regulate but not ban STRs, HOAs can restrict leasing, the casita law allows ADU nightly-rental bans, and TPT licensing applies.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["short-term-rental", "casita", "adu", "hoa", "research-phase"],
  relatedFaqSlugs: [
    "can-i-build-a-casita-or-adu",
    "what-hb-2720-changed-for-adus-in-arizona",
    "what-an-hoa-architectural-committee-can-require",
  ],
  relatedServiceSlugs: ["custom-homes", "floor-plans"],
  pillarBlogSlug: "modern-casita-and-guest-house-design-trends",
  featured: false,
  sortOrder: 100,
}),
```

**Sources used**
- A.R.S. 9-500.39, Vacation rentals and short-term rentals; regulation by cities and towns — https://www.azleg.gov/ars/9/00500-39.htm
- A.R.S. 11-269.17, Vacation rentals and short-term rentals; regulation by counties — https://www.azleg.gov/ars/11/00269-17.htm
- [5] HB 2720 (2024) bill text / A.R.S. 9-461.18, ADU requirements and short-term-rental carve-out — https://www.azleg.gov/legtext/56leg/2R/bills/HB2720S.pdf ; https://www.azleg.gov/ars/9/00461-18.htm
- A.R.S. 33-1806.01, Rental property; rights of association (planned communities) — https://www.azleg.gov/ars/33/01806-01.htm
- A.R.S. 33-1260.01, Rental property; condominiums — https://www.azleg.gov/ars/33/01260-01.htm
- Arizona Department of Revenue, Residential Rental / Transaction Privilege Tax — https://azdor.gov/transaction-privilege-tax/residential-rental-guidelines

---

## 2 — Maricopa County rural residential zoning districts (RU-43)

```ts
item({
  slug: "rural-residential-zoning-districts-in-maricopa-county",
  question: "What do Maricopa County's rural residential zoning districts (like RU-43) allow?",
  answerHtml: `<p><strong>In unincorporated Maricopa County, including much of the Rio Verde Foothills, land is governed by the county's own zoning ordinance rather than a city code, and most low-density home sites fall in a rural district such as RU-43. These districts pair a single-family home with generous lot sizes, larger setbacks, and the right to keep horses and other animals, which is exactly why so many custom-home buyers seek them out.</strong></p>
<h2>The county, not a city, is the authority here</h2>
<p>If your lot is outside an incorporated city or town, Maricopa County Planning and Development administers zoning and issues the building permit. The Maricopa County Zoning Ordinance defines a family of districts; the most common rural-residential one is RU-43, where the "RU" denotes rural and the "43" refers to a minimum lot area of 43,560 square feet, which is one acre. Larger rural and residential districts exist for bigger parcels, and the exact district for any given lot is recorded on the county's zoning map.</p>
<h2>What RU-43 typically allows</h2>
<p>RU-43 is built around low-density rural living. In general terms it permits:</p>
<ul>
<li><strong>One single-family detached home per lot,</strong> with the usual accessory buildings such as a garage, workshop, or guest house consistent with the ordinance.</li>
<li><strong>Keeping of horses and other animals.</strong> The rural designation is what allows livestock and horse privileges, subject to per-area animal limits and manure and setback rules. This is the key difference from a strictly residential district.</li>
<li><strong>Agricultural and horticultural uses</strong> appropriate to rural land.</li>
<li><strong>Home occupations</strong> within defined limits so a low-impact business does not change the residential character.</li>
</ul>
<p>Because the minimum lot is an acre, RU-43 neighborhoods feel open, with houses set well apart. That density, plus the animal privileges, is the whole appeal for buyers who want room, a barn or arena, or simply distance from neighbors.</p>
<h2>Setbacks, height, and lot coverage</h2>
<p>Rural districts use larger building setbacks than typical in-town residential zoning, often on the order of several tens of feet from front, side, and rear lines, with additional separation required for animal-keeping structures. Building height is limited (commonly to roughly two stories), and lot coverage by structures is capped so the parcel keeps its open feel. The precise front, side, and rear setback figures, the maximum height, the allowed lot coverage, and the animal counts are all set in the ordinance for the specific district, so read them against your exact parcel rather than assuming. A builder or civil engineer can run a quick buildability check to confirm your floor plan fits inside the rural setback envelope.</p>
<h2>Lot splits and how parcels get created</h2>
<p>Rural acreage is often created or divided through lot splits. Arizona draws a bright line here: under A.R.S. 32-2101, dividing land into six or more lots is a subdivision with full platting, infrastructure, and public-report requirements, while a split into five or fewer lots is treated as a minor lot split with far lighter process. This distinction shaped how much of the Rio Verde Foothills was parceled out, and it affects what utilities, roads, and water arrangements a buyer can expect to find already in place.</p>
<h2>Why the district matters before you buy</h2>
<p>Two rural lots that look identical can carry different rights depending on their zoning district and overlays. Confirm the district, the minimum lot size, the setbacks, the animal privileges, and whether any floodplain or hillside overlay applies before you make an offer, because those rules drive where the house can sit, how big it can be, and whether your horses are welcome. Remember too that unincorporated lots usually rely on a well and septic, so water and onsite wastewater feasibility belong in the same due-diligence pass.</p>
<h2>How Jematell Homes helps</h2>
<p>We build custom homes throughout unincorporated Maricopa County and design each one to its parcel's rural zoning, working the setbacks, height, lot coverage, accessory buildings, and any animal facilities into the site plan from the start. Because Maricopa County updates its zoning ordinance and applies districts and overlays parcel by parcel, confirm the current zoning, setbacks, and animal rules with Maricopa County Planning and Development, and any applicable HOA, for your specific lot before you finalize a design.</p>`,
  shortAnswer:
    "In unincorporated Maricopa County, low-density home sites usually sit in a rural district like RU-43, which sets a one-acre minimum lot, allows a single-family home plus horses and other animals, and uses larger setbacks. The county, not a city, is the permitting authority, and exact rules are set per district.",
  metaDescription:
    "What does Maricopa County RU-43 rural zoning allow? A one-acre minimum lot, a single-family home, horse and animal privileges, and larger setbacks, all administered by the county for unincorporated land.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["zoning", "ru-43", "maricopa-county", "rural", "research-phase"],
  relatedFaqSlugs: [
    "what-are-setbacks-lot-coverage-and-naos-rules",
    "do-i-need-a-permit-in-unincorporated-maricopa-county",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "custom-homes"],
  pillarBlogSlug: "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
  featured: false,
  sortOrder: 101,
}),
```

**Sources used**
- [12] Maricopa County Planning & Development; Construction Permit Information — https://www.maricopa.gov/797/Planning-Development ; https://www.maricopa.gov/1629/Construction-Permit-Information
- Maricopa County Zoning Ordinance (rural districts, RU-43) — https://www.maricopa.gov/2280/Zoning-Ordinance
- [13] Maricopa County, Rio Verde Foothills Area Plan — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087
- A.R.S. 32-2101, Definitions (subdivision = 6+ lots vs. lot split) — https://www.azleg.gov/ars/32/02101.htm

---

## 3 — Code-required room sizes, ceiling heights, and bedroom egress

```ts
item({
  slug: "room-sizes-ceiling-heights-and-bedroom-egress",
  question: "What are the code-required room sizes, ceiling heights, and bedroom egress rules?",
  answerHtml: `<p><strong>The interior dimensions of a new home are governed by the International Residential Code (IRC) that your jurisdiction has adopted, which sets minimum room areas, minimum ceiling heights, and the emergency escape opening every bedroom must have. These are floors, not targets, and a thoughtful custom design comfortably clears them, but knowing them helps you understand why a room, a window, or a ceiling cannot simply shrink to fit.</strong></p>
<h2>Which code edition applies</h2>
<p>Arizona has no mandatory statewide building code, so each city, town, and county adopts its own edition of the IRC with local amendments. The City of Phoenix, for example, adopted the 2024 International Codes effective August 1, 2025, while neighboring jurisdictions may be on an earlier edition. The specific section numbers below are stable across recent editions, but always confirm the adopted edition and any local amendments with your Authority Having Jurisdiction, because details shift between code cycles.</p>
<h2>Minimum room sizes</h2>
<p>The IRC sets a small floor on habitable room size under Section R304. In recent editions, every habitable room must have a floor area of at least 70 square feet, and no habitable room (other than a kitchen) may be less than 7 feet in any horizontal dimension. Kitchens are exempt from the minimum-area rule but still must meet ceiling height. These minimums are far below what a custom home delivers; their real effect is on tight spaces such as a small home office or a bonus nook, where the code confirms whether the room can count as habitable.</p>
<h2>Ceiling heights</h2>
<p>Section R305 governs ceiling height. The general rule is that habitable spaces, hallways, and bathrooms must have a ceiling height of at least 7 feet, measured from finished floor to finished ceiling. A few practical exceptions apply:</p>
<ul>
<li><strong>Beams and girders</strong> may project below the required height by a limited amount as long as they are spaced apart, which matters in homes with exposed structural members.</li>
<li><strong>Sloped ceilings</strong> need the minimum height over only a defined portion of the room, so a vaulted or attic-style space is fine as long as enough of it meets the standard.</li>
<li><strong>Bathrooms</strong> have a reduced minimum height at fixtures, typically allowing a lower clearance directly above a shower or toilet.</li>
</ul>
<p>Because 7 feet is only the minimum, most custom homes run 9 or 10 foot ceilings or higher for the sense of volume buyers want; the code simply sets the line below which a space stops qualifying.</p>
<h2>Bedroom egress: the emergency escape and rescue opening</h2>
<p>The rule buyers most often run into is Section R310, which requires an emergency escape and rescue opening (EERO) in every sleeping room and in basements with habitable space. The opening, almost always a window in a single-family home, must meet all of these at once:</p>
<ul>
<li><strong>A minimum net clear opening of 5.7 square feet</strong> (reduced to 5.0 square feet for openings at grade level).</li>
<li><strong>A minimum net clear opening height of 24 inches</strong> and a minimum net clear opening width of 20 inches. These are minimums for each dimension, not a recipe; a window that is exactly 20 by 24 inches does not reach 5.7 square feet, so at least one dimension has to be larger.</li>
<li><strong>A sill height no more than 44 inches above the finished floor,</strong> so an occupant can reach and use it.</li>
<li><strong>Operability from the inside</strong> without keys, tools, or special knowledge.</li>
</ul>
<p>This is why a bedroom cannot rely on a tiny clerestory or a fixed picture window alone, and why a room marketed as a bedroom must have a conforming egress window. Window wells, when an opening is below grade, have their own size and ladder requirements.</p>
<h2>Light, ventilation, and getting out the door</h2>
<p>Two related sections round out the interior basics. Section R303 requires natural light and ventilation in habitable rooms, generally glazing equal to about 8 percent of the floor area and openable area for ventilation equal to about 4 percent, unless mechanical systems are provided. Section R311 requires at least one compliant egress door and sets minimum hallway and stair dimensions so the home can be exited safely. Together with room size, ceiling height, and bedroom egress, these define the baseline every floor plan must satisfy before it is permitted.</p>
<h2>How Jematell Homes helps</h2>
<p>We design every room, window, and ceiling to clear the adopted IRC comfortably, so a space called a bedroom truly functions as one and the plan sails through review rather than triggering corrections. Because Arizona adopts building codes city by city and edition by edition, confirm the specific code edition, amendments, and dimensional requirements with your local Authority Having Jurisdiction before construction. This is general information, not a substitute for plan review.</p>`,
  shortAnswer:
    "The adopted International Residential Code sets the minimums: habitable rooms at least 70 square feet, ceiling heights generally at least 7 feet, and an emergency escape opening in every bedroom (about 5.7 square feet net, 24 inches high, 20 inches wide, sill no higher than 44 inches). Custom homes clear these easily.",
  metaDescription:
    "Code-required room sizes, ceiling heights, and bedroom egress: the IRC sets a 70-square-foot room minimum, a 7-foot ceiling minimum, and an emergency escape window in every bedroom. Adopted edition varies by Arizona city.",
  categorySlug: "design-zoning-adus",
  topicSlugs: ["zoning-setbacks-adus"],
  tags: ["irc", "ceiling-height", "egress", "room-size", "research-phase"],
  relatedFaqSlugs: [
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "what-inspections-happen-during-a-custom-home-build",
    "what-are-setbacks-lot-coverage-and-naos-rules",
  ],
  relatedServiceSlugs: ["custom-homes", "floor-plans"],
  pillarBlogSlug: "how-to-choose-the-right-floor-plan",
  featured: false,
  sortOrder: 102,
}),
```

**Sources used**
- [29] 2024 IRC, Chapter 3 Building Planning (ICC Digital Codes) — R303 light/ventilation, R304 minimum room areas, R305 ceiling height, R310 emergency escape and rescue openings, R311 means of egress — https://codes.iccsafe.org/content/IRC2024P2
- [11] City of Phoenix, 2024 I-Codes adoption (effective Aug 1, 2025) — https://www.phoenix.gov/pdd ; ICC adoption notice — https://www.iccsafe.org/about/periodicals-and-newsroom/city-of-phoenix-strengthens-building-safety-and-accessibility-by-adopting-the-2024-international-codes/
