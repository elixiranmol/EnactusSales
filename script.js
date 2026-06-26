/* ═══════════════════════════════════════════════════════════
   DEVNAGRI — Homepage JavaScript v2.0
   Enhanced Motion · Scroll Detection · Reveals · Carousel · Counters
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Page Load ─── */
  window.addEventListener('DOMContentLoaded', () => {
    // Small delay for fonts to load, then reveal
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  });


  /* ─── Navigation Scroll Behavior ─── */
  const nav = document.getElementById('main-nav');
  const SCROLL_THRESHOLD = 80;
  let lastScrollY = 0;
  let ticking = false;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  handleNavScroll();


  /* ─── Mobile Menu ─── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (hamburger && mobileMenu && mobileClose) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', closeMobileMenu);

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }


  /* ─── Scroll-Triggered Reveals (IntersectionObserver) ─── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback or reduced motion: show everything immediately
    revealElements.forEach((el) => el.classList.add('visible'));
  }


  /* ─── Parallax Effect on Hero Image ─── */
  if (!prefersReducedMotion) {
    const heroImage = document.querySelector('.hero__image img');
    const heroSection = document.querySelector('.hero');

    if (heroImage && heroSection) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        if (scrollY < heroHeight) {
          const parallaxOffset = scrollY * 0.3;
          heroImage.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
        }
      }, { passive: true });
    }
  }


  /* ─── Interactive Gradient Background (Aipan-Mesh) ─── */
  if (!prefersReducedMotion) {
    const bgCanvas = document.getElementById('bg-canvas');
    const bgOrbs = document.querySelectorAll('.bg-orb');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (bgCanvas && bgOrbs.length > 0) {

      /* ── Mouse tracking with lerp ── */
      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;
      const lerpSpeed = 0.06;

      if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
          targetX = (e.clientX - window.innerWidth / 2);
          targetY = (e.clientY - window.innerHeight / 2);
        }, { passive: true });
      }

      /* ── Scroll-aware fade class ── */
      const SCROLL_FADE_THRESHOLD = window.innerHeight * 0.8;
      function handleBgScroll() {
        if (window.scrollY > SCROLL_FADE_THRESHOLD) {
          bgCanvas.classList.add('bg-gradient-canvas--scrolled');
        } else {
          bgCanvas.classList.remove('bg-gradient-canvas--scrolled');
        }
      }
      window.addEventListener('scroll', handleBgScroll, { passive: true });
      handleBgScroll();

      /* ── Animation loop ── */
      const orbConfigs = [];

      bgOrbs.forEach((orb, i) => {
        const parallaxFactor = parseFloat(orb.dataset.parallax) || 0.03;
        const driftFreqX = parseFloat(orb.dataset.driftX) || 0.0004;
        const driftFreqY = parseFloat(orb.dataset.driftY) || 0.0005;
        /* Each orb drifts in a different phase */
        const phaseX = Math.random() * Math.PI * 2;
        const phaseY = Math.random() * Math.PI * 2;
        /* Drift amplitude in pixels */
        const driftAmpX = 60 + Math.random() * 40;
        const driftAmpY = 50 + Math.random() * 30;

        orbConfigs.push({
          el: orb,
          parallaxFactor,
          driftFreqX,
          driftFreqY,
          phaseX,
          phaseY,
          driftAmpX,
          driftAmpY,
        });
      });

      function animateBg(timestamp) {
        /* Lerp mouse position for buttery movement */
        mouseX += (targetX - mouseX) * lerpSpeed;
        mouseY += (targetY - mouseY) * lerpSpeed;

        /* Update each orb */
        for (let i = 0; i < orbConfigs.length; i++) {
          const c = orbConfigs[i];

          /* Autonomous sinusoidal drift */
          const driftX = Math.sin(timestamp * c.driftFreqX + c.phaseX) * c.driftAmpX;
          const driftY = Math.cos(timestamp * c.driftFreqY + c.phaseY) * c.driftAmpY;

          /* Mouse parallax offset */
          const parallaxX = mouseX * c.parallaxFactor;
          const parallaxY = mouseY * c.parallaxFactor;

          /* Combine drift + parallax */
          const tx = driftX + parallaxX;
          const ty = driftY + parallaxY;

          c.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }

        requestAnimationFrame(animateBg);
      }

      requestAnimationFrame(animateBg);
    }
  }


  /* ─── Magnetic Cursor Effect on CTA Buttons ─── */
  if (!prefersReducedMotion && window.innerWidth > 768) {
    const ctaButtons = document.querySelectorAll('.cta');

    ctaButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 400ms ease';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      });
    });
  }


  /* ─── Artisan Portrait Carousel ─── */
  const artisanData = [
    {
      image: 'assets/artisan-kamla.webp',
      name: 'Kamla Devi',
      nameDeva: 'कमला देवी',
      location: 'Syalde · Almora · कुमाऊँ',
      craft: 'Aipan — Kumaoni Ritual Floor-Art',
      quote:
        '\u201CMy grandmother drew these patterns in geru on our courtyard before every festival. Now I draw them on objects that travel to homes I will never see \u2014 but the hand that made them, that goes with them.\u201D',
      village: 'Syalde, Almora',
      since: '1987',
      ctaText: 'कमला की कहानी पढ़ें · Read Kamla\u2019s Story \u2192',
    },
    {
      image: 'assets/artisan-thumbnail-2.webp',
      name: 'Geeta Rawat',
      nameDeva: 'गीता रावत',
      location: 'Gopeshwar · Chamoli · गढ़वाल',
      craft: 'Pashmina — Himalayan Wool Weaving',
      quote:
        '\u201CEach thread carries the cold of the mountains and the warmth of our hands. A shawl is not fabric \u2014 it is a winter\u2019s worth of patience.\u201D',
      village: 'Gopeshwar, Chamoli',
      since: '1995',
      ctaText: 'गीता की कहानी पढ़ें · Read Geeta\u2019s Story \u2192',
    },
    {
      image: 'assets/artisan-thumbnail-3.webp',
      name: 'Rajesh Bisht',
      nameDeva: 'राजेश बिष्ट',
      location: 'New Tehri · Tehri · गढ़वाल',
      craft: 'Likhai — Traditional Wood Carving',
      quote:
        '\u201CMy father carved temple doors. I carve smaller things now, but the chisel remembers the old patterns.\u201D',
      village: 'New Tehri, Tehri',
      since: '2002',
      ctaText: 'राजेश की कहानी पढ़ें · Read Rajesh\u2019s Story \u2192',
    },
    {
      image: 'assets/artisan-thumbnail-4.webp',
      name: 'Parvati Joshi',
      nameDeva: 'पार्वती जोशी',
      location: 'Munsiyari · Pithoragarh · कुमाऊँ',
      craft: 'Textile Heritage — Natural Dye Weaving',
      quote:
        '\u201CThe colours come from the earth around us \u2014 walnut bark, turmeric root, indigo leaves. Nothing is wasted.\u201D',
      village: 'Munsiyari, Pithoragarh',
      since: '1991',
      ctaText: 'पार्वती की कहानी पढ़ें · Read Parvati\u2019s Story \u2192',
    },
  ];

  const mainImage = document.getElementById('artisan-main-image');
  const artisanName = document.getElementById('artisan-name');
  const artisanNameDeva = document.getElementById('artisan-name-deva');
  const artisanLocation = document.getElementById('artisan-location');
  const artisanCraft = document.getElementById('artisan-craft');
  const artisanQuote = document.getElementById('artisan-quote');
  const artisanVillage = document.getElementById('artisan-village');
  const artisanSince = document.getElementById('artisan-since');
  const artisanCta = document.getElementById('artisan-cta');
  const thumbnails = document.querySelectorAll('.artisan-thumb');

  let currentArtisan = 0;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.artisan, 10);
      if (index === currentArtisan) return;

      // Crossfade: fade out current content
      const fadeTargets = [
        mainImage,
        artisanName,
        artisanNameDeva,
        artisanLocation,
        artisanCraft,
        artisanQuote,
        artisanVillage,
        artisanSince,
      ];

      fadeTargets.forEach((el) => {
        if (el) el.style.opacity = '0';
      });

      // Update active thumbnail
      thumbnails.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');

      // Swap content after fade out
      setTimeout(() => {
        const data = artisanData[index];
        if (mainImage) {
          mainImage.src = data.image;
          mainImage.alt = data.name + ', artisan from Uttarakhand';
        }
        if (artisanName) artisanName.textContent = data.name;
        if (artisanNameDeva) artisanNameDeva.textContent = data.nameDeva;
        if (artisanLocation) artisanLocation.textContent = data.location;
        if (artisanCraft) artisanCraft.textContent = data.craft;
        if (artisanQuote) artisanQuote.textContent = data.quote;
        if (artisanVillage) artisanVillage.textContent = data.village;
        if (artisanSince) artisanSince.textContent = data.since;
        if (artisanCta) artisanCta.textContent = data.ctaText;

        // Fade in
        requestAnimationFrame(() => {
          fadeTargets.forEach((el) => {
            if (el) el.style.opacity = '1';
          });
        });

        currentArtisan = index;
      }, 400);
    });
  });


  /* ─── Impact Number Counter Animation ─── */
  const impactSection = document.getElementById('impact');
  let counterAnimated = false;

  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;

    const numbers = document.querySelectorAll('.impact__number[data-target]');

    numbers.forEach((numEl) => {
      const target = parseInt(numEl.dataset.target, 10);
      const suffix = numEl.dataset.suffix || '+';
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(eased * target);

        numEl.textContent = currentValue + (progress >= 1 ? suffix : '');

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  if (impactSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterObserver.observe(impactSection);
  }


  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─── Tilt Effect on Collection Tiles ─── */
  /* Disabled: 3D Gallery Spin (animations.js) now handles these tiles */


})();
