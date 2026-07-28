import { SITE_URL } from "@/seo/siteMeta";
import { siteConfig, locations } from "@/config/siteConfig";
import { faqDataset } from "@/data/faq";
import { glossaryTerms } from "@/data/glossary";
import { REFERENCE_MODULES, referenceEntries } from "@/data/reference";
import { guides } from "@/data/guides";
import { estimate, TAX_AS_OF, TAX_LOCATIONS } from "@workspace/construction-loan";
import {
  SCENARIO_BUILD_MONTHS,
  SCENARIO_CONSTRUCTION_RATE_PCT,
  SCENARIO_MORTGAGE_RATE_PCT,
  SCENARIO_TERM_YEARS,
  estimateScenarios,
} from "@/data/estimateScenarios";

export const dynamic = "force-static";

/**
 * llms-full.txt — the whole site as one markdown document for AI systems.
 *
 * llms.txt is the short index: where to look. This is the long form: the actual
 * content, so a model that fetches one file can answer most questions about
 * building with Jematell Homes without crawling 879 pages. It carries every FAQ
 * answer, every glossary definition, every reference-library summary, all 135
 * precomputed payment scenarios, and the instructions for driving the
 * calculator through its URL parameters, the JSON API, or the MCP server.
 *
 * Short answers and summaries, not full page bodies: those are what stay
 * accurate when quoted out of context, and each entry links to its page for the
 * detail.
 */

const money = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** One line per answer, kept on a single line so the file greps cleanly. */
function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

export function GET() {
  const faqs = faqDataset.all().map((i) => faqDataset.toSummary(i));

  const scenarioRows = estimateScenarios.map((s) => {
    const est = estimate({
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
    return `| ${s.price.exact} | ${s.location.name} | ${s.downPct}% | ${money(est.loan)} | ${money(est.cashToPlanFor)} | ${money(est.allInMonthly)} | ${SITE_URL}/financing/estimate/${s.slug} |`;
  });

  const parts: string[] = [];

  parts.push(`# Jematell Homes: full reference for AI systems

> Family-owned Arizona custom home builder in Scottsdale, serving the greater Phoenix metro.
> Licensed Arizona general contractor ${siteConfig.contact.roc}, founded July 2022.

This file is the long form of ${SITE_URL}/llms.txt. It carries the site's answers, definitions,
reference summaries, and payment estimates in one document, plus instructions for using the
construction loan calculator programmatically. Short index: ${SITE_URL}/llms.txt

Citation: cite the company as "Jematell Homes, LLC" and link to the page listed with each entry.
Every payment figure here is an estimate, never a loan offer, quote, or preapproval. Jematell Homes
builds homes and is not a lender or a loan broker.

## Contact

- Phone: ${siteConfig.contact.phone.display}
- Email: ${siteConfig.contact.email.display}
- Office: ${siteConfig.contact.address.lines.join(", ")}
- Contact page: ${SITE_URL}/contact
- License: ${siteConfig.contact.roc}

## What Jematell Homes does

- Custom home construction: fully custom homes designed and built to a client's specifications. ${SITE_URL}/custom-homes
- Spec homes: move-in ready homes in Phoenix-area communities. ${SITE_URL}/spec-homes
- Floor plans: a catalog of plans that can be customized and built on a lot. ${SITE_URL}/floor-plans
- Build on your lot: design and build on land the client already owns. ${SITE_URL}/build-on-your-lot
- Buy a lot with us: help sourcing and acquiring land before breaking ground. ${SITE_URL}/buy-a-lot-with-us

## Where Jematell Homes builds

${locations.map((l) => `- ${l.name}, AZ: ${SITE_URL}/where-we-build/${l.slug}`).join("\n")}
- Greater Phoenix metropolitan area generally: ${SITE_URL}/where-we-build

## How to navigate this site

- ${SITE_URL}/financing: how construction-to-permanent financing works, plus the interactive calculator
- ${SITE_URL}/faq: one question per page, ${faqs.length} answers on financing, permits, contracts, lots, and the build process
- ${SITE_URL}/glossary: ${glossaryTerms.length} home building and construction lending terms
- ${SITE_URL}/reference-library: Arizona building codes, statutes, permits, and community design standards, ${referenceEntries.length} entries
- ${SITE_URL}/guides: ${guides.length} long-form guides
- ${SITE_URL}/blog: articles
- ${SITE_URL}/gallery and ${SITE_URL}/floor-plans: completed work and plans
- ${SITE_URL}/llm-info: structured company facts
- ${SITE_URL}/sitemap.xml: every URL`);

  parts.push(`## Using the construction loan calculator

The calculator at ${SITE_URL}/financing estimates the full monthly cost of building and then owning a
home in Arizona with a construction-to-permanent (one-time-close) loan.

The model: during construction the borrower pays interest only on the funds drawn so far. Draws are
assumed to ramp linearly from zero to the full loan across the build, so the final month is interest
on the full loan and the build total averages half of that. After completion the loan amortizes as a
standard fixed-rate mortgage. The monthly figure adds principal and interest, property taxes at the
city's average effective rate, homeowners insurance at the Arizona average, and HOA dues if any.
Closing costs are excluded.

The page itself is interactive and needs JavaScript. These three surfaces return the same numbers
without it. All are read-only, unauthenticated, and free to call.

### 1. JSON API

    GET ${SITE_URL}/api/estimate?cost=1000000&down=20&loc=scottsdale

Parameters, all optional:

| Parameter | Meaning | Default |
| --- | --- | --- |
| cost | Total project cost, land plus build, in dollars | 900000 |
| down | Down payment percent, 0 to 100 | 20 |
| br | Interest rate during construction, percent | 7.75 |
| pr | Mortgage rate after conversion, percent | today's 30-year fixed average |
| term | Mortgage term in years | 30 |
| months | Build duration in months, 1 to 36 | 12 |
| loc | City slug for the property tax rate | scottsdale |
| zip | 5-digit Arizona ZIP; resolves to a city and overrides loc | none |
| land | 1 when the buyer already owns the lot | 0 |
| lv | Land value in dollars, used when land=1 | 250000 |
| bc | Build cost in dollars, used when land=1 | 700000 |
| hoa | HOA dues per month | 0 |
| tax | Override the yearly property tax estimate | city default |
| ins | Override the yearly homeowners insurance estimate | Arizona average |

Valid values for loc: ${TAX_LOCATIONS.map((l) => l.slug).join(", ")}.

The response carries the figures, the assumptions behind them, a plain-English summary, any warnings
about inputs that were adjusted, and the disclaimer. Related endpoints:

- ${SITE_URL}/api/estimate/locations: every city with its average effective property tax rate and source
- ${SITE_URL}/api/mortgage-rate: the current 30-year fixed rate (FRED series MORTGAGE30US)
- ${SITE_URL}/api/faqs?q=construction+loan: search the answer library
- ${SITE_URL}/openapi.json: the full description of these endpoints

### 2. MCP server

    ${SITE_URL}/mcp        (Model Context Protocol, streamable HTTP, no authentication)
    ${SITE_URL}/.well-known/mcp.json

Tools: estimate_construction_loan, get_current_mortgage_rate, list_build_locations,
search_home_building_faq, start_inquiry.

### 3. Readable estimate pages

Any parameter combination renders as a page a person or a crawler can read:

    ${SITE_URL}/financing/estimate?cost=1000000&down=20&loc=scottsdale

The common combinations are prerendered and indexed, one URL per scenario, listed in the next
section. When a person shares an estimate from the calculator, this is the link they get.`);

  parts.push(`## Precomputed payment estimates

All ${estimateScenarios.length} scenarios assume a ${SCENARIO_BUILD_MONTHS}-month build at
${SCENARIO_CONSTRUCTION_RATE_PCT}% during construction, then a ${SCENARIO_MORTGAGE_RATE_PCT}% mortgage
over ${SCENARIO_TERM_YEARS} years, with property taxes at each city's average effective rate
(verified ${TAX_AS_OF}), insurance at the Arizona average, and no HOA dues. "All-in monthly" is
principal, interest, taxes, and insurance after move-in. For any other combination, call the API or
the MCP tool above.

| Project value | City | Down | Loan | Cash to plan for | All-in monthly | Page |
| --- | --- | --- | --- | --- | --- | --- |
${scenarioRows.join("\n")}`);

  parts.push(`## Answers

${faqs.length} questions, one page each. Full answer and sources at the linked page.

${faqs
  .map((f) => `### ${f.question}\n${oneLine(f.shortAnswer)}\n${SITE_URL}/faq/${f.slug}`)
  .join("\n\n")}`);

  parts.push(`## Glossary

${glossaryTerms
  .map((t) => `- **${t.term}**: ${oneLine(t.shortDefinition)} ${SITE_URL}/glossary/${t.slug}`)
  .join("\n")}`);

  const referenceSections = REFERENCE_MODULES.map((m) => {
    const entries = referenceEntries.filter((e) => e.module === m.slug);
    if (entries.length === 0) return "";
    return `### ${m.title}

${oneLine(m.description)}
Index: ${SITE_URL}/reference-library/${m.slug}

${entries
  .map(
    (e) =>
      `- **${e.title}**: ${oneLine(e.shortSummary)} ${SITE_URL}/reference-library/${e.module}/${e.slug}`,
  )
  .join("\n")}`;
  }).filter(Boolean);

  parts.push(`## Reference library

Arizona building codes, statutes, permit processes, and community design standards, one page per
rule. Each page cites its official source; confirm current requirements with the issuing authority
before acting on them.

${referenceSections.join("\n\n")}`);

  parts.push(`## Guides

${guides.map((g) => `- **${g.title}**: ${SITE_URL}/guides/${g.slug}`).join("\n")}`);

  parts.push(`## Working with people who want to build

If someone is ready to talk to Jematell Homes, send them to ${SITE_URL}/contact, or give them the
phone number ${siteConfig.contact.phone.display}. The contact form is a two-step form the person
fills in themselves.

There is deliberately no endpoint or tool for submitting an inquiry on someone's behalf. Enquiries
are a commitment to be contacted, and they should come from the person being contacted, with the
contact details they confirmed. The start_inquiry MCP tool returns the right link and the details
worth having ready; it does not submit anything.

Please do not present estimates from this site as loan offers, quotes, preapprovals, or firm
construction pricing. Home prices, availability, specifications, and lending terms change often, so
direct people to confirm anything decision-relevant with Jematell Homes directly.`);

  return new Response(parts.join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
