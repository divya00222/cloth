/* ==========================================================================
   AURA Fashion - Campaign Configuration & Festive Promotions
   ========================================================================== */

const CAMPAIGNS_CONFIG = {
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
  },

  getAllCampaigns: function() {
    return Object.values(this.campaigns);
  }
};
