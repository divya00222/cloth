/* ==========================================================================
   AURA Fashion - Cart & Wishlist LocalStorage Engine
   ========================================================================== */

const STORAGE_KEYS = {
  CART: 'aura_fashion_cart',
  WISHLIST: 'aura_fashion_wishlist'
};

const CartStore = {
  // Cart Methods
  getCart: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  saveCart: (cart) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  addToCart: (productId, quantity = 1, selectedSize = null, selectedColor = null) => {
    const product = ProductsAPI.getById(productId);
    if (!product) return false;

    const cart = CartStore.getCart();
    const color = selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');
    const size = selectedSize || (product.sizes && product.sizes[0] ? product.sizes[0] : 'Free Size');

    const cartItemId = `${productId}-${size}-${color}`;
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cartItemId,
        productId,
        name: product.name,
        price: product.price,
        image: product.images.main,
        size,
        color,
        quantity
      });
    }

    CartStore.saveCart(cart);
    return true;
  },

  removeFromCart: (cartItemId) => {
    let cart = CartStore.getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    CartStore.saveCart(cart);
  },

  updateQuantity: (cartItemId, newQuantity) => {
    let cart = CartStore.getCart();
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (item) {
      if (newQuantity <= 0) {
        CartStore.removeFromCart(cartItemId);
      } else {
        item.quantity = newQuantity;
        CartStore.saveCart(cart);
      }
    }
  },

  clearCart: () => {
    CartStore.saveCart([]);
  },

  getCartCount: () => {
    const cart = CartStore.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getCartSubtotal: () => {
    const cart = CartStore.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Wishlist Methods
  getWishlist: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist: (wishlist) => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist } }));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  },

  toggleWishlist: (productId) => {
    let wishlist = CartStore.getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
      added = true;
    }

    CartStore.saveWishlist(wishlist);
    return added;
  },

  isInWishlist: (productId) => {
    const wishlist = CartStore.getWishlist();
    return wishlist.includes(productId);
  },

  getWishlistCount: () => {
    return CartStore.getWishlist().length;
  }
};
