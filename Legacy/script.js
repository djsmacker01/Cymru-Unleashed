
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

// Testimonial Slider with Touch Support
const track = document.getElementById('stories-track');
const dots = document.querySelectorAll('.slider-dot');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
const slides = Array.from(track.children);
let startX, moveX;
let isMouseDown = false;

// Set initial position
const setSliderPosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
};

// Next button click
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    setSliderPosition();
});

// Previous button click
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    setSliderPosition();
});

// Dot click
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        setSliderPosition();
    });
});

// Touch events for slider
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isMouseDown = true;
    track.style.transition = 'none';
}, { passive: true });

track.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;
    moveX = e.touches[0].clientX;
    const diff = moveX - startX;
    const move = (diff / window.innerWidth) * 100;
    track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${move}px))`;
}, { passive: true });

track.addEventListener('touchend', () => {
    isMouseDown = false;
    track.style.transition = 'transform 0.5s ease';

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
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    setSliderPosition();
}, 5000);

// Pause auto-slide on interaction
[nextBtn, prevBtn, ...dots].forEach(element => {
    element.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        // Restart auto-slide after 10 seconds of inactivity
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            setSliderPosition();
        }, 5000);
    });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll('.legacy-pillar, .partner-card');

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
