# Earthly Glimpses - Premium Framed Nature Photography

[![Version](https://img.shields.io/badge/version-v1.2.0-blue.svg)](https://github.com/yourusername/earthlyglimpses/releases/tag/v1.2.0)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern, responsive website showcasing premium framed nature photography with an elegant gallery, smooth animations, and professional design.

**Current Version: v1.2.0** | **Previous Version: v1.0.0**

## 🌟 Features

### Core Functionality
- **Responsive Photo Gallery** - Beautiful grid layout with category filtering
- **Category System** - Wildlife, Flowers, Scenery, Monuments, Lunar, and Others
- **Lightbox Viewer** - Full-screen image viewing with navigation
- **Dark/Light Theme Toggle** - Automatic theme switching with smooth transitions
- **Mobile-First Design** - Optimized for all device sizes
- **Smooth Scrolling** - Enhanced user experience with Lenis smooth scrolling
- **Direct Email Integration** - One-click email composition with Gmail integration

### Gallery Features
- **Smart Filtering** - Filter photos by category with smooth animations
- **Load More System** - Progressive loading for better performance
- **Image Metadata** - Location, camera details, and photo information
- **Responsive Grid** - Adaptive layout for different screen sizes
- **Empty State Handling** - User-friendly messages when categories have no images

### Technical Features
- **Performance Optimized** - Lazy loading, image optimization, and efficient animations
- **Modern Animations** - GSAP-powered scroll animations and transitions
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **SEO Optimized** - Semantic HTML and meta tags
- **Cross-Browser Compatible** - Works on all modern browsers

## 🚀 What's New in v1.2.0

This release brings significant improvements to user experience, performance, and functionality compared to v1.0.0.

### 1. Enhanced Preloader System
- **Improved Loading Experience** - Better progress tracking and visual feedback
- **Theme-Aware Preloader** - Automatically adapts to light/dark mode
- **Performance Monitoring** - Better asset loading detection and fallbacks
- **Smooth Transitions** - Enhanced animations and particle effects

### 2. Advanced Gallery Management
- **Empty Category Handling** - "No images for now, Will be uploaded soon" message
- **Improved Filtering Logic** - Better category switching and state management
- **Enhanced Load More** - Progressive loading with staggered animations
- **Better Image Organization** - Improved category structure and metadata

### 3. Modern UI/UX Improvements
- **Smooth Scrolling** - Lenis integration for buttery-smooth scrolling
- **Enhanced Animations** - GSAP ScrollTrigger for scroll-based animations
- **Better Mobile Experience** - Improved mobile menu and touch interactions
- **Theme Persistence** - Remembers user's theme preference

### 4. Performance Optimizations
- **Lazy Loading** - Images load only when needed
- **Efficient Animations** - CSS-based transitions where possible
- **Optimized Asset Loading** - Better resource management
- **Reduced Layout Shifts** - Improved Core Web Vitals

### 5. Code Quality Improvements
- **Better Error Handling** - Robust fallbacks and error recovery
- **Modular JavaScript** - Cleaner, more maintainable code structure
- **Enhanced CSS** - Better organization and responsive design
- **Improved Accessibility** - Better keyboard navigation and screen reader support

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scrolling**: Lenis
- **Icons**: Font Awesome 6.4.0
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📱 Responsive Design

- **Mobile**: Optimized for smartphones and tablets
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience with enhanced animations
- **Touch-Friendly**: Optimized touch targets and gestures

## 🎨 Theme System

- **Light Mode**: Clean, bright interface for daytime use
- **Dark Mode**: Easy-on-the-eyes dark theme for low-light environments
- **Automatic Switching**: Detects system preference
- **Manual Toggle**: User can override system preference
- **Persistent**: Remembers user's choice across sessions

## 🖼️ Gallery Categories

1. **Wildlife** - Captivating animal photography
2. **Flowers** - Beautiful botanical shots
3. **Scenery** - Stunning landscape photography
4. **Monuments** - Architectural and cultural landmarks
5. **Lunar** - Astrophotography and moon shots
6. **Others** - Miscellaneous nature photography

## 📋 Changelog

For detailed information about changes in each version, see our [CHANGELOG.md](CHANGELOG.md) file.

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (optional, for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/earthlyglimpses.git
   cd earthlyglimpses
   ```

2. Open `index.html` in your browser or serve locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
EarthlyGlimpses-main/
├── index.html          # Main HTML file (v1.2.0)
├── styles.css          # Main stylesheet (v1.2.0)
├── scripts.js          # Core JavaScript functionality (v1.2.0)
├── modern.js           # Modern UI enhancements (GSAP, Lenis) (v1.2.0)
├── theme.js            # Theme switching functionality (v1.2.0)
├── preloader.css       # Preloader animations (v1.2.0)
├── README.md           # This file
├── CHANGELOG.md        # Detailed version history
└── old/                # Previous version files (v1.0.0)
    ├── index.html
    ├── modern.js
    ├── scripts.js
    └── styles.css
```

## 🔧 Customization

### Adding New Photos
1. Use the provided template in `index.html`
2. Update the `data-category` attribute
3. Add appropriate metadata (location, camera, etc.)
4. Ensure images are optimized for web

### Modifying Categories
1. Update category buttons in the filter section
2. Add corresponding CSS classes for styling
3. Update JavaScript filtering logic if needed

### Theme Customization
1. Modify CSS variables in `styles.css`
2. Update color schemes and transitions
3. Test in both light and dark modes

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📊 Performance Metrics

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Load Time**: < 3 seconds on 3G connections
- **Image Optimization**: WebP support with fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality stock photography
- **Font Awesome** - Beautiful icons
- **GSAP** - Powerful animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lenis** - Smooth scrolling library

## 📞 Contact

- **Email**: earthlyglimpses72@gmail.com
- **Instagram**: [@earthlyglimpses07](https://www.instagram.com/earthlyglimpses07/)
- **Facebook**: [EarthlyGlimpses](https://facebook.com/earthlyglimpses)
- **Twitter**: [@earthlyglimpses](https://x.com/earthlyglimpses)

## 🔄 Version History

### v1.2.0 (Current Release) - Enhanced User Experience
**Release Date:** December 2024

#### ✨ New Features
- **Empty Category Handling** - User-friendly "No images for now, Will be uploaded soon" message
- **Enhanced Preloader** - Theme-aware loading experience with progress tracking
- **Smooth Scrolling** - Lenis integration for buttery-smooth page navigation
- **Advanced Animations** - GSAP ScrollTrigger for scroll-based animations

#### 🚀 Improvements
- **Gallery Management** - Better filtering logic and state management
- **Mobile Experience** - Improved responsive design and touch interactions
- **Performance** - Lazy loading, optimized animations, and better asset management
- **Accessibility** - Enhanced keyboard navigation and screen reader support

#### 🐛 Bug Fixes
- Fixed gallery layout issues on mobile devices
- Improved theme switching reliability
- Enhanced error handling and fallbacks

### v1.0.0 (Initial Release)
**Release Date:** Previous upload to GitHub

#### Basic Features
- Responsive photo gallery with category filtering
- Lightbox image viewer
- Dark/light theme toggle
- Mobile-responsive design
- Basic preloader system

---

**Built with ❤️ for nature photography enthusiasts**
