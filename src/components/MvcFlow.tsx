import React from 'react';
import { Server, ArrowRight, ShieldCheck, Database, Layout, Globe } from 'lucide-react';

export const MvcFlowVisualizer: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'HTTP Request & .htaccess Rewrite',
      icon: <Globe className="w-5 h-5 text-amber-400" />,
      desc: 'Browser requests URL like https://balaji.com/product/silk-saree. Apache .htaccess rewrites request silently to root index.php?url=product/silk-saree.',
      file: '.htaccess -> index.php'
    },
    {
      step: 2,
      title: 'Front Controller & Router',
      icon: <Server className="w-5 h-5 text-amber-400" />,
      desc: 'index.php initializes PDO database, loads config/constants.php, starts session, validates CSRF token, and parses URL segments to identify Controller & Action.',
      file: 'index.php & config/database.php'
    },
    {
      step: 3,
      title: 'Controller Logic Execution',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      desc: 'ProductController::detail("silk-saree") is invoked. It sanitizes inputs using Sanitizer helper and requests data from ProductModel.',
      file: 'app/Controllers/ProductController.php'
    },
    {
      step: 4,
      title: 'Model & PDO Query Execution',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      desc: 'ProductModel executes prepared PDO SQL query with index optimization to fetch product details, variants, and gallery images from MySQL.',
      file: 'app/Models/ProductModel.php'
    },
    {
      step: 5,
      title: 'View Rendering & Response',
      icon: <Layout className="w-5 h-5 text-amber-400" />,
      desc: 'Controller binds dataset into views/product-detail.php. Includes layout partials (header.php, navbar.php, footer.php) and returns sanitized HTML string.',
      file: 'views/product-detail.php'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200">
      <div className="pb-4 mb-6 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Server className="w-5 h-5 text-amber-500" />
          <span>Core PHP Front Controller & MVC Lifecycle</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Lightweight, zero-framework HTTP request routing optimized for Hostinger Shared Hosting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((item, idx) => (
          <div key={item.step} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-amber-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center justify-center border border-amber-500/30">
                  0{item.step}
                </span>
                {item.icon}
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-amber-300/80 block bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {item.file}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-amber-500/60">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-amber-400">Why Core PHP Front-Controller over Heavy Frameworks on Shared Hosting?</span>
          <p className="text-slate-400 mt-0.5">
            100% standard Core PHP eliminates composer vendor bloat, cold-start delay, and RAM overhead on Hostinger plans, serving pages in under 80ms!
          </p>
        </div>
        <div className="shrink-0 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-mono text-[11px] text-emerald-400">
          Response Time: &lt; 80ms
        </div>
      </div>
    </div>
  );
};
