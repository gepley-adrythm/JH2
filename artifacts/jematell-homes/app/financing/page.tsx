import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { ConstructionLoanCalculator } from "@/components/ConstructionLoanCalculator";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { ContactCta } from "@/components/ContactCta";

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

const financingTerms = [
  { slug: "draw-schedule", term: "Draw Schedule" },
  { slug: "as-completed-appraisal", term: "As-Completed Appraisal" },
  { slug: "interest-reserve", term: "Interest Reserve" },
  { slug: "allowance", term: "Allowance (home building contract)" },
  { slug: "builders-risk-insurance", term: "Builders Risk Insurance" },
];

export default function Financing() {
  const columns: MoreColumn[] = [
    { label: "Financing questions", items: financingFaqs.map((f) => ({ to: `/faq/${f.slug}`, label: f.question })) },
    { label: "Terms to know", items: financingTerms.map((t) => ({ to: `/glossary/${t.slug}`, label: t.term })) },
  ];

  return (
    <main className="page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Financing", url: "/financing" },
        ])}
      />

      <section className="page-hero" style={{ alignItems: "center", minHeight: "65vh" }}>
        <picture>
          <img src="/images/financing-hero.jpg" alt="" className="page-hero-bg" loading="eager" />
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
                <h3 className="fin-step-title" style={{ fontSize: "20px", color: "#3b617f", textTransform: "uppercase" }}>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="fin-calc-band">
          <div className="container fin-calc-band-inner">
            <h2 className="fin-band-h2">Estimate your payments</h2>
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

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to run the real numbers?</h2>
          <p className="faq-cta-sub">Tell us about your project and we will walk you through budget and financing in plain language.</p>
          <ContactCta testid="financing-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
