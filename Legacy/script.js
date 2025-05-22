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

// Testimonial Slider with Touch Support
const track = document.getElementById("stories-track");
const dots = document.querySelectorAll(".slider-dot");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;
const slides = Array.from(track.children);
let startX;
let moveX;
let isMouseDown = false;

// Set initial position
const setSliderPosition = () => {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
};

// Next button click
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  setSliderPosition();
});

// Previous button click
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  setSliderPosition();
});

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-index"));
    setSliderPosition();
  });
});

// Touch events for slider
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
    if (!isMouseDown) {
      return;
    }
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
      // Swipe right - go to previous
      currentIndex--;
    } else if (diff < -50 && currentIndex < slides.length - 1) {
      // Swipe left - go to next
      currentIndex++;
    }
    setSliderPosition();
    moveX = null;
  }
});

// Auto slider change every 5 seconds
let autoSlideInterval = setInterval(() => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  setSliderPosition();
}, 5000);

// Pause auto-slide on interaction
[nextBtn, prevBtn, ...dots].forEach((element) => {
  element.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    // Restart auto-slide after 10 seconds of inactivity
    autoSlideInterval = setInterval(() => {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setSliderPosition();
    }, 5000);
  });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll(
  ".legacy-pillar, .partner-card"
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
    "legacy-title": "Our Legacy",
    "legacy-subtitle":
      "Building a lasting impact beyond UEFA Women's Euro 2025",
    "legacy-intro-title": "Legacy Beyond 2025",
    "legacy-intro-text":
      "Cymru Unleashed is not just a project - it's a movement designed to create lasting change in communities across Wales, with a focus on empowering the next generation of Welsh women through sport, art, and culture.",
    "legacy-quote":
      "From a single summer to lasting cultural change - by women, for women, in Wales.",
    "permanent-art-title": "Permanent Public Art",
    "permanent-art-desc":
      "A lasting tribute to Welsh women in sport at Cardiff Bay Cultural Hub",
    "permanent-art-text":
      "This permanent piece will stand as a visual reminder of the power of women's sport and its cultural significance in Wales.",
    "digital-archive-title": "Digital Archive",
    "digital-archive-desc":
      "Educational resources and VR content for schools across Wales",
    "digital-archive-text":
      "This archive will be freely available to schools across Wales, ensuring the project's impact continues in classrooms for years to come.",
    "annual-workshops-title": "Annual Workshops",
    "annual-workshops-desc":
      "Ongoing sports and art programs in partner schools",
    "annual-workshops-text-1":
      "Through signed MOUs with partner schools, we will provide ongoing workshops that combine sports skills with creative expression.",
    "annual-workshops-text-2":
      "These annual programs will ensure that the connections between sport, identity, and culture continue to be explored by new generations of young Welsh women.",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    home: "Home",
    about: "About",
    activities: "Activities",
    legacy: "Legacy",
    media: "Media",
    "get-involved": "Get Involved",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    copyright: "© 2025 Cymru Unleashed. All rights reserved.",
  },
  cy: {
    "legacy-title": "Ein Gwaddol",
    "legacy-subtitle":
      "Adeiladu effaith barhaol y tu hwnt i Gemau UEFA Menywod Euro 2025",
    "legacy-intro-title": "Gwaddol y Tu Hwnt i 2025",
    "legacy-intro-text":
      "Nid prosiect yn unig yw Cymru Unleashed - mudiad ydyw wedi'i gynllunio i greu newid parhaol mewn cymunedau ar draws Cymru, gyda ffocws ar rymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
    "legacy-quote":
      "O haf unig i newid diwylliannol parhaol - gan ferched, i ferched, yng Nghymru.",
    "permanent-art-title": "Celf Gyhoeddus Barhaol",
    "permanent-art-desc":
      "Teyrnged barhaol i fenywod Cymreig mewn chwaraeon yng Nghanolfan Ddiwylliannol Bae Caerdydd",
    "permanent-art-text":
      "Bydd y darn parhaol hwn yn sefyll fel atgof gweledol o rym chwaraeon menywod a'i arwyddocâd diwylliannol yng Nghymru.",
    "digital-archive-title": "Archif Digidol",
    "digital-archive-desc":
      "Adnoddau addysgol a chynnwys VR ar gyfer ysgolion ar draws Cymru",
    "digital-archive-text":
      "Bydd yr archif hwn ar gael yn rhad ac am ddim i ysgolion ar draws Cymru, gan sicrhau bod effaith y prosiect yn parhau mewn ystafelloedd dosbarth am flynyddoedd i ddod.",
    "annual-workshops-title": "Gweithdai Blynyddol",
    "annual-workshops-desc":
      "Rhaglenni chwaraeon a chelf parhaus mewn ysgolion partner",
    "annual-workshops-text-1":
      "Trwy MOUs wedi'u llofnodi gydag ysgolion partner, byddwn yn darparu gweithdai parhaus sy'n cyfuno sgiliau chwaraeon gyda mynegiant creadigol.",
    "annual-workshops-text-2":
      "Bydd y rhaglenni blynyddol hyn yn sicrhau bod y cysylltiadau rhwng chwaraeon, hunaniaeth, a diwylliant yn parhau i gael eu harchwilio gan genedlaethau newydd o fenywod ifanc Cymreig.",
    "footer-tagline":
      "Grymuso cenhedlaeth nesaf menywod Cymreig trwy chwaraeon, celf, a diwylliant.",
    "quick-links": "Dolenni Cyflym",
    home: "Hafan",
    about: "Amdanom",
    activities: "Gweithgareddau",
    legacy: "Gwaddol",
    media: "Cyfryngau",
    "get-involved": "Ymunwch â Ni",
    contact: "Cysylltu",
    email: "E-bost",
    phone: "Rhif ffôn",
    copyright: "© 2025 Cymru Unleashed. Cedwir pob hawl.",
  },
};

function updateLanguage(lang) {
  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update document title
  document.title =
    lang === "cy" ? "Gwaddol | Cymru Unleashed" : "Legacy | Cymru Unleashed";

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

// Handle touch events for mobile
document.addEventListener("touchstart", () => {}, { passive: true });

// Hero Section Animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize stats counter animation
  const stats = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.5,
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute("data-count"));
        animateValue(target, 0, finalValue, 2000);
        statsObserver.unobserve(target);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Handle specific button scroll behaviors
  const exploreLegacyBtn = document.querySelector(".btn-primary");
  const viewImpactBtn = document.querySelector(".btn-secondary");

  if (exploreLegacyBtn) {
    exploreLegacyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const legacySection = document.querySelector("#legacy-beyond");
      if (legacySection) {
        const headerOffset = 80;
        const elementPosition = legacySection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Add ripple effect
        const ripple = document.createElement("span");
        ripple.classList.add("btn-ripple");
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        // Smooth scroll to section
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation
        legacySection.classList.add("section-highlight");
        setTimeout(() => {
          legacySection.classList.remove("section-highlight");
        }, 1500);
      }
    });
  }

  if (viewImpactBtn) {
    viewImpactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const impactSection = document.querySelector("#impact-stories");
      if (impactSection) {
        const headerOffset = 80;
        const elementPosition = impactSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Add ripple effect
        const ripple = document.createElement("span");
        ripple.classList.add("btn-ripple");
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        // Smooth scroll to section
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation
        impactSection.classList.add("section-highlight");
        setTimeout(() => {
          impactSection.classList.remove("section-highlight");
        }, 1500);
      }
    });
  }

  // Smooth scroll functionality for other anchor links
  const scrollLinks = document.querySelectorAll(
    'a[href^="#"]:not(.btn-primary):not(.btn-secondary)'
  );
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Add ripple effect to button
        const ripple = document.createElement("span");
        ripple.classList.add("btn-ripple");
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation to target section
        targetElement.classList.add("section-highlight");
        setTimeout(() => {
          targetElement.classList.remove("section-highlight");
        }, 1500);
      }
    });
  });

  // Scroll indicator functionality with enhanced animation
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const nextSection = document.querySelector("#legacy-pillars");
      if (nextSection) {
        const headerOffset = 80;
        const elementPosition = nextSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Add bounce animation to scroll indicator
        this.classList.add("scroll-bounce");
        setTimeout(() => {
          this.classList.remove("scroll-bounce");
        }, 1000);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add highlight animation to target section
        nextSection.classList.add("section-highlight");
        setTimeout(() => {
          nextSection.classList.remove("section-highlight");
        }, 1500);
      }
    });

    // Enhanced fade out scroll indicator on scroll
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
        scrollIndicator.style.transform = "translateY(20px)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
        scrollIndicator.style.transform = "translateY(0)";
      }
    });
  }
});

// Enhanced helper function to animate counting with easing
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const step = (timestamp) => {
    if (!startTimestamp) {
      startTimestamp = timestamp;
    }
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const value = Math.floor(easedProgress * (end - start) + start);
    element.textContent = value;

    // Add pulse animation when value changes
    element.classList.add("number-pulse");
    setTimeout(() => {
      element.classList.remove("number-pulse");
    }, 200);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Enhanced parallax effect to shapes with smooth transitions
document.addEventListener("mousemove", function (e) {
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;

    // Add smooth transition
    shape.style.transition = "transform 0.3s ease-out";
    shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
  });
});
