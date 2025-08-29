// Initialize Lenis for smooth scrolling
let lenis;

// Track if animations have been initialized
let animationsInitialized = false;

// Use the isMobile variable from scripts.js instead of declaring it here

// Wait for all dependencies to be loaded
function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDependencies = () => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof Lenis !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkDependencies, 100);
            }
        };
        checkDependencies();
    });
}

// Initialize GSAP animations
function initAnimations() {
    // Prevent multiple initializations
    if (animationsInitialized) return;
    animationsInitialized = true;
    
    // console.log('Initializing animations');
    
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
    
    // Gallery items stagger animation - only trigger once to prevent refresh issues
    const gallerySection = document.getElementById('gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (gallerySection && galleryItems.length > 0) {
        try {
            gsap.from('.gallery-item', {
                scrollTrigger: {
                    trigger: '#gallery',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse', // Changed to prevent re-triggering
                    once: true // Ensure it only triggers once
                },
                opacity: 0.7,
                y: 15,
                stagger: 0.1, // Increased from 0.05 for better performance
                duration: 0.4, // Reduced from 0.5
                ease: 'power1.out',
                onComplete: function() {
                    // Mark items as animated to prevent re-animation
                    galleryItems.forEach(item => {
                        item.classList.add('gsap-animated');
                    });
                }
            });
        } catch (error) {
            console.warn('GSAP gallery animation failed:', error);
            // Fallback: manually add gsap-animated class to prevent future issues
            galleryItems.forEach(item => {
                item.classList.add('gsap-animated');
            });
        }
    }
    
    // Equipment section animation - simplified
    gsap.from('#equipment .bg-white', {
        scrollTrigger: {
            trigger: '#equipment',
            start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.3, // Increased from 0.2
        duration: 0.6, // Reduced from 0.8
        ease: 'power2.out' // Simplified from back.out
    });
    
    // Purchase section animation - simplified
    gsap.from('#purchase .text-center', {
        scrollTrigger: {
            trigger: '#purchase',
            start: 'top 80%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8, // Reduced from 1
        ease: 'power2.out' // Simplified from power3.out
    });
}

// Add the missing initButtonEffects function before initSmoothScrolling

// Initialize button hover effects
function initButtonEffects() {
    // Use CSS transitions instead of GSAP for better performance
    // The hover effects are now handled by CSS classes
    // console.log('Button hover effects initialized (CSS-based)');
}

// Initialize Lenis smooth scrolling
function initSmoothScrolling() {
    lenis = new Lenis({
        duration: 0.8, // Reduced from 1 for better performance
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Reduced from 1 for smoother scrolling
        smoothTouch: false,
        touchMultiplier: 1.5, // Reduced from 2
        infinite: false,
    });
    
    // Integrate Lenis with GSAP ScrollTrigger - optimized for mobile
    lenis.on('scroll', (e) => {
        // Only update ScrollTrigger on desktop or when necessary
        if (!isMobile || e.delta > 10) { // Only update on significant scroll on mobile
            ScrollTrigger.update();
        }
    });
    
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
    const initializeAfterPreloader = async () => {
        // Prevent multiple initializations
        if (animationsInitialized) {
            // console.log('Animations already initialized, skipping');
            return;
        }
        
        // console.log('Initializing Lenis and animations after preloader');
        
        // Wait for GSAP, ScrollTrigger, and Lenis to be loaded
        await waitForDependencies();

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
                // console.log('Fallback initialization of animations');
                initializeAfterPreloader();
            }
        }, 8500);
    }
});