# FAQ Drafts — Permits, Codes & Inspections (Section A)

Category: `permits-and-codes` · Topic: `building-permits-arizona`

Five paste-ready `item({ ... })` blocks (A1-A5) for the assembly task to merge into `lib/faq/src/seed.ts`. Do not hand-write the plain `answer` field; the `item()` helper derives it from `answerHtml` via `plain()`. Sort orders below continue after the three live permits-and-codes items (which use 1-3); the assembly task may renumber.

---

## A1 — Which building code edition each city in our build area uses

```ts
item({
  slug: "which-building-code-edition-does-each-city-use",
  question: "Which building code edition does each city in your build area use?",
  answerHtml: `<p><strong>There is no single answer, because Arizona has no mandatory statewide building code. Each city, town, and county adopts its own edition of the International Codes (I-Codes) on its own schedule, so the exact edition that governs your home depends on which jurisdiction your parcel sits in.</strong> This page is a snapshot of how adoption works across the markets we build in, and why two lots a short drive apart can be held to different editions.</p>
<h2>Why adoption is local, not statewide</h2>
<p>Arizona is a "home rule" state. Rather than one office publishing a code for the whole state, the legislature leaves building regulation to local governments. Each jurisdiction adopts a base edition of the International Residential Code (IRC) for one- and two-family homes, usually alongside companion codes such as the International Building Code, the International Energy Conservation Code, and the National Electrical Code, then layers on local amendments. The result is a patchwork: the edition in force is a local decision that changes whenever a council or board votes to update it.</p>
<h2>How the markets we build in line up (as of June 2026)</h2>
<p>Use these as a research starting point, not a guarantee. Adopted editions move, so the only reliable figure is the one the Authority Having Jurisdiction (AHJ) confirms for your specific parcel on the day you submit.</p>
<ul>
<li><strong>City of Phoenix</strong> adopted the 2024 I-Codes through the Phoenix Building Construction Code (PBCC), effective August 1, 2025. This put Phoenix on the most current published edition of the IRC and its companion codes, with the city's own amendments.</li>
<li><strong>Unincorporated Maricopa County</strong> (which includes much of Rio Verde Foothills) builds to an earlier edition of the IRC with regional amendments, and the county updates on its own timeline rather than matching any one city.</li>
<li><strong>Scottsdale, Cave Creek, Fountain Hills, and Carefree</strong> each adopt and amend their own editions through their building departments, and several pair the base code with local overlays (hillside, environmentally sensitive lands, desert-character and dark-sky standards) that function like additional rules on top of the I-Codes.</li>
<li><strong>Casa Grande and Apache Junction</strong> sit in Pinal County. Inside city limits the city is the AHJ and adopts its own edition; just outside, Pinal County Community Development is the AHJ and adopts separately. Confirming whether the city or the county governs your lot is step one in those markets.</li>
</ul>
<h2>Why the edition matters to your design</h2>
<p>Each new I-Code cycle can change real, cost-bearing requirements: energy and insulation minimums, foundation and bracing details, electrical provisions, and safety items such as pool barriers. A home designed to the 2018 IRC is not automatically compliant under the 2024 IRC, so the edition determines what your engineer details and what plan reviewers will check. In the desert, the amendments that most often differ between jurisdictions address soils and foundations, energy and cooling, stormwater and monsoon drainage, and pool and wall standards.</p>
<h2>How Jematell Homes handles it</h2>
<p>We work across all of these jurisdictions, so before design starts we confirm the adopted edition and the local amendments in force for your parcel, then detail the home to that exact standard and carry it through plan review. Because adoption changes by vote and on each jurisdiction's own schedule, we verify the current edition with your AHJ rather than relying on last year's rules. Always confirm the governing edition and amendments with your local building department for your specific lot before you commit to a design.</p>`,
  shortAnswer:
    "It varies by jurisdiction, because Arizona has no statewide building code. Each city and county adopts its own edition of the International Residential Code on its own schedule. Phoenix adopted the 2024 I-Codes effective August 2025, while unincorporated Maricopa County uses an earlier edition. Always confirm the current edition with your AHJ.",
  metaDescription:
    "Which building code edition applies in Scottsdale, Phoenix, Rio Verde, Cave Creek, and our other build markets? Arizona has no statewide code, so each jurisdiction adopts its own.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["building-codes", "irc", "code-adoption", "phoenix-metro", "research-phase"],
  relatedFaqSlugs: [
    "what-building-codes-apply-to-a-new-home-in-arizona",
    "do-i-need-a-permit-in-unincorporated-maricopa-county",
    "how-permitting-works-in-pinal-county",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "how-to-build-a-custom-home",
  featured: false,
  sortOrder: 4,
}),
```

**Sources used:**
- [11] City of Phoenix, 2024 IRC amendments (PBCC) — https://www.phoenix.gov/content/dam/phoenix/pddsite/documents/codes-ordinances/amendmentcodes/2024-irc.pdf ; ICC adoption notice — https://www.iccsafe.org/about/periodicals-and-newsroom/city-of-phoenix-strengthens-building-safety-and-accessibility-by-adopting-the-2024-international-codes/
- [16] Town of Cave Creek, Ordinances & Guidelines — https://www.cavecreekaz.gov/336/Ordinances-Guidelines ; Building Regulations Ch.151 — https://codelibrary.amlegal.com/codes/cavecreek/latest/cavecreek_az/0-0-0-27847
- [17] Town of Carefree, Building — https://www.carefree.org/151/Building ; Ordinances — https://www.carefree.org/163/Ordinances
- [21] Apache Junction, Building Permits — https://www.apachejunctionaz.gov/622/Permits ; Work Exempt from Permits — https://www.apachejunctionaz.gov/DocumentCenter/View/26933/Work-Exempt-from-Permits

---

## A2 — Do I need a permit in unincorporated Maricopa County (Rio Verde Foothills)?

```ts
item({
  slug: "do-i-need-a-permit-in-unincorporated-maricopa-county",
  question:
    "Do I need a permit to build in unincorporated Maricopa County, like Rio Verde Foothills?",
  answerHtml: `<p><strong>Yes. A new home on unincorporated land needs a building permit, and your Authority Having Jurisdiction is the Maricopa County Planning and Development Department, not a city. On most rural parcels the county also requires a separate septic (onsite wastewater) clearance from County Environmental Services before the building permit will release.</strong> Rio Verde Foothills is the classic example: it looks like a community, but it is unincorporated county land with no city hall of its own.</p>
<h2>The county, not a city, is in charge</h2>
<p>Because Rio Verde Foothills and similar areas sit outside any incorporated city or town, there is no municipal building department to issue permits. Maricopa County Planning and Development reviews the plans, issues the permit, and performs inspections under the county's adopted code and amendments. That distinction matters: the county's submittal requirements, fee schedule, and review timelines are its own, and they differ from how Scottsdale or Phoenix run their process. Confirming that your parcel is genuinely unincorporated, rather than inside a nearby city's limits, is the first thing to settle.</p>
<h2>Septic clearance comes before the building permit</h2>
<p>Most unincorporated lots have no sewer, so the home is served by an onsite wastewater (septic) system. Maricopa County Environmental Services reviews and permits that system under Arizona Department of Environmental Quality (ADEQ) standards, and the county generally wants the septic side approved before it finalizes the building permit. The septic review typically depends on a site evaluation and a percolation or soil-absorption test, which take time and have to be scheduled early. If the well, septic, and grading approvals are not sequenced up front, they become the bottleneck that holds up the whole project.</p>
<h2>The permits a rural build typically needs</h2>
<ul>
<li><strong>Building permit</strong> for the house, covering its structural, electrical, plumbing, and mechanical work.</li>
<li><strong>Septic / onsite wastewater permit</strong> from County Environmental Services, often a prerequisite to releasing the building permit.</li>
<li><strong>Well permit or Notice of Intent to Drill</strong> filed with the Arizona Department of Water Resources (ADWR) if you supply your own water, or documentation of a hauled-water arrangement.</li>
<li><strong>Grading and drainage permit</strong> when the site needs earthwork, retention, or sits on a slope.</li>
<li><strong>Driveway or access permit</strong> for a new connection to a county road.</li>
</ul>
<h2>Why this surprises buyers</h2>
<p>People assume "no city" means fewer rules. In practice the county process can involve more moving parts than a finished city lot, because the buyer is also standing up water and wastewater infrastructure that a serviced lot already has. The upside is space and flexibility; the trade-off is that due diligence on water, septic feasibility, and access has to happen before you buy, not after.</p>
<h2>How Jematell Homes handles it</h2>
<p>We build regularly on unincorporated land in and around Rio Verde Foothills, so we confirm jurisdiction, line up the septic site evaluation and well or hauled-water plan early, and run the county building permit and its supporting approvals in the right order. Because the county updates its requirements, fees, and timelines periodically, we verify the current process directly with Maricopa County Planning and Development and Environmental Services for your specific parcel before committing to a schedule.</p>`,
  shortAnswer:
    "Yes. On unincorporated land like Rio Verde Foothills, Maricopa County Planning and Development is your permitting authority, not a city. You also need a septic clearance from County Environmental Services, which usually must be approved before the building permit releases. Confirm jurisdiction and septic feasibility before you buy.",
  metaDescription:
    "Building in unincorporated Maricopa County or Rio Verde Foothills? The county is your permitting authority and septic clearance is required before the building permit releases.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["permits", "maricopa-county", "rio-verde", "unincorporated", "septic", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-permit-to-build-in-maricopa-county",
    "how-do-septic-systems-work-for-a-new-home",
    "which-building-code-edition-does-each-city-use",
  ],
  relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
  pillarBlogSlug: "building-a-custom-home-in-rio-verde-az-what-to-know-before-you-start",
  featured: false,
  sortOrder: 5,
}),
```

**Sources used:**
- [12] Maricopa County Planning & Development — https://www.maricopa.gov/797/Planning-Development ; Construction Permit Information — https://www.maricopa.gov/1629/Construction-Permit-Information
- [13] Maricopa County, Rio Verde Foothills Area Plan — https://www.maricopa.gov/ArchiveCenter/ViewFile/Item/6087
- [14] Maricopa County, Onsite Wastewater Forms / Applications — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications

---

## A3 — How permitting works in Pinal County (Casa Grande, Apache Junction edges)

```ts
item({
  slug: "how-permitting-works-in-pinal-county",
  question:
    "How does building permitting work in Pinal County, around Casa Grande and Apache Junction?",
  answerHtml: `<p><strong>In Pinal County the first question is always the same: is your lot inside a city or in unincorporated county land? Inside Casa Grande or Apache Junction city limits, the city is your Authority Having Jurisdiction. Just outside, Pinal County Community Development issues the permit. The two run separate processes, fees, and adopted codes.</strong> Because these markets straddle that line, getting jurisdiction right up front prevents weeks of wasted effort.</p>
<h2>City limits versus unincorporated county</h2>
<p>Casa Grande and Apache Junction are incorporated cities with their own building departments. If your parcel is inside city limits, you apply to the city, build to the city's adopted code, and the city inspects. If your parcel is in the unincorporated areas around those cities, Pinal County Community Development is the AHJ, with its own application packet, code edition, and review queue. A parcel can sit a few hundred feet outside a city boundary and fall entirely under the county, so confirm the boundary with the jurisdiction or the county assessor before you design.</p>
<h2>The Pinal County process at a glance</h2>
<ol>
<li><strong>Pre-application and zoning check.</strong> Confirm the parcel's zoning allows a single-family home and review setbacks, height, and any overlays.</li>
<li><strong>Application packet.</strong> The county building permit application is submitted with construction documents, structural engineering, energy calculations, and a site and grading plan. Pinal County publishes the application form and information bulletins that spell out exactly what each submittal must include.</li>
<li><strong>Plan review.</strong> Reviewers return comments; your team resubmits. Most custom homes go through more than one correction cycle.</li>
<li><strong>Supporting approvals.</strong> Rural parcels typically also need septic (onsite wastewater) and well approvals, plus access and grading permits, several of which should be sequenced before the building permit finalizes.</li>
<li><strong>Permit issuance and inspections.</strong> Fees are paid, the permit releases, and the county inspects at the standard milestones through to a certificate of occupancy.</li>
</ol>
<h2>Exemptions and small structures</h2>
<p>Like most jurisdictions, Pinal County exempts certain minor work from a permit (small detached accessory structures under a size threshold, for example), but a new dwelling never qualifies. The published information bulletins are the place to confirm what is and is not exempt, because the thresholds are specific and change. When in doubt, treat the work as permit-required and ask.</p>
<h2>Water and land considerations unique to this area</h2>
<p>Pinal County sits in a part of the state where water provider approval and groundwater conditions deserve early attention, and where earth fissures and land subsidence appear on some parcels. Those are due-diligence items to verify before purchase rather than permitting steps, but they can shape where and how the home is sited, so they belong in the conversation alongside the permit process.</p>
<h2>How Jematell Homes handles it</h2>
<p>We confirm whether the city or the county is your AHJ, assemble the correct application packet for that office, and carry the plan-review cycles and supporting approvals in order. Because Pinal County and its cities update their adopted codes, fees, and processing times periodically, we verify the current requirements directly with the governing office for your specific parcel before committing to a schedule. Always confirm jurisdiction and current requirements with your local building department or Pinal County Community Development.</p>`,
  shortAnswer:
    "It depends on whether your lot is inside a city or in unincorporated county. Inside Casa Grande or Apache Junction, the city permits and inspects; just outside, Pinal County Community Development is the authority. Each has its own application packet, adopted code, and fees, so confirm jurisdiction before you design.",
  metaDescription:
    "How building permits work in Pinal County around Casa Grande and Apache Junction: when the city is the authority, when Pinal County Community Development is, and what the process involves.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["permits", "pinal-county", "casa-grande", "apache-junction", "process", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-permit-in-unincorporated-maricopa-county",
    "which-building-code-edition-does-each-city-use",
    "what-inspections-happen-during-a-custom-home-build",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug:
    "building-a-custom-home-outside-the-city-benefits-of-the-phoenix-metros-outlying-areas",
  featured: false,
  sortOrder: 6,
}),
```

**Sources used:**
- [19] Pinal County, Building Permit Application — https://www.pinal.gov/DocumentCenter/View/460/Building-Permit-Application-PDF ; Applications & Information Bulletins — https://www.pinal.gov/191/Applications-Information-Bulletins
- [21] Apache Junction, Building Permits — https://www.apachejunctionaz.gov/622/Permits ; Work Exempt from Permits — https://www.apachejunctionaz.gov/DocumentCenter/View/26933/Work-Exempt-from-Permits

---

## A4 — What inspections happen during a custom-home build (and in what order)

```ts
item({
  slug: "what-inspections-happen-during-a-custom-home-build",
  question: "What inspections happen during a custom-home build, and in what order?",
  answerHtml: `<p><strong>After your permit is issued, the building department inspects the work at a series of milestones, roughly in the order the house is built: site and footings first, then foundation, then framing and the rough-in of electrical, plumbing, and mechanical, then insulation, and finally the systems and the whole home at completion.</strong> Each inspection has to pass before the next phase of work can be covered up, so inspections set the rhythm of the schedule.</p>
<h2>Why the sequence exists</h2>
<p>Inspections follow the International Residential Code (IRC) logic of checking work while it is still visible. Once concrete is poured or drywall goes up, the work behind it cannot be seen, so the code requires an inspection at each "cover-up" point. Passing an inspection is the green light to proceed; a failed one means corrections before work continues. The exact list and the names vary by jurisdiction, but the backbone below is standard across Arizona.</p>
<h2>The typical inspection sequence</h2>
<ol>
<li><strong>Setbacks / site and temporary power.</strong> Some jurisdictions verify the building location and erosion or dust controls before work begins.</li>
<li><strong>Footing / foundation.</strong> Trenches, reinforcing steel, and forms are checked before concrete is placed. On many lots a separate slab or stem-wall inspection follows.</li>
<li><strong>Underground rough-in.</strong> Under-slab plumbing and any underground electrical are inspected before the slab is poured.</li>
<li><strong>Framing.</strong> The structural frame, sheathing, and connectors are inspected once the roof is on and the structure is "dried in," typically alongside or just after the rough-ins.</li>
<li><strong>Rough-in: electrical, plumbing, mechanical.</strong> Wiring, pipes, and ductwork are checked while the walls are open. These are often inspected together at the same stage.</li>
<li><strong>Insulation.</strong> Inspected after rough-ins pass and before drywall covers the walls, confirming the energy-code requirements are met.</li>
<li><strong>Final inspections.</strong> Electrical, plumbing, mechanical, and a building final confirm the completed systems and the whole home. If a pool, wall, or solar array is part of the project, those carry their own inspections.</li>
</ol>
<h2>From final inspection to move-in</h2>
<p>When the building final passes, the jurisdiction issues a <strong>certificate of occupancy</strong> (or a temporary CO in some cases), which is the legal clearance to move in. A home should never be occupied before that document is in hand, because it confirms the house met the code it was permitted under.</p>
<h2>What causes failed or delayed inspections</h2>
<ul>
<li>Requesting an inspection before the work is actually ready.</li>
<li>Work that deviates from the approved plans without a revision on file.</li>
<li>Missing access, ladders, or labeling the inspector needs to do the job.</li>
<li>Trades scheduled out of sequence so a cover-up happens before its inspection.</li>
</ul>
<h2>How Jematell Homes handles it</h2>
<p>As your project manager and general contractor, we schedule every inspection, make sure each phase is genuinely ready, keep the approved plans and any revisions current on site, and coordinate the trades so nothing gets covered before it is signed off. That keeps the sequence moving and avoids the re-inspection delays that stall a schedule. Because each jurisdiction names and sequences its inspections a little differently, we confirm the exact required list with your Authority Having Jurisdiction for your specific permit.</p>`,
  shortAnswer:
    "After your permit issues, the building department inspects at milestones in build order: footings and foundation, framing, the electrical, plumbing, and mechanical rough-ins, insulation, then final inspections. Each must pass before work is covered up. A passing building final earns the certificate of occupancy that clears the home for move-in.",
  metaDescription:
    "What inspections happen during a custom-home build, in what order: footings, foundation, framing, MEP rough-in, insulation, and finals through to the certificate of occupancy.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["inspections", "irc", "construction-process", "certificate-of-occupancy", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-permit-to-build-in-maricopa-county",
    "how-long-does-permitting-take-in-scottsdale",
    "which-building-code-edition-does-each-city-use",
  ],
  relatedServiceSlugs: ["custom-homes"],
  pillarBlogSlug: "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
  featured: false,
  sortOrder: 7,
}),
```

**Sources used:**
- [29] 2024 IRC R401.3 and the IRC inspection framework (ICC Digital Codes) — https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations/IRC2024P2-Pt03-Ch04-SecR401.3

---

## A5 — The dust-control rule every Valley construction site must follow

```ts
item({
  slug: "what-is-the-dust-control-rule-for-valley-construction-sites",
  question: "What dust-control rules apply to a construction site in the Phoenix metro?",
  answerHtml: `<p><strong>Most of the Phoenix metro sits in a federally designated dust ("PM-10") nonattainment area, so earth-moving on a construction site is regulated by the Maricopa County Air Quality Department (MCAQD) under Rule 310. Larger sites need a dust-control permit and a written plan, and the people directing the work must complete dust-control training before disturbing the ground.</strong> It is one of the first compliance steps on any Valley build that involves grading or excavation.</p>
<h2>Why the Valley regulates dust</h2>
<p>Fine airborne dust, measured as PM-10, is both a health concern and a federal air-quality issue in Maricopa County. To meet Clean Air Act standards, the county adopted Rule 310 to limit "fugitive dust," the dust kicked up by grading, trenching, hauling, and vehicle traffic on disturbed ground. The rule applies broadly to construction and earth-moving, which means a custom-home site that moves dirt is squarely within its scope.</p>
<h2>What Rule 310 requires</h2>
<ul>
<li><strong>A dust-control permit</strong> from MCAQD for projects that disturb at or above the rule's size threshold. The permit is separate from the building permit and is obtained from the air-quality department, not the building department.</li>
<li><strong>A dust-control plan</strong> describing the specific measures the site will use to keep dust down.</li>
<li><strong>Dust-control training.</strong> At least one person responsible for the work must complete MCAQD's training and hold a current certificate, so someone on site understands and can implement the rule.</li>
<li><strong>Active control measures</strong> during work, such as applying water or approved suppressants to disturbed soil and haul routes, stabilizing graded areas, limiting track-out of mud and dirt onto public roads, and managing vehicle speed on the site.</li>
<li><strong>Recordkeeping</strong> demonstrating the measures were actually applied, since the department inspects and can issue notices of violation.</li>
</ul>
<h2>Small lots and the size threshold</h2>
<p>Not every project triggers a full permit. Rule 310 sets a disturbed-area threshold, and smaller single-lot work can fall under lighter requirements, but the obligation to control dust still applies even when a permit is not required. Because the threshold and the exact obligations are specific and can change, confirm with MCAQD whether your particular site needs a permit, a plan, and a trained operator before any dirt moves.</p>
<h2>Why it matters to your schedule and budget</h2>
<p>Dust compliance is not just paperwork. Water trucks, soil stabilizers, track-out control, and the trained personnel to run them are real line items, and a stop-work order or violation for uncontrolled dust can halt the project and add cost. Building the dust-control plan into the site work from day one is far cheaper than reacting to a complaint or an inspection.</p>
<h2>How Jematell Homes handles it</h2>
<p>For projects in Maricopa County, we make sure the dust-control permit and plan are in place where the site requires them, that a trained operator is on the job, and that the control measures run throughout grading and construction. Because MCAQD updates Rule 310's thresholds and procedures over time, and because Pinal County administers its own dust requirements, we confirm the current rules with the governing air-quality authority for your specific site before earth-moving begins.</p>`,
  shortAnswer:
    "Most of the Phoenix metro is a federal dust nonattainment area, so earth-moving is governed by Maricopa County Air Quality Department Rule 310. Larger sites need a dust-control permit, a written plan, and a trained operator, plus active measures like watering disturbed soil. Confirm whether your site needs a permit with MCAQD.",
  metaDescription:
    "Dust-control rules for Phoenix-area construction: Maricopa County Rule 310 requires a permit, a dust-control plan, and trained operators for earth-moving on most sites.",
  categorySlug: "permits-and-codes",
  topicSlugs: ["building-permits-arizona"],
  tags: ["dust-control", "rule-310", "maricopa-county", "air-quality", "grading", "research-phase"],
  relatedFaqSlugs: [
    "do-i-need-a-permit-to-build-in-maricopa-county",
    "what-inspections-happen-during-a-custom-home-build",
    "how-permitting-works-in-pinal-county",
  ],
  relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
  pillarBlogSlug: "how-to-build-a-custom-home",
  featured: false,
  sortOrder: 8,
}),
```

**Sources used:**
- [23] Maricopa County Air Quality Dept., Dust Sources, Control & Training (Rule 310) — https://www.maricopa.gov/1913/Dust-Sources-Control-and-Training
