// site.js – handles nav + language dropdown
document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile hamburger =====
  const burger = document.querySelector(".burger");
  const nav    = document.getElementById("primary-nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ===== Language dropdown =====
  const lang = document.querySelector(".lang");
  const btn  = document.querySelector(".lang-btn");
  const menu = document.getElementById("lang-menu");

  if (lang && btn && menu) {
    // Toggle on button click
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = lang.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!lang.classList.contains("open")) return;
      if (!lang.contains(e.target)) {
        lang.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lang.classList.contains("open")) {
        lang.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }
});
