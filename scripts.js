// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Category filter
const categoryButtons = document.querySelectorAll('.category-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// Set 'All Photos' as active by default
document.querySelector('.category-btn[data-category="all"]').classList.add('active');

// Lightbox functionality
let currentImageIndex = 0;
const images = Array.from(document.querySelectorAll('.gallery-item img'));

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxMetaInfo = document.getElementById('lightbox-meta-info');
    
    // Find the parent gallery item to get metadata
    const galleryItem = imgElement.closest('.gallery-item');
    currentImageIndex = images.indexOf(imgElement);
    
    // Set image and caption
    lightboxImg.src = imgElement.src;
    lightboxCaption.textContent = imgElement.alt;
    
    // Get and set meta information if available
    if (galleryItem) {
        const metaInfo = galleryItem.querySelector('.meta-info');
        if (metaInfo) {
            const location = metaInfo.querySelector('.location')?.textContent || '';
            const camera = metaInfo.querySelector('.camera')?.textContent || '';
            lightboxMetaInfo.textContent = `${location} • ${camera}`;
        } else {
            lightboxMetaInfo.textContent = '';
        }
    }
    
    // Show lightbox with animation
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add subtle zoom effect to the image
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1.02)';
    }, 100);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Reset image transform
    lightboxImg.style.transform = 'scale(1)';
    
    // Fade out effect
    lightbox.style.opacity = '0';
    
    // Hide lightbox after animation
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightbox.style.opacity = '1';
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxMetaInfo = document.getElementById('lightbox-meta-info');
    const currentImg = images[currentImageIndex];
    const galleryItem = currentImg.closest('.gallery-item');
    
    // Reset and then apply scale for transition effect
    lightboxImg.style.transform = 'scale(0.98)';
    
    // Update image and caption
    lightboxImg.src = currentImg.src;
    lightboxCaption.textContent = currentImg.alt;
    
    // Update meta information
    if (galleryItem) {
        const metaInfo = galleryItem.querySelector('.meta-info');
        if (metaInfo) {
            const location = metaInfo.querySelector('.location')?.textContent || '';
            const camera = metaInfo.querySelector('.camera')?.textContent || '';
            lightboxMetaInfo.textContent = `${location} • ${camera}`;
        } else {
            lightboxMetaInfo.textContent = '';
        }
    }
    
    // Apply scale effect after a short delay
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1.02)';
    }, 100);
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});