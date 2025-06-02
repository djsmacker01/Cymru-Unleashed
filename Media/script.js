// DIAGNOSTIC SCRIPT FOR YOUR REAL PAGE
// Add this to your script.js file temporarily

console.log("🔍 REAL PAGE DIAGNOSTIC STARTING...");

document.addEventListener("DOMContentLoaded", function () {
  console.log("🔍 DOM loaded on real page");

  // Check elements exist
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  console.log("🔍 Elements found:");
  console.log("- nav:", !!nav);
  console.log("- hamburger:", !!hamburger);
  console.log("- overlay:", !!overlay);

  if (!nav || !hamburger || !overlay) {
    console.error("❌ Missing elements on real page!");
    return;
  }

  // Check CSS styles that might be interfering
  console.log("🔍 Checking CSS styles...");

  const navStyles = window.getComputedStyle(nav);
  const hamburgerStyles = window.getComputedStyle(hamburger);

  console.log("🔍 Nav styles:");
  console.log("- display:", navStyles.display);
  console.log("- position:", navStyles.position);
  console.log("- transform:", navStyles.transform);
  console.log("- z-index:", navStyles.zIndex);
  console.log("- visibility:", navStyles.visibility);

  console.log("🔍 Hamburger styles:");
  console.log("- display:", hamburgerStyles.display);
  console.log("- visibility:", hamburgerStyles.visibility);

  // Check for conflicting event listeners
  console.log("🔍 Adding test event listener...");

  hamburger.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("🔍 REAL PAGE: Hamburger clicked!");

    // Force add classes and log what happens
    console.log("🔍 Adding 'active' classes...");
    nav.classList.add("active");
    overlay.classList.add("active");
    hamburger.classList.add("active");

    // Check if classes were added
    console.log("🔍 Classes added:");
    console.log("- nav.active:", nav.classList.contains("active"));
    console.log("- overlay.active:", overlay.classList.contains("active"));
    console.log("- hamburger.active:", hamburger.classList.contains("active"));

    // Check styles after adding active class
    setTimeout(() => {
      const activeNavStyles = window.getComputedStyle(nav);
      console.log("🔍 Nav styles AFTER adding 'active':");
      console.log("- display:", activeNavStyles.display);
      console.log("- transform:", activeNavStyles.transform);
      console.log("- visibility:", activeNavStyles.visibility);
      console.log("- opacity:", activeNavStyles.opacity);
    }, 100);
  });

  // Check for other scripts that might be interfering
  console.log("🔍 Checking for other scripts...");
  const scripts = document.querySelectorAll("script[src]");
  console.log("🔍 Script files loaded:");
  scripts.forEach((script, index) => {
    console.log(`${index + 1}. ${script.src}`);
  });

  // Check CSS files
  const stylesheets = document.querySelectorAll("link[rel='stylesheet']");
  console.log("🔍 CSS files loaded:");
  stylesheets.forEach((link, index) => {
    console.log(`${index + 1}. ${link.href}`);
  });

  console.log("✅ DIAGNOSTIC COMPLETE - Check messages above!");
});

// Also run diagnostic immediately in case DOM is already loaded
if (document.readyState !== "loading") {
  console.log("🔍 DOM already loaded, running diagnostic now...");
  // Run the same diagnostic code here if needed
}
