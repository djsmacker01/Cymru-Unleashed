document.addEventListener("DOMContentLoaded", function () {
  // Render Navigation
  const navList = document.querySelector("#nav ul");
  if (navList) {
    navList.innerHTML = siteConfig.navigation
      .map(
        (item) => `
            <li><a href="${item.path}" ${
          item.path.includes("about.html") ? 'class="active"' : ""
        }>
                <i class="${item.icon}"></i> ${item.label}
            </a></li>
        `
      )
      .join("");
  }

  // Render Hero Stats
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    heroStats.innerHTML = siteConfig.heroStats
      .map(
        (stat) => `
            <div class="stat-item">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `
      )
      .join("");
  }

  // Render Team Members
  const teamGrid = document.querySelector(".team-grid");
  if (teamGrid) {
    teamGrid.innerHTML = siteConfig.teamMembers
      .map(
        (member) => `
            <div class="team-member">
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <span>${member.role}</span>
                    <p>${member.description}</p>
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

  // Render Core Values
  const valuesGrid = document.querySelector(".values-grid");
  if (valuesGrid) {
    valuesGrid.innerHTML = siteConfig.coreValues
      .map(
        (value) => `
            <div class="value-card">
                <div class="value-icon">
                    <i class="${value.icon}"></i>
                </div>
                <h3>${value.title}</h3>
                <p>${value.description}</p>
            </div>
        `
      )
      .join("");
  }

  // Render Footer Content
  const footerSocial = document.querySelector(".footer-social");
  if (footerSocial) {
    footerSocial.innerHTML = Object.entries(siteConfig.footer.socialLinks)
      .map(
        ([platform, url]) => `
            <a href="${url}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-${platform}"></i>
            </a>
        `
      )
      .join("");
  }

  // Render Partner Logos
  const partnerLogos = document.querySelector(".partner-logos");
  if (partnerLogos) {
    partnerLogos.innerHTML = siteConfig.footer.partners
      .map(
        (partner) => `
            <img src="${partner.logo}" alt="${partner.name}">
        `
      )
      .join("");
  }

  // Update Copyright Year
  const copyrightYear = document.querySelector(".copyright p");
  if (copyrightYear) {
    copyrightYear.innerHTML = `&copy; ${siteConfig.copyright.year} ${siteConfig.copyright.text}`;
  }

  // Update Contact Information
  const contactList = document.querySelector(".footer-links:last-child ul");
  if (contactList) {
    contactList.innerHTML = `
            <li>
                <strong>Email:</strong>
                <a href="mailto:${siteConfig.footer.contact.email1}">${siteConfig.footer.contact.email1}</a>
                <strong>Phone number:</strong>
                <a href="tel:${siteConfig.footer.contact.phone}">${siteConfig.footer.contact.phone}</a>
                </br>
                <strong>Email:</strong>
                <a href="mailto:${siteConfig.footer.contact.email2}">${siteConfig.footer.contact.email2}</a>
            </li>
            <li>
                <strong>Instagram:</strong>
                <a href="${siteConfig.footer.socialLinks.instagram}" target="_blank" rel="noopener noreferrer">@cymru.unleashed</a>
            </li>
            <li>
                <strong>Twitter:</strong>
                <a href="${siteConfig.footer.socialLinks.twitter}" target="_blank" rel="noopener noreferrer">@CymruUnleashed</a>
            </li>
            <li>
                <strong>TikTok:</strong>
                <a href="${siteConfig.footer.socialLinks.tiktok}" target="_blank" rel="noopener noreferrer">@cymru.unleashed</a>
            </li>
        `;
  }
});
