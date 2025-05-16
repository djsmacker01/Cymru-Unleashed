
// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

const toggleMenu = () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';

    // Toggle body scroll
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking navigation links
document.querySelectorAll('nav a').forEach(item => {
    item.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Social Tabs
const socialTabs = document.querySelectorAll('.social-tab');
const socialFeeds = document.querySelectorAll('.social-feed');

socialTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        socialTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all feeds
        socialFeeds.forEach(feed => feed.classList.remove('active'));
        // Show corresponding feed
        const feedId = `${tab.getAttribute('data-tab')}-feed`;
        document.getElementById(feedId).classList.add('active');
    });
});

// Video Interaction
const mainVideo = document.querySelector('.featured-video .video-container');
const playButton = document.querySelector('.play-button');
const videoThumbs = document.querySelectorAll('.video-thumb');

playButton.addEventListener('click', () => {
    // In a real implementation, this would play the video
    alert('Video would play here in the real implementation.');
});

videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // In a real implementation, this would change and play the video
        const thumbTitle = thumb.querySelector('.thumb-title').textContent.trim();
        alert(`Video would change to "${thumbTitle}" and play in the real implementation.`);
    });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll('.news-card, .social-post, .download-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Language Toggle
const languageToggle = document.querySelectorAll('.language-toggle a');

languageToggle.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        languageToggle.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // In a real implementation, this would change the language
        alert(`Language would change to: ${link.textContent}`);
    });
});

// Download buttons interaction
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const fileName = e.currentTarget.parentElement.querySelector('h4').textContent.trim();
        alert(`Downloading ${fileName} - This would be a real download in the live implementation.`);

        // Animation effect
        const icon = e.currentTarget.querySelector('i');
        icon.className = 'fas fa-check';
        setTimeout(() => {
            icon.className = 'fas fa-download';
        }, 1500);
    });
});

// Handle touch events for mobile
document.addEventListener('touchstart', () => { }, { passive: true });
