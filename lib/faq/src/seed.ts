import type { FaqSeed, SeedItem } from "./types";

// =============================================================================
// FAQ SEED — SINGLE SOURCE OF TRUTH
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
        "What it takes to get a custom home approved in Arizona — jurisdiction, building codes, the plan-review process, and inspections.",
      metaDescription:
        "Building permits, adopted codes, plan review, and inspections for a custom home in Maricopa County, Scottsdale, and the greater Phoenix metro.",
      sortOrder: 1,
    },
    {
      slug: "land-and-due-diligence",
      title: "Land & Due Diligence",
      description:
        "How to tell whether a lot is buildable before you buy — zoning, access, utilities, soils, floodplain, and the studies a builder relies on.",
      metaDescription:
        "Arizona land due diligence — confirming a lot is buildable, checking zoning, access, utilities, soils, and floodplain before you commit.",
      sortOrder: 2,
    },
    {
      slug: "water-septic-utilities",
      title: "Water, Septic & Utilities",
      description:
        "Building beyond city services — wells, hauled water, septic systems, and Arizona's water-supply rules on rural and outlying lots.",
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
        "How zoning shapes what you can build — setbacks, lot coverage, hillside and open-space rules, and casitas, guest houses, and ADUs.",
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
  ],
  topics: [
    {
      slug: "building-permits-arizona",
      title: "Building Permits in Arizona",
      description:
        "Who has authority over your parcel, which permits a custom home needs, the adopted codes, and how long approval takes.",
      metaDescription:
        "How building permits work for a custom home in Arizona — jurisdiction, required permits, adopted codes, plan review, and timelines.",
      sortOrder: 1,
    },
    {
      slug: "buying-land-to-build",
      title: "Buying Land to Build On",
      description:
        "The due diligence that tells you whether a homesite will actually work — and what to verify before you make an offer.",
      metaDescription:
        "Buying land to build a custom home in Arizona — the due diligence, studies, and lot checks that determine whether a parcel is buildable.",
      sortOrder: 2,
    },
    {
      slug: "rural-water-and-septic",
      title: "Rural Water & Septic",
      description:
        "Supplying water and handling wastewater where there is no city hookup — wells, hauled water, septic systems, and the rules behind them.",
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
        "Budgeting a custom home in Arizona — realistic cost ranges, what drives price, allowances, change orders, and construction loans.",
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
        "Do you need a permit to build a custom home in Maricopa County? Yes — building, grading, septic, well, and access permits, plus how the approval process works.",
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
<li><strong>Soils and foundations</strong> — expansive clays and caliche drive foundation and grading requirements.</li>
<li><strong>Energy and cooling</strong> — insulation, glazing, and HVAC efficiency rules tuned for extreme summer heat.</li>
<li><strong>Drainage and grading</strong> — how a site must handle stormwater and monsoon runoff.</li>
<li><strong>Pools, walls, and solar</strong> — barrier, height, and equipment standards that often need their own permits.</li>
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
        "Do you need a soils or geotechnical report to build in Arizona? Usually yes — it drives foundation design and is typically required for plan approval.",
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
        "Can you build on rural Arizona land without city water or sewer? Yes — with a well or hauled water plus a septic system. Here's how each works and what to verify.",
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
<p>The Arizona Department of Water Resources (ADWR) runs the Assured and Adequate Water Supply programs to protect groundwater. Inside an <strong>Active Management Area (AMA)</strong> — and the Phoenix metro sits within the Phoenix AMA — a new subdivision must prove a physically available, legally secure, and continuously available 100-year water supply as a condition of approval.</p>
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
<p>If you are building on your own land, remember that the parcel price plus the cost to make it ready — power extension, water, septic, grading, driveway — can rival the difference between two finish levels. This is why our due-diligence answer stresses pricing the site before you commit.</p>
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
<p>An allowance is a set amount budgeted for a category of selections you have not chosen yet — flooring, cabinetry, countertops, lighting, plumbing fixtures, or appliances. It lets the project price and proceed before every detail is decided. When you make your final selections, the actual cost is compared to the allowance:</p>
<ul>
<li>Choose finishes that cost <strong>less</strong> than the allowance, and you save against that amount.</li>
<li>Choose something <strong>more expensive</strong>, and the difference is added to your price.</li>
</ul>
<p>Realistic allowances are everything. An estimate padded with low allowances can look attractive and then climb steeply once real selections are made. We set allowances at levels that reflect the finishes our clients actually choose, so the starting number is honest.</p>
<h2>How change orders work</h2>
<p>A change order documents any change to the agreed scope after the contract is set — moving a wall, upgrading a system, adding a feature, or responding to a condition discovered on site. A good change order states the work, the cost, and any schedule impact, and is approved before the work proceeds. That paper trail is what keeps everyone aligned and the budget under control.</p>
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
<p>The most common path is a construction-to-permanent ("one-time close") loan. It funds the build in <strong>draws</strong> tied to completed milestones — foundation, framing, and so on — with an inspection before each release. During construction you usually pay interest only on the amount drawn so far, which keeps early payments lower. When the home is complete, the loan rolls into a long-term mortgage, often without a second closing.</p>
<h2>How your lot fits in</h2>
<p>If you already own your land, its value can often serve as part of your equity or down payment, which can reduce the cash you need to bring. If you are buying the lot and building, some loans can fold the land purchase into the financing. Either way, lenders look closely at the parcel, so the same due diligence that makes a lot buildable also makes it financeable.</p>
<h2>What lenders want to see</h2>
<ul>
<li><strong>Plans and a fixed builder contract</strong> with a detailed cost breakdown, since the appraisal is based on the completed design.</li>
<li><strong>A qualified, licensed builder</strong> — many construction lenders require one rather than an owner-builder arrangement.</li>
<li><strong>A contingency</strong> built into the budget for the unexpected.</li>
<li><strong>Your financial profile</strong> — credit, income, and reserves, as with any mortgage.</li>
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

    // ========================= Design, Zoning & ADUs ========================
    item({
      slug: "what-are-setbacks-lot-coverage-and-naos-rules",
      question: "What are setbacks, lot coverage, and NAOS rules in Scottsdale?",
      answerHtml: `<p><strong>Setbacks, lot coverage, and open-space rules together define your "buildable envelope" — the part of a lot where a home can actually go and how big it can be. In Scottsdale's desert and foothill areas, the Environmentally Sensitive Lands rules add a Natural Area Open Space (NAOS) requirement on top, which can meaningfully shrink where you build.</strong> These rules are zoning-driven, so they vary by parcel.</p>
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
<p>On sloped parcels, hillside regulations add further limits on grading, disturbance, and where structures can sit. Combined with NAOS, this is why a large foothill lot does not always mean a large building envelope — much of the land may be protected or too steep to disturb.</p>
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
<p>We design custom homes with casitas, guest houses, and ADUs regularly, and we tailor the unit to your lot's zoning and your goals — multigenerational living, guests, a home office, or a future rental. Because ADU rules are evolving and differ by city, we confirm the current standards for your jurisdiction before finalizing the design.</p>`,
      shortAnswer:
        "Often yes, depending on your zoning. A casita is usually a guest space; an ADU is a full independent dwelling. Arizona's 2024 HB 2720 requires cities over 75,000 residents to allow ADUs on single-family lots, but each sets its own size and setback rules. Plan utilities and septic capacity from the start.",
      metaDescription:
        "Can you build a casita, guest house, or ADU in Arizona? Often yes — and HB 2720 now requires larger cities to allow ADUs on single-family lots. Here's what governs it.",
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
  ],
};
