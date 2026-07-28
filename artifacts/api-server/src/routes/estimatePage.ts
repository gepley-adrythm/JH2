/**
 * estimatePage.ts — GET /financing/estimate?<calculator params>
 *
 * The permalink behind the calculator's "Copy link to this estimate" button,
 * and the crawlable twin of the calculator itself.
 *
 * The calculator is a client component: its query parameters are applied after
 * hydration, so /financing?cost=1500000 serves HTML containing the default
 * $900,000 estimate. Crawlers behind the AI answer engines do not execute
 * JavaScript, and neither do link previews, so a shared link would otherwise
 * describe the wrong estimate. This route answers the same parameters with the
 * real numbers already in the HTML.
 *
 * It is deliberately a separate URL rather than a rewrite of /financing:
 * injecting different numbers into the prerendered page would desynchronise
 * React's hydration for real visitors. Nothing about the interactive calculator
 * changes; it just shares this link instead of its own.
 *
 * Chrome comes from the same renderShell the server-rendered FAQ pages use, so
 * a person who opens a shared estimate lands on a page that looks like the site
 * and can reach the contact form, the calculator, and the rest of the nav.
 *
 * Indexing: noindex,follow with a canonical to /financing. Query strings are an
 * unbounded URL space, so the fixed, curated scenario pages under
 * /financing/estimate/<slug> are what belongs in the index; this route exists so
 * that any arbitrary estimate a person or an agent asks for is still readable.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { SITE_URL, buildEstimate, type EstimateResponse, type QueryLike } from "../lib/estimateRequest";
import { escapeAttr, escapeHtml } from "../lib/faq/html";
import { ctaStrip, renderShell } from "../lib/faq/shell";

const router: IRouter = Router();

const usd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Page-specific styles; the shell ships the palette, type, header, and footer. */
const PAGE_STYLES = `
.est-wrap{padding:44px 0 8px}
.est-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:28px 0 8px}
.est-stat{background:var(--color-dark);color:var(--color-bone);padding:20px 22px;border-radius:4px;display:flex;flex-direction:column;gap:6px}
.est-stat-k{font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.7}
.est-stat-v{font-size:clamp(1.5rem,3vw,2rem);color:#fff;font-variant-numeric:tabular-nums;font-family:var(--font-heading)}
.est-stat-sub{font-size:12.5px;opacity:.72;line-height:1.5}
.est-table{width:100%;border-collapse:collapse;margin:26px 0 8px;font-size:15px}
.est-table caption{text-align:left;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-muted);padding-bottom:10px}
.est-table th,.est-table td{text-align:left;padding:11px 10px;border-bottom:1px solid var(--color-border)}
.est-table th{font-weight:400;color:var(--color-text-muted);width:58%}
.est-table td{font-variant-numeric:tabular-nums}
.est-actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:32px 0 24px}
.est-secondary{display:inline-flex;align-items:center;padding:15px 26px;border:1px solid var(--color-accent);border-radius:2px;font-size:14px;letter-spacing:.05em;text-transform:uppercase}
.est-note{font-size:13px;color:var(--color-text-muted);line-height:1.7;max-width:72ch}
.est-warn{color:var(--color-warm);font-size:14px}
h2{margin-top:38px}
@media(max-width:760px){.est-stats{grid-template-columns:1fr}}
`;

function body(r: EstimateResponse, query: string): string {
  const locLabel = r.input.county === "Statewide" ? "Arizona" : `${r.input.location}, Arizona`;
  const interactive = `/financing${query ? `?${query}` : ""}`;
  const jsonUrl = `${SITE_URL}/api/estimate${query ? `?${query}` : ""}`;

  const rows: Array<[string, string]> = [
    ["Total project value", usd(r.estimate.homeValue)],
    ["Down payment", `${usd(r.estimate.downPayment)} (${r.input.downPaymentPct}%)`],
    ["Construction-to-permanent loan", usd(r.estimate.loanAmount)],
    ["Build time", `${r.input.buildMonths} months`],
    ["Construction rate", `${r.input.constructionRatePct}%`],
    ["Mortgage rate after conversion", `${r.input.mortgageRatePct}%`],
    ["Mortgage term", `${r.input.termYears} years`],
    ["Interest during construction", `${usd(r.estimate.duringConstruction.totalInterest)} total`],
    ["Interest in the final build month", usd(r.estimate.duringConstruction.finalMonthInterest)],
    ["Cash to plan for", usd(r.estimate.cashToPlanFor)],
    ["Principal and interest after move-in", `${usd(r.estimate.afterMoveIn.principalAndInterest)}/mo`],
    ["Property taxes", `${usd(r.estimate.afterMoveIn.propertyTax)}/mo (${usd(r.estimate.yearly.propertyTax)}/yr)`],
    ["Homeowners insurance", `${usd(r.estimate.afterMoveIn.insurance)}/mo (${usd(r.estimate.yearly.insurance)}/yr)`],
    ["HOA dues", `${usd(r.estimate.afterMoveIn.hoa)}/mo`],
    ["All-in monthly after move-in", `${usd(r.estimate.afterMoveIn.allInMonthly)}/mo`],
  ];

  return `<style>${PAGE_STYLES}</style>
<section class="faq-hero"><div class="container">
<p class="eyebrow">Construction loan estimate</p>
<h1>Estimated payments on a ${usd(r.estimate.homeValue)} custom home in ${escapeHtml(locLabel)}</h1>
<p>${escapeHtml(r.summary)}</p>
</div></section>
<div class="container est-wrap">
<div class="est-stats">
  <div class="est-stat">
    <span class="est-stat-k">All-in monthly after move-in</span>
    <span class="est-stat-v">${usd(r.estimate.afterMoveIn.allInMonthly)}</span>
    <span class="est-stat-sub">${usd(r.estimate.afterMoveIn.principalAndInterest)} principal and interest,
      ${usd(r.estimate.afterMoveIn.propertyTax)} taxes, ${usd(r.estimate.afterMoveIn.insurance)} insurance</span>
  </div>
  <div class="est-stat">
    <span class="est-stat-k">Loan amount</span>
    <span class="est-stat-v">${usd(r.estimate.loanAmount)}</span>
    <span class="est-stat-sub">${r.input.landOwned ? "Financing covers the build only; your lot is your equity" : `After a ${usd(r.estimate.downPayment)} down payment`}</span>
  </div>
  <div class="est-stat">
    <span class="est-stat-k">Cash to plan for</span>
    <span class="est-stat-v">${usd(r.estimate.cashToPlanFor)}</span>
    <span class="est-stat-sub">Down payment plus interest paid during the build</span>
  </div>
</div>

<div class="est-actions">
  <a href="/contact" class="btn btn-primary" data-testid="estimate-lead-cta">Get a real quote</a>
  <a href="${escapeAttr(interactive)}" class="est-secondary" data-testid="estimate-open-calculator">Adjust this estimate</a>
</div>

<table class="est-table">
<caption>Estimate detail</caption>
<tbody>
${rows.map(([k, v]) => `<tr><th scope="row">${escapeHtml(k)}</th><td>${v}</td></tr>`).join("\n")}
</tbody>
</table>
${r.warnings.length > 0 ? `<ul class="est-warn">${r.warnings.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>` : ""}

<h2>How this is calculated</h2>
<p>${escapeHtml(r.assumptions.model)}</p>
<p class="est-note">Property taxes default to ${r.assumptions.propertyTaxRatePct}% for ${escapeHtml(r.input.location)}${
    r.input.county === "Statewide" ? " (statewide average)" : ` (${escapeHtml(r.input.county)} County)`
  }, the average effective rate as of ${escapeHtml(r.assumptions.propertyTaxAsOf)}
(<a href="${escapeAttr(r.assumptions.propertyTaxSource)}" rel="nofollow noreferrer">source</a>). Insurance defaults to the
Arizona average of about ${usd(r.assumptions.insurancePerYearPer100k)} per year per $100,000 of home value as of
${escapeHtml(r.assumptions.insuranceAsOf)}. The mortgage rate here is ${r.input.mortgageRatePct}%
(${escapeHtml(r.input.mortgageRateSource)}). ${escapeHtml(r.assumptions.newBuildTaxNote)}</p>
<p class="est-note"><strong>${escapeHtml(r.disclaimer)}</strong></p>
<p class="est-note">Machine-readable version of this estimate:
<a href="${escapeAttr(jsonUrl)}">${escapeHtml(jsonUrl)}</a>.
Full financing guide: <a href="/financing">${SITE_URL}/financing</a>.</p>
</div>
${ctaStrip}`;
}

router.get("/financing/estimate", async (req: Request, res: Response): Promise<void> => {
  try {
    const { body: data } = await buildEstimate(req.query as QueryLike);
    const query = new URL(req.originalUrl, SITE_URL).searchParams.toString();
    const locLabel = data.input.county === "Statewide" ? "Arizona" : `${data.input.location}, Arizona`;
    const title = `Estimated payments on a ${usd(data.estimate.homeValue)} custom home in ${locLabel}`;
    const html = renderShell({
      title: `${title} - Jematell Homes`,
      metaDescription: data.summary.slice(0, 300),
      canonical: `${SITE_URL}/financing`,
      robots: "noindex,follow",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description: data.summary,
          url: `${SITE_URL}/financing/estimate${query ? `?${query}` : ""}`,
          isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Jematell Homes" },
          about: { "@type": "Thing", name: "Construction-to-permanent loan estimate" },
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      ],
      body: body(data, query),
    });
    res.set("Cache-Control", "public, max-age=300");
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  } catch (err) {
    res.status(500).type("text/plain").send(`Unable to render estimate: ${String(err)}`);
  }
});

export default router;
