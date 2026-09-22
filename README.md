# দর্পণ (Darpan) — static front-end demo

Live site: https://skabir155.github.io/darpan-demo/

A clickable demo with no backend and no build step: open `index.html` in a browser.
It works on phones, tablets and computers, and the AI try-on is free (see below).
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
| 7 | Product + try-on | `product.html` |
| 8 | Try-on result | `tryon-result.html` (`?id=m-05` shows a men's item) |
| – | Detailed how-to-use guide | `guide.html` |

The developer contact section is at the bottom of the landing page (`index.html#contact`).

Add `?lang=en` to any URL to open it in English, or use the বাং / EN toggle in the header.

## AI try-on (free, no sign-up)

Tapping **আপনার ছবি দিয়ে ট্রাই করুন** or **গ্যালারি থেকে আপলোড** opens the phone gallery. The chosen
photo is resized and sent, with the product photo, to **IDM-VTON**, an open-source try-on model
running for free on the public Hugging Face Space `yisol/IDM-VTON`. It needs no account, payment or
API key. It usually takes 20–60 seconds, and the progress screen shows the stage, queue position
and a countdown.

- **Clothing only.** Shoes and glasses show a sample result (the product laid over the photo).
- **Free and shared**, so it can be busy or hit its daily GPU limit. When that happens the customer
  immediately gets a sample result with a "try again with AI" button that reuses the same photo.
- The code is in `assets/js/tryon-ai.js`. For a real launch, host the model or a paid API on your own server.

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
  js/tryon-ai.js            free AI try-on client (IDM-VTON on Hugging Face), photo resizing
  icons/icon-512.png        browser-tab / home-screen icon
  js/pages/*.js             one script per screen
Images/                     local photos: Dresses/{Men,Women}, Shoes/{men,women},
                            Eyeware glass/, allar dan shon/ (demo shop profile photo)
```

Search the code for `TODO:` to find where real APIs, authentication and the AI
garment-fusion call go.
