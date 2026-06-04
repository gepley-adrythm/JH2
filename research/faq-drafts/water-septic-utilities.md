# FAQ Drafts — Water, Septic & Utilities (Section C)

Category: `water-septic-utilities`
Topic: `rural-water-and-septic`

Paste-ready `item({ ... })` blocks for the assembly task. These extend the live
category (which already covers "build without city water/sewer," "how septic
works," and the "100-year water supply rule") rather than repeating it. Voice is
research-phase, plain-language, AZ-code-grounded, no em dashes, no emojis, never
legal advice, and every answer closes by telling the reader to confirm specifics
with the local Authority Having Jurisdiction (AHJ). Volatile water-program facts
are date-stamped to June 2026.

---

## C1 — Drilling a well in Arizona: the exempt-well rule (A.R.S. 45-454)

```ts
item({
  slug: "drilling-a-well-in-arizona-the-exempt-well-rule",
  question: "How does drilling a well work in Arizona, and what is the exempt-well rule?",
  answerHtml: `<p><strong>If your lot has no water provider, a private well is often the answer, and most single-family homes rely on what Arizona calls an "exempt" well. Under A.R.S. 45-454 an exempt well is a non-irrigation well with a pump no larger than 35 gallons per minute, which covers normal household use.</strong> Whether a well is "exempt" changes the paperwork, not whether you need to register it, so it is worth understanding before you count on well water for a parcel.</p>
<h2>Exempt versus non-exempt wells</h2>
<p>The Arizona Department of Water Resources (ADWR) draws a line between two kinds of wells, and the line is the pump's maximum capacity:</p>
<ul>
<li><strong>Exempt wells</strong> are non-irrigation wells pumping no more than 35 gallons per minute. A typical domestic well that serves a house, a few animals, and a yard falls here. Inside an Active Management Area (AMA) such as the Phoenix AMA, an exempt well still has to be registered with ADWR, but it does not need the supply analysis a larger well requires.</li>
<li><strong>Non-exempt wells</strong> pump more than 35 gallons per minute, or are used for purposes the exemption does not cover. Inside an AMA these generally require a separate ADWR permit and a recognized right to the groundwater, which is a much heavier process and one reason most homes stay within the exempt limit.</li>
</ul>
<p>The 35-gallon-per-minute figure is a pump-capacity ceiling, not a promise of yield. A parcel's actual water yield depends on the aquifer beneath it, and that is the real unknown when you are deciding whether to drill.</p>
<h2>The steps to drill</h2>
<p>ADWR sets the process for drilling and registering a well, and it runs roughly in this order:</p>
<ol>
<li><strong>Hire a licensed well driller.</strong> Arizona requires that the person drilling, deepening, or abandoning a well hold a current ADWR drilling license. This is not a do-it-yourself job.</li>
<li><strong>File a Notice of Intent to Drill.</strong> Before any drilling, a Notice of Intent (NOI) is submitted to ADWR. ADWR issues a drilling card and a unique well registration number for the new well.</li>
<li><strong>Drill and construct the well</strong> to ADWR's well construction standards, which govern casing, sealing, and how the well is finished so it does not contaminate the aquifer.</li>
<li><strong>File the well completion report.</strong> After drilling, the driller files a completion report with ADWR recording depth, yield, and construction details. That record becomes part of the well's permanent file.</li>
</ol>
<h2>Spacing, impact, and the neighbors</h2>
<p>A well does not exist in isolation. ADWR can consider well spacing and the impact a new or replacement well may have on existing nearby wells, and impact questions become more sensitive in areas where many homes draw from the same aquifer. Practically, this means two things for a buyer: a well that pumps fine today is not guaranteed forever if the local water table drops, and where you place the well on the lot matters because it must hold required separation from the septic system, property lines, and structures. On a parcel that will have both a well and septic, that separation is a core part of the site plan.</p>
<h2>What this means for your budget and timeline</h2>
<p>The two biggest uncertainties in well water are depth and yield, and both are parcel-specific. A shallow, productive aquifer makes for a relatively economical well; a deep or low-yielding one can cost many times more and may push you toward hauled water with on-site storage instead. Because you usually cannot know the cost with certainty until you drill, it is wise to budget a realistic range, talk to drillers who know the immediate area, and look at completion reports from nearby wells where they exist.</p>
<h2>How Jematell Homes helps</h2>
<p>We build regularly on rural and unserved lots, so we can help you scope what a well is likely to cost on a given parcel, coordinate the licensed driller and the ADWR filings, and sequence the well so it does not hold up the building permit or conflict with the septic field. Because well rules, yields, and aquifer conditions vary parcel by parcel and ADWR's requirements change over time, we confirm the current process with ADWR and the local AHJ for your specific site rather than generalizing.</p>`,
  shortAnswer:
    "Most Arizona homes use an exempt well, which under A.R.S. 45-454 is a non-irrigation well pumping no more than 35 gallons per minute. You still register it with ADWR, hire a licensed driller, and file a Notice of Intent to Drill. Depth and yield are parcel-specific, so budget a range.",
  metaDescription:
    "How does drilling a well work in Arizona? Most homes use an exempt well under A.R.S. 45-454 (35 gpm max), registered with ADWR via a Notice of Intent to Drill.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["well", "exempt-well", "adwr", "rural", "research-phase"],
  relatedFaqSlugs: [
    "can-i-build-without-city-water-or-sewer",
    "assured-vs-adequate-water-supply-and-the-100-year-rule",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "custom-homes"],
  pillarBlogSlug: "rio-verde-arizona-utilities-water-infrastructure",
  featured: false,
  sortOrder: 9,
}),
```

**Sources used**

- [1] A.R.S. 45-454, Exemption of certain wells — https://www.azleg.gov/ars/45/00454.htm
- [2] ADWR, Well Drilling in Arizona — https://www.azwater.gov/permitting-wells/well-drilling-arizona

---

## C2 — Septic permits and the transfer-of-ownership inspection

```ts
item({
  slug: "septic-permits-and-the-transfer-of-ownership-inspection",
  question: "What permits does a septic system need, and what is the transfer-of-ownership inspection?",
  answerHtml: `<p><strong>A new septic (onsite wastewater) system has to be permitted before it is built, and when a home on septic is later sold, Arizona requires a transfer-of-ownership inspection so the buyer knows the system works. Both processes run under the Arizona Department of Environmental Quality (ADEQ) rules in Arizona Administrative Code Title 18, Chapter 9 (R18-9), carried out locally in our area by Maricopa County Environmental Services.</strong> Knowing both ends of the system's life, the build permit and the resale inspection, helps you avoid surprises whether you are building or buying.</p>
<h2>The regulatory framework</h2>
<p>Onsite wastewater systems in Arizona are governed by ADEQ's rules in A.A.C. R18-9. ADEQ delegates day-to-day permitting to county agencies, so in the Phoenix metro your point of contact is usually Maricopa County Environmental Services rather than the state directly. Most conventional household systems are authorized under a general permit, while unusual designs or larger flows can require an individual permit. The county administers the applications, inspections, and approvals for your parcel.</p>
<h2>Permitting a new system</h2>
<p>For a new custom home, the septic approval generally moves through these stages:</p>
<ol>
<li><strong>Site investigation and soil evaluation.</strong> A percolation test and soil profile determine how quickly the ground absorbs water, which sets the system type and the size of the drainfield.</li>
<li><strong>Design and application.</strong> A designer prepares the system to suit your soils, lot size, and household, respecting required setbacks from wells, property lines, structures, and washes. The application goes to the county.</li>
<li><strong>Construction authorization.</strong> The county reviews and authorizes construction before the system is installed. You do not install first and ask later.</li>
<li><strong>Installation and inspection.</strong> The system is built to the approved design and inspected before it is covered.</li>
<li><strong>Approval of construction / discharge authorization.</strong> Once the system passes, the county issues the final approval that lets the system be placed into service.</li>
</ol>
<p>Because the soil evaluation drives everything downstream, it belongs early in due diligence. A lot with poor percolation may require a more expensive engineered system, which changes both your budget and your site plan.</p>
<h2>The transfer-of-ownership inspection</h2>
<p>Arizona's rules add a step most buyers do not expect: when a property served by an onsite wastewater system changes hands, the system must be inspected as part of the sale. Under the R18-9 transfer-of-ownership provisions, the inspection is performed within a defined window before the closing (commonly up to six months prior), and the seller is generally responsible for having it done. The inspection confirms the system's condition and that it is functioning, and the report documents what was found.</p>
<p>After the sale closes, a Notice of Transfer is filed with the county or ADEQ within a short window (commonly 15 days), which formally moves the discharge authorization to the new owner. The practical points for each side are:</p>
<ul>
<li><strong>For sellers:</strong> arrange the inspection in time, and be ready to address problems it surfaces, since an unresolved deficiency can complicate or delay the sale.</li>
<li><strong>For buyers:</strong> read the inspection report closely. It is your clearest window into whether you are inheriting a sound system or a repair bill, and it tells you the system type, which signals future maintenance.</li>
</ul>
<h2>Ongoing ownership</h2>
<p>Septic systems are not install-and-forget. Conventional systems need periodic pumping and inspection, and engineered systems often carry a service contract. These are real ownership costs that the transfer inspection can help you anticipate before you buy.</p>
<h2>How Jematell Homes helps</h2>
<p>On a new build we coordinate the soil evaluation, the system design, and the county permitting, and we place the system to work with your home and any well. If you are weighing a parcel that already has a system, we can help you understand what the inspection and records are telling you. Because septic rules and fees are set under ADEQ and administered locally, and both change, we confirm the current requirements with Maricopa County Environmental Services for your parcel rather than assuming.</p>`,
  shortAnswer:
    "A septic system needs county permitting before construction under ADEQ's R18-9 rules, handled locally by Maricopa County Environmental Services. When the home later sells, a transfer-of-ownership inspection confirms the system works, and a Notice of Transfer moves the authorization to the new owner. Confirm specifics with the county.",
  metaDescription:
    "What permits does a septic system need in Arizona? County permitting under ADEQ R18-9 before building, plus a transfer-of-ownership inspection when the home is sold.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["septic", "onsite-wastewater", "adeq", "transfer-inspection", "research-phase"],
  relatedFaqSlugs: [
    "how-do-septic-systems-work-for-a-new-home",
    "can-i-build-without-city-water-or-sewer",
    "do-i-need-a-soils-or-geotechnical-report",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "custom-homes"],
  pillarBlogSlug:
    "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
  featured: false,
  sortOrder: 10,
}),
```

**Sources used**

- [8] Maricopa County, Onsite Wastewater Ownership Transfer — https://www.maricopa.gov/2491/Onsite-Wastewater-Ownership-Transfer
- [9] ADEQ, Onsite Wastewater Treatment Program (A.A.C. R18-9) — https://azdeq.gov/da/osww
- [14] Maricopa County, Onsite Wastewater Forms / Applications — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications

---

## C3 — Rio Verde Foothills water: what happened and how lots get water now

```ts
item({
  slug: "rio-verde-foothills-water-how-lots-get-water-now",
  question: "What happened with Rio Verde Foothills water, and how do lots get water there now?",
  answerHtml: `<p><strong>Rio Verde Foothills is an unincorporated area northeast of Scottsdale where many homes sit on lot-split parcels with no water provider and rely on water hauled in and stored in on-site tanks. In early 2023 the source those haulers had used was cut off, which created a widely reported water crisis before a longer-term arrangement was put in place.</strong> If you are looking at a parcel here, the single most important thing to verify today is exactly where its water will come from and whether that source is secure.</p>
<h2>How the area was built</h2>
<p>Much of Rio Verde Foothills was created through "lot splits" rather than formal subdivisions. Under Arizona law a subdivision (six or more lots) inside an Active Management Area must prove a 100-year assured water supply before lots are sold, but splitting a parcel into five or fewer lots has historically not triggered that requirement. The result is a patchwork of parcels, some with private wells and many depending on hauled water, without a subdivision-level water guarantee behind them.</p>
<h2>What happened in 2023</h2>
<p>For years, water haulers serving Rio Verde Foothills filled their trucks from a standpipe in the City of Scottsdale. Citing drought conditions and its obligations to its own residents, Scottsdale stopped allowing that out-of-city hauling at the start of January 2023. Hundreds of households that depended on hauled water suddenly lost their nearby, affordable source and had to truck water from farther away at much higher cost. The situation drew national attention as an example of what can happen when homes are built without a secured long-term water supply.</p>
<h2>How it was resolved</h2>
<p>The response came on two tracks. The State of Arizona enacted legislation enabling a local standpipe district mechanism so the community could organize and contract for water on a more durable basis, and the regulated utility EPCOR moved to serve the area, bringing a Rio Verde Foothills fill station online so licensed haulers again had a stable local source. By 2026 hauled water is flowing through that arrangement rather than through the old Scottsdale standpipe.</p>
<p>Water-program arrangements like this one continue to evolve, so treat the specifics above as the state of things as of June 2026 and verify the current setup before relying on it.</p>
<h2>What a buyer should verify today</h2>
<p>If you are considering a Rio Verde Foothills parcel, confirm the water answer in concrete terms before you commit:</p>
<ul>
<li><strong>Does the lot have a working private well,</strong> and if so, what do its records show for depth and yield? A well changes the equation substantially.</li>
<li><strong>If it depends on hauled water,</strong> what is the storage capacity on site, who is the current hauler, and what is the per-delivery cost from the source serving the area now?</li>
<li><strong>Is the parcel within the area now served</strong> by the EPCOR fill station or the standpipe district arrangement, and what does participation involve?</li>
<li><strong>What is the parcel's history</strong> as a lot split versus a subdivision lot, since that affects whether any assured-supply guarantee exists.</li>
</ul>
<h2>How Jematell Homes helps</h2>
<p>We build in Rio Verde and the surrounding area and know how much the water question shapes a project here. We can help you ask the right questions on a specific parcel, scope what a well or hauled water will realistically cost, and sequence the water and septic work alongside the building permit. Because this situation has changed before and the rules and providers continue to shift, we point you to ADWR, EPCOR, Maricopa County, and qualified professionals for current, parcel-specific answers rather than offering legal conclusions, and we always confirm the details with the local AHJ.</p>`,
  shortAnswer:
    "Many Rio Verde Foothills homes sit on lot-split parcels with no water provider and rely on hauled water. In January 2023 Scottsdale cut off the standpipe haulers used, sparking a crisis. As of June 2026 a state-enabled standpipe district and an EPCOR fill station supply the area. Verify a parcel's source before buying.",
  metaDescription:
    "What happened with Rio Verde Foothills water? Scottsdale cut off hauled-water access in 2023; a standpipe district and EPCOR fill station now supply the area.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["rio-verde", "hauled-water", "epcor", "water-supply", "research-phase"],
  relatedFaqSlugs: [
    "can-i-build-without-city-water-or-sewer",
    "assured-vs-adequate-water-supply-and-the-100-year-rule",
    "drilling-a-well-in-arizona-the-exempt-well-rule",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
  pillarBlogSlug: "rio-verde-arizona-utilities-water-infrastructure",
  featured: true,
  sortOrder: 11,
}),
```

**Sources used**

- [13] Maricopa County, Rio Verde Foothills Area Plan — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087
- [25] EPCOR, Rio Verde Foothills Water Fill Station — https://www.epcor.com/us/en/az/account/start-service/rio-verde-foothills-water-fill-station.html ; 12News, "Water restored to Rio Verde Foothills" — https://www.12news.com/article/news/local/water-wars/rio-verde-foothill-water-restored-arizona-water-crisis/75-65ffab59-a079-453e-9c4f-1e4cdee644c4

---

## C4 — Assured vs. adequate water supply and the 100-year rule

```ts
item({
  slug: "assured-vs-adequate-water-supply-and-the-100-year-rule",
  question: "What is the difference between assured and adequate water supply, and how does the 100-year rule work?",
  answerHtml: `<p><strong>Arizona runs two parallel water-supply programs through the Arizona Department of Water Resources (ADWR): the Assured Water Supply program inside the state's Active Management Areas, and the Adequate Water Supply program outside them. Both ask whether there is a 100-year supply of water, but they have very different teeth, and within the assured program a "designation" and a "certificate" are not the same thing.</strong> Understanding which one applies to a parcel tells you how solid its long-term water really is.</p>
<h2>Assured versus adequate</h2>
<ul>
<li><strong>Assured Water Supply</strong> applies inside an Active Management Area (AMA). The Phoenix metro sits within the Phoenix AMA. Here, demonstrating a 100-year supply is mandatory before a new subdivision can be sold, and it has real consequences if it cannot be shown.</li>
<li><strong>Adequate Water Supply</strong> applies outside the AMAs. In most of those areas a developer must determine and disclose whether a 100-year supply exists, but a finding of inadequacy does not necessarily stop lots from being sold. It is largely a disclosure program, so the burden shifts onto the buyer to read what is disclosed.</li>
</ul>
<p>That difference matters: inside the Phoenix AMA the 100-year showing is a gate, while in adequacy areas it is closer to a label on the package.</p>
<h2>What the 100-year demonstration requires</h2>
<p>To meet the assured or adequate standard, a water supply generally has to be shown to be:</p>
<ul>
<li><strong>Physically available</strong> for 100 years.</li>
<li><strong>Continuously available</strong> over that period.</li>
<li><strong>Legally available,</strong> meaning there is a recognized right to use it.</li>
<li><strong>Of adequate quality</strong> for the intended use.</li>
<li><strong>Financially feasible</strong> to deliver, and consistent with ADWR's groundwater management goal and any applicable management plan.</li>
</ul>
<h2>Designation versus certificate</h2>
<p>Inside an AMA there are two ways a development can satisfy the assured-supply requirement, and the distinction is worth knowing:</p>
<ul>
<li><strong>A Designation of Assured Water Supply</strong> is granted to a city, town, or private water company that proves a 100-year supply for its entire service area. If your home will be served by a designated provider, the provider carries the demonstration and individual subdivisions within its service area generally do not each have to prove supply separately.</li>
<li><strong>A Certificate of Assured Water Supply</strong> is granted to a specific subdivision that is not served by a designated provider. The developer must prove the 100-year supply for that subdivision before the lots can be sold.</li>
</ul>
<p>For a buyer, "served by a provider with a Designation" is generally the most reassuring answer, because the supply obligation rests on an established utility rather than a single project.</p>
<h2>Why this is moving in the Phoenix AMA</h2>
<p>The assured-supply landscape in the Phoenix AMA has tightened. In 2023 ADWR's updated groundwater modeling found that projected demand exceeded the groundwater that could be relied on for the full 100 years in parts of the AMA. As a result, ADWR limited approval of new assured-supply determinations that depend solely on pumping groundwater in affected areas, pushing new growth toward renewable or alternative supplies. This is an active and evolving area of state water policy, so treat these specifics as current to June 2026 and confirm the latest status with ADWR.</p>
<h2>What it means for your lot</h2>
<p>The practical questions are the same ones that matter on any outlying parcel: what is the water source, who guarantees it, and how secure is it for the long term. A lot inside a provider's designated service area, a lot with its own assured certificate, a lot outside an AMA with an adequacy disclosure, and a lot-split parcel relying on a private well or hauled water are four very different situations, and the purchase price rarely tells you which one you are looking at.</p>
<h2>How Jematell Homes helps</h2>
<p>We help buyers connect a parcel's water status to what building and living there will realistically require, and we flag when an outlying lot deserves a closer look at its supply before an offer. Because this area of law is technical and changing, we point you to ADWR and qualified professionals for formal determinations rather than offering legal conclusions, and we confirm the current rules with the relevant AHJ for your specific parcel.</p>`,
  shortAnswer:
    "Assured Water Supply applies inside Active Management Areas and is mandatory before selling a subdivision; Adequate Water Supply applies outside and is mainly disclosure. A Designation covers a provider's whole service area, while a Certificate covers one subdivision. Both require proving a 100-year supply. Confirm current status with ADWR.",
  metaDescription:
    "Assured vs. adequate water supply in Arizona: the assured 100-year rule is mandatory inside Active Management Areas, plus how a Designation differs from a Certificate.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["assured-water-supply", "adequate-water-supply", "adwr", "100-year-rule", "research-phase"],
  relatedFaqSlugs: [
    "what-is-arizonas-100-year-water-supply-rule",
    "rio-verde-foothills-water-how-lots-get-water-now",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["buy-a-lot-with-us", "build-on-your-lot"],
  pillarBlogSlug:
    "building-a-custom-home-in-rio-verde-az-what-to-know-before-you-start",
  featured: false,
  sortOrder: 12,
}),
```

**Sources used**

- [7] ADWR, Assured & Adequate Water Supply overview — https://www.azwater.gov/aaws/aaws-overview
