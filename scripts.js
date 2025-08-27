// Enhanced Preloader functionality
// Initialize preloader state tracking
let preloaderRemoved = false;
let assetsLoaded = false;

// Ensure only one preloader initialization happens
let preloaderInitialized = false;

// Theme initialization is now handled in theme.js

// Immediately initialize preloader to prevent content flash
(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloaderInitialized) {
        preloaderInitialized = true;
        
        // Force the preloader to inherit the current theme before displaying
        const isDarkMode = document.documentElement.classList.contains('dark');
        if (isDarkMode) {
            preloader.classList.add('dark-mode-preloader');
        }
        
        // Set display properties immediately
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        document.body.classList.add('loading');
        
        // console.log('Preloader initialized immediately with theme:', isDarkMode ? 'dark' : 'light');
    }
})();

// Function to download wallpapers
function downloadWallpaper(imgElement) {
    if (!imgElement || !imgElement.src) {
        console.error('No image source found');
        return;
    }
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imgElement.src;
    
    // Extract filename from URL or use default
    const urlParts = imgElement.src.split('/');
    const filename = urlParts[urlParts.length - 1] || 'wallpaper.jpg';
    
    link.download = filename;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Wallpaper download started!', 'success');
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to hide preloader with animation - moved to global scope
function hidePreloader() {
    // console.log('hidePreloader called');
    
    // Prevent multiple calls to hidePreloader
    if (preloaderRemoved) {
        // console.log('Preloader already removed, ignoring call');
        return;
    }
    
    // Set flag to prevent multiple calls
    preloaderRemoved = true;
    
    const preloader = document.getElementById('preloader');
    
    // Immediately remove loading classes to ensure content is visible
    document.body.classList.remove('loading');
    document.documentElement.classList.remove('js-loading');
    
    // Force all content to be visible immediately with proper z-index
    document.querySelectorAll('body > *:not(#preloader)').forEach(el => {
        el.style.opacity = '1';
        el.style.position = 'relative';
        el.style.zIndex = '1';
    });
    
    // Fix layout immediately
    if (!window.layoutFixed) {
        fixGalleryLayout();
        window.layoutFixed = true;
    }
    
    if (!preloader) {
        // console.log('Preloader element not found, may have been removed already');
        // Signal that the preloader has been fully removed
        document.dispatchEvent(new Event('preloaderRemoved'));
        return;
    }
    
    // console.log('Starting preloader removal animation sequence');
    
    const loader = document.querySelector('.loader');
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) loadingText.textContent = 'Ready to explore!';
    
    // Add completion class for final animation
    preloader.classList.add('preloader-complete');
    if (loader) loader.classList.add('loader-complete');
    
    // Immediately start removing the preloader
    preloader.classList.add('fade-out');
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    preloader.style.zIndex = '-1';
    
    // Completely remove from DOM to ensure it doesn't interfere with content
    setTimeout(() => {
        if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
            // console.log('Preloader completely removed from DOM');
        }
        
        // Signal that the preloader has been fully removed
        document.dispatchEvent(new Event('preloaderRemoved'));
        // console.log('Preloader fully removed and content revealed');
        
        // Initialize any deferred functionality that depends on preloader removal
        if (typeof initAnimations === 'function' && !animationsInitialized) {
            // console.log('Initializing animations after preloader removal');
            initAnimations();
        }
    }, 100);
}

window.addEventListener('DOMContentLoaded', function() {
    // Get all images on the page
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = images.length;
    const loadingText = document.querySelector('.loading-text');
    const preloader = document.getElementById('preloader');
    const loader = document.querySelector('.loader');
    
            // Add animation class to preloader if it exists
        if (preloader) {
            // Add animation class to preloader immediately
            preloader.classList.add('preloader-active');
            // Add a subtle entrance animation
            preloader.style.animation = 'preloader-entrance 0.8s ease-out';
            
            // console.log('Preloader animations initialized');
        }
    
    // Create floating particles with enhanced visuals
    createFloatingParticles();
    
    // Add 3D perspective effect to loader
    if (loader) {
        loader.style.transform = 'perspective(1000px) rotateX(10deg)';
        setTimeout(() => {
            loader.style.transform = 'perspective(1000px) rotateX(0deg)';
            loader.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 500);
    }
    
    // Function to create floating particles with enhanced visuals
    function createFloatingParticles() {
        if (!preloader) return;
        
        // Create more particles with varied shapes and animations
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            
            // Random size with more variation
            const size = Math.random() * 12 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position across the entire screen
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random opacity and blur for depth effect
            const opacity = Math.random() * 0.5 + 0.1;
            particle.style.opacity = opacity;
            
            // Random blur for depth perception
            const blur = Math.random() * 2;
            particle.style.filter = `blur(${blur}px)`;
            
            // Random border-radius for varied shapes (circle to rounded square)
            const borderRadius = Math.random() * 50 + 50;
            particle.style.borderRadius = `${borderRadius}%`;
            
            // Random animation delay and duration
            const delay = Math.random() * 5;
            const duration = Math.random() * 15 + 5;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation direction
            const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            particle.style.animationDirection = randomDirection;
            
            // Random background color based on theme colors
            const hue = Math.random() * 60 - 30; // +/- 30 degrees from base color
            particle.style.background = `linear-gradient(135deg, 
                hsl(${240 + hue}, 70%, 60%), 
                hsl(${280 + hue}, 70%, 60%))`;
            
            preloader.appendChild(particle);
        }
    }
    
    // If there are no images, hide preloader after minimum display time
    if (totalImages === 0) {
        setTimeout(() => {
            assetsLoaded = true;
            if (!preloaderRemoved) {
                hidePreloader();
            }
        }, 1500);
        return;
    }
    
    // Load event for each image
    // Process all images
    {

        // Process all images
        images.forEach(img => {
            // Check if image is already cached
            if (img.complete) {
                setTimeout(imageLoaded, 100); // Small delay for smoother progress animation
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded); // Also count errors as loaded
            }
        });
    }
    
    // Function to track when each image loads
    function imageLoaded() {
        imagesLoaded++;
        
        // Update loading text with percentage and loading messages
        if (loadingText) {
            const percent = Math.round((imagesLoaded / totalImages) * 100);
            const loadingMessages = [
                'Loading amazing photos',
                'Preparing your visual journey',
                'Processing your collection',
                'Optimizing display quality',
                'Almost there',
                'Arranging your gallery',
                'Finalizing your experience'
            ];
            
            // Select message based on progress with more granularity
            let messageIndex = 0;
            if (percent > 15) messageIndex = 1;
            if (percent > 30) messageIndex = 2;
            if (percent > 45) messageIndex = 3;
            if (percent > 60) messageIndex = 4;
            if (percent > 75) messageIndex = 5;
            if (percent > 90) messageIndex = 6;
            
            // Apply text animation
            loadingText.style.opacity = '0.8';
            setTimeout(() => {
                loadingText.textContent = `${loadingMessages[messageIndex]}... ${percent}%`;
                loadingText.style.opacity = '1';
                // Add subtle pulse effect
                loadingText.classList.add('pulse-text');
                setTimeout(() => loadingText.classList.remove('pulse-text'), 300);
            }, 150);
        }
        
        // Log progress for debugging
        // console.log(`Image loading progress: ${imagesLoaded}/${totalImages} (${Math.round((imagesLoaded / totalImages) * 100)}%)`);
        
        if (imagesLoaded >= totalImages) {
            // All images loaded, mark assets as loaded
            assetsLoaded = true;
            // console.log('All images loaded successfully');
            
            // Hide preloader with a small delay if not already hidden
            if (!preloaderRemoved) {
                // Ensure we're not removing the preloader too early
                setTimeout(() => {
                    // Double-check that we're ready to remove the preloader
                    const allImagesComplete = Array.from(document.querySelectorAll('img')).every(img => {
                        // Check if image is complete and has dimensions
                        const isComplete = img.complete;
                        const hasDimensions = img.naturalWidth > 0;
                        
                        // Log problematic images for debugging
                        if (!isComplete || !hasDimensions) {
                            console.warn('Problematic image:', img.src, 'Complete:', isComplete, 'Has dimensions:', hasDimensions);
                        }
                        
                        return isComplete && hasDimensions;
                    });
                    
                    if (allImagesComplete && !preloaderRemoved) {
                        // console.log('Verified all images are complete, removing preloader');
                        hidePreloader();
                        
                        // Fix layout after all images are loaded
                        if (!window.layoutFixed) {
                            fixGalleryLayout();
                            window.layoutFixed = true;
                        }
                    } else if (!preloaderRemoved) {
                        // console.log('Some images still loading despite counter completion, forcing preloader removal');
                        // Force remove preloader after a short delay
                        setTimeout(() => {
                            if (!preloaderRemoved) {
                                hidePreloader();
                            }
                        }, 500);
                    }
                }, 800);
            }
        }
    }
    
    // Diagnostic check - log warning if preloader is still active after 5 seconds
    // This doesn't force remove the preloader but provides diagnostic information
    setTimeout(function() {
        if (!preloaderRemoved) {
            // console.log('Diagnostic check: Preloader still active after 5 seconds');
            // console.log(`Image loading status: ${imagesLoaded}/${totalImages} images loaded`);
            
            // Check for any problematic images that might be causing delays
            const pendingImages = Array.from(document.querySelectorAll('img')).filter(img => !img.complete);
            if (pendingImages.length > 0) {
                // console.log(`Still waiting for ${pendingImages.length} images to complete loading`);
                pendingImages.forEach((img, index) => {
                    if (index < 5) { // Limit logging to first 5 images to avoid console spam
                        // console.log(`Pending image ${index + 1}: ${img.src || 'No src attribute'}`);
                    }
                });
            }
            
            // Force preloader removal after diagnostic check
            // console.log('Forcing preloader removal after diagnostic check');
            hidePreloader();
        }
    }, 5000);
    
    // Fallback safety mechanism - force remove preloader after a maximum time
    // This ensures the site is always usable even if some resources fail to load
    setTimeout(function() {
        if (!preloaderRemoved) {
            // console.log('Emergency fallback: Forcing preloader removal after maximum wait time');
            // Check if any specific resources are still loading
            const pendingImages = Array.from(document.querySelectorAll('img')).filter(img => !img.complete);
            if (pendingImages.length > 0) {
                // console.log(`Abandoning wait for ${pendingImages.length} images that failed to load`);
            }
            
            // Force remove preloader regardless of resource loading state
            hidePreloader();
        }
    }, 8000);

});

// Handle window load event - ensure preloader is removed when all page assets are loaded
window.addEventListener('load', function() {
    // console.log('Window load event triggered');
    // Mark assets as loaded
    assetsLoaded = true;
    
    // Give a small delay to ensure smooth transition and all resources are properly processed
    setTimeout(function() {
        // Only proceed if preloader is still visible and has been initialized
        if (preloaderInitialized && !preloaderRemoved) {
            // console.log('Window load event - forcing preloader removal');
            
            // Use our hidePreloader function for consistency
            hidePreloader();
            
            // Fix layout after window load if not already done
            if (!window.layoutFixed) {
                fixGalleryLayout();
                window.layoutFixed = true;
            }
        } else {
            // console.log('Preloader already removed or not initialized');
        }
    }, 500); // Reduced delay for better user experience
    
    // Ensure any animations or transitions that depend on load are triggered
    document.dispatchEvent(new Event('assetsLoaded'));
});

// Function to filter gallery by category
function filterGallery(category) {
    // Reset all items first
    const galleryItems = document.querySelectorAll('.gallery-item');
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
    
    // Check if there are no images in the selected category
    if (selectedItems.length === 0) {
        // console.log(`No images found for category: ${category}`);
        
        // Remove any existing "no images" message
        const existingMessage = document.querySelector('.no-images-message');
        if (existingMessage) {
            existingMessage.remove();
            // console.log('Removed existing no images message');
        }
        
        // Create and display "no images" message
        const galleryGrid = document.querySelector('.grid');
        if (galleryGrid) {
            const noImagesMessage = document.createElement('div');
            noImagesMessage.className = 'no-images-message col-span-full text-center py-16';
            noImagesMessage.innerHTML = `
                <div class="max-w-md mx-auto">
                    <div class="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                        <i class="fas fa-images"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No images for now</h3>
                    <p class="text-gray-500 dark:text-gray-500">Will be uploaded soon</p>
                </div>
            `;
            
            // Insert the message into the gallery grid
            galleryGrid.appendChild(noImagesMessage);
            // console.log('No images message added to gallery grid');
            
            // Force a reflow to ensure the message is properly positioned
            void galleryGrid.offsetWidth;
            
            // Add fade-in animation using CSS classes
            setTimeout(() => {
                noImagesMessage.classList.add('show');
                // console.log('No images message animation triggered');
            }, 100);
        } else {
            console.error('Gallery grid not found');
        }
        
        // Hide the load more button since there are no images
        const loadMoreButton = document.querySelector('.text-center.mt-12 button');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
        
        return;
    }
    
    // Remove any existing "no images" message if there are images
    const existingMessage = document.querySelector('.no-images-message');
    if (existingMessage) {
        existingMessage.remove();
        // console.log('Removed existing no images message');
    }
    
    const rowsToShowInitially = 2;
    const itemsPerRow = calculateItemsPerRow();
    
    // Apply staggered animation to visible items
    selectedItems.forEach((item, index) => {
        if (index < rowsToShowInitially * itemsPerRow) {
            item.style.display = 'block';
            item.classList.remove('hidden-photo');
            
            // Apply staggered animation with delay based on position
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 80); // 80ms delay between each item
        } else {
            item.style.display = 'none';
            item.classList.add('hidden-photo');
        }
    });
    
    // Show or hide the load more button based on whether there are more items
    const loadMoreButton = document.querySelector('.text-center.mt-12 button');
    if (loadMoreButton) {
        if (selectedItems.length > rowsToShowInitially * itemsPerRow) {
            loadMoreButton.style.display = 'inline-flex';
        } else {
            loadMoreButton.style.display = 'none';
        }
    }
}

// Function to fix gallery layout issues
function fixGalleryLayout() {
    // console.log('Fixing gallery layout...');
    
    // Force a reflow of the gallery grid
    const galleryGrid = document.querySelector('.grid');
    if (galleryGrid) {
        // Get all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Temporarily hide all items and remove fade-in class
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transition = 'none';
            item.classList.remove('fade-in');
        });
        
        // Force a reflow
        void galleryGrid.offsetWidth;
        
        // Reinitialize the gallery
        const activeCategory = document.querySelector('.category-btn.active')?.getAttribute('data-category') || 'all';
        filterGallery(activeCategory); // filterGallery will handle the staggered animation
        
        // Show items with a staggered fade-in for any that weren't handled by filterGallery
        galleryItems.forEach((item, index) => {
            if (item.style.display !== 'none' && !item.classList.contains('fade-in')) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transition = 'opacity 0.3s ease';
                    item.classList.add('fade-in');
                }, index * 50);
            }
        });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        });
    }
});

// Initialize gallery with limited photos per category
function initializeGallery() {
    const categories = ['wildlife', 'flowers', 'scenery', 'monuments', 'lunar', 'others'];
    const rowsToShowInitially = 2; // Show only 2 rows initially
    
    // Flag to track if layout has been fixed after initial load
    window.layoutFixed = false;
    
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
    // console.log('Items per row:', itemsPerRow);
    
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
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    
    // Load More Photos button functionality
    const loadMoreButton = document.querySelector('.text-center.mt-12 button');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            
            // Get all hidden photos for the active category
            const hiddenPhotos = document.querySelectorAll(
                activeCategory === 'all' 
                    ? '.gallery-item.hidden-photo' 
                    : `.gallery-item[data-category="${activeCategory}"].hidden-photo`
            );
            
            // Show all remaining photos with staggered animation
            hiddenPhotos.forEach((photo, index) => {
                photo.style.display = 'block';
                photo.classList.remove('hidden-photo');
                
                // Apply staggered animation with delay based on position
                setTimeout(() => {
                    photo.classList.add('fade-in');
                }, index * 80); // 80ms delay between each item
            });
            
            // Always hide the load more button after clicking
            this.style.display = 'none';
        });
    }
});

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
        // console.log(`Category button clicked: ${category}`);
        
        // Use the filterGallery function to handle the filtering
        filterGallery(category);
    });
});

// Set 'All Photos' as active by default
document.querySelector('.category-btn[data-category="all"]').classList.add('active');

// Handle window resize to fix layout issues
let resizeTimer;
window.addEventListener('resize', function() {
    // Clear the previous timer
    clearTimeout(resizeTimer);
    
    // Set a new timer to avoid excessive recalculations during resize
    resizeTimer = setTimeout(function() {
        // Fix layout after resize completes
        fixGalleryLayout();
    }, 250); // Wait for resize to finish before recalculating
});

// Lightbox functionality
let currentImageIndex = 0;
const images = Array.from(document.querySelectorAll('.gallery-item img'));

// Initialize lightbox properties
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Set initial properties
    lightbox.style.display = 'none';
}

// Call initialization on page load
document.addEventListener('DOMContentLoaded', initializeLightbox);

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const toolbar = document.getElementById('lightbox-toolbar');
    const lightboxMetaInfo = document.getElementById('lightbox-meta-info');
    
    // Find the parent gallery item to get metadata
    const galleryItem = imgElement.closest('.gallery-item');
    if (images && images.length) {
        currentImageIndex = images.indexOf(imgElement);
    } else {
        currentImageIndex = 0;
    }
    
    // Set image and caption
    lightboxImg.src = imgElement.src;
    lightboxCaption.textContent = imgElement.alt;
    
    // Get and set meta information if available
    if (galleryItem) {
        const locationElement = galleryItem.querySelector('p.text-sm.text-gray-600, p.text-sm.text-gray-600.dark\\:text-gray-400');
        const cameraElement = galleryItem.querySelector('span.text-xs.text-gray-500, span.text-xs.text-gray-500.dark\\:text-gray-400');
        
        if (locationElement && cameraElement) {
            // Extract location text (remove the icon and get just the location)
            const locationText = locationElement.textContent.trim();
            const location = locationText.replace(/^.*?•\s*/, '').replace(/^.*?\s/, '').trim();
            
            // Extract camera text (remove the icon and get just the camera model)
            const cameraText = cameraElement.textContent.trim();
            const camera = cameraText.replace(/^.*?•\s*/, '').replace(/^.*?\s/, '').trim();
            
            lightboxMetaInfo.textContent = `${location} • ${camera}`;
        } else {
            lightboxMetaInfo.textContent = '';
        }
    }
    
    // Show lightbox with animation
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus management: move focus to close button when opened
    const closeBtn = document.querySelector('#lightbox .absolute.top-4.right-4 button');
    if (closeBtn && typeof closeBtn.focus === 'function') {
        setTimeout(() => closeBtn.focus(), 0);
    }
    
    // Add subtle zoom effect to the image
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1.02)';
    }, 100);

    // Wire toolbar buttons and show controls initially
    if (toolbar) {
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        if (prevBtn) prevBtn.onclick = () => navigateLightbox(-1);
        if (nextBtn) nextBtn.onclick = () => navigateLightbox(1);
    }

    resetLightboxControlsAutoHide();

    // Initialize gesture navigation
    initLightboxGestures();
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
        // Restore focus to the previously focused element if possible
        const activeCategory = document.querySelector('.category-btn.active');
        if (activeCategory && typeof activeCategory.focus === 'function') {
            setTimeout(() => activeCategory.focus(), 0);
        }
    }, 300);
}

function navigateLightbox(direction) {
    if (!images || images.length === 0) return;
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
    
    // Apply a quick scale down effect
    lightboxImg.style.transform = 'scale(0.98)';
    
    // Update image and caption after a short delay
    setTimeout(() => {
        lightboxImg.src = currentImg.src;
        lightboxCaption.textContent = currentImg.alt;
        
        // Get and set meta information if available
        const galleryItem = currentImg.closest('.gallery-item');
        if (galleryItem) {
            const locationElement = galleryItem.querySelector('p.text-sm.text-gray-600, p.text-sm.text-gray-600.dark\\:text-gray-400');
            const cameraElement = galleryItem.querySelector('span.text-xs.text-gray-500, span.text-xs.text-gray-500.dark\\:text-gray-400');
            
            if (locationElement && cameraElement) {
                // Extract location text (remove the icon and get just the location)
                const locationText = locationElement.textContent.trim();
                const location = locationText.replace(/^.*?•\s*/, '').replace(/^.*?\s/, '').trim();
                
                // Extract camera text (remove the icon and get just the camera model)
                const cameraText = cameraElement.textContent.trim();
                const camera = cameraText.replace(/^.*?•\s*/, '').replace(/^.*?\s/, '').trim();
                
                lightboxMetaInfo.textContent = `${location} • ${camera}`;
            } else {
                lightboxMetaInfo.textContent = '';
            }
        }
        
        // Apply scale up effect after image is updated
        setTimeout(() => {
            lightboxImg.style.transform = 'scale(1.02)';
        }, 50);
    }, 100);

    resetLightboxControlsAutoHide();

    // Preload adjacent images for smoother navigation
    preloadAdjacentImages();
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Reveal controls on activity inside the lightbox
        ['mousemove','mousedown','touchstart','keydown'].forEach(evt => {
            lightbox.addEventListener(evt, () => {
                lightbox.classList.remove('lightbox-controls-hidden');
                resetLightboxControlsAutoHide();
            }, { passive: true });
        });
    }
});

// Auto-hide controls after inactivity
let lightboxControlsTimer;
function resetLightboxControlsAutoHide() {
    clearTimeout(lightboxControlsTimer);
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('lightbox-controls-hidden');
    lightboxControlsTimer = setTimeout(() => {
        lightbox.classList.add('lightbox-controls-hidden');
    }, 2000);
}

// Gesture navigation (touch/mouse/trackpad)
let startX = null;
let isDragging = false;
let lastX = null;
function initLightboxGestures() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lightbox || !img) return;

    const start = (x) => { startX = x; lastX = x; isDragging = true; img.style.transition = 'transform 0.2s ease'; };
    const move = (x) => {
        if (!isDragging || startX === null) return;
        lastX = x;
        const delta = x - startX;
        img.style.transform = `translateX(${delta * 0.08}px) scale(1.02)`;
    };
    const end = () => {
        if (!isDragging || startX === null) return;
        const delta = lastX - startX;
        img.style.transform = 'scale(1.02)';
        isDragging = false; startX = null; lastX = null;
        if (Math.abs(delta) > 40) {
            navigateLightbox(delta < 0 ? 1 : -1);
        }
    };

    // Touch
    lightbox.addEventListener('touchstart', (e) => start(e.touches[0].clientX), { passive: true });
    lightbox.addEventListener('touchmove', (e) => move(e.touches[0].clientX), { passive: true });
    lightbox.addEventListener('touchend', end, { passive: true });

    // Mouse
    lightbox.addEventListener('mousedown', (e) => start(e.clientX));
    lightbox.addEventListener('mousemove', (e) => move(e.clientX));
    lightbox.addEventListener('mouseup', end);
    lightbox.addEventListener('mouseleave', () => { if (isDragging) end(); });

    // Trackpad horizontal scroll
    lightbox.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
            e.preventDefault();
            navigateLightbox(e.deltaX > 0 ? 1 : -1);
        }
    }, { passive: false });
}

// Preload next/prev images
function preloadAdjacentImages() {
    if (!images || images.length === 0) return;
    const indices = [
        (currentImageIndex + 1) % images.length,
        (currentImageIndex - 1 + images.length) % images.length
    ];
    indices.forEach(i => {
        const src = images[i]?.src;
        if (src) {
            const preImg = new Image();
            preImg.src = src;
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        // Simple focus trap: keep focus within the lightbox when open
        const focusable = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl?.focus();
                return;
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl?.focus();
                return;
            }
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateLightbox(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateLightbox(-1);
        }
    }
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

// Enhanced email functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle all email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            // Optional: Add analytics or tracking here
            // console.log('Email link clicked:', this.href);
        });
    });
    
    // Enhanced email form handling (for future use)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name')?.value;
            const email = formData.get('email') || document.getElementById('email')?.value;
            const subject = formData.get('subject') || document.getElementById('subject')?.value;
            const message = formData.get('message') || document.getElementById('message')?.value;
            
            // Create mailto link with pre-filled content
            const mailtoLink = `mailto:earthlyglimpses72@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Earthly Glimpses Website')}&body=${encodeURIComponent(`Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message || 'No message provided'}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
        });
    }
});