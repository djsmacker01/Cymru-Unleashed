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

  // Set initial active language based on current page
  const isWelshPage = window.location.pathname.includes(".cy.html");
  languageToggle.forEach((link) => {
    if (
      (isWelshPage && link.textContent === "Cymraeg") ||
      (!isWelshPage && link.textContent === "English")
    ) {
      link.classList.add("active");
    }
  });

  // Remove click event listeners since we're using direct links now
  languageToggle.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Let the default link behavior handle the navigation
      // Just ensure the active class is set correctly
      languageToggle.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
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
