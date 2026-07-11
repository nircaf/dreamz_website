# Scroll Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the six-card testimonial grid with a reversible, scroll-controlled sticky stage showing one large image and quote at a time.

**Architecture:** Keep all production markup, CSS, and JavaScript in `index.html`. A tall wrapper supplies three viewport-sized scroll steps; its sticky child layers three semantic testimonial articles and a small `requestAnimationFrame`-scheduled handler maps wrapper scroll progress to the active article.

**Tech Stack:** HTML, CSS, browser JavaScript, native sticky positioning, Playwright/browser inspection for verification.

## Global Constraints

- Use exactly `Photos/Gallery/8 (2).jpg`, `Photos/Gallery/8 (3).jpg`, and `Photos/Gallery/frame_001186.jpg`, in that order.
- Show one important violet-highlighted phrase per quote.
- Native scrolling must work down and up without wheel or touch event interception.
- Respect `prefers-reduced-motion`.
- Add no dependencies, autoplay, navigation buttons, or abstraction.
- Preserve unrelated working-tree changes.

---

### Task 1: Add the sticky testimonial stage

**Files:**
- Modify: `index.html` testimonial CSS, markup, and existing script block
- Verify: browser runtime plus a static Node assertion command

**Interfaces:**
- Consumes: `#testimonials`, `.reveal`, the three existing gallery image paths, and the browser `scroll`/`resize` events
- Produces: `.testimonials-scroll`, `.testimonials-stage`, three `.testimonial-slide` elements, and `updateTestimonial()`

- [ ] **Step 1: Run a failing static requirement check**

```powershell
node -e "const s=require('fs').readFileSync('index.html','utf8'); for(const x of ['testimonials-scroll','testimonial-slide','updateTestimonial','8 (2).jpg','8 (3).jpg','frame_001186.jpg']) if(!s.includes(x)) throw Error('missing '+x)"
```

Expected: FAIL with `missing testimonials-scroll`.

- [ ] **Step 2: Replace the testimonial CSS and markup**

Implement a `300vh` scroll wrapper containing a `100vh` sticky stage. Layer three semantic articles with an image panel and story panel. Only `.is-active` is visible; each article includes an ordinal, improved quote, highlighted `<strong>` phrase, name, role, and progress indicator. Stack image over copy at the existing mobile breakpoint.

- [ ] **Step 3: Add the minimal scroll-state implementation**

```js
const testimonialScroll = document.querySelector('.testimonials-scroll');
const testimonialSlides = [...document.querySelectorAll('.testimonial-slide')];
let testimonialTicking = false;

function updateTestimonial() {
    const rect = testimonialScroll.getBoundingClientRect();
    const distance = testimonialScroll.offsetHeight - innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / distance));
    const active = Math.min(testimonialSlides.length - 1, Math.floor(progress * testimonialSlides.length));
    testimonialSlides.forEach((slide, index) => slide.classList.toggle('is-active', index === active));
    testimonialTicking = false;
}

function requestTestimonialUpdate() {
    if (!testimonialTicking) requestAnimationFrame(updateTestimonial);
    testimonialTicking = true;
}

addEventListener('scroll', requestTestimonialUpdate, { passive: true });
addEventListener('resize', requestTestimonialUpdate);
updateTestimonial();
```

- [ ] **Step 4: Run static checks**

Run the Step 1 command again. Expected: exit 0.

Run:

```powershell
node -e "const s=require('fs').readFileSync('index.html','utf8'); const b=s.match(/<!-- TESTIMONIALS -->([\s\S]*?)<!-- SEO INNER LINKS -->/)[1]; if((b.match(/class=\"testimonial-slide/g)||[]).length!==3) throw Error('expected 3 slides'); if(/wheel|touchmove/.test(b)) throw Error('scroll hijacking found')"
```

Expected: exit 0.

- [ ] **Step 5: Verify behavior in the browser**

Open `index.html`, sample the stage at the beginning, midpoint, and end of its wrapper, then reverse the samples. Confirm active sequence `1, 2, 3, 2, 1`, one visible slide, sticky release, correct image/quote pairing, mobile stacking, and no console errors.

- [ ] **Step 6: Review the diff**

Run `git diff -- index.html` and confirm no unrelated edits in the already-dirty file were overwritten.
