// Complete Working Navigation Script for Cymru Unleashed
// This replaces all your navigation JavaScript files

console.log("🚀 Cymru Unleashed Navigation Script Loading...");

// Mobile Navigation Class
class MobileNavigation {
  constructor() {
    this.nav = document.getElementById("nav");
    this.hamburger = document.getElementById("hamburger");
    this.overlay = document.getElementById("overlay");
    this.body = document.body;
    this.isMenuOpen = false;
    this.isAnimating = false;

    console.log("📱 Mobile Navigation initializing...");
    this.init();
  }

  init() {
    // Check if all required elements exist
    const elements = {
      nav: this.nav,
      hamburger: this.hamburger,
      overlay: this.overlay,
    };

    const missingElements = Object.entries(elements)
      .filter(([key, element]) => !element)
      .map(([key]) => key);

    if (missingElements.length > 0) {
      console.error("❌ Missing navigation elements:", missingElements);
      return;
    }

    console.log("✅ All navigation elements found, setting up events...");
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupResizeHandler();
  }

  setupEventListeners() {
    // Hamburger click handler
    this.hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("🍔 Hamburger clicked, menu open:", this.isMenuOpen);
      this.toggleMenu();
    });

    // Overlay click handler
    this.overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("👆 Overlay clicked");
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Navigation links handler
    this.nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        console.log("🔗 Navigation link clicked:", href);

        // Update active state
        this.updateActiveLink(link);

        if (href && href !== "#") {
          const isExternalLink = href.startsWith("http");
          const isHashLink = href.startsWith("#");
          const isEmailLink = href.startsWith("mailto:");
          const isTelLink = href.startsWith("tel:");

          // Special links that should open immediately
          if (isEmailLink || isTelLink || isExternalLink) {
            console.log("🔗 Special link, opening immediately:", href);
            if (this.isMenuOpen) {
              this.closeMenu();
            }
            return; // Let browser handle these links naturally
          }

          if (this.isMenuOpen) {
            // Mobile menu is open, close it first
            e.preventDefault();
            console.log(
              "📱 Mobile menu open, closing first then navigating to:",
              href
            );

            this.closeMenu();

            // Wait for close animation, then navigate
            setTimeout(() => {
              if (isHashLink) {
                this.scrollToSection(href);
              } else {
                console.log("🌐 Navigating to:", href);
                window.location.href = href;
              }
            }, 350); // Slightly longer delay to ensure menu closes
          } else {
            // Desktop or menu not open
            if (isHashLink) {
              e.preventDefault();
              this.scrollToSection(href);
            } else {
              console.log("🖥️ Desktop navigation to:", href);
              // Let browser handle normal page navigation
            }
          }
        } else {
          e.preventDefault();
          console.log("⚠️ Empty or # href, preventing default");
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.nav.contains(e.target) &&
        !this.hamburger.contains(e.target) &&
        !this.overlay.contains(e.target)
      ) {
        console.log("👆 Clicked outside menu, closing");
        this.closeMenu();
      }
    });
  }

  setupKeyboardNavigation() {
    // ESC key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        console.log("⌨️ ESC key pressed, closing menu");
        this.closeMenu();
        this.hamburger.focus();
      }
    });

    // Tab trapping within menu when open
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

  setupResizeHandler() {
    // Close menu when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        console.log("📏 Resized to desktop, closing mobile menu");
        this.closeMenu();
      }
    });
  }

  updateActiveLink(clickedLink) {
    // Remove active class from all navigation links
    this.nav.querySelectorAll("a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    clickedLink.classList.add("active");
    console.log("✨ Updated active link:", clickedLink.href);
  }

  toggleMenu() {
    if (this.isAnimating) {
      console.log("⏳ Menu is animating, ignoring toggle");
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

    console.log("📂 Opening mobile menu...");
    this.isAnimating = true;
    this.isMenuOpen = true;

    // Add active classes
    this.nav.classList.add("active");
    this.hamburger.classList.add("active");
    this.overlay.classList.add("active");

    // Prevent body scroll
    this.body.style.overflow = "hidden";

    // Update hamburger icon
    this.updateHamburgerIcon(true);

    // Set focus to first navigation item after animation
    setTimeout(() => {
      const firstLink = this.nav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
      this.isAnimating = false;
      console.log("✅ Mobile menu opened successfully");
    }, 300);
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) {
      return;
    }

    console.log("📁 Closing mobile menu...");
    this.isAnimating = true;
    this.isMenuOpen = false;

    // Remove active classes
    this.nav.classList.remove("active");
    this.hamburger.classList.remove("active");
    this.overlay.classList.remove("active");

    // Restore body scroll
    this.body.style.overflow = "";

    // Update hamburger icon
    this.updateHamburgerIcon(false);

    setTimeout(() => {
      this.isAnimating = false;
      console.log("✅ Mobile menu closed successfully");
    }, 300);
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
    try {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight =
          document.getElementById("header")?.offsetHeight || 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        console.log("📍 Scrolled to section:", href);
      } else {
        console.warn("⚠️ Target element not found for:", href);
      }
    } catch (error) {
      console.error("❌ Error scrolling to section:", href, error);
    }
  }
}

// Sticky Header Class
class StickyHeader {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    if (!this.header) {
      console.warn("⚠️ Header element not found for sticky functionality");
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
    console.log("📌 Sticky header initialized");
  }
}

// Digital Clock Function
function initializeClock() {
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

  // Update immediately and then every second
  updateClock();
  setInterval(updateClock, 1000);
  console.log("🕐 Digital clock initialized");
}

// Social Tabs Functionality
function initializeSocialTabs() {
  const socialTabs = document.querySelectorAll(".social-tab");
  const socialFeeds = document.querySelectorAll(".social-feed");

  if (socialTabs.length === 0) {
    console.log("ℹ️ No social tabs found");
    return;
  }

  socialTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      console.log("📱 Social tab clicked:", tab.getAttribute("data-tab"));

      // Remove active class from all tabs
      socialTabs.forEach((t) => t.classList.remove("active"));
      // Add active class to clicked tab
      tab.classList.add("active");

      // Hide all feeds
      socialFeeds.forEach((feed) => feed.classList.remove("active"));

      // Show corresponding feed
      const feedId = `${tab.getAttribute("data-tab")}-feed`;
      const targetFeed = document.getElementById(feedId);
      if (targetFeed) {
        targetFeed.classList.add("active");
      }
    });
  });

  console.log("📱 Social tabs initialized");
}

// Video Interaction
function initializeVideoInteraction() {
  const playButton = document.querySelector(".play-button");
  const videoThumbs = document.querySelectorAll(".video-thumb");

  if (playButton) {
    playButton.addEventListener("click", () => {
      console.log("▶️ Main video play button clicked");
      alert("Video would play here in the real implementation.");
    });
  }

  videoThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const thumbTitle =
        thumb.querySelector(".thumb-title")?.textContent?.trim() ||
        "Unknown Video";
      console.log("▶️ Video thumbnail clicked:", thumbTitle);
      alert(
        `Video would change to "${thumbTitle}" and play in the real implementation.`
      );
    });
  });

  console.log("🎥 Video interaction initialized");
}

// Download Functionality
function initializeDownloads() {
  const downloadButtons = document.querySelectorAll(".download-btn");

  if (downloadButtons.length === 0) {
    console.log("ℹ️ No download buttons found");
    return;
  }

  downloadButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const downloadItem = button.closest(".download-item");
      const progressBar = downloadItem?.querySelector(".progress-bar");
      const progressContainer =
        downloadItem?.querySelector(".download-progress");
      const fileName = button.getAttribute("data-file") || "Unknown File";

      console.log("📥 Download started:", fileName);

      if (!downloadItem || !progressBar || !progressContainer) {
        console.warn("⚠️ Download elements not found");
        return;
      }

      // Start download animation
      downloadItem.classList.add("downloading");
      progressContainer.classList.add("active");

      // Simulate download progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          completeDownload(downloadItem, fileName);
        }
        progressBar.style.width = `${progress}%`;
      }, 200);
    });
  });

  function completeDownload(downloadItem, fileName) {
    console.log("✅ Download completed:", fileName);
    downloadItem.classList.remove("downloading");
    downloadItem.classList.add("completed");

    const button = downloadItem.querySelector(".download-btn");
    const icon = button?.querySelector("i");

    if (icon) {
      icon.className = "fas fa-check";
    }

    // Reset after 3 seconds
    setTimeout(() => {
      downloadItem.classList.remove("completed");
      if (icon) {
        icon.className = "fas fa-download";
      }
      const progressContainer =
        downloadItem.querySelector(".download-progress");
      const progressBar = downloadItem.querySelector(".progress-bar");
      if (progressContainer) progressContainer.classList.remove("active");
      if (progressBar) progressBar.style.width = "0%";
    }, 3000);
  }

  console.log("📥 Download functionality initialized");
}

// Statistics Animation
function initializeStatsAnimation() {
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length === 0) {
    console.log("ℹ️ No stats found to animate");
    return;
  }

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.getAttribute("data-count"));
          if (!isNaN(endValue)) {
            animateValue(element, 0, endValue, 2000);
            console.log("📊 Animating stat:", endValue);
          }
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => {
    observer.observe(stat);
  });

  console.log("📊 Stats animation initialized");
}

// Language Toggle (keeping your existing functionality)
function initializeLanguageToggle() {
  const languageToggle = document.querySelectorAll(".language-toggle a");

  if (languageToggle.length === 0) {
    console.log("ℹ️ No language toggle found");
    return;
  }

  // Your existing translations object would go here
  const translations = {
    en: {
      "media-title": "Media & Press",
      "media-subtitle": "Stay updated with our latest news and coverage",
      // ... add all your translations
    },
    cy: {
      "media-title": "Cyfryngau a'r Wasg",
      "media-subtitle":
        "Dilynwch ein taith trwy fideos, ffotograffau, a straeon",
      // ... add all your translations
    },
  };

  function updateLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    try {
      localStorage.setItem("preferred-language", lang);
    } catch (e) {
      console.warn("Could not save language preference:", e);
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
      console.log("🌐 Language changed to:", newLang);
    });
  });

  console.log("🌐 Language toggle initialized");
}

// Main Initialization
function initializeApp() {
  console.log("🚀 Initializing Cymru Unleashed App...");

  // Core navigation
  new MobileNavigation();
  new StickyHeader();

  // Page features
  initializeClock();
  initializeSocialTabs();
  initializeVideoInteraction();
  initializeDownloads();
  initializeStatsAnimation();
  initializeLanguageToggle();

  console.log("✅ Cymru Unleashed App fully initialized!");
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // DOM is already loaded
  initializeApp();
}

// Also initialize if script loads after DOM
document.addEventListener("DOMContentLoaded", initializeApp);

console.log("📝 Cymru Unleashed Navigation Script Loaded Successfully");
