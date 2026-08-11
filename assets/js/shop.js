/* ==========================================================================
   AURA Fashion - Shop Page Master Controller Engine
   Handles Filtering, Sorting, Grid Views, Pagination, Active Tags & Quick View
   ========================================================================== */

const ShopController = {
  state: {
    category: 'all',
    subcategories: [],
    sizes: [],
    colors: [],
    priceMin: 0,
    priceMax: 30000,
    brands: [],
    availability: 'all', // 'all', 'inStock', 'onSale'
    minRating: 0,
    searchQuery: '',
    sortBy: 'featured',
    gridCols: 4,
    currentPage: 1,
    itemsPerPage: 8
  },

  init() {
    this.parseURLParams();
    this.bindEvents();
    this.render();
  },

  parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      this.state.category = params.get('category').toLowerCase();
    }
    if (params.has('search')) {
      this.state.searchQuery = params.get('search');
    }
    if (params.has('sale') && params.get('sale') === 'true') {
      this.state.availability = 'onSale';
    }
  },

  getFilteredAndSortedProducts() {
    let products = ProductsAPI.getAll();

    // 1. Search Query
    if (this.state.searchQuery) {
      const q = this.state.searchQuery.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (this.state.category && this.state.category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === this.state.category.toLowerCase());
    }

    // 3. Subcategory Filter
    if (this.state.subcategories.length > 0) {
      products = products.filter(p => p.subcategory && this.state.subcategories.includes(p.subcategory));
    }

    // 4. Size Filter
    if (this.state.sizes.length > 0) {
      products = products.filter(p => p.sizes && p.sizes.some(s => this.state.sizes.includes(s)));
    }

    // 5. Color Filter
    if (this.state.colors.length > 0) {
      products = products.filter(p => p.colors && p.colors.some(c => this.state.colors.includes(c.name)));
    }

    // 6. Price Range Filter
    products = products.filter(p => p.price >= this.state.priceMin && p.price <= this.state.priceMax);

    // 7. Brand Filter
    if (this.state.brands.length > 0) {
      products = products.filter(p => p.brand && this.state.brands.includes(p.brand));
    }

    // 8. Availability Filter
    if (this.state.availability === 'inStock') {
      products = products.filter(p => p.inStock === true);
    } else if (this.state.availability === 'onSale') {
      products = products.filter(p => p.isSale === true);
    }

    // 9. Rating Filter
    if (this.state.minRating > 0) {
      products = products.filter(p => p.rating >= this.state.minRating);
    }

    // 10. Sorting
    switch (this.state.sortBy) {
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-selling':
        products.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'featured':
      default:
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return products;
  },

  render() {
    const allFiltered = this.getFilteredAndSortedProducts();
    const totalCount = allFiltered.length;

    // Calculate Pagination
    const totalPages = Math.ceil(totalCount / this.state.itemsPerPage) || 1;
    if (this.state.currentPage > totalPages) {
      this.state.currentPage = 1;
    }

    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const paginatedProducts = allFiltered.slice(startIndex, startIndex + this.state.itemsPerPage);

    // Render all subsections
    this.updateCategoryPills();
    this.updateResultsCount(startIndex, paginatedProducts.length, totalCount);
    this.renderActiveFilterChips();
    this.renderProductGrid(paginatedProducts);
    this.renderPagination(totalPages);
    this.syncFilterControls();
  },

  updateCategoryPills() {
    const pillBtns = document.querySelectorAll('.cat-pill-btn');
    pillBtns.forEach(btn => {
      const cat = btn.dataset.category;
      if (cat === this.state.category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  updateResultsCount(startIndex, currentCount, totalCount) {
    const el = document.getElementById('shop-results-count');
    if (!el) return;

    if (totalCount === 0) {
      el.textContent = 'Showing 0 items';
    } else {
      const from = startIndex + 1;
      const to = startIndex + currentCount;
      el.textContent = `Showing ${from}–${to} of ${totalCount} items`;
    }
  },

  renderActiveFilterChips() {
    const container = document.getElementById('active-filters-chips');
    if (!container) return;

    const chips = [];

    if (this.state.searchQuery) {
      chips.push({
        label: `Search: "${this.state.searchQuery}"`,
        onRemove: () => { this.state.searchQuery = ''; }
      });
    }

    if (this.state.category !== 'all') {
      chips.push({
        label: `Category: ${this.state.category.toUpperCase()}`,
        onRemove: () => { this.state.category = 'all'; }
      });
    }

    this.state.subcategories.forEach(sub => {
      chips.push({
        label: `Subcategory: ${sub}`,
        onRemove: () => {
          this.state.subcategories = this.state.subcategories.filter(s => s !== sub);
        }
      });
    });

    this.state.sizes.forEach(sz => {
      chips.push({
        label: `Size: ${sz}`,
        onRemove: () => {
          this.state.sizes = this.state.sizes.filter(s => s !== sz);
        }
      });
    });

    this.state.colors.forEach(col => {
      chips.push({
        label: `Color: ${col}`,
        onRemove: () => {
          this.state.colors = this.state.colors.filter(c => c !== col);
        }
      });
    });

    if (this.state.priceMax < 30000 || this.state.priceMin > 0) {
      chips.push({
        label: `Price: NPR ${this.state.priceMin.toLocaleString()} - NPR ${this.state.priceMax.toLocaleString()}`,
        onRemove: () => {
          this.state.priceMin = 0;
          this.state.priceMax = 30000;
        }
      });
    }

    this.state.brands.forEach(b => {
      chips.push({
        label: `Brand: ${b}`,
        onRemove: () => {
          this.state.brands = this.state.brands.filter(brand => brand !== b);
        }
      });
    });

    if (this.state.availability !== 'all') {
      chips.push({
        label: `Status: ${this.state.availability === 'inStock' ? 'In Stock' : 'On Sale'}`,
        onRemove: () => { this.state.availability = 'all'; }
      });
    }

    if (this.state.minRating > 0) {
      chips.push({
        label: `Rating: ${this.state.minRating}★ & above`,
        onRemove: () => { this.state.minRating = 0; }
      });
    }

    if (chips.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      ${chips.map((chip, idx) => `
        <div class="filter-tag-chip">
          <span>${chip.label}</span>
          <button data-chip-index="${idx}" title="Remove filter">&times;</button>
        </div>
      `).join('')}
      <button class="clear-all-filters-btn" id="clear-all-filters-trigger">Clear All Filters</button>
    `;

    // Bind remove events
    container.querySelectorAll('button[data-chip-index]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.chipIndex, 10);
        if (chips[index]) {
          chips[index].onRemove();
          ShopController.state.currentPage = 1;
          ShopController.render();
        }
      });
    });

    const clearBtn = container.querySelector('#clear-all-filters-trigger');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ShopController.clearAllFilters();
      });
    }
  },

  renderProductGrid(products) {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    // Apply active grid cols class
    grid.className = `shop-product-grid grid-cols-${this.state.gridCols}`;

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="1.5" style="margin: 0 auto 1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--color-primary);">No products match your criteria</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">Try adjusting your filters, clearing search queries, or expanding the price range.</p>
          <button class="btn btn-primary" onclick="ShopController.clearAllFilters()">RESET ALL FILTERS</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => UIManager.renderProductCardHTML(p)).join('');
  },

  renderPagination(totalPages) {
    const container = document.getElementById('shop-pagination');
    if (!container) return;

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let buttonsHTML = '';

    // Prev Button
    buttonsHTML += `
      <button class="page-btn ${this.state.currentPage === 1 ? 'disabled' : ''}" 
        onclick="ShopController.goToPage(${this.state.currentPage - 1})" 
        ${this.state.currentPage === 1 ? 'disabled' : ''}>
        &laquo;
      </button>
    `;

    // Numeric Buttons
    for (let i = 1; i <= totalPages; i++) {
      buttonsHTML += `
        <button class="page-btn ${i === this.state.currentPage ? 'active' : ''}" 
          onclick="ShopController.goToPage(${i})">
          ${i}
        </button>
      `;
    }

    // Next Button
    buttonsHTML += `
      <button class="page-btn ${this.state.currentPage === totalPages ? 'disabled' : ''}" 
        onclick="ShopController.goToPage(${this.state.currentPage + 1})" 
        ${this.state.currentPage === totalPages ? 'disabled' : ''}>
        &raquo;
      </button>
    `;

    container.innerHTML = buttonsHTML;
  },

  goToPage(page) {
    const totalPages = Math.ceil(this.getFilteredAndSortedProducts().length / this.state.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.state.currentPage = page;
      this.render();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  },

  clearAllFilters() {
    this.state.category = 'all';
    this.state.subcategories = [];
    this.state.sizes = [];
    this.state.colors = [];
    this.state.priceMin = 0;
    this.state.priceMax = 30000;
    this.state.brands = [];
    this.state.availability = 'all';
    this.state.minRating = 0;
    this.state.searchQuery = '';
    this.state.currentPage = 1;

    // Reset URL query without reload
    window.history.replaceState({}, document.title, window.location.pathname);

    this.render();
  },

  syncFilterControls() {
    // Subcategories
    document.querySelectorAll('.filter-checkbox[data-type="subcategory"]').forEach(cb => {
      cb.checked = this.state.subcategories.includes(cb.value);
    });

    // Sizes
    document.querySelectorAll('.size-filter-btn').forEach(btn => {
      if (this.state.sizes.includes(btn.dataset.size)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Colors
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
      if (this.state.colors.includes(btn.dataset.color)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Price Slider Range
    const priceSlider = document.getElementById('price-max-slider');
    const priceOutput = document.getElementById('price-range-output');
    if (priceSlider) {
      priceSlider.value = this.state.priceMax;
    }
    if (priceOutput) {
      priceOutput.textContent = `Up to NPR ${this.state.priceMax.toLocaleString()}`;
    }

    // Brands
    document.querySelectorAll('.filter-checkbox[data-type="brand"]').forEach(cb => {
      cb.checked = this.state.brands.includes(cb.value);
    });

    // Availability
    document.querySelectorAll('.filter-radio[data-type="availability"]').forEach(rb => {
      rb.checked = (rb.value === this.state.availability);
    });

    // Rating
    document.querySelectorAll('.filter-radio[data-type="rating"]').forEach(rb => {
      rb.checked = (parseFloat(rb.value) === this.state.minRating);
    });
  },

  bindEvents() {
    // 1. Category Quick Pills
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.state.category = e.currentTarget.dataset.category;
        this.state.currentPage = 1;
        this.render();
      });
    });

    // 2. Sort Dropdown
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.state.currentPage = 1;
        this.render();
      });
    }

    // 3. Grid View Controls
    document.querySelectorAll('.grid-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cols = parseInt(e.currentTarget.dataset.cols, 10);
        this.state.gridCols = cols;
        document.querySelectorAll('.grid-view-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderProductGrid(this.getFilteredAndSortedProducts().slice((this.state.currentPage - 1) * this.state.itemsPerPage, this.state.currentPage * this.state.itemsPerPage));
      });
    });

    // 4. Subcategory Checkboxes
    document.querySelectorAll('.filter-checkbox[data-type="subcategory"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const val = e.target.value;
        if (e.target.checked) {
          if (!this.state.subcategories.includes(val)) this.state.subcategories.push(val);
        } else {
          this.state.subcategories = this.state.subcategories.filter(s => s !== val);
        }
        this.state.currentPage = 1;
        this.render();
      });
    });

    // 5. Size Buttons
    document.querySelectorAll('.size-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sz = e.currentTarget.dataset.size;
        if (this.state.sizes.includes(sz)) {
          this.state.sizes = this.state.sizes.filter(s => s !== sz);
        } else {
          this.state.sizes.push(sz);
        }
        this.state.currentPage = 1;
        this.render();
      });
    });

    // 6. Color Swatch Buttons
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const col = e.currentTarget.dataset.color;
        if (this.state.colors.includes(col)) {
          this.state.colors = this.state.colors.filter(c => c !== col);
        } else {
          this.state.colors.push(col);
        }
        this.state.currentPage = 1;
        this.render();
      });
    });

    // 7. Price Slider Input
    const priceSlider = document.getElementById('price-max-slider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.state.priceMax = parseInt(e.target.value, 10);
        const output = document.getElementById('price-range-output');
        if (output) {
          output.textContent = `Up to NPR ${this.state.priceMax.toLocaleString()}`;
        }
      });

      priceSlider.addEventListener('change', () => {
        this.state.currentPage = 1;
        this.render();
      });
    }

    // 8. Brand Checkboxes
    document.querySelectorAll('.filter-checkbox[data-type="brand"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const val = e.target.value;
        if (e.target.checked) {
          if (!this.state.brands.includes(val)) this.state.brands.push(val);
        } else {
          this.state.brands = this.state.brands.filter(b => b !== val);
        }
        this.state.currentPage = 1;
        this.render();
      });
    });

    // 9. Availability Radios
    document.querySelectorAll('.filter-radio[data-type="availability"]').forEach(rb => {
      rb.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.state.availability = e.target.value;
          this.state.currentPage = 1;
          this.render();
        }
      });
    });

    // 10. Rating Radios
    document.querySelectorAll('.filter-radio[data-type="rating"]').forEach(rb => {
      rb.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.state.minRating = parseFloat(e.target.value);
          this.state.currentPage = 1;
          this.render();
        }
      });
    });

    // 11. Collapsible Filter Accordions
    document.querySelectorAll('.filter-title').forEach(title => {
      title.addEventListener('click', (e) => {
        const group = e.currentTarget.closest('.filter-group');
        if (group) {
          group.classList.toggle('collapsed');
        }
      });
    });

    // 12. Mobile Filter Drawer Trigger & Close
    const mobileTrigger = document.getElementById('open-mobile-filter');
    const mobileDrawer = document.getElementById('mobile-filter-drawer');
    const closeMobileDrawer = document.getElementById('close-mobile-filter');
    const applyMobileBtn = document.getElementById('apply-mobile-filter');

    if (mobileTrigger && mobileDrawer) {
      mobileTrigger.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
      });
    }

    if (closeMobileDrawer && mobileDrawer) {
      closeMobileDrawer.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    }

    if (applyMobileBtn && mobileDrawer) {
      applyMobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        this.render();
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UIManager.init();
  ShopController.init();
});
