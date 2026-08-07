import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Heart, Search, Star, Sparkles, Filter, SlidersHorizontal, 
  X, Check, Eye, ArrowUpDown, ChevronLeft, ChevronRight, Grid, List,
  ShieldCheck, AlertCircle, RefreshCw, Code, RotateCcw, CheckCircle2,
  Share2, ZoomIn, Gift
} from 'lucide-react';

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  brand: string; // Weaver Guild
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  colorName: string;
  colorHex: string;
  gradientClass: string;
  fabric: string;
  size: string; // Drape / Blouse option
  stockStatus: 'in_stock' | 'low_stock' | 'pre_order';
  stockCount?: number;
  origin: string;
  weavingHours: number;
  badge?: string;
  isNew?: boolean;
}

const SAMPLE_PRODUCTS: ShopProduct[] = [
  {
    id: 's1',
    name: 'Ketan Gold Zari Imperial Banarasi Saree',
    category: 'Banarasi',
    brand: 'Varanasi Master Guild',
    price: 32500,
    originalPrice: 38000,
    rating: 5.0,
    reviewsCount: 48,
    colorName: 'Royal Crimson',
    colorHex: '#800020',
    gradientClass: 'from-[#800020] to-[#3A000E]',
    fabric: 'Pure Katan Silk',
    size: 'Standard 5.5m + Unstitched Blouse',
    stockStatus: 'in_stock',
    stockCount: 8,
    origin: 'Varanasi',
    weavingHours: 140,
    badge: 'ROYAL BRIDAL'
  },
  {
    id: 's2',
    name: 'Kanjeevaram Temple Border Pure Gold Saree',
    category: 'Kanjeevaram',
    brand: 'Kanchipuram Heritage Guild',
    price: 45000,
    originalPrice: 52000,
    rating: 4.9,
    reviewsCount: 62,
    colorName: 'Peacock Green',
    colorHex: '#004B49',
    gradientClass: 'from-[#004B49] to-[#001F1E]',
    fabric: 'Mulberry Silk',
    size: '6.3m + Pre-Stitched Blouse',
    stockStatus: 'low_stock',
    stockCount: 2,
    origin: 'Kanchipuram',
    weavingHours: 180,
    badge: 'SILK MARK CERTIFIED'
  },
  {
    id: 's3',
    name: 'Chanderi Gold Tissue Light Weave Saree',
    category: 'Chanderi',
    brand: 'Chanderi Artisan Collective',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 29,
    colorName: 'Sheer Gold',
    colorHex: '#D4AF37',
    gradientClass: 'from-[#D4AF37]/80 to-[#7A6115]',
    fabric: 'Silk Tissue',
    size: 'Standard 5.5m + Unstitched Blouse',
    stockStatus: 'in_stock',
    stockCount: 12,
    origin: 'Chanderi',
    weavingHours: 90,
    badge: 'FESTIVE EDIT'
  },
  {
    id: 's4',
    name: 'Shikargah Handloom Brocade Masterpiece',
    category: 'Banarasi',
    brand: 'Varanasi Master Guild',
    price: 58000,
    originalPrice: 65000,
    rating: 5.0,
    reviewsCount: 34,
    colorName: 'Imperial Purple',
    colorHex: '#4B0082',
    gradientClass: 'from-[#4B0082] to-[#21003B]',
    fabric: 'Pure Katan Silk',
    size: 'Ready-to-Wear Pre-Draped',
    stockStatus: 'low_stock',
    stockCount: 1,
    origin: 'Varanasi',
    weavingHours: 210,
    badge: 'LIMITED ARTISAN'
  },
  {
    id: 's5',
    name: 'Organza Cutwork Hand Embroidered Floral Saree',
    category: 'Organza',
    brand: 'Royal Heritage Weavers',
    price: 24000,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 41,
    colorName: 'Ruby Red',
    colorHex: '#9B111E',
    gradientClass: 'from-[#9B111E] to-[#4D080F]',
    fabric: 'Pure Silk Organza',
    size: 'Standard 5.5m + Unstitched Blouse',
    stockStatus: 'in_stock',
    stockCount: 6,
    origin: 'Varanasi',
    weavingHours: 110,
    badge: 'CELEBRITY CHOICE'
  },
  {
    id: 's6',
    name: 'Bandhani Georgette Silver-Gold Kadwa Saree',
    category: 'Festive',
    brand: 'Jaipur & Varanasi Guild',
    price: 29500,
    originalPrice: 34000,
    rating: 4.9,
    reviewsCount: 38,
    colorName: 'Bright Vermilion',
    colorHex: '#C41E3A',
    gradientClass: 'from-[#C41E3A] to-[#630F1D]',
    fabric: 'Pure Georgette Silk',
    size: '6.3m + Pre-Stitched Blouse',
    stockStatus: 'pre_order',
    origin: 'Jaipur & Varanasi',
    weavingHours: 130,
    badge: 'BRIDAL TROUSSEAU'
  },
  {
    id: 's7',
    name: 'Midnight Onyx Zari Weave Banarasi Saree',
    category: 'Banarasi',
    brand: 'Varanasi Master Guild',
    price: 36000,
    originalPrice: 42000,
    rating: 4.9,
    reviewsCount: 19,
    colorName: 'Midnight Onyx',
    colorHex: '#1A1A1A',
    gradientClass: 'from-[#1A1A1A] to-black',
    fabric: 'Katan Silk',
    size: 'Standard 5.5m + Unstitched Blouse',
    stockStatus: 'in_stock',
    stockCount: 5,
    origin: 'Varanasi',
    weavingHours: 155,
    isNew: true
  },
  {
    id: 's8',
    name: 'Emerald Brocade Kanjeevaram Heavy Bridal Saree',
    category: 'Kanjeevaram',
    brand: 'Kanchipuram Heritage Guild',
    price: 49000,
    originalPrice: 56000,
    rating: 5.0,
    reviewsCount: 27,
    colorName: 'Emerald Green',
    colorHex: '#046307',
    gradientClass: 'from-[#046307] to-[#012903]',
    fabric: 'Mulberry Heavy Silk',
    size: 'Ready-to-Wear Pre-Draped',
    stockStatus: 'in_stock',
    stockCount: 3,
    origin: 'Kanchipuram',
    weavingHours: 195,
    badge: 'PURE GOLD ZARI'
  }
];

export const ShopPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'ajax' | 'css'>('html');

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'weaving'>('featured');

  // UI Interactive States
  const [wishlist, setWishlist] = useState<string[]>(['s1', 's4']);
  const [cartCount, setCartCount] = useState<number>(2);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<3 | 2 | 1>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAjaxSimulating, setIsAjaxSimulating] = useState<boolean>(false);

  // Available Filter Options
  const categories = ['All', 'Banarasi', 'Kanjeevaram', 'Chanderi', 'Organza', 'Festive'];
  const brands = [
    'All',
    'Varanasi Master Guild',
    'Kanchipuram Heritage Guild',
    'Chanderi Artisan Collective',
    'Royal Heritage Weavers',
    'Jaipur & Varanasi Guild'
  ];
  const colors = [
    { name: 'All', hex: '' },
    { name: 'Royal Crimson', hex: '#800020' },
    { name: 'Peacock Green', hex: '#004B49' },
    { name: 'Sheer Gold', hex: '#D4AF37' },
    { name: 'Imperial Purple', hex: '#4B0082' },
    { name: 'Ruby Red', hex: '#9B111E' },
    { name: 'Emerald Green', hex: '#046307' }
  ];
  const sizes = [
    'All',
    'Standard 5.5m + Unstitched Blouse',
    '6.3m + Pre-Stitched Blouse',
    'Ready-to-Wear Pre-Draped'
  ];

  // AJAX Filter Simulation
  const triggerAjaxFilter = () => {
    setIsAjaxSimulating(true);
    setTimeout(() => {
      setIsAjaxSimulating(false);
    }, 300);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    triggerAjaxFilter();
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
    triggerAjaxFilter();
  };

  const handleColorChange = (colName: string) => {
    setSelectedColor(colName);
    setCurrentPage(1);
    triggerAjaxFilter();
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMaxPrice(60000);
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
    triggerAjaxFilter();
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.fabric.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) return false;
      if (selectedColor !== 'All' && product.colorName !== selectedColor) return false;
      if (selectedSize !== 'All' && product.size !== selectedSize) return false;
      if (product.price > maxPrice) return false;
      if (inStockOnly && product.stockStatus !== 'in_stock') return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'weaving') return b.weavingHours - a.weavingHours;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedColor, selectedSize, maxPrice, inStockOnly, sortBy]);

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    setCartToast(`"${productName}" added to your shopping bag.`);
    setTimeout(() => setCartToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Mode Switcher Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-200 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BALAJI Luxury E-Commerce Module</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Premium Handloom Saree Catalog & Shop Page
          </h2>
          <p className="text-xs text-slate-400">
            Featuring AJAX filtering simulator, faceted search, stock badges, discount tags, and quick view drawer.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
              viewMode === 'preview'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Catalog Preview</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
              viewMode === 'code'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>View AJAX & PHP Code</span>
          </button>
        </div>
      </div>

      {/* Cart Notification Toast */}
      {cartToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{cartToast}</span>
        </div>
      )}

      {/* VIEW MODE 1: LIVE STOREFRONT CATALOG PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Shop Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/50 border border-amber-500/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-xl z-10">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">ROYAL BRIDAL COLLECTION</span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Authentic Handloom Sarees
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Browse 100% Silk Mark certified Banarasi, Kanjeevaram, and Chanderi sarees woven directly by Varanasi & Kanchipuram master artisans.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-xl text-center space-y-1 z-10 shrink-0">
              <span className="text-xs font-mono text-amber-400 block uppercase">CART STATUS</span>
              <span className="text-2xl font-mono font-bold text-white">{cartCount} Items</span>
              <span className="text-[10px] text-slate-400 block">Insured Global Shipping</span>
            </div>
          </div>

          {/* MAIN CATALOG LAYOUT: SIDEBAR FILTERS + PRODUCT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* DESKTOP SIDEBAR FILTERS */}
            <aside className="hidden lg:block bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-amber-400 flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Refine Catalog</span>
                </h3>
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Search Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Search Design</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); triggerAjaxFilter(); }}
                    placeholder="Search saree name or fabric..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Weave Category</label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand / Weaver Guild Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Weaver Guild / Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 uppercase">Max Price</span>
                  <span className="text-amber-400 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="60000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); triggerAjaxFilter(); }}
                  className="w-full accent-amber-500 bg-slate-950 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹15,000</span>
                  <span>₹60,000</span>
                </div>
              </div>

              {/* Color Swatch Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Color Swatch</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => handleColorChange(col.name)}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all flex items-center space-x-1 border ${
                        selectedColor === col.name
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {col.hex && (
                        <span className="w-2.5 h-2.5 rounded-full inline-block border border-white/20" style={{ backgroundColor: col.hex }}></span>
                      )}
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size / Blouse Drape Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Size / Blouse Style</label>
                <select
                  value={selectedSize}
                  onChange={(e) => { setSelectedSize(e.target.value); triggerAjaxFilter(); }}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
                >
                  {sizes.map(sz => (
                    <option key={sz} value={sz}>{sz}</option>
                  ))}
                </select>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">Ready In Stock Only</span>
                <button
                  onClick={() => { setInStockOnly(!inStockOnly); triggerAjaxFilter(); }}
                  className={`w-10 h-5 rounded-full transition-colors relative ${inStockOnly ? 'bg-amber-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full bg-slate-950 absolute top-0.75 transition-transform ${inStockOnly ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
            </aside>

            {/* PRODUCT CATALOG MAIN AREA */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Top Action Bar: Active Tags, Total Count, View Toggle, Sorting */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Result Count & Mobile Filter Button */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter Products</span>
                  </button>

                  <span className="text-xs font-mono text-slate-300">
                    Showing <strong className="text-amber-400">{filteredProducts.length}</strong> Sarees
                    {isAjaxSimulating && <span className="ml-2 text-amber-400 animate-pulse font-bold">(Updating via AJAX...)</span>}
                  </span>
                </div>

                {/* Grid Cols Toggle & Sort Dropdown */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <div className="hidden sm:flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setGridCols(3)}
                      className={`p-1.5 rounded ${gridCols === 3 ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                      title="3 Columns"
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setGridCols(2)}
                      className={`p-1.5 rounded ${gridCols === 2 ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                      title="2 Columns"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value as any); triggerAjaxFilter(); }}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="featured">Featured Weaves</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="weaving">Weaving Hours (Artisanal)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              {(selectedCategory !== 'All' || selectedBrand !== 'All' || selectedColor !== 'All' || searchQuery !== '') && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono">Active Filters:</span>
                  {selectedCategory !== 'All' && (
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <span>Category: {selectedCategory}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                    </span>
                  )}
                  {selectedBrand !== 'All' && (
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <span>Guild: {selectedBrand}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('All')} />
                    </span>
                  )}
                  {selectedColor !== 'All' && (
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <span>Color: {selectedColor}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedColor('All')} />
                    </span>
                  )}
                  <button onClick={resetAllFilters} className="text-amber-400 hover:underline text-xs font-mono ml-2">
                    Clear All
                  </button>
                </div>
              )}

              {/* PRODUCT GRID */}
              {filteredProducts.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h3 className="text-xl font-serif font-bold text-white">No Sarees Matched Your Criteria</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try adjusting your price range or clearing color and category filters.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
                }`}>
                  {filteredProducts.map((product) => {
                    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                    return (
                      <div
                        key={product.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
                      >
                        {/* Image Container with Badges */}
                        <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradientClass} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                          
                          {/* Saree Graphic Simulation */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-amber-200 space-y-2 z-10">
                            <Sparkles className="w-8 h-8 text-amber-400" />
                            <span className="font-serif text-base font-bold">{product.fabric}</span>
                            <span className="text-[10px] font-mono text-amber-400 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                              {product.weavingHours} Hours Loom
                            </span>
                          </div>

                          {/* Top Left Badges: Discount + Stock Badge */}
                          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
                            <span className="bg-amber-500 text-slate-950 font-mono text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-md">
                              -{discountPercent}% OFF
                            </span>

                            {product.stockStatus === 'low_stock' && (
                              <span className="bg-rose-500 text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-md">
                                Only {product.stockCount} Left
                              </span>
                            )}

                            {product.stockStatus === 'pre_order' && (
                              <span className="bg-indigo-600 text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-md">
                                Pre-Order
                              </span>
                            )}
                          </div>

                          {/* Top Right Actions: Wishlist + Quick View */}
                          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                              title="Wishlist"
                            >
                              <Heart className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>

                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                              title="Quick View"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Product Info Block */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                            <span>{product.brand}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold font-mono text-amber-400">₹{product.price.toLocaleString('en-IN')}</span>
                            <span className="text-xs font-mono text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product.name)}
                            className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center space-x-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add To Bag</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PAGINATION CONTROLS */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Page {currentPage} of 3 • 24 Total Designs</span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[1, 2, 3].map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl font-bold transition-all ${
                        currentPage === page ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === 3}
                    onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK VIEW MODAL DRAWER */}
          {quickViewProduct && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${quickViewProduct.gradientClass} flex flex-col items-center justify-center p-6 text-center text-amber-300 relative border border-amber-500/30`}>
                    <Sparkles className="w-12 h-12 text-amber-400 mb-2" />
                    <span className="font-serif text-xl font-bold">{quickViewProduct.fabric}</span>
                    <span className="text-xs font-mono text-amber-400 bg-slate-950/80 px-3 py-1 rounded-full mt-2">
                      {quickViewProduct.weavingHours} Hours Loom Weave
                    </span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                      {quickViewProduct.brand} • {quickViewProduct.origin}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-white">{quickViewProduct.name}</h2>
                    
                    <div className="flex items-baseline space-x-3">
                      <span className="text-2xl font-mono font-bold text-amber-400">₹{quickViewProduct.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm font-mono text-slate-500 line-through">₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <p><strong>Color:</strong> {quickViewProduct.colorName}</p>
                      <p><strong>Drape Option:</strong> {quickViewProduct.size}</p>
                      <p className="flex items-center space-x-1 text-emerald-400 font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Silk Mark Hologram Tag Included</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct.name);
                        setQuickViewProduct(null);
                      }}
                      className="w-full bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                    >
                      Add To Bag Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: SOURCE CODE INSPECTOR (AJAX PHP & VANILLA JS) */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">shop.html / filter-ajax.php / shop.js</h3>
              <p className="text-xs text-slate-400">Pure, zero-framework Vanilla JavaScript AJAX catalog filtering logic.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'html' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                shop.html
              </button>
              <button
                onClick={() => setActiveCodeTab('ajax')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'ajax' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                filter-ajax.php
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'css' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                shop.js
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'html' && `<!-- pages/shop.php or shop.html -->
<div class="shop-container">
  <aside class="sidebar-filters">
    <form id="filterForm">
      <input type="text" id="searchInput" placeholder="Search saree...">
      <select id="categorySelect">
        <option value="All">All Categories</option>
        <option value="Banarasi">Banarasi</option>
        <option value="Kanjeevaram">Kanjeevaram</option>
      </select>
      <input type="range" id="priceRange" min="15000" max="60000" value="60000">
    </form>
  </aside>

  <main id="productGrid" class="product-grid">
    <!-- AJAX Response HTML auto-injected here -->
  </main>
</div>`}

            {activeCodeTab === 'ajax' && `<?php
// api/filter-ajax.php - Server-side prepared statement filter
require_once '../config/database.php';

$category = $_GET['category'] ?? 'All';
$maxPrice = floatval($_GET['max_price'] ?? 60000);
$search = $_GET['search'] ?? '';

$sql = "SELECT * FROM products WHERE price <= :maxPrice";
$params = [':maxPrice' => $maxPrice];

if ($category !== 'All') {
  $sql .= " AND category = :category";
  $params[':category'] = $category;
}

if (!empty($search)) {
  $sql .= " AND (name LIKE :search OR fabric LIKE :search)";
  $params[':search'] = '%' . $search . '%';
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'data' => $products]);
?>`}

            {activeCodeTab === 'css' && `// assets/js/shop.js - Vanilla JS AJAX Filter
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filterForm');
  const productGrid = document.getElementById('productGrid');

  async function fetchFilteredProducts() {
    const category = document.getElementById('categorySelect').value;
    const maxPrice = document.getElementById('priceRange').value;
    const search = document.getElementById('searchInput').value;

    productGrid.style.opacity = '0.5';

    try {
      const res = await fetch(\`/api/filter-ajax.php?category=\${category}&max_price=\${maxPrice}&search=\${search}\`);
      const response = await res.json();
      
      renderProducts(response.data);
    } catch (err) {
      console.error('AJAX Filter Failed:', err);
    } finally {
      productGrid.style.opacity = '1';
    }
  }

  filterForm.addEventListener('change', fetchFilteredProducts);
});`}
          </pre>
        </div>
      )}
    </div>
  );
};
