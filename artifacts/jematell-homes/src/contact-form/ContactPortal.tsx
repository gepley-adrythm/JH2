"use client";
import React from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

const ContactForm = React.lazy(() => import("./ContactForm"));

/**
 * ContactPortal: the animated modal overlay, split out of ContactFormProvider
 * so the provider (which every route loads eagerly) no longer pulls
 * AnimatePresence/m into the shared client entry. The provider lazy-loads this
 * on first open and keeps it mounted afterwards, so AnimatePresence can run
 * both the enter fade (initial mount animates by default) and the exit fade
 * (the portal stays mounted while isOpen flips false). Behavior is identical
 * to the previous inline markup.
 */
export default function ContactPortal({
  isOpen,
  onClose,
  portalRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  portalRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={portalRef}
          className="cf-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Contact Jematell Homes"
        >
          <React.Suspense fallback={null}>
            <ContactForm onClose={onClose} />
          </React.Suspense>
        </m.div>
      )}
    </AnimatePresence>
  );
}
