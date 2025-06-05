// Carousel Configuration
const carouselSlides = [
  {
    image: "./Images/youngcoach.webp",
    title: "Welcome to Cymru Unleashed",
    description: "Empowering Welsh Communities Through Sports and Culture",
  },
  {
    image: "./Images/hero2.webp",
    title: "Join Our Movement",
    description: "Be part of something special in Wales",
  },
  {
    image: "./Images/musicSport.jpg",
    title: "Celebrate Welsh Heritage",
    description: "Discover the rich culture and traditions of Wales",
  },
  {
    image: "./Images/cymru_team.webp",
    title: "Team Wales",
    description: "Supporting Welsh Women in Football",
  },
  {
    image: "./Images/CULTURAL FOOTBALL RHYTHMS-fot.jpg",
    title: "Team Wales",
    description: "Supporting Welsh Women in Football",
  },
];

// Mobile Navigation Toggle
// REPLACE THE NAVIGATION SECTION IN YOUR scripts.js WITH THIS:

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
    console.log("🎯 Navigation system initialized successfully!");
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
    this.nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (link) {
        e.preventDefault(); // Prevent default initially

        const href = link.getAttribute("href");
        const isExternalLink =
          href?.startsWith("http") ||
          href?.startsWith("mailto") ||
          href?.startsWith("tel");
        const isHashLink = href?.startsWith("#");

        console.log("🔗 Navigation link clicked:", href);

        // Update active link
        this.updateActiveLink(link);

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

    console.log("📱 Menu opened");
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

    console.log("❌ Menu closed");
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

  updateActiveLink(activeLink) {
    // Remove active class from all links
    this.nav.querySelectorAll("a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    activeLink.classList.add("active");
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

      console.log("🎯 Scrolled to section:", href);
    }
  }
}

// REMOVE THESE OLD FUNCTIONS COMPLETELY:
// - toggleMenu
// - initializeNavigation
// - The old navigation event listeners

// KEEP ALL YOUR OTHER EXISTING CODE:
// - Carousel Configuration
// - Countdown Timer
// - Language Toggle
// - Lazy Loading
// - etc.

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile navigation
  new MobileNavigation();

  // Keep your existing initializations:
  console.log("DOM loaded, initializing carousel...");
  initializeCarousel();

  console.log("🚀 All systems initialized and ready!");
});
// const hamburger = document.getElementById("hamburger");
// const nav = document.getElementById("nav");
// const overlay = document.getElementById("overlay");

// const toggleMenu = () => {
//   nav.classList.toggle("active");
//   hamburger.classList.toggle("active");
//   overlay.classList.toggle("active");
//   hamburger.innerHTML = nav.classList.contains("active")
//     ? '<i class="fas fa-times"></i>'
//     : '<i class="fas fa-bars"></i>';

//   // Toggle body scroll
//   document.body.style.overflow = nav.classList.contains("active")
//     ? "hidden"
//     : "";
// };

// Initialize navigation event listeners
// const initializeNavigation = () => {
//   // Hamburger click handler
//   if (hamburger) {
//     hamburger.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       toggleMenu();
//     });
//   }

//   // Overlay click handler
//   if (overlay) {
//     overlay.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       toggleMenu();
//     });
//   }

//   // Navigation links click handler
//   const navLinks = document.querySelectorAll("nav a");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       const href = link.getAttribute("href");
//       if (nav && nav.classList.contains("active")) {
//         toggleMenu();
//       }

//       // Navigate after menu closes
//       setTimeout(() => {
//         window.location.href = href;
//       }, 300);
//     });
//   });

//   // Prevent menu from closing when clicking inside
//   if (nav) {
//     nav.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//     });
//   }
// };

// Initialize navigation when DOM is loaded
// document.addEventListener("DOMContentLoaded", initializeNavigation);

// Sticky Header on Scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".activity-home-card, .about-home-image, .legacy-home-image"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
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

// Countdown Timer
const countdownDate = new Date("July 2, 2025 00:00:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) {
    daysEl.innerText = days;
  }
  if (hoursEl) {
    hoursEl.innerText = hours;
  }
  if (minutesEl) {
    minutesEl.innerText = minutes;
  }
  if (secondsEl) {
    secondsEl.innerText = seconds;
  }

  if (distance < 0) {
    clearInterval(countdownInterval);
    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      countdownEl.innerHTML = "<h3>UEFA Women's Euro 2025 Has Begun!</h3>";
    }
  }
};

// Update countdown every second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Language Toggle
const languageToggle = document.querySelectorAll(".language-toggle a");

const translations = {
  en: {
    home: "Home",
    about: "About",
    activities: "Activities",
    legacy: "Legacy",
    media: "Media",
    "get-involved": "Get Involved",
    "hero-title": "Cymru Unleashed",
    "hero-subtitle": "Empowering Wales Through Sport",
    "hero-subtitle2": "Celebrating Women, Sport & Culture at UEFA Euro 2025",
    "explore-btn": "Explore the Movement",
    "about-title": "About Cymru Unleashed",
    "about-text":
      "Cymru Unleashed is a women-led, grassroots initiative built to celebrate Wales' historic participation in UEFA Women's Euro 2025. We use sport, creativity, and innovation to empower girls aged 12-18 - especially from underrepresented communities - to take pride in their identity, explore leadership through football, and express themselves through art and digital storytelling.",
    "mission-text":
      "To make sport and culture accessible to all - inspiring a generation of young Welsh girls to lead, play, and dream beyond boundaries.",
    "learn-more": "Learn More",
    "what-we-do": "What We're Doing",
    "sports-workshops": "Sports Workshops",
    "sports-desc":
      "10 skill-building, sport-related workshops and mini-tournaments across Wales, delivered in partnership with local club coaches and grassroots stakeholders.",
    "art-installations": "Art Installations",
    "art-desc":
      "5 travelling pop-up exhibitions co-created by young participants and professional Welsh artists, exploring stories of Welsh women and marginalized communities in sport.",
    "digital-campaign": "Digital Campaign",
    "digital-desc":
      "Bilingual social content and a 360° VR video that follows a young Welsh girl's journey through sport, identity, and culture, designed to spark conversation and cultural pride.",
    "explore-events": "Explore Events",
    "discover-art": "Discover Art",
    "see-digital": "See Digital",
    "legacy-title": "Legacy Beyond 2025",
    "legacy-text":
      "Cymru Unleashed isn't just a project - it's a movement. Our legacy will live on in the communities we serve long after UEFA Women's Euro 2025.",
    "permanent-art": "Permanent Public Art in Cardiff Bay Cultural Hub",
    "digital-archive":
      "Digital Archive for Schools with VR content and lesson packs",
    "annual-workshops":
      "Annual Sports-Art Workshops embedded into partner schools",
    "legacy-quote":
      "From a single summer to a lasting cultural shift - for girls, by girls, in Wales.",
    "as-seen-on": "As Seen On",
    "media-press": "Media & Press",
    "join-movement": "Join the Movement",
    "join-text":
      "Whether you want to volunteer, register your school, or partner with us as an organization, there are many ways to get involved with Cymru Unleashed.",
    "get-involved-btn": "Get Involved",
    "countdown-title": "Countdown to UEFA Women's Euro 2025",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    "upcoming-events": "Upcoming Events",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    contact: "Contact",
  },
  cy: {
    home: "Hafan",
    about: "Amdanom Ni",
    activities: "Gweithgareddau",
    legacy: "Gwaddol",
    media: "Cyfryngau",
    "get-involved": "Ymunwch â Ni",
    "hero-title": "Cymru Unleashed",
    "hero-subtitle": "Grymuso Cymru Trwy Chwaraeon",
    "hero-subtitle2":
      "Dathlu Menywod, Chwaraeon a Diwylliant yng Ngemau UEFA Euro 2025",
    "explore-btn": "Archwilio'r Mudiad",
    "about-title": "Am Cymru Unleashed",
    "about-text":
      "Mae Cymru Unleashed yn fenter ar lawr gwlad a arweinir gan fenywod i ddathlu cyfranogiad hanesyddol Cymru yng Ngemau UEFA Menywod Euro 2025. Rydym yn defnyddio chwaraeon, creadigrwydd ac arloesedd i rymuso merched 12-18 oed - yn enwedig o gymunedau sydd ddim yn cael eu cynrychioli - i ymfalchïo yn eu hunaniaeth, archwilio arweinyddiaeth trwy bêl-droed, a mynegi eu hunain trwy gelf a stori digidol.",
    "mission-text":
      "Gwneud chwaraeon a diwylliant yn hygyrch i bawb - ysbrydoli cenhedlaeth o ferched Cymreig ifanc i arwain, chwarae a breuddwydio y tu hwnt i ffiniau.",
    "learn-more": "Dysgu Mwy",
    "what-we-do": "Beth Rydym yn ei Wneud",
    "sports-workshops": "Gweithdai Chwaraeon",
    "sports-desc":
      "10 gweithdy a thwrnamaint bach ar draws Cymru sy'n adeiladu sgiliau chwaraeon, a gyflenwir mewn partneriaeth â hyfforddwyr clwb lleol a rhanddeiliaid ar lawr gwlad.",
    "art-installations": "Gosodiadau Celf",
    "art-desc":
      "5 arddangosfa pop-up teithiol a grëwyd ar y cyd gan gyfranogwyr ifanc ac artistiaid Cymreig proffesiynol, yn archwilio straeon menywod Cymreig a chymunedau sydd ddim yn cael eu cynrychioli mewn chwaraeon.",
    "digital-campaign": "Ymgyrch Ddigidol",
    "digital-desc":
      "Cynnwys cymdeithasol dwyieithog a fideo VR 360° sy'n dilyn taith merch ifanc Gymreig trwy chwaraeon, hunaniaeth a diwylliant, wedi'i gynllunio i sbarduno sgwrs a balchder diwylliannol.",
    "explore-events": "Archwilio Digwyddiadau",
    "discover-art": "Darganfod Celf",
    "see-digital": "Gweld Digidol",
    "legacy-title": "Gwaddol y tu hwnt i 2025",
    "legacy-text":
      "Nid prosiect yw Cymru Unleashed - mae'n fudiad. Bydd ein gwaddol yn parhau yn y cymunedau rydym yn eu gwasanaethu ymhell ar ôl Gemau UEFA Menywod Euro 2025.",
    "permanent-art":
      "Celf Gyhoeddus Barhaol yn Nghanolfan Ddiwylliannol Bae Caerdydd",
    "digital-archive":
      "Archif Digidol i Ysgolion gyda chynnwys VR a phecynnau gwersi",
    "annual-workshops":
      "Gweithdai Chwaraeon-Celf Blynyddol wedi'u hymgorffori mewn ysgolion partner",
    "legacy-quote":
      "O un haf i newid diwylliannol parhaol - gan ferched, i ferched, yng Nghymru.",
    "as-seen-on": "Fel y Gwelwyd Ar",
    "media-press": "Cyfryngau a'r Wasg",
    "join-movement": "Ymunwch â'r Mudiad",
    "join-text":
      "P'un a ydych chi eisiau gwirfoddoli, cofrestru eich ysgol, neu bartneru gyda ni fel sefydliad, mae sawl ffordd o ymuno â Cymru Unleashed.",
    "get-involved-btn": "Ymunwch â Ni",
    "countdown-title": "Cyfrif i Lawr i Gemau UEFA Menywod Euro 2025",
    days: "Dyddiau",
    hours: "Oriau",
    minutes: "Munudau",
    seconds: "Eiliadau",
    "upcoming-events": "Digwyddiadau i Ddod",
    "footer-tagline":
      "Grymuso'r genhedlaeth nesaf o fenywod Cymreig trwy chwaraeon, celf a diwylliant.",
    "quick-links": "Dolenni Cyflym",
    contact: "Cysylltu",
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

  // Update navigation links
  document.querySelectorAll("nav a").forEach((link) => {
    const key = link.getAttribute("data-translate");
    if (key && translations[lang][key]) {
      link.textContent = translations[lang][key];
    }
  });

  // Update document title
  document.title =
    lang === "cy"
      ? "Cymru Unleashed | Grymuso Cymru Trwy Chwaraeon"
      : "Cymru Unleashed | Empowering Wales Through Sport";

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

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });

// Carousel functionality
function initializeCarousel() {
  console.log("Initializing carousel...");
  const heroSlides = document.getElementById("heroSlides");
  const indicators = document.getElementById("carouselIndicators");

  const elements = [heroSlides, indicators];
  if (elements.some((el) => !el)) {
    console.error("Carousel elements not found");
    return;
  }

  let currentSlide = 0;
  let autoSlideInterval;

  // Preload images first
  function preloadImages() {
    return Promise.all(
      carouselSlides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`Image loaded: ${slide.image}`);
            resolve(slide);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${slide.image}`);
            // Still resolve to continue with other images
            resolve(slide);
          };
          img.src = slide.image;
        });
      })
    );
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    updateSlides();
    updateIndicators();
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    updateSlides();
    updateIndicators();
  }

  function updateSlides() {
    const slideElements = document.querySelectorAll(".hero-slide");
    slideElements.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function updateIndicators() {
    const indicatorElements = document.querySelectorAll(".carousel-indicator");
    indicatorElements.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  // Initialize carousel after images are loaded
  preloadImages()
    .then((loadedSlides) => {
      console.log("Images preloaded, creating slides...");

      // Clear existing content
      heroSlides.innerHTML = "";
      indicators.innerHTML = "";

      // Create slides
      loadedSlides.forEach((slide, index) => {
        // Create slide element
        const slideElement = document.createElement("div");
        slideElement.className = "hero-slide";
        slideElement.style.backgroundImage = `url('${slide.image}')`;
        slideElement.innerHTML = `
          <div class="hero-content">
            <h1>${slide.title}</h1>
            <p>${slide.description}</p>
          </div>
        `;
        heroSlides.appendChild(slideElement);

        // Create indicator
        const indicator = document.createElement("button");
        indicator.className = "carousel-indicator";
        indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
        indicator.addEventListener("click", () => {
          currentSlide = index;
          updateSlides();
          updateIndicators();
          startAutoSlide();
        });
        indicators.appendChild(indicator);
      });

      // Set initial state
      updateSlides();
      updateIndicators();

      // Add event listeners for controls
      const prevButton = document.querySelector(".carousel-control.prev");
      const nextButton = document.querySelector(".carousel-control.next");

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          prevSlide();
          startAutoSlide();
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          nextSlide();
          startAutoSlide();
        });
      }

      // Start auto-sliding
      startAutoSlide();

      // Pause auto-slide when hovering over carousel
      const carousel = document.querySelector(".hero-carousel");
      if (carousel) {
        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);
      }

      console.log("Carousel initialized successfully!");
    })
    .catch((error) => {
      console.error("Error initializing carousel:", error);
      // Create fallback slide
      heroSlides.innerHTML = `
        <div class="hero-slide active" style="background: linear-gradient(135deg, var(--primary), var(--secondary));">
          <div class="hero-content">
            <h1>Welcome to Cymru Unleashed</h1>
            <p>Empowering Welsh Communities Through Sports and Culture</p>
          </div>
        </div>
      `;
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing carousel...");
  initializeCarousel();
});

// Lazy Loading Implementation
const lazyLoadOptions = {
  root: null,
  rootMargin: "50px",
  threshold: 0.1,
};

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;

      // Handle lazy-loaded images
      if (element.tagName === "IMG" && element.dataset.src) {
        element.src = element.dataset.src;
        element.removeAttribute("data-src");
      }

      // Handle lazy-loaded content sections
      if (element.classList.contains("lazy-content")) {
        element.classList.add("loaded");
      }

      // Stop observing the element once it's loaded
      observer.unobserve(element);
    }
  });
}, lazyLoadOptions);

// Initialize lazy loading for all images and content sections
document.addEventListener("DOMContentLoaded", () => {
  // Lazy load images
  document.querySelectorAll("img[data-src]").forEach((img) => {
    lazyLoadObserver.observe(img);
  });

  // Lazy load content sections
  document.querySelectorAll(".lazy-content").forEach((section) => {
    lazyLoadObserver.observe(section);
  });
});

// Preload images for better performance
window.addEventListener("load", () => {
  const imagesToPreload = document.querySelectorAll("img[data-src]");
  imagesToPreload.forEach((img) => {
    if (img.getAttribute("data-src")) {
      img.src = img.getAttribute("data-src");
      img.onload = () => {
        img.removeAttribute("data-src");
      };
    }
  });
});
