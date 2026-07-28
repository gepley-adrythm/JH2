/**
 * @workspace/construction-loan — one implementation of the construction-to-permanent
 * payment model, shared by every surface that quotes a number:
 *
 *   - the interactive calculator on /financing (React, client-side)
 *   - GET /api/estimate on the api-server (JSON for agents and integrations)
 *   - the prerendered scenario pages under /financing/estimate/* (crawlable HTML)
 *   - the estimate_construction_loan MCP tool
 *
 * Keeping the arithmetic and the Arizona tax/insurance reference data here is what
 * stops those surfaces from ever quoting different figures for the same inputs.
 */
export {
  STATEWIDE_SLUG,
  buildInterestSeries,
  clamp,
  estimate,
  locationForSlug,
  parseMoney,
  resolveZip,
} from "./estimate";
export type { Estimate, EstimateInput, ZipResolution } from "./estimate";
export {
  INSURANCE_AS_OF,
  INSURANCE_PER_YEAR_PER_100K,
  NEW_BUILD_TAX_NOTE,
  TAX_AS_OF,
  TAX_LOCATIONS,
  ZIP_TO_LOCATION,
} from "./azPropertyTax";
export type { TaxLocation } from "./azPropertyTax";
