// SIMPLIFIED NAVIGATION FIX
console.log("🚀 Starting navigation fix");

document.addEventListener("DOMContentLoaded", function () {
  console.log("📱 DOM loaded, setting up navigation");

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !nav || !overlay) {
    console.error("❌ Navigation elements missing");
    return;
  }

  console.log("✅ All navigation elements found");

  let isMenuOpen = false;

  // Open menu function
  function openMenu() {
    console.log("📂 Opening menu");
    isMenuOpen = true;
    nav.classList.add("active");
    hamburger.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    hamburger.innerHTML = '<i class="fas fa-times"></i>';

    // Force all nav links to be clickable immediately
    setTimeout(() => {
      const links = nav.querySelectorAll("a");
      links.forEach((link) => {
        link.style.pointerEvents = "auto";
        link.style.zIndex = "99999";
        link.style.position = "relative";
        console.log("🔗 Made link clickable:", link.href);
      });
    }, 100);
  }

  // Close menu function
  function closeMenu() {
    console.log("📁 Closing menu");
    isMenuOpen = false;
    nav.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  }

  // Hamburger click
  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🍔 Hamburger clicked, menu open:", isMenuOpen);

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Overlay click
  overlay.addEventListener("click", function () {
    console.log("🖱️ Overlay clicked");
    closeMenu();
  });

  // Fix navigation links - CRITICAL PART
  function fixNavigationLinks() {
    console.log("🔧 Fixing navigation links");

    const navLinks = document.querySelectorAll("nav a, #nav a");
    console.log(`🔗 Found ${navLinks.length} navigation links`);

    navLinks.forEach((link, index) => {
      console.log(`🔗 Setting up link ${index + 1}: ${link.href}`);

      // Remove existing event listeners by cloning
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      // Force link to be clickable
      newLink.style.pointerEvents = "auto";
      newLink.style.zIndex = "99999";
      newLink.style.position = "relative";
      newLink.style.cursor = "pointer";
      newLink.style.display = "flex";
      newLink.style.background = "transparent";

      // Click event - SIMPLE approach
      newLink.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("🎯 Link clicked! Navigating to:", this.href);

        if (isMenuOpen) {
          closeMenu();
        }

        // Navigate immediately
        window.location.href = this.href;
      });

      // Touch events for mobile
      newLink.addEventListener("touchstart", function (e) {
        console.log("👆 Touch start on:", this.href);
        this.style.backgroundColor = "#f0f0f0";
      });

      newLink.addEventListener("touchend", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("👆 Touch end - navigating to:", this.href);

        if (isMenuOpen) {
          closeMenu();
        }

        // Navigate after short delay
        setTimeout(() => {
          window.location.href = this.href;
        }, 100);
      });
    });
  }

  // Fix links immediately and after delay
  fixNavigationLinks();
  setTimeout(fixNavigationLinks, 500);
  setTimeout(fixNavigationLinks, 1000);

  // Sticky header
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  console.log("✅ Navigation setup complete");
});

// Global backup click handler
document.addEventListener(
  "click",
  function (e) {
    if (e.target.closest("nav a") || e.target.closest("#nav a")) {
      const link = e.target.closest("a");
      console.log("🌐 Global backup handler:", link.href);

      e.stopPropagation();

      if (link && link.href) {
        const nav = document.getElementById("nav");
        if (nav && nav.classList.contains("active")) {
          nav.classList.remove("active");
          document.getElementById("hamburger").classList.remove("active");
          document.getElementById("overlay").classList.remove("active");
          document.body.style.overflow = "";
        }

        setTimeout(() => {
          window.location.href = link.href;
        }, 100);
      }
    }
  },
  true
);

console.log("🎯 Navigation script loaded");
