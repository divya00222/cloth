import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Eye, Code, Filter, X, ChevronLeft, ChevronRight, Download, 
  Share2, ZoomIn, Layers, Grid, Heart, ShieldCheck, Camera, Maximize2,
  SlidersHorizontal, Check, RefreshCw
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Looms' | 'Celebrity' | 'Exhibitions' | 'Royal Weaves';
  photographer: string;
  location: string;
  aspectRatio: 'square' | 'tall' | 'wide';
  colorGradient: string;
  weaveHours: number;
  description: string;
  craftDetails: string;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Crimson Kadwa Royal Pallu',
    category: 'Bridal',
    photographer: 'Vikramjit Roy',
    location: 'Godowlia Loom Guild, Varanasi',
    aspectRatio: 'tall',
    colorGradient: 'from-[#800020] via-[#4A0012] to-black',
    weaveHours: 140,
    description: 'Master weaver Ramnath inspecting the 24k gold zari weave of the Crimson Kadwa Imperial Saree before final silk finishing.',
    craftDetails: 'Hand-woven with 100% Mulberry Silk warp and tested gold wire zari in classic floral motif.',
    tags: ['Kadwa', '24k Gold Zari', 'Varanasi', 'Bridal']
  },
  {
    id: 'g2',
    title: 'Kanchipuram Temple Border Gold Warp',
    category: 'Royal Weaves',
    photographer: 'Ananya Swaminathan',
    location: 'Kanchipuram Heritage Loom',
    aspectRatio: 'square',
    colorGradient: 'from-[#004B49] via-[#002827] to-black',
    weaveHours: 180,
    description: 'Close-up texture of Korvai interlocking weave where the temple border meets the emerald green silk body.',
    craftDetails: 'Triple-twisted silk yarn with pure silver thread electroplated in gold.',
    tags: ['Korvai', 'Kanjeevaram', 'Temple Border']
  },
  {
    id: 'g3',
    title: 'Chanderi Gold Tissue Sheer Drape',
    category: 'Exhibitions',
    photographer: 'Siddharth Varma',
    location: 'India Fashion Week, New Delhi',
    aspectRatio: 'wide',
    colorGradient: 'from-[#D4AF37]/80 via-[#7A6115] to-black',
    weaveHours: 90,
    description: 'Model showcasing the lightweight metallic shimmer of Chanderi silk tissue during the Heritage Textiles Gala.',
    craftDetails: 'Gossamer light silk tissue woven with gold metallic yarn for ethereal sheen.',
    tags: ['Chanderi', 'Tissue Silk', 'Fashion Week']
  },
  {
    id: 'g4',
    title: 'Shikargah Brocade Hunting Scene Weave',
    category: 'Looms',
    photographer: 'Rajesh Sharma',
    location: 'Master Weaver Workshop, Varanasi',
    aspectRatio: 'tall',
    colorGradient: 'from-[#4B0082] via-[#21003B] to-black',
    weaveHours: 210,
    description: 'An intricate Shikargah brocade depicting flora and royal hunting motifs, requiring 210 loom hours.',
    craftDetails: 'Double-sided brocade with contrasting silk shuttles operated manually by two weavers.',
    tags: ['Shikargah', 'Brocade', 'Artisan Guild']
  },
  {
    id: 'g5',
    title: 'Royal Organza Cutwork Floral Drape',
    category: 'Celebrity',
    photographer: 'Karan Malhotra',
    location: 'Udaivilas Palace, Udaipur',
    aspectRatio: 'square',
    colorGradient: 'from-[#9B111E] via-[#4D080F] to-black',
    weaveHours: 110,
    description: 'Hand-cut silk organza adorned with delicate Zardozi embroidery, worn at a royal Udaipur wedding.',
    craftDetails: 'Pure organza base with hand-cut floral edges and real pearls sewn into the border.',
    tags: ['Organza', 'Cutwork', 'Udaipur', 'Celebrity']
  },
  {
    id: 'g6',
    title: 'Bandhani Silver-Gold Kadwa Fusion',
    category: 'Bridal',
    photographer: 'Vikramjit Roy',
    location: 'Jaipur Heritage Atelier',
    aspectRatio: 'wide',
    colorGradient: 'from-[#C41E3A] via-[#630F1D] to-black',
    weaveHours: 130,
    description: 'Synthesizing Gujarati Bandhani tie-dye with Banarasi Kadwa zari border in vivid vermilion red.',
    craftDetails: 'Over 12,000 hand-tied knots dyed in organic madder root before zari border weaving.',
    tags: ['Bandhani', 'Tie-Dye', 'Vermilion', 'Fusion']
  },
  {
    id: 'g7',
    title: 'Midnight Onyx Zari Weave Showcase',
    category: 'Royal Weaves',
    photographer: 'Ananya Swaminathan',
    location: 'Balaji Private Archive, Mumbai',
    aspectRatio: 'tall',
    colorGradient: 'from-[#1A1A1A] via-black to-[#0D0D0D]',
    weaveHours: 155,
    description: 'Deep black silk contrasted against burnished antique silver zari for dark luxury nocturnal soirées.',
    craftDetails: 'Black Mulberry silk thread intertwined with vintage dull-gold bullion wire.',
    tags: ['Midnight Onyx', 'Antique Zari', 'Private Archive']
  },
  {
    id: 'g8',
    title: 'Emerald Brocade Kanjeevaram Bridal Drape',
    category: 'Bridal',
    photographer: 'Siddharth Varma',
    location: 'Rambagh Palace, Jaipur',
    aspectRatio: 'square',
    colorGradient: 'from-[#046307] via-[#012903] to-black',
    weaveHours: 195,
    description: 'Heavy bridal Kanjeevaram featuring peacocks and sacred lotus motifs in deep emerald green.',
    craftDetails: 'Pure heavy silk weighing 950g with solid gold thread pallu.',
    tags: ['Kanjeevaram', 'Emerald', 'Bridal Trousseau']
  }
];

export const GalleryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'js' | 'css'>('html');

  // Filter & Search States
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox State
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['g1', 'g4']);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories = ['All', 'Bridal', 'Looms', 'Celebrity', 'Exhibitions', 'Royal Weaves'];

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsZoomedIn(false);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setIsZoomedIn(false);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! === 0 ? filteredGallery.length - 1 : prev! - 1));
    setIsZoomedIn(false);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! === filteredGallery.length - 1 ? 0 : prev! + 1));
    setIsZoomedIn(false);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
      showToast('Removed from curated moodboard');
    } else {
      setFavorites([...favorites, id]);
      showToast('Added to curated moodboard');
    }
  };

  const activeLightboxItem = selectedPhotoIndex !== null ? filteredGallery[selectedPhotoIndex] : null;

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
            High-Resolution Handloom Atelier Gallery & Lightbox
          </h2>
          <p className="text-xs text-slate-400">
            Featuring categorized bento grids, full-screen zero-dependency JS Lightbox, zoom controls, and lazy loading.
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
            <span>Live Gallery</span>
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
            <span>View JS & HTML Code</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <Heart className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* VIEW MODE 1: LIVE GALLERY PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-xl z-10">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">ROYAL TEXTILE ARCHIVE</span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Handloom Artisan Gallery
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Explore high-resolution editorial photography of Banarasi and Kanjeevaram weaving looms, bridal trousseau exhibitions, and royal heritage drapes.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-xl text-center space-y-1 z-10 shrink-0">
              <span className="text-xs font-mono text-amber-400 block uppercase">SAVED MOODBOARD</span>
              <span className="text-2xl font-mono font-bold text-white">{favorites.length} Photographs</span>
              <span className="text-[10px] text-slate-400 block">Click heart to curate</span>
            </div>
          </div>

          {/* FILTER TABS & SEARCH BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery tags, loom, city..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* MASONRY / BENTO IMAGE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => {
              const isFav = favorites.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/60 transition-all duration-500 shadow-xl flex flex-col justify-between"
                >
                  {/* Photo Canvas */}
                  <div className={`relative ${
                    item.aspectRatio === 'tall' ? 'aspect-[3/4]' : item.aspectRatio === 'wide' ? 'aspect-[16/10]' : 'aspect-square'
                  } bg-slate-950 overflow-hidden`}>
                    
                    {/* Simulated Ultra-HD Gradient Canvas */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.colorGradient} group-hover:scale-105 transition-transform duration-700`}></div>

                    {/* Content Placeholder Art */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-amber-200 space-y-2 z-10">
                      <Camera className="w-8 h-8 text-amber-400 opacity-80 group-hover:scale-110 transition-transform" />
                      <span className="font-serif text-lg font-bold text-white drop-shadow-md">{item.title}</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {item.weaveHours} Loom Hours
                      </span>
                    </div>

                    {/* Top Right Heart Wishlist Button */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    {/* Top Left Category Pill */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-slate-950/90 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Overlay with Lightbox Trigger Prompt */}
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-5 text-left">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                        {item.location}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs font-mono text-amber-300">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Click For Fullscreen Lightbox</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="p-4 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Photo: {item.photographer}</span>
                    <span className="text-amber-400 font-bold">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FULL-SCREEN LIGHTBOX MODAL */}
          {activeLightboxItem && (
            <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-fadeIn">
              
              {/* Lightbox Top Controls */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-amber-500 text-slate-950 font-mono text-xs font-bold px-3 py-1 rounded-full">
                    Photo {(selectedPhotoIndex ?? 0) + 1} of {filteredGallery.length}
                  </span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    Category: <strong className="text-amber-400">{activeLightboxItem.category}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsZoomedIn(!isZoomedIn)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-all flex items-center space-x-1.5 text-xs font-mono"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span className="hidden sm:inline">{isZoomedIn ? 'Zoom 100%' : 'Zoom 200%'}</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(activeLightboxItem.id)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-all"
                    title="Bookmark Photo"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(activeLightboxItem.id) ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => showToast('Image link copied to clipboard')}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-all"
                    title="Share Image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Center Stage with Prev / Next Navigation */}
              <div className="relative flex-1 flex items-center justify-center py-6 my-auto">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-2xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Lightbox Display Image */}
                <div className={`relative max-w-4xl w-full aspect-[4/3] rounded-3xl bg-slate-900 border border-amber-500/40 overflow-hidden shadow-2xl transition-transform duration-300 ${
                  isZoomedIn ? 'scale-125' : 'scale-100'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeLightboxItem.colorGradient} flex flex-col items-center justify-center p-8 text-center text-amber-200 space-y-3`}>
                    <Sparkles className="w-16 h-16 text-amber-400 mb-2 animate-pulse" />
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">{activeLightboxItem.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">{activeLightboxItem.description}</p>
                    <span className="text-xs font-mono text-amber-400 bg-slate-950/80 px-4 py-1.5 rounded-full border border-amber-500/30">
                      {activeLightboxItem.craftDetails}
                    </span>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-2xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Bottom Metadata Info */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-amber-400 font-bold block">{activeLightboxItem.title}</span>
                  <span className="text-slate-400">{activeLightboxItem.location} • Photography by {activeLightboxItem.photographer}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-end">
                  {activeLightboxItem.tags.map((tag) => (
                    <span key={tag} className="bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: SOURCE CODE INSPECTOR (VANILLA JS LIGHTBOX & LAZY LOAD) */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">gallery.html / lightbox.js / lazy-load.js</h3>
              <p className="text-xs text-slate-400">Zero-dependency Vanilla JavaScript code for modal lightbox and image lazy loading.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'html' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                gallery.html
              </button>
              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'js' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                lightbox.js
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'css' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                lazy-load.js
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'html' && `<!-- pages/gallery.html -->
<div class="gallery-grid">
  <div class="gallery-card" data-category="Bridal">
    <img data-src="/assets/images/crimson-pallu.jpg" class="lazy-image" alt="Crimson Kadwa">
    <div class="card-overlay" onclick="openLightbox(0)">
      <span>View Fullscreen</span>
    </div>
  </div>
</div>

<!-- Modal Lightbox -->
<div id="lightboxModal" class="lightbox-modal">
  <span class="close-btn" onclick="closeLightbox()">&times;</span>
  <img id="lightboxImg" src="">
</div>`}

            {activeCodeTab === 'js' && `// assets/js/lightbox.js - Vanilla JS Lightbox
let currentIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-card img');
const modal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryItems[currentIndex].dataset.src || galleryItems[currentIndex].src;
  modal.style.display = 'flex';
}

function closeLightbox() {
  modal.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % galleryItems.length);
  if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
});`}

            {activeCodeTab === 'css' && `// assets/js/lazy-load.js - IntersectionObserver Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img.lazy-image');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
});`}
          </pre>
        </div>
      )}
    </div>
  );
};
