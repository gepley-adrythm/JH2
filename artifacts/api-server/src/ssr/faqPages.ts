import { Router, type IRouter, type Request, type Response } from "express";
import { getBaseUrl } from "../lib/faq/html";
import { loadDataset } from "../lib/faq/repo";
import {
  renderFaqDetail,
  renderFaqIndex,
  renderFaqTopic,
} from "../lib/faq/render";
import { renderFaqSitemap } from "../lib/faq/sitemap";

const router: IRouter = Router();

const notFoundHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Not found | Jematell Homes</title>
<style>body{font-family:system-ui,sans-serif;background:#f4f2ec;color:#2a2a2a;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center}a{color:#3b617f}</style>
</head><body><div><h1>Question not found</h1><p><a href="/faq">Back to all FAQs</a></p></div></body></html>`;

// /sitemap-faq.xml — all FAQ URLs.
router.get("/sitemap-faq.xml", async (req: Request, res: Response): Promise<void> => {
  const dataset = await loadDataset();
  res.type("application/xml").send(renderFaqSitemap(dataset, getBaseUrl(req)));
});

// /faq — FAQ hub (FAQPage).
router.get("/faq", async (req: Request, res: Response): Promise<void> => {
  const dataset = await loadDataset();
  res.type("html").send(renderFaqIndex(dataset, getBaseUrl(req)));
});

// /faq/topics/:slug — topic cluster (FAQPage). Must precede /faq/:slug.
router.get(
  "/faq/topics/:slug",
  async (req: Request, res: Response): Promise<void> => {
    const dataset = await loadDataset();
    const html = renderFaqTopic(dataset, String(req.params.slug), getBaseUrl(req));
    if (!html) {
      res.status(404).type("html").send(notFoundHtml);
      return;
    }
    res.type("html").send(html);
  },
);

// /faq/:slug — single question (QAPage + BreadcrumbList @graph).
router.get("/faq/:slug", async (req: Request, res: Response): Promise<void> => {
  const dataset = await loadDataset();
  const html = renderFaqDetail(dataset, String(req.params.slug), getBaseUrl(req));
  if (!html) {
    res.status(404).type("html").send(notFoundHtml);
    return;
  }
  res.type("html").send(html);
});

export default router;
