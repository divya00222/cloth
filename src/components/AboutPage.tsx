import React, { useState } from 'react';
import { 
  Sparkles, Award, ShieldCheck, Heart, Users, Calendar, MapPin, 
  ArrowRight, Star, CheckCircle2, Clock, Eye, Code, Compass,
  Building, Feather, Crown, ChevronRight, ExternalLink, RefreshCw
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');

  // Interactive timeline filter
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const timelineEvents = [
    {
      year: '1994',
      era: 'foundation',
      title: 'Humble Inception in Varanasi',
      subtitle: 'Godowlia Crossing Handloom Guild',
      description: 'Founded by Master Weaver Shri Ramnath Ji with just 3 pit looms in Varanasi, dedicated to reviving authentic Kadwa gold zari weaving.',
      badge: 'FOUNDATION'
    },
    {
      year: '2005',
      era: 'expansion',
      title: 'Kanchipuram Silk Guild Alliance',
      subtitle: 'Expansion into Mulberry Silk',
      description: 'Partnered with over 80 traditional weaver families in Kanchipuram to introduce pure Temple Border Kanjeevaram sarees to Northern India.',
      badge: 'ALLIANCE'
    },
    {
      year: '2014',
      era: 'expansion',
      title: 'Silk Mark India Accreditation',
      subtitle: '100% Purity Certification',
      description: 'Became one of the first handloom houses in Uttar Pradesh to mandate 100% Silk Mark India holographic authenticity tags on every saree.',
      badge: 'CERTIFICATION'
    },
    {
      year: '2020',
      era: 'digital',
      title: 'Global Direct-to-Bride E-Commerce',
      subtitle: 'Connecting Looms to World',
      description: 'Launched direct insured international courier shipping to North America, UK, UAE, and Australia, eliminating middlemen markups.',
      badge: 'GLOBAL DROP'
    },
    {
      year: '2026',
      era: 'digital',
      title: 'AI Blouse Tailoring & Digital Flagship',
      subtitle: 'Couture Customization Engine',
      description: 'Empowering 500+ weaver looms with real-time video shopping consultations and automated custom zardozi blouse fitting.',
      badge: 'MILESTONE'
    }
  ];

  const filteredTimeline = selectedEra === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(e => e.era === selectedEra);

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-200 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BALAJI Luxury Heritage Module</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Dedicated Brand Story & About Us Page
          </h2>
          <p className="text-xs text-slate-400">
            Showcasing 32 years of handloom weaving, mission, vision, team, and flagship showrooms.
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
            <span>Live Page Preview</span>
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
            <span>View CSS/JS Code</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: LIVE PAGE PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 space-y-16 pb-16">
          
          {/* 1. EDITORIAL HERO SECTION */}
          <section className="relative min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 px-4 sm:px-6 lg:px-8 py-20 text-center overflow-hidden border-b border-amber-500/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-crimson-800/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-inner">
                OUR HERITAGE & LEGACY • EST. 1994
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                32 Years of Preserving India’s <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
                  Golden Handloom Heritage
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
                From 3 traditional pit looms in Varanasi to empowering 500+ master weaver families across Varanasi & Kanchipuram. Discover the sacred craftsmanship behind every BALAJI weave.
              </p>
            </div>
          </section>

          {/* 2. COMPANY STORY */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">THE GENESIS</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                    Woven with Devotion, <br />Crafted for Generations
                  </h2>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  Founded in 1994 near the sacred Dashashwamedh Ghat in Varanasi, BALAJI began as a small weaving collective dedicated to protecting pure silk Kadwa zardozi techniques from power-loom commercialization.
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Over three decades, we have remained steadfast in our commitment: zero synthetic blends, direct-from-loom transparent pricing, and absolute reverence for the weaver’s art. Today, BALAJI sarees adorn royalty, celebrities, and brides across 45 countries.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                    <span className="text-2xl font-serif font-bold text-amber-400">100% Pure</span>
                    <span className="text-[11px] font-mono text-slate-400 block">Mulberry & Katan Silk</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                    <span className="text-2xl font-serif font-bold text-amber-400">500+ Looms</span>
                    <span className="text-[11px] font-mono text-slate-400 block">Artisan Master Weavers</span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase Box */}
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-amber-950/50 border border-amber-500/30 p-8 space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Crown className="w-8 h-8" />
                </div>
                <blockquote className="font-serif text-lg sm:text-xl text-amber-200 italic leading-relaxed">
                  "A true Banarasi or Kanjeevaram saree is not merely fabric — it is an heirloom carrying the soul of the artisan who spent months weaving every thread."
                </blockquote>
                <div className="pt-4 border-t border-amber-500/20 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-bold font-serif flex items-center justify-center text-lg">
                    RJ
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Shri Ramnath Ji</h4>
                    <span className="text-xs text-amber-400/80 font-mono">Founder & Master Weaver • Varanasi</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MISSION & VISION */}
          <section className="bg-slate-950 border-y border-amber-500/20 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">OUR PURPOSE</span>
                <h2 className="text-3xl font-serif font-bold text-white">Mission & Vision</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-amber-500/50 transition-colors shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Feather className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To preserve India's priceless handloom weaving traditions by providing master artisans with sustainable livelihoods, fair wages, and a direct digital bridge to global bridal customers without middleman exploitation.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-amber-500/50 transition-colors shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Our Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To be globally recognized as the premier authentic Indian silk house, where heritage craftsmanship seamlessly converges with modern luxury e-commerce and personalized virtual bridal consultations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. JOURNEY TIMELINE */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">HISTORICAL CHRONICLE</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Our 32-Year Weaving Journey</h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedEra('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedEra === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  All Eras
                </button>
                <button
                  onClick={() => setSelectedEra('foundation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedEra === 'foundation' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  1994 Roots
                </button>
                <button
                  onClick={() => setSelectedEra('digital')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedEra === 'digital' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Modern Era
                </button>
              </div>
            </div>

            <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
              {filteredTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:bg-amber-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:bg-slate-950"></div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-colors shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl font-bold text-amber-400">{item.year}</span>
                      <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. STORE IMAGES / SHOWROOM GALLERY */}
          <section className="bg-slate-950 border-y border-amber-500/20 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">PHYSICAL SANCTUARIES</span>
                <h2 className="text-3xl font-serif font-bold text-white">Our Flagship Showrooms</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { city: 'Varanasi Flagship', address: 'Dashashwamedh Road, Varanasi', size: '12,000 Sq. Ft Gallery', color: 'from-[#800020] to-black' },
                  { city: 'Bengaluru Experience Store', address: 'Indiranagar 100ft Road, Bengaluru', size: '8,500 Sq. Ft Lounge', color: 'from-[#004B49] to-black' },
                  { city: 'Mumbai Couture Lounge', address: 'Kala Ghoda, South Mumbai', size: '6,000 Sq. Ft VIP Suite', color: 'from-[#D4AF37]/80 to-black' }
                ].map((store, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all shadow-xl space-y-4">
                    <div className={`h-48 bg-gradient-to-br ${store.color} flex flex-col items-center justify-center p-6 text-center text-amber-300 space-y-2 group-hover:scale-105 transition-transform duration-500`}>
                      <Building className="w-10 h-10 text-amber-400" />
                      <span className="font-serif text-lg font-bold text-white">{store.city}</span>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{store.address}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 block">{store.size} • Private VIP Bridal Fitting Rooms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. ACHIEVEMENTS & 7. CUSTOMER SATISFACTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-2xl space-y-8 border border-amber-300">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="bg-slate-950 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  MILESTONES & TRUST
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black">Accreditations & Customer Delight</h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="bg-slate-950/90 text-amber-300 p-6 rounded-2xl border border-amber-400/40 space-y-1">
                  <span className="text-3xl font-black font-serif text-white">99.4%</span>
                  <span className="text-xs font-mono block text-amber-400">Customer Satisfaction</span>
                </div>
                <div className="bg-slate-950/90 text-amber-300 p-6 rounded-2xl border border-amber-400/40 space-y-1">
                  <span className="text-3xl font-black font-serif text-white">120K+</span>
                  <span className="text-xs font-mono block text-amber-400">Brides Outfitted</span>
                </div>
                <div className="bg-slate-950/90 text-amber-300 p-6 rounded-2xl border border-amber-400/40 space-y-1">
                  <span className="text-3xl font-black font-serif text-white">100%</span>
                  <span className="text-xs font-mono block text-amber-400">Silk Mark Certified</span>
                </div>
                <div className="bg-slate-950/90 text-amber-300 p-6 rounded-2xl border border-amber-400/40 space-y-1">
                  <span className="text-3xl font-black font-serif text-white">45+</span>
                  <span className="text-xs font-mono block text-amber-400">Countries Shipped</span>
                </div>
              </div>
            </div>
          </section>

          {/* 8. TEAM SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">ARTISANS & LEADERSHIP</span>
              <h2 className="text-3xl font-serif font-bold text-white">The Guardians of Craft</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Shri Ramnath Ji', role: 'Founder & Master Weaver', experience: '42 Years Experience', location: 'Varanasi Guild' },
                { name: 'Sunita Sharma', role: 'Creative & Textile Director', experience: 'NIFT Alumna • 18 Yrs', location: 'Design Studio' },
                { name: 'Rajesh Kumar', role: 'Head of Quality Assurance', experience: 'Master Silk Tester', location: 'Testing Lab' }
              ].map((member, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 hover:border-amber-500/50 transition-colors shadow-lg">
                  <div className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-xl">
                    {member.name.split(' ')[1]?.[0] || 'B'}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">{member.name}</h3>
                    <span className="text-xs text-amber-400 font-mono block">{member.role}</span>
                    <span className="text-[11px] text-slate-400 font-mono block mt-1">{member.experience} • {member.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. CALL TO ACTION */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full">
                BEGIN YOUR HERITAGE TROUSSEAU JOURNEY
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Experience Handloom Elegance Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Book a 1-on-1 virtual video consultation with our senior saree stylists or schedule an exclusive VIP appointment at our Varanasi flagship store.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="#home"
                  className="bg-amber-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/20 hover:bg-amber-400 text-xs uppercase tracking-widest flex items-center space-x-2"
                >
                  <span>Book Virtual Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VIEW MODE 2: SOURCE CODE INSPECTOR (CSS / JS / HTML) */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">about.html / style.css / main.js Source Code</h3>
              <p className="text-xs text-slate-400">Pure, zero-framework, Hostinger-ready source code files.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'html' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                about.html
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'css' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'js' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                main.js
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'html' && `<!-- pages/about.php or about.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About Us — BALAJI Handloom Sarees</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="bg-noir">
  <?php include 'includes/header.php'; ?>

  <main class="about-page">
    <section class="hero-about text-center">
      <h1>32 Years of Preserving India's Golden Handloom Heritage</h1>
      <p>From 3 traditional pit looms in Varanasi to empowering 500+ master weavers.</p>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision-grid">
      <div class="card">
        <h3>Our Mission</h3>
        <p>Preserving weaving traditions with direct-from-loom transparent pricing.</p>
      </div>
      <div class="card">
        <h3>Our Vision</h3>
        <p>Global leader in authentic Indian silk and digital bridal consultations.</p>
      </div>
    </section>
  </main>

  <?php include 'includes/footer.php'; ?>
  <script src="/assets/js/main.js"></script>
</body>
</html>`}

            {activeCodeTab === 'css' && `/* assets/css/style.css - About Page Styles */
.about-page {
  background-color: #0B0C10;
  color: #FBF9F5;
}

.hero-about {
  padding: 80px 20px;
  background: linear-gradient(135deg, #0B0C10 0%, #1A1B20 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.hero-about h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  color: #D4AF37;
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 60px 20px;
}`}

            {activeCodeTab === 'js' && `// assets/js/main.js - About Page Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Timeline Era Filter
  const eraFilterButtons = document.querySelectorAll('.era-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  eraFilterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const era = e.target.dataset.era;
      timelineItems.forEach(item => {
        if (era === 'all' || item.dataset.era === era) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});`}
          </pre>
        </div>
      )}
    </div>
  );
};
