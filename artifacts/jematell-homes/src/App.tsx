import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";

const BASENAME = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <AppShell />
    </BrowserRouter>
  );
}
