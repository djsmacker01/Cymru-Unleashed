// // FIXED Mobile Navigation - No More preventDefault Issues
// class MobileNavigation {
//   constructor() {
//     this.nav = document.getElementById("nav");
//     this.hamburger = document.getElementById("hamburger");
//     this.overlay = document.getElementById("overlay");
//     this.body = document.body;
//     this.isMenuOpen = false;
//     this.isAnimating = false;

//     this.init();
//   }

//   init() {
//     const elements = [this.nav, this.hamburger, this.overlay];
//     if (elements.some((el) => !el)) {
//       console.error("Navigation elements not found");
//       return;
//     }

//     this.setupEventListeners();
//     this.setupKeyboardNavigation();
//     this.preventBodyScroll();
//   }

//   setupEventListeners() {
//     // Hamburger click handler
//     this.hamburger.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       this.toggleMenu();
//     });

//     // Overlay click handler
//     this.overlay.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       if (this.isMenuOpen) {
//         this.closeMenu();
//       }
//     });

//     // FIXED Navigation links - No more preventDefault on all links
//     this.nav?.addEventListener("click", (e) => {
//       const link = e.target.closest("a");

//       if (link) {
//         const href = link.getAttribute("href");
//         const isExternalLink =
//           href?.startsWith("http") ||
//           href?.startsWith("mailto") ||
//           href?.startsWith("tel");
//         const isHashLink = href?.startsWith("#");

//         console.log("Navigation link clicked:", href);

//         // Update active states
//         this.nav
//           .querySelectorAll("a")
//           .forEach((a) => a.classList.remove("active"));
//         link.classList.add("active");

//         if (href && href !== "#") {
//           if (this.isMenuOpen) {
//             // Mobile menu is open - close it first, then navigate
//             e.preventDefault(); // Only prevent default when menu is open
//             this.closeMenu();

//             // Wait for menu close animation to complete
//             setTimeout(() => {
//               if (isExternalLink) {
//                 window.open(href, link.target || "_self");
//               } else if (isHashLink) {
//                 this.scrollToSection(href);
//               } else {
//                 window.location.href = href;
//               }
//             }, 300);
//           } else {
//             // Desktop or menu not open - let browser handle navigation naturally
//             if (isHashLink) {
//               e.preventDefault(); // Only prevent default for hash links to use smooth scroll
//               this.scrollToSection(href);
//             }
//             // For regular page links, let browser navigate normally (no preventDefault)
//           }
//         } else {
//           e.preventDefault(); // Only prevent default for empty/# links
//         }
//       }
//     });

//     // Close menu when clicking outside
//     document.addEventListener("click", (e) => {
//       if (
//         this.isMenuOpen &&
//         !this.nav.contains(e.target) &&
//         !this.hamburger.contains(e.target)
//       ) {
//         this.closeMenu();
//       }
//     });

//     // Handle window resize
//     window.addEventListener("resize", () => {
//       if (window.innerWidth > 768 && this.isMenuOpen) {
//         this.closeMenu();
//       }
//     });
//   }

//   setupKeyboardNavigation() {
//     // ESC key to close menu
//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape" && this.isMenuOpen) {
//         this.closeMenu();
//         this.hamburger.focus();
//       }
//     });

//     // Tab trapping within menu
//     this.nav.addEventListener("keydown", (e) => {
//       if (e.key === "Tab" && this.isMenuOpen) {
//         const focusableElements = this.nav.querySelectorAll(
//           'a, button, [tabindex]:not([tabindex="-1"])'
//         );
//         const firstElement = focusableElements[0];
//         const lastElement = focusableElements[focusableElements.length - 1];

//         if (e.shiftKey && document.activeElement === firstElement) {
//           e.preventDefault();
//           lastElement.focus();
//         } else if (!e.shiftKey && document.activeElement === lastElement) {
//           e.preventDefault();
//           firstElement.focus();
//         }
//       }
//     });
//   }

//   preventBodyScroll() {
//     // Prevent body scroll when menu is open
//     const preventScroll = (e) => {
//       if (this.isMenuOpen) {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener("touchmove", preventScroll, { passive: false });
//     document.addEventListener("wheel", preventScroll, { passive: false });
//   }

//   toggleMenu() {
//     if (this.isAnimating) {
//       return;
//     }

//     if (this.isMenuOpen) {
//       this.closeMenu();
//     } else {
//       this.openMenu();
//     }
//   }

//   openMenu() {
//     if (this.isAnimating || this.isMenuOpen) {
//       return;
//     }

//     this.isAnimating = true;
//     this.isMenuOpen = true;

//     // Add classes
//     this.nav.classList.add("active");
//     this.hamburger.classList.add("active");
//     this.overlay.classList.add("active");

//     // Prevent body scroll
//     this.body.style.overflow = "hidden";

//     // Update hamburger icon
//     this.updateHamburgerIcon(true);

//     // Set focus to first navigation item
//     setTimeout(() => {
//       const firstLink = this.nav.querySelector("a");
//       if (firstLink) {
//         firstLink.focus();
//       }
//       this.isAnimating = false;
//     }, 300);

//     console.log("Menu opened");
//   }

//   closeMenu() {
//     if (this.isAnimating || !this.isMenuOpen) {
//       return;
//     }

//     this.isAnimating = true;
//     this.isMenuOpen = false;

//     // Remove classes
//     this.nav.classList.remove("active");
//     this.hamburger.classList.remove("active");
//     this.overlay.classList.remove("active");

//     // Restore body scroll
//     this.body.style.overflow = "";

//     // Update hamburger icon
//     this.updateHamburgerIcon(false);

//     setTimeout(() => {
//       this.isAnimating = false;
//     }, 300);

//     console.log("Menu closed");
//   }

//   updateHamburgerIcon(isOpen) {
//     const icon = this.hamburger.querySelector("i");
//     if (icon) {
//       if (isOpen) {
//         icon.classList.remove("fa-bars");
//         icon.classList.add("fa-times");
//       } else {
//         icon.classList.remove("fa-times");
//         icon.classList.add("fa-bars");
//       }
//     }
//   }

//   scrollToSection(href) {
//     const targetElement = document.querySelector(href);
//     if (targetElement) {
//       const headerHeight = document.getElementById("header")?.offsetHeight || 0;
//       const targetPosition =
//         targetElement.getBoundingClientRect().top +
//         window.pageYOffset -
//         headerHeight;

//       window.scrollTo({
//         top: targetPosition,
//         behavior: "smooth",
//       });
//     }
//   }
// }

// // Sticky Header functionality
// class StickyHeader {
//   constructor() {
//     this.header = document.getElementById("header");
//     this.init();
//   }

//   init() {
//     if (!this.header) {
//       return;
//     }

//     let lastScrollY = window.scrollY;
//     let isScrolling = false;

//     const handleScroll = () => {
//       if (!isScrolling) {
//         window.requestAnimationFrame(() => {
//           const currentScrollY = window.scrollY;

//           // Add scrolled class when scrolled down
//           this.header.classList.toggle("scrolled", currentScrollY > 50);

//           lastScrollY = currentScrollY;
//           isScrolling = false;
//         });

//         isScrolling = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//   }
// }

// // Initialize when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize mobile navigation
//   new MobileNavigation();

//   // Initialize sticky header
//   new StickyHeader();

//   console.log("Navigation system initialized");
// });

// // Keep all your other existing functions below
// // (Social tabs, video interaction, animations, translations, etc.)

// // Social Tabs
// const socialTabs = document.querySelectorAll(".social-tab");
// const socialFeeds = document.querySelectorAll(".social-feed");

// socialTabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     // Remove active class from all tabs
//     socialTabs.forEach((t) => t.classList.remove("active"));
//     // Add active class to clicked tab
//     tab.classList.add("active");

//     // Hide all feeds
//     socialFeeds.forEach((feed) => feed.classList.remove("active"));
//     // Show corresponding feed
//     const feedId = `${tab.getAttribute("data-tab")}-feed`;
//     const targetFeed = document.getElementById(feedId);
//     if (targetFeed) {
//       targetFeed.classList.add("active");
//     }
//   });
// });

// // Video Interaction
// const playButton = document.querySelector(".play-button");
// const videoThumbs = document.querySelectorAll(".video-thumb");

// if (playButton) {
//   playButton.addEventListener("click", () => {
//     alert("Video would play here in the real implementation.");
//   });
// }

// videoThumbs.forEach((thumb) => {
//   thumb.addEventListener("click", () => {
//     const thumbTitle =
//       thumb.querySelector(".thumb-title")?.textContent?.trim() ||
//       "Unknown Video";
//     alert(
//       `Video would change to "${thumbTitle}" and play in the real implementation.`
//     );
//   });
// });

// // Animation on scroll with Intersection Observer
// const animateElements = document.querySelectorAll(
//   ".news-card, .social-post, .download-item"
// );

// if (animateElements.length > 0) {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animated");
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     {
//       root: null,
//       threshold: 0.1,
//       rootMargin: "-50px",
//     }
//   );

//   animateElements.forEach((element) => {
//     observer.observe(element);
//   });
// }

// // Language Toggle
// const languageToggle = document.querySelectorAll(".language-toggle a");

// const translations = {
//   en: {
//     "media-title": "Media & Press",
//     "media-subtitle": "Stay updated with our latest news and coverage",
//     // ... rest of your translations
//   },
//   cy: {
//     "media-title": "Cyfryngau a'r Wasg",
//     "media-subtitle": "Dilynwch ein taith trwy fideos, ffotograffau, a straeon",
//     // ... rest of your translations
//   },
// };

// function updateLanguage(lang) {
//   document.querySelectorAll("[data-translate]").forEach((element) => {
//     const key = element.getAttribute("data-translate");
//     if (translations[lang]?.[key]) {
//       element.textContent = translations[lang][key];
//     }
//   });

//   document.title =
//     lang === "cy" ? "Cyfryngau | Cymru Unleashed" : "Media | Cymru Unleashed";

//   try {
//     localStorage.setItem("preferred-language", lang);
//   } catch (e) {
//     console.warn("Could not save language preference:", e);
//   }
// }

// languageToggle.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     languageToggle.forEach((l) => l.classList.remove("active"));
//     link.classList.add("active");
//     const newLang = link.textContent.toLowerCase() === "cymraeg" ? "cy" : "en";
//     updateLanguage(newLang);
//   });
// });

// // Set initial language
// let initialLang = "en";
// try {
//   initialLang = localStorage.getItem("preferred-language") || "en";
// } catch (e) {
//   console.warn("Could not load language preference:", e);
// }
// updateLanguage(initialLang);

// // Download buttons interaction
// document.querySelectorAll(".download-btn").forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     const fileNameElement = e.currentTarget.parentElement?.querySelector("h4");
//     const fileName = fileNameElement?.textContent?.trim() || "Unknown File";
//     alert(
//       `Downloading ${fileName} - This would be a real download in the live implementation.`
//     );

//     const icon = e.currentTarget.querySelector("i");
//     if (icon) {
//       const originalClass = icon.className;
//       icon.className = "fas fa-check";
//       setTimeout(() => {
//         icon.className = originalClass;
//       }, 1500);
//     }
//   });
// });

// // Digital Clock Function
// function updateClock() {
//   const now = new Date();
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   const hoursEl = document.getElementById("hours");
//   const minutesEl = document.getElementById("minutes");
//   const secondsEl = document.getElementById("seconds");

//   if (hoursEl) {
//     hoursEl.textContent = hours;
//   }
//   if (minutesEl) {
//     minutesEl.textContent = minutes;
//   }
//   if (secondsEl) {
//     secondsEl.textContent = seconds;
//   }
// }

// updateClock();
// setInterval(updateClock, 1000);

// // Rest of your existing functions remain the same...
// // (I've shortened this for brevity, but include all your other functions)

// BULLETPROOF NAVIGATION - Simple and Working
console.log("🔧 Loading bulletproof navigation...");

document.addEventListener("DOMContentLoaded", function() {
    const nav = document.getElementById("nav");
    const hamburger = document.getElementById("hamburger");
    const overlay = document.getElementById("overlay");
    
    if (!nav || !hamburger || !overlay) {
        console.error("❌ Navigation elements missing");
        return;
    }
    
    console.log("✅ All navigation elements found");
    
    let isMenuOpen = false;
    
    // Simple hamburger toggle
    hamburger.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("🍔 Hamburger clicked, menu open:", isMenuOpen);
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Open menu function
    function openMenu() {
        console.log("📂 Opening menu...");
        isMenuOpen = true;
        
        // Add classes
        nav.classList.add("active");
        hamburger.classList.add("active");
        overlay.classList.add("active");
        
        // Prevent body scroll
        document.body.style.overflow = "hidden";
        
        // Update hamburger icon
        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        }
        
        console.log("✅ Menu opened");
    }
    
    // Close menu function
    function closeMenu() {
        console.log("📁 Closing menu...");
        isMenuOpen = false;
        
        // Remove classes
        nav.classList.remove("active");
        hamburger.classList.remove("active");
        overlay.classList.remove("active");
        
        // Restore body scroll
        document.body.style.overflow = "";
        
        // Update hamburger icon
        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
        
        console.log("✅ Menu closed");
    }
    
    // Overlay click to close
    overlay.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("👆 Overlay clicked");
        if (isMenuOpen) {
            closeMenu();
        }
    });
    
    // CRITICAL: Navigation link handling
    const navLinks = nav.querySelectorAll("a");
    console.log("🔗 Found", navLinks.length, "navigation links");
    
    navLinks.forEach((link, index) => {
        console.log(`Link ${index + 1}:`, link.textContent.trim(), "→", link.href);
        
        link.addEventListener("click", function(e) {
            console.log("🎯 LINK CLICKED:", link.textContent.trim(), "→", link.href);
            
            const href = link.getAttribute("href");
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove("active"));
            // Add active class to clicked link
            link.classList.add("active");
            
            if (href && href !== "#") {
                if (isMenuOpen) {
                    console.log("📱 Mobile menu open, closing first...");
                    
                    // For mobile menu, close it first
                    closeMenu();
                    
                    // Then navigate after a short delay
                    setTimeout(() => {
                        console.log("🌐 Navigating to:", href);
                        
                        if (href.startsWith("#")) {
                            // Hash link - scroll to section
                            const targetElement = document.querySelector(href);
                            if (targetElement) {
                                const headerHeight = document.getElementById("header")?.offsetHeight || 80;
                                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: "smooth",
                                });
                            }
                        } else if (href.startsWith("mailto:") || href.startsWith("tel:")) {
                            // Let browser handle email/phone links
                            window.location.href = href;
                        } else if (href.startsWith("http")) {
                            // External link
                            window.open(href, link.target || "_self");
                        } else {
                            // Internal page link
                            window.location.href = href;
                        }
                    }, 350);
                    
                    // Prevent default for mobile menu
                    e.preventDefault();
                } else {
                    console.log("🖥️ Desktop mode, navigating immediately");
                    // Desktop - let browser handle normally unless it's a hash link
                    if (href.startsWith("#")) {
                        e.preventDefault();
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerHeight = document.getElementById("header")?.offsetHeight || 80;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: "smooth",
                            });
                        }
                    }
                    // For regular page links, let browser navigate normally
                }
            } else {
                e.preventDefault();
                console.log("⚠️ Empty or # link, preventing default");
            }
        });
    });
    
    // Close menu when clicking outside (but not on nav links)
    document.addEventListener("click", function(e) {
        if (isMenuOpen && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target) && 
            !overlay.contains(e.target)) {
            console.log("👆 Clicked outside menu, closing");
            closeMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            console.log("📏 Resized to desktop, closing menu");
            closeMenu();
        }
    });
    
    // ESC key to close menu
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && isMenuOpen) {
            console.log("⌨️ ESC pressed, closing menu");
            closeMenu();
        }
    });
    
    console.log("✅ Bulletproof navigation initialized successfully!");
});

// Your other existing functions (simplified versions)

// Social Tabs
document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});

// Video buttons
document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.querySelector(".play-button");
    const videoThumbs = document.querySelectorAll(".video-thumb");

    if (playButton) {
        playButton.addEventListener("click", () => {
            alert("Video would play here in the real implementation.");
        });
    }

    videoThumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const thumbTitle = thumb.querySelector(".thumb-title")?.textContent?.trim() || "Unknown Video";
            alert(`Video would change to "${thumbTitle}" and play in the real implementation.`);
        });
    });
});

console.log("🚀 All scripts loaded successfully!");