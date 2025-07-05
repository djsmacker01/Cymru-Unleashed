// Carousel Configuration
const carouselSlides = [
  {
    image: "./Images/hero2.webp",
    title: "Be a part of History ",
    description: "Be part of something special in Wales",
  },
  {
    image: "./Images/hero3.webp",
    title: "Celebrate Welsh Heritage",
    description: "Discover the rich culture and traditions of Wales",
  },
  {
    image: "./Images/cymru_team.webp",
    title: "Team Wales",
    description: "Supporting Welsh Women in Football",
  },
  {
    image: "./Images/pp.webp",
    title: "Art Installation",
    description:
      "A striking tribute to the strength, pride, and passion of Welsh women in football—capturing their impact through bold and inspiring visual art.",
  },
];

// AGGRESSIVE NAVIGATION FIX - Replace your navigation section

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

const toggleMenu = () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.innerHTML = nav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';

  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
};

const closeMenu = () => {
  nav.classList.remove("active");
  hamburger.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.style.overflow = "";
};

const initializeNavigation = () => {
  // Hamburger click
  hamburger.addEventListener("click", toggleMenu);

  // Overlay click
  overlay.addEventListener("click", closeMenu);

  // AGGRESSIVE LINK FIX - Multiple approaches

  // Approach 1: Direct link selection and fixing
  setTimeout(() => {
    const allLinks = document.querySelectorAll(
      "a[href], nav a, #nav a, [href*='html'], [href*='/']"
    );

    allLinks.forEach((link) => {
      // Check if it's a navigation link
      if (link.closest("nav") || link.closest("#nav")) {
        console.log("🔧 Fixing navigation link:", link.href);

        // Force the link to be clickable
        link.style.pointerEvents = "auto";
        link.style.zIndex = "9999";
        link.style.position = "relative";
        link.style.cursor = "pointer";
        link.style.display = "flex";
        link.style.alignItems = "center";

        // Remove any existing click handlers and add new one
        link.onclick = null;

        link.addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("🔗 Link clicked:", link.href);

          // Close menu
          if (nav?.classList.contains("active")) {
            closeMenu();
          }

          // Navigate after a short delay
          setTimeout(() => {
            window.location.href = link.href;
          }, 200);
        });

        // Also handle touch events for mobile
        link.addEventListener("touchend", (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("📱 Touch on link:", link.href);

          if (nav?.classList.contains("active")) {
            closeMenu();
          }

          setTimeout(() => {
            window.location.href = link.href;
          }, 200);
        });
      }
    });
  }, 300);

  // Approach 2: Global click handler
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      const link = target.closest("a[href]");

      if (link && (link.closest("nav") || link.closest("#nav"))) {
        console.log("🌐 Global handler - Navigation link:", link.href);
        e.stopPropagation();

        if (nav?.classList.contains("active")) {
          closeMenu();
          setTimeout(() => {
            window.location.href = link.href;
          }, 200);
        }
      }
    },
    true
  ); // Use capture phase

  // Approach 3: Force click handlers on common navigation elements
  setTimeout(() => {
    const navSelectors = [
      "nav a[href]",
      "#nav a[href]",
      "a[href*='index.html']",
      "a[href*='about.html']",
      "a[href*='activities.html']",
      "a[href*='legacy.html']",
      "a[href*='get-involved.html']",
    ];

    navSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((link) => {
        link.addEventListener("click", (e) => {
          console.log("🎯 Forced handler:", link.href);
          if (nav?.classList.contains("active")) {
            closeMenu();
            e.preventDefault();
            setTimeout(() => {
              window.location.href = link.href;
            }, 200);
          }
        });
      });
    });
  }, 500);

  console.log("✅ Aggressive navigation setup complete");
};

// Sticky Header on Scroll
const initializeStickyHeader = () => {
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
};

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

// Event Status - UEFA Women's Euro 2025 is Live
const initializeEventStatus = () => {
  const eventStatusEl = document.getElementById("eventStatus");
  if (eventStatusEl) {
    const trophyIcon = eventStatusEl.querySelector(".event-status-icon i");
    if (trophyIcon) {
      trophyIcon.style.animation = "pulse 2s infinite";
    }
  }
};

// TEMPORARY DEBUG - Add this after initializeNavigation()
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Force click handlers on ALL possible navigation elements
    document
      .querySelectorAll("a[href*='html'], a[href*='/'], nav a, #nav a")
      .forEach((link) => {
        link.style.pointerEvents = "auto";
        link.style.zIndex = "9999";
        link.style.position = "relative";

        link.addEventListener("click", (e) => {
          console.log("FORCED CLICK:", link.href);
          if (nav?.classList.contains("active")) {
            nav.classList.remove("active");
            overlay.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = "";
          }
        });
      });
  }, 500);
});

// Initialize event status
initializeEventStatus();

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
      "Cymru Unleashed is a women-led, grassroots initiative built to celebrate Wales' historic participation in UEFA Women's Euro 2025. We use sport, creativity, and innovation to empower girls - especially from underrepresented communities - to take pride in their identity, explore leadership through football, and express themselves through art and digital storytelling.",
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
    "event-status-title": "UEFA Women's Euro 2025 is Here!",
    "event-live": "The Tournament is Live!",
    "event-description":
      "Wales is making history at UEFA Women's Euro 2025. Join us in celebrating this historic moment and supporting our amazing Welsh team!",
    "highlight-matches": "Live Matches",
    "highlight-wales": "Team Wales",
    "highlight-community": "Community Spirit",
    "view-activities": "View Our Activities",
    "get-involved-now": "Get Involved Now",
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
      "Mae Cymru Unleashed yn fenter ar lawr gwlad a arweinir gan fenywod i ddathlu cyfranogiad hanesyddol Cymru yng Ngemau UEFA Menywod Euro 2025. Rydym yn defnyddio chwaraeon, creadigrwydd ac arloesedd i rymuso merched - yn enwedig o gymunedau sydd ddim yn cael eu cynrychioli - i ymfalchïo yn eu hunaniaeth, archwilio arweinyddiaeth trwy bêl-droed, a mynegi eu hunain trwy gelf a stori digidol.",
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
    "event-status-title": "Mae Gemau UEFA Menywod Euro 2025 Yma!",
    "event-live": "Mae'r Twrnamaint yn Fyw!",
    "event-description":
      "Mae Cymru yn gwneud hanes yng Ngemau UEFA Menywod Euro 2025. Ymunwch â ni i ddathlu'r foment hanesyddol hwn a chefnogi ein tîm Cymreig anhygoel!",
    "highlight-matches": "Gemau Byw",
    "highlight-wales": "Tîm Cymru",
    "highlight-community": "Ysbryd Cymunedol",
    "view-activities": "Gweld Ein Gweithgareddau",
    "get-involved-now": "Ymunwch â Ni Nawr",
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

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeStickyHeader();
  initializeCarousel();
  console.log("🚀 All systems initialized and ready!");
});
