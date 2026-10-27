// Gallery: clicking a photo opens it larger in a lightbox, which has its own
// arrows (and the arrow keys), and closes with Esc, the cross or a click
// outside the photo. Without this script each photo links to the image file.
export function initGallery() {
  const gallery = document.querySelector('[data-gallery]');
  const box = gallery?.querySelector('[data-lightbox]');
  const img = box?.querySelector('[data-lightbox-img]');
  if (!box || !img || typeof box.showModal !== 'function') return;

  const links = [...gallery.querySelectorAll('[data-gallery-open]')];
  let shown = 0;

  const show = (i) => {
    shown = (i + links.length) % links.length;
    const source = links[shown].querySelector('img');
    img.src = links[shown].href;
    img.alt = source ? source.alt : '';
  };

  links.forEach((link, i) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      show(i);
      box.showModal();
    });
  });

  box.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(shown - 1));
  box.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(shown + 1));
  box.querySelector('[data-lightbox-close]')?.addEventListener('click', () => box.close());

  // A click on the dark backdrop (the dialog itself, not the photo or buttons) closes it.
  box.addEventListener('click', (event) => {
    if (event.target === box) box.close();
  });

  box.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(shown - 1);
    if (event.key === 'ArrowRight') show(shown + 1);
  });
}
