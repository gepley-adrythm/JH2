# FAQ Drafts - Costs & Budget (Batch 2026-06)

Category: `costs-and-budget` · Topic: `budgeting-a-custom-home`

Three new, paste-ready `item({ ... })` blocks for the assembly task. These extend the live Costs & Budget category (cost-to-build, allowances/change-orders, financing, permit/development fees, one-time-close loan, cost-per-square-foot) without repeating any of them. Voice matches the shipped seed: deep, research-phase, Arizona-grounded, plain-language, no em dashes, no emojis. Volatile figures are date-stamped to mid-2026, and every answer closes by telling the reader to confirm current numbers and contract terms with the relevant party (the local AHJ, their lender, their contractor, or an attorney). The `item()` helper derives the plain `answer` from `answerHtml`; it is never hand-written.

Confirmed non-duplicate against `CONTENT-INTENT-REGISTRY.md` (June 4, 2026):
- Q1 site-work budgeting is distinct from `what-drives-custom-home-cost-per-square-foot` (per-foot drivers) and `how-much-does-it-cost-to-build-a-custom-home` (headline ranges). It owns the narrower "how do I budget the dollars for clearing, grading, utilities, septic, and a driveway on a raw lot" intent.
- Q2 fixed-price vs cost-plus contract structure is new; nothing live covers contract type.
- Q3 deposit / payment schedule is new; the live financing and one-time-close entries cover lender mechanics, not the builder's deposit and progress-payment structure.

---

## Q1 - How much should I budget for site work on a raw lot?

```ts
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
  sortOrder: 100,
}),
```

**Sources used (Q1)**
- [22] Arizona Geological Survey, Earth Fissures & Ground Subsidence / desert soils context - https://azgs.arizona.edu/earth-fissures-ground-subsidence/earth-fissures-natural-hazards-arizona-viewer
- [26] Arizona Financial Credit Union, Navigating the Construction Loan Process (site-cost / lot-condition context) - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide
- [29] 2024 IRC R401.3 Drainage (finished grade must slope away from the foundation) - https://codes.iccsafe.org/s/IRC2024P2/chapter-4-foundations/IRC2024P2-Pt03-Ch04-SecR401.3
- [12] Maricopa County, Construction Permit Information (county-as-AHJ, septic clearance before permit in unincorporated areas) - https://www.maricopa.gov/1629/Construction-Permit-Information
- [2] ADWR, Well Drilling in Arizona (well registration) - https://www.azwater.gov/permitting-wells/well-drilling-arizona

---

## Q2 - What is the difference between a fixed-price and a cost-plus building contract?

```ts
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
  sortOrder: 101,
}),
```

**Sources used (Q2)**
- [4] Arizona Registrar of Contractors, License Classifications (B-class residential, licensing requirement) - https://roc.az.gov/license-classifications
- ROC, Residential Contractors' Recovery Fund overview (A.R.S. 32-1131 et seq.) - https://roc.az.gov/recovery-fund
- [3] A.R.S. 32-1101, Contractor definitions - https://www.azleg.gov/ars/32/01101.htm
- [26] Arizona Financial Credit Union, Navigating the Construction Loan Process (contract scope feeds the lender's draw schedule) - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide

---

## Q3 - What deposit or payment schedule do custom home builders require?

```ts
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
  sortOrder: 102,
}),
```

**Sources used (Q3)**
- [4] Arizona Registrar of Contractors, License Classifications / consumer guidance (verify license; payments should track work) - https://roc.az.gov/license-classifications
- ROC, Residential Contractors' Recovery Fund overview (A.R.S. 32-1131 et seq.) - https://roc.az.gov/recovery-fund
- [26] Arizona Financial Credit Union, Navigating the Construction Loan Process (draws, inspections, interest-only during build) - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide

---

## Assembly notes (for the merge task, not part of the seed)

- All three blocks use `categorySlug: "costs-and-budget"` and `topicSlugs: ["budgeting-a-custom-home"]`, both already live in the seed. No new category/topic needed.
- `sortOrder` 100-102 per the task brief; the assembler will renumber the Costs & Budget category to a clean contiguous sequence (ordering is per-category, so these will land after the live cost entries).
- `relatedFaqSlugs` reference live slugs plus the in-batch sibling slugs (`how-much-should-i-budget-for-site-work`, `fixed-price-vs-cost-plus-building-contracts`, `what-deposit-do-custom-home-builders-require`). All three siblings are added in this same file, so every reference resolves at assembly. Assembler may add back-references from the live items if desired.
- `pillarBlogSlug` values (`establish-a-realistic-budget-before-designing-your-custom-home`, `financing-your-custom-or-semi-home`) are real blog keys in `clone-data/extracted/blogs.json`, verified June 4, 2026.
- `relatedServiceSlugs` use only real service slugs (`custom-homes`, `build-on-your-lot`, `buy-a-lot-with-us`).
- Duplicate-intent watch: Q1 stays on budgeting the dollars for raw-lot site work (clearing/grading/utilities/septic/driveway) and avoids the per-foot driver framing of `what-drives-custom-home-cost-per-square-foot` and the headline ranges of `how-much-does-it-cost-to-build-a-custom-home`. Q2 and Q3 are new intents (contract type; deposit/payment schedule) with no live equivalent. If `faq:validate` flags cosine >= 0.6, tighten the question wording.
- Do not hand-write the plain `answer` field; the `item()` helper derives it from `answerHtml`.
