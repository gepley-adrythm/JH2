/**
 * azPropertyTax.ts — re-export shim.
 *
 * The Arizona property-tax and insurance reference data moved to
 * @workspace/construction-loan so the api-server, the prerendered scenario
 * pages, and the MCP tool read the same rates the calculator does. This module
 * stays put so every existing "@/data/azPropertyTax" import keeps working, and
 * so the data has one home rather than two copies that can drift.
 */
export {
  INSURANCE_AS_OF,
  INSURANCE_PER_YEAR_PER_100K,
  NEW_BUILD_TAX_NOTE,
  TAX_AS_OF,
  TAX_LOCATIONS,
  ZIP_TO_LOCATION,
} from "@workspace/construction-loan";
export type { TaxLocation } from "@workspace/construction-loan";
