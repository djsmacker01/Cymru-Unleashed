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

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
});

// Sticky Header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");

  if (header) {
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          header.classList.toggle("scrolled", currentScrollY > 50);
          lastScrollY = currentScrollY;
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
});

// Social Tabs
document.addEventListener("DOMContentLoaded", function () {
  const socialTabs = document.querySelectorAll(".social-tab");
  const socialFeeds = document.querySelectorAll(".social-feed");

  socialTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      socialTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      socialFeeds.forEach((feed) => feed.classList.remove("active"));
      const feedId = `${tab.getAttribute("data-tab")}-feed`;
      const targetFeed = document.getElementById(feedId);
      if (targetFeed) {
        targetFeed.classList.add("active");
      }
    });
  });
});

// Digital Clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;
}

document.addEventListener("DOMContentLoaded", function () {
  updateClock();
  setInterval(updateClock, 1000);
});

// Video Interactions
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play-button");
  const videoThumbs = document.querySelectorAll(".video-thumb");

  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Video would play here in the real implementation.");
    });
  }

  videoThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const thumbTitle =
        thumb.querySelector(".thumb-title")?.textContent?.trim() ||
        "Unknown Video";
      alert(
        `Video would change to "${thumbTitle}" and play in the real implementation.`
      );
    });
  });
});

// Download Buttons
document.addEventListener("DOMContentLoaded", function () {
  const downloadButtons = document.querySelectorAll(".download-btn");

  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const fileNameElement = btn
        .closest(".download-item")
        ?.querySelector("h4");
      const fileName = fileNameElement?.textContent?.trim() || "Unknown File";
      alert(
        `Downloading ${fileName} - This would be a real download in the live implementation.`
      );

      // Visual feedback
      const icon = btn.querySelector("i");
      if (icon) {
        const originalClass = icon.className;
        icon.className = "fas fa-check";
        setTimeout(() => {
          icon.className = originalClass;
        }, 1500);
      }
    });
  });
});

// Language Toggle
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.querySelectorAll(".language-toggle a");

  const translations = {
    en: {
      "media-title": "Media & Press",
      "media-subtitle": "Stay updated with our latest news and coverage",
      // Add your other translations here
    },
    cy: {
      "media-title": "Cyfryngau a'r Wasg",
      "media-subtitle":
        "Dilynwch ein taith trwy fideos, ffotograffau, a straeon",
      // Add your other translations here
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
      lang === "cy" ? "Cyfryngau | Cymru Unleashed" : "Media | Cymru Unleashed";

    try {
      localStorage.setItem("preferred-language", lang);
    } catch (e) {
      console.warn("Could not save language preference");
    }
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
  let initialLang = "en";
  try {
    initialLang = localStorage.getItem("preferred-language") || "en";
  } catch (e) {
    // Use default
  }
  updateLanguage(initialLang);
});

// Statistics Animation
document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length > 0) {
    const animateValue = (element, start, end, duration) => {
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const endValue = parseInt(element.getAttribute("data-count"));
            if (!isNaN(endValue)) {
              animateValue(element, 0, endValue, 2000);
            }
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
  }
});

console.log("Navigation system initialized successfully");
