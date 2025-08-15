// Theme Switching Functionality

// Function to set theme
function setTheme(theme) {
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
        
        // Update theme labels if they exist
        const themeLabel = document.getElementById('theme-label');
        const mobileThemeLabel = document.getElementById('mobile-theme-label');
        
        if (themeLabel) {
            themeLabel.textContent = 'Dark Mode';
        }
        
        if (mobileThemeLabel) {
            mobileThemeLabel.textContent = 'Dark Mode';
        }
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
        
        // Update theme labels if they exist
        const themeLabel = document.getElementById('theme-label');
        const mobileThemeLabel = document.getElementById('mobile-theme-label');
        
        if (themeLabel) {
            themeLabel.textContent = 'Dark Mode';
        }
        
        if (mobileThemeLabel) {
            mobileThemeLabel.textContent = 'Dark Mode';
        }
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize theme based on saved preference or system preference
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

// Apply theme immediately before DOM is fully loaded
(function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply minimal theme settings immediately
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
    }
})();

// Set up event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Set up theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            // Only auto-switch if user hasn't manually set a preference
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});