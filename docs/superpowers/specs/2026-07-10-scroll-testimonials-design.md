# Scroll-controlled testimonials

## Goal

Replace the six-card testimonial grid in `index.html` with one immersive testimonial displayed at a time, while preserving approximately the current section's overall visual footprint.

## Content

- Use exactly three testimonials and the current second, third, and last images, in that order:
  1. `Photos/Gallery/8 (2).jpg`
  2. `Photos/Gallery/8 (3).jpg`
  3. `Photos/Gallery/frame_001186.jpg`
- Improve each quote while retaining its original meaning.
- Give one important phrase in each quote a distinct violet-highlight treatment.
- Show the person's name and role alongside the quote.

## Interaction

- The testimonial stage becomes sticky while its scroll region passes through the viewport.
- Only one large image and its matching quote are visible at a time.
- Normal downward page scrolling advances from testimonial 1 to 2 to 3.
- Normal upward page scrolling reverses from testimonial 3 to 2 to 1.
- Do not intercept wheel or touch events. Derive the active testimonial from the scroll position so keyboard, touch, trackpad, and scrollbar navigation remain native.
- After the third testimonial, ordinary scrolling continues to the next page section.

## Layout and styling

- Desktop: large portrait on the left and large quote block on the right in one full-width stage.
- Mobile: stack the portrait above the quote and keep all text readable without horizontal scrolling.
- Include a small `01 / 03` indicator and three-segment progress marker.
- Crossfade and slightly translate image/text between active states; respect `prefers-reduced-motion` by removing transitional motion.
- Keep the existing Dreamz dark palette and typography.

## Implementation

- Change only `index.html`; use its existing CSS and JavaScript structure.
- Render the three testimonial states in semantic HTML so all content remains available without JavaScript.
- Add a small scroll-position handler that updates the active state, scheduled through `requestAnimationFrame` to avoid redundant work.
- No dependencies, carousel library, wheel hijacking, autoplay, navigation buttons, or speculative abstraction.

## Verification

- Confirm exactly three testimonial images remain and their paths match the required order.
- Confirm scrolling down and up activates all three states in both directions.
- Confirm the stage releases before and after its scroll region.
- Check desktop and mobile layouts and reduced-motion behavior in the browser.
