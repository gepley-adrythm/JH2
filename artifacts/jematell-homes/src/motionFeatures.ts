/**
 * motionFeatures.ts: framer-motion's domAnimation feature bundle, isolated so
 * Providers can load it asynchronously (LazyMotion's documented code-splitting
 * pattern). This keeps the ~16KB gzip animation feature set out of the initial
 * route JS on every page; `m.` components render their initial styles until
 * the features arrive right after hydration, then animate as before.
 */
import { domAnimation } from "framer-motion";

export default domAnimation;
