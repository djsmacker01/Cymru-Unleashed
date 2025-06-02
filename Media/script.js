// VISUAL FIX SCRIPT
// This will force the menu to be visible and check what's wrong

console.log("🔧 VISUAL FIX: Loading...");

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  if (!nav || !hamburger || !overlay) {
    console.error("❌ Elements missing");
    return;
  }

  console.log("🔧 Adding improved hamburger functionality...");

  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🔧 Hamburger clicked - applying FORCE FIX");

    const isOpen = nav.classList.contains("active");

    if (isOpen) {
      // Close menu
      nav.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";

      // Force remove inline styles
      nav.style.display = "";
      nav.style.transform = "";
      nav.style.zIndex = "";

      console.log("🔧 Menu CLOSED");
    } else {
      // Open menu with FORCE
      nav.classList.add("active");
      overlay.classList.add("active");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden";

      // FORCE the menu to be visible with inline styles
      nav.style.display = "flex !important";
      nav.style.position = "fixed !important";
      nav.style.top = "0 !important";
      nav.style.left = "0 !important";
      nav.style.width = "100% !important";
      nav.style.height = "100% !important";
      nav.style.backgroundColor = "white !important";
      nav.style.zIndex = "9999 !important";
      nav.style.transform = "translateX(0) !important";
      nav.style.transition = "transform 0.3s ease !important";

      // Force overlay to be visible
      overlay.style.display = "block !important";
      overlay.style.position = "fixed !important";
      overlay.style.top = "0 !important";
      overlay.style.left = "0 !important";
      overlay.style.width = "100% !important";
      overlay.style.height = "100% !important";
      overlay.style.backgroundColor = "rgba(0,0,0,0.5) !important";
      overlay.style.zIndex = "9998 !important";
      overlay.style.opacity = "1 !important";
      overlay.style.visibility = "visible !important";

      console.log("🔧 Menu FORCED OPEN with inline styles");

      // Add a visible border to debug
      nav.style.border = "5px solid red !important";

      // Log the actual position
      setTimeout(() => {
        const rect = nav.getBoundingClientRect();
        console.log("🔧 Menu position:", {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          visible: rect.width > 0 && rect.height > 0,
        });
      }, 100);
    }
  });

  // Overlay click to close
  overlay.addEventListener("click", function () {
    console.log("🔧 Overlay clicked - closing menu");
    nav.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";

    // Remove force styles
    nav.style.display = "";
    nav.style.position = "";
    nav.style.top = "";
    nav.style.left = "";
    nav.style.width = "";
    nav.style.height = "";
    nav.style.backgroundColor = "";
    nav.style.zIndex = "";
    nav.style.transform = "";
    nav.style.border = "";

    overlay.style.display = "";
    overlay.style.position = "";
    overlay.style.opacity = "";
    overlay.style.visibility = "";
  });

  // Navigation links
  nav.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (link) {
      const href = link.getAttribute("href");
      console.log("🔧 Navigation link clicked:", href);

      // Close menu
      nav.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";

      // Remove force styles
      nav.style.cssText = "";
      overlay.style.cssText = "";

      // Navigate after short delay
      setTimeout(() => {
        if (
          href &&
          href !== "#" &&
          !href.startsWith("mailto:") &&
          !href.startsWith("tel:")
        ) {
          console.log("🔧 Navigating to:", href);
          window.location.href = href;
        }
      }, 300);
    }
  });

  // Also check screen size
  console.log("🔧 Screen size:", window.innerWidth + "x" + window.innerHeight);
  console.log("🔧 Is mobile size?", window.innerWidth <= 768);

  console.log("✅ VISUAL FIX: Ready! Try clicking hamburger now.");
});

// Add CSS fix as well
const style = document.createElement("style");
style.textContent = `
    /* EMERGENCY CSS FIX */
    @media (max-width: 768px) {
        .hamburger {
            display: flex !important;
            visibility: visible !important;
        }
        
        nav.active {
            display: flex !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            z-index: 9999 !important;
            transform: translateX(0) !important;
        }
        
        .overlay.active {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.5) !important;
            z-index: 9998 !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
    }
`;
document.head.appendChild(style);
console.log("🔧 Emergency CSS added");
