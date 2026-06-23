import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "node:fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

/**
 * DEV-ONLY gallery-order persistence.
 *
 * `apply: "serve"` means this middleware ONLY exists while the Vite dev server
 * is running. The production deploy serves pre-built static files (see
 * artifact.toml `serve = "static"`) — there is no server at all in prod — so
 * this endpoint physically cannot ship. It persists the drag-to-reorder order
 * to a committed JSON file so progress survives browser-cache clears and
 * checkpoints (localStorage alone would be lost).
 */
function devGalleryOrderPlugin(): PluginOption {
  const ordersFile = path.resolve(
    import.meta.dirname,
    "src/data/gallery-orders.json",
  );
  const readAll = (): Record<string, string[]> => {
    try {
      return JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
    } catch {
      return {};
    }
  };
  const writeAll = (data: Record<string, string[]>) => {
    fs.mkdirSync(path.dirname(ordersFile), { recursive: true });
    fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2) + "\n");
  };
  return {
    name: "dev-gallery-order",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__dev/gallery-order", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        if (req.method === "GET") {
          const q = (req.url ?? "").split("?")[1] ?? "";
          const slug = new URLSearchParams(q).get("slug") ?? "";
          res.end(JSON.stringify({ keys: readAll()[slug] ?? null }));
          return;
        }
        if (req.method === "POST") {
          let body = "";
          req.on("data", (c) => (body += c));
          req.on("end", () => {
            try {
              const { slug, keys } = JSON.parse(body || "{}");
              if (typeof slug !== "string" || !Array.isArray(keys)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "bad request" }));
                return;
              }
              const all = readAll();
              all[slug] = keys;
              writeAll(all);
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "bad json" }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end(JSON.stringify({ error: "method not allowed" }));
      });
    },
  };
}

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    devGalleryOrderPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
