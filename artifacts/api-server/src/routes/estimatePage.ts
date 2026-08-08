/**
 * estimatePage.ts — GET /financing/estimate?<calculator params>
 *
 * The permalink behind the calculator's "Copy link to this estimate" button,
 * and the crawlable twin of the calculator itself.
 *
 * Why this is rendered here and not by Next: the site builds with
 * output:"export", so every page is generated at build time from a known list.
 * These URLs take arbitrary query parameters, which is an unbounded set, and
 * there is no Next server at runtime to render an unknown combination. The
 * curated combinations DO get prerendered, at /financing/estimate/<slug>; this
 * route covers everything else.
 *
 * It renders the same markup and class names as those scenario pages and pulls
 * the real stylesheet, header and footer out of the static export (see
 * siteChrome), so the two look the same despite coming from different
 * renderers. An earlier version shipped its own small stylesheet and looked
 * visibly cheaper, which is the drift a second design system always produces.
 *
 * The charts are drawn server-side at their final geometry rather than
 * animated, since there is no React here — which also means the ring is fully
 * drawn for a crawler, a link preview, or a reader with JavaScript off.
 *
 * Indexing: noindex,follow with a canonical to /financing. Query strings are an
 * unbounded URL space, so the fixed scenario pages are what belongs in the
 * index; `follow` still passes link equity through to them.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import {
  SITE_URL,
  breakdownParts,
  buildEstimate,
  type EstimateResponse,
  type QueryLike,
} from "../lib/estimateRequest";
import { renderDonut, renderTimeline } from "../lib/estimateChartSvg";
import { siteChrome } from "../lib/siteChrome";

const router: IRouter = Router();

const usd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A static copy of the site's "why build with us" transparency section, which
 * these pages carry because they double as landing pages.
 *
 * Duplicated rather than imported: the original is a React client component
 * (src/components/WhyBuild.tsx in the web artifact), and this server has no
 * React and no access to that package. It is also deliberately NOT lifted out
 * of the static export the way the header and footer are — the exported markup
 * is framer-motion's pre-animation state, so it carries inline opacity:0 and
 * would render invisible here, where scripts are stripped and nothing ever
 * animates it in.
 *
 * The class names match the real stylesheet, so this inherits the same design.
 * The icons are lucide paths inlined at the size the component requests.
 *
 * KEEP IN SYNC with WhyBuild.tsx — same headline, lead, and four pillars.
 */
const ICON_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" ' +
  'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const WHY_BUILD_PILLARS: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    title: "Weekly Progress Updates",
    body: "Every week of construction you get a written update: what was finished, what is scheduled next, and any decision we need from you. You never have to call and ask how your home is coming along.",
  },
  {
    icon: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    title: "Upfront Cost Estimates",
    body: "On cost-plus builds you get an itemized cost estimate before we break ground, and we share the actual subcontractor bids with you, so you can see what every part of your home costs. For our in-house plans or simpler custom homes, we can quote a flat-rate build cost up front instead.",
  },
  {
    icon: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
    title: "A Clear Draw Schedule",
    body: "You get the full draw schedule at the start: which milestones release which funds, and when your lender is billed. Your financing stays predictable from foundation through final inspection.",
  },
  {
    icon: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
    title: "Selection Allowance Breakdown",
    body: "Every allowance is itemized before you choose a single finish. Flooring, cabinets, countertops, fixtures, etc. each carry their own number, so you always know what is budgeted and what an upgrade actually costs.",
  },
];

const WHY_BUILD_HTML = `<section class="why-build section-pad" data-testid="why-build">
  <div class="container">
    <div class="page-section-head centered">
      <h2 class="heading-lg why-build-h2">The Most Transparent Builder You Will Work With</h2>
      <p class="why-build-lead">Most homeowners find out about a cost overrun after it has already happened. We work the other way around. Before you break ground you know how your home is priced, what your draw schedule looks like, and what every allowance covers, all in writing. Once we start, you hear from us every week until you have the keys.</p>
    </div>

    <div class="why-build-grid">${WHY_BUILD_PILLARS.map(
      (p) => `
      <article class="why-build-card">
        <div class="why-build-head">
          <span class="why-build-icon" aria-hidden="true"><svg ${ICON_ATTRS}>${p.icon}</svg></span>
          <h3 class="why-build-title">${esc(p.title)}</h3>
        </div>
        <p class="why-build-p">${esc(p.body)}</p>
      </article>`,
    ).join("")}
    </div>

    <div class="why-build-footer">
      <a href="/financing" class="why-build-link">See how construction financing works <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
    </div>
  </div>
</section>`;

function body(r: EstimateResponse, query: string): string {
  const locLabel = r.input.county === "Statewide" ? "Arizona" : `${r.input.location}, Arizona`;
  const interactive = `/financing${query ? `?${query}` : ""}#calculator`;
  const jsonUrl = `${SITE_URL}/api/estimate${query ? `?${query}` : ""}`;
  const e = r.estimate;

  const rows: Array<[string, string]> = [
    ["Total project value", usd(e.homeValue)],
    ["Down payment", `${usd(e.downPayment)} (${r.input.downPaymentPct}%)`],
    ["Construction-to-permanent loan", usd(e.loanAmount)],
    ["Build time", `${r.input.buildMonths} months`],
    ["Construction rate", `${r.input.constructionRatePct}%`],
    ["Mortgage rate after conversion", `${r.input.mortgageRatePct}%`],
    ["Mortgage term", `${r.input.termYears} years`],
    ["Interest during the build", `${usd(e.duringConstruction.totalInterest)} total`],
    ["Interest in the final build month", usd(e.duringConstruction.finalMonthInterest)],
    ["Cash to plan for", usd(e.cashToPlanFor)],
    ["Principal and interest after move-in", `${usd(e.afterMoveIn.principalAndInterest)}/mo`],
    ["Property taxes", `${usd(e.afterMoveIn.propertyTax)}/mo (${usd(e.yearly.propertyTax)}/yr)`],
    ["Homeowners insurance", `${usd(e.afterMoveIn.insurance)}/mo (${usd(e.yearly.insurance)}/yr)`],
    ["HOA dues", `${usd(e.afterMoveIn.hoa)}/mo`],
    ["All-in monthly after move-in", `${usd(e.afterMoveIn.allInMonthly)}/mo`],
  ];

  const firstMonth = e.duringConstruction.monthlyInterestSeries[0] ?? 0;

  return `<main class="page">
<section class="est-band">
  <div class="container est-band-inner">
    <div class="dt-back-row est-back-row">
      <a href="/financing#calculator" class="dt-back dt-back--top est-back">Construction loan calculator</a>
    </div>

    <div class="est-hero-grid">
      <div class="est-hero-copy">
        <p class="eyebrow est-eyebrow">Construction loan estimate</p>
        <h1 class="est-h1">Estimated payments on a ${usd(e.homeValue)} custom home in ${esc(locLabel)}</h1>
        <p class="est-lead">${esc(r.summary)}</p>
        <div class="est-hero-cta">
          <a class="est-cta est-cta--primary" href="/contact" data-testid="estimate-hero-cta">Start Your Build</a>
        </div>
        <div class="est-stat est-stat--lead">
          <span class="est-stat-k">All-in monthly after move-in</span>
          <span class="est-stat-v">${usd(e.afterMoveIn.allInMonthly)}</span>
          <span class="est-stat-sub">${usd(e.afterMoveIn.principalAndInterest)} principal and interest, ${usd(e.afterMoveIn.propertyTax)} taxes, ${usd(e.afterMoveIn.insurance)} insurance</span>
        </div>
      </div>
      <div class="est-hero-chart">${renderDonut(breakdownParts(r), e.afterMoveIn.allInMonthly)}</div>
    </div>

    <div class="est-stats">
      <div class="est-stat">
        <span class="est-stat-k">Loan amount</span>
        <span class="est-stat-v">${usd(e.loanAmount)}</span>
        <span class="est-stat-sub">${r.input.landOwned ? "Financing covers the build only; your lot is your equity" : `After a ${usd(e.downPayment)} down payment`}</span>
      </div>
      <div class="est-stat">
        <span class="est-stat-k">Cash to plan for</span>
        <span class="est-stat-v">${usd(e.cashToPlanFor)}</span>
        <span class="est-stat-sub">Down payment plus construction-period interest</span>
      </div>
      <div class="est-stat">
        <span class="est-stat-k">Interest during the build</span>
        <span class="est-stat-v">${usd(e.duringConstruction.totalInterest)}</span>
        <span class="est-stat-sub">Payments start small and grow with each draw, reaching about ${usd(e.duringConstruction.finalMonthInterest)}/mo in the final month</span>
      </div>
    </div>
  </div>
</section>

<section class="dt-section est-page est-body">
  <div class="container est-container">
    <table class="est-table">
      <caption>Estimate detail</caption>
      <tbody>
${rows.map(([k, v]) => `        <tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`).join("\n")}
      </tbody>
    </table>
${r.warnings.length > 0 ? `    <ul class="est-note">${r.warnings.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}

    <h2 class="est-h2">What you pay while the house is being built</h2>
    <p>With a construction-to-permanent loan you apply once and close once. During the build the lender releases
      money to the builder in stages called draws, each tied to completed work, and you pay interest only on what
      has been drawn so far. On a ${usd(e.loanAmount)} loan at ${r.input.constructionRatePct}% over
      ${r.input.buildMonths} months that comes to about ${usd(e.duringConstruction.totalInterest)} in total,
      starting near ${usd(firstMonth)} in the first month and reaching about
      ${usd(e.duringConstruction.finalMonthInterest)} in the last. Some lenders bill those payments monthly; others
      set up an interest reserve so nothing comes out of pocket until the loan converts. When the home is finished
      the loan becomes a standard mortgage, usually without a second closing.</p>

    <div class="est-timeline-card">${renderTimeline({
      series: e.duringConstruction.monthlyInterestSeries,
      allInMonthly: e.afterMoveIn.allInMonthly,
      months: r.input.buildMonths,
      finalMonthInterest: e.duringConstruction.finalMonthInterest,
      idPrefix: "est-tl",
    })}</div>

    <h2 class="est-h2">Where these numbers come from</h2>
    <p>Property taxes use ${esc(r.input.location)}'s average effective residential rate of
      ${r.assumptions.propertyTaxRatePct}%${r.input.county === "Statewide" ? " (statewide average)" : ` (${esc(r.input.county)} County)`},
      verified ${esc(r.assumptions.propertyTaxAsOf)}
      (<a href="${esc(r.assumptions.propertyTaxSource)}" rel="nofollow noreferrer">source</a>). Insurance uses the
      Arizona average of about ${usd(r.assumptions.insurancePerYearPer100k)} per year per $100,000 of home value as
      of ${esc(r.assumptions.insuranceAsOf)}. The mortgage rate here is ${r.input.mortgageRatePct}%
      (${esc(r.input.mortgageRateSource)}).</p>
    <p class="est-note">${esc(r.assumptions.newBuildTaxNote)}</p>

    <div class="est-cta-row">
      <a class="est-cta est-cta--primary" href="/contact" data-testid="estimate-lead-cta">Get a real quote</a>
      <a class="est-cta" href="${esc(interactive)}" data-testid="estimate-open-calculator">Adjust this estimate</a>
      <a class="est-cta est-cta--quiet" href="/financing">Financing guide</a>
    </div>

    <p class="est-note"><strong>${esc(r.disclaimer)}</strong></p>
    <p class="est-note">Machine-readable version of this estimate:
      <a href="${esc(jsonUrl)}">${esc(jsonUrl)}</a></p>
  </div>
</section>
${WHY_BUILD_HTML}
</main>`;
}

router.get("/financing/estimate", async (req: Request, res: Response): Promise<void> => {
  try {
    const { body: data } = await buildEstimate(req.query as QueryLike);
    const query = new URL(req.originalUrl, SITE_URL).searchParams.toString();
    const locLabel = data.input.county === "Statewide" ? "Arizona" : `${data.input.location}, Arizona`;
    const title = `Estimated payments on a ${usd(data.estimate.homeValue)} custom home in ${locLabel}`;
    const chrome = siteChrome();

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: data.summary,
      url: `${SITE_URL}/financing/estimate${query ? `?${query}` : ""}`,
      isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Jematell Homes" },
      about: { "@type": "Thing", name: "Construction-to-permanent loan estimate" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    };

    const html = `<!DOCTYPE html>
<html lang="en-US"${chrome.htmlClass ? ` class="${chrome.htmlClass}"` : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - Jematell Homes</title>
<meta name="description" content="${esc(data.summary.slice(0, 300))}">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${SITE_URL}/financing">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(data.summary.slice(0, 300))}">
<meta property="og:url" content="${SITE_URL}/financing/estimate${query ? `?${esc(query)}` : ""}">
${
      // In production this process serves the export too, so the hashed
      // stylesheet URLs resolve and stay cacheable across pages. Under
      // `next dev` the page is proxied and the dev server's chunk names differ,
      // so those URLs would 404 and the page would render unstyled; there the
      // stylesheet is inlined instead so the preview is accurate.
      process.env["NODE_ENV"] === "development"
        ? `<style>${chrome.inlineCss}</style>`
        : chrome.headLinks
    }
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
${chrome.header}
${body(data, query)}
${chrome.footer}
</body>
</html>`;

    res.set("Cache-Control", "public, max-age=300");
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  } catch (err) {
    res.status(500).type("text/plain").send(`Unable to render estimate: ${String(err)}`);
  }
});

export default router;
