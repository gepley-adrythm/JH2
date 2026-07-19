/**
 * azPropertyTax.ts: average effective residential property tax rates for the
 * cities Jematell builds in, plus a statewide fallback. Rates are AVERAGE
 * EFFECTIVE rates (median annual bill divided by median home value), not
 * assessment-ratio or millage math, so they are the right figure for a
 * payment estimate. Sources verified "July 2026"; each entry cites its source
 * in the comment above it. Update TAX_AS_OF whenever these are re-verified.
 */

export interface TaxLocation {
  slug: string;
  name: string;
  county: string;
  effectiveRatePct: number;
  sourceUrl: string;
}

export const TAX_AS_OF = "July 2026";

export const TAX_LOCATIONS: TaxLocation[] = [
  // Ownwell (updated Apr 13, 2026): median effective rate 0.37%, median bill
  // $2,573 on $655,600 median value; varies by ZIP (85254 is 0.51%).
  // County-level cross-check: SmartAsset puts Maricopa County at 0.40%.
  {
    slug: "scottsdale",
    name: "Scottsdale",
    county: "Maricopa",
    effectiveRatePct: 0.37,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/scottsdale",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.45%, median bill
  // $3,368 on $682,700 median value.
  {
    slug: "rio-verde",
    name: "Rio Verde",
    county: "Maricopa",
    effectiveRatePct: 0.45,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/rio-verde",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.46%, median bill
  // $1,574 on $330,800 median value.
  {
    slug: "phoenix",
    name: "Phoenix",
    county: "Maricopa",
    effectiveRatePct: 0.46,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/phoenix",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.33%, median bill
  // $2,168 on $659,300 median value.
  {
    slug: "cave-creek",
    name: "Cave Creek",
    county: "Maricopa",
    effectiveRatePct: 0.33,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/cave-creek",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.35%, median bill
  // $1,864 on $529,500 median value.
  {
    slug: "fountain-hills",
    name: "Fountain Hills",
    county: "Maricopa",
    effectiveRatePct: 0.35,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/fountain-hills",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.27%, median bill
  // $2,456 on $926,800 median value; lowest of the nine cities.
  {
    slug: "carefree",
    name: "Carefree",
    county: "Maricopa",
    effectiveRatePct: 0.27,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/carefree",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.62%, median bill
  // $1,359 on $233,318 median value; highest of the nine cities. SmartAsset
  // puts Pinal County overall at 0.41%.
  {
    slug: "casa-grande",
    name: "Casa Grande",
    county: "Pinal",
    effectiveRatePct: 0.62,
    sourceUrl: "https://www.ownwell.com/trends/arizona/pinal-county/casa-grande",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.52%, median bill
  // $1,263 on $258,908 median value. City straddles the Pinal/Maricopa line;
  // Pinal figures used.
  {
    slug: "apache-junction",
    name: "Apache Junction",
    county: "Pinal",
    effectiveRatePct: 0.52,
    sourceUrl: "https://www.ownwell.com/trends/arizona/pinal-county/apache-junction",
  },
  // Ownwell (updated Apr 13, 2026): median effective rate 0.44%, median bill
  // $1,590 on $350,600 median value.
  {
    slug: "surprise",
    name: "Surprise",
    county: "Maricopa",
    effectiveRatePct: 0.44,
    sourceUrl: "https://www.ownwell.com/trends/arizona/maricopa-county/surprise",
  },
  // Ownwell (updated Apr 13, 2026): Arizona state median effective rate 0.51%,
  // median bill $1,695 on $327,500. Spread noted: SmartAsset
  // (https://smartasset.com/taxes/arizona-property-tax-calculator, also
  // fetched) reports a 0.43% statewide average; 0.51% used as the conservative
  // figure consistent with the city rows' methodology.
  {
    slug: "elsewhere-in-arizona",
    name: "Elsewhere in Arizona",
    county: "Statewide",
    effectiveRatePct: 0.51,
    sourceUrl: "https://www.ownwell.com/trends/arizona",
  },
];

/**
 * ZIP-to-location map for the calculator's ZIP resolver. Each key is a USPS
 * Standard-type residential ZIP; each value is the matching TAX_LOCATIONS
 * slug. Source: zip-codes.com city pages (e.g.
 * https://www.zip-codes.com/city/az-scottsdale.asp), fetched July 18, 2026.
 * PO-Box-only ZIPs are excluded on purpose: nobody builds a house at a PO
 * box, and mapping one would mislead. Deliberately unmapped neighbors: 85253
 * is Paradise Valley and 85118 is Gold Canyon, neither a city Jematell
 * builds in, so both fall through to the statewide-average fallback
 * ("elsewhere-in-arizona") via the calculator's Arizona-range check.
 */
export const ZIP_TO_LOCATION: Record<string, string> = {
  // Scottsdale (Maricopa)
  "85250": "scottsdale",
  "85251": "scottsdale",
  "85254": "scottsdale",
  "85255": "scottsdale",
  "85256": "scottsdale",
  "85257": "scottsdale",
  "85258": "scottsdale",
  "85259": "scottsdale",
  "85260": "scottsdale",
  "85262": "scottsdale",
  "85266": "scottsdale",
  // Rio Verde (Maricopa)
  "85263": "rio-verde",
  // Phoenix (Maricopa)
  "85003": "phoenix",
  "85004": "phoenix",
  "85006": "phoenix",
  "85007": "phoenix",
  "85008": "phoenix",
  "85009": "phoenix",
  "85012": "phoenix",
  "85013": "phoenix",
  "85014": "phoenix",
  "85015": "phoenix",
  "85016": "phoenix",
  "85017": "phoenix",
  "85018": "phoenix",
  "85019": "phoenix",
  "85020": "phoenix",
  "85021": "phoenix",
  "85022": "phoenix",
  "85023": "phoenix",
  "85024": "phoenix",
  "85027": "phoenix",
  "85028": "phoenix",
  "85029": "phoenix",
  "85031": "phoenix",
  "85032": "phoenix",
  "85033": "phoenix",
  "85034": "phoenix",
  "85035": "phoenix",
  "85037": "phoenix",
  "85040": "phoenix",
  "85041": "phoenix",
  "85042": "phoenix",
  "85043": "phoenix",
  "85044": "phoenix",
  "85045": "phoenix",
  "85048": "phoenix",
  "85050": "phoenix",
  "85051": "phoenix",
  "85053": "phoenix",
  "85054": "phoenix",
  "85083": "phoenix",
  "85085": "phoenix",
  "85086": "phoenix",
  // Cave Creek (Maricopa)
  "85331": "cave-creek",
  // Fountain Hills (Maricopa)
  "85268": "fountain-hills",
  // Carefree (Maricopa)
  "85377": "carefree",
  // Casa Grande (Pinal)
  "85122": "casa-grande",
  "85193": "casa-grande",
  "85194": "casa-grande",
  // Apache Junction (Pinal)
  "85119": "apache-junction",
  "85120": "apache-junction",
  // Surprise (Maricopa)
  "85374": "surprise",
  "85378": "surprise",
  "85379": "surprise",
  "85387": "surprise",
  "85388": "surprise",
};

export const NEW_BUILD_TAX_NOTE =
  "Arizona values property in the year before taxes are billed, and bills are paid in arrears in two installments (October 1 and March 1), so a newly built home's first tax bill is usually based on a valuation set before the house existed. Under ARS 42-15105, construction completed after the valuation snapshot is picked up later through a supplemental Notice of Value that the county assessor must issue by September 30 of the valuation year. As a result, the first bill or two often reflects the land only, and buyers should expect the bill to step up to the full home value within one to two years after closing.";

/**
 * Average Arizona homeowners insurance cost per year, per $100,000 of dwelling
 * coverage. Source: https://www.nerdwallet.com/insurance/homeowners/arizona-home-insurance
 * Derivation: NerdWallet (updated Feb 20, 2026) reports the average Arizona
 * homeowners premium as $2,690 per year for $300,000 of dwelling coverage
 * ($1,000 deductible, $300,000 liability, good credit). Derivation:
 * $2,690 / 3 = $897 per year per $100,000 of dwelling coverage. Cross-check:
 * NerdWallet's $500,000 tier ($4,175/yr) implies about $835 per $100,000, so
 * the defensible band is roughly $835 to $900; $897 is the conservative choice
 * for a payment calculator.
 */
export const INSURANCE_PER_YEAR_PER_100K = 897;

/**
 * Publication date of the NerdWallet average behind INSURANCE_PER_YEAR_PER_100K,
 * rendered in the calculator's visible copy. Update alongside the figure above.
 */
export const INSURANCE_AS_OF = "February 2026";
