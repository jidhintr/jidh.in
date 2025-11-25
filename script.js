// ===================================
// Navigation Toggle
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// ===================================
// Scroll Progress Indicator
// ===================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Animated Counter for Hero Metrics
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation for metrics
            if (entry.target.classList.contains('metric')) {
                const valueElement = entry.target.querySelector('.metric-value');
                const target = parseInt(valueElement.getAttribute('data-target'));
                animateCounter(valueElement, target);
            }
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    animateOnScroll.observe(item);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    animateOnScroll.observe(category);
});

// Observe philosophy cards
document.querySelectorAll('.philosophy-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe metrics (for counter animation)
document.querySelectorAll('.metric').forEach(metric => {
    animateOnScroll.observe(metric);
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Parallax Effect for Hero Background
// ===================================
function parallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    const scrolled = window.scrollY;

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

window.addEventListener('scroll', parallaxEffect);

// ===================================
// Add Hover Effect to Skill Tags
// ===================================
document.querySelectorAll('.skill-tag, .tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Update scroll progress on load
    updateScrollProgress();

    // Update active nav link on load
    updateActiveNavLink();
});

// ===================================
// Performance Optimization
// ===================================
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Optimize scroll events
window.addEventListener('scroll', () => {
    requestTick(() => {
        updateScrollProgress();
        updateActiveNavLink();
        parallaxEffect();
    });
});

// ===================================
// Add Loading State
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
