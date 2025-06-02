// Complete Fixed Mobile Navigation - WORKING VERSION
class MobileNavigation {
  constructor() {
    this.nav = document.getElementById("nav");
    this.hamburger = document.getElementById("hamburger");
    this.overlay = document.getElementById("overlay");
    this.body = document.body;
    this.isMenuOpen = false;
    this.isAnimating = false;

    console.log("🔍 Elements found:", {
      nav: !!this.nav,
      hamburger: !!this.hamburger,
      overlay: !!this.overlay,
    });

    this.init();
  }

  init() {
    if (!this.nav || !this.hamburger || !this.overlay) {
      console.error("❌ Required navigation elements missing");
      return;
    }

    this.setupEventListeners();
    this.setupKeyboardNavigation();
    console.log("✅ Mobile navigation initialized successfully!");
  }

  setupEventListeners() {
    // Hamburger click
    this.hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("🍔 Hamburger clicked");
      this.toggleMenu();
    });

    // Overlay click - close menu
    this.overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("👆 Overlay clicked");
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // FIXED: Simplified navigation link handling
    this.nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      console.log("🔗 Navigation link clicked:", href);

      // Check if this is a valid link
      if (!href || href === "#") {
        e.preventDefault();
        console.log("❌ Invalid link href");
        return;
      }

      // For mobile menu - always close menu first, then navigate
      if (this.isMenuOpen) {
        e.preventDefault(); // Prevent immediate navigation
        console.log("📱 Mobile menu is open - closing before navigation");

        // Close menu immediately
        this.closeMenu();

        // Navigate after menu closes
        setTimeout(() => {
          this.handleNavigation(href, link);
        }, 100); // Reduced timeout for better UX
      }
      // If menu is not open, let browser handle navigation normally
    });

    // Close menu when clicking outside (but not on nav links)
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.nav.contains(e.target) &&
        !this.hamburger.contains(e.target)
      ) {
        console.log("🖱️ Clicked outside menu - closing");
        this.closeMenu();
      }
    });

    // Close menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        console.log("📱 Screen resized - closing mobile menu");
        this.closeMenu();
      }
    });
  }

  // NEW: Separated navigation handling logic
  handleNavigation(href, link) {
    console.log("🚀 Handling navigation to:", href);

    const isExternalLink =
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel");
    const isHashLink = href.startsWith("#");

    try {
      if (isExternalLink) {
        const target = link.getAttribute("target") || "_self";
        console.log("🌐 Opening external link:", href, "target:", target);
        window.open(href, target);
      } else if (isHashLink) {
        console.log("⚓ Scrolling to section:", href);
        this.scrollToSection(href);
      } else {
        console.log("📄 Navigating to page:", href);
        window.location.href = href;
      }
    } catch (error) {
      console.error("❌ Navigation failed:", error);
      // Fallback - try direct navigation
      window.location.href = href;
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        console.log("⌨️ Escape key pressed - closing menu");
        this.closeMenu();
        this.hamburger.focus();
      }
    });
  }

  toggleMenu() {
    if (this.isAnimating) {
      console.log("⏳ Menu is animating - ignoring toggle");
      return;
    }

    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isAnimating || this.isMenuOpen) return;

    console.log("📱 Opening menu...");
    this.isAnimating = true;
    this.isMenuOpen = true;

    // Add active classes
    this.nav.classList.add("active");
    this.hamburger.classList.add("active");
    this.overlay.classList.add("active");

    // Prevent body scroll
    this.body.style.overflow = "hidden";
    this.body.classList.add("menu-open");

    // Update hamburger icon
    const icon = this.hamburger.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }

    // FIXED: Reduced timeout and better state management
    setTimeout(() => {
      this.isAnimating = false;
      console.log("✅ Menu opened");
    }, 300);
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) return;

    console.log("📱 Closing menu...");
    this.isAnimating = true;
    this.isMenuOpen = false;

    // Remove active classes
    this.nav.classList.remove("active");
    this.hamburger.classList.remove("active");
    this.overlay.classList.remove("active");

    // Restore body scroll
    this.body.style.overflow = "";
    this.body.classList.remove("menu-open");

    // Update hamburger icon
    const icon = this.hamburger.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }

    // FIXED: Reduced timeout
    setTimeout(() => {
      this.isAnimating = false;
      console.log("✅ Menu closed");
    }, 300);
  }

  scrollToSection(href) {
    try {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight =
          document.getElementById("header")?.offsetHeight || 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        console.log("📍 Scrolling to position:", targetPosition);
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.warn("⚠️ Target element not found:", href);
      }
    } catch (error) {
      console.error("❌ Scroll to section failed:", error);
    }
  }
}

// Sticky Header
class StickyHeader {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener(
      "scroll",
      () => {
        this.header.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true }
    );
  }
}

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM loaded - initializing navigation...");

  // Initialize navigation
  new MobileNavigation();
  new StickyHeader();

  // Initialize other features only if elements exist
  initializeStats();
  initializeScrollEffects();
  initializeLanguageToggle();
  initializeTestimonialSlider();
});

// Stats animation
function initializeStats() {
  const stats = document.querySelectorAll(".stat-number");
  if (stats.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute("data-count")) || 0;
          animateValue(target, 0, finalValue, 2000);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
  if (!element) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// FIXED: Enhanced scroll effects with better link handling
function initializeScrollEffects() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not(nav a)'); // Exclude nav links

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Language toggle
function initializeLanguageToggle() {
  const languageToggle = document.querySelectorAll(".language-toggle a");
  if (languageToggle.length === 0) return;

  const translations = {
    en: {
      "legacy-title": "Our Legacy",
      home: "Home",
      about: "About",
      activities: "Activities",
      legacy: "Legacy",
      media: "Media",
      "get-involved": "Get Involved",
      contact: "Contact",
    },
    cy: {
      "legacy-title": "Ein Gwaddol",
      home: "Hafan",
      about: "Amdanom",
      activities: "Gweithgareddau",
      legacy: "Gwaddol",
      media: "Cyfryngau",
      "get-involved": "Ymunwch â Ni",
      contact: "Cysylltu",
    },
  };

  function updateLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    document.title =
      lang === "cy" ? "Gwaddol | Cymru Unleashed" : "Legacy | Cymru Unleashed";
    localStorage.setItem("preferred-language", lang);
  }

  languageToggle.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      languageToggle.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const newLang =
        link.textContent.toLowerCase() === "cymraeg" ? "cy" : "en";
      updateLanguage(newLang);
    });
  });

  // Set initial language
  const initialLang = localStorage.getItem("preferred-language") || "en";
  updateLanguage(initialLang);
}

// Testimonial slider
function initializeTestimonialSlider() {
  const track = document.getElementById("stories-track");
  const dots = document.querySelectorAll(".slider-dot");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (!track || dots.length === 0 || !nextBtn || !prevBtn) {
    console.log("ℹ️ Testimonial slider elements not found - skipping");
    return;
  }

  let currentIndex = 0;
  const slides = Array.from(track.children);

  const setSliderPosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    setSliderPosition();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setSliderPosition();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      setSliderPosition();
    });
  });

  // Auto-advance slider
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    setSliderPosition();
  }, 5000);

  console.log("✅ Testimonial slider initialized");
}
