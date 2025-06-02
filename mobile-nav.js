class MobileNavigation {
  constructor() {
    // Core elements
    this.hamburger = document.getElementById("hamburger");
    this.nav = document.getElementById("nav");
    this.overlay = document.getElementById("overlay");
    this.body = document.body;

    // State
    this.isMenuOpen = false;
    this.isAnimating = false;

    // Initialize
    this.init();
  }

  init() {
    if (!this.hamburger || !this.nav || !this.overlay) {
      console.warn("Mobile navigation elements not found");
      return;
    }

    this.setupEventListeners();
    this.setupKeyboardNavigation();
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
      this.closeMenu();
    });

    // Navigation links click handler
    const navLinks = this.nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (this.isMenuOpen) {
          e.preventDefault();
          this.closeMenu();

          // Navigate after menu closes
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });

    // Prevent menu from closing when clicking inside
    this.nav.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close menu on window resize if open
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  setupKeyboardNavigation() {
    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Trap focus within menu when open
    this.nav.addEventListener("keydown", (e) => {
      if (!this.isMenuOpen) return;

      const focusableElements = this.nav.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  toggleMenu() {
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

    // Return focus to hamburger
    setTimeout(() => {
      this.hamburger.focus();
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
}

// Initialize mobile navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MobileNavigation();
});
