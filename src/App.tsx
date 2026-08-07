import React, { useState } from 'react';
import { Header } from './components/Header';
import { FolderTreeInspector } from './components/FolderTree';
import { DatabaseSchemaInspector } from './components/DatabaseSchema';
import { MvcFlowVisualizer } from './components/MvcFlow';
import { SecurityChecklist } from './components/SecurityChecklist';
import { HostingerGuide } from './components/HostingerGuide';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { LuxuryHomepage } from './components/LuxuryHomepage';
import { AboutPage } from './components/AboutPage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { GalleryPage } from './components/GalleryPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { ProductManagementPage } from './components/ProductManagementPage';
import { WebsiteSettingsPage } from './components/WebsiteSettingsPage';
import { OptimizationSecurityPage } from './components/OptimizationSecurityPage';
import { SECTIONS, PROJECT_TREE } from './data/architectureData';
import { BookOpen, Layers, CheckCircle, Shield, Server, Database, Code, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('settings-mgr');
  const [selectedSection, setSelectedSection] = useState<string>(SECTIONS[0].id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'opt-sec' && <OptimizationSecurityPage />}
        {activeTab === 'settings-mgr' && <WebsiteSettingsPage />}
        {activeTab === 'products-mgr' && <ProductManagementPage />}
        {activeTab === 'admin' && <AdminDashboardPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'gallery' && <GalleryPage />}
        {activeTab === 'product-details' && <ProductDetailsPage />}
        {activeTab === 'shop' && <ShopPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'homepage' && <LuxuryHomepage />}
        {activeTab === 'design-system' && <DesignSystemShowcase />}
        {activeTab === 'tree' && <FolderTreeInspector tree={PROJECT_TREE} />}
        {activeTab === 'database' && <DatabaseSchemaInspector />}
        {activeTab === 'mvc' && <MvcFlowVisualizer />}
        {activeTab === 'hostinger' && <HostingerGuide />}

        {activeTab === 'document' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Section Links */}
            <div className="lg:col-span-1 space-y-2 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
                <span>Architecture Topics</span>
                <span className="text-amber-400 font-mono">18/18</span>
              </div>

              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSection(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all flex items-start space-x-2.5 ${
                    selectedSection === sec.id
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-amber-500 shrink-0 mt-0.5">{sec.number}.</span>
                  <div className="truncate">
                    <p className="truncate">{sec.title.replace(/^\d+\.\s*/, '')}</p>
                    <span className="text-[10px] text-slate-500 block font-normal">{sec.category}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Architecture Document Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Executive Summary Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise Software Architecture Document</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  BALAJI — Premium Clothing Store Business Website
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                  A high-performance, non-framework, zero-dependency e-commerce web application architecture engineered specifically for <strong className="text-amber-400">Hostinger Shared Hosting</strong> environment using pure <strong className="text-white">HTML5, CSS3, Vanilla JavaScript, Core PHP (8.2+), and MySQL (InnoDB)</strong>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Core Runtime</span>
                    <strong className="text-amber-300 font-mono">Core PHP 8.2+</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Database Engine</span>
                    <strong className="text-amber-300 font-mono">MySQL / InnoDB</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Hosting Target</span>
                    <strong className="text-amber-300 font-mono">Hostinger Shared</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Framework Overhead</span>
                    <strong className="text-emerald-400 font-mono">0 KB (Pure Vanilla)</strong>
                  </div>
                </div>
              </div>

              {/* Dynamic View of Selected Section */}
              {selectedSection === 'overview' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    <span>1. Project Overview & Scope</span>
                  </h2>
                  <div className="prose prose-invert prose-sm text-slate-300 space-y-3">
                    <p>
                      <strong>BALAJI</strong> is a premium fashion and clothing retail business platform specializing in high-end sarees, ethnic wear, fabrics, and ready-made garments. The objective is to establish an ultra-fast, robust, SEO-optimized, and secure web presence without relying on heavy frameworks (such as React, Laravel, Tailwind, or Bootstrap) that introduce unnecessary CPU overhead and memory footprint on shared web hosting environments.
                    </p>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Core System Constraints & Guarantees:</h4>
                      <ul className="list-disc list-inside text-xs space-y-1 text-slate-300">
                        <li><strong>Hostinger Compatibility:</strong> Fully tuned for cPanel/hPanel Apache Web Server with PHP 8.2+ and MySQL 8.0+.</li>
                        <li><strong>Zero External Framework Dependencies:</strong> 100% native HTML5 semantic markup, modular CSS3 custom variables, Vanilla JavaScript ES6 modules, procedural/OOP Core PHP, and native PDO drivers.</li>
                        <li><strong>Lightweight Footprint:</strong> Page size under 1.2MB, first contentful paint &lt; 0.8s, GTmetrix Grade A.</li>
                        <li><strong>Enterprise Security:</strong> PDO prepared statements, synchronizer CSRF tokens, output encoding, password hashing, and upload file execution blocks.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'folder-structure' && <FolderTreeInspector tree={PROJECT_TREE} />}

              {selectedSection === 'database-plan' && <DatabaseSchemaInspector />}

              {selectedSection === 'mvc-php' && <MvcFlowVisualizer />}

              {selectedSection === 'security' && <SecurityChecklist />}

              {(selectedSection === 'hostinger' || selectedSection === 'scalability' || selectedSection === 'performance') && <HostingerGuide />}

              {/* General Architecture Overview Cards for other sections */}
              {!['overview', 'folder-structure', 'database-plan', 'mvc-php', 'security', 'hostinger', 'scalability', 'performance'].includes(selectedSection) && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Section {SECTIONS.find(s => s.id === selectedSection)?.number}
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      {SECTIONS.find(s => s.id === selectedSection)?.title}
                    </h2>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {SECTIONS.find(s => s.id === selectedSection)?.summary}
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Key Technical Guidelines & Standards
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Detailed documentation for this architectural module is included in the complete Senior Software Architect Specification report output below. You can also explore the visual tabs above for the live interactive directory tree, MySQL DDL schema scripts, and request execution flows.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
