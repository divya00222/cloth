# AURA Studios - Premium Fashion E-Commerce Master Demo Template

A high-end, production-quality **Frontend-Only** fashion and clothing e-commerce demo website crafted with clean, modern **HTML5, CSS3, and Vanilla JavaScript**.

Designed specifically as a reusable agency master template for presenting fashion stores to clients with high-conversion editorial presentation.

---

## 📁 Directory Structure

```
/
├── index.html              # Editorial Homepage Foundation
├── shop.html               # Product Catalog & Category Filters
├── product.html            # Single Product Detail Template
├── cart.html               # Shopping Bag Summary
├── checkout.html           # Encrypted Demo Checkout Form
├── about.html              # Brand Story & Heritage
├── contact.html            # Client Advisory & Concierge
├── offers.html             # Private Sale & Promotions
├── wishlist.html           # Saved Favourites
├── assets/
│   ├── css/
│   │   ├── style.css       # Global Design Tokens & Components
│   │   ├── responsive.css  # Mobile-First Responsive Breakpoints
│   │   └── animations.css  # Micro-Interactions & Keyframe Animations
│   ├── js/
│   │   ├── main.js         # Page Logic Initializer
│   │   ├── products.js     # Catalog Data Store & API Query Engine
│   │   ├── cart.js         # LocalStorage Cart & Wishlist Engine
│   │   └── ui.js           # Drawers, Modals, Toasts & Interaction Manager
│   └── images/
│       ├── products/       # Product Asset References
│       ├── banners/        # Hero Editorial Banners
│       ├── categories/     # Curated Category Photography
│       └── branding/       # Identity & Logos
└── README.md
```

---

## 🎨 Global Design System & Branding Customization

All visual styles are driven by standardized **CSS3 Custom Properties** in `assets/css/style.css`:

```css
:root {
  --color-primary: #121212;         /* Deep Obsidian Graphite */
  --color-accent: #C5A059;          /* Warm Champagne Gold */
  --color-bg: #FAF9F6;              /* Warm Alabaster Canvas */
  --color-surface: #FFFFFF;         /* Crisp Card Surface */
  --color-text: #121212;            /* Primary Typography */
  --color-sale: #A62626;            /* Promotional Badge Red */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --container-max-width: 1400px;
}
```

### To rebrand for a new client:
Simply update the `:root` CSS variables inside `assets/css/style.css`. All colors, typography scales, container max-widths, border radii, and shadows will adapt automatically across the entire site!

---

## ⚡ Core Features & Micro-Interactions

1. **Sticky Header & Mega-Menu**:
   - Announcement ticker bar with threshold messaging ("Free shipping on orders over NPR 3,000").
   - Desktop mega-menu with featured collection banners and categorized lists.
   - Mobile touch-optimized slide-over navigation drawer.

2. **Interactive Product Cards**:
   - Image crossfade on hover showing alternate angles.
   - Quick Add to Bag with instant slide-over mini cart drawer.
   - Quick View Modal with dynamic color swatches and size selector.
   - Wishlist toggle with real-time badge updates.

3. **LocalStorage Cart & Wishlist**:
   - Zero-dependency client-side persistence.
   - Free shipping progress bar calculation in real-time.
   - Dispatches custom `cartUpdated` and `wishlistUpdated` events.

4. **Global Search Drawer**:
   - Live real-time search filtering across product titles, categories, and descriptions.

5. **Editorial Lookbook & Sale Countdown**:
   - Asymmetric Vogue-inspired editorial spotlight.
   - Live countdown ticker for time-sensitive promotions.

6. **Accessibility & Performance**:
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
   - Touch targets meeting 44px+ guidelines.
   - Lazy-loaded photography with graceful fallbacks.

---

## 🚀 Running the Project

The application runs directly in any web browser by opening `index.html` or serving through a simple static web server:

```bash
# Using standard Vite / dev server included in workspace
npm run dev
```

Or open `index.html` directly in your browser.
