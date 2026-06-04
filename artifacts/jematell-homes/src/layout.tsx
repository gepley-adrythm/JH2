import React, { useEffect, useState, useRef } from "react";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContactForm } from "./contact-form";

const BASE = import.meta.env.BASE_URL || "/";
export const img = (name: string) => `${BASE}images/${name}`;

const HOMES_LINKS = [
  { label: "Custom Homes", href: "/custom-homes" },
  { label: "Spec Homes", href: "/spec-homes" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Gallery", href: "/gallery" },
];

const WHERE_WE_BUILD = [
  "Scottsdale", "Rio Verde", "Phoenix", "Cave Creek",
  "Fountain Hills", "Carefree", "Casa Grande", "Apache Junction"
];

interface NavDropdownProps {
  label: string;
  testId: string;
  to?: string;
  children: React.ReactNode;
}

function NavDropdown({ label, testId, to, children }: NavDropdownProps) {
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

  const trigger = to ? (
    <Link
      to={to}
      className="nav-trigger"
      data-testid={testId}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
    >
      {label}
    </Link>
  ) : (
    <button
      type="button"
      className="nav-trigger"
      data-testid={testId}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`nav-dropdown ${open ? "is-open" : ""}`}
      ref={wrapRef}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      <div
        className="dropdown-panel"
        role="menu"
        onClick={() => setOpen(false)}
      >
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
  if (p === "/gallery") return true;
  if (p === "/contact" || p.startsWith("/contact/")) return true;
  // /blog/:slug and /gallery/:slug have dark image heroes — keep transparent
  return false;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className={`site-header ${scrolled || forceSolid ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link to="/" className="brand-logo" aria-label="Jematell Homes" data-testid="nav-logo">
          <img src={img("logo.png")} alt="Jematell Homes" />
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <NavDropdown label="Homes" testId="nav-homes">
            {HOMES_LINKS.map((l) => (
              <Link key={l.href} to={l.href} role="menuitem" data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
                {l.label}
              </Link>
            ))}
          </NavDropdown>
          <NavDropdown label="Where We Build" testId="nav-where-we-build" to="/where-we-build">
            {WHERE_WE_BUILD.map((loc) => (
              <Link key={loc} to={`/where-we-build/${loc.toLowerCase().replace(/\s+/g, "-")}`} role="menuitem" data-testid={`nav-region-${loc.toLowerCase().replace(/\s+/g, "-")}`}>
                {loc}
              </Link>
            ))}
          </NavDropdown>
          <Link to="/about" data-testid="nav-about-us">About</Link>
          <Link to="/blog" data-testid="nav-blog">Blog</Link>
          <a href="/faq" data-testid="nav-faq">FAQ</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="btn btn-primary" data-testid="header-cta" onClick={openContactForm}>
            Start Your Build
          </button>
        </div>

        <button 
          className="mobile-menu-btn" 
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`mobile-nav ${mobileMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
      >
        <nav aria-label="Mobile">
          {HOMES_LINKS.map((l) => (
            <Link key={l.href} to={l.href} onClick={close} data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/where-we-build" onClick={close} data-testid="mobile-nav-where-we-build">Where We Build</Link>
          <Link to="/about" onClick={close} data-testid="mobile-nav-about-us">About</Link>
          <Link to="/blog" onClick={close} data-testid="mobile-nav-blog">Blog</Link>
          <a href="/faq" onClick={close} data-testid="mobile-nav-faq">FAQ</a>
          <button
            type="button"
            onClick={() => { close(); openContactForm(); }}
            className="btn btn-primary"
            data-testid="mobile-nav-cta"
            style={{ marginTop: 16, alignSelf: 'flex-start' }}
          >
            Start Your Build
          </button>
          <div className="mobile-nav-contact">
            <a href="tel:6024215576" data-testid="mobile-nav-phone"><Phone size={16} /> (602) 421-5576</a>
            <a href="mailto:info@jematellhomes.com" data-testid="mobile-nav-email"><Mail size={16} /> info@jematellhomes.com</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={img("logo-footer.png")} alt="Jematell Homes" />
            <p>
              A family-owned Arizona home builder bringing passion, integrity, and a
              personal touch to every project.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/jematellhomes/" aria-label="Instagram" target="_blank" rel="noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/JematellHomes/" aria-label="Facebook" target="_blank" rel="noreferrer">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/custom-homes">Custom Homes</Link></li>
              <li><Link to="/spec-homes">Spec Homes</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/warranty">Warranty</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="mailto:info@jematellhomes.com">info@jematellhomes.com</a></li>
              <li><a href="tel:6024215576">(602) 421-5576</a></li>
              <li style={{ marginTop: '16px', lineHeight: 1.6 }}>8350 E Raintree Dr Ste 210<br />Scottsdale, AZ 85260</li>
              <li style={{ marginTop: '8px', opacity: 0.5, fontSize: '12px' }}>ROC# 339367</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Jematell Homes. All rights reserved.</span>
          <span>Quietly Luxurious Arizona Living.</span>
        </div>
      </div>
    </footer>
  );
}

export function ContactWidget() {
  const { open: openContactForm } = useContactForm();

  return (
    <div className="contact-widget">
      <button
        className="contact-widget-btn"
        onClick={openContactForm}
        data-testid="contact-widget"
        aria-label="Contact Jematell Homes"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
