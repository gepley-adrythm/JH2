"use client";
import React, { Suspense } from "react";

const ContactForm = React.lazy(() => import("../contact-form/ContactForm"));

/**
 * ContactInlineForm - client island for the inline contact form on /contact.
 * Keeps the lazy-loaded form (and the contact-form context it uses) out of the
 * server page, which stays a server component. Same lazy + fallback pattern as
 * the old Contact page.
 */
export default function ContactInlineForm() {
  return (
    <Suspense fallback={<div className="cf-inline-fallback" aria-hidden="true" />}>
      <ContactForm variant="inline" />
    </Suspense>
  );
}
