// FINAL CLEAN NAVIGATION - Production Ready
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  if (!nav || !hamburger || !overlay) {
    console.error("Navigation elements not found");
    return;
  }

  let isMenuOpen = false;

  // Hamburger menu toggle
  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Open menu function
  function openMenu() {
    isMenuOpen = true;

    nav.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Update hamburger icon
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }

    // Focus first link for accessibility
    setTimeout(() => {
      const firstLink = nav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }, 300);
  }

  // Close menu function
  function closeMenu() {
    isMenuOpen = false;

    nav.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    // Update hamburger icon
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }

  // Overlay click to close menu
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (isMenuOpen) {
      closeMenu();
    }
  });

  // Navigation link handling
  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Update active states
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (href && href !== "#") {
        if (isMenuOpen) {
          // Mobile menu is open - close it first, then navigate
          e.preventDefault();
          closeMenu();

          setTimeout(() => {
            if (href.startsWith("#")) {
              // Hash link - smooth scroll
              const targetElement = document.querySelector(href);
              if (targetElement) {
                const headerHeight =
                  document.getElementById("header")?.offsetHeight || 80;
                const targetPosition =
                  targetElement.getBoundingClientRect().top +
                  window.pageYOffset -
                  headerHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            } else if (href.startsWith("mailto:") || href.startsWith("tel:")) {
              // Email/phone links
              window.location.href = href;
            } else if (href.startsWith("http")) {
              // External links
              window.open(href, link.target || "_self");
            } else {
              // Internal page links
              window.location.href = href;
            }
          }, 350);
        } else {
          // Desktop mode - handle hash links with smooth scroll
          if (href.startsWith("#")) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
              const headerHeight =
                document.getElementById("header")?.offsetHeight || 80;
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
          // For regular page links, let browser handle naturally
        }
      } else {
        e.preventDefault();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target) &&
      !overlay.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on window resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  });

  // ESC key to close menu
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Tab trapping for accessibility
  nav.addEventListener("keydown", function (e) {
    if (e.key === "Tab" && isMenuOpen) {
      const focusableElements = nav.querySelectorAll(
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
