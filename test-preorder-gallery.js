const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

for (const image of ['Photos/Lifestyle/Everyday/12.jpg', 'Photos/Lifestyle/Sleep/14.jpg', 'Photos/Product/Studio/black_mask.jpg', 'Photos/Product/Studio/pitch_midnight_mask.jpg', 'Photos/Product/Studio/burgundy_mask.jpg', 'Photos/Product/Studio/peach_mask.jpg']) {
  if (!html.includes(image)) throw new Error('Missing gallery image: ' + image);
}
if (!html.includes('class="preorder-gallery"')) throw new Error('Missing preorder gallery');
if (!html.includes('data-gallery-thumb')) throw new Error('Missing gallery thumbnails');
if (!html.includes('id="preorder-main-image" src="Photos/Product/Studio/black_mask.jpg"')) throw new Error('black_mask.jpg must be the first gallery image');
for (const image of ['black_mask.jpg', 'pitch_midnight_mask.jpg', 'burgundy_mask.jpg', 'peach_mask.jpg']) {
  if (!html.includes('data-color-mask="Photos/Product/Studio/' + image + '"')) throw new Error('Missing color image: ' + image);
}
if (!html.includes('grid-template-columns: 76px 1fr')) throw new Error('Thumbnails must sit beside the main image');
if (!html.includes('width: min(100%, calc(100vw - 3rem))')) throw new Error('Mobile preorder checkout must fit and center in the viewport');
if (!html.includes("'pointerenter'")) throw new Error('Thumbnails must preview on hover');
if (!html.includes("'pointerleave'")) throw new Error('Hover preview must revert on mouse-out');
if (!html.includes("'touchstart'")) throw new Error('Gallery must record the start of a swipe');
if (!html.includes("'touchend'")) throw new Error('Gallery must support swipe gestures');
if (!html.includes('Math.abs(swipeDistance) < 40')) throw new Error('Gallery must ignore short swipes');
if (!html.includes('selectedGalleryThumb = galleryThumbs[nextIndex]')) throw new Error('Gallery swipe must select the next image');
if (!html.includes('if (window.location.hash)')) throw new Error('Deep links must bypass the hero scroll lock');
if (html.includes('height: 300vh')) throw new Error('Testimonials must not use scroll-driven slides');
if (!html.includes('data-testimonial-next') || !html.includes('data-testimonial-prev')) throw new Error('Testimonials need arrow controls');
if (!html.includes("'touchend'")) throw new Error('Testimonials need swipe controls');
