import React, { useEffect, useState, useRef } from "react";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Menu, X, ArrowRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
export const img = (name: string) => `${BASE}images/${name}`;

const NAV_LINKS = [
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Homes", href: "/custom-homes" },
  { label: "Spec Homes", href: "/spechomes" },
  { label: "Floor Plans", href: "/floorplans" },
];

const WHERE_WE_BUILD = [
  "Scottsdale", "Rio Verde", "Phoenix", "Cave Creek",
  "Fountain Hills", "Carefree", "Casa Grande", "Apache Junction"
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="/" className="brand-logo" aria-label="Jematell Homes" data-testid="nav-logo">
          <img src={img("logo.png")} alt="Jematell Homes" />
        </a>

        <nav className="main-nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </a>
          ))}
          <div className="nav-dropdown">
            <a href="/where-we-build" data-testid="nav-where-we-build" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Where We Build
            </a>
            <div className="dropdown-panel" role="menu">
              {WHERE_WE_BUILD.map((loc) => (
                <a key={loc} href="#" data-testid={`nav-region-${loc.toLowerCase().replace(/\s+/g, "-")}`}>{loc}</a>
              ))}
            </div>
          </div>
          <a href="/aboutus" data-testid="nav-about-us">About Us</a>
        </nav>

        <div className="header-actions">
          <a href="#contact" className="btn btn-primary" data-testid="header-cta">
            Start Your Build
          </a>
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
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close} data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </a>
          ))}
          <a href="/where-we-build" onClick={close} data-testid="mobile-nav-where-we-build">Where We Build</a>
          <a href="/aboutus" onClick={close} data-testid="mobile-nav-about-us">About Us</a>
          <a href="#contact" onClick={close} className="btn btn-primary" data-testid="mobile-nav-cta" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
            Start Your Build
          </a>
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
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/custom-homes">Custom Homes</a></li>
              <li><a href="/spechomes">Spec Homes</a></li>
              <li><a href="/aboutus">About Us</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/warranty">Warranty</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  
  return (
    <div className={`contact-widget ${open ? "is-open" : ""}`} ref={ref}>
      <div className="contact-widget-panel" role="menu">
        <h4>Get in Touch</h4>
        <a href="sms:6024215576">
          <MessageSquare size={18} /> Text Us
        </a>
        <a href="tel:6024215576">
          <Phone size={18} /> (602) 421-5576
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          <Mail size={18} /> Email Us
        </a>
      </div>
      <button
        className="contact-widget-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        data-testid="contact-widget"
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
