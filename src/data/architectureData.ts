import { ArchSection, FolderNode, DbTable, SecurityMeasure, FolderExplanation } from '../types';

export const SECTIONS: ArchSection[] = [
  { id: 'overview', title: '1. Project Overview & Scope', number: 1, category: 'Overview', summary: 'Core objectives, non-framework tech stack, and Hostinger compatibility constraints.' },
  { id: 'folder-structure', title: '2. High-Level Folder Structure', number: 2, category: 'Structure', summary: 'Directory organization separating public webroot from protected PHP core files.' },
  { id: 'file-structure', title: '3. Detailed File Structure', number: 3, category: 'Structure', summary: 'Granular file mapping for controllers, models, views, helpers, and assets.' },
  { id: 'mvc-php', title: '4. MVC-like Core PHP Architecture', number: 4, category: 'Backend', summary: 'Custom procedural/OOP Front-Controller pattern without heavy framework overhead.' },
  { id: 'database-plan', title: '5. Database Planning & Schema', number: 5, category: 'Database', summary: 'Normalized MySQL database schema, relational keys, and index optimizations.' },
  { id: 'naming-conventions', title: '6. Naming Conventions', number: 6, category: 'Backend', summary: 'Strict standards for PHP variables, DB tables, CSS classes, and files.' },
  { id: 'coding-standards', title: '7. Coding Standards & Conventions', number: 7, category: 'Backend', summary: 'PSR-12 compliance, strict typing, error handling, and clean code principles.' },
  { id: 'components', title: '8. Reusable PHP & UI Components', number: 8, category: 'Frontend', summary: 'Modular component blocks like Product Cards, Navigation, Modal, and Badges.' },
  { id: 'includes', title: '9. Includes Structure & Layout System', number: 9, category: 'Frontend', summary: 'Dry header, footer, sidebar, and layout partial management.' },
  { id: 'assets', title: '10. Assets Organization Strategy', number: 10, category: 'Frontend', summary: 'Vanilla CSS modules, JS event delegates, and static asset distribution.' },
  { id: 'admin-panel', title: '11. Admin Panel Architecture', number: 11, category: 'Backend', summary: 'Secure CMS dashboard for catalog management, orders, analytics, and settings.' },
  { id: 'frontend-arch', title: '12. Frontend Architecture & JS Engine', number: 12, category: 'Frontend', summary: 'Vanilla JS DOM handlers, Fetch API wrappers, state management, and animations.' },
  { id: 'security', title: '13. Comprehensive Security Architecture', number: 13, category: 'Security & Ops', summary: 'PDO Prepared statements, CSRF tokens, XSS sanitization, password hashing, htaccess.' },
  { id: 'seo', title: '14. Technical SEO Architecture', number: 14, category: 'Frontend', summary: 'Dynamic meta tags, OpenGraph markup, JSON-LD Schema.org, sitemap generator.' },
  { id: 'performance', title: '15. Performance Optimization Plan', number: 15, category: 'Security & Ops', summary: 'Gzip/Brotli, browser caching, CSS/JS minification, and database query caching.' },
  { id: 'image-mgmt', title: '16. Image Management & CDN Strategy', number: 16, category: 'Security & Ops', summary: 'Automatic WebP conversion, thumbnail generation, lazy loading, upload security.' },
  { id: 'responsive', title: '17. Responsive Strategy & Breakpoints', number: 17, category: 'Frontend', summary: 'Mobile-first CSS grid & flexbox design system without framework bloat.' },
  { id: 'scalability', title: '18. Future Scalability & Hosting Roadmap', number: 18, category: 'Security & Ops', summary: 'Shared hosting scaling path, Cloudflare CDN, Redis upgrade, and migration plan.' }
];

export const FOLDER_EXPLANATIONS: FolderExplanation[] = [
  {
    path: "/config/",
    name: "config",
    purpose: "Stores central environment configuration, MySQL database access keys, site constants, and error settings.",
    whyRequired: "Essential for centralizing sensitive database credentials and environment rules, ensuring you never hardcode DB password or site URLs in multiple files.",
    permissions: "chmod 755 (Directories) / 600 or 644 (Files)",
    securityNote: "Should be protected via .htaccess or placed outside public webroot to prevent direct HTTP access to credentials.",
    keyFiles: ["config.php", "database.php", "constants.php"]
  },
  {
    path: "/database/",
    name: "database",
    purpose: "Holds database schema DDL migrations, initial SQL seed scripts, stored procedures, and raw database backups.",
    whyRequired: "Provides a version-controlled repository of database tables (users, products, categories, orders) for seamless server deployment on Hostinger phpMyAdmin.",
    permissions: "chmod 755",
    securityNote: "Contains raw SQL structure files; must be protected from public HTTP execution via .htaccess.",
    keyFiles: ["schema.sql", "seed_data.sql", "indexes.sql"]
  },
  {
    path: "/classes/",
    name: "classes",
    purpose: "Houses Object-Oriented Core PHP backend classes (Database Singleton, Model entities, Cart engine, Auth manager).",
    whyRequired: "Encapsulates reusable business logic and database CRUD operations into OOP classes, keeping views clean and avoiding code duplication.",
    permissions: "chmod 755",
    securityNote: "Encapsulates internal DB state; directly invoked only by Front Controller or pages.",
    keyFiles: ["Database.php", "Product.php", "Category.php", "User.php", "Cart.php", "Order.php"]
  },
  {
    path: "/functions/",
    name: "functions",
    purpose: "Contains procedural global helper functions (XSS sanitizers, session flash notifications, price formatters, dynamic slug generators).",
    whyRequired: "Provides quick, global access to essential utility functions across both frontend views and admin handlers without needing class instantiation overhead.",
    permissions: "chmod 755",
    securityNote: "Includes the security escape function e() used to sanitize all output against XSS attacks.",
    keyFiles: ["sanitizer.php", "helpers.php", "session.php", "auth.php"]
  },
  {
    path: "/includes/",
    name: "includes",
    purpose: "Stores modular layout partials (site header, mega navbar, footer, sidebar filter drawer, mobile navigation).",
    whyRequired: "Enforces DRY (Don't Repeat Yourself) principle by allowing all pages to dynamically include the same header/footer files.",
    permissions: "chmod 755",
    securityNote: "Direct access prevented by checking defined constant e.g., if(!defined('BALAJI_EXEC')) exit();",
    keyFiles: ["header.php", "footer.php", "navbar.php", "sidebar-filter.php", "cart-drawer.php"]
  },
  {
    path: "/pages/",
    name: "pages (or views)",
    purpose: "Holds individual public frontend HTML template views rendered for customers (Homepage, Catalog, Detail, Cart, Checkout).",
    whyRequired: "Contains the user-facing HTML templates styled with CSS3 and driven by Vanilla JS, separated from pure backend database logic.",
    permissions: "chmod 755",
    securityNote: "Receives sanitized variables from controllers/handlers; no raw $_POST or $_GET processing inside views.",
    keyFiles: ["home.php", "catalog.php", "product-detail.php", "cart.php", "checkout.php", "order-success.php"]
  },
  {
    path: "/api/",
    name: "api",
    purpose: "Serves public and external API endpoints (e.g., payment webhook verification, stock sync, shipping rates).",
    whyRequired: "Handles structured JSON requests from third-party payment gateways (Razorpay/Stripe) or mobile clients.",
    permissions: "chmod 755",
    securityNote: "Enforces strict API key validation, rate limiting, and SSL HTTPS requirements.",
    keyFiles: ["payment-webhook.php", "products-feed.php"]
  },
  {
    path: "/ajax/",
    name: "ajax",
    purpose: "Dedicated asynchronous endpoint directory for smooth, no-refresh Vanilla JS Fetch requests (Add to cart, Live search, Catalog filter).",
    whyRequired: "Delivers JSON responses to client-side Vanilla JavaScript without requiring full page reloads, providing a fast SPA-like experience.",
    permissions: "chmod 755",
    securityNote: "All AJAX endpoints strictly validate session CSRF tokens and HTTP POST method headers.",
    keyFiles: ["cart-action.php", "filter-products.php", "search-live.php", "apply-coupon.php"]
  },
  {
    path: "/admin/",
    name: "admin",
    purpose: "Houses the secure Admin Panel for store management (Dashboard, Product Catalog CMS, Order fulfillment, Banner management).",
    whyRequired: "Gives shop owners a full CMS interface to add products, adjust pricing, upload saree images, track inventory, and manage customer orders.",
    permissions: "chmod 755",
    securityNote: "Protected by admin session authentication middleware, IP rate limits, and CSRF tokens.",
    keyFiles: ["index.php", "dashboard.php", "products.php", "categories.php", "orders.php", "banners.php", "settings.php"]
  },
  {
    path: "/assets/",
    name: "assets",
    purpose: "Parent public container for all static client-side web assets (CSS, JS, Fonts, Static Graphics).",
    whyRequired: "Separates static browser resources from dynamic PHP backend scripts, allowing aggressive Apache browser caching headers on Hostinger.",
    permissions: "chmod 755",
    securityNote: "Static media only; no PHP execution inside asset directories.",
    keyFiles: ["css/", "js/", "images/", "fonts/"]
  },
  {
    path: "/assets/css/",
    name: "assets/css",
    purpose: "Contains custom CSS3 modular stylesheets (variables, typography, layout grid, component styles, responsive breakpoints).",
    whyRequired: "Replaces heavy CSS frameworks like Bootstrap/Tailwind with a lightweight, ultra-fast, tailored CSS3 stylesheet under 35KB.",
    permissions: "chmod 755",
    securityNote: "Served with 1-year cache control headers for instant page loads.",
    keyFiles: ["style.css", "responsive.css", "variables.css", "admin.css"]
  },
  {
    path: "/assets/js/",
    name: "assets/js",
    purpose: "Contains Vanilla JavaScript (ES6+) scripts for DOM manipulation, mobile menu toggles, Fetch API calls, and modal dialogs.",
    whyRequired: "Handles client-side interactivity without heavy JavaScript frameworks (React/jQuery), ensuring fast execution on all mobile devices.",
    permissions: "chmod 755",
    securityNote: "Uses strict mode ('use strict') and escapes all dynamic innerHTML strings.",
    keyFiles: ["main.js", "catalog.js", "cart.js", "checkout.js", "admin.js"]
  },
  {
    path: "/assets/images/",
    name: "assets/images",
    purpose: "Stores static site branding visual assets (BALAJI logo, favicon, payment icons, fallback image placeholders, decorative vectors).",
    whyRequired: "Keeps site brand assets organized separately from user-uploaded product photos in /uploads/.",
    permissions: "chmod 755",
    securityNote: "Optimized WebP / SVG formats for high-DPI displays.",
    keyFiles: ["logo.svg", "favicon.ico", "placeholder.webp", "payment-methods.svg"]
  },
  {
    path: "/uploads/",
    name: "uploads",
    purpose: "Dynamic media storage directory for user-uploaded product photos, banner sliders, and category thumbnails.",
    whyRequired: "Provides a dedicated folder where PHP write permissions allow uploading product images via the Admin Panel.",
    permissions: "chmod 755 (Directory) / 644 (Uploaded files)",
    securityNote: "CRITICAL: Script execution is strictly disabled via .htaccess (php_flag engine off) to prevent malicious upload attacks.",
    keyFiles: ["products/", "banners/", "categories/"]
  },
  {
    path: "/logs/",
    name: "logs",
    purpose: "Stores application error logs, database failure logs, payment gateway audit logs, and security intrusion attempt logs.",
    whyRequired: "Crucial for production debugging and tracking issues on shared hosting without printing sensitive raw PHP errors to public users.",
    permissions: "chmod 700 or 755 (Completely HTTP Denied via .htaccess)",
    securityNote: "Protected by 'Deny from all' in .htaccess to prevent public reading of system log files.",
    keyFiles: ["error.log", "db_errors.log", "security.log", "orders_audit.log"]
  },
  {
    path: "/vendor/",
    name: "vendor (optional)",
    purpose: "Holds standalone, non-composer third-party libraries (e.g. PHPMailer for SMTP emails, Razorpay payment SDK, TCPDF for PDF invoices).",
    whyRequired: "Allows integrating essential third-party services (SMTP emailing, PDF receipt generation) without introducing heavy Composer build steps on Hostinger.",
    permissions: "chmod 755",
    securityNote: "Contains audited third-party PHP packages kept up to date.",
    keyFiles: ["phpmailer/", "tcpdf/", "razorpay/"]
  }
];

export const PROJECT_TREE: FolderNode = {
  name: "balaji_store/",
  type: "folder",
  description: "Root project directory (Hostinger public_html)",
  children: [
    {
      name: "config/",
      type: "folder",
      description: "Protected server configuration & DB parameters",
      children: [
        { name: "config.php", type: "file", description: "Global environment config & error settings" },
        { name: "database.php", type: "file", description: "PDO Singleton database connection wrapper" },
        { name: "constants.php", type: "file", description: "Site URL, upload path constants, payment keys" }
      ]
    },
    {
      name: "database/",
      type: "folder",
      description: "MySQL schema migrations, indexes & seed data",
      children: [
        { name: "schema.sql", type: "file", description: "Full MySQL DDL table creation script" },
        { name: "seed_data.sql", type: "file", description: "Default admin user & initial category seed" },
        { name: "indexes.sql", type: "file", description: "Performance index optimization rules" }
      ]
    },
    {
      name: "classes/",
      type: "folder",
      description: "Core OOP PHP Classes (Models & Controllers)",
      children: [
        { name: "Database.php", type: "file", description: "PDO Connection & Transaction wrapper" },
        { name: "Product.php", type: "file", description: "Product catalog CRUD & stock inventory logic" },
        { name: "Category.php", type: "file", description: "Category taxonomy & subcategory hierarchy" },
        { name: "Cart.php", type: "file", description: "Session-based shopping cart calculation engine" },
        { name: "Order.php", type: "file", description: "Order creation, billing calculation & status updates" },
        { name: "User.php", type: "file", description: "User login, registration, password hash management" }
      ]
    },
    {
      name: "functions/",
      type: "folder",
      description: "Procedural helper utilities & security functions",
      children: [
        { name: "sanitizer.php", type: "file", description: "XSS prevention, input cleaning & string escape e()" },
        { name: "session.php", type: "file", description: "Session handler, CSRF token validation & flash alerts" },
        { name: "helpers.php", type: "file", description: "Currency formatter (₹), slug generators, date utilities" }
      ]
    },
    {
      name: "includes/",
      type: "folder",
      description: "Reusable HTML/PHP partial layout templates",
      children: [
        { name: "header.php", type: "file", description: "HTML head, meta tags, CSS link tags, top notification bar" },
        { name: "footer.php", type: "file", description: "Footer navigation, newsletter subscription, JS scripts" },
        { name: "navbar.php", type: "file", description: "Responsive brand logo & category mega-menu" },
        { name: "sidebar-filter.php", type: "file", description: "Product filtering sidebar (Price, Fabric, Size)" },
        { name: "cart-drawer.php", type: "file", description: "Slide-over AJAX mini cart overlay" }
      ]
    },
    {
      name: "pages/",
      type: "folder",
      description: "Public storefront view templates",
      children: [
        { name: "home.php", type: "file", description: "Storefront landing page with hero banners & collections" },
        { name: "catalog.php", type: "file", description: "Product listing grid with AJAX pagination" },
        { name: "product-detail.php", type: "file", description: "Single product view with size/color picker" },
        { name: "cart.php", type: "file", description: "Shopping cart page with coupon input" },
        { name: "checkout.php", type: "file", description: "Customer shipping address & payment checkout form" },
        { name: "order-success.php", type: "file", description: "Order confirmation receipt page" }
      ]
    },
    {
      name: "api/",
      type: "folder",
      description: "External API integrations & webhooks",
      children: [
        { name: "payment-webhook.php", type: "file", description: "Razorpay / Stripe automated payment verification" },
        { name: "products-feed.php", type: "file", description: "Google Merchant Center XML product feed generator" }
      ]
    },
    {
      name: "ajax/",
      type: "folder",
      description: "Asynchronous Fetch endpoints for client-side JS",
      children: [
        { name: "cart-action.php", type: "file", description: "AJAX Add/Remove/Update items without page refresh" },
        { name: "filter-products.php", type: "file", description: "AJAX instant catalog filtering handler" },
        { name: "search-live.php", type: "file", description: "AJAX instant search auto-complete endpoint" }
      ]
    },
    {
      name: "admin/",
      type: "folder",
      description: "Protected Admin Control Panel",
      children: [
        { name: "index.php", type: "file", description: "Admin authentication login gate" },
        { name: "dashboard.php", type: "file", description: "Executive sales analytics & inventory metrics" },
        { name: "products.php", type: "file", description: "Product management CMS (Add/Edit/Delete/Stock)" },
        { name: "orders.php", type: "file", description: "Order status management & PDF invoice printer" },
        { name: "banners.php", type: "file", description: "Homepage banner & promo grid slider CMS" },
        { name: "settings.php", type: "file", description: "Global store settings, shipping rates & tax rates" }
      ]
    },
    {
      name: "assets/",
      type: "folder",
      description: "Public browser assets container",
      children: [
        {
          name: "css/",
          type: "folder",
          children: [
            { name: "style.css", type: "file", description: "Main lightweight CSS3 stylesheet" },
            { name: "responsive.css", type: "file", description: "Mobile-first breakpoint media queries" },
            { name: "admin.css", type: "file", description: "Admin dashboard custom styling" }
          ]
        },
        {
          name: "js/",
          type: "folder",
          children: [
            { name: "main.js", type: "file", description: "Vanilla JS mobile menu, modal & UI delegate" },
            { name: "catalog.js", type: "file", description: "AJAX catalog filter & sorting handler" },
            { name: "cart.js", type: "file", description: "Client-side cart drawer & quantity sync" }
          ]
        },
        {
          name: "images/",
          type: "folder",
          children: [
            { name: "logo.svg", type: "file", description: "BALAJI brand vector logo" },
            { name: "favicon.ico", type: "file", description: "Browser tab icon" },
            { name: "placeholder.jpg", type: "file", description: "Fallback image placeholder" }
          ]
        }
      ]
    },
    {
      name: "uploads/",
      type: "folder",
      description: "Dynamic media storage (chmod 755, PHP exec disabled)",
      children: [
        { name: "products/", type: "folder", description: "Product photos & WebP thumbnails" },
        { name: "banners/", type: "folder", description: "Homepage promotional slider graphics" }
      ]
    },
    {
      name: "logs/",
      type: "folder",
      description: "Protected error & security log files (HTTP Denied)",
      children: [
        { name: "error.log", type: "file", description: "Application runtime error log" },
        { name: "security.log", type: "file", description: "Intrusion & invalid login log" }
      ]
    },
    {
      name: "vendor/",
      type: "folder",
      description: "Standalone lightweight third-party PHP libraries",
      children: [
        { name: "phpmailer/", type: "folder", description: "SMTP transactional email library" },
        { name: "tcpdf/", type: "folder", description: "PDF invoice generator engine" }
      ]
    },
    { name: ".htaccess", type: "file", description: "Apache URL rewrite rules, HTTPS redirect & security headers" },
    { name: "index.php", type: "file", description: "Front Controller entry point directing all site traffic" }
  ]
};

export const DB_TABLES: DbTable[] = [
  {
    name: "users",
    description: "Customer and admin user accounts",
    columns: [
      { name: "id", type: "INT UNSIGNED", key: "PK", nullable: false, description: "Auto-increment primary key" },
      { name: "full_name", type: "VARCHAR(100)", nullable: false, description: "Full name of customer" },
      { name: "email", type: "VARCHAR(150)", key: "UK", nullable: false, description: "Unique email address" },
      { name: "phone", type: "VARCHAR(20)", nullable: true, description: "Contact number" },
      { name: "password_hash", type: "VARCHAR(255)", nullable: false, description: "Bcrypt or Argon2id hashed password" },
      { name: "role", type: "ENUM('customer','admin')", nullable: false, defaultVal: "'customer'", description: "Access level control" },
      { name: "status", type: "TINYINT(1)", nullable: false, defaultVal: "1", description: "1 = Active, 0 = Suspended" },
      { name: "created_at", type: "DATETIME", nullable: false, defaultVal: "CURRENT_TIMESTAMP", description: "Registration timestamp" }
    ],
    indexes: ["idx_users_email (email)", "idx_users_role (role)"]
  },
  {
    name: "categories",
    description: "Multi-level category taxonomy (e.g. Ethnic Wear > Sarees)",
    columns: [
      { name: "id", type: "INT UNSIGNED", key: "PK", nullable: false, description: "Category primary ID" },
      { name: "parent_id", type: "INT UNSIGNED", key: "FK", nullable: true, defaultVal: "NULL", description: "Parent category ID for subcategories" },
      { name: "name", type: "VARCHAR(100)", nullable: false, description: "Category display name" },
      { name: "slug", type: "VARCHAR(120)", key: "UK", nullable: false, description: "SEO friendly URL slug" },
      { name: "description", type: "TEXT", nullable: true, description: "Category SEO meta content" },
      { name: "image", type: "VARCHAR(255)", nullable: true, description: "Category thumbnail image path" },
      { name: "is_featured", type: "TINYINT(1)", nullable: false, defaultVal: "0", description: "Display on homepage" }
    ],
    indexes: ["idx_categories_slug (slug)", "idx_categories_parent (parent_id)"]
  },
  {
    name: "products",
    description: "Main clothing inventory products table",
    columns: [
      { name: "id", type: "INT UNSIGNED", key: "PK", nullable: false, description: "Product primary ID" },
      { name: "category_id", type: "INT UNSIGNED", key: "FK", nullable: false, description: "Foreign key to categories table" },
      { name: "title", type: "VARCHAR(200)", nullable: false, description: "Clothing item name (e.g. Silk Kanjeevaram Saree)" },
      { name: "sku", type: "VARCHAR(50)", key: "UK", nullable: false, description: "Stock Keeping Unit identifier" },
      { name: "slug", type: "VARCHAR(220)", key: "UK", nullable: false, description: "SEO URL slug" },
      { name: "regular_price", type: "DECIMAL(10,2)", nullable: false, description: "Base MSRP price in INR/USD" },
      { name: "sale_price", type: "DECIMAL(10,2)", nullable: true, description: "Discounted promotional price" },
      { name: "stock_quantity", type: "INT", nullable: false, defaultVal: "0", description: "Total inventory unit count" },
      { name: "description", type: "TEXT", nullable: false, description: "Fabric details, weave type, washing instructions" },
      { name: "main_image", type: "VARCHAR(255)", nullable: false, description: "Primary product photo file path" },
      { name: "is_active", type: "TINYINT(1)", nullable: false, defaultVal: "1", description: "Published state" },
      { name: "is_featured", type: "TINYINT(1)", nullable: false, defaultVal: "0", description: "Featured collection tag" }
    ],
    indexes: ["idx_products_cat (category_id)", "idx_products_slug (slug)", "idx_products_price (sale_price, regular_price)"]
  },
  {
    name: "product_variants",
    description: "Clothing sizes (S, M, L, XL, XXL) and colors",
    columns: [
      { name: "id", type: "INT UNSIGNED", key: "PK", nullable: false, description: "Variant primary ID" },
      { name: "product_id", type: "INT UNSIGNED", key: "FK", nullable: false, description: "Foreign key to products table" },
      { name: "size", type: "VARCHAR(20)", nullable: false, description: "S, M, L, XL, Free Size, etc." },
      { name: "color", type: "VARCHAR(50)", nullable: false, description: "Royal Blue, Crimson Red, Gold, etc." },
      { name: "stock", type: "INT", nullable: false, defaultVal: "0", description: "Quantity available for size/color" },
      { name: "price_adjustment", type: "DECIMAL(10,2)", nullable: false, defaultVal: "0.00", description: "Price delta if custom size" }
    ],
    indexes: ["idx_variants_prod (product_id)"]
  },
  {
    name: "orders",
    description: "Customer transactions and order status",
    columns: [
      { name: "id", type: "INT UNSIGNED", key: "PK", nullable: false, description: "Order ID" },
      { name: "order_number", type: "VARCHAR(50)", key: "UK", nullable: false, description: "Unique order ref (e.g. BALAJI-2026-9041)" },
      { name: "user_id", type: "INT UNSIGNED", key: "FK", nullable: true, description: "User ID or NULL for guest checkout" },
      { name: "total_amount", type: "DECIMAL(10,2)", nullable: false, description: "Final payable amount" },
      { name: "payment_status", type: "ENUM('pending','paid','failed')", nullable: false, defaultVal: "'pending'", description: "Payment state" },
      { name: "order_status", type: "ENUM('processing','shipped','delivered','cancelled')", nullable: false, defaultVal: "'processing'", description: "Fulfillment state" },
      { name: "shipping_address", type: "TEXT", nullable: false, description: "Full delivery address & PIN code" },
      { name: "created_at", type: "DATETIME", nullable: false, defaultVal: "CURRENT_TIMESTAMP", description: "Purchase timestamp" }
    ],
    indexes: ["idx_orders_user (user_id)", "idx_orders_status (order_status)"]
  }
];

export const SECURITY_MEASURES: SecurityMeasure[] = [
  {
    threat: "SQL Injection (SQLi)",
    mitigation: "Use 100% PDO Prepared Statements with bound parameters across all models.",
    codeSnippet: `$stmt = $pdo->prepare("SELECT * FROM products WHERE category_id = :cat_id AND is_active = 1");\n$stmt->execute(['cat_id' => $categoryId]);`,
    status: "Critical"
  },
  {
    threat: "Cross-Site Scripting (XSS)",
    mitigation: "Contextual HTML escaping using htmlspecialchars() on all dynamic view outputs.",
    codeSnippet: `function e($string) {\n    return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');\n}`,
    status: "Critical"
  },
  {
    threat: "Cross-Site Request Forgery (CSRF)",
    mitigation: "Synchronizer token pattern generated per user session for all POST forms and AJAX requests.",
    codeSnippet: `$_SESSION['csrf_token'] = bin2hex(random_bytes(32));\n// In Form: <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">`,
    status: "Critical"
  },
  {
    threat: "Direct Directory Traversal & PHP File Execution",
    mitigation: "Disable script execution in /public/uploads/ via .htaccess directives.",
    codeSnippet: `<Directory "/public_html/uploads">\n    php_flag engine off\n    Options -Indexes\n</Directory>`,
    status: "High"
  },
  {
    threat: "Password Database Breach",
    mitigation: "Store passwords using PHP password_hash() with PASSWORD_BCRYPT or PASSWORD_ARGON2ID.",
    codeSnippet: `$hash = password_hash($plainPassword, PASSWORD_DEFAULT);\n$isValid = password_verify($inputPassword, $hash);`,
    status: "High"
  }
];
