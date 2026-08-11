/* ==========================================================================
   AURA Fashion - Nepalese Business & Campaign Configuration
   ========================================================================== */

const NEPAL_CONFIG = {
  // Store Currency
  currency: 'NPR',

  // Delivery & Shipping Rates (Configurable in JS)
  shipping: {
    insideValley: {
      id: 'inside_valley',
      label: 'Kathmandu Valley Doorstep Delivery',
      rate: 100,
      estimatedDays: '1-2 Days (Kathmandu, Lalitpur, Bhaktapur)',
    },
    outsideValley: {
      id: 'outside_valley',
      label: 'Outside Valley Express Courier',
      rate: 150,
      estimatedDays: '3-5 Business Days (All Provinces)',
    },
    freeShippingThreshold: 3000
  },

  // Payment Options for Nepal
  paymentMethods: [
    {
      id: 'cod',
      name: 'Cash on Delivery (COD)',
      badge: 'Most Popular',
      description: 'Pay in NPR cash directly to the courier upon delivery at your doorstep.',
      icon: `💵`
    },
    {
      id: 'esewa',
      name: 'eSewa Digital Wallet',
      badge: 'Instant Instant',
      description: 'Pay securely via eSewa. Merchant ID: 9801234567 (AURA Fashion Studios Pvt. Ltd.)',
      icon: `<span style="background:#60BB46; color:#FFF; font-weight:700; padding:2px 8px; border-radius:4px; font-size:0.75rem;">eSewa</span>`
    },
    {
      id: 'khalti',
      name: 'Khalti Digital Wallet',
      badge: 'Cashback Eligible',
      description: 'Scan & Pay via Khalti app. Merchant Account: 9801234567',
      icon: `<span style="background:#5C2D91; color:#FFF; font-weight:700; padding:2px 8px; border-radius:4px; font-size:0.75rem;">Khalti</span>`
    },
    {
      id: 'bank_transfer',
      name: 'Direct Nepal Bank Transfer',
      badge: 'Nabil / NIC Asia',
      description: 'Nabil Bank (Acc: 00101017500123) / NIC Asia Bank (Acc: 22001004512398)',
      icon: `🏛️`
    }
  ],

  // Contact Information
  contact: {
    phone: '+977 9801234567',
    whatsappNumber: '9779801234567',
    whatsappMessage: 'Hello AURA Studios! I would like to inquire about products and custom tailoring.',
    address: 'Durbar Marg, Ward No. 1, Kathmandu 44600, Nepal'
  },

  // Administrative Provinces & Districts for Checkout
  provinces: {
    "Bagmati Province": [
      "Kathmandu", "Lalitpur", "Bhaktapur", "Chitwan", "Kavrepalanchok", 
      "Dhading", "Nuwakot", "Makwanpur", "Sindhupalchok", "Ramechhap", "Dolakha", "Rasuwa", "Sindhuli"
    ],
    "Koshi Province": [
      "Morang (Biratnagar)", "Sunsari (Dharan)", "Jhapa", "Ilam", "Udayapur", 
      "Dhankuta", "Panchthar", "Sankhuwasabha", "Taplejung", "Bhojpur", "Okhaldhunga", "Khotang", "Solukhumbu", "Tehrathum"
    ],
    "Madhesh Province": [
      "Parsa (Birgunj)", "Dhanusha (Janakpur)", "Sarlahi", "Rautahat", "Bara", "Siraha", "Saptari", "Mahottari"
    ],
    "Gandaki Province": [
      "Kaski (Pokhara)", "Tanahu", "Gorkha", "Syangja", "Nawalpur", "Lamjung", "Parbat", "Baglung", "Myagdi", "Mustang", "Manang"
    ],
    "Lumbini Province": [
      "Rupandehi (Butwal/Bhairahawa)", "Dang", "Banke (Nepalgunj)", "Palpa", "Arghakhanchi", "Gulmi", "Kapilvastu", "Bardiya", "Pyuthan", "Rolpa", "Eastern Rukum", "Parasi"
    ],
    "Karnali Province": [
      "Surkhet", "Dailekh", "Jumla", "Kalikot", "Jajarkot", "Salyan", "Dolpa", "Mugu", "Humla", "Western Rukum"
    ],
    "Sudurpashchim Province": [
      "Kailali (Dhangadhi)", "Kanchanpur (Mahendranagar)", "Dadeldhura", "Doti", "Achham", "Baitadi", "Bajhang", "Bajura", "Darchula"
    ]
  },

  // Nepali Festival Campaigns Object (Client can easily modify or select active campaign)
  activeCampaignKey: 'teej', // default active campaign

  campaigns: {
    teej: {
      key: 'teej',
      name: 'TEEJ EDIT 2026',
      headline: 'Celebrate Festive Elegance & Grace',
      description: 'Handcrafted silk sarees, ornate designer kurtis, and vibrant crimson silhouettes tailored for Teej festivities.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'SHOP TEEJ COLLECTION',
      ctaLink: 'shop.html?tag=teej',
      discount: 'UP TO 30% OFF',
      badge: 'NEPALI FESTIVAL SPECIAL'
    },
    dashain: {
      key: 'dashain',
      name: 'DASHAIN FESTIVE ATELIER',
      headline: 'Royal Silks, Kurtis & Family Tailoring',
      description: 'Ring in Vijaya Dashami with bespoke outerwear, royal velvet blazers, and traditional festive attire.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'EXPLORE DASHAIN FESTIVE',
      ctaLink: 'shop.html?tag=dashain',
      discount: 'FLAT 25% OFF',
      badge: 'DASHAIN GRAND OFFER'
    },
    tihar: {
      key: 'tihar',
      name: 'TIHAR LIGHTS & STYLE 2026',
      headline: 'Glow in Velvet, Gold & Metallic Shimmer',
      description: 'Brighten your Deepawali celebrations with gold-embroidered scarves, rich wraps, and evening wear.',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'SHOP TIHAR EDITION',
      ctaLink: 'shop.html?tag=tihar',
      discount: 'SPECIAL FESTIVE EDITION',
      badge: 'FESTIVAL OF LIGHTS'
    },
    wedding: {
      key: 'wedding',
      name: 'WEDDING SEASON ATELIER',
      headline: 'Bespoke Royal Bridal & Groom Collection',
      description: 'Ornate embroidered sherwanis, bridal silk drapes, and customized tailoring for Nepalese weddings.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'DISCOVER WEDDING ATELIER',
      ctaLink: 'shop.html?tag=wedding',
      discount: 'COMPLIMENTARY ATELIER STYLING',
      badge: 'BRIDAL & GROOM SPECIAL'
    },
    newyear: {
      key: 'newyear',
      name: 'NEPALI NEW YEAR 2083',
      headline: 'Fresh Spring Beginnings & Linen Edits',
      description: 'Lightweight linen, organic cotton essentials, and crisp tailoring to start Year 2083 in effortless style.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'SHOP NEW YEAR 2083',
      ctaLink: 'shop.html?tag=newyear',
      discount: 'SPRING 2083 EDITION',
      badge: 'NEW YEAR CELEBRATION'
    }
  },

  getActiveCampaign: function() {
    const key = localStorage.getItem('aura_active_campaign') || this.activeCampaignKey;
    return this.campaigns[key] || this.campaigns['teej'];
  },

  setActiveCampaign: function(key) {
    if (this.campaigns[key]) {
      localStorage.setItem('aura_active_campaign', key);
      window.dispatchEvent(new Event('campaignChanged'));
    }
  }
};
