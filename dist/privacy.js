/* Cookie preferences are separate from consent to submit a quote/order. No personal fields are stored here. */
(() => {
  'use strict';
  const KEY = 'pvihcm.privacy.v1';
  const VERSION = '351-2026-03-30-v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const dialog = document.getElementById('privacy-dialog');
  if (!dialog) return;
  let returnFocus = null;
  let current = read();
  const inputs = ['analytics', 'marketing', 'media'];
  function read() {
    try {
      const record = JSON.parse(localStorage.getItem(KEY));
      if (record?.version !== VERSION || !Number.isFinite(record.at) || record.at > Date.now() || Date.now() - record.at > MAX_AGE) return null;
      if (!inputsValid(record)) return null;
      return record;
    } catch { return null; }
  }
  function inputsValid(record) { return ['analytics', 'marketing', 'media'].every(k => typeof record[k] === 'boolean'); }
  function optionalAllowed(key) { return current?.[key] === true; }
  function updateMedia() {
    document.querySelectorAll('iframe[data-privacy-src]').forEach(frame => {
      const allowed = optionalAllowed('media');
      const cover = frame.parentElement.querySelector('.privacy-embed-cover');
      if (allowed) { frame.src = frame.dataset.privacySrc; frame.hidden = false; }
      else { frame.removeAttribute('src'); frame.hidden = true; }
      if (cover) cover.hidden = allowed;
    });
  }
  function notify() {
    updateMedia();
    window.dispatchEvent(new CustomEvent('pvi:privacy-change', { detail: { analytics: optionalAllowed('analytics'), marketing: optionalAllowed('marketing'), media: optionalAllowed('media') } }));
  }
  function open(opener, options = false) {
    returnFocus = opener || null;
    inputs.forEach(key => { dialog.querySelector(`[name="privacy-${key}"]`).checked = optionalAllowed(key); });
    setOptions(options);
    // A non-modal bottom banner lets visitors continue reading and scrolling.
    dialog.setAttribute('open', '');
    document.documentElement.classList.add('privacy-banner-open');
    if (opener) dialog.querySelector('#privacy-title').focus({ preventScroll: true });
    syncHeight();
  }
  function setOptions(expanded) {
    const options = dialog.querySelector('.privacy-options');
    options.hidden = !expanded;
    options.open = expanded;
    dialog.querySelector('.privacy-note').hidden = !expanded;
    dialog.classList.toggle('is-settings', expanded);
    const button = dialog.querySelector('[data-privacy-options]');
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Thu gọn' : 'Tùy chọn';
    syncHeight();
  }
  function syncHeight() {
    document.documentElement.style.setProperty('--privacy-banner-height', dialog.getBoundingClientRect().height + 'px');
  }
  function close() {
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove('privacy-banner-open');
    if (returnFocus?.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus({ preventScroll: true });
  }
  function dismiss() {
    try { sessionStorage.setItem(KEY + '.dismissed', VERSION); } catch { /* storage may be blocked */ }
    close(); // Closing never grants consent.
  }
  function clearOptionalCookies() {
    const domains = ['', location.hostname, '.' + location.hostname, '.pvihcm.com'];
    document.cookie.split(';').forEach(item => {
      const name = item.trim().split('=')[0];
      const analyticsCookie = /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name);
      const marketingCookie = /^(_gcl_|_gac_)/.test(name);
      if (!((analyticsCookie && !optionalAllowed('analytics')) || (marketingCookie && !optionalAllowed('marketing')))) return;
      domains.forEach(domain => { document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? '; domain=' + domain : ''}`; });
    });
  }
  function save(values, persist = true) {
    const revoked = (optionalAllowed('analytics') && !values.analytics) || (optionalAllowed('marketing') && !values.marketing);
    current = { version: VERSION, at: Date.now(), ...values };
    if (persist) {
      try { localStorage.setItem(KEY, JSON.stringify(current)); sessionStorage.removeItem(KEY + '.dismissed'); } catch { /* Honor the in-memory choice even without storage. */ }
    }
    notify();
    if (!values.analytics || !values.marketing) clearOptionalCookies();
    close();
    // Unload previously permitted tags after withdrawal, while retaining the new denied state.
    if (revoked) location.reload();
  }
  dialog.querySelector('[data-privacy-close]').addEventListener('click', dismiss);
  dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.open) { event.preventDefault(); dismiss(); } });
  dialog.querySelector('[data-privacy-options]').addEventListener('click', () => setOptions(!dialog.classList.contains('is-settings')));
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(syncHeight).observe(dialog);
  dialog.querySelector('[data-privacy-accept]').addEventListener('click', () => save({ analytics: true, marketing: true, media: true }));
  dialog.querySelector('[data-privacy-reject]').addEventListener('click', () => save({ analytics: false, marketing: false, media: false }));
  dialog.querySelector('[data-privacy-save]').addEventListener('click', () => save(Object.fromEntries(inputs.map(key => [key, dialog.querySelector(`[name="privacy-${key}"]`).checked]))));
  document.querySelectorAll('[data-privacy-open], [data-privacy-enable-media]').forEach(button => button.addEventListener('click', () => open(button, true)));
  document.querySelectorAll('.privacy-toc a').forEach(link => link.addEventListener('click', () => {
    const section = document.getElementById(link.hash.slice(1));
    if (section?.tagName === 'DETAILS') section.open = true;
  }));
  window.addEventListener('storage', event => {
    if (event.key !== KEY) return;
    const next = read();
    save({ analytics: next?.analytics === true, marketing: next?.marketing === true, media: next?.media === true }, false);
    current = next;
  });
  notify();
  clearOptionalCookies();
  let dismissed = false;
  try { dismissed = sessionStorage.getItem(KEY + '.dismissed') === VERSION; } catch { /* show notice if storage is unavailable */ }
  // Every page, including the policy itself, shows the banner on the first visit.
  if (!current && !dismissed) open();
})();
