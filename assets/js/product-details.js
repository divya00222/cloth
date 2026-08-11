/* ==========================================================================
   AURA Fashion - Product Details Page (PDP) Master Controller
   Handles Gallery, Zoom, Colors/Sizes, Quantity, Accordions, Reviews & Storage
   ========================================================================== */

const ProductDetailsController = {
  product: null,
  state: {
    selectedColor: '',
    selectedSize: '',
    quantity: 1,
    currentImageIndex: 0,
    galleryImages: []
  },

  reviewsData: [
    {
      author: "Aria Sharma",
      initials: "AS",
      rating: 5,
      date: "August 2, 2026",
      title: "Absolute perfection in tailoring & warmth",
      body: "The double-faced cashmere wool feels exceptionally soft yet possesses great architectural weight. Fits true to size with that ideal relaxed drop-shoulder drape. Worth every rupee.",
      helpful: 24,
      verified: true
    },
    {
      author: "Devendra K.",
      initials: "DK",
      rating: 5,
      date: "July 28, 2026",
      title: "Timeless luxury staple",
      body: "Subtle craftsmanship at its finest. The stitching around the lapels and the horn buttons are flawless. Received so many compliments already.",
      helpful: 18,
      verified: true
    },
    {
      author: "Sujata P.",
      initials: "SP",
      rating: 4,
      date: "July 14, 2026",
      title: "Elegant silhouette & fast delivery",
      body: "Arrived in Kathmandu within 2 days in a gorgeous branded garment box. Color is slightly richer than pictures show in sunlight. Very satisfied!",
      helpful: 9,
      verified: true
    }
  ],

  init() {
    this.loadProduct();
    if (!this.product) {
      this.renderNotFound();
      return;
    }

    this.setupGallery();
    this.setupInitialState();
    this.trackRecentlyViewed();
    this.render();
    this.bindEvents();
    this.renderRelatedProducts();
    this.renderRecentlyViewed();
  },

  loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      this.product = ProductsAPI.getById(id) || null;
    } else {
      this.product = ProductsAPI.getById('aura-001') || ProductsAPI.getAll()[0];
    }
  },

  renderNotFound() {
    document.title = "Product Not Found | AURA Fashion Studios";

    const stickyBar = document.querySelector('.sticky-mobile-buy-bar');
    if (stickyBar) {
      stickyBar.style.display = 'none';
    }

    const mainContainer = document.querySelector('main.section .container');
    if (mainContainer) {
      mainContainer.innerHTML = `
        <nav class="breadcrumb">
          <a href="index.html">Home</a>
          <span class="sep">/</span>
          <a href="shop.html">Shop</a>
          <span class="sep">/</span>
          <span class="current">Product Not Found</span>
        </nav>

        <div class="product-not-found-card text-center" style="padding: 5rem 1.5rem; max-width: 650px; margin: 2rem auto; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #eee); border-radius: var(--radius-md, 8px); box-shadow: var(--shadow-subtle);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-accent);">✦</div>
          <span class="section-subtitle" style="letter-spacing: 0.15em; font-size: 0.8rem; color: var(--color-accent); font-weight: 600; display: block; margin-bottom: 0.5rem; text-transform: uppercase;">ATELIER CATALOG</span>
          <h1 class="pdp-title" style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-primary);">PRODUCT NOT FOUND</h1>
          <p style="color: var(--color-text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 2.5rem; max-width: 480px; margin-left: auto; margin-right: auto;">
            The piece you're looking for may have been moved or is no longer available.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="shop.html" class="btn btn-primary" style="padding: 0.9rem 2rem;">BACK TO SHOP</a>
            <a href="shop.html" class="btn btn-secondary" style="padding: 0.9rem 2rem;">CONTINUE SHOPPING</a>
          </div>
        </div>
      `;
    }
  },

  setupGallery() {
    // Build gallery image list using only images belonging to this selected product
    const images = [];

    if (this.product && this.product.images) {
      if (this.product.images.main) {
        images.push(this.product.images.main);
      }

      if (this.product.images.hover && !images.includes(this.product.images.hover)) {
        images.push(this.product.images.hover);
      }

      if (Array.isArray(this.product.images.gallery)) {
        this.product.images.gallery.forEach(img => {
          if (img && typeof img === 'string' && !images.includes(img)) {
            images.push(img);
          }
        });
      }
    }

    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop");
    }

    this.state.galleryImages = images;
    this.state.currentImageIndex = 0;
  },

  setupInitialState() {
    this.state.selectedColor = this.product.colors && this.product.colors.length > 0 ? this.product.colors[0].name : 'Default';
    this.state.selectedSize = this.product.sizes && this.product.sizes.length > 0 ? this.product.sizes[0] : 'Free Size';
    this.state.quantity = 1;
  },

  trackRecentlyViewed() {
    try {
      let list = JSON.parse(localStorage.getItem('aura_recently_viewed') || '[]');
      // Deduplicate current product
      list = list.filter(id => id !== this.product.id);
      // Prepend
      list.unshift(this.product.id);
      // Limit to 8 items
      if (list.length > 8) list = list.slice(0, 8);
      localStorage.setItem('aura_recently_viewed', JSON.stringify(list));
    } catch (e) {
      console.warn('Recently viewed storage disabled:', e);
    }
  },

  render() {
    document.title = `${this.product.name} | AURA Fashion Studios`;

    // 1. Breadcrumb
    const bcCat = document.getElementById('pdp-bc-cat');
    const bcName = document.getElementById('pdp-bc-name');
    if (bcCat) {
      bcCat.textContent = this.product.categoryLabel || this.product.category;
      bcCat.href = `shop.html?category=${this.product.category}`;
    }
    if (bcName) bcName.textContent = this.product.name;

    // 2. Main Gallery
    this.updateMainGalleryImage();
    this.renderThumbnails();

    // 3. Product Info Right Column
    const catTag = document.getElementById('pdp-category-tag');
    if (catTag) catTag.textContent = `${this.product.brand || 'AURA ATELIER'} | ${this.product.categoryLabel.toUpperCase()}`;

    const titleEl = document.getElementById('pdp-product-title');
    if (titleEl) titleEl.textContent = this.product.name;

    const ratingVal = document.getElementById('pdp-rating-val');
    if (ratingVal) ratingVal.textContent = `${this.product.rating} ★`;

    const reviewCount = document.getElementById('pdp-reviews-count');
    if (reviewCount) reviewCount.textContent = `(${this.product.reviewsCount} Reviews)`;

    // Price
    const currentPriceEl = document.getElementById('pdp-price-current');
    if (currentPriceEl) currentPriceEl.textContent = ProductsAPI.formatPrice(this.product.price);

    const oldPriceEl = document.getElementById('pdp-price-old');
    const discountBadge = document.getElementById('pdp-discount-badge');
    if (this.product.oldPrice) {
      if (oldPriceEl) {
        oldPriceEl.textContent = ProductsAPI.formatPrice(this.product.oldPrice);
        oldPriceEl.style.display = 'inline';
      }
      if (discountBadge) {
        discountBadge.textContent = this.product.discount || 'SPECIAL OFFER';
        discountBadge.style.display = 'inline-block';
      }
    } else {
      if (oldPriceEl) oldPriceEl.style.display = 'none';
      if (discountBadge) discountBadge.style.display = 'none';
    }

    // Short Description
    const descEl = document.getElementById('pdp-short-desc');
    if (descEl) descEl.textContent = this.product.description;

    // Color Swatches
    this.renderColorSwatches();

    // Sizes
    this.renderSizes();

    // Quantity Value
    const qtyInput = document.getElementById('pdp-qty-input');
    if (qtyInput) qtyInput.value = this.state.quantity;

    // Wishlist Active State
    const wishlistBtn = document.getElementById('pdp-wishlist-btn');
    if (wishlistBtn) {
      const isWish = CartStore.isInWishlist(this.product.id);
      wishlistBtn.classList.toggle('active', isWish);
      const svg = wishlistBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isWish ? 'currentColor' : 'none');
    }

    // Sticky Mobile Price
    const stickyPrice = document.getElementById('sticky-mobile-price');
    if (stickyPrice) stickyPrice.textContent = ProductsAPI.formatPrice(this.product.price);

    // Reviews Render
    this.renderReviewsSection();
  },

  updateMainGalleryImage() {
    const mainImg = document.getElementById('pdp-main-image');
    if (mainImg) {
      mainImg.src = this.state.galleryImages[this.state.currentImageIndex];
      mainImg.alt = `${this.product.name} view ${this.state.currentImageIndex + 1}`;
    }

    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    const hasMultiple = this.state.galleryImages.length > 1;
    if (prevBtn) prevBtn.style.display = hasMultiple ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = hasMultiple ? 'flex' : 'none';
  },

  renderThumbnails() {
    const container = document.getElementById('pdp-gallery-thumbs');
    if (!container) return;

    if (this.state.galleryImages.length <= 1) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.style.display = 'flex';
    container.innerHTML = this.state.galleryImages.map((src, i) => `
      <button class="thumb-btn ${i === this.state.currentImageIndex ? 'active' : ''}" 
              data-index="${i}" 
              aria-label="View thumbnail ${i + 1}">
        <img src="${src}" alt="${this.product.name} thumbnail ${i + 1}">
      </button>
    `).join('');

    container.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        ProductDetailsController.state.currentImageIndex = idx;
        ProductDetailsController.updateMainGalleryImage();
        ProductDetailsController.renderThumbnails();
      });
    });
  },

  renderColorSwatches() {
    const labelSpan = document.getElementById('pdp-selected-color-label');
    if (labelSpan) labelSpan.textContent = this.state.selectedColor;

    const container = document.getElementById('pdp-color-swatches');
    if (!container) return;

    if (!this.product.colors || this.product.colors.length === 0) {
      container.innerHTML = '<span style="font-size: 0.85rem; color: var(--color-text-muted);">Standard Color</span>';
      return;
    }

    container.innerHTML = this.product.colors.map(col => `
      <button type="button" 
              class="pdp-color-btn ${col.name === this.state.selectedColor ? 'active' : ''}" 
              data-color="${col.name}" 
              style="background-color: ${col.hex};" 
              title="${col.name}">
      </button>
    `).join('');

    container.querySelectorAll('.pdp-color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cName = e.currentTarget.dataset.color;
        ProductDetailsController.state.selectedColor = cName;
        ProductDetailsController.renderColorSwatches();
      });
    });
  },

  renderSizes() {
    const container = document.getElementById('pdp-size-options');
    if (!container) return;

    if (!this.product.sizes || this.product.sizes.length === 0) {
      container.innerHTML = '<span style="font-size: 0.85rem; color: var(--color-text-muted);">One Size Fits All</span>';
      return;
    }

    container.innerHTML = this.product.sizes.map(sz => `
      <button type="button" 
              class="pdp-size-btn ${sz === this.state.selectedSize ? 'active' : ''}" 
              data-size="${sz}">
        ${sz}
      </button>
    `).join('');

    container.querySelectorAll('.pdp-size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const szVal = e.currentTarget.dataset.size;
        ProductDetailsController.state.selectedSize = szVal;
        ProductDetailsController.renderSizes();
      });
    });
  },

  renderRelatedProducts() {
    const container = document.getElementById('related-products-grid');
    if (!container) return;

    let related = ProductsAPI.getAll().filter(p => p.id !== this.product.id && p.category === this.product.category);
    if (related.length < 4) {
      related = ProductsAPI.getAll().filter(p => p.id !== this.product.id);
    }
    related = related.slice(0, 4);

    container.innerHTML = related.map(p => UIManager.renderProductCardHTML(p)).join('');
  },

  renderRecentlyViewed() {
    const container = document.getElementById('recently-viewed-grid');
    if (!container) return;

    try {
      const list = JSON.parse(localStorage.getItem('aura_recently_viewed') || '[]');
      const filteredIDs = list.filter(id => id !== this.product.id).slice(0, 4);

      if (filteredIDs.length === 0) {
        document.getElementById('recently-viewed-section').style.display = 'none';
        return;
      }

      document.getElementById('recently-viewed-section').style.display = 'block';
      const items = filteredIDs.map(id => ProductsAPI.getById(id)).filter(Boolean);
      container.innerHTML = items.map(p => UIManager.renderProductCardHTML(p)).join('');
    } catch (e) {
      document.getElementById('recently-viewed-section').style.display = 'none';
    }
  },

  renderReviewsSection() {
    const container = document.getElementById('reviews-list-container');
    if (!container) return;

    container.innerHTML = this.reviewsData.map(rev => `
      <article class="review-card">
        <div class="review-card-header">
          <div class="review-author-info">
            <div class="review-avatar">${rev.initials}</div>
            <div>
              <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">
                ${rev.author}
                ${rev.verified ? `<span class="verified-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Buyer</span>` : ''}
              </div>
              <div style="color: var(--color-accent); font-size: 0.8rem;">
                ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
              </div>
            </div>
          </div>
          <span class="review-date">${rev.date}</span>
        </div>
        <h4 class="review-title">${rev.title}</h4>
        <p class="review-body">${rev.body}</p>
        <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
          Was this review helpful?
          <button style="background: var(--color-surface-secondary); border: 1px solid var(--color-border); padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;" onclick="UIManager.showToast('Thank you for your feedback.', 'Feedback Logged')">Yes (${rev.helpful})</button>
        </div>
      </article>
    `).join('');
  },

  bindEvents() {
    // 1. Gallery Arrows Cycle
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.state.currentImageIndex = (this.state.currentImageIndex - 1 + this.state.galleryImages.length) % this.state.galleryImages.length;
        this.updateMainGalleryImage();
        this.renderThumbnails();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.state.currentImageIndex = (this.state.currentImageIndex + 1) % this.state.galleryImages.length;
        this.updateMainGalleryImage();
        this.renderThumbnails();
      });
    }

    // 2. Fullscreen Zoom Modal
    const mainViewport = document.getElementById('main-image-viewport');
    const fsTrigger = document.getElementById('pdp-fullscreen-trigger');

    if (mainViewport) {
      mainViewport.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-nav-btn') || e.target.closest('.fullscreen-trigger-btn')) return;
        mainViewport.classList.toggle('zoomed');
      });
    }

    if (fsTrigger) {
      fsTrigger.addEventListener('click', () => {
        this.openFullscreenModal();
      });
    }

    // 3. Quantity Controls
    const qtyMinus = document.getElementById('pdp-qty-minus');
    const qtyPlus = document.getElementById('pdp-qty-plus');
    const qtyInput = document.getElementById('pdp-qty-input');

    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        if (this.state.quantity > 1) {
          this.state.quantity--;
          if (qtyInput) qtyInput.value = this.state.quantity;
        }
      });
    }

    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        this.state.quantity++;
        if (qtyInput) qtyInput.value = this.state.quantity;
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        this.state.quantity = val;
        e.target.value = val;
      });
    }

    // 4. Add to Cart Button (Desktop & Sticky Mobile)
    const addCartBtns = document.querySelectorAll('.pdp-add-to-cart-trigger');
    addCartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        CartStore.addToCart(this.product.id, this.state.quantity, {
          color: this.state.selectedColor,
          size: this.state.selectedSize
        });
        UIManager.showToast(`${this.product.name} (${this.state.selectedColor}, ${this.state.selectedSize}) added to bag.`, "Added to Bag");
        UIManager.openCartDrawer();
      });
    });

    // 5. Buy Now Button (Desktop & Sticky Mobile)
    const buyNowBtns = document.querySelectorAll('.pdp-buy-now-trigger');
    buyNowBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        CartStore.addToCart(this.product.id, this.state.quantity, {
          color: this.state.selectedColor,
          size: this.state.selectedSize
        });
        window.location.href = 'checkout.html';
      });
    });

    // 6. Wishlist Button
    const wishlistBtn = document.getElementById('pdp-wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        UIManager.handleWishlistToggle(this.product.id, wishlistBtn);
      });
    }

    // 7. Accordion Toggle
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const item = e.currentTarget.closest('.accordion-item');
        if (item) {
          item.classList.toggle('active');
        }
      });
    });

    // 8. Size Guide Modal Trigger
    const sizeGuideBtns = document.querySelectorAll('.size-guide-trigger');
    sizeGuideBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.openSizeGuideModal();
      });
    });

    // 9. Write Review Modal Trigger
    const writeReviewBtn = document.getElementById('write-review-btn');
    if (writeReviewBtn) {
      writeReviewBtn.addEventListener('click', () => {
        this.openWriteReviewModal();
      });
    }
  },

  openFullscreenModal() {
    let backdrop = document.querySelector('#fullscreen-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'fullscreen-modal-backdrop';
      backdrop.className = 'fullscreen-modal-backdrop';
      document.body.appendChild(backdrop);
    }

    backdrop.innerHTML = `
      <button class="fullscreen-close-btn">&times;</button>
      <img src="${this.state.galleryImages[this.state.currentImageIndex]}" class="fullscreen-modal-img" alt="${this.product.name}">
    `;

    backdrop.classList.add('active');

    const close = () => backdrop.classList.remove('active');
    backdrop.querySelector('.fullscreen-close-btn').onclick = close;
    backdrop.onclick = (e) => { if (e.target === backdrop) close(); };
  },

  openSizeGuideModal() {
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
      <div class="modal-card" style="grid-template-columns: 1fr; max-width: 650px; padding: 2.5rem;">
        <button class="modal-close" onclick="UIManager.closeQuickView()" aria-label="Close modal">&times;</button>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); font-weight: 700;">AURA SIZE SPECIFICATIONS</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.75rem; margin-bottom: 0.5rem; color: var(--color-primary);">TAILORING SIZE GUIDE</h2>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary);">All measurements are provided in inches and centimeters for standard silhouette fits.</p>
        
        <table class="size-guide-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in/cm)</th>
              <th>Waist (in/cm)</th>
              <th>Hips (in/cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>XS</strong></td><td>32-34" / 81-86cm</td><td>26-28" / 66-71cm</td><td>34-36" / 86-91cm</td></tr>
            <tr><td><strong>S</strong></td><td>35-37" / 89-94cm</td><td>29-31" / 74-79cm</td><td>37-39" / 94-99cm</td></tr>
            <tr><td><strong>M</strong></td><td>38-40" / 97-102cm</td><td>32-34" / 81-86cm</td><td>40-42" / 102-107cm</td></tr>
            <tr><td><strong>L</strong></td><td>41-43" / 104-109cm</td><td>35-37" / 89-94cm</td><td>43-45" / 109-114cm</td></tr>
            <tr><td><strong>XL</strong></td><td>44-46" / 112-117cm</td><td>38-40" / 97-102cm</td><td>46-48" / 117-122cm</td></tr>
            <tr><td><strong>XXL</strong></td><td>47-49" / 119-124cm</td><td>41-43" / 104-109cm</td><td>49-51" / 124-130cm</td></tr>
          </tbody>
        </table>

        <div style="margin-top: 1.5rem; text-align: center;">
          <button class="btn btn-primary" onclick="UIManager.closeQuickView()" style="width: 100%;">CLOSE GUIDE</button>
        </div>
      </div>
    `;
  },

  openWriteReviewModal() {
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
      <div class="modal-card" style="grid-template-columns: 1fr; max-width: 550px; padding: 2.5rem;">
        <button class="modal-close" onclick="UIManager.closeQuickView()" aria-label="Close modal">&times;</button>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); font-weight: 700;">SHARE YOUR EXPERIENCE</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.75rem; margin-bottom: 1rem; color: var(--color-primary);">WRITE A REVIEW</h2>
        
        <form id="write-review-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">Overall Rating</label>
            <select id="review-rating-select" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-weight: 600;">
              <option value="5">★★★★★ 5 Stars - Exceptional</option>
              <option value="4">★★★★☆ 4 Stars - Very Good</option>
              <option value="3">★★★☆☆ 3 Stars - Average</option>
              <option value="2">★★☆☆☆ 2 Stars - Fair</option>
              <option value="1">★☆☆☆☆ 1 Star - Poor</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">Your Name</label>
            <input type="text" id="review-name-input" required placeholder="e.g. Ananya Thapa" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs);">
          </div>

          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">Headline / Title</label>
            <input type="text" id="review-title-input" required placeholder="Summarize your review" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs);">
          </div>

          <div>
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">Review Comments</label>
            <textarea id="review-body-input" rows="4" required placeholder="Describe fabric quality, fit, craftsmanship, or delivery experience..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-family: inherit;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">SUBMIT REVIEW</button>
        </form>
      </div>
    `;

    const form = document.getElementById('write-review-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = parseInt(document.getElementById('review-rating-select').value, 10);
        const name = document.getElementById('review-name-input').value.trim();
        const title = document.getElementById('review-title-input').value.trim();
        const body = document.getElementById('review-body-input').value.trim();

        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || 'AU';

        ProductDetailsController.reviewsData.unshift({
          author: name,
          initials: initials,
          rating: rating,
          date: 'Just Now',
          title: title,
          body: body,
          helpful: 0,
          verified: true
        });

        ProductDetailsController.renderReviewsSection();
        UIManager.closeQuickView();
        UIManager.showToast('Thank you! Your review has been published.', 'Review Submitted');
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UIManager.init();
  ProductDetailsController.init();
});
