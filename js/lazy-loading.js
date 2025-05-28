// Lazy Loading Implementation
const lazyLoadOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
};

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target;

            // Handle lazy-loaded images
            if (element.tagName === "IMG" && element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute("data-src");
            }

            // Handle lazy-loaded content sections
            if (element.classList.contains("lazy-content")) {
                element.classList.add("loaded");
            }

            // Handle lazy-loaded videos
            if (element.tagName === "VIDEO" && element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute("data-src");
            }

            // Handle lazy-loaded iframes
            if (element.tagName === "IFRAME" && element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute("data-src");
            }

            // Stop observing the element once it's loaded
            observer.unobserve(element);
        }
    });
}, lazyLoadOptions);

// Initialize lazy loading for all elements
function initializeLazyLoading() {
    // Lazy load images
    document.querySelectorAll("img[data-src]").forEach((img) => {
        lazyLoadObserver.observe(img);
    });

    // Lazy load content sections
    document.querySelectorAll(".lazy-content").forEach((section) => {
        lazyLoadObserver.observe(section);
    });

    // Lazy load videos
    document.querySelectorAll("video[data-src]").forEach((video) => {
        lazyLoadObserver.observe(video);
    });

    // Lazy load iframes
    document.querySelectorAll("iframe[data-src]").forEach((iframe) => {
        lazyLoadObserver.observe(iframe);
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeLazyLoading);

// Re-initialize when dynamic content is added
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            initializeLazyLoading();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
}); 