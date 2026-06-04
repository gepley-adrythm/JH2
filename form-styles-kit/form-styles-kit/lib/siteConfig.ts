/**
 * siteConfig.ts — the ONE file you edit to rebrand these forms for a new site.
 *
 * Everything that is specific to a particular business (name, phone, domain,
 * background images, legal links, the seminar copy, and the brand color palette)
 * lives here. Nothing brand-specific is hardcoded inside the form components.
 *
 * Drop this kit into any React + Tailwind project, change the values below, and
 * the forms inherit the new brand without touching component code.
 */

export const siteConfig = {
  /** Business / brand display name. Shown in opt-in copy + thank-you screens. */
  businessName: 'Your Business Name',

  /** Public website URL shown in the SMS opt-in disclosure (no trailing slash). */
  websiteUrl: 'https://example.com',
  /** Bare domain shown as the visible link text in the SMS opt-in disclosure. */
  websiteLabel: 'example.com',

  /** Primary phone. `display` is what users see, `href` is the tel: target. */
  phone: {
    display: '(555) 123-4567',
    href: 'tel:+15551234567',
  },

  /** Legal page paths used in the opt-in disclosures. */
  links: {
    privacy: '/privacy',
    terms: '/terms',
  },

  /**
   * Background images. The forms use a desktop + mobile <picture> for the
   * contact background, and a single image for the event/seminar background.
   * Put your own images in /public and point these paths at them, or use full
   * https URLs. Aspect: wide landscape images work best (they pan/zoom subtly).
   */
  images: {
    contactDesktop: '/images/form-bg-desktop.jpg',
    contactMobile: '/images/form-bg-mobile.jpg',
    eventBackground: '/images/event-bg.jpg',
  },

  /**
   * Seminar / event copy. Only used by EventFormV5. Safe to ignore if you only
   * use the contact form.
   */
  event: {
    title: 'Living Trust Seminar',
    description:
      'Learn how to avoid probate, protect your assets, understand the differences between trusts and wills, and ensure your healthcare and financial wishes are properly documented.',
    calendarHeading: 'Upcoming Seminars',
    calendarHeadingLong: 'Upcoming Estate Planning Seminars',
    calendarSubheading: 'Select an event near you to learn more and register.',
    /** Shown on the "bringing a guest?" step. Set to '' to hide the offer box. */
    guestOffer:
      "Bring a guest and you'll both receive $100 off your estate plan if you both decide to move forward!",
    /**
     * Optional line appended to the submission message when the user brings a
     * named guest (flags the lead for the guest incentive). Set '' to omit.
     */
    guestIncentiveTag: '*** ELIGIBLE FOR $100 OFF INCENTIVE ***',
  },

  /**
   * Brand color palette. These mirror the values used inline throughout the
   * components. They are exported for reference and for any new UI you build;
   * the components currently inline these exact values. If you want a full
   * re-theme, search the two component files for these hex/rgba strings and
   * replace them, OR wire the components to read from here (see README).
   */
  colors: {
    navyDeep: '#091a33',   // page background
    navy: '#05285d',       // button text on white
    gold: 'rgba(212,168,83,1)',   // event accent / active filter chip
    goldSoft: 'rgba(212,168,83,0.3)',
    plum: 'rgba(112,60,88,0.85)',  // contact chip selected state
    error: '#ff6b6b',
    white: '#ffffff',
  },

  /** Conversion value passed to analytics on submit (optional, analytics-only). */
  conversionValue: {
    newContact: 50,
    existingContact: 1,
    seminarSignup: 250,
  },
} as const;

export type SiteConfig = typeof siteConfig;
