// Mobile Navigation Toggle
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

  // Toggle body scroll
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
};

// Initialize navigation event listeners
const initializeNavigation = () => {
  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking navigation links
  document.querySelectorAll("nav a").forEach((item) => {
    item.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
};

// Sticky Header on Scroll
const initializeStickyHeader = () => {
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
};

// Activity Tabs
const tabs = document.querySelectorAll(".activity-tab");
const contents = document.querySelectorAll(".activity-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab
    tab.classList.add("active");

    // Show corresponding content
    const contentId = `${tab.getAttribute("data-tab")}-content`;
    document.getElementById(contentId).classList.add("active");

    // Scroll to the top of the content with a slight delay for animation
    setTimeout(() => {
      window.scrollTo({
        top: document.querySelector(".activities-tabs").offsetTop - 100,
        behavior: "smooth",
      });
    }, 100);
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".event-card, .installation-card, .timeline-item"
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
    "activities-title": "Our Activities",
    "activities-subtitle":
      "Discover how we're empowering young Welsh women through sport, art, and culture",
    "sports-title": "Sports Workshops",
    "sports-desc":
      "Join our skill-building workshops and mini-tournaments across Wales",
    "art-title": "Art Installations",
    "art-desc":
      "Experience our travelling pop-up exhibitions celebrating Welsh women in sport",
    "digital-title": "Digital Campaign",
    "digital-desc":
      "Explore our bilingual content and immersive VR experiences",
    "upcoming-events": "Upcoming Events",
    "past-events": "Past Events",
    "register-interest": "Register Interest",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    contact: "Contact",
  },
  cy: {
    "activities-title": "Ein Gweithgareddau",
    "activities-subtitle":
      "Darganfyddwch sut rydym yn grymuso menywod ifanc Cymreig trwy chwaraeon, celf a diwylliant",
    "sports-title": "Gweithdai Chwaraeon",
    "sports-desc":
      "Ymunwch â'n gweithdai adeiladu sgiliau a thwrnamaint bach ar draws Cymru",
    "art-title": "Gosodiadau Celf",
    "art-desc":
      "Profiwch ein arddangosfeydd pop-up teithiol sy'n dathlu menywod Cymreig mewn chwaraeon",
    "digital-title": "Ymgyrch Ddigidol",
    "digital-desc":
      "Archwiliwch ein cynnwys dwyieithog a phrofiadau VR ymlyniadol",
    "upcoming-events": "Digwyddiadau i Ddod",
    "past-events": "Digwyddiadau Gorffennol",
    "register-interest": "Cofrestru Diddordeb",
    "footer-tagline":
      "Grymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
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
      ? "Gweithgareddau | Cymru Unleashed"
      : "Activities | Cymru Unleashed";

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

// Check URL hash for direct tab access
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  const validTabs = [
    "sports-content",
    "art-content",
    "digital-content",
    "timeline-content",
  ];

  if (validTabs.includes(hash)) {
    const tab = document.querySelector(`[data-tab="${hash.split('-')[0]}"]`);
    if (tab) {
      tab.click();
    }
  }
});

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });

// Hero Section Animations and Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Stats Counter Animation
  const stats = document.querySelectorAll(".stat-number");

  const animateStats = () => {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };

      updateCount();
    });
  };

  // Intersection Observer for Stats Animation
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetId === "#art-content") {
        // Switch to the art tab
        document.querySelector('.activity-tab[data-tab="art"]').click();
      } else if (targetId === "#sports-content") {
        // Switch to the sports tab
        document.querySelector('.activity-tab[data-tab="sports"]').click();
      }

      if (targetElement) {
        // Add a small offset to account for the header
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // If we're on mobile and the menu is open, close it
        if (nav.classList.contains("active")) {
          toggleMenu();
        }
      }
    });
  });

  // Scroll Indicator Animation and Functionality
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  if (scrollIndicator) {
    // Add click event to the scroll indicator
    scrollIndicator.addEventListener("click", () => {
      const activitiesSection = document.querySelector(".activities-tabs");
      if (activitiesSection) {
        const headerOffset = 100;
        const elementPosition = activitiesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });

    // Fade out scroll indicator when scrolling
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none"; // Disable clicking when hidden
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto"; // Enable clicking when visible
      }
    });
  }
});
