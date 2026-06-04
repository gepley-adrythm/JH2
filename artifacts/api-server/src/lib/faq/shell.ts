import { escapeAttr, escapeHtml, jsonLdScript } from "./html";

const PHONE_DISPLAY = "(602) 421-5576";
const PHONE_TEL = "6024215576";

// Inlined, self-contained styles. The api-server does not serve the SPA's CSS
// bundle, so the FAQ pages ship their own — palette/typography mirror the
// jematell-homes site (Fraunces + Outfit, warm desert palette).
const STYLES = `
:root{
  --color-bg:#f4f2ec;--color-text:#2a2a2a;--color-text-muted:#5c5c5c;
  --color-accent:#3b617f;--color-accent-hover:#2d4c63;--color-warm:#8c5a45;
  --color-dark:#121415;--color-cream:#ece9e2;--color-bone:#e2ddd3;
  --color-border:rgba(0,0,0,0.08);
  --font-heading:'Fraunces',serif;--font-body:'Outfit',sans-serif;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:var(--font-body);color:var(--color-text);background:var(--color-bg);line-height:1.6;}
a{color:var(--color-accent);text-decoration:none}
a:hover{color:var(--color-accent-hover)}
h1,h2,h3,h4{font-family:var(--font-heading);color:var(--color-dark);line-height:1.15;margin:0 0 .5em}
.container{width:100%;max-width:920px;margin:0 auto;padding:0 24px}
.site-header{background:rgba(244,242,236,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--color-border);position:sticky;top:0;z-index:100}
.header-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;height:90px}
.brand-logo{display:inline-flex;align-items:center}
.brand-logo img{height:48px;width:auto;display:block}
.main-nav{display:flex;gap:36px;align-items:center}
.main-nav a{position:relative;color:var(--color-dark);font-weight:500;font-size:13px;letter-spacing:.08em;text-transform:uppercase;padding:4px 0}
.main-nav a::after{content:'';position:absolute;left:0;bottom:0;width:0;height:1px;background:currentColor;transition:width .3s cubic-bezier(.2,.8,.2,1)}
.main-nav a:hover{color:var(--color-dark)}
.main-nav a:hover::after{width:100%}
.main-nav .has-caret::before{content:'';display:inline-block;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-top:4px solid currentColor;margin-right:7px;vertical-align:middle;opacity:.7}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 32px;border-radius:2px;font-weight:500;font-size:14px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;transition:all .3s cubic-bezier(.2,.8,.2,1)}
.btn-primary{background:var(--color-accent);color:#fff}
.btn-primary:hover{background:var(--color-accent-hover);color:#fff;transform:translateY(-2px)}
.faq-hero{background:var(--color-cream);padding:56px 0 40px;border-bottom:1px solid var(--color-border)}
.faq-hero .eyebrow{text-transform:uppercase;letter-spacing:.18em;font-size:12px;color:var(--color-warm);font-weight:600;margin:0 0 14px}
.faq-hero h1{font-size:clamp(30px,5vw,46px);max-width:18ch}
.faq-hero p{color:var(--color-text-muted);max-width:60ch;font-size:17px;margin:14px 0 0}
.breadcrumb{font-size:13px;color:var(--color-text-muted);padding:18px 0 0}
.breadcrumb a{color:var(--color-text-muted)}
.breadcrumb span{margin:0 6px;opacity:.5}
main{padding:40px 0 72px}
.faq-cat{margin:0 0 40px}
.faq-cat h2{font-size:24px;margin-bottom:6px}
.faq-cat .cat-desc{color:var(--color-text-muted);margin:0 0 16px;font-size:15px}
.faq-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--color-border)}
.faq-list li{border-bottom:1px solid var(--color-border)}
.faq-list a{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:16px 4px;color:var(--color-dark);font-weight:500;font-size:17px}
.faq-list a:hover{color:var(--color-accent)}
.faq-list .arrow{color:var(--color-accent);flex:none}
.topic-chips{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0 0}
.topic-chips a{background:#fff;border:1px solid var(--color-border);border-radius:999px;padding:7px 16px;font-size:14px;color:var(--color-text)}
.topic-chips a:hover{border-color:var(--color-accent);color:var(--color-accent)}
.qa{max-width:720px}
.qa .answer{font-size:18px;color:var(--color-text)}
.qa .answer p{margin:0 0 1.1em}
.qa .answer ul{margin:0 0 1.1em;padding-left:1.3em}
.meta-row{display:flex;flex-wrap:wrap;gap:14px;align-items:center;color:var(--color-text-muted);font-size:13px;margin:0 0 24px}
.pill{background:var(--color-bone);border-radius:999px;padding:4px 12px;font-size:12px;letter-spacing:.04em}
.related{margin:48px 0 0;padding:28px;background:#fff;border:1px solid var(--color-border);border-radius:4px}
.related h3{font-size:18px;margin-bottom:14px}
.related ul{list-style:none;margin:0;padding:0}
.related li{padding:8px 0;border-bottom:1px solid var(--color-border)}
.related li:last-child{border-bottom:0}
.pillar-link{display:inline-block;margin:28px 0 0;font-weight:500}
.cta-strip{background:var(--color-dark);color:#fff;padding:44px 0;margin:64px 0 0;text-align:center}
.cta-strip h2{color:#fff;font-size:26px}
.cta-strip p{color:rgba(255,255,255,.7);margin:8px 0 22px}
.site-footer{background:var(--color-dark);color:rgba(255,255,255,.75);padding:40px 0;font-size:14px}
.site-footer a{color:rgba(255,255,255,.75)}
.site-footer a:hover{color:#fff}
.footer-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;opacity:.7}
@media(max-width:900px){.main-nav{display:none}}
@media(max-width:640px){.header-inner{height:72px}.btn{padding:13px 22px}.faq-hero{padding:40px 0 28px}main{padding:28px 0 48px}}
`;

function header(): string {
  return `<header class="site-header"><div class="container header-inner">
<a href="/" class="brand-logo" aria-label="Jematell Homes" data-testid="faq-nav-logo"><img src="/images/logo.png" alt="Jematell Homes" width="160" height="48"></a>
<nav class="main-nav" aria-label="Primary">
<a href="/custom-homes" class="has-caret" data-testid="faq-nav-homes">Homes</a>
<a href="/where-we-build" class="has-caret" data-testid="faq-nav-where-we-build">Where We Build</a>
<a href="/about" data-testid="faq-nav-about">About</a>
<a href="/blog" data-testid="faq-nav-blog">Blog</a>
<a href="/faq" data-testid="faq-nav-faq">FAQ</a>
</nav>
<a href="/contact" class="btn btn-primary" data-testid="faq-header-cta">Start Your Build</a>
</div></header>`;
}

function footer(): string {
  return `<footer class="site-footer"><div class="container">
<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:space-between">
<div style="max-width:34ch"><strong style="font-family:var(--font-heading);color:#fff;font-size:18px">Jematell Homes</strong>
<p style="margin:8px 0 0">A family-owned Arizona home builder bringing passion, integrity, and a personal touch to every project.</p></div>
<div><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a><br><a href="mailto:info@jematellhomes.com">info@jematellhomes.com</a><br>
<span>8350 E Raintree Dr Ste 210<br>Scottsdale, AZ 85260</span><br><span style="opacity:.5;font-size:12px">ROC# 339367</span></div>
</div>
<div class="footer-bottom"><span>&copy; ${new Date().getFullYear()} Jematell Homes. All rights reserved.</span><span>Quietly Luxurious Arizona Living.</span></div>
</div></footer>`;
}

export interface ShellOptions {
  title: string;
  metaDescription: string;
  canonical: string;
  robots?: string;
  jsonLd: Record<string, unknown>[];
  body: string;
}

export function renderShell(opts: ShellOptions): string {
  const ld = opts.jsonLd.map((x) => jsonLdScript(x)).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(opts.title)}</title>
<meta name="description" content="${escapeAttr(opts.metaDescription)}">
<meta name="robots" content="${escapeAttr(opts.robots ?? "index,follow")}">
<link rel="canonical" href="${escapeAttr(opts.canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeAttr(opts.title)}">
<meta property="og:description" content="${escapeAttr(opts.metaDescription)}">
<meta property="og:url" content="${escapeAttr(opts.canonical)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>${STYLES}</style>
${ld}
</head>
<body>
${header()}
${opts.body}
${footer()}
</body>
</html>`;
}

export const ctaStrip = `<section class="cta-strip"><div class="container">
<h2>Ready to start your custom home?</h2>
<p>Talk with our family-owned Arizona building team.</p>
<a href="/contact" class="btn btn-primary" data-testid="faq-cta-contact">Start Your Build</a>
</div></section>`;
