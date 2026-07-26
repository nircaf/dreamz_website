// Shared Dreamz navigation and footer chrome.
// Pages opt into a footer layout with: <body data-footer-type="landing|legal|editorial">
(() => {
  const script = document.currentScript;
  const src = script ? script.getAttribute('src') || '' : '';
  const root = script && script.dataset.root
    ? script.dataset.root
    : src.startsWith('../') ? '../' : '';
  const footerType = document.body.dataset.footerType || 'landing';
  const navType = document.body.dataset.navType || (footerType === 'legal' ? 'legal' : 'marketing');
  const active = document.body.dataset.activePage || '';
  const year = document.body.dataset.footerYear || '2026';

  const url = path => `${root}${path}`;
  const isActive = page => active === page ? ' class="active"' : '';

  const ensureSharedStyles = () => {
    if (document.getElementById('dreamz-shared-chrome-style')) return;

    const style = document.createElement('style');
    style.id = 'dreamz-shared-chrome-style';
    style.textContent = `
      #nav .nav-logo {
        width: auto !important;
        display: flex;
        align-items: center;
      }

      .dreamz-animated-logo {
        width: clamp(80px, 10vw, 120px);
        height: auto;
        aspect-ratio: 300 / 172;
        display: block;
      }
      
      .footer-logo .dreamz-animated-logo {
        width: clamp(65px, 8vw, 90px);
        height: auto;
        aspect-ratio: 300 / 172;
      }

      #nav .nav-links a.active {
        color: var(--white, #f4f6ff);
      }

      /* Canonical brand accent for the shared Pre-order button — single
         source of truth so it renders identically on every page regardless
         of that page's local teal/violet theming. Wins page-local .nav-cta
         color/border-color rules of equal specificity because this stylesheet
         is appended to <head> after them (later source order wins ties). */
      .nav-cta {
        color: var(--violet, #818CF8);
        border-color: var(--violet-dim, #5B21B6);
      }

      .nav-cta:hover {
        background: var(--violet, #818CF8);
        color: var(--ink, #04050d);
      }

      .footer-legal-links a {
        color: rgba(184, 196, 248, 0.25);
        font-size: 0.7rem;
        letter-spacing: 0.1em;
        text-decoration: none;
        text-transform: uppercase;
        transition: color 0.3s;
      }

      .footer-legal-links a:hover {
        color: var(--muted, #8a94bd);
      }

      .footer-social {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }

      .footer-social a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        color: rgba(184, 196, 248, 0.35);
        transition: color 0.3s;
      }

      .footer-social a:hover {
        color: var(--violet, #818CF8);
      }

      .footer-social svg {
        width: 17px;
        height: 17px;
        fill: currentColor;
      }

      section:not(#hero):not(#how):not(#science):not(.preorder-hero),
      .details,
      #featured,
      #posts,
      .legal-section {
        content-visibility: auto;
        contain-intrinsic-size: 820px;
      }

      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto !important;
        }

        *,
        *::before,
        *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      }

      @media (max-width: 768px) {
        #nav .nav-logo {
          width: auto !important;
        }
      }

      /* MOBILE MENU TOGGLE (shared across all marketing-nav pages) */
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .nav-toggle {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 34px;
        height: 34px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        flex-shrink: 0;
      }

      .nav-toggle span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--white, #f4f6ff);
        transition: transform 0.25s ease, opacity 0.25s ease;
      }

      #nav.nav-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      #nav.nav-open .nav-toggle span:nth-child(2) { opacity: 0; }
      #nav.nav-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

      @media (max-width: 860px) {
        .nav-toggle { display: flex; }

        #nav .nav-links {
          display: flex !important;
          position: fixed;
          inset: 0 0 0 auto;
          height: 100dvh;
          width: min(78vw, 320px);
          margin: 0;
          padding: 6rem 2.5rem 2.5rem;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 1.75rem;
          background: rgba(4, 5, 13, 0.98);
          backdrop-filter: blur(14px);
          border-left: 1px solid var(--border, rgba(138, 157, 232, 0.15));
          transform: translateX(100%);
          transition: transform 0.32s ease;
          z-index: 1000;
        }

        #nav .nav-links a {
          font-size: 1rem;
        }

        #nav.nav-open .nav-links {
          transform: translateX(0);
        }

        html.nav-scroll-lock,
        html.nav-scroll-lock body {
          overflow: hidden;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const marketingNavHtml = () => `
    <nav id="nav" role="navigation">
      <a href="${url('index.html#hero')}" class="nav-logo" aria-label="Dreamz home">
        <canvas class="dreamz-animated-logo" width="300" height="300" aria-label="Dreamz logo"></canvas>
      </a>
      <ul class="nav-links" id="nav-links-list" role="list">
        <li><a href="${url('how-it-works.html')}"${isActive('how')}>How It Works</a></li>
        <li><a href="${url('dreamz-science.html')}"${isActive('science')}>Science</a></li>
        <li><a href="${url('dreamz-faq.html')}"${isActive('faq')}>FAQ</a></li>
        <li><a href="${url('dreamz-research.html')}"${isActive('research')}>Research</a></li>
        <li><a href="${url('about.html')}"${isActive('about')}>About</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-cta" type="button" onclick="window.location.href='${url('index.html#cta')}'">Pre-order</button>
        <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links-list">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;

  const legalNavHtml = () => `
    <nav id="nav" role="navigation">
      <a href="${url('index.html')}" class="nav-logo" aria-label="Dreamz home">
        <canvas class="dreamz-animated-logo" width="300" height="300" aria-label="Dreamz logo"></canvas>
      </a>
      <ul class="nav-links" role="list">
        <li><a href="${url('index.html')}"${isActive('home')}>Home</a></li>
        <li><a href="${url('index.html#cta')}">Pre-order</a></li>
      </ul>
    </nav>`;

  const socialLinksHtml = () => `
    <div class="footer-social" aria-label="Dreamz on social media">
      <a href="https://www.instagram.com/hypnodreamzzz/" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href="https://x.com/HypnoDreamz" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on X">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/dreamzmask" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on LinkedIn">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-.001-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/></svg>
      </a>
    </div>`;

  const legalFooterHtml = () => `
    <footer class="legal-footer" role="contentinfo">
      <a href="${url('index.html')}" class="footer-logo" aria-label="Dreamz home">
        <canvas class="dreamz-animated-logo" width="300" height="300" aria-label="Dreamz logo"></canvas>
      </a>
      <div class="footer-links" role="navigation" aria-label="Footer links">
        <a href="${url('index.html')}">Home</a>
        <a href="${url('privacy.html')}"${isActive('privacy')}>Privacy Policy</a>
        <a href="${url('term/index.html')}"${isActive('terms')}>Terms</a>
        <a href="${url('term/account-deletion.html')}"${isActive('account-deletion')}>Delete Account</a>
        <a href="${url('contact.html')}"${isActive('contact')}>Contact</a>
      </div>
      ${socialLinksHtml()}
      <p class="footer-copy">&copy; ${year} Dreamz. Sleep Neurotechnology. All rights reserved.</p>
    </footer>`;

  const editorialFooterHtml = () => `
    <footer role="contentinfo">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="${url('index.html')}" class="footer-logo" aria-label="Dreamz home">
            <canvas class="dreamz-animated-logo" width="300" height="300" aria-label="Dreamz logo"></canvas>
          </a>
          <p class="footer-tagline">Sleep well. Live well.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${year} Dreamz. Sleep Neurotechnology. All rights reserved.</p>
        <div class="footer-links">
          <a href="${url('index.html')}">Home</a>
          <a href="${url('dreamz-research.html')}"${isActive('research')}>Research</a>
          <a href="${url('privacy.html')}">Privacy</a>
          <a href="${url('term/index.html')}">Terms</a>
          <a href="${url('term/account-deletion.html')}"${isActive('account-deletion')}>Delete Account</a>
          <a href="${url('contact.html')}">Contact</a>
        </div>
        ${socialLinksHtml()}
      </div>
    </footer>`;

  const landingFooterHtml = () => `
    <footer role="contentinfo" itemscope itemtype="https://schema.org/WPFooter">
      <div class="footer-bottom">
        <div class="footer-bottom-row">
          <p class="footer-copy">&copy; 2025 Dreamz. Sleep Neurotechnology. All rights reserved.</p>
          <div class="footer-legal-links">
            <a href="${url('how-it-works.html')}"${isActive('how')}>How It Works</a>
            <a href="${url('about.html')}"${isActive('about')}>About</a>
            <a href="#">Care &amp; Washing</a>
            <a href="#">Safety Guide</a>
            <a href="${url('contact.html')}">Contact</a>
            <a href="${url('privacy.html')}">Privacy Policy</a>
            <a href="${url('term/index.html')}">Terms &amp; Conditions</a>
            <a href="${url('term/account-deletion.html')}"${isActive('account-deletion')}>Delete Account</a>
          </div>
          ${socialLinksHtml()}
        </div>
        <div class="footer-policy-links"></div>
      </div>
    </footer>`;

  const footerHtml = {
    legal: legalFooterHtml,
    editorial: editorialFooterHtml,
    landing: landingFooterHtml
  };

  ensureSharedStyles();

  const navTarget = document.querySelector('[data-dreamz-nav]') || document.querySelector('body > nav');
  if (navTarget) navTarget.outerHTML = navType === 'legal' ? legalNavHtml() : marketingNavHtml();

  const initNavToggle = () => {
    const navEl = document.getElementById('nav');
    const toggle = navEl && navEl.querySelector('.nav-toggle');
    if (!navEl || !toggle) return;

    const closeNav = () => {
      navEl.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-scroll-lock');
    };
    const openNav = () => {
      navEl.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-scroll-lock');
    };

    toggle.addEventListener('click', () => {
      navEl.classList.contains('nav-open') ? closeNav() : openNav();
    });
    navEl.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeNav();
    });
    document.addEventListener('click', event => {
      if (navEl.classList.contains('nav-open') && !navEl.contains(event.target)) closeNav();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeNav();
    }, { passive: true });
  };

  initNavToggle();

  const footerTarget = document.querySelector('[data-dreamz-footer]') || document.querySelector('body > footer');
  if (footerTarget) footerTarget.outerHTML = (footerHtml[footerType] || landingFooterHtml)();

  const initLogos = () => {
    const canvases = document.querySelectorAll('.dreamz-animated-logo');
    if (!canvases.length) return;

    const XMIN = -Math.PI, XMAX = Math.PI;
    const YMIN = -1.8, YMAX = 1.8;
    const NS = 800;
    const DX = (XMAX - XMIN) / NS;
    const HUE = 245, SAT = 25, LIT = 66;
    const WS = 0.4, BD = 0.71, BS = 8.0, ED = 0.17, ES = 2.6;
    const wmax = 5.5, a = 3.14, b = 2.14; 

    const env = (x, spd) => Math.pow(Math.abs(Math.cos(x / 2)), spd);
    const lineWidth = (x) => wmax * env(x, WS);
    const lineAlpha = (x) => {
      const m = Math.max(0.03, 1 - BD);
      return m + (1 - m) * env(x, BS);
    };
    const lineLit = (x) => Math.min(100, LIT + (100 - LIT) * ED * env(x, ES));
    const strokeColor = (x) => {
      const al = lineAlpha(x);
      const lt = lineLit(x);
      return `hsla(${HUE},${SAT}%,${lt.toFixed(1)}%,${al.toFixed(3)})`;
    };
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const easeOut = t => 1 - (1 - t) * (1 - t);

    const ANIM_DUR = 2600;
    const PAUSE_DUR = 4000;
    const CYCLE = ANIM_DUR + PAUSE_DUR;
    
    canvases.forEach(cv => {
      const ctx = cv.getContext('2d');
      const DPR = window.devicePixelRatio || 1;
      const S_W = 300;
      const S_H = 172;
      cv.width = S_W * DPR;
      cv.height = S_H * DPR;
      ctx.scale(DPR, DPR);

      const tcx = x => (x - XMIN) / (XMAX - XMIN) * S_W;
      const tcy = y => (YMAX - y) / (YMAX - YMIN) * S_H;

      const fns = [
        x =>  Math.PI * Math.sin(x) / b,
        x => -Math.PI * Math.sin(x) / b,
        x =>  Math.PI * Math.sin(x) / (a * b),
      ];

      const drawLine = (fn, xStart, xEnd) => {
        for (let i = 0; i < NS; i++) {
          const x0 = XMIN + i * DX, x1 = x0 + DX, xm = (x0 + x1) / 2;
          if (xm < xStart || xm > xEnd) continue;
          const y0 = clamp(fn(x0), YMIN, YMAX);
          const y1 = clamp(fn(x1), YMIN, YMAX);
          ctx.beginPath();
          ctx.moveTo(tcx(x0), tcy(y0));
          ctx.lineTo(tcx(x1), tcy(y1));
          ctx.lineWidth = lineWidth(xm);
          ctx.lineCap = 'round';
          ctx.strokeStyle = strokeColor(xm);
          ctx.stroke();
        }
      };

      let animStart = performance.now();
      let drawnSolid = false;

      const frame = (ts) => {
        const timeInCycle = (ts - animStart) % CYCLE;
        
        if (timeInCycle < ANIM_DUR) {
          drawnSolid = false;
          const raw = timeInCycle / ANIM_DUR;
          ctx.clearRect(0, 0, S_W, S_H);
          
          const offsets = [0, 0.22, 0.44];
          const span = 0.56;

          offsets.forEach((off, li) => {
            const lt = easeOut(clamp((raw - off) / span, 0, 1));
            const xEnd = XMIN + lt * (XMAX - XMIN);
            drawLine(fns[li], XMIN, xEnd);
          });
        } else {
          if (!drawnSolid) {
            ctx.clearRect(0, 0, S_W, S_H);
            fns.forEach(fn => drawLine(fn, XMIN, XMAX));
            drawnSolid = true;
          }
        }
        requestAnimationFrame(frame);
      };

      requestAnimationFrame((ts) => { animStart = ts; requestAnimationFrame(frame); });
    });
  };

  initLogos();
})();
