// Enhanced Preloader functionality
window.addEventListener('DOMContentLoaded', function() {
    // Get all images on the page
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = images.length;
    const loadingText = document.querySelector('.loading-text');
    const preloader = document.getElementById('preloader');
    const loader = document.querySelector('.loader');
    
    // Add animation class to preloader
    setTimeout(() => {
        if (preloader) preloader.classList.add('preloader-active');
        
        // Create floating particles
        createFloatingParticles();
    }, 300);
    
    // Function to create floating particles
    function createFloatingParticles() {
        if (!preloader) return;
        
        // Create 12 particles with random positions
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            
            // Random size
            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random animation delay and duration
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            preloader.appendChild(particle);
        }
    }
    
    // If there are no images, hide preloader after minimum display time
    if (totalImages === 0) {
        setTimeout(hidePreloader, 1500);
        return;
    }
    
    // Function to hide preloader with animation
    function hidePreloader() {
        if (loadingText) loadingText.textContent = 'Ready to explore!';
        
        // Add completion class for final animation
        if (preloader) preloader.classList.add('preloader-complete');
        if (loader) loader.classList.add('loader-complete');
        
        // Start fade out after showing completion state
        setTimeout(function() {
            if (preloader) preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            // Remove preloader from DOM after animation completes
            setTimeout(function() {
                if (preloader) preloader.style.display = 'none';
            }, 800);
        }, 1000);
    }
    
    // Load event for each image
    images.forEach(img => {
        // Check if image is already cached
        if (img.complete) {
            setTimeout(imageLoaded, 100); // Small delay for smoother progress animation
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Also count errors as loaded
        }
    });
    
    // Function to track when each image loads
    function imageLoaded() {
        imagesLoaded++;
        
        // Update loading text with percentage and loading messages
        if (loadingText) {
            const percent = Math.round((imagesLoaded / totalImages) * 100);
            const loadingMessages = [
                'Loading amazing photos',
                'Preparing your visual journey',
                'Almost there',
                'Finalizing your experience'
            ];
            
            // Select message based on progress
            let messageIndex = 0;
            if (percent > 25) messageIndex = 1;
            if (percent > 50) messageIndex = 2;
            if (percent > 75) messageIndex = 3;
            
            loadingText.textContent = `${loadingMessages[messageIndex]}... ${percent}%`;
        }
        
        if (imagesLoaded >= totalImages) {
            // All images loaded, hide preloader with a small delay
            setTimeout(hidePreloader, 800);
        }
    }
    
    // Fallback - hide preloader after 6 seconds even if not all images have loaded
    setTimeout(function() {
        if (preloader && preloader.style.display !== 'none') {
            if (loadingText) loadingText.textContent = 'Ready to explore!';
            setTimeout(hidePreloader, 500);
        }
    }, 6000);
});

// Also hide preloader on window load as a fallback
window.addEventListener('load', function() {
    setTimeout(function() {
        if (document.getElementById('preloader').style.display !== 'none') {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 800);
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Initialize gallery with limited photos per category
function initializeGallery() {
    const categories = ['wildlife', 'flowers', 'scenery', 'monuments', 'lunar', 'others'];
    const rowsToShowInitially = 2; // Show only 2 rows initially
    
    // Calculate items per row based on actual layout
    function calculateItemsPerRow() {
        // Get the gallery container
        const galleryContainer = document.querySelector('.grid');
        if (!galleryContainer) return 4; // Default fallback
        
        // Get all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return 4; // Default fallback
        
        // Store original display states
        const originalDisplayStates = [];
        galleryItems.forEach(item => {
            originalDisplayStates.push(item.style.display);
            item.style.display = 'block';
        });
        
        // Get the width of the container and count items in the first row
        const containerWidth = galleryContainer.offsetWidth;
        const firstItemTop = galleryItems[0].getBoundingClientRect().top;
        let itemsInFirstRow = 0;
        
        // Count items in the first row by checking their vertical position
        for (let i = 0; i < galleryItems.length; i++) {
            if (Math.abs(galleryItems[i].getBoundingClientRect().top - firstItemTop) < 5) {
                itemsInFirstRow++;
            } else {
                break; // We've moved to the next row
            }
        }
        
        // Restore original display states
        galleryItems.forEach((item, index) => {
            item.style.display = originalDisplayStates[index];
        });
        
        return Math.max(1, itemsInFirstRow); // Ensure at least 1 item per row
    }
    
    const itemsPerRow = calculateItemsPerRow();
    console.log('Items per row:', itemsPerRow);
    
    // Process each category
    categories.forEach(category => {
        const categoryItems = document.querySelectorAll(`.gallery-item[data-category="${category}"]`);
        
        // If this category has more than the initial number to show
        if (categoryItems.length > rowsToShowInitially * itemsPerRow) {
            // Show initial items and hide the rest
            categoryItems.forEach((item, index) => {
                if (index < rowsToShowInitially * itemsPerRow) {
                    item.style.display = 'block';
                    item.classList.remove('hidden-photo');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden-photo');
                }
            });
        } else {
            // Show all items if there are fewer than the initial count
            categoryItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('hidden-photo');
            });
        }
    });
    
    // Also handle the 'all' category
    const allItems = document.querySelectorAll('.gallery-item');
    const activeCategory = document.querySelector('.category-btn.active')?.getAttribute('data-category') || 'all';
    
    // Only process 'all' category if it's currently active
    if (activeCategory === 'all') {
        // If there are more items than should be shown initially
        if (allItems.length > rowsToShowInitially * itemsPerRow) {
            // Show initial items and hide the rest
            allItems.forEach((item, index) => {
                if (index < rowsToShowInitially * itemsPerRow) {
                    item.style.display = 'block';
                    item.classList.remove('hidden-photo');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden-photo');
                }
            });
            
            // Show the load more button
            const loadMoreButton = document.querySelector('.text-center.mt-12 button');
            if (loadMoreButton) {
                loadMoreButton.style.display = 'inline-flex';
            }
        } else {
            // Show all items if there are fewer than the initial count
            allItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('hidden-photo');
            });
            
            // Hide the load more button
            const loadMoreButton = document.querySelector('.text-center.mt-12 button');
            if (loadMoreButton) {
                loadMoreButton.style.display = 'none';
            }
        }
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', initializeGallery);

// Category filter
const categoryButtons = document.querySelectorAll('.category-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Function to calculate items per row based on actual layout
function calculateItemsPerRow() {
    // Get the gallery container
    const galleryContainer = document.querySelector('.grid');
    if (!galleryContainer) return 4; // Default fallback
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return 4; // Default fallback
    
    // Store original display states
    const originalDisplayStates = [];
    galleryItems.forEach(item => {
        originalDisplayStates.push(item.style.display);
        item.style.display = 'block';
    });
    
    // Get the width of the container and count items in the first row
    const containerWidth = galleryContainer.offsetWidth;
    const firstItemTop = galleryItems[0].getBoundingClientRect().top;
    let itemsInFirstRow = 0;
    
    // Count items in the first row by checking their vertical position
    for (let i = 0; i < galleryItems.length; i++) {
        if (Math.abs(galleryItems[i].getBoundingClientRect().top - firstItemTop) < 5) {
            itemsInFirstRow++;
        } else {
            break; // We've moved to the next row
        }
    }
    
    // Restore original display states
    galleryItems.forEach((item, index) => {
        item.style.display = originalDisplayStates[index];
    });
    
    return Math.max(1, itemsInFirstRow); // Ensure at least 1 item per row
}

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Reset all items first
        galleryItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        });
        
        // Show only the initial items for the selected category
        const selectedItems = document.querySelectorAll(
            category === 'all' 
                ? '.gallery-item' 
                : `.gallery-item[data-category="${category}"]`
        );
        
        const rowsToShowInitially = 2;
        const itemsPerRow = calculateItemsPerRow();
        
        selectedItems.forEach((item, index) => {
            if (index < rowsToShowInitially * itemsPerRow) {
                item.style.display = 'block';
                item.classList.add('fade-in');
                item.classList.remove('hidden-photo');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden-photo');
            }
        });
        
        // Show or hide the load more button based on whether there are more items
        const loadMoreButton = document.querySelector('.text-center.mt-12 button');
        if (selectedItems.length > rowsToShowInitially * itemsPerRow) {
            loadMoreButton.style.display = 'inline-flex';
        } else {
            loadMoreButton.style.display = 'none';
        }
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

// Load More Photos button functionality
document.querySelector('.text-center.mt-12 button').addEventListener('click', function() {
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
    
    // Get all hidden photos for the active category
    const hiddenPhotos = document.querySelectorAll(
        activeCategory === 'all' 
            ? '.gallery-item.hidden-photo' 
            : `.gallery-item[data-category="${activeCategory}"].hidden-photo`
    );
    
    // Show all remaining photos
    hiddenPhotos.forEach(photo => {
        photo.style.display = 'block';
        photo.classList.add('fade-in');
        photo.classList.remove('hidden-photo');
    });
    
    // Always hide the load more button after clicking
    this.style.display = 'none';
});

// Recalculate items per row when window is resized
window.addEventListener('resize', function() {
    // Debounce the resize event to avoid excessive calculations
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function() {
        // Recalculate the layout from scratch
        initializeGallery();
        
        // Re-trigger the active category filter to refresh the layout
        const activeButton = document.querySelector('.category-btn.active');
        if (activeButton) {
            activeButton.click();
        }
    }, 250);
});