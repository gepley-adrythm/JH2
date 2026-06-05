# FAQ Drafts — Water, Septic & Utilities (batch 2026-06)

Category: `water-septic-utilities`
Topic: `rural-water-and-septic`

Paste-ready `item({ ... })` blocks for the assembly task. These extend the live
category (which already covers "build without city water/sewer," "how septic
works," the "100-year water supply rule," the exempt-well rule, septic permits,
Rio Verde water, and assured-vs-adequate supply) rather than repeating it. This
batch adds the practical, cost-and-logistics side of rural utilities: what a well
actually costs, what a shared-well agreement is, and how power, propane, and
internet reach an off-grid lot.

Voice is research-phase, plain-language, AZ-grounded, no em dashes, no emojis,
never legal advice, and every answer closes by telling the reader to confirm
specifics with the local Authority Having Jurisdiction (AHJ) or the relevant
utility. Volatile cost and program facts are date-stamped to June 2026.

---

## 1 — How much does it cost to drill a well in Arizona?

```ts
item({
  slug: "how-much-does-it-cost-to-drill-a-well-in-arizona",
  question: "How much does it cost to drill a well in Arizona?",
  answerHtml: `<p><strong>There is no single price for a well in Arizona because the two things that drive the cost the most, depth and yield, are unknown until you drill. A typical domestic well on a rural lot in our build area usually runs into the tens of thousands of dollars once you add the pump, storage, and electrical, and a deep or low-producing well can cost several times a shallow one.</strong> The honest planning answer is to budget a realistic range, not a fixed number, and to gather as much local well data as you can before you commit to a parcel.</p>
<h2>Why there is no flat price</h2>
<p>A well is priced largely by the foot, so the depth to a reliable water-bearing layer is the single biggest variable. Two lots a mile apart can hit good water at very different depths depending on the aquifer beneath them. On top of depth, the well's <strong>yield</strong> (how many gallons per minute it reliably produces) determines what pump and storage you need and whether the well can serve the home at all. Most homes are built around an <strong>exempt well</strong> under A.R.S. 45-454, a non-irrigation well with a pump no larger than 35 gallons per minute, but the legal ceiling is not a promise of yield. The ground decides the yield; the pump just cannot exceed the exempt limit.</p>
<h2>What goes into the total cost</h2>
<p>When buyers hear a "per-foot" drilling quote, that number is only one line item. A working domestic water system on a rural lot usually includes:</p>
<ul>
<li><strong>Drilling</strong> itself, charged by the foot, including the borehole and the rig time.</li>
<li><strong>Casing and well construction</strong> built to ADWR's well construction standards so the well does not contaminate the aquifer.</li>
<li><strong>The pump and motor</strong>, sized to the well's depth and yield. A deeper well needs a more powerful pump.</li>
<li><strong>Pressure tank, wiring, and controls</strong> to deliver consistent water pressure to the house.</li>
<li><strong>Electrical service to the wellhead</strong>, which on a remote lot can mean a meaningful trenching or line-extension cost of its own.</li>
<li><strong>Water storage</strong> (a holding tank or cistern), often added when yield is modest so the home has a buffer.</li>
<li><strong>Water treatment</strong> if testing shows hardness, arsenic, or other quality issues common in some Arizona groundwater.</li>
</ul>
<p>Because of all those pieces, the drilling quote alone understates the real cost of getting water to the tap. Treat it as a starting point, not the finished number.</p>
<h2>Required steps that affect the bill</h2>
<p>Arizona's well rules add a few non-negotiable steps, each of which carries cost or time:</p>
<ol>
<li><strong>Hire a licensed driller.</strong> ADWR requires that whoever drills, deepens, or abandons a well hold a current Arizona drilling license. This is not a do-it-yourself job.</li>
<li><strong>File a Notice of Intent to Drill.</strong> Before any drilling, a Notice of Intent goes to ADWR, which issues a drilling card and a unique well registration number.</li>
<li><strong>Drill, construct, and equip the well</strong> to ADWR standards.</li>
<li><strong>File the well completion report</strong> recording depth, yield, and construction. That record becomes part of the well's permanent file and is exactly the kind of document you want to read on neighboring wells before you buy.</li>
</ol>
<h2>How to narrow the range before you drill</h2>
<p>You can reduce the guesswork without a crystal ball. Pull ADWR's well records for nearby parcels to see the depths and yields drillers actually hit in the area. Talk to two or three drillers who work that specific area, since their local experience is worth more than any statewide average. Ask whether the lot may need storage or treatment, because those add cost that a bare drilling quote hides. And build a contingency into the budget, since the well is one of the few parts of a rural build where the final price genuinely is not known until the work is done.</p>
<h2>What this means for the parcel decision</h2>
<p>On a lot with no water provider, the well is often the make-or-break cost item. A shallow, productive aquifer can make a well a reasonable line in the budget; a deep or stubborn one can change whether the parcel pencils out at all, and may push you toward hauled water with on-site storage instead. That is why the water question belongs at the front of due diligence, alongside septic feasibility and access, not after you have fallen in love with the lot.</p>
<h2>How Jematell Homes helps</h2>
<p>We build regularly on rural and unserved lots, so we can help you scope what a well is likely to cost on a given parcel, pull and read nearby well records, coordinate the licensed driller and the ADWR filings, and sequence the well so it does not hold up the building permit or collide with the septic field. Because well costs, depths, and aquifer conditions vary parcel by parcel and ADWR's requirements change over time, we confirm the current process and likely costs with ADWR, licensed drillers, and the local AHJ for your specific site rather than quoting a one-size-fits-all number.</p>`,
  shortAnswer:
    "There is no flat price for an Arizona well because depth and yield are unknown until you drill. A typical domestic well, once you add the pump, storage, and electrical, runs into the tens of thousands, and a deep or low-yield well costs far more. Pull nearby ADWR well records and budget a range. Confirm specifics with ADWR and licensed drillers.",
  metaDescription:
    "How much does it cost to drill a well in Arizona? Depth and yield drive the price, and a complete domestic well system (drilling, pump, storage, electrical) usually runs into the tens of thousands.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["well", "well-cost", "adwr", "rural", "research-phase"],
  relatedFaqSlugs: [
    "drilling-a-well-in-arizona-the-exempt-well-rule",
    "what-is-a-shared-well-agreement",
    "can-i-build-without-city-water-or-sewer",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "custom-homes"],
  pillarBlogSlug: "rio-verde-arizona-utilities-water-infrastructure",
  featured: false,
  sortOrder: 100,
}),
```

**Sources used**

- [1] A.R.S. 45-454, Exemption of certain wells — https://www.azleg.gov/ars/45/00454.htm
- [2] ADWR, Well Drilling in Arizona — https://www.azwater.gov/permitting-wells/well-drilling-arizona

---

## 2 — What is a shared well agreement and what should I check before relying on one?

```ts
item({
  slug: "what-is-a-shared-well-agreement",
  question: "What is a shared well agreement, and what should I check before relying on one?",
  answerHtml: `<p><strong>A shared well agreement is a recorded contract that lets two or more parcels draw water from a single well and spells out who pays for what, how the well is maintained, and who may use it. On rural Arizona lots without a water provider, a shared well can be a sensible way to split the high cost of drilling, but the agreement behind it is only as good as its terms, and you should read it closely before you rely on it.</strong> Treat the agreement as a core piece of due diligence, on par with the title report and the septic records.</p>
<h2>Why shared wells exist</h2>
<p>Drilling a well is expensive, and on lots with no city water it is often the single largest utility cost. Neighbors sometimes share one well to split that cost and to avoid drilling several holes into the same aquifer. Most domestic wells operate as <strong>exempt wells</strong> under A.R.S. 45-454, with a pump no larger than 35 gallons per minute. That same capacity must now serve multiple homes, so a well that is comfortable for one household can be tight for three. Understanding how many connections the well supports, and how its yield is divided, is the first question to ask.</p>
<h2>What a good agreement covers</h2>
<p>A shared well agreement is typically recorded against all the served parcels so it runs with the land and binds future owners. A thorough one addresses:</p>
<ul>
<li><strong>Who may use the well</strong> and how many homes or connections it serves.</li>
<li><strong>Cost sharing</strong> for electricity to run the pump, routine maintenance, repairs, and eventual replacement of the pump or the well itself.</li>
<li><strong>Maintenance responsibilities</strong>, including who arranges service and how decisions get made when the well needs work.</li>
<li><strong>Access easements</strong> across the parcel that holds the wellhead, so every user has a legal right to reach and maintain the equipment and the pipes.</li>
<li><strong>Water allocation</strong> if the well's yield is limited, including any rules during shortages.</li>
<li><strong>Dispute resolution</strong> for when owners disagree about cost or repairs.</li>
<li><strong>What happens on sale</strong>, so the obligations and rights transfer cleanly to the next owner.</li>
</ul>
<p>If the well sits on a neighbor's parcel rather than yours, the recorded easement is what guarantees your continued access. A handshake or an unrecorded note is not enough, because it may not bind a future owner of the parcel where the well lives.</p>
<h2>Lender and resale considerations</h2>
<p>Shared wells also matter to financing. Many mortgage lenders, including government-backed loan programs, expect a properly recorded shared well agreement with specific protections before they will lend on a home that depends on one. A missing or weak agreement can complicate your own purchase financing and can make the home harder to sell later. Confirming that an enforceable, recorded agreement exists is therefore both a water question and a resale question.</p>
<h2>What to check before you rely on one</h2>
<p>Before counting on a shared well for a parcel you are considering, work through a short checklist:</p>
<ol>
<li><strong>Get the recorded agreement</strong> and read it, rather than relying on a description. Confirm it is actually recorded against the parcels.</li>
<li><strong>Find out how many homes the well serves</strong> today and how many it is permitted or designed to serve, then compare that to the well's yield.</li>
<li><strong>Review the well's ADWR records</strong> for depth, yield, and age, and ask when the pump was last replaced.</li>
<li><strong>Confirm the access easement</strong> if the wellhead is on someone else's parcel.</li>
<li><strong>Understand the cost split</strong> for power, maintenance, and the big-ticket replacement that will eventually come.</li>
<li><strong>Ask about water quality and treatment</strong>, since all users share the same source.</li>
</ol>
<h2>How Jematell Homes helps</h2>
<p>We build on rural and unserved lots where shared wells are common, so we can help you ask the right questions about a parcel's water arrangement, factor the shared-well terms into your planning, and coordinate the well, storage, and septic so they work together on the site. Because a shared well agreement is a legal document and water rights are technical, we point you to a qualified real estate attorney and to ADWR for formal review rather than offering legal conclusions, and we always confirm the current requirements with the local AHJ and your lender.</p>`,
  shortAnswer:
    "A shared well agreement is a recorded contract letting two or more parcels draw from one well, covering who may use it, how costs and maintenance are split, and access easements. Before relying on one, read the recorded agreement, check how many homes the well serves against its yield, and confirm lenders accept it. Have an attorney review it.",
  metaDescription:
    "What is a shared well agreement in Arizona? A recorded contract letting multiple parcels share one well. Check the recorded terms, the well's yield versus the number of homes, and access easements.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["shared-well", "well-agreement", "easement", "rural", "research-phase"],
  relatedFaqSlugs: [
    "how-much-does-it-cost-to-drill-a-well-in-arizona",
    "drilling-a-well-in-arizona-the-exempt-well-rule",
    "buying-raw-land-vs-a-finished-lot",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
  pillarBlogSlug:
    "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
  featured: false,
  sortOrder: 101,
}),
```

**Sources used**

- [1] A.R.S. 45-454, Exemption of certain wells — https://www.azleg.gov/ars/45/00454.htm
- [2] ADWR, Well Drilling in Arizona (well registration and records) — https://www.azwater.gov/permitting-wells/well-drilling-arizona

---

## 3 — How do I get power, propane, and internet to a rural lot?

```ts
item({
  slug: "getting-power-and-utilities-to-a-rural-lot",
  question: "How do I get power, propane, and internet to a rural lot?",
  answerHtml: `<p><strong>On a rural lot in our build area you usually cannot assume the utilities are at the property line. Electricity often has to be extended to the lot at the owner's cost, natural gas is frequently unavailable so homes run on propane, and internet comes from fixed wireless, satellite, or cellular rather than a guaranteed fiber connection.</strong> Confirming each of these before you buy, and budgeting for the gaps, is one of the most important parts of rural due diligence.</p>
<h2>Getting electric power to the lot</h2>
<p>In our area the electric provider is typically a utility such as APS or SRP, depending on the location. The key question is not just "is there power nearby" but "how far is the nearest service, and what will it cost to bring it to the building site." A lot a few hundred feet from existing lines is a very different proposition from one that needs a long line extension. Expect the process to involve:</p>
<ul>
<li><strong>A line-extension request</strong> to the utility, which studies the route and provides a cost estimate. Long extensions across desert terrain can be a major budget item, and the cost can fall on the owner.</li>
<li><strong>Trenching and conduit</strong> from the connection point to the home, plus any transformer the utility requires.</li>
<li><strong>Temporary construction power</strong>, since the crew needs electricity during the build. On very remote sites this can mean a generator until permanent service is energized.</li>
<li><strong>Easements</strong> if the line must cross neighboring parcels to reach yours.</li>
</ul>
<p>Because line extensions take time as well as money, start the conversation with the utility early. A long lead time on power can otherwise stall the whole project. Where extending the grid is impractical, some rural owners look at a solar-plus-battery system, which is a design decision to weigh against the extension cost rather than an automatic answer.</p>
<h2>Propane instead of natural gas</h2>
<p>Many rural lots have no natural gas service, so homes that want gas for cooking, heating, a water heater, or a pool use propane stored in an on-site tank. Planning for propane means:</p>
<ul>
<li><strong>Choosing a tank size</strong> suited to the home's appliances, with larger or buried tanks for higher demand.</li>
<li><strong>Siting the tank</strong> to meet required clearances from the house, property lines, and ignition sources, which is a code and safety question for the local AHJ.</li>
<li><strong>Lining up a propane supplier</strong> for the initial fill and ongoing deliveries, and understanding delivery access on the lot.</li>
<li><strong>Deciding between owning or leasing the tank</strong>, which affects upfront cost and which supplier you can buy from.</li>
</ul>
<p>Some homeowners skip gas entirely and design an all-electric home, which simplifies the lot but shifts demand onto the electric service you are already arranging. It is worth deciding gas versus all-electric early, because it touches both the propane plan and the size of the electric service.</p>
<h2>Internet and connectivity</h2>
<p>Reliable internet is no longer optional, and on a rural lot it rarely arrives by default. The realistic options are:</p>
<ul>
<li><strong>Fixed wireless</strong> from a regional provider, where a small antenna on the home receives a signal from a nearby tower. Availability depends on line of sight and coverage.</li>
<li><strong>Satellite internet</strong>, including low-earth-orbit services, which now reaches even very remote desert lots and has made off-grid connectivity far more workable than it was a few years ago.</li>
<li><strong>Cellular home internet</strong>, which can work well where carrier coverage is strong.</li>
<li><strong>Fiber or cable</strong>, which is the best option when it exists but is far from guaranteed on outlying parcels. Never assume it is available without checking each provider against the specific address.</li>
</ul>
<p>Check connectivity at the actual parcel, not the general area, because coverage can change street by street in the desert.</p>
<h2>A due-diligence checklist</h2>
<p>Before you commit to a rural lot, confirm in writing where possible:</p>
<ol>
<li>The distance to the nearest electric service and an estimate for extending it, including any easements.</li>
<li>Whether natural gas exists or whether you will plan for propane, and where a tank can legally sit.</li>
<li>Which internet options actually serve the address, tested or confirmed at the parcel.</li>
<li>How these utilities interact with your well, septic, and driveway plan, since they share the same site and trenches.</li>
</ol>
<h2>How Jematell Homes helps</h2>
<p>We build on rural and unserved lots throughout our area, so we can help you map out what each utility will take, coordinate the electric line extension and temporary construction power, plan the propane and the trenching alongside the well and septic, and sequence it all so the home is ready to occupy. Because providers, coverage, and costs vary by exact location and change over time, we confirm current availability and pricing with the relevant utilities and the local AHJ for your specific parcel rather than assuming what is at the line.</p>`,
  shortAnswer:
    "On a rural lot, do not assume utilities are at the line. Electricity often must be extended to the lot at the owner's cost through a utility like APS or SRP; natural gas is usually absent so homes run on propane stored in an on-site tank; and internet comes from fixed wireless, satellite, or cellular. Confirm each at the parcel and budget the gaps.",
  metaDescription:
    "How do you get power, propane, and internet to a rural Arizona lot? Electricity often needs a paid line extension, gas is usually propane in an on-site tank, and internet means fixed wireless, satellite, or cellular.",
  categorySlug: "water-septic-utilities",
  topicSlugs: ["rural-water-and-septic"],
  tags: ["utilities", "electric", "propane", "internet", "rural", "research-phase"],
  relatedFaqSlugs: [
    "can-i-build-without-city-water-or-sewer",
    "buying-raw-land-vs-a-finished-lot",
    "how-do-i-know-if-a-lot-is-buildable",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
  pillarBlogSlug: "rio-verde-arizona-utilities-water-infrastructure",
  featured: false,
  sortOrder: 102,
}),
```

**Sources used**

- [12] Maricopa County Planning & Development, Construction Permit Information (utility and site requirements) — https://www.maricopa.gov/1629/Construction-Permit-Information
- APS, Residential line extensions / new service — https://www.aps.com
- SRP, New residential service and line extensions — https://www.srpnet.com
- ADWR / general rural-lot utility due-diligence context (electric, propane, connectivity) cross-referenced with the content plan's Rio Verde utility sourcing [13][25]
