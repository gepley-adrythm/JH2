/**
 * mortgageRate.ts — GET /api/mortgage-rate.
 *
 * The FRED fetch and its day-long cache now live in ../lib/mortgageRate so the
 * estimate endpoint and the MCP tool share them. The response shape here is
 * unchanged: { rate, source } on success, 502 with { error, detail } when FRED
 * fails and nothing has ever been cached.
 */
import { Router } from "express";
import { getMortgageRate } from "../lib/mortgageRate";

const router = Router();

router.get("/mortgage-rate", async (_req, res) => {
  try {
    const { rate, source } = await getMortgageRate();
    res.json({ rate, source });
  } catch (err) {
    res.status(502).json({ error: "Unable to fetch mortgage rate", detail: String(err) });
  }
});

export default router;
