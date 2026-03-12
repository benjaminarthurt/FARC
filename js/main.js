(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mobile dropdown toggle
  var dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function (item) {
    var link = item.querySelector(':scope > a');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
          link.setAttribute('aria-expanded', item.classList.contains('dropdown-open') ? 'true' : 'false');
        }
      });
    }
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('is-open')) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Highlight current nav item
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('#primary-nav a');
  navLinks.forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === '/' && currentPath === '/') {
      a.setAttribute('aria-current', 'page');
    } else if (href !== '/' && currentPath.startsWith(href)) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // External links open in new tab
  var links = document.querySelectorAll('a[href]');
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    try {
      var url = new URL(href, window.location.href);
      var isExternal = url.hostname !== 'fultonamateurradioclub.org' &&
                       !url.hostname.endsWith('.fultonamateurradioclub.org');
      if (isExternal && (url.protocol === 'http:' || url.protocol === 'https:')) {
        if (!a.hasAttribute('target')) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
      }
    } catch (e) { /* invalid URL, skip */ }
  });

  // Keyboard nav for dropdowns
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(function (item) {
        item.classList.remove('dropdown-open');
      });
      if (nav) nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
