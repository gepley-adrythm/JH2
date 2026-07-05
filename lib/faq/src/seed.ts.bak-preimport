import type { FaqSeed, SeedItem } from "./types";

// =============================================================================
// FAQ SEED - SINGLE SOURCE OF TRUTH
// =============================================================================
// This file is synced into the database on server boot (see sync.ts) and is the
// only place FAQ content is authored. The build-time validator, the SPA
// cross-link generator, and the intent registry also read from here. After
// editing, re-run:
//   - server boot (re-syncs DB)
//   - pnpm --filter @workspace/api-server run faq:validate
//   - pnpm --filter @workspace/api-server run faq:crosslinks
//   - pnpm --filter @workspace/api-server run faq:registry
//
// Content rules:
//   - `shortAnswer` is a concise, plain-text answer: it feeds the FAQPage
//     acceptedAnswer schema AND is shown as the lede under the question in the
//     detail-page hero, so keep it self-contained and free of markup.
//     `metaDescription` stays meta-only (never rendered). The full `answerHtml`
//     is what visitors read in the answer body.
//   - Answers are deep, research-phase reference content grounded in real Arizona
//     building law and process (permitting, codes, land due diligence, water and
//     septic, zoning, ADUs, budgeting). Statutes and ordinances are cited by
//     name; figures are given as ranges and every answer reminds the reader to
//     confirm specifics with the local Authority Having Jurisdiction (AHJ),
//     because codes, fees, and processing times change.
//   - Authored once as rich HTML (`answerHtml`); the plain-text `answer` used for
//     schema.org acceptedAnswer is derived from it by `plain()` so the two can
//     never drift.
// =============================================================================

/** Derive clean schema-text from authored HTML so answer/answerHtml never drift. */
function plain(html: string): string {
  return html
    .replace(/<li>/g, "\n\n- ")
    .replace(/<\/(p|h2|h3|ul|ol|li)>/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Build a SeedItem from authored HTML, auto-filling the plain-text `answer`. */
function item(base: Omit<SeedItem, "answer"> & { answerHtml: string }): SeedItem {
  return { ...base, answer: plain(base.answerHtml) };
}

export const faqSeed: FaqSeed = {
  categories: [
    {
      slug: "permits-and-codes",
      title: "Permits, Codes & Inspections",
      description:
        "What it takes to get a custom home approved in Arizona - jurisdiction, building codes, the plan-review process, and inspections.",
      metaDescription:
        "Building permits, adopted codes, plan review, and inspections for a custom home in Maricopa County, Scottsdale, and the greater Phoenix metro.",
      sortOrder: 1,
    },
    {
      slug: "land-and-due-diligence",
      title: "Land & Due Diligence",
      description:
        "How to tell whether a lot is buildable before you buy - zoning, access, utilities, soils, floodplain, and the studies a builder relies on.",
      metaDescription:
        "Arizona land due diligence - confirming a lot is buildable, checking zoning, access, utilities, soils, and floodplain before you commit.",
      sortOrder: 2,
    },
    {
      slug: "water-septic-utilities",
      title: "Water, Septic & Utilities",
      description:
        "Building beyond city services - wells, hauled water, septic systems, and Arizona's water-supply rules on rural and outlying lots.",
      metaDescription:
        "Wells, hauled water, septic permits, and Arizona's 100-year water supply rule explained for rural homesites in Rio Verde and the Phoenix metro.",
      sortOrder: 3,
    },
    {
      slug: "costs-and-budget",
      title: "Costs & Budget",
      description:
        "What a custom home really costs in the Phoenix metro, what drives the number, and how allowances, change orders, and financing work.",
      metaDescription:
        "Custom home cost per square foot, site costs, allowances, change orders, and construction financing in Scottsdale and the Phoenix metro.",
      sortOrder: 4,
    },
    {
      slug: "design-zoning-adus",
      title: "Design, Zoning & ADUs",
      description:
        "How zoning shapes what you can build - setbacks, lot coverage, hillside and open-space rules, and casitas, guest houses, and ADUs.",
      metaDescription:
        "Setbacks, lot coverage, Scottsdale NAOS/ESL rules, and casita/guest house/ADU regulations for custom homes in the Phoenix metro.",
      sortOrder: 5,
    },
    {
      slug: "building-in-the-desert",
      title: "Building in the Desert",
      description:
        "The practical craft of building for a hot-dry climate: energy design, lot grading and drainage, pool safety, solar, and how long a custom home really takes.",
      metaDescription:
        "Building a custom home in the Arizona desert: energy-efficient design, lot grading and drainage, pool-barrier law, solar rights, and realistic build timelines.",
      sortOrder: 6,
    },
    {
      slug: "choosing-a-builder",
      title: "Choosing & Working With a Builder",
      description:
        "How to find, vet, and hire the right Arizona custom home builder - license verification, the questions to ask, red flags, delivery methods, and how the build process works.",
      metaDescription:
        "Choosing a custom home builder in Arizona: verify the ROC license, the questions to ask, red flags to avoid, design-build vs design-bid-build, and the build process.",
      sortOrder: 7,
    },
  ],
  topics: [
    {
      slug: "building-permits-arizona",
      title: "Building Permits in Arizona",
      description:
        "Who has authority over your parcel, which permits a custom home needs, the adopted codes, and how long approval takes.",
      metaDescription:
        "How building permits work for a custom home in Arizona - jurisdiction, required permits, adopted codes, plan review, and timelines.",
      sortOrder: 1,
    },
    {
      slug: "buying-land-to-build",
      title: "Buying Land to Build On",
      description:
        "The due diligence that tells you whether a homesite will actually work - and what to verify before you make an offer.",
      metaDescription:
        "Buying land to build a custom home in Arizona - the due diligence, studies, and lot checks that determine whether a parcel is buildable.",
      sortOrder: 2,
    },
    {
      slug: "rural-water-and-septic",
      title: "Rural Water & Septic",
      description:
        "Supplying water and handling wastewater where there is no city hookup - wells, hauled water, septic systems, and the rules behind them.",
      metaDescription:
        "Wells, hauled water, septic systems, and Arizona water-supply rules for building on rural land in Rio Verde and the Phoenix metro.",
      sortOrder: 3,
    },
    {
      slug: "budgeting-a-custom-home",
      title: "Budgeting a Custom Home",
      description:
        "Setting a realistic number, understanding what drives cost, and how allowances, change orders, and construction loans work.",
      metaDescription:
        "Budgeting a custom home in Arizona - realistic cost ranges, what drives price, allowances, change orders, and construction loans.",
      sortOrder: 4,
    },
    {
      slug: "zoning-setbacks-adus",
      title: "Zoning, Setbacks & ADUs",
      description:
        "How zoning defines your buildable envelope and what the rules allow for casitas, guest houses, and accessory dwelling units.",
      metaDescription:
        "Zoning, setbacks, lot coverage, NAOS, and ADU rules that shape what you can build on a custom home lot in the Phoenix metro.",
      sortOrder: 5,
    },
    {
      slug: "desert-build-essentials",
      title: "Desert Build Essentials",
      description:
        "How a home is built to thrive in the Sonoran Desert: climate-smart design, drainage that survives the monsoon, pool and solar requirements, and the build timeline.",
      metaDescription:
        "Desert build essentials for an Arizona custom home: hot-dry energy design, grading and drainage, pool safety barriers, going solar, and how long the build takes.",
      sortOrder: 6,
    },
    {
      slug: "choosing-a-custom-home-builder",
      title: "Choosing a Custom Home Builder",
      description:
        "Finding and hiring the right builder - verifying an Arizona contractor license, the questions to ask before you sign, red flags, and how the build process runs.",
      metaDescription:
        "Choosing a custom home builder in Arizona: license verification, questions to ask, red flags, design-build vs design-bid-build, and the step-by-step build process.",
      sortOrder: 7,
    },
  ],
  items: [
    // ===================== Permits, Codes & Inspections =====================
    item({
      slug: "do-i-need-a-permit-to-build-in-maricopa-county",
      question: "Do I need a permit to build a custom home in Maricopa County?",
      answerHtml: `<p><strong>Yes. Every new custom home in the Phoenix metro requires a building permit, and on rural or undeveloped land you will usually need several related permits on top of it.</strong> The first thing to settle, before any drawings begin, is which government actually has authority over your parcel, because that single fact determines every rule, fee, and timeline that follows.</p>
<h2>City versus unincorporated county</h2>
<p>Arizona is a "home rule" state, which means building is regulated locally rather than by one statewide office. If your lot sits inside an incorporated city or town such as Scottsdale, Phoenix, Cave Creek, or Fountain Hills, that municipality is your Authority Having Jurisdiction (AHJ) and issues your permits. If your lot is in an unincorporated area, including much of Rio Verde Foothills, the Maricopa County Planning and Development Department is your AHJ. The two have different ordinances, submittal requirements, fee schedules, and processing times, so confirming jurisdiction is genuinely step one of any feasibility review.</p>
<h2>The permits a custom home typically needs</h2>
<p>On a finished lot inside a city, the central approval is the residential building permit, which covers the structure along with its electrical, plumbing, and mechanical work. On raw or rural land the list grows, and the supporting permits often have to be in hand before the building permit can be finalized:</p>
<ul>
<li><strong>Building permit</strong> for the house itself.</li>
<li><strong>Grading and drainage permit</strong> when the site needs earthwork, retention, or sits on a slope.</li>
<li><strong>Septic / onsite wastewater permit</strong> where there is no sewer, reviewed by Maricopa County Environmental Services under Arizona Department of Environmental Quality (ADEQ) standards.</li>
<li><strong>Well permit or Notice of Intent to Drill</strong> filed with the Arizona Department of Water Resources (ADWR) when you supply your own water.</li>
<li><strong>Driveway, access, or encroachment permit</strong> for a new connection to a public road.</li>
</ul>
<h2>How the process flows</h2>
<ol>
<li><strong>Zoning verification.</strong> Confirm the parcel is zoned for single-family residential and review setbacks, height limits, and any overlays before design starts.</li>
<li><strong>Plan submittal.</strong> Construction documents, structural engineering, energy calculations, and a site and grading plan go to the AHJ for review.</li>
<li><strong>Plan review cycles.</strong> Reviewers return comments and corrections; your team resubmits. Most custom homes go through two or three rounds.</li>
<li><strong>Permit issuance.</strong> Fees are paid and the permit is released so construction can begin.</li>
<li><strong>Inspections.</strong> The AHJ inspects at key milestones such as footings, framing, electrical, plumbing, and mechanical.</li>
<li><strong>Certificate of occupancy.</strong> After the final inspection passes, the home is cleared for move-in.</li>
</ol>
<h2>How Jematell Homes handles it</h2>
<p>Permitting is part of our full-service project management. We confirm jurisdiction, assemble the submittal package, carry every correction cycle, and coordinate inspections through to the certificate of occupancy, so the paperwork is ours to manage rather than yours. Because codes, fees, and processing times change, we always verify the current requirements directly with your AHJ for your specific parcel before we commit to a schedule.</p>`,
      shortAnswer:
        "Yes. A new custom home always needs a building permit, plus grading, septic, well, and access permits on rural land. First confirm whether your parcel is governed by a city or by unincorporated Maricopa County, since each has its own rules, fees, and timelines.",
      metaDescription:
        "Do you need a permit to build a custom home in Maricopa County? Yes - building, grading, septic, well, and access permits, plus how the approval process works.",
      categorySlug: "permits-and-codes",
      topicSlugs: ["building-permits-arizona"],
      tags: ["permits", "maricopa-county", "process", "research-phase"],
      relatedFaqSlugs: [
        "what-building-codes-apply-to-a-new-home-in-arizona",
        "how-long-does-permitting-take-in-scottsdale",
        "can-i-build-without-city-water-or-sewer",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
      featured: true,
      sortOrder: 1,
    }),
    item({
      slug: "what-building-codes-apply-to-a-new-home-in-arizona",
      question: "What building codes apply to a new home in the Phoenix metro?",
      answerHtml: `<p><strong>Arizona has no single statewide building code. Because Arizona is a "home rule" state, each city, town, and county adopts its own edition of the International Codes (I-Codes), with state and local amendments layered on top.</strong> So the precise code that governs your home depends entirely on which jurisdiction your lot falls in.</p>
<h2>The base codes</h2>
<p>For one- and two-family homes, the controlling document is almost always a version of the <strong>International Residential Code (IRC)</strong>, which bundles the structural, electrical, plumbing, mechanical, and energy requirements for houses into one book. Larger or more complex structures can fall under the International Building Code (IBC). Most Phoenix-area jurisdictions also adopt companion codes such as the International Energy Conservation Code, alongside the National Electrical Code.</p>
<h2>Editions differ by jurisdiction</h2>
<p>The edition that applies is set locally and is updated on each jurisdiction's own schedule. For example, the unincorporated areas of Maricopa County currently build to the <strong>2018 International Residential Code</strong> with regional amendments, while neighboring cities may be on a different edition entirely. This is why two lots a few miles apart can be held to meaningfully different standards. Always confirm the current adopted edition with the Authority Having Jurisdiction for your specific parcel before relying on any figure.</p>
<h2>Why local amendments matter</h2>
<p>The I-Codes are a national baseline, but jurisdictions amend them to fit local conditions. In the desert Southwest those amendments commonly address:</p>
<ul>
<li><strong>Soils and foundations</strong> - expansive clays and caliche drive foundation and grading requirements.</li>
<li><strong>Energy and cooling</strong> - insulation, glazing, and HVAC efficiency rules tuned for extreme summer heat.</li>
<li><strong>Drainage and grading</strong> - how a site must handle stormwater and monsoon runoff.</li>
<li><strong>Pools, walls, and solar</strong> - barrier, height, and equipment standards that often need their own permits.</li>
</ul>
<h2>What this means for your project</h2>
<p>You do not need to master the code book, but you should choose a builder who works across these jurisdictions every day. We design and detail each home to the edition and amendments in force where you are building, carry those requirements through plan review, and verify them against the AHJ rather than assuming last year's rules still apply. That keeps corrections to a minimum and the schedule predictable.</p>`,
      shortAnswer:
        "There is no single Arizona code. Each city and county adopts its own edition of the International Residential Code with local amendments, so the rules depend on your jurisdiction. Unincorporated Maricopa County, for example, builds to the 2018 IRC. Always confirm the current edition with your local building department.",
      metaDescription:
        "What building codes apply to a new home in the Phoenix metro? Each jurisdiction adopts its own edition of the International Residential Code with local amendments.",
      categorySlug: "permits-and-codes",
      topicSlugs: ["building-permits-arizona"],
      tags: ["building-codes", "irc", "phoenix-metro", "research-phase"],
      relatedFaqSlugs: [
        "do-i-need-a-permit-to-build-in-maricopa-county",
        "how-long-does-permitting-take-in-scottsdale",
      ],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "how-to-build-a-custom-home",
      featured: false,
      sortOrder: 2,
    }),
    item({
      slug: "how-long-does-permitting-take-in-scottsdale",
      question: "How long does it take to get a building permit in Scottsdale?",
      answerHtml: `<p><strong>For a custom home, plan on roughly two to four months from submittal to an issued permit in the City of Scottsdale, and longer if your lot triggers special overlays or an HOA design review.</strong> Permitting runs before any ground is broken, so it belongs in your timeline from the very start of planning.</p>
<h2>A realistic timeline</h2>
<p>The schedule usually breaks down like this, in business days:</p>
<ul>
<li><strong>Intake and queue:</strong> about 5 to 10 days for the application to be logged and assigned.</li>
<li><strong>First plan review:</strong> roughly 10 to 15 days for the initial set of comments.</li>
<li><strong>Each correction cycle:</strong> about 5 to 10 days per resubmittal, with most custom homes going through two or three rounds.</li>
</ul>
<p>Add it up and a straightforward custom home commonly lands in the two-to-four-month window. These are typical ranges, not guarantees; the city publishes current review times and they shift with workload.</p>
<h2>What adds time</h2>
<p>Several conditions extend review, and many of them are tied to Scottsdale's desert terrain:</p>
<ul>
<li><strong>Environmentally Sensitive Lands (ESL) overlay and NAOS:</strong> lots in the foothills must address native plant preservation and protected open space, which adds review steps.</li>
<li><strong>Hillside District:</strong> sloped sites carry extra grading, drainage, and engineering review.</li>
<li><strong>HOA or design review:</strong> many Scottsdale communities require architectural approval that runs in parallel and can take weeks to months on its own.</li>
<li><strong>Incomplete submittals:</strong> missing engineering or energy documents are the most common avoidable delay.</li>
</ul>
<h2>How unincorporated county compares</h2>
<p>If your lot is outside city limits in unincorporated Maricopa County, the process and timeline differ, and rural sites add their own approvals for septic and wells that should be sequenced early so they do not hold up the building permit.</p>
<h2>How we keep it moving</h2>
<p>The single biggest lever on permit speed is the quality of the first submittal. We assemble complete, coordinated plans, anticipate the comments common to your jurisdiction, and respond to corrections quickly so cycles do not stack up. We also start any HOA design review in parallel rather than in sequence. Because the city updates its review times and requirements periodically, we confirm the current process for your project rather than relying on past timelines.</p>`,
      shortAnswer:
        "Expect roughly two to four months for a Scottsdale custom home permit: about a week to queue, 10 to 15 business days for first review, then a few correction cycles. ESL and hillside overlays, HOA design review, and incomplete submittals all add time. Confirm current review times with the city.",
      metaDescription:
        "How long does a Scottsdale building permit take? Plan on about two to four months for a custom home, longer with ESL, hillside, or HOA design review.",
      categorySlug: "permits-and-codes",
      topicSlugs: ["building-permits-arizona"],
      tags: ["permit-timeline", "scottsdale", "plan-review", "research-phase"],
      relatedFaqSlugs: [
        "do-i-need-a-permit-to-build-in-maricopa-county",
        "what-building-codes-apply-to-a-new-home-in-arizona",
      ],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "how-long-it-takes-to-build-a-custom-home-in-arizona",
      featured: false,
      sortOrder: 3,
    }),
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
      featured: true,
      sortOrder: 4,
    }),
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
      sortOrder: 9,
    }),
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
      sortOrder: 10,
    }),
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
      sortOrder: 11,
    }),
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
      sortOrder: 12,
    }),
    // ========================= Land & Due Diligence =========================
    item({
      slug: "how-do-i-know-if-a-lot-is-buildable",
      question: "How do I know if a lot is buildable before I buy it in Arizona?",
      answerHtml: `<p><strong>A lot is "buildable" only when zoning, legal access, utilities or their substitutes, soils, drainage, and topography all line up for the home you want. A low price often reflects a missing piece, so the due diligence happens before you make an offer, not after.</strong> Buying raw land is very different from buying in a master-planned community where the infrastructure work is already done.</p>
<h2>The due-diligence checklist</h2>
<ul>
<li><strong>Zoning and land use.</strong> Confirm the parcel is zoned for single-family residential and check minimum lot size, setbacks, height limits, and any overlays. The local planning department will tell you what the zoning allows.</li>
<li><strong>Legal access.</strong> You need recorded, legal access to the parcel, not just a dirt road that appears to reach it. Landlocked parcels and unrecorded easements are common and expensive surprises.</li>
<li><strong>Utilities.</strong> Find out how far power runs and what it costs to extend, whether there is a water provider or you will need a well, and whether there is sewer or you will need septic.</li>
<li><strong>Water supply.</strong> On rural land, water may come from a well, a water-hauling service, or a provider. Each has its own rules and costs, and water is often the deciding factor on outlying Arizona lots.</li>
<li><strong>Soils and drainage.</strong> Expansive soils, caliche, and poor drainage drive foundation design and grading cost; a soils report tells you what you are dealing with.</li>
<li><strong>Floodplain.</strong> Check FEMA flood mapping; a parcel in a floodplain can require elevation, special engineering, and flood insurance.</li>
<li><strong>Topography and slope.</strong> Steep ground triggers hillside regulations and far higher site costs.</li>
<li><strong>Easements, CC&Rs, and title.</strong> Recorded easements, HOA restrictions, and title issues all limit where and what you can build.</li>
</ul>
<h2>Why the cheap lot can cost more</h2>
<p>The purchase price is only one line in the budget. A bargain parcel that needs a long power extension, a deep well, an engineered septic system, a new access easement, and heavy grading can end up costing far more to make ready than a slightly pricier lot that is already serviced. The goal of due diligence is to put real numbers on those site costs before you commit.</p>
<h2>How Jematell Homes helps</h2>
<p>We routinely walk lots with prospective buyers and pressure-test them against this checklist, drawing on years of building across Scottsdale, Rio Verde, and the wider Phoenix metro. We can flag the conditions that quietly add cost or kill a deal, and help you weigh a parcel you are considering or find one that fits your plans. None of this replaces formal reports and the jurisdiction's own determinations, but it gives you a clear-eyed read before you sign.</p>`,
      shortAnswer:
        "A lot is buildable only when zoning, legal access, utilities or substitutes, soils, drainage, and topography all work for your home. Verify each before you make an offer, since a cheap parcel often hides a long utility run, a well, septic, or heavy grading that drives up true cost.",
      metaDescription:
        "How do you know if an Arizona lot is buildable before buying? Check zoning, access, utilities, water, soils, floodplain, and slope before you make an offer.",
      categorySlug: "land-and-due-diligence",
      topicSlugs: ["buying-land-to-build"],
      tags: ["lot-due-diligence", "buildable", "land", "research-phase"],
      relatedFaqSlugs: [
        "do-i-need-a-soils-or-geotechnical-report",
        "can-i-build-without-city-water-or-sewer",
        "what-is-arizonas-100-year-water-supply-rule",
      ],
      relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us"],
      pillarBlogSlug: "building-on-your-own-lot-arizona",
      featured: true,
      sortOrder: 4,
    }),
    item({
      slug: "do-i-need-a-soils-or-geotechnical-report",
      question: "Do I need a soils or geotechnical report to build in Arizona?",
      answerHtml: `<p><strong>For a new custom home in Arizona, the answer is almost always yes. A geotechnical (soils) report tells your engineer how the ground will behave, and most jurisdictions require one before they will approve a foundation design.</strong> It is one of the first studies worth ordering once you are serious about a lot.</p>
<h2>What a soils report does</h2>
<p>A licensed geotechnical engineer drills or digs test borings, samples the soil, and reports on bearing capacity, soil chemistry, and how the ground moves with moisture. That data drives the foundation design, the grading plan, and sometimes the drainage approach. Without it, an engineer has to make conservative assumptions that can cost you money or, worse, miss a real risk.</p>
<h2>The Arizona soils that matter</h2>
<ul>
<li><strong>Expansive clays.</strong> Some desert soils swell when wet and shrink when dry, which can crack slabs and footings if the foundation is not designed for it.</li>
<li><strong>Caliche.</strong> A hard, cement-like layer that can complicate excavation, trenching, and septic systems.</li>
<li><strong>Collapsible and low-density soils.</strong> Certain soils settle when they first get wet under load, which has to be addressed before building.</li>
<li><strong>Rock and slope.</strong> Shallow bedrock or steep ground changes both foundation strategy and cost.</li>
</ul>
<h2>Related testing on rural land</h2>
<p>If your homesite uses a septic system rather than sewer, you will also need a <strong>percolation or soil-absorption evaluation</strong> so the system can be sized and sited correctly. That is a separate study from the structural soils report, though both are about understanding the ground. On rural lots it makes sense to plan for both early.</p>
<h2>Cost and timing</h2>
<p>A residential geotechnical report is a modest line item relative to the home, and it is money well spent because it removes guesswork from the most expensive part of the structure to fix later. Order it early enough that the results are in hand before foundation engineering and plan submittal, so the report informs the design rather than forcing a redo.</p>
<h2>How we handle it</h2>
<p>We coordinate the soils investigation as part of the design and engineering phase, make sure the foundation is designed to the report's recommendations, and carry that documentation into plan review. Requirements vary by jurisdiction, so we confirm exactly what your AHJ expects for your parcel rather than assuming a one-size-fits-all standard.</p>`,
      shortAnswer:
        "Almost always yes. A geotechnical report tells your engineer how the soil behaves and is typically required before a foundation design is approved. Arizona's expansive clays, caliche, and collapsible soils make it essential. Rural septic lots also need a separate percolation test. Order both early in design.",
      metaDescription:
        "Do you need a soils or geotechnical report to build in Arizona? Usually yes - it drives foundation design and is typically required for plan approval.",
      categorySlug: "land-and-due-diligence",
      topicSlugs: ["buying-land-to-build"],
      tags: ["soils-report", "geotechnical", "foundation", "research-phase"],
      relatedFaqSlugs: [
        "how-do-i-know-if-a-lot-is-buildable",
        "how-do-septic-systems-work-for-a-new-home",
      ],
      relatedServiceSlugs: ["build-on-your-lot", "custom-homes"],
      pillarBlogSlug: "what-to-do-after-buying-land-in-arizona",
      featured: false,
      sortOrder: 5,
    }),
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
      sortOrder: 6,
    }),
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
      sortOrder: 7,
    }),
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
      sortOrder: 8,
    }),
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
      sortOrder: 9,
    }),

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
      sortOrder: 10,
    }),
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
      sortOrder: 11,
    }),
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
      sortOrder: 12,
    }),
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
      sortOrder: 13,
    }),
    // ======================= Water, Septic & Utilities ======================
    item({
      slug: "can-i-build-without-city-water-or-sewer",
      question: "Can I build on rural land without city water or sewer?",
      answerHtml: `<p><strong>Yes. Plenty of custom homes across the Phoenix metro's outlying areas are built without a municipal hookup. Instead of city water you use a well or hauled water with on-site storage, and instead of sewer you use a septic (onsite wastewater) system.</strong> These are well-established approaches, but each comes with its own permits, costs, and uncertainties that belong in your due diligence.</p>
<h2>Your water options</h2>
<ul>
<li><strong>A private well.</strong> Drilling a well requires a Notice of Intent to Drill filed with the Arizona Department of Water Resources (ADWR) and a licensed driller. Most homes rely on an "exempt" domestic well, which under <strong>A.R.S. § 45-454</strong> is a non-irrigation well with a pump capacity of no more than 35 gallons per minute. The big unknowns are how deep you must drill and what it will cost, since both depend on the aquifer beneath your parcel.</li>
<li><strong>Hauled water.</strong> Where a well is not practical, homes use a large storage tank or cistern filled by a licensed water-hauling service. This is common in parts of Rio Verde Foothills; after the area's well-publicized 2023 disruption, EPCOR brought a local fill station online to stabilize supply.</li>
<li><strong>A water provider.</strong> Some outlying areas are served by a private water company. Confirm availability and connection cost before assuming it exists.</li>
</ul>
<h2>Wastewater without sewer</h2>
<p>With no sewer line, your home uses a septic system permitted through Maricopa County Environmental Services under ADEQ standards. The system has to be designed to your soils and lot, which is why the percolation test and site evaluation come early. We cover how septic systems work in a separate answer.</p>
<h2>The water-supply question behind it all</h2>
<p>On rural land you should also understand Arizona's assured and adequate water supply rules, which can affect whether and how a parcel was created. We address that in detail in our answer on the 100-year water supply rule; it is worth reading before you buy an outlying lot.</p>
<h2>How Jematell Homes helps</h2>
<p>We build regularly on rural and unserved lots, so we can help you scope what water and wastewater will realistically cost on a given parcel, coordinate the well and septic permitting, and sequence those approvals so they do not delay the building permit. Because well yields and rural water rules vary parcel by parcel, we verify the specifics for your site rather than generalizing.</p>`,
      shortAnswer:
        "Yes. Rural homes use a well or hauled water with on-site storage instead of city water, and a septic system instead of sewer. Wells need an ADWR Notice of Intent and are usually exempt domestic wells under 35 gallons per minute. Budget early, since depth, yield, and hauling costs vary by parcel.",
      metaDescription:
        "Can you build on rural Arizona land without city water or sewer? Yes - with a well or hauled water plus a septic system. Here's how each works and what to verify.",
      categorySlug: "water-septic-utilities",
      topicSlugs: ["rural-water-and-septic"],
      tags: ["well", "hauled-water", "septic", "rio-verde", "research-phase"],
      relatedFaqSlugs: [
        "how-do-septic-systems-work-for-a-new-home",
        "what-is-arizonas-100-year-water-supply-rule",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["build-on-your-lot"],
      pillarBlogSlug: "rio-verde-arizona-utilities-water-infrastructure",
      featured: true,
      sortOrder: 6,
    }),
    item({
      slug: "how-do-septic-systems-work-for-a-new-home",
      question: "How does a septic system work for a new custom home?",
      answerHtml: `<p><strong>A septic system treats your home's wastewater on site when there is no sewer to connect to. For a new custom home it must be permitted and designed before construction, sized to your soils and household, and inspected before use.</strong> In Maricopa County these systems are reviewed by the county's Environmental Services department under Arizona Department of Environmental Quality (ADEQ) standards.</p>
<h2>The two common system types</h2>
<ul>
<li><strong>Conventional systems.</strong> Wastewater flows to a septic tank, where solids settle, and the liquid disperses into a drainfield (leach field) where the soil finishes the treatment. These work where soils percolate well and there is room for the field.</li>
<li><strong>Alternative or engineered systems.</strong> Where soils are tight, the water table is high, or the lot is small or sloped, an engineered system provides extra treatment before dispersal. These cost more and carry ongoing maintenance requirements.</li>
</ul>
<h2>Why the site evaluation comes first</h2>
<p>Before a system can be designed, a <strong>percolation test and soil evaluation</strong> determine how quickly the ground absorbs water. Those results set the system type and the drainfield size. This is why the soils work belongs early in due diligence: a lot with poor percolation may require a more expensive engineered system, which changes your budget.</p>
<h2>Permitting and placement</h2>
<p>A septic permit is required before you build, and the system has to respect setbacks from wells, property lines, structures, and washes. Most designs also reserve space for a future replacement field. Where you have both a well and septic on the same parcel, the separation between them is a key design constraint.</p>
<h2>Cost and upkeep</h2>
<p>Cost depends heavily on system type and soils; a conventional system on good ground is the lower end, while an engineered system on difficult soils is considerably more. Septic systems also need periodic pumping and inspection, and engineered systems may carry a service contract. These are real ownership considerations, not just construction line items.</p>
<h2>How we handle it</h2>
<p>We coordinate the site evaluation, the system design, and the permitting as part of the build, and we place the system to work with your home and any well. Because septic rules and fees are set locally and change, we confirm the current requirements with Maricopa County Environmental Services for your parcel rather than assuming.</p>`,
      shortAnswer:
        "A septic system treats wastewater on site where there is no sewer. A percolation test sets the system type and drainfield size, then the design is permitted before construction through Maricopa County Environmental Services. Conventional systems suit good soils; engineered systems handle difficult lots at higher cost.",
      metaDescription:
        "How does a septic system work for a new custom home? A percolation test sets the design, which is permitted before construction under ADEQ and county rules.",
      categorySlug: "water-septic-utilities",
      topicSlugs: ["rural-water-and-septic"],
      tags: ["septic", "onsite-wastewater", "percolation", "research-phase"],
      relatedFaqSlugs: [
        "can-i-build-without-city-water-or-sewer",
        "do-i-need-a-soils-or-geotechnical-report",
      ],
      relatedServiceSlugs: ["build-on-your-lot"],
      pillarBlogSlug:
        "building-a-custom-home-in-rio-verde-az-lot-considerations-most-buyers-miss",
      featured: false,
      sortOrder: 7,
    }),
    item({
      slug: "what-is-arizonas-100-year-water-supply-rule",
      question: "What is Arizona's 100-year water supply rule and does it affect my lot?",
      answerHtml: `<p><strong>Arizona's Assured Water Supply (AWS) program requires that, within the state's Active Management Areas, new subdivisions demonstrate a 100-year supply of water before lots can be sold. Whether it affects your lot depends on how that lot was created and where it sits.</strong> This is one of the most misunderstood issues in Arizona land, and it is worth understanding before you buy on the metro's edges.</p>
<h2>What the rule is</h2>
<p>The Arizona Department of Water Resources (ADWR) runs the Assured and Adequate Water Supply programs to protect groundwater. Inside an <strong>Active Management Area (AMA)</strong> - and the Phoenix metro sits within the Phoenix AMA - a new subdivision must prove a physically available, legally secure, and continuously available 100-year water supply as a condition of approval.</p>
<h2>Subdivisions versus lot splits</h2>
<p>The catch is in the definitions. Under <strong>A.R.S. § 32-2101</strong>, land divided into <strong>six or more lots</strong> is a "subdivision," and subdivisions are subject to the assured-water-supply requirement. Splitting a larger parcel into <strong>five or fewer lots</strong> has historically not met that definition, so those "lot splits" have often avoided the 100-year demonstration. That gap is what produced so-called "wildcat" parcels in unincorporated areas, where homes were built without a guaranteed long-term water source.</p>
<h2>Why Rio Verde Foothills became the example</h2>
<p>Rio Verde Foothills is the best-known illustration: many homes there sit on lot-split parcels relying on hauled water rather than an assured supply, which is exactly why a hauling disruption in 2023 drew national attention before a longer-term fill-station solution came online. The rules in this area have been the subject of active legislative attention, so the legal landscape can shift.</p>
<h2>What it means for a buyer</h2>
<p>If you are buying a single existing lot, you are usually arranging your own water through a well, a provider, or hauling rather than a subdivision-level guarantee. The practical questions become: what water source does this parcel actually have, is it legally secure, and what does it cost to rely on year after year. Those answers matter as much as the purchase price.</p>
<h2>How we help</h2>
<p>We help buyers ask the right water questions on outlying lots and connect the dots between the parcel's history, its water source, and what building there will realistically require. Because this area of law is technical and changing, we point you to ADWR and qualified professionals for formal determinations rather than offering legal conclusions.</p>`,
      shortAnswer:
        "Arizona requires new subdivisions in its Active Management Areas to prove a 100-year water supply. But under A.R.S. § 32-2101, dividing land into five or fewer lots is a lot split, not a subdivision, so those parcels often skip that proof. That gap explains Rio Verde Foothills and matters when buying outlying lots.",
      metaDescription:
        "What is Arizona's 100-year water supply rule? New subdivisions must prove a 100-year supply, but lot splits of five or fewer parcels often avoid it. Here's why it matters.",
      categorySlug: "water-septic-utilities",
      topicSlugs: ["rural-water-and-septic"],
      tags: ["assured-water-supply", "lot-split", "adwr", "research-phase"],
      relatedFaqSlugs: [
        "can-i-build-without-city-water-or-sewer",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["buy-a-lot-with-us", "build-on-your-lot"],
      pillarBlogSlug:
        "building-a-custom-home-in-rio-verde-az-what-to-know-before-you-start",
      featured: false,
      sortOrder: 8,
    }),
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
      featured: true,
      sortOrder: 10,
    }),
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
      featured: false,
      sortOrder: 11,
    }),
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
      sortOrder: 13,
    }),
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
      sortOrder: 14,
    }),
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
      sortOrder: 15,
    }),
    // ============================ Costs & Budget ============================
    item({
      slug: "how-much-does-it-cost-to-build-a-custom-home",
      question: "How much does it cost to build a custom home in Scottsdale or Phoenix?",
      answerHtml: `<p><strong>There is no single price, because a custom home is built around your choices and your lot. As a planning range, custom construction in the Phoenix area commonly runs from roughly the low-$200s per square foot for an entry-level build to $400 to $600 or more per square foot for luxury work, with Scottsdale and Paradise Valley trending toward the higher end.</strong> Treat any per-foot figure as a starting point, not a quote.</p>
<h2>What the per-foot ranges look like</h2>
<ul>
<li><strong>Entry-level custom:</strong> roughly $200 to $300 per square foot for simpler designs and standard finishes.</li>
<li><strong>Mid-range custom:</strong> roughly $300 to $400-plus per square foot for elevated finishes and indoor-outdoor living.</li>
<li><strong>Luxury custom:</strong> roughly $400 to $600 and up per square foot, higher in premium Scottsdale and Paradise Valley locations.</li>
</ul>
<p>These are general market ranges for planning and will move with materials, labor, and design complexity. They describe the house itself, which on raw land is only part of the total.</p>
<h2>What actually drives the number</h2>
<ul>
<li><strong>Size and complexity.</strong> Square footage, rooflines, ceiling heights, and structural spans all push cost.</li>
<li><strong>Finishes.</strong> Cabinetry, stone, flooring, windows, and fixtures span an enormous range.</li>
<li><strong>The lot.</strong> Grading, retaining, long utility runs, a well, a septic system, and difficult access can add substantial site cost before the house begins.</li>
<li><strong>Soft costs.</strong> Design, engineering, soils reports, permits, and jurisdiction fees are real budget lines.</li>
</ul>
<h2>Land and site costs on raw lots</h2>
<p>If you are building on your own land, remember that the parcel price plus the cost to make it ready - power extension, water, septic, grading, driveway - can rival the difference between two finish levels. This is why our due-diligence answer stresses pricing the site before you commit.</p>
<h2>Design to a budget, not the other way around</h2>
<p>The most reliable path to a number you can live with is to set a budget you are comfortable with and design to it, making trade-offs deliberately rather than discovering them late. We provide clear, itemized pricing and use realistic allowances so you can see how each choice moves the total, with no surprises. Because market pricing shifts, we build your estimate around current costs for your design and lot rather than a generic per-foot rule of thumb.</p>`,
      shortAnswer:
        "There is no single price. As a planning range, Phoenix-area custom homes run from about $200 to $300 per square foot at entry level to $400 to $600 or more for luxury, higher in Scottsdale and Paradise Valley. Size, finishes, your lot's site costs, and soft costs all move the number, so design to a budget.",
      metaDescription:
        "How much does it cost to build a custom home in Scottsdale or Phoenix? Planning ranges run from about $200 to $600+ per square foot, plus land and site costs.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["cost", "price-per-square-foot", "budget", "research-phase"],
      relatedFaqSlugs: [
        "what-are-allowances-and-change-orders",
        "how-do-i-finance-building-a-custom-home",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: true,
      sortOrder: 9,
    }),
    item({
      slug: "what-are-allowances-and-change-orders",
      question: "What are allowances and change orders, and how do they affect my budget?",
      answerHtml: `<p><strong>Allowances and change orders are the two mechanisms that let a custom home budget move from estimate to final number. An allowance is a placeholder dollar amount for a selection you have not finalized; a change order is a documented change to the contract scope. Understanding both keeps your budget transparent rather than full of surprises.</strong></p>
<h2>How allowances work</h2>
<p>An allowance is a set amount budgeted for a category of selections you have not chosen yet - flooring, cabinetry, countertops, lighting, plumbing fixtures, or appliances. It lets the project price and proceed before every detail is decided. When you make your final selections, the actual cost is compared to the allowance:</p>
<ul>
<li>Choose finishes that cost <strong>less</strong> than the allowance, and you save against that amount.</li>
<li>Choose something <strong>more expensive</strong>, and the difference is added to your price.</li>
</ul>
<p>Realistic allowances are everything. An estimate padded with low allowances can look attractive and then climb steeply once real selections are made. We set allowances at levels that reflect the finishes our clients actually choose, so the starting number is honest.</p>
<h2>How change orders work</h2>
<p>A change order documents any change to the agreed scope after the contract is set - moving a wall, upgrading a system, adding a feature, or responding to a condition discovered on site. A good change order states the work, the cost, and any schedule impact, and is approved before the work proceeds. That paper trail is what keeps everyone aligned and the budget under control.</p>
<h2>Why this matters in the research phase</h2>
<p>When you compare builders, look past the headline price and ask how allowances are set and how change orders are handled. Two estimates can look similar while one is built on realistic allowances and the other is not. The difference shows up months later as either a predictable project or a series of unwelcome additions.</p>
<h2>How Jematell Homes handles it</h2>
<p>We lead with transparent, itemized pricing, set realistic allowances up front, and give you detailed breakdowns so you can see exactly how each selection moves the total. Change orders are documented and approved before work proceeds, so you always understand what you are paying for and why. The result is a budget that behaves the way you expect from contract through move-in.</p>`,
      shortAnswer:
        "An allowance is a budgeted placeholder for selections you have not finalized; spend under it and you save, over it and you pay the difference. A change order documents any later change to scope, with cost and schedule, approved before work proceeds. Realistic allowances are what keep a budget honest.",
      metaDescription:
        "What are allowances and change orders in custom home building? Allowances budget unfinalized selections; change orders document scope changes. Both keep your budget clear.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["allowances", "change-orders", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-much-does-it-cost-to-build-a-custom-home",
        "how-do-i-finance-building-a-custom-home",
      ],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "custom-home-budget-allowances-change-orders",
      featured: false,
      sortOrder: 10,
    }),
    item({
      slug: "how-do-i-finance-building-a-custom-home",
      question: "How do I finance building a custom home in Arizona?",
      answerHtml: `<p><strong>Most custom homes are financed with a construction loan, which works differently from a standard mortgage: the lender releases money in stages as the home is built, you typically pay interest only on what has been drawn, and the loan often converts to a permanent mortgage when the home is finished.</strong> Understanding the structure early helps you plan both the build and your cash flow.</p>
<h2>Construction-to-permanent loans</h2>
<p>The most common path is a construction-to-permanent ("one-time close") loan. It funds the build in <strong>draws</strong> tied to completed milestones - foundation, framing, and so on - with an inspection before each release. During construction you usually pay interest only on the amount drawn so far, which keeps early payments lower. When the home is complete, the loan rolls into a long-term mortgage, often without a second closing.</p>
<h2>How your lot fits in</h2>
<p>If you already own your land, its value can often serve as part of your equity or down payment, which can reduce the cash you need to bring. If you are buying the lot and building, some loans can fold the land purchase into the financing. Either way, lenders look closely at the parcel, so the same due diligence that makes a lot buildable also makes it financeable.</p>
<h2>What lenders want to see</h2>
<ul>
<li><strong>Plans and a fixed builder contract</strong> with a detailed cost breakdown, since the appraisal is based on the completed design.</li>
<li><strong>A qualified, licensed builder</strong> - many construction lenders require one rather than an owner-builder arrangement.</li>
<li><strong>A contingency</strong> built into the budget for the unexpected.</li>
<li><strong>Your financial profile</strong> - credit, income, and reserves, as with any mortgage.</li>
</ul>
<h2>Plan for the soft costs and timeline</h2>
<p>Remember that design, engineering, soils reports, permits, and fees often come before a construction loan funds, so plan for those early costs. And because permitting and construction span many months, your interest carry during the build is part of the real cost of the project.</p>
<h2>How we support the process</h2>
<p>We provide the detailed plans, fixed scope, and itemized pricing that construction lenders rely on, and we coordinate with your lender's draw and inspection schedule so funding keeps pace with the build. We are not a lender and this is not financial advice; we will gladly work alongside the construction lender you choose to keep the project moving.</p>`,
      shortAnswer:
        "Most custom homes use a construction loan that funds the build in draws, charges interest only on what is drawn, and converts to a permanent mortgage at completion. Owned land can count toward equity. Lenders want plans, a fixed builder contract, and a contingency, so budget for soft costs up front.",
      metaDescription:
        "How do you finance building a custom home in Arizona? Construction-to-permanent loans fund the build in draws and convert to a mortgage. Here's how they work.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["financing", "construction-loan", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-much-does-it-cost-to-build-a-custom-home",
        "what-are-allowances-and-change-orders",
      ],
      relatedServiceSlugs: ["custom-homes", "spec-homes"],
      pillarBlogSlug: "financing-your-custom-or-semi-home",
      featured: false,
      sortOrder: 11,
    }),
    item({
      slug: "what-do-permit-and-development-fees-cost-to-build",
      question: "What do permit, impact, and development fees add to the cost of a build?",
      answerHtml: `<p><strong>Government fees are a real line in a custom-home budget, separate from what you pay your builder. Expect a layered set of charges: a plan review fee, a building permit fee tied to the home's construction valuation, trade permits, and one-time impact or development fees for water, sewer, and infrastructure. Each city and county sets its own schedule, so the total varies by jurisdiction and is revised most years.</strong> Treat any figure below as an illustration to verify, not a quote.</p>
<h2>The fees that show up on almost every build</h2>
<ul>
<li><strong>Plan review fee.</strong> Charged when you submit construction documents so the jurisdiction can check them against the adopted code. It is commonly calculated as a percentage of the building permit fee.</li>
<li><strong>Building permit fee.</strong> Usually based on the home's construction valuation (a square-footage value the jurisdiction assigns, or your contract value), so a larger or higher-end home carries a larger permit fee.</li>
<li><strong>Trade permits.</strong> Electrical, plumbing, and mechanical work may be permitted separately or rolled into the building permit, depending on the jurisdiction.</li>
<li><strong>Development and impact fees.</strong> One-time charges that fund the public infrastructure a new home draws on, such as water and sewer capacity, roads, parks, and public safety. These are often the largest single category and they vary widely between cities.</li>
<li><strong>Utility connection or meter fees.</strong> Water meter installation and sewer connection charges where municipal service is available.</li>
<li><strong>Site and ancillary permits.</strong> Grading and drainage, a pool, retaining walls, a driveway or right-of-way encroachment, and on rural land a septic permit and a well registration, each with its own fee.</li>
</ul>
<h2>A Scottsdale worked example</h2>
<p>The City of Scottsdale publishes a Planning and Development fee schedule that it updates on a fiscal-year basis (the figures here reflect the FY2025-26 schedule as of mid-2026, and Scottsdale revises them annually). For a custom home you can expect the stack to include a plan review fee charged as a share of the permit fee, a building permit fee scaled to construction valuation, trade permit fees, and development or impact fees for water and sewer capacity. Added together, the government fee burden on a custom home commonly runs from the low thousands into the tens of thousands of dollars, with the impact and water-and-sewer development components driving most of the spread. The exact number depends on the home's valuation, whether the lot is already served by city utilities, and which overlays apply.</p>
<p>Two points matter for planning. First, these are Scottsdale's numbers; Phoenix, Cave Creek, Fountain Hills, Carefree, and unincorporated Maricopa County each maintain a different schedule, so a similar home a few miles away can carry a meaningfully different fee total. Second, the published schedule is the only authoritative figure, and it changes, so price your build against the current schedule for your specific parcel rather than a remembered number.</p>
<h2>What changes the total</h2>
<ul>
<li><strong>Construction valuation.</strong> Because the permit and plan review fees scale with valuation, a larger or more elaborate home costs more to permit.</li>
<li><strong>Whether utilities are already in.</strong> A lot already served by a city water and sewer main avoids the largest connection and capacity charges; a raw lot may instead carry septic and well fees and the cost to extend service.</li>
<li><strong>Overlays and special review.</strong> Hillside, Environmentally Sensitive Lands, or floodplain review can add their own submittal and review fees on top of the base permit.</li>
<li><strong>Resubmittals.</strong> Some jurisdictions charge additional review fees after a set number of correction cycles, which is one more reason a clean first submittal pays off.</li>
</ul>
<h2>How Jematell Homes handles it</h2>
<p>We itemize the expected jurisdiction fees for your parcel in your budget rather than burying them, pull the current published schedule for your city or county, and sequence the site, septic, and well permits so they do not stall the building permit. Because every jurisdiction revises its fees on its own schedule, we confirm the current amounts with the Authority Having Jurisdiction for your specific lot before we commit to a number, since fee schedules change from year to year.</p>`,
      shortAnswer:
        "Beyond what you pay the builder, expect a plan review fee, a building permit fee tied to construction valuation, trade permits, and one-time impact and development fees for water, sewer, and infrastructure. Totals range from a few thousand into the tens of thousands and vary by city, so confirm the current published schedule for your parcel.",
      metaDescription:
        "What do permit, impact, and development fees add to a custom home? Plan review, permit, trade, and one-time impact fees vary by city. A Scottsdale worked example.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["permit-fees", "impact-fees", "scottsdale", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-much-does-it-cost-to-build-a-custom-home",
        "do-i-need-a-permit-to-build-in-maricopa-county",
        "how-long-does-permitting-take-in-scottsdale",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: false,
      sortOrder: 12,
    }),
    item({
      slug: "how-does-a-one-time-close-construction-loan-work",
      question: "How does a construction-to-permanent (one-time-close) loan work?",
      answerHtml: `<p><strong>A construction-to-permanent loan, often called a one-time-close loan, funds your build in stages and then converts into a long-term mortgage when the home is finished, all under a single closing. It differs from a standard mortgage in three ways: the money is released in draws as work is completed, you usually pay interest only on what has been drawn during construction, and one closing covers both the construction phase and the permanent loan.</strong> Knowing the structure early helps you plan both the build schedule and your cash flow.</p>
<h2>Single close, two phases</h2>
<p>A standard mortgage funds a finished, existing home in one lump sum. A construction loan instead has to release money gradually as the house is built, because there is no completed asset to lend against yet. The one-time-close version packages both phases together: you sign once, the loan funds the construction in draws, and at completion it rolls into a permanent mortgage without a second closing. That single-close structure is the main appeal, because it means one set of closing costs and one approval rather than two, and it locks the financing arrangement before you break ground.</p>
<h2>The draw schedule</h2>
<p>Instead of one disbursement, the lender releases funds in a series of draws tied to construction milestones. A typical sequence funds the work in stages such as:</p>
<ol>
<li>Lot or initial site work and foundation.</li>
<li>Framing and roof.</li>
<li>Mechanical, electrical, and plumbing rough-in.</li>
<li>Insulation, drywall, and interior finishes.</li>
<li>Final completion and certificate of occupancy.</li>
</ol>
<p>Before each draw is released, the lender generally orders an inspection to confirm the work for that stage is actually complete. This protects the lender and the borrower by making sure money tracks real progress. Your builder's contract and detailed cost breakdown become the map the draw schedule follows, which is one reason construction lenders want a fixed scope and a licensed builder up front.</p>
<h2>Interest-only during the build</h2>
<p>During construction you typically pay interest only, and only on the funds drawn so far rather than the full loan amount. Early in the build, when little has been drawn, payments are smaller; they rise as more of the loan is disbursed. This keeps the carrying cost manageable while you are also potentially paying for your current housing. Because permitting and construction can span many months, that interest carry over the life of the build is a real cost to budget for, not an afterthought.</p>
<h2>Conversion to a permanent mortgage</h2>
<p>When the home passes its final inspection and receives its certificate of occupancy, the loan converts to permanent financing on the terms set at the original closing. At that point it behaves like a conventional mortgage with regular principal-and-interest payments. Some programs set the permanent rate at the initial close, while others allow a modification at conversion, so the rate mechanics are a key question to ask your lender.</p>
<h2>How your land fits in</h2>
<p>If you already own the lot, its value can often count toward your equity or down payment, reducing the cash you need to bring to closing. If you are buying the parcel and building, some one-time-close programs can fold the land purchase into the loan. Either way the lender will scrutinize the parcel, so the same due diligence that makes a lot buildable also makes it financeable.</p>
<h2>What this means for your project</h2>
<p>The detailed plans, fixed builder contract, and itemized cost breakdown a construction lender requires are exactly what we provide, and we coordinate with your lender's draw and inspection schedule so funding keeps pace with construction. We are not a lender and this is not financial advice; loan structures, draw rules, and rates differ by lender and change over time, so confirm the current terms and rate mechanics directly with the construction lender you choose.</p>`,
      shortAnswer:
        "A construction-to-permanent, or one-time-close, loan funds the build in draws tied to inspected milestones, charges interest only on what has been drawn, and converts to a permanent mortgage at completion under a single closing. Owned land can count toward equity. Confirm current terms and rates with your lender, since they change.",
      metaDescription:
        "How does a one-time-close construction loan work? It funds the build in inspected draws, charges interest only during construction, and converts to a mortgage at completion.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["construction-loan", "one-time-close", "financing", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-do-i-finance-building-a-custom-home",
        "how-much-does-it-cost-to-build-a-custom-home",
        "what-are-allowances-and-change-orders",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "financing-your-custom-or-semi-home",
      featured: false,
      sortOrder: 13,
    }),
    item({
      slug: "what-drives-custom-home-cost-per-square-foot",
      question: "What drives custom-home cost per square foot in our markets?",
      answerHtml: `<p><strong>Cost per square foot is a useful planning shorthand, but it is an output, not an input. The same finished square footage can swing by hundreds of dollars per foot depending on three things: how much site work the lot demands, the finish level you choose, and the conditions of the parcel itself, such as slope, soils, and whether you need a well and septic.</strong> Understanding the drivers is more useful than memorizing a single number, because it tells you where a budget is really decided.</p>
<h2>Site work: the cost that happens before the house</h2>
<p>On a finished lot in a developed subdivision, much of the expensive groundwork is already done. On raw or rural land it is not, and that work lands in your budget before the home itself begins. The big site-cost items are:</p>
<ul>
<li><strong>Grading and earthwork.</strong> Leveling, cut and fill, and retaining walls, which grow quickly on uneven ground.</li>
<li><strong>Utility extension.</strong> Bringing power to a remote parcel can run a long and costly distance; the further the nearest service, the higher the bill.</li>
<li><strong>Water and wastewater.</strong> A well and an engineered septic system in place of a city tap and sewer connection.</li>
<li><strong>Access and driveway.</strong> A new road connection, a long driveway, and any required encroachment work.</li>
<li><strong>Drainage.</strong> Grading and retention to move monsoon stormwater away from the house, which Arizona's foundation drainage rules require.</li>
</ul>
<p>Because site work is spread across the same square footage as the house, a difficult lot raises the effective cost per foot even when the home design has not changed at all.</p>
<h2>Finish level: where choices compound</h2>
<p>Finishes are the single largest lever a buyer controls. Cabinetry, countertops, flooring, windows and doors, plumbing and lighting fixtures, appliances, and millwork each span an enormous range from standard to luxury, and the choices compound across the whole house. Two homes of identical size and layout can differ dramatically in cost because one is built to entry-level selections and the other to high-end ones. Ceiling heights, structural spans, roofline complexity, and indoor-outdoor living features add to this, because they affect structure and labor, not just materials.</p>
<h2>Lot conditions: slope, soils, and what is underground</h2>
<p>The land itself sets a floor under your cost before any finish decision. The conditions that matter most in our markets include:</p>
<ul>
<li><strong>Slope and topography.</strong> Steep ground triggers hillside regulations, heavier engineering, and far more earthwork than a flat pad.</li>
<li><strong>Soils.</strong> Expansive clays, caliche, and collapsible soils drive foundation design and grading cost, which is why a geotechnical report is one of the first studies worth ordering.</li>
<li><strong>Earth fissures and subsidence.</strong> In parts of Pinal County and other groundwater-affected areas, the Arizona Geological Survey maps earth fissures; their presence can affect siting and warrants checking before you buy.</li>
<li><strong>Well and septic.</strong> Where there is no municipal service, the depth of a well and the type of septic system the soils require can both add materially to the budget.</li>
</ul>
<h2>Soft costs and market conditions</h2>
<p>Design, engineering, soils reports, surveys, permits, and jurisdiction fees are real budget lines that a per-foot figure often leaves out. On top of that, material and labor pricing moves with the market, so any planning range will drift over time. This is why a per-foot rule of thumb is a starting point for conversation, not a substitute for an estimate built around your actual design and lot.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We price the site and the house together, because on many of our lots the ground is where the budget is truly decided. We use realistic allowances so you can see how each finish choice moves the total, and we flag the lot conditions, slope, soils, well, and septic, that quietly raise the effective cost per foot. Because pricing shifts with the market and every lot is different, we build your estimate around current costs for your specific design and parcel and confirm site-driven requirements with the local Authority Having Jurisdiction rather than relying on a generic number.</p>`,
      shortAnswer:
        "Cost per square foot is an output, not a price. It is driven by site work (grading, utility runs, well and septic), the finish level you choose, and lot conditions like slope and soils. A difficult lot raises the effective per-foot cost even with the same house, so price the site and home together and confirm current costs.",
      metaDescription:
        "What drives custom-home cost per square foot in Arizona? Site work, finish level, and lot conditions like slope, soils, and well and septic all move the number.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["cost-drivers", "price-per-square-foot", "site-costs", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-much-does-it-cost-to-build-a-custom-home",
        "how-do-i-know-if-a-lot-is-buildable",
        "do-i-need-a-soils-or-geotechnical-report",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: false,
      sortOrder: 14,
    }),

    item({
      slug: "how-much-should-i-budget-for-site-work",
      question: "How much should I budget for site work on a raw lot?",
      answerHtml: `<p><strong>Site work is everything that has to happen to a raw lot before the house itself can rise: clearing and grading, bringing in power and water, putting in a well and septic where there is no city service, building a driveway and access, and engineering drainage. On a finished subdivision lot most of this is already done. On raw desert land it is not, and it lands in your budget first. The honest answer is that site work is the most variable line in a custom-home budget, and on a difficult parcel it can run from the tens of thousands into well over a hundred thousand dollars before a single wall goes up.</strong> The number depends almost entirely on the specific lot, so the goal of this answer is to show you what to budget for, not to hand you a figure to bank on.</p>
<h2>What "site work" actually includes</h2>
<p>When builders talk about site costs on a raw lot in our markets, they usually mean some combination of the following:</p>
<ul>
<li><strong>Clearing and demolition.</strong> Removing brush, native vegetation, rock, and any existing structures. In Arizona this can also trigger native plant protection rules and dust-control requirements, so it is not always as simple as running a machine over the land.</li>
<li><strong>Grading and earthwork.</strong> Cut and fill to create a level building pad, plus any retaining walls. This is where a sloped or rocky lot gets expensive fast, because moving and compacting earth is priced by the volume and difficulty of the work.</li>
<li><strong>Utility extension.</strong> Running electric service from the nearest line to the home, and water where a municipal main is available. The further your building site sits from existing service, the longer and costlier the run.</li>
<li><strong>Well and septic.</strong> On rural land with no city water or sewer, you are budgeting for a drilled well and an engineered on-site wastewater (septic) system instead of a tap and a sewer connection. Both are permitted separately and both depend on conditions you cannot fully price until they are tested.</li>
<li><strong>Driveway and access.</strong> A culvert, a graded or paved driveway, and any right-of-way or encroachment work to connect the lot to the public road.</li>
<li><strong>Drainage and stormwater.</strong> Grading and retention to carry monsoon runoff away from the house. Arizona's adopted residential code requires the finished grade to slope away from the foundation, so this is not optional, it is engineered.</li>
</ul>
<h2>Why the range is so wide</h2>
<p>Two lots that look similar from the road can carry very different site budgets. The biggest swing factors are:</p>
<ul>
<li><strong>Slope and topography.</strong> A flat pad needs little earthwork. A hillside lot can trigger hillside-disturbance and grading rules, heavier structural engineering, and far more cut and fill.</li>
<li><strong>Soils and what is underground.</strong> Caliche (a cement-hard calcium-carbonate layer common in the desert), expansive clay, and collapsible soils all raise excavation and foundation cost. A geotechnical (soils) report is one of the first studies worth ordering, because it tells you what the ground will demand before you commit a budget.</li>
<li><strong>Distance to utilities.</strong> A parcel a quarter mile from the nearest power line carries a very different extension cost than one with service at the property line.</li>
<li><strong>Water and wastewater feasibility.</strong> Well depth is not knowable until you drill, and the septic system the soils require (a conventional system versus a more expensive engineered or alternative system) is set by a percolation or soils evaluation. Both are real unknowns at the budgeting stage.</li>
<li><strong>Access.</strong> A long private driveway across uneven ground costs far more than a short connection to a paved street.</li>
</ul>
<h2>How to put a working number on it</h2>
<p>Because the variables are lot-specific, the right approach is to convert unknowns into studies before you finalize a budget. The studies that retire the most risk are a boundary and topographic survey, a geotechnical (soils) report, a percolation or septic feasibility evaluation, and written will-serve or service-availability letters from the utility and water providers. Each one costs a fraction of the surprise it prevents. Order them during due diligence, ideally before you close on the land, so the site budget is built on tested facts rather than optimism.</p>
<p>It also helps to separate the site budget from the house budget in your own planning. Lumping them together hides where the money is really going, and on many raw lots the ground is where the budget is truly decided. Keeping site work as its own set of line items lets you see the true cost of the parcel you are considering and compare two lots honestly.</p>
<h2>Permits and fees are part of site work too</h2>
<p>Site work is not just dirt and pipe. Grading and drainage permits, a septic permit from the county environmental department, well registration with the Arizona Department of Water Resources, and any driveway or encroachment permit each carry their own fee and review timeline. In unincorporated areas such as the Rio Verde Foothills the county, not a city, is the Authority Having Jurisdiction, and a septic clearance is typically required before the building permit releases. Build those approvals into both the budget and the schedule.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We price the site and the house as two separate conversations, because on many of the lots we build, the site is where the real cost lives. Before we commit to a site budget we want the survey, the soils report, the septic feasibility, and the utility will-serve letters in hand, so the number reflects your actual ground rather than a generic allowance. We also sequence the grading, well, septic, and access permits so they do not stall the building permit. Because soils, well depth, and fee schedules all vary by parcel and change over time, treat any planning figure as a starting point and confirm the current requirements and costs with the local Authority Having Jurisdiction, your utility and water providers, and your licensed site professionals for your specific lot.</p>`,
      shortAnswer:
        "Site work covers clearing, grading, utility runs, a well and septic where there is no city service, a driveway, and drainage. On a raw desert lot it is the most variable budget line and can run from the tens of thousands into six figures before the house begins. Order a survey, soils report, septic feasibility, and utility will-serve letters to price it, and confirm costs for your specific parcel.",
      metaDescription:
        "How much should you budget for site work on a raw Arizona lot? Clearing, grading, utilities, well, septic, driveway, and drainage, plus the studies that let you price it.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["site-work", "raw-land", "grading", "well-and-septic", "budget", "research-phase"],
      relatedFaqSlugs: [
        "what-drives-custom-home-cost-per-square-foot",
        "buying-raw-land-vs-a-finished-lot",
        "how-much-does-it-cost-to-build-a-custom-home",
        "what-deposit-do-custom-home-builders-require",
      ],
      relatedServiceSlugs: ["build-on-your-lot", "buy-a-lot-with-us", "custom-homes"],
      pillarBlogSlug: "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: false,
      sortOrder: 15,
    }),
    item({
      slug: "fixed-price-vs-cost-plus-building-contracts",
      question: "What is the difference between a fixed-price and a cost-plus building contract?",
      answerHtml: `<p><strong>The two most common ways a custom home is priced are a fixed-price (also called lump-sum or stipulated-sum) contract and a cost-plus contract. In a fixed-price contract the builder commits to a single total for a defined scope, and the builder carries the risk if costs run over. In a cost-plus contract you pay the actual cost of materials and labor plus an agreed builder's fee, so you carry the risk if costs rise but you also see exactly where the money goes. Many Arizona custom builds use a hybrid, such as cost-plus with a guaranteed maximum price, that tries to capture the best of both.</strong> Neither structure is automatically better; the right one depends on how defined your design is and how you want to share risk.</p>
<h2>Fixed-price (lump-sum) contracts</h2>
<p>A fixed-price contract states one number for an agreed scope of work. You know the bottom line up front, which makes budgeting and loan qualification simpler, and the builder absorbs the impact if material or labor prices climb during construction. The trade-offs are real, though:</p>
<ul>
<li><strong>It needs a complete design to price honestly.</strong> A builder can only commit to a firm number when the plans, specifications, and selections are well defined. If you are still deciding on finishes, the contract leans heavily on allowances (placeholder budgets for items not yet chosen), and going over those allowances changes your price through change orders.</li>
<li><strong>The contingency is built in and hidden.</strong> Because the builder carries the overrun risk, a prudent fixed price includes a cushion for the unknowns. You may pay for risk that never materializes.</li>
<li><strong>Less visibility.</strong> You generally do not see the builder's actual costs or markup, only the total and the line items.</li>
</ul>
<p>Fixed price tends to fit buyers who want certainty above all, who have a fully designed home, and who do not need to watch every invoice.</p>
<h2>Cost-plus contracts</h2>
<p>In a cost-plus arrangement you reimburse the actual, documented cost of construction (materials, subcontractors, labor) and pay the builder a fee on top, structured either as a fixed dollar amount or a percentage of cost. The advantages are transparency and flexibility:</p>
<ul>
<li><strong>You see the real costs.</strong> Open-book accounting means you can review supplier invoices and subcontractor bids. If a trade comes in under budget, you keep the savings rather than the builder.</li>
<li><strong>It handles evolving designs.</strong> If your selections are not final, or the lot holds surprises like rock or caliche, cost-plus adapts without renegotiating a lump sum each time.</li>
<li><strong>The trade-off is uncertainty.</strong> You do not know the final total until the home is finished, and if costs rise, you absorb them. A percentage fee can also, in theory, reward higher spending, which is why many buyers prefer a fixed fee or a cap.</li>
</ul>
<h2>The hybrid: cost-plus with a guaranteed maximum price</h2>
<p>A widely used middle path is cost-plus with a guaranteed maximum price (often shortened to GMP). You get open-book transparency and the flexibility of cost-plus, but the builder also commits to a ceiling the total will not exceed for the defined scope. Savings below the cap are often shared or returned to you, while overruns above the cap (for the agreed scope) are the builder's responsibility. For a complex custom build on an uncertain lot, this structure balances control of the downside with visibility into the costs.</p>
<h2>What Arizona buyers should check before signing any contract</h2>
<p>Whatever structure you choose, Arizona law and good practice point to the same protections:</p>
<ul>
<li><strong>Verify the contractor's license.</strong> Residential building in Arizona requires a licensed contractor (for example a B-class general residential license) regulated by the Arizona Registrar of Contractors (ROC). You can confirm a license, its status, and complaint history on the ROC website before you sign.</li>
<li><strong>Get it in writing with a clear scope.</strong> The contract should spell out the scope, the plans and specifications, the allowance amounts, the payment or draw schedule, the change-order process, the warranty, and how disputes are handled. Vague scope is the root of most cost fights.</li>
<li><strong>Understand allowances and change orders.</strong> In both contract types, allowances and changes are where the price actually moves. Know how they are priced and approved.</li>
<li><strong>Know your backstop.</strong> Arizona maintains a Residential Contractors' Recovery Fund (A.R.S. 32-1131 and following) that can compensate an eligible homeowner, up to a statutory cap per transaction, for certain losses caused by a licensed residential contractor. It is a safety net, not a substitute for a careful contract.</li>
</ul>
<h2>How Jematell Homes approaches it</h2>
<p>We talk through contract structure early, because the right choice depends on how finished your design is and how you want to handle risk on your particular lot. We work from a defined scope, realistic allowances, and a clear change-order process so the number you agree to is the number you understand, whichever structure we use. Because contract terms carry legal and financial consequences, confirm the specifics with your builder, verify the contractor's license on the Arizona Registrar of Contractors website, and have an attorney review the agreement before you sign.</p>`,
      shortAnswer:
        "A fixed-price contract sets one total for a defined scope and the builder carries the overrun risk, which needs a complete design to price honestly. A cost-plus contract pays actual cost plus a builder's fee with open-book transparency, but you carry the overrun risk. A hybrid with a guaranteed maximum price blends both. Always verify the contractor's license and have an attorney review the agreement.",
      metaDescription:
        "Fixed-price vs cost-plus building contracts: how each prices a custom home, who carries the risk, the guaranteed-maximum-price hybrid, and what Arizona buyers should verify.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["building-contracts", "fixed-price", "cost-plus", "roc", "budget", "research-phase"],
      relatedFaqSlugs: [
        "what-are-allowances-and-change-orders",
        "what-deposit-do-custom-home-builders-require",
        "how-much-does-it-cost-to-build-a-custom-home",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: false,
      sortOrder: 16,
    }),
    item({
      slug: "what-deposit-do-custom-home-builders-require",
      question: "What deposit or payment schedule do custom home builders require?",
      answerHtml: `<p><strong>A custom home is almost never paid for in one lump sum. You typically put down an initial deposit to start design and pre-construction, and then pay the construction cost through a series of progress payments, often called draws, that are released as defined stages of the work are completed and inspected. When the build is financed, the lender's draw schedule drives most of those payments. The guiding principle, and the one Arizona's contractor regulator emphasizes, is that your payments should track the work actually completed, so you never get far ahead of what has been built.</strong> There is no single mandatory schedule; the details live in your contract, so understanding the structure protects you.</p>
<h2>The initial deposit</h2>
<p>Most custom builders ask for a deposit before construction to cover the early design, engineering, and pre-construction work, and to secure your place in the schedule. This is sometimes handled as a separate design or pre-construction agreement before the main construction contract is signed. A reasonable deposit funds real work that is delivered to you, such as plans, engineering, and permitting, rather than simply sitting as money paid far ahead of any deliverable. The Arizona Registrar of Contractors (ROC) consistently advises homeowners to be cautious about large up-front payments and to make sure payments correspond to work performed or materials delivered.</p>
<h2>The progress-payment (draw) schedule</h2>
<p>The bulk of the cost is paid through progress payments tied to construction milestones. A typical sequence releases funds at stages such as:</p>
<ol>
<li>Site work and foundation complete.</li>
<li>Framing and roof complete (dried-in).</li>
<li>Mechanical, electrical, and plumbing rough-in complete.</li>
<li>Insulation, drywall, and interior finishes underway.</li>
<li>Final completion and certificate of occupancy.</li>
</ol>
<p>The point of structuring payments this way is that the money follows verified progress. Before each payment, the work for that stage should be confirmed as complete, which keeps you from paying for work that has not been done.</p>
<h2>How financing changes the picture</h2>
<p>If you are using a construction loan, the lender, not just the builder, controls the rhythm of payments. With a construction-to-permanent (one-time-close) loan, the lender releases funds in draws and usually orders an inspection before each draw to confirm the stage is complete. During construction you generally pay interest only on the amount drawn so far, and the loan converts to a permanent mortgage at completion. In that arrangement your cash deposit is often applied to the early costs and to your required equity, and if you already own the lot, its value can count toward that equity and reduce the cash you bring to closing.</p>
<h2>Protections to build into the schedule</h2>
<p>A few contract details keep a payment schedule fair to both sides:</p>
<ul>
<li><strong>Tie every payment to a defined, verifiable milestone.</strong> Avoid payments based only on the calendar; tie them to completed, inspectable stages so money tracks work.</li>
<li><strong>Use lien waivers.</strong> Collecting a lien waiver from the builder (and, where appropriate, subcontractors and suppliers) as payments are made helps confirm that the people who did the work are being paid, which protects you from a later mechanic's lien on your home.</li>
<li><strong>Hold a retainage or final payment for completion.</strong> Keeping a meaningful final payment until the home is genuinely finished, including the punch list, gives the builder an incentive to complete every detail.</li>
<li><strong>Keep records.</strong> Save the contract, the schedule, every invoice, and every approved change order so the running balance is always clear.</li>
</ul>
<h2>Your Arizona backstop</h2>
<p>Building with a contractor licensed by the Arizona Registrar of Contractors matters here. Beyond verifying the license before you sign, an eligible homeowner who suffers certain losses from a licensed residential contractor may be able to recover from the Residential Contractors' Recovery Fund (A.R.S. 32-1131 and following), up to a statutory cap per transaction. That fund is a safety net, not a reason to skip a careful, milestone-based payment schedule.</p>
<h2>How Jematell Homes approaches it</h2>
<p>We structure deposits and progress payments so they track real, completed work, and we coordinate the schedule with your lender's draw and inspection process so funding keeps pace with construction rather than running ahead of it. We put the deposit, the milestone payment schedule, the change-order process, and the final-payment terms in writing so nothing is a surprise. Because every contract and loan is different and terms change over time, confirm the specific deposit and payment terms with your builder and your lender, verify the contractor's license on the Arizona Registrar of Contractors website, and consider an attorney's review before you sign.</p>`,
      shortAnswer:
        "Expect an initial deposit that funds design, engineering, and permitting, then progress payments (draws) released as inspected construction milestones are completed. When you finance the build, the lender's draw schedule controls most payments. Arizona's contractor regulator urges payments to track completed work, so tie each draw to a verifiable stage and verify the builder's license before signing.",
      metaDescription:
        "What deposit or payment schedule do custom home builders require? An initial deposit plus milestone-based progress draws, how construction loans drive them, and protections to build in.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["deposit", "payment-schedule", "draws", "roc", "budget", "research-phase"],
      relatedFaqSlugs: [
        "how-does-a-one-time-close-construction-loan-work",
        "fixed-price-vs-cost-plus-building-contracts",
        "how-do-i-finance-building-a-custom-home",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "financing-your-custom-or-semi-home",
      featured: false,
      sortOrder: 17,
    }),
    item({
      slug: "hidden-costs-of-building-a-custom-home",
      question: "What are the hidden costs of building a custom home?",
      answerHtml: `<p><strong>The hidden costs of building a custom home are the real, predictable line items that buyers leave out of a back-of-the-napkin budget: land due diligence (survey, geotechnical report, percolation test), plan review and permit fees, utility hookups or well and septic, impact and development fees, allowance overruns on finishes, and the finish-grading and landscaping at the very end. None of these are surprises to an experienced builder, but they routinely add a meaningful percentage to a number that started as just "lot plus house."</strong> The fix is not luck. It is a complete budget that names every category before design begins.</p>
    <h2>Why do custom home budgets blow up?</h2>
    <p>Most budget overruns are not caused by one dramatic event. They come from a stack of ordinary costs that never made it onto the first spreadsheet. A buyer prices the lot and a per-square-foot construction number, then discovers that getting from raw dirt to a finished, move-in-ready home involves a long tail of professional studies, government fees, site work, and selection upgrades. Below are the categories that most often go missing.</p>
    <h2>What costs do buyers forget before construction even starts?</h2>
    <p>These soft costs come early, before a single footing is poured, and many lenders will not fund them, so they often come out of pocket:</p>
    <ul>
    <li><strong>Boundary and topographic survey.</strong> You need to know exactly where the lot lines, easements, and slopes are before anyone designs to them.</li>
    <li><strong>Geotechnical (soils) report.</strong> Arizona soils include expansive clay and caliche, and the report drives the foundation design. It is a study you pay for up front, not a line in the construction contract.</li>
    <li><strong>Percolation or site evaluation for septic</strong> on lots without sewer, required before a septic system can be designed and permitted.</li>
    <li><strong>Civil and structural engineering, energy calculations, and architectural design</strong> needed to assemble a permit-ready set.</li>
    <li><strong>Plan review and permit fees</strong> charged by the city or county, which are separate from the cost of building.</li>
    <li><strong>Impact and development fees</strong> that many jurisdictions assess on a new dwelling to fund roads, parks, and public safety.</li>
    </ul>
    <h2>What gets underestimated during construction?</h2>
    <p>Once the build is underway, the most common overruns are tied to site conditions and to the choices you make at the selection table:</p>
    <ul>
    <li><strong>Site work and earthwork.</strong> Clearing, cut and fill, retaining walls, and a long driveway on a sloped or remote lot can dwarf what a flat infill lot would cost.</li>
    <li><strong>Utility extensions.</strong> Running power, water, gas, or fiber to a rural parcel, or drilling a well and installing a septic system, can each be five figures.</li>
    <li><strong>Allowance overruns.</strong> A contract sets dollar allowances for flooring, cabinets, countertops, plumbing fixtures, and lighting. If your taste runs above the allowance, you pay the difference, and a thin allowance can make a low bid look better than it is.</li>
    <li><strong>Change orders.</strong> Mid-build design changes carry both material and labor cost and can affect the schedule.</li>
    </ul>
    <h2>What costs land at the very end?</h2>
    <p>The last stretch of a project hides costs because buyers picture the finished house and forget what surrounds it:</p>
    <ul>
    <li><strong>Finish grading, hardscape, and landscaping,</strong> including desert-appropriate planting, irrigation, and often a wall or fence.</li>
    <li><strong>Driveway paving and the final approach</strong> to the garage.</li>
    <li><strong>Window coverings, appliances not in the contract, and low-voltage or security systems.</strong></li>
    <li><strong>Closing and financing costs</strong> on a construction loan, including interest paid during the build and any inspection or draw fees.</li>
    </ul>
    <h2>How do you keep these costs from being hidden?</h2>
    <p>The answer is a complete, itemized budget produced before design is finalized, where every category above is either a real number or an honest, clearly labeled allowance. We build that budget with you, set allowances at levels that reflect the finishes our clients actually choose rather than artificially low placeholders, and flag the lot-driven costs (site work, utilities, well and septic) early, because those are where raw land surprises people most. A cost that is written down is a planned cost, not a hidden one.</p>
    <p>Fees, impact charges, and utility costs vary by jurisdiction and by lot, and they change year to year, so always confirm the current numbers for your specific parcel with the local Authority Having Jurisdiction and your utility providers before you commit to a budget.</p>`,
      shortAnswer:
        "The hidden costs are the predictable extras buyers omit: surveys, the geotechnical report, plan review and permit fees, impact fees, utility hookups or well and septic, allowance overruns on finishes, and the finish grading and landscaping at the end. An itemized budget built before design turns every one of them into a planned cost.",
      metaDescription:
        "The hidden costs of building a custom home in Arizona: surveys, geotech, permit and impact fees, utility hookups, allowance overruns, and final landscaping.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["hidden-costs", "budget", "allowances", "site-work", "research-phase"],
      relatedFaqSlugs: [
        "whats-in-a-custom-home-construction-contract",
        "what-are-allowances-and-change-orders",
        "what-drives-custom-home-cost-per-square-foot",
        "how-much-should-i-budget-for-site-work",
        "what-do-permit-and-development-fees-cost-to-build",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "establish-a-realistic-budget-before-designing-your-custom-home",
      sortOrder: 18,
    }),
    item({
      slug: "whats-in-a-custom-home-construction-contract",
      question: "What should be in a custom home construction contract?",
      answerHtml: `<p><strong>A custom home construction contract should clearly define the scope of work, the price and how it is calculated, the payment or draw schedule, the dollar allowances for finishes, a written change-order process, the schedule with substantial-completion terms, the warranty, insurance and licensing, and how disputes are handled. In Arizona it should also carry the contractor's Registrar of Contractors (ROC) license number, because residential work must be performed by a licensed contractor.</strong> A strong contract is not about distrust. It is the shared, written understanding that keeps a long, expensive project predictable.</p>
    <h2>Why does the contract matter so much on a custom home?</h2>
    <p>A custom home runs for many months and involves hundreds of decisions, dozens of trades, and a large sum paid out over time. The contract is the single document everyone returns to when a question comes up. Arizona requires residential construction to be performed by a contractor licensed through the Registrar of Contractors, and a written agreement is the standard of care. The clearer it is, the fewer assumptions there are to argue about later.</p>
    <h2>What are the essential clauses to look for?</h2>
    <ul>
    <li><strong>Scope of work and plans.</strong> The contract should reference the specific plan set, specifications, and selections so "the house" is defined, not implied.</li>
    <li><strong>Price and pricing model.</strong> It should state whether the job is fixed-price or cost-plus and exactly what is included and excluded.</li>
    <li><strong>Allowances.</strong> Dollar amounts for finish categories (flooring, cabinets, counters, fixtures, lighting) with a clear rule for what happens if a selection comes in above or below the allowance.</li>
    <li><strong>Payment / draw schedule.</strong> When payments are due, tied to milestones or to lender draws, and what each draw covers.</li>
    <li><strong>Change-order process.</strong> A written, signed procedure that prices any change in scope and states its schedule impact before the work proceeds. Verbal changes are where disputes start.</li>
    <li><strong>Schedule and substantial completion.</strong> A start date, an estimated completion, how weather or owner-caused delays are handled, and what "substantially complete" means.</li>
    <li><strong>Warranty.</strong> The builder's express warranty and how it relates to Arizona's implied warranty of workmanship and habitability and the ROC workmanship standards.</li>
    <li><strong>Insurance, licensing, and lien protection.</strong> The ROC license number, proof of liability and workers' compensation coverage, and how lien waivers will be collected from subcontractors and suppliers at each draw.</li>
    <li><strong>Dispute resolution.</strong> Whether disputes go to mediation, arbitration, or court, and a note that homeowners may also file with the ROC.</li>
    <li><strong>Termination and closeout.</strong> The conditions for ending the contract and what defines final completion and final payment.</li>
    </ul>
    <h2>What does Arizona law add to a residential contract?</h2>
    <p>Arizona residential contractors must be licensed by the ROC, and the license number belongs in the contract so you can verify it. The ROC publishes workmanship standards that function as the baseline for acceptable residential work, and homeowners have a window after completion to file a complaint with the ROC if a licensed contractor's work is deficient. Owner-occupants of a licensed contractor's project may also have access to the Residential Contractors' Recovery Fund for certain unpaid judgments, subject to statutory caps. These remedies sit on top of the contract, not instead of it, which is why a written, license-bearing agreement matters.</p>
    <h2>What are common contract red flags?</h2>
    <ul>
    <li>A large up-front deposit out of proportion to early work.</li>
    <li>Vague or missing allowances, which let a low bid hide future cost.</li>
    <li>No written change-order procedure.</li>
    <li>No license number, or a number that does not verify on the ROC website.</li>
    <li>A payment schedule that runs ahead of work completed.</li>
    </ul>
    <h2>How we approach the contract</h2>
    <p>We put the full scope, an honest allowance schedule, a milestone-based draw schedule, and a written change-order process in front of you before work begins, and we collect lien waivers from our subcontractors and suppliers at each draw so payments are documented. The contract should leave you with no guesswork about what you are buying, when you pay, and what happens if something changes. Because licensing rules, workmanship standards, and statutory remedies are set by the state and can change, confirm the current requirements with the Arizona Registrar of Contractors, and have your own attorney review any construction contract before you sign.</p>`,
      shortAnswer:
        "A custom home contract should define scope and plans, the price and pricing model, allowances, the draw schedule, a written change-order process, the schedule and substantial completion, the warranty, insurance and the ROC license number, and how disputes are resolved. In Arizona, residential work must be done by a licensed contractor, so verify that number.",
      metaDescription:
        "What should a custom home construction contract include? Scope, price, allowances, draw schedule, change orders, warranty, ROC license, and dispute resolution in Arizona.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["construction-contract", "change-orders", "roc-license", "warranty", "research-phase"],
      relatedFaqSlugs: [
        "hidden-costs-of-building-a-custom-home",
        "lien-waivers-and-mechanics-liens-in-arizona",
        "what-are-allowances-and-change-orders",
        "fixed-price-vs-cost-plus-building-contracts",
        "how-to-verify-an-arizona-contractor-license",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
      sortOrder: 19,
    }),
    item({
      slug: "lien-waivers-and-mechanics-liens-in-arizona",
      question: "How do lien waivers and mechanic's liens work in Arizona?",
      answerHtml: `<p><strong>In Arizona, a mechanic's or materialman's lien (A.R.S. Title 33, Chapter 6) lets contractors, subcontractors, and suppliers who are not paid for work or materials place a claim against the property they improved. A lien waiver is the document a paid party signs giving up that claim, and owners and lenders collect waivers at every draw to confirm everyone down the chain has actually been paid.</strong> The two ideas work together: liens protect the people who build, and waivers protect the owner from paying twice.</p>
    <h2>What is a mechanic's lien?</h2>
    <p>Arizona's lien statutes (A.R.S. 33-981 and following) give anyone who furnishes labor, professional services, materials, or equipment to improve real property the right to record a lien against that property if they are not paid. The lien attaches to the home and land, and if it is not resolved it can be foreclosed, which is why an unreleased lien is a serious title problem at closing or sale. The risk for an owner is being asked to pay twice: once to the general contractor, and again to a subcontractor or supplier the contractor failed to pay.</p>
    <h2>What are the key deadlines?</h2>
    <p>Arizona lien rights run on strict statutory timelines. As of June 2026 the general framework is:</p>
    <ul>
    <li><strong>Preliminary twenty-day notice (A.R.S. 33-992.01).</strong> Most potential claimants must serve a preliminary notice within twenty days after first furnishing labor or materials to preserve lien rights. This is the notice owners receive early in a project from suppliers they have never met, and it is normal.</li>
    <li><strong>Recording the lien (A.R.S. 33-993).</strong> A lien generally must be recorded within 120 days after completion of the project, or within 60 days after a notice of completion is recorded, whichever applies.</li>
    <li><strong>Foreclosing the lien (A.R.S. 33-998).</strong> A lawsuit to enforce a recorded lien must generally be started within six months, or the lien expires.</li>
    </ul>
    <p>These deadlines are precise and change occasionally, so anyone relying on them should confirm the current statute or consult an attorney.</p>
    <h2>Does the owner-occupant exemption protect me?</h2>
    <p>Arizona gives special protection to owner-occupants. Under A.R.S. 33-1002, a person who contracts directly with a licensed contractor to build or improve a dwelling they own and occupy (or intend to occupy) is generally protected from subcontractor and supplier liens, as long as that owner-occupant has paid the general contractor in full. The protection is real but conditional, and it does not erase the practical risk, which is exactly why paying through the contractor and collecting waivers still matters. This is a nuanced statute, so confirm how it applies to your situation with an attorney.</p>
    <h2>What are the four types of lien waiver?</h2>
    <p>Lien waivers come in four standard forms, split two ways: progress versus final, and conditional versus unconditional.</p>
    <ul>
    <li><strong>Conditional waiver on progress payment.</strong> Releases lien rights for a specific draw, but only once that payment actually clears. Safe for the party signing.</li>
    <li><strong>Unconditional waiver on progress payment.</strong> Releases lien rights for that draw immediately, whether or not payment clears, so it should only be signed after payment is confirmed.</li>
    <li><strong>Conditional waiver on final payment.</strong> Releases all remaining lien rights, effective only when the final payment clears.</li>
    <li><strong>Unconditional waiver on final payment.</strong> Releases all lien rights immediately and unconditionally, appropriate only after final payment has been received.</li>
    </ul>
    <p>Arizona addresses lien waivers in A.R.S. 33-1008. The critical distinction is conditional versus unconditional: a conditional waiver depends on payment clearing, while an unconditional one does not, so an unconditional waiver should never be signed before the money is in hand.</p>
    <h2>Why does my builder collect waivers at each draw?</h2>
    <p>Collecting a lien waiver from every subcontractor and supplier at each draw creates a paper trail proving they were paid for that phase. Construction lenders and title companies usually require this before releasing the next draw or clearing title. It is the single most effective routine protection against a surprise lien.</p>
    <h2>How we handle it</h2>
    <p>We pay our subcontractors and suppliers on schedule and collect signed lien waivers at each draw, so your draws are documented and your title stays clean through to closeout. Lien law is technical and the deadlines are unforgiving, so for any actual or threatened lien, and before relying on any deadline or the owner-occupant exemption, confirm the current statute with the relevant authority and consult a construction attorney.</p>`,
      shortAnswer:
        "A mechanic's lien (A.R.S. Title 33) lets unpaid contractors and suppliers claim against the property they improved; a lien waiver is the signed release a paid party gives up that right. Builders collect conditional or unconditional waivers at each draw so owners are not asked to pay twice and title stays clean.",
      metaDescription:
        "How lien waivers and mechanic's liens work in Arizona: A.R.S. Title 33 lien rights, the 20-day notice and deadlines, the owner-occupant exemption, and conditional vs unconditional waivers.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["lien-waivers", "mechanics-lien", "arizona-law", "draws", "research-phase"],
      relatedFaqSlugs: [
        "whats-in-a-custom-home-construction-contract",
        "what-is-a-punch-list-and-final-walkthrough",
        "how-does-a-one-time-close-construction-loan-work",
        "how-to-verify-an-arizona-contractor-license",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: null,
      sortOrder: 20,
    }),
    item({
      slug: "what-is-a-punch-list-and-final-walkthrough",
      question: "What is a punch list and final walkthrough on a new home?",
      answerHtml: `<p><strong>A final walkthrough is the inspection you and your builder do together near the end of construction, and the punch list is the written list of remaining items to fix or finish that comes out of it: touch-up paint, an adjusted door, a missed fixture, a scuffed surface. The builder completes the punch list, you confirm the work, and only then do you make final payment and take the keys.</strong> It is the formal handoff that turns a finished house into your home.</p>
    <h2>What is the difference between a punch list and a final walkthrough?</h2>
    <p>The two go together but are not the same. The final walkthrough is the event: a scheduled, room-by-room tour of the completed home with your builder, ideally in good light and with utilities on. The punch list is the document: the running list of every item the walkthrough turns up that still needs attention. The walkthrough generates the list, the builder works the list, and a short re-check confirms each item is done.</p>
    <h2>When does the walkthrough happen?</h2>
    <p>The final walkthrough typically happens once construction is substantially complete and the home has passed its final building inspection and received its certificate of occupancy from the Authority Having Jurisdiction. The certificate of occupancy confirms the home meets code and is legally cleared for move-in; the walkthrough and punch list are about fit, finish, and function on top of that code approval.</p>
    <h2>What should be on a punch list?</h2>
    <p>A punch list is detailed by design. Common items include:</p>
    <ul>
    <li><strong>Paint and drywall:</strong> touch-ups, nail pops, uneven texture, or overspray.</li>
    <li><strong>Doors and windows:</strong> alignment, latching, smooth operation, intact screens and weatherstripping.</li>
    <li><strong>Cabinets and counters:</strong> doors and drawers aligned, hardware tight, surfaces free of chips or scratches.</li>
    <li><strong>Flooring and tile:</strong> no cracked tiles, clean grout lines, no gaps or lippage.</li>
    <li><strong>Plumbing fixtures:</strong> no leaks, good water pressure, proper drainage, working shutoffs.</li>
    <li><strong>Electrical:</strong> every switch, outlet, and light fixture works; the panel is labeled.</li>
    <li><strong>HVAC:</strong> heating and cooling run correctly at every register, with a working thermostat.</li>
    <li><strong>Exterior and site:</strong> stucco, trim, garage door, grading that drains away from the house, and finished hardscape.</li>
    </ul>
    <h2>How should I prepare for the walkthrough?</h2>
    <ul>
    <li>Schedule enough time to go slowly and check every room, not just the showpiece spaces.</li>
    <li>Bring your plans and selection sheets so you can confirm what was specified actually got installed.</li>
    <li>Test things: open every door and window, run faucets, flip switches, open and close the garage.</li>
    <li>Use painter's tape to flag small cosmetic issues as you find them.</li>
    <li>Get the punch list in writing, with each item described clearly, before you sign off.</li>
    </ul>
    <h2>How does the punch list connect to final payment and warranty?</h2>
    <p>Final payment is normally tied to completion of the punch list, which is one reason the list should be written and agreed rather than verbal. Completing it is also the moment lien waivers and final closeout documents come together. Separately, your home carries warranty coverage: the builder's express warranty, plus Arizona's implied warranty of workmanship and habitability, which the Arizona Supreme Court recognized for new home buyers in Richards v. Powercraft Homes (1984). The punch list handles what you can see at handoff; the warranty covers issues that surface later. Items that appear after move-in are warranty claims, not punch-list items, so keep the two straight.</p>
    <h2>How we handle closeout</h2>
    <p>We walk the finished home with you, build the punch list together, complete every item, and confirm each one with you before final payment and handoff, along with your warranty documents and the maintenance information for your new home. Because final inspection, certificate-of-occupancy, and warranty requirements are set locally and by statute and can change, confirm the current process for your project with the local Authority Having Jurisdiction.</p>`,
      shortAnswer:
        "The final walkthrough is the room-by-room inspection you and your builder do near completion; the punch list is the written list of remaining fixes it produces, from touch-up paint to an adjusted door. The builder completes the list, you confirm each item, and only then do you make final payment and take the keys.",
      metaDescription:
        "What is a punch list and final walkthrough on a new custom home? The end-of-build inspection, what to check, and how it ties to final payment and your warranty in Arizona.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["budgeting-a-custom-home"],
      tags: ["punch-list", "final-walkthrough", "closeout", "warranty", "research-phase"],
      relatedFaqSlugs: [
        "whats-in-a-custom-home-construction-contract",
        "lien-waivers-and-mechanics-liens-in-arizona",
        "what-inspections-happen-during-a-custom-home-build",
        "what-is-a-certificate-of-occupancy-and-how-do-i-get-one",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
      sortOrder: 21,
    }),
    // ========================= Design, Zoning & ADUs ========================
    item({
      slug: "what-are-setbacks-lot-coverage-and-naos-rules",
      question: "What are setbacks, lot coverage, and NAOS rules in Scottsdale?",
      answerHtml: `<p><strong>Setbacks, lot coverage, and open-space rules together define your "buildable envelope" - the part of a lot where a home can actually go and how big it can be. In Scottsdale's desert and foothill areas, the Environmentally Sensitive Lands rules add a Natural Area Open Space (NAOS) requirement on top, which can meaningfully shrink where you build.</strong> These rules are zoning-driven, so they vary by parcel.</p>
<h2>The core zoning limits</h2>
<ul>
<li><strong>Setbacks</strong> are the minimum distances a structure must sit from the front, side, and rear property lines. They frame the footprint before design even begins.</li>
<li><strong>Lot coverage</strong> caps how much of the lot the building (and sometimes other hardscape) can occupy, usually as a percentage.</li>
<li><strong>Height limits</strong> restrict how tall the home can be, which interacts with grading on sloped lots.</li>
</ul>
<p>Your zoning designation sets these numbers, and the planning department can confirm them for a specific parcel.</p>
<h2>NAOS and the ESL ordinance</h2>
<p>Scottsdale's <strong>Environmentally Sensitive Lands Ordinance (ESLO)</strong> governs development across a large area of desert and mountain terrain in the city's north and east. It requires that a percentage of qualifying properties be permanently preserved as <strong>Natural Area Open Space (NAOS)</strong> and that native vegetation and desert features be protected. The preservation percentage and the rules scale with the land's sensitivity and slope, so two foothill lots can have very different effective building areas even at the same size.</p>
<h2>Hillside considerations</h2>
<p>On sloped parcels, hillside regulations add further limits on grading, disturbance, and where structures can sit. Combined with NAOS, this is why a large foothill lot does not always mean a large building envelope - much of the land may be protected or too steep to disturb.</p>
<h2>Why this belongs in your lot search</h2>
<p>Before you fall for a view lot, it pays to understand how much of it you can actually build on. A parcel with generous acreage but heavy NAOS, steep slope, and tight setbacks may yield a smaller usable footprint than a plain, flat lot half its size.</p>
<h2>How we help</h2>
<p>We design each home to its lot's real envelope, working setbacks, coverage, slope, and any NAOS preservation into the plan from the start so the design fits the rules rather than fighting them. Because these standards are local and periodically updated, we verify the current requirements with the city for your specific parcel.</p>`,
      shortAnswer:
        "Setbacks, lot coverage, and height limits define where and how big you can build; in Scottsdale's foothills the Environmentally Sensitive Lands ordinance adds Natural Area Open Space that must be preserved. Together they set your buildable envelope, so a large view lot can yield a surprisingly small footprint.",
      metaDescription:
        "What are setbacks, lot coverage, and NAOS rules in Scottsdale? They define your buildable envelope; the ESL ordinance adds protected open space in the foothills.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["setbacks", "naos", "esl", "scottsdale", "research-phase"],
      relatedFaqSlugs: [
        "can-i-build-a-casita-or-adu",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "designing-a-custom-home-around-your-lot-why-layout-matters-more-than-square-footage",
      featured: false,
      sortOrder: 12,
    }),
    item({
      slug: "can-i-build-a-casita-or-adu",
      question: "Can I build a casita, guest house, or ADU on my property?",
      answerHtml: `<p><strong>Often yes, but the rules depend entirely on your jurisdiction and zoning. A casita, guest house, or accessory dwelling unit (ADU) is a smaller second living space on the same lot as the main home, and Arizona has recently moved to make ADUs easier in its larger cities.</strong> What you can build, how big, and whether it can be rented all come down to local rules.</p>
<h2>Casita versus ADU</h2>
<p>People use these terms loosely, but the distinction matters for permitting. A <strong>casita or guest house</strong> is often a secondary space without a full independent kitchen, while an <strong>ADU</strong> is a complete, independent dwelling with its own kitchen, bath, and entrance. Whether a unit counts as an ADU affects which rules apply and whether it can be a separate rental.</p>
<h2>Arizona's statewide ADU law</h2>
<p>In May 2024, Arizona enacted <strong>House Bill 2720</strong>, which requires municipalities with at least 75,000 residents to allow ADUs on lots zoned for single-family homes. That brings more consistent ADU rights to the state's larger cities, including much of the Phoenix metro. The law sets a baseline; each qualifying city adopts its own implementing regulations on size, setbacks, and design, and smaller towns and unincorporated county areas are not covered by it. Always confirm how your specific jurisdiction has implemented the rules.</p>
<h2>What typically governs the unit</h2>
<ul>
<li><strong>Size limits</strong> on the ADU relative to the main home or lot.</li>
<li><strong>Setbacks and height</strong> as with any structure, plus any owner-occupancy or parking conditions the city imposes.</li>
<li><strong>Attached versus detached</strong> configurations, each with its own standards.</li>
<li><strong>Utilities and septic capacity.</strong> On a septic lot, a second dwelling may require a larger or upgraded system.</li>
<li><strong>Short-term rental rules,</strong> which are regulated separately and change.</li>
</ul>
<h2>Designing it in from the start</h2>
<p>The cleanest path is to plan the casita or ADU as part of the original design, so the layout, utilities, and septic capacity all account for it rather than being retrofitted later. It is far easier to size a septic system or position utilities once than to expand them after the fact.</p>
<h2>How Jematell Homes helps</h2>
<p>We design custom homes with casitas, guest houses, and ADUs regularly, and we tailor the unit to your lot's zoning and your goals - multigenerational living, guests, a home office, or a future rental. Because ADU rules are evolving and differ by city, we confirm the current standards for your jurisdiction before finalizing the design.</p>`,
      shortAnswer:
        "Often yes, depending on your zoning. A casita is usually a guest space; an ADU is a full independent dwelling. Arizona's 2024 HB 2720 requires cities over 75,000 residents to allow ADUs on single-family lots, but each sets its own size and setback rules. Plan utilities and septic capacity from the start.",
      metaDescription:
        "Can you build a casita, guest house, or ADU in Arizona? Often yes - and HB 2720 now requires larger cities to allow ADUs on single-family lots. Here's what governs it.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["adu", "casita", "guest-house", "hb-2720", "research-phase"],
      relatedFaqSlugs: [
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "how-much-does-it-cost-to-build-a-custom-home",
      ],
      relatedServiceSlugs: ["custom-homes", "floor-plans"],
      pillarBlogSlug:
        "guest-house-amp-adu-essentials-building-casitas-in-phoenix-under-new-laws",
      featured: false,
      sortOrder: 13,
    }),
    item({
      slug: "what-hb-2720-changed-for-adus-in-arizona",
      question: "What did HB 2720 change for building a casita or ADU in Arizona?",
      answerHtml: `<p><strong>House Bill 2720, signed in 2024 and codified at A.R.S. 9-461.18, requires Arizona municipalities with a population of at least 75,000 to allow accessory dwelling units (ADUs) on lots zoned for single-family homes, and it caps how restrictive those cities can be.</strong> The live answer on casitas covers the basics of what an ADU is; this one focuses on what the statute actually changed and where it does and does not reach.</p>
<h2>What the law requires of larger cities</h2>
<p>For covered municipalities, the headline is that an outright ban is no longer allowed. A.R.S. 9-461.18 directs these cities to permit ADUs on parcels with an existing or proposed single-family home, and it limits the conditions a city can attach. The guardrails in the statute generally include the following, though each city writes its own implementing ordinance within them:</p>
<ul>
<li><strong>At least one ADU per lot.</strong> Covered cities must allow at least one attached and one detached ADU on a qualifying single-family lot, subject to the size and setback limits below.</li>
<li><strong>No owner-occupancy requirement.</strong> A city cannot force the property owner to live on site as a condition of having an ADU.</li>
<li><strong>Limited parking demands.</strong> The statute restricts a city from requiring more than a modest amount of added parking for an ADU.</li>
<li><strong>Size floors.</strong> A city cannot cap an ADU below the thresholds set in the statute, which protect a meaningful minimum floor area rather than letting a city permit ADUs in name only.</li>
<li><strong>Setbacks no stricter than the main home.</strong> ADU setbacks generally cannot be made more restrictive than those that apply to the primary dwelling.</li>
<li><strong>No familial-use limits.</strong> A city cannot require that the ADU be occupied only by family members.</li>
</ul>
<p>Cities were directed to bring their ordinances into compliance on the timeline set by the law, so by 2026 the larger Phoenix-metro jurisdictions have adopted implementing rules. Among the markets we build in, Scottsdale and Phoenix clear the 75,000-resident threshold and are covered.</p>
<h2>What the law does not change</h2>
<p>HB 2720 sets a floor, not a free pass. Several things still govern whether and how you can build:</p>
<ul>
<li><strong>Smaller towns are not covered.</strong> Cave Creek, Carefree, Fountain Hills, and similar towns fall under the 75,000-resident threshold, so the statewide mandate does not apply and their local zoning controls.</li>
<li><strong>Unincorporated county land is separate.</strong> Parcels governed by Maricopa County or Pinal County, including much of Rio Verde Foothills, follow county zoning rather than a city ADU ordinance.</li>
<li><strong>Septic and water capacity still bind.</strong> On a lot served by a well and septic, a second dwelling can require a larger or upgraded onsite wastewater system reviewed under Arizona Department of Environmental Quality standards, regardless of what zoning allows.</li>
<li><strong>Short-term rental is regulated separately.</strong> The law addresses the right to build an ADU, not the right to operate it as a nightly rental; those rules live in other ordinances and change.</li>
<li><strong>Overlays still apply.</strong> Hillside, open-space, and design-review rules continue to shape where an ADU can sit even in a covered city.</li>
</ul>
<h2>Why the distinction matters for your lot search</h2>
<p>Two parcels a few miles apart can now carry very different ADU rights purely because one sits in a city above the population threshold and the other in a small town or unincorporated county. If a casita or future rental is part of your plan, the jurisdiction is worth confirming before you make an offer, not after.</p>
<h2>How Jematell Homes helps</h2>
<p>We design custom homes with casitas and ADUs across the metro and tailor each unit to the lot's jurisdiction, zoning, and your goals, whether that is multigenerational living, guests, a home office, or a future rental. Because ADU rules are recent and each covered city implements A.R.S. 9-461.18 differently, and because small towns and county land are outside the statewide mandate, we confirm the current standards with your local AHJ, and any applicable HOA, before finalizing a design.</p>`,
      shortAnswer:
        "Arizona's 2024 HB 2720, codified at A.R.S. 9-461.18, requires cities of 75,000 or more residents to allow ADUs on single-family lots and limits owner-occupancy, parking, and size restrictions. Smaller towns and unincorporated county land are not covered, and septic capacity and overlays still apply.",
      metaDescription:
        "What did HB 2720 (A.R.S. 9-461.18) change for ADUs in Arizona? Larger cities must allow them on single-family lots, but small towns and county land are exempt.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["adu", "casita", "hb-2720", "ars-9-461-18", "research-phase"],
      relatedFaqSlugs: [
        "can-i-build-a-casita-or-adu",
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["custom-homes", "floor-plans"],
      pillarBlogSlug: "guest-house-casita-adu-scottsdale",
      featured: false,
      sortOrder: 14,
    }),
    item({
      slug: "scottsdale-esl-ordinance-and-naos-explained",
      question: "How do Scottsdale's ESL ordinance and NAOS rules affect what I can build?",
      answerHtml: `<p><strong>Scottsdale's Environmentally Sensitive Lands Ordinance (ESLO) governs development across roughly 134 square miles of the city's northern and eastern desert and mountain terrain, and it can substantially reduce how much of a lot you may actually build on.</strong> The live setbacks answer introduces NAOS; this one goes deeper into how the overlay works and why a large foothill parcel can yield a small home site.</p>
<h2>What the ESL overlay is</h2>
<p>The ESL overlay sits on top of a property's base zoning. It applies to a large swath of Scottsdale's Sonoran Desert landscape, including the hillsides and upper desert in the city's north. Where it applies, ESLO standards control land disturbance, native vegetation, washes, and slopes in addition to the ordinary setback, height, and lot-coverage limits of the underlying zoning. The city's Citizen's Guide to ESL is the plain-language companion to the ordinance text.</p>
<h2>Natural Area Open Space (NAOS)</h2>
<p>The defining ESL requirement is <strong>Natural Area Open Space</strong>, a percentage of the lot that must be permanently set aside and kept in, or restored to, a natural desert state. NAOS is recorded against the property, so it travels with the land. The required percentage is not a flat number; it scales with the parcel's environmental sensitivity and slope, which means two foothill lots of the same acreage can owe very different amounts of preserved open space. The practical effect is a smaller usable building envelope than the raw lot size suggests.</p>
<h2>Native plants, washes, and slope</h2>
<p>Beyond the open-space set-aside, ESLO typically addresses several site features:</p>
<ul>
<li><strong>Native plant preservation.</strong> Protected desert plants such as saguaros and ironwood often must be preserved in place or salvaged and replanted, with an inventory required as part of review.</li>
<li><strong>Washes and drainage.</strong> Natural desert washes are commonly protected and folded into the open-space and drainage plan rather than graded over.</li>
<li><strong>Hillside and slope limits.</strong> On sloped ESL parcels, the amount of allowed disturbance and grading tightens as the grade steepens, and cut-and-fill is constrained to keep the natural landform.</li>
<li><strong>Building envelope and color/material standards.</strong> The overlay can steer where the home sits and push toward low-reflectivity, desert-appropriate exteriors.</li>
</ul>
<h2>How it changes the design process</h2>
<p>Because ESL review adds steps, an ESL lot generally takes longer through plan review than a flat in-town lot, and the design has to start from the protected areas and work inward. A view lot can look generous on paper and still leave a modest pad once NAOS, washes, native plants, and slope are subtracted. Designing to that real envelope from day one avoids the costly path of drawing a home that the overlay will not allow.</p>
<h2>How Jematell Homes helps</h2>
<p>We design each ESL home around its actual buildable area, integrating the NAOS set-aside, native-plant inventory, wash protection, and slope limits into the site plan from the start so the design fits the ordinance rather than fighting it. Because Scottsdale updates its ordinance and applies it parcel by parcel, we confirm the current ESL and NAOS requirements with the City of Scottsdale, and any applicable HOA, for your specific lot before committing to a plan.</p>`,
      shortAnswer:
        "Scottsdale's Environmentally Sensitive Lands Ordinance covers about 134 square miles of desert and hillside and requires a percentage of the lot to be kept as Natural Area Open Space, scaled by slope and sensitivity. With native-plant, wash, and grading limits, a large foothill lot can yield a small buildable area.",
      metaDescription:
        "How do Scottsdale's ESL ordinance and NAOS rules work? The overlay covers ~134 sq mi and requires preserved Natural Area Open Space, shrinking your buildable envelope.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["esl", "naos", "scottsdale", "hillside", "research-phase"],
      relatedFaqSlugs: [
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "how-do-i-know-if-a-lot-is-buildable",
        "how-long-does-permitting-take-in-scottsdale",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "designing-a-custom-home-around-your-lot-why-layout-matters-more-than-square-footage",
      featured: false,
      sortOrder: 15,
    }),
    item({
      slug: "hillside-and-grading-rules-in-fountain-hills",
      question: "What are the hillside and grading rules for building in Fountain Hills?",
      answerHtml: `<p><strong>Fountain Hills protects its steep desert terrain through its Zoning Ordinance, with hillside disturbance standards in Section 5.04 and grading standards in Section 5.02 that limit how much of a sloped lot you can disturb and how earthwork is done.</strong> On a hillside parcel these rules, not just setbacks, often decide where the home can sit and how large the pad can be.</p>
<h2>Why slope drives the rules</h2>
<p>Much of Fountain Hills sits on rolling-to-steep ground, and the town's ordinance treats steeper land as more sensitive. As average slope increases, the share of a lot that may be graded or built on decreases, so the natural landform is preserved and erosion and drainage risk are kept down. The steepest portions of a parcel are generally the most restricted, which is why a large lot with a dramatic grade can carry a comparatively small disturbance area.</p>
<h2>Hillside disturbance, Section 5.04</h2>
<p>Section 5.04 sets the framework for development on sloped land. In practice it tends to address:</p>
<ul>
<li><strong>Disturbance limits tied to slope.</strong> The percentage of the lot that may be disturbed steps down as the grade rises, with the steepest bands the most protected.</li>
<li><strong>Hillside protection easements.</strong> Undisturbed portions are often recorded so they stay natural, similar in spirit to a preserved open-space set-aside.</li>
<li><strong>Landform and revegetation.</strong> Cuts and fills are shaped to blend with natural contours, and disturbed areas are revegetated.</li>
<li><strong>Driveway and access constraints.</strong> Grades and alignments for the driveway are reviewed so access does not require excessive cutting.</li>
</ul>
<h2>Grading standards, Section 5.02</h2>
<p>Section 5.02 governs the earthwork itself: how cut-and-fill is engineered, how retaining is handled, how drainage and erosion control are provided, and when a grading permit and plan are required. On a desert lot this matters most during monsoon season, when site drainage has to move stormwater away from the structure without dumping it onto neighbors. Grading review usually runs alongside the building permit, and the two have to agree.</p>
<h2>Washes and natural drainage</h2>
<p>Sloped Fountain Hills lots often carry natural washes that channel monsoon runoff. The grading plan generally has to keep those flow paths working rather than filling them, which can further constrain where the pad and driveway go. Retaining walls, drainage swales, and energy-dissipation at outfalls are common on these sites, and they are reviewed for both function and appearance. Planning the drainage around the existing washes, instead of trying to reroute the whole lot, is usually the cleaner and less costly path.</p>
<h2>What this means for budget and timeline</h2>
<p>Hillside review adds engineering and review steps, so a sloped Fountain Hills lot generally takes longer to permit and costs more to make ready than a flat one. Retaining walls, deeper foundations, longer driveways, and import or export of soil are common cost drivers. Understanding the disturbance limit early tells you the true size of the home the lot can support before you fall for the view.</p>
<h2>How Jematell Homes helps</h2>
<p>We design hillside homes to the lot's allowed disturbance area, coordinating the foundation, grading, drainage, and driveway so the plan respects Sections 5.04 and 5.02 rather than triggering avoidable corrections. Because the town periodically updates its zoning ordinance and applies it parcel by parcel, we confirm the current hillside and grading standards with the Town of Fountain Hills, and any applicable HOA, for your specific lot before design is finalized.</p>`,
      shortAnswer:
        "Fountain Hills limits development on sloped lots through Zoning Ordinance Section 5.04 (hillside disturbance) and Section 5.02 (grading). The steeper the land, the smaller the share you may disturb, with undisturbed areas often preserved. Expect added engineering, drainage review, and cost on a hillside parcel.",
      metaDescription:
        "What are Fountain Hills' hillside and grading rules? Zoning Ordinance 5.04 limits disturbance by slope and 5.02 governs grading, shrinking the buildable area on steep lots.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["hillside", "grading", "fountain-hills", "slope", "research-phase"],
      relatedFaqSlugs: [
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "how-do-i-know-if-a-lot-is-buildable",
        "do-i-need-a-soils-or-geotechnical-report",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "building-on-your-own-lot-arizona",
      featured: false,
      sortOrder: 16,
    }),
    item({
      slug: "desert-and-dark-sky-design-rules-cave-creek-carefree",
      question: "What desert and dark-sky design rules apply in Cave Creek and Carefree?",
      answerHtml: `<p><strong>The Towns of Cave Creek and Carefree both protect their Sonoran Desert character through local zoning and building ordinances, with outdoor-lighting (dark-sky) standards, native-desert and grading provisions, and a development review process that shapes how a custom home looks and how it sits on the land.</strong> Each town is its own Authority Having Jurisdiction, so the rules differ from Scottsdale's and from each other.</p>
<h2>Dark-sky lighting</h2>
<p>Both communities place a high value on a dark night sky, and their lighting standards reflect that. Outdoor lighting on a new home generally must be shielded and aimed downward, kept within brightness limits, and designed to avoid light trespass onto neighbors and the sky. This affects exterior fixtures, landscape lighting, and security lighting, and it is reviewed as part of the plans rather than added as an afterthought. Designing fixtures and a lighting plan that comply from the start avoids redoing them later.</p>
<h2>Desert character and native vegetation</h2>
<p>The towns' ordinances emphasize keeping the natural desert intact:</p>
<ul>
<li><strong>Native plant protection and salvage.</strong> Protected desert plants are commonly inventoried and preserved or relocated rather than cleared.</li>
<li><strong>Grading and natural terrain.</strong> Earthwork is limited so the natural landform, washes, and boulders are retained where possible.</li>
<li><strong>Desert-appropriate exteriors.</strong> Low-reflectivity colors and materials that blend with the surroundings are favored, and heights are kept in scale with the terrain.</li>
<li><strong>Walls and setbacks.</strong> Building regulations and zoning set the envelope, with Cave Creek's building regulations carried in its town code.</li>
</ul>
<h2>Septic, lot size, and rural servicing</h2>
<p>Large stretches of both towns are not on municipal sewer, so many homes run on a septic or onsite wastewater system reviewed under Arizona Department of Environmental Quality standards through the county. Minimum lot sizes in the desert-zoned areas tend to be generous, which preserves the open, low-density character but also means utilities, access, and wastewater all have to be planned for the individual parcel rather than assumed. If a casita or second unit is in the plan, the septic system has to be sized for it from the start.</p>
<h2>Development review</h2>
<p>A custom home in either town moves through the town's review and permitting process, which can include design or site-plan review in addition to the building permit. Because these are smaller towns, the process and contacts differ from a big-city department, and the timeline depends on how complete and desert-sensitive the submittal is. Engaging the town early, before plans are far along, helps surface lighting, grading, and material expectations while they are still easy to address.</p>
<h2>A note on ADUs</h2>
<p>Both Cave Creek and Carefree fall under the 75,000-resident threshold in Arizona's statewide ADU law (HB 2720, A.R.S. 9-461.18), so that mandate does not apply here and any casita or guest house follows the town's own zoning. If a second unit is part of your plan, confirm the town's specific rules early.</p>
<h2>How Jematell Homes helps</h2>
<p>We design homes that read as part of the desert rather than imposed on it, building the dark-sky lighting plan, native-plant preservation, restrained grading, and desert-appropriate materials into the design and carrying them through each town's review. Because Cave Creek and Carefree update their ordinances on their own schedules and apply them parcel by parcel, we confirm the current zoning, lighting, and building standards with the town, and any applicable HOA, for your specific lot before finalizing a plan.</p>`,
      shortAnswer:
        "Cave Creek and Carefree protect their desert and night sky through local zoning and building ordinances: shielded, downward dark-sky lighting, native-plant preservation, restrained grading, and desert-appropriate materials, all run through town development review. Each town is its own AHJ, so the rules differ from Scottsdale's.",
      metaDescription:
        "What desert and dark-sky design rules apply in Cave Creek and Carefree? Shielded outdoor lighting, native-plant preservation, grading limits, and town development review.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["dark-sky", "cave-creek", "carefree", "desert-design", "research-phase"],
      relatedFaqSlugs: [
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "what-hb-2720-changed-for-adus-in-arizona",
        "how-do-i-know-if-a-lot-is-buildable",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "designing-your-custom-home-in-arizona-maximizing-view-light-and-comfort",
      featured: false,
      sortOrder: 17,
    }),
    item({
      slug: "what-an-hoa-architectural-committee-can-require",
      question: "What can an HOA's architectural committee require when I build a custom home?",
      answerHtml: `<p><strong>On a lot inside a homeowners association, an architectural or design review committee can regulate the look of your new home, but Arizona law sets limits on how it does so. A.R.S. 33-1817 frames how planned-community associations adopt and apply design guidelines, and A.R.S. 33-439 protects your right to install solar despite an HOA.</strong> Design review runs in parallel with the city or county permit, and both have to be satisfied.</p>
<h2>What design review typically covers</h2>
<p>An architectural committee generally reviews the exterior and site aspects of a build rather than the interior. Common subjects include:</p>
<ul>
<li><strong>Exterior materials and colors,</strong> often steered toward a desert palette.</li>
<li><strong>Roof form, height, and massing,</strong> within the community's standards.</li>
<li><strong>Setbacks and placement</strong> beyond the city minimums, where the community imposes them.</li>
<li><strong>Landscaping, walls, and fencing,</strong> including plant palettes and wall heights.</li>
<li><strong>Driveways, lighting, and accessory structures,</strong> including casitas and detached garages.</li>
</ul>
<h2>What Arizona law constrains</h2>
<p>A.R.S. 33-1817 addresses how a planned-community association regulates design through recorded guidelines and a review process. In general terms, the design framework is expected to be established in the community's documents, and decisions are meant to follow that framework rather than being made arbitrarily. Many associations also commit to a written decision within a set period and to giving reasons when an application is denied, so an applicant knows what to fix. The exact procedures and timelines are set in each community's declaration and design guidelines, which is why two HOAs can run very different processes.</p>
<h2>The solar carve-out</h2>
<p>One clear statutory limit is solar. A.R.S. 33-439 makes void any HOA provision that effectively prohibits the installation or use of a solar energy device. An association may still apply reasonable rules that do not significantly impair the device's function or unreasonably increase its cost, but a flat ban does not hold. If solar is in your plans, it is usually cleanest to design it into the roof from the start so it both performs well and reads as intentional to the committee.</p>
<h2>How it fits the overall timeline</h2>
<p>HOA design approval is separate from, and additional to, the municipal or county permit. Because it can take weeks to months on its own, it is best started in parallel with permitting rather than after. A complete, guideline-compliant submittal is the single biggest lever on getting through review without repeated cycles. None of this is legal advice; how a specific declaration and set of guidelines apply to your lot is a question for the association and, where needed, your own counsel.</p>
<h2>How Jematell Homes helps</h2>
<p>We design to the community's guidelines from the first concept, assemble the architectural-committee submittal, and run it alongside the building permit so the two tracks move together. We also design solar in where you want it, consistent with your rights under A.R.S. 33-439. Because every association's declaration and guidelines differ and are periodically amended, we confirm the current design-review requirements and timelines with your HOA, and the building requirements with your local AHJ, before finalizing the plan.</p>`,
      shortAnswer:
        "Inside an HOA, an architectural committee can regulate your home's exterior materials, colors, roof, placement, landscaping, and accessory structures, but A.R.S. 33-1817 expects decisions to follow recorded design guidelines, and A.R.S. 33-439 voids any flat HOA solar ban. Design review runs alongside, and on top of, your building permit.",
      metaDescription:
        "What can an HOA architectural committee require for a custom home? A.R.S. 33-1817 frames design review and A.R.S. 33-439 protects your right to install solar.",
      categorySlug: "design-zoning-adus",
      topicSlugs: ["zoning-setbacks-adus"],
      tags: ["hoa", "design-review", "ars-33-1817", "solar-rights", "research-phase"],
      relatedFaqSlugs: [
        "what-are-setbacks-lot-coverage-and-naos-rules",
        "what-hb-2720-changed-for-adus-in-arizona",
        "how-long-does-permitting-take-in-scottsdale",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: null,
      featured: false,
      sortOrder: 18,
    }),

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
      sortOrder: 19,
    }),
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
      sortOrder: 20,
    }),
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
      sortOrder: 21,
    }),
    // ====================== Building in the Desert ======================
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
      sortOrder: 1,
    }),
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
      sortOrder: 2,
    }),
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
      sortOrder: 3,
    }),
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
      sortOrder: 4,
    }),
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
      featured: false,
      sortOrder: 5,
    }),
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
      sortOrder: 6,
    }),
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
      sortOrder: 7,
    }),
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
      sortOrder: 8,
    }),
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
      sortOrder: 9,
    }),
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
      sortOrder: 10,
    }),
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
      sortOrder: 11,
    }),
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
    <p>There is rarely one answer for the whole house. A common high-performing desert recipe is spray foam at the roof deck for a conditioned attic (protecting the ducts), blown-in or batt in any remaining cavities, continuous exterior insulation on the walls to cut thermal bridging, and careful air sealing throughout. Budget, whether the ducts run through the attic, and your target energy performance steer the mix. We design the insulation and air-sealing strategy as a system with the wall assembly and the mechanical layout rather than picking a single product.</p>
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
      sortOrder: 12,
    }),
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
      sortOrder: 13,
    }),
    // ================== Choosing & Working With a Builder ==================
    item({
      slug: "how-to-choose-a-custom-home-builder-in-arizona",
      question: "How do I choose a custom home builder in Arizona?",
      answerHtml: `<p><strong>Choose an Arizona custom home builder by verifying their Registrar of Contractors (ROC) license and bond first, then comparing how they communicate, price, and stand behind their work. The strongest signals are an active, correctly classified ROC license, real local references you can call, transparent fixed-price or cost-plus contracts, and recent homes built in your market that match the quality and style you want.</strong> Price matters, but it is the last filter, not the first, because the cheapest bid often hides the most risk.</p>
    <h2>Start with the license, not the portfolio</h2>
    <p>Before you fall in love with a builder's photos, confirm they are legally allowed to build your home. In Arizona, new home construction must be performed by a contractor licensed by the Arizona Registrar of Contractors (ROC) under A.R.S. Title 32, Chapter 10. A residential custom home is typically built under a "B" General Residential Contractor license or one of the dual "KB" building classifications. Use the free license lookup at roc.az.gov to confirm the license is active, in good standing, correctly classified for residential work, and free of a pattern of unresolved complaints. A builder who hesitates to give you their ROC number is telling you something important.</p>
    <h2>What questions separate a great builder from an average one?</h2>
    <p>Once licensing checks out, the right conversations reveal fit. Ask each builder you are considering:</p>
    <ul>
    <li><strong>How do you price a custom home, fixed-price or cost-plus?</strong> Understand exactly what is and is not included, and how allowances work.</li>
    <li><strong>How are change orders handled and priced?</strong> A clear written process protects both sides.</li>
    <li><strong>Who is my day-to-day contact and how often will I get updates?</strong> Communication is the single biggest driver of how a build feels.</li>
    <li><strong>What warranty do you provide, and who answers the phone after move-in?</strong></li>
    <li><strong>Can I speak with two or three clients whose homes you finished in the last year or two?</strong></li>
    </ul>
    <h2>How do I compare builders fairly?</h2>
    <p>Get proposals from a short list of two or three builders and compare them on the same scope, not just the bottom-line number. A lower bid that assumes thin allowances, excludes site work, or leaves out permitting will balloon later through change orders. Look for an apples-to-apples breakdown: the building shell, allowances for finishes, site and utility work, permitting and fees, and the builder's fee. The builder who explains where your money goes is usually the one who will manage it well.</p>
    <h2>Why does local Arizona experience matter so much?</h2>
    <p>Building in the desert and across our jurisdictions is its own discipline. A builder who works in Scottsdale, Rio Verde, Phoenix, Cave Creek, Fountain Hills, Carefree, and the Pinal County markets every day knows which Authority Having Jurisdiction (AHJ) governs a given parcel, how Scottsdale's Environmentally Sensitive Lands rules and hillside reviews work, how wells and septic are permitted on rural land, and how to design for extreme heat, expansive soils, and monsoon drainage. That local fluency keeps your plan-review cycles short and your schedule predictable. A builder new to your jurisdiction learns on your time and your budget.</p>
    <h2>Red flags to walk away from</h2>
    <ul>
    <li>No verifiable ROC license, or a license in the wrong classification.</li>
    <li>A bid far below the others, or pressure to sign quickly.</li>
    <li>A large upfront deposit demand with no milestone schedule.</li>
    <li>Vague or verbal-only scope, allowances, and warranty terms.</li>
    <li>No recent local references, or references they will not let you contact.</li>
    </ul>
    <h2>How Jematell Homes fits in</h2>
    <p>We are a family-owned custom builder working across Scottsdale, Rio Verde, and the greater Phoenix metro, and we encourage you to verify our ROC license, talk to our clients, and read our contract line by line before you commit to anyone. Because license status, bonding requirements, and adopted codes change, always confirm a builder's current standing directly with the Arizona Registrar of Contractors at roc.az.gov and confirm jurisdiction-specific requirements with your local AHJ before you sign.</p>`,
      shortAnswer:
        "Verify the builder's Arizona Registrar of Contractors license and bond first, then compare communication, pricing transparency, warranty, and recent local references. Get apples-to-apples proposals on the same scope rather than chasing the lowest bid, and favor a builder with real experience in your specific Arizona jurisdiction.",
      metaDescription:
        "How to choose a custom home builder in Arizona: verify the ROC license and bond, compare contracts and references, and prioritize local jurisdiction experience over the lowest bid.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["choosing-a-builder", "roc-license", "arizona", "hiring", "research-phase"],
      relatedFaqSlugs: [
        "what-to-ask-a-custom-home-builder-before-hiring",
        "red-flags-when-choosing-a-custom-home-builder",
        "how-to-verify-an-arizona-contractor-license",
        "custom-vs-semi-custom-vs-spec-home",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "choosing-the-best-home-builder-in-scottsdale-key-considerations-for-2026",
      sortOrder: 1,
    }),
    item({
      slug: "what-to-ask-a-custom-home-builder-before-hiring",
      question: "What should I ask a custom home builder before hiring them?",
      answerHtml: `<p><strong>Before hiring a custom home builder in Arizona, ask about their Registrar of Contractors (ROC) license and bond, how they price and what their bid includes, how change orders and allowances work, who manages your project day to day, what their warranty covers, and for recent local client references you can actually call. The answers, and how openly they are given, tell you more than any brochure.</strong> Treat the first meeting like an interview, because you are hiring a partner for a year or more.</p>
    <h2>Questions about licensing and accountability</h2>
    <ul>
    <li><strong>What is your ROC license number, and what classification is it?</strong> You can verify it free at roc.az.gov; a new home is built under a "B" residential or dual "KB" building classification.</li>
    <li><strong>Are you bonded and insured, and can you show current certificates?</strong> Arizona licensed contractors carry a license bond, and you want proof of general liability and workers' compensation coverage.</li>
    <li><strong>Have you had complaints filed with the ROC, and how were they resolved?</strong> A complaint is not automatically disqualifying; how it was handled matters.</li>
    </ul>
    <h2>Questions about price and contract</h2>
    <ul>
    <li><strong>Is this a fixed-price or a cost-plus contract, and what exactly is included?</strong></li>
    <li><strong>How do you set allowances for finishes, and what happens if I go over?</strong></li>
    <li><strong>What is your written change-order process and how are changes priced?</strong></li>
    <li><strong>What deposit do you require, and what is the milestone-based payment (draw) schedule?</strong></li>
    <li><strong>What is not included in this price that I should budget for separately?</strong> Site work, permitting and fees, wells, and septic are common exclusions on rural lots.</li>
    </ul>
    <h2>Questions about how the build will actually run</h2>
    <ul>
    <li><strong>Who is my single point of contact, and how often will I get updates?</strong></li>
    <li><strong>How many homes are you building at once right now?</strong> A builder spread too thin is a scheduling risk.</li>
    <li><strong>Do you self-perform any trades or manage subcontractors, and how do you vet them?</strong></li>
    <li><strong>How do you handle permitting and inspections with the local AHJ?</strong></li>
    <li><strong>What is your realistic timeline, and what tends to move it?</strong></li>
    </ul>
    <h2>Questions about experience and the warranty</h2>
    <ul>
    <li><strong>Have you built in my specific jurisdiction, and recently?</strong> Scottsdale ESL and hillside lots, unincorporated Maricopa County, and Pinal County each carry different rules.</li>
    <li><strong>Can I see and visit a recent finished home, and speak with the owners?</strong></li>
    <li><strong>What does your warranty cover, for how long, and who responds after move-in?</strong></li>
    </ul>
    <h2>Why the answers matter more than the words</h2>
    <p>A strong builder welcomes these questions and answers in writing. Watch for evasiveness on price breakdowns, reluctance to share references, a push for a large upfront deposit, or vague warranty language. Those are the patterns that turn into problems once construction starts. The Arizona ROC also publishes consumer guidance on hiring a licensed contractor and on the Residential Contractors' Recovery Fund, which only protects you when you hire a licensed contractor, so verifying the license is not a formality, it is your safety net.</p>
    <h2>How Jematell Homes approaches it</h2>
    <p>We would rather you ask every one of these questions up front than discover a surprise mid-build, so we put pricing, allowances, the change-order process, and the warranty in writing and connect you with recent clients in your market. Because license status, bond amounts, and adopted codes change, confirm any builder's current standing with the Arizona Registrar of Contractors at roc.az.gov and verify jurisdiction-specific requirements with your local AHJ before you sign a contract.</p>`,
      shortAnswer:
        "Ask for the builder's ROC license number and bond, exactly what the bid includes, how allowances and change orders work, the deposit and draw schedule, who manages the build day to day, the warranty terms, and recent local references you can call. How openly they answer matters as much as the answers.",
      metaDescription:
        "The key questions to ask a custom home builder before hiring in Arizona: ROC license and bond, what the bid includes, allowances, change orders, draw schedule, warranty, and references.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["questions-to-ask", "choosing-a-builder", "hiring", "contracts", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "red-flags-when-choosing-a-custom-home-builder",
        "how-to-verify-an-arizona-contractor-license",
        "the-custom-home-building-process-step-by-step",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug: "questions-to-ask-custom-home-builder-arizona",
      sortOrder: 2,
    }),
    item({
      slug: "red-flags-when-choosing-a-custom-home-builder",
      question: "What are the red flags to watch for when choosing a custom home builder?",
      answerHtml: `<p><strong>The biggest red flags when choosing a custom home builder are no verifiable Arizona Registrar of Contractors (ROC) license, a bid far below the others, pressure to sign or pay quickly, a large upfront deposit with no milestone schedule, vague or verbal-only contracts, and no recent local references. Any one of these is a reason to slow down; two or more is a reason to walk away.</strong> A custom home is a long, high-trust relationship, and the warning signs almost always appear before you sign.</p>
    <h2>Licensing and accountability red flags</h2>
    <ul>
    <li><strong>No ROC license, or one in the wrong classification.</strong> New home construction in Arizona must be done by a contractor licensed under A.R.S. Title 32, Chapter 10. Verify the number at roc.az.gov and confirm it is active and classified for residential work. Hiring an unlicensed builder also forfeits your protection under the Residential Contractors' Recovery Fund.</li>
    <li><strong>No proof of bond or insurance.</strong> A licensed Arizona contractor carries a license bond; you should also see general liability and workers' compensation certificates.</li>
    <li><strong>A pattern of unresolved ROC complaints.</strong> One resolved complaint is normal; a string of open ones is not.</li>
    </ul>
    <h2>Why is the lowest bid often the biggest risk?</h2>
    <p>A bid well below the rest is rarely a gift. It usually means thin or unrealistic finish allowances, excluded scope such as site work or permitting, or an intent to recover margin later through change orders. When you normalize the bids to the same scope, the cheap one frequently is not cheap at all. Be especially wary of a builder who cannot or will not break down where your money goes. Transparency on the numbers is the antidote to bid-shopping surprises.</p>
    <h2>Money and contract red flags</h2>
    <ul>
    <li><strong>A large deposit demanded up front</strong> with no milestone-based draw schedule tied to completed work.</li>
    <li><strong>A request to be paid in cash, or to pull the permit in your name as the owner-builder.</strong> If a builder asks you to be the owner-builder of record, you are taking on the legal responsibilities of the contractor and losing key consumer protections.</li>
    <li><strong>Vague scope, allowances, or warranty,</strong> or a refusal to put commitments in writing.</li>
    <li><strong>No clear written change-order process.</strong></li>
    </ul>
    <h2>Communication and reputation red flags</h2>
    <ul>
    <li><strong>Slow, evasive, or inconsistent answers</strong> during the courtship phase, when a builder should be at their most responsive.</li>
    <li><strong>No recent local references,</strong> or references the builder will not let you contact.</li>
    <li><strong>No finished homes you can visit</strong> in or near your market.</li>
    <li><strong>High-pressure tactics or artificial deadlines</strong> to get you to sign.</li>
    </ul>
    <h2>Arizona-specific red flags</h2>
    <p>Local fluency is a safety check of its own. A builder who is unsure which Authority Having Jurisdiction governs your parcel, who has not worked under Scottsdale's Environmentally Sensitive Lands or hillside rules, who is vague about how wells and septic are permitted on a rural lot, or who underestimates desert heat, expansive soils, and monsoon drainage is likely to learn on your budget. In our markets, that inexperience shows up as stalled plan-review cycles and costly redesigns.</p>
    <h2>How to protect yourself</h2>
    <p>Verify the ROC license, get written proposals from two or three builders on the same scope, read the contract and warranty in full, insist on a milestone draw schedule, and call recent clients. The Arizona ROC publishes consumer guidance on hiring a licensed contractor and on filing a complaint, which is worth reading before you commit. Because license status, bond requirements, and adopted codes change, confirm any builder's current standing with the Arizona Registrar of Contractors at roc.az.gov and verify jurisdiction-specific requirements with your local AHJ before you sign.</p>`,
      shortAnswer:
        "Watch for no verifiable ROC license, a suspiciously low bid, pressure to sign fast, a big upfront deposit with no milestone draw schedule, vague or verbal-only contracts, and no recent local references. Hiring an unlicensed builder also forfeits Recovery Fund protection. Two or more of these is a reason to walk away.",
      metaDescription:
        "Red flags when choosing a custom home builder in Arizona: no ROC license, a too-low bid, large upfront deposits, vague contracts, owner-builder requests, and no local references.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["red-flags", "choosing-a-builder", "roc-license", "hiring", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "what-to-ask-a-custom-home-builder-before-hiring",
        "how-to-verify-an-arizona-contractor-license",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "choosing-the-best-home-builder-in-scottsdale-key-considerations-for-2026",
      sortOrder: 3,
    }),
    item({
      slug: "design-build-vs-design-bid-build",
      question: "What is the difference between design-build and design-bid-build, and which is right for a custom home?",
      answerHtml: `<p><strong>In design-bid-build, you hire a designer or architect to finish the plans, then put those plans out to bid and hire a separate builder to construct them. In design-build, a single team is responsible for both the design and the construction under one contract. Design-build gives you one point of accountability, earlier and more reliable cost feedback, and usually a smoother schedule, which is why it is a popular choice for custom homes.</strong> Neither is universally right; the best fit depends on how much control, cost certainty, and coordination you want.</p>
    <h2>How does design-bid-build work?</h2>
    <p>The traditional, sequential path looks like this:</p>
    <ol>
    <li>You hire an architect or designer and complete the design and construction documents.</li>
    <li>You send the finished plans to several general contractors for competitive bids.</li>
    <li>You select a builder and sign a separate construction contract.</li>
    <li>The builder constructs the home from the completed plans.</li>
    </ol>
    <p>The appeal is competitive bidding on a fully defined scope and a clear separation between the designer and the builder. The drawbacks are that design happens without builder cost input, so plans can come back over budget and require redesign; the schedule is longer because the phases are sequential; and when problems arise on site, the designer and builder can point at each other, leaving you in the middle.</p>
    <h2>How does design-build work?</h2>
    <p>In design-build, one integrated team handles design and construction together under a single contract. Design and budgeting happen in parallel rather than in sequence, so the builder is pricing the home as it is being designed. The benefits for a custom home are real:</p>
    <ul>
    <li><strong>Single point of accountability.</strong> One team owns the outcome, so there is no finger-pointing between designer and builder.</li>
    <li><strong>Earlier, more reliable cost feedback.</strong> You learn what choices cost while you can still adjust them, which reduces the over-budget redesign loop.</li>
    <li><strong>A faster, smoother schedule.</strong> Overlapping design and preconstruction compresses the timeline.</li>
    <li><strong>Constructability built in.</strong> The builder flags site, code, and material issues during design, not after permitting.</li>
    </ul>
    <p>The trade-off is that you are placing more trust in one team, so vetting that team, its licensing, references, and contract, matters even more.</p>
    <h2>Which is right for a custom home?</h2>
    <p>If you value cost certainty, speed, and a single responsible party, design-build is usually the better fit, especially on complex Arizona lots where site work, wells, septic, grading, and overlay rules need to be coordinated with the design from day one. Design-bid-build can make sense if you already have a completed design you love, or you specifically want to keep the designer fully independent from the builder and are comfortable managing the coordination yourself.</p>
    <h2>What this means for an Arizona build</h2>
    <p>On desert lots, the design has to respond to the lot before it is final: which Authority Having Jurisdiction governs the parcel, whether Scottsdale's Environmentally Sensitive Lands or a hillside overlay applies, how a well and septic will be placed, and how grading will handle monsoon runoff. A design-build team folds those realities in early, which is exactly when changes are cheap. Whichever model you choose, confirm the builder's license and classification with the Arizona Registrar of Contractors at roc.az.gov, and verify the rules for your specific parcel with your local AHJ, because adopted codes and jurisdiction requirements change.</p>`,
      shortAnswer:
        "In design-bid-build you complete the design first, then bid it out and hire a separate builder; the phases are sequential and the designer and builder are independent. In design-build, one team handles design and construction under one contract, giving you a single point of accountability, earlier cost feedback, and a faster schedule. Design-build suits most custom homes.",
      metaDescription:
        "Design-build vs design-bid-build for a custom home: how each delivery method works, the trade-offs in cost certainty and schedule, and which is the better fit in Arizona.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["design-build", "design-bid-build", "delivery-method", "choosing-a-builder", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "the-custom-home-building-process-step-by-step",
        "custom-vs-semi-custom-vs-spec-home",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "choosing-the-best-home-builder-in-scottsdale-key-considerations-for-2026",
      sortOrder: 4,
    }),
    item({
      slug: "how-to-verify-an-arizona-contractor-license",
      question: "How do I verify a builder's Arizona contractor license, and why does it matter?",
      answerHtml: `<p><strong>Verify an Arizona builder's license for free at the Registrar of Contractors website, roc.az.gov, using the contractor search tool to confirm the license is active, correctly classified for residential work, bonded, and free of a pattern of unresolved complaints. It matters because state law requires a license to build a home, and hiring a licensed contractor is what gives you access to the Residential Contractors' Recovery Fund if a project goes wrong.</strong> This single check is the most important five minutes of due diligence you will do.</p>
    <h2>How do I look up an Arizona contractor license?</h2>
    <ol>
    <li>Go to the Arizona Registrar of Contractors (ROC) at roc.az.gov and open the contractor search.</li>
    <li>Search by the license number, the business name, or the qualifying party's name.</li>
    <li>Confirm the license status is <strong>active</strong>, not suspended, revoked, or expired.</li>
    <li>Confirm the <strong>classification</strong> covers residential building (see below).</li>
    <li>Review the license history, bond information, and any complaint or disciplinary records.</li>
    </ol>
    <h2>What license classification should a custom home builder have?</h2>
    <p>Arizona issues separate license classifications under A.R.S. Title 32, Chapter 10. For building a new custom home, the relevant residential classifications include:</p>
    <ul>
    <li><strong>B - General Residential Contractor.</strong> The core classification for building a new single-family home and managing the trades.</li>
    <li><strong>B-2 and related residential remodeling/repair classes.</strong> Aimed more at remodeling and specific scopes than at building a whole new home.</li>
    <li><strong>Dual "KB" building classifications.</strong> These let a contractor perform both commercial and residential building work.</li>
    </ul>
    <p>Classifications and their exact letter codes are set by the ROC and can be updated, so confirm on roc.az.gov that the specific license you are checking is authorized for new residential construction rather than assuming a letter means what you expect.</p>
    <h2>Why does hiring a licensed contractor matter so much?</h2>
    <p>Three reasons make this non-negotiable in Arizona:</p>
    <ul>
    <li><strong>It is the law.</strong> Building a home is contracting work that requires an ROC license. An unlicensed builder is operating illegally, which tells you how they treat every other rule.</li>
    <li><strong>The license carries a bond.</strong> Licensed contractors post a license bond, a financial backstop that an unlicensed operator does not provide.</li>
    <li><strong>The Recovery Fund only protects you with a licensed contractor.</strong> Arizona maintains the Residential Contractors' Recovery Fund, which can reimburse a qualifying homeowner for certain damages caused by a licensed residential contractor's poor or incomplete work, up to a statutory cap (as of 2026, on the order of tens of thousands of dollars per transaction, with an aggregate limit per contractor). Hire an unlicensed builder and that safety net disappears entirely.</li>
    </ul>
    <h2>What about the owner-builder option?</h2>
    <p>Arizona allows a property owner to act as their own builder (owner-builder) on their own property under limited conditions, but doing so means you take on the legal responsibilities of a licensed contractor, you generally cannot sell the home for a set period without it looking like unlicensed contracting, and you lose Recovery Fund protection. If a builder asks you to pull the permit as the owner-builder, treat it as a serious red flag, because it shifts the risk onto you.</p>
    <h2>How Jematell Homes handles it</h2>
    <p>We want you to verify our license before you trust us with your home, so we provide our ROC number and encourage you to look it up. Because license status, bond amounts, classification codes, and Recovery Fund limits change, confirm the current details directly with the Arizona Registrar of Contractors at roc.az.gov, and verify any parcel-specific permitting requirements with your local Authority Having Jurisdiction before you sign.</p>`,
      shortAnswer:
        "Use the free contractor search at roc.az.gov to confirm the license is active, classified for residential building (typically a B or dual KB classification), bonded, and clear of unresolved complaints. It matters because Arizona requires a license to build a home, and only a licensed contractor gives you access to the Residential Contractors' Recovery Fund.",
      metaDescription:
        "How to verify an Arizona contractor license at roc.az.gov: check status, the B or KB residential classification, bonding, and complaints, plus why the Recovery Fund only covers licensed builders.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["roc-license", "license-verification", "recovery-fund", "choosing-a-builder", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "red-flags-when-choosing-a-custom-home-builder",
        "what-to-ask-a-custom-home-builder-before-hiring",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "choosing-the-best-home-builder-in-scottsdale-key-considerations-for-2026",
      sortOrder: 5,
    }),
    item({
      slug: "custom-vs-semi-custom-vs-spec-home",
      question: "What is the difference between a custom, semi-custom, and spec home?",
      answerHtml: `<p><strong>A custom home is designed from scratch for you on your lot, with full control over the floor plan, materials, and every selection. A semi-custom home starts from a builder's existing floor plan that you personalize within set options, which is faster and more cost-predictable. A spec (speculative) home is one a builder designs and builds without a specific buyer, then sells finished or nearly finished, with little or no customization.</strong> The right choice comes down to how much control, time, and budget flexibility you want.</p>
    <h2>What is a custom home?</h2>
    <p>A custom home is built to a one-of-a-kind design created for you, usually on land you own or are buying. You and your design-build team shape the floor plan, architecture, finishes, and systems around your site, your lifestyle, and your budget. The advantages are total control and a home that fits your lot's orientation, views, and constraints exactly. The trade-offs are that it takes the longest, requires the most decisions from you, and carries the widest cost range because nearly everything is a choice. Custom is the path when the home and the land both need to be exactly right.</p>
    <h2>What is a semi-custom home?</h2>
    <p>A semi-custom home begins with a proven floor plan from the builder's portfolio, which you then personalize: choosing finishes, cabinetry, fixtures, and often a menu of structural options such as an extended garage, a casita, or a different elevation. Because the core plan is already engineered and priced, a semi-custom build is typically faster and more cost-predictable than a fully custom one, while still letting the home feel like yours. The trade-off is less freedom than a blank-page design. Semi-custom is a strong middle path for buyers who want personalization without managing every decision from zero.</p>
    <h2>What is a spec home?</h2>
    <p>A spec, or speculative, home is built by the builder on the builder's lot without a specific buyer in mind, based on what the builder expects the market to want. You buy it complete or, if you catch it mid-construction, sometimes with a chance to pick remaining finishes. The advantages are speed and certainty: you can often move in quickly and you see the finished product before you commit. The trade-offs are little to no customization and no say over the lot or layout. Spec is the path when you want a high-quality new home without the design process or the wait.</p>
    <h2>How do I choose between them?</h2>
    <ul>
    <li><strong>Choose custom</strong> if you own or want a specific lot and want full control over design and finishes, and you can invest the time.</li>
    <li><strong>Choose semi-custom</strong> if you want a personalized home with more cost and schedule predictability and fewer decisions to manage.</li>
    <li><strong>Choose a spec home</strong> if you want a new, move-in-ready home quickly and are comfortable with the builder's design and lot.</li>
    </ul>
    <h2>What this means in our Arizona markets</h2>
    <p>On many lots across Scottsdale, Rio Verde, and the greater Phoenix metro, the land itself drives the decision. A rural parcel with well and septic needs, a hillside or Environmentally Sensitive Lands overlay, or unusual views often rewards the custom or semi-custom path, because the home has to respond to the site. A spec home removes those variables but also removes your input on them. Whichever route you take, confirm the builder's license and classification with the Arizona Registrar of Contractors at roc.az.gov, and verify any lot-specific requirements with the local Authority Having Jurisdiction, since codes and rules change by jurisdiction and over time.</p>`,
      shortAnswer:
        "A custom home is designed from scratch for you on your lot with full control. A semi-custom home personalizes a builder's existing plan within set options, so it is faster and more cost-predictable. A spec home is built without a specific buyer and sold finished, with little or no customization. The choice depends on how much control, time, and budget flexibility you want.",
      metaDescription:
        "Custom vs semi-custom vs spec home explained: how each differs in design control, cost predictability, and timeline, and how to choose the right path for an Arizona build.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["custom-home", "semi-custom", "spec-home", "choosing-a-builder", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "the-custom-home-building-process-step-by-step",
        "design-build-vs-design-bid-build",
      ],
      relatedServiceSlugs: ["custom-homes", "spec-homes", "floor-plans"],
      pillarBlogSlug: null,
      sortOrder: 6,
    }),
    item({
      slug: "the-custom-home-building-process-step-by-step",
      question: "What are the steps to build a custom home, from first meeting to move-in?",
      answerHtml: `<p><strong>Building a custom home moves through a clear sequence of stages: choosing a builder, setting a budget and securing financing, selecting and vetting the lot, design and engineering, finalizing selections and allowances, permitting and plan review, site work and foundation, framing, the rough-in and finish phases, and finally inspections and the certificate of occupancy before move-in.</strong> Understanding the stages, and the decisions each one asks of you, is what keeps a custom build calm instead of chaotic.</p>
    <h2>Stage 1: Choose your builder and align on vision</h2>
    <p>The process starts before any drawing exists. You interview builders, verify each one's Arizona Registrar of Contractors (ROC) license at roc.az.gov, check references, and align on your goals, style, and rough budget. In a design-build model, this team will carry both the design and the construction, so choosing well here shapes everything that follows.</p>
    <h2>Stage 2: Set the budget and secure financing</h2>
    <p>Establish a realistic budget early, including the home, site work, permitting and fees, and a contingency. If you are financing, get pre-approved for a construction-to-permanent (one-time-close) loan, which funds the build in draws and converts to a mortgage at completion. The budget set here becomes the discipline that guides every later decision.</p>
    <h2>Stage 3: Select and vet the lot</h2>
    <p>If you do not already own land, lot selection and due diligence come next, and on Arizona lots this is where deals are made or broken. Confirm the Authority Having Jurisdiction, zoning and setbacks, legal access, utility availability or the need for a well and septic, soils, floodplain status, and any overlays such as Scottsdale's Environmentally Sensitive Lands or a hillside district. A buildable lot is the foundation of a buildable design.</p>
    <h2>Stage 4: Design and engineering</h2>
    <p>Design typically moves through phases:</p>
    <ol>
    <li><strong>Schematic design</strong> establishes the layout, massing, and how the home sits on the lot.</li>
    <li><strong>Design development</strong> refines rooms, elevations, and major systems.</li>
    <li><strong>Construction documents</strong> produce the detailed, engineered drawings the permit and the builder work from.</li>
    </ol>
    <p>Structural engineering, energy calculations, and a site and grading plan are completed here so the plans are ready for review.</p>
    <h2>Stage 5: Finalize selections and allowances</h2>
    <p>You lock in finishes, fixtures, cabinetry, and materials, converting allowances into real selections. Making these decisions before construction, rather than during it, is the single best way to avoid costly change orders and schedule slips later.</p>
    <h2>Stage 6: Permitting and plan review</h2>
    <p>The completed plans go to the AHJ for plan review. Reviewers return comments, your team resubmits, and most custom homes go through two or three correction cycles before the permit issues. On rural lots, septic and well permits are sequenced here so they do not hold up the building permit.</p>
    <h2>Stage 7: Site work and foundation</h2>
    <p>With the permit in hand, construction begins: clearing and grading, utility and septic work, then the foundation. In the desert, grading and drainage are engineered to move monsoon runoff away from the home.</p>
    <h2>Stage 8: Framing and dry-in</h2>
    <p>The structure goes up, the roof goes on, and windows and exterior doors are installed so the home is weather-tight, or dried in. This is when the design becomes physically real and you can walk the spaces.</p>
    <h2>Stage 9: Rough-in and inspections</h2>
    <p>Electrical, plumbing, and mechanical systems are roughed in inside the framed walls, each passing its own inspection before anything is covered. Insulation follows once the rough-ins pass.</p>
    <h2>Stage 10: Finishes</h2>
    <p>Drywall, interior trim, cabinetry, countertops, flooring, fixtures, paint, and exterior finishes bring the home to completion. Your earlier selections all land in this stage.</p>
    <h2>Stage 11: Final inspections and certificate of occupancy</h2>
    <p>The AHJ performs final inspections across all trades. When they pass, the jurisdiction issues a certificate of occupancy, which legally clears the home for move-in.</p>
    <h2>Stage 12: Walkthrough, closeout, and warranty</h2>
    <p>You and your builder do a final walkthrough, create a punch list of any items to address, and the builder completes them. The home is handed over with its warranty, and a good builder remains your point of contact afterward.</p>
    <h2>How Jematell Homes guides you through it</h2>
    <p>We manage every stage, from jurisdiction and lot due diligence through permitting, construction, and closeout, so the coordination is ours and the decisions are yours. This walkthrough describes the stages, not a fixed timeline, and because adopted codes, fees, and processing times change, we confirm the current requirements with your local AHJ and our standing with the Arizona Registrar of Contractors at roc.az.gov for your specific project.</p>`,
      shortAnswer:
        "A custom build moves through choosing a builder, setting a budget and financing, vetting the lot, design and engineering, finalizing selections, permitting and plan review, site work and foundation, framing and dry-in, rough-in and finish phases, then final inspections and the certificate of occupancy before move-in and warranty handoff.",
      metaDescription:
        "The steps to build a custom home in Arizona, from first builder meeting to move-in: budget and financing, lot due diligence, design, permitting, construction phases, and certificate of occupancy.",
      categorySlug: "choosing-a-builder",
      topicSlugs: ["choosing-a-custom-home-builder"],
      tags: ["building-process", "steps", "custom-home", "choosing-a-builder", "research-phase"],
      relatedFaqSlugs: [
        "how-to-choose-a-custom-home-builder-in-arizona",
        "design-build-vs-design-bid-build",
        "custom-vs-semi-custom-vs-spec-home",
        "how-long-does-it-take-to-build-a-custom-home",
      ],
      relatedServiceSlugs: ["custom-homes", "build-on-your-lot"],
      pillarBlogSlug:
        "what-custom-home-builders-need-from-you-before-the-first-design-meeting",
      sortOrder: 7,
    }),
  ],
};