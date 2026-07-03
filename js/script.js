// ==========================================================================
// Tertius Adjaoke — Portfolio interactions
// ==========================================================================

(function () {
  'use strict';

  /* ---------------- Theme toggle ---------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var STORAGE_KEY = 'ta-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light');
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Contact form ---------------- */
  // This is a static site with no backend. To receive submissions, connect
  // this form to a service like Formspree, Getform, or Netlify Forms and
  // update the <form> action in index.html accordingly (see README).
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = 'Please fill in every field before sending.';
        return;
      }

      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:suitret01@gmail.com?subject=' + subject + '&body=' + body;

      note.textContent = 'Opening your email client…';
    });
  }

  /* ---------------- Active nav highlight ---------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
