
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

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll('.team-member, .value-card');

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

// Handle touch events for mobile
document.addEventListener('touchstart', () => { }, { passive: true });
