/* =====================================================================
   দর্পণ — shared app helpers (demo)
   i18n, icons, header / bottom-nav rendering, formatting, toast.
   Each page script defines window.renderPage(); it is called on load
   and again whenever the language changes.
   ===================================================================== */

(function () {
  'use strict';

  const DATA = window.DARPAN_DATA;
  const LANG_KEY = 'darpan.lang';

  /* ------------------------------------------------------------------
     i18n dictionary
     TODO: move to per-locale JSON files served by the backend / CMS.
     ------------------------------------------------------------------ */
  const I18N = {
    bn: {
      'brand.tagline': 'ডিজিটাল আয়না',
      'nav.login': 'লগইন',
      'nav.collection': 'কালেকশন',
      'nav.qr': 'QR কোড',
      'nav.store': 'দোকান',
      'nav.profile': 'প্রোফাইল',
      'common.back': 'ফিরে যান',
      'common.next': 'পরবর্তী',
      'common.skip': 'এড়িয়ে যান',
      'common.poweredBy': 'দর্পণ দ্বারা চালিত',
      'common.demo': 'ডেমো',
      'cat.all': 'সব',
      'cat.clothing': 'পোশাক',
      'cat.shoes': 'জুতা',
      'cat.glasses': 'চশমা',
      'shop.offline': 'অফলাইন দোকান',
      'shop.online': 'অনলাইন সেলার',
      'count.items': '{n}টি পণ্য',

      // Landing
      'land.badge': 'AI ভার্চুয়াল ট্রায়াল রুম',
      'land.title': 'আপনার দোকানে আনুন একটি ডিজিটাল আয়না',
      'land.sub': 'ক্রেতা নিজের ছবিতে পোশাক, জুতা বা চশমা ট্রাই করে দেখবে — ট্রায়াল রুম ছাড়াই, শুধু একটি QR কোডে।',
      'land.cta': 'আপনার দোকান রেজিস্টার করুন',
      'land.cta2': 'ডেমো দোকান দেখুন',
      'land.tried': 'ট্রাই করা হয়েছে',
      'land.stat1v': '০৳',
      'land.stat1l': 'সেটআপ খরচ',
      'land.stat2v': '২ মিনিট',
      'land.stat2l': 'QR পেতে',
      'land.stat3v': '৩টি',
      'land.stat3l': 'ক্যাটাগরি',
      'land.howTitle': 'কীভাবে কাজ করে',
      'land.how1t': 'দোকান রেজিস্টার করুন',
      'land.how1d': 'নাম, ঠিকানা আর কী বিক্রি করেন — ব্যস, এটুকুই।',
      'land.how2t': 'পণ্যের ছবি যোগ করুন',
      'land.how2d': 'মোবাইলে ছবি তুলে কালেকশন সাজিয়ে নিন।',
      'land.how3t': 'QR কোড শেয়ার করুন',
      'land.how3d': 'কাউন্টারে লাগিয়ে রাখুন বা ফেসবুক পেজে দিন।',
      'land.how4t': 'ক্রেতা নিজেই ট্রাই করবে',
      'land.how4d': 'নিজের ছবিতে দেখে নিশ্চিন্তে কিনবে।',
      'land.forTitle': 'কাদের জন্য দর্পণ',
      'land.for1t': 'বাজারের দোকানদার',
      'land.for1d': 'ভিড়ের সময় ট্রায়াল রুমের লাইন কমান, বিক্রি বাড়ান।',
      'land.for2t': 'অনলাইন সেলার',
      'land.for2d': 'Daraz বা Facebook-এ রিটার্ন কমান, ক্রেতার আস্থা বাড়ান।',
      'land.shopsTitle': 'যারা ইতিমধ্যে দর্পণে',
      'land.ctaBoxT': 'আজই শুরু করুন — সম্পূর্ণ বিনামূল্যে',
      'land.ctaBoxD': 'শুধু একটি স্মার্টফোন হলেই চলবে। কোনো অ্যাপ ইনস্টল করতে হবে না।',
      'land.footer': '© ২০২৬ দর্পণ · ঢাকা, বাংলাদেশ',

      // Registration
      'reg.title': 'আপনার দোকান রেজিস্টার করুন',
      'reg.sub': 'কয়েকটি তথ্য দিন — ২ মিনিটেই আপনার ডিজিটাল দোকান তৈরি।',
      'reg.shopName': 'দোকানের নাম',
      'reg.owner': 'মালিকের নাম',
      'reg.phone': 'মোবাইল নম্বর',
      'reg.address': 'দোকানের ঠিকানা',
      'reg.district': 'জেলা',
      'reg.type': 'দোকানের ধরন',
      'reg.categories': 'কী কী বিক্রি করেন?',
      'reg.catHint': 'একাধিক বেছে নিতে পারেন',
      'reg.logo': 'দোকানের লোগো',
      'reg.optional': '(ঐচ্ছিক)',
      'reg.logoCta': 'লোগো আপলোড করুন',
      'reg.logoHint': 'PNG বা JPG, সর্বোচ্চ ২ MB',
      'reg.logoToast': 'ডেমো: এখানে ফোনের গ্যালারি খুলবে',
      'reg.terms': 'রেজিস্টার করে আপনি দর্পণের শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত হচ্ছেন।',
      'reg.submit': 'রেজিস্টার করুন',
      'reg.ph.shopName': 'যেমন: মায়ের দোয়া বস্ত্র বিতান',
      'reg.ph.owner': 'আপনার পুরো নাম',
      'reg.ph.phone': '০১XXX-XXXXXX',
      'reg.ph.address': 'দোকান নং, মার্কেটের নাম, এলাকা',

      // Onboarding
      'onb.stepOf': 'ধাপ {n} / {total}',
      'onb.tip': 'টিপস',
      'onb.start': 'শুরু করুন',
      'onb.s1t': 'পণ্যের ছবি তুলুন',
      'onb.s1d': 'হালকা রঙের পরিষ্কার ব্যাকগ্রাউন্ডে পণ্যটি সামনে থেকে ছবি তুলুন। মোবাইলের ক্যামেরাই যথেষ্ট।',
      'onb.s1tip': 'দিনের আলোতে ছবি তুললে রং সবচেয়ে ভালো আসে।',
      'onb.s2t': 'কালেকশন সাজান',
      'onb.s2d': 'ছবিগুলো পোশাক, জুতা বা চশমা ক্যাটাগরিতে রাখুন, দাম আর সাইজ লিখে দিন।',
      'onb.s2tip': 'প্রতিটি পণ্যের অন্তত একটি পরিষ্কার ছবি দিন।',
      'onb.s3t': 'QR কোড শেয়ার করুন',
      'onb.s3d': 'দোকানের QR কোড প্রিন্ট করে কাউন্টারে রাখুন, অথবা লিংকটি ফেসবুক ও হোয়াটসঅ্যাপে দিন।',
      'onb.s3tip': 'QR কোডটি A5 সাইজে প্রিন্ট করলে সহজে স্ক্যান হয়।',
      'onb.s4t': 'ক্রেতা নিজেই ট্রাই করবে',
      'onb.s4d': 'ক্রেতা QR স্ক্যান করে নিজের ছবিতে পণ্যটি দেখে নেবে — ট্রায়াল রুম ছাড়াই।',
      'onb.s4tip': 'ক্রেতার ছবি শুধু ট্রায়ালের জন্যই ব্যবহার হয়।',

      // Collection builder
      'col.hello': 'স্বাগতম,',
      'col.title': 'আমার কালেকশন',
      'col.search': 'পণ্য খুঁজুন...',
      'col.add': 'পণ্য যোগ করুন',
      'col.addHint': 'ছবি তুলুন বা আপলোড করুন',
      'col.addToast': 'ডেমো: এখানে নতুন পণ্যের ফর্ম খুলবে',
      'col.live': 'প্রকাশিত',
      'col.draft': 'খসড়া',
      'col.tries': '{n} ট্রাই',
      'col.visits': 'আজকের ভিজিট',
      'col.tryons': 'আজকের ট্রাই-অন',
      'col.makeQr': 'QR কোড তৈরি করুন',
      'col.empty': 'কোনো পণ্য পাওয়া যায়নি',

      // QR / share
      'share.title': 'আপনার দোকানের QR কোড',
      'share.sub': 'ক্রেতা কোডটি স্ক্যান করলেই আপনার কালেকশন দেখতে ও ট্রাই করতে পারবে।',
      'share.scan': 'স্ক্যান করুন, ট্রাই করুন',
      'share.download': 'ডাউনলোড QR',
      'share.downloaded': 'QR কোড ডাউনলোড হয়েছে',
      'share.linkLabel': 'শেয়ার করার লিংক',
      'share.copy': 'কপি',
      'share.copied': 'লিংক কপি হয়েছে!',
      'share.shareOn': 'সরাসরি শেয়ার করুন',
      'share.shareToast': 'ডেমো: শেয়ার অপশন খুলবে',
      'share.printBtn': 'প্রিন্ট',
      'share.print': 'প্রিন্ট টিপ: কাউন্টার আর ট্রায়াল রুমের পাশে লাগিয়ে রাখুন।',
      'share.preview': 'ক্রেতার চোখে দোকান দেখুন',

      // Storefront
      'store.verified': 'দর্পণ ভেরিফাইড',
      'store.bannerT': 'কেনার আগে ট্রাই করুন',
      'store.bannerD': 'যেকোনো পণ্যে ট্যাপ করে নিজের ছবিতে দেখে নিন।',
      'store.try': 'ট্রাই করুন',

      // Product
      'prod.tryBadge': 'ভার্চুয়াল ট্রাই উপলব্ধ',
      'prod.inStock': 'স্টকে আছে',
      'prod.size': 'সাইজ',
      'prod.color': 'রং',
      'prod.details': 'বিবরণ',
      'prod.tryCta': 'আপনার ছবি দিয়ে ট্রাই করুন',
      'prod.sheetTitle': 'আপনার একটি ছবি দিন',
      'prod.sheetSub': 'ছবি বেছে নিন — বাকিটা দর্পণ করে দেবে।',
      'prod.gallery': 'গ্যালারি থেকে আপলোড',
      'prod.galleryHint': 'ফোনে থাকা একটি ছবি বেছে নিন',
      'prod.camera': 'ক্যামেরা ব্যবহার করুন',
      'prod.cameraHint': 'এখনই একটি ছবি তুলুন',
      'prod.tipsTitle': 'ভালো ফলাফলের জন্য',
      'prod.tip1': 'সামনে থেকে তোলা',
      'prod.tip2': 'পর্যাপ্ত আলো',
      'prod.tip3': 'কোমর পর্যন্ত',
      'prod.privacy': 'আপনার ছবি সুরক্ষিত — শুধু এই ট্রায়ালের জন্য ব্যবহার হবে।',
      'prod.processing': 'AI আপনার ছবিতে পোশাকটি বসাচ্ছে...',
      'prod.processingSub': 'কয়েক সেকেন্ড অপেক্ষা করুন',

      // Try-on result
      'res.title': 'আপনার ট্রায়াল ফলাফল',
      'res.before': 'আগে',
      'res.after': 'পরে',
      'res.drag': 'স্লাইড করে আগে-পরে তুলনা করুন',
      'res.fit': 'মানানসই স্কোর',
      'res.retry': 'আবার চেষ্টা করুন',
      'res.download': 'ডাউনলোড',
      'res.downloaded': 'ছবি ডাউনলোড শুরু হয়েছে (ডেমো)',
      'res.order': 'দোকানে অর্ডার করুন',
      'res.orderToast': 'ডেমো: দোকানের সাথে যোগাযোগ খুলবে',
      'res.more': 'আরও ট্রাই করুন',
      'res.aiBadge': 'AI দ্বারা তৈরি',
      'res.note': 'নমুনা ফলাফল — আসল রং ও মাপ সামান্য ভিন্ন হতে পারে।'
    },

    en: {
      'brand.tagline': 'Digital Mirror',
      'nav.login': 'Log in',
      'nav.collection': 'Collection',
      'nav.qr': 'QR Code',
      'nav.store': 'Store',
      'nav.profile': 'Profile',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.skip': 'Skip',
      'common.poweredBy': 'Powered by Darpan',
      'common.demo': 'Demo',
      'cat.all': 'All',
      'cat.clothing': 'Clothing',
      'cat.shoes': 'Shoes',
      'cat.glasses': 'Glasses',
      'shop.offline': 'Physical shop',
      'shop.online': 'Online seller',
      'count.items': '{n} products',

      'land.badge': 'AI virtual trial room',
      'land.title': 'Bring a digital mirror to your shop',
      'land.sub': 'Customers try clothes, shoes and glasses on their own photo — no trial room, just one QR code.',
      'land.cta': 'Register your shop',
      'land.cta2': 'View demo shop',
      'land.tried': 'Tried on',
      'land.stat1v': '৳0',
      'land.stat1l': 'setup cost',
      'land.stat2v': '2 min',
      'land.stat2l': 'to get your QR',
      'land.stat3v': '3',
      'land.stat3l': 'categories',
      'land.howTitle': 'How it works',
      'land.how1t': 'Register your shop',
      'land.how1d': 'Name, address and what you sell — that’s all.',
      'land.how2t': 'Add product photos',
      'land.how2d': 'Snap photos on your phone and build a collection.',
      'land.how3t': 'Share your QR code',
      'land.how3d': 'Stick it on the counter or post it on Facebook.',
      'land.how4t': 'Customers try it on',
      'land.how4d': 'They see it on their own photo and buy with confidence.',
      'land.forTitle': 'Who Darpan is for',
      'land.for1t': 'Market shopkeepers',
      'land.for1d': 'Shorten trial-room queues at rush hour and sell more.',
      'land.for2t': 'Online sellers',
      'land.for2d': 'Cut returns on Daraz or Facebook and win buyer trust.',
      'land.shopsTitle': 'Already on Darpan',
      'land.ctaBoxT': 'Start today — completely free',
      'land.ctaBoxD': 'All you need is a smartphone. No app to install.',
      'land.footer': '© 2026 Darpan · Dhaka, Bangladesh',

      'reg.title': 'Register your shop',
      'reg.sub': 'A few details — your digital shop is ready in 2 minutes.',
      'reg.shopName': 'Shop name',
      'reg.owner': 'Owner’s name',
      'reg.phone': 'Mobile number',
      'reg.address': 'Shop address',
      'reg.district': 'District',
      'reg.type': 'Shop type',
      'reg.categories': 'What do you sell?',
      'reg.catHint': 'Pick one or more',
      'reg.logo': 'Shop logo',
      'reg.optional': '(optional)',
      'reg.logoCta': 'Upload logo',
      'reg.logoHint': 'PNG or JPG, up to 2 MB',
      'reg.logoToast': 'Demo: your phone gallery would open here',
      'reg.terms': 'By registering you agree to Darpan’s terms and privacy policy.',
      'reg.submit': 'Register',
      'reg.ph.shopName': 'e.g. Mayer Doa Bostro Bitan',
      'reg.ph.owner': 'Your full name',
      'reg.ph.phone': '01XXX-XXXXXX',
      'reg.ph.address': 'Shop no., market name, area',

      'onb.stepOf': 'Step {n} of {total}',
      'onb.tip': 'Tip',
      'onb.start': 'Get started',
      'onb.s1t': 'Photograph your products',
      'onb.s1d': 'Shoot each item from the front on a plain, light background. Your phone camera is enough.',
      'onb.s1tip': 'Daylight gives the truest colours.',
      'onb.s2t': 'Build your collection',
      'onb.s2d': 'Sort photos into clothing, shoes or glasses and add the price and sizes.',
      'onb.s2tip': 'Give every product at least one clear photo.',
      'onb.s3t': 'Share your QR code',
      'onb.s3d': 'Print your shop’s QR code for the counter, or share the link on Facebook and WhatsApp.',
      'onb.s3tip': 'Printed at A5 size, the QR scans easily.',
      'onb.s4t': 'Customers try it themselves',
      'onb.s4d': 'Customers scan the QR and see the item on their own photo — no trial room needed.',
      'onb.s4tip': 'Customer photos are used only for the trial.',

      'col.hello': 'Welcome,',
      'col.title': 'My collection',
      'col.search': 'Search products...',
      'col.add': 'Add product',
      'col.addHint': 'Snap or upload a photo',
      'col.addToast': 'Demo: the add-product form would open here',
      'col.live': 'Live',
      'col.draft': 'Draft',
      'col.tries': '{n} tries',
      'col.visits': 'Visits today',
      'col.tryons': 'Try-ons today',
      'col.makeQr': 'Generate QR code',
      'col.empty': 'No products found',

      'share.title': 'Your shop’s QR code',
      'share.sub': 'Customers scan this code to browse your collection and try items on.',
      'share.scan': 'Scan & try on',
      'share.download': 'Download QR',
      'share.downloaded': 'QR code downloaded',
      'share.linkLabel': 'Shareable link',
      'share.copy': 'Copy',
      'share.copied': 'Link copied!',
      'share.shareOn': 'Share directly',
      'share.shareToast': 'Demo: share options would open',
      'share.printBtn': 'Print',
      'share.print': 'Print tip: stick it by the counter and the trial room.',
      'share.preview': 'Preview as a customer',

      'store.verified': 'Darpan verified',
      'store.bannerT': 'Try before you buy',
      'store.bannerD': 'Tap any item to see it on your own photo.',
      'store.try': 'Try on',

      'prod.tryBadge': 'Virtual try-on available',
      'prod.inStock': 'In stock',
      'prod.size': 'Size',
      'prod.color': 'Colour',
      'prod.details': 'Details',
      'prod.tryCta': 'Try it with your photo',
      'prod.sheetTitle': 'Add a photo of yourself',
      'prod.sheetSub': 'Pick a photo — Darpan does the rest.',
      'prod.gallery': 'Upload from gallery',
      'prod.galleryHint': 'Choose a photo on your phone',
      'prod.camera': 'Use camera',
      'prod.cameraHint': 'Take a photo right now',
      'prod.tipsTitle': 'For best results',
      'prod.tip1': 'Front-facing',
      'prod.tip2': 'Good light',
      'prod.tip3': 'Waist-up',
      'prod.privacy': 'Your photo is safe — used only for this trial.',
      'prod.processing': 'AI is fitting the outfit to your photo...',
      'prod.processingSub': 'This takes a few seconds',

      'res.title': 'Your try-on result',
      'res.before': 'Before',
      'res.after': 'After',
      'res.drag': 'Slide to compare before and after',
      'res.fit': 'Fit score',
      'res.retry': 'Try again',
      'res.download': 'Download',
      'res.downloaded': 'Download started (demo)',
      'res.order': 'Order from shop',
      'res.orderToast': 'Demo: shop contact would open',
      'res.more': 'Try more',
      'res.aiBadge': 'AI generated',
      'res.note': 'Sample result — actual colour and fit may vary slightly.'
    }
  };

  /* ------------------------------ lang ------------------------------ */
  function getLang() {
    // ?lang=en / ?lang=bn in the URL wins (handy for screenshots).
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'bn') {
      setLang(fromUrl);
      return fromUrl;
    }
    try {
      const v = localStorage.getItem(LANG_KEY);
      if (v === 'en' || v === 'bn') return v;
    } catch (e) { /* storage unavailable */ }
    return 'bn';
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  }

  let lang = getLang();

  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) || I18N.bn[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    }
    return s;
  }

  // Pick the current-language value from a {bn, en} object.
  function L(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.bn || '';
  }

  /* --------------------------- formatting --------------------------- */
  const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

  function num(n) {
    const s = typeof n === 'number' ? n.toLocaleString('en-IN') : String(n);
    return lang === 'bn' ? s.replace(/[0-9]/g, (d) => BN_DIGITS[d]) : s;
  }

  function price(n) {
    return '৳' + num(n);
  }

  /* ------------------------------ icons ----------------------------- */
  const ICON_PATHS = {
    back: '<path d="M15 18l-6-6 6-6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    shirt: '<path d="M8.5 3.5L3 6.5l2 5 2.5-1V20.5h9V10.5l2.5 1 2-5-5.5-3a3.5 3.5 0 0 1-7 0z"/>',
    shoe: '<path d="M2.5 17.5h19v-1.2c0-1.4-1-2.3-2.8-2.8l-5.2-1.4-3-3.6H7.2l-.9 1.9H3.8L2.5 13z"/><path d="M2.5 17.5v1.8h19v-1.8"/><path d="M11 12.3l1.3-1.4M13.2 12.9l1.2-1.3"/>',
    glasses: '<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.4c1.3-.9 2.7-.9 4 0M3 14l1.6-6.5H7M21 14l-1.6-6.5H17"/>',
    upload: '<path d="M12 15.5V4M7 8.5L12 4l5 4.5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
    download: '<path d="M12 4v11.5M7 11l5 4.5 5-4.5"/><path d="M4 20h16"/>',
    camera: '<path d="M4 7.5h3l1.8-2.5h6.4L17 7.5h3a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.3" r="3.6"/>',
    gallery: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 15.5l-4.8-4.8L7 20"/>',
    qr: '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM14 20.5h1.5M20.5 14v1.5"/>',
    store: '<path d="M3.5 9L5 4h14l1.5 5"/><path d="M3.5 9h17v1.2a2.8 2.8 0 0 1-5.6 0 2.8 2.8 0 0 1-5.8 0 2.8 2.8 0 0 1-5.6 0z"/><path d="M5 13v7h14v-7M10 20v-4h4v4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.4-6 8-6s7 2 8 6"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2.2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    sparkle: '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    refresh: '<path d="M20 11.5A8 8 0 1 1 17.6 6"/><path d="M20 4v5.5h-5.5"/>',
    share: '<circle cx="18" cy="5.5" r="2.8"/><circle cx="6" cy="12" r="2.8"/><circle cx="18" cy="18.5" r="2.8"/><path d="M8.5 10.7l7-3.9M8.5 13.3l7 3.9"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    phone: '<path d="M5.2 3.5h3.6l1.8 4.6-2.3 1.5a11 11 0 0 0 6.1 6.1l1.5-2.3 4.6 1.8v3.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2z"/>',
    shield: '<path d="M12 3l7.5 3v5.6c0 4.8-3.2 8-7.5 9.4-4.3-1.4-7.5-4.6-7.5-9.4V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    badge: '<path d="M12 2.8l2.3 1.7 2.8-.2.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.2L12 21.2l-2.3-1.7-2.8.2-.9-2.7-2.3-1.6.9-2.7-.9-2.7L6 6.9l.9-2.7 2.8.2z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.4"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    bag: '<path d="M5 8h14l-1.1 12.1a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>',
    chat: '<path d="M4.5 19.5l1.3-3.8A8 8 0 1 1 8.6 18.4z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01"/>',
    facebook: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/>',
    printer: '<path d="M7 9V3.5h10V9"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    chart: '<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>',
    user2: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5.5 20.5c.7-3.8 3.3-5.8 6.5-5.8s5.8 2 6.5 5.8"/><path d="M8.5 21h7"/>',
    heart: '<path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.2 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.1 0 5.3 2.9 4.3 6.2C19.5 15.4 12 20 12 20z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>'
  };

  function icon(name, cls) {
    const p = ICON_PATHS[name] || '';
    return '<svg class="' + (cls || 'w-5 h-5') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

  const CATEGORY_ICON = { clothing: 'shirt', shoes: 'shoe', glasses: 'glasses' };

  /* ---------------------------- data utils --------------------------- */
  function getShop(id) {
    return DATA.shops.find((s) => s.id === id) || DATA.shops[0];
  }

  function getProduct(id) {
    return DATA.products.find((p) => p.id === id);
  }

  function shopProducts(shopId, category) {
    return DATA.products.filter((p) => p.shopId === shopId && (!category || category === 'all' || p.category === category));
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  // <img> with a placeholder fallback if the file or remote URL fails.
  function img(src, fallback, cls, alt) {
    const fb = fallback ? ' onerror="this.onerror=null;this.src=\'' + fallback + '\'"' : '';
    return '<img src="' + src + '"' + fb + ' alt="' + (alt || '').replace(/"/g, '&quot;') + '" class="' + (cls || '') + '" loading="lazy">';
  }

  function productImg(p, cls) {
    return img(p.image, p.fallback, cls, L(p.name));
  }

  /* ------------------------------ toast ------------------------------ */
  let toastTimer;
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast rounded-full bg-navy-900 text-white text-sm font-medium px-4 py-2.5 shadow-lift whitespace-nowrap';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ------------------------------ header ----------------------------- */
  function langToggle() {
    const on = 'bg-white text-navy shadow-sm';
    const off = 'text-slate-500';
    return (
      '<button type="button" data-lang-toggle class="flex items-center rounded-full bg-slate-100 p-0.5 text-xs font-semibold" aria-label="Switch language / ভাষা পরিবর্তন">' +
      '<span class="rounded-full px-2.5 py-1 font-bn ' + (lang === 'bn' ? on : off) + '">বাং</span>' +
      '<span class="rounded-full px-2.5 py-1 ' + (lang === 'en' ? on : off) + '">EN</span>' +
      '</button>'
    );
  }

  function wordmark(size) {
    return '<a href="index.html" class="wordmark ' + (size || 'text-[26px]') + '" aria-label="দর্পণ">দর্পণ</a>';
  }

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const variant = el.dataset.variant || 'main';
    const backHref = el.dataset.back || 'index.html';
    const base = 'sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-slate-100 bg-white/95 px-4 backdrop-blur';
    el.className = base;

    const backBtn =
      '<a href="' + backHref + '" class="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-slate-100" aria-label="' + t('common.back') + '">' + icon('back', 'w-6 h-6') + '</a>';

    if (variant === 'main') {
      el.innerHTML =
        wordmark() +
        '<div class="flex items-center gap-2">' + langToggle() +
        '<a href="collection.html" class="rounded-full px-3 py-1.5 text-sm font-semibold text-navy hover:bg-navy-50">' + t('nav.login') + '</a></div>';
    } else if (variant === 'back') {
      el.innerHTML =
        '<div class="flex items-center gap-1">' + backBtn + wordmark('text-[22px]') + '</div>' + langToggle();
    } else if (variant === 'dashboard') {
      const shop = getShop(DATA.demoShopId);
      el.innerHTML =
        wordmark() +
        '<div class="flex items-center gap-2">' + langToggle() +
        '<span class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white font-bn" style="background:' + shop.color + '">' + L(shop.initials) + '</span></div>';
    } else if (variant === 'customer') {
      // Customer-facing pages: shop identity instead of Darpan chrome.
      const shop = getShop(el.dataset.shop || DATA.demoShopId);
      el.innerHTML =
        '<div class="flex min-w-0 items-center gap-1">' + backBtn +
        '<span class="truncate font-semibold text-navy">' + L(shop.name) + '</span></div>' + langToggle();
    } else if (variant === 'minimal') {
      // Onboarding: wordmark + language toggle + optional "skip" link.
      const skip = el.dataset.skip;
      el.className = 'flex h-14 items-center justify-between gap-2 px-4';
      el.innerHTML =
        wordmark('text-[22px]') +
        '<div class="flex items-center gap-1">' + langToggle() +
        (skip ? '<a href="' + skip + '" class="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100">' + t('common.skip') + '</a>' : '') +
        '</div>';
    } else if (variant === 'store') {
      el.className = 'absolute top-0 inset-x-0 z-30 flex h-14 items-center justify-end px-4';
      el.innerHTML = langToggle();
    }
  }

  /* ---------------------------- bottom nav --------------------------- */
  function renderBottomNav() {
    const el = document.getElementById('bottom-nav');
    if (!el) return;
    const active = el.dataset.active;
    const items = [
      { id: 'collection', href: 'collection.html', icon: 'grid', label: 'nav.collection' },
      { id: 'qr', href: 'share.html', icon: 'qr', label: 'nav.qr' },
      { id: 'store', href: 'shop.html', icon: 'store', label: 'nav.store' },
      { id: 'profile', href: 'register.html', icon: 'user', label: 'nav.profile' }
    ];
    el.className = 'fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-slate-100 bg-white/95 backdrop-blur';
    el.innerHTML =
      '<div class="grid grid-cols-4 px-2 pb-[max(env(safe-area-inset-bottom),6px)] pt-1.5">' +
      items.map((it) => {
        const on = it.id === active;
        return '<a href="' + it.href + '" class="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium ' +
          (on ? 'text-navy' : 'text-slate-400') + '">' +
          '<span class="flex h-7 w-12 items-center justify-center rounded-full ' + (on ? 'bg-navy-50' : '') + '">' + icon(it.icon, 'w-[22px] h-[22px]') + '</span>' +
          t(it.label) + '</a>';
      }).join('') +
      '</div>';
  }

  /* --------------------------- static i18n --------------------------- */
  function applyI18n(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    scope.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon, el.dataset.iconClass || 'w-full h-full'); });
    document.documentElement.lang = lang;
  }

  function renderAll() {
    renderHeader();
    renderBottomNav();
    if (typeof window.renderPage === 'function') window.renderPage();
    applyI18n();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-lang-toggle]')) {
      lang = lang === 'bn' ? 'en' : 'bn';
      setLang(lang);
      renderAll();
    }
  });

  document.addEventListener('DOMContentLoaded', renderAll);

  // Public API for page scripts.
  window.Darpan = {
    DATA, t, L, num, price, icon, img, productImg, toast, param,
    getShop, getProduct, shopProducts, CATEGORY_ICON,
    get lang() { return lang; }
  };
})();
