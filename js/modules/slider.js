// Sliders (Slider.astro): photos fade from one to the next on a timer, and
// the arrows (if any) step through them. Paused for visitors who've asked
// for reduced motion, and while the tab is in the background.
export function initSliders() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = [...slider.querySelectorAll('[data-slide]')];
    if (!slides.length) return;

    let current = 0;
    const show = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => slide.classList.toggle('is-active', n === current));
    };

    const interval = Number(slider.dataset.interval) || 4000;
    let timer = 0;
    const start = () => {
      clearInterval(timer);
      if (!reduceMotion && slides.length > 1) timer = setInterval(() => show(current + 1), interval);
    };

    slider.querySelector('[data-slider-prev]')?.addEventListener('click', () => { show(current - 1); start(); });
    slider.querySelector('[data-slider-next]')?.addEventListener('click', () => { show(current + 1); start(); });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(timer);
      else start();
    });

    show(0);
    slider.setAttribute('data-ready', '');
    start();
  });
}
