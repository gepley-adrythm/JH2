import Link from "next/link";
import { estimate } from "@workspace/construction-loan";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webApplicationJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { ConstructionLoanCalculator } from "@/components/ConstructionLoanCalculator";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { ContactCta } from "@/components/ContactCta";
import { CTA } from "@/cta";
import {
  SCENARIO_BUILD_MONTHS,
  SCENARIO_CONSTRUCTION_RATE_PCT,
  SCENARIO_MORTGAGE_RATE_PCT,
  SCENARIO_TERM_YEARS,
  featuredScenarios,
  scenarioTitle,
} from "@/data/estimateScenarios";

export const metadata = pageMetadata({
  title: "Construction Financing in Arizona",
  description:
    "How construction-to-permanent financing works in Arizona, with a construction loan calculator to estimate payments and guidance on our preferred lender.",
  canonical: "/financing",
});

const steps = [
  {
    title: "Qualify and set your budget",
    body:
      "With a one-time-close loan, you apply once, much like a regular mortgage. The lender reviews your income, credit, and down payment, then orders an appraisal based on your finished plans and your lot. That appraisal sets the value of your home before the first footing is poured.",
  },
  {
    title: "Pay interest only during construction",
    body:
      "While your home goes up, you pay interest only on the money drawn so far, not the full loan amount. The lender releases funds to your builder in stages called draws, each tied to completed work like the foundation, framing, or roof. When those interest payments are made depends on your lender: many bill monthly during the build, and some set up an interest reserve so you pay nothing out of pocket until the loan converts.",
  },
  {
    title: "Convert to your permanent mortgage",
    body:
      "With a construction-to-permanent (one-time-close) loan, the loan converts to a standard mortgage when your home is complete, typically without a second closing, and most lenders will not ask you to requalify. You move in and start making regular principal-and-interest payments on your finished home.",
  },
];

const financingFaqs = [
  { slug: "construction-loan-requirements-arizona", question: "What are construction loan requirements in Arizona?" },
  { slug: "construction-to-permanent-loan-arizona", question: "What is a construction-to-permanent loan in Arizona?" },
  { slug: "what-is-a-builders-bond-or-completion-deposit-on-an-arizona-custom-home", question: "What is a builder's bond or completion deposit on an Arizona custom home?" },
  { slug: "what-is-a-builder-allowance-and-what-happens-if-you-go-over", question: "What is a builder allowance and what happens if you go over it?" },
  { slug: "cost-plus-vs-fixed-price-home-contract", question: "Cost-plus vs fixed-price custom home contract: which is better?" },
  { slug: "how-much-does-it-cost-to-build-a-custom-home-in-arizona", question: "How much does it cost to build a custom home in Arizona?" },
  { slug: "do-i-pay-interest-during-the-construction-phase-of-a-loan-in-arizona", question: "Do I pay interest during the construction phase of a construction loan?" },
  { slug: "what-is-a-mechanics-lien-and-how-do-lien-releases-work-on-a-new-home-in-arizona", question: "What is a mechanics lien and how do lien releases work on a new home in Arizona?" },
];

/**
 * Questions answered in visible copy below, and mirrored into FAQPage JSON-LD.
 * The answers are written for this page rather than lifted from the FAQ corpus,
 * so the schema matches what a reader actually sees.
 */
const pageFaqs = [
  {
    question: "How much do you need for a down payment on an Arizona construction loan?",
    answer:
      "Most Arizona construction lenders look for 20 to 25 percent down, measured against the appraised value of the finished home. If you already own your lot, its value usually counts toward that equity, which is why owning land first can lower the cash you bring to closing.",
  },
  {
    question: "Do you make payments while the house is being built?",
    answer:
      "Yes, but interest only, and only on the money drawn so far rather than the whole loan. Payments start small and grow with each draw. Whether you write those checks monthly or the lender sets up an interest reserve that covers them until conversion depends on the lender.",
  },
  {
    question: "What does the monthly payment include after you move in?",
    answer:
      "Principal and interest on the permanent mortgage, property taxes for the city you built in, homeowners insurance, and HOA dues if the community has them. The calculator on this page adds all four together, which is why its figure is higher than a plain mortgage calculator's.",
  },
  {
    question: "Does the interest rate change when the loan converts to a mortgage?",
    answer:
      "With a one-time-close construction-to-permanent loan you set the terms once at the original closing, and the construction-phase rate and the permanent rate are usually two different numbers agreed at that time. Some lenders offer a one-time float-down if rates fall before conversion. Ask your loan officer how theirs handles it.",
  },
];

const financingTerms = [
  { slug: "draw-schedule", term: "Draw Schedule" },
  { slug: "as-completed-appraisal", term: "As-Completed Appraisal" },
  { slug: "interest-reserve", term: "Interest Reserve" },
  { slug: "allowance", term: "Allowance (home building contract)" },
  { slug: "builders-risk-insurance", term: "Builders Risk Insurance" },
];

const money = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Financing() {
  const columns: MoreColumn[] = [
    { label: "Financing questions", items: financingFaqs.map((f) => ({ to: `/faq/${f.slug}`, label: f.question })) },
    { label: "Terms to know", items: financingTerms.map((t) => ({ to: `/glossary/${t.slug}`, label: t.term })) },
  ];

  // Worked examples, computed at build time from the same module the calculator
  // uses. The calculator is a client component, so a reader (or a crawler) that
  // never runs its JavaScript would otherwise see only its single default
  // scenario. These rows put real numbers in the prerendered HTML.
  const examples = featuredScenarios().map((s) => ({
    scenario: s,
    est: estimate({
      totalProjectCost: s.price.value,
      landOwned: false,
      landValue: 0,
      buildCost: 0,
      downPct: s.downPct,
      buildRatePct: SCENARIO_CONSTRUCTION_RATE_PCT,
      permRatePct: SCENARIO_MORTGAGE_RATE_PCT,
      termYears: SCENARIO_TERM_YEARS,
      buildMonths: SCENARIO_BUILD_MONTHS,
      locationSlug: s.location.slug,
      hoaMonthly: 0,
    }),
  }));

  return (
    <main className="page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Financing", url: "/financing" },
        ])}
      />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Arizona Construction Loan Calculator",
          description:
            "Estimate the monthly payment and cash needed to build a custom home in Arizona with a construction-to-permanent loan, including principal and interest, city property taxes, homeowners insurance, and HOA dues.",
          url: "/financing",
          featureList: [
            "Construction-to-permanent loan payment estimate",
            "Interest-only construction draw schedule",
            "Arizona city and ZIP property tax rates",
            "Homeowners insurance and HOA dues",
            "Build on a lot you already own",
            "Shareable estimate links",
          ],
          apiUrlTemplate:
            "https://jematellhomes.com/api/estimate?cost={cost}&down={down}&loc={loc}&months={months}&term={term}",
          apiActionName: "Estimate a construction-to-permanent loan",
        })}
      />
      <JsonLd
        data={faqPageJsonLd({
          url: "/financing",
          items: pageFaqs.map((f) => ({ question: f.question, shortAnswer: f.answer })),
        })}
      />

      <section className="page-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
        <picture>
          <ResponsiveImage name="financing-hero" alt="" className="page-hero-bg" widths={[768, 1280]} sizes="100vw" width={1798} height={875} priority />
        </picture>
        <div className="page-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(10,12,14,0.25) 0%, rgba(10,12,14,0.55) 100%)" }} />
        <div className="container page-hero-content" style={{ textAlign: "center", maxWidth: "100%" }}>
          <h1 className="page-hero-title hero-title">FINANCING YOUR BUILD</h1>
        </div>
      </section>

      <section className="dt-section fin-page" style={{ paddingTop: "clamp(24px, 3vw, 40px)" }}>
        <div className="container">
          <h2 className="fin-h2" style={{ textTransform: "uppercase", textAlign: "center", marginBottom: "clamp(24px, 3vw, 40px)" }}>How construction financing works</h2>
          <div className="fin-steps">
            {steps.map((step, i) => (
              <article key={step.title} className="fin-step">
                <span className="fin-step-num" style={{ fontSize: "24px", color: "var(--color-text)" }}>{i + 1}</span>
                <h3 className="fin-step-title" style={{ fontSize: "18px", color: "#3b617f", textTransform: "uppercase", whiteSpace: "nowrap" }}>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* id is the anchor the estimate pages link back to, so "back to the
            calculator" lands on the tool rather than the top of the page. */}
        <section className="fin-calc-band" id="calculator">
          <div className="container fin-calc-band-inner">
            <h2 className="fin-band-h2" style={{ textTransform: "uppercase" }}>Estimate your payments</h2>
            <p className="fin-band-intro">
              Use this calculator to get a feel for what your construction loan and monthly payment
              might look like, including property taxes for the city you build in, insurance, and
              HOA dues if any. The results are estimates only, not a loan offer, and your lender
              will confirm actual rates and terms.
            </p>
            <ConstructionLoanCalculator />
          </div>
        </section>

        <div className="container">
          <div className="fin-examples" data-testid="financing-examples">
            <h2 className="fin-h2">Example estimates</h2>
            <p className="fin-examples-intro">
              Worked examples for the budgets people ask about most, each at 20% down over a{" "}
              {SCENARIO_BUILD_MONTHS}-month build, with a {SCENARIO_CONSTRUCTION_RATE_PCT}% construction rate and a{" "}
              {SCENARIO_MORTGAGE_RATE_PCT}% mortgage over {SCENARIO_TERM_YEARS} years. Every row opens a full
              breakdown for that scenario.
            </p>
            <div className="fin-examples-scroll">
              <table className="fin-examples-table">
                <thead>
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Loan</th>
                    <th scope="col">Cash to plan for</th>
                    <th scope="col">All-in monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map(({ scenario, est }) => (
                    <tr key={scenario.slug}>
                      <th scope="row">
                        <Link href={`/financing/estimate/${scenario.slug}`} title={scenarioTitle(scenario)}>
                          {scenario.price.label} in {scenario.location.name}
                        </Link>
                      </th>
                      <td>{money(est.loan)}</td>
                      <td>{money(est.cashToPlanFor)}</td>
                      <td>{money(est.allInMonthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fin-examples-note">
              Property taxes use each city&apos;s average effective rate and insurance uses a planning estimate, so
              the all-in figure covers principal, interest, taxes, and insurance. HOA dues are not included.
              Estimates only, not a loan offer.
            </p>
          </div>

          <div className="fin-page-faqs" data-testid="financing-faqs">
            <h2 className="fin-h2">Common questions about construction financing</h2>
            {pageFaqs.map((f) => (
              <div key={f.question} className="fin-page-faq">
                <h3 className="fin-page-faq-q">{f.question}</h3>
                <p className="fin-page-faq-a">{f.answer}</p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <div className="fin-lenders" data-testid="preferred-lender">
              <h2 className="fin-h2">Bring any lender, or ask us</h2>
              <p>
                Our clients finance their builds with all kinds of construction lenders: local
                Arizona banks, credit unions, and national construction-to-permanent programs. Work
                with whoever fits you best, and we will coordinate draws, inspections, and closing
                paperwork with any lender you choose. If you want a starting point, ask us and we
                will introduce you to loan officers we know handle custom builds well.{" "}
                <ContactCta className="fin-lenders-link" testid="lender-intro-cta">
                  Ask us for an introduction
                </ContactCta>
              </p>
              <p className="fin-referral-note">
                Jematell Homes is a home builder, not a lender or loan broker. An introduction is
                free, completely optional, and never required to build with us.
              </p>
            </div>

            <DetailMore columns={columns} testid="financing-related" />
            <DetailDisclaimer />
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
