/* =========================================
   NABD GLOBAL MEDICAL ECOSYSTEM
   Application Core v1.0
========================================= */

(function () {
  "use strict";

  const NABD = {
    version: "1.0.0",

    init() {
      this.setYear();
      this.mobileMenu();
      this.smoothScroll();
      this.revealElements();
      this.languageControls();
      this.search();
    },

    setYear() {
      document.querySelectorAll("[data-nabd-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
      });
    },

    mobileMenu() {
      const toggle = document.querySelector("[data-nabd-menu-toggle]");
      const menu = document.querySelector("[data-nabd-menu]");

      if (!toggle || !menu) return;

      toggle.addEventListener("click", () => {
        const opened = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(opened));
      });

      menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    },

    smoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
          const target = document.querySelector(link.getAttribute("href"));
          if (!target) return;

          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        });
      });
    },

    revealElements() {
      const elements = document.querySelectorAll("[data-nabd-reveal]");

      if (!("IntersectionObserver" in window)) {
        elements.forEach(el => el.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      elements.forEach(el => observer.observe(el));
    },

    languageControls() {
      document.querySelectorAll("[data-nabd-language]").forEach(button => {
        button.addEventListener("click", () => {
          const language = button.dataset.nabdLanguage;

          if (!["ar", "en"].includes(language)) return;

          document.documentElement.lang = language;
          document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

          document.querySelectorAll("[data-nabd-language]").forEach(item => {
            item.setAttribute(
              "aria-pressed",
              String(item === button)
            );
          });
        });
      });
    },

    search() {
      document.querySelectorAll("[data-nabd-search]").forEach(input => {
        const target = document.querySelector(
          input.dataset.nabdSearch
        );

        if (!target) return;

        input.addEventListener("input", () => {
          const query = input.value.trim().toLowerCase();

          target.querySelectorAll("[data-nabd-search-item]").forEach(item => {
            item.hidden = !item.textContent.toLowerCase().includes(query);
          });
        });
      });
    }
  };

  window.NABD = NABD;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => NABD.init());
  } else {
    NABD.init();
  }
})();
