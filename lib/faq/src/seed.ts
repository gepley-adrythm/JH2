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
//   - `shortAnswer` and `metaDescription` are schema/meta only — NEVER rendered
//     as visible body copy. shortAnswer feeds the FAQPage acceptedAnswer; the
//     full `answerHtml` is what visitors read on the detail page.
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
  ],
};
