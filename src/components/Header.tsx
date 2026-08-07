import React from 'react';
import { ShieldCheck, Server, Database, Code2, Download, Layers, Palette, Home, ShoppingBag, Eye, Camera, Mail, LayoutDashboard, Package, Settings, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xl tracking-wider shadow-lg shadow-amber-500/20">
            B
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-amber-400">BALAJI</h1>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                Store Homepage & System
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise Software Architecture & Luxury Fashion UI Design System
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('opt-sec')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'opt-sec'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Optimization & Hostinger</span>
          </button>

          <button
            onClick={() => setActiveTab('settings-mgr')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'settings-mgr'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Website Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('products-mgr')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'products-mgr'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'contact'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('product-details')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'product-details'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Product Details</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'shop'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'homepage'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Store Homepage</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'about'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('design-system')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'design-system'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Luxury UI System</span>
          </button>

          <button
            onClick={() => setActiveTab('document')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'document'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Doc</span>
          </button>

          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'tree'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Folder Tree</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'database'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MySQL Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('mvc')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'mvc'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>MVC Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('hostinger')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
              activeTab === 'hostinger'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hostinger Ops</span>
          </button>
        </div>
      </div>
    </header>
  );
};
