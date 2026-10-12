/* INSONET Systems — Main Pure JavaScript */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar & Back to Top Button
  var navbar = document.getElementById("navbar");
  var backToTop = document.getElementById("back-to-top");

  function onScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) {
      if (scrollY >= 50) {
        navbar.classList.add("is-sticky", "bg-white", "shadow-md");
        navbar.classList.remove("lg:bg-transparent");
      } else {
        navbar.classList.remove("is-sticky");
        if (window.location.hash === "#home" || window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
          navbar.classList.add("lg:bg-transparent");
          navbar.classList.remove("shadow-md");
        }
      }
    }

    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.remove("opacity-0", "pointer-events-none");
        backToTop.classList.add("opacity-100");
      } else {
        backToTop.classList.add("opacity-0", "pointer-events-none");
        backToTop.classList.remove("opacity-100");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 3. Mobile Navigation Drawer
  var mobileToggle = document.getElementById("mobile-menu-toggle");
  var mobilePanel = document.getElementById("navbarCollapse");
  var mobileBackdrop = document.getElementById("mobile-menu-backdrop");

  function toggleMobileMenu(open) {
    if (typeof open !== "boolean") {
      open = !mobilePanel.classList.contains("is-open");
    }
    if (open) {
      mobileToggle.classList.add("is-open");
      mobilePanel.classList.add("is-open");
      mobileBackdrop.classList.add("is-visible");
      mobileToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    } else {
      mobileToggle.classList.remove("is-open");
      mobilePanel.classList.remove("is-open");
      mobileBackdrop.classList.remove("is-visible");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", function () {
      toggleMobileMenu(false);
    });
  }

  // Close mobile menu when clicking nav links
  var mobileNavLinks = document.querySelectorAll(".mobile-nav-link:not(#nav-services-trigger)");
  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        toggleMobileMenu(false);
      }
    });
  });

  // 4. Services Dropdown Menu
  var navServicesItem = document.getElementById("nav-services-item");
  var navServicesTrigger = document.getElementById("nav-services-trigger");
  var navServicesMenu = document.getElementById("nav-services-menu");
  var navServicesChevron = document.getElementById("nav-services-chevron");

  if (navServicesTrigger && navServicesMenu) {
    navServicesTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isExpanded = navServicesMenu.style.display === "block";
      if (isExpanded) {
        navServicesMenu.style.display = "none";
        navServicesMenu.classList.remove("is-open");
        if (navServicesChevron) navServicesChevron.classList.remove("rotate-180");
        navServicesTrigger.setAttribute("aria-expanded", "false");
      } else {
        navServicesMenu.style.display = "block";
        navServicesMenu.classList.add("is-open");
        if (navServicesChevron) navServicesChevron.classList.add("rotate-180");
        navServicesTrigger.setAttribute("aria-expanded", "true");
      }
    });

    if (navServicesItem) {
      navServicesItem.addEventListener("mouseenter", function () {
        if (window.innerWidth >= 1024) {
          navServicesMenu.style.display = "block";
          navServicesMenu.classList.add("is-open");
          if (navServicesChevron) navServicesChevron.classList.add("rotate-180");
          navServicesTrigger.setAttribute("aria-expanded", "true");
        }
      });

      navServicesItem.addEventListener("mouseleave", function () {
        if (window.innerWidth >= 1024) {
          navServicesMenu.style.display = "none";
          navServicesMenu.classList.remove("is-open");
          if (navServicesChevron) navServicesChevron.classList.remove("rotate-180");
          navServicesTrigger.setAttribute("aria-expanded", "false");
        }
      });
    }

    document.addEventListener("click", function (e) {
      if (navServicesItem && !navServicesItem.contains(e.target)) {
        navServicesMenu.style.display = "none";
        navServicesMenu.classList.remove("is-open");
        if (navServicesChevron) navServicesChevron.classList.remove("rotate-180");
        navServicesTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 5. Hero Network Canvas (Light Variant from TechHeroBackground)
  var heroCanvas = document.getElementById("hero-tech-canvas");
  if (heroCanvas) {
    var ctx = heroCanvas.getContext("2d");
    var container = heroCanvas.parentElement;
    var host = container.parentElement;
    var width = 0;
    var height = 0;
    var nodes = [];
    var pulses = [];
    var packets = [];
    var pointer = { x: 0, y: 0, active: false };
    var gridOffset = 0;
    var pulseTimer = 0;
    var packetTimer = 0;

    function resizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      if (width <= 0 || height <= 0) return;

      heroCanvas.width = Math.floor(width * dpr);
      heroCanvas.height = Math.floor(height * dpr);
      heroCanvas.style.width = width + "px";
      heroCanvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      var count = 45;
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1 + Math.random() * 1.8,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    host.addEventListener("mousemove", function (e) {
      var rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });

    host.addEventListener("mouseleave", function () {
      pointer.active = false;
    });

    function drawGrid(context, w, h, gridColor, offset) {
      var spacing = 48;
      context.strokeStyle = gridColor;
      context.lineWidth = 1;
      var shift = offset % spacing;

      for (var x = -spacing + shift; x < w + spacing; x += spacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, h);
        context.stroke();
      }

      for (var y = -spacing + shift; y < h + spacing; y += spacing) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(w, y);
        context.stroke();
      }
    }

    function renderCanvas() {
      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
        ctx.fillRect(0, 0, width, height);

        gridOffset += 0.25;
        drawGrid(ctx, width, height, "rgba(59, 130, 246, 0.05)", gridOffset);

        if (pointer.active) {
          var glow = ctx.createRadialGradient(pointer.x, pointer.y, 8, pointer.x, pointer.y, 160);
          glow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
          glow.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, 160, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw connections
        for (var i = 0; i < nodes.length; i++) {
          var nodeA = nodes[i];
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;

          if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
          if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

          if (pointer.active) {
            var dx = nodeA.x - pointer.x;
            var dy = nodeA.y - pointer.y;
            var dist = Math.hypot(dx, dy);
            if (dist < 110 && dist > 0) {
              nodeA.x += (dx / dist) * 0.9;
              nodeA.y += (dy / dist) * 0.9;
            }
          }

          for (var j = i + 1; j < nodes.length; j++) {
            var nodeB = nodes[j];
            var d = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
            if (d < 125) {
              var alpha = (1 - d / 125) * 0.35;
              ctx.strokeStyle = "rgba(59, 130, 246, " + alpha + ")";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }

          // Node draw
          ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Pulses
        pulseTimer++;
        if (pulseTimer > 75 && nodes.length > 0) {
          pulseTimer = 0;
          var randomNode = nodes[Math.floor(Math.random() * nodes.length)];
          pulses.push({ x: randomNode.x, y: randomNode.y, radius: 4, alpha: 0.35 });
        }

        for (var p = pulses.length - 1; p >= 0; p--) {
          var pulse = pulses[p];
          pulse.radius += 0.7;
          pulse.alpha -= 0.008;
          if (pulse.alpha <= 0) {
            pulses.splice(p, 1);
          } else {
            ctx.strokeStyle = "rgba(59, 130, 246, " + pulse.alpha + ")";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // 6. Hero Typing Headline
  var typeNormal = document.getElementById("hero-type-normal");
  var typeHighlight = document.getElementById("hero-type-highlight");
  var cursorEl = document.getElementById("hero-cursor");

  if (typeNormal && typeHighlight) {
    var fullNormal = "INTELLIGENCE SOLUTIONS ";
    var fullHighlight = "NETWORK SYSTEMS";
    var totalChars = fullNormal.length + fullHighlight.length;
    var currentCount = 0;

    var cursorInterval = setInterval(function () {
      if (cursorEl) {
        cursorEl.style.visibility = cursorEl.style.visibility === "hidden" ? "visible" : "hidden";
      }
    }, 500);

    function stepTyping() {
      if (currentCount <= totalChars) {
        if (currentCount <= fullNormal.length) {
          typeNormal.textContent = fullNormal.slice(0, currentCount);
          typeHighlight.textContent = "";
        } else {
          typeNormal.textContent = fullNormal;
          typeHighlight.textContent = fullHighlight.slice(0, currentCount - fullNormal.length);
        }
        currentCount++;
        setTimeout(stepTyping, 85);
      } else {
        clearInterval(cursorInterval);
        if (cursorEl) cursorEl.style.display = "none";
      }
    }
    setTimeout(stepTyping, 300);
  }

  // 7. Projects Carousel
  var track = document.getElementById("projects-carousel-track");
  var prevBtn = document.getElementById("carousel-prev-btn");
  var nextBtn = document.getElementById("carousel-next-btn");
  var indicator = document.getElementById("carousel-indicator");

  if (track && prevBtn && nextBtn) {
    var slides = track.querySelectorAll(".projects-carousel__slide");
    var totalCount = slides.length;
    var currentSlideIndex = 0;

    function getItemsPerView() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }

    function refreshCarousel() {
      var perView = getItemsPerView();
      var maxSlide = Math.max(0, totalCount - perView);
      if (currentSlideIndex > maxSlide) currentSlideIndex = maxSlide;
      if (currentSlideIndex < 0) currentSlideIndex = 0;

      var stepPercent = 100 / perView;
      slides.forEach(function (slide) {
        slide.style.width = stepPercent + "%";
      });

      var offset = currentSlideIndex * stepPercent;
      track.style.transform = "translateX(-" + offset + "%)";

      prevBtn.disabled = currentSlideIndex === 0;
      nextBtn.disabled = currentSlideIndex >= maxSlide;

      if (indicator) {
        indicator.textContent = (currentSlideIndex + 1) + " / " + (maxSlide + 1);
      }
    }

    prevBtn.addEventListener("click", function () {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        refreshCarousel();
      }
    });

    nextBtn.addEventListener("click", function () {
      var perView = getItemsPerView();
      var maxSlide = Math.max(0, totalCount - perView);
      if (currentSlideIndex < maxSlide) {
        currentSlideIndex++;
        refreshCarousel();
      }
    });

    window.addEventListener("resize", refreshCarousel);
    refreshCarousel();

    // Auto-advance on mobile single view
    setInterval(function () {
      if (getItemsPerView() === 1) {
        var maxSlide = Math.max(0, totalCount - 1);
        currentSlideIndex = currentSlideIndex >= maxSlide ? 0 : currentSlideIndex + 1;
        refreshCarousel();
      }
    }, 4500);
  }

  // 8. Contact Form Handling
  var contactFormEl = document.getElementById("contact-form-el");
  var contactSuccess = document.getElementById("contact-success-state");
  var contactResetBtn = document.getElementById("contact-reset-btn");
  var contactSubmitBtn = document.getElementById("contact-submit-btn");

  if (contactFormEl) {
    contactFormEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var originalBtnText = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = "Sending...";

      var formData = new FormData(contactFormEl);
      var payload = {
        firstName: formData.get("firstName") || "",
        lastName: formData.get("lastName") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        message: formData.get("message") || ""
      };

      fetch("contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json().catch(function() { return {}; }); })
      .then(function (data) {
        contactFormEl.reset();
        contactFormEl.style.display = "none";
        if (contactSuccess) {
          contactSuccess.classList.remove("hidden");
          contactSuccess.classList.add("flex");
        }
      })
      .catch(function () {
        contactFormEl.reset();
        contactFormEl.style.display = "none";
        if (contactSuccess) {
          contactSuccess.classList.remove("hidden");
          contactSuccess.classList.add("flex");
        }
      })
      .finally(function () {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalBtnText;
      });
    });

    if (contactResetBtn) {
      contactResetBtn.addEventListener("click", function () {
        if (contactSuccess) {
          contactSuccess.classList.add("hidden");
          contactSuccess.classList.remove("flex");
        }
        contactFormEl.style.display = "block";
      });
    }
  }
});
