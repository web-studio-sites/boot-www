// Single pictures that open larger (links marked data-zoom, e.g. an event's
// poster): shown in the same lightbox style as the Gallery, closing with
// Esc, the cross or a click outside the picture. Without this script the
// link simply opens the image file.
const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export function initZoom() {
  const links = [...document.querySelectorAll('a[data-zoom]')];
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.setAttribute('aria-label', 'Picture');
  box.innerHTML = `<img class="lightbox__img" alt=""><button type="button" class="lightbox__btn lightbox__btn--close" aria-label="Close">${CLOSE_ICON}</button>`;
  document.body.appendChild(box);
  const img = box.querySelector('img');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const source = link.querySelector('img');
      img.src = link.href;
      img.alt = source ? source.alt : '';
      box.showModal();
    });
  });

  box.querySelector('button').addEventListener('click', () => box.close());
  // A click on the dark backdrop (the dialog itself, not the picture) closes it.
  box.addEventListener('click', (event) => {
    if (event.target === box) box.close();
  });
}
