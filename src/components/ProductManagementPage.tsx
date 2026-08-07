import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Plus, Edit3, Trash2, Search, Filter, Eye, CheckCircle2, 
  AlertTriangle, X, Check, Image as ImageIcon, Upload, Tag, DollarSign, 
  Layers, Package, Star, ArrowUpDown, Globe, SlidersHorizontal, RefreshCw, 
  Code, Database, Server, Flame, ShieldCheck, Copy, ChevronRight, FileText,
  Grid, List, AlertCircle, HardDrive, CheckSquare, ExternalLink
} from 'lucide-react';

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  category: 'Bridal' | 'Royal Weaves' | 'Looms' | 'Exhibitions' | 'Celebrity';
  brand: 'Balaji Master Guild' | 'Kashi Heritage Atelier' | 'Kanchipuram Silk Trust' | 'Chanderi Weaver Co-op';
  price: number;
  originalPrice?: number;
  stock: number;
  lowStockThreshold: number;
  isFeatured: boolean;
  isTrending: boolean;
  colors: string[];
  sizes: string[];
  images: string[];
  primaryImageIndex: number;
  description: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoKeywords: string;
  createdAt: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    sku: 'SKU-KADWA-001',
    slug: 'crimson-kadwa-imperial-saree',
    title: 'Crimson Kadwa Imperial Saree',
    category: 'Bridal',
    brand: 'Balaji Master Guild',
    price: 185000,
    originalPrice: 210000,
    stock: 2,
    lowStockThreshold: 3,
    isFeatured: true,
    isTrending: true,
    colors: ['Crimson Red', '24k Gold', 'Midnight Maroon'],
    sizes: ['Standard 5.5m + Blouse', 'Extended 6.3m'],
    images: [
      'from-[#800020] via-[#4A0012] to-black',
      'from-[#9B111E] via-[#4D080F] to-black',
      'from-[#D4AF37]/80 via-[#7A6115] to-black'
    ],
    primaryImageIndex: 0,
    description: 'Master artisan handloom Saree featuring 24k gold zari Kadwa floral weave across pure Katan silk.',
    seoMetaTitle: 'Buy Crimson Kadwa Imperial Pure Gold Zari Saree | Balaji Handlooms',
    seoMetaDescription: 'Authentic Banarasi Crimson Kadwa saree woven with 24k electroplated silver-gold wire. Silk Mark India certified.',
    seoKeywords: 'Kadwa Saree, Banarasi Bridal, 24k Gold Zari, Katan Silk',
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-102',
    sku: 'SKU-KANJEE-002',
    slug: 'kanchipuram-gold-temple-border',
    title: 'Kanchipuram Gold Temple Border Saree',
    category: 'Royal Weaves',
    brand: 'Kanchipuram Silk Trust',
    price: 145000,
    stock: 12,
    lowStockThreshold: 4,
    isFeatured: true,
    isTrending: false,
    colors: ['Emerald Green', 'Deep Bronze Gold', 'Teal Blue'],
    sizes: ['Standard 5.5m + Blouse'],
    images: [
      'from-[#004B49] via-[#002827] to-black',
      'from-[#046307] via-[#012903] to-black'
    ],
    primaryImageIndex: 0,
    description: 'Traditional Korvai interlocked double-warp silk saree with heavy temple borders.',
    seoMetaTitle: 'Pure Kanchipuram Temple Border Silk Saree | Balaji Guild',
    seoMetaDescription: 'Handwoven Kanchipuram silk saree with interlocking Korvai technique and pure silver-gold zari pallu.',
    seoKeywords: 'Kanjeevaram Saree, Korvai Weave, Temple Border, Emerald Silk',
    createdAt: '2026-08-02'
  },
  {
    id: 'prod-103',
    sku: 'SKU-CHAND-003',
    slug: 'chanderi-gold-tissue-sheer-drape',
    title: 'Chanderi Gold Tissue Sheer Drape',
    category: 'Exhibitions',
    brand: 'Chanderi Weaver Co-op',
    price: 95000,
    originalPrice: 110000,
    stock: 8,
    lowStockThreshold: 2,
    isFeatured: false,
    isTrending: true,
    colors: ['Champagne Gold', 'Rose Tint', 'Metallic Copper'],
    sizes: ['Standard 5.5m + Blouse'],
    images: [
      'from-[#D4AF37]/80 via-[#7A6115] to-black',
      'from-[#C41E3A] via-[#630F1D] to-black'
    ],
    primaryImageIndex: 0,
    description: 'Gossamer light silk tissue woven with gold metallic shuttles for ethereal evening galas.',
    seoMetaTitle: 'Chanderi Gold Tissue Sheer Saree | Handloom Atelier',
    seoMetaDescription: 'Lightweight metallic Chanderi tissue silk saree perfect for grand wedding receptions.',
    seoKeywords: 'Chanderi Tissue, Metallic Gold Saree, Sheer Drape',
    createdAt: '2026-08-03'
  },
  {
    id: 'prod-104',
    sku: 'SKU-SHIKAR-004',
    slug: 'shikargah-brocade-hunting-scene',
    title: 'Shikargah Brocade Hunting Scene Weave',
    category: 'Looms',
    brand: 'Kashi Heritage Atelier',
    price: 220000,
    stock: 0,
    lowStockThreshold: 2,
    isFeatured: true,
    isTrending: true,
    colors: ['Royal Violet', 'Antique Gold', 'Onyx Black'],
    sizes: ['Standard 5.5m + Blouse', 'Extended 6.3m'],
    images: [
      'from-[#4B0082] via-[#21003B] to-black',
      'from-[#1A1A1A] via-black to-[#0D0D0D]'
    ],
    primaryImageIndex: 0,
    description: 'Historical Shikargah animal and flora brocade taking over 210 master loom hours.',
    seoMetaTitle: 'Banarasi Shikargah Brocade Saree | Collector Archive',
    seoMetaDescription: 'Intricate Shikargah brocade saree featuring animal motifs in antique gold zari.',
    seoKeywords: 'Shikargah Brocade, Banarasi Heritage, Antique Zari',
    createdAt: '2026-08-04'
  }
];

export const ProductManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'api' | 'sql' | 'js'>('api');

  // Products Master State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Search, Filters & Display Controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [stockStatusFilter, setStockStatusFilter] = useState<string>('All');
  const [flagFilter, setFlagFilter] = useState<string>('All');
  const [displayLayout, setDisplayLayout] = useState<'table' | 'grid'>('table');

  // Modal States (Add / Edit / Delete)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt'>>({
    sku: '',
    slug: '',
    title: '',
    category: 'Bridal',
    brand: 'Balaji Master Guild',
    price: 85000,
    originalPrice: 95000,
    stock: 10,
    lowStockThreshold: 3,
    isFeatured: false,
    isTrending: false,
    colors: ['Crimson Red', '24k Gold'],
    sizes: ['Standard 5.5m + Blouse'],
    images: ['from-[#800020] via-[#4A0012] to-black'],
    primaryImageIndex: 0,
    description: '',
    seoMetaTitle: '',
    seoMetaDescription: '',
    seoKeywords: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'variants' | 'inventory' | 'images' | 'seo'>('basic');

  // Pre-defined options
  const categoryOptions = ['Bridal', 'Royal Weaves', 'Looms', 'Exhibitions', 'Celebrity'];
  const brandOptions = ['Balaji Master Guild', 'Kashi Heritage Atelier', 'Kanchipuram Silk Trust', 'Chanderi Weaver Co-op'];
  const availableColors = ['Crimson Red', 'Emerald Green', '24k Gold', 'Midnight Maroon', 'Royal Violet', 'Champagne Gold', 'Onyx Black', 'Teal Blue'];
  const availableSizes = ['Standard 5.5m + Blouse', 'Extended 6.3m', 'Ready-to-wear S', 'Ready-to-wear M', 'Ready-to-wear L'];
  const imageGradientPresets = [
    { name: 'Crimson Royal', val: 'from-[#800020] via-[#4A0012] to-black' },
    { name: 'Emerald Velvet', val: 'from-[#004B49] via-[#002827] to-black' },
    { name: 'Champagne Shimmer', val: 'from-[#D4AF37]/80 via-[#7A6115] to-black' },
    { name: 'Violet Shikargah', val: 'from-[#4B0082] via-[#21003B] to-black' },
    { name: 'Midnight Onyx', val: 'from-[#1A1A1A] via-black to-[#0D0D0D]' }
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Slug generator helper
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (newTitle: string) => {
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
      seoMetaTitle: `Buy ${newTitle} | Balaji Luxury Handloom Atelier`
    }));
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
      
      if (stockStatusFilter === 'In Stock' && p.stock <= p.lowStockThreshold) return false;
      if (stockStatusFilter === 'Low Stock' && (p.stock > p.lowStockThreshold || p.stock === 0)) return false;
      if (stockStatusFilter === 'Out of Stock' && p.stock > 0) return false;

      if (flagFilter === 'Featured' && !p.isFeatured) return false;
      if (flagFilter === 'Trending' && !p.isTrending) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchSlug = p.slug.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchSlug) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedBrand, stockStatusFilter, flagFilter, searchQuery]);

  // Total Inventory Value
  const totalInventoryValue = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  }, [products]);

  // Open Modal for Create or Edit
  const openModalForCreate = () => {
    setEditingProductId(null);
    setFormData({
      sku: `SKU-BALAJI-${Math.floor(100 + Math.random() * 900)}`,
      slug: '',
      title: '',
      category: 'Bridal',
      brand: 'Balaji Master Guild',
      price: 125000,
      originalPrice: 140000,
      stock: 8,
      lowStockThreshold: 3,
      isFeatured: false,
      isTrending: true,
      colors: ['Crimson Red', '24k Gold'],
      sizes: ['Standard 5.5m + Blouse'],
      images: ['from-[#800020] via-[#4A0012] to-black'],
      primaryImageIndex: 0,
      description: '',
      seoMetaTitle: '',
      seoMetaDescription: '',
      seoKeywords: ''
    });
    setFormErrors({});
    setActiveFormTab('basic');
    setIsModalOpen(true);
  };

  const openModalForEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      sku: product.sku,
      slug: product.slug,
      title: product.title,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      isFeatured: product.isFeatured,
      isTrending: product.isTrending,
      colors: [...product.colors],
      sizes: [...product.sizes],
      images: [...product.images],
      primaryImageIndex: product.primaryImageIndex,
      description: product.description,
      seoMetaTitle: product.seoMetaTitle,
      seoMetaDescription: product.seoMetaDescription,
      seoKeywords: product.seoKeywords
    });
    setFormErrors({});
    setActiveFormTab('basic');
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Product title is required';
    if (!formData.sku.trim()) errors.sku = 'SKU code is required';
    if (!formData.slug.trim()) errors.slug = 'URL Slug is required';
    if (formData.price <= 0) errors.price = 'Price must be greater than 0';
    if (formData.stock < 0) errors.stock = 'Stock cannot be negative';
    if (formData.images.length === 0) errors.images = 'At least 1 product image is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct validation errors');
      return;
    }

    if (editingProductId) {
      // Update existing
      setProducts(products.map(p => p.id === editingProductId ? {
        ...p,
        ...formData
      } : p));
      showToast(`Product "${formData.title}" updated successfully`);
    } else {
      // Add new product
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().substring(0, 10)
      };
      setProducts([newProduct, ...products]);
      showToast(`New Product "${formData.title}" created successfully`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deletingProductId) return;
    const target = products.find(p => p.id === deletingProductId);
    setProducts(products.filter(p => p.id !== deletingProductId));
    showToast(`Product "${target?.title || deletingProductId}" deleted from inventory`);
    setDeletingProductId(null);
  };

  const toggleProductFlag = (id: string, flag: 'isFeatured' | 'isTrending') => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newVal = !p[flag];
        showToast(`Toggled ${flag === 'isFeatured' ? 'Featured' : 'Trending'} to ${newVal ? 'ON' : 'OFF'}`);
        return { ...p, [flag]: newVal };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header Mode Switcher Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-200 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BALAJI E-Commerce Admin System</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Product Management Module (CRUD, SEO, Images & AJAX)
          </h2>
          <p className="text-xs text-slate-400">
            Full-featured catalog editor with multi-image selector, inventory thresholds, search, filters, and REST API inspector.
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
            <Package className="w-3.5 h-3.5" />
            <span>Product Manager</span>
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
            <span>View REST API & SQL</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* VIEW MODE 1: LIVE PRODUCT MANAGER */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Header Metric Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">TOTAL CATALOG ITEMS</span>
              <span className="text-2xl font-serif font-bold text-white">{products.length} Products</span>
              <span className="text-[10px] text-emerald-400 block font-mono">Active Handloom SKUs</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">INVENTORY VALUE</span>
              <span className="text-2xl font-serif font-bold text-amber-400">₹{totalInventoryValue.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Stocked in Atelier Guild</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">LOW STOCK ALERTS</span>
              <span className="text-2xl font-serif font-bold text-rose-400">
                {products.filter(p => p.stock <= p.lowStockThreshold).length} SKUs
              </span>
              <span className="text-[10px] text-rose-400/80 block font-mono">Requires Loom Re-order</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">FEATURED & TRENDING</span>
              <span className="text-2xl font-serif font-bold text-emerald-400">
                {products.filter(p => p.isFeatured || p.isTrending).length} Highlighted
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">Displayed on Homepage</span>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS TOOLBAR */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-white">Products Inventory Directory</h2>
                <p className="text-xs text-slate-400">Filter by category, brand, stock level, or search SKU / Slug.</p>
              </div>

              <div className="flex items-center space-x-3">
                {/* Layout View Switcher */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setDisplayLayout('table')}
                    className={`p-2 rounded-lg transition-colors ${
                      displayLayout === 'table' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDisplayLayout('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      displayLayout === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Grid Card View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add Product Button */}
                <button
                  onClick={openModalForCreate}
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-800">
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, SKU, slug..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Categories</option>
                {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Artisan Brands</option>
                {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>

              {/* Stock Level Filter */}
              <select
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Stock Levels</option>
                <option value="In Stock">In Stock (&gt;3)</option>
                <option value="Low Stock">Low Stock (1-3)</option>
                <option value="Out of Stock">Out of Stock (0)</option>
              </select>

              {/* Flag Filter */}
              <select
                value={flagFilter}
                onChange={(e) => setFlagFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Status Badges</option>
                <option value="Featured">Featured Only</option>
                <option value="Trending">Trending Only</option>
              </select>
            </div>
          </div>

          {/* TABLE DISPLAY MODE */}
          {displayLayout === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-amber-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Preview</th>
                      <th className="p-4">Title & Slug</th>
                      <th className="p-4">SKU & Brand</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProducts.map((p) => {
                      const isLowStock = p.stock <= p.lowStockThreshold && p.stock > 0;
                      const isOutOfStock = p.stock === 0;

                      return (
                        <tr key={p.id} className="hover:bg-slate-950/60 transition-colors">
                          {/* Image Thumbnail */}
                          <td className="p-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.images[0] || 'from-slate-800 to-black'} border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-md shrink-0`}>
                              <ImageIcon className="w-5 h-5 opacity-80" />
                            </div>
                          </td>

                          {/* Title & Slug */}
                          <td className="p-4 space-y-0.5">
                            <strong className="text-white font-serif text-sm block">{p.title}</strong>
                            <span className="text-[10px] text-slate-400 block font-mono">/{p.slug}</span>
                          </td>

                          {/* SKU & Brand */}
                          <td className="p-4 space-y-0.5">
                            <span className="text-amber-400 font-bold block">{p.sku}</span>
                            <span className="text-slate-400 text-[10px] block">{p.brand}</span>
                          </td>

                          {/* Category */}
                          <td className="p-4 text-slate-300">{p.category}</td>

                          {/* Price */}
                          <td className="p-4 space-y-0.5">
                            <span className="text-white font-bold block text-sm">₹{p.price.toLocaleString('en-IN')}</span>
                            {p.originalPrice && (
                              <span className="text-slate-500 line-through text-[10px] block">
                                ₹{p.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </td>

                          {/* Stock Status */}
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              isOutOfStock ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                              isLowStock ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {p.stock} units {isOutOfStock ? '(Out)' : isLowStock ? '(Low)' : ''}
                            </span>
                          </td>

                          {/* Featured / Trending Flags */}
                          <td className="p-4 space-x-1">
                            <button
                              onClick={() => toggleProductFlag(p.id, 'isFeatured')}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                                p.isFeatured ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-500 border border-slate-800'
                              }`}
                            >
                              Featured
                            </button>
                            <button
                              onClick={() => toggleProductFlag(p.id, 'isTrending')}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                                p.isTrending ? 'bg-purple-500 text-white' : 'bg-slate-950 text-slate-500 border border-slate-800'
                              }`}
                            >
                              Trending
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openModalForEdit(p)}
                              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 hover:border-amber-400 transition-all"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingProductId(p.id)}
                              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 hover:border-rose-400 transition-all"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GRID DISPLAY MODE */}
          {displayLayout === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Simulated Image Box */}
                    <div className={`aspect-[16/10] rounded-xl bg-gradient-to-br ${p.images[0] || 'from-slate-800 to-black'} p-4 relative flex flex-col justify-between`}>
                      <div className="flex justify-between items-start">
                        <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          {p.category}
                        </span>
                        <span className="bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                          {p.stock} in stock
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded">{p.sku}</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base text-white">{p.title}</h3>
                    <p className="text-xs text-slate-400 font-sans line-clamp-2">{p.description}</p>
                    
                    <div className="flex items-center justify-between text-xs font-mono border-t border-slate-800/80 pt-3">
                      <span className="text-amber-400 font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400">{p.brand}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <div className="flex space-x-1">
                      {p.isFeatured && <span className="bg-amber-500/20 text-amber-300 text-[9px] font-mono px-2 py-0.5 rounded">Featured</span>}
                      {p.isTrending && <span className="bg-purple-500/20 text-purple-300 text-[9px] font-mono px-2 py-0.5 rounded">Trending</span>}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModalForEdit(p)}
                        className="bg-slate-950 border border-slate-800 text-amber-400 px-3 py-1 rounded text-xs font-bold hover:border-amber-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingProductId(p.id)}
                        className="bg-slate-950 border border-slate-800 text-rose-400 px-2.5 py-1 rounded text-xs font-bold hover:border-rose-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* COMPREHENSIVE ADD / EDIT PRODUCT MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">PRODUCT EDITOR FORM</span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {editingProductId ? 'Edit Product Catalog Item' : 'Create New Handloom SKU'}
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Section Navigation Tabs */}
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
                  {[
                    { id: 'basic', label: 'Basic Info' },
                    { id: 'variants', label: 'Colors & Sizes' },
                    { id: 'inventory', label: 'Inventory & Badges' },
                    { id: 'images', label: 'Multi-Images' },
                    { id: 'seo', label: 'SEO Metadata' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFormTab(tab.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                        activeFormTab === tab.id
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* TAB 1: BASIC INFORMATION */}
                  {activeFormTab === 'basic' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 uppercase block">Product Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="e.g. Crimson Kadwa Imperial Saree"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                        {formErrors.title && <span className="text-[10px] text-rose-400 block font-mono">{formErrors.title}</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">SKU Code *</label>
                          <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            placeholder="e.g. SKU-KADWA-001"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                          />
                          {formErrors.sku && <span className="text-[10px] text-rose-400 block font-mono">{formErrors.sku}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">URL Slug *</label>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="e.g. crimson-kadwa-imperial-saree"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                          />
                          {formErrors.slug && <span className="text-[10px] text-rose-400 block font-mono">{formErrors.slug}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Category</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                          >
                            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Artisan Brand</label>
                          <select
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value as any })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                          >
                            {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Price (₹) *</label>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                          />
                          {formErrors.price && <span className="text-[10px] text-rose-400 block font-mono">{formErrors.price}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Original MRP Price (₹)</label>
                          <input
                            type="number"
                            value={formData.originalPrice || ''}
                            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 uppercase block">Description</label>
                        <textarea
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Detailed weaving specs, silk composition, pallu motif details..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: VARIANTS (COLORS & SIZES) */}
                  {activeFormTab === 'variants' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-300 uppercase block">Available Color Variants</label>
                        <div className="flex flex-wrap gap-2">
                          {availableColors.map(color => {
                            const selected = formData.colors.includes(color);
                            return (
                              <button
                                type="button"
                                key={color}
                                onClick={() => {
                                  if (selected) {
                                    setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
                                  } else {
                                    setFormData({ ...formData, colors: [...formData.colors, color] });
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                                  selected ? 'bg-amber-500 text-slate-950 font-bold border-amber-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                                }`}
                              >
                                {color}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-slate-800 pt-4">
                        <label className="text-xs font-mono text-slate-300 uppercase block">Available Draping Sizes</label>
                        <div className="flex flex-wrap gap-2">
                          {availableSizes.map(size => {
                            const selected = formData.sizes.includes(size);
                            return (
                              <button
                                type="button"
                                key={size}
                                onClick={() => {
                                  if (selected) {
                                    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
                                  } else {
                                    setFormData({ ...formData, sizes: [...formData.sizes, size] });
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                                  selected ? 'bg-amber-500 text-slate-950 font-bold border-amber-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: INVENTORY & BADGES */}
                  {activeFormTab === 'inventory' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Stock Quantity *</label>
                          <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 uppercase block">Low Stock Alert Threshold</label>
                          <input
                            type="number"
                            value={formData.lowStockThreshold}
                            onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                        <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 accent-amber-500"
                          />
                          <div>
                            <strong className="text-white text-xs block">Featured Saree</strong>
                            <span className="text-[10px] text-slate-400 block">Highlight on Atelier Homepage Hero</span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isTrending}
                            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                            className="w-4 h-4 accent-amber-500"
                          />
                          <div>
                            <strong className="text-white text-xs block font-serif">Trending Saree</strong>
                            <span className="text-[10px] text-slate-400 block">Show in Best-Sellers Gallery</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MULTI-IMAGE MANAGEMENT */}
                  {activeFormTab === 'images' && (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-xs font-mono text-slate-300 uppercase block">Select Preset Texture Gradients</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {imageGradientPresets.map(preset => (
                          <button
                            type="button"
                            key={preset.name}
                            onClick={() => {
                              if (!formData.images.includes(preset.val)) {
                                setFormData({ ...formData, images: [...formData.images, preset.val] });
                              }
                            }}
                            className={`p-3 rounded-xl border bg-gradient-to-br ${preset.val} text-left space-y-1 transition-transform hover:scale-105`}
                          >
                            <span className="text-[10px] font-mono text-amber-300 font-bold block">{preset.name}</span>
                            <span className="text-[9px] text-slate-300 block">Click to add to gallery</span>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2 border-t border-slate-800 pt-4">
                        <span className="text-xs font-mono text-slate-300 uppercase block">Selected Product Image Gallery ({formData.images.length})</span>
                        <div className="flex flex-wrap gap-3">
                          {formData.images.map((imgGradient, idx) => (
                            <div key={idx} className={`w-20 h-20 rounded-xl bg-gradient-to-br ${imgGradient} border-2 relative flex flex-col justify-between p-2 shadow-lg ${
                              formData.primaryImageIndex === idx ? 'border-amber-400' : 'border-slate-800'
                            }`}>
                              {formData.primaryImageIndex === idx && (
                                <span className="bg-amber-400 text-slate-950 font-bold text-[8px] px-1 rounded uppercase">Primary</span>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formData.images.filter((_, i) => i !== idx);
                                  setFormData({ ...formData, images: updated, primaryImageIndex: 0 });
                                }}
                                className="absolute top-1 right-1 bg-slate-950 text-rose-400 p-0.5 rounded-full"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: SEO METADATA */}
                  {activeFormTab === 'seo' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 uppercase block">SEO Meta Title</label>
                        <input
                          type="text"
                          value={formData.seoMetaTitle}
                          onChange={(e) => setFormData({ ...formData, seoMetaTitle: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 uppercase block">SEO Meta Description</label>
                        <textarea
                          rows={2}
                          value={formData.seoMetaDescription}
                          onChange={(e) => setFormData({ ...formData, seoMetaDescription: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                        ></textarea>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 uppercase block">Focus SEO Keywords</label>
                        <input
                          type="text"
                          value={formData.seoKeywords}
                          onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                          placeholder="e.g. Banarasi, Kadwa, 24k Zari"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Actions */}
                  <div className="flex items-center justify-end space-x-3 border-t border-slate-800 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md"
                    >
                      {editingProductId ? 'Update Product' : 'Save & Publish Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {deletingProductId && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-rose-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center space-x-3 text-rose-400">
                  <AlertTriangle className="w-8 h-8 shrink-0" />
                  <h3 className="text-lg font-serif font-bold text-white">Confirm Product Deletion</h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Are you sure you want to delete product SKU <strong className="text-amber-400 font-mono">{deletingProductId}</strong>? This will purge its catalog listing and associated inventory logs.
                </p>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setDeletingProductId(null)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                  >
                    Yes, Delete Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: REST API & SQL CODE INSPECTOR */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">api/products.php / schema.sql / products-ajax.js</h3>
              <p className="text-xs text-slate-400">Backend REST CRUD endpoints, database schema, and asynchronous AJAX fetch logic.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('api')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'api' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                api/products.php
              </button>
              <button
                onClick={() => setActiveCodeTab('sql')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'sql' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                schema.sql
              </button>
              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'js' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                products-ajax.js
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'api' && `<?php
// api/products.php - REST API CRUD Controller
header('Content-Type: application/json');
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'success', 'data' => $products]);
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO products (sku, slug, title, category, brand, price, stock, is_featured, is_trending) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data['sku'], $data['slug'], $data['title'], $data['category'], $data['brand'], $data['price'], $data['stock'], $data['isFeatured'], $data['isTrending']]);
    echo json_encode(['status' => 'created', 'id' => $pdo->lastInsertId()]);
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE products SET title=?, price=?, stock=? WHERE sku=?");
    $stmt->execute([$data['title'], $data['price'], $data['stock'], $data['sku']]);
    echo json_encode(['status' => 'updated']);
    break;

  case 'DELETE':
    $sku = $_GET['sku'];
    $stmt = $pdo->prepare("DELETE FROM products WHERE sku=?");
    $stmt->execute([$sku]);
    echo json_encode(['status' => 'deleted']);
    break;
}
?>`}

            {activeCodeTab === 'sql' && `-- migrations/products_table.sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  stock INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 3,
  is_featured TINYINT(1) DEFAULT 0,
  is_trending TINYINT(1) DEFAULT 0,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}

            {activeCodeTab === 'js' && `// assets/js/products-ajax.js - Asynchronous Fetch Wrapper
async function fetchProducts() {
  const response = await fetch('/api/products.php');
  const result = await response.json();
  return result.data;
}

async function saveProduct(productData) {
  const method = productData.id ? 'PUT' : 'POST';
  const response = await fetch('/api/products.php', {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  return await response.json();
}

async function deleteProduct(sku) {
  const response = await fetch(\`/api/products.php?sku=\${sku}\`, { method: 'DELETE' });
  return await response.json();
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
