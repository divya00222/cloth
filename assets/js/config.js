/* ==========================================================================
   AURA Fashion - Master Brand & Store Configuration
   ========================================================================== */

const STORE_CONFIG = {
  // 1. BRAND CONFIG
  brand: {
    name: 'AURA',
    subtitle: 'STUDIOS',
    fullName: 'AURA Fashion Studios Pvt. Ltd.',
    tagline: 'Modern Luxury Fashion & Apparel',
    description: 'Discover modern silhouettes and timeless confidence at AURA Fashion Studios. High-end apparel, outerwear, and accessories.',
    foundedYear: '2026',
    copyright: '© 2026 AURA Fashion Studios Pvt. Ltd. All Rights Reserved.',
    currency: 'NPR',
    currencySymbol: 'NPR ',
    logoText: 'AURA',
    logoSubtext: 'STUDIOS'
  },

  // 2. STORE CONTACT CONFIG
  contact: {
    phone: '+977 9800000000',
    email: 'atelier@aurastudios.com.np',
    whatsappNumber: '9779800000000',
    whatsappMessage: 'Hello AURA Studios! I would like to inquire about products and custom tailoring.',
    whatsappDisplay: '+977 9800000000',
    address: 'Durbar Marg, Ward No. 1, Kathmandu 44600, Nepal',
    locationShort: 'Kathmandu, Nepal',
    hours: 'Mon - Sat: 10:00 AM - 8:00 PM'
  },

  // 3. THEME & VISUAL CONFIG
  theme: {
    primaryColor: '#111111',
    accentColor: '#C5A059',
    backgroundColor: '#FAF9F6',
    fontHeading: 'Playfair Display, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif'
  },

  // 4. SHIPPING CONFIG
  shipping: {
    freeShippingThreshold: 3000,
    announcementText: 'FREE SHIPPING ON ORDERS OVER NPR 3,000 • EASY 30-DAY RETURNS',
    insideValley: {
      id: 'inside_valley',
      label: 'Kathmandu Valley Doorstep Delivery',
      rate: 100,
      estimatedDays: '1-2 Days (Kathmandu, Lalitpur, Bhaktapur)'
    },
    outsideValley: {
      id: 'outside_valley',
      label: 'Outside Valley Express Courier',
      rate: 150,
      estimatedDays: '3-5 Business Days (All Provinces)'
    }
  },

  // 5. SOCIAL LINKS CONFIG
  social: {
    instagram: 'https://instagram.com/aurafashion_demo',
    facebook: 'https://facebook.com/aurafashion_demo',
    pinterest: 'https://pinterest.com/aurafashion_demo',
    tiktok: 'https://tiktok.com/@aurafashion_demo'
  },

  // 6. PAYMENT DEMO CONFIG
  payment: {
    demoNotice: '// DEMO ONLY - Replace with client\'s real payment configuration during production integration.',
    merchantName: 'AURA Fashion Studios Pvt. Ltd.',
    merchantId: 'DEMO-MERCHANT-ID',
    bankAccount: 'DEMO-ACCOUNT-NUMBER',
    methods: [
      {
        id: 'cod',
        name: 'Cash on Delivery (COD)',
        badge: 'Most Popular',
        description: 'Pay in NPR cash directly to the courier upon delivery at your doorstep.',
        iconType: 'cod',
        iconLabel: '💵'
      },
      {
        id: 'esewa',
        name: 'eSewa Digital Wallet',
        badge: 'Instant Transfer',
        description: 'Pay securely via eSewa. Merchant ID: DEMO-MERCHANT-ID (AURA Fashion Studios Pvt. Ltd.)',
        iconType: 'esewa',
        iconLabel: 'eSewa'
      },
      {
        id: 'khalti',
        name: 'Khalti Digital Wallet',
        badge: 'Scan & Pay',
        description: 'Scan & Pay via Khalti app. Merchant Account: DEMO-MERCHANT-ID',
        iconType: 'khalti',
        iconLabel: 'Khalti'
      },
      {
        id: 'bank_transfer',
        name: 'Direct Nepal Bank Transfer',
        badge: 'Nabil / NIC Asia',
        description: 'Nabil Bank (Acc: DEMO-ACCOUNT-NUMBER) / NIC Asia Bank (Acc: DEMO-ACCOUNT-NUMBER)',
        iconType: 'bank_transfer',
        iconLabel: '🏛️'
      }
    ]
  },

  // Hydrate DOM elements with data-config attributes if present
  hydrateDOM: function() {
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.getAttribute('data-config');
      if (!key) return;
      const parts = key.split('.');
      let val = STORE_CONFIG;
      for (const p of parts) {
        if (val && val[p] !== undefined) val = val[p];
        else { val = null; break; }
      }
      if (val !== null && typeof val === 'string') {
        if (el.tagName === 'A' && key.includes('whatsapp')) {
          el.href = `https://wa.me/${STORE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.contact.whatsappMessage)}`;
        } else if (el.tagName === 'A' && key.includes('phone')) {
          el.href = `tel:${STORE_CONFIG.contact.phone.replace(/\s+/g, '')}`;
        } else if (el.tagName === 'A' && key.includes('email')) {
          el.href = `mailto:${STORE_CONFIG.contact.email}`;
        } else {
          el.textContent = val;
        }
      }
    });
  }
};
