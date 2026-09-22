/* Guide page — detailed step-by-step instructions (Bangla + English).
   Content lives here rather than in app.js because it is long-form text. */
(function () {
  const { num, icon } = window.Darpan;

  const GUIDE = {
    bn: {
      title: 'দর্পণ ব্যবহার নির্দেশিকা',
      intro: 'দর্পণ একটি ডিজিটাল আয়না — দোকানদার নিজের পণ্যের অনলাইন কালেকশন বানান, আর ক্রেতা নিজের ছবিতে পোশাক ট্রাই করে দেখেন। নিচে দোকানদার ও ক্রেতা দুজনের জন্যই ধাপে ধাপে পুরো প্রক্রিয়া দেওয়া হলো।',
      toc: 'এই পেজে যা আছে',
      stepWord: 'ধাপ',
      open: 'এই পেজে যান',
      sections: [
        {
          id: 'shopkeeper', icon: 'store', title: 'দোকানদারের জন্য',
          sub: 'দোকান খোলা থেকে QR কোড শেয়ার করা পর্যন্ত — প্রায় ১০ মিনিটের কাজ।',
          steps: [
            { t: 'দোকান রেজিস্টার করুন', href: 'register.html',
              d: 'হোম পেজে “আপনার দোকান রেজিস্টার করুন” বোতামে চাপ দিন।',
              b: ['দোকানের নাম, মালিকের নাম ও মোবাইল নম্বর লিখুন।', 'জেলা বেছে নিন এবং দোকানের পূর্ণ ঠিকানা দিন (দোকান নং, মার্কেট, এলাকা)।', 'দোকানের ধরন বেছে নিন — অফলাইন (বাজারের দোকান) নাকি অনলাইন (Facebook/Daraz)।', 'কী কী বিক্রি করেন তা টিক দিন: পোশাক, জুতা, চশমা — একাধিক দেওয়া যায়।', 'চাইলে দোকানের লোগো বা ছবি আপলোড করুন, তারপর “রেজিস্টার করুন” চাপুন।'] },
            { t: 'ছোট টিউটোরিয়াল দেখুন', href: 'onboarding.html',
              d: 'রেজিস্ট্রেশনের পর ৪ ধাপের একটি টিউটোরিয়াল আসবে।',
              b: ['“পরবর্তী” চেপে প্রতিটি ধাপ পড়ুন, অথবা “এড়িয়ে যান” চেপে সরাসরি ড্যাশবোর্ডে যান।', 'প্রতিটি ধাপের নিচে হলুদ বক্সে কাজের টিপস আছে।'] },
            { t: 'পণ্যের ছবি তুলুন ও যোগ করুন', href: 'collection.html',
              d: '“আমার কালেকশন” পেজে সবার আগে থাকা “+ পণ্য যোগ করুন” কার্ডে চাপ দিন।',
              b: ['পণ্যটি হ্যাঙ্গারে বা সমতলে রেখে সামনে থেকে ছবি তুলুন।', 'সাদা বা হালকা রঙের ব্যাকগ্রাউন্ড, দিনের আলো — এতে AI সবচেয়ে ভালো কাজ করে।', 'পণ্যের নাম, দাম, সাইজ ও রং লিখুন; পুরুষ না নারী তা বেছে নিন।', 'প্রতিটি পণ্যের অন্তত একটি পরিষ্কার ছবি দিন।'] },
            { t: 'কালেকশন সাজান', href: 'collection.html',
              d: 'ড্যাশবোর্ডে পোশাক / চশমা / জুতা ট্যাবে পণ্যগুলো আলাদা করে দেখা যায়।',
              b: ['সার্চ বক্সে নাম লিখে দ্রুত পণ্য খুঁজুন।', 'সবুজ “প্রকাশিত” ট্যাগ মানে ক্রেতা পণ্যটি দেখতে পাবে; “খসড়া” মানে এখনও লুকানো।', 'প্রতিটি কার্ডে দেখা যায় পণ্যটি কতবার ট্রাই করা হয়েছে।', 'উপরের নীল কার্ডে আজকের ভিজিট ও ট্রাই-অনের সংখ্যা থাকে।'] },
            { t: 'QR কোড তৈরি ও ডাউনলোড করুন', href: 'share.html',
              d: 'নিচের “QR কোড তৈরি করুন” বোতাম বা নিচের মেনুর “QR কোড” চাপুন।',
              b: ['আপনার দোকানের নিজস্ব QR কোড সঙ্গে সঙ্গে তৈরি হয়ে যাবে।', '“ডাউনলোড QR” চাপলে দোকানের নামসহ প্রিন্টের উপযোগী একটি ছবি (PNG) সেভ হবে।', 'A5 সাইজে প্রিন্ট করে কাউন্টার, আয়না বা ট্রায়াল রুমের পাশে লাগিয়ে দিন।'] },
            { t: 'লিংক শেয়ার করুন', href: 'share.html',
              d: 'অনলাইন সেলাররা QR-এর নিচের লিংকটি ব্যবহার করুন।',
              b: ['“কপি” চেপে লিংক কপি করুন।', 'Facebook পেজ, WhatsApp, Daraz স্টোর বা Instagram বায়োতে লিংকটি দিন।', '“ক্রেতার চোখে দোকান দেখুন” চেপে দেখে নিন ক্রেতা ঠিক কী দেখবেন।'] }
          ]
        },
        {
          id: 'customer', icon: 'bag', title: 'ক্রেতার জন্য',
          sub: 'কোনো অ্যাপ ইনস্টল ছাড়াই মোবাইলে নিজের ছবিতে পোশাক ট্রাই করুন।',
          steps: [
            { t: 'QR কোড স্ক্যান করুন', href: 'shop.html',
              d: 'ফোনের ক্যামেরা দোকানের QR কোডের দিকে ধরুন, লিংকটি এলে চাপ দিন।',
              b: ['অথবা দোকানের দেওয়া লিংকে সরাসরি চাপ দিন।', 'দোকানের নাম, ঠিকানা ও খোলার সময়সহ কালেকশন পেজ খুলবে।'] },
            { t: 'পণ্য খুঁজুন ও ফিল্টার করুন', href: 'shop.html',
              d: 'উপরের ট্যাবে সব / পোশাক / চশমা / জুতা বেছে নিন।',
              b: ['“পুরুষ” বা “নারী” চেপে শুধু সেই পণ্যগুলো দেখুন।', 'দামের সীমা বেছে নিন: ৳১,৫০০-এর নিচে, ৳১,৫০০–২,৫০০ বা ৳২,৫০০+।', '“সাজান” মেনু থেকে দাম কম → বেশি বা বেশি → কম সাজান।', '“ফিল্টার মুছুন” চাপলে আবার সব পণ্য দেখা যাবে।'] },
            { t: 'পণ্য বেছে নিন', href: 'product.html',
              d: 'যেকোনো পণ্যের ছবিতে চাপ দিলে বিস্তারিত পেজ খুলবে।',
              b: ['দাম, সাইজ, রং ও বিবরণ দেখুন।', 'নীল বক্সে “ফ্রি AI” লেখা থাকলে পণ্যটি AI দিয়ে ট্রাই করা যাবে।'] },
            { t: 'গ্যালারি থেকে আপনার ছবি দিন', href: 'product.html#try',
              d: '“আপনার ছবি দিয়ে ট্রাই করুন” বা “গ্যালারি থেকে আপলোড” চাপলেই ফোনের গ্যালারি খুলবে — একটি ছবি বেছে নিন।',
              b: ['সামনে থেকে তোলা, মাথা থেকে অন্তত কোমর পর্যন্ত দেখা যায় এমন ছবি দিন।', 'একা আপনি থাকবেন — অন্য মানুষ বা বড় ব্যাগ যেন শরীর না ঢাকে।', 'ভালো আলো, সোজা হয়ে দাঁড়ানো ভঙ্গি দিলে ফলাফল সবচেয়ে সুন্দর হয়।', 'ক্যামেরা দিয়ে সরাসরি ছবি তোলার সুবিধা শিগগির আসছে।'] },
            { t: 'AI প্রসেসিং-এর জন্য অপেক্ষা করুন', href: null,
              d: 'ছবি দেওয়ার পর AI আপনার ছবিতে পোশাকটি বসাতে শুরু করবে।',
              b: ['সাধারণত ২০–৬০ সেকেন্ড লাগে; পেজটি বন্ধ করবেন না।', 'স্ক্রিনে ধাপগুলো (ছবি → সংযোগ → AI) আর বাকি সময় দেখা যাবে।', 'ছবিটি আগে ছোট করে পাঠানো হয়, তাই কম ইন্টারনেটেও চলে।'] },
            { t: 'ফলাফল দেখুন, তুলনা করুন ও সেভ করুন', href: 'tryon-result.html',
              d: 'ফলাফল পেজে আগে ও পরের ছবি পাশাপাশি দেখানো হয়।',
              b: ['মাঝের গোল হ্যান্ডেল ডানে-বামে টেনে আগে-পরে তুলনা করুন।', '“ডাউনলোড” চেপে ছবিটি ফোনে সেভ করুন বা বন্ধুদের পাঠান।', '“আবার চেষ্টা করুন” চেপে অন্য ছবি দিয়ে ট্রাই করুন।', 'পছন্দ হলে “দোকানে অর্ডার করুন” চাপুন।'] }
          ]
        },
        {
          id: 'ai', icon: 'sparkle', title: 'AI ট্রাই-অন কীভাবে কাজ করে',
          sub: 'কোনো অ্যাকাউন্ট, পেমেন্ট বা key লাগে না — সবার জন্য ফ্রি।',
          steps: [
            { t: 'ফ্রি ওপেন-সোর্স AI', href: null,
              d: 'দর্পণ IDM-VTON নামের একটি ওপেন-সোর্স AI মডেল ব্যবহার করে, যা Hugging Face-এ বিনামূল্যে চলে।',
              b: ['ক্রেতা বা দোকানদার কাউকে সাইন-আপ বা পেমেন্ট করতে হয় না।', 'ছবি দিলেই AI নিজে থেকে বুঝে নেয় শরীরের কোথায় পোশাক বসবে।'] },
            { t: 'কত সময় লাগে', href: null,
              d: 'সাধারণত ২০–৬০ সেকেন্ড।',
              b: ['অনেকে একসাথে ব্যবহার করলে লাইনে অপেক্ষা করতে হতে পারে — স্ক্রিনে দেখাবে আপনার আগে কতজন আছেন।', 'AI কাজ শুরু করলে বাকি সময় সেকেন্ডে দেখানো হয়।', 'যেকোনো সময় “বাতিল করুন” চাপতে পারেন।'] },
            { t: 'AI ব্যস্ত থাকলে', href: null,
              d: 'ফ্রি সার্ভিস হওয়ায় মাঝে মাঝে AI ব্যস্ত থাকতে পারে বা দিনের সীমা শেষ হতে পারে।',
              b: ['তখন আপনাকে আটকে না রেখে সঙ্গে সঙ্গে একটি নমুনা ফলাফল দেখানো হয়।', 'ফলাফল পেজে “AI দিয়ে আবার চেষ্টা” চাপলে একই ছবি দিয়ে আবার চেষ্টা হবে — নতুন করে ছবি বাছতে হবে না।'] }
          ]
        },
        {
          id: 'tips', icon: 'sun', title: 'ভালো ছবির টিপস',
          sub: 'ছবি যত ভালো, AI ফলাফল তত বাস্তব।',
          good: ['সামনে থেকে তোলা, সোজা ভঙ্গি', 'দিনের আলো বা উজ্জ্বল ঘর', 'মাথা থেকে কোমর/হাঁটু পর্যন্ত', 'সাধারণ, পরিষ্কার ব্যাকগ্রাউন্ড', 'শরীরের সাথে মানানসই জামা'],
          bad: ['ঝাপসা বা অন্ধকার ছবি', 'পাশ থেকে বা বেশি কোণ থেকে তোলা', 'একাধিক মানুষ একসাথে', 'হাত বা ব্যাগে শরীর ঢাকা', 'খুব ভারী/বড় জ্যাকেট পরা'],
          goodTitle: 'এমন ছবি দিন', badTitle: 'এমন ছবি এড়িয়ে চলুন'
        }
      ],
      faqTitle: 'সাধারণ প্রশ্ন',
      faq: [
        ['কোনো অ্যাপ ডাউনলোড করতে হবে?', 'না। দর্পণ ওয়েবসাইট, তাই ফোন, ট্যাব বা কম্পিউটারের যেকোনো ব্রাউজারে (Chrome, Safari, Edge) চলে।'],
        ['ইন্টারনেট কতটুকু লাগবে?', 'সাধারণ মোবাইল ডেটাই যথেষ্ট। ছবি পাঠানোর আগে ছোট করে নেওয়া হয়।'],
        ['আমার ছবি কি কোথাও সংরক্ষণ হয়?', 'ছবি শুধু ট্রাই-অন তৈরির জন্য ফ্রি AI সার্ভারে (Hugging Face) পাঠানো হয়। দর্পণ নিজে কোনো ছবি জমা রাখে না।'],
        ['জুতা ও চশমা কি ট্রাই করা যায়?', 'এখন আসল AI ট্রাই-অন শুধু পোশাকের জন্য। জুতা ও চশমায় আপাতত ডেমো ফলাফল দেখানো হয়।'],
        ['খরচ কত?', 'সম্পূর্ণ ফ্রি — দোকানদার বা ক্রেতা কাউকেই টাকা দিতে হয় না।'],
        ['AI ব্যস্ত থাকলে কী হবে?', 'সঙ্গে সঙ্গে একটি নমুনা ফলাফল দেখানো হয়। পরে “AI দিয়ে আবার চেষ্টা” চাপলে একই ছবি দিয়ে আবার AI চালানো যায়।']
      ]
    },

    en: {
      title: 'How to use Darpan',
      intro: 'Darpan is a digital mirror: shopkeepers build an online collection of their products, and customers try clothes on their own photo. Below is the full step-by-step process for both.',
      toc: 'On this page',
      stepWord: 'Step',
      open: 'Open this page',
      sections: [
        {
          id: 'shopkeeper', icon: 'store', title: 'For shopkeepers',
          sub: 'From opening your shop to sharing the QR code — about 10 minutes.',
          steps: [
            { t: 'Register your shop', href: 'register.html',
              d: 'On the home page, tap “Register your shop”.',
              b: ['Enter the shop name, owner’s name and mobile number.', 'Choose the district and write the full address (shop no., market, area).', 'Choose the shop type — physical (market shop) or online (Facebook/Daraz).', 'Tick what you sell: clothing, shoes, glasses — more than one is fine.', 'Optionally upload a logo or shop photo, then tap “Register”.'] },
            { t: 'Watch the short tutorial', href: 'onboarding.html',
              d: 'After registering, a 4-step tutorial appears.',
              b: ['Tap “Next” to read each step, or “Skip” to go straight to the dashboard.', 'Each step has a tip in the yellow box.'] },
            { t: 'Photograph and add products', href: 'collection.html',
              d: 'On “My collection”, tap the first card, “+ Add product”.',
              b: ['Lay the item flat or hang it, and shoot it from the front.', 'A white or light background and daylight give the AI the best results.', 'Enter the name, price, sizes and colours, and choose men or women.', 'Give every product at least one clear photo.'] },
            { t: 'Organise your collection', href: 'collection.html',
              d: 'The dashboard splits products into Clothing / Glasses / Shoes tabs.',
              b: ['Type in the search box to find a product quickly.', 'A green “Live” tag means customers can see it; “Draft” means it is hidden.', 'Each card shows how many times the item was tried on.', 'The blue card at the top shows today’s visits and try-ons.'] },
            { t: 'Create and download the QR code', href: 'share.html',
              d: 'Tap “Generate QR code” or “QR Code” in the bottom menu.',
              b: ['Your shop’s own QR code is created instantly.', '“Download QR” saves a print-ready image (PNG) with your shop name.', 'Print it at A5 size and put it by the counter, mirror or trial room.'] },
            { t: 'Share the link', href: 'share.html',
              d: 'Online sellers can use the link below the QR code.',
              b: ['Tap “Copy” to copy the link.', 'Post it on your Facebook page, WhatsApp, Daraz store or Instagram bio.', 'Tap “Preview as a customer” to see exactly what buyers will see.'] }
          ]
        },
        {
          id: 'customer', icon: 'bag', title: 'For customers',
          sub: 'Try clothes on your own photo from your phone — no app to install.',
          steps: [
            { t: 'Scan the QR code', href: 'shop.html',
              d: 'Point your phone camera at the shop’s QR code and tap the link that appears.',
              b: ['Or simply tap the link the shop shared.', 'The collection page opens with the shop’s name, address and opening hours.'] },
            { t: 'Browse and filter', href: 'shop.html',
              d: 'Choose All / Clothing / Glasses / Shoes in the tabs.',
              b: ['Tap “Men” or “Women” to see only those items.', 'Pick a price range: under ৳1,500, ৳1,500–2,500 or ৳2,500+.', 'Use the “Sort” menu for price low → high or high → low.', 'Tap “Clear filters” to see everything again.'] },
            { t: 'Pick a product', href: 'product.html',
              d: 'Tap any product photo to open its details.',
              b: ['Check the price, sizes, colours and description.', '“Free AI” in the blue box means the item can be tried on with AI.'] },
            { t: 'Upload your photo from the gallery', href: 'product.html#try',
              d: 'Tap “Try it with your photo” or “Upload from gallery” — your phone gallery opens straight away. Pick a photo.',
              b: ['Use a front-facing photo showing you from head to at least the waist.', 'Only you in the photo — no other people or big bags covering your body.', 'Good light and a straight, natural pose give the best results.', 'Taking a photo directly with the camera is coming soon.'] },
            { t: 'Wait for the AI', href: null,
              d: 'After you choose a photo, the AI starts fitting the outfit onto you.',
              b: ['It usually takes 20–60 seconds; keep the page open.', 'The screen shows each stage (Photo → Connect → AI) and the time left.', 'Your photo is shrunk before sending, so it works on slow connections.'] },
            { t: 'See, compare and save the result', href: 'tryon-result.html',
              d: 'The result page shows before and after side by side.',
              b: ['Drag the round handle left and right to compare.', 'Tap “Download” to save the image or send it to friends.', 'Tap “Try again” to use a different photo.', 'Like it? Tap “Order from shop”.'] }
          ]
        },
        {
          id: 'ai', icon: 'sparkle', title: 'How the AI try-on works',
          sub: 'No account, payment or key needed — free for everyone.',
          steps: [
            { t: 'Free, open-source AI', href: null,
              d: 'Darpan uses IDM-VTON, an open-source AI model that runs for free on Hugging Face.',
              b: ['Neither customers nor shopkeepers need to sign up or pay.', 'From your photo alone, the AI works out where the outfit goes on your body.'] },
            { t: 'How long it takes', href: null,
              d: 'Usually 20–60 seconds.',
              b: ['When many people use it at once there may be a queue — the screen shows how many are ahead of you.', 'Once the AI starts, a countdown shows the seconds left.', 'You can tap “Cancel” at any time.'] },
            { t: 'If the AI is busy', href: null,
              d: 'Because it is a free service, the AI is sometimes busy or reaches its daily limit.',
              b: ['Instead of making you wait, a sample result is shown straight away.', 'Tap “Try again with AI” on the result page to retry with the same photo — no need to pick it again.'] }
          ]
        },
        {
          id: 'tips', icon: 'sun', title: 'Photo tips',
          sub: 'The better the photo, the more realistic the AI result.',
          good: ['Taken from the front, standing straight', 'Daylight or a bright room', 'Head to waist or knees visible', 'Plain, uncluttered background', 'Fitted everyday clothes'],
          bad: ['Blurry or dark photos', 'Side-on or steep angles', 'Several people together', 'Body covered by arms or bags', 'Very bulky jackets'],
          goodTitle: 'Use photos like this', badTitle: 'Avoid photos like this'
        }
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        ['Do I need to download an app?', 'No. Darpan is a website, so it works in any browser (Chrome, Safari, Edge) on a phone, tablet or computer.'],
        ['How much internet does it need?', 'Normal mobile data is enough. Photos are shrunk before sending.'],
        ['Is my photo stored anywhere?', 'It is sent to the free AI server (Hugging Face) only to create the try-on. Darpan itself does not keep photos.'],
        ['Can I try shoes and glasses?', 'Real AI try-on is for clothing only for now. Shoes and glasses show a demo result.'],
        ['What does it cost?', 'Completely free — neither shopkeepers nor customers pay anything.'],
        ['What if the AI is busy?', 'A sample result is shown right away. Tap “Try again with AI” later to rerun the AI with the same photo.']
      ]
    }
  };

  function stepCard(step, i, g) {
    const external = step.href && /^https?:/.test(step.href);
    const link = step.href
      ? '<a href="' + step.href + '"' + (external ? ' target="_blank" rel="noopener"' : '') + ' class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">' +
          (external ? step.href.replace('https://', '') : g.open) + icon(external ? 'link' : 'chevronRight', 'h-4 w-4') + '</a>'
      : '';
    return '<li class="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-card md:p-5">' +
      '<div class="flex items-start gap-3">' +
        '<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-extrabold text-white">' + num(i + 1) + '</span>' +
        '<div class="min-w-0">' +
          '<p class="text-[11px] font-bold uppercase tracking-wide text-accent">' + g.stepWord + ' ' + num(i + 1) + '</p>' +
          '<h3 class="font-bold text-slate-900 md:text-lg">' + step.t + '</h3>' +
          '<p class="mt-1 text-sm text-slate-600">' + step.d + '</p>' +
          '<ul class="mt-2 space-y-1.5">' + step.b.map((x) =>
            '<li class="flex items-start gap-2 text-sm text-slate-600">' + icon('check', 'mt-0.5 h-4 w-4 shrink-0 text-emerald-500') + '<span>' + x + '</span></li>'
          ).join('') + '</ul>' +
          link +
        '</div>' +
      '</div>' +
    '</li>';
  }

  function tipsCard(sec) {
    const col = (items, good) =>
      '<div class="rounded-2xl p-4 ' + (good ? 'bg-emerald-50' : 'bg-rose-50') + '">' +
        '<p class="font-bold ' + (good ? 'text-emerald-800' : 'text-rose-800') + '">' + (good ? sec.goodTitle : sec.badTitle) + '</p>' +
        '<ul class="mt-2 space-y-1.5">' + items.map((x) =>
          '<li class="flex items-start gap-2 text-sm ' + (good ? 'text-emerald-900' : 'text-rose-900') + '">' +
            icon(good ? 'check' : 'close', 'mt-0.5 h-4 w-4 shrink-0') + '<span>' + x + '</span></li>'
        ).join('') + '</ul></div>';
    return '<div class="mt-4 grid gap-3 md:grid-cols-2">' + col(sec.good, true) + col(sec.bad, false) + '</div>';
  }

  window.renderPage = function () {
    const g = GUIDE[window.Darpan.lang] || GUIDE.bn;
    document.getElementById('guide-title').textContent = g.title;
    document.getElementById('guide-intro').textContent = g.intro;
    document.title = g.title + ' — দর্পণ';

    const tocItems = g.sections.map((s) => ({ id: s.id, icon: s.icon, title: s.title })).concat([{ id: 'faq', icon: 'alert', title: g.faqTitle }]);
    document.getElementById('guide-toc').innerHTML =
      '<p class="hidden text-xs font-bold uppercase tracking-wide text-slate-400 lg:block">' + g.toc + '</p>' +
      '<div class="no-scrollbar flex gap-2 overflow-x-auto lg:mt-3 lg:flex-col lg:overflow-visible">' +
      tocItems.map((s) =>
        '<a href="#' + s.id + '" class="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-navy-50 px-3.5 py-2 text-sm font-semibold text-navy hover:bg-navy-100 lg:rounded-xl">' +
          icon(s.icon, 'h-4 w-4') + s.title + '</a>'
      ).join('') + '</div>';

    document.getElementById('guide-sections').innerHTML = g.sections.map((sec) =>
      '<section id="' + sec.id + '" class="scroll-mt-20 pt-8 first:pt-0">' +
        '<div class="flex items-center gap-3">' +
          '<span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent">' + icon(sec.icon, 'h-6 w-6') + '</span>' +
          '<div><h2 class="text-xl font-extrabold text-navy md:text-2xl">' + sec.title + '</h2>' +
          '<p class="text-sm text-slate-500">' + sec.sub + '</p></div>' +
        '</div>' +
        (sec.steps
          ? '<ol class="mt-4 grid gap-3 xl:grid-cols-2">' + sec.steps.map((st, i) => stepCard(st, i, g)).join('') + '</ol>'
          : tipsCard(sec)) +
      '</section>'
    ).join('') +
      '<section id="faq" class="scroll-mt-20 pt-8">' +
        '<h2 class="text-xl font-extrabold text-navy md:text-2xl">' + g.faqTitle + '</h2>' +
        '<div class="mt-4 space-y-2">' + g.faq.map(([q, a]) =>
          '<details class="group rounded-2xl border border-slate-100 bg-white p-4 shadow-card">' +
            '<summary class="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-900">' + q +
              '<span class="shrink-0 text-slate-400 transition group-open:rotate-90">' + icon('chevronRight', 'h-5 w-5') + '</span></summary>' +
            '<p class="mt-2 text-sm text-slate-600">' + a + '</p>' +
          '</details>'
        ).join('') + '</div>' +
      '</section>';
  };

})();
