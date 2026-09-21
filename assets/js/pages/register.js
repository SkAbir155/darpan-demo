/* Screen 2 — Shop registration form */
(function () {
  const { DATA, t, L, icon, toast, getShop, CATEGORY_ICON } = window.Darpan;

  // Pre-filled with the demo shop so the screenshot looks "in progress".
  const shop = getShop(DATA.demoShopId);
  const state = { type: shop.type, categories: new Set(shop.categories) };

  window.renderPage = function () {
    document.getElementById('shop-name').value = L(shop.name);
    document.getElementById('owner-name').value = L(shop.owner);
    document.getElementById('phone').value = shop.phone;
    document.getElementById('address').value = L(shop.address);

    document.getElementById('district').innerHTML = DATA.districts
      .map((d) => '<option value="' + d.id + '"' + (d.id === shop.district ? ' selected' : '') + '>' + L(d) + '</option>')
      .join('');

    renderChoices();
  };

  // Re-rendered on every toggle without touching the typed-in text fields.
  function renderChoices() {
    // Offline / online segmented control.
    document.getElementById('shop-type').innerHTML = ['offline', 'online'].map((type) => {
      const on = state.type === type;
      return '<button type="button" data-type="' + type + '" class="rounded-lg py-2.5 text-sm font-semibold transition ' +
        (on ? 'bg-white text-navy shadow-sm' : 'text-slate-500') + '">' + t('shop.' + type) + '</button>';
    }).join('');

    // Category checkbox cards.
    document.getElementById('category-options').innerHTML = ['clothing', 'shoes', 'glasses'].map((c) => {
      const on = state.categories.has(c);
      return '<label class="relative block cursor-pointer">' +
        '<input type="checkbox" name="categories" value="' + c + '" class="sr-only"' + (on ? ' checked' : '') + '>' +
        '<span class="flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3.5 text-sm font-semibold transition ' +
          (on ? 'border-navy bg-navy-50 text-navy' : 'border-slate-200 bg-white text-slate-500') + '">' +
          icon(CATEGORY_ICON[c], 'h-7 w-7') + t('cat.' + c) +
        '</span>' +
        '<span class="absolute right-1.5 top-1.5 h-5 w-5 items-center justify-center rounded-full bg-navy text-white ' + (on ? 'flex' : 'hidden') + '">' + icon('check', 'h-3.5 w-3.5') + '</span>' +
      '</label>';
    }).join('');
  }

  document.addEventListener('click', (e) => {
    const typeBtn = e.target.closest('[data-type]');
    if (typeBtn) {
      state.type = typeBtn.dataset.type;
      renderChoices();
    }
    if (e.target.closest('#logo-upload')) toast(t('reg.logoToast'));
  });

  document.addEventListener('change', (e) => {
    if (e.target.name === 'categories') {
      e.target.checked ? state.categories.add(e.target.value) : state.categories.delete(e.target.value);
      renderChoices();
    }
  });

  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: replace with real API call + phone OTP verification (real auth).
    location.href = 'onboarding.html';
  });
})();
