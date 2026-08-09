/**
 * chromeScript.ts — the minimum client-side JavaScript the api-server's
 * /financing/estimate page needs to behave like the rest of the site.
 *
 * siteChrome.ts lifts the real header and footer markup but deliberately
 * strips every <script>, because there is no React tree here to hydrate. That
 * is the right call for the page's own content — the charts are server-rendered
 * SVG and it reads fine with JavaScript off — but it silently cost two things
 * that are not hydration at all, and both were reported as bugs:
 *
 *   1. Google Tag Manager never loaded. On a normal page GTM is armed from
 *      Providers.tsx; this page has no Providers, so the container was simply
 *      absent. Every visit through a shared estimate link was invisible to
 *      analytics, and GTM preview mode showed nothing firing no matter how much
 *      the tester interacted with the page.
 *
 *   2. The mobile nav did nothing. Worse than it looked: the panel is rendered
 *      as a sibling of <header> on the real site, so lifting the header element
 *      brought the menu button across without the menu. The button was not
 *      merely unwired, it opened something that was not on the page.
 *
 *   3. The header never changed colour on scroll. The harvested markup and the
 *      real stylesheet both arrive intact, so the `.scrolled` rules are present
 *      and correct — but the class that triggers them is applied by a React
 *      scroll listener that does not exist here. The header therefore stayed in
 *      its transparent over-hero state forever, which also meant scrolled body
 *      content showed straight through it.
 *
 * Kept as inline markup rather than a served asset: it is under a kilobyte, an
 * extra request would cost more than it saves, and there is no CSP on this
 * origin that would block it.
 *
 * ---
 *
 * DUPLICATION HAZARD, stated plainly: the two behaviours below are
 * reimplementations of code that lives in the web artifact, in a different
 * package this one cannot import from. They must be kept in step by hand:
 *
 *   - GTM container id and load triggers -> jematell-homes/src/lib/gtm.ts
 *   - scroll threshold and class name    -> jematell-homes/src/layout.tsx (Header)
 *
 * If the container id changes and this copy is missed, estimate-link traffic
 * lands in the wrong property — which is worse than not being measured at all,
 * because the number still looks plausible. The values are pinned in the
 * constants below so a search for either source finds this file.
 */

/** Mirrors GTM_ID in jematell-homes/src/lib/gtm.ts. */
const GTM_ID = "GTM-P4ZTW76";

/** Mirrors CLICK_ID_IDLE_TIMEOUT_MS in jematell-homes/src/lib/gtm.ts. */
const EAGER_IDLE_TIMEOUT_MS = 2000;

/** Mirrors the `window.scrollY > 50` threshold in the Header component. */
const SCROLLED_AT_PX = 50;

/**
 * Inline <script> for the estimate page. Written as plain ES5-style function
 * expressions with no template literals, so it survives being embedded in a
 * template literal and needs no build step or transpilation.
 */
export const CHROME_SCRIPT = `<script>
(function () {
  "use strict";

  /* --- header: swap to the solid state once scrolled off the hero --- */
  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      var solid = window.scrollY > ${SCROLLED_AT_PX};
      if (solid !== header.classList.contains("scrolled")) {
        header.classList.toggle("scrolled", solid);
      }
    };
    window.addEventListener("scroll", syncHeader, { passive: true });
    /* Run once: a link into the middle of the page, or a restored scroll
       position on reload, must not leave the header stuck transparent. */
    syncHeader();
  }

  /* --- mobile nav: markup is lifted, behaviour lives here --- */
  var menuBtn = document.querySelector(".mobile-menu-btn");
  var panel = document.getElementById("mobile-nav-panel");
  if (menuBtn && panel) {
    /* The panel declares role="dialog" aria-modal="true", which is a promise
       to keyboard and screen-reader users that focus is managed. Nothing else
       on the page can honour that promise, so it is done here: focus moves in
       on open, cycles inside while open, and returns to the control that
       opened it on every close path. */
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var lastFocus = null;

    var focusables = function () {
      var all = panel.querySelectorAll(FOCUSABLE);
      var out = [];
      for (var i = 0; i < all.length; i++) {
        /* Links inside a collapsed accordion are not reachable by tab. */
        var sub = all[i].closest ? all[i].closest(".mobile-nav-sub") : null;
        if (sub && sub.style.display === "none") continue;
        out.push(all[i]);
      }
      return out;
    };

    var MENU_ICON = menuBtn.innerHTML;
    var CLOSE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

    var setMenu = function (open) {
      menuBtn.classList.toggle("is-open", open);
      panel.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      menuBtn.innerHTML = open ? CLOSE_ICON : MENU_ICON;
      /* Matches the body scroll lock the React header applies while open. */
      document.body.style.overflow = open ? "hidden" : "";

      if (open) {
        lastFocus = document.activeElement;
        var first = focusables()[0];
        if (first) first.focus();
      } else {
        var back = lastFocus && lastFocus !== document.body ? lastFocus : menuBtn;
        lastFocus = null;
        if (back && back.focus) back.focus();
      }
    };

    menuBtn.addEventListener("click", function () {
      setMenu(!panel.classList.contains("is-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (!panel.classList.contains("is-open")) return;
      if (e.key === "Escape") { setMenu(false); return; }
      if (e.key !== "Tab") return;

      /* Keep tabbing inside the dialog rather than wandering onto the page
         behind it, which is obscured but still in the tab order. */
      var f = focusables();
      if (!f.length) return;
      var firstEl = f[0];
      var lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    });
    /* A link to an anchor on this same page would otherwise leave the panel
       covering whatever the reader just jumped to. */
    panel.addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest("a")) setMenu(false);
    });

    /* The accordions arrive empty. React only renders a group's children while
       that group is expanded, so the export captured the buttons and nothing
       under them. The same links ARE in the desktop dropdowns, which render
       their panel unconditionally, so borrow them from there rather than
       maintaining a second copy of the nav in this file. */
    var groups = panel.querySelectorAll(".mobile-nav-accordion");
    for (var g = 0; g < groups.length; g++) {
      (function (btn) {
        var id = (btn.getAttribute("data-testid") || "").replace(/^mobile-nav-/, "");
        var trigger = document.querySelector('.nav-dropdown [data-testid="nav-' + id + '"]');
        var wrap = trigger && trigger.closest ? trigger.closest(".nav-dropdown") : null;
        var source = wrap ? wrap.querySelector(".dropdown-panel") : null;

        if (!source || !source.innerHTML.trim()) {
          /* No children to show. Send the reader to the section itself rather
             than leaving a control that visibly does nothing. */
          var href = trigger && trigger.getAttribute("href");
          if (href) {
            btn.addEventListener("click", function () { window.location.href = href; });
          } else {
            btn.setAttribute("hidden", "hidden");
          }
          return;
        }

        var sub = document.createElement("div");
        sub.className = "mobile-nav-sub";
        sub.innerHTML = source.innerHTML;
        /* Inline display rather than the hidden attribute: .mobile-nav-sub sets
           its own display, which would override [hidden]. */
        sub.style.display = "none";
        btn.parentNode.insertBefore(sub, btn.nextSibling);

        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", function () {
          var open = btn.getAttribute("aria-expanded") !== "true";
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          sub.style.display = open ? "" : "none";
        });
      })(groups[g]);
    }
  }

  /* --- CTAs that open a React modal everywhere else on the site ---
     These are <button>s wired to a contact-form modal that does not exist here,
     so they sat inert. The page's own CTAs already link to /contact; match them
     rather than inventing a different destination. */
  var ctas = document.querySelectorAll('[data-testid="header-cta"], [data-testid="mobile-nav-cta"]');
  for (var c = 0; c < ctas.length; c++) {
    ctas[c].addEventListener("click", function () { window.location.href = "/contact"; });
  }

  /* --- Google Tag Manager, deferred exactly as the rest of the site defers it --- */
  var loaded = false;
  var idleHandle;
  var timerHandle;

  var inject = function () {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=${GTM_ID}";
    document.head.appendChild(s);
  };

  var WAKE = ["pointerdown", "keydown", "touchstart", "scroll"];
  var teardown = function () {
    for (var i = 0; i < WAKE.length; i++) window.removeEventListener(WAKE[i], fire);
    if (idleHandle !== undefined && window.cancelIdleCallback) {
      window.cancelIdleCallback(idleHandle);
    }
    if (timerHandle !== undefined) clearTimeout(timerHandle);
  };
  var fire = function () {
    teardown();
    inject();
  };
  for (var i = 0; i < WAKE.length; i++) {
    window.addEventListener(WAKE[i], fire, { once: true, passive: true });
  }

  /* Ad clicks need the tag to run while the click id is still in the URL, and
     GTM preview needs the container without waiting for the tester to interact.
     Both wait for idle rather than loading during parse: an ad landing is the
     LAST page that can afford gtm.js competing with the hero image. */
  var params = new URLSearchParams(window.location.search);
  var urgent = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid", "gtm_debug"];
  var eager = false;
  for (var j = 0; j < urgent.length; j++) {
    if (params.has(urgent[j])) { eager = true; break; }
  }
  if (eager) {
    if (window.requestIdleCallback) {
      idleHandle = window.requestIdleCallback(fire, { timeout: ${EAGER_IDLE_TIMEOUT_MS} });
    } else {
      /* Safari has no requestIdleCallback; a plain timer is the fallback. */
      timerHandle = setTimeout(fire, ${EAGER_IDLE_TIMEOUT_MS});
    }
  }
})();
</script>`;
