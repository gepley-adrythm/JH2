import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import faqSsrRouter from "./ssr/faqPages";
import { logger } from "./lib/logger";

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

// Server-rendered FAQ pages (SEO). These live OUTSIDE /api — the reverse proxy
// routes /faq and /sitemap-faq.xml to this service (see artifact.toml).
app.use(faqSsrRouter);

export default app;
