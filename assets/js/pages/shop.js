/* Screen 6 — Customer-facing storefront (opened from the shop's QR code) */
(function () {
  const { DATA, t, L, num, price, icon, productImg, getShop, shopProducts, CATEGORY_ICON } = window.Darpan;

  // TODO: resolve the shop from the real short link (/s/:slug) via the API.
  const shop = getShop(window.Darpan.param('shop') || DATA.demoShopId);
  const state = { tab: 'all' };

  function visible() {
    return shopProducts(shop.id).filter((p) => p.live);
  }

  function renderHero() {
    const typeLabel = shop.type === 'online' ? t('shop.online') + ' · ' + shop.channel : t('shop.offline');
    document.getElementById('store-hero').innerHTML =
      '<div class="dot-grid h-28" style="background-color:' + shop.color + '"></div>' +
      '<div class="-mt-10 px-4">' +
        '<div class="rounded-2xl bg-white p-4 shadow-card">' +
          '<div class="flex items-start gap-3">' +
            '<span class="-mt-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white ring-4 ring-white shadow-lift" style="background:' + shop.color + '">' + L(shop.initials) + '</span>' +
            '<div class="min-w-0 flex-1">' +
              '<h1 class="text-lg font-extrabold leading-snug text-slate-900">' + L(shop.name) + '</h1>' +
              '<p class="mt-0.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">' + icon('badge', 'h-4 w-4') + t('store.verified') + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-slate-500">' +
            '<span class="flex items-center gap-1">' + icon('pin', 'h-4 w-4 text-accent') + L(shop.area) + '</span>' +
            '<span class="flex items-center gap-1">' + icon('clock', 'h-4 w-4 text-accent') + L(shop.hours) + '</span>' +
            '<span class="flex items-center gap-1">' + icon('store', 'h-4 w-4 text-accent') + typeLabel + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.title = L(shop.name) + ' — দর্পণ';
  }

  function renderTabs() {
    const cats = ['all'].concat(['clothing', 'glasses', 'shoes'].filter((c) => shop.categories.includes(c)));
    document.getElementById('store-tabs').innerHTML = cats.map((c) => {
      const on = state.tab === c;
      const count = c === 'all' ? visible().length : visible().filter((p) => p.category === c).length;
      return '<button type="button" role="tab" aria-selected="' + on + '" data-tab="' + c + '" class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ' +
        (on ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600') + '">' +
        (c === 'all' ? '' : icon(CATEGORY_ICON[c], 'h-4 w-4')) + t('cat.' + c) +
        '<span class="text-xs ' + (on ? 'text-white/70' : 'text-slate-400') + '">' + num(count) + '</span></button>';
    }).join('');
  }

  function renderGrid() {
    const items = visible().filter((p) => state.tab === 'all' || p.category === state.tab);
    document.getElementById('store-grid').innerHTML = items.map((p) =>
      '<a href="product.html?id=' + p.id + '" class="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">' +
        '<div class="relative aspect-[3/4] overflow-hidden bg-slate-100">' + productImg(p, 'h-full w-full object-cover transition group-hover:scale-105') +
          '<span class="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy shadow">' +
            icon('sparkle', 'h-3.5 w-3.5 text-accent') + t('store.try') + '</span>' +
        '</div>' +
        '<div class="p-2.5">' +
          '<h3 class="truncate text-[13px] font-semibold text-slate-900">' + L(p.name) + '</h3>' +
          '<p class="mt-0.5 text-sm font-bold text-navy">' + price(p.price) + '</p>' +
        '</div>' +
      '</a>'
    ).join('');
  }

  window.renderPage = function () {
    renderHero();
    renderTabs();
    renderGrid();
  };

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      state.tab = tab.dataset.tab;
      renderTabs();
      renderGrid();
    }
  });
})();
