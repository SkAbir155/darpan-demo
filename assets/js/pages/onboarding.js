/* Screen 3 — Onboarding tutorial (4 steps). Open ?step=N for a specific step. */
(function () {
  const { t, num, icon, productImg, getProduct } = window.Darpan;

  const TOTAL = 4;
  let step = Math.min(TOTAL, Math.max(1, parseInt(window.Darpan.param('step'), 10) || 1));

  // Phone-frame illustration with floating accent chips around it.
  function phone(inner) {
    return '<div class="absolute inset-3 rounded-full bg-gradient-to-br from-navy-50 to-accent-50"></div>' +
      '<div class="absolute inset-10 rounded-full border-2 border-dashed border-accent/20"></div>' +
      '<div class="floaty absolute inset-0 m-auto h-56 w-[8.5rem] overflow-hidden rounded-[1.6rem] border-[5px] border-navy bg-white shadow-lift">' +
        '<div class="absolute left-1/2 top-1 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-navy"></div>' + inner +
      '</div>';
  }

  function chip(iconName, pos, color) {
    return '<span class="absolute ' + pos + ' flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lift ' + color + '">' + icon(iconName, 'h-6 w-6') + '</span>';
  }

  const ILLUSTRATIONS = {
    1: () => phone(
          '<div class="relative h-full">' + productImg(getProduct('md-01'), 'h-full w-full object-cover') +
          '<div class="absolute inset-3 rounded-lg border-2 border-white/80"></div>' +
          '<span class="absolute bottom-3 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-white bg-white/40"></span></div>'
        ) + chip('camera', 'right-2 top-8', 'bg-accent') + chip('sun', 'left-3 bottom-10', 'bg-amber-500'),

    2: () => phone(
          '<div class="grid h-full grid-cols-2 gap-1 p-1.5 pt-4">' +
          ['md-02', 'md-06', 'md-s1', 'md-g1'].map((id) => '<div class="overflow-hidden rounded-md">' + productImg(getProduct(id), 'h-full w-full object-cover') + '</div>').join('') +
          '</div>'
        ) + chip('grid', 'right-2 top-8', 'bg-accent') + chip('plus', 'left-3 bottom-10', 'bg-emerald-500'),

    3: () => phone(
          '<div class="flex h-full flex-col items-center justify-center gap-2 p-3 text-navy">' +
          '<div class="rounded-xl border-2 border-navy p-2">' + icon('qr', 'h-16 w-16') + '</div>' +
          '<span class="h-1.5 w-16 rounded-full bg-slate-200"></span><span class="h-1.5 w-10 rounded-full bg-slate-200"></span></div>'
        ) + chip('share', 'right-2 top-8', 'bg-accent') + chip('printer', 'left-3 bottom-10', 'bg-navy'),

    4: () => phone(
          '<div class="relative h-full">' + productImg(getProduct('md-02'), 'h-full w-full object-cover') +
          '<span class="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-navy">' +
          icon('sparkle', 'h-3 w-3 text-accent') + 'AI</span></div>'
        ) + chip('sparkle', 'right-2 top-8', 'bg-accent') + chip('heart', 'left-3 bottom-10', 'bg-rose-500')
  };

  window.renderPage = function () {
    document.getElementById('step-label').textContent = t('onb.stepOf', { n: num(step), total: num(TOTAL) });
    document.getElementById('step-bars').innerHTML = Array.from({ length: TOTAL }, (_, i) =>
      '<span class="h-1.5 rounded-full ' + (i < step ? 'bg-navy' : 'bg-slate-200') + '"></span>'
    ).join('');

    document.getElementById('step-illustration').innerHTML = ILLUSTRATIONS[step]();
    document.getElementById('step-title').textContent = t('onb.s' + step + 't');
    document.getElementById('step-desc').textContent = t('onb.s' + step + 'd');
    document.getElementById('step-tip').textContent = t('onb.s' + step + 'tip');
    document.getElementById('next-label').textContent = step === TOTAL ? t('onb.start') : t('common.next');
    document.getElementById('prev-btn').disabled = step === 1;
  };

  function go(n) {
    step = n;
    history.replaceState(null, '', '?step=' + step);
    window.renderPage();
  }

  document.getElementById('next-btn').addEventListener('click', () => {
    if (step < TOTAL) go(step + 1);
    else location.href = 'collection.html';
  });
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (step > 1) go(step - 1);
  });
})();
