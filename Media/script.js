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

// Social Tabs
const socialTabs = document.querySelectorAll(".social-tab");
const socialFeeds = document.querySelectorAll(".social-feed");

socialTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    socialTabs.forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    tab.classList.add("active");

    // Hide all feeds
    socialFeeds.forEach((feed) => feed.classList.remove("active"));
    // Show corresponding feed
    const feedId = `${tab.getAttribute("data-tab")}-feed`;
    document.getElementById(feedId).classList.add("active");
  });
});

// Video Interaction
const mainVideo = document.querySelector(".featured-video .video-container");
const playButton = document.querySelector(".play-button");
const videoThumbs = document.querySelectorAll(".video-thumb");

playButton.addEventListener("click", () => {
  // In a real implementation, this would play the video
  alert("Video would play here in the real implementation.");
});

videoThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    // In a real implementation, this would change and play the video
    const thumbTitle = thumb.querySelector(".thumb-title").textContent.trim();
    alert(
      `Video would change to "${thumbTitle}" and play in the real implementation.`
    );
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".news-card, .social-post, .download-item"
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
    "media-title": "Media & Press",
    "media-subtitle": "Stay updated with our latest news and coverage",
    "latest-news": "Latest News",
    "press-releases": "Press Releases",
    "media-coverage": "Media Coverage",
    "social-media": "Social Media",
    "follow-us": "Follow Us",
    "contact-press": "Contact Press",
    "press-kit": "Download Press Kit",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    contact: "Contact",
  },
  cy: {
    "media-title": "Cyfryngau a'r Wasg",
    "media-subtitle":
      "Cadwch yn gyfredol gyda'n newyddion a chwmpas diweddaraf",
    "latest-news": "Newyddion Diweddaraf",
    "press-releases": "Datganiadau i'r Wasg",
    "media-coverage": "Cwmpas y Cyfryngau",
    "social-media": "Cyfryngau Cymdeithasol",
    "follow-us": "Dilynwch Ni",
    "contact-press": "Cysylltu â'r Wasg",
    "press-kit": "Lawrlwytho Pecyn y Wasg",
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
    lang === "cy" ? "Cyfryngau | Cymru Unleashed" : "Media | Cymru Unleashed";

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

// Download buttons interaction
document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const fileName = e.currentTarget.parentElement
      .querySelector("h4")
      .textContent.trim();
    alert(
      `Downloading ${fileName} - This would be a real download in the live implementation.`
    );

    // Animation effect
    const icon = e.currentTarget.querySelector("i");
    icon.className = "fas fa-check";
    setTimeout(() => {
      icon.className = "fas fa-download";
    }, 1500);
  });
});

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });
