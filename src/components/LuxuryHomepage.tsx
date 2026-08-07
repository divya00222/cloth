import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Heart, Search, Star, Sparkles, ChevronRight, ArrowRight,
  ShieldCheck, Truck, Clock, Award, CheckCircle2, MapPin, Phone, Mail,
  Instagram, Facebook, X, Menu, RefreshCw, Send, Gift, Eye, Zap,
  SlidersHorizontal, Check, ExternalLink, MessageSquare, Code, FileText,
  Building, Compass, Play
} from 'lucide-react';

// Sample product dataset for Homepage
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  weavingHours: number;
  imageColor: string;
  badge?: string;
  fabric: string;
  origin: string;
  isBestseller?: boolean;
  isTrending?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ketan Gold Zari Imperial Banarasi Saree',
    category: 'Banarasi',
    price: 32500,
    originalPrice: 38000,
    rating: 5.0,
    reviewsCount: 48,
    weavingHours: 140,
    imageColor: 'from-[#800020] to-[#4A0012]', // Royal Crimson Red
    badge: 'ROYAL BRIDAL',
    fabric: 'Pure Katan Silk',
    origin: 'Varanasi',
    isBestseller: true,
    isTrending: true
  },
  {
    id: 'p2',
    name: 'Kanjeevaram Temple Border Pure Gold Saree',
    category: 'Kanjeevaram',
    price: 45000,
    originalPrice: 52000,
    rating: 4.9,
    reviewsCount: 62,
    weavingHours: 180,
    imageColor: 'from-[#004B49] to-[#002B2A]', // Peacock Green
    badge: 'SILK MARK CERTIFIED',
    fabric: 'Mulberry Mulberry Silk',
    origin: 'Kanchipuram',
    isBestseller: true,
    isTrending: false
  },
  {
    id: 'p3',
    name: 'Chanderi Gold Tissue Light Weave Saree',
    category: 'Chanderi',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 29,
    weavingHours: 90,
    imageColor: 'from-[#D4AF37]/80 to-[#8C6D1F]', // Sheer Gold
    badge: 'FESTIVE EDIT',
    fabric: 'Silk Tissue',
    origin: 'Chanderi',
    isBestseller: false,
    isTrending: true
  },
  {
    id: 'p4',
    name: 'Shikargah Handloom Brocade Masterpiece',
    category: 'Banarasi',
    price: 58000,
    originalPrice: 65000,
    rating: 5.0,
    reviewsCount: 34,
    weavingHours: 210,
    imageColor: 'from-[#4B0082] to-[#240046]', // Royal Purple
    badge: 'LIMITED ARTISAN',
    fabric: 'Pure Katan Silk',
    origin: 'Varanasi',
    isBestseller: true,
    isTrending: true
  },
  {
    id: 'p5',
    name: 'Organza Cutwork Hand Embroidered Floral Saree',
    category: 'Organza',
    price: 24000,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 41,
    weavingHours: 110,
    imageColor: 'from-[#9B111E] to-[#5C0A12]', // Ruby Rose
    badge: 'CELEBRITY CHOICE',
    fabric: 'Pure Silk Organza',
    origin: 'Varanasi',
    isBestseller: false,
    isTrending: true
  },
  {
    id: 'p6',
    name: 'Bandhani Georgette Silver-Gold Kadwa Saree',
    category: 'Festive',
    price: 29500,
    originalPrice: 34000,
    rating: 4.9,
    reviewsCount: 38,
    weavingHours: 130,
    imageColor: 'from-[#C41E3A] to-[#7A1324]', // Bright Vermilion
    badge: 'BRIDAL TROUSSEAU',
    fabric: 'Pure Georgette Silk',
    origin: 'Jaipur & Varanasi',
    isBestseller: true,
    isTrending: false
  }
];

export const LuxuryHomepage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeTrendingTab, setActiveTrendingTab] = useState<'trending' | 'bestsellers' | 'new'>('trending');
  
  // Interactive UI state
  const [wishlist, setWishlist] = useState<string[]>(['p1', 'p4']);
  const [cartCount, setCartCount] = useState<number>(2);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  const [cartToast, setCartToast] = useState<string | null>(null);

  // Countdown timer for Festive Offer Banner
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 38, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 5000);
      setNewsletterEmail('');
    }
  };

  // Filtered product dataset
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategoryFilter !== 'All' && p.category !== activeCategoryFilter) return false;
    if (activeTrendingTab === 'bestsellers' && !p.isBestseller) return false;
    if (activeTrendingTab === 'trending' && !p.isTrending) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Mode Switcher Bar (Live Homepage Preview vs. Clean Source Code) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BALAJI Single-Page Luxury Homepage Module</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            100% Dedicated Storefront Homepage
          </h2>
          <p className="text-xs text-slate-400">
            Featuring 15 luxury components strictly adhering to your high-fashion design guidelines.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
              viewMode === 'preview'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Store Preview</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
              viewMode === 'code'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Source Code (HTML/CSS/JS)</span>
          </button>
        </div>
      </div>

      {/* Cart Toast Notification */}
      {cartToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{cartToast}</span>
        </div>
      )}

      {/* VIEW MODE 1: LIVE LUXURY HOMEPAGE PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
          
          {/* 1. PREMIUM NAVIGATION HEADER */}
          <header className="sticky top-0 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-b border-amber-500/20">
            {/* Top Marquee Announcement Bar */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-1.5 px-4 text-center text-[11px] font-bold uppercase tracking-widest overflow-hidden">
              <span className="inline-block animate-pulse">
                ✨ ROYAL FESTIVE COLLECTION 2026 • COMPLIMENTARY INSURED EXPRESS WORLDWIDE SHIPPING ON ORDERS OVER ₹10,000 • CODE: ROYAL2026 ✨
              </span>
            </div>

            {/* Brand Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
              {/* Brand Monogram & Name */}
              <a href="#home" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-serif font-black flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  B
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-widest text-amber-400 block leading-none">
                    BALAJI
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase block mt-0.5">
                    VARANASI • KANCHIPURAM
                  </span>
                </div>
              </a>

              {/* Mega Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
                <a href="#featured" className="text-amber-400 border-b-2 border-amber-400 pb-0.5">Banarasi Silk</a>
                <a href="#categories" className="text-slate-300 hover:text-amber-400 transition-colors">Kanjeevaram</a>
                <a href="#bestsellers" className="text-slate-300 hover:text-amber-400 transition-colors">Bridal Lehengas</a>
                <a href="#why-us" className="text-slate-300 hover:text-amber-400 transition-colors">Heritage Craft</a>
                <a href="#location" className="text-slate-300 hover:text-amber-400 transition-colors">Our Showrooms</a>
              </nav>

              {/* Action Icons (Search, Wishlist, Bag, Concierge) */}
              <div className="flex items-center space-x-3 text-xs">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center space-x-1"
                  title="Search Sarees"
                >
                  <Search className="w-4 h-4" />
                  <kbd className="hidden sm:inline-block text-[9px] font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-300">⌘K</kbd>
                </button>

                <a
                  href="#wishlist"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all relative"
                >
                  <Heart className="w-4 h-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </a>

                <button
                  className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold flex items-center space-x-2 px-3.5 shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold">Bag ({cartCount})</span>
                </button>
              </div>
            </div>
          </header>

          {/* Search Overlay Drawer Modal */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-start justify-center pt-20 px-4">
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 w-full max-w-2xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-serif text-lg font-bold text-amber-400 flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Search BALAJI Saree Collection</span>
                  </h3>
                  <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Katan Silk, Kadwa Zari, Bandhani, Organza..."
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-400 font-mono">Popular Searches:</span>
                  {['Banarasi Kadwa', 'Kanjeevaram Bridal', 'Chanderi Gold', 'Red Silk Trousseau'].map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchQuery(tag)}
                      className="bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full text-xs hover:bg-amber-500 hover:text-slate-950 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. LUXURY HERO SECTION */}
          <section id="home" className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/50 px-4 sm:px-6 lg:px-8 py-16 overflow-hidden border-b border-amber-500/20">
            {/* Atmospheric Background Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-crimson-800/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>HANDLOOM WEAVING HERITAGE SINCE 1994</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                Imperial Gold Silk <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
                  Woven For Royalty
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
                Handcrafted over 150 hours per loom by Varanasi & Kanchipuram master artisans using 100% pure silk and tested gold zari threads.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="#featured"
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest flex items-center space-x-2"
                >
                  <span>Explore Festive Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#bestsellers"
                  className="bg-slate-900/80 border-2 border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold px-8 py-4 rounded-xl transition-all text-xs uppercase tracking-widest"
                >
                  Book Virtual Video Call
                </a>
              </div>

              {/* Trust Micro Indicators */}
              <div className="pt-8 border-t border-amber-500/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-amber-400 font-bold block text-sm">100% PURE</span>
                  <span className="text-slate-400">Silk Mark Certified</span>
                </div>
                <div className="space-y-1">
                  <span className="text-amber-400 font-bold block text-sm">DIRECT LOOM</span>
                  <span className="text-slate-400">Zero Middlemen</span>
                </div>
                <div className="space-y-1">
                  <span className="text-amber-400 font-bold block text-sm">CUSTOM FIT</span>
                  <span className="text-slate-400">Stitching Included</span>
                </div>
                <div className="space-y-1">
                  <span className="text-amber-400 font-bold block text-sm">INSURED SHIP</span>
                  <span className="text-slate-400">Global Courier</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FEATURED COLLECTION */}
          <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-500/20 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">CURATED HERITAGE WEAVES</span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">Featured Masterpiece Collections</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Each saree includes an official Silk Mark India certification tag and direct weaver provenance card.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.imageColor} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                    
                    {/* Decorative Saree Graphic Centerpiece */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-amber-300 space-y-3 z-10">
                      <div className="w-20 h-20 rounded-full border-2 border-amber-400/40 bg-slate-950/60 flex items-center justify-center p-3 shadow-2xl">
                        <Sparkles className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
                      </div>
                      <span className="font-serif text-lg font-bold text-amber-200">{product.fabric}</span>
                      <span className="text-xs font-mono text-amber-400/80 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                        {product.weavingHours} Hours Handloom Weave
                      </span>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    </div>

                    {/* Wishlist Toggle */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                      <span>{product.origin} Weave</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating} ({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline space-x-3 pt-1">
                      <span className="text-xl font-bold font-mono text-amber-400">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-mono text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. CATEGORIES GRID */}
          <section id="categories" className="bg-slate-950 border-y border-amber-500/20 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">SHOP BY WEAVE & REGION</span>
                <h2 className="text-3xl font-serif font-bold text-white">Explore Ethnic Taxonomy</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Banarasi Sarees', items: '180+ Designs', color: 'from-[#800020] to-black' },
                  { name: 'Kanjeevaram Silk', items: '120+ Designs', color: 'from-[#004B49] to-black' },
                  { name: 'Chanderi Tissue', items: '95+ Designs', color: 'from-[#D4AF37]/70 to-black' },
                  { name: 'Organza Cutwork', items: '80+ Designs', color: 'from-[#9B111E] to-black' },
                  { name: 'Bridal Lehengas', items: '60+ Designs', color: 'from-[#4B0082] to-black' },
                  { name: 'Festive Suits', items: '110+ Designs', color: 'from-[#C41E3A] to-black' }
                ].map((cat, idx) => (
                  <a
                    key={idx}
                    href="#catalog"
                    className="group bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-4 text-center space-y-3 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    <div className={`h-24 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform`}>
                      <Sparkles className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{cat.items}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 5. BEST SELLERS & TRENDING PRODUCTS (FILTER TABS) */}
          <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">MOST COVETED DESIGNS</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Trending & Bestselling Sarees</h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTrendingTab('trending')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTrendingTab === 'trending' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Trending Now
                </button>
                <button
                  onClick={() => setActiveTrendingTab('bestsellers')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTrendingTab === 'bestsellers' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bestsellers
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.imageColor} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-amber-200 space-y-2 z-10">
                      <Sparkles className="w-8 h-8 text-amber-400" />
                      <span className="font-serif text-base font-bold">{product.name}</span>
                      <span className="text-xs font-mono text-amber-400 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {product.fabric}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                      <span>{product.origin}</span>
                      <span>★ {product.rating}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-white truncate">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-bold font-mono text-amber-400">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-mono text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all"
                    >
                      Add To Shopping Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. OFFERS & FESTIVE PROMO BANNER */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-amber-300">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <span className="inline-block bg-slate-950 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                  SPECIAL FESTIVE OFFER
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
                  Flat ₹3,000 OFF On All Bridal Trousseau Orders
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                  Use Promo Code <strong className="font-mono underline bg-slate-950 text-amber-300 px-2 py-0.5 rounded">BRIDAL2026</strong> at checkout. Includes complimentary luxury wooden gift box packing.
                </p>
              </div>

              {/* Countdown Timer Block */}
              <div className="bg-slate-950 text-amber-400 border border-amber-400/40 rounded-2xl p-6 shadow-2xl text-center space-y-3 shrink-0">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block">OFFER EXPIRES IN</span>
                <div className="flex items-center space-x-3 text-2xl font-mono font-black text-white">
                  <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/30">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="block text-[9px] text-amber-400 font-sans font-normal mt-0.5">HOURS</span>
                  </div>
                  <span>:</span>
                  <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/30">
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="block text-[9px] text-amber-400 font-sans font-normal mt-0.5">MINS</span>
                  </div>
                  <span>:</span>
                  <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/30">
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="block text-[9px] text-amber-400 font-sans font-normal mt-0.5">SECS</span>
                  </div>
                </div>
                <button className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors">
                  Claim Offer Now
                </button>
              </div>
            </div>
          </section>

          {/* 8. WHY CHOOSE US */}
          <section id="why-us" className="bg-slate-950 border-y border-amber-500/20 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">THE BALAJI GUARANTEE</span>
                <h2 className="text-3xl font-serif font-bold text-white">Why Discerning Brides Choose Us</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '100% Silk Mark India', desc: 'Every saree carries a holographic government certified Silk Mark tag confirming pure Mulberry & Katan silk.', icon: ShieldCheck },
                  { title: 'Direct Weaver Price', desc: 'By sourcing directly from master weavers in Varanasi and Kanchipuram, we eliminate 40%+ retail markups.', icon: Award },
                  { title: 'Handmade Blouse Tailoring', desc: 'Our master zardozi craftsmen custom stitch your matching blouse with perfect sizing before dispatch.', icon: Gift },
                  { title: 'Fully Insured Delivery', desc: 'Global door-to-door insured shipping via DHL/FedEx with real-time GPS tracking and transit guarantee.', icon: Truck }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 9. ANIMATED STATISTICS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">32+</span>
                  <span className="text-xs font-mono text-slate-300 block uppercase tracking-wider">Years Weaving Legacy</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">120,000+</span>
                  <span className="text-xs font-mono text-slate-300 block uppercase tracking-wider">Happy Bridal Customers</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">500+</span>
                  <span className="text-xs font-mono text-slate-300 block uppercase tracking-wider">Master Weaver Looms</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">4.9 ★</span>
                  <span className="text-xs font-mono text-slate-300 block uppercase tracking-wider">Google Rating (2,480+ Reviews)</span>
                </div>
              </div>
            </div>
          </section>

          {/* 10. CUSTOMER TESTIMONIALS & 11. GOOGLE RATING WIDGET */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">REAL BRIDAL EXPERIENCES</span>
              <h2 className="text-3xl font-serif font-bold text-white">Words From Our Royalty</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Dr. Ananya Roy', location: 'Kolkata, WB', review: 'The Banarasi Kadwa silk saree was the highlight of my wedding reception. The gold luster is unmatched and genuine!', saree: 'Ketan Silk Red Banarasi' },
                { name: 'Pooja Hegde', location: 'Bengaluru, KA', review: 'Ordered a Kanjeevaram saree online with custom blouse stitching. Fitting was 100% spot on and shipped in 4 days.', saree: 'Temple Border Gold Kanjeevaram' },
                { name: 'Meera Kapadia', location: 'London, UK', review: 'Delivered to London in 3 days in a beautiful wooden gift box. Certified Silk Mark tag included. Will buy again!', saree: 'Chanderi Gold Tissue Saree' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">"{item.review}"</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-white">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{item.location}</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {item.saree}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Rating Badge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center text-xl font-mono shadow-md">
                  G
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 text-sm font-bold">
                    <span>4.9</span>
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-slate-400 text-xs font-normal">(2,480 Google Reviews)</span>
                  </div>
                  <span className="text-xs text-slate-300">BALAJI Flagship Varanasi Showroom</span>
                </div>
              </div>
              <a
                href="#location"
                className="text-xs font-bold text-amber-400 hover:underline flex items-center space-x-1"
              >
                <span>Read Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* 12. NEWSLETTER VIP CIRCLE */}
          <section className="bg-slate-950 border-y border-amber-500/20 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">JOIN THE BALAJI INNER CIRCLE</span>
              <h2 className="text-3xl font-serif font-bold text-white">Unlock VIP Private Previews & ₹1,000 Voucher</h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Subscribe to receive early access invitations to new artisan handloom drops and festive bridal lookbooks.
              </p>

              {newsletterSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-bold">
                  ✨ Welcome to the BALAJI VIP Circle! Voucher code BALAJIVIP1000 has been sent to your email.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* 13. INSTAGRAM GALLERY */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">INSTAGRAM LOOKBOOK</span>
                <h2 className="text-2xl font-serif font-bold text-white">@balajisarees_official</h2>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-amber-400 flex items-center space-x-1.5 hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow On Instagram</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[
                { tag: '#BanarasiBridal', color: 'from-[#800020] to-black' },
                { tag: '#KanjeevaramGold', color: 'from-[#004B49] to-black' },
                { tag: '#ChanderiTissue', color: 'from-[#D4AF37]/80 to-black' },
                { tag: '#CelebrityStyle', color: 'from-[#4B0082] to-black' },
                { tag: '#RealBrides', color: 'from-[#9B111E] to-black' },
                { tag: '#HandloomHeritage', color: 'from-[#C41E3A] to-black' }
              ].map((item, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl bg-slate-900 border border-slate-800 overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} flex flex-col items-center justify-center p-2 text-center text-amber-300 group-hover:scale-110 transition-transform duration-500`}>
                    <Instagram className="w-6 h-6 mb-1 text-amber-400" />
                    <span className="font-mono text-[10px] text-amber-200">{item.tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-amber-400">
                    <span>View Post</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 14. SHOWROOM LOCATION & MAP */}
          <section id="location" className="bg-slate-950 border-t border-amber-500/20 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-500/20 pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">FLAGSHIP SHOWROOM</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Visit Our Heritage Gallery</h2>
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Experience over 2,000+ handloom sarees in person at our flagship Varanasi showroom.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Store Details Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">Varanasi Flagship Store</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1">
                          BALAJI Complex, D 35/82, Godowlia Crossing, Dashashwamedh Ghat Road, Varanasi, Uttar Pradesh 221001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-300">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Open Daily: 10:30 AM – 8:30 PM IST</span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-300">
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>+91 98765 43210 / Concierge Desk</span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-300">
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>vip@balajisarees.com</span>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all text-center flex items-center justify-center space-x-2"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Get Directions On Google Maps</span>
                  </a>
                </div>

                {/* Interactive Map Visual Simulation */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 opacity-80"></div>
                  
                  <div className="relative z-10 space-y-3 max-w-md">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-bold mx-auto flex items-center justify-center shadow-2xl animate-bounce">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white">BALAJI Varanasi Showroom Location</h3>
                    <p className="text-xs text-slate-400">
                      2 Mins walk from Dashashwamedh Ghat. Valet parking & VIP private bridal trial rooms available.
                    </p>
                    <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono px-3 py-1 rounded-full">
                      GPS: 25.3082° N, 83.0076° E
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 15. FOOTER */}
          <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-serif font-black flex items-center justify-center text-lg">
                      B
                    </div>
                    <span className="font-serif text-xl font-bold text-amber-400">BALAJI</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">
                    India’s premier luxury ethnic fashion house specializing in certified Banarasi & Kanjeevaram silk sarees.
                  </p>
                  <div className="flex items-center space-x-3 text-amber-400">
                    <Instagram className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                    <Facebook className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                    <Mail className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">Categories</h4>
                  <ul className="space-y-1.5 text-slate-400">
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Banarasi Katan Silk</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Kanjeevaram Temple Border</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Chanderi Tissue Sarees</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Bridal Lehengas</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">Customer Care</h4>
                  <ul className="space-y-1.5 text-slate-400">
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Silk Mark India Lookup</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Track Your Order</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Custom Stitching Guide</li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer">Returns & Exchanges</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">Contact Concierge</h4>
                  <p className="text-xs text-slate-400">Call / WhatsApp: +91 98765 43210</p>
                  <p className="text-xs text-slate-400">Email: concierge@balajisarees.com</p>
                  <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded">
                    ● VIP Concierge Desk Active
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
                <span>© 2026 BALAJI Luxury Fashion Pvt Ltd. All rights reserved.</span>
                <span className="font-mono text-amber-500/80">Hostinger Core PHP Engine • Protected by SSL</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* VIEW MODE 2: STANDALONE SOURCE CODE INSPECTOR (PHP, CSS, JS) */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-amber-400" />
              <span>Standalone Core PHP Homepage Source Code</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Separated Semantic HTML5 PHP view (`pages/home.php`), Modular CSS3 (`assets/css/style.css`), and Vanilla JS (`assets/js/main.js`).
            </p>
          </div>

          <div className="space-y-6">
            {/* Template File 1: pages/home.php */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">pages/home.php (Semantic HTML5 View Template)</span>
                <span className="text-slate-500">Pure Core PHP</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-80 leading-relaxed">
{`<?php
// pages/home.php - BALAJI Storefront Homepage
if(!defined('BALAJI_EXEC')) {
    define('BALAJI_EXEC', true);
}

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../classes/Product.php';
require_once __DIR__ . '/../functions/sanitizer.php';

$productModel = new Product();
$featuredProducts = $productModel->getFeaturedProducts(6);
$pageTitle = "BALAJI — Imperial Gold Silk Sarees & Ethnic Fashion";
include __DIR__ . '/../includes/header.php';
?>

<!-- 1. HERO BANNER -->
<section className="hero-banner">
    <div className="container">
        <span className="badge-eyebrow">HANDLOOM WEAVING HERITAGE SINCE 1994</span>
        <h1>Imperial Gold Silk Woven For Royalty</h1>
        <p>Handcrafted over 150 hours per loom by Varanasi master artisans using 100% pure silk.</p>
        <div className="hero-cta-group">
            <a href="/catalog.php" className="btn btn-gold">Explore Collection</a>
            <button id="btn-video-consult" className="btn btn-outline">Book Virtual Call</button>
        </div>
    </div>
</section>

<!-- 2. FEATURED PRODUCTS GRID -->
<section className="featured-section">
    <div className="container">
        <h2>Featured Masterpiece Collections</h2>
        <div className="product-grid">
            <?php foreach($featuredProducts as $product): ?>
                <div className="product-card" data-product-id="<?= e($product['id']) ?>">
                    <div className="product-image">
                        <span className="badge"><?= e($product['badge']) ?></span>
                        <button className="btn-wishlist" aria-label="Wishlist">♥</button>
                    </div>
                    <div className="product-info">
                        <h3><?= e($product['title']) ?></h3>
                        <p className="price">₹<?= number_format($product['price']) ?></p>
                        <button className="btn-add-cart" data-id="<?= $product['id'] ?>">Add To Bag</button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>`}
              </pre>
            </div>

            {/* Template File 2: assets/css/style.css */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">assets/css/style.css (Separate Custom CSS3)</span>
                <span className="text-slate-500">Lightweight & Fast</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-60 leading-relaxed">
{`:root {
  --gold-primary: #D4AF37;
  --gold-hover: #E6CA65;
  --bg-dark: #0B0C10;
  --card-bg: #1A1B20;
  --crimson-accent: #800020;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Outfit', sans-serif;
}

body {
  background-color: var(--bg-dark);
  color: #FBF9F5;
  font-family: var(--font-sans);
  margin: 0;
}

.hero-banner {
  background: linear-gradient(135deg, #0B0C10 0%, #1A1B20 50%, #4A0012 100%);
  padding: 100px 20px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}`}
              </pre>
            </div>

            {/* Template File 3: assets/js/main.js */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">assets/js/main.js (Separate Vanilla JavaScript)</span>
                <span className="text-slate-500">Zero Dependencies</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-60 leading-relaxed">
{`// assets/js/main.js - Vanilla JS Interactivity
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // AJAX Cart Add Delegate
    document.querySelectorAll('.btn-add-cart').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            var productId = this.getAttribute('data-id');
            
            fetch('/ajax/cart-action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'action=add&product_id=' + encodeURIComponent(productId)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    alert('Added to cart!');
                }
            });
        });
    });
});`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
