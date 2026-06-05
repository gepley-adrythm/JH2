# FAQ Drafts - Choosing & Working With a Builder (competitive batch, vs AFT Construction)

New category: `choosing-a-builder` (title: "Choosing & Working With a Builder")
New topic: `choosing-a-custom-home-builder` (title: "Choosing a Custom Home Builder")

These are paste-ready `item({ ... })` blocks for the assembly task. Seven new entries that win the highest-intent "how do I pick a builder" searches where AFT Construction ranks today with broad, shallow, non-Arizona-specific posts. We one-up them with deeper, Arizona-grounded answers that cite the AZ Registrar of Contractors (ROC) license classifications, the Residential Contractors' Recovery Fund, and A.R.S. Title 32, Chapter 10 contractor statutes by name. Voice matches the shipped seed: deep, research-phase, AZ-grounded, plain-language, no em dashes, no emojis. Each `answerHtml` opens with a direct, self-contained answer in `<p><strong>...</strong></p>` so it is extractable as a featured snippet / AI Overview, uses H2/H3 subheads phrased as the real People-Also-Ask follow-ups, leans on `<ul>`/`<ol>` for scannable checklists, and closes by telling the reader to confirm specifics with the AZ Registrar of Contractors (roc.az.gov) and the local Authority Having Jurisdiction. Do not hand-write the plain `answer`; the `item()` helper derives it. Assembly owns the new category/topic objects and final cross-links.

---

## 1 - How do I choose a custom home builder in Arizona?

```ts
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
```

**Sources used (1)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [3] A.R.S. 32-1101, Contractor definitions (Title 32, Ch. 10) - https://www.azleg.gov/ars/32/01101.htm

---

## 2 - What should I ask a custom home builder before hiring them?

```ts
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
```

**Sources used (2)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [3] A.R.S. 32-1101, Contractor definitions (Title 32, Ch. 10) - https://www.azleg.gov/ars/32/01101.htm

---

## 3 - What are the red flags to watch for when choosing a custom home builder?

```ts
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
```

**Sources used (3)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [3] A.R.S. 32-1101, Contractor definitions (Title 32, Ch. 10) - https://www.azleg.gov/ars/32/01101.htm

---

## 4 - What is the difference between design-build and design-bid-build?

```ts
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
```

**Sources used (4)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [3] A.R.S. 32-1101, Contractor definitions (Title 32, Ch. 10) - https://www.azleg.gov/ars/32/01101.htm

---

## 5 - How do I verify a builder's Arizona contractor license, and why does it matter?

```ts
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
```

**Sources used (5)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [3] A.R.S. 32-1101, Contractor definitions (Title 32, Ch. 10) - https://www.azleg.gov/ars/32/01101.htm
- ROC consumer resources: Residential Contractors' Recovery Fund (A.R.S. 32-1131 et seq.) - https://roc.az.gov

---

## 6 - What is the difference between a custom, semi-custom, and spec home?

```ts
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
```

**Sources used (6)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- Industry reference: custom vs semi-custom vs spec home delivery distinctions (builder/NAHB consumer guidance)

---

## 7 - What are the steps to build a custom home, from first meeting to move-in?

```ts
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
```

**Sources used (7)**
- [4] AZ Registrar of Contractors, License Classifications - https://roc.az.gov/license-classifications
- [29] 2024 IRC inspection sequence (ICC Digital Codes) - https://codes.iccsafe.org
- [26] Arizona Financial CU, Construction Loan Process - https://www.arizonafinancial.org/blog/navigating-the-construction-loan-process-a-step-by-step-guide
