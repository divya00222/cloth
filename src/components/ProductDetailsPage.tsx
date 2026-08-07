import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Star, Sparkles, ShieldCheck, Truck, Clock, 
  Share2, ZoomIn, Check, ArrowRight, Eye, Code, ThumbsUp, MessageSquare,
  Gift, RefreshCw, CheckCircle2, ChevronRight, Info, Copy, Facebook,
  Send, HelpCircle, Layers
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'schema' | 'js'>('html');

  // Product Selection States
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  
  const [selectedColor, setSelectedColor] = useState<string>('Royal Crimson Red');
  const [selectedSize, setSelectedSize] = useState<string>('Standard 5.5m + Unstitched Blouse');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(true);
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Tab in Product Info (Description, Weaver Provenance, Shipping & Returns)
  const [activeInfoTab, setActiveInfoTab] = useState<'description' | 'weaving' | 'shipping'>('description');

  // Review Filter / Sorting State
  const [reviewFilter, setReviewFilter] = useState<'all' | 'verified' | '5star'>('all');

  const product = {
    id: 'p101',
    sku: 'BAL-BAN-2026-994',
    name: 'Ketan Gold Zari Imperial Banarasi Kadwa Saree',
    category: 'Banarasi Silk',
    brand: 'Varanasi Master Weaver Guild',
    price: 32500,
    originalPrice: 38000,
    rating: 5.0,
    reviewsCount: 48,
    weavingHours: 140,
    fabric: '100% Pure Katan Mulberry Silk',
    origin: 'Godowlia Crossing, Varanasi, UP',
    zariType: 'Tested 24k Electroplated Gold Zari',
    silkMarkNo: 'SM-IN-2026-884920',
    stockCount: 4,
    images: [
      { id: 'img1', label: 'Full Drape & Pallu', colorGradient: 'from-[#800020] via-[#4A0012] to-black', detail: 'Intricate Kadwa Floral Motif Pallu' },
      { id: 'img2', label: 'Close-Up Gold Zari Weave', colorGradient: 'from-[#D4AF37]/80 via-[#800020] to-black', detail: 'Tested 24k Gold Thread Weaving' },
      { id: 'img3', label: 'Unstitched Blouse Piece', colorGradient: 'from-[#4A0012] via-[#800020] to-[#1A1A1A]', detail: 'Matching Heavy Zardozi Sleeve Border' },
      { id: 'img4', label: 'Artisan Loom Provenance', colorGradient: 'from-[#800020] via-[#2A000A] to-black', detail: 'Hand-Woven by Master Artisan Ramnath' }
    ],
    colors: [
      { name: 'Royal Crimson Red', hex: '#800020', inStock: true },
      { name: 'Peacock Emerald Green', hex: '#004B49', inStock: true },
      { name: 'Imperial Midnight Onyx', hex: '#1A1A1A', inStock: true },
      { name: 'Sheer Champagne Gold', hex: '#D4AF37', inStock: false }
    ],
    sizes: [
      { name: 'Standard 5.5m + Unstitched Blouse', priceExtra: 0, desc: 'Includes 0.8m plain blouse piece with zardozi border' },
      { name: '6.3m + Pre-Stitched Custom Blouse', priceExtra: 2500, desc: 'Tailored to your exact measurements before dispatch' },
      { name: 'Ready-to-Wear Pre-Draped Saree', priceExtra: 3500, desc: 'Pre-stitched pleats with adjustable waistband hooks' }
    ]
  };

  const relatedProducts = [
    {
      id: 'r1',
      name: 'Kanjeevaram Temple Border Pure Gold Saree',
      price: 45000,
      originalPrice: 52000,
      rating: 4.9,
      gradient: 'from-[#004B49] to-black',
      fabric: 'Mulberry Silk'
    },
    {
      id: 'r2',
      name: 'Shikargah Handloom Brocade Masterpiece',
      price: 58000,
      originalPrice: 65000,
      rating: 5.0,
      gradient: 'from-[#4B0082] to-black',
      fabric: 'Pure Katan Silk'
    },
    {
      id: 'r3',
      name: 'Chanderi Gold Tissue Light Weave Saree',
      price: 18500,
      originalPrice: 22000,
      rating: 4.8,
      gradient: 'from-[#D4AF37]/70 to-black',
      fabric: 'Silk Tissue'
    }
  ];

  const reviews = [
    {
      id: 'rev1',
      author: 'Sunita Mehra',
      location: 'New Delhi',
      rating: 5,
      date: '12 July 2026',
      verified: true,
      title: 'The gold luster and weight of the silk is majestic!',
      comment: 'I ordered this saree for my daughter’s wedding reception. The Kadwa weave is 100% authentic handloom. Delivered in a luxury velvet-lined wooden box with the Silk Mark tag attached.'
    },
    {
      id: 'rev2',
      author: 'Priya Narang',
      location: 'London, UK',
      rating: 5,
      date: '02 June 2026',
      verified: true,
      title: 'Flawless international delivery to London',
      comment: 'Received in 4 business days via DHL. The custom pre-stitched blouse fit perfectly according to the measurement form. Highly recommend BALAJI!'
    },
    {
      id: 'rev3',
      author: 'Kavita Deshmukh',
      location: 'Pune, Maharashtra',
      rating: 5,
      date: '18 May 2026',
      verified: true,
      title: 'True heirloom quality saree',
      comment: 'Spent over 140 hours in weaving according to the provenance card. The zari does not tarnish. Worth every single rupee!'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

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
            High-Fashion Saree Product Details Page
          </h2>
          <p className="text-xs text-slate-400">
            Featuring 360 interactive zoom, multiple weave gallery angles, custom blouse draping selector, and Schema.org SEO.
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
            <span>Live Product Details</span>
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
            <span>SEO & Source Code</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* VIEW MODE 1: LIVE PRODUCT DETAILS PAGE PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 p-4 sm:p-6 lg:p-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <a href="#shop" className="hover:text-amber-400 transition-colors">Banarasi Sarees</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 truncate max-w-xs">{product.name}</span>
          </nav>

          {/* MAIN PRODUCT LAYOUT (2 COLUMNS: LARGE INTERACTIVE GALLERY + COUTURE DETAILS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: LARGE GALLERY WITH HOVER ZOOM & THUMBNAILS (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Display Image Stage */}
              <div 
                className="relative aspect-[3/4] rounded-3xl bg-slate-950 border border-amber-500/30 overflow-hidden group cursor-crosshair shadow-2xl"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                {/* Simulated High-Res Saree Render */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${product.images[selectedImageIndex].colorGradient} transition-transform duration-300`}
                  style={isZoomed ? {
                    transform: 'scale(2.2)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : {}}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-amber-200 space-y-3 pointer-events-none">
                    <div className="w-24 h-24 rounded-full border-2 border-amber-400/40 bg-slate-950/70 flex items-center justify-center p-4 shadow-2xl">
                      <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
                    </div>
                    <span className="font-serif text-xl font-bold text-white">{product.images[selectedImageIndex].detail}</span>
                    <span className="text-xs font-mono text-amber-400 bg-slate-950/90 px-3 py-1 rounded-full border border-amber-500/30">
                      Hover To Zoom 240% Ultra Detail
                    </span>
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="bg-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    -{discountPercent}% FESTIVE OFFER
                  </span>
                  <span className="bg-slate-950/90 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>SILK MARK CERTIFIED</span>
                  </span>
                </div>

                {/* Zoom Indicator Icon */}
                <div className="absolute bottom-4 right-4 z-20 bg-slate-950/80 border border-slate-700 text-amber-400 p-2.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                  <span>{isZoomed ? 'Zoom Active' : 'Hover To Inspect Weave'}</span>
                </div>
              </div>

              {/* Thumbnails Selector */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-slate-900 ${
                      selectedImageIndex === idx
                        ? 'border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${img.colorGradient} flex items-center justify-center text-center p-1`}>
                      <span className="text-[9px] font-mono font-bold text-amber-300 leading-tight">{img.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: COUTURE DETAILS & ORDERING CONTROLS (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Category, Title, Rating */}
              <div className="space-y-2 border-b border-amber-500/20 pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>{product.brand}</span>
                  <span className="text-slate-400">SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Silk Mark Verified Tag */}
                <div className="flex items-center space-x-4 pt-1 text-xs">
                  <div className="flex items-center space-x-1 text-amber-400 font-bold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="ml-1 text-white font-mono">{product.rating}</span>
                    <span className="text-slate-400 font-normal font-sans">({product.reviewsCount} verified reviews)</span>
                  </div>

                  <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>In Stock ({product.stockCount} Available)</span>
                  </span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-mono font-bold text-amber-400">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm font-mono text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono block mt-1">
                    Inclusive of all taxes & free insured delivery
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 uppercase">Select Color:</span>
                  <span className="text-amber-400 font-bold">{selectedColor}</span>
                </div>

                <div className="flex items-center space-x-3">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      disabled={!col.inStock}
                      onClick={() => setSelectedColor(col.name)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === col.name
                          ? 'border-amber-400 scale-110 shadow-lg shadow-amber-500/30'
                          : 'border-slate-800 hover:border-slate-600'
                      } ${!col.inStock ? 'opacity-30 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes / Blouse Drape Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 uppercase">Drape & Stitching Option:</span>
                  <a href="#size-guide" className="text-amber-400 hover:underline">Blouse Measurement Guide</a>
                </div>

                <div className="space-y-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz.name)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedSize === sz.name
                          ? 'bg-amber-500/10 border-amber-400 text-white font-bold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="block text-white font-serif">{sz.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{sz.desc}</span>
                      </div>
                      {sz.priceExtra > 0 && (
                        <span className="text-xs font-mono text-amber-400 font-bold shrink-0 ml-2">
                          +₹{sz.priceExtra.toLocaleString('en-IN')}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
                    <button
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 font-bold disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono text-sm font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stockCount, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart CTA Button */}
                  <button
                    onClick={() => showToast(`Added ${quantity} x ${product.name} to your Shopping Bag.`)}
                    className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag</span>
                  </button>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={() => {
                      setIsWishlisted(!isWishlisted);
                      showToast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist');
                    }}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                      isWishlisted
                        ? 'bg-amber-500/10 border-amber-400 text-amber-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Share Design:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => showToast('Link copied to clipboard!')}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </button>
                    <button
                      onClick={() => showToast('Opening WhatsApp Share...')}
                      className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABBED DETAILS & PROVENANCE SECTION */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-4 border-b border-slate-800 pb-4 overflow-x-auto">
              <button
                onClick={() => setActiveInfoTab('description')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeInfoTab === 'description'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Detailed Specifications
              </button>
              <button
                onClick={() => setActiveInfoTab('weaving')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeInfoTab === 'weaving'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Artisan Weaver Provenance
              </button>
              <button
                onClick={() => setActiveInfoTab('shipping')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeInfoTab === 'shipping'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Insured Shipping & Returns
              </button>
            </div>

            {activeInfoTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div className="space-y-3">
                  <h3 className="text-base font-serif font-bold text-white">Handloom Craftsmanship</h3>
                  <p className="leading-relaxed">
                    This Imperial Banarasi saree features the legendary Kadwa technique where each floral motif is individually hand-woven into the fabric without any loose threads on the reverse side.
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-400 font-mono">
                    <li>Fabric: 100% Pure Katan Mulberry Silk</li>
                    <li>Weave: Kadwa Handloom Technique</li>
                    <li>Zari: Tested 24k Electroplated Gold Thread</li>
                    <li>Length: 5.5 Meters + 0.8 Meter Blouse</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/20 space-y-3">
                  <h4 className="font-serif font-bold text-amber-400 text-sm">Official Authenticity Guarantee</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Every saree arrives with a holographic Silk Mark India tag issued by the Ministry of Textiles, Government of India.
                  </p>
                  <span className="text-amber-300 font-mono block text-[11px]">
                    Hologram Tag No: {product.silkMarkNo}
                  </span>
                </div>
              </div>
            )}

            {activeInfoTab === 'weaving' && (
              <div className="space-y-4 text-xs text-slate-300">
                <h3 className="text-base font-serif font-bold text-white">Master Weaver Story</h3>
                <p className="leading-relaxed">
                  Hand-woven over 140 continuous loom hours by Master Artisan Ramnath Ji at the Godowlia handloom guild in Varanasi.
                </p>
              </div>
            )}

            {activeInfoTab === 'shipping' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <Truck className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="font-bold text-white">Complimentary Express Shipping</h4>
                  <p className="text-slate-400 text-[11px]">Delivered within 3-5 business days globally via DHL Express.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <Gift className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="font-bold text-white">Luxury Gift Packaging</h4>
                  <p className="text-slate-400 text-[11px]">Ships in a velvet-lined wooden keepsake box with cedar preservation sachets.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <RefreshCw className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="font-bold text-white">7-Day Hassle-Free Returns</h4>
                  <p className="text-slate-400 text-[11px]">100% refund or exchange if security tag remains untampered.</p>
                </div>
              </div>
            )}
          </section>

          {/* CUSTOMER REVIEWS & RATING BREAKDOWN */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">VERIFIED PURCHASER FEEDBACK</span>
                <h2 className="text-2xl font-serif font-bold text-white">Customer Ratings & Reviews (48)</h2>
              </div>
              <button
                onClick={() => showToast('Review modal simulation active.')}
                className="bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all shrink-0"
              >
                Write A Review
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Rating Summary (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
                <span className="text-5xl font-serif font-black text-amber-400">5.0</span>
                <div className="flex items-center justify-center space-x-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-400 block">Based on 48 verified bridal purchases</span>

                {/* Progress Bars */}
                <div className="space-y-2 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center space-x-2">
                    <span>5 Stars</span>
                    <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full w-[94%]"></div>
                    </div>
                    <span>94%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>4 Stars</span>
                    <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full w-[6%]"></div>
                    </div>
                    <span>6%</span>
                  </div>
                </div>
              </div>

              {/* Reviews List (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-serif font-bold flex items-center justify-center">
                          {rev.author[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{rev.author}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{rev.location} • {rev.date}</span>
                        </div>
                      </div>
                      <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] px-2.5 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>

                    <h5 className="font-serif text-sm font-bold text-amber-300">{rev.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RELATED PRODUCTS RECOMMENDATION CAROUSEL GRID */}
          <section className="space-y-6 pt-4 border-t border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">YOU MAY ALSO COVET</span>
                <h2 className="text-2xl font-serif font-bold text-white">Related Handloom Masterpieces</h2>
              </div>
              <a href="#shop" className="text-xs font-bold text-amber-400 hover:underline flex items-center space-x-1">
                <span>View All Banarasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-amber-500/50 transition-colors shadow-xl">
                  <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${rel.gradient} flex items-center justify-center p-4 text-center text-amber-300 border border-amber-500/20`}>
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 block">{rel.fabric}</span>
                    <h3 className="font-serif text-sm font-bold text-white truncate">{rel.name}</h3>
                    <div className="flex items-baseline space-x-2 pt-1">
                      <span className="text-base font-mono font-bold text-amber-400">₹{rel.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-mono text-slate-500 line-through">₹{rel.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* VIEW MODE 2: SOURCE CODE & SEO SCHEMA INSPECTOR */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">product-details.html / Schema.org JSON-LD</h3>
              <p className="text-xs text-slate-400">Pure zero-framework HTML markup with Google Rich Snippets e-commerce schema.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'html' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                product.html
              </button>
              <button
                onClick={() => setActiveCodeTab('schema')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'schema' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                schema.json
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'html' && `<!-- pages/product.php or product.html -->
<main class="product-details-container">
  <div class="product-gallery">
    <div id="zoomContainer" class="zoom-box">
      <img id="mainImage" src="/assets/images/saree-full.jpg" alt="Banarasi Kadwa Saree">
    </div>
  </div>

  <div class="product-info">
    <h1>Ketan Gold Zari Imperial Banarasi Kadwa Saree</h1>
    <p class="price">₹32,500 <del>₹38,000</del></p>

    <!-- Color & Drape Options -->
    <div class="swatches">
      <button data-color="Crimson" class="active"></button>
    </div>

    <button id="addToBagBtn" class="btn-primary">Add To Bag</button>
  </div>
</main>`}

            {activeCodeTab === 'schema' && `<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Ketan Gold Zari Imperial Banarasi Kadwa Saree",
  "image": [
    "https://balajisarees.com/images/banarasi-kadwa-1.jpg"
  ],
  "description": "100% Pure Katan Mulberry Silk Banarasi Kadwa Saree with tested 24k gold zari thread.",
  "sku": "BAL-BAN-2026-994",
  "brand": {
    "@type": "Brand",
    "name": "BALAJI Handloom"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://balajisarees.com/product/ketan-gold-zari-banarasi",
    "priceCurrency": "INR",
    "price": "32500",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "48"
  }
}
</script>`}
          </pre>
        </div>
      )}
    </div>
  );
};
