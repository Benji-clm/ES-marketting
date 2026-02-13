// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Cards animation
    const cards = document.querySelectorAll('.problem-card, .feature-card, .future-card, .spec-category');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Interactive Zoom for System Architecture Image
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('zoomImageWrapper');
    const image = document.getElementById('architectureImage');
    const lens = document.getElementById('zoomLens');

    if (!wrapper || !image || !lens) return;

    const zoomLevel = 1.5; // Zoom magnification level

    // Mouse enter - show lens
    wrapper.addEventListener('mouseenter', () => {
        lens.classList.add('active');
    });

    // Mouse leave - hide lens
    wrapper.addEventListener('mouseleave', () => {
        lens.classList.remove('active');
    });

    // Mouse move - update lens position and zoom
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Lens dimensions
        const lensWidth = lens.offsetWidth;
        const lensHeight = lens.offsetHeight;

        // Position lens centered on cursor
        let lensX = x - lensWidth / 2;
        let lensY = y - lensHeight / 2;

        // Keep lens within image bounds
        lensX = Math.max(0, Math.min(lensX, rect.width - lensWidth));
        lensY = Math.max(0, Math.min(lensY, rect.height - lensHeight));

        // Position the lens
        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';

        // Calculate background position for zoom effect
        const bgX = -(x * zoomLevel - lensWidth / 2);
        const bgY = -(y * zoomLevel - lensHeight / 2);

        // Set zoomed background image
        lens.style.backgroundImage = `url('${image.src}')`;
        lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
        lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    });
});

// Scalability Step Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const stepCards = document.querySelectorAll('.scalability-step-card');

    if (stepCards.length === 0) return;

    stepCards.forEach(card => {
        // Click to toggle active state
        card.addEventListener('click', () => {
            stepCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });

        // Keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stepCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            }
        });
    });

    // Auto-highlight sequence on section scroll into view
    const scalabilitySection = document.getElementById('scalability');
    if (scalabilitySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stepCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            }, 50);
                        }, index * 150);
                    });
                    observer.unobserve(scalabilitySection);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(scalabilitySection);
    }
});
