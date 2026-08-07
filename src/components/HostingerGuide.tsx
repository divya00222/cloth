import React from 'react';
import { Server, CheckCircle, FileText, Lock, Cpu } from 'lucide-react';

export const HostingerGuide: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200 space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Server className="w-5 h-5 text-amber-500" />
          <span>Hostinger Shared Hosting Deployment Blueprint</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Exact hPanel configurations, directory permissions, PHP flags, and Apache `.htaccess` directives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Hostinger Recommended PHP Settings</span>
          </h3>
          <ul className="text-xs space-y-2 text-slate-300 font-mono">
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">PHP Version:</span>
              <span className="text-emerald-400 font-bold">PHP 8.2 or 8.3 (LTS)</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">memory_limit:</span>
              <span>256M</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">upload_max_filesize:</span>
              <span>32M</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">post_max_size:</span>
              <span>32M</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">max_execution_time:</span>
              <span>60s</span>
            </li>
            <li className="flex items-center justify-between pb-1">
              <span className="text-slate-400">PHP Extensions:</span>
              <span className="text-amber-300">pdo_mysql, gd, mbstring, cURL, openssl</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>File & Directory Permission Matrix</span>
          </h3>
          <ul className="text-xs space-y-2 text-slate-300 font-mono">
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">Directories (/app, /config):</span>
              <span className="text-amber-400 font-bold">chmod 755</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">PHP Files (.php):</span>
              <span className="text-amber-400 font-bold">chmod 644</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-400">Upload Folder (/public/uploads):</span>
              <span className="text-emerald-400 font-bold">chmod 755 (Exec disabled)</span>
            </li>
            <li className="flex items-center justify-between pb-1">
              <span className="text-slate-400">Config File (/config/config.php):</span>
              <span className="text-red-400 font-bold">chmod 600 or 644</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-amber-500" />
          <span>Hostinger Production .htaccess Configuration</span>
        </h3>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
          <pre>{`# BALAJI CLOTHING STORE - HOSTINGER PRODUCTION .HTACCESS
Options -Indexes
RewriteEngine On

# Force HTTPS SSL
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Route all request to Front Controller
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?url=$1 [QSA,L]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>

# Browser Caching Headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>`}</pre>
        </div>
      </div>
    </div>
  );
};
