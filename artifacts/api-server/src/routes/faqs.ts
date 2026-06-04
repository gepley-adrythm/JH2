import { Router, type IRouter, type Request, type Response } from "express";
import {
  CheckFaqDuplicateQueryParams,
  CheckFaqDuplicateResponse,
  GetFaqParams,
  GetFaqResponse,
  ListFaqsQueryParams,
  ListFaqsResponse,
} from "@workspace/api-zod";
import { loadDataset } from "../lib/faq/repo";

const router: IRouter = Router();

router.get("/faqs", async (req: Request, res: Response): Promise<void> => {
  const parsed = ListFaqsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters." });
    return;
  }
  const dataset = await loadDataset();
  const { category, topic, service, q } = parsed.data;
  // `featured` is read from the raw query because the generated schema coerces
  // it with zod.coerce.boolean(), where any non-empty string (incl. "false")
  // becomes true.
  const wantFeatured = req.query.featured === "true";

  let items = q && q.trim() ? dataset.search(q) : dataset.all();
  if (category) items = items.filter((i) => i.categorySlug === category);
  if (topic) items = items.filter((i) => i.topicSlugs.includes(topic));
  if (service) items = items.filter((i) => i.relatedServiceSlugs.includes(service));
  if (wantFeatured) items = items.filter((i) => i.featured);

  const summaries = items.map((i) => dataset.toSummary(i));
  const data = ListFaqsResponse.parse({
    items: summaries,
    total: summaries.length,
  });
  res.json(data);
});

router.get(
  "/faqs/admin/check-duplicate",
  async (req: Request, res: Response): Promise<void> => {
    // Check the raw value first: zod.coerce.string() would turn a missing `q`
    // into the literal string "undefined", so safeParse alone can't reject it.
    const rawQ = req.query.q;
    if (typeof rawQ !== "string" || !rawQ.trim()) {
      res.status(400).json({ error: "Query parameter 'q' is required." });
      return;
    }
    const { q } = CheckFaqDuplicateQueryParams.parse({ q: rawQ });
    const dataset = await loadDataset();
    const data = CheckFaqDuplicateResponse.parse({
      query: q,
      matches: dataset.checkDuplicate(q),
    });
    res.json(data);
  },
);

router.get("/faqs/:slug", async (req: Request, res: Response): Promise<void> => {
  const parsed = GetFaqParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug." });
    return;
  }
  const dataset = await loadDataset();
  const item = dataset.getItem(parsed.data.slug);
  if (!item) {
    res.status(404).json({ error: "FAQ not found." });
    return;
  }
  const data = GetFaqResponse.parse({
    faq: dataset.toDetail(item),
    related: dataset.related(item),
  });
  res.json(data);
});

export default router;
