// Mobile Navigation Toggle
// function toggleMenu() {
//   const nav = document.getElementById("nav");
//   const hamburger = document.getElementById("hamburger");
//   const overlay = document.getElementById("overlay");
//   const body = document.body;

//   nav.classList.toggle("active");
//   hamburger.classList.toggle("active");
//   overlay.classList.toggle("active");
//   body.style.overflow = nav.classList.contains("active") ? "hidden" : "";

//   // Update hamburger icon
//   const icon = hamburger.querySelector("i");
//   if (nav.classList.contains("active")) {
//     icon.classList.remove("fa-bars");
//     icon.classList.add("fa-times");
//   } else {
//     icon.classList.remove("fa-times");
//     icon.classList.add("fa-bars");
//   }
// }

// Simplified Mobile Navigation
// function initializeNavigation() {
//   const hamburger = document.getElementById("hamburger");
//   const overlay = document.getElementById("overlay");
//   const nav = document.getElementById("nav");

//   function closeMenu() {
//     nav.classList.remove("active");
//     hamburger.classList.remove("active");
//     overlay.classList.remove("active");
//     document.body.style.overflow = "";

//     const icon = hamburger.querySelector("i");
//     icon.classList.remove("fa-times");
//     icon.classList.add("fa-bars");
//   }

//   function openMenu() {
//     nav.classList.add("active");
//     hamburger.classList.add("active");
//     overlay.classList.add("active");
//     document.body.style.overflow = "hidden";

//     const icon = hamburger.querySelector("i");
//     icon.classList.remove("fa-bars");
//     icon.classList.add("fa-times");
//   }

//   // Hamburger click handler
//   hamburger?.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (nav.classList.contains("active")) {
//       closeMenu();
//     } else {
//       openMenu();
//     }
//   });

//   // Overlay click handler
//   overlay?.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     closeMenu();
//   });

//   // Simple approach: Direct event listeners on each link
//   const navLinks = document.querySelectorAll("nav ul li a");
//   navLinks.forEach((link, index) => {
//     link.addEventListener("click", (e) => {
//       const href = link.href; // Use .href instead of getAttribute

//       console.log(`Link ${index} clicked:`, href);

//       if (href && href !== window.location.href) {
//         // Close menu first
//         closeMenu();

//         // Navigate after menu closes
//         setTimeout(() => {
//           window.location.href = href;
//         }, 200);
//       }
//     });

//     // Ensure link is clickable
//     link.style.pointerEvents = "auto";
//     link.style.cursor = "pointer";
//   });
// }

// Initialize when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   initializeNavigation();
//   initializeStickyHeader();
// });

// Sticky Header on Scroll
// const initializeStickyHeader = () => {
//   window.addEventListener("scroll", () => {
//     const header = document.getElementById("header");
//     header.classList.toggle("scrolled", window.scrollY > 50);
//   });
// };
// REPLACE ALL NAVIGATION-RELATED CODE WITH THIS:

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
    if (!this.nav || !this.hamburger || !this.overlay) {
      console.error("Navigation elements not found");
      return;
    }

    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.preventBodyScroll();
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
        const isExternalLink = href && (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel"));
        const isHashLink = href && href.startsWith("#");
        
        console.log("Navigation link clicked:", href);
        
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
      if (this.isMenuOpen && !this.nav.contains(e.target) && !this.hamburger.contains(e.target)) {
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
        const focusableElements = this.nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
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
    if (this.isAnimating) return;
    
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isAnimating || this.isMenuOpen) return;
    
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

    console.log("Menu opened");
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) return;
    
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

    console.log("Menu closed");
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
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  }
}

// Sticky Header functionality
class StickyHeader {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    if (!this.header) return;
    
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
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile navigation
  new MobileNavigation();
  
  // Initialize sticky header
  new StickyHeader();
  
  console.log("Navigation system initialized");
});

// Keep all your OTHER existing JavaScript functions below this line
// (Social tabs, video interaction, animations, translations, etc.)


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

// Digital Clock Function
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Media Kit Download Functionality
function initializeDownloads() {
  const downloadButtons = document.querySelectorAll(".download-btn");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const downloadItem = button.closest(".download-item");
      const progressBar = downloadItem.querySelector(".progress-bar");
      const progressContainer =
        downloadItem.querySelector(".download-progress");
      const fileName = button.getAttribute("data-file");

      // Start download animation
      downloadItem.classList.add("downloading");
      progressContainer.classList.add("active");

      try {
        // Simulate download progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeDownload(downloadItem, fileName);
          }
          progressBar.style.width = `${progress}%`;
          progressBar.setAttribute("data-progress", progress);
        }, 200);

        // In a real implementation, you would use fetch to download the file
        // const response = await fetch(button.href);
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = fileName;
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
        // document.body.removeChild(a);
      } catch (error) {
        console.error("Download failed:", error);
        downloadItem.classList.remove("downloading");
        progressContainer.classList.remove("active");
        alert("Download failed. Please try again.");
      }
    });
  });
}

function completeDownload(downloadItem, fileName) {
  downloadItem.classList.remove("downloading");
  downloadItem.classList.add("completed");

  const button = downloadItem.querySelector(".download-btn");
  const icon = button.querySelector("i");

  // Change icon to checkmark
  icon.className = "fas fa-check";

  // Show success message
  const successMessage = document.createElement("div");
  successMessage.className = "download-success";
  successMessage.textContent = `${fileName} downloaded successfully!`;
  downloadItem.appendChild(successMessage);

  // Reset after 3 seconds
  setTimeout(() => {
    downloadItem.classList.remove("completed");
    icon.className = "fas fa-download";
    successMessage.remove();
    downloadItem.querySelector(".download-progress").classList.remove("active");
    downloadItem.querySelector(".progress-bar").style.width = "0%";
  }, 3000);
}

// Initialize downloads when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeDownloads();
});

// Enhanced Smooth Scroll Functionality
function initializeSmoothScroll() {
  const scrollLinks = document.querySelectorAll(".scroll-link");

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add active state to the button
        link.classList.add("active");

        // Calculate the target position (accounting for header height)
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        // Smooth scroll to the target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add highlight effect to the target section
        targetSection.classList.add("highlight-section");

        // Remove highlight after animation
        setTimeout(() => {
          targetSection.classList.remove("highlight-section");
          link.classList.remove("active");
        }, 2000);
      }
    });
  });
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeSmoothScroll();
});
