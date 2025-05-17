
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

// Form Tabs
const tabButtons = document.querySelectorAll('.form-tab');
const tabContents = document.querySelectorAll('.form-content');
const optionButtons = document.querySelectorAll('.form-tab-btn');

// Show tab content based on ID
const showTabContent = (tabId) => {
    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab
    document.querySelector(`.form-tab[data-tab="${tabId}"]`).classList.add('active');

    // Show corresponding content
    document.getElementById(`${tabId}-content`).classList.add('active');

    // Scroll to the form with a slight delay for animation
    setTimeout(() => {
        document.querySelector('.form-tabs').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
};

// Tab button click
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        showTabContent(tabId);
    });
});

// Option button click
optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        showTabContent(tabId);
    });
});

// Form Submissions with validation feedback
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                // Add error message
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    errorMessage.style.color = 'var(--primary)';
                    errorMessage.style.fontSize = '0.8rem';
                    errorMessage.style.marginTop = '5px';
                    field.insertAdjacentElement('afterend', errorMessage);
                }
            } else {
                field.classList.remove('invalid');
                // Remove error message if exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });

        // Clear error on input
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                field.classList.remove('invalid');
                // Remove error message if exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
                // Add error message if not exists
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    errorMessage.style.color = 'var(--primary)';
                    errorMessage.style.fontSize = '0.8rem';
                    errorMessage.style.marginTop = '5px';
                    field.insertAdjacentElement('afterend', errorMessage);
                }
            } else {
                field.classList.remove('invalid');
                // Remove error message if exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

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
            const firstError = form.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        // Get the height of the content
        const contentHeight = item.querySelector('.accordion-text').offsetHeight;

        // Toggle active class
        item.classList.toggle('active');

        // Set max-height to enable animation
        if (item.classList.contains('active')) {
            content.style.maxHeight = contentHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});

// Animation on scroll with Intersection Observer
const animateElements = document.querySelectorAll('.option-card, .testimonial-card, .accordion-item');

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

// Check URL hash for direct tab access
window.addEventListener('load', () => {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const validTabs = ['volunteer', 'school', 'partner'];

        if (validTabs.includes(hash)) {
            showTabContent(hash);
        }
    }
});

// Handle touch events for mobile
document.addEventListener('touchstart', () => { }, { passive: true });
