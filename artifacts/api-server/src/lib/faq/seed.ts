import type { FaqSeed } from "./types";

// =============================================================================
// FAQ SEED — SINGLE SOURCE OF TRUTH
// =============================================================================
// This file is synced into the database on server boot (see sync.ts) and is the
// only place FAQ content is authored. The build-time validator and the SPA
// cross-link generator also read from here. After editing, re-run:
//   - server boot (re-syncs DB)
//   - pnpm --filter @workspace/api-server run faq:validate
//   - pnpm --filter @workspace/api-server run faq:crosslinks
//   - pnpm --filter @workspace/api-server run faq:registry
//
// Content rules:
//   - `shortAnswer` and `metaDescription` are schema/meta only — NEVER rendered
//     as visible body copy. shortAnswer feeds the FAQPage acceptedAnswer; the
//     full `answer`/`answerHtml` is what visitors read on the detail page.
//   - Answers reflect Jematell Homes' published approach (a family-owned custom
//     builder serving Scottsdale, Rio Verde and the greater Phoenix metro).
//     Industry timelines/figures are given as general ranges, not fixed quotes.
// =============================================================================

export const faqSeed: FaqSeed = {
  categories: [
    {
      slug: "building-process",
      title: "The Building Process",
      description:
        "How a Jematell Homes build comes together — from your first conversation through design, construction, and the final walkthrough.",
      metaDescription:
        "Understand the Jematell Homes custom home building process in Arizona — steps, timeline, permits, updates, and what to expect from start to move-in.",
      sortOrder: 1,
    },
    {
      slug: "costs-and-budget",
      title: "Costs & Budget",
      description:
        "Understanding pricing, allowances, change orders, and financing so your custom home budget stays clear and predictable.",
      metaDescription:
        "Custom home costs, allowances, change orders, and financing explained for buyers building in Scottsdale, Rio Verde, and the Phoenix metro.",
      sortOrder: 2,
    },
    {
      slug: "lots-and-locations",
      title: "Lots & Locations",
      description:
        "Building on land you own, finding the right homesite, and where Jematell Homes builds across Arizona.",
      metaDescription:
        "Building on your own lot, buying land with a builder's eye, and the Arizona communities Jematell Homes serves.",
      sortOrder: 3,
    },
    {
      slug: "design-and-customization",
      title: "Design & Customization",
      description:
        "Floor plans, customization, casitas and ADUs, RV garages, and how your home is tailored to your lot and lifestyle.",
      metaDescription:
        "Floor plans, full customization, casitas/ADUs, and RV garages — how Jematell Homes designs a home around your lot and lifestyle.",
      sortOrder: 4,
    },
    {
      slug: "spec-and-semi-custom",
      title: "Spec & Semi-Custom Homes",
      description:
        "The difference between spec, semi-custom, and fully custom homes, and which path fits your goals.",
      metaDescription:
        "Spec vs. semi-custom vs. custom homes in Arizona — the differences, the trade-offs, and how to choose the right path with Jematell Homes.",
      sortOrder: 5,
    },
  ],
  topics: [
    {
      slug: "custom-home-timeline",
      title: "Custom Home Timeline",
      description:
        "How long each phase of a custom home takes — from design and permitting through construction and handover.",
      metaDescription:
        "How long it takes to build a custom home in Arizona — the design, permitting, and construction phases and what drives the timeline.",
      sortOrder: 1,
    },
    {
      slug: "building-on-your-lot",
      title: "Building On Your Lot",
      description:
        "Everything specific to building on land you already own or are planning to buy — feasibility, due diligence, and the process.",
      metaDescription:
        "Building on your own lot in Arizona — lot feasibility, due diligence, and how Jematell Homes turns your land into a finished home.",
      sortOrder: 2,
    },
    {
      slug: "financing-and-budgeting",
      title: "Financing & Budgeting",
      description:
        "Setting a realistic budget, understanding allowances and change orders, and financing a custom or semi-custom home.",
      metaDescription:
        "Budgeting and financing a custom home in Arizona — realistic budgets, allowances, change orders, and construction loans.",
      sortOrder: 3,
    },
    {
      slug: "floor-plans-and-design",
      title: "Floor Plans & Design",
      description:
        "Choosing a plan, bringing your own, and how much you can customize the layout and finishes of your home.",
      metaDescription:
        "Choosing or customizing a floor plan with Jematell Homes — proven plans, bring-your-own designs, and full customization.",
      sortOrder: 4,
    },
    {
      slug: "choosing-a-builder",
      title: "Choosing a Builder",
      description:
        "What to look for, what to ask, and how to compare custom home builders in the Phoenix metro.",
      metaDescription:
        "How to choose a custom home builder in Scottsdale and the Phoenix metro — what to look for and the questions to ask before you sign.",
      sortOrder: 5,
    },
  ],
  items: [
    // ----- The Building Process -----
    {
      slug: "how-long-does-it-take-to-build-a-custom-home",
      question: "How long does it take to build a custom home in Arizona?",
      answer:
        "Every project is different, but most custom homes move through two broad stages: design and permitting, then construction.\n\nThe design and permitting stage typically takes a few months. This is where we refine your plans with our architect, finalize selections, and work through engineering and the local permit process. Lot conditions and how quickly decisions are made both affect how long this stage runs.\n\nConstruction usually takes somewhere in the range of eight to twelve months or more, depending on the size of the home, the complexity of the design, your site, and material availability. A larger or highly custom home on a challenging lot will take longer than a straightforward build on a ready homesite.\n\nWe build to a realistic schedule, provide weekly updates, and walk milestones with you so you always know where your project stands.",
      answerHtml: `<p>Every project is different, but most custom homes move through two broad stages: <strong>design and permitting</strong>, then <strong>construction</strong>.</p><p>The design and permitting stage typically takes a few months. This is where we refine your plans with our architect, finalize selections, and work through engineering and the local permit process. Lot conditions and how quickly decisions are made both affect how long this stage runs.</p><p>Construction usually takes somewhere in the range of eight to twelve months or more, depending on the size of the home, the complexity of the design, your site, and material availability. A larger or highly custom home on a challenging lot will take longer than a straightforward build on a ready homesite.</p><p>We build to a realistic schedule, provide weekly updates, and walk milestones with you so you always know where your project stands.</p>`,
      shortAnswer:
        "Most custom homes take a few months for design and permitting, then roughly eight to twelve months or more to build. The exact timeline depends on the home's size and complexity, your lot, and material availability. We provide weekly updates and milestone walkthroughs throughout.",
      metaDescription:
        "How long does it take to build a custom home in Arizona? A look at the design, permitting, and construction phases and what affects the timeline.",
      categorySlug: "building-process",
      topicSlugs: ["custom-home-timeline"],
      tags: ["timeline", "custom-home", "process"],
      relatedFaqSlugs: ["what-are-the-steps-of-the-building-process"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "how-long-it-takes-to-build-a-custom-home-in-arizona",
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "what-are-the-steps-of-the-building-process",
      question: "What are the steps of the custom home building process?",
      answer:
        "We keep the process organized and transparent, built around four main stages.\n\nIntroduction: You reach out through our contact form and we follow up to learn about your project's budget, timeline, and vision.\n\nDesign: We collaborate with our architect to turn your ideas into plans, refining every detail to bring your vision to life.\n\nBuild: Construction begins. We work to build your home on time and within budget, providing weekly updates and walking project milestones with you.\n\nCompletion: Your home is finished. We perform a thorough final walkthrough to address any last adjustments, and then you receive the keys.\n\nThroughout all four stages, our full-service project management handles the planning, permits, and coordination so the process stays smooth and stress-free.",
      answerHtml: `<p>We keep the process organized and transparent, built around four main stages.</p><ol><li><strong>Introduction.</strong> You reach out through our contact form and we follow up to learn about your project's budget, timeline, and vision.</li><li><strong>Design.</strong> We collaborate with our architect to turn your ideas into plans, refining every detail to bring your vision to life.</li><li><strong>Build.</strong> Construction begins. We work to build your home on time and within budget, providing weekly updates and walking project milestones with you.</li><li><strong>Completion.</strong> Your home is finished. We perform a thorough final walkthrough to address any last adjustments, and then you receive the keys.</li></ol><p>Throughout all four stages, our full-service project management handles the planning, permits, and coordination so the process stays smooth and stress-free.</p>`,
      shortAnswer:
        "Our process has four stages: Introduction, where we learn your budget, timeline, and vision; Design, where our architect turns ideas into plans; Build, with weekly updates and milestone walkthroughs; and Completion, with a final walkthrough before you receive the keys.",
      metaDescription:
        "The four steps of building a custom home with Jematell Homes — Introduction, Design, Build, and Completion — explained from first contact to move-in.",
      categorySlug: "building-process",
      topicSlugs: ["custom-home-timeline"],
      tags: ["process", "phases", "custom-home"],
      relatedFaqSlugs: ["how-long-does-it-take-to-build-a-custom-home"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "how-to-build-a-custom-home",
      featured: true,
      sortOrder: 2,
    },
    {
      slug: "what-happens-at-the-first-consultation",
      question: "What happens at the first consultation with Jematell Homes?",
      answer:
        "The first conversation is about understanding your goals. After you reach out through our contact form, we follow up to learn about your project's budget, timeline, and vision, along with whether you already own land or are still looking.\n\nIt helps to come with a sense of how you want to live in the home, any plans or inspiration you've collected, and a budget range you're comfortable with. You don't need finished drawings or every detail figured out. That's what the design stage is for.\n\nFrom there, we can talk through realistic options, the path that fits your situation, and what the next steps look like.",
      answerHtml: `<p>The first conversation is about understanding your goals. After you reach out through our contact form, we follow up to learn about your project's budget, timeline, and vision, along with whether you already own land or are still looking.</p><p>It helps to come with a sense of how you want to live in the home, any plans or inspiration you've collected, and a budget range you're comfortable with. You don't need finished drawings or every detail figured out — that's what the design stage is for.</p><p>From there, we can talk through realistic options, the path that fits your situation, and what the next steps look like.</p>`,
      shortAnswer:
        "We follow up after you reach out to learn your budget, timeline, vision, and whether you own land yet. Bring a sense of how you want to live, any inspiration you've gathered, and a comfortable budget range. You don't need finished drawings to get started.",
      metaDescription:
        "What to expect at your first consultation with Jematell Homes — what we discuss and what's helpful to bring before your custom home build.",
      categorySlug: "building-process",
      topicSlugs: [],
      tags: ["consultation", "getting-started", "process"],
      relatedFaqSlugs: ["what-are-the-steps-of-the-building-process"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "what-custom-home-builders-need-from-you-before-the-first-design-meeting",
      featured: false,
      sortOrder: 3,
    },
    {
      slug: "do-you-handle-permits-and-inspections",
      question: "Do you handle permits, engineering, and inspections?",
      answer:
        "Yes. Our full-service project management takes care of permits and regulatory requirements as part of the build. We handle permitting, coordinate engineering, and manage the inspections required through construction.\n\nBecause we build across many Arizona communities, we understand local regulations, soil conditions, and permitting processes, which helps keep your project on track and avoids surprises. You stay informed throughout, but the paperwork and coordination are ours to manage.",
      answerHtml: `<p>Yes. Our full-service project management takes care of permits and regulatory requirements as part of the build. We handle permitting, coordinate engineering, and manage the inspections required through construction.</p><p>Because we build across many Arizona communities, we understand local regulations, soil conditions, and permitting processes, which helps keep your project on track and avoids surprises. You stay informed throughout, but the paperwork and coordination are ours to manage.</p>`,
      shortAnswer:
        "Yes. Our full-service project management handles permits, coordinates engineering, and manages required inspections. We know local regulations, soils, and permitting across Arizona communities, which keeps your project on track. You stay informed while we manage the paperwork and coordination.",
      metaDescription:
        "Does Jematell Homes handle permits and inspections? Yes — full-service project management covers permitting, engineering, and required inspections.",
      categorySlug: "building-process",
      topicSlugs: [],
      tags: ["permits", "inspections", "engineering", "process"],
      relatedFaqSlugs: ["how-will-i-stay-updated-during-construction"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
      featured: false,
      sortOrder: 4,
    },
    {
      slug: "how-will-i-stay-updated-during-construction",
      question: "How will I stay updated during construction?",
      answer:
        "Communication is a core part of how we work. During construction we provide weekly updates on progress and perform milestone walkthroughs with you at key stages of the build.\n\nWe believe in open, transparent communication and addressing any questions or concerns promptly, so you always know where your project stands. When the home is finished, we complete a thorough final walkthrough together to address any last adjustments before you receive the keys.",
      answerHtml: `<p>Communication is a core part of how we work. During construction we provide <strong>weekly updates</strong> on progress and perform <strong>milestone walkthroughs</strong> with you at key stages of the build.</p><p>We believe in open, transparent communication and addressing any questions or concerns promptly, so you always know where your project stands. When the home is finished, we complete a thorough final walkthrough together to address any last adjustments before you receive the keys.</p>`,
      shortAnswer:
        "We provide weekly updates during construction and perform milestone walkthroughs at key stages, so you always know where your project stands. We address questions promptly and complete a thorough final walkthrough together before you receive the keys.",
      metaDescription:
        "How Jematell Homes keeps you updated during construction — weekly progress updates, milestone walkthroughs, and a thorough final walkthrough.",
      categorySlug: "building-process",
      topicSlugs: [],
      tags: ["communication", "updates", "process"],
      relatedFaqSlugs: ["do-you-handle-permits-and-inspections"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "what-to-expect-when-building-a-custom-home-in-the-phoenix-metro-area",
      featured: false,
      sortOrder: 5,
    },
    {
      slug: "how-do-i-choose-the-right-home-builder",
      question: "How do I choose the right custom home builder?",
      answer:
        "Choosing a builder is one of the most important decisions in the whole project, so it's worth taking your time. Look at the builder's experience with homes like the one you want, the quality of their past work, and how they communicate.\n\nGood questions to ask include how they manage budgets and allowances, how they keep you updated during construction, how they handle change orders and challenges, and what their warranty support looks like after move-in.\n\nAt Jematell Homes we lead with transparent pricing, clear communication, weekly updates, and full-service project management, because a smooth, stress-free experience matters as much as the finished home.",
      answerHtml: `<p>Choosing a builder is one of the most important decisions in the whole project, so it's worth taking your time. Look at the builder's experience with homes like the one you want, the quality of their past work, and how they communicate.</p><p>Good questions to ask include:</p><ul><li>How do you manage budgets and allowances?</li><li>How will you keep me updated during construction?</li><li>How do you handle change orders and unexpected challenges?</li><li>What does warranty support look like after move-in?</li></ul><p>At Jematell Homes we lead with transparent pricing, clear communication, weekly updates, and full-service project management, because a smooth, stress-free experience matters as much as the finished home.</p>`,
      shortAnswer:
        "Look at a builder's experience with homes like yours, the quality of past work, and how they communicate. Ask how they manage budgets and allowances, keep you updated, handle change orders, and support warranties. Transparent pricing and clear communication matter as much as the finished home.",
      metaDescription:
        "How to choose the right custom home builder in Arizona — what to look for and the key questions to ask before you sign.",
      categorySlug: "building-process",
      topicSlugs: ["choosing-a-builder"],
      tags: ["choosing-a-builder", "questions", "process"],
      relatedFaqSlugs: ["is-there-a-warranty-on-your-homes"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "questions-to-ask-custom-home-builder-arizona",
      featured: false,
      sortOrder: 6,
    },
    {
      slug: "is-there-a-warranty-on-your-homes",
      question: "Do you offer a warranty on your homes?",
      answer:
        "Yes. We stand behind our work and provide warranty support after you move in. If a warranty issue comes up once you're in your home, contact Jematell Homes or call (602) 421-5576, and a representative will follow up with you.\n\nOur commitment to quality and client satisfaction doesn't end at handover. Addressing concerns promptly is part of how we make sure you have a positive experience from start to finish.",
      answerHtml: `<p>Yes. We stand behind our work and provide warranty support after you move in. If a warranty issue comes up once you're in your home, contact Jematell Homes or call <strong>(602) 421-5576</strong>, and a representative will follow up with you.</p><p>Our commitment to quality and client satisfaction doesn't end at handover. Addressing concerns promptly is part of how we make sure you have a positive experience from start to finish.</p>`,
      shortAnswer:
        "Yes. We provide warranty support after you move in. If a warranty issue comes up, contact Jematell Homes or call (602) 421-5576 and a representative will follow up. Our commitment to quality and prompt resolution continues after handover.",
      metaDescription:
        "Does Jematell Homes offer a warranty? Yes — post move-in warranty support is available. Contact us or call (602) 421-5576 for warranty claims.",
      categorySlug: "building-process",
      topicSlugs: [],
      tags: ["warranty", "after-move-in", "support"],
      relatedFaqSlugs: ["how-do-i-choose-the-right-home-builder"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: null,
      featured: false,
      sortOrder: 7,
    },

    // ----- Costs & Budget -----
    {
      slug: "how-much-does-it-cost-to-build-a-custom-home",
      question: "What does it cost to build a custom home in the Phoenix metro?",
      answer:
        "There isn't a single price, because a custom home is priced around your choices. The biggest drivers are the size of the home, the level of finishes you select, the design's complexity, and your lot, since site conditions like grading, access, and utilities all affect cost.\n\nThe best way to get a realistic number is to start with a budget you're comfortable with and design to it. We provide clear, upfront pricing and detailed breakdowns so you understand exactly what you're paying for, with no surprises. Establishing a realistic budget before design begins keeps the whole project grounded and helps you prioritize what matters most.",
      answerHtml: `<p>There isn't a single price, because a custom home is priced around your choices. The biggest drivers are:</p><ul><li>The size of the home</li><li>The level of finishes you select</li><li>The design's complexity</li><li>Your lot — site conditions like grading, access, and utilities all affect cost</li></ul><p>The best way to get a realistic number is to start with a budget you're comfortable with and design to it. We provide clear, upfront pricing and detailed breakdowns so you understand exactly what you're paying for, with no surprises. Establishing a realistic budget before design begins keeps the whole project grounded and helps you prioritize what matters most.</p>`,
      shortAnswer:
        "There's no single price — cost depends on the home's size, finishes, design complexity, and your lot's site conditions. The best approach is to set a realistic budget and design to it. We provide clear, upfront pricing and detailed breakdowns so there are no surprises.",
      metaDescription:
        "What does a custom home cost in the Phoenix metro? The main cost drivers and why setting a realistic budget before design matters.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["financing-and-budgeting"],
      tags: ["cost", "budget", "pricing"],
      relatedFaqSlugs: ["what-are-construction-allowances", "can-you-help-with-financing"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "establish-a-realistic-budget-before-designing-your-custom-home",
      featured: true,
      sortOrder: 8,
    },
    {
      slug: "what-are-construction-allowances",
      question: "What are construction allowances and how do they work?",
      answer:
        "An allowance is a set dollar amount budgeted for a category of selections you haven't finalized yet, such as flooring, cabinetry, countertops, lighting, or appliances. It lets the project move forward before every choice is made.\n\nWhen you make your final selections, the actual cost is compared to the allowance. If you choose finishes that cost less, you save against that amount. If you select something more expensive, the difference is added to your price. Allowances keep the budget transparent and give you control: you can spend where it matters most to you and pull back elsewhere.\n\nWe set realistic allowances up front and provide detailed breakdowns so you always understand how your selections affect the final number.",
      answerHtml: `<p>An allowance is a set dollar amount budgeted for a category of selections you haven't finalized yet — such as flooring, cabinetry, countertops, lighting, or appliances. It lets the project move forward before every choice is made.</p><p>When you make your final selections, the actual cost is compared to the allowance:</p><ul><li>Choose finishes that cost <strong>less</strong>, and you save against that amount.</li><li>Choose something <strong>more expensive</strong>, and the difference is added to your price.</li></ul><p>Allowances keep the budget transparent and give you control — you can spend where it matters most and pull back elsewhere. We set realistic allowances up front and provide detailed breakdowns so you always understand how your selections affect the final number.</p>`,
      shortAnswer:
        "An allowance is a budgeted dollar amount for selections you haven't finalized, like flooring or cabinetry. When you choose, costs above the allowance add to your price and costs below it save you money. Allowances keep the budget transparent and let you prioritize what matters most.",
      metaDescription:
        "What are construction allowances? How budgeted amounts for finishes work, and how selections above or below them affect your custom home's final price.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["financing-and-budgeting"],
      tags: ["budget", "allowances", "pricing"],
      relatedFaqSlugs: ["what-is-a-change-order", "how-much-does-it-cost-to-build-a-custom-home"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "custom-home-budget-allowances-change-orders",
      featured: true,
      sortOrder: 9,
    },
    {
      slug: "what-is-a-change-order",
      question: "What is a change order and how does it affect my budget?",
      answer:
        "A change order is a documented adjustment to the plans, selections, or scope after the contract is in place, such as moving a wall, upgrading a finish, or adding a feature. Each change order records what's changing and its effect on cost and, sometimes, schedule.\n\nChange orders aren't a bad thing. They're how a custom build stays flexible as your ideas evolve. The key is keeping them transparent so there are no surprises. We document changes clearly and review the budget and timeline impact with you before work proceeds, so you stay in control of both your home and your spending.",
      answerHtml: `<p>A change order is a documented adjustment to the plans, selections, or scope after the contract is in place — such as moving a wall, upgrading a finish, or adding a feature. Each change order records what's changing and its effect on cost and, sometimes, schedule.</p><p>Change orders aren't a bad thing. They're how a custom build stays flexible as your ideas evolve. The key is keeping them transparent so there are no surprises. We document changes clearly and review the budget and timeline impact with you before work proceeds, so you stay in control of both your home and your spending.</p>`,
      shortAnswer:
        "A change order is a documented adjustment to plans, selections, or scope after the contract is signed, recording its effect on cost and sometimes schedule. They keep a custom build flexible. We review the budget and timeline impact with you before work proceeds, so there are no surprises.",
      metaDescription:
        "What is a change order in custom home building, and how does it affect your budget and timeline? How Jematell Homes keeps changes transparent.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["financing-and-budgeting"],
      tags: ["change-order", "budget", "process"],
      relatedFaqSlugs: ["what-are-construction-allowances"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "custom-home-budget-allowances-change-orders",
      featured: false,
      sortOrder: 10,
    },
    {
      slug: "can-you-help-with-financing",
      question: "Can you help me navigate financing or a construction loan?",
      answer:
        "Yes. Navigating financing is part of the expert guidance we provide, and we'll point you in the right direction early so your budget and your build stay aligned.\n\nNew construction is often financed differently from buying an existing home. Many buyers use a construction loan that funds the build in stages and then converts to a standard mortgage once the home is complete. We're happy to talk through how this works and help you connect with lenders experienced in financing custom and semi-custom homes in Arizona, so you can move forward with confidence.",
      answerHtml: `<p>Yes. Navigating financing is part of the expert guidance we provide, and we'll point you in the right direction early so your budget and your build stay aligned.</p><p>New construction is often financed differently from buying an existing home. Many buyers use a <strong>construction loan</strong> that funds the build in stages and then converts to a standard mortgage once the home is complete. We're happy to talk through how this works and help you connect with lenders experienced in financing custom and semi-custom homes in Arizona, so you can move forward with confidence.</p>`,
      shortAnswer:
        "Yes. Navigating financing is part of the expert guidance we provide. New construction is often funded with a construction loan that pays out in stages and converts to a mortgage at completion. We'll explain how it works and connect you with experienced Arizona lenders.",
      metaDescription:
        "Can Jematell Homes help with financing? Yes — guidance on construction loans and connecting you with lenders experienced in Arizona custom homes.",
      categorySlug: "costs-and-budget",
      topicSlugs: ["financing-and-budgeting"],
      tags: ["financing", "construction-loan", "budget"],
      relatedFaqSlugs: ["how-much-does-it-cost-to-build-a-custom-home"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug: "financing-your-custom-or-semi-home",
      featured: false,
      sortOrder: 11,
    },

    // ----- Lots & Locations -----
    {
      slug: "can-i-build-on-my-own-lot",
      question: "Can I build a custom home on a lot I already own?",
      answer:
        "Absolutely. Building on your own lot is one of our specialties, and it gives you the freedom to create a home that fits your land, your lifestyle, and your future.\n\nWe have extensive experience building homes of all sizes across the Valley, from straightforward homesites to highly complex builds. Before design begins, we evaluate your property for utilities, access, grading, and overall build feasibility, then guide you through design, permitting, site preparation, and construction. No two lots are the same, and we're well-versed in navigating challenges like grading, utilities, access, and local regulations so you don't have to.",
      answerHtml: `<p>Absolutely. Building on your own lot is one of our specialties, and it gives you the freedom to create a home that fits your land, your lifestyle, and your future.</p><p>We have extensive experience building homes of all sizes across the Valley, from straightforward homesites to highly complex builds. Before design begins, we evaluate your property for <strong>utilities, access, grading, and overall build feasibility</strong>, then guide you through design, permitting, site preparation, and construction.</p><p>No two lots are the same, and we're well-versed in navigating challenges like grading, utilities, access, and local regulations so you don't have to.</p>`,
      shortAnswer:
        "Yes. Building on your own lot is one of our specialties. We evaluate your property for utilities, access, grading, and build feasibility, then guide you through design, permitting, site prep, and construction. We're experienced with the challenges that come with building on any lot.",
      metaDescription:
        "Can you build on a lot you already own? Yes — Jematell Homes specializes in on-your-lot building, from feasibility to move-in across the Valley.",
      categorySlug: "lots-and-locations",
      topicSlugs: ["building-on-your-lot"],
      tags: ["lot", "land", "build-on-your-lot"],
      relatedFaqSlugs: ["what-should-i-check-before-buying-a-lot"],
      relatedServiceSlugs: ["build-on-your-lot"],
      pillarBlogSlug: "building-on-your-own-lot-arizona",
      featured: true,
      sortOrder: 12,
    },
    {
      slug: "what-should-i-check-before-buying-a-lot",
      question: "What should I check before buying a lot to build on?",
      answer:
        "Not all lots are created equal, and the right due diligence up front saves time and money later. Before you buy, it's worth confirming utility availability (water, sewer or septic, power), legal and physical access to the property, and how the site's grading and soils will affect building.\n\nYou'll also want to understand zoning, setbacks, and any HOA or community restrictions that shape what you can build. We evaluate land through the lens of a builder, not just a buyer, so we can spot potential issues early, including what it will actually take to build on the property. That's the difference between buying land and buying the right land.",
      answerHtml: `<p>Not all lots are created equal, and the right due diligence up front saves time and money later. Before you buy, it's worth confirming:</p><ul><li><strong>Utilities</strong> — water, sewer or septic, and power availability</li><li><strong>Access</strong> — legal and physical access to the property</li><li><strong>Grading and soils</strong> — how the site affects building</li><li><strong>Zoning, setbacks, and HOA</strong> — restrictions that shape what you can build</li></ul><p>We evaluate land through the lens of a builder, not just a buyer, so we can spot potential issues early — including what it will actually take to build on the property. That's the difference between buying land and buying the right land.</p>`,
      shortAnswer:
        "Confirm utilities (water, sewer or septic, power), legal and physical access, grading and soil conditions, and zoning, setbacks, and any HOA restrictions. We evaluate land through a builder's lens to spot issues early, so you buy the right land, not just any land.",
      metaDescription:
        "What to check before buying a building lot — utilities, access, grading, soils, zoning, and HOA — evaluated through a builder's lens.",
      categorySlug: "lots-and-locations",
      topicSlugs: ["building-on-your-lot"],
      tags: ["lot", "due-diligence", "land"],
      relatedFaqSlugs: ["can-you-help-me-find-and-buy-land", "can-i-build-on-my-own-lot"],
      relatedServiceSlugs: ["buy-a-lot-with-us"],
      pillarBlogSlug:
        "top-strategies-for-finding-the-perfect-building-lot-a-comprehensive-guide",
      featured: false,
      sortOrder: 13,
    },
    {
      slug: "can-you-help-me-find-and-buy-land",
      question: "Can you help me find and purchase land?",
      answer:
        "Yes. We're not just builders, we're also licensed real estate agents, so we can actively search for and source land that fits your goals, budget, and preferred location, then guide you through writing and negotiating your offer.\n\nBecause we evaluate land as builders, we look at more than the listing. We assess what it will really take to build on a property, helping you avoid costly mistakes and identify potential issues early. From finding the right homesite to closing, we support you through the entire purchase so you can move forward with confidence.",
      answerHtml: `<p>Yes. We're not just builders — we're also licensed real estate agents, so we can actively search for and source land that fits your goals, budget, and preferred location, then guide you through writing and negotiating your offer.</p><p>Because we evaluate land as builders, we look at more than the listing. We assess what it will really take to build on a property, helping you avoid costly mistakes and identify potential issues early. From finding the right homesite to closing, we support you through the entire purchase so you can move forward with confidence.</p>`,
      shortAnswer:
        "Yes. As licensed real estate agents and builders, we can search for and source land that fits your goals and budget, then guide you through the offer and purchase. We evaluate each property as builders, spotting build issues early so you make a smart investment.",
      metaDescription:
        "Can Jematell Homes help you find and buy land? Yes — as licensed agents and builders, we source, evaluate, and help you purchase the right homesite.",
      categorySlug: "lots-and-locations",
      topicSlugs: [],
      tags: ["land", "real-estate", "buy-a-lot"],
      relatedFaqSlugs: ["what-should-i-check-before-buying-a-lot"],
      relatedServiceSlugs: ["buy-a-lot-with-us"],
      pillarBlogSlug: "what-to-do-after-buying-land-in-arizona",
      featured: false,
      sortOrder: 14,
    },
    {
      slug: "where-do-you-build",
      question: "What areas do you build in?",
      answer:
        "We proudly build custom homes across a variety of communities around Arizona, with a focus on Scottsdale, Rio Verde, and the greater Phoenix metro. We also build in areas including Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, Mesa, and the East Valley.\n\nWe build on private lots, in established neighborhoods, and within communities, giving you the flexibility to create a home that fits both your vision and your surroundings. Whether you already own land or are still searching for the perfect homesite, we can help you build in a location that complements your lifestyle.",
      answerHtml: `<p>We proudly build custom homes across a variety of communities around Arizona, with a focus on <strong>Scottsdale, Rio Verde, and the greater Phoenix metro</strong>. We also build in areas including Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, Mesa, and the East Valley.</p><p>We build on private lots, in established neighborhoods, and within communities, giving you the flexibility to create a home that fits both your vision and your surroundings. Whether you already own land or are still searching for the perfect homesite, we can help you build in a location that complements your lifestyle.</p>`,
      shortAnswer:
        "We build custom homes across Arizona, focused on Scottsdale, Rio Verde, and the greater Phoenix metro, plus areas like Cave Creek, Fountain Hills, Carefree, Casa Grande, Apache Junction, Mesa, and the East Valley. We build on private lots, in neighborhoods, and within communities.",
      metaDescription:
        "Where does Jematell Homes build? Custom homes across Scottsdale, Rio Verde, and the greater Phoenix metro, including Cave Creek, Fountain Hills, and more.",
      categorySlug: "lots-and-locations",
      topicSlugs: [],
      tags: ["locations", "service-area", "arizona"],
      relatedFaqSlugs: ["can-i-build-on-my-own-lot"],
      relatedServiceSlugs: ["where-we-build"],
      pillarBlogSlug:
        "building-a-custom-home-outside-the-city-benefits-of-the-phoenix-metros-outlying-areas",
      featured: true,
      sortOrder: 15,
    },

    // ----- Design & Customization -----
    {
      slug: "do-you-have-floor-plans-or-can-i-bring-my-own",
      question: "Do you have floor plans, or can I bring my own design?",
      answer:
        "Both, plus everything in between. Every home begins with the floor plan, and we have plenty to choose from across a range of styles, sizes, and configurations, from under 2,000 square feet to over 3,000 square feet.\n\nIf you don't see a plan you love, our architect can design your home from scratch. And if you've already found a plan you want elsewhere, you're more than welcome to bring it to us. The goal is to start from whatever foundation makes sense for you and shape it into the right home for your lot and lifestyle.",
      answerHtml: `<p>Both — plus everything in between. Every home begins with the floor plan, and we have plenty to choose from across a range of styles, sizes, and configurations, from under 2,000 square feet to over 3,000 square feet.</p><p>If you don't see a plan you love, our architect can design your home from scratch. And if you've already found a plan you want elsewhere, you're more than welcome to bring it to us. The goal is to start from whatever foundation makes sense for you and shape it into the right home for your lot and lifestyle.</p>`,
      shortAnswer:
        "Both. We offer proven floor plans across many styles and sizes, from under 2,000 to over 3,000 square feet. If none fit, our architect can design from scratch, or you can bring a plan you found elsewhere. We start from whatever foundation works for you.",
      metaDescription:
        "Does Jematell Homes have floor plans, or can you bring your own? Choose a proven plan, design from scratch with our architect, or bring your own.",
      categorySlug: "design-and-customization",
      topicSlugs: ["floor-plans-and-design"],
      tags: ["floor-plans", "design", "customization"],
      relatedFaqSlugs: ["how-customizable-are-your-homes"],
      relatedServiceSlugs: ["floor-plans"],
      pillarBlogSlug: "how-to-choose-the-right-floor-plan",
      featured: false,
      sortOrder: 16,
    },
    {
      slug: "how-customizable-are-your-homes",
      question: "How customizable are your homes?",
      answer:
        "As customizable as you want them to be. You can choose one of our proven floor plans and personalize it, or create something entirely your own with our architect. Every home is tailored to fit your land and your lifestyle.\n\nGreat custom design is about more than square footage. Thoughtful layout, how rooms flow, where light falls, and how the home sits on your lot often matter more than raw size. We collaborate with you on every detail, combining our team's expertise with your vision to create a home that's genuinely personal, not a template.",
      answerHtml: `<p>As customizable as you want them to be. You can choose one of our proven floor plans and personalize it, or create something entirely your own with our architect. Every home is tailored to fit your land and your lifestyle.</p><p>Great custom design is about more than square footage. Thoughtful layout, how rooms flow, where light falls, and how the home sits on your lot often matter more than raw size. We collaborate with you on every detail, combining our team's expertise with your vision to create a home that's genuinely personal — not a template.</p>`,
      shortAnswer:
        "Fully customizable. Personalize one of our proven floor plans or design something entirely your own with our architect. Every home is tailored to your land and lifestyle, with layout, flow, and light often mattering more than square footage. We collaborate on every detail.",
      metaDescription:
        "How customizable are Jematell Homes? Fully — personalize a proven plan or design from scratch, tailored to your lot and lifestyle down to the detail.",
      categorySlug: "design-and-customization",
      topicSlugs: ["floor-plans-and-design"],
      tags: ["customization", "design", "layout"],
      relatedFaqSlugs: ["do-you-have-floor-plans-or-can-i-bring-my-own"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "designing-a-custom-home-around-your-lot-why-layout-matters-more-than-square-footage",
      featured: false,
      sortOrder: 17,
    },
    {
      slug: "can-you-build-a-casita-guest-house-or-adu",
      question: "Can you build a casita, guest house, or ADU?",
      answer:
        "Yes. Casitas, guest houses, and accessory dwelling units (ADUs) are a popular addition in Arizona, whether for guests, multigenerational living, a home office, or rental potential.\n\nWe can design a casita or ADU as part of a new custom home or plan for one on your lot. Because rules for guest houses and ADUs vary by city and have evolved in recent years, we'll help you understand what's allowed on your property and design a space that fits both the regulations and the way you want to use it.",
      answerHtml: `<p>Yes. Casitas, guest houses, and accessory dwelling units (ADUs) are a popular addition in Arizona — whether for guests, multigenerational living, a home office, or rental potential.</p><p>We can design a casita or ADU as part of a new custom home or plan for one on your lot. Because rules for guest houses and ADUs vary by city and have evolved in recent years, we'll help you understand what's allowed on your property and design a space that fits both the regulations and the way you want to use it.</p>`,
      shortAnswer:
        "Yes. We design casitas, guest houses, and ADUs for guests, multigenerational living, offices, or rental potential, either as part of a new custom home or planned for your lot. Since rules vary by city, we help you understand what's allowed and design to fit it.",
      metaDescription:
        "Can Jematell Homes build a casita, guest house, or ADU? Yes — designed to your needs and local rules, as part of a new home or on your lot.",
      categorySlug: "design-and-customization",
      topicSlugs: [],
      tags: ["casita", "adu", "guest-house"],
      relatedFaqSlugs: ["how-customizable-are-your-homes"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "guest-house-amp-adu-essentials-building-casitas-in-phoenix-under-new-laws",
      featured: false,
      sortOrder: 18,
    },
    {
      slug: "can-you-add-an-rv-garage",
      question: "Can you build a custom RV garage?",
      answer:
        "Yes. An RV garage is a popular feature for Arizona homeowners, offering secure, climate-protected storage for a motorhome, boat, trailers, or workshop space, and it can add real value and function to your property.\n\nWe design RV garages to fit your vehicles and how you'll use the space, from ceiling height and door dimensions to power, plumbing, and finishes. Whether it's part of a new custom home or planned around your lot, we'll make sure it's sized and equipped correctly from the start.",
      answerHtml: `<p>Yes. An RV garage is a popular feature for Arizona homeowners, offering secure, climate-protected storage for a motorhome, boat, trailers, or workshop space — and it can add real value and function to your property.</p><p>We design RV garages to fit your vehicles and how you'll use the space, from ceiling height and door dimensions to power, plumbing, and finishes. Whether it's part of a new custom home or planned around your lot, we'll make sure it's sized and equipped correctly from the start.</p>`,
      shortAnswer:
        "Yes. We design custom RV garages for secure storage of a motorhome, boat, or trailers, or workshop space. We size and equip them to your vehicles and use, from ceiling height and door dimensions to power, plumbing, and finishes, as part of a new home or on your lot.",
      metaDescription:
        "Can Jematell Homes build a custom RV garage? Yes — sized and equipped to your vehicles and needs, as part of a new home or planned for your lot.",
      categorySlug: "design-and-customization",
      topicSlugs: [],
      tags: ["rv-garage", "customization", "storage"],
      relatedFaqSlugs: ["how-customizable-are-your-homes"],
      relatedServiceSlugs: ["custom-homes"],
      pillarBlogSlug:
        "why-adding-an-rv-garage-is-a-smart-investment-for-your-arizona-home",
      featured: false,
      sortOrder: 19,
    },

    // ----- Spec & Semi-Custom Homes -----
    {
      slug: "what-is-the-difference-between-spec-custom-and-semi-custom",
      question:
        "What is the difference between spec, semi-custom, and custom homes?",
      answer:
        "The three options mainly differ in how much you design versus how quickly you can move in.\n\nA spec home is one we design and build with current trends in mind, then offer for sale. It's the fastest path to a brand-new home because the major decisions are already made, with high quality at an approachable price.\n\nA semi-custom home starts from an established floor plan that you personalize, letting you tailor finishes and certain features without designing from a blank page. It's a balance of choice and efficiency.\n\nA fully custom home is designed around you from the ground up, on your plan or ours, with the most freedom over layout, finishes, and how the home sits on your lot. The right choice depends on how much you want to customize, your timeline, and your budget, and we're happy to help you weigh them.",
      answerHtml: `<p>The three options mainly differ in how much you design versus how quickly you can move in.</p><ul><li><strong>Spec home</strong> — one we design and build with current trends in mind, then offer for sale. It's the fastest path to a brand-new home because the major decisions are already made, with high quality at an approachable price.</li><li><strong>Semi-custom home</strong> — starts from an established floor plan that you personalize, letting you tailor finishes and certain features without designing from a blank page. A balance of choice and efficiency.</li><li><strong>Fully custom home</strong> — designed around you from the ground up, on your plan or ours, with the most freedom over layout, finishes, and how the home sits on your lot.</li></ul><p>The right choice depends on how much you want to customize, your timeline, and your budget — and we're happy to help you weigh them.</p>`,
      shortAnswer:
        "A spec home is designed and built by us, then sold — the fastest move-in. A semi-custom home personalizes an established plan, balancing choice and efficiency. A fully custom home is designed around you from scratch, with the most freedom. The right fit depends on customization, timeline, and budget.",
      metaDescription:
        "Spec vs. semi-custom vs. custom homes — the differences in design freedom, timeline, and budget, and how to choose the right path in Arizona.",
      categorySlug: "spec-and-semi-custom",
      topicSlugs: [],
      tags: ["spec-home", "semi-custom", "custom-home"],
      relatedFaqSlugs: ["do-you-have-spec-homes-for-sale"],
      relatedServiceSlugs: ["spec-homes"],
      pillarBlogSlug:
        "spec-home-vs-custom-home-vs-semi-custom-finding-your-perfect-fit-in-arizona",
      featured: true,
      sortOrder: 20,
    },
    {
      slug: "do-you-have-spec-homes-for-sale",
      question: "Do you have move-in ready spec homes for sale?",
      answer:
        "We build high-quality, stylish spec homes designed with current trends in mind, and we never trade quality for a price tag. Availability changes over time, and we have homes coming soon.\n\nIf a move-in ready or nearly-finished home appeals to you, a spec home is a smart way to get a thoughtfully designed, well-built new home without managing the full custom process. Contact us to learn what's currently available or coming up, and we'll help you find the right fit.",
      answerHtml: `<p>We build high-quality, stylish spec homes designed with current trends in mind, and we never trade quality for a price tag. Availability changes over time, and we have homes coming soon.</p><p>If a move-in ready or nearly-finished home appeals to you, a spec home is a smart way to get a thoughtfully designed, well-built new home without managing the full custom process. Contact us to learn what's currently available or coming up, and we'll help you find the right fit.</p>`,
      shortAnswer:
        "We build high-quality, stylish spec homes designed with current trends, and we have homes coming soon. A spec home is a smart way to get a well-built new home without managing the full custom process. Contact us to learn what's available or coming up.",
      metaDescription:
        "Does Jematell Homes have move-in ready spec homes for sale? We build stylish, high-quality spec homes with new ones coming soon — contact us for availability.",
      categorySlug: "spec-and-semi-custom",
      topicSlugs: [],
      tags: ["spec-home", "move-in-ready", "for-sale"],
      relatedFaqSlugs: ["what-is-the-difference-between-spec-custom-and-semi-custom"],
      relatedServiceSlugs: ["spec-homes"],
      pillarBlogSlug:
        "when-a-spec-home-makes-sense-a-smarter-way-to-buy-new-construction",
      featured: false,
      sortOrder: 21,
    },
  ],
};
