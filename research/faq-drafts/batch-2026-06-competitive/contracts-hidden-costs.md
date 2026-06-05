# FAQ Draft: Contracts, Hidden Costs & Lien Law (vs AFT)

Batch: `batch-2026-06-competitive`
Category: `costs-and-budget`  ·  Topic: `budgeting-a-custom-home`
Author rule: this draft file only. Assembly merges into `lib/faq/src/seed.ts` and finalizes `sortOrder`, cross-links, and pillar flags.

Date-stamp note: figures and statutory caps below were checked June 2026. Lien deadlines, Recovery Fund limits, and fee schedules change; assembly and readers should confirm current values with the cited statute, the AZ Registrar of Contractors, and the local AHJ.

---

## 1. What are the hidden costs of building a custom home?

```ts
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
  sortOrder: 100,
})
```

**Sources used**
- [26] Arizona Financial CU, Construction Loan Process (financing/draw costs) — https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide
- [30] City of Scottsdale, Planning & Development Fees (permit/impact/dev fees example) — https://www.scottsdaleaz.gov/planning-development/fees
- [22] Arizona Geological Survey, geohazards/soils context (geotech driver) — https://azgs.arizona.edu/geohazards/arizona-geohazards-resources/earth-fissures-subsidence
- [14] Maricopa County, Onsite Wastewater Forms/Applications (septic site evaluation) — https://www.maricopa.gov/2495/Onsite-Wastewater-Forms-Applications

---

## 2. What should be in a custom home construction contract?

```ts
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
  sortOrder: 101,
})
```

**Sources used**
- [3] A.R.S. 32-1101, Contractor definitions — https://www.azleg.gov/ars/32/01101.htm
- [4] AZ Registrar of Contractors, License Classifications — https://roc.az.gov/license-classifications
- AZ Registrar of Contractors, Workmanship Standards & filing a complaint — https://roc.az.gov/
- A.R.S. 32-1131 et seq., Residential Contractors' Recovery Fund — https://www.azleg.gov/arsDetail/?title=32

---

## 3. How do lien waivers and mechanic's liens work in Arizona?

```ts
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
  sortOrder: 102,
})
```

**Sources used**
- A.R.S. 33-981, Liens for labor and materials — https://www.azleg.gov/ars/33/00981.htm
- A.R.S. 33-992.01, Preliminary twenty-day notice — https://www.azleg.gov/ars/33/00992-01.htm
- A.R.S. 33-993, Recording the lien (time limits) — https://www.azleg.gov/ars/33/00993.htm
- A.R.S. 33-998, Limitation on action to foreclose — https://www.azleg.gov/ars/33/00998.htm
- A.R.S. 33-1002, Owner-occupant dwelling exemption — https://www.azleg.gov/ars/33/01002.htm
- A.R.S. 33-1008, Waiver of lien rights — https://www.azleg.gov/ars/33/01008.htm

---

## 4. What is a punch list and final walkthrough on a new home?

```ts
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
  sortOrder: 103,
})
```

**Sources used**
- [29] 2024 IRC inspection/closeout framework (ICC Digital Codes) — https://codes.iccsafe.org/
- Richards v. Powercraft Homes, Inc., 139 Ariz. 242 (1984), implied warranty of workmanship and habitability — Arizona Supreme Court
- AZ Registrar of Contractors, Workmanship Standards (closeout/warranty baseline) — https://roc.az.gov/
