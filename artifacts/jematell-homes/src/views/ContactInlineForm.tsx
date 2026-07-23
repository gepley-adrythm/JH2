"use client";
import { lazy, Suspense } from "react";

const ContactForm = lazy(() => import("../contact-form/ContactForm"));

/**
 * ContactInlineForm - client island for the inline contact form on /contact.
 * Keeps the lazy-loaded form (and the contact-form context it uses) out of the
 * server page, which stays a server component. Same lazy + fallback pattern as
 * the old Contact page.
 */
export default function ContactInlineForm() {
  return (
    <Suspense fallback={null}>
      <ContactForm onClose={() => {}} />
    </Suspense>
  );
}
