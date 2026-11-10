/* ====================================================================
   Hickory Hills GC — light interactions
   ==================================================================== */

(function () {
  'use strict';

  // 1) Nav background on scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2) Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
      const icon = menuBtn.querySelector('i');
      if (mobileMenu.classList.contains('is-open')) {
        icon.classList.remove('ph-list'); icon.classList.add('ph-x');
        document.body.style.overflow = 'hidden';
      } else {
        icon.classList.add('ph-list'); icon.classList.remove('ph-x');
        document.body.style.overflow = '';
      }
    });
    // Close when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuBtn.querySelector('i').classList.add('ph-list');
        menuBtn.querySelector('i').classList.remove('ph-x');
        document.body.style.overflow = '';
      });
    });
  }

  // 3) Scroll-reveal using IntersectionObserver.
  // Safety: if IO never fires (headless tools, screenshot bots, no-JS, slow
  // devices), reveal everything after a short timeout so nothing stays hidden.
  const reveals = document.querySelectorAll('.reveal');
  let revealed = false;
  const revealAll = () => {
    if (revealed) return; revealed = true;
    reveals.forEach(r => r.classList.add('is-visible'));
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(r => io.observe(r));
    // Fallback: if anything is still hidden after 1200ms, reveal all
    setTimeout(() => {
      if (document.querySelectorAll('.reveal:not(.is-visible)').length > 0) revealAll();
    }, 1200);
  } else {
    revealAll();
  }

  // 4) Smooth-scroll for in-page anchors (respects native behavior already enabled)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const tgt = document.querySelector(id);
        if (tgt) { e.preventDefault(); tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
})();
