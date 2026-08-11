/* ==========================================================================
   AURA Fashion - Main Application Initializer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI Framework & Store Listeners
  UIManager.init();

  // Populate New Arrivals Product Grid
  const newArrivalsGrid = document.getElementById('new-arrivals-grid');
  if (newArrivalsGrid) {
    const products = ProductsAPI.getNewArrivals().slice(0, 4);
    newArrivalsGrid.innerHTML = products.map(p => UIManager.renderProductCardHTML(p)).join('');
  }

  // Populate Featured / Trending Products Grid
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const products = ProductsAPI.getFeatured().slice(0, 4);
    featuredGrid.innerHTML = products.map(p => UIManager.renderProductCardHTML(p)).join('');
  }

  // Initialize Search Input Live Handler
  const searchInput = document.getElementById('global-search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');

  if (searchInput && searchResultsGrid) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query.trim().length === 0) {
        searchResultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">Start typing to search products...</p>`;
        return;
      }
      
      const results = ProductsAPI.search(query);
      if (results.length === 0) {
        searchResultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">No products found matching "${query}"</p>`;
      } else {
        searchResultsGrid.innerHTML = results.map(p => UIManager.renderProductCardHTML(p)).join('');
      }
    });
  }

  // Testimonial Carousel Controls
  const testimonials = [
    {
      name: "Sophia Martinez",
      role: "Verified Buyer • Kathmandu",
      quote: "The quality of the cashmere wool coat exceeded every expectation. Tailoring is pristine, and delivery was remarkably fast!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Aarav Sharma",
      role: "Verified Buyer • Pokhara",
      quote: "AURA's tailored blazers are an essential part of my professional wardrobe. Immaculate fit and durable, rich fabrics.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Elena Rostova",
      role: "Fashion Editor • Lalitpur",
      quote: "Minimalist luxury defined. The attention to detail in their silk collection puts them on par with top European design houses.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    }
  ];

  let currentTestimonialIndex = 0;
  const testimonialContainer = document.getElementById('testimonial-card-container');

  window.renderTestimonial = (index) => {
    if (!testimonialContainer) return;
    const t = testimonials[index];
    testimonialContainer.innerHTML = `
      <div class="testimonial-card reveal active">
        <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
        <blockquote class="testimonial-quote">"${t.quote}"</blockquote>
        <div class="testimonial-author">
          <span class="testimonial-name">${t.name}</span>
          <span class="testimonial-role">${t.role}</span>
        </div>
      </div>
    `;
  };

  window.nextTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    window.renderTestimonial(currentTestimonialIndex);
  };

  window.prevTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    window.renderTestimonial(currentTestimonialIndex);
  };

  window.renderTestimonial(0);
});
