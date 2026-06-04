import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
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

// NOTE: The public FAQ pages (/faq, /faq/:slug, /faq/topics/:slug) are now real
// React pages owned by the Jematell Homes web app (pre-rendered for SEO). This
// service keeps the database, the FAQ seed sync, and the /api/faqs JSON API. The
// FAQ renderers in lib/faq are retained because the build-time validator
// (faq:validate) reuses them to assert schema/H1 on every seed entry.

export default app;
