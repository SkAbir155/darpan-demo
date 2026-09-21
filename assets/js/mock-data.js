/* =====================================================================
   দর্পণ — MOCK DATA (demo only)
   ---------------------------------------------------------------------
   Every shop, product and image reference used by the demo lives here.
   TODO: replace this whole file with real API calls, e.g.
         GET /api/shops/:slug      → shop profile
         GET /api/shops/:slug/products → product list
   ===================================================================== */

window.DARPAN_DATA = (function () {
  'use strict';

  // Local clothing photos live in /Images/Dresses/ (filenames kept as-is).
  const DRESS_DIR = 'Images/Dresses/';

  // Placeholder helpers for categories without local photos.
  // loremflickr gives topic-matched photos; picsum is the fallback if it fails.
  const flickr = (topic, lock) => `https://loremflickr.com/480/600/${topic}?lock=${lock}`;
  const picsum = (seed) => `https://picsum.photos/seed/darpan-${seed}/480/600`;

  const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];
  const SHOE_SIZES = [36, 37, 38, 39, 40];

  /* ---------------------------- SHOPS ---------------------------- */
  const shops = [
    {
      id: 'mayer-doa',
      type: 'offline',
      name: { bn: 'মায়ের দোয়া বস্ত্র বিতান', en: 'Mayer Doa Bostro Bitan' },
      initials: { bn: 'মা', en: 'MD' },
      owner: { bn: 'মোঃ আব্দুল করিম', en: 'Md. Abdul Karim' },
      phone: '01712-345678',
      address: { bn: 'দোকান নং ১৪৭, ২য় তলা, নিউ মার্কেট, ঢাকা-১২০৫', en: 'Shop 147, 2nd floor, New Market, Dhaka-1205' },
      district: 'dhaka',
      area: { bn: 'নিউ মার্কেট, ঢাকা', en: 'New Market, Dhaka' },
      hours: { bn: 'সকাল ১০টা – রাত ৯টা', en: '10 am – 9 pm' },
      categories: ['clothing', 'shoes', 'glasses'],
      focus: 'clothing',
      color: '#1F3864',
      url: 'https://darpan.app/s/mayer-doa',
      stats: { visitsToday: 128, tryOnsToday: 46 }
    },
    {
      id: 'sonali-juta',
      type: 'offline',
      name: { bn: 'সোনালী জুতা ঘর', en: 'Sonali Juta Ghor' },
      initials: { bn: 'সো', en: 'SJ' },
      owner: { bn: 'রফিকুল ইসলাম', en: 'Rafiqul Islam' },
      phone: '01819-220415',
      address: { bn: 'চকবাজার মোড়, চট্টগ্রাম', en: 'Chawkbazar Mor, Chattogram' },
      district: 'chattogram',
      area: { bn: 'চকবাজার, চট্টগ্রাম', en: 'Chawkbazar, Chattogram' },
      hours: { bn: 'সকাল ১১টা – রাত ১০টা', en: '11 am – 10 pm' },
      categories: ['shoes'],
      focus: 'shoes',
      color: '#B45309',
      url: 'https://darpan.app/s/sonali-juta'
    },
    {
      id: 'noor-optical',
      type: 'offline',
      name: { bn: 'নূর অপটিক্যালস', en: 'Noor Opticals' },
      initials: { bn: 'নূ', en: 'NO' },
      owner: { bn: 'শাহানা বেগম', en: 'Shahana Begum' },
      phone: '01711-908172',
      address: { bn: 'জিন্দাবাজার, সিলেট', en: 'Zindabazar, Sylhet' },
      district: 'sylhet',
      area: { bn: 'জিন্দাবাজার, সিলেট', en: 'Zindabazar, Sylhet' },
      hours: { bn: 'সকাল ১০টা – রাত ৮টা', en: '10 am – 8 pm' },
      categories: ['glasses'],
      focus: 'glasses',
      color: '#047857',
      url: 'https://darpan.app/s/noor-optical'
    },
    {
      id: 'urban-loom',
      type: 'online',
      channel: 'Facebook',
      name: { bn: 'Urban Loom', en: 'Urban Loom' },
      initials: { bn: 'UL', en: 'UL' },
      owner: { bn: 'নাফিসা তাবাসসুম', en: 'Nafisa Tabassum' },
      phone: '01910-554433',
      address: { bn: 'অনলাইন — ফেসবুক পেজ', en: 'Online — Facebook page' },
      district: 'dhaka',
      area: { bn: 'ফেসবুক শপ', en: 'Facebook shop' },
      hours: { bn: '২৪ ঘণ্টা অর্ডার', en: 'Orders 24/7' },
      categories: ['clothing'],
      focus: 'clothing',
      color: '#7C3AED',
      url: 'https://darpan.app/s/urban-loom'
    },
    {
      id: 'kaya-closet',
      type: 'online',
      channel: 'Daraz',
      name: { bn: 'Kaya Closet BD', en: 'Kaya Closet BD' },
      initials: { bn: 'KC', en: 'KC' },
      owner: { bn: 'তাসনিম রহমান', en: 'Tasnim Rahman' },
      phone: '01633-118822',
      address: { bn: 'অনলাইন — Daraz স্টোর', en: 'Online — Daraz store' },
      district: 'dhaka',
      area: { bn: 'Daraz স্টোর', en: 'Daraz store' },
      hours: { bn: '২৪ ঘণ্টা অর্ডার', en: 'Orders 24/7' },
      categories: ['clothing', 'shoes'],
      focus: 'clothing',
      color: '#DB2777',
      url: 'https://darpan.app/s/kaya-closet'
    }
  ];

  /* --------------------------- PRODUCTS --------------------------- */
  // `file` = local photo in DRESS_DIR; `remote` = placeholder URL.
  const products = [
    // --- মায়ের দোয়া বস্ত্র বিতান (demo shop) — clothing ---
    {
      id: 'md-01', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 34,
      file: 'Bengali clothes, Bengali salwar kameez from Modubond 🇧🇩.jfif',
      name: { bn: 'সুতি সালোয়ার কামিজ সেট', en: 'Cotton Salwar Kameez Set' },
      price: 1850, sizes: CLOTHING_SIZES, colors: ['#9F1239', '#FDE68A', '#1E3A8A'],
      desc: { bn: 'আরামদায়ক সুতি কাপড়ে তৈরি তিন পিসের সেট। গরমে প্রতিদিন পরার জন্য উপযুক্ত, ওড়নায় হালকা হাতের কাজ।', en: 'A breathable three-piece set in soft cotton. Made for everyday summer wear, with light handwork on the dupatta.' }
    },
    {
      id: 'md-02', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 52,
      file: 'Ethnic Elegance_ Red Printed Peplum Frock with Bell Sleeves.jfif',
      name: { bn: 'লাল প্রিন্টেড পেপলাম ফ্রক', en: 'Red Printed Peplum Frock' },
      price: 1450, sizes: CLOTHING_SIZES, colors: ['#B91C1C', '#F59E0B'],
      desc: { bn: 'বেল স্লিভ ও পেপলাম কাটের লাল প্রিন্টেড ফ্রক। ঈদ, দাওয়াত বা ঘরোয়া অনুষ্ঠানে মানানসই।', en: 'A red printed frock with bell sleeves and a peplum cut. Great for Eid, dawats and family events.' }
    },
    {
      id: 'md-03', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 21,
      file: 'Dhaka aesthetic 🇧🇩.jfif',
      name: { bn: 'ঢাকাই স্টাইল থ্রি-পিস', en: 'Dhakai Style Three-Piece' },
      price: 2200, sizes: CLOTHING_SIZES, colors: ['#0F766E', '#F5F5F4'],
      desc: { bn: 'ঢাকাই নকশার ছোঁয়ায় তৈরি থ্রি-পিস। নরম কাপড়, সুন্দর ফিনিশিং।', en: 'A three-piece with a classic Dhakai motif. Soft fabric with a neat finish.' }
    },
    {
      id: 'md-04', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 18,
      file: 'Boho Desi Vibes✨♥️.jfif',
      name: { bn: 'বোহো দেশি কুর্তি', en: 'Boho Desi Kurti' },
      price: 1250, sizes: CLOTHING_SIZES, colors: ['#A16207', '#FEF3C7'],
      desc: { bn: 'দেশি ও বোহো স্টাইলের মিশেলে ক্যাজুয়াল কুর্তি। জিন্স বা পালাজোর সাথে পরা যায়।', en: 'A casual kurti mixing desi and boho style. Pairs with jeans or palazzos.' }
    },
    {
      id: 'md-05', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 12,
      file: 'neck design.jfif',
      name: { bn: 'গলায় কাজ করা কুর্তি', en: 'Embroidered Neck Kurti' },
      price: 1100, sizes: CLOTHING_SIZES, colors: ['#1D4ED8', '#FFFFFF'],
      desc: { bn: 'গলায় সূক্ষ্ম এমব্রয়ডারি করা কুর্তি। অফিস ও ক্যাজুয়াল দুই জায়গাতেই মানায়।', en: 'A kurti with fine embroidery around the neckline. Works for office and casual days.' }
    },
    {
      id: 'md-06', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 29,
      file: 'Westerns could never beat this VIBE!! 🦋✨.jfif',
      name: { bn: 'এমব্রয়ডারি আনারকলি', en: 'Embroidered Anarkali' },
      price: 2650, sizes: CLOTHING_SIZES, colors: ['#7E22CE', '#FACC15'],
      desc: { bn: 'ঘের যুক্ত আনারকলি, বুকে ও হাতায় জমকালো এমব্রয়ডারি। বিয়ে ও উৎসবের জন্য।', en: 'A flared anarkali with rich embroidery on the yoke and sleeves. Made for weddings and festivals.' }
    },
    {
      id: 'md-07', shopId: 'mayer-doa', category: 'clothing', live: false, tries: 0,
      file: 'so cuteeee.jfif',
      name: { bn: 'ফ্লোরাল কটন ফ্রক', en: 'Floral Cotton Frock' },
      price: 980, sizes: CLOTHING_SIZES, colors: ['#F472B6', '#FFFFFF'],
      desc: { bn: 'ফুলের প্রিন্টের হালকা কটন ফ্রক। গরমের দিনে আরামদায়ক।', en: 'A light cotton frock with a floral print. Comfortable on hot days.' }
    },
    {
      id: 'md-08', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 40,
      file: 'good looking dress 😎😁.jfif',
      name: { bn: 'পার্টি গাউন', en: 'Party Gown' },
      price: 3200, sizes: CLOTHING_SIZES, colors: ['#111827', '#BE185D'],
      desc: { bn: 'লম্বা ঘেরের পার্টি গাউন। সন্ধ্যার অনুষ্ঠানে নজরকাড়া লুকের জন্য।', en: 'A full-length party gown for a standout evening look.' }
    },
    {
      id: 'md-09', shopId: 'mayer-doa', category: 'clothing', live: true, tries: 15,
      file: '1124703706967500367.jfif',
      name: { bn: 'হাতের কাজের থ্রি-পিস', en: 'Hand-stitched Three-Piece' },
      price: 2400, sizes: CLOTHING_SIZES, colors: ['#065F46', '#FDE68A'],
      desc: { bn: 'হাতে সেলাই করা নকশার থ্রি-পিস। প্রতিটি পিস আলাদাভাবে তৈরি।', en: 'A three-piece with hand-stitched details. Each piece is made individually.' }
    },

    // --- মায়ের দোয়া — shoes (placeholder photos) ---
    {
      id: 'md-s1', shopId: 'mayer-doa', category: 'shoes', live: true, tries: 9,
      remote: flickr('sandals', 101), fallback: picsum('shoe-1'),
      name: { bn: 'চামড়ার নাগরা', en: 'Leather Nagra' },
      price: 1350, sizes: SHOE_SIZES, colors: ['#78350F', '#000000'],
      desc: { bn: 'খাঁটি চামড়ার ঐতিহ্যবাহী নাগরা জুতা। পাঞ্জাবি ও শাড়ির সাথে মানানসই।', en: 'Traditional nagra shoes in genuine leather. Pairs with panjabi or saree.' }
    },
    {
      id: 'md-s2', shopId: 'mayer-doa', category: 'shoes', live: true, tries: 6,
      remote: flickr('heels', 102), fallback: picsum('shoe-2'),
      name: { bn: 'হিল স্যান্ডেল', en: 'Block Heel Sandal' },
      price: 1650, sizes: SHOE_SIZES, colors: ['#D6D3D1', '#1F2937'],
      desc: { bn: 'আরামদায়ক ব্লক হিল স্যান্ডেল, সারাদিন পরার উপযোগী।', en: 'A comfortable block-heel sandal you can wear all day.' }
    },
    {
      id: 'md-s3', shopId: 'mayer-doa', category: 'shoes', live: true, tries: 4,
      remote: flickr('sneakers', 103), fallback: picsum('shoe-3'),
      name: { bn: 'ক্যাজুয়াল স্নিকার্স', en: 'Casual Sneakers' },
      price: 1990, sizes: SHOE_SIZES, colors: ['#FFFFFF', '#2E74B5'],
      desc: { bn: 'হালকা ও নরম সোলের ক্যাজুয়াল স্নিকার্স।', en: 'Lightweight casual sneakers with a soft sole.' }
    },

    // --- মায়ের দোয়া — glasses (placeholder photos) ---
    {
      id: 'md-g1', shopId: 'mayer-doa', category: 'glasses', live: true, tries: 11,
      remote: flickr('sunglasses', 201), fallback: picsum('glasses-1'),
      name: { bn: 'ক্যাট-আই সানগ্লাস', en: 'Cat-eye Sunglasses' },
      price: 850, sizes: null, colors: ['#000000', '#92400E'],
      desc: { bn: 'UV৪০০ সুরক্ষাসহ ট্রেন্ডি ক্যাট-আই সানগ্লাস।', en: 'Trendy cat-eye sunglasses with UV400 protection.' }
    },
    {
      id: 'md-g2', shopId: 'mayer-doa', category: 'glasses', live: true, tries: 7,
      remote: flickr('eyeglasses', 202), fallback: picsum('glasses-2'),
      name: { bn: 'রাউন্ড ফ্রেম চশমা', en: 'Round Frame Glasses' },
      price: 1200, sizes: null, colors: ['#B45309', '#111827'],
      desc: { bn: 'হালকা ওজনের রাউন্ড ফ্রেম, পাওয়ার লেন্স লাগানো যায়।', en: 'A lightweight round frame that takes prescription lenses.' }
    },
    {
      id: 'md-g3', shopId: 'mayer-doa', category: 'glasses', live: false, tries: 0,
      remote: flickr('aviator', 203), fallback: picsum('glasses-3'),
      name: { bn: 'অ্যাভিয়েটর সানগ্লাস', en: 'Aviator Sunglasses' },
      price: 950, sizes: null, colors: ['#CA8A04', '#374151'],
      desc: { bn: 'ক্লাসিক মেটাল ফ্রেমের অ্যাভিয়েটর।', en: 'A classic metal-frame aviator.' }
    },

    // --- Urban Loom (online, Facebook) ---
    {
      id: 'ul-01', shopId: 'urban-loom', category: 'clothing', live: true, tries: 61,
      file: 'sheer leopard print mesh tunic or short kurt.jfif',
      name: { bn: 'লেপার্ড মেশ টিউনিক', en: 'Leopard Mesh Tunic' },
      price: 1350, sizes: CLOTHING_SIZES, colors: ['#A16207', '#000000'],
      desc: { bn: 'হালকা মেশ কাপড়ের লেপার্ড প্রিন্ট টিউনিক।', en: 'A sheer leopard-print tunic in light mesh.' }
    },
    {
      id: 'ul-02', shopId: 'urban-loom', category: 'clothing', live: true, tries: 38,
      file: 'Stylish WatchLook Travel 👇👇.jfif',
      name: { bn: 'ট্রাভেল কো-অর্ড সেট', en: 'Travel Co-ord Set' },
      price: 1990, sizes: CLOTHING_SIZES, colors: ['#E7E5E4', '#1F2937'],
      desc: { bn: 'ঘোরাঘুরির জন্য আরামদায়ক কো-অর্ড সেট।', en: 'An easy co-ord set made for travel days.' }
    },
    {
      id: 'ul-03', shopId: 'urban-loom', category: 'clothing', live: true, tries: 27,
      file: '1148277236272078940.jfif',
      name: { bn: 'লন কুর্তি', en: 'Lawn Kurti' },
      price: 1150, sizes: CLOTHING_SIZES, colors: ['#0EA5E9', '#FFFFFF'],
      desc: { bn: 'গরমের জন্য হালকা লন কাপড়ের কুর্তি।', en: 'A light lawn kurti for summer.' }
    },
    {
      id: 'ul-04', shopId: 'urban-loom', category: 'clothing', live: true, tries: 19,
      file: '588775351329747061.jfif',
      name: { bn: 'জর্জেট টপস', en: 'Georgette Top' },
      price: 1090, sizes: CLOTHING_SIZES, colors: ['#F43F5E', '#FDF2F8'],
      desc: { bn: 'ফ্লোয়ি জর্জেট কাপড়ের টপস।', en: 'A flowy georgette top.' }
    },

    // --- Kaya Closet BD (online, Daraz) ---
    {
      id: 'kc-01', shopId: 'kaya-closet', category: 'clothing', live: true, tries: 44,
      file: '998391811162817395.jfif',
      name: { bn: 'শিফন কামিজ', en: 'Chiffon Kameez' },
      price: 1690, sizes: CLOTHING_SIZES, colors: ['#4338CA', '#E0E7FF'],
      desc: { bn: 'নরম শিফনের কামিজ, আস্তরসহ।', en: 'A soft chiffon kameez, fully lined.' }
    },
    {
      id: 'kc-02', shopId: 'kaya-closet', category: 'clothing', live: true, tries: 23,
      file: 'download (2).jfif',
      name: { bn: 'প্রিন্টেড ম্যাক্সি ড্রেস', en: 'Printed Maxi Dress' },
      price: 1790, sizes: CLOTHING_SIZES, colors: ['#15803D', '#FEF9C3'],
      desc: { bn: 'লম্বা প্রিন্টেড ম্যাক্সি, বেল্টসহ।', en: 'A long printed maxi dress with a belt.' }
    },
    {
      id: 'kc-s1', shopId: 'kaya-closet', category: 'shoes', live: true, tries: 8,
      remote: flickr('flats', 104), fallback: picsum('shoe-4'),
      name: { bn: 'পয়েন্টেড ফ্ল্যাট', en: 'Pointed Flats' },
      price: 1250, sizes: SHOE_SIZES, colors: ['#FBCFE8', '#000000'],
      desc: { bn: 'অফিসে পরার জন্য আরামদায়ক ফ্ল্যাট।', en: 'Comfortable flats for the office.' }
    },

    // --- সোনালী জুতা ঘর / নূর অপটিক্যালস ---
    {
      id: 'sj-01', shopId: 'sonali-juta', category: 'shoes', live: true, tries: 14,
      remote: flickr('loafers', 105), fallback: picsum('shoe-5'),
      name: { bn: 'চামড়ার লোফার', en: 'Leather Loafers' },
      price: 2450, sizes: [40, 41, 42, 43], colors: ['#78350F'],
      desc: { bn: 'হাতে তৈরি চামড়ার লোফার।', en: 'Handmade leather loafers.' }
    },
    {
      id: 'no-01', shopId: 'noor-optical', category: 'glasses', live: true, tries: 22,
      remote: flickr('glasses', 204), fallback: picsum('glasses-4'),
      name: { bn: 'ব্লু-কাট কম্পিউটার চশমা', en: 'Blue-cut Computer Glasses' },
      price: 1450, sizes: null, colors: ['#111827'],
      desc: { bn: 'স্ক্রিনের নীল আলো থেকে চোখ রক্ষা করে।', en: 'Protects your eyes from screen blue light.' }
    }
  ];

  // Resolve the display URL for any product image.
  products.forEach((p) => {
    if (p.file) {
      p.image = DRESS_DIR + encodeURIComponent(p.file);
      p.fallback = picsum('dress-' + p.id);
    } else {
      p.image = p.remote;
    }
  });

  return {
    // The shop the demo dashboard is logged in as, and whose storefront the QR opens.
    demoShopId: 'mayer-doa',

    // Default product used by the try-on screens when no ?id= is given.
    demoProductId: 'md-02',

    shops,
    products,

    districts: [
      { id: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
      { id: 'chattogram', bn: 'চট্টগ্রাম', en: 'Chattogram' },
      { id: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
      { id: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
      { id: 'khulna', bn: 'খুলনা', en: 'Khulna' }
    ],

    // Placeholder "customer" portrait for the mock try-on result.
    tryOnPerson: {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=75&fm=jpg',
      fallback: 'https://i.pravatar.cc/600?img=47'
    }
  };
})();
