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
