/* ============================================================
   GOWER CONSTRUCTION — main.js
   Handles: mobile nav, FAQ accordion, form success message
   ============================================================ */

/* ── MOBILE NAV ───────────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }
  });
})();


/* ── FAQ ACCORDION ────────────────────────────────────────── */
(function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon   = item.querySelector('.faq-icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = !answer.hidden;

      // Close all other open items
      faqItems.forEach(function (other) {
        if (other !== item) {
          const otherAnswer = other.querySelector('.faq-answer');
          const otherBtn    = other.querySelector('.faq-question');
          const otherIcon   = other.querySelector('.faq-icon');
          if (otherAnswer) otherAnswer.hidden = true;
          if (otherBtn)    otherBtn.setAttribute('aria-expanded', 'false');
          if (otherIcon)   otherIcon.textContent = '+';
          other.classList.remove('open');
        }
      });

      // Toggle current item
      answer.hidden = isOpen;
      btn.setAttribute('aria-expanded', !isOpen);
      if (icon) icon.textContent = isOpen ? '+' : '−';
      item.classList.toggle('open', !isOpen);
    });
  });
})();


/* ── FORM SUCCESS MESSAGE ─────────────────────────────────── */
(function () {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form || !success) return;

  // Show success if redirected back with ?sent=true
  if (window.location.search.includes('sent=true')) {
    form.hidden    = true;
    success.hidden = false;
    // Clean URL without reload
    window.history.replaceState({}, document.title, window.location.pathname);
  }
})();


/* ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── HEADER SCROLL SHADOW ─────────────────────────────────── */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();


/* ── ACTIVE NAV LINK HIGHLIGHT ────────────────────────────── */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();