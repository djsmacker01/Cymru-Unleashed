// Media page dynamic content renderer
document.addEventListener("DOMContentLoaded", function () {
  // Render Hero Section
  function renderHero() {
    const heroTitle = document.querySelector(".hero-text-wrapper h1");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroImage = document.querySelector(".hero-illustration img");

    if (heroTitle) heroTitle.textContent = mediaData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = mediaData.hero.subtitle;
    if (heroImage) {
      heroImage.src = mediaData.hero.image;
      heroImage.alt = mediaData.hero.imageAlt;
    }
  }

  // Render Press Coverage Section
  function renderPressCoverage() {
    const pressTitle = document.querySelector(".press-intro h2");
    const pressDescription = document.querySelector(".press-intro p");
    const pressLogos = document.querySelector(".press-logos");

    if (pressTitle) pressTitle.textContent = mediaData.pressCoverage.title;
    if (pressDescription)
      pressDescription.textContent = mediaData.pressCoverage.description;
    if (pressLogos) {
      pressLogos.innerHTML = mediaData.pressCoverage.logos
        .map(
          (logo) => `
                <img src="${logo.src}" alt="${logo.alt}" class="press-logo" width="150" height="60">
            `
        )
        .join("");
    }
  }

  // Render Stats Section
  function renderStats() {
    const statsGrid = document.querySelector(".stats-grid");
    if (statsGrid) {
      statsGrid.innerHTML = mediaData.stats
        .map(
          (stat) => `
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fas ${stat.icon}"></i>
                    </div>
                    <span class="stat-number" data-count="${stat.count}">0</span>
                    <span class="stat-label">${stat.label}</span>
                </div>
            `
        )
        .join("");
    }
  }

  // Render Latest News Section
  function renderLatestNews() {
    const newsSection = document.querySelector(".news-section");
    if (newsSection) {
      const newsTitle = newsSection.querySelector("h2");
      const newsGrid = newsSection.querySelector(".news-grid");

      if (newsTitle) newsTitle.textContent = mediaData.latestNews.title;
      if (newsGrid) {
        newsGrid.innerHTML = mediaData.latestNews.articles
          .map(
            (article) => `
                    <div class="news-card">
                        <div class="news-image">
                            <img src="${article.image}" alt="${article.imageAlt}" width="400" height="300">
                        </div>
                        <div class="news-content">
                            <div class="news-source">
                                <img src="${article.source.logo}" alt="${article.source.name} logo" width="60" height="20">
                                <span class="news-date">${article.date}</span>
                            </div>
                            <h3>${article.title}</h3>
                            <p>${article.description}</p>
                            <a href="${article.link}" class="btn">Read More</a>
                        </div>
                    </div>
                `
          )
          .join("");
      }
    }
  }

  // Render Social Media Section
  function renderSocialMedia() {
    const socialSection = document.querySelector(".social-section");
    if (socialSection) {
      const socialTitle = socialSection.querySelector(".social-intro h2");
      const socialSubtitle = socialSection.querySelector(".social-intro p");
      const socialTabs = socialSection.querySelector(".social-tabs");
      const socialContent = socialSection.querySelector(".social-content");
      const socialLinks = socialSection.querySelector(".social-links");

      if (socialTitle) socialTitle.textContent = mediaData.socialMedia.title;
      if (socialSubtitle)
        socialSubtitle.textContent = mediaData.socialMedia.subtitle;

      if (socialTabs) {
        socialTabs.innerHTML = mediaData.socialMedia.platforms
          .map(
            (platform) => `
                    <button class="social-tab ${
                      platform.tabId === "instagram" ? "active" : ""
                    }" data-tab="${platform.tabId}">
                        <i class="${platform.icon}"></i> ${platform.name}
                    </button>
                `
          )
          .join("");
      }

      if (socialContent) {
        socialContent.innerHTML = mediaData.socialMedia.platforms
          .map(
            (platform) => `
                    <div class="social-feed ${
                      platform.tabId === "instagram" ? "active" : ""
                    }" id="${platform.tabId}-feed">
                        ${platform.posts
                          .map(
                            (post) => `
                            <div class="social-post">
                                ${
                                  post.image
                                    ? `
                                    <div class="post-image">
                                        <img data-src="${post.image}" alt="${platform.name} Post" class="lazy-loading-placeholder">
                                    </div>
                                `
                                    : ""
                                }
                                <div class="post-content">
                                    <div class="post-header">
                                        <div class="post-avatar">
                                            <img data-src="${
                                              post.avatar
                                            }" alt="Profile" class="lazy-loading-placeholder">
                                        </div>
                                        <div class="post-user">
                                            <h4>${post.username}</h4>
                                            <span>${post.timeAgo}</span>
                                        </div>
                                    </div>
                                    <div class="post-text">
                                        <p>${post.content}</p>
                                    </div>
                                    <div class="post-meta">
                                        ${
                                          post.retweets
                                            ? `
                                            <span>🔄 ${post.retweets} retweets</span>
                                        `
                                            : ""
                                        }
                                        <span>♥ ${post.likes} likes</span>
                                        ${
                                          post.comments
                                            ? `
                                            <span>💬 ${post.comments} comments</span>
                                        `
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
          )
          .join("");
      }

      if (socialLinks) {
        socialLinks.innerHTML = mediaData.socialMedia.socialLinks
          .map(
            (link) => `
                    <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                        <i class="${link.icon}"></i>
                    </a>
                `
          )
          .join("");
      }
    }
  }

  // Render Video Section
  function renderVideos() {
    const videoSection = document.querySelector(".video-section");
    if (videoSection) {
      const videoTitle = videoSection.querySelector(".video-intro h2");
      const videoDescription = videoSection.querySelector(".video-intro p");
      const featuredVideo = videoSection.querySelector(".featured-video");
      const videoThumbnails = videoSection.querySelector(".video-thumbnails");

      if (videoTitle) videoTitle.textContent = mediaData.videos.title;
      if (videoDescription)
        videoDescription.textContent = mediaData.videos.description;

      if (featuredVideo) {
        featuredVideo.innerHTML = `
                    <div class="video-container">
                        <img data-src="${mediaData.videos.featured.image}" alt="Featured Video" class="lazy-loading-placeholder" width="800" height="450">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-description">
                        <h3>${mediaData.videos.featured.title}</h3>
                        <p>${mediaData.videos.featured.description}</p>
                    </div>
                `;
      }

      if (videoThumbnails) {
        videoThumbnails.innerHTML = mediaData.videos.thumbnails
          .map(
            (thumb) => `
                    <div class="video-thumb">
                        <div class="thumb-container">
                            <img data-src="${thumb.image}" alt="${thumb.title}" class="lazy-loading-placeholder" width="400" height="225">
                            <div class="thumb-play">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="thumb-title">
                            ${thumb.title}
                        </div>
                    </div>
                `
          )
          .join("");
      }
    }
  }

  // Render Media Kit Section
  function renderMediaKit() {
    const mediaKitSection = document.querySelector(".media-kit-section");
    if (mediaKitSection) {
      const mediaKitTitle = mediaKitSection.querySelector("h2");
      const mediaKitDescription = mediaKitSection.querySelector("p");
      const downloadList = mediaKitSection.querySelector(".download-list");
      const mediaKitImage = mediaKitSection.querySelector(
        ".media-kit-image img"
      );

      if (mediaKitTitle) mediaKitTitle.textContent = mediaData.mediaKit.title;
      if (mediaKitDescription)
        mediaKitDescription.textContent = mediaData.mediaKit.description;
      if (mediaKitImage) {
        mediaKitImage.src = mediaData.mediaKit.previewImage;
        mediaKitImage.alt = "Media Kit Preview";
      }

      if (downloadList) {
        downloadList.innerHTML = mediaData.mediaKit.downloads
          .map(
            (item) => `
                    <li class="download-item">
                        <div class="download-icon">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="download-info">
                            <h4>${item.title}</h4>
                            <span>${item.format}</span>
                            <div class="download-progress">
                                <div class="progress-bar" data-progress="0"></div>
                            </div>
                        </div>
                        <a href="${
                          item.file
                        }" class="download-btn" data-file="${item.file
              .split("/")
              .pop()}">
                            <i class="fas fa-download"></i>
                        </a>
                    </li>
                `
          )
          .join("");
      }
    }
  }

  // Render Press Contact Section
  function renderPressContact() {
    const pressContactSection = document.querySelector(".press-contact");
    if (pressContactSection) {
      const pressContactTitle = pressContactSection.querySelector("h2");
      const pressContactDescription = pressContactSection.querySelector("p");
      const contactDetails =
        pressContactSection.querySelector(".contact-details");

      if (pressContactTitle)
        pressContactTitle.textContent = mediaData.pressContact.title;
      if (pressContactDescription)
        pressContactDescription.textContent =
          mediaData.pressContact.description;

      if (contactDetails) {
        contactDetails.innerHTML = mediaData.pressContact.contacts
          .map(
            (contact) => `
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="${contact.icon}"></i>
                        </div>
                        <h3>${contact.type}</h3>
                        <div class="contact-info">
                            ${contact.details
                              .map(
                                (detail) => `
                                ${
                                  detail.link
                                    ? `
                                    <p><a href="${detail.link}">${detail.value}</a></p>
                                `
                                    : `
                                    <p>${detail.value}</p>
                                `
                                }
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                `
          )
          .join("");
      }
    }
  }

  // Render Footer
  function renderFooter() {
    const footer = document.querySelector("footer");
    if (footer) {
      const footerTagline = footer.querySelector(".footer-info p");
      const partnerLogos = footer.querySelector(".partner-logos");
      const quickLinks = footer.querySelector(".footer-links ul");
      const contactInfo = footer.querySelector(".footer-links:last-child ul");
      const copyright = footer.querySelector(".copyright p");

      if (footerTagline) footerTagline.textContent = mediaData.footer.tagline;

      if (partnerLogos) {
        partnerLogos.innerHTML = mediaData.footer.partners
          .map(
            (partner) => `
                    <img src="${partner.src}" alt="${partner.alt}" loading="lazy" width="150" height="50">
                `
          )
          .join("");
      }

      if (quickLinks) {
        quickLinks.innerHTML = mediaData.footer.quickLinks
          .map(
            (link) => `
                    <li><a href="${link.url}">${link.text}</a></li>
                `
          )
          .join("");
      }

      if (contactInfo) {
        contactInfo.innerHTML = `
                    <li>
                        <strong>${mediaData.footer.contact.email.label}</strong>
                        <a href="${mediaData.footer.contact.email.link}">${
          mediaData.footer.contact.email.value
        }</a>
                        <strong>${mediaData.footer.contact.phone.label}</strong>
                        <a href="${mediaData.footer.contact.phone.link}">${
          mediaData.footer.contact.phone.value
        }</a>
                        </br>
                        <strong>${
                          mediaData.footer.contact.email2.label
                        }</strong>
                        <a href="${mediaData.footer.contact.email2.link}">${
          mediaData.footer.contact.email2.value
        }</a>
                    </li>
                    ${mediaData.footer.contact.social
                      .map(
                        (social) => `
                        <li>
                            <strong>${social.label}</strong>
                            <a href="${social.link}" target="_blank" rel="noopener noreferrer">${social.value}</a>
                        </li>
                    `
                      )
                      .join("")}
                `;
      }

      if (copyright) copyright.textContent = mediaData.footer.copyright;
    }
  }

  // Initialize all sections
  function initializeSections() {
    renderHero();
    renderPressCoverage();
    renderStats();
    renderLatestNews();
    renderSocialMedia();
    renderVideos();
    renderMediaKit();
    renderPressContact();
    renderFooter();

    // Initialize stats counter animation
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 40);
    });
  }

  // Initialize the page
  initializeSections();
});
