/* =====================================================================
   দর্পণ — FASHN AI virtual try-on client
   ---------------------------------------------------------------------
   Docs: https://docs.fashn.ai  (POST /v1/run, then poll GET /v1/status/:id)

   This is a static site, so there is no server to hide an API key in.
   Two ways to connect:
     1. API key  — pasted in "AI সেটিংস", saved in this browser's
                   localStorage only (never in the code / on GitHub).
     2. Proxy URL — a relay you host (see worker/fashn-proxy.js) that adds
                   the key server-side. Use this for a real launch.
   Needs app.js (window.Darpan) for translations and toasts.
   ===================================================================== */

window.DarpanAI = (function () {
  'use strict';

  const API_BASE = 'https://api.fashn.ai/v1';
  const KEY_STORE = 'darpan.fashnKey';
  const PROXY_STORE = 'darpan.fashnProxy';
  const MODEL = 'tryon-v1.6';
  const POLL_MS = 2500;
  const TIMEOUT_MS = 180000;
  const MAX_SIDE = 1280; // resize photos before upload (faster, cheaper)

  // Public URL of this site, used if a garment photo can't be read locally.
  const SITE_URL = 'https://skabir155.github.io/darpan-demo/';

  /* ---------------------------- config ---------------------------- */
  function read(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function write(k, v) {
    try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) { /* ignore */ }
  }

  function getConfig() {
    return { key: read(KEY_STORE), proxy: read(PROXY_STORE).replace(/\/+$/, '') };
  }
  function setConfig(cfg) {
    write(KEY_STORE, (cfg.key || '').trim());
    write(PROXY_STORE, (cfg.proxy || '').trim());
  }
  function isConfigured() {
    const c = getConfig();
    return Boolean(c.key || c.proxy);
  }

  /* ---------------------------- images ---------------------------- */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error('image-load'));
      im.src = src;
    });
  }

  // Draw to a canvas (max MAX_SIDE px) and export as a JPEG data URL.
  function toJpegDataUrl(im) {
    const scale = Math.min(1, MAX_SIDE / Math.max(im.naturalWidth, im.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(im.naturalWidth * scale);
    c.height = Math.round(im.naturalHeight * scale);
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(im, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.9);
  }

  // A photo chosen from the phone gallery → resized JPEG data URL.
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type)) return reject(new Error('bad-file'));
      const reader = new FileReader();
      reader.onload = () => loadImage(reader.result).then((im) => resolve(toJpegDataUrl(im)), reject);
      reader.onerror = () => reject(new Error('bad-file'));
      reader.readAsDataURL(file);
    });
  }

  // A product photo from /Images → data URL; if the browser blocks reading it
  // (e.g. opened from file://), fall back to its public GitHub Pages URL.
  async function productImageForApi(relativeSrc) {
    try {
      return toJpegDataUrl(await loadImage(relativeSrc));
    } catch (e) {
      return SITE_URL + relativeSrc;
    }
  }

  /* ------------------------------ API ------------------------------ */
  async function call(path, options) {
    const cfg = getConfig();
    const base = cfg.proxy || API_BASE;
    const headers = { 'Content-Type': 'application/json' };
    if (!cfg.proxy) headers.Authorization = 'Bearer ' + cfg.key;

    const res = await fetch(base + path, Object.assign({ headers }, options));
    let body = null;
    try { body = await res.json(); } catch (e) { /* non-JSON error */ }
    if (!res.ok) {
      const msg = (body && (body.message || (body.error && body.error.message) || body.error)) || ('HTTP ' + res.status);
      const err = new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      err.status = res.status;
      throw err;
    }
    return body;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /**
   * Run a try-on and wait for the result.
   * @param {{person: string, garment: string, onStatus?: Function}} opts
   *   person / garment: image URL or data URL.
   * @returns {Promise<string>} URL of the generated image.
   */
  async function tryOn(opts) {
    const onStatus = opts.onStatus || function () {};
    onStatus('uploading');
    const run = await call('/run', {
      method: 'POST',
      body: JSON.stringify({
        model_name: MODEL,
        inputs: {
          model_image: opts.person,
          garment_image: opts.garment,
          category: 'auto',
          garment_photo_type: 'auto',
          mode: 'balanced',
          output_format: 'jpeg',
          num_samples: 1
        }
      })
    });
    if (!run || !run.id) throw new Error((run && run.error && run.error.message) || 'No prediction id');

    const started = Date.now();
    while (Date.now() - started < TIMEOUT_MS) {
      await sleep(POLL_MS);
      const st = await call('/status/' + encodeURIComponent(run.id), { method: 'GET' });
      if (st.status === 'completed') {
        const out = st.output && st.output[0];
        if (!out) throw new Error('Empty result');
        return out;
      }
      if (st.status === 'failed' || st.status === 'canceled') {
        throw new Error((st.error && (st.error.message || st.error.name)) || 'Try-on failed');
      }
      onStatus(st.status === 'in_queue' || st.status === 'starting' ? 'queue' : 'processing');
    }
    const err = new Error('timeout');
    err.timeout = true;
    throw err;
  }

  /* ------------------------- settings dialog ------------------------ */
  function openSettings(opts) {
    const { t, icon, toast } = window.Darpan;
    const cfg = getConfig();
    close();

    const wrap = document.createElement('div');
    wrap.id = 'ai-settings';
    wrap.className = 'fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/50 p-0 md:items-center md:p-6';
    wrap.innerHTML =
      '<div class="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-lift md:rounded-3xl" role="dialog" aria-modal="true" aria-labelledby="ai-title">' +
        '<div class="flex items-start justify-between gap-3">' +
          '<div class="flex items-center gap-3">' +
            '<span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">' + icon('sparkle', 'h-6 w-6') + '</span>' +
            '<h2 id="ai-title" class="text-lg font-extrabold text-navy">' + t('ai.title') + '</h2>' +
          '</div>' +
          '<button type="button" data-ai-close class="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100" aria-label="' + t('ai.close') + '">' + icon('close', 'h-5 w-5') + '</button>' +
        '</div>' +
        (opts && opts.reason ? '<p class="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-[13px] font-medium text-amber-900">' + opts.reason + '</p>' : '') +
        '<p class="mt-3 text-sm text-slate-600">' + t('ai.sub') + '</p>' +
        '<label for="ai-key" class="mt-4 block text-sm font-semibold text-slate-700">' + t('ai.keyLabel') + '</label>' +
        '<input id="ai-key" type="password" autocomplete="off" spellcheck="false" value="' + cfg.key.replace(/"/g, '&quot;') + '" placeholder="fa-••••••••••••" class="mt-1.5 h-12 w-full rounded-xl border border-slate-200 px-3.5 font-mono text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">' +
        '<a href="https://app.fashn.ai/api" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">' + icon('link', 'h-3.5 w-3.5') + t('ai.getKey') + '</a>' +
        '<details class="mt-3 rounded-xl bg-slate-50 px-3 py-2"' + (cfg.proxy ? ' open' : '') + '>' +
          '<summary class="cursor-pointer text-xs font-semibold text-slate-600">' + t('ai.advanced') + '</summary>' +
          '<input id="ai-proxy" type="url" value="' + cfg.proxy.replace(/"/g, '&quot;') + '" placeholder="https://darpan-ai.example.workers.dev" class="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-accent">' +
          '<p class="mt-1 text-[11px] text-slate-500">' + t('ai.proxyHint') + '</p>' +
        '</details>' +
        '<p class="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">' + icon('lock', 'h-3.5 w-3.5') + t('ai.warn') + '</p>' +
        '<div class="mt-4 grid grid-cols-2 gap-2.5">' +
          '<button type="button" id="ai-clear" class="rounded-2xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-600">' + t('ai.clear') + '</button>' +
          '<button type="button" id="ai-save" class="rounded-2xl bg-navy py-3 text-sm font-bold text-white shadow-lift">' + t('ai.save') + '</button>' +
        '</div>' +
        (opts && opts.onDemo
          ? '<button type="button" id="ai-demo" class="mt-3 w-full text-center text-sm font-semibold text-accent hover:underline">' + t('ai.useDemo') + ' →</button>'
          : '') +
      '</div>';
    document.body.appendChild(wrap);
    document.getElementById('ai-key').focus();

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap || e.target.closest('[data-ai-close]')) close();
    });
    document.getElementById('ai-save').addEventListener('click', () => {
      setConfig({ key: document.getElementById('ai-key').value, proxy: document.getElementById('ai-proxy').value });
      close();
      toast(t('ai.saved'));
      if (opts && opts.onSave) opts.onSave();
    });
    const demoBtn = document.getElementById('ai-demo');
    if (demoBtn) demoBtn.addEventListener('click', () => { close(); opts.onDemo(); });
    document.getElementById('ai-clear').addEventListener('click', () => {
      setConfig({ key: '', proxy: '' });
      close();
      toast(t('ai.cleared'));
      if (opts && opts.onSave) opts.onSave();
    });
  }

  function close() {
    const el = document.getElementById('ai-settings');
    if (el) el.remove();
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  return { getConfig, setConfig, isConfigured, fileToDataUrl, productImageForApi, tryOn, openSettings };
})();
