// Mobile Navigation Toggle
// REPLACE ALL NAVIGATION-RELATED CODE WITH THIS:

// Refined Mobile Navigation - Complete Working Solution
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
    const elements = [this.nav, this.hamburger, this.overlay];
    if (elements.some((el) => !el)) {
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
    this.nav?.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (link) {
        e.preventDefault(); // Prevent default initially

        const href = link.getAttribute("href");
        const isExternalLink =
          href?.startsWith("http") ||
          href?.startsWith("mailto") ||
          href?.startsWith("tel");
        const isHashLink = href?.startsWith("#");

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
    // ESC key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
        this.hamburger.focus();
      }
    });

    // Tab trapping within menu
    this.nav.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && this.isMenuOpen) {
        const focusableElements = this.nav.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
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
    document.addEventListener("wheel", preventScroll, { passive: false });
  }

  toggleMenu() {
    if (this.isAnimating) {
      return;
    }

    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isAnimating || this.isMenuOpen) {
      return;
    }

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

    console.log("Menu opened");
  }

  closeMenu() {
    if (this.isAnimating || !this.isMenuOpen) {
      return;
    }

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

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);

    console.log("Menu closed");
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
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 0;
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

// Sticky Header functionality
class StickyHeader {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    if (!this.header) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Add scrolled class when scrolled down
          this.header.classList.toggle("scrolled", currentScrollY > 50);

          lastScrollY = currentScrollY;
          isScrolling = false;
        });

        isScrolling = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile navigation
  new MobileNavigation();

  // Initialize sticky header
  new StickyHeader();

  console.log("Navigation system initialized");
});

// Keep all your OTHER existing JavaScript functions below this line
// (Social tabs, video interaction, animations, translations, etc.)

// Language Toggle
const languageToggle = document.querySelectorAll(".language-toggle a");

const translations = {
  en: {
    "about-title": "About Us",
    "hero-subtitle":
      "Learn more about our women-led initiative celebrating Wales in UEFA Euro 2025",
    "our-story": "Our Story",
    "story-text":
      "Cymru Unleashed was born from a vision to celebrate Wales' historic participation in UEFA Women's Euro 2025 in a meaningful way that creates lasting impact. Founded by a diverse group of Welsh women in sports, arts, and community development, our initiative aims to use this momentous sporting event as a catalyst for positive change.",
    "what-makes-different": "What Makes Us Different",
    "different-text":
      "What sets Cymru Unleashed apart is our unique approach that combines sport, creativity, and innovation to create pathways for young Welsh women and girls. We believe that by connecting these three powerful forces, we can inspire a new generation to take pride in their identity and discover their own potential.",
    "grassroots-text":
      "Our grassroots outreach ensures that we remain connected to the communities we serve, with a special focus on underrepresented voices and those with limited access to sport and cultural opportunities.",
    "our-mission": "Our Mission",
    "mission-text":
      "To make sport and culture accessible to all — inspiring a generation of young Welsh girls to lead, play, and dream beyond boundaries.",
    "our-objectives": "Our Objectives",
    "objective-1":
      "Increase sports participation among girls, with a focus on those from underrepresented communities",
    "objective-2":
      "Champion equality and inclusion with 50% of participants from marginalized communities",
    "objective-3":
      "Promote Wales and Welsh culture through bilingual digital storytelling and immersive content",
    "objective-4":
      "Build a lasting legacy via strategic partnerships, public art, and educational resources",
    "meet-team": "Meet Our Team",
    "core-values": "Our Core Values",
    "footer-tagline":
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    "quick-links": "Quick Links",
    contact: "Contact",
  },
  cy: {
    "about-title": "Amdanom Ni",
    "hero-subtitle":
      "Dysgwch fwy am ein menter arweinyddiaeth benywaidd yn dathlu Cymru yn UEFA Euro 2025",
    "our-story": "Ein Stori",
    "story-text":
      "Cymru Unleashed a anwyd o weledigaeth i ddathlu cyfranogiad hanesyddol Cymru yn UEFA Euro 2025 Benywaidd mewn ffordd ystyrlon sy'n creu effaith parhaol. Wedi'i sefydlu gan grŵp amrywiol o fenywod Cymreig mewn chwaraeon, celfyddydau, a datblygu cymunedol, mae ein menter yn anelu at ddefnyddio'r digwyddiad chwaraeon pwysig hwn fel catalydd ar gyfer newid cadarnhaol.",
    "what-makes-different": "Beth Sy'n Ein Gwneud yn Wahanol",
    "different-text":
      "Yr hyn sy'n gwneud Cymru Unleashed yn wahanol yw ein dull unigryw sy'n cyfuno chwaraeon, creadigrwydd, ac arloesi i greu llwybrau ar gyfer merched ifanc Cymreig. Rydym yn credu, trwy gysylltu'r tair grym pwerus hyn, y gallwn ysbrydoli cenhedlaeth newydd i ymfalchïo yn eu hunaniaeth a darganfod eu potensial eu hunain.",
    "grassroots-text":
      "Mae ein sylfaen gwreiddiol yn sicrhau ein bod yn parhau i fod yn gysylltiedig â'r cymunedau rydym yn eu gwasanaethu, gyda ffocws arbennig ar leisiau sydd heb gynrychiolaeth ddigonol a'r rhai sydd â mynediad cyfyngedig i gyfleoedd chwaraeon a diwylliannol.",
    "our-mission": "Ein Cenhadaeth",
    "mission-text":
      "I wneud chwaraeon a diwylliant yn hygyrch i bawb - yn ysbrydoli cenhedlaeth o ferched ifanc Cymreig i arwain, chwarae, a breuddwydio y tu hwnt i ffiniau.",
    "our-objectives": "Ein Nodau",
    "objective-1":
      "Cynyddu cyfranogiad chwaraeon ymhlith merched, gyda ffocws ar y rhai o gymunedau sydd heb gynrychiolaeth ddigonol",
    "objective-2":
      "Hyrwyddo cydraddoldeb a chynhwysiant gyda 50% o gyfranogwyr o gymunedau ymylol",
    "objective-3":
      "Hyrwyddo Cymru a diwylliant Cymreig trwy straeon digidol dwyieithog a chynnwys ymlyniadol",
    "objective-4":
      "Adeiladu treftadaeth barhaol trwy bartneriaethau strategol, celf gyhoeddus, ac adnoddau addysgol",
    "meet-team": "Cyfarfod â'n Tîm",
    "core-values": "Ein Gwerthoedd Craidd",
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
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update document title
  document.title =
    lang === "cy" ? "Amdanom | Cymru Unleashed" : "About | Cymru Unleashed";

  // Store language preference
  localStorage.setItem("preferred-language", lang);

  // Re-render core values with new language
  const valuesGrid = document.querySelector(".values-grid");
  if (valuesGrid) {
    valuesGrid.innerHTML = siteConfig.coreValues
      .map(
        (value) => `
            <div class="value-card">
                <div class="value-icon">
                    <i class="${value.icon}"></i>
                </div>
                <h3>${value.title[lang]}</h3>
                <p>${value.description[lang]}</p>
            </div>
        `
      )
      .join("");
  }

  // Re-render team members with new language
  const teamGrid = document.querySelector(".team-grid");
  if (teamGrid) {
    teamGrid.innerHTML = siteConfig.teamMembers
      .map(
        (member) => `
            <div class="team-member">
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name[lang]}">
                </div>
                <div class="member-info">
                    <h3>${member.name[lang]}</h3>
                    <span>${member.role[lang]}</span>
                    <p>${member.description[lang]}</p>
                    <div class="member-social">
                        <a href="${member.social.twitter}"><i class="fab fa-twitter"></i></a>
                        <a href="${member.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${member.social.instagram}"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }
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

// Handle touch events for mobile
const initializeTouchEvents = () => {
  document.addEventListener("touchstart", () => {}, { passive: true });
};

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeStickyHeader();
  initializeAnimations();
  initializeLanguageToggle();
  initializeTouchEvents();
});
