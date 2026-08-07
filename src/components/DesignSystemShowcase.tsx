import React, { useState } from 'react';
import { 
  Palette, Type, Layers, Grid, Square, FormInput, Navigation, 
  Sparkles, Eye, Shield, ShoppingBag, Heart, Search, Check, 
  Star, ChevronRight, Sliders, ArrowRight, RefreshCw, X, Menu,
  Sun, Moon, ShieldCheck, Truck, Award, Gift, Clock, AlertCircle,
  HelpCircle, ChevronDown, CheckCircle2, Lock
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('colors');
  const [activeSize, setActiveSize] = useState<string>('M');
  const [wishlistActive, setWishlistActive] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);
  
  // Nested radius calculation demo
  const [outerRadius, setOuterRadius] = useState<number>(16);
  const [cardPadding, setCardPadding] = useState<number>(12);
  const calculatedInnerRadius = Math.max(0, outerRadius - cardPadding);

  // Theme styles helper
  const isDark = themeMode === 'dark';
  const containerBg = isDark ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-[#FBF9F5] text-slate-900 border-stone-300';
  const cardBg = isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200 shadow-sm';
  const subCardBg = isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-stone-50 border-stone-200';
  const textMuted = isDark ? 'text-slate-400' : 'text-stone-600';
  const textHeading = isDark ? 'text-white' : 'text-stone-900';

  const sections = [
    { id: 'colors', label: 'Color Palette', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing & Radii', icon: Layers },
    { id: 'grid', label: 'Grid System', icon: Grid },
    { id: 'buttons', label: 'Button Styles', icon: Square },
    { id: 'cards', label: 'Cards & Bento', icon: Layers },
    { id: 'forms', label: 'Forms & Inputs', icon: FormInput },
    { id: 'nav', label: 'Navigation & Footer', icon: Navigation },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'product', label: 'Product Cards', icon: ShoppingBag },
    { id: 'effects', label: 'Hover & Animations', icon: Eye },
    { id: 'icons', label: 'Icons & Shadows', icon: Shield },
    { id: 'loader', label: 'Loading Screen', icon: RefreshCw },
  ];

  return (
    <div className={`transition-colors duration-300 space-y-8 p-4 sm:p-6 rounded-2xl border ${containerBg}`}>
      {/* Header bar with Dark/Light Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-amber-500/20 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>BALAJI Luxury Fashion UI Specification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-amber-400">
            BALAJI — Complete UI/UX Design System
          </h1>
          <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${textMuted}`}>
            An elite, bespoke design system crafted for high-end saree & ethnic fashion retail. Zero template cliches, pure luxury visual hierarchy.
          </p>
        </div>

        {/* Theme Mode Toggle */}
        <div className="flex items-center space-x-3 bg-amber-500/10 border border-amber-500/30 p-1.5 rounded-xl shrink-0">
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isDark ? 'bg-amber-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark Noir</span>
          </button>
          <button
            onClick={() => setThemeMode('light')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !isDark ? 'bg-amber-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light Ivory</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for UI Sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-amber-500/10">
        {sections.map((sec) => {
          const IconComponent = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : isDark
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: COLOR PALETTE */}
      {activeSection === 'colors' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>1. Color Palette System</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Imperial Gold (`#D4AF37`), Obsidian Noir (`#0B0C10`), Royal Silk Crimson (`#800020`), and Pearl Ivory (`#FBF9F5`) — engineered with WCAG AA compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Swatch 1 */}
            <div className={`p-4 rounded-xl border ${cardBg} space-y-3`}>
              <div className="h-28 rounded-lg bg-[#D4AF37] shadow-inner flex items-end justify-between p-3 text-slate-950 font-mono font-bold text-xs">
                <span>Primary Imperial Gold</span>
                <span>#D4AF37</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className={textMuted}>Token:</span>
                  <code className="text-amber-500 font-mono text-[11px]">var(--gold-primary)</code>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Contrast Ratio:</span>
                  <span className="text-emerald-400 font-semibold">12.4:1 (Pass AA/AAA)</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Usage:</span>
                  <span className={textHeading}>Primary Buttons, Monogram Logo, Active Accents</span>
                </div>
              </div>
            </div>

            {/* Swatch 2 */}
            <div className={`p-4 rounded-xl border ${cardBg} space-y-3`}>
              <div className="h-28 rounded-lg bg-[#0B0C10] border border-amber-500/30 shadow-inner flex items-end justify-between p-3 text-amber-400 font-mono font-bold text-xs">
                <span>Obsidian Noir</span>
                <span>#0B0C10</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className={textMuted}>Token:</span>
                  <code className="text-amber-500 font-mono text-[11px]">var(--bg-dark)</code>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Contrast Ratio:</span>
                  <span className="text-emerald-400 font-semibold">18.2:1 (Pass AAA)</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Usage:</span>
                  <span className={textHeading}>Luxury Dark Theme Base, Footer, Navigation Bar</span>
                </div>
              </div>
            </div>

            {/* Swatch 3 */}
            <div className={`p-4 rounded-xl border ${cardBg} space-y-3`}>
              <div className="h-28 rounded-lg bg-[#800020] shadow-inner flex items-end justify-between p-3 text-amber-200 font-mono font-bold text-xs">
                <span>Royal Silk Crimson</span>
                <span>#800020</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className={textMuted}>Token:</span>
                  <code className="text-amber-500 font-mono text-[11px]">var(--crimson-accent)</code>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Contrast Ratio:</span>
                  <span className="text-emerald-400 font-semibold">8.7:1 (Pass AA)</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Usage:</span>
                  <span className={textHeading}>Bridal Collection Badges, Promo Tags, Festive Highlights</span>
                </div>
              </div>
            </div>

            {/* Swatch 4 */}
            <div className={`p-4 rounded-xl border ${cardBg} space-y-3`}>
              <div className="h-28 rounded-lg bg-[#FBF9F5] border border-stone-300 shadow-inner flex items-end justify-between p-3 text-stone-900 font-mono font-bold text-xs">
                <span>Pearl Ivory</span>
                <span>#FBF9F5</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className={textMuted}>Token:</span>
                  <code className="text-amber-500 font-mono text-[11px]">var(--bg-light)</code>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Contrast Ratio:</span>
                  <span className="text-emerald-400 font-semibold">19.5:1 (Pass AAA)</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Usage:</span>
                  <span className={textHeading}>Light Theme Canvas, Card Backgrounds, Form Fields</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Tones */}
          <div className={`p-5 rounded-xl border ${cardBg} space-y-4`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider text-amber-400`}>Neutral & Accent Sub-Tones</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[#E6CA65] text-slate-950 font-mono text-xs font-bold">#E6CA65<br/><span className="text-[10px] font-sans font-normal">Gold Light</span></div>
              <div className="p-3 rounded-lg bg-[#997A15] text-white font-mono text-xs font-bold">#997A15<br/><span className="text-[10px] font-sans font-normal">Gold Deep</span></div>
              <div className="p-3 rounded-lg bg-[#1A1B20] text-slate-200 border border-slate-700 font-mono text-xs font-bold">#1A1B20<br/><span className="text-[10px] font-sans font-normal">Charcoal Soft</span></div>
              <div className="p-3 rounded-lg bg-[#2A2B32] text-slate-200 font-mono text-xs font-bold">#2A2B32<br/><span className="text-[10px] font-sans font-normal">Card Border Dark</span></div>
              <div className="p-3 rounded-lg bg-[#E5E5E0] text-stone-900 font-mono text-xs font-bold">#E5E5E0<br/><span className="text-[10px] font-sans font-normal">Ivory Divider</span></div>
              <div className="p-3 rounded-lg bg-[#004B49] text-amber-200 font-mono text-xs font-bold">#004B49<br/><span className="text-[10px] font-sans font-normal">Peacock Emerald</span></div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TYPOGRAPHY */}
      {activeSection === 'typography' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>2. High-Fashion Typography System</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Paired Display Serif (<strong className="text-amber-400">Cormorant Garamond / Playfair Display</strong>) with Geometric Body Sans (<strong className="text-amber-400">Outfit / Plus Jakarta Sans</strong>) using a 1.333 Modular Scale.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
            {/* Display Hero */}
            <div className="space-y-1 pb-4 border-b border-amber-500/10">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Display Serif (48px / 3rem) — Tracking -0.02em</span>
                <span>Font-Weight: 700 Bold</span>
              </div>
              <p className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-amber-400 leading-tight">
                The Royal Banarasi Silk Heritage Collection
              </p>
            </div>

            {/* Heading 1 */}
            <div className="space-y-1 pb-4 border-b border-amber-500/10">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Heading 1 (36px / 2.25rem)</span>
                <span>Font-Weight: 600 SemiBold</span>
              </div>
              <h1 className={`font-serif text-2xl sm:text-3xl font-semibold ${textHeading}`}>
                Handcrafted Kanjeevaram Gold Zari Sarees
              </h1>
            </div>

            {/* Heading 2 */}
            <div className="space-y-1 pb-4 border-b border-amber-500/10">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Heading 2 (28px / 1.75rem)</span>
                <span>Font-Weight: 600 SemiBold</span>
              </div>
              <h2 className={`font-serif text-xl sm:text-2xl font-semibold ${textHeading}`}>
                Traditional Weaves & Modern Elegance
              </h2>
            </div>

            {/* Subtitle */}
            <div className="space-y-1 pb-4 border-b border-amber-500/10">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Subtitle / Lead Paragraph (18px / 1.125rem)</span>
                <span>Line Height: 1.6</span>
              </div>
              <p className={`text-lg leading-relaxed ${textHeading}`}>
                Each BALAJI saree is woven by master artisans over 120 hours using pure mulberry silk threads, gold zari borders, and timeless regal motifs.
              </p>
            </div>

            {/* Body Regular */}
            <div className="space-y-1 pb-4 border-b border-amber-500/10">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Body Regular (16px / 1rem) — Max Line Width 65ch</span>
                <span>Font-Weight: 400 Regular</span>
              </div>
              <p className={`text-base leading-relaxed max-w-prose ${textMuted}`}>
                Experience unmatched comfort and grand aesthetics for weddings, festivals, and celebratory occasions. Our direct-from-weaver model ensures 100% authenticity certified by Silk Mark India.
              </p>
            </div>

            {/* Micro Tag */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                <span>Micro Label / Eyebrow Badge (12px / 0.75rem) — Uppercase Tracking 0.15em</span>
                <span>Font-Weight: 700 Bold</span>
              </div>
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                EST. 1994 • VARANASI WEAVING HOUSE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SPACING SYSTEM & BORDER RADIUS */}
      {activeSection === 'spacing' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>3. Rhythmic Spacing & Mathematical Corner Radii</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              4px baseline rhythmic scale alongside mathematical nested corner radius formula: <code className="text-amber-400 font-mono">Inner Radius = Outer Radius - Padding</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Baseline Scale */}
            <div className={`p-5 rounded-xl border ${cardBg} space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">4px Baseline Rhythmic Spacing</h3>
              <div className="space-y-2 text-xs">
                {[
                  { token: 'space-1 (4px)', width: 'w-1', px: '4px' },
                  { token: 'space-2 (8px)', width: 'w-2', px: '8px' },
                  { token: 'space-3 (12px)', width: 'w-3', px: '12px' },
                  { token: 'space-4 (16px)', width: 'w-4', px: '16px' },
                  { token: 'space-6 (24px)', width: 'w-6', px: '24px' },
                  { token: 'space-8 (32px)', width: 'w-8', px: '32px' },
                  { token: 'space-12 (48px)', width: 'w-12', px: '48px' },
                  { token: 'space-16 (64px)', width: 'w-16', px: '64px' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className={`w-32 font-mono ${textMuted}`}>{item.token}</span>
                    <div className="h-3 bg-amber-500 rounded" style={{ width: item.px }}></div>
                    <span className="text-amber-400 font-mono text-[11px]">{item.px}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Nested Radius Calculator */}
            <div className={`p-5 rounded-xl border ${cardBg} space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Interactive Nested Radius Calculator</h3>
              <p className={`text-xs ${textMuted}`}>
                Prevents awkward corner gaps when placing child cards inside parent containers.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className={`block mb-1 font-medium ${textHeading}`}>Outer Radius: {outerRadius}px</label>
                  <input
                    type="range" min="8" max="32" value={outerRadius}
                    onChange={(e) => setOuterRadius(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className={`block mb-1 font-medium ${textHeading}`}>Container Padding: {cardPadding}px</label>
                  <input
                    type="range" min="4" max="24" value={cardPadding}
                    onChange={(e) => setCardPadding(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Live Preview Container */}
              <div
                className="bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center transition-all duration-200"
                style={{ borderRadius: `${outerRadius}px`, padding: `${cardPadding}px` }}
              >
                <div
                  className="bg-slate-900 border border-amber-400 text-amber-300 p-4 w-full text-center text-xs font-mono font-bold transition-all duration-200"
                  style={{ borderRadius: `${calculatedInnerRadius}px` }}
                >
                  Inner Card (Radius: {calculatedInnerRadius}px)
                </div>
              </div>
              <p className="text-[11px] text-center font-mono text-amber-400">
                Calculated Formula: {outerRadius}px (Outer) - {cardPadding}px (Padding) = {calculatedInnerRadius}px (Inner)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: GRID SYSTEM */}
      {activeSection === 'grid' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>4. Asymmetric 12-Column Responsive Grid</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Desktop-first layout fluidity with 16px/24px gutters, max-width 1280px (`max-w-7xl`), and custom luxury bento grid distribution.
            </p>
          </div>

          <div className={`p-5 rounded-xl border ${cardBg} space-y-4`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">12-Column Grid Simulation</h3>
            <div className="grid grid-cols-12 gap-2 text-center text-[10px] font-mono font-bold">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-amber-500/20 border border-amber-500/40 text-amber-300 py-3 rounded">
                  Col {i + 1}
                </div>
              ))}
            </div>

            {/* Common Luxury Layout Spans */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 pt-2">Luxury Layout Spans</h3>
            <div className="space-y-3 text-xs">
              {/* 8 + 4 Hero / Sidebar */}
              <div className="grid grid-cols-12 gap-3 text-center">
                <div className="col-span-8 bg-slate-900 border border-amber-500/30 text-amber-300 py-4 rounded-xl flex items-center justify-center font-semibold">
                  Main Content / Featured Product Banner (Col 8)
                </div>
                <div className="col-span-4 bg-slate-900 border border-amber-500/30 text-amber-300 py-4 rounded-xl flex items-center justify-center font-semibold">
                  Sidebar / Filters (Col 4)
                </div>
              </div>

              {/* 4 + 4 + 4 Product Grid */}
              <div className="grid grid-cols-12 gap-3 text-center">
                <div className="col-span-4 bg-slate-900 border border-amber-500/30 text-amber-300 py-3 rounded-xl font-semibold">Product 1 (Col 4)</div>
                <div className="col-span-4 bg-slate-900 border border-amber-500/30 text-amber-300 py-3 rounded-xl font-semibold">Product 2 (Col 4)</div>
                <div className="col-span-4 bg-slate-900 border border-amber-500/30 text-amber-300 py-3 rounded-xl font-semibold">Product 3 (Col 4)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: BUTTON STYLES */}
      {activeSection === 'buttons' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>5. Luxury Button & CTA System</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Tactile hover states, micro gold sheen sweep, loading spinners, and pill tags.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Gold Foil Solid */}
              <div className="space-y-2 text-center">
                <span className={`text-xs font-mono block ${textMuted}`}>Primary Gold Foil</span>
                <button className="w-full relative overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider group">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Secondary Noir Outline */}
              <div className="space-y-2 text-center">
                <span className={`text-xs font-mono block ${textMuted}`}>Secondary Outline</span>
                <button className="w-full bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider">
                  Book VIP Consultation
                </button>
              </div>

              {/* Ghost Silk Link */}
              <div className="space-y-2 text-center">
                <span className={`text-xs font-mono block ${textMuted}`}>Ghost Underline Link</span>
                <button className="inline-flex items-center space-x-1 text-amber-400 font-serif font-bold text-sm hover:text-amber-300 relative group py-2">
                  <span>View Weaving Process</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>

              {/* Loading State Button */}
              <div className="space-y-2 text-center">
                <span className={`text-xs font-mono block ${textMuted}`}>Loading Interactive</span>
                <button
                  onClick={() => {
                    setLoadingState(true);
                    setTimeout(() => setLoadingState(false), 2000);
                  }}
                  disabled={loadingState}
                  className="w-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  {loadingState ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Click to Test Spinner</span>
                  )}
                </button>
              </div>
            </div>

            {/* Icon Buttons & Badge Pills */}
            <div className="border-t border-amber-500/10 pt-4 space-y-3">
              <span className={`text-xs font-mono block ${textMuted}`}>Icon Buttons & Action Chips</span>
              <div className="flex flex-wrap items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-amber-500/40 bg-slate-900 text-amber-400 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all shadow-md">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-amber-500/40 bg-slate-900 text-amber-400 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all shadow-md">
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-amber-500/40 bg-slate-900 text-amber-400 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all shadow-md">
                  <Search className="w-4 h-4" />
                </button>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>100% Pure Silk Certified</span>
                </span>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free Express Delivery</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CARDS & BENTO GRID */}
      {activeSection === 'cards' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>6. Cards & Bento Grid Layouts</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Luxury product display, editorial collection banners, and testimonial social proof tiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Tile 1 */}
            <div className={`p-6 rounded-2xl border ${cardBg} space-y-4 relative overflow-hidden`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">Handcrafted Heritage</span>
                <h3 className={`text-xl font-serif font-bold ${textHeading}`}>Varanasi Gold Zari Weaves</h3>
                <p className={`text-xs mt-2 leading-relaxed ${textMuted}`}>
                  Hand-loom woven in Varanasi with authentic gold tested threads, featuring intricate floral bel & peacock motifs.
                </p>
              </div>
              <button className="text-xs font-bold text-amber-400 flex items-center space-x-1 hover:translate-x-1 transition-transform">
                <span>Explore Varanasi Sarees</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bento Tile 2 (Testimonial Card) */}
            <div className={`p-6 rounded-2xl border ${cardBg} space-y-4 flex flex-col justify-between`}>
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-xs italic leading-relaxed ${textHeading}`}>
                  "The Kanjeevaram silk saree I ordered for my wedding reception was absolute perfection. The heavy gold border and luster exceeded all expectations!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-3 border-t border-amber-500/10">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  PD
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textHeading}`}>Priya Deshmukh</h4>
                  <span className={`text-[10px] ${textMuted}`}>Verified Buyer • Mumbai</span>
                </div>
              </div>
            </div>

            {/* Bento Tile 3 (Trust Badge Card) */}
            <div className={`p-6 rounded-2xl border ${cardBg} space-y-4`}>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className={`text-lg font-serif font-bold ${textHeading}`}>BALAJI Promise</h3>
              </div>
              <ul className={`text-xs space-y-2.5 ${textMuted}`}>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Silk Mark India Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Easy 7-Day Hassle-Free Exchange</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Insured Express Global Courier</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: FORMS & INPUTS */}
      {activeSection === 'forms' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>7. Forms & Luxury Controls</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Floating labels, variant radio chips, custom checkboxes, and instant search fields with keyboard shortcuts.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-6 max-w-2xl`}>
            {/* Search Input with Shortcut Hint */}
            <div className="space-y-1.5">
              <label className={`text-xs font-mono block ${textMuted}`}>Search Field with Keyboard Shortcut Hint</label>
              <div className="relative">
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search Banarasi, Kanjeevaram, Organza..."
                  className={`w-full pl-10 pr-12 py-2.5 rounded-xl text-xs border transition-all focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                  }`}
                />
                <kbd className="absolute right-3 top-3 text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Floating Label Luxury Field */}
            <div className="space-y-1.5">
              <label className={`text-xs font-mono block ${textMuted}`}>Luxury Floating Label Textfield</label>
              <input
                type="text"
                defaultValue="Ananya Sharma"
                className={`w-full px-4 py-3 rounded-xl text-xs border transition-all focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            {/* Variant Selectors (Size & Color) */}
            <div className="space-y-2">
              <label className={`text-xs font-mono block ${textMuted}`}>Variant Chips (Size / Blouse Size)</label>
              <div className="flex items-center space-x-2">
                {['XS', 'S', 'M', 'L', 'XL', 'Custom Stitched'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setActiveSize(sz)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      activeSize === sz
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/50'
                          : 'bg-stone-100 border-stone-300 text-stone-700 hover:border-amber-500/50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Checkbox */}
            <div className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                id="giftWrap"
                defaultChecked
                className="w-4 h-4 accent-amber-500 rounded border-slate-700 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="giftWrap" className={`cursor-pointer ${textHeading}`}>
                Add BALAJI Luxury Gift Box & Handwritten Personal Note (+₹250)
              </label>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: NAVIGATION & FOOTER */}
      {activeSection === 'nav' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>8. Navigation Header & Footer Specification</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Marquee announcement bar, sticky serif brand header, mega menu navigation, and dark footer motif.
            </p>
          </div>

          <div className="space-y-6">
            {/* Top Marquee Bar */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-center py-1.5 px-4 text-xs font-bold tracking-wider uppercase">
              ✨ Free Worldwide Express Shipping on Orders Above ₹10,000 | Code: <span className="underline">ROYAL2026</span> ✨
            </div>

            {/* Brand Header */}
            <div className={`p-4 rounded-xl border ${cardBg} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-serif font-extrabold flex items-center justify-center text-lg">
                  B
                </div>
                <span className="font-serif text-xl font-bold tracking-wider text-amber-400">BALAJI</span>
              </div>

              <div className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
                <span className="text-amber-400 border-b-2 border-amber-400 pb-1">Banarasi Sarees</span>
                <span className={textMuted}>Kanjeevaram</span>
                <span className={textMuted}>Lehengas</span>
                <span className={textMuted}>Festive Collections</span>
                <span className={textMuted}>Heritage Story</span>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <button className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all relative">
                  <Heart className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">2</span>
                </button>
                <button className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all relative">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">1</span>
                </button>
              </div>
            </div>

            {/* Footer Component Mock */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-slate-300 text-xs space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-serif font-bold flex items-center justify-center text-sm">B</div>
                    <span className="font-serif text-lg font-bold text-amber-400">BALAJI</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Purveyors of finest Indian bridal sarees, pure silk handlooms, and regal ethnic couture since 1994.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Collections</h4>
                  <ul className="space-y-1 text-slate-400 text-[11px]">
                    <li>Royal Banarasi Brocade</li>
                    <li>Pure Silk Kanjeevaram</li>
                    <li>Chanderi Tissue Sarees</li>
                    <li>Bridal Trousseau</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Customer Care</h4>
                  <ul className="space-y-1 text-slate-400 text-[11px]">
                    <li>Silk Mark Certificate</li>
                    <li>Order Tracking & Shipping</li>
                    <li>Blouse Customization</li>
                    <li>Contact Concierge</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Newsletter</h4>
                  <p className="text-[11px] text-slate-400">Receive private collection previews & festive invitations.</p>
                  <div className="flex items-center space-x-1">
                    <input type="email" placeholder="Your email..." className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs w-full text-white" />
                    <button className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shrink-0">Join</button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
                <span>© 2026 BALAJI Luxury Fashion Pvt Ltd. All rights reserved.</span>
                <span className="font-mono text-amber-500/80">Secured with 256-bit SSL • Razorpay Merchant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: HERO SECTION */}
      {activeSection === 'hero' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>9. Hero Editorial Banner Showcase</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Editorial luxury layout featuring serif display headlines, gold CTAs, and background atmospheric gradient.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full">
                FESTIVE BRIDAL EDITION 2026
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Timeless Elegance Woven in Pure Gold Zari
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Explore over 500+ master-crafted Banarasi & Kanjeevaram silk sarees directly from certified weaver looms in Varanasi & Kanchipuram.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 text-xs uppercase tracking-wider flex items-center space-x-2">
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-slate-900/80 border border-amber-500/40 text-amber-300 font-bold px-6 py-3 rounded-xl hover:bg-slate-900 text-xs uppercase tracking-wider">
                  Book Virtual Video Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: PRODUCT CARDS */}
      {activeSection === 'product' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>10. Interactive Product Card Component</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Portrait 3:4 aspect ratio, quick size picker hover drawer, heart wishlist animation, discount badges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Sample */}
            <div className={`rounded-2xl border ${cardBg} overflow-hidden group shadow-lg transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1`}>
              <div className="relative aspect-[3/4] bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* Visual Placeholder Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                <div className="w-32 h-44 rounded-xl border-2 border-amber-500/30 bg-amber-500/5 flex flex-col items-center justify-center text-amber-400 space-y-2 p-4 text-center">
                  <Sparkles className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-serif text-xs font-bold">Royal Banarasi Silk Saree</span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col space-y-1">
                  <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    BESTSELLER
                  </span>
                  <span className="bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    20% OFF
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setWishlistActive(!wishlistActive)}
                  className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700 text-amber-400 flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <Heart className={`w-4 h-4 ${wishlistActive ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Pure Silk • Crimson Red</span>
                <h3 className={`font-serif text-base font-bold ${textHeading} truncate`}>
                  Varanasi Handloom Kadwa Zari Saree
                </h3>

                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold font-mono text-amber-400">₹24,500</span>
                  <span className="text-xs font-mono text-slate-500 line-through">₹30,000</span>
                </div>

                <button className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all">
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 11: HOVER EFFECTS & ANIMATIONS */}
      {activeSection === 'effects' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>11. Micro-Interactions & CSS Keyframe Animations</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Subtle, non-distracting UI motion specs designed for luxury feel.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-4`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 block">Sheen Pass Sweep</span>
                <div className="relative overflow-hidden bg-amber-500/20 text-amber-300 font-bold p-3 rounded-lg text-xs group cursor-pointer">
                  <span>Hover to Sweep</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 block">Scale 1.05 Smooth Zoom</span>
                <div className="overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-3 group cursor-pointer">
                  <span className="inline-block group-hover:scale-105 transition-transform duration-300 text-amber-300 font-bold text-xs">
                    Hover Scale Effect
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 block">Pulse Glow Halo</span>
                <div className="animate-pulse bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold p-3 rounded-lg text-xs">
                  Constant Ambient Pulse
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 12: ICONS & SHADOWS */}
      {activeSection === 'icons' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>12. Icon System & Ambient Shadow Tokens</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Categorized Lucide vector icon set framed in gold foil badges alongside multi-layered ambient shadow tokens.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">E-Commerce Vector Icon Library</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {[
                  { icon: ShoppingBag, label: 'Cart' },
                  { icon: Heart, label: 'Wishlist' },
                  { icon: Search, label: 'Search' },
                  { icon: ShieldCheck, label: 'Authentic' },
                  { icon: Sparkles, label: 'Featured' },
                  { icon: Truck, label: 'Express Ship' },
                  { icon: Award, label: 'Cert Mark' },
                  { icon: Lock, label: 'SSL Secure' },
                ].map((ic, i) => {
                  const IconComp = ic.icon;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center space-y-1.5 text-amber-400">
                      <IconComp className="w-5 h-5" />
                      <span className="text-[10px] font-mono text-slate-400">{ic.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-amber-500/10 pt-4 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Multi-Layered Shadow Tokens</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
                <div className="p-4 rounded-xl bg-slate-900 shadow-md border border-slate-800 text-slate-300">
                  <span className="font-mono text-amber-400 block mb-1">Shadow Soft</span>
                  <code>0 4px 12px -2px rgba(0,0,0,0.08)</code>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 shadow-xl border border-slate-800 text-slate-300">
                  <span className="font-mono text-amber-400 block mb-1">Shadow Medium</span>
                  <code>0 12px 24px -4px rgba(0,0,0,0.15)</code>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 shadow-2xl shadow-amber-500/20 border border-amber-500/40 text-amber-300">
                  <span className="font-mono text-amber-400 block mb-1">Shadow Gold Ambient Glow</span>
                  <code>0 20px 40px -10px rgba(212,175,55,0.2)</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 13: LOADING SCREEN */}
      {activeSection === 'loader' && (
        <div className="space-y-6">
          <div className="border-b border-amber-500/20 pb-3">
            <h2 className={`text-xl font-serif font-bold ${textHeading}`}>13. Luxury Loading Overlay & Skeleton Screens</h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Full-screen branded initial splash screen & shimmering skeleton loaders for fast perceived performance.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-sm font-bold ${textHeading}`}>Full-Screen Splash Screen Demo</h3>
                <p className={`text-xs ${textMuted}`}>Click to simulate app boot loading animation.</p>
              </div>
              <button
                onClick={() => {
                  setShowLoadingOverlay(true);
                  setTimeout(() => setShowLoadingOverlay(false), 2500);
                }}
                className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-amber-400"
              >
                Trigger Loading Screen
              </button>
            </div>

            {/* Skeleton Card Preview */}
            <div className="space-y-2">
              <span className={`text-xs font-mono block ${textMuted}`}>Product Grid Skeleton Shimmer</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-pulse">
                    <div className="aspect-[3/4] bg-slate-900 rounded-lg"></div>
                    <div className="h-3 bg-slate-900 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-900 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Loading Overlay Simulation */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-serif font-bold text-3xl flex items-center justify-center animate-pulse shadow-2xl shadow-amber-500/30">
            B
          </div>
          <span className="font-serif text-2xl font-bold tracking-widest text-amber-400">BALAJI</span>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Loading Pure Silk Collections...</span>
          </p>
        </div>
      )}
    </div>
  );
};
