/* ==========================================================================
   AURA Fashion - Products Data Store & Query API
   ========================================================================== */

const PRODUCTS_DATA = [
  {
    id: "aura-001",
    name: "Oversized Cashmere Wool Trench Coat",
    category: "women",
    categoryLabel: "Women's Outerwear",
    subcategory: "Outerwear",
    brand: "AURA Atelier",
    price: 18500,
    oldPrice: 24000,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 42,
    isNew: true,
    isSale: true,
    isFeatured: true,
    inStock: true,
    description: "Crafted from double-faced Italian wool cashmere blend. Tailored with dropped shoulders, storm flap detail, and a detachable self-belt for an effortless silhouette.",
    colors: [
      { name: "Camel", hex: "#C2A682" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cream", hex: "#F3EFE0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      main: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-002",
    name: "Structured Tailored Double-Breasted Blazer",
    category: "men",
    categoryLabel: "Men's Tailoring",
    subcategory: "Tailoring",
    brand: "AURA Tailored",
    price: 14200,
    oldPrice: 18000,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 38,
    isNew: true,
    isSale: false,
    isFeatured: true,
    inStock: true,
    description: "Architectural single-breasted blazer in fine virgin wool. Features notch lapels, horn buttons, and interior canvas construction for lasting structure.",
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Navy", hex: "#192841" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      main: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-003",
    name: "Minimalist Ribbed Silk Knit Dress",
    category: "women",
    categoryLabel: "Women's Dresses",
    subcategory: "Dresses",
    brand: "AURA Atelier",
    price: 9800,
    oldPrice: 12500,
    discount: "21% OFF",
    rating: 5.0,
    reviewsCount: 29,
    isNew: false,
    isSale: true,
    isFeatured: true,
    inStock: true,
    description: "Form-fitting midi dress in a mulberry silk knit blend. Designed with a clean mock neckline and subtly flared hem for seamless evening elegance.",
    colors: [
      { name: "Espresso", hex: "#3D2314" },
      { name: "Sage", hex: "#8A9A86" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      main: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-004",
    name: "Heavyweight Organic Cotton Hoodie",
    category: "men",
    categoryLabel: "Men's Essentials",
    subcategory: "Tops & Shirts",
    brand: "AURA Essentials",
    price: 6500,
    oldPrice: 8000,
    discount: "18% OFF",
    rating: 4.7,
    reviewsCount: 64,
    isNew: true,
    isSale: false,
    isFeatured: true,
    inStock: true,
    description: "450gsm combed organic cotton fleece. Features double-lined hood, seamless side panels, and pre-shrunk finish for ultimate everyday comfort.",
    colors: [
      { name: "Stone", hex: "#B0A89E" },
      { name: "Oatmeal", hex: "#E3DAC9" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: {
      main: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-005",
    name: "Handcrafted Italian Leather Tote",
    category: "accessories",
    categoryLabel: "Leather Goods",
    subcategory: "Accessories",
    brand: "AURA Atelier",
    price: 16500,
    oldPrice: 21000,
    discount: "21% OFF",
    rating: 4.9,
    reviewsCount: 19,
    isNew: true,
    isSale: true,
    isFeatured: true,
    inStock: true,
    description: "Full-grain Tuscan leather tote featuring magnetic closure, microsuede lining, and an integrated zippered interior pouch.",
    colors: [
      { name: "Cognac", hex: "#9E5B32" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["One Size"],
    images: {
      main: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-006",
    name: "Junior Wool Blend Toggle Duffel Coat",
    category: "kids",
    categoryLabel: "Kids Outerwear",
    subcategory: "Outerwear",
    brand: "AURA Essentials",
    price: 5200,
    oldPrice: 6800,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 15,
    isNew: true,
    isSale: false,
    isFeatured: true,
    inStock: true,
    description: "Cozy wool blend coat for children. Horn toggle fastenings, quilted insulated lining, and detachable hood.",
    colors: [
      { name: "Navy", hex: "#0F1C3F" },
      { name: "Camel", hex: "#C2A682" }
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    images: {
      main: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-007",
    name: "Pleated Wide-Leg Linen Trousers",
    category: "women",
    categoryLabel: "Women's Bottoms",
    subcategory: "Bottoms",
    brand: "AURA Atelier",
    price: 7400,
    oldPrice: 9200,
    discount: "19% OFF",
    rating: 4.6,
    reviewsCount: 31,
    isNew: false,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "High-waisted tailored linen trousers with crisp front pleats, slant pockets, and a fluid wide-leg profile.",
    colors: [
      { name: "Cream", hex: "#F5F2EB" },
      { name: "Olive", hex: "#556B2F" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      main: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-008",
    name: "Polarized Titanium Frame Sunglasses",
    category: "accessories",
    categoryLabel: "Eyewear",
    subcategory: "Accessories",
    brand: "AURA Atelier",
    price: 8900,
    oldPrice: 11000,
    discount: "19% OFF",
    rating: 4.9,
    reviewsCount: 22,
    isNew: true,
    isSale: false,
    isFeatured: false,
    inStock: true,
    description: "Ultra-lightweight Japanese titanium frames equipped with 100% UV protection polarized antireflective lenses.",
    colors: [
      { name: "Gold", hex: "#D4AF37" },
      { name: "Black", hex: "#222222" }
    ],
    sizes: ["One Size"],
    images: {
      main: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-009",
    name: "Merino Wool Turtle Neck Sweater",
    category: "men",
    categoryLabel: "Men's Knitwear",
    subcategory: "Knitwear",
    brand: "AURA Essentials",
    price: 8200,
    oldPrice: 10500,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 51,
    isNew: false,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "Fine gauge extra-fine Italian Merino wool. Ribbed neck, cuffs, and hem engineered for breathable winter warmth.",
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Navy", hex: "#192841" },
      { name: "Camel", hex: "#C2A682" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      main: "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-010",
    name: "Sculpted Silk Wrap Blouse",
    category: "women",
    categoryLabel: "Women's Tops",
    subcategory: "Tops & Shirts",
    brand: "AURA Atelier",
    price: 8800,
    oldPrice: 11200,
    discount: "21% OFF",
    rating: 4.7,
    reviewsCount: 18,
    isNew: true,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "100% Mulberry silk satin wrap top with balloon sleeves and long waist ties for customizable styling.",
    colors: [
      { name: "Cream", hex: "#F3EFE0" },
      { name: "Espresso", hex: "#3D2314" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      main: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-011",
    name: "Japanese Selvedge Denim Jacket",
    category: "men",
    categoryLabel: "Men's Outerwear",
    subcategory: "Outerwear",
    brand: "AURA Denim",
    price: 11500,
    oldPrice: 14000,
    discount: "18% OFF",
    rating: 4.9,
    reviewsCount: 33,
    isNew: false,
    isSale: false,
    isFeatured: true,
    inStock: true,
    description: "14oz raw Japanese selvedge denim jacket with custom brass hardware, dual patch pockets, and contrast stitching.",
    colors: [
      { name: "Indigo", hex: "#1C2D42" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      main: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-012",
    name: "Organic Cotton Ribbed Set for Toddlers",
    category: "kids",
    categoryLabel: "Kids Sets",
    subcategory: "Tops & Shirts",
    brand: "AURA Essentials",
    price: 3800,
    oldPrice: 4800,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 27,
    isNew: true,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "Ultra-soft GOTS-certified organic ribbed top and trousers set. Elastic waistband and flatlock seams for delicate skin.",
    colors: [
      { name: "Oatmeal", hex: "#E3DAC9" },
      { name: "Sage", hex: "#8A9A86" }
    ],
    sizes: ["2Y", "4Y", "6Y"],
    images: {
      main: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-013",
    name: "Minimalist Calfskin Chelsea Boots",
    category: "accessories",
    categoryLabel: "Footwear",
    subcategory: "Footwear",
    brand: "AURA Atelier",
    price: 19500,
    oldPrice: 25000,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 40,
    isNew: true,
    isSale: true,
    isFeatured: true,
    inStock: true,
    description: "Smooth European calfskin leather boots with elastic side gussets, leather stacked heel, and Goodyear welted sole.",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Espresso", hex: "#3D2314" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      main: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-014",
    name: "Cashmere Fringed Minimalist Scarf",
    category: "accessories",
    categoryLabel: "Scarves & Hats",
    subcategory: "Accessories",
    brand: "AURA Essentials",
    price: 4500,
    oldPrice: 5800,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 36,
    isNew: false,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "100% Mongolian cashmere woven scarf with classic fringed ends. Light, silky soft, and exceptionally insulating.",
    colors: [
      { name: "Camel", hex: "#C2A682" },
      { name: "Stone", hex: "#B0A89E" },
      { name: "Charcoal", hex: "#333333" }
    ],
    sizes: ["One Size"],
    images: {
      main: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-015",
    name: "High-Waisted Straight Leg Selvedge Denim",
    category: "women",
    categoryLabel: "Women's Denim",
    subcategory: "Bottoms",
    brand: "AURA Denim",
    price: 8900,
    oldPrice: 11000,
    discount: "19% OFF",
    rating: 4.7,
    reviewsCount: 24,
    isNew: true,
    isSale: false,
    isFeatured: false,
    inStock: true,
    description: "Classic 5-pocket straight leg jeans in rigid organic cotton denim with subtle vintage wash and raw hem.",
    colors: [
      { name: "Indigo", hex: "#1C2D42" },
      { name: "Cream", hex: "#F3EFE0" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      main: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-016",
    name: "Tailored Linen Single-Breasted Blazer",
    category: "women",
    categoryLabel: "Women's Tailoring",
    subcategory: "Tailoring",
    brand: "AURA Tailored",
    price: 12800,
    oldPrice: 16000,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 17,
    isNew: true,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "Breathable pure linen summer blazer with mother-of-pearl buttons, fully unlined body for easy summer layering.",
    colors: [
      { name: "Cream", hex: "#F3EFE0" },
      { name: "Sage", hex: "#8A9A86" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      main: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-017",
    name: "Classic Wool Felt Fedora Hat",
    category: "accessories",
    categoryLabel: "Hats & Caps",
    subcategory: "Accessories",
    brand: "AURA Atelier",
    price: 5200,
    oldPrice: 6500,
    discount: "20% OFF",
    rating: 4.6,
    reviewsCount: 14,
    isNew: false,
    isSale: false,
    isFeatured: false,
    inStock: false,
    description: "100% Australian wool felt fedora with genuine leather band trim and interior sweatband.",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Camel", hex: "#C2A682" }
    ],
    sizes: ["One Size"],
    images: {
      main: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=800&auto=format&fit=crop"
      ]
    }
  },
  {
    id: "aura-018",
    name: "Kids Organic Fleece Sweatshirt",
    category: "kids",
    categoryLabel: "Kids Tops",
    subcategory: "Tops & Shirts",
    brand: "AURA Essentials",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    rating: 4.8,
    reviewsCount: 22,
    isNew: false,
    isSale: true,
    isFeatured: false,
    inStock: true,
    description: "Soft organic brushed fleece sweatshirt with ribbed cuffs and crewneck. Pre-washed for non-shrink durability.",
    colors: [
      { name: "Mustard", hex: "#E3A857" },
      { name: "Navy", hex: "#0F1C3F" }
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    images: {
      main: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
      hover: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop"
      ]
    }
  }
];

/* Helper Query Functions */
const ProductsAPI = {
  getAll: () => PRODUCTS_DATA,
  
  getFeatured: () => PRODUCTS_DATA.filter(p => p.isFeatured),

  getNewArrivals: () => PRODUCTS_DATA.filter(p => p.isNew),

  getSaleItems: () => PRODUCTS_DATA.filter(p => p.isSale),

  getByCategory: (category) => {
    if (!category || category === 'all') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  getById: (id) => PRODUCTS_DATA.find(p => p.id === id),

  search: (query) => {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS_DATA.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  },

  formatPrice: (amount) => {
    return `NPR ${amount.toLocaleString('en-IN')}`;
  }
};
