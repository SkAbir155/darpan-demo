/* =====================================================================
   দর্পণ — MOCK DATA (demo only)
   ---------------------------------------------------------------------
   Every shop, product and image reference used by the demo lives here.
   All photos are local files under /Images (paths kept exactly as saved).
   TODO: replace this whole file with real API calls, e.g.
         GET /api/shops/:slug          → shop profile
         GET /api/shops/:slug/products → product list
   ===================================================================== */

window.DARPAN_DATA = (function () {
  'use strict';

  const DIR = {
    men: 'Images/Dresses/Men/',
    women: 'Images/Dresses/Women/',
    glasses: 'Images/Eyeware glass/',
    shoesMen: 'Images/Shoes/men/',
    shoesWomen: 'Images/Shoes/women/',
    shopPhoto: 'Images/allar dan shon/'
  };

  const SIZES = {
    clothing: { men: ['M', 'L', 'XL', 'XXL'], women: ['S', 'M', 'L', 'XL'] },
    shoes: { men: [40, 41, 42, 43, 44], women: [36, 37, 38, 39, 40] }
  };

  // Default descriptions per category + gender.
  const DESC = {
    'clothing-men': { bn: 'আরামদায়ক কাপড় আর নিখুঁত সেলাই। অফিস, আড্ডা বা উৎসব — সব জায়গায় মানানসই।', en: 'Comfortable fabric with a clean finish. Works for the office, hangouts or festivals.' },
    'clothing-women': { bn: 'নরম কাপড়ে তৈরি, সুন্দর ফিনিশিং। ঈদ, দাওয়াত বা প্রতিদিনের জন্য মানানসই।', en: 'Made in soft fabric with a neat finish. Right for Eid, dawats or every day.' },
    'shoes-men': { bn: 'আরামদায়ক সোল, সারাদিন পরার উপযোগী।', en: 'A comfortable sole you can wear all day.' },
    'shoes-women': { bn: 'হাতের কাজ করা নরম জুতা, শাড়ি ও থ্রি-পিসের সাথে দারুণ মানায়।', en: 'Soft, hand-worked footwear that pairs beautifully with sarees and three-pieces.' },
    'glasses-women': { bn: 'হালকা ওজনের ফ্রেম, পাওয়ার লেন্স লাগানো যায়।', en: 'A lightweight frame that takes prescription lenses.' },
    'glasses-unisex': { bn: 'হালকা ওজনের ইউনিসেক্স ফ্রেম, পাওয়ার লেন্স লাগানো যায়।', en: 'A lightweight unisex frame that takes prescription lenses.' }
  };

  /* ---------------------------- SHOPS ---------------------------- */
  const shops = [
    {
      id: 'mayer-doa',
      type: 'offline',
      name: { bn: 'মায়ের দোয়া বস্ত্র বিতান', en: 'Mayer Doa Bostro Bitan' },
      initials: { bn: 'মা', en: 'MD' },
      avatar: encodeURI(DIR.shopPhoto + 'Dhaka, Bangladesh📌.jfif'),
      owner: { bn: 'মোঃ আব্দুল করিম', en: 'Md. Abdul Karim' },
      phone: '01712-345678',
      address: { bn: 'দোকান নং ১৪৭, ২য় তলা, নিউ মার্কেট, ঢাকা-১২০৫', en: 'Shop 147, 2nd floor, New Market, Dhaka-1205' },
      district: 'dhaka',
      area: { bn: 'নিউ মার্কেট, ঢাকা', en: 'New Market, Dhaka' },
      hours: { bn: 'সকাল ১০টা – রাত ৯টা', en: '10 am – 9 pm' },
      categories: ['clothing', 'shoes', 'glasses'],
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
      color: '#DB2777',
      url: 'https://darpan.app/s/kaya-closet'
    }
  ];

  /* --------------------------- PRODUCTS --------------------------- */
  // [id, category, gender, folder, file, name.bn, name.en, price, colours, other shops]
  // gender: 'men' | 'women' | 'unisex'. Every product is stocked by the demo
  // shop; the last column lists other shops that also sell it.
  const RAW = [
    // Men's clothing
    ['m-01', 'clothing', 'men', 'men', '13581236384872230.jfif', 'লাল এমব্রয়ডারি পাঞ্জাবি', 'Red Embroidered Panjabi', 3450, ['#9F1239', '#FFFFFF']],
    ['m-02', 'clothing', 'men', 'men', 'Elegant Beige Kurta Style for Men _ Minimalist Ethnic Fashion Inspiration 2026.jfif', 'বেইজ কুর্তা সেট', 'Beige Kurta Set', 2850, ['#E7DCC8', '#FFFFFF']],
    ['m-03', 'clothing', 'men', 'men', "Japanese Vintage Patchwork Ocean Embroidery Men's….jfif", 'প্যাচওয়ার্ক এমব্রয়ডারি শার্ট', 'Patchwork Embroidered Shirt', 2250, ['#1E3A5F', '#9F1239']],
    ['m-04', 'clothing', 'men', 'men', 'Men’s Resort Short Sleeve Shirts _ Vintage Floral & Striped Linen Cotton Summer Tops.jfif', 'ফ্লোরাল রিসোর্ট শার্ট', 'Floral Resort Shirt', 1450, ['#115E59', '#D97706']],
    ['m-05', 'clothing', 'men', 'men', 'Navy Striped Boxy Fit Shirt for Men _ Modern Casual Style.jfif', 'নেভি স্ট্রাইপ শার্ট', 'Navy Striped Shirt', 1650, ['#1F2A44', '#FFFFFF']],
    ['m-06', 'clothing', 'men', 'men', 'Striped Linen Shirt Summer Vibes ☀️🤍.jfif', 'স্ট্রাইপ লিনেন শার্ট', 'Striped Linen Shirt', 1550, ['#D6C7B8', '#FFFFFF']],
    ['m-07', 'clothing', 'men', 'men', "Timeless Men's Shirt Style _ Minimal & Smart Casual Outfit Inspiration.jfif", 'চকলেট ব্রাউন শার্ট', 'Chocolate Brown Shirt', 1350, ['#4A2C1D']],
    ['m-08', 'clothing', 'men', 'men', 'dandiyaa nightt.jfif', 'শালসহ সাদা পাঞ্জাবি', 'White Panjabi with Shawl', 3950, ['#FFFFFF', '#7F1D1D']],

    // Women's clothing
    ['w-01', 'clothing', 'women', 'women', 'Ethnic Elegance_ Red Printed Peplum Frock with Bell Sleeves.jfif', 'লাল প্রিন্টেড পেপলাম ফ্রক', 'Red Printed Peplum Frock', 1450, ['#B91C1C', '#F59E0B'], ['urban-loom']],
    ['w-02', 'clothing', 'women', 'women', 'Bengali clothes, Bengali salwar kameez from Modubond 🇧🇩.jfif', 'বেগুনি সালোয়ার কামিজ', 'Purple Salwar Kameez', 2650, ['#4C1D95', '#FDE68A']],
    ['w-03', 'clothing', 'women', 'women', 'so cuteeee.jfif', 'সাদা-গোলাপি আনারকলি', 'White & Pink Anarkali', 3200, ['#FFFFFF', '#F472B6'], ['kaya-closet']],
    ['w-04', 'clothing', 'women', 'women', '588775351329747061.jfif', 'গোলাপি এমব্রয়ডারি কুর্তি', 'Pink Embroidered Kurti', 1850, ['#F9A8D4', '#BE185D']],
    ['w-05', 'clothing', 'women', 'women', 'Stylish WatchLook Travel 👇👇.jfif', 'সাদা ফ্লোরাল কুর্তি', 'White Floral Kurti', 1750, ['#F8FAFC', '#60A5FA'], ['urban-loom']],
    ['w-06', 'clothing', 'women', 'women', 'Westerns could never beat this VIBE!! 🦋✨.jfif', 'সাদা চিকনকারি কুর্তা', 'White Chikankari Kurta', 2450, ['#FAFAF9']],
    ['w-07', 'clothing', 'women', 'women', 'good looking dress 😎😁.jfif', 'মেরুন কো-অর্ড সেট', 'Maroon Co-ord Set', 2950, ['#7F1D1D'], ['kaya-closet']],
    ['w-08', 'clothing', 'women', 'women', 'Boho Desi Vibes✨♥️.jfif', 'লাল ফ্লোরাল কুর্তি', 'Red Floral Kurti', 1250, ['#BE123C', '#F9A8D4']],
    ['w-09', 'clothing', 'women', 'women', 'Dhaka aesthetic 🇧🇩.jfif', 'গোলাপি প্রিন্ট কুর্তি', 'Pink Print Kurti', 1150, ['#F472B6', '#FFFFFF']],
    ['w-10', 'clothing', 'women', 'women', '1148277236272078940.jfif', 'ব্রাউন অ্যাসিমেট্রিক টপ', 'Brown Asymmetric Top', 1650, ['#5B3A29', '#93C5FD'], ['urban-loom']],
    ['w-11', 'clothing', 'women', 'women', '998391811162817395.jfif', 'মেরুন স্লিট কুর্তি', 'Maroon Slit Kurti', 1950, ['#7F1D1D', '#60A5FA'], ['urban-loom']],
    ['w-12', 'clothing', 'women', 'women', 'download (2).jfif', 'গোলাপি ফ্লোরাল টপ', 'Pink Floral Top', 1350, ['#FBCFE8', '#F472B6'], ['urban-loom']],
    ['w-13', 'clothing', 'women', 'women', '1124703706967500367.jfif', 'মেরুন কর্সেট টপ', 'Maroon Corset Top', 1550, ['#881337']],
    ['w-14', 'clothing', 'women', 'women', 'neck design.jfif', 'গোলাপি হল্টার ব্লাউজ', 'Pink Halter Blouse', 1250, ['#BE185D', '#FCD34D'], ['kaya-closet']],
    ['w-15', 'clothing', 'women', 'women', 'sheer leopard print mesh tunic or short kurt.jfif', 'লেপার্ড প্রিন্ট টিউনিক', 'Leopard Print Tunic', 1450, ['#78350F', '#000000']],

    // Glasses
    ['g-01', 'glasses', 'women', 'glasses', "Women's VINTAGE CAT EYE Style READING EYE GLASSES READERS Blue Crystals Handmade _ eBay.jfif", 'নীল ক্রিস্টাল ক্যাট-আই', 'Blue Crystal Cat-eye', 1850, ['#1D4ED8'], ['noor-optical']],
    ['g-02', 'glasses', 'women', 'glasses', '484699978651569675.jfif', 'বেগুনি ক্যাট-আই ফ্রেম', 'Purple Cat-eye Frame', 1250, ['#7E22CE'], ['noor-optical']],
    ['g-03', 'glasses', 'unisex', 'glasses', '484699978651569646.jfif', 'ল্যাভেন্ডার রাউন্ড ফ্রেম', 'Lavender Round Frame', 1150, ['#C4B5FD'], ['noor-optical']],
    ['g-04', 'glasses', 'women', 'glasses', '484699978666828188.jfif', 'টিল গোল্ড-চেইন ফ্রেম', 'Teal Gold-chain Frame', 1650, ['#0F766E', '#CA8A04'], ['noor-optical']],
    ['g-05', 'glasses', 'unisex', 'glasses', 'H5050 Purple.jfif', 'বেগুনি স্কয়ার ফ্রেম', 'Purple Square Frame', 1050, ['#6D28D9'], ['noor-optical']],
    ['g-06', 'glasses', 'women', 'glasses', 'W2009 Translucent Pink.jfif', 'স্বচ্ছ গোলাপি ফ্রেম', 'Translucent Pink Frame', 1100, ['#FBCFE8']],
    ['g-07', 'glasses', 'women', 'glasses', '484699978651569684.jfif', 'ফ্লোরাল প্রিন্ট ফ্রেম', 'Floral Print Frame', 1200, ['#1E3A8A', '#EC4899']],
    ['g-08', 'glasses', 'women', 'glasses', '484699978651569679.jfif', 'ক্লাসিক কালো সানগ্লাস', 'Classic Black Sunglasses', 2450, ['#000000']],
    ['g-09', 'glasses', 'women', 'glasses', 'Sofiaz Choice.jfif', 'জুয়েল ডিজাইন সানগ্লাস', 'Jewelled Sunglasses', 2750, ['#000000', '#CA8A04']],
    ['g-10', 'glasses', 'women', 'glasses', '484699978651569418.jfif', 'স্টোন-সেট চশমা', 'Rhinestone Glasses', 2250, ['#E5E7EB']],
    ['g-11', 'glasses', 'women', 'glasses', 'umla.jfif', 'লেস ডিজাইন রিমলেস', 'Lace Rimless Glasses', 1950, ['#FBCFE8', '#D6D3D1']],

    // Men's shoes
    ['sm-01', 'shoes', 'men', 'shoesMen', 'Viral Retro Samba Style Sneakers For Men _ White Black Streetwear Casual Shoes.jfif', 'রেট্রো স্নিকার্স', 'Retro Sneakers', 2650, ['#FFFFFF', '#000000'], ['sonali-juta']],
    ['sm-02', 'shoes', 'men', 'shoesMen', "1 Pair Men's Color-Blocked Mesh Lace-Up Sneakers, Daily Casual Fashion Shock-Absorbing Sports Shoes (Run Small One Size), Suitable For Jeans Active Wear.jfif", 'চাঙ্কি স্পোর্টস স্নিকার্স', 'Chunky Sports Sneakers', 2350, ['#FFFFFF', '#1E3A8A'], ['sonali-juta']],
    ['sm-03', 'shoes', 'men', 'shoesMen', '1196337402525526.jfif', 'হাই-টপ স্নিকার্স', 'High-top Sneakers', 3450, ['#57534E', '#F5F5F4'], ['sonali-juta']],
    ['sm-04', 'shoes', 'men', 'shoesMen', 'This item is unavailable - Etsy.jfif', 'চামড়ার কোলাপুরি', 'Leather Kolhapuri', 1650, ['#92400E'], ['sonali-juta']],

    // Women's shoes
    ['sw-01', 'shoes', 'women', 'shoesWomen', 'Lotus Embroidered Luxury Juttis 🌸✨ _ Elegant Handcrafted Indian Footwear.jfif', 'লোটাস এমব্রয়ডারি জুতি', 'Lotus Embroidered Jutti', 1850, ['#F5D0C5', '#DB2777'], ['sonali-juta']],
    ['sw-02', 'shoes', 'women', 'shoesWomen', 'Gold Embroidered Jutti Shoes, Indian Wedding Mojari, Khussa for Women - Etsy.jfif', 'সোনালি এমব্রয়ডারি জুতি', 'Gold Embroidered Jutti', 1950, ['#FEF3C7', '#B91C1C']],
    ['sw-03', 'shoes', 'women', 'shoesWomen', 'Red Handcrafted Punjabi Jutti Embellished Indian Khussa Mojaris Bridal Flats, Bellies shoes.jfif', 'লাল ব্রাইডাল জুতি', 'Red Bridal Jutti', 2250, ['#B91C1C', '#FDE68A'], ['kaya-closet']],
    ['sw-04', 'shoes', 'women', 'shoesWomen', '181340322492564477.jfif', 'ব্রাইডাল এমব্রয়ডারি স্নিকার্স', 'Bridal Embroidered Sneakers', 3250, ['#991B1B', '#FDE68A']],
    ['sw-05', 'shoes', 'women', 'shoesWomen', 'Handmade Multi Coloured Pakistani Indian Khusa Sandal _ Mehndi and Party Punjabi Jutti _ Sequin Wedding shoes _ Gift For Her.jfif', 'রঙিন খুসা স্যান্ডেল', 'Multicolour Khussa Sandal', 1450, ['#DC2626', '#16A34A'], ['sonali-juta']],
    ['sw-06', 'shoes', 'women', 'shoesWomen', 'Indian sandals.jfif', 'লাল কোলাপুরি স্যান্ডেল', 'Red Kolhapuri Sandal', 1350, ['#B91C1C', '#A8A29E']],
    ['sw-07', 'shoes', 'women', 'shoesWomen', 'Luxury fashion & independent designers _ SSENSE.jfif', 'এমব্রয়ডারি মিউল', 'Embroidered Mules', 1750, ['#E8A598'], ['kaya-closet']],
    ['sw-08', 'shoes', 'women', 'shoesWomen', '10414642880149797.jfif', 'ফ্লোরাল ওয়েজ স্যান্ডেল', 'Floral Wedge Sandal', 2150, ['#F5F5DC', '#15803D']]
  ];

  // Drafts are hidden from the storefront — makes the dashboard look real.
  const DRAFTS = ['m-08', 'w-15', 'g-11', 'sw-08'];

  // encodeURI keeps spaces/emoji safe in URLs; '#' and '?' never appear in these names.
  const products = RAW.map(([id, category, gender, folder, file, bn, en, price, colors, also], i) => ({
    id, category, gender, price, colors,
    shopIds: ['mayer-doa'].concat(also || []),
    name: { bn, en },
    image: encodeURI(DIR[folder] + file),
    sizes: category === 'glasses' ? null : SIZES[category][gender],
    desc: DESC[category + '-' + gender],
    live: !DRAFTS.includes(id),
    tries: (i * 37 + 11) % 58 + 3 // stable fake "try-on" count
  }));

  return {
    // The shop the demo dashboard is logged in as, and whose storefront the QR opens.
    demoShopId: 'mayer-doa',

    // Default product used by the try-on screens when no ?id= is given.
    demoProductId: 'w-01',

    shops,
    products,

    districts: [
      { id: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
      { id: 'chattogram', bn: 'চট্টগ্রাম', en: 'Chattogram' },
      { id: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
      { id: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
      { id: 'khulna', bn: 'খুলনা', en: 'Khulna' }
    ],

    // Stand-in "customer" photos for the mock try-on result, and where the
    // item is laid over them: [left, top, width, height] in % of the frame.
    // TODO: the garment-fusion API returns the real composite instead.
    tryOnPeople: {
      women: {
        image: encodeURI(DIR.women + 'Bengali clothes, Bengali salwar kameez from Modubond 🇧🇩.jfif'),
        boxes: { clothing: [28, 20, 44, 40], glasses: [38, 9, 24, 8], shoes: [28, 80, 44, 18] }
      },
      men: {
        image: encodeURI(DIR.men + 'Elegant Beige Kurta Style for Men _ Minimalist Ethnic Fashion Inspiration 2026.jfif'),
        boxes: { clothing: [20, 5, 60, 52], glasses: [38, 1, 24, 8], shoes: [24, 82, 52, 16] },
        blend: 'multiply' // light outfit in the photo, so multiply drops the product's white background
      }
    }
  };
})();
