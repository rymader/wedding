/**
 * Site interactions:
 * - Mobile burger toggles primary nav
 * - Language dropdown toggles, closes on outside click / Escape
 * - Small a11y niceties (ARIA states, focus handling)
 *
 * This file is built with Hugo Pipes in baseof.html:
 * {{ $js := resources.Get "js/site.js" | resources.Minify | resources.Fingerprint }}
 * <script src="{{ $js.RelPermalink }}" defer></script>
 */

(function () {
  // ---------- tiny DOM helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  // ---------- Language dropdown ----------
  function initLangDropdown() {
    const lang = $(".lang");
    if (!lang) return;

    const btn = $(".lang-btn", lang);
    const menu = $(".lang-menu", lang);
    if (!btn || !menu) return;

    // Ensure it's a button, not a submit
    if (!btn.getAttribute("type")) btn.setAttribute("type", "button");

    // Ensure ARIA baseline
    if (!btn.hasAttribute("aria-haspopup")) btn.setAttribute("aria-haspopup", "true");
    if (!btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded", "false");

    const open = () => {
      if (lang.classList.contains("open")) return;
      lang.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      if (!lang.classList.contains("open")) return;
      lang.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };

    const toggle = () => (lang.classList.contains("open") ? close() : open());

    // Click to toggle
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
      // When opened, move focus into menu on first link for keyboard users
      if (lang.classList.contains("open")) {
        const firstLink = $("a,button,[tabindex]:not([tabindex='-1'])", menu);
        if (firstLink) firstLink.focus({ preventScroll: true });
      }
    });

    // Click outside closes
    document.addEventListener("click", (e) => {
      if (!lang.contains(e.target)) close();
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // Optional: close when a menu item is clicked (navigating away)
    menu.addEventListener("click", (e) => {
      const el = e.target.closest("a,[role='menuitem'],button");
      if (el) close();
    });
  }

  // ---------- Mobile burger / primary nav ----------
  function initBurger() {
    const burger = $(".burger");
    const nav = $("#primary-nav");
    if (!burger || !nav) return;

    // Sanity: ensure it's a button
    if (!burger.getAttribute("type")) burger.setAttribute("type", "button");
    // ARIA baseline
    if (!burger.hasAttribute("aria-expanded")) burger.setAttribute("aria-expanded", "false");
    if (!burger.hasAttribute("aria-controls")) burger.setAttribute("aria-controls", "primary-nav");

    const open = () => {
      nav.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    };

    const toggle = () => (nav.classList.contains("open") ? close() : open());

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    // Close when clicking outside the nav (on mobile layout)
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && e.target !== burger) {
        close();
      }
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // Optional: close after navigating via a nav link (helps on mobile)
    nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) close();
    });
  }

  // ---------- Kickoff ----------
  onReady(() => {
    initLangDropdown();
    initBurger();
  });
})();
