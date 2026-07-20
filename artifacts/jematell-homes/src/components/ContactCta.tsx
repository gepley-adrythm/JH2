"use client";
import { useContactForm } from "../contact-form";

/**
 * ContactCta — the one client-side leaf for "open the contact form" buttons,
 * so server-component pages can keep their CTAs without shipping page content
 * to the client. Renders the same markup as the old inline buttons.
 */
export function ContactCta({
  className = "btn btn-primary",
  testid,
  children,
}: {
  className?: string;
  testid?: string;
  children: React.ReactNode;
}) {
  const { open } = useContactForm();
  return (
    <button
      type="button"
      className={className}
      onClick={() => open()}
      data-testid={testid}
    >
      {children}
    </button>
  );
}
