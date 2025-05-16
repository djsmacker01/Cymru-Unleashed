

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

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll with Intersection Observer
    const animateElements = document.querySelectorAll('.activity-home-card, .about-home-image, .legacy-home-image');

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

    // Countdown Timer
    const countdownDate = new Date("July 2, 2025 00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h3>UEFA Women's Euro 2025 Has Begun!</h3>";
        }
    };

    // Update countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

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

    // Preload images for better performance
    window.addEventListener('load', () => {
        const imagesToPreload = document.querySelectorAll('img[data-src]');
        imagesToPreload.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.removeAttribute('data-src');
            };
        });
    });

    // Handle touch events for mobile
    document.addEventListener('touchstart', () => { }, { passive: true });
