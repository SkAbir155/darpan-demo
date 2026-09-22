/* Screen 7 — Product detail + try-on (gallery photo → free IDM-VTON AI)
   ?retry=1 re-runs the AI with the photo from the last attempt. */
(function () {
  const { DATA, t, L, num, price, icon, img, productImg, toast, getProduct, param } = window.Darpan;
  const AI = window.DarpanAI;

  // TODO: fetch the product from the API (GET /api/products/:id).
  const product = getProduct(param('id')) || getProduct(DATA.demoProductId);
  const header = document.getElementById('site-header');
  header.dataset.shop = product.shopIds[0];
  header.dataset.back = 'shop.html?shop=' + product.shopIds[0];

  // The AI model dresses people in garments; shoes / glasses get the demo result.
  const aiSupported = product.category === 'clothing';
  const RESULT_KEY = 'darpan.tryon';

  let personPhoto = null; // resized data URL of the customer's photo
  let photoSize = null;   // { width, height } of that photo, for the result slider
  let cancelled = false;
  let garment = null;     // product photo blob, prepared in the background

  if (aiSupported) {
    AI.warmUp();
    garment = AI.garmentBlob(product.image);
    garment.catch(() => {}); // handled when used
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
    document.getElementById('clothing-note').classList.toggle('hidden', aiSupported);
  };

  /* --------------------------- gallery upload --------------------------- */
  const photoInput = document.getElementById('photo-input');

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-pick]')) {
      photoInput.value = '';
      photoInput.click();
    }
  });

  photoInput.addEventListener('change', async () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    personPhoto = null; // don't flash the previous attempt's photo
    showOverlay();
    setStage('preparing');
    try {
      const photo = await AI.fileToJpeg(file);
      personPhoto = photo.dataUrl;
      photoSize = { width: photo.width, height: photo.height };
      setMedia();
      start(photo.blob);
    } catch (e) {
      hideOverlay();
      toast(t('proc.badFile'));
    }
  });

  /* ---------------------------- progress UI ---------------------------- */
  const overlay = document.getElementById('processing');
  const bar = document.getElementById('processing-bar');
  const sub = document.getElementById('processing-sub');
  let etaTimer = null;

  const STEPS = ['preparing', 'connecting', 'processing'];

  function showOverlay() {
    cancelled = false;
    document.getElementById('processing-text').dataset.stage = '';
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setMedia();
  }

  // The customer's own photo (once chosen) is shown being "scanned".
  function setMedia() {
    document.getElementById('processing-media').innerHTML = personPhoto
      ? img(personPhoto, 'h-full w-full object-cover', '') + '<div class="scan-line"></div>'
      : productImg(product, 'h-full w-full object-cover') + '<div class="scan-line"></div>';
  }

  function hideOverlay() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    clearInterval(etaTimer);
    bar.style.transitionDuration = '0s';
    bar.style.width = '0%';
  }

  function moveBar(pct, seconds) {
    bar.style.transitionDuration = (seconds || 0.6) + 's';
    bar.style.width = pct + '%';
  }

  function renderSteps(stage) {
    const idx = Math.max(0, STEPS.indexOf(stage === 'queue' ? 'connecting' : stage));
    document.getElementById('processing-steps').innerHTML = STEPS.map((s, i) => {
      const state = i < idx ? 'done' : i === idx ? 'now' : 'todo';
      return (i ? '<li class="h-px w-4 bg-white/25" aria-hidden="true"></li>' : '') +
        '<li class="flex items-center gap-1.5 ' + (state === 'todo' ? 'text-white/40' : 'text-white') + '">' +
          '<span class="flex h-5 w-5 items-center justify-center rounded-full ' +
            (state === 'done' ? 'bg-emerald-400 text-navy-900' : state === 'now' ? 'bg-white text-navy' : 'bg-white/15') + '">' +
            (state === 'done' ? icon('check', 'h-3 w-3') : num(i + 1)) + '</span>' +
          t('proc.step' + (i + 1)) + '</li>';
    }).join('');
  }

  // Count down the model's own time estimate while the bar fills smoothly.
  function startEta(eta) {
    clearInterval(etaTimer);
    let left = Math.max(5, Math.round(eta || 25));
    moveBar(95, left);
    sub.textContent = t('proc.eta', { n: num(left) });
    etaTimer = setInterval(() => {
      left -= 1;
      sub.textContent = left > 0 ? t('proc.eta', { n: num(left) }) : t('proc.almost');
      if (left <= 0) clearInterval(etaTimer);
    }, 1000);
  }

  function setStage(stage, info) {
    info = info || {};
    renderSteps(stage);
    if (stage === 'preparing') {
      document.getElementById('processing-text').textContent = t('proc.preparing');
      sub.textContent = '';
      moveBar(10);
    } else if (stage === 'connecting') {
      document.getElementById('processing-text').textContent = t('proc.connecting');
      sub.textContent = t('proc.hint');
      moveBar(25, 3);
    } else if (stage === 'queue') {
      clearInterval(etaTimer);
      document.getElementById('processing-text').textContent = t('proc.queue', { n: num(info.position) });
      sub.textContent = t('proc.hint');
      moveBar(35, 2);
    } else if (stage === 'processing') {
      if (document.getElementById('processing-text').dataset.stage === 'processing') return;
      document.getElementById('processing-text').textContent = t('proc.processing');
      startEta(info.eta);
    } else if (stage === 'demo') {
      document.getElementById('processing-text').textContent = t('proc.demo');
      sub.textContent = '';
      moveBar(100, 1.4);
    }
    document.getElementById('processing-text').dataset.stage = stage;
  }

  /* ------------------------------ try-on ------------------------------ */
  function saveResult(data) {
    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(Object.assign({ productId: product.id, person: personPhoto, size: photoSize }, data)));
    } catch (e) { /* storage blocked: result page shows the stand-in demo */ }
    location.href = 'tryon-result.html?id=' + product.id;
  }

  async function start(personBlob) {
    if (!aiSupported) {
      setStage('demo');
      setTimeout(() => saveResult({ mode: 'demo' }), 1500);
      return;
    }
    try {
      const url = await AI.tryOn({
        person: personBlob,
        garment: await garment,
        description: product.name.en,
        onStatus: (s) => { if (!cancelled) setStage(s.stage, s); }
      });
      if (cancelled) return;
      moveBar(100, 0.3);
      saveResult({ mode: 'ai', result: url });
    } catch (err) {
      if (cancelled) return;
      // Free AI busy / out of daily quota / offline → show the demo result instead of an error.
      console.warn('AI try-on failed:', err);
      setStage('demo');
      setTimeout(() => saveResult({ mode: 'demo', fallback: true }), 1200);
    }
  }

  document.getElementById('processing-cancel').addEventListener('click', () => {
    cancelled = true;
    AI.cancel();
    hideOverlay();
  });

  // "AI দিয়ে আবার চেষ্টা করুন" from the result page: reuse the last photo.
  if (param('retry') === '1' && aiSupported) {
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(RESULT_KEY) || 'null'); } catch (e) { /* ignore */ }
    if (saved && saved.productId === product.id && saved.person) {
      personPhoto = saved.person;
      photoSize = saved.size || null;
      showOverlay();
      setStage('preparing');
      AI.dataUrlToBlob(saved.person).then(start);
    }
  }
})();
