/* ==========================================================================
   AURA Fashion - Nepal Regional Checkout & Location Configuration
   ========================================================================== */

const NEPAL_CONFIG = {
  // Store Currency (Inherits from STORE_CONFIG)
  get currency() {
    return (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.brand) ? STORE_CONFIG.brand.currency : 'NPR';
  },

  // Shipping Rates & Thresholds (Inherits from STORE_CONFIG)
  get shipping() {
    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.shipping) {
      return STORE_CONFIG.shipping;
    }
    return {
      freeShippingThreshold: 3000,
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
      }
    };
  },

  // Payment Options for Nepal Checkout (Inherits from STORE_CONFIG.payment)
  get paymentMethods() {
    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.payment) {
      return STORE_CONFIG.payment.methods;
    }
    return [];
  },

  // Store Contact Information (Inherits from STORE_CONFIG.contact)
  get contact() {
    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.contact) {
      return STORE_CONFIG.contact;
    }
    return {
      phone: '+977 9800000000',
      whatsappNumber: '9779800000000',
      whatsappMessage: 'Hello AURA Studios! I would like to inquire about products and custom tailoring.',
      address: 'Durbar Marg, Ward No. 1, Kathmandu 44600, Nepal'
    };
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

  // Festival Campaigns Delegation (Proxies to CAMPAIGNS_CONFIG)
  get activeCampaignKey() {
    return (typeof CAMPAIGNS_CONFIG !== 'undefined') ? CAMPAIGNS_CONFIG.activeCampaignKey : 'teej';
  },

  get campaigns() {
    return (typeof CAMPAIGNS_CONFIG !== 'undefined') ? CAMPAIGNS_CONFIG.campaigns : {};
  },

  getActiveCampaign: function() {
    if (typeof CAMPAIGNS_CONFIG !== 'undefined') {
      return CAMPAIGNS_CONFIG.getActiveCampaign();
    }
    return {
      key: 'teej',
      name: 'TEEJ EDIT 2026',
      headline: 'Celebrate Festive Elegance & Grace',
      description: 'Handcrafted silk sarees, ornate designer kurtis, and vibrant crimson silhouettes tailored for Teej festivities.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      ctaText: 'SHOP TEEJ COLLECTION',
      ctaLink: 'shop.html?tag=teej',
      discount: 'UP TO 30% OFF',
      badge: 'NEPALI FESTIVAL SPECIAL'
    };
  },

  setActiveCampaign: function(key) {
    if (typeof CAMPAIGNS_CONFIG !== 'undefined') {
      CAMPAIGNS_CONFIG.setActiveCampaign(key);
    }
  }
};
