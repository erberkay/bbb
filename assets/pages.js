/* =========================================================
   HB ŞANZIMAN — Alt sayfa etkileşimleri
   Hafif tutuldu: yalnızca navigasyon + yıl. Ana sayfa app.js kullanır.
   ========================================================= */
(function () {
  'use strict';

  // Yıl
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Scroll'da navbar
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobil menü (erişilebilir)
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  // SSS: adres çubuğunda #soru varsa ilgili detayı aç
  if (location.hash) {
    var el = document.querySelector(location.hash);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
})();
