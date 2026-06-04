# FAQ Drafts - Costs & Budget (Section D)

Category: `costs-and-budget` · Topic: `budgeting-a-custom-home`

These are paste-ready `item({ ... })` blocks for the assembly task. Three new entries (D1-D3) that extend the live category (cost-to-build, allowances/change-orders, financing) without repeating it. Voice matches the shipped seed: deep, research-phase, AZ-grounded, plain-language, no em dashes, no emojis. Volatile figures (fee schedules, rates) are date-stamped to mid-2026 and every answer closes by telling the reader to confirm current numbers with the local AHJ and lender. Do not hand-write the plain `answer`; the `item()` helper derives it.

---

## D1 - Permit, impact, and development fees: what they add to a build

```ts
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
```

**Sources used (D1)**
- [30] City of Scottsdale, Planning & Development Fees - https://www.scottsdaleaz.gov/planning-development/fees
- [12] Maricopa County, Construction Permit Information - https://www.maricopa.gov/1629/Construction-Permit-Information (jurisdiction-sets-own-fees context)

---

## D2 - How a construction-to-permanent (one-time-close) loan works

```ts
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
```

**Sources used (D2)**
- [26] Arizona Financial Credit Union, Navigating the Construction Loan Process: A Step-by-Step Guide - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide

---

## D3 - What drives custom-home cost per square foot in our markets

```ts
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
```

**Sources used (D3)**
- [22] Arizona Geological Survey, Earth Fissures & Ground Subsidence (Natural Hazards Viewer) - https://azgs.arizona.edu/earth-fissures-ground-subsidence/earth-fissures-natural-hazards-arizona-viewer
- [26] Arizona Financial Credit Union, Navigating the Construction Loan Process: A Step-by-Step Guide - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide

---

## Assembly notes (for the merge task, not part of the seed)

- All three blocks use `categorySlug: "costs-and-budget"` and `topicSlugs: ["budgeting-a-custom-home"]`, which already exist in the live seed.
- `sortOrder` 12-14 continues after the live costs items (9 cost-to-build, 10 allowances, 11 financing). Adjust if the assembly task renumbers.
- `relatedFaqSlugs` reference live slugs plus reasonable cross-links; assembly should finalize bidirectional links and may add back-references from the live items.
- `pillarBlogSlug` values reuse blog slugs already referenced by the live costs items; confirm they resolve during assembly, otherwise set to `null`.
- Duplicate-intent watch: D2 deliberately goes deeper on one-time-close loan mechanics than the live `how-do-i-finance-building-a-custom-home` (broad financing overview), and D3 focuses on cost drivers rather than the headline ranges in `how-much-does-it-cost-to-build-a-custom-home`. If the validator flags duplicate intent at or above 0.6, tighten the question wording or merge.
- Do not hand-write the plain `answer` field; the `item()` helper derives it from `answerHtml`.
