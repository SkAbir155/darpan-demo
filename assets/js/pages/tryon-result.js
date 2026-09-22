/* Screen 8 — Try-on result (before / after)
   Modes:
     ai    — real AI output (IDM-VTON) + the customer's uploaded photo
     demo  — customer's photo with the item laid over it (shoes/glasses, or AI busy)
     none  — nothing uploaded yet: stand-in photo from /Images (screenshot mode) */
(function () {
  const { DATA, t, L, num, price, icon, img, productImg, toast, getProduct, param } = window.Darpan;

  const product = getProduct(param('id')) || getProduct(DATA.demoProductId);
  const header = document.getElementById('site-header');
  header.dataset.shop = product.shopIds[0];
  header.dataset.back = 'product.html?id=' + product.id;
  document.getElementById('retry-btn').href = 'product.html?id=' + product.id + '#try';

  // Result saved by product.js (same tab only).
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem('darpan.tryon') || 'null'); } catch (e) { /* ignore */ }
  if (!saved || saved.productId !== product.id) saved = null;
  const mode = saved ? saved.mode : 'none';

  // Where the item sits on an unknown uploaded photo: [left, top, width, height] %.
  const GENERIC_BOX = { clothing: [24, 28, 52, 44], glasses: [34, 14, 32, 10], shoes: [26, 80, 48, 18] };
  const standIn = DATA.tryOnPeople[product.gender === 'men' ? 'men' : 'women'];

  const photo = (src) => img(src, 'absolute inset-0 h-full w-full object-cover', '');

  function overlay(box, blend) {
    const [left, top, width, height] = box;
    return '<div class="garment-overlay absolute overflow-hidden' + (blend === 'multiply' ? ' mix-blend-multiply' : '') +
      '" style="left:' + left + '%;top:' + top + '%;width:' + width + '%;height:' + height + '%">' +
      productImg(product, 'h-full w-full object-cover object-[center_55%]') + '</div>';
  }

  function badge(key) {
    return '<span class="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy shadow">' +
      icon('sparkle', 'h-3.5 w-3.5 text-accent') + t(key) + '</span>';
  }

  window.renderPage = function () {
    let before, after;
    if (mode === 'ai') {
      before = photo(saved.person);
      after = photo(saved.result) + badge('res.aiReal');
    } else if (mode === 'demo') {
      before = photo(saved.person);
      after = photo(saved.person) + overlay(GENERIC_BOX[product.category]) + badge('res.demoBadge');
    } else {
      before = photo(standIn.image);
      after = photo(standIn.image) + overlay(standIn.boxes[product.category], standIn.blend) + badge('res.demoBadge');
    }
    document.getElementById('layer-before').innerHTML = before;
    document.getElementById('layer-after').innerHTML = after;

    document.getElementById('result-badge').innerHTML =
      icon('sparkle', 'h-3.5 w-3.5') + t(mode === 'ai' ? 'res.aiReal' : 'res.demoBadge');
    document.getElementById('result-note').textContent = t(mode === 'ai' ? 'res.noteReal' : 'res.note');

    // Free AI was busy: say so kindly and offer a one-tap retry with the same photo.
    document.getElementById('result-notice').innerHTML = saved && saved.fallback
      ? '<div class="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 md:mt-4">' +
          '<span class="flex items-center gap-2">' + icon('alert', 'h-5 w-5 shrink-0') + t('res.fallback') + '</span>' +
          '<a href="product.html?id=' + product.id + '&retry=1" class="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-sm font-bold text-white">' +
            icon('refresh', 'h-4 w-4') + t('res.retryAi') + '</a>' +
        '</div>'
      : '';

    const fit = 92; // mock score
    document.getElementById('result-product').innerHTML =
      '<div class="flex items-center gap-3 rounded-2xl border border-slate-100 p-2.5 shadow-card md:p-4">' +
        '<div class="h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 md:h-20 md:w-16">' + productImg(product, 'h-full w-full object-cover') + '</div>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="truncate text-sm font-bold text-slate-900 md:text-base">' + L(product.name) + '</p>' +
          '<p class="text-sm font-bold text-navy md:text-base">' + price(product.price) + '</p>' +
        '</div>' +
        '<div class="shrink-0 rounded-xl bg-emerald-50 px-3 py-1.5 text-center">' +
          '<p class="text-lg font-extrabold leading-tight text-emerald-600">' + num(fit) + '%</p>' +
          '<p class="text-[10px] font-semibold text-emerald-700">' + t('res.fit') + '</p>' +
        '</div>' +
      '</div>';
  };

  /* ---------- Compare slider ---------- */
  const compare = document.getElementById('compare');
  // Match the frame to the customer's photo so before and after line up exactly.
  if (saved && saved.size && saved.size.width && saved.size.height) {
    compare.style.aspectRatio = saved.size.width + ' / ' + saved.size.height;
  }
  document.getElementById('compare-range').addEventListener('input', (e) => {
    compare.style.setProperty('--pos', e.target.value + '%');
  });

  /* ---------- Download ---------- */
  document.getElementById('download-btn').addEventListener('click', async () => {
    if (mode !== 'ai') {
      toast(t('res.downloaded'));
      return;
    }
    try {
      const blob = await (await fetch(saved.result)).blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'darpan-tryon-' + product.id + '.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } catch (e) {
      // The CDN may block cross-origin reads — let the user save it from a new tab.
      window.open(saved.result, '_blank', 'noopener');
      toast(t('res.downloadFail'));
    }
  });

  // TODO: open WhatsApp / call / checkout for the shop.
  document.getElementById('order-btn').addEventListener('click', () => toast(t('res.orderToast')));
})();
