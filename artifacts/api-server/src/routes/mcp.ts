/**
 * mcp.ts — a read-only Model Context Protocol server at POST /mcp.
 *
 * Why hand-rolled JSON-RPC rather than the SDK: this server is stateless and
 * read-only (four tools, no sessions, no auth, no writes), so the whole surface
 * is initialize / tools/list / tools/call plus the initialized notification.
 * That is small enough to own outright, and it keeps the api-server bundle free
 * of a dependency whose API is still moving between spec revisions.
 *
 * Transport: streamable HTTP in its simplest legal form — the client POSTs a
 * JSON-RPC message and gets a single JSON response. No SSE stream is opened, so
 * GET /mcp answers 405 as the spec allows for servers that never push.
 *
 * Protocol version: the client's requested version is echoed back when it is one
 * we understand, otherwise the newest we implement. Tools are unaffected by the
 * revision differences, so this stays compatible as clients move forward.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { buildEstimate, locationCatalog, SITE_URL, type QueryLike } from "../lib/estimateRequest";
import { defaultPermRatePct } from "../lib/mortgageRate";
import { loadDataset } from "../lib/faq/repo";

const router: IRouter = Router();

const SERVER_NAME = "jematell-homes";
const SERVER_VERSION = "1.0.0";
const SUPPORTED_PROTOCOLS = ["2025-11-25", "2025-06-18", "2025-03-26"];
const LATEST_PROTOCOL = SUPPORTED_PROTOCOLS[0] as string;

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

const TOOLS = [
  {
    name: "estimate_construction_loan",
    title: "Estimate a construction-to-permanent loan",
    description:
      "Estimate the monthly payment and cash needed to build a custom home in Arizona with a " +
      "construction-to-permanent (one-time-close) loan. Returns the loan amount, interest paid " +
      "during the build, and the all-in monthly payment after move-in including principal and " +
      "interest, property taxes for the city, homeowners insurance, and HOA dues. Property tax " +
      "rates are the published average effective rates for the cities Jematell Homes builds in. " +
      "Estimates only, not a loan offer.",
    inputSchema: {
      type: "object",
      properties: {
        totalProjectCost: {
          type: "number",
          description: "Total project cost, land plus build. Defaults to 900000.",
        },
        landOwned: {
          type: "boolean",
          description:
            "True if the buyer already owns the lot. Financing then covers the build only and the lot counts as equity.",
        },
        landValue: { type: "number", description: "Value of the lot. Used when landOwned is true." },
        buildCost: { type: "number", description: "Cost of construction. Used when landOwned is true." },
        downPaymentPct: { type: "number", description: "Down payment percent, 0-100. Defaults to 20." },
        constructionRatePct: {
          type: "number",
          description: "Interest rate during construction. Defaults to 7.75.",
        },
        mortgageRatePct: {
          type: "number",
          description:
            "Rate on the permanent mortgage after conversion. Defaults to the current 30-year fixed average from FRED.",
        },
        termYears: { type: "number", description: "Mortgage term in years, typically 15 or 30. Defaults to 30." },
        buildMonths: { type: "number", description: "Build duration in months, 1-36. Defaults to 12." },
        location: {
          type: "string",
          description:
            "City slug for the property tax rate. One of the slugs from list_build_locations, e.g. scottsdale, rio-verde, phoenix, cave-creek, fountain-hills, carefree, casa-grande, apache-junction, surprise, elsewhere-in-arizona.",
        },
        zip: { type: "string", description: "5-digit Arizona ZIP code; resolves to a city and overrides location." },
        hoaMonthly: { type: "number", description: "HOA dues per month. Defaults to 0." },
        propertyTaxYearly: {
          type: "number",
          description: "Override the estimated yearly property tax with a known figure.",
        },
        insuranceYearly: {
          type: "number",
          description: "Override the estimated yearly homeowners insurance with a known figure.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_current_mortgage_rate",
    title: "Current 30-year fixed mortgage rate",
    description:
      "The current 30-year fixed mortgage rate (FRED series MORTGAGE30US, the Freddie Mac weekly " +
      "average), cached for a day. This is the rate the Jematell Homes calculator uses as its default.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_build_locations",
    title: "Arizona cities and their property tax rates",
    description:
      "The Arizona cities Jematell Homes builds in, each with the average effective residential " +
      "property tax rate used by the estimator, its source, and when it was last verified.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "search_home_building_faq",
    title: "Search the Jematell Homes answer library",
    description:
      "Search Jematell Homes' library of answers about building a custom home in Arizona: " +
      "construction financing, permits and building codes, lot buying, contracts, warranties, and " +
      "the build process. Returns question, short answer, and the URL of the full page.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What to search for, in plain language." },
        limit: { type: "number", description: "Maximum results, 1-20. Defaults to 5." },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
];

/** Map the tool's descriptive argument names onto the query vocabulary the estimator parses. */
function argsToQuery(a: Record<string, unknown>): QueryLike {
  const q: QueryLike = {};
  const set = (k: string, v: unknown) => {
    if (v !== undefined && v !== null) q[k] = String(v);
  };
  set("cost", a["totalProjectCost"]);
  set("land", a["landOwned"] === true ? "1" : a["landOwned"] === false ? "0" : undefined);
  set("lv", a["landValue"]);
  set("bc", a["buildCost"]);
  set("down", a["downPaymentPct"]);
  set("br", a["constructionRatePct"]);
  set("pr", a["mortgageRatePct"]);
  set("term", a["termYears"]);
  set("months", a["buildMonths"]);
  set("loc", a["location"]);
  set("zip", a["zip"]);
  set("hoa", a["hoaMonthly"]);
  set("tax", a["propertyTaxYearly"]);
  set("ins", a["insuranceYearly"]);
  return q;
}

interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: unknown;
  isError?: boolean;
}

async function callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  switch (name) {
    case "estimate_construction_loan": {
      const { body } = await buildEstimate(argsToQuery(args));
      const text = [
        body.summary,
        "",
        `Interactive calculator: ${body.links.calculator}`,
        `This estimate as a page: ${body.links.thisEstimate}`,
        ...(body.warnings.length > 0 ? ["", `Notes: ${body.warnings.join(" ")}`] : []),
        "",
        body.disclaimer,
      ].join("\n");
      return { content: [{ type: "text", text }], structuredContent: body };
    }
    case "get_current_mortgage_rate": {
      const { rate, source } = await defaultPermRatePct();
      const text =
        source === "fallback"
          ? `The live rate feed is unavailable; ${rate}% is being used as a fallback 30-year fixed rate.`
          : `The current 30-year fixed mortgage rate is ${rate}% (FRED MORTGAGE30US, ${source}).`;
      return { content: [{ type: "text", text }], structuredContent: { ratePct: rate, source, series: "MORTGAGE30US" } };
    }
    case "list_build_locations": {
      const locations = locationCatalog();
      const text = locations
        .map((l) => `${l.name} (${l.slug}), ${l.county} County: ${l.effectivePropertyTaxRatePct}% effective property tax rate`)
        .join("\n");
      return { content: [{ type: "text", text }], structuredContent: { locations } };
    }
    case "search_home_building_faq": {
      const query = typeof args["query"] === "string" ? (args["query"] as string) : "";
      const rawLimit = Number(args["limit"]);
      const limit = Number.isFinite(rawLimit) ? Math.min(20, Math.max(1, Math.round(rawLimit))) : 5;
      if (query.trim() === "") {
        return { content: [{ type: "text", text: "Provide a query to search for." }], isError: true };
      }
      const dataset = await loadDataset();
      const items = dataset.search(query).slice(0, limit).map((i) => dataset.toSummary(i));
      const results = items.map((i) => ({
        question: i.question,
        answer: i.shortAnswer,
        url: `${SITE_URL}/faq/${i.slug}`,
      }));
      const text =
        results.length === 0
          ? `No answers found for "${query}".`
          : results.map((r) => `${r.question}\n${r.answer}\n${r.url}`).join("\n\n");
      return { content: [{ type: "text", text }], structuredContent: { results } };
    }
    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

router.post("/mcp", async (req: Request, res: Response): Promise<void> => {
  const msg = req.body as JsonRpcRequest | JsonRpcRequest[] | undefined;
  if (msg === undefined || Array.isArray(msg)) {
    // Batching was removed from the protocol; a single message is all we accept.
    res.status(400).json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32600, message: "Expected a single JSON-RPC request object" },
    });
    return;
  }

  const id = msg.id ?? null;
  const reply = (result: unknown): void => {
    res.json({ jsonrpc: "2.0", id, result });
  };
  const fail = (code: number, message: string): void => {
    res.json({ jsonrpc: "2.0", id, error: { code, message } });
  };

  try {
    switch (msg.method) {
      case "initialize": {
        const asked = msg.params?.["protocolVersion"];
        const protocolVersion =
          typeof asked === "string" && SUPPORTED_PROTOCOLS.includes(asked) ? asked : LATEST_PROTOCOL;
        reply({
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SERVER_NAME, title: "Jematell Homes", version: SERVER_VERSION },
          instructions:
            "Jematell Homes is a family-owned custom home builder in Scottsdale, Arizona, serving the greater " +
            "Phoenix metro. Use estimate_construction_loan for what building a home would cost per month, " +
            "list_build_locations for the cities and their property tax rates, get_current_mortgage_rate for " +
            "today's 30-year fixed rate, and search_home_building_faq for questions about permits, contracts, " +
            "lots, warranties, and the build process. All figures are estimates, never loan offers.",
        });
        return;
      }
      // Discovery in the 2026-07-28 revision; same payload as tools/list.
      case "server/discover":
      case "tools/list":
        reply({ tools: TOOLS });
        return;
      case "tools/call": {
        const name = msg.params?.["name"];
        if (typeof name !== "string") {
          fail(-32602, "Missing tool name");
          return;
        }
        const args = (msg.params?.["arguments"] as Record<string, unknown> | undefined) ?? {};
        reply(await callTool(name, args));
        return;
      }
      case "ping":
        reply({});
        return;
      case "notifications/initialized":
      case "notifications/cancelled":
        // Notifications carry no id and expect no body.
        res.status(202).end();
        return;
      default:
        fail(-32601, `Method not found: ${msg.method}`);
        return;
    }
  } catch (err) {
    fail(-32603, `Internal error: ${String(err)}`);
  }
});

// This server never initiates messages, so there is no stream to open.
router.get("/mcp", (_req: Request, res: Response): void => {
  res.status(405).set("Allow", "POST").json({
    error: "This MCP server is request/response only. POST JSON-RPC messages to /mcp.",
  });
});

export default router;
