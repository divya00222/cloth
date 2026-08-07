import React, { useState, useMemo } from 'react';
import { 
  Sparkles, LayoutDashboard, ShoppingBag, Package, Star, MessageSquare, 
  Users, Bell, Settings, User, ShieldCheck, TrendingUp, TrendingDown, 
  DollarSign, ArrowUpRight, ArrowDownRight, Search, Filter, Plus, Download, 
  Trash2, Edit3, Eye, CheckCircle2, AlertTriangle, Clock, RefreshCw, 
  Lock, Key, Sun, Moon, Check, X, Shield, ChevronRight, BarChart3, PieChart, 
  Globe, Laptop, Smartphone, Mail, Send, SlidersHorizontal, LogOut, Radio
} from 'lucide-react';

// RBAC Roles
type AdminRole = 'Super Admin' | 'Store Editor' | 'Sales Viewer';

export interface OrderItem {
  id: string;
  customerName: string;
  email: string;
  productTitle: string;
  category: string;
  amount: number;
  status: 'Fulfilled' | 'Processing' | 'Shipped' | 'Cancelled';
  date: string;
  paymentMethod: string;
}

export interface ProductItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
}

export interface ReviewItem {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Flagged';
}

export interface AdminMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  timestamp: string;
  status: 'Unread' | 'Replied';
}

export interface VisitorSession {
  id: string;
  ip: string;
  location: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  currentPage: string;
  duration: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  time: string;
  type: 'order' | 'stock' | 'review' | 'system';
  read: boolean;
}

export const AdminDashboardPage: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'reviews' | 'messages' | 'visitors' | 'profile' | 'settings'>('overview');
  
  // Theme & RBAC Role State
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [userRole, setUserRole] = useState<AdminRole>('Super Admin');
  
  // Search & Filter States
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Notifications State
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    { id: 'n1', title: 'New High-Value Order ₹4,50,000 (Bridal Trousseau)', time: '2 mins ago', type: 'order', read: false },
    { id: 'n2', title: 'Low Stock Alert: Crimson Kadwa Imperial Saree (Only 2 left)', time: '18 mins ago', type: 'stock', read: false },
    { id: 'n3', title: '5-Star Review received for Kanchipuram Gold Warp', time: '1 hour ago', type: 'review', read: true },
    { id: 'n4', title: 'Automated Nightly Database Backup Completed', time: '5 hours ago', type: 'system', read: true }
  ]);

  // Quick Action Modal States
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [newProductData, setNewProductData] = useState({ title: '', sku: '', category: 'Banarasi', price: 85000, stock: 10 });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Mock Master Data
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 'ORD-9901', customerName: 'Rajeshwari Devi', email: 'rajeshwari@example.com', productTitle: 'Crimson Kadwa Imperial Saree', category: 'Bridal', amount: 185000, status: 'Fulfilled', date: '2026-08-06 09:12', paymentMethod: 'Razorpay UPI' },
    { id: 'ORD-9902', customerName: 'Siddharth Varma', email: 'siddharth@example.com', productTitle: 'Kanchipuram Gold Temple Border', category: 'Royal Weaves', amount: 145000, status: 'Processing', date: '2026-08-06 08:45', paymentMethod: 'Credit Card' },
    { id: 'ORD-9903', customerName: 'Ananya Swaminathan', email: 'ananya@example.com', productTitle: 'Chanderi Gold Tissue Sheer', category: 'Exhibitions', amount: 95000, status: 'Shipped', date: '2026-08-05 16:30', paymentMethod: 'NetBanking' },
    { id: 'ORD-9904', customerName: 'Vikramjit Roy', email: 'vikram@example.com', productTitle: 'Shikargah Brocade Hunting Scene', category: 'Looms', amount: 220000, status: 'Fulfilled', date: '2026-08-05 11:20', paymentMethod: 'Wire Transfer' },
    { id: 'ORD-9905', customerName: 'Meera Kapadia', email: 'meera@example.com', productTitle: 'Bandhani Silver-Gold Kadwa Fusion', category: 'Bridal', amount: 135000, status: 'Processing', date: '2026-08-04 19:10', paymentMethod: 'Razorpay UPI' }
  ]);

  const [products, setProducts] = useState<ProductItem[]>([
    { id: 'p1', sku: 'SKU-KADWA-001', title: 'Crimson Kadwa Imperial Saree', category: 'Bridal', price: 185000, stock: 2, status: 'Low Stock', rating: 4.9 },
    { id: 'p2', sku: 'SKU-KANJEE-002', title: 'Kanchipuram Gold Temple Border', category: 'Royal Weaves', price: 145000, stock: 12, status: 'In Stock', rating: 4.8 },
    { id: 'p3', sku: 'SKU-CHAND-003', title: 'Chanderi Gold Tissue Sheer', category: 'Exhibitions', price: 95000, stock: 8, status: 'In Stock', rating: 4.7 },
    { id: 'p4', sku: 'SKU-SHIKAR-004', title: 'Shikargah Brocade Hunting Scene', category: 'Looms', price: 220000, stock: 0, status: 'Out of Stock', rating: 5.0 },
    { id: 'p5', sku: 'SKU-BANDH-005', title: 'Bandhani Silver-Gold Kadwa Fusion', category: 'Bridal', price: 135000, stock: 15, status: 'In Stock', rating: 4.9 }
  ]);

  const [reviews, setReviews] = useState<ReviewItem[]>([
    { id: 'r1', customer: 'Priya Sharma', product: 'Crimson Kadwa Imperial Saree', rating: 5, comment: 'The 24k gold zari drape is unmatched in weight and elegance. Worn at my wedding reception!', date: '2026-08-05', status: 'Approved' },
    { id: 'r2', customer: 'Dr. Aris Mehta', product: 'Kanchipuram Gold Temple Border', rating: 5, comment: 'Authentic Korvai interlocking weave confirmed with Silk Mark India hologram.', date: '2026-08-04', status: 'Approved' },
    { id: 'r3', customer: 'Kavita Sundaram', product: 'Chanderi Gold Tissue Sheer', rating: 4, comment: 'Beautiful sheer finish, though requires careful dry cleaning.', date: '2026-08-03', status: 'Pending' }
  ]);

  const [messages, setMessages] = useState<AdminMessage[]>([
    { id: 'm1', sender: 'Sunita Mehra', email: 'sunita@example.com', subject: 'Inquiry regarding custom wedding trousseau set', timestamp: '2026-08-06 09:30', status: 'Unread' },
    { id: 'm2', sender: 'Devendra Singhania', email: 'devendra@example.com', subject: 'Wholesale order for London boutique gallery', timestamp: '2026-08-05 14:15', status: 'Replied' }
  ]);

  const [visitors] = useState<VisitorSession[]>([
    { id: 'v1', ip: '182.72.102.14', location: 'New Delhi, India', device: 'Desktop', currentPage: '/shop/sku-kadwa-001', duration: '14 mins' },
    { id: 'v2', ip: '49.207.211.88', location: 'Mumbai, India', device: 'Mobile', currentPage: '/gallery', duration: '6 mins' },
    { id: 'v3', ip: '157.240.22.12', location: 'London, UK', device: 'Desktop', currentPage: '/checkout', duration: '22 mins' },
    { id: 'v4', ip: '103.211.14.05', location: 'Dubai, UAE', device: 'Mobile', currentPage: '/about', duration: '3 mins' }
  ]);

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(ord => {
      if (orderStatusFilter !== 'All' && ord.status !== orderStatusFilter) return false;
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        return ord.customerName.toLowerCase().includes(q) || ord.id.toLowerCase().includes(q) || ord.productTitle.toLowerCase().includes(q);
      }
      return true;
    });
  }, [orders, orderStatusFilter, globalSearch]);

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.title || !newProductData.sku) {
      triggerToast('Please fill out product title and SKU');
      return;
    }

    const newProd: ProductItem = {
      id: `p${products.length + 1}`,
      sku: newProductData.sku,
      title: newProductData.title,
      category: newProductData.category,
      price: Number(newProductData.price),
      stock: Number(newProductData.stock),
      status: Number(newProductData.stock) > 5 ? 'In Stock' : Number(newProductData.stock) > 0 ? 'Low Stock' : 'Out of Stock',
      rating: 5.0
    };

    setProducts([newProd, ...products]);
    setShowAddProductModal(false);
    setNewProductData({ title: '', sku: '', category: 'Banarasi', price: 85000, stock: 10 });
    triggerToast(`Product "${newProd.title}" added to catalog`);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    triggerToast('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen rounded-2xl border transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-slate-950 ${
      themeMode === 'dark' ? 'bg-[#0A0B0E] text-slate-100 border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-2 border-amber-500 text-amber-300 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className={`px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md ${
        themeMode === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-serif font-bold text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
              B
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">BALAJI ATELIER</span>
              <h1 className="text-base font-serif font-bold tracking-tight">Admin Executive Portal</h1>
            </div>
          </div>

          {/* Role Access Selector Switcher */}
          <div className={`hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-xl border text-xs font-mono ${
            themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Role:</span>
            <select
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value as AdminRole);
                triggerToast(`RBAC Permission switched to: ${e.target.value}`);
              }}
              className="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer"
            >
              <option value="Super Admin" className="bg-slate-900 text-white">Super Admin</option>
              <option value="Store Editor" className="bg-slate-900 text-white">Store Editor</option>
              <option value="Sales Viewer" className="bg-slate-900 text-white">Sales Viewer</option>
            </select>
          </div>
        </div>

        {/* Search, Notifications & Theme Toggle */}
        <div className="flex items-center space-x-3">
          
          {/* Global Search Bar */}
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search orders, SKU, customer..."
              className={`w-full text-xs rounded-xl pl-9 pr-3 py-2 border focus:outline-none ${
                themeMode === 'dark' 
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500' 
                  : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-600'
              }`}
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          </div>

          {/* Notifications Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-xl border relative transition-colors ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Bell className="w-4 h-4 text-amber-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-2xl border p-4 shadow-2xl z-50 space-y-3 ${
                themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-serif font-bold text-amber-400">Activity Notifications</span>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] font-mono text-slate-400 hover:text-white"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        !n.read 
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
                          : themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <p className="font-medium leading-snug">{n.title}</p>
                      <span className="text-[10px] font-mono text-slate-400 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition-colors ${
              themeMode === 'dark' ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
            }`}
            title="Toggle Dashboard Theme"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* DASHBOARD LAYOUT WITH SIDEBAR + MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`w-full lg:w-64 border-r p-4 shrink-0 space-y-6 ${
          themeMode === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-3 block mb-2">MANAGEMENT PANELS</span>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Fulfillment</span>
              </div>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </div>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px]">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Reviews Moderation</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'messages'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages & Concierge</span>
            </button>

            <button
              onClick={() => setActiveTab('visitors')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'visitors'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Visitors Telemetry</span>
            </button>
          </div>

          <div className="space-y-1 border-t border-slate-800 pt-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-3 block mb-2">SYSTEM & CONTROL</span>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Admin Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : themeMode === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </button>
          </div>

          {/* Active Role Guard Banner */}
          <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
            themeMode === 'dark' ? 'bg-slate-900/80 border-amber-500/30' : 'bg-slate-100 border-amber-500/40'
          }`}>
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold">
              <Shield className="w-4 h-4" />
              <span>RBAC ACTIVE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Current Mode: <strong className="text-white">{userRole}</strong>. 
              {userRole === 'Sales Viewer' && ' Read-only restrictions enabled.'}
            </p>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
          
          {/* TAB 1: OVERVIEW & ANALYTICS DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Quick Actions Bar */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Executive Quick Actions</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {userRole !== 'Sales Viewer' && (
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 hover:bg-amber-400 transition-all shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New SKU</span>
                    </button>
                  )}

                  <button
                    onClick={() => triggerToast('Financial Summary CSV exported to downloads')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all ${
                      themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-200 hover:text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Sales CSV</span>
                  </button>

                  <button
                    onClick={() => triggerToast('Promotional newsletter queued for 4,200 VIP clients')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all ${
                      themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-200 hover:text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send VIP Campaign</span>
                  </button>
                </div>
              </div>

              {/* 4 STATS METRICS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>TOTAL REVENUE</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold text-amber-400">₹1,42,85,000</span>
                    <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18.4% vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>ORDERS FULFILLED</span>
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold">1,248 Drapes</span>
                    <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>98.2% on-time dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>LIVE VISITORS NOW</span>
                    <Globe className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold text-emerald-400">342 Active</span>
                    <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                      <Laptop className="w-3.5 h-3.5 text-amber-400" />
                      <span>72% Mobile, 28% Desktop</span>
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>AVERAGE ORDER VALUE</span>
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold">₹1,14,400</span>
                    <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono">
                      <span>Bridal Trousseau Heavy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE SVG SALES CHART & CATEGORY BREAKDOWN */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Monthly Revenue Line/Bar Chart (8 Cols) */}
                <div className={`lg:col-span-8 p-6 rounded-2xl border space-y-6 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div>
                      <h3 className="text-base font-serif font-bold">2026 Monthly Revenue Performance (₹ Lakhs)</h3>
                      <p className="text-xs text-slate-400">Comparing pure Banarasi and Kanjeevaram sales growth.</p>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      Target: ₹2.0 Cr
                    </span>
                  </div>

                  {/* SVG Bar Graph Canvas */}
                  <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-slate-800/60 pb-2">
                    {[
                      { month: 'Jan', val: 65, color: 'from-amber-600 to-amber-400' },
                      { month: 'Feb', val: 82, color: 'from-amber-600 to-amber-400' },
                      { month: 'Mar', val: 95, color: 'from-amber-600 to-amber-400' },
                      { month: 'Apr', val: 110, color: 'from-amber-600 to-amber-400' },
                      { month: 'May', val: 135, color: 'from-amber-600 to-amber-400' },
                      { month: 'Jun', val: 120, color: 'from-amber-600 to-amber-400' },
                      { month: 'Jul', val: 142, color: 'from-amber-500 to-amber-300' },
                      { month: 'Aug', val: 165, color: 'from-amber-400 to-amber-200' }
                    ].map((bar) => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                        <span className="text-[10px] font-mono text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                          ₹{bar.val}L
                        </span>
                        <div 
                          style={{ height: `${(bar.val / 180) * 100}%` }}
                          className={`w-full max-w-[36px] rounded-t-lg bg-gradient-to-t ${bar.color} group-hover:brightness-125 transition-all shadow-lg`}
                        ></div>
                        <span className="text-[10px] font-mono text-slate-400">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Category Revenue Share Pie (4 Cols) */}
                <div className={`lg:col-span-4 p-6 rounded-2xl border space-y-6 shadow-xl ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="border-b border-slate-800/80 pb-4">
                    <h3 className="text-base font-serif font-bold">Category Distribution</h3>
                    <p className="text-xs text-slate-400">By weave type volume.</p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Bridal Kadwa Silk</span>
                        <span className="text-amber-400 font-bold">42%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[42%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Kanjeevaram Gold Warp</span>
                        <span className="text-amber-400 font-bold">28%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[28%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Chanderi Tissue</span>
                        <span className="text-amber-400 font-bold">18%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-purple-500 w-[18%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Organza Cutwork</span>
                        <span className="text-amber-400 font-bold">12%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-rose-500 w-[12%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT ORDERS SUMMARY TABLE */}
              <div className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-base font-serif font-bold">Recent High-Value Orders</h3>
                    <p className="text-xs text-slate-400">Live order queue with fulfillment status.</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-mono text-amber-400 hover:underline flex items-center space-x-1"
                  >
                    <span>View All Orders Queue</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className={`uppercase text-[10px] border-b ${
                      themeMode === 'dark' ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="p-3 font-bold text-amber-400">{ord.id}</td>
                          <td className="p-3">{ord.customerName}</td>
                          <td className="p-3 text-slate-300">{ord.productTitle}</td>
                          <td className="p-3 font-bold text-white">₹{ord.amount.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Fulfilled' ? 'bg-emerald-500/20 text-emerald-300' :
                              ord.status === 'Processing' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400 text-[10px]">{ord.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT & FULFILLMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Orders Management</h2>
                  <p className="text-xs text-slate-400">Review, update fulfillment status, and inspect dispatch logs.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
                  {['All', 'Fulfilled', 'Processing', 'Shipped'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                        orderStatusFilter === st
                          ? 'bg-amber-500 text-slate-950'
                          : themeMode === 'dark' ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`rounded-2xl border overflow-hidden shadow-2xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className={`uppercase text-[10px] border-b ${
                      themeMode === 'dark' ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer & Email</th>
                        <th className="p-3">Product Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Fulfillment Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="p-3 font-bold text-amber-400">{ord.id}</td>
                          <td className="p-3">
                            <strong className="text-white block">{ord.customerName}</strong>
                            <span className="text-[10px] text-slate-400">{ord.email}</span>
                          </td>
                          <td className="p-3 text-slate-300">{ord.productTitle}</td>
                          <td className="p-3 text-slate-400">{ord.category}</td>
                          <td className="p-3 font-bold text-amber-400">₹{ord.amount.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Fulfilled' ? 'bg-emerald-500/20 text-emerald-300' :
                              ord.status === 'Processing' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-3">
                            {userRole !== 'Sales Viewer' ? (
                              <button
                                onClick={() => {
                                  const nextStatus = ord.status === 'Processing' ? 'Shipped' : ord.status === 'Shipped' ? 'Fulfilled' : 'Processing';
                                  setOrders(orders.map(o => o.id === ord.id ? { ...o, status: nextStatus } : o));
                                  triggerToast(`Order ${ord.id} status updated to: ${nextStatus}`);
                                }}
                                className="bg-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 px-2.5 py-1 rounded text-[10px] font-bold"
                              >
                                Advance Status
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-500">Read Only</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CATALOG INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Handloom Catalog & Inventory</h2>
                  <p className="text-xs text-slate-400">Stock levels, pricing, SKU references, and rating telemetry.</p>
                </div>

                {userRole !== 'Sales Viewer' && (
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:bg-amber-400 transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Handloom SKU</span>
                  </button>
                )}
              </div>

              <div className={`rounded-2xl border overflow-hidden shadow-2xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className={`uppercase text-[10px] border-b ${
                      themeMode === 'dark' ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <tr>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock Level</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="p-3 font-bold text-amber-400">{p.sku}</td>
                          <td className="p-3 text-white font-serif text-sm">{p.title}</td>
                          <td className="p-3 text-slate-400">{p.category}</td>
                          <td className="p-3 font-bold text-white">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-3 font-bold">{p.stock} units</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'In Stock' ? 'bg-emerald-500/20 text-emerald-300' :
                              p.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3 text-amber-400 flex items-center space-x-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{p.rating}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-serif font-bold">Client Reviews Moderation</h2>
                <p className="text-xs text-slate-400">Approve or flag client feedback before publishing to product details pages.</p>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className={`p-5 rounded-2xl border space-y-3 shadow-xl ${
                    themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <strong className="text-white text-sm font-serif">{rev.customer}</strong>
                        <span className="text-xs font-mono text-slate-400">on {rev.product}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        rev.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {rev.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal italic">
                      "{rev.comment}"
                    </p>

                    {userRole !== 'Sales Viewer' && rev.status === 'Pending' && (
                      <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setReviews(reviews.map(r => r.id === rev.id ? { ...r, status: 'Approved' } : r));
                            triggerToast('Review approved and published');
                          }}
                          className="bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded text-xs"
                        >
                          Approve Review
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MESSAGES & CONCIERGE */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-serif font-bold">Concierge Inquiry Inbox</h2>
                <p className="text-xs text-slate-400">Direct client requests routed from the Contact Page.</p>
              </div>

              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={`p-5 rounded-2xl border space-y-2 shadow-xl ${
                    themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <strong className="text-amber-400">{m.sender} ({m.email})</strong>
                      <span className="text-slate-500">{m.timestamp}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{m.subject}</h3>
                    <div className="pt-2 flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        m.status === 'Unread' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {m.status}
                      </span>
                      {userRole !== 'Sales Viewer' && (
                        <button
                          onClick={() => triggerToast(`Reply compose window opened for ${m.email}`)}
                          className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded text-xs font-mono hover:bg-amber-500 hover:text-slate-950 transition-all"
                        >
                          Compose Reply
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: VISITORS TELEMETRY */}
          {activeTab === 'visitors' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-serif font-bold">Real-time Visitor Telemetry</h2>
                <p className="text-xs text-slate-400">Live active browser sessions, geography, and page view flow.</p>
              </div>

              <div className={`rounded-2xl border overflow-hidden shadow-2xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className={`uppercase text-[10px] border-b ${
                      themeMode === 'dark' ? 'bg-slate-950 text-amber-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <tr>
                        <th className="p-3">Session ID</th>
                        <th className="p-3">IP Address</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Device</th>
                        <th className="p-3">Active Route</th>
                        <th className="p-3">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="p-3 font-bold text-amber-400">{v.id}</td>
                          <td className="p-3 text-slate-300">{v.ip}</td>
                          <td className="p-3 text-white">{v.location}</td>
                          <td className="p-3 text-slate-400">{v.device}</td>
                          <td className="p-3 text-amber-300">{v.currentPage}</td>
                          <td className="p-3 text-slate-500">{v.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-serif font-bold">Executive Profile</h2>
                <p className="text-xs text-slate-400">Manage administrator account credentials and security preferences.</p>
              </div>

              <div className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-serif font-bold text-2xl flex items-center justify-center shadow-lg">
                    BA
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Balaji Master Administrator</h3>
                    <span className="text-xs font-mono text-amber-400">admin@balajisarees.com</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs font-mono">
                  <p className="text-slate-400">Current Assigned Role: <span className="text-amber-400 font-bold">{userRole}</span></p>
                  <p className="text-slate-400">Two-Factor Auth: <span className="text-emerald-400 font-bold">Enabled (Hardware Key)</span></p>
                  <p className="text-slate-400">Last Password Change: <span className="text-slate-200">2026-07-15</span></p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SYSTEM SETTINGS & SMTP CONFIG */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-serif font-bold">System Configuration</h2>
                <p className="text-xs text-slate-400">SMTP mail server credentials, payment gateways, and database backup schedules.</p>
              </div>

              <div className={`p-6 rounded-2xl border space-y-6 shadow-xl ${
                themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-base text-amber-400 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>SMTP Mail Gateway Settings</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">SMTP HOST</label>
                      <input type="text" defaultValue="smtp.balajisarees.com" disabled className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-300" />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">SMTP PORT</label>
                      <input type="text" defaultValue="587 (TLS)" disabled className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-300" />
                    </div>
                  </div>

                  {userRole === 'Super Admin' ? (
                    <button
                      onClick={() => triggerToast('Test SMTP Ping Sent Successfully')}
                      className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs font-mono hover:bg-amber-400 transition-all"
                    >
                      Test SMTP Connection
                    </button>
                  ) : (
                    <p className="text-xs text-rose-400 font-mono">Super Admin access required to modify system settings.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD NEW PRODUCT SKU */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Add New Handloom SKU</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300">Product Title *</label>
                <input
                  type="text"
                  value={newProductData.title}
                  onChange={(e) => setNewProductData({ ...newProductData, title: e.target.value })}
                  placeholder="e.g. Royal Blue Tanchoi Brocade Saree"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300">SKU Code *</label>
                  <input
                    type="text"
                    value={newProductData.sku}
                    onChange={(e) => setNewProductData({ ...newProductData, sku: e.target.value })}
                    placeholder="SKU-TANCHOI-006"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300">Category</label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Royal Weaves">Royal Weaves</option>
                    <option value="Exhibitions">Exhibitions</option>
                    <option value="Looms">Looms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300">Price (INR) *</label>
                  <input
                    type="number"
                    value={newProductData.price}
                    onChange={(e) => setNewProductData({ ...newProductData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300">Initial Stock *</label>
                  <input
                    type="number"
                    value={newProductData.stock}
                    onChange={(e) => setNewProductData({ ...newProductData, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg"
              >
                Save & Publish to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
