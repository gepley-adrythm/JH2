// No eager ContactForm re-export here: the form is loaded on demand via
// React.lazy (ContactFormProvider modal, ContactInlineForm on /contact).
// A value re-export from this barrel would pull the whole form (and its
// framer-motion/lucide graph) into the shared client entry that every route
// loads. Import it directly from "./ContactForm" if a new eager use appears.
export { ContactFormProvider, useContactForm } from "./ContactFormProvider";
