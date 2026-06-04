import app from "./app";
import { logger } from "./lib/logger";
import { syncFaqSeed } from "./lib/faq/sync";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Sync the FAQ seed (source of truth) into the DB. Non-fatal: the server still
  // serves health/other routes if the DB is unavailable.
  syncFaqSeed(logger).catch((err) => {
    logger.error({ err }, "FAQ seed sync failed");
  });
});
