// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

const toggleMenu = () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.innerHTML = nav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';

  // Toggle body scroll
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
};

// Initialize navigation event listeners
const initializeNavigation = () => {
  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking navigation links
  document.querySelectorAll("nav a").forEach((item) => {
    item.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
};

// Sticky Header on Scroll
const initializeStickyHeader = () => {
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
};

// Form Tabs
const tabButtons = document.querySelectorAll(".form-tab");
const tabContents = document.querySelectorAll(".form-content");
const optionButtons = document.querySelectorAll(".form-tab-btn");

// Show tab content based on ID
const showTabContent = (tabId) => {
  // Remove active class from all tabs and contents
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  // Add active class to clicked tab
  document
    .querySelector(`.form-tab[data-tab="${tabId}"]`)
    .classList.add("active");

  // Show corresponding content
  document.getElementById(`${tabId}-content`).classList.add("active");

  // Scroll to the form with a slight delay for animation
  setTimeout(() => {
    document.querySelector(".form-tabs").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};

// Tab button click
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");
    showTabContent(tabId);
  });
});

// Option button click
optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");
    showTabContent(tabId);
  });
});

// Form Submissions with validation feedback
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  // Real-time validation
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("blur", () => {
      if (!field.value.trim()) {
        field.classList.add("invalid");
        // Add error message
        if (
          !field.nextElementSibling ||
          !field.nextElementSibling.classList.contains("error-message")
        ) {
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = "This field is required";
          errorMessage.style.color = "var(--primary)";
          errorMessage.style.fontSize = "0.8rem";
          errorMessage.style.marginTop = "5px";
          field.insertAdjacentElement("afterend", errorMessage);
        }
      } else {
        field.classList.remove("invalid");
        // Remove error message if exists
        if (
          field.nextElementSibling &&
          field.nextElementSibling.classList.contains("error-message")
        ) {
          field.nextElementSibling.remove();
        }
      }
    });

    // Clear error on input
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        field.classList.remove("invalid");
        // Remove error message if exists
        if (
          field.nextElementSibling &&
          field.nextElementSibling.classList.contains("error-message")
        ) {
          field.nextElementSibling.remove();
        }
      }
    });
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("invalid");
        // Add error message if not exists
        if (
          !field.nextElementSibling ||
          !field.nextElementSibling.classList.contains("error-message")
        ) {
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = "This field is required";
          errorMessage.style.color = "var(--primary)";
          errorMessage.style.fontSize = "0.8rem";
          errorMessage.style.marginTop = "5px";
          field.insertAdjacentElement("afterend", errorMessage);
        }
      } else {
        field.classList.remove("invalid");
        // Remove error message if exists
        if (
          field.nextElementSibling &&
          field.nextElementSibling.classList.contains("error-message")
        ) {
          field.nextElementSibling.remove();
        }
      }
    });

    if (isValid) {
      // Simulate form submission
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        form.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p>Your submission has been received. We'll be in touch soon.</p>
                    </div>
                `;
      }, 1500);
    } else {
      // Scroll to first error
      const firstError = form.querySelector(".invalid");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
    }
  });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    // Get the height of the content
    const contentHeight = item.querySelector(".accordion-text").offsetHeight;

    // Toggle active class
    item.classList.toggle("active");

    // Set max-height to enable animation
    if (item.classList.contains("active")) {
      content.style.maxHeight = contentHeight + "px";
    } else {
      content.style.maxHeight = "0";
    }
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".option-card, .testimonial-card, .accordion-item"
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
    "get-involved-title": "Get Involved",
    "get-involved-subtitle":
      "Join our movement to empower young Welsh women through sport and culture",
    "volunteer-title": "Volunteer",
    "volunteer-desc": "Share your skills and passion with our community",
    "school-title": "Register Your School",
    "school-desc": "Bring our programs to your students",
    "partner-title": "Partner With Us",
    "partner-desc": "Collaborate on initiatives that make a difference",
    "donate-title": "Support Our Work",
    "donate-desc": "Help us create lasting impact in communities across Wales",
    "contact-title": "Contact Us",
    "contact-desc": "Get in touch to learn more about getting involved",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    contact: "Contact",
  },
  cy: {
    "get-involved-title": "Ymunwch â Ni",
    "get-involved-subtitle":
      "Ymunwch â'n mudiad i rymuso menywod ifanc Cymreig trwy chwaraeon a diwylliant",
    "volunteer-title": "Gwirfoddoli",
    "volunteer-desc": "Rhannwch eich sgiliau a'ch angerdd gyda'n cymuned",
    "school-title": "Cofrestru Eich Ysgol",
    "school-desc": "Dewch â'n rhaglenni i'ch myfyrwyr",
    "partner-title": "Partneru Gyda Ni",
    "partner-desc": "Cydweithio ar fentrau sy'n gwneud gwahaniaeth",
    "donate-title": "Cefnogi Ein Gwaith",
    "donate-desc":
      "Helpu ni i greu effaith barhaol mewn cymunedau ar draws Cymru",
    "contact-title": "Cysylltu â Ni",
    "contact-desc": "Cysylltwch i ddysgu mwy am ymuno",
    "footer-tagline":
      "Grymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
    "quick-links": "Dolenni Cyflym",
    contact: "Cysylltu",
  },
};

function updateLanguage(lang) {
  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang]?.[key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update document title
  document.title =
    lang === "cy"
      ? "Ymunwch â Ni | Cymru Unleashed"
      : "Get Involved | Cymru Unleashed";

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

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeStickyHeader();
});

// Check URL hash for direct tab access
window.addEventListener("load", () => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const validTabs = ["volunteer", "school", "partner"];

    if (validTabs.includes(hash)) {
      showTabContent(hash);
    }
  }
});

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });
