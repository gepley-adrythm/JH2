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
 *   2. The header never changed colour on scroll. The harvested markup and the
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
