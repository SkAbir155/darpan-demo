# দর্পণ (Darpan) — static front-end demo

Live site: https://skabir155.github.io/darpan-demo/

A clickable demo with no backend and no build step: open `index.html` in a browser.
It works on phones, tablets and computers. Real AI try-on runs through the FASHN API (see below).
All product and shop photos are local files in `Images/`. You need an internet connection only for Tailwind, Google Fonts and qrcode.js, which load from CDNs.

## Screens (screenshot order)

| # | Screen | File |
|---|--------|------|
| 1 | Landing page | `index.html` |
| 2 | Shop registration | `register.html` |
| 3 | Onboarding tutorial | `onboarding.html` (`?step=1`–`4`) |
| 4 | Collection builder | `collection.html` |
| 5 | QR code + link | `share.html` |
| 6 | Customer storefront (men / women, price range and price sort filters) | `shop.html` |
| 7 | Product + try-on | `product.html` (`?sheet=1` opens the photo picker) |
| 8 | Try-on result | `tryon-result.html` (`?id=m-05` shows a men's item) |
| – | Detailed how-to-use guide | `guide.html` |

The developer contact section is at the bottom of the landing page (`index.html#contact`).

Add `?lang=en` to any URL to open it in English, or use the বাং / EN toggle in the header.

## Real AI try-on (FASHN)

1. Create an API key at https://app.fashn.ai/api (API credits are bought on the Billing page; 1 credit per try-on).
2. On any product page, tap **AI সেটিংস** and paste the key. It is stored only in that browser's
   localStorage, never in the code or on GitHub.
3. Tap **গ্যালারি থেকে আপলোড** and pick a photo. The photo is resized, sent to FASHN
   (`tryon-v1.6`), and the result opens on the result page.

Without a key, the site offers a demo result (your photo with the product laid over it).
AI try-on covers clothing only; shoes and glasses always show the demo result.

For a real launch, don't ask visitors for a key. Deploy `worker/fashn-proxy.js` as a Cloudflare
Worker with a `FASHN_API_KEY` secret, then enter the worker URL under AI সেটিংস → Advanced.

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
  js/fashn.js               FASHN API client, photo resizing, AI settings dialog
  icons/icon-512.png        browser-tab / home-screen icon
  js/pages/*.js             one script per screen
worker/fashn-proxy.js       optional Cloudflare Worker that keeps the API key server-side
Images/                     local photos: Dresses/{Men,Women}, Shoes/{men,women},
                            Eyeware glass/, allar dan shon/ (demo shop profile photo)
```

Search the code for `TODO:` to find where real APIs, authentication and the AI
garment-fusion call go.
