/* Screen 6 — Customer-facing storefront (opened from the shop's QR code) */
(function () {
  const { DATA, t, L, num, price, icon, img, productImg, getShop, shopProducts, shopAvatar, CATEGORY_ICON } = window.Darpan;

  // TODO: resolve the shop from the real short link (/s/:slug) via the API.
  const shop = getShop(window.Darpan.param('shop') || DATA.demoShopId);

  // TODO: move filtering / sorting server-side once the catalogue is large.
  const PRICE_RANGES = {
    any: () => true,
    under: (p) => p.price < 1500,
    mid: (p) => p.price >= 1500 && p.price <= 2500,
    over: (p) => p.price > 2500
  };
  const DEFAULTS = { tab: 'all', gender: 'all', range: 'any', sort: 'featured' };
  const state = Object.assign({}, DEFAULTS);

  // Live products after the gender + price filters (before the category tab).
  function filtered() {
    return shopProducts(shop.id).filter((p) =>
      p.live &&
      (state.gender === 'all' || p.gender === state.gender || p.gender === 'unisex') &&
      PRICE_RANGES[state.range](p)
    );
  }

  function renderHero() {
    const typeLabel = shop.type === 'online' ? t('shop.online') + ' · ' + shop.channel : t('shop.offline');
    // Cover: the shop's own photo (darkened) if it has one, otherwise its brand colour.
    const cover = shop.avatar
      ? '<div class="relative h-32 overflow-hidden">' + img(shop.avatar, 'h-full w-full object-cover', '') +
        '<div class="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-900/20"></div></div>'
      : '<div class="dot-grid h-28" style="background-color:' + shop.color + '"></div>';

    document.getElementById('store-hero').innerHTML =
      cover +
      '<div class="-mt-10 px-4">' +
        '<div class="relative rounded-2xl bg-white p-4 shadow-card">' +
          '<div class="flex items-start gap-3">' +
            '<div class="-mt-10 rounded-2xl ring-4 ring-white shadow-lift">' + shopAvatar(shop, 'h-16 w-16 rounded-2xl text-xl') + '</div>' +
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
    const base = filtered();
    const cats = ['all'].concat(['clothing', 'glasses', 'shoes'].filter((c) => shop.categories.includes(c)));
    document.getElementById('store-tabs').innerHTML = cats.map((c) => {
      const on = state.tab === c;
      const count = c === 'all' ? base.length : base.filter((p) => p.category === c).length;
      return '<button type="button" role="tab" aria-selected="' + on + '" data-tab="' + c + '" class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ' +
        (on ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600') + '">' +
        (c === 'all' ? '' : icon(CATEGORY_ICON[c], 'h-4 w-4')) + t('cat.' + c) +
        '<span class="text-xs ' + (on ? 'text-white/70' : 'text-slate-400') + '">' + num(count) + '</span></button>';
    }).join('');
  }

  function renderFilters(resultCount) {
    const genderBtn = (g) => {
      const on = state.gender === g;
      return '<button type="button" data-gender="' + g + '" class="flex-1 whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-semibold transition ' +
        (on ? 'bg-white text-navy shadow-sm' : 'text-slate-500') + '">' + t('filter.' + g) + '</button>';
    };
    const rangeChip = (r) => {
      const on = state.range === r;
      const label = r === 'any' ? t('filter.anyPrice') : t('filter.' + r);
      return '<button type="button" data-range="' + r + '" class="shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ' +
        (on ? 'border-accent bg-accent-50 text-accent' : 'border-slate-200 text-slate-500') + '">' + label + '</button>';
    };
    const opt = (v, key) => '<option value="' + v + '"' + (state.sort === v ? ' selected' : '') + '>' + t(key) + '</option>';
    const active = state.gender !== 'all' || state.range !== 'any' || state.sort !== 'featured';

    document.getElementById('store-filters').innerHTML =
      // Men / women + price sort
      '<div class="flex items-center gap-2">' +
        '<div class="flex flex-1 gap-0.5 rounded-xl bg-slate-100 p-1">' + ['all', 'men', 'women'].map(genderBtn).join('') + '</div>' +
        '<label class="relative shrink-0">' +
          '<span class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-navy">' + icon('filter', 'h-4 w-4') + '</span>' +
          '<select id="sort-select" aria-label="Sort" class="h-[42px] appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-3 text-[13px] font-semibold text-navy outline-none focus:border-accent">' +
            opt('featured', 'filter.sortDefault') + opt('asc', 'filter.priceAsc') + opt('desc', 'filter.priceDesc') +
          '</select>' +
        '</label>' +
      '</div>' +
      // Price range chips
      '<div class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">' + ['any', 'under', 'mid', 'over'].map(rangeChip).join('') + '</div>' +
      // Result count + clear
      '<div class="flex items-center justify-between text-xs">' +
        '<span class="text-slate-500">' + t('filter.results', { n: num(resultCount) }) + '</span>' +
        (active ? '<button type="button" id="clear-filters" class="font-semibold text-accent">' + t('filter.clear') + '</button>' : '') +
      '</div>';
  }

  function renderGrid() {
    let items = filtered().filter((p) => state.tab === 'all' || p.category === state.tab);
    if (state.sort === 'asc') items = items.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'desc') items = items.slice().sort((a, b) => b.price - a.price);

    renderFilters(items.length);

    document.getElementById('store-grid').innerHTML = items.length ? items.map((p) =>
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
    ).join('') :
      '<p class="col-span-2 rounded-2xl bg-slate-50 py-10 text-center text-sm text-slate-400">' + t('filter.none') + '</p>';
  }

  function refresh() {
    renderTabs();
    renderGrid();
  }

  window.renderPage = function () {
    renderHero();
    refresh();
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-tab], [data-gender], [data-range], #clear-filters');
    if (!el) return;
    if (el.dataset.tab) state.tab = el.dataset.tab;
    if (el.dataset.gender) state.gender = el.dataset.gender;
    if (el.dataset.range) state.range = el.dataset.range;
    if (el.id === 'clear-filters') Object.assign(state, DEFAULTS, { tab: state.tab });
    refresh();
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'sort-select') {
      state.sort = e.target.value;
      renderGrid();
    }
  });
})();
