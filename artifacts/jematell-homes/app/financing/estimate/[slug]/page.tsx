import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { estimate, TAX_AS_OF, INSURANCE_AS_OF, NEW_BUILD_TAX_NOTE } from "@workspace/construction-loan";
import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { DetailMore, DetailDisclaimer, type MoreColumn } from "@/components/DetailParts";
import { ContactCta } from "@/components/ContactCta";
import { CTA } from "@/cta";
import {
  SCENARIO_BUILD_MONTHS,
  SCENARIO_CONSTRUCTION_RATE_PCT,
  SCENARIO_DOWN_PCTS,
  SCENARIO_MORTGAGE_RATE_PCT,
  SCENARIO_PRICES,
  SCENARIO_TERM_YEARS,
  estimateScenarios,
  getEstimateScenario,
  scenarioSlug,
  scenarioTitle,
  type EstimateScenario,
} from "@/data/estimateScenarios";

/**
 * /financing/estimate/<scenario> — a prerendered construction-loan estimate.
 *
 * Every figure on the page is computed at build time from
 * @workspace/construction-loan, the same module behind the interactive
 * calculator and the /api/estimate endpoint, so the three can never disagree.
 * Rates are the fixed assumptions stated on the page; the calculator uses the
 * live 30-year fixed rate, which is why each page links to it.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return estimateScenarios.map((s) => ({ slug: s.slug }));
}

const money = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function computeFor(s: EstimateScenario) {
  return estimate({
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
  });
}

function calculatorHref(s: EstimateScenario): string {
  const p = new URLSearchParams({
    cost: String(s.price.value),
    down: String(s.downPct),
    br: String(SCENARIO_CONSTRUCTION_RATE_PCT),
    term: String(SCENARIO_TERM_YEARS),
    months: String(SCENARIO_BUILD_MONTHS),
    loc: s.location.slug,
  });
  return `/financing?${p.toString()}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getEstimateScenario(slug);
  if (!s) return {};
  const est = computeFor(s);
  return pageMetadata({
    title: scenarioTitle(s),
    description:
      `A ${s.price.label} custom home in ${s.location.name}, Arizona with ${s.downPct}% down works out to about ` +
      `${money(est.allInMonthly)} a month after move-in, including principal and interest, property taxes, and insurance. ` +
      `Estimate only, not a loan offer.`,
    canonical: `/financing/estimate/${s.slug}`,
  });
}

export default async function EstimateScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getEstimateScenario(slug);
  if (!s) notFound();

  const est = computeFor(s);
  const title = scenarioTitle(s);
  const url = `/financing/estimate/${s.slug}`;

  const paymentAnswer =
    `About ${money(est.allInMonthly)} a month after move-in: ${money(est.permMonthly)} in principal and interest on a ` +
    `${money(est.loan)} loan at ${SCENARIO_MORTGAGE_RATE_PCT}% over ${SCENARIO_TERM_YEARS} years, ` +
    `${money(est.monthlyTax)} in property taxes at ${s.location.name}'s ${s.location.effectiveRatePct}% average effective rate, ` +
    `and ${money(est.monthlyInsurance)} in homeowners insurance. HOA dues, if the community has them, are on top of that.`;

  const cashAnswer =
    `About ${money(est.cashToPlanFor)}: a ${money(est.cashDown)} down payment at ${s.downPct}%, plus roughly ` +
    `${money(est.totalBuildInterest)} in interest paid across a ${SCENARIO_BUILD_MONTHS}-month build. Closing costs are separate. ` +
    `During construction you pay interest only on the money drawn so far, so the payments start small and grow with each draw, ` +
    `reaching about ${money(est.finalMonthInterest)} in the final month before the loan converts.`;

  const faqs = [
    { question: `What is the monthly payment on a ${s.price.label} home in ${s.location.name}, AZ with ${s.downPct}% down?`, shortAnswer: paymentAnswer },
    { question: `How much cash do you need to build a ${s.price.label} home in ${s.location.name}?`, shortAnswer: cashAnswer },
  ];

  const rows: Array<[string, string]> = [
    ["Total project value", s.price.exact],
    ["Down payment", `${money(est.cashDown)} (${s.downPct}%)`],
    ["Construction-to-permanent loan", money(est.loan)],
    ["Interest during the build", `${money(est.totalBuildInterest)} total over ${SCENARIO_BUILD_MONTHS} months`],
    ["Cash to plan for", money(est.cashToPlanFor)],
    ["Principal and interest", `${money(est.permMonthly)}/mo`],
    ["Property taxes", `${money(est.monthlyTax)}/mo (${money(est.taxYearly)}/yr)`],
    ["Homeowners insurance", `${money(est.monthlyInsurance)}/mo (${money(est.insuranceYearly)}/yr)`],
    ["All-in monthly after move-in", `${money(est.allInMonthly)}/mo`],
  ];

  const samePriceElsewhere = estimateScenarios
    .filter((o) => o.price.slug === s.price.slug && o.downPct === s.downPct && o.location.slug !== s.location.slug)
    .slice(0, 6);
  const sameCityOtherPrices = SCENARIO_PRICES.filter((p) => p.slug !== s.price.slug).map((p) => ({
    to: `/financing/estimate/${scenarioSlug(p, s.location, s.downPct)}`,
    label: `${p.label} home in ${s.location.name}, ${s.downPct}% down`,
  }));
  const otherDowns = SCENARIO_DOWN_PCTS.filter((d) => d !== s.downPct).map((d) => ({
    to: `/financing/estimate/${scenarioSlug(s.price, s.location, d)}`,
    label: `${s.price.label} in ${s.location.name} with ${d}% down`,
  }));

  const columns: MoreColumn[] = [
    { label: `Other budgets in ${s.location.name}`, items: sameCityOtherPrices },
    {
      label: `${s.price.label} homes in other cities`,
      items: samePriceElsewhere.map((o) => ({
        to: `/financing/estimate/${o.slug}`,
        label: `${o.location.name}, ${o.downPct}% down`,
      })),
    },
    { label: "Other down payments", items: otherDowns },
    {
      label: "Financing questions",
      items: [
        { to: "/faq/construction-to-permanent-loan-arizona", label: "What is a construction-to-permanent loan?" },
        { to: "/faq/construction-loan-requirements-arizona", label: "What are construction loan requirements in Arizona?" },
        { to: "/faq/do-i-pay-interest-during-the-construction-phase-of-a-loan-in-arizona", label: "Do I pay interest during construction?" },
        { to: "/faq/how-much-does-it-cost-to-build-a-custom-home-in-arizona", label: "How much does it cost to build in Arizona?" },
      ],
    },
  ];

  return (
    <main className="page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Financing", url: "/financing" },
          { name: title, url },
        ])}
      />
      <JsonLd data={faqPageJsonLd({ url, items: faqs })} />

      <section className="dt-section est-page">
        <div className="container est-container">
          <p className="eyebrow est-eyebrow">Construction loan estimate</p>
          <h1 className="est-h1">{title}</h1>
          <p className="est-lead">
            Building a {s.price.exact} custom home in {s.location.name}, Arizona with {s.downPct}% down means a{" "}
            {money(est.loan)} construction-to-permanent loan. After move-in the all-in payment is about{" "}
            {money(est.allInMonthly)} a month, and you should plan for about {money(est.cashToPlanFor)} in cash
            between the down payment and the interest paid while the house is being built.
          </p>

          <div className="est-stats">
            <div className="est-stat est-stat--lead">
              <span className="est-stat-k">All-in monthly after move-in</span>
              <span className="est-stat-v">{money(est.allInMonthly)}</span>
              <span className="est-stat-sub">
                {money(est.permMonthly)} principal and interest, {money(est.monthlyTax)} taxes,{" "}
                {money(est.monthlyInsurance)} insurance
              </span>
            </div>
            <div className="est-stat">
              <span className="est-stat-k">Loan amount</span>
              <span className="est-stat-v">{money(est.loan)}</span>
            </div>
            <div className="est-stat">
              <span className="est-stat-k">Cash to plan for</span>
              <span className="est-stat-v">{money(est.cashToPlanFor)}</span>
              <span className="est-stat-sub">Down payment plus construction-period interest</span>
            </div>
          </div>

          <table className="est-table">
            <caption>Full breakdown at {SCENARIO_MORTGAGE_RATE_PCT}% on a {SCENARIO_TERM_YEARS}-year mortgage</caption>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="est-h2">What you pay while the house is being built</h2>
          <p>
            With a construction-to-permanent loan you apply once and close once. During the build the lender
            releases money to the builder in stages called draws, each tied to completed work, and you pay
            interest only on what has been drawn so far. On a {money(est.loan)} loan at{" "}
            {SCENARIO_CONSTRUCTION_RATE_PCT}% over {SCENARIO_BUILD_MONTHS} months that comes to about{" "}
            {money(est.totalBuildInterest)} in total, starting near {money(est.finalMonthInterest / SCENARIO_BUILD_MONTHS)} in
            the first month and reaching about {money(est.finalMonthInterest)} in the last. Some lenders bill
            those payments monthly; others set up an interest reserve so nothing comes out of pocket until the
            loan converts. When the home is finished the loan becomes a standard mortgage, usually without a
            second closing.
          </p>

          <h2 className="est-h2">Where these numbers come from</h2>
          <p>
            Property taxes use {s.location.name}&apos;s average effective residential rate of{" "}
            {s.location.effectiveRatePct}% ({s.location.county} County), verified {TAX_AS_OF} (
            <a href={s.location.sourceUrl} rel="nofollow noreferrer" target="_blank">
              source
            </a>
            ). Insurance uses the Arizona average of about $600 per year per $100,000 of home value as of{" "}
            {INSURANCE_AS_OF}. The mortgage rate here is a fixed {SCENARIO_MORTGAGE_RATE_PCT}% assumption and the
            construction rate is {SCENARIO_CONSTRUCTION_RATE_PCT}%; both are editable in the calculator, which
            also loads the current 30-year fixed average. HOA dues are not included because they vary by
            community.
          </p>
          <p className="est-note">{NEW_BUILD_TAX_NOTE}</p>

          <h2 className="est-h2">Common questions</h2>
          {faqs.map((f) => (
            <div key={f.question} className="est-faq">
              <h3 className="est-faq-q">{f.question}</h3>
              <p className="est-faq-a">{f.shortAnswer}</p>
            </div>
          ))}

          <div className="est-cta-row">
            <ContactCta className="est-cta est-cta--primary" testid="estimate-lead-cta">
              Get a real quote
            </ContactCta>
            <Link className="est-cta" href={calculatorHref(s)}>
              Adjust this estimate
            </Link>
            <Link className="est-cta est-cta--quiet" href="/contact">
              Contact us
            </Link>
          </div>

          <p className="est-note">
            Estimates only, not a loan offer, quote, or preapproval. Jematell Homes is a home builder, not a
            lender or loan broker. Figures assume draws spread evenly across the build and exclude closing
            costs. Your lender&apos;s terms, your parcel&apos;s tax bill, and your insurance quote will differ.
          </p>

          <DetailMore columns={columns} testid="estimate-related" />
          <DetailDisclaimer />
        </div>
      </section>

      <CTA />
    </main>
  );
}
