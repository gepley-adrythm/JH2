import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import "./contact-form.css";

const ContactForm = React.lazy(() => import("./ContactForm"));

interface ContactFormContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function useContactForm(): ContactFormContextValue {
  const ctx = useContext(ContactFormContext);
  if (!ctx) throw new Error("useContactForm must be used within a ContactFormProvider");
  return ctx;
}

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();
  const openerRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = portalRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const opener = openerRef.current;
    if (opener && typeof opener.focus === "function") opener.focus();
  }, [isOpen]);

  return (
    <ContactFormContext.Provider value={{ open, close, isOpen }}>
      {children}
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
              <ContactForm onClose={close} />
            </React.Suspense>
          </m.div>
        )}
      </AnimatePresence>
    </ContactFormContext.Provider>
  );
}
