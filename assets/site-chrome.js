// Shared Dreamz header and footer (white theme). Styles live in assets/white-theme.css.
// Pages mark where they go with <div data-dreamz-nav></div> and <div data-dreamz-footer></div>
// (a bare <body > footer> is replaced too) and name themselves with <body data-active-page="…">.
(() => {
  const script = document.currentScript;
  const src = script ? script.getAttribute('src') || '' : '';
  const root = script && script.dataset.root ? script.dataset.root : src.startsWith('../') ? '../' : '';
  const active = document.body.dataset.activePage || '';
  const year = document.body.dataset.footerYear || '2026';
  const url = path => `${root}${path}`;
  const current = page => (active === page ? ' aria-current="page"' : '');

  const APP_STORE_URL = 'https://apps.apple.com/us/app/dreamzble-tdcs/id6764758039';

  // The live site's animated three-wave mark, drawn by initLogo() below for light backgrounds.
  const logo = `<canvas class="dz-logo-mark" width="300" height="172" aria-hidden="true"></canvas>`;

  const headerHtml = () => `
    <header class="dz-header">
      <div class="dz-bar">
        <a class="dz-logo" href="${url('index.html')}" aria-label="Dreamz home">${logo}<span>Dreamz</span></a>
        <nav class="dz-links" id="dz-menu" aria-label="Main">
          <a href="${url('index.html')}"${current('home')}>Home</a>
          <a href="${url('how-it-works.html')}"${current('how')}>How it works</a>
          <a href="${url('dreamz-use-cases.html')}"${current('use-cases')}>Other Use Cases</a>
          <a href="${url('dreamz-research.html')}"${current('research')}>Research</a>
          <a href="${url('dreamz-faq.html')}"${current('faq')}>FAQ</a>
        </nav>
        <a class="dz-cta" href="${url('index.html#cta')}">Pre-order</a>
        <button class="dz-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="dz-menu"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  const social = `
    <div class="dz-social" aria-label="Dreamz on social media">
      <a href="https://www.instagram.com/hypnodreamzzz/" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
      <a href="https://x.com/HypnoDreamz" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/company/dreamzmask" target="_blank" rel="noopener noreferrer" aria-label="Dreamz on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-.001-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/></svg></a>
    </div>`;

  const footerHtml = () => `
    <footer class="dz-footer">
      <div class="dz-wrap">
        <div class="dz-close">
          <h2>Your nights changed. Your sleep tools can too.</h2>
          <a class="dz-btn-white" href="${url('index.html#cta')}">Pre-order Dreamz</a>
        </div>
        <div class="dz-row">
          <nav class="dz-flinks" aria-label="Footer">
            <a href="${url('index.html')}"${current('home')}>Home</a>
            <a href="${url('how-it-works.html')}"${current('how')}>How it works</a>
            <a href="${url('dreamz-use-cases.html')}"${current('use-cases')}>Other Use Cases</a>
            <a href="${url('dreamz-research.html')}"${current('research')}>Research</a>
            <a href="${url('dreamz-faq.html')}"${current('faq')}>FAQ</a>
            <a href="${url('about.html')}"${current('about')}>About</a>
            <a href="${url('contact.html')}"${current('contact')}>Contact</a>
            <a href="${url('privacy.html')}"${current('privacy')}>Privacy Policy</a>
            <a href="${url('term/index.html')}"${current('terms')}>Terms &amp; Conditions</a>
            <a href="${url('refund-return-policy.html')}"${current('refunds')}>Refunds &amp; Returns</a>
            <a href="${url('term/account-deletion.html')}"${current('account-deletion')}>Delete Account</a>
          </nav>
          <div class="dz-apps">
            <a class="dz-appstore" href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download the Dreamz app on the App Store"><img src="${url('assets/badges/app-store-badge.svg')}" alt="Download on the App Store" width="120" height="40"></a>
            ${social}
          </div>
        </div>
        <p class="dz-disclaimer">Dreamz is a wellness device and is not a medical device. It is not intended to diagnose, treat, cure, or prevent any disease or medical condition. Not for use by children, pregnant individuals, or those with epilepsy or known neurological disorders. Consult a healthcare professional before use if you have concerns. Use constitutes acceptance of our <a href="${url('term/index.html')}">Terms &amp; Conditions</a> and <a href="${url('privacy.html')}">Privacy Policy</a>.</p>
        <span class="dz-copy">&copy; ${year} Dreamz. Sleep Neurotechnology. All rights reserved.</span>
      </div>
    </footer>`;

  const navTarget = document.querySelector('[data-dreamz-nav]') || document.querySelector('body > nav');
  if (navTarget) navTarget.outerHTML = headerHtml();

  // Phone menu: the burger opens the links as a panel under the bar.
  const header = document.querySelector('.dz-header');
  const burger = header && header.querySelector('.dz-burger');
  if (burger) {
    const setOpen = open => {
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
    header.querySelectorAll('.dz-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', e => { if (!header.contains(e.target)) setOpen(false); });
  }

  // Logo animation from the live site: three sine waves draw in one after another, hold, repeat.
  // Match the main branch’s curves, taper, and timing with a darker ink on white.
  const initLogo = () => {
    const cv = document.querySelector('.dz-logo-mark');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const S_W = 300, S_H = 172;
    cv.width = S_W * DPR; cv.height = S_H * DPR;
    ctx.scale(DPR, DPR);

    const XMIN = -Math.PI, XMAX = Math.PI, YMIN = -1.8, YMAX = 1.8, NS = 800;
    const DX = (XMAX - XMIN) / NS;
    const WS = 0.4, BD = 0.71, BS = 8.0, ED = 0.17, ES = 2.6, wmax = 5.5, a = 3.14, b = 2.14;
    const env = (x, spd) => Math.pow(Math.abs(Math.cos(x / 2)), spd);
    const lineWidth = x => wmax * env(x, WS);
    const lineAlpha = x => { const m = Math.max(0.03, 1 - BD); return m + (1 - m) * env(x, BS); };
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const easeOut = t => 1 - (1 - t) * (1 - t);
    const tcx = x => (x - XMIN) / (XMAX - XMIN) * S_W;
    const tcy = y => (YMAX - y) / (YMAX - YMIN) * S_H;
    const fns = [x => Math.PI * Math.sin(x) / b, x => -Math.PI * Math.sin(x) / b, x => Math.PI * Math.sin(x) / (a * b)];

    const strokeColor = x => {
      const lightness = 5 + (100 - 5) * ED * env(x, ES);
      return `hsla(245, 25%, ${lightness.toFixed(1)}%, ${lineAlpha(x).toFixed(3)})`;
    };
    const drawLine = (fn, xEnd) => {
      for (let i = 0; i < NS; i++) {
        const x0 = XMIN + i * DX, x1 = x0 + DX, xm = (x0 + x1) / 2;
        if (xm > xEnd) break;
        ctx.beginPath();
        ctx.moveTo(tcx(x0), tcy(clamp(fn(x0), YMIN, YMAX)));
        ctx.lineTo(tcx(x1), tcy(clamp(fn(x1), YMIN, YMAX)));
        ctx.lineWidth = lineWidth(xm);
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeColor(xm);
        ctx.stroke();
      }
    };
    const drawSolid = () => { ctx.clearRect(0, 0, S_W, S_H); fns.forEach(fn => drawLine(fn, XMAX)); };

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ANIM = 2600, PAUSE = 4000, CYCLE = ANIM + PAUSE;
    let startTime, frameId, drawnSolid;
    const frame = ts => {
      startTime ??= ts;
      const t = (ts - startTime) % CYCLE;
      if (t < ANIM) {
        ctx.clearRect(0, 0, S_W, S_H);
        [0, 0.22, 0.44].forEach((off, i) => {
          const lt = easeOut(clamp((t / ANIM - off) / 0.56, 0, 1));
          drawLine(fns[i], XMIN + lt * (XMAX - XMIN));
        });
        drawnSolid = false;
      } else if (!drawnSolid) {
        drawSolid();
        drawnSolid = true;
      }
      frameId = requestAnimationFrame(frame);
    };

    const updateMotion = () => {
      cancelAnimationFrame(frameId);
      if (motion.matches) {
        drawSolid();
      } else {
        startTime = undefined;
        drawnSolid = false;
        frameId = requestAnimationFrame(frame);
      }
    };
    motion.addEventListener('change', updateMotion);
    updateMotion();
  };
  initLogo();

  const footerTarget = document.querySelector('[data-dreamz-footer]') || document.querySelector('body > footer');
  if (footerTarget) footerTarget.outerHTML = footerHtml();
  else document.body.insertAdjacentHTML('beforeend', footerHtml());
})();
