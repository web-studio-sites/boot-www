// Sticky header: the logo shrinks once the page scrolls, the current page's
// link is highlighted, and on phones the toggle opens and closes the menu.
const MOBILE_QUERY = '(max-width: 767px)';

export function initHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-nav-toggle]');
  const mobileMedia = window.matchMedia(MOBILE_QUERY);

  const onScroll = () => {
    const scrolled = (window.scrollY || document.documentElement.scrollTop || 0) > 60;
    header.classList.toggle('is-scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight whichever nav item matches the page we're actually on.
  // document.baseURI rather than location.origin: they're the same on the
  // real site, but in the CMS live preview the page is shown via srcdoc,
  // where location.origin is "null" and would throw here.
  const path = window.location.pathname;
  header.querySelectorAll('[data-nav-link]').forEach((link) => {
    const url = new URL(link.getAttribute('href'), document.baseURI);
    if (url.hash) return;
    if (url.pathname === '/' ? path === '/' : path.startsWith(url.pathname)) {
      link.classList.add('is-current');
      link.setAttribute('aria-current', 'page');
    }
  });

  if (!toggle) return;

  const setOpen = (open) => {
    header.classList.toggle('is-nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-nav-open')));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close the menu once a link is followed (e.g. "Contact" on the homepage
  // only scrolls, so the menu would otherwise stay open over the page).
  header.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMedia.matches) setOpen(false);
    });
  });

  mobileMedia.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });
}
