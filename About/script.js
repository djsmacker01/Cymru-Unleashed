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
    header.classList.toggle(
      "scrolled",
      window.scrollY > behaviorConfig.navigation.scrollThreshold
    );
  });
};

// Animation on scroll with Intersection Observer
const initializeAnimations = () => {
  const animateElements = document.querySelectorAll(
    behaviorConfig.animations.elements.join(", ")
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: behaviorConfig.navigation.animationThreshold,
      rootMargin: behaviorConfig.navigation.animationMargin,
    }
  );

  animateElements.forEach((element) => observer.observe(element));
};

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
      "Our grassroots foundation ensures that we remain connected to the communities we serve, with a special focus on underrepresented voices and those with limited access to sport and cultural opportunities.",
    "our-mission": "Our Mission",
    "mission-text":
      "To make sport and culture accessible to all — inspiring a generation of young Welsh girls to lead, play, and dream beyond boundaries.",
    "our-objectives": "Our Objectives",
    "objective-1":
      "Increase sports participation among girls aged 12-18, with a focus on those from underrepresented communities",
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
      "Cynyddu cyfranogiad chwaraeon ymhlith merched 12-18 oed, gyda ffocws ar y rhai o gymunedau sydd heb gynrychiolaeth ddigonol",
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
