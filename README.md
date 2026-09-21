# দর্পণ (Darpan) — static front-end demo

A clickable, front-end-only demo: no backend, no build step. Open `index.html` in a browser.
You need an internet connection because Tailwind, Google Fonts, qrcode.js and the placeholder images load from CDNs.

## Screens (screenshot order)

| # | Screen | File |
|---|--------|------|
| 1 | Landing page | `index.html` |
| 2 | Shop registration | `register.html` |
| 3 | Onboarding tutorial | `onboarding.html` (`?step=1`–`4`) |
| 4 | Collection builder | `collection.html` |
| 5 | QR code + link | `share.html` |
| 6 | Customer storefront | `shop.html` |
| 7 | Product + try-on | `product.html` (`?sheet=1` opens the photo picker) |
| 8 | Try-on result | `tryon-result.html` |

Add `?lang=en` to any URL to open it in English, or use the বাং / EN toggle in the header.

## Screenshotting at 390 × 844

Desktop Chrome and Edge won't shrink a window below about 500 px wide.
Use device mode instead: press F12, then Ctrl+Shift+M, and pick **iPhone 12 Pro** (390 × 844).
To save the screen, open the DevTools ⋮ menu and choose **Capture screenshot**.

## Structure

```
assets/
  css/styles.css            shared styles on top of Tailwind
  js/tailwind-config.js     brand colours (#1F3864, #2E74B5) + fonts
  js/mock-data.js           ALL shops, products, image paths (swap for API calls)
  js/app.js                 i18n strings, icons, header / bottom nav, helpers
  js/pages/*.js             one script per screen
Images/Dresses/             local clothing photos
```

Search the code for `TODO:` to find where real APIs, authentication and the AI
garment-fusion call go.
