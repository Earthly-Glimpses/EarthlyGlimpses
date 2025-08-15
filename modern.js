// Initialize Lenis for smooth scrolling
let lenis;

// Track if animations have been initialized
let animationsInitialized = false;

// Initialize GSAP animations
function initAnimations() {
    // Prevent multiple initializations
    if (animationsInitialized) return;
    animationsInitialized = true;
    
    console.log('Initializing animations');
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Ensure gallery items are visible by default
    gsap.set('.gallery-item', {opacity: 1});
    
    // Hero section animations - delay start until after preloader
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2 // Small delay after preloader disappears
    });
    
    // Gallery items stagger animation
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '#gallery',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0.5,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power1.out'
    });
    
    // About section animation
    gsap.from('#about img', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('#about .md\\:w-1\\/2:last-child', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Equipment section animation
    gsap.from('#equipment .bg-white', {
        scrollTrigger: {
            trigger: '#equipment',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
    
    // Purchase section animation
    gsap.from('#purchase .max-w-3xl', {
        scrollTrigger: {
            trigger: '#purchase',
            start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Contact section animation
    gsap.from('#contact .md\\:w-1\\/2', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
        },
        x: -30,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// Add the missing initButtonEffects function before initSmoothScrolling

// Initialize button hover effects
function initButtonEffects() {
    // Select all buttons with hover effects
    const buttons = document.querySelectorAll('.btn, .button, [class*="btn-"]');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });
    
    console.log('Button hover effects initialized');
}

// Initialize Lenis smooth scrolling
function initSmoothScrolling() {
    lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    
    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for preloader to be removed before initializing animations
    const initializeAfterPreloader = () => {
        // Prevent multiple initializations
        if (animationsInitialized) {
            console.log('Animations already initialized, skipping');
            return;
        }
        
        console.log('Initializing Lenis and animations after preloader');
        
        // Initialize smooth scrolling with Lenis
        initSmoothScrolling();
        
        // Initialize GSAP animations
        initAnimations();
        
        // Initialize button hover effects
        initButtonEffects();
    };
    
    // Check if preloader is already gone
    const preloader = document.getElementById('preloader');
    if (!preloader || preloader.style.display === 'none') {
        // Preloader already removed, initialize immediately
        initializeAfterPreloader();
    } else {
        // Listen for the preloaderRemoved event
        document.addEventListener('preloaderRemoved', initializeAfterPreloader, { once: true });
        
        // Fallback - initialize after 8.5 seconds even if preloader event doesn't fire
        setTimeout(() => {
            if (!animationsInitialized) {
                console.log('Fallback initialization of animations');
                initializeAfterPreloader();
            }
        }, 8500);
    }
});