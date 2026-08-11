(function(){
  "use strict";

  /* ---------- LOADER ---------- */
  window.addEventListener("load", function(){
    var loader = document.getElementById("loader");
    setTimeout(function(){ loader.classList.add("hidden"); }, 900);
  });

  /* ---------- YEAR ---------- */
  var yEl = document.getElementById("year");
  if(yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- CUSTOM CURSOR ---------- */
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  var hasFinePointer = window.matchMedia("(hover:hover)").matches;
  if(hasFinePointer && dot && ring){
    var rx=0, ry=0, dx=0, dy=0;
    window.addEventListener("mousemove", function(e){
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx+"px"; dot.style.top = dy+"px";
    });
    (function loop(){
      rx += (dx-rx)*0.18; ry += (dy-ry)*0.18;
      ring.style.left = rx+"px"; ring.style.top = ry+"px";
      requestAnimationFrame(loop);
    })();
    var hoverables = document.querySelectorAll("a, button, .masonry-item, .project-card, .service-card, input, textarea");
    hoverables.forEach(function(el){
      el.addEventListener("mouseenter", function(){ ring.classList.add("hovered"); });
      el.addEventListener("mouseleave", function(){ ring.classList.remove("hovered"); });
    });
  }

  /* ---------- SCROLL PROGRESS + HEADER STATE ---------- */
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("scrollProgress");
  var backToTop = document.getElementById("backToTop");

  function onScroll(){
    var st = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = height > 0 ? (st/height)*100 : 0;
    if(progress) progress.style.width = pct+"%";
    if(header){ st > 60 ? header.classList.add("scrolled") : header.classList.remove("scrolled"); }
    if(backToTop){ st > 600 ? backToTop.classList.add("show") : backToTop.classList.remove("show"); }
    updateActiveNav();
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  if(backToTop){
    backToTop.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---------- MOBILE NAV ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if(navToggle){
    navToggle.addEventListener("click", function(){
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll(".nav-link").forEach(function(link){
      link.addEventListener("click", function(){ mainNav.classList.remove("open"); });
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id], .hero"));
  function updateActiveNav(){
    var scrollPos = window.scrollY + 140;
    var current = sections[0] && sections[0].id;
    sections.forEach(function(sec){
      if(sec.offsetTop <= scrollPos) current = sec.id;
    });
    navLinks.forEach(function(link){
      link.classList.toggle("active", link.getAttribute("href") === "#"+current);
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      var id = a.getAttribute("href");
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({top:top, behavior:"smooth"});
        }
      }
    });
  });

  /* ---------- SCROLL INDICATOR CLICK ---------- */
  var scrollIndicator = document.getElementById("scrollIndicator");
  if(scrollIndicator){
    scrollIndicator.addEventListener("click", function(){
      var about = document.getElementById("about");
      if(about) window.scrollTo({top: about.offsetTop - 70, behavior:"smooth"});
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:"0px 0px -60px 0px"});
  revealEls.forEach(function(el){ io.observe(el); });

  /* ---------- COUNTERS ---------- */
  function animateCount(el, target){
    var numEl = el.querySelector(".num");
    if(!numEl) return;
    var start = 0;
    var duration = 1600;
    var startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      var progressT = Math.min((ts-startTime)/duration, 1);
      var eased = 1 - Math.pow(1-progressT, 3);
      var value = Math.floor(eased * target);
      numEl.textContent = value;
      if(progressT < 1) requestAnimationFrame(step);
      else numEl.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var counterEls = document.querySelectorAll("[data-count]");
  var cIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var target = parseInt(entry.target.getAttribute("data-count"), 10);
        animateCount(entry.target, target);
        cIo.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  counterEls.forEach(function(el){ cIo.observe(el); });

  /* ---------- BUTTON RIPPLE ---------- */
  document.querySelectorAll(".btn-ripple").forEach(function(btn){
    btn.addEventListener("click", function(e){
      var rect = btn.getBoundingClientRect();
      btn.style.setProperty("--rx", (e.clientX-rect.left)+"px");
      btn.style.setProperty("--ry", (e.clientY-rect.top)+"px");
      btn.classList.remove("rippling");
      void btn.offsetWidth;
      btn.classList.add("rippling");
    });
  });

  /* ---------- PROJECT FILTER ---------- */
  var filterBar = document.getElementById("filterBar");
  var projectCards = document.querySelectorAll(".project-card");
  if(filterBar){
    filterBar.addEventListener("click", function(e){
      var btn = e.target.closest(".filter-btn");
      if(!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function(card){
        var cats = card.getAttribute("data-cat") || "";
        var show = filter === "all" || cats.split(" ").indexOf(filter) !== -1;
        card.classList.toggle("hide", !show);
      });
    });
  }

  document.querySelectorAll(".view-details-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      var card = btn.closest(".project-card");
      var title = card.querySelector("h3") ? card.querySelector("h3").textContent : "Project";
      var contact = document.getElementById("contact");
      var subjectField = document.getElementById("cf-subject");
      if(subjectField) subjectField.value = "Inquiry about " + title;
      if(contact) window.scrollTo({top: contact.offsetTop - 70, behavior:"smooth"});
    });
  });

  /* ---------- TESTIMONIAL SLIDER ---------- */
  var testiTrack = document.getElementById("testiTrack");
  var testiDotsWrap = document.getElementById("testiDots");
  if(testiTrack){
    var slides = testiTrack.children.length;
    var idx = 0;
    for(var i=0;i<slides;i++){
      var dotBtn = document.createElement("button");
      if(i===0) dotBtn.classList.add("active");
      dotBtn.addEventListener("click", function(iCopy){ return function(){ goTo(iCopy); }; }(i));
      testiDotsWrap.appendChild(dotBtn);
    }
    function goTo(i){
      idx = i;
      testiTrack.style.transform = "translateX(-" + (idx*100) + "%)";
      Array.prototype.forEach.call(testiDotsWrap.children, function(d,di){ d.classList.toggle("active", di===idx); });
    }
    setInterval(function(){ goTo((idx+1) % slides); }, 5500);
  }

  /* ---------- GALLERY LIGHTBOX ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".masonry-item").forEach(function(img){
    img.addEventListener("click", function(){
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
  });
  function closeLightbox(){ lightbox.classList.remove("open"); }
  if(lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if(lightbox) lightbox.addEventListener("click", function(e){ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeLightbox(); });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.closest(".faq-item");
      var wasActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("active"); });
      if(!wasActive) item.classList.add("active");
    });
  });

  /* ---------- CONTACT FORM ---------- */
  var contactForm = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      formNote.textContent = "Thanks — your message has been noted. I'll get back to you shortly.";
      contactForm.reset();
      setTimeout(function(){ formNote.textContent = ""; }, 6000);
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  var newsletterForm = document.getElementById("newsletterForm");
  if(newsletterForm){
    newsletterForm.addEventListener("submit", function(e){
      e.preventDefault();
      var input = newsletterForm.querySelector("input");
      input.value = "Subscribed ✓";
      setTimeout(function(){ input.value = ""; input.placeholder = "Your email"; }, 2500);
    });
  }

  /* ---------- DOWNLOAD CV (placeholder) ---------- */
  var downloadCvBtn = document.getElementById("downloadCvBtn");
  if(downloadCvBtn){
    downloadCvBtn.addEventListener("click", function(e){
      e.preventDefault();
      var contact = document.getElementById("contact");
      if(contact) window.scrollTo({top: contact.offsetTop - 70, behavior:"smooth"});
    });
  }

})();
