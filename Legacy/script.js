// Clean Navigation Implementation
console.log("🚀 Navigation script starting...");

document.addEventListener("DOMContentLoaded", function () {
  console.log("📱 DOM loaded - initializing navigation");

  // Get navigation elements
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !nav || !overlay) {
    console.error("❌ Navigation elements missing!");
    console.log("Hamburger:", hamburger);
    console.log("Nav:", nav);
    console.log("Overlay:", overlay);
    return;
  }

  console.log("✅ Navigation elements found");

  let isMenuOpen = false;

  // Open menu
  function openMenu() {
    console.log("📂 Opening menu");
    isMenuOpen = true;
    nav.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
  }

  // Close menu
  function closeMenu() {
    console.log("📁 Closing menu");
    isMenuOpen = false;
    nav.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  }

  // Toggle menu
  function toggleMenu() {
    console.log("🔄 Toggling menu, current state:", isMenuOpen);
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Hamburger click handler
  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🍔 Hamburger clicked");
    toggleMenu();
  });

  // Overlay click to close menu
  overlay.addEventListener("click", function () {
    console.log("🖱️ Overlay clicked - closing menu");
    closeMenu();
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      console.log("⌨️ Escape key pressed - closing menu");
      closeMenu();
    }
  });

  // Handle navigation links
  function setupNavigationLinks() {
    console.log("🔗 Setting up navigation links");

    const navLinks = nav.querySelectorAll("a");
    console.log(`Found ${navLinks.length} navigation links`);

    navLinks.forEach((link, index) => {
      const linkText = link.textContent.trim();
      const linkHref = link.getAttribute("href");
      console.log(`Setting up link ${index + 1}: "${linkText}" -> ${linkHref}`);

      // Remove existing event listeners by cloning
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      // Add click handler
      newLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(
          `🎯 Navigation link clicked: "${this.textContent.trim()}" -> ${
            this.href
          }`
        );

        // Close menu if open
        if (isMenuOpen) {
          closeMenu();
          // Wait for menu to close before navigating
          setTimeout(() => {
            window.location.href = this.href;
          }, 300);
        } else {
          window.location.href = this.href;
        }
      });

      // Add touch handler for mobile
      newLink.addEventListener("touchend", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(
          `👆 Touch navigation: "${this.textContent.trim()}" -> ${this.href}`
        );

        if (isMenuOpen) {
          closeMenu();
          setTimeout(() => {
            window.location.href = this.href;
          }, 300);
        } else {
          window.location.href = this.href;
        }
      });

      console.log(`✅ Link setup complete for "${linkText}"`);
    });
  }

  // Setup navigation links
  setupNavigationLinks();

  // Sticky header
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  console.log("✅ Navigation initialization complete");
});

// Testimonial Slider
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("stories-track");
  const dots = document.querySelectorAll(".slider-dot");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (track && nextBtn && prevBtn) {
    console.log("📊 Initializing testimonial slider");

    let currentIndex = 0;
    const slides = Array.from(track.children);
    let startX,
      moveX,
      isMouseDown = false;

    const setSliderPosition = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add("active");
      }
    };

    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setSliderPosition();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      setSliderPosition();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentIndex = parseInt(dot.getAttribute("data-index"));
        setSliderPosition();
      });
    });

    // Touch events
    track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isMouseDown = true;
        track.style.transition = "none";
      },
      { passive: true }
    );

    track.addEventListener(
      "touchmove",
      (e) => {
        if (!isMouseDown) return;
        moveX = e.touches[0].clientX;
        const diff = moveX - startX;
        const move = (diff / window.innerWidth) * 100;
        track.style.transform = `translateX(calc(-${
          currentIndex * 100
        }% + ${move}px))`;
      },
      { passive: true }
    );

    track.addEventListener("touchend", () => {
      isMouseDown = false;
      track.style.transition = "transform 0.5s ease";

      if (moveX) {
        const diff = moveX - startX;
        if (diff > 50 && currentIndex > 0) {
          currentIndex--;
        } else if (diff < -50 && currentIndex < slides.length - 1) {
          currentIndex++;
        }
        setSliderPosition();
        moveX = null;
      }
    });

    console.log("✅ Slider initialized");
  }
});

console.log("🎯 Navigation script fully loaded!");
