/* Screen 7 — Product detail + try-on entry */
(function () {
  const { DATA, t, L, num, price, icon, productImg, getProduct, param } = window.Darpan;

  // TODO: fetch the product from the API (GET /api/products/:id).
  const product = getProduct(param('id')) || getProduct(DATA.demoProductId);
  document.getElementById('site-header').dataset.shop = product.shopId;
  document.getElementById('site-header').dataset.back = 'shop.html?shop=' + product.shopId;

  window.renderPage = function () {
    document.getElementById('product-media').innerHTML =
      productImg(product, 'h-full w-full object-cover object-top') +
      '<span class="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-navy shadow">' +
        icon('sparkle', 'h-3.5 w-3.5 text-accent') + t('prod.tryBadge') + '</span>';

    document.getElementById('product-head').innerHTML =
      '<div class="flex items-start justify-between gap-3">' +
        '<h1 class="text-xl font-extrabold leading-snug text-slate-900">' + L(product.name) + '</h1>' +
        '<span class="shrink-0 text-xl font-extrabold text-navy">' + price(product.price) + '</span>' +
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
    document.getElementById('processing-media').innerHTML =
      productImg(product, 'h-full w-full object-cover') + '<div class="scan-line"></div>';
  };

  /* ---------- Bottom sheet ---------- */
  const sheet = document.getElementById('sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  function openSheet() { sheet.classList.add('open'); backdrop.classList.add('open'); }
  function closeSheet() { sheet.classList.remove('open'); backdrop.classList.remove('open'); }

  document.getElementById('try-cta').addEventListener('click', openSheet);
  document.getElementById('sheet-close').addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  if (param('sheet') === '1') openSheet();

  /* ---------- Fake try-on processing ---------- */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-source]')) return;
    closeSheet();
    const overlay = document.getElementById('processing');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => { document.getElementById('processing-bar').style.width = '100%'; }, 50);

    // TODO: replace with real garment-fusion API call:
    //   upload the customer photo + product.id → POST /api/try-on → poll for the result image.
    setTimeout(() => { location.href = 'tryon-result.html?id=' + product.id; }, 2400);
  });
})();
