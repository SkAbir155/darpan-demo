/* Screen 4 — Product collection builder (shop dashboard) */
(function () {
  const { DATA, t, L, num, price, icon, productImg, toast, getShop, shopProducts, CATEGORY_ICON } = window.Darpan;

  const shop = getShop(DATA.demoShopId);
  const TABS = ['clothing', 'glasses', 'shoes'];
  const state = { tab: window.Darpan.param('tab') || 'clothing', query: '' };

  function renderSummary() {
    document.getElementById('shop-summary').innerHTML =
      '<div class="flex items-center gap-3">' +
        '<span class="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-base font-bold text-navy">' + L(shop.initials) + '</span>' +
        '<div class="min-w-0"><p class="text-xs text-white/70">' + t('col.hello') + '</p>' +
        '<p class="truncate font-bold">' + L(shop.name) + '</p></div>' +
      '</div>' +
      '<div class="mt-3 grid grid-cols-2 gap-2">' +
        stat('eye', num(shop.stats.visitsToday), t('col.visits')) +
        stat('sparkle', num(shop.stats.tryOnsToday), t('col.tryons')) +
      '</div>';
  }

  function stat(iconName, value, label) {
    return '<div class="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15">' +
      icon(iconName, 'h-5 w-5 text-white/80') +
      '<div><div class="text-lg font-extrabold leading-tight">' + value + '</div><div class="text-[11px] text-white/70">' + label + '</div></div></div>';
  }

  function renderTabs() {
    document.getElementById('category-tabs').innerHTML = TABS.map((c) => {
      const on = state.tab === c;
      const count = shopProducts(shop.id, c).length;
      return '<button type="button" role="tab" aria-selected="' + on + '" data-tab="' + c + '" class="flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl px-1 py-2.5 text-[13px] font-semibold transition ' +
        (on ? 'bg-navy text-white shadow-card' : 'bg-slate-100 text-slate-600') + '">' +
        icon(CATEGORY_ICON[c], 'h-[18px] w-[18px]') + t('cat.' + c) +
        '<span class="rounded-full px-1.5 text-[11px] ' + (on ? 'bg-white/20' : 'bg-white text-slate-500') + '">' + num(count) + '</span></button>';
    }).join('');
  }

  function renderGrid() {
    const q = state.query.trim().toLowerCase();
    const items = shopProducts(shop.id, state.tab).filter((p) =>
      !q || p.name.bn.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q)
    );

    document.getElementById('product-count').textContent = t('count.items', { n: num(shopProducts(shop.id).length) });

    // "+ পণ্য যোগ করুন" card always comes first.
    const addCard =
      '<button type="button" id="add-product" class="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-accent/50 bg-accent-50/50 p-3 text-center hover:bg-accent-50">' +
        '<span class="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lift">' + icon('plus', 'h-6 w-6') + '</span>' +
        '<span class="font-bold text-accent">+ ' + t('col.add') + '</span>' +
        '<span class="text-[11px] text-slate-500">' + t('col.addHint') + '</span>' +
      '</button>';

    const cards = items.map((p) =>
      '<article class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">' +
        '<div class="relative aspect-[3/4] bg-slate-100">' + productImg(p, 'h-full w-full object-cover') +
          '<span class="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold ' +
            (p.live ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-500') + '">' + t(p.live ? 'col.live' : 'col.draft') + '</span>' +
        '</div>' +
        '<div class="p-2.5">' +
          '<h3 class="truncate text-[13px] font-semibold text-slate-900">' + L(p.name) + '</h3>' +
          '<div class="mt-0.5 flex items-center justify-between">' +
            '<span class="text-sm font-bold text-navy">' + price(p.price) + '</span>' +
            '<span class="flex items-center gap-0.5 text-[11px] text-slate-400">' + icon('sparkle', 'h-3 w-3') + t('col.tries', { n: num(p.tries) }) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>'
    ).join('');

    document.getElementById('product-grid').innerHTML = addCard + (cards ||
      '<p class="col-span-1 self-center text-center text-sm text-slate-400">' + t('col.empty') + '</p>');
  }

  window.renderPage = function () {
    renderSummary();
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
    // TODO: open real "add product" flow (camera capture + upload to storage).
    if (e.target.closest('#add-product')) toast(t('col.addToast'));
  });

  document.getElementById('search').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderGrid();
  });
})();
