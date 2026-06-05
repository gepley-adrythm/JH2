# FAQ Drafts — Permits, Codes & Inspections (Batch 2026-06)

Category: `permits-and-codes` · Topic: `building-permits-arizona`

Four paste-ready `item({ ... })` blocks for the assembly task to merge into `lib/faq/src/seed.ts`. Do not hand-write the plain `answer` field; the `item()` helper derives it from `answerHtml` via `plain()`. Sort orders below start at 100 within this category; the assembly task finalizes contiguous numbering. NO em dashes, NO emojis. Every answer closes by reminding the reader to confirm specifics with the local Authority Having Jurisdiction (AHJ).

These four questions were confirmed non-duplicate against `CONTENT-INTENT-REGISTRY.md`. The permitting-timeline entry is deliberately framed as a cross-market comparison so it stays distinct from the live Scottsdale-only timeline page (`how-long-does-permitting-take-in-scottsdale`) and the live Pinal and unincorporated-county process pages.

---

## 1 — How long does permitting take across our markets?

```ts
item({
  slug: "how-long-does-permitting-take-across-our-markets",
  question:
    "How long does the building permit process take across the Phoenix metro and your other markets?",
  answerHtml: `<p><strong>Plan on roughly two to six months from a complete submittal to a permit in hand for a custom home, but the real number depends on which jurisdiction reviews your plans, how complete the first submittal is, and how many correction cycles it takes to clear plan review.</strong> Arizona has no statewide permit clock, so each city, town, and county runs its own queue. This page compares how the markets we build in tend to behave and what actually moves the timeline.</p>
<h2>Why there is no single answer</h2>
<p>Arizona is a home-rule state, so building regulation happens at the local level. What state law does require is transparency: under the licensing time-frame statutes (A.R.S. 9-835 for municipalities and A.R.S. 11-1605 for counties), each jurisdiction must publish the time frames it commits to for the administrative completeness check and the substantive review of a permit application. Those published windows are a useful planning tool, but they describe the agency's review time, not the calendar time you experience, which also includes your design team's turnaround on each round of corrections.</p>
<h2>How our markets tend to compare</h2>
<p>These are planning ranges as of June 2026, not guarantees. Confirm the current published time frames with the reviewing office for your parcel before you build a schedule around them.</p>
<ul>
<li><strong>City of Scottsdale.</strong> A mature, well-staffed department with an established online submittal process. A straightforward custom home often clears first review in a few weeks, but homes inside the Environmentally Sensitive Lands overlay (with native plant and natural area open space requirements) carry extra review layers that add time.</li>
<li><strong>City of Phoenix.</strong> High volume, but a deep department and online tools. First review of a custom home commonly lands in the few-week range, with self-certification paths available to design professionals for some project types that can shorten the cycle.</li>
<li><strong>Unincorporated Maricopa County (including Rio Verde Foothills).</strong> The county is the Authority Having Jurisdiction, and the building permit usually will not finalize until the septic (onsite wastewater) clearance and any well documentation are in place. Those supporting approvals, not the building plan check, are often the long pole.</li>
<li><strong>Pinal County, Casa Grande, and Apache Junction.</strong> Smaller departments and, on rural parcels, the same dependence on septic, well, and access approvals. Whether the city or the county is your AHJ is the first thing to settle, because each runs its own queue and fee schedule.</li>
</ul>
<h2>What actually moves the timeline</h2>
<p>The jurisdiction sets a baseline, but the things below decide whether you land at the fast or slow end of the range.</p>
<ol>
<li><strong>Submittal completeness.</strong> A complete first submittal with structural engineering, energy calculations, and a site and grading plan moves through review far faster than a thin package that draws a long correction letter.</li>
<li><strong>Number of correction cycles.</strong> Most custom homes go through at least one round of comments. Each round adds the agency's re-review time plus your team's turnaround. Two clean cycles beat four messy ones.</li>
<li><strong>Supporting approvals.</strong> Septic, well, floodplain use permits, grading, driveway or access permits, and HOA architectural review can each run on their own track and gate the building permit. On rural lots these usually dominate the schedule.</li>
<li><strong>Site complexity.</strong> Hillside lots, sensitive-lands overlays, floodplain, or special soils trigger additional studies and reviews that a flat, serviced infill lot never sees.</li>
</ol>
<h2>How Jematell Homes handles it</h2>
<p>Because we work across all of these jurisdictions, we confirm the AHJ and its published time frames for your parcel early, assemble a complete first submittal to minimize correction cycles, and sequence the septic, well, grading, and access approvals so they are not the thing that holds up the building permit. Published time frames, fees, and staffing all change, so we verify the current numbers with your reviewing office rather than relying on last year's experience. Always confirm the current permit time frames and submittal requirements with your local building department for your specific lot before committing to a schedule.</p>`,
  shortAnswer:
    "Expect roughly two to six months from a complete submittal to permit in hand, but it varies by jurisdiction. Arizona sets no statewide clock; each city and county publishes its own review time frames. Submittal completeness, correction cycles, and rural approvals like septic and wells move it most. Confirm current time frames with your AHJ.",
  metaDescription:
    "How long does a custom-home building permit take in Scottsdale, Phoenix, unincorporated Maricopa County, and Pinal County? A cross-market comparison and what moves the timeline.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["permits", "permit-timeline", "phoenix-metro", "plan-review", "research-phase"],
  relatedFaqSlugs: [
    "how-long-does-permitting-take-in-scottsdale",
    "how-permitting-works-in-pinal-county",
    "do-i-need-a-permit-in-unincorporated-maricopa-county",
    "which-building-code-edition-does-each-city-use",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "how-long-it-takes-to-build-a-custom-home-in-arizona",
  sortOrder: 100,
}),
```

**Sources used:**
- [A.R.S. 9-835] Municipal licensing time frames (administrative completeness + substantive review) — https://www.azleg.gov/ars/9/00835.htm
- [A.R.S. 11-1605] County licensing time frames — https://www.azleg.gov/ars/11/01605.htm
- [12] Maricopa County Planning & Development; Construction Permit Information — https://www.maricopa.gov/797/Planning-Development ; https://www.maricopa.gov/1629/Construction-Permit-Information
- [19] Pinal County, Applications & Information Bulletins — https://www.pinal.gov/191/Applications-Information-Bulletins
- [15] City of Scottsdale, Environmentally Sensitive Lands (ESL) Overlay — https://www.scottsdaleaz.gov/codes-and-ordinances/eslo

---

## 2 — Do my house plans need an engineer's or architect's stamp?

```ts
item({
  slug: "do-house-plans-need-an-engineer-or-architect-stamp",
  question: "Do my house plans need an engineer's or architect's stamp in Arizona?",
  answerHtml: `<p><strong>For a typical single-family home, Arizona law usually does not force you to hire a registered architect, thanks to a long-standing residential exemption in the state's registration statutes. A licensed engineer's stamp is a different story: the structural parts of your plans frequently need one, and whether that applies depends on your design, your soils, and the rules of the jurisdiction reviewing the project.</strong> The two questions, "do I need an architect" and "do I need an engineer," have different answers, so it helps to take them one at a time.</p>
<h2>The architect question</h2>
<p>Architects and engineers in Arizona are regulated by the State Board of Technical Registration under A.R.S. Title 32, Chapter 1. Those statutes include a residential exemption that allows plans for certain one- and two-family dwellings to be prepared without a registered architect's seal. In practice this is why many custom homes are designed by a residential designer or a design-build builder rather than a licensed architect. The exemption is specific, however, and it does not switch off other requirements, so it is not a blanket "no professional needed" rule.</p>
<h2>The engineer question</h2>
<p>Structural design is where a stamp most often becomes mandatory. The International Residential Code (IRC) provides prescriptive paths that a designer can follow for conventional construction, but the moment a design steps outside those prescriptive limits, an engineered, stamped design is required. Common triggers in our markets include:</p>
<ul>
<li><strong>Soils.</strong> Caliche, expansive clay, collapsible soils, or a poor geotechnical report push the foundation into engineered territory. A soils report routinely drives a stamped foundation design.</li>
<li><strong>Spans, openings, and loads.</strong> Long spans, large window and door openings, tall walls, and heavy roof loads can exceed the prescriptive tables and need engineering.</li>
<li><strong>Lateral design.</strong> Wind bracing and seismic detailing beyond the prescriptive provisions require an engineer.</li>
<li><strong>Site conditions.</strong> Hillside lots, retaining walls above a threshold height, and post-tensioned slabs are typically engineered and stamped.</li>
</ul>
<p>Separately, manufactured components such as roof and floor trusses arrive with their own engineered, stamped shop drawings from the supplier, which the building department reviews alongside your plans.</p>
<h2>Why the jurisdiction still matters</h2>
<p>Even where state law exempts the architect, the local building department sets submittal requirements and decides what it will accept. Some jurisdictions require a stamped structural package for any custom home; others accept prescriptive IRC framing for simple designs. Overlays such as hillside or sensitive-lands districts can add their own engineering and reporting requirements. The only reliable way to know what your reviewer expects is to ask before you finalize the construction documents.</p>
<h2>What this means for your project</h2>
<p>For most of the homes we build, the practical answer is that a registered architect is optional but a structural engineer's involvement is likely, because Arizona desert soils and modern open designs routinely push the structure past the prescriptive code paths. Budgeting for a geotechnical report and a structural engineer up front avoids a mid-review surprise when a plan checker asks for a stamp you did not plan for.</p>
<h2>How Jematell Homes handles it</h2>
<p>We confirm which professional stamps your specific design and jurisdiction require before drawings are finalized, coordinate the geotechnical report and structural engineering so the foundation matches your soils, and submit a package the building department can approve without chasing missing seals. Because registration rules and local submittal standards change, we verify the current requirements with the Arizona Board of Technical Registration and your local building department for your specific lot. Always confirm what stamps your plans need with your local Authority Having Jurisdiction before you submit.</p>`,
  shortAnswer:
    "Usually a registered architect is optional for a single-family home under Arizona's residential exemption, but a licensed engineer's stamp is often required for the structure. Expansive or caliche soils, long spans, tall walls, and hillside sites push the design past prescriptive code and trigger stamped engineering. Confirm exact requirements with your AHJ and the Board of Technical Registration.",
  metaDescription:
    "Do Arizona house plans need an architect's or engineer's stamp? An architect is often optional under the residential exemption, but structural engineering is frequently required.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["plans", "structural-engineering", "architect", "btr", "research-phase"],
  relatedFaqSlugs: [
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "do-i-need-a-soils-or-geotechnical-report",
    "which-building-code-edition-does-each-city-use",
    "what-inspections-happen-during-a-custom-home-build",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "what-custom-home-builders-need-from-you-before-the-first-design-meeting",
  sortOrder: 101,
}),
```

**Sources used:**
- [A.R.S. Title 32, Ch. 1] State Board of Technical Registration; registration and exemptions — https://www.azleg.gov/arsDetail/?title=32 ; A.R.S. 32-143 (exemptions) — https://www.azleg.gov/ars/32/00143.htm
- [BTR] Arizona Board of Technical Registration — https://btr.az.gov/
- [29] 2024 IRC, prescriptive vs engineered design and foundations (ICC Digital Codes) — https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations/IRC2024P2-Pt03-Ch04-SecR401.3
- [22] Arizona Geological Survey, soils and geohazards context — https://azgs.arizona.edu/geohazards/arizona-geohazards-resources/earth-fissures-subsidence

---

## 3 — What is a certificate of occupancy and how do I get one?

```ts
item({
  slug: "what-is-a-certificate-of-occupancy-and-how-do-i-get-one",
  question: "What is a certificate of occupancy and how do I get one?",
  answerHtml: `<p><strong>A certificate of occupancy (CO) is the building official's written confirmation that your finished home was built to the code it was permitted under and is legally safe to live in. You get one by passing every required final inspection. Once the building final and the final electrical, plumbing, and mechanical inspections all pass, the jurisdiction issues the certificate, and that document is your green light to move in.</strong> Until it is issued, the home is not legally occupiable, even if it looks done.</p>
<h2>What the certificate actually means</h2>
<p>Under the International Residential Code (IRC R110) and the parallel building-code provisions most Arizona jurisdictions adopt, a building cannot be used or occupied until the building official issues a certificate of occupancy. The certificate ties the completed structure back to the approved plans and the code edition in force when the permit was issued. It is both a safety document and a legal one: lenders, insurers, and future buyers may ask to see it, so it matters well beyond move-in day.</p>
<h2>How you earn it, step by step</h2>
<ol>
<li><strong>Complete the work to the approved plans.</strong> The finished home has to match what was permitted. Any field changes should already be on file as approved revisions.</li>
<li><strong>Pass the trade finals.</strong> Final electrical, plumbing, and mechanical inspections confirm those systems are complete and working.</li>
<li><strong>Pass any project-specific finals.</strong> If the project includes a pool, perimeter or retaining walls, or a solar array, those carry their own inspections that must clear too.</li>
<li><strong>Pass the building final.</strong> This is the comprehensive last inspection of the whole home: life-safety items, egress, smoke and carbon-monoxide alarms, grading and drainage, and the overall match to the approved plans.</li>
<li><strong>Receive the certificate.</strong> When the building final passes, the jurisdiction issues the CO (or records final approval). That is the moment the home is legal to occupy.</li>
</ol>
<h2>Temporary certificates of occupancy</h2>
<p>If the home is safe to live in but a few non-critical items remain (a punch-list item, final landscaping, or a detail awaiting a part), some jurisdictions issue a temporary certificate of occupancy (TCO). A TCO lets you move in while you finish the listed items by a deadline, after which the full CO is issued. Whether a TCO is available, and on what terms, is entirely up to the building official.</p>
<h2>A note on how it is documented</h2>
<p>The exact paperwork varies by jurisdiction. Some issue a formal, separate certificate of occupancy document for every home. Others, for one- and two-family dwellings, record a passed building final as "final approval" that functions as the occupancy clearance rather than printing a distinct certificate. Either way, the principle is the same: do not move in, and do not let utilities go to permanent service, until the building official has signed off. If you ever need proof of occupancy later and are not sure what your jurisdiction issued, the building department can tell you what document to request.</p>
<h2>How Jematell Homes handles it</h2>
<p>We manage the home to a clean final inspection: keeping the approved plans and any revisions current on site, scheduling the trade and building finals in the right order, and clearing punch-list items so the building official can issue your certificate without a second trip. If a temporary certificate is the right call to let you move in on time, we coordinate that and the remaining work to closeout. Because each jurisdiction names and documents this step differently, we confirm the exact occupancy requirements with your local Authority Having Jurisdiction for your specific permit before you plan a move-in date.</p>`,
  shortAnswer:
    "A certificate of occupancy is the building official's confirmation that your finished home meets code and is legal to live in. You earn it by passing every final inspection, the trade finals plus the building final. Some homes get a temporary certificate to move in while minor items finish. Never occupy before it is issued; confirm requirements with your AHJ.",
  metaDescription:
    "What is a certificate of occupancy and how do you get one in Arizona? It is the building official's sign-off that your home is code-compliant and legal to occupy after final inspections.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["certificate-of-occupancy", "inspections", "final-inspection", "move-in", "research-phase"],
  relatedFaqSlugs: [
    "what-inspections-happen-during-a-custom-home-build",
    "can-i-live-on-site-in-an-rv-while-building",
    "do-i-need-a-permit-to-build-in-maricopa-county",
    "how-long-does-permitting-take-across-our-markets",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
  sortOrder: 102,
}),
```

**Sources used:**
- [29] 2024 IRC R110, Certificate of Occupancy, and the IRC inspection framework (ICC Digital Codes) — https://codes.iccsafe.org/s/IRC2024P2
- [12] Maricopa County, Construction Permit Information (final inspection / occupancy process) — https://www.maricopa.gov/1629/Construction-Permit-Information
- [30] City of Scottsdale, Planning & Development (inspection and occupancy process) — https://www.scottsdaleaz.gov/planning-development

---

## 4 — Can I live in an RV or temporary structure on my lot while I build?

```ts
item({
  slug: "can-i-live-on-site-in-an-rv-while-building",
  question: "Can I live in an RV or temporary structure on my lot while I build?",
  answerHtml: `<p><strong>Often yes, but only with permission and conditions. Many Arizona jurisdictions, especially in unincorporated county areas, allow you to live in a recreational vehicle on your own lot temporarily while you have an active building permit, provided you get a temporary use permit, arrange approved water and sewage, and remove the RV once your certificate of occupancy is issued. Cities tend to be stricter, and a few prohibit it outright.</strong> It is a zoning and health question as much as a building one, so it is worth settling before you buy or move a trailer onto the land.</p>
<h2>It comes down to your jurisdiction's zoning rules</h2>
<p>Whether you can camp on your lot during construction is governed by the local zoning ordinance, not the building code, and the answer varies sharply by jurisdiction. Unincorporated Maricopa County and Pinal County both have provisions that allow temporary occupancy of an RV or similar unit on a parcel during active construction, tied to a permit and a time limit. Inside city limits, the rules are usually tighter; some cities allow it as a narrow construction exception, while others do not permit anyone to live in an RV as a residence at all. The first step is to confirm which jurisdiction governs your lot and read its specific temporary-occupancy rule.</p>
<h2>The conditions you should expect</h2>
<p>Where it is allowed, approval almost always comes with strings attached. Plan for some combination of the following:</p>
<ul>
<li><strong>An active building permit.</strong> Temporary occupancy is permitted because you are building, so it is generally tied to a live, in-progress permit. If the build stalls, the permission can lapse.</li>
<li><strong>A temporary use or temporary occupancy permit.</strong> This is a separate approval from your building permit, with its own application and fee.</li>
<li><strong>Approved sewage disposal.</strong> You cannot simply dump waste on the ground. Expect to need an approved method, such as connection to a permitted septic system, an approved holding tank that is regularly pumped, or another method the county environmental office accepts under Arizona Department of Environmental Quality standards.</li>
<li><strong>Potable water.</strong> A safe drinking-water source, whether a permitted well, a water provider, or a hauled-water arrangement to an approved tank.</li>
<li><strong>A time limit.</strong> Permission is temporary and usually capped, sometimes renewable while the permit stays active, and the RV must be removed at or before the certificate of occupancy is issued.</li>
<li><strong>No permanent connections.</strong> The RV is treated as temporary, so permanent utility hookups intended for a dwelling are typically not allowed.</li>
</ul>
<h2>HOA and deed restrictions can override it</h2>
<p>Even where the jurisdiction allows it, a homeowners association or recorded deed restriction can prohibit living in an RV on the lot, including during construction. If your parcel is in an HOA or has CC&Rs, check those documents before you count on the zoning answer, because private restrictions can be stricter than the public code.</p>
<h2>Why people do it, and the trade-offs</h2>
<p>Living on site during a build can save on rent, shorten commutes for an owner-builder, and let you keep an eye on the project. The trade-offs are the setup cost and effort of approved water and sewage, the permit and its conditions, and the reality that desert sites can be hot, dusty, and active construction zones. It works best on rural acreage where the county allows it and the lot has room, and it is rarely practical on a tight city infill lot.</p>
<h2>How Jematell Homes handles it</h2>
<p>If living on your lot during construction is part of your plan, we help you confirm whether your jurisdiction allows it, identify the temporary use permit and the approved water and sewage arrangements you will need, and coordinate the timing so the RV is sited and removed in step with the build and your certificate of occupancy. Because zoning rules, health requirements, and time limits differ by jurisdiction and change over time, we verify the current rules with your county or city planning and environmental offices for your specific parcel. Always confirm temporary-occupancy rules with your local Authority Having Jurisdiction, your county environmental office, and any HOA before you move onto the land.</p>`,
  shortAnswer:
    "Often yes in unincorporated county areas, with limits. You typically need an active building permit, a temporary use permit, approved water and sewage, and you must remove the RV by the time the certificate of occupancy is issued. Cities are stricter and some prohibit it; HOAs and deed restrictions can override the zoning. Confirm with your AHJ before moving on.",
  metaDescription:
    "Can you live in an RV on your lot while building a home in Arizona? Often yes in county areas with a temporary use permit and approved water and sewage, but cities and HOAs may say no.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["rv", "temporary-occupancy", "zoning", "owner-builder", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-permit-in-unincorporated-maricopa-county",
    "what-is-a-certificate-of-occupancy-and-how-do-i-get-one",
    "how-do-septic-systems-work-for-a-new-home",
    "can-i-build-a-casita-or-adu",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "building-on-your-own-lot-arizona",
  sortOrder: 103,
}),
```

**Sources used:**
- [12] Maricopa County Planning & Development; zoning ordinance and temporary use provisions — https://www.maricopa.gov/797/Planning-Development
- [19] Pinal County, Community Development; applications and information bulletins — https://www.pinal.gov/191/Applications-Information-Bulletins
- [14] Maricopa County, Onsite Wastewater (septic / holding-tank approval) — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications
- [9] ADEQ, Onsite Wastewater Treatment Program — https://azdeq.gov/da/osww
