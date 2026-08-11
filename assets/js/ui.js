/* ==========================================================================
   AURA Fashion - UI Manager & Component Renderer
   ========================================================================== */

const RECENT_SEARCHES_KEY = 'aura_recent_searches';
const USER_STORAGE_KEY = 'aura_demo_user';
const DEFAULT_IMAGE_PLACEHOLDER = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='100%25' height='100%25' fill='%23F4F1EA'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia, serif' font-size='32' fill='%23111111' letter-spacing='2'%3EAURA ATELIER%3C/text%3E%3C/svg%3E";

const UIManager = {
  FREE_SHIPPING_THRESHOLD: 3000,

  init: () => {
    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.hydrateDOM) {
      STORE_CONFIG.hydrateDOM();
    }
    UIManager.bindHeaderEvents();
    UIManager.bindCartEvents();
    UIManager.bindSearchEvents();
    UIManager.bindAccountEvents();
    UIManager.bindScrollEvents();
    UIManager.bindNewsletterForm();
    UIManager.initCountdownTimer();
    UIManager.initScrollReveal();
    UIManager.renderCartDrawer();
    UIManager.updateBadges();
    UIManager.initWhatsAppCTA();
    UIManager.renderCampaignBanner();

    // Listen for custom store updates
    window.addEventListener('cartUpdated', () => {
      UIManager.renderCartDrawer();
      UIManager.updateBadges();
    });

    window.addEventListener('wishlistUpdated', () => {
      UIManager.updateBadges();
    });

    window.addEventListener('campaignChanged', () => {
      UIManager.renderCampaignBanner();
    });
  },

  // Floating WhatsApp CTA Widget
  initWhatsAppCTA: () => {
    if (document.getElementById('whatsapp-floating-btn')) return;

    const contact = (typeof STORE_CONFIG !== 'undefined') ? STORE_CONFIG.contact : ((typeof NEPAL_CONFIG !== 'undefined') ? NEPAL_CONFIG.contact : {});
    const phone = contact.whatsappNumber || '9779800000000';
    const msg = encodeURIComponent(contact.whatsappMessage || 'Hello AURA Studios');
    const displayPhone = contact.whatsappDisplay || contact.phone || '+977 9800000000';

    const btn = document.createElement('a');
    btn.id = 'whatsapp-floating-btn';
    btn.href = `https://wa.me/${phone}?text=${msg}`;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'whatsapp-float-btn';
    btn.setAttribute('aria-label', 'Contact via WhatsApp');
    btn.innerHTML = `
      <span class="whatsapp-float-tooltip">Chat with Atelier (${displayPhone})</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    `;
    document.body.appendChild(btn);
  },

  // Campaign Banner Component Renderer
  renderCampaignBanner: () => {
    const bannerContainer = document.getElementById('nepal-campaign-banner-wrapper');
    if (!bannerContainer) return;

    const campaignObj = (typeof CAMPAIGNS_CONFIG !== 'undefined') ? CAMPAIGNS_CONFIG : ((typeof NEPAL_CONFIG !== 'undefined') ? NEPAL_CONFIG : null);
    if (!campaignObj) return;

    const activeCamp = campaignObj.getActiveCampaign();
    const allCampaigns = campaignObj.campaigns;

    bannerContainer.innerHTML = `
      <!-- Campaign Preset Switcher for Demonstration / Customization -->
      <div class="campaign-switcher-bar">
        <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary); margin-right: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
          🎉 SELECT FESTIVE CAMPAIGN:
        </span>
        ${Object.keys(allCampaigns).map(key => {
          const c = allCampaigns[key];
          const isActive = c.key === activeCamp.key;
          return `
            <button class="campaign-switch-btn ${isActive ? 'active' : ''}" onclick="if (typeof CAMPAIGNS_CONFIG !== 'undefined') { CAMPAIGNS_CONFIG.setActiveCampaign('${c.key}'); } else { NEPAL_CONFIG.setActiveCampaign('${c.key}'); }">
              ${c.name}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Reusable Festive Campaign Banner Component -->
      <div class="nepal-campaign-banner reveal active">
        <img src="${activeCamp.image}" alt="${activeCamp.name}" class="campaign-banner-bg" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PLACEHOLDER}'">
        <div class="campaign-banner-overlay"></div>
        <div class="campaign-banner-content">
          <div class="campaign-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${activeCamp.badge} &bull; ${activeCamp.discount}
          </div>
          <div class="campaign-title-label">${activeCamp.name}</div>
          <h2 class="campaign-headline">${activeCamp.headline}</h2>
          <p class="campaign-desc">${activeCamp.description}</p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <a href="${activeCamp.ctaLink}" class="btn btn-primary" style="padding: 0.875rem 2rem;">
              ${activeCamp.ctaText}
            </a>
            <a href="https://wa.me/${NEPAL_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent('Hi, I want to inquire about custom orders for ' + activeCamp.name)}" target="_blank" class="btn btn-outline" style="color: #FFF; border-color: rgba(255,255,255,0.4);">
              WHATSAPP INQUIRY
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // Update Cart & Wishlist Header Counters with Pop Animation
  updateBadges: () => {
    const cartCount = CartStore.getCartCount();
    const wishlistCount = CartStore.getWishlistCount();

    const cartBadges = document.querySelectorAll('.cart-count-badge');
    cartBadges.forEach(badge => {
      if (badge.textContent !== String(cartCount)) {
        badge.textContent = cartCount;
        badge.classList.remove('badge-pop');
        void badge.offsetWidth; // Trigger reflow for re-animation
        badge.classList.add('badge-pop');
      } else {
        badge.textContent = cartCount;
      }
    });

    const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
    wishlistBadges.forEach(badge => {
      if (badge.textContent !== String(wishlistCount)) {
        badge.textContent = wishlistCount;
        badge.classList.remove('badge-pop');
        void badge.offsetWidth; // Trigger reflow
        badge.classList.add('badge-pop');
      } else {
        badge.textContent = wishlistCount;
      }
    });
  },

  // Toast System
  showToast: (message, title = "Notification", icon = "check-circle") => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="color: var(--color-accent); font-size: 1.25rem;">✦</div>
      <div>
        <strong style="display: block; font-weight: 700; margin-bottom: 2px;">${title}</strong>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Render Product Cards
  renderProductCardHTML: (product) => {
    const isWishlisted = CartStore.isInWishlist(product.id);
    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-image-wrapper">
          <a href="product.html?id=${product.id}" style="display: block; width: 100%; height: 100%;">
            <img src="${product.images.main}" alt="${product.name}" class="product-img product-img-main" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PLACEHOLDER}'">
            <img src="${product.images.hover}" alt="${product.name} alternate view" class="product-img product-img-hover" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PLACEHOLDER}'">
          </a>
          
          <div class="product-badges">
            ${product.isNew ? `<span class="badge badge-new">NEW</span>` : ''}
            ${product.isSale ? `<span class="badge badge-sale">${product.discount || 'SALE'}</span>` : ''}
          </div>

          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); UIManager.handleWishlistToggle('${product.id}', this)"
                  aria-label="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="product-quick-actions">
            <button class="btn-quick-add" onclick="event.stopPropagation(); UIManager.handleQuickAdd('${product.id}')">Quick Add</button>
            <button class="btn-quick-view" onclick="event.stopPropagation(); UIManager.openQuickView('${product.id}')">Quick View</button>
          </div>
        </div>

        <div class="product-info">
          <span class="product-category">${product.categoryLabel}</span>
          <h3 class="product-title"><a href="product.html?id=${product.id}" style="color: inherit; text-decoration: none;">${product.name}</a></h3>
          
          <div class="product-rating">
            ★ ${product.rating} <span>(${product.reviewsCount})</span>
          </div>

          <div class="product-price-wrapper">
            <span class="product-price">${ProductsAPI.formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="product-old-price">${ProductsAPI.formatPrice(product.oldPrice)}</span>` : ''}
          </div>
        </div>
      </article>
    `;
  },

  // Handlers
  handleQuickAdd: (productId) => {
    CartStore.addToCart(productId, 1);
    const product = ProductsAPI.getById(productId);
    UIManager.showToast(`${product.name} added to your bag.`, "Added to Cart");
    UIManager.openCartDrawer();
  },

  handleWishlistToggle: (productId, btnEl) => {
    const added = CartStore.toggleWishlist(productId);
    const product = ProductsAPI.getById(productId);
    
    if (btnEl) {
      btnEl.classList.toggle('active', added);
      const svg = btnEl.querySelector('svg');
      if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
    }

    if (added) {
      UIManager.showToast(`${product.name} saved to your wishlist.`, "Wishlist Updated");
    } else {
      UIManager.showToast(`${product.name} removed from your wishlist.`, "Wishlist Updated");
    }
  },

  // Quick View Modal
  openQuickView: (productId) => {
    const product = ProductsAPI.getById(productId);
    if (!product) return;

    let modalWrapper = document.querySelector('#quick-view-modal');
    if (!modalWrapper) {
      modalWrapper = document.createElement('div');
      modalWrapper.id = 'quick-view-modal';
      modalWrapper.className = 'modal-wrapper';
      document.body.appendChild(modalWrapper);
    }

    const backdrop = document.querySelector('.drawer-backdrop') || UIManager.createBackdrop();
    backdrop.classList.add('active');

    modalWrapper.innerHTML = `
      <div class="modal-card">
        <button class="modal-close" onclick="UIManager.closeQuickView()" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style="background-color: var(--color-surface-secondary); position: relative;">
          <img src="${product.images.main}" id="modal-main-image" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PLACEHOLDER}'">
        </div>

        <div style="padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); font-weight: 600;">${product.categoryLabel}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.75rem; color: var(--color-primary);">${product.name}</h2>
          
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary);">
            ${ProductsAPI.formatPrice(product.price)}
            ${product.oldPrice ? `<span style="font-size: 0.95rem; text-decoration: line-through; color: var(--color-text-muted); margin-left: 0.5rem;">${ProductsAPI.formatPrice(product.oldPrice)}</span>` : ''}
          </div>

          <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">${product.description}</p>

          <!-- Color Selector -->
          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Color: <span id="selected-color-label">${product.colors[0].name}</span></label>
            <div style="display: flex; gap: 0.5rem;">
              ${product.colors.map((c, i) => `
                <button type="button" 
                        class="color-option ${i === 0 ? 'active' : ''}" 
                        style="width: 28px; height: 28px; border-radius: 50%; background-color: ${c.hex}; border: 2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}; cursor: pointer;" 
                        onclick="UIManager.selectColor('${c.name}', this)"></button>
              `).join('')}
            </div>
          </div>

          <!-- Size Selector -->
          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Select Size</label>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="size-options-container">
              ${product.sizes.map((s, i) => `
                <button type="button" 
                        class="size-btn ${i === 0 ? 'active' : ''}" 
                        style="padding: 0.5rem 1rem; border: 1px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${i === 0 ? 'var(--color-primary)' : 'var(--color-surface)'}; color: ${i === 0 ? 'var(--color-surface)' : 'var(--color-primary)'}; border-radius: var(--radius-xs); font-size: 0.8125rem; font-weight: 600;"
                        onclick="UIManager.selectSize('${s}', this)">${s}</button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button class="btn btn-primary" style="flex: 1;" onclick="UIManager.handleModalAddToCart('${product.id}')">ADD TO BAG</button>
          </div>
        </div>
      </div>
    `;

    modalWrapper.classList.add('active');
  },

  selectColor: (colorName, btn) => {
    document.querySelectorAll('.color-option').forEach(b => b.style.borderColor = 'var(--color-border)');
    btn.style.borderColor = 'var(--color-primary)';
    document.getElementById('selected-color-label').textContent = colorName;
  },

  selectSize: (size, btn) => {
    document.querySelectorAll('#size-options-container .size-btn').forEach(b => {
      b.style.background = 'var(--color-surface)';
      b.style.color = 'var(--color-primary)';
      b.style.borderColor = 'var(--color-border)';
    });
    btn.style.background = 'var(--color-primary)';
    btn.style.color = 'var(--color-surface)';
    btn.style.borderColor = 'var(--color-primary)';
    btn.classList.add('active');
  },

  handleModalAddToCart: (productId) => {
    const activeSizeBtn = document.querySelector('#size-options-container .size-btn.active');
    const size = activeSizeBtn ? activeSizeBtn.textContent : null;
    const colorLabel = document.getElementById('selected-color-label');
    const color = colorLabel ? colorLabel.textContent : null;

    CartStore.addToCart(productId, 1, size, color);
    UIManager.closeQuickView();
    UIManager.openCartDrawer();
  },

  closeQuickView: () => {
    const modal = document.getElementById('quick-view-modal');
    if (modal) modal.classList.remove('active');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop && !document.querySelector('.cart-drawer.active') && !document.querySelector('.mobile-nav-drawer.active') && !document.querySelector('.account-drawer.active')) {
      backdrop.classList.remove('active');
    }
  },

  // Cart Drawer
  renderCartDrawer: () => {
    const cartItems = CartStore.getCart();
    const subtotal = CartStore.getCartSubtotal();
    const cartBody = document.querySelector('.cart-drawer-body');
    const subtotalEl = document.querySelector('#cart-drawer-subtotal');
    
    if (subtotalEl) {
      subtotalEl.textContent = ProductsAPI.formatPrice(subtotal);
    }

    // Free shipping calculation
    const freeShippingProgress = Math.min(100, (subtotal / UIManager.FREE_SHIPPING_THRESHOLD) * 100);
    const progressFill = document.querySelector('.progress-fill');
    const shippingText = document.querySelector('#shipping-progress-text');

    if (progressFill) progressFill.style.width = `${freeShippingProgress}%`;
    if (shippingText) {
      if (subtotal >= UIManager.FREE_SHIPPING_THRESHOLD) {
        shippingText.innerHTML = `<strong>Congratulations!</strong> You qualify for FREE Shipping.`;
      } else {
        const remaining = UIManager.FREE_SHIPPING_THRESHOLD - subtotal;
        shippingText.innerHTML = `Add <strong>${ProductsAPI.formatPrice(remaining)}</strong> more to get FREE Shipping!`;
      }
    }

    if (!cartBody) return;

    if (cartItems.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.5;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <p style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-primary); margin-bottom: 0.5rem;">Your shopping bag is empty</p>
          <p style="font-size: 0.875rem;">Discover our latest collection and elevate your wardrobe.</p>
        </div>
      `;
      return;
    }

    cartBody.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PLACEHOLDER}'">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">Size: ${item.size} | Color: ${item.color}</div>
            <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.25rem;">${ProductsAPI.formatPrice(item.price)}</div>
          </div>
          <div class="cart-item-qty-row">
            <div class="qty-control">
              <button class="qty-btn" onclick="CartStore.updateQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
              <span class="qty-input">${item.quantity}</span>
              <button class="qty-btn" onclick="CartStore.updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
            </div>
            <button onclick="CartStore.removeFromCart('${item.cartItemId}')" style="font-size: 0.75rem; color: var(--color-sale); text-decoration: underline;">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  openCartDrawer: () => {
    const drawer = document.querySelector('.cart-drawer');
    const backdrop = document.querySelector('.drawer-backdrop') || UIManager.createBackdrop();
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
  },

  closeCartDrawer: () => {
    const drawer = document.querySelector('.cart-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  },

  // Backdrop Manager
  createBackdrop: () => {
    let backdrop = document.querySelector('.drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      backdrop.onclick = () => {
        UIManager.closeCartDrawer();
        UIManager.closeMobileNav();
        UIManager.closeQuickView();
        UIManager.closeAccountDrawer();
        UIManager.closeSearch();
      };
      document.body.appendChild(backdrop);
    }
    return backdrop;
  },

  // Event Bindings
  bindHeaderEvents: () => {
    const mobileBtn = document.querySelector('.hamburger-btn');
    if (mobileBtn) {
      mobileBtn.onclick = () => UIManager.openMobileNav();
    }
  },

  openMobileNav: () => {
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.drawer-backdrop') || UIManager.createBackdrop();
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
  },

  closeMobileNav: () => {
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  },

  bindCartEvents: () => {
    const cartBtns = document.querySelectorAll('.cart-trigger-btn');
    cartBtns.forEach(b => b.onclick = (e) => {
      e.preventDefault();
      UIManager.openCartDrawer();
    });

    const closeCartBtn = document.querySelector('#close-cart-drawer');
    if (closeCartBtn) closeCartBtn.onclick = () => UIManager.closeCartDrawer();
  },

  /* ==========================================================================
     GLOBAL FULLSCREEN SEARCH ENGINE
     ========================================================================== */
  getRecentSearches: () => {
    try {
      const data = localStorage.getItem(RECENT_SEARCHES_KEY);
      return data ? JSON.parse(data) : ["Kurti", "Saree", "Men's Shirt", "Jeans", "New Arrivals"];
    } catch (e) {
      return ["Kurti", "Saree", "Men's Shirt", "Jeans", "New Arrivals"];
    }
  },

  saveRecentSearch: (query) => {
    if (!query || !query.trim()) return;
    let searches = UIManager.getRecentSearches();
    searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase().trim());
    searches.unshift(query.trim());
    if (searches.length > 8) searches = searches.slice(0, 8);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch(e){}
  },

  clearRecentSearches: () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    UIManager.renderSearchContent('');
  },

  bindSearchEvents: () => {
    const searchBtns = document.querySelectorAll('.search-trigger-btn');
    searchBtns.forEach(b => b.onclick = (e) => {
      e.preventDefault();
      UIManager.openSearch();
    });
  },

  openSearch: () => {
    let overlay = document.getElementById('fullscreen-search-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'fullscreen-search-overlay';
      overlay.className = 'fullscreen-search-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="container" style="position: relative; flex: 1; display: flex; flex-direction: column;">
        <button class="search-close-btn" onclick="UIManager.closeSearch()" aria-label="Close search">
          &times;
        </button>

        <div class="search-overlay-header">
          <div class="search-input-wrapper">
            <svg class="search-input-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="global-search-input" class="search-input-field" placeholder="Search cashmere, sarees, blazers, kurtis..." autocomplete="off">
            <button id="search-clear-input-btn" class="search-clear-btn" onclick="UIManager.clearSearchInput()">&times;</button>
          </div>

          <div id="search-tags-container">
            <!-- Popular & Recent Tags rendered dynamically -->
          </div>
        </div>

        <div id="search-results-viewport" style="flex: 1;">
          <!-- Product results rendered dynamically -->
        </div>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const input = document.getElementById('global-search-input');
    if (input) {
      input.focus();
      input.oninput = (e) => {
        const val = e.target.value;
        const clearBtn = document.getElementById('search-clear-input-btn');
        if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
        UIManager.renderSearchContent(val);
      };

      input.onkeydown = (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          UIManager.saveRecentSearch(input.value);
        }
      };
    }

    UIManager.renderSearchContent('');
  },

  clearSearchInput: () => {
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = '';
      input.focus();
      document.getElementById('search-clear-input-btn').style.display = 'none';
      UIManager.renderSearchContent('');
    }
  },

  closeSearch: () => {
    const overlay = document.getElementById('fullscreen-search-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  },

  renderSearchContent: (query) => {
    const tagsContainer = document.getElementById('search-tags-container');
    const viewport = document.getElementById('search-results-viewport');
    if (!viewport) return;

    const popularQueries = ["Kurti", "Saree", "Men's Shirt", "Jeans", "Coat", "Tailored Blazer", "Silk Dress", "New Arrivals"];
    const recentQueries = UIManager.getRecentSearches();

    if (tagsContainer) {
      tagsContainer.innerHTML = `
        <div style="margin-top: 1.25rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-weight: 700; margin-bottom: 0.5rem;">Popular Searches</div>
          <div class="search-tags-row">
            ${popularQueries.map(q => `
              <button class="search-tag-chip popular" onclick="UIManager.executeSearchTag('${q}')">
                ✦ ${q}
              </button>
            `).join('')}
          </div>
        </div>

        ${recentQueries.length > 0 ? `
          <div style="margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); font-weight: 700;">Recent Searches</span>
              <button onclick="UIManager.clearRecentSearches()" style="font-size: 0.75rem; color: var(--color-text-muted); text-decoration: underline; background: none; border: none; cursor: pointer;">Clear Recent</button>
            </div>
            <div class="search-tags-row">
              ${recentQueries.map(q => `
                <button class="search-tag-chip" onclick="UIManager.executeSearchTag('${q}')">
                  🕒 ${q}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
    }

    const trimmed = query.trim().toLowerCase();
    const allProducts = ProductsAPI.getAll();

    if (!trimmed) {
      // Show Trending / Curated Recommendations when search input is empty
      const trending = allProducts.slice(0, 4);
      viewport.innerHTML = `
        <div style="margin-top: 2rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-primary); margin-bottom: 1rem;">Curated Recommendations</h3>
          <div class="search-results-grid">
            ${trending.map(p => UIManager.renderProductCardHTML(p)).join('')}
          </div>
        </div>
      `;
      return;
    }

    // Filter products dynamically
    const results = allProducts.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(trimmed);
      const catMatch = p.category.toLowerCase().includes(trimmed) || (p.categoryLabel && p.categoryLabel.toLowerCase().includes(trimmed));
      const descMatch = p.description && p.description.toLowerCase().includes(trimmed);
      return nameMatch || catMatch || descMatch;
    });

    if (results.length === 0) {
      viewport.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.4;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 0.5rem;">No matches found for "${query}"</p>
          <p style="font-size: 0.875rem;">Try searching for popular terms like "silk", "blazer", "coat", or "saree".</p>
        </div>
      `;
      return;
    }

    viewport.innerHTML = `
      <div style="margin-top: 1.5rem;">
        <div style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 1rem;">
          Found <strong>${results.length}</strong> matching style${results.length > 1 ? 's' : ''} for "<strong>${query}</strong>"
        </div>
        <div class="search-results-grid">
          ${results.map(p => UIManager.renderProductCardHTML(p)).join('')}
        </div>
      </div>
    `;
  },

  executeSearchTag: (query) => {
    UIManager.saveRecentSearch(query);
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = query;
      document.getElementById('search-clear-input-btn').style.display = 'block';
      UIManager.renderSearchContent(query);
    }
  },

  /* ==========================================================================
     DEMO ACCOUNT & PROFILE MODAL SYSTEM
     ========================================================================== */
  bindAccountEvents: () => {
    const accountBtns = document.querySelectorAll('.account-trigger-btn');
    accountBtns.forEach(b => b.onclick = (e) => {
      e.preventDefault();
      UIManager.openAccountDrawer();
    });
  },

  getUser: () => {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      return data ? JSON.parse(data) : { loggedIn: false };
    } catch(e) {
      return { loggedIn: false };
    }
  },

  saveUser: (userData) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch(e) {}
  },

  openAccountDrawer: () => {
    let drawer = document.getElementById('account-drawer');
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'account-drawer';
      drawer.className = 'account-drawer';
      document.body.appendChild(drawer);
    }

    const backdrop = document.querySelector('.drawer-backdrop') || UIManager.createBackdrop();
    backdrop.classList.add('active');
    drawer.classList.add('active');

    UIManager.renderAccountBody('signin');
  },

  closeAccountDrawer: () => {
    const drawer = document.getElementById('account-drawer');
    if (drawer) drawer.classList.remove('active');
    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop && !document.querySelector('.cart-drawer.active') && !document.querySelector('.mobile-nav-drawer.active')) {
      backdrop.classList.remove('active');
    }
  },

  renderAccountBody: (activeTab = 'signin') => {
    const drawer = document.getElementById('account-drawer');
    if (!drawer) return;

    const user = UIManager.getUser();

    if (user.loggedIn) {
      drawer.innerHTML = `
        <div class="account-header">
          <h3 class="drawer-title">My Account</h3>
          <button onclick="UIManager.closeAccountDrawer()" class="close-btn">&times;</button>
        </div>

        <div class="account-body">
          <div class="user-profile-banner">
            <div class="user-avatar-circle">${user.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase() : 'EV'}</div>
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-primary); margin-bottom: 2px;">${user.name || 'Eleanor Vance'}</h4>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted);">${user.email || 'eleanor@aurastudios.com'}</p>
              <div class="vip-badge">✦ ${user.memberTier || 'Gold Atelier Member'} • 480 Points</div>
            </div>
          </div>

          <!-- Account Accordion / Tabs -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--color-primary); margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Recent Orders</h4>
              
              <div class="order-history-card">
                <div class="order-header-row">
                  <div>
                    <strong>Order #AU-9842</strong>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Placed on Aug 10, 2026</div>
                  </div>
                  <span class="order-status-pill in-transit">In Transit</span>
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5;">
                  <strong>Items:</strong> Cashmere Wrap Coat (1), Silk Scarf (1)<br>
                  <strong>Total:</strong> NPR 18,500
                </div>
              </div>

              <div class="order-history-card">
                <div class="order-header-row">
                  <div>
                    <strong>Order #AU-9104</strong>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Placed on Aug 02, 2026</div>
                  </div>
                  <span class="order-status-pill delivered">Delivered</span>
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5;">
                  <strong>Items:</strong> Structured Tailored Blazer (1)<br>
                  <strong>Total:</strong> NPR 12,200
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--color-primary); margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Primary Delivery Address</h4>
              <div style="background-color: var(--color-surface-secondary); padding: 1rem; border-radius: var(--radius-xs); font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
                <strong>Eleanor Vance</strong><br>
                Durbar Marg, Ward No. 1<br>
                Kathmandu 44600, Nepal<br>
                Phone: +977 9801234567
              </div>
            </div>

            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <a href="wishlist.html" class="btn btn-outline" style="width: 100%; text-align: center;">VIEW SAVED WISHLIST</a>
              <button onclick="UIManager.handleSignOut()" class="btn btn-primary" style="width: 100%; background-color: var(--color-sale); border-color: var(--color-sale);">SIGN OUT</button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Logged Out State
    drawer.innerHTML = `
      <div class="account-header">
        <h3 class="drawer-title">Member Portal</h3>
        <button onclick="UIManager.closeAccountDrawer()" class="close-btn">&times;</button>
      </div>

      <div class="account-tabs-header">
        <button class="account-tab-btn ${activeTab === 'signin' ? 'active' : ''}" onclick="UIManager.renderAccountBody('signin')">Sign In</button>
        <button class="account-tab-btn ${activeTab === 'register' ? 'active' : ''}" onclick="UIManager.renderAccountBody('register')">Create Account</button>
      </div>

      <div class="account-body">
        ${activeTab === 'signin' ? `
          <form onsubmit="UIManager.handleDemoLogin(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem;">Email Address</label>
              <input type="email" id="login-email-input" value="eleanor@aurastudios.com" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: 0.9rem;">
            </div>

            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem;">Password</label>
              <input type="password" value="password123" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: 0.9rem;">
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem;">
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="checkbox" checked style="accent-color: var(--color-primary);"> Remember Me
              </label>
              <a href="#" onclick="event.preventDefault(); UIManager.showToast('Password reset link sent to your email.', 'Reset Requested');" style="color: var(--color-accent); text-decoration: underline;">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">SIGN IN TO AURA</button>

            <div style="text-align: center; font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 1rem;">
              Demo Account preset: <strong>eleanor@aurastudios.com</strong>
            </div>
          </form>
        ` : `
          <form onsubmit="UIManager.handleDemoRegister(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem;">Full Name</label>
              <input type="text" id="register-name-input" placeholder="e.g. Eleanor Vance" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: 0.9rem;">
            </div>

            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem;">Email Address</label>
              <input type="email" id="register-email-input" placeholder="name@example.com" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: 0.9rem;">
            </div>

            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem;">Password</label>
              <input type="password" placeholder="At least 8 characters" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: 0.9rem;">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">CREATE ATELIER ACCOUNT</button>
          </form>
        `}
      </div>
    `;
  },

  handleDemoLogin: (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email-input').value;
    const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Eleanor Vance';
    
    UIManager.saveUser({
      loggedIn: true,
      name: name === 'Eleanor' ? 'Eleanor Vance' : name,
      email: email,
      memberTier: 'Gold Atelier Member',
      points: 480
    });

    UIManager.showToast(`Welcome back, ${name}!`, "Authentication Successful");
    UIManager.renderAccountBody('signin');
  },

  handleDemoRegister: (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name-input').value;
    const email = document.getElementById('register-email-input').value;

    UIManager.saveUser({
      loggedIn: true,
      name,
      email,
      memberTier: 'Atelier Member',
      points: 100
    });

    UIManager.showToast(`Welcome to AURA Studios, ${name}!`, "Account Created");
    UIManager.renderAccountBody('signin');
  },

  handleSignOut: () => {
    UIManager.saveUser({ loggedIn: false });
    UIManager.showToast("You have been signed out.", "Signed Out");
    UIManager.renderAccountBody('signin');
  },

  // Scroll & Sticky Header
  bindScrollEvents: () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      if (backToTopBtn) {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    });

    if (backToTopBtn) {
      backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  // Scroll Reveal Observer
  initScrollReveal: () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  },

  // Sale Countdown Timer
  initCountdownTimer: () => {
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    if (!hoursEl) return;

    let totalSeconds = (18 * 3600) + (42 * 60) + 15;

    setInterval(() => {
      if (totalSeconds <= 0) return;
      totalSeconds--;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  },

  // Newsletter Form
  bindNewsletterForm: () => {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input && input.value) {
          UIManager.showToast("Thank you for joining AURA VIP list!", "Subscribed Successful");
          input.value = "";
        }
      };
    });
  }
};

