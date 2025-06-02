// NAVIGATION CONTENT VISIBILITY FIX
// This will make sure the navigation links are actually visible

console.log("🎯 CONTENT FIX: Loading...");

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  if (!nav || !hamburger || !overlay) {
    console.error("❌ Elements missing");
    return;
  }

  console.log("🎯 Adding content visibility fix...");

  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🎯 Hamburger clicked - fixing content visibility");

    const isOpen = nav.classList.contains("active");

    if (isOpen) {
      // Close menu
      nav.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";

      // Remove all force styles
      nav.style.cssText = "";
      nav.querySelector("ul").style.cssText = "";
      const links = nav.querySelectorAll("a");
      links.forEach((link) => (link.style.cssText = ""));

      console.log("🎯 Menu CLOSED");
    } else {
      // Open menu with COMPLETE FORCE
      nav.classList.add("active");
      overlay.classList.add("active");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden";

      // FORCE the menu container
      nav.style.cssText = `
                display: flex !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: white !important;
                z-index: 9999 !important;
                transform: translateX(0) !important;
                transition: transform 0.3s ease !important;
                border: 3px solid red !important;
                flex-direction: column !important;
                justify-content: flex-start !important;
                align-items: stretch !important;
                padding: 80px 0 0 0 !important;
                overflow-y: auto !important;
            `;

      // FORCE the UL to be visible
      const ul = nav.querySelector("ul");
      if (ul) {
        ul.style.cssText = `
                    display: flex !important;
                    flex-direction: column !important;
                    list-style: none !important;
                    margin: 0 !important;
                    padding: 20px !important;
                    width: 100% !important;
                    background: lightblue !important;
                    min-height: 400px !important;
                `;

        console.log("🎯 UL styled");
      }

      // FORCE each navigation link to be visible
      const links = nav.querySelectorAll("a");
      links.forEach((link, index) => {
        link.style.cssText = `
                    display: block !important;
                    padding: 20px 30px !important;
                    font-size: 18px !important;
                    font-weight: bold !important;
                    color: #000 !important;
                    background: ${index % 2 ? "#f0f0f0" : "#e0e0e0"} !important;
                    text-decoration: none !important;
                    border: 1px solid #333 !important;
                    margin: 2px 0 !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                `;

        console.log(`🎯 Link ${index + 1} styled:`, link.textContent);
      });

      // FORCE overlay
      overlay.style.cssText = `
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
            `;

      console.log("🎯 Menu FORCED OPEN with full content styling");
      console.log("🎯 Links found:", links.length);

      // Check if content is really there
      setTimeout(() => {
        const rect = nav.getBoundingClientRect();
        const ulRect = ul ? ul.getBoundingClientRect() : null;
        console.log("🎯 Menu dimensions:", rect);
        console.log("🎯 UL dimensions:", ulRect);
        console.log(
          "🎯 Number of visible links:",
          nav.querySelectorAll("a:not([style*='display: none'])").length
        );
      }, 100);
    }
  });

  // Overlay click to close
  overlay.addEventListener("click", function () {
    console.log("🎯 Overlay clicked - closing");
    nav.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";

    // Remove all styles
    nav.style.cssText = "";
    const ul = nav.querySelector("ul");
    if (ul) ul.style.cssText = "";
    nav.querySelectorAll("a").forEach((link) => (link.style.cssText = ""));
    overlay.style.cssText = "";
  });

  // Navigation links
  nav.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (link) {
      const href = link.getAttribute("href");
      console.log("🎯 Link clicked:", href, link.textContent);

      // Close menu
      nav.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";

      // Remove styles
      nav.style.cssText = "";
      const ul = nav.querySelector("ul");
      if (ul) ul.style.cssText = "";
      nav.querySelectorAll("a").forEach((l) => (l.style.cssText = ""));
      overlay.style.cssText = "";

      // Navigate
      setTimeout(() => {
        if (
          href &&
          href !== "#" &&
          !href.startsWith("mailto:") &&
          !href.startsWith("tel:")
        ) {
          console.log("🎯 Navigating to:", href);
          window.location.href = href;
        }
      }, 300);
    }
  });

  // Debug current content
  const links = nav.querySelectorAll("a");
  console.log("🎯 Found navigation links:");
  links.forEach((link, index) => {
    console.log(`${index + 1}. "${link.textContent.trim()}" -> ${link.href}`);
  });

  console.log(
    "✅ CONTENT FIX: Ready! Menu should now be fully visible with colored backgrounds."
  );
});
