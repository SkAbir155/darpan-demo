/* Screen 8 — Mock try-on result (before / after) */
(function () {
  const { DATA, t, L, num, price, icon, img, productImg, toast, getProduct, param } = window.Darpan;

  const product = getProduct(param('id')) || getProduct(DATA.demoProductId);
  const person = DATA.tryOnPerson;
  const header = document.getElementById('site-header');
  header.dataset.shop = product.shopId;
  header.dataset.back = 'product.html?id=' + product.id;
  document.getElementById('retry-btn').href = 'product.html?id=' + product.id + '&sheet=1';

  // TODO: replace this fake composite with the image returned by the garment-fusion API.
  function personImg() {
    return img(person.image, person.fallback, 'absolute inset-0 h-full w-full object-cover', '');
  }

  window.renderPage = function () {
    document.getElementById('layer-before').innerHTML = personImg();

    // "After" = same portrait + the garment photo blended over the torso.
    document.getElementById('layer-after').innerHTML =
      personImg() +
      '<div class="garment-overlay absolute left-[29%] top-[14%] h-[32%] w-[44%] overflow-hidden mix-blend-multiply">' +
        productImg(product, 'h-full w-full object-cover object-[center_55%]') +
      '</div>' +
      '<div class="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent"></div>' +
      '<span class="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy shadow">' +
        icon('sparkle', 'h-3.5 w-3.5 text-accent') + 'দর্পণ AI</span>';

    const fit = 92; // mock score
    document.getElementById('result-product').innerHTML =
      '<div class="flex items-center gap-3 rounded-2xl border border-slate-100 p-2.5 shadow-card">' +
        '<div class="h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">' + productImg(product, 'h-full w-full object-cover') + '</div>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="truncate text-sm font-bold text-slate-900">' + L(product.name) + '</p>' +
          '<p class="text-sm font-bold text-navy">' + price(product.price) + '</p>' +
        '</div>' +
        '<div class="shrink-0 rounded-xl bg-emerald-50 px-3 py-1.5 text-center">' +
          '<p class="text-lg font-extrabold leading-tight text-emerald-600">' + num(fit) + '%</p>' +
          '<p class="text-[10px] font-semibold text-emerald-700">' + t('res.fit') + '</p>' +
        '</div>' +
      '</div>';
  };

  /* ---------- Compare slider ---------- */
  const compare = document.getElementById('compare');
  document.getElementById('compare-range').addEventListener('input', (e) => {
    compare.style.setProperty('--pos', e.target.value + '%');
  });

  // TODO: download the real generated image from the API.
  document.getElementById('download-btn').addEventListener('click', () => toast(t('res.downloaded')));
  // TODO: open WhatsApp / call / checkout for the shop.
  document.getElementById('order-btn').addEventListener('click', () => toast(t('res.orderToast')));
})();
