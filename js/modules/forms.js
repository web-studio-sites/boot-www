// Forms (WebForm.astro): sent to Web3Forms without leaving the page, then
// the thank-you message from the CMS shows in place of the form. Without
// this script the forms still work, using Web3Forms' own thank-you page.
export function initForms() {
  document.querySelectorAll('[data-web-form]').forEach((form) => {
    if (!form.getAttribute('action')) return;

    const wrap = form.closest('[data-form-wrap]');
    const status = form.querySelector('[data-form-status]');
    const thanks = wrap?.querySelector('[data-form-thanks]');
    const button = form.querySelector('button[type="submit"]');
    const email = document.querySelector('a[href^="mailto:"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (button) button.disabled = true;
      if (status) { status.hidden = false; status.textContent = 'Sending…'; }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) throw new Error(result.message || String(response.status));
        if (thanks) form.replaceWith(thanks.content.cloneNode(true));
        else if (status) status.textContent = 'Thanks, your message has been sent.';
      } catch {
        if (button) button.disabled = false;
        if (status) {
          const address = email ? email.getAttribute('href').replace('mailto:', '') : '';
          status.textContent = address
            ? `Sorry, your message couldn’t be sent. Please try again, or email ${address}.`
            : 'Sorry, your message couldn’t be sent. Please try again.';
        }
      }
    });
  });
}
