// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll direction
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
}

window.addEventListener('scroll', updateNavbar);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.stat-item, .step, .result-item, .analysis, .algorithm-box, .technique-explanation'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
}

window.addEventListener('scroll', updateParallax);

// Progress Indicator
function createProgressIndicator() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--russian-red);
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = `${scrolled}%`;
        
        // Check if navbar is hidden and adjust progress bar position
        const navbar = document.querySelector('.navbar');
        const navbarTransform = window.getComputedStyle(navbar).transform;
        
        if (navbarTransform === 'matrix(1, 0, 0, 1, 0, -70)' || navbar.style.transform === 'translateY(-100%)') {
            // Navbar is hidden, move progress bar to top
            progress.style.top = '0px';
        } else {
            // Navbar is visible, keep progress bar below it
            progress.style.top = '70px';
        }
    });
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                
                if (finalNumber === '∞') return; // Skip infinity symbol
                
                let current = 0;
                const increment = 1;
                const duration = 2000;
                const stepTime = duration / parseInt(finalNumber);
                
                const timer = setInterval(() => {
                    current += increment;
                    target.textContent = current;
                    
                    if (current >= parseInt(finalNumber)) {
                        target.textContent = finalNumber;
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Image Modal Functionality
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    
    // Add click event to all project images
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            
            // Get caption text from the image's caption
            const captionElement = img.parentElement.querySelector('.image-caption p');
            if (captionElement) {
                modalCaption.innerHTML = captionElement.innerHTML;
            } else {
                modalCaption.textContent = img.alt || 'Colorized Image';
            }
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Image Hover Effects for Result Gallery
function addImageInteractions() {
    const resultItems = document.querySelectorAll('.result-item');
    
    resultItems.forEach(item => {
        const image = item.querySelector('.project-image');
        const caption = item.querySelector('.image-caption');
        
        if (image && caption) {
            item.addEventListener('mouseenter', () => {
                if (!image.style.transform.includes('scale(1.02)')) {
                    image.style.transform = 'scale(1.05)';
                }
                caption.style.background = 'linear-gradient(transparent, rgba(220, 20, 60, 0.9))';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                caption.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))';
            });
        }
    });
}

// Color Channel Visualization (Educational Enhancement)
function createColorChannelDemo() {
    // This could be expanded to show an interactive demo of how RGB channels combine
    // For now, we'll add a subtle color-changing effect to the hero background
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            // Subtle color shift to simulate the RGB nature of the project
            const brightness = 0.1 + 0.05 * Math.sin(hue * Math.PI / 180);
            heroBackground.style.filter = `brightness(${1 + brightness}) hue-rotate(${hue * 0.1}deg)`;
        }
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createProgressIndicator();
    animateCounters();
    addImageInteractions();
    initializeImageModal();
    createColorChannelDemo();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem 0;
        box-shadow: var(--shadow-soft);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-soft);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-image {
        transition: transform 0.3s ease;
    }
    
    .image-caption {
        transition: background 0.3s ease;
    }
    
    .algorithm-box:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-medium);
    }
    
    .technique-explanation:hover {
        border-left-color: var(--russian-red);
    }
`;
document.head.appendChild(style);
