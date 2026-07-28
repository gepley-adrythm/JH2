/**
 * estimate.ts — GET /api/estimate and GET /api/estimate/locations.
 *
 * Read-only, unauthenticated, CORS-open (see app.ts): the same figures the
 * public calculator shows, in a shape an agent or an integration can consume.
 * Every response carries its own assumptions and disclaimer so a number lifted
 * out of it cannot be quoted as a loan offer.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { buildEstimate, locationCatalog, type QueryLike } from "../lib/estimateRequest";

const router: IRouter = Router();

router.get("/estimate", async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = await buildEstimate(req.query as QueryLike);
    // Short cache: the only time-varying input is the daily mortgage rate.
    res.set("Cache-Control", "public, max-age=300");
    res.json(body);
  } catch (err) {
    res.status(500).json({ error: "Unable to compute estimate", detail: String(err) });
  }
});

router.get("/estimate/locations", (_req: Request, res: Response): void => {
  res.set("Cache-Control", "public, max-age=3600");
  res.json({ locations: locationCatalog() });
});

export default router;
