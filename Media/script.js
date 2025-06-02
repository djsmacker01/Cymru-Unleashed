// SIMPLE DEBUG SCRIPT - Place this in your script.js file temporarily

console.log("🔍 DEBUG: Script is loading...");

// Test 1: Check if script runs at all
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔍 DEBUG: DOM loaded, script is running");

  // Test 2: Check if elements exist
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  console.log("🔍 DEBUG: Elements found:");
  console.log("- nav:", !!nav, nav);
  console.log("- hamburger:", !!hamburger, hamburger);
  console.log("- overlay:", !!overlay, overlay);

  if (!nav) {
    console.error("❌ NAV element not found! Check if you have <nav id='nav'>");
    return;
  }

  if (!hamburger) {
    console.error(
      "❌ HAMBURGER element not found! Check if you have <button id='hamburger'>"
    );
    return;
  }

  if (!overlay) {
    console.error(
      "❌ OVERLAY element not found! Check if you have <div id='overlay'>"
    );
    return;
  }

  console.log("✅ All elements found, adding click listeners...");

  // Test 3: Simple click test
  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("🔍 DEBUG: Hamburger was clicked!");

    // Simple toggle test
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      console.log("🔍 DEBUG: Menu closed");
    } else {
      nav.classList.add("active");
      overlay.classList.add("active");
      hamburger.classList.add("active");
      console.log("🔍 DEBUG: Menu opened");
    }
  });

  // Test 4: Test navigation links
  nav.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (link) {
      const href = link.getAttribute("href");
      console.log("🔍 DEBUG: Link clicked:", href);

      // If menu is open, close it first
      if (nav.classList.contains("active")) {
        console.log("🔍 DEBUG: Closing menu before navigation");
        nav.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.classList.remove("active");

        // Wait a bit then navigate
        setTimeout(() => {
          console.log("🔍 DEBUG: Navigating to:", href);
          if (href.startsWith("#")) {
            // Hash link - scroll to section
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          } else if (!href.startsWith("mailto:") && !href.startsWith("tel:")) {
            // Regular page link
            window.location.href = href;
          }
        }, 300);
      }
    }
  });

  // Test 5: Overlay click
  overlay.addEventListener("click", function () {
    console.log("🔍 DEBUG: Overlay clicked, closing menu");
    nav.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
  });

  console.log("✅ DEBUG: All event listeners added successfully!");
});

console.log("🔍 DEBUG: Script file loaded completely");
