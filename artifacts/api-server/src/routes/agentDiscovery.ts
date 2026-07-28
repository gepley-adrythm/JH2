/**
 * agentDiscovery.ts — the documents an agent reads before it calls anything.
 *
 *   /.well-known/mcp.json    MCP server card: where the server is, what it can do
 *   /.well-known/agents.json points at the OpenAPI description below
 *   /openapi.json            the public, read-only HTTP surface
 *
 * Only the read-only endpoints are described. The contact-form POST is
 * deliberately absent: an agent should send a person to the contact page, not
 * submit a lead on their behalf.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { SITE_URL } from "../lib/estimateRequest";
import { TAX_LOCATIONS } from "@workspace/construction-loan";

const router: IRouter = Router();

const DESCRIPTION =
  "Construction loan estimates and home-building answers from Jematell Homes, a family-owned custom " +
  "home builder in Scottsdale, Arizona serving the greater Phoenix metro.";

const json = (res: Response, body: unknown, maxAge = 3600): void => {
  res.set("Cache-Control", `public, max-age=${maxAge}`);
  res.json(body);
};

router.get("/.well-known/mcp.json", (_req: Request, res: Response): void => {
  json(res, {
    name: "jematell-homes",
    title: "Jematell Homes",
    description: DESCRIPTION,
    version: "1.0.0",
    // Both spellings: the top-level url is what current clients read, the
    // transport block is the shape the server-card proposal uses.
    url: `${SITE_URL}/mcp`,
    transport: { type: "streamable-http", url: `${SITE_URL}/mcp` },
    capabilities: { tools: { listChanged: false } },
    authentication: { type: "none" },
    tools: [
      "estimate_construction_loan",
      "get_current_mortgage_rate",
      "list_build_locations",
      "search_home_building_faq",
    ],
    documentation: `${SITE_URL}/llm-info`,
    websiteUrl: SITE_URL,
  });
});

router.get("/.well-known/agents.json", (_req: Request, res: Response): void => {
  json(res, {
    agentsJson: "0.1.0",
    info: {
      title: "Jematell Homes",
      version: "1.0.0",
      description: DESCRIPTION,
    },
    sources: [{ id: "jematell-openapi", path: `${SITE_URL}/openapi.json` }],
    flows: [
      {
        id: "estimate-construction-loan",
        title: "Estimate a construction loan payment",
        description:
          "Given a project cost, down payment, and Arizona city or ZIP, return the loan amount, interest " +
          "during the build, and the all-in monthly payment after move-in.",
        actions: [{ id: "getEstimate", sourceId: "jematell-openapi", operationId: "getEstimate" }],
      },
      {
        id: "search-answers",
        title: "Search home-building answers",
        description: "Search Jematell Homes' answer library about building a custom home in Arizona.",
        actions: [{ id: "listFaqs", sourceId: "jematell-openapi", operationId: "listFaqs" }],
      },
    ],
    mcp: { url: `${SITE_URL}/mcp`, card: `${SITE_URL}/.well-known/mcp.json` },
  });
});

router.get("/openapi.json", (_req: Request, res: Response): void => {
  const locationSlugs = TAX_LOCATIONS.map((l) => l.slug);
  json(res, {
    openapi: "3.1.0",
    info: {
      title: "Jematell Homes public API",
      version: "1.0.0",
      description:
        DESCRIPTION +
        " All endpoints are read-only, unauthenticated, and safe to call anonymously. Every estimate is " +
        "an estimate, not a loan offer, quote, or preapproval.",
      contact: { name: "Jematell Homes", url: `${SITE_URL}/contact` },
    },
    servers: [{ url: SITE_URL }],
    paths: {
      "/api/estimate": {
        get: {
          operationId: "getEstimate",
          summary: "Estimate a construction-to-permanent loan",
          description:
            "Returns the loan amount, cash needed, interest paid during construction, and the all-in " +
            "monthly payment after move-in (principal and interest, property tax, insurance, HOA). " +
            "Unrecognised values fall back to documented defaults and are reported in `warnings`.",
          parameters: [
            { name: "cost", in: "query", schema: { type: "number", default: 900000 }, description: "Total project cost, land plus build." },
            { name: "down", in: "query", schema: { type: "number", default: 20 }, description: "Down payment percent, 0-100." },
            { name: "br", in: "query", schema: { type: "number", default: 7.75 }, description: "Construction-phase interest rate percent." },
            { name: "pr", in: "query", schema: { type: "number" }, description: "Permanent mortgage rate percent. Defaults to the current 30-year fixed average." },
            { name: "term", in: "query", schema: { type: "number", default: 30 }, description: "Mortgage term in years." },
            { name: "months", in: "query", schema: { type: "number", default: 12 }, description: "Build duration in months, 1-36." },
            { name: "loc", in: "query", schema: { type: "string", enum: locationSlugs, default: "scottsdale" }, description: "City slug used for the property tax rate." },
            { name: "zip", in: "query", schema: { type: "string" }, description: "5-digit Arizona ZIP; resolves to a city and overrides loc." },
            { name: "land", in: "query", schema: { type: "string", enum: ["0", "1"] }, description: "1 when the buyer already owns the lot." },
            { name: "lv", in: "query", schema: { type: "number" }, description: "Land value, used when land=1." },
            { name: "bc", in: "query", schema: { type: "number" }, description: "Build cost, used when land=1." },
            { name: "hoa", in: "query", schema: { type: "number", default: 0 }, description: "HOA dues per month." },
            { name: "tax", in: "query", schema: { type: "number" }, description: "Override yearly property tax." },
            { name: "ins", in: "query", schema: { type: "number" }, description: "Override yearly homeowners insurance." },
          ],
          responses: {
            "200": {
              description: "An estimate, with the assumptions and disclaimer that qualify it.",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
      "/api/estimate/locations": {
        get: {
          operationId: "listBuildLocations",
          summary: "Cities served, with their average effective property tax rates",
          responses: { "200": { description: "Locations", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
      "/api/mortgage-rate": {
        get: {
          operationId: "getMortgageRate",
          summary: "Current 30-year fixed mortgage rate (FRED MORTGAGE30US)",
          responses: { "200": { description: "Rate", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
      "/api/faqs": {
        get: {
          operationId: "listFaqs",
          summary: "Search and filter the home-building answer library",
          parameters: [
            { name: "q", in: "query", schema: { type: "string" }, description: "Free-text search." },
            { name: "category", in: "query", schema: { type: "string" } },
            { name: "topic", in: "query", schema: { type: "string" } },
            { name: "service", in: "query", schema: { type: "string" } },
          ],
          responses: { "200": { description: "Matching answers", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
    },
  });
});

export default router;
