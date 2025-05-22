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
    "video-gallery": "Video Gallery",
    "video-1-title": "Sports Workshop 1",
    "video-1-desc":
      "Follow our first sports workshop with young women from Cardiff High School",
    "video-2-title": "Art Installation 1",
    "video-2-desc": "Watch the process of creating our first art installation",
    "video-3-title": "Digital Campaign",
    "video-3-desc": "Follow our digital campaign across social media",
    "photo-gallery": "Photo Gallery",
    "photo-1-desc": "Young women participating in a sports workshop",
    "photo-2-desc": "Artist working on the art installation",
    "photo-3-desc": "Project representatives presenting to the press",
    "photo-4-desc": "Art workshop with young women",
    "press-coverage": "Press Coverage",
    "press-1-title": "Cymru Unleashed Goes International",
    "press-1-desc": "Article in BBC about our project",
    "press-2-title": "New Project Goes International",
    "press-2-desc": "Article in The Guardian about our activities",
    "read-more": "Read More",
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
    "media-title": "Cyfryngau a'r Wasg",
    "media-subtitle": "Dilynwch ein taith trwy fideos, ffotograffau, a straeon",
    "video-gallery": "Casgliad Fideo",
    "video-1-title": "Gweithdy Chwaraeon 1",
    "video-1-desc":
      "Dilynwch ein gweithdy chwaraeon cyntaf gyda merched ifanc o Ysgol Uwchradd Caerdydd",
    "video-2-title": "Gosodiad Celf 1",
    "video-2-desc": "Sylwch ar y broses o greu ein gosodiad celf cyntaf",
    "video-3-title": "Ymgyrch Ddigidol",
    "video-3-desc":
      "Dilynwch ein hymgyrch ddigidol ar draws cyfryngau cymdeithasol",
    "photo-gallery": "Casgliad Ffotograffau",
    "photo-1-desc": "Merched ifanc yn cymryd rhan mewn gweithdy chwaraeon",
    "photo-2-desc": "Artist yn gweithio ar y gosodiad celf",
    "photo-3-desc": "Cynrychiolwyr o'r prosiect yn cyflwyno i'r wasg",
    "photo-4-desc": "Gweithdy celf gyda merched ifanc",
    "press-coverage": "Y Wasg",
    "press-1-title": "Cymru Unleashed yn Rhyngwladol",
    "press-1-desc": "Erthygl yn y BBC am ein prosiect",
    "press-2-title": "Prosiect Newydd yn Rhyngwladol",
    "press-2-desc": "Erthygl yn y Guardian am ein gweithgareddau",
    "read-more": "Darllen Mwy",
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

// Hero Section Animations and Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Animate stats numbers
  const stats = document.querySelectorAll(".stat-number");

  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const endValue = parseInt(element.getAttribute("data-count"));
        animateValue(element, 0, endValue, 2000);
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    observer.observe(stat);
  });

  // Smooth scroll for the CTA button
  const scrollLinks = document.querySelectorAll(".scroll-link");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax effect for hero shapes
  const heroSection = document.querySelector(".page-hero");
  const shapes = document.querySelectorAll(".hero-shapes .shape");

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    shapes.forEach((shape, index) => {
      const speed = 0.05 + index * 0.02;
      const x = (clientX - centerX) * speed;
      const y = (clientY - centerY) * speed;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});
