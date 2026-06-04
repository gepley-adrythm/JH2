import { useEffect, useState } from "react";

/**
 * Shared motion tokens for page and content transitions.
 *
 * Centralizing these guarantees consistency: every transition on the site uses
 * the SAME easing curve and a small set of durations, so the motion reads as one
 * designed system instead of a pile of one-off animations. The object props are
 * shaped for Framer Motion; the raw values port anywhere.
 */

/** Expo-style ease-out. The single curve used across the entire site. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Transition used for scroll-into-view section reveals. */
export const SECTION_TRANSITION = {
  duration: 0.5,
  ease: EASE_OUT_EXPO,
};

/** Reusable "animate once when it enters the viewport" config. */
export const VIEWPORT_ONCE = { once: true } as const;

/**
 * Scroll-into-view entrance for any section or card. Use with Framer Motion's
 * `whileInView`:  <motion.section {...FADE_IN_UP_PROPS}>...</motion.section>
 */
export const FADE_IN_UP_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.5, ease: EASE_OUT_EXPO },
} as const;

/**
 * In-page transition for tab or sub-page switches. Use inside
 * `<AnimatePresence mode="wait">`, keyed on the active id.
 */
export const TAB_SWITCH_PROPS = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
} as const;

/**
 * Reactive reduce-motion preference for React components. Returns `false` on the
 * server and on the first client render (matching SSR, so no hydration
 * mismatch), then updates to the real value if the visitor toggles the OS
 * setting. Note: Framer Motion components are already governed globally by the
 * `<MotionConfig reducedMotion="user">` wrapper in App.tsx; use this hook only
 * when the preference must affect non-Framer render output.
 */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
