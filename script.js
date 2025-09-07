// scripts.js - small interactions: nav toggle, carousel, year injection

document.addEventListener('DOMContentLoaded', function () {
  // set current year
  const y = new Date().getFullYear();
  const yearEls = document.querySelectorAll('#year');
  yearEls.forEach(el => el.textContent = y);

  // nav toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // carousel
  (function initCarousel() {
    const carousel = document.getElementById('offersCarousel');
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prev = carousel.querySelector('[data-action="prev"]');
    const next = carousel.querySelector('[data-action="next"]');
    let idx = 0, timer;

    function go(i) {
      idx = (i + items.length) % items.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
    }

    prev && prev.addEventListener('click', () => { go(idx - 1); resetAuto(); });
    next && next.addEventListener('click', () => { go(idx + 1); resetAuto(); });

    function startAuto() {
      timer = setInterval(() => go(idx + 1), 4500);
    }
    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startAuto);

    startAuto();
  })();
});
