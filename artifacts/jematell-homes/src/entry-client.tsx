import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./transitions.css";

const container = document.getElementById("root")!;

// In production the container holds prerendered element markup, so hydrate it.
// In dev the template's `<!--app-html-->` placeholder is left as a comment node
// (not an element), so we create a fresh CSR root instead. Checking for an
// element child — not just any child node — is what distinguishes the two.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
