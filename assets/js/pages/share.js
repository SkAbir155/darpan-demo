/* Screen 5 — QR code + shareable link */
(function () {
  const { DATA, t, L, toast, getShop } = window.Darpan;

  const shop = getShop(DATA.demoShopId);
  // TODO: the backend should issue this short link (e.g. POST /api/shops/:id/share-link).
  const shareUrl = shop.url;

  // Generate the QR once — it does not depend on language.
  // High error correction leaves room for the "দ" logo in the centre.
  new QRCode(document.getElementById('qr-code'), {
    text: shareUrl,
    width: 200,
    height: 200,
    colorDark: '#1F3864',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  window.renderPage = function () {
    document.getElementById('qr-shop').innerHTML =
      '<span class="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style="background:' + shop.color + '">' + L(shop.initials) + '</span>' +
      '<span class="truncate font-bold text-slate-900">' + L(shop.name) + '</span>';
    document.getElementById('share-link').value = shareUrl.replace('https://', '');
  };

  /* ---------- Copy link ---------- */
  document.getElementById('copy-link').addEventListener('click', async () => {
    const input = document.getElementById('share-link');
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (e) {
      input.select();
      document.execCommand('copy');
    }
    toast(t('share.copied'));
  });

  /* ---------- Download a print-ready QR poster (PNG) ---------- */
  document.getElementById('download-qr').addEventListener('click', async () => {
    const qrCanvas = document.querySelector('#qr-code canvas');
    if (!qrCanvas) return;
    try { await document.fonts.ready; } catch (e) { /* ignore */ }

    const W = 800, H = 1000;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const bnFont = '"Noto Sans Bengali", Inter, sans-serif';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1F3864';
    ctx.fillRect(0, 0, W, 16);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#1F3864';
    ctx.font = '800 64px ' + bnFont;
    ctx.fillText('দর্পণ', W / 2, 120);

    ctx.fillStyle = '#0f172a';
    ctx.font = '700 40px ' + bnFont;
    ctx.fillText(L(shop.name), W / 2, 200);

    const size = 520, x = (W - size) / 2, y = 250;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qrCanvas, x, y, size, size);

    // Centre logo tile (mirrors the on-screen overlay).
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(W / 2 - 60, y + size / 2 - 60, 120, 120);
    ctx.fillStyle = '#1F3864';
    ctx.font = '800 64px ' + bnFont;
    ctx.fillText('দ', W / 2, y + size / 2 + 22);

    ctx.fillStyle = '#2E74B5';
    ctx.font = '700 40px ' + bnFont;
    ctx.fillText(t('share.scan'), W / 2, 860);
    ctx.fillStyle = '#64748b';
    ctx.font = '500 28px Inter, sans-serif';
    ctx.fillText(shareUrl.replace('https://', ''), W / 2, 920);

    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = 'darpan-qr-' + shop.id + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast(t('share.downloaded'));
  });

  // TODO: use the Web Share API / platform share URLs.
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-share]')) toast(t('share.shareToast'));
  });
})();
