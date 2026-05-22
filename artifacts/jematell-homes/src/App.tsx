import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;
const img = (name: string) => `${BASE}images/${name}`;

const NAV_LINKS = [
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Homes", href: "/custom-homes" },
  { label: "Spec Homes", href: "/spechomes" },
  { label: "Floor Plans", href: "/floorplans" },
];

const WHERE_WE_BUILD = [
  "Build On Your Lot",
  "Buy A Lot With Us",
  "Scottsdale",
  "Rio Verde",
  "Phoenix",
  "Cave Creek",
  "Fountain Hills",
  "Carefree",
  "Casa Grande",
  "Apache Junction",
];

const REVIEWS = [
  {
    headline: "\u201CThey are highly committed to delivering a quality product\u2026\u201D",
    body:
      "We did a custom home build with Jematell Homes and are very glad we did! Joe worked with us through the entire process to make sure we got the exact home we wanted. Him, Tyler and their team did an incredible job building our first home, gave honest recommendations, and were very transparent\u201D",
    author: "Travis & Sarah W.",
  },
  {
    headline: "\u201CWe couldn\u2019t be happier with our Jematell Home!\u201D",
    body:
      "We couldn\u2019t be happier with our Jematell Home!! It has a spacious floor plan, beautiful finishes, and a large lot!! Working with the Jematell Homes team made the home\u2011buying process easy. If you\u2019re thinking about buying a house give them a call.\u201D",
    author: "Joe & Cassandra M.",
  },
  {
    headline:
      "\u201CYou can tell Jematell Homes takes pride in their work and doesn\u2019t cut corners\u2026\u201D",
    body:
      "We bought a completed home from Jematell Homes, and we are very happy with our decision. Every finish felt thoughtfully selected, and the layout was both functional and beautiful. Even though it was a spec home, it felt anything but standard.\u201D",
    author: "Ashton S.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand-logo" aria-label="Jematell Homes">
          <img src={img("logo.png")} alt="Jematell Homes" />
        </a>
        <nav className="main-nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </a>
          ))}
          <div className="nav-dropdown">
            <a href="/where-we-build">Where We Build</a>
            <div className="dropdown-panel" role="menu">
              {WHERE_WE_BUILD.map((loc) => (
                <a key={loc} href="#">{loc}</a>
              ))}
            </div>
          </div>
          <a href="/aboutus">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
        <a href="/contact" className="btn btn-primary" data-testid="header-cta">
          Start Your Build
        </a>
        <button className="mobile-menu-btn" aria-label="Menu" data-testid="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${img("hero.jpg")})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Let&rsquo;s Make Your<br />Dream a Reality</h1>
        <a href="/contact" className="btn btn-outline-light" data-testid="hero-cta">
          Start Your Build
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-inner reveal">
        <span className="eyebrow">About Us</span>
        <h2>Get to Know Us</h2>
        <p>
          At Jematell Homes, we&rsquo;re a family-owned home builder dedicated to crafting
          quality homes in Arizona. We combine traditional craftsmanship with modern
          design to bring your dream home to life. Our focus is on delivering excellence
          from the first consultation to the final walk-through, making your cherished
          moments possible. We offer both custom and spec home options to suit your needs.
          Welcome to Jematell Homes, where we turn your dream home into a reality.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-pad">
      <div className="container">
        <div className="services-grid">
          <a href="/custom-homes" className="service-card reveal" data-testid="card-custom">
            <div className="card-img" style={{ backgroundImage: `url(${img("gallery-2.jpg")})` }} />
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Build a Custom Home</h3>
              <p>
                Is a custom home what you&rsquo;re envisioning? Explore our portfolio of past
                projects and learn more about our process.
              </p>
              <span className="btn btn-outline-light">Explore Custom</span>
            </div>
          </a>
          <a href="/spechomes" className="service-card reveal" data-testid="card-spec">
            <div className="card-img" style={{ backgroundImage: `url(${img("gallery-1.jpg")})` }} />
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Buy One of Our Homes</h3>
              <p>
                Explore stunning Arizona properties and find a home that perfectly suits
                your unique preferences and lifestyle.
              </p>
              <span className="btn btn-outline-light">View Spec Homes</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews section-pad" id="reviews">
      <div className="container reveal">
        <span className="eyebrow">Reviews</span>
        <h2 className="section-heading">What Our Homeowners Say</h2>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <article key={i} className="review-card" data-testid={`review-${i}`}>
              <div className="review-stars" aria-label="5 stars">★★★★★</div>
              <blockquote>{r.headline}</blockquote>
              <p className="review-body">{r.body}</p>
              <div className="review-author">{r.author}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta-bg" style={{ backgroundImage: `url(${img("cta-bg.jpg")})` }} />
      <div className="cta-overlay" />
      <div className="cta-inner reveal">
        <span className="eyebrow" style={{ color: "#cfd8df" }}>Build With Us</span>
        <h2>Begin Your Build</h2>
        <p>Relax while we manage every detail, throughout the entire process.</p>
        <a href="/contact" className="btn btn-primary" data-testid="cta-button">
          Contact Us
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={img("logo-footer.png")} alt="Jematell Homes" />
            <p>
              A family-owned Arizona home builder bringing passion, integrity, and a
              personal touch to every project. Semi-custom and custom homes built across
              the Valley.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/jematellhomes/" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.4 1-.4 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .4 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.4-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.4-2.1-.4-1.2-.1-1.5-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8.1a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.3-8.3a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z"/></svg>
              </a>
              <a href="https://www.facebook.com/JematellHomes/" aria-label="Facebook" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.2-1.5 1.5-1.5h1.6V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.5v3.1h2.7V22h3.3z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/custom-homes">Custom Homes</a></li>
              <li><a href="/spechomes">Spec Homes</a></li>
              <li><a href="/floorplans">Floor Plans</a></li>
              <li><a href="/aboutus">About Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/warranty">Warranty</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/blog">Blog Articles</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="mailto:info@jematellhomes.com">info@jematellhomes.com</a></li>
              <li><a href="tel:6024215576">(602) 421-5576</a></li>
              <li><p>8350 E Raintree Dr Ste 210<br />Scottsdale, AZ 85260</p></li>
              <li><p className="small">ROC# 339367</p></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Jematell Homes. All rights reserved.</span>
          <span>Family-owned Arizona home builder.</span>
        </div>
      </div>
    </footer>
  );
}

function ContactWidget() {
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
        <a href="sms:6024215576">💬 Text Us</a>
        <a href="tel:6024215576">📞 Call (602) 421-5576</a>
        <a href="/contact">✉ Contact Us</a>
      </div>
      <button
        className="contact-widget-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        data-testid="contact-widget"
        aria-expanded={open}
      >
        <span className="contact-widget-dot" />
        Get in Touch
      </button>
    </div>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <ContactWidget />
    </>
  );
}
