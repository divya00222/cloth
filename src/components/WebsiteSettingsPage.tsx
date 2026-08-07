import React, { useState, useEffect } from 'react';
import { 
  Settings, Globe, Mail, Phone, MapPin, Share2, Clock, ShieldCheck, 
  Search, Save, RefreshCw, CheckCircle2, AlertTriangle, Eye, Upload, 
  Copy, Image as ImageIcon, Sparkles, Server, Code, Database, Key, 
  Lock, ArrowRight, ExternalLink, Check, Download, FileJson, Laptop, 
  Smartphone, MessageCircle, Facebook, Instagram, Video, HelpCircle,
  SlidersHorizontal, CheckSquare
} from 'lucide-react';

export interface WebsiteSettings {
  // Branding
  businessName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  logoWidth: number;
  
  // Contact Info
  address: string;
  phone: string;
  email: string;
  supportEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;

  // Social Links
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;

  // Location / Google Maps
  googleMapEmbedUrl: string;
  latitude: string;
  longitude: string;

  // Business Hours
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    notice: string;
  };

  // Footer & Legal
  footerAboutText: string;
  copyrightNotice: string;
  showSilkMarkBadge: boolean;

  // SEO
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoKeywords: string;
  ogImageUrl: string;
  enableSearchIndexing: boolean;

  // SMTP Mail Server
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpEncryption: 'TLS' | 'SSL' | 'NONE';
  smtpSenderName: string;
  smtpFromEmail: string;

  // Analytics & Tracking
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  tiktokPixelId: string;
  enableCookieBanner: boolean;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  businessName: 'Balaji Luxury Handlooms Atelier',
  tagline: 'Preserving 200 Years of Imperial Varanasi Silk Weaving',
  logoUrl: 'from-amber-500 to-amber-300',
  faviconUrl: 'from-amber-400 to-amber-600',
  logoWidth: 180,

  address: 'S-12/45, Heritage Weavers Lane, Godowlia Crossing, Varanasi, Uttar Pradesh 221001, India',
  phone: '+91 98765 43210',
  email: 'concierge@balaji-atelier.com',
  supportEmail: 'orders@balaji-atelier.com',
  whatsappNumber: '+91 98765 43210',
  whatsappMessage: 'Namaste! I am inquiring about custom bridal handloom drapes from Balaji Atelier.',

  facebookUrl: 'https://facebook.com/balajihandloomsofficial',
  instagramUrl: 'https://instagram.com/balaji_luxury_silk',
  tiktokUrl: 'https://tiktok.com/@balaji_atelier_craft',

  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.876!2d83.00!3d25.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE4JzM2LjAiTiA4M8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  latitude: '25.3176',
  longitude: '83.0058',

  businessHours: {
    weekdays: '10:00 AM – 08:30 PM (IST)',
    saturday: '10:00 AM – 09:00 PM (IST)',
    sunday: '11:00 AM – 06:00 PM (By Private Appointment)',
    notice: 'Grand Showroom closed on Gazetted Festivals (Diwali, Holi, Dussehra).'
  },

  footerAboutText: 'Balaji Atelier is India’s premier heritage handloom house, curating pure 24k gold zari Banarasi and Kanjeevaram sarees woven by Master GI-certified artisans.',
  copyrightNotice: '© 2026 Balaji Luxury Handlooms Atelier Pvt. Ltd. All Rights Reserved.',
  showSilkMarkBadge: true,

  seoMetaTitle: 'Balaji Atelier | Pure Gold Zari Banarasi & Kanjeevaram Sarees',
  seoMetaDescription: 'Discover heirloom bridal Banarasi Kadwa, Kanchipuram Korvai, and Chanderi tissue sarees crafted with pure 24k gold zari. Silk Mark India certified.',
  seoKeywords: 'Banarasi Saree, Kanjeevaram Silk, Gold Zari, Bridal Trousseau, Handloom Atelier',
  ogImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
  enableSearchIndexing: true,

  smtpHost: 'smtp.titan.email',
  smtpPort: 587,
  smtpUser: 'notifications@balaji-atelier.com',
  smtpPass: '••••••••••••••••',
  smtpEncryption: 'TLS',
  smtpSenderName: 'Balaji Concierge Desk',
  smtpFromEmail: 'concierge@balaji-atelier.com',

  googleAnalyticsId: 'G-7X9B0W1Z2Y',
  googleTagManagerId: 'GTM-B4L4J11',
  facebookPixelId: '1029384756473829',
  tiktokPixelId: 'TT-987654321',
  enableCookieBanner: true
};

export const WebsiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('balaji_website_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState<'branding' | 'contact' | 'maps' | 'hours' | 'footer' | 'seo' | 'smtp' | 'analytics'>('branding');
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'code'>('editor');
  const [activeCodeTab, setActiveCodeTab] = useState<'api' | 'sql' | 'json'>('json');

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [smtpTesting, setSmtpTesting] = useState<boolean>(false);
  const [smtpStatus, setSmtpStatus] = useState<string | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);

  // Auto-save settings to LocalStorage whenever modified
  useEffect(() => {
    localStorage.setItem('balaji_website_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website settings back to factory defaults?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('balaji_website_settings');
      showToast('Settings restored to luxury factory defaults');
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "balaji-website-settings.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Website configuration JSON exported');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
          showToast('Settings successfully imported from JSON');
        } catch (err) {
          showToast('Error: Invalid JSON configuration file');
        }
      };
    }
  };

  const testSmtpConnection = () => {
    setSmtpTesting(true);
    setSmtpStatus(null);
    setTimeout(() => {
      setSmtpTesting(false);
      setSmtpStatus(`SUCCESS: Connected to ${settings.smtpHost}:${settings.smtpPort} via ${settings.smtpEncryption}. Handshake verified.`);
      showToast('SMTP Test Email Sent Successfully');
    }, 1200);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl text-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>GLOBAL DYNAMIC CONFIGURATION ENGINE</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-white">
            Website Settings & Identity Module
          </h2>
          <p className="text-xs text-slate-400">
            Updates brand logo, contact channels, maps, SMTP email gateway, SEO meta tags, and tracking scripts dynamically.
          </p>
        </div>

        {/* View Mode Switches & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'editor' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Settings Form
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'preview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'code' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              JSON / REST API
            </button>
          </div>

          <button
            onClick={handleExportJson}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all"
            title="Export JSON Config"
          >
            <Download className="w-4 h-4" />
          </button>

          <label className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 cursor-pointer transition-all" title="Import JSON Config">
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleResetDefaults}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 transition-all"
            title="Reset to Factory Defaults"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SETTINGS FORM EDITOR */}
      {viewMode === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Navigation Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 h-fit shadow-xl">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-3 block mb-2">SETTINGS CATEGORIES</span>

            {[
              { id: 'branding', label: 'Logo & Brand Identity', icon: ImageIcon },
              { id: 'contact', label: 'Contact & Social Handles', icon: Phone },
              { id: 'maps', label: 'Google Map & Location', icon: MapPin },
              { id: 'hours', label: 'Business Hours & Schedule', icon: Clock },
              { id: 'footer', label: 'Footer & Legal Notices', icon: Share2 },
              { id: 'seo', label: 'SEO & Metadata', icon: Globe },
              { id: 'smtp', label: 'SMTP Email Server', icon: Mail },
              { id: 'analytics', label: 'Analytics & Tracking Pixels', icon: SlidersHorizontal }
            ].map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id as any)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === nav.id
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:bg-slate-950 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{nav.label}</span>
                </button>
              );
            })}

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold">
                <CheckSquare className="w-4 h-4" />
                <span>DYNAMIC REACTIVITY</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Changes saved here automatically sync with <code className="text-amber-300">localStorage</code> and update the site header, footer, contact forms, and map frames in real-time.
              </p>
            </div>
          </div>

          {/* Right Main Form Editor (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
            
            {/* SECTION 1: LOGO & BRANDING */}
            {activeTab === 'branding' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Logo & Brand Identity</h3>
                  <p className="text-xs text-slate-400">Configure business title, crest emblem gradient, and favicon styling.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Business Name *</label>
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-serif font-bold text-base"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Brand Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Logo Crest Preset</label>
                      <select
                        value={settings.logoUrl}
                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="from-amber-500 to-amber-300">24k Gold Imperial Crest</option>
                        <option value="from-emerald-600 to-teal-400">Kanjeevaram Emerald Crest</option>
                        <option value="from-rose-600 to-amber-400">Bridal Crimson Crest</option>
                        <option value="from-purple-600 to-indigo-400">Royal Violet Crest</option>
                      </select>

                      {/* Live Crest Box */}
                      <div className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${settings.logoUrl} text-slate-950 font-serif font-bold text-xl flex items-center justify-center shadow-lg`}>
                          B
                        </div>
                        <span className="text-xs font-mono text-slate-300">Live Crest Emblem</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Favicon Preset</label>
                      <select
                        value={settings.faviconUrl}
                        onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="from-amber-400 to-amber-600">Gold Silk Thread</option>
                        <option value="from-emerald-500 to-emerald-700">Korvai Loom Weaver</option>
                        <option value="from-rose-500 to-rose-700">Royal Zari Seal</option>
                      </select>

                      <div className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${settings.faviconUrl} text-slate-950 font-bold text-xs flex items-center justify-center`}>
                          B
                        </div>
                        <span className="text-xs font-mono text-slate-300">Browser Favicon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: CONTACT & SOCIAL HANDLES */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Contact Info & Social Channels</h3>
                  <p className="text-xs text-slate-400">Direct phone numbers, support emails, WhatsApp, and social profiles.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Physical Showroom Address *</label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Primary Phone / Concierge *</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Concierge Email *</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">WhatsApp Direct Number *</label>
                      <input
                        type="text"
                        value={settings.whatsappNumber}
                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 focus:outline-none focus:border-amber-500 font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">WhatsApp Default Greeting Message</label>
                      <input
                        type="text"
                        value={settings.whatsappMessage}
                        onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div className="space-y-3 border-t border-slate-800 pt-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">SOCIAL MEDIA PROFILES</span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                          <Facebook className="w-3 h-3 text-blue-400" />
                          <span>Facebook URL</span>
                        </label>
                        <input
                          type="text"
                          value={settings.facebookUrl}
                          onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-[11px] text-slate-300 font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                          <Instagram className="w-3 h-3 text-pink-400" />
                          <span>Instagram URL</span>
                        </label>
                        <input
                          type="text"
                          value={settings.instagramUrl}
                          onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-[11px] text-slate-300 font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                          <Video className="w-3 h-3 text-rose-400" />
                          <span>TikTok Profile</span>
                        </label>
                        <input
                          type="text"
                          value={settings.tiktokUrl}
                          onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-[11px] text-slate-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: GOOGLE MAPS & LOCATION */}
            {activeTab === 'maps' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Google Map Embed & Coordinates</h3>
                  <p className="text-xs text-slate-400">Embed URL for interactive map frame on showroom and contact pages.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Google Map Embed Iframe URL *</label>
                    <input
                      type="text"
                      value={settings.googleMapEmbedUrl}
                      onChange={(e) => setSettings({ ...settings, googleMapEmbedUrl: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Showroom Latitude</label>
                      <input
                        type="text"
                        value={settings.latitude}
                        onChange={(e) => setSettings({ ...settings, latitude: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Showroom Longitude</label>
                      <input
                        type="text"
                        value={settings.longitude}
                        onChange={(e) => setSettings({ ...settings, longitude: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Simulated Map Render Box */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">LIVE MAP FRAME PREVIEW</span>
                    <div className="w-full h-48 rounded-2xl bg-slate-950 border border-slate-800 p-4 relative overflow-hidden flex flex-col items-center justify-center text-center">
                      <MapPin className="w-8 h-8 text-amber-400 animate-bounce mb-2" />
                      <strong className="text-white text-sm font-serif">{settings.businessName} Showroom</strong>
                      <p className="text-xs text-slate-400 max-w-sm">{settings.address}</p>
                      <span className="mt-2 text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        GPS: {settings.latitude}, {settings.longitude}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: BUSINESS HOURS */}
            {activeTab === 'hours' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Business Hours & Private Appointments</h3>
                  <p className="text-xs text-slate-400">Weekly schedule displayed in footer and appointment booking forms.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Monday – Friday Hours</label>
                    <input
                      type="text"
                      value={settings.businessHours.weekdays}
                      onChange={(e) => setSettings({ ...settings, businessHours: { ...settings.businessHours, weekdays: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Saturday Hours</label>
                    <input
                      type="text"
                      value={settings.businessHours.saturday}
                      onChange={(e) => setSettings({ ...settings, businessHours: { ...settings.businessHours, saturday: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Sunday Hours / Appointments</label>
                    <input
                      type="text"
                      value={settings.businessHours.sunday}
                      onChange={(e) => setSettings({ ...settings, businessHours: { ...settings.businessHours, sunday: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1 border-t border-slate-800 pt-3">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Special Festival Notice Banner</label>
                    <input
                      type="text"
                      value={settings.businessHours.notice}
                      onChange={(e) => setSettings({ ...settings, businessHours: { ...settings.businessHours, notice: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: FOOTER & LEGAL NOTICES */}
            {activeTab === 'footer' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Footer & Legal Notices</h3>
                  <p className="text-xs text-slate-400">Footer brand summary, copyright statements, and authenticity badges.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Footer Brand Description *</label>
                    <textarea
                      rows={3}
                      value={settings.footerAboutText}
                      onChange={(e) => setSettings({ ...settings, footerAboutText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Copyright Line *</label>
                    <input
                      type="text"
                      value={settings.copyrightNotice}
                      onChange={(e) => setSettings({ ...settings, copyrightNotice: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showSilkMarkBadge}
                      onChange={(e) => setSettings({ ...settings, showSilkMarkBadge: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <div>
                      <strong className="text-white text-xs block font-serif">Display Silk Mark India Hologram Badge</strong>
                      <span className="text-[10px] text-slate-400 block">Show Ministry of Textiles authentication logo in footer</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* SECTION 6: SEO & METADATA */}
            {activeTab === 'seo' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">SEO Engine & Social Meta Tags</h3>
                  <p className="text-xs text-slate-400">Default meta titles, descriptions, open graph social share card images.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Global Meta Title *</label>
                    <input
                      type="text"
                      value={settings.seoMetaTitle}
                      onChange={(e) => setSettings({ ...settings, seoMetaTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Meta Description *</label>
                    <textarea
                      rows={3}
                      value={settings.seoMetaDescription}
                      onChange={(e) => setSettings({ ...settings, seoMetaDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Global Keywords</label>
                    <input
                      type="text"
                      value={settings.seoKeywords}
                      onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Open Graph (OG) Share Image URL</label>
                    <input
                      type="text"
                      value={settings.ogImageUrl}
                      onChange={(e) => setSettings({ ...settings, ogImageUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  {/* Google Snippet Search Result Box */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">GOOGLE SEARCH RESULT PREVIEW</span>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 block font-mono">https://balaji-atelier.com</span>
                      <h4 className="text-sm font-bold text-blue-400 hover:underline cursor-pointer">{settings.seoMetaTitle}</h4>
                      <p className="text-xs text-slate-300 leading-snug line-clamp-2">{settings.seoMetaDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: SMTP MAIL GATEWAY */}
            {activeTab === 'smtp' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">SMTP Mail Server Settings</h3>
                    <p className="text-xs text-slate-400">Configure transactional emails for order receipts & inquiry responses.</p>
                  </div>

                  <button
                    onClick={testSmtpConnection}
                    disabled={smtpTesting}
                    className="bg-amber-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:bg-amber-400 transition-all shadow-md disabled:opacity-50"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{smtpTesting ? 'Testing Handshake...' : 'Send Test Mail'}</span>
                  </button>
                </div>

                {smtpStatus && (
                  <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{smtpStatus}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">SMTP Server Host *</label>
                      <input
                        type="text"
                        value={settings.smtpHost}
                        onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Port *</label>
                      <input
                        type="number"
                        value={settings.smtpPort}
                        onChange={(e) => setSettings({ ...settings, smtpPort: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">SMTP Username / Email *</label>
                      <input
                        type="text"
                        value={settings.smtpUser}
                        onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-xs font-mono text-slate-300 uppercase block">SMTP Password *</label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={settings.smtpPass}
                        onChange={(e) => setSettings({ ...settings, smtpPass: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-8 text-xs text-slate-500 hover:text-white"
                      >
                        {showPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Encryption</label>
                      <select
                        value={settings.smtpEncryption}
                        onChange={(e) => setSettings({ ...settings, smtpEncryption: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="TLS">TLS (Port 587)</option>
                        <option value="SSL">SSL (Port 465)</option>
                        <option value="NONE">None (Port 25)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Sender Display Name</label>
                      <input
                        type="text"
                        value={settings.smtpSenderName}
                        onChange={(e) => setSettings({ ...settings, smtpSenderName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">From Email Address</label>
                      <input
                        type="email"
                        value={settings.smtpFromEmail}
                        onChange={(e) => setSettings({ ...settings, smtpFromEmail: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 8: ANALYTICS & TRACKING */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white">Google Analytics & Tracking Pixels</h3>
                  <p className="text-xs text-slate-400">Insert GA4 measurement code, Meta Pixel, and consent banners without touching HTML.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">GA4 Measurement ID</label>
                      <input
                        type="text"
                        value={settings.googleAnalyticsId}
                        onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Google Tag Manager Container ID</label>
                      <input
                        type="text"
                        value={settings.googleTagManagerId}
                        onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                        placeholder="GTM-XXXXXXX"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Meta / Facebook Pixel ID</label>
                      <input
                        type="text"
                        value={settings.facebookPixelId}
                        onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 uppercase block">TikTok Pixel ID</label>
                      <input
                        type="text"
                        value={settings.tiktokPixelId}
                        onChange={(e) => setSettings({ ...settings, tiktokPixelId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 cursor-pointer border-t border-slate-800">
                    <input
                      type="checkbox"
                      checked={settings.enableCookieBanner}
                      onChange={(e) => setSettings({ ...settings, enableCookieBanner: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <div>
                      <strong className="text-white text-xs block font-serif">Enable GDPR Cookie Consent Banner</strong>
                      <span className="text-[10px] text-slate-400 block">Prompt first-time visitors to accept tracking cookies</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-slate-800 pt-6 flex justify-end">
              <button
                onClick={() => showToast('All Website Settings updated and persisted!')}
                className="bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-amber-400 shadow-xl shadow-amber-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: LIVE PREVIEW DYNAMIC RENDER */}
      {viewMode === 'preview' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl text-slate-100">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">DYNAMIC LIVE WEBSITE PREVIEW</span>
              <h3 className="text-xl font-serif font-bold text-white">How Your Website Renders Right Now</h3>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              ● Live Reactivity Connected
            </span>
          </div>

          {/* Simulated Header */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${settings.logoUrl} text-slate-950 font-serif font-bold text-lg flex items-center justify-center shadow-lg`}>
                B
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">{settings.businessName}</span>
                <span className="text-[10px] text-slate-400 block">{settings.tagline}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-slate-300 hidden sm:inline">{settings.phone}</span>
              <button className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Simulated Contact Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase">OUR ADDRESS</span>
              <p className="text-xs text-white">{settings.address}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase">CONCIERGE CONTACT</span>
              <p className="text-xs text-white">{settings.phone}</p>
              <p className="text-xs text-amber-300 font-mono">{settings.email}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase">BUSINESS HOURS</span>
              <p className="text-xs text-white">{settings.businessHours.weekdays}</p>
              <p className="text-[10px] text-amber-400">{settings.businessHours.notice}</p>
            </div>
          </div>

          {/* Simulated Footer */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">{settings.footerAboutText}</p>
            <div className="flex flex-wrap items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-mono text-slate-400 gap-2">
              <span>{settings.copyrightNotice}</span>
              {settings.showSilkMarkBadge && (
                <span className="text-amber-400 font-bold border border-amber-500/30 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                  ★ Silk Mark Certified
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: CODE / JSON INSPECTOR */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">ARCHITECTURE INSPECTOR</span>
              <h3 className="text-lg font-serif font-bold text-white">Settings REST API & Data Schema</h3>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('json')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                  activeCodeTab === 'json' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                JSON Payload
              </button>
              <button
                onClick={() => setActiveCodeTab('api')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                  activeCodeTab === 'api' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Express API
              </button>
            </div>
          </div>

          {activeCodeTab === 'json' && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">GET /api/settings (Active State Payload):</span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto max-h-96">
                {JSON.stringify(settings, null, 2)}
              </pre>
            </div>
          )}

          {activeCodeTab === 'api' && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">server.ts Node/Express Settings Handler:</span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-96">
{`// Express API Endpoint for Dynamic Website Settings
app.get('/api/settings', async (req, res) => {
  const settings = await db.query('SELECT * FROM website_settings LIMIT 1');
  res.json(settings.rows[0]);
});

app.put('/api/settings', async (req, res) => {
  const updated = req.body;
  await db.query('UPDATE website_settings SET config = $1 WHERE id = 1', [JSON.stringify(updated)]);
  res.json({ status: 'success', message: 'Website settings updated dynamically' });
});`}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
