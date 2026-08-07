import React, { useState } from 'react';
import { 
  Sparkles, Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2, 
  AlertCircle, HelpCircle, ChevronDown, ChevronUp, Share2, Instagram, 
  Facebook, ExternalLink, Code, Database, ShieldCheck, Globe, Check, 
  Building2, Calendar, User, FileText, Lock
} from 'lucide-react';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  storeLocation: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied' | 'In Progress';
}

export const ContactPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'php' | 'sql' | 'js'>('php');

  // Form State & Validation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Bridal Consultation',
    storeLocation: 'Varanasi Flagship Guild',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<ContactMessage | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Map Location Selector State
  const [selectedMapStore, setSelectedMapStore] = useState<string>('varanasi');

  // Simulated Stored Messages in Database
  const [storedMessages, setStoredMessages] = useState<ContactMessage[]>([
    {
      id: 'MSG-2026-881',
      name: 'Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 98765 43210',
      inquiryType: 'Bridal Trousseau',
      storeLocation: 'Varanasi Flagship Guild',
      message: 'Looking to book an exclusive in-person viewing of Katan silk Banarasi drapes for November wedding.',
      createdAt: '2026-08-05 14:32',
      status: 'Unread'
    },
    {
      id: 'MSG-2026-879',
      name: 'Rohan Deshmukh',
      email: 'rohan.d@example.com',
      phone: '+91 91234 56789',
      inquiryType: 'International Express Order',
      storeLocation: 'New Delhi Boutique',
      message: 'Need urgent DHL dispatch to London for a pre-stitched Kanjeevaram saree.',
      createdAt: '2026-08-04 11:15',
      status: 'Replied'
    }
  ]);

  const storeLocations = [
    {
      id: 'varanasi',
      name: 'Varanasi Master Handloom Atelier',
      address: 'D 35/88, Godowlia Crossing, Near Kashi Vishwanath Corridor, Varanasi, UP 221001',
      phone: '+91 542 245 8890',
      email: 'varanasi@balajisarees.com',
      hours: 'Mon - Sun: 10:00 AM - 8:30 PM IST',
      status: 'Open Now',
      embedMapUrl: 'https://maps.google.com/maps?q=Godowlia+Varanasi&t=&z=15&ie=UTF8&iwloc=&output=embed'
    },
    {
      id: 'delhi',
      name: 'New Delhi South Ex Heritage Gallery',
      address: 'E-14, South Extension Part II, Ring Road, New Delhi, DL 110049',
      phone: '+91 11 4164 9900',
      email: 'delhi@balajisarees.com',
      hours: 'Mon - Sat: 10:30 AM - 8:00 PM IST',
      status: 'Open Now',
      embedMapUrl: 'https://maps.google.com/maps?q=South+Extension+II+New+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed'
    },
    {
      id: 'kanchipuram',
      name: 'Kanchipuram Silk Weavers Guild',
      address: '142, Gandhi Road, Near Kamakshi Amman Temple, Kanchipuram, TN 631501',
      phone: '+91 44 2722 4500',
      email: 'kanchipuram@balajisarees.com',
      hours: 'Mon - Sat: 09:30 AM - 7:30 PM IST',
      status: 'Open Now',
      embedMapUrl: 'https://maps.google.com/maps?q=Gandhi+Road+Kanchipuram&t=&z=15&ie=UTF8&iwloc=&output=embed'
    },
    {
      id: 'mumbai',
      name: 'Mumbai Kala Ghoda Royal Salon',
      address: '32, Forbes Building, VB Gandhi Marg, Kala Ghoda, Fort, Mumbai, MH 400001',
      phone: '+91 22 6633 1122',
      email: 'mumbai@balajisarees.com',
      hours: 'Mon - Sat: 11:00 AM - 8:00 PM IST',
      status: 'Open Now',
      embedMapUrl: 'https://maps.google.com/maps?q=Kala+Ghoda+Fort+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed'
    }
  ];

  const faqs = [
    {
      question: 'How do I schedule a private bridal saree consultation?',
      answer: 'You can book an appointment via the form above or call our Varanasi Flagship directly. We offer private styling suites where our master drapers present custom color swatches and authentic 24k gold zari samples.'
    },
    {
      question: 'Are all sarees 100% certified with Silk Mark India?',
      answer: 'Yes, every single handloom saree dispatched from BALAJI arrives with a official Silk Mark India holographic tag containing a unique verification code issued by the Ministry of Textiles, Government of India.'
    },
    {
      question: 'Do you offer international shipping and custom blouse stitching?',
      answer: 'We ship insured globally via DHL Express in 3-5 business days. We also provide pre-stitching and custom tailoring services according to your measurements submitted online.'
    },
    {
      question: 'What is the average lead time for custom artisan handloom orders?',
      answer: 'Depending on the weave complexity (e.g. Kadwa or Shikargah brocade), custom sarees take between 90 to 210 loom hours (approx. 3 to 6 weeks).'
    },
    {
      question: 'How can I verify the authenticity of pure gold zari?',
      answer: 'Our high-end bridal pieces come with an official laboratory assay certificate verifying the purity of the 24k electroplated silver-gold bullion wire used in weaving.'
    },
    {
      question: 'What is your return and exchange policy?',
      answer: 'We offer a 7-day hassle-free return policy on all non-customized sarees, provided the security tag and Silk Mark hologram remain intact.'
    }
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.length < 8) {
      errors.phone = 'Please enter a valid telephone number';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide details regarding your inquiry';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `MSG-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        storeLocation: formData.storeLocation,
        message: formData.message,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Unread'
      };

      setStoredMessages([newMessage, ...storedMessages]);
      setSubmitSuccess(newMessage);
      setIsSubmitting(false);

      // Reset Form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'Bridal Consultation',
        storeLocation: 'Varanasi Flagship Guild',
        message: ''
      });
    }, 1000);
  };

  const selectedStoreObj = storeLocations.find(s => s.id === selectedMapStore) || storeLocations[0];

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
            Atelier Contact, Concierge & Store Locator
          </h2>
          <p className="text-xs text-slate-400">
            Featuring validated contact form, Database persistence simulator, WhatsApp click-to-chat, interactive map switcher, and SMTP script.
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
            <Mail className="w-3.5 h-3.5" />
            <span>Live Contact Page</span>
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
            <span>View SMTP & SQL Code</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: LIVE CONTACT PAGE PREVIEW */}
      {viewMode === 'preview' && (
        <div className="bg-[#0B0C10] text-slate-100 min-h-screen rounded-2xl border border-slate-800 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 p-4 sm:p-6 lg:p-8 space-y-12">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-xl z-10">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">ROYAL CONCIERGE & STYLING</span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Get In Touch With Balaji
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Book a private bridal appointment, inquire about custom loom orders, or consult our master drapers for personal styling.
              </p>
            </div>

            {/* Direct WhatsApp Click-to-Chat Widget */}
            <a
              href="https://wa.me/915422458890?text=Hello%20Balaji%20Handlooms,%20I%20would%20like%20to%20schedule%20a%20private%20bridal%20saree%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500/10 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 p-5 rounded-2xl transition-all shadow-xl group z-10 shrink-0 text-center space-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5 fill-emerald-400 group-hover:fill-slate-950" />
                <span className="font-bold text-sm uppercase tracking-wider">WhatsApp Concierge</span>
              </div>
              <span className="text-[11px] font-mono block opacity-80">+91 542 245 8890 (Instant Response)</span>
            </a>
          </div>

          {/* MAIN 2-COLUMN SECTION: CONTACT FORM + STORE INFO & HOURS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: VALIDATED CONTACT FORM (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">ONLINE INQUIRY & APPOINTMENT</span>
                <h2 className="text-2xl font-serif font-bold text-white">Send Us A Direct Message</h2>
                <p className="text-xs text-slate-400 mt-1">Stored securely in our customer management database and routed via SMTP.</p>
              </div>

              {submitSuccess ? (
                <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-4 text-emerald-300 animate-fadeIn">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">Message Stored & Sent Successfully!</h3>
                      <span className="text-xs font-mono text-emerald-400">Reference Ticket ID: {submitSuccess.id}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    Thank you, <strong className="text-white">{submitSuccess.name}</strong>. Our senior draper at <strong className="text-amber-400">{submitSuccess.storeLocation}</strong> will respond to your email (<strong className="text-white">{submitSuccess.email}</strong>) or phone within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Full Name *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Sunita Mehra"
                          className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                            formErrors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                        />
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {formErrors.fullName && <span className="text-[10px] text-rose-400 font-mono block">{formErrors.fullName}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Email Address *</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. sunita@example.com"
                          className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                            formErrors.email ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                        />
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {formErrors.email && <span className="text-[10px] text-rose-400 font-mono block">{formErrors.email}</span>}
                    </div>
                  </div>

                  {/* Phone & Inquiry Type Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Phone / WhatsApp *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                            formErrors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                        />
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      </div>
                      {formErrors.phone && <span className="text-[10px] text-rose-400 font-mono block">{formErrors.phone}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase block">Inquiry Type</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Bridal Consultation">Bridal Suite Appointment</option>
                        <option value="Custom Loom Order">Custom Handloom Order</option>
                        <option value="International Express Order">International Order & DHL</option>
                        <option value="Wholesale & Bulk">Boutique Wholesale</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Store Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Preferred Atelier / Boutique</label>
                    <select
                      value={formData.storeLocation}
                      onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    >
                      {storeLocations.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase block">Inquiry Details *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify wedding dates, color preferences, or specific SKU codes..."
                      className={`w-full bg-slate-950 border rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none ${
                        formErrors.message ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                      }`}
                    ></textarea>
                    {formErrors.message && <span className="text-[10px] text-rose-400 font-mono block">{formErrors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Storing & Sending via SMTP...' : 'Submit Concierge Request'}</span>
                  </button>

                  <p className="text-[10px] text-slate-500 font-mono text-center flex items-center justify-center space-x-1">
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span>Protected by 256-bit SSL Encryption. We respect your privacy.</span>
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: CONTACT DETAILS & BUSINESS HOURS (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Channels Info Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="font-serif font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>Headquarters & Atelier</span>
                </h3>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Varanasi Flagship Guild</strong>
                      <span className="text-slate-400 leading-relaxed block">
                        D 35/88, Godowlia Crossing, Near Kashi Vishwanath Corridor, Varanasi, UP 221001
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <strong className="text-white block">Direct Phone Line</strong>
                      <a href="tel:+915422458890" className="text-amber-400 hover:underline font-mono">+91 542 245 8890</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <strong className="text-white block">Official Email</strong>
                      <a href="mailto:concierge@balajisarees.com" className="text-amber-400 hover:underline font-mono">concierge@balajisarees.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-bold text-base text-white flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Boutique Hours</span>
                  </h3>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    OPEN NOW
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Monday - Saturday:</span>
                    <span className="text-white font-bold">10:00 AM - 8:30 PM IST</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Sunday (Bridal Suite Only):</span>
                    <span className="text-amber-400 font-bold">11:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">WhatsApp Concierge:</span>
                    <span className="text-emerald-400 font-bold">24 / 7 Live Response</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">SOCIAL MEDIA & ARCHIVES</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a href="#instagram" className="bg-slate-950 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-slate-300 hover:text-amber-400 flex items-center space-x-2 transition-all">
                    <Instagram className="w-4 h-4 text-amber-400" />
                    <span>@BalajiSarees</span>
                  </a>
                  <a href="#facebook" className="bg-slate-950 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-slate-300 hover:text-amber-400 flex items-center space-x-2 transition-all">
                    <Facebook className="w-4 h-4 text-amber-400" />
                    <span>BalajiHandloom</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GOOGLE MAP BOUTIQUE LOCATOR INTERACTIVE CANVAS */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">INTERACTIVE STORE MAP</span>
                <h2 className="text-2xl font-serif font-bold text-white">Visit Our Flagship Ateliers</h2>
              </div>

              {/* Location Switcher Buttons */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
                {storeLocations.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedMapStore(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedMapStore === s.id
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Map Detail Info (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-amber-500/20 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase block">{selectedStoreObj.status}</span>
                <h3 className="font-serif font-bold text-lg text-white">{selectedStoreObj.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedStoreObj.address}</p>

                <div className="space-y-1.5 text-xs font-mono border-t border-slate-800 pt-3">
                  <p className="text-slate-400">Phone: <span className="text-white font-bold">{selectedStoreObj.phone}</span></p>
                  <p className="text-slate-400">Hours: <span className="text-amber-400 font-bold">{selectedStoreObj.hours}</span></p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedStoreObj.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open In Google Maps</span>
                </a>
              </div>

              {/* Right Embedded Map Iframe Canvas (8 Cols) */}
              <div className="lg:col-span-8 aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative">
                <iframe
                  title="Google Map Store Location"
                  src={selectedStoreObj.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>

          {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">CLIENT CONCIERGE HELP</span>
              <h2 className="text-2xl font-serif font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-serif text-sm font-bold text-white flex items-center justify-between hover:text-amber-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-800/60 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* RECENT STORED MESSAGES IN DATABASE TABLE DEMO */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>Database Persisted Messages Log</span>
                </h3>
                <p className="text-xs text-slate-400">Live view of messages saved into the backend database.</p>
              </div>
              <span className="bg-amber-500/10 text-amber-300 text-xs font-mono px-3 py-1 rounded-full border border-amber-500/30">
                {storedMessages.length} Total Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-amber-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Inquiry Type</th>
                    <th className="p-3">Atelier</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {storedMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-950/60">
                      <td className="p-3 text-amber-400 font-bold">{msg.id}</td>
                      <td className="p-3 text-white">{msg.name}</td>
                      <td className="p-3 text-slate-300">{msg.inquiryType}</td>
                      <td className="p-3 text-slate-400">{msg.storeLocation}</td>
                      <td className="p-3 text-slate-500 text-[10px]">{msg.createdAt}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          msg.status === 'Unread' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {msg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* VIEW MODE 2: SOURCE CODE & SMTP SCRIPT INSPECTOR */}
      {viewMode === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono">contact.php / schema.sql / contact.js</h3>
              <p className="text-xs text-slate-400">PHPMailer SMTP ready backend script and PDO MySQL table migration schema.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('php')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  activeCodeTab === 'php' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                contact.php
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
                contact.js
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-amber-300 font-mono text-xs overflow-x-auto max-h-[500px]">
            {activeCodeTab === 'php' && `<?php
// api/contact-smtp.php - PHPMailer & MySQL Persistence
use PHPMailer\\PHPMailer\\PHPMailer;
require '../vendor/autoload.php';
require '../config/database.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['message'])) {
  echo json_encode(['status' => 'error', 'message' => 'Validation failed']);
  exit;
}

// 1. Insert into Database
$stmt = $pdo->prepare("INSERT INTO contact_messages (full_name, email, phone, inquiry_type, store_location, message) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute([
  $data['fullName'], $data['email'], $data['phone'], 
  $data['inquiryType'], $data['storeLocation'], $data['message']
]);

// 2. Route via SMTP using PHPMailer
$mail = new PHPMailer(true);
try {
  $mail->isSMTP();
  $mail->Host       = 'smtp.balajisarees.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'concierge@balajisarees.com';
  $mail->Password   = 'SecretSMTPPass2026';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->setFrom('concierge@balajisarees.com', 'BALAJI Concierge');
  $mail->addAddress($data['email'], $data['fullName']);
  $mail->Subject = 'Confirmation: Bridal Concierge Inquiry Received';
  $mail->Body    = "Dear " . $data['fullName'] . ",\\n\\nWe have received your inquiry for " . $data['inquiryType'] . ". Our team will contact you shortly.";

  $mail->send();
  echo json_encode(['status' => 'success', 'ticket_id' => 'MSG-' . rand(100, 999)]);
} catch (Exception $e) {
  echo json_encode(['status' => 'partial_success', 'db_saved' => true, 'mail_error' => $mail->ErrorInfo]);
}
?>`}

            {activeCodeTab === 'sql' && `-- migrations/contact_messages.sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  inquiry_type VARCHAR(100) DEFAULT 'General Inquiry',
  store_location VARCHAR(100) DEFAULT 'Varanasi Flagship Guild',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Unread', 'Replied', 'In Progress') DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}

            {activeCodeTab === 'js' && `// assets/js/contact.js - Vanilla JS AJAX Form Handler
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    inquiryType: document.getElementById('inquiryType').value,
    message: document.getElementById('message').value
  };

  try {
    const res = await fetch('/api/contact-smtp.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.status === 'success') {
      alert('Message stored and sent! Ticket ID: ' + result.ticket_id);
    }
  } catch (err) {
    console.error('Contact Submission Error:', err);
  }
});`}
          </pre>
        </div>
      )}
    </div>
  );
};
