// Mobile Navigation Class - Shared across all pages
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
        const isExternalLink =
          href &&
          (href.startsWith("http") ||
            href.startsWith("mailto") ||
            href.startsWith("tel"));
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
      if (
        this.isMenuOpen &&
        !this.nav.contains(e.target) &&
        !this.hamburger.contains(e.target)
      ) {
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
    // Handle keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
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

    this.nav.classList.add("active");
    this.hamburger.classList.add("active");
    this.overlay.classList.add("active");
    this.body.style.overflow = "hidden";

    this.updateHamburgerIcon(true);

    // Reset animation flag after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) return;

    this.isAnimating = true;
    this.isMenuOpen = false;

    this.nav.classList.remove("active");
    this.hamburger.classList.remove("active");
    this.overlay.classList.remove("active");
    this.body.style.overflow = "";

    this.updateHamburgerIcon(false);

    // Reset animation flag after transition
    setTimeout(() => {
      this.isAnimating = false;
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
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = document.getElementById("header").offsetHeight;
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
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MobileNavigation();
});
