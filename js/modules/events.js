// Upcoming events (UpcomingEvents.astro): past events are left out when the
// site is built, but the site may not be rebuilt for a while, so the
// visitor's browser also hides any whose last day has gone. If none are
// left, the "check back soon" line shows instead.
export function initEvents() {
  const box = document.querySelector('[data-events]');
  if (!box) return;

  // Today in the UK as YYYY-MM-DD, matching the dates on each event.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
  const events = [...box.querySelectorAll('[data-event-end]')];
  // In the CMS preview past events stay visible (faded) for editing.
  if (box.querySelector('.event--past')) return;

  events.forEach((event) => {
    if (event.dataset.eventEnd < today) event.hidden = true;
  });

  const empty = box.querySelector('[data-events-empty]');
  if (empty && events.length && events.every((event) => event.hidden)) empty.hidden = false;
}
