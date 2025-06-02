// Mobile Navigation Toggle
// REPLACE ALL NAVIGATION-RELATED CODE WITH THIS:

// Refined Mobile Navigation - Complete Working Solution
class MobileNavigation {
  constructor() {
    this.nav = document.getElementById("nav");
    this.hamburger = document.getElementById("hamburger");
    this.overlay = document.getElementById("overlay");
    this.body = document.body;
    this.isMenuOpen = false;
    this.isAnimating = false;

    this.init();
  }

  init() {
    const elements = [this.nav, this.hamburger, this.overlay];
    if (elements.some((el) => !el)) {
      console.error("Navigation elements not found");
      return;
    }

    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.preventBodyScroll();
  }

  setupEventListeners() {
    // Hamburger click handler
    this.hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });

    // Overlay click handler
    this.overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Navigation links - using event delegation for better performance
    this.nav?.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (link) {
        e.preventDefault(); // Prevent default initially

        const href = link.getAttribute("href");
        const isExternalLink =
          href?.startsWith("http") ||
          href?.startsWith("mailto") ||
          href?.startsWith("tel");
        const isHashLink = href?.startsWith("#");

        console.log("Navigation link clicked:", href);

        if (href && href !== "#") {
          if (this.isMenuOpen) {
            // Close menu first, then navigate
            this.closeMenu();

            // Wait for menu close animation to complete
            setTimeout(() => {
              if (isExternalLink) {
                window.open(href, link.target || "_self");
              } else if (isHashLink) {
                // Handle anchor links
                this.scrollToSection(href);
              } else {
                // Handle internal navigation
                window.location.href = href;
              }
            }, 300); // Match CSS transition duration
          } else {
            // Menu not open, navigate immediately
            if (isExternalLink) {
              window.open(href, link.target || "_self");
            } else if (isHashLink) {
              this.scrollToSection(href);
            } else {
              window.location.href = href;
            }
          }
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.nav.contains(e.target) &&
        !this.hamburger.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  setupKeyboardNavigation() {
    // ESC key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
        this.hamburger.focus();
      }
    });

    // Tab trapping within menu
    this.nav.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && this.isMenuOpen) {
        const focusableElements = this.nav.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  preventBodyScroll() {
    // Prevent body scroll when menu is open
    const preventScroll = (e) => {
      if (this.isMenuOpen) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
  }

  toggleMenu() {
    if (this.isAnimating) {
      return;
    }

    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isAnimating || this.isMenuOpen) {
      return;
    }

    this.isAnimating = true;
    this.isMenuOpen = true;

    // Add classes
    this.nav.classList.add("active");
    this.hamburger.classList.add("active");
    this.overlay.classList.add("active");

    // Prevent body scroll
    this.body.style.overflow = "hidden";

    // Update hamburger icon
    this.updateHamburgerIcon(true);

    // Set focus to first navigation item
    setTimeout(() => {
      const firstLink = this.nav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
      this.isAnimating = false;
    }, 300);

    console.log("Menu opened");
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) {
      return;
    }

    this.isAnimating = true;
    this.isMenuOpen = false;

    // Remove classes
    this.nav.classList.remove("active");
    this.hamburger.classList.remove("active");
    this.overlay.classList.remove("active");

    // Restore body scroll
    this.body.style.overflow = "";

    // Update hamburger icon
    this.updateHamburgerIcon(false);

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);

    console.log("Menu closed");
  }

  updateHamburgerIcon(isOpen) {
    const icon = this.hamburger.querySelector("i");
    if (icon) {
      if (isOpen) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  }

  scrollToSection(href) {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}

// Sticky Header functionality
class StickyHeader {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    if (!this.header) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Add scrolled class when scrolled down
          this.header.classList.toggle("scrolled", currentScrollY > 50);

          lastScrollY = currentScrollY;
          isScrolling = false;
        });

        isScrolling = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile navigation
  new MobileNavigation();

  // Initialize sticky header
  new StickyHeader();

  console.log("Navigation system initialized");
});
// Testimonial Slider with Touch Support
const track = document.getElementById("stories-track");
const dots = document.querySelectorAll(".slider-dot");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;
const slides = Array.from(track.children);
let startX;
let moveX;
let isMouseDown = false;

// Set initial position
const setSliderPosition = () => {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
};

// Next button click
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  setSliderPosition();
});

// Previous button click
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  setSliderPosition();
});

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-index"));
    setSliderPosition();
  });
});

// Touch events for slider
track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    isMouseDown = true;
    track.style.transition = "none";
  },
  { passive: true }
);

track.addEventListener(
  "touchmove",
  (e) => {
    if (!isMouseDown) {
      return;
    }
    moveX = e.touches[0].clientX;
    const diff = moveX - startX;
    const move = (diff / window.innerWidth) * 100;
    track.style.transform = `translateX(calc(-${
      currentIndex * 100
    }% + ${move}px))`;
  },
  { passive: true }
);

track.addEventListener("touchend", () => {
  isMouseDown = false;
  track.style.transition = "transform 0.5s ease";

  if (moveX) {
    const diff = moveX - startX;
    if (diff > 50 && currentIndex > 0) {
      // Swipe right - go to previous
      currentIndex--;
    } else if (diff < -50 && currentIndex < slides.length - 1) {
      // Swipe left - go to next
      currentIndex++;
    }
    setSliderPosition();
    moveX = null;
  }
});

// Auto slider change every 5 seconds
let autoSlideInterval = setInterval(() => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  setSliderPosition();
}, 5000);

// Pause auto-slide on interaction
[nextBtn, prevBtn, ...dots].forEach((element) => {
  element.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    // Restart auto-slide after 10 seconds of inactivity
    autoSlideInterval = setInterval(() => {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setSliderPosition();
    }, 5000);
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".legacy-pillar, .partner-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: "-50px",
  }
);

animateElements.forEach((element) => {
  observer.observe(element);
});

// Language Toggle
const languageToggle = document.querySelectorAll(".language-toggle a");

const translations = {
  en: {
    "legacy-title": "Our Legacy",
    "legacy-subtitle":
      "Building a lasting impact beyond UEFA Women's Euro 2025",
    "legacy-intro-title": "Legacy Beyond 2025",
    "legacy-intro-text":
      "Cymru Unleashed is not just a project - it's a movement designed to create lasting change in communities across Wales, with a focus on empowering the next generation of Welsh women through sport, art, and culture.",
    "legacy-quote":
      "From a single summer to lasting cultural change - by women, for women, in Wales.",
    "permanent-art-title": "Permanent Public Art",
    "permanent-art-desc":
      "A lasting tribute to Welsh women in sport at Cardiff Bay Cultural Hub",
    "permanent-art-text":
      "This permanent piece will stand as a visual reminder of the power of women's sport and its cultural significance in Wales.",
    "digital-archive-title": "Digital Archive",
    "digital-archive-desc":
      "Educational resources and VR content for schools across Wales",
    "digital-archive-text":
      "This archive will be freely available to schools across Wales, ensuring the project's impact continues in classrooms for years to come.",
    "annual-workshops-title": "Annual Workshops",
    "annual-workshops-desc":
      "Ongoing sports and art programs in partner schools",
    "annual-workshops-text-1":
      "Through signed MOUs with partner schools, we will provide ongoing workshops that combine sports skills with creative expression.",
    "annual-workshops-text-2":
      "These annual programs will ensure that the connections between sport, identity, and culture continue to be explored by new generations of young Welsh women.",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    home: "Home",
    about: "About",
    activities: "Activities",
    legacy: "Legacy",
    media: "Media",
    "get-involved": "Get Involved",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    copyright: "© 2025 Cymru Unleashed. All rights reserved.",
  },
  cy: {
    "legacy-title": "Ein Gwaddol",
    "legacy-subtitle":
      "Adeiladu effaith barhaol y tu hwnt i Gemau UEFA Menywod Euro 2025",
    "legacy-intro-title": "Gwaddol y Tu Hwnt i 2025",
    "legacy-intro-text":
      "Nid prosiect yn unig yw Cymru Unleashed - mudiad ydyw wedi'i gynllunio i greu newid parhaol mewn cymunedau ar draws Cymru, gyda ffocws ar rymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
    "legacy-quote":
      "O haf unig i newid diwylliannol parhaol - gan ferched, i ferched, yng Nghymru.",
    "permanent-art-title": "Celf Gyhoeddus Barhaol",
    "permanent-art-desc":
      "Teyrnged barhaol i fenywod Cymreig mewn chwaraeon yng Nghanolfan Ddiwylliannol Bae Caerdydd",
    "permanent-art-text":
      "Bydd y darn parhaol hwn yn sefyll fel atgof gweledol o rym chwaraeon menywod a'i arwyddocâd diwylliannol yng Nghymru.",
    "digital-archive-title": "Archif Digidol",
    "digital-archive-desc":
      "Adnoddau addysgol a chynnwys VR ar gyfer ysgolion ar draws Cymru",
    "digital-archive-text":
      "Bydd yr archif hwn ar gael yn rhad ac am ddim i ysgolion ar draws Cymru, gan sicrhau bod effaith y prosiect yn parhau mewn ystafelloedd dosbarth am flynyddoedd i ddod.",
    "annual-workshops-title": "Gweithdai Blynyddol",
    "annual-workshops-desc":
      "Rhaglenni chwaraeon a chelf parhaus mewn ysgolion partner",
    "annual-workshops-text-1":
      "Trwy MOUs wedi'u llofnodi gydag ysgolion partner, byddwn yn darparu gweithdai parhaus sy'n cyfuno sgiliau chwaraeon gyda mynegiant creadigol.",
    "annual-workshops-text-2":
      "Bydd y rhaglenni blynyddol hyn yn sicrhau bod y cysylltiadau rhwng chwaraeon, hunaniaeth, a diwylliant yn parhau i gael eu harchwilio gan genedlaethau newydd o fenywod ifanc Cymreig.",
    "footer-tagline":
      "Grymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
    "quick-links": "Dolenni Cyflym",
    home: "Hafan",
    about: "Amdanom",
    activities: "Gweithgareddau",
    legacy: "Gwaddol",
    media: "Cyfryngau",
    "get-involved": "Ymunwch â Ni",
    contact: "Cysylltu",
    email: "E-bost",
    phone: "Rhif ffôn",
    copyright: "© 2025 Cymru Unleashed. Cedwir pob hawl.",
  },
};

function updateLanguage(lang) {
  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update document title
  document.title =
    lang === "cy" ? "Gwaddol | Cymru Unleashed" : "Legacy | Cymru Unleashed";

  // Store language preference
  localStorage.setItem("preferred-language", lang);
}

languageToggle.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all links
    languageToggle.forEach((l) => l.classList.remove("active"));

    // Add active class to clicked link
    link.classList.add("active");

    // Determine which language to switch to
    const newLang = link.textContent.toLowerCase() === "cymraeg" ? "cy" : "en";

    // Update the language
    updateLanguage(newLang);
  });
});

// Set initial language based on stored preference or default to English
const initialLang = localStorage.getItem("preferred-language") || "en";
updateLanguage(initialLang);

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeStickyHeader();
});

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });

// Hero Section Animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize stats counter animation
  const stats = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.5,
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute("data-count"));
        animateValue(target, 0, finalValue, 2000);
        statsObserver.unobserve(target);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Smooth scrolling for hero buttons
  const exploreLegacyBtn = document.querySelector('a[href="#legacy-pillars"]');
  const viewImpactBtn = document.querySelector('a[href="#impact-stories"]');

  if (exploreLegacyBtn) {
    exploreLegacyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const legacySection = document.querySelector(".legacy-intro");
      if (legacySection) {
        legacySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (viewImpactBtn) {
    viewImpactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const impactSection = document.querySelector(".impact-stories");
      if (impactSection) {
        impactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Smooth scroll functionality for other anchor links
  const scrollLinks = document.querySelectorAll(
    'a[href^="#"]:not(.btn-primary):not(.btn-secondary)'
  );
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

        // Add ripple effect to button
        const ripple = document.createElement("span");
        ripple.classList.add("btn-ripple");
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation to target section
        targetElement.classList.add("section-highlight");
        setTimeout(() => {
          targetElement.classList.remove("section-highlight");
        }, 1500);
      }
    });
  });

  // Scroll indicator functionality with enhanced animation
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const nextSection = document.querySelector("#legacy-pillars");
      if (nextSection) {
        const headerOffset = 80;
        const elementPosition = nextSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Add bounce animation to scroll indicator
        this.classList.add("scroll-bounce");
        setTimeout(() => {
          this.classList.remove("scroll-bounce");
        }, 1000);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation to target section
        nextSection.classList.add("section-highlight");
        setTimeout(() => {
          nextSection.classList.remove("section-highlight");
        }, 1500);
      }
    });

    // Enhanced fade out scroll indicator on scroll
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
        scrollIndicator.style.transform = "translateY(20px)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
        scrollIndicator.style.transform = "translateY(0)";
      }
    });
  }
});

// Enhanced helper function to animate counting with easing
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const step = (timestamp) => {
    if (!startTimestamp) {
      startTimestamp = timestamp;
    }
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const value = Math.floor(easedProgress * (end - start) + start);
    element.textContent = value;

    // Add pulse animation when value changes
    element.classList.add("number-pulse");
    setTimeout(() => {
      element.classList.remove("number-pulse");
    }, 200);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Enhanced parallax effect to shapes with smooth transitions
document.addEventListener("mousemove", function (e) {
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;

    // Add smooth transition
    shape.style.transition = "transform 0.3s ease-out";
    shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
  });
});
