/* Screen 7 — Product detail + try-on entry (gallery upload → FASHN AI) */
(function () {
  const { DATA, t, L, num, price, icon, img, productImg, toast, getProduct, param } = window.Darpan;
  const AI = window.DarpanAI;

  // TODO: fetch the product from the API (GET /api/products/:id).
  const product = getProduct(param('id')) || getProduct(DATA.demoProductId);
  const header = document.getElementById('site-header');
  header.dataset.shop = product.shopIds[0];
  header.dataset.back = 'shop.html?shop=' + product.shopIds[0];

  // FASHN try-on works on garments only; shoes / glasses get the demo result.
  const aiSupported = product.category === 'clothing';
  const RESULT_KEY = 'darpan.tryon';

  let personPhoto = null; // resized data URL of the customer's photo
  let useDemo = false;    // visitor chose "see demo result" instead of adding a key

  function renderAiStatus() {
    const on = aiSupported && AI.isConfigured();
    document.getElementById('ai-status').innerHTML =
      '<span class="h-2 w-2 rounded-full ' + (on ? 'bg-emerald-400' : 'bg-amber-300') + '"></span>' + t(on ? 'ai.on' : 'ai.off');
    document.getElementById('clothing-note').classList.toggle('hidden', aiSupported);
  }

  window.renderPage = function () {
    document.getElementById('product-media').innerHTML =
      productImg(product, 'h-full w-full object-cover object-top') +
      '<span class="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-navy shadow">' +
        icon('sparkle', 'h-3.5 w-3.5 text-accent') + t('prod.tryBadge') + '</span>';

    document.getElementById('product-head').innerHTML =
      '<div class="flex items-start justify-between gap-3">' +
        '<h1 class="text-xl font-extrabold leading-snug text-slate-900 md:text-3xl">' + L(product.name) + '</h1>' +
        '<span class="shrink-0 text-xl font-extrabold text-navy md:text-2xl">' + price(product.price) + '</span>' +
      '</div>' +
      '<p class="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">' +
        '<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>' + t('prod.inStock') + '</p>';

    let options = '';
    if (product.sizes) {
      options +=
        '<div class="mt-5"><h2 class="text-sm font-bold text-slate-900">' + t('prod.size') + '</h2>' +
        '<div class="mt-2 flex flex-wrap gap-2">' +
        product.sizes.map((s, i) =>
          '<span class="flex h-10 min-w-[2.75rem] items-center justify-center rounded-xl border px-3 text-sm font-semibold ' +
          (i === 1 ? 'border-navy bg-navy text-white' : 'border-slate-200 text-slate-600') + '">' + (typeof s === 'number' ? num(s) : s) + '</span>'
        ).join('') + '</div></div>';
    }
    options +=
      '<div class="mt-4"><h2 class="text-sm font-bold text-slate-900">' + t('prod.color') + '</h2>' +
      '<div class="mt-2 flex gap-2.5">' +
      product.colors.map((c, i) =>
        '<span class="h-8 w-8 rounded-full border border-slate-200 ' + (i === 0 ? 'ring-2 ring-accent ring-offset-2' : '') + '" style="background:' + c + '"></span>'
      ).join('') + '</div></div>';
    document.getElementById('product-options').innerHTML = options;
    document.getElementById('product-desc').textContent = L(product.desc);

    renderAiStatus();
  };

  /* ---------------------------- bottom sheet ---------------------------- */
  const sheet = document.getElementById('sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  function openSheet() { sheet.classList.add('open'); backdrop.classList.add('open'); }
  function closeSheet() { sheet.classList.remove('open'); backdrop.classList.remove('open'); }

  document.getElementById('try-cta').addEventListener('click', openSheet);
  document.getElementById('sheet-close').addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  if (param('sheet') === '1') openSheet();

  /* --------------------------- gallery upload --------------------------- */
  const photoInput = document.getElementById('photo-input');

  function pickPhoto() {
    photoInput.value = '';
    photoInput.click();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-ai-settings]')) {
      AI.openSettings({ onSave: renderAiStatus });
      return;
    }
    if (!e.target.closest('[data-source="gallery"]')) return;
    closeSheet();
    // No key yet: offer to add one, or continue with a demo result.
    if (aiSupported && !AI.isConfigured() && !useDemo) {
      AI.openSettings({
        reason: t('ai.needKey'),
        onSave: () => { renderAiStatus(); pickPhoto(); },
        onDemo: () => { useDemo = true; pickPhoto(); }
      });
      return;
    }
    pickPhoto();
  });

  photoInput.addEventListener('change', async () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    showBusy('proc.preparing', 10);
    try {
      personPhoto = await AI.fileToDataUrl(file);
    } catch (e) {
      hideOverlay();
      toast(t('proc.badFile'));
      return;
    }
    run();
  });

  /* ------------------------- processing overlay ------------------------- */
  const overlay = document.getElementById('processing');
  const bar = document.getElementById('processing-bar');

  function showBusy(textKey, pct) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.getElementById('processing-busy').classList.remove('hidden');
    document.getElementById('processing-error').classList.add('hidden');
    document.getElementById('processing-text').textContent = t(textKey);
    bar.style.width = pct + '%';
  }

  function showError(message) {
    document.getElementById('processing-busy').classList.add('hidden');
    document.getElementById('processing-error').classList.remove('hidden');
    document.getElementById('processing-error-msg').textContent = message;
  }

  function hideOverlay() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  }

  function saveResult(data) {
    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(Object.assign({ productId: product.id }, data)));
    } catch (e) { /* storage full / blocked: result page falls back to demo */ }
    location.href = 'tryon-result.html?id=' + product.id;
  }

  async function run() {
    // Show the customer's own photo being "scanned".
    document.getElementById('processing-media').innerHTML =
      img(personPhoto, 'h-full w-full object-cover', '') + '<div class="scan-line"></div>';

    if (!aiSupported || !AI.isConfigured()) {
      showBusy('proc.demo', 40);
      setTimeout(() => { bar.style.width = '100%'; }, 50);
      setTimeout(() => saveResult({ mode: 'demo', person: personPhoto }), 1600);
      return;
    }

    let pct = 20;
    showBusy('proc.uploading', pct);
    try {
      const garment = await AI.productImageForApi(product.image);
      const resultUrl = await AI.tryOn({
        person: personPhoto,
        garment: garment,
        onStatus: (status) => {
          pct = Math.min(92, pct + (status === 'processing' ? 6 : 3));
          showBusy('proc.' + status, pct);
        }
      });
      bar.style.width = '100%';
      saveResult({ mode: 'ai', person: personPhoto, result: resultUrl });
    } catch (err) {
      let msg = err.message || '';
      if (err.timeout) msg = t('proc.timeout');
      else if (err.status === 401 || err.status === 402 || err.status === 403) msg = t('proc.authError') + ' (' + msg + ')';
      showError(msg);
    }
  }

  document.getElementById('processing-close').addEventListener('click', hideOverlay);
  document.getElementById('processing-retry').addEventListener('click', () => {
    if (personPhoto) run();
    else { hideOverlay(); pickPhoto(); }
  });
})();
