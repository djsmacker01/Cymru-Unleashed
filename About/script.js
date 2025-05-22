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
    header.classList.toggle(
      "scrolled",
      window.scrollY > behaviorConfig.navigation.scrollThreshold
    );
  });
};

// Animation on scroll with Intersection Observer
const initializeAnimations = () => {
  const animateElements = document.querySelectorAll(
    behaviorConfig.animations.elements.join(", ")
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
      threshold: behaviorConfig.navigation.animationThreshold,
      rootMargin: behaviorConfig.navigation.animationMargin,
    }
  );

  animateElements.forEach((element) => observer.observe(element));
};

// Language Toggle
const initializeLanguageToggle = () => {
  const languageToggle = document.querySelectorAll(".language-toggle a");

  // Set initial active language
  const currentLang =
    localStorage.getItem("preferredLanguage") ||
    behaviorConfig.languages.default;
  languageToggle.forEach((link) => {
    if (link.textContent.toLowerCase() === currentLang) {
      link.classList.add("active");
    }
  });

  languageToggle.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      languageToggle.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      link.classList.add("active");

      // Store language preference
      const selectedLang = link.textContent.toLowerCase();
      localStorage.setItem("preferredLanguage", selectedLang);

      // Change language
      changeLanguage(selectedLang);
    });
  });
};

// Language Change Function
const changeLanguage = (lang) => {
  // Get current page path
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop();

  // Determine the target page based on current page and language
  let targetPage;
  if (lang === "cy") {
    targetPage = currentPage.replace(".html", ".cy.html");
  } else {
    targetPage = currentPage.replace(".cy.html", ".html");
  }

  // Navigate to the new page
  window.location.href = targetPage;
};

// Handle touch events for mobile
const initializeTouchEvents = () => {
  document.addEventListener("touchstart", () => {}, { passive: true });
};

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeStickyHeader();
  initializeAnimations();
  initializeLanguageToggle();
  initializeTouchEvents();
});
