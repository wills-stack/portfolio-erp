(function () {
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  var links = document.querySelectorAll('[data-spy]');
  var sections = document.querySelectorAll('main section');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  // Scroll spy: highlight the menu item for the section in view
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(function (s) { spy.observe(s); });
  // Reveal cards on scroll
  var cards = document.querySelectorAll('.card, .hero, .tile');
  if (!reduce) {
    cards.forEach(function (c) { c.classList.add('reveal'); });
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    cards.forEach(function (c) { reveal.observe(c); });
  }

  // KPI count-up
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var suffix = el.dataset.suffix || '';
    var start = performance.now(), dur = 900;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  if (!reduce) {
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); counter.unobserve(e.target); }
      });
    });
    document.querySelectorAll('[data-count]').forEach(function (el) { counter.observe(el); });
  }
})();
