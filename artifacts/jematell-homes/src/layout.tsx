import React, { useEffect, useState, useRef } from "react";
import { MessageSquare, MessageCircle, Phone, Mail, Instagram, Facebook, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContactForm } from "./contact-form";
import { siteConfig, services, locations, locationHref } from "./config/siteConfig";
import { navItems, isNavActive, isSectionActive, type SubNavItem } from "./config/navConfig";

const BASE = import.meta.env.BASE_URL || "/";
export const img = (name: string) => `${BASE}images/${name}`;

/** Renders a sub-nav child as a client Link, or a hard <a> for routes the app
 * does not own yet (e.g. /faq). Shared by desktop dropdowns and mobile sub-nav. */
function SubNavLink({
  item,
  pathname,
  testIdPrefix,
  onNavigate,
}: {
  item: SubNavItem;
  pathname: string;
  testIdPrefix: string;
  onNavigate?: () => void;
}) {
  const active = isNavActive(pathname, item.href);
  const className = active ? "is-active" : undefined;
  const testId = `${testIdPrefix}-${item.id}`;
  if (item.hardNav) {
    return (
      <a href={item.href} role="menuitem" className={className} data-testid={testId} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }
  return (
    <Link
      to={item.href}
      role="menuitem"
      className={className}
      data-testid={testId}
      aria-current={active ? "page" : undefined}
      viewTransition
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

interface NavDropdownProps {
  label: string;
  testId: string;
  to?: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavDropdown({ label, testId, to, active, children }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerClass = `nav-trigger${active ? " is-active" : ""}`;
  const chevron = <ChevronDown className="nav-chevron" size={14} aria-hidden="true" />;

  const trigger = to ? (
    <Link
      to={to}
      className={triggerClass}
      data-testid={testId}
      aria-haspopup="true"
      aria-expanded={open}
      viewTransition
      onClick={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
    >
      {label}
      {chevron}
    </Link>
  ) : (
    <button
      type="button"
      className={triggerClass}
      data-testid={testId}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
    >
      {label}
      {chevron}
    </button>
  );

  return (
    <div
      className={`nav-dropdown ${open ? "is-open" : ""}`}
      ref={wrapRef}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      <div className="dropdown-panel" role="menu" onClick={() => setOpen(false)}>
        {children}
      </div>
    </div>
  );
}

// Routes whose top hero is light/cream — header must always render in solid/light style
// so the dark nav text stays readable. Everything else has a dark image hero.
function isLightHeroPath(pathname: string): boolean {
  // Normalize trailing slash so /blog/ matches /blog
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (p === "/blog") return true;
  if (p === "/contact" || p.startsWith("/contact/")) return true;
  // /blog/:slug and /gallery/:slug have dark image heroes — keep transparent
  return false;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { open: openContactForm } = useContactForm();
  const forceSolid = isLightHeroPath(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll-state when route changes so a long blog post doesn't leave the
  // header stuck in the wrong mode after navigating to the cream-bg blog index.
  useEffect(() => {
    setScrolled(window.scrollY > 50);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled || forceSolid ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <div className="header-left">
        <Link to="/" className="brand-logo" aria-label={siteConfig.brand.name} data-testid="nav-logo">
          <img src={img("logo.png")} alt={siteConfig.brand.name} />
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.id}
                label={item.label}
                testId={`nav-${item.id}`}
                to={item.href}
                active={isSectionActive(pathname, item)}
              >
                {item.children.map((child) => (
                  <SubNavLink key={child.id} item={child} pathname={pathname} testIdPrefix="nav" />
                ))}
              </NavDropdown>
            ) : (
              <Link
                key={item.id}
                to={item.href!}
                className={isNavActive(pathname, item.href!) ? "is-active" : undefined}
                data-testid={`nav-${item.id}`}
                aria-current={isNavActive(pathname, item.href!) ? "page" : undefined}
                viewTransition
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        </div>

        <div className="header-actions">
          <button type="button" className="btn btn-primary" data-testid="header-cta" onClick={openContactForm}>
            {siteConfig.cta.label}
          </button>
        </div>

        <button
          className={`mobile-menu-btn${mobileMenuOpen ? " is-open" : ""}`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      </header>

      <div
        id="mobile-nav-panel"
        className={`mobile-nav ${mobileMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
      >
        <nav aria-label="Mobile">
          {navItems.map((item) =>
            item.children ? (
              <div className="mobile-nav-group" key={item.id}>
                <button
                  type="button"
                  className="mobile-nav-accordion"
                  aria-expanded={expanded === item.id}
                  data-testid={`mobile-nav-${item.id}`}
                  onClick={() => setExpanded((e) => (e === item.id ? null : item.id))}
                >
                  {item.label}
                  <ChevronDown size={20} aria-hidden="true" />
                </button>
                {expanded === item.id && (
                  <div className="mobile-nav-sub">
                    {item.children.map((child) => (
                      <SubNavLink
                        key={child.id}
                        item={child}
                        pathname={pathname}
                        testIdPrefix="mobile-nav"
                        onNavigate={close}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.id}
                to={item.href!}
                onClick={close}
                className={isNavActive(pathname, item.href!) ? "is-active" : undefined}
                data-testid={`mobile-nav-${item.id}`}
                viewTransition
              >
                {item.label}
              </Link>
            ),
          )}
          <button
            type="button"
            onClick={() => { close(); openContactForm(); }}
            className="btn btn-primary"
            data-testid="mobile-nav-cta"
            style={{ marginTop: 16, alignSelf: 'flex-start' }}
          >
            {siteConfig.cta.label}
          </button>
          <div className="mobile-nav-contact">
            <a href={siteConfig.contact.phone.href} data-testid="mobile-nav-phone"><Phone size={16} /> {siteConfig.contact.phone.display}</a>
            <a href={siteConfig.contact.email.href} data-testid="mobile-nav-email"><Mail size={16} /> {siteConfig.contact.email.display}</a>
          </div>
        </nav>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={img("logo-footer.png")} alt={siteConfig.brand.name} />
            <p>{siteConfig.blurb}</p>
            <div className="footer-social">
              <a href={siteConfig.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                <Instagram size={20} />
              </a>
              <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Homes</h3>
            <ul>
              {services.map((s) => (
                <li key={s.href}><Link to={s.href} viewTransition>{s.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Where We Build</h3>
            <ul>
              {locations.map((l) => (
                <li key={l.slug}><Link to={locationHref(l.slug)} viewTransition>{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about" viewTransition>About Us</Link></li>
              <li><Link to="/warranty" viewTransition>Warranty</Link></li>
              <li><Link to="/blog" viewTransition>Blog</Link></li>
              <li><a href="/faq">FAQ</a></li>
              <li><Link to="/contact" viewTransition>Contact</Link></li>
              <li><Link to="/privacy" viewTransition>Privacy Policy</Link></li>
            </ul>
            <ul style={{ marginTop: '24px' }}>
              <li><a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a></li>
              <li><a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a></li>
              <li style={{ marginTop: '12px', lineHeight: 1.6 }}>
                {siteConfig.contact.address.lines[0]}<br />{siteConfig.contact.address.lines[1]}
              </li>
              <li style={{ marginTop: '8px', opacity: 0.5, fontSize: '12px' }}>{siteConfig.contact.roc}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export function ContactWidget() {
  const { open: openContactForm } = useContactForm();
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // On the homepage, the widget stays hidden while the hero is in view and
  // fades in once the visitor scrolls past it. On every other route it is
  // visible from the start.
  useEffect(() => {
    if (!isHomepage) {
      setPastHero(false);
      return;
    }
    const hero = document.querySelector(".hero");
    if (!hero) {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomepage]);

  const hidden = isHomepage && !pastHero;

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    firstItemRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleMessage = () => {
    setIsOpen(false);
    openContactForm();
  };

  return (
    <div
      className={`contact-widget${isOpen ? " is-open" : ""}${hidden ? " is-hidden" : ""}`}
      ref={rootRef}
      aria-hidden={hidden}
    >
      <button
        ref={triggerRef}
        className="contact-widget-btn"
        onClick={() => setIsOpen((v) => !v)}
        data-testid="contact-widget"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="contact-widget-panel"
        aria-label={`Contact ${siteConfig.brand.name}`}
        tabIndex={hidden ? -1 : 0}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      <div
        id="contact-widget-panel"
        className="contact-widget-panel"
        aria-label="Contact options"
      >
        <h3>How can we help?</h3>
        <a
          ref={firstItemRef}
          href={siteConfig.contact.phone.href}
          data-testid="contact-widget-call"
          tabIndex={isOpen ? 0 : -1}
        >
          <Phone size={18} />
          Call us
        </a>
        <a
          href={siteConfig.contact.sms.href}
          data-testid="contact-widget-text"
          tabIndex={isOpen ? 0 : -1}
        >
          <MessageCircle size={18} />
          Text us
        </a>
        <button
          type="button"
          className="contact-widget-msg"
          onClick={handleMessage}
          data-testid="contact-widget-message"
          tabIndex={isOpen ? 0 : -1}
        >
          <MessageSquare size={18} />
          Send us a message
        </button>
      </div>
    </div>
  );
}
