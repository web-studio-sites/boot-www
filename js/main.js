import { initConsent } from './modules/consent.js';
import { initHeader } from './modules/header.js';
import { initSliders } from './modules/slider.js';
import { initGallery } from './modules/gallery.js';
import { initForms } from './modules/forms.js';
import { initEvents } from './modules/events.js';

// Header/footer are composed at build time by Astro, so these can safely
// query the DOM straight away.
initConsent();
initHeader();
initSliders();
initGallery();
initForms();
initEvents();
