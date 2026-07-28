import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import estimatePageRouter from "./routes/estimatePage";
import agentDiscoveryRouter from "./routes/agentDiscovery";
import mcpRouter from "./routes/mcp";
import { logger } from "./lib/logger";
import { staticSite, staticSiteAvailable, staticSiteInfo } from "./middlewares/staticSite";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Agent-facing surfaces, mounted ahead of the static site so they win over a
// 404 from the export. All read-only:
//   /financing/estimate      server-rendered estimate for arbitrary parameters
//   /mcp                     Model Context Protocol server (streamable HTTP)
//   /.well-known/*, /openapi.json   discovery documents
app.use(estimatePageRouter);
app.use(mcpRouter);
app.use(agentDiscoveryRouter);

// NOTE: The public FAQ pages (/faq, /faq/:slug, /faq/topics/:slug) are now real
// React pages owned by the Jematell Homes web app (pre-rendered for SEO). This
// service keeps the database, the FAQ seed sync, and the /api/faqs JSON API. The
// FAQ renderers in lib/faq are retained because the build-time validator
// (faq:validate) reuses them to assert schema/H1 on every seed entry.

// Serve the Next static export (artifacts/jematell-homes/out) when it exists,
// so one process owns both /api and the site in production. Skipped when the
// site build is absent (e.g. API-only dev), where /api keeps working alone.
if (staticSiteAvailable()) {
  logger.info(`serving static site from ${staticSiteInfo()}`);
  app.use(staticSite);
} else {
  logger.info("static site build not found; serving /api only");
}

export default app;
