// Mobile menu toggle + language dropdown (click-to-toggle)
(() => {
  // Hamburger
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#primary-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close after selecting a link (mobile)
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Language dropdown
  const lang = document.querySelector('.lang');
  if (!lang) return;
  const btn = lang.querySelector('.lang-btn');
  const menu = lang.querySelector('.lang-menu');

  if (btn && menu) {
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    const closeMenu = () => {
      if (lang.classList.contains('open')) {
        lang.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    };

    // Toggle on click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !lang.classList.contains('open');
      // Close any other open dropdowns
      document.querySelectorAll('.lang.open').forEach(el => {
        if (el !== lang) el.classList.remove('open');
      });
      lang.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

      // If opening inside mobile sheet, ensure nav is visible
      if (willOpen && nav && nav.classList.contains('open') === false && window.matchMedia('(max-width:920px)').matches) {
        nav.classList.add('open');
        if (burger) burger.setAttribute('aria-expanded', 'true');
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!lang.contains(e.target)) closeMenu();
    });

    // Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();
