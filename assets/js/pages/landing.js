/* Screen 1 — Landing page */
window.renderPage = function () {
  const { DATA, t, L, num, icon, productImg, getProduct, shopAvatar } = window.Darpan;

  // Hero collage: three clothing photos, centre one marked as "tried on".
  const [left, mid, right] = ['w-08', 'w-01', 'm-02'].map(getProduct);
  document.getElementById('hero-collage').innerHTML =
    '<div class="absolute left-0 top-5 h-36 w-[27%] -rotate-6 overflow-hidden rounded-2xl ring-2 ring-white/40">' + productImg(left, 'h-full w-full object-cover') + '</div>' +
    '<div class="absolute right-0 top-5 h-36 w-[27%] rotate-6 overflow-hidden rounded-2xl ring-2 ring-white/40">' + productImg(right, 'h-full w-full object-cover') + '</div>' +
    '<div class="absolute left-1/2 top-0 h-44 w-[40%] -translate-x-1/2 overflow-hidden rounded-2xl bg-white ring-4 ring-white shadow-lift">' +
      productImg(mid, 'h-full w-full object-cover') +
      '<span class="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-navy shadow">' +
        '<span class="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">' + icon('check', 'h-3 w-3') + '</span>' + t('land.tried') +
      '</span>' +
    '</div>';

  // How it works — 4 steps.
  const steps = [
    { icon: 'store', t: 'land.how1t', d: 'land.how1d' },
    { icon: 'camera', t: 'land.how2t', d: 'land.how2d' },
    { icon: 'qr', t: 'land.how3t', d: 'land.how3d' },
    { icon: 'sparkle', t: 'land.how4t', d: 'land.how4d' }
  ];
  document.getElementById('how-steps').innerHTML = steps.map((s, i) =>
    '<li class="flex items-start gap-3 rounded-2xl border border-slate-100 p-3.5 shadow-card">' +
      '<span class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">' + icon(s.icon, 'h-5 w-5') +
        '<span class="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold ring-2 ring-white">' + num(i + 1) + '</span>' +
      '</span>' +
      '<div><h3 class="font-bold text-slate-900">' + t(s.t) + '</h3><p class="text-[13px] text-slate-500">' + t(s.d) + '</p></div>' +
    '</li>'
  ).join('');

  // Shops using Darpan (mock data).
  document.getElementById('shop-list').innerHTML = DATA.shops.map((s) => {
    const cats = s.categories.map((c) => t('cat.' + c)).join(' · ');
    const typeLabel = s.type === 'online' ? t('shop.online') + ' · ' + s.channel : t('shop.offline');
    return '<a href="shop.html?shop=' + s.id + '" class="w-44 shrink-0 rounded-2xl border border-slate-100 p-3.5 shadow-card">' +
      shopAvatar(s, 'h-11 w-11 rounded-xl text-sm') +
      '<h3 class="mt-2.5 truncate font-bold text-slate-900">' + L(s.name) + '</h3>' +
      '<p class="truncate text-xs text-slate-500">' + L(s.area) + '</p>' +
      '<p class="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ' + (s.type === 'online' ? 'bg-accent-50 text-accent' : 'bg-navy-50 text-navy') + '">' + typeLabel + '</p>' +
      '<p class="mt-1.5 truncate text-[11px] text-slate-400">' + cats + '</p>' +
    '</a>';
  }).join('');
};
