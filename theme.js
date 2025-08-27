// Theme Switching Functionality

// Function to set theme
function setTheme(theme) {
    // console.log('Setting theme to:', theme); // Debug log
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        
        // Update toggle buttons
        const lightIcons = document.querySelectorAll('.theme-light-icon');
        const darkIcons = document.querySelectorAll('.theme-dark-icon');
        
        lightIcons.forEach(icon => icon.classList.add('hidden'));
        darkIcons.forEach(icon => icon.classList.remove('hidden'));
        
        if (document.querySelector('.theme-light-icon-mobile')) {
            document.querySelector('.theme-light-icon-mobile').classList.add('hidden');
            document.querySelector('.theme-dark-icon-mobile').classList.remove('hidden');
        }
        
        // Update theme labels if they exist - show "Light Mode" when in dark theme
        const themeLabel = document.getElementById('theme-label');
        const mobileThemeLabel = document.getElementById('mobile-theme-label');
        
        if (themeLabel) {
            themeLabel.textContent = 'Light Mode';
            // console.log('Updated theme label to: Light Mode'); // Debug log
        }
        
        if (mobileThemeLabel) {
            mobileThemeLabel.textContent = 'Light Mode';
            // console.log('Updated mobile theme label to: Light Mode'); // Debug log
        }
        // Accessibility state for toggles
        const desktopToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.getElementById('mobile-theme-toggle');
        if (desktopToggle) desktopToggle.setAttribute('aria-pressed', 'true');
        if (mobileToggle) mobileToggle.setAttribute('aria-pressed', 'true');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
        
        // Update toggle buttons
        const lightIcons = document.querySelectorAll('.theme-light-icon');
        const darkIcons = document.querySelectorAll('.theme-dark-icon');
        
        lightIcons.forEach(icon => icon.classList.remove('hidden'));
        darkIcons.forEach(icon => icon.classList.add('hidden'));
        
        if (document.querySelector('.theme-light-icon-mobile')) {
            document.querySelector('.theme-light-icon-mobile').classList.remove('hidden');
            document.querySelector('.theme-dark-icon-mobile').classList.add('hidden');
        }
        
        // Update theme labels if they exist - show "Dark Mode" when in light theme
        const themeLabel = document.getElementById('theme-label');
        const mobileThemeLabel = document.getElementById('mobile-theme-label');
        
        if (themeLabel) {
            themeLabel.textContent = 'Dark Mode';
            // console.log('Updated theme label to: Dark Mode'); // Debug log
        }
        
        if (mobileThemeLabel) {
            mobileThemeLabel.textContent = 'Dark Mode';
            // console.log('Updated mobile theme label to: Dark Mode'); // Debug log
        }
        // Accessibility state for toggles
        const desktopToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.getElementById('mobile-theme-toggle');
        if (desktopToggle) desktopToggle.setAttribute('aria-pressed', 'false');
        if (mobileToggle) mobileToggle.setAttribute('aria-pressed', 'false');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    // console.log('Theme saved to localStorage:', theme); // Debug log
}

// Function to toggle theme
function toggleTheme() {
    // console.log('Theme toggle clicked'); // Debug log
    const currentTheme = localStorage.getItem('theme') || 'light';
    // console.log('Current theme:', currentTheme); // Debug log
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    // console.log('Switching to theme:', newTheme); // Debug log
    setTheme(newTheme);
}

// Initialize theme based on saved preference or system preference
function initializeTheme() {
    // console.log('Initializing theme...'); // Debug log
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    // console.log('Saved theme from localStorage:', savedTheme); // Debug log
    
    if (savedTheme) {
        // Use saved preference
        // console.log('Using saved theme preference:', savedTheme); // Debug log
        setTheme(savedTheme);
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // console.log('System prefers dark mode:', prefersDark); // Debug log
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

// Apply theme immediately before DOM is fully loaded
(function() {
    // console.log('Applying theme immediately...'); // Debug log
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    // console.log('Immediate theme application:', theme); // Debug log
    
    // Apply minimal theme settings immediately
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        // console.log('Applied dark theme immediately'); // Debug log
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
        // console.log('Applied light theme immediately'); // Debug log
    }
})();

// Set up event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOM loaded, setting up theme...'); // Debug log
    
    // Initialize theme
    initializeTheme();
    
    // Set up theme toggle buttons (robust delegated + debounced handler)
    let themeToggleLocked = false;
    function toggleThemeDebounced() {
        if (themeToggleLocked) return;
        themeToggleLocked = true;
        // Use rAF to avoid layout thrash during first load
        requestAnimationFrame(() => {
            toggleTheme();
            setTimeout(() => { themeToggleLocked = false; }, 250);
        });
    }
    // Direct listeners if elements exist now
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    themeToggle?.addEventListener('click', toggleThemeDebounced);
    mobileThemeToggle?.addEventListener('click', toggleThemeDebounced);
    // Delegated listener to catch clicks even if menu re-renders
    document.addEventListener('click', function(e) {
        const target = e.target.closest('#theme-toggle, #mobile-theme-toggle');
        if (target) {
            e.preventDefault();
            toggleThemeDebounced();
        }
    }, { passive: true });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            // Only auto-switch if user hasn't manually set a preference
            // console.log('System theme changed to:', e.matches ? 'dark' : 'light'); // Debug log
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});