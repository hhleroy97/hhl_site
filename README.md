# Hartley H. Leroy - Portfolio Website

> ENGINEER • BUILDER • CREATIVE TECHNOLOGIST

[![Deploy to GitHub Pages](https://github.com/hhleroy97/hhl_site/actions/workflows/deploy.yml/badge.svg)](https://github.com/hhleroy97/hhl_site/actions/workflows/deploy.yml)
[![Development Build](https://github.com/hhleroy97/hhl_site/actions/workflows/dev.yml/badge.svg)](https://github.com/hhleroy97/hhl_site/actions/workflows/dev.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-hhleroy97.github.io%2Fhhl__site-brightgreen)](https://hhleroy97.github.io/hhl_site/)

A modern, high-performance portfolio website built with React, TypeScript, and cutting-edge web technologies. Features a professional cyberpunk-inspired design with accessibility-first approach, smooth animations, and excellent user experience across all devices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Sass
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Linting:** ESLint + Prettier
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **PWA:** Vite PWA Plugin

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── styles/             # Global styles and variables
├── assets/             # Images, fonts, and static assets
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## ✨ Recent UI/UX & Design Best Practices Implementation

### 🎯 Accessibility Enhancements

- **ARIA Labels & Semantic HTML**: Comprehensive ARIA labeling and semantic structure
- **Focus Management**: Professional focus rings and keyboard navigation support
- **Screen Reader Support**: Skip links and proper screen reader compatibility
- **Color Contrast**: Enhanced color contrast ratios for better readability
- **Touch Targets**: Minimum 44px touch targets for mobile accessibility

### 📱 Responsive Design Excellence

- **Mobile-First Approach**: Optimized for all screen sizes with fluid layouts
- **Breakpoint System**: Professional breakpoint management with custom hooks
- **Touch Optimization**: Enhanced touch interactions and gesture support
- **Flexible Typography**: Responsive typography scales with viewport size
- **Adaptive Components**: Components that adapt behavior based on screen size

### ⚡ Performance Optimizations

- **Lazy Loading**: Intelligent image and component lazy loading
- **Code Splitting**: Route-based and component-based code splitting
- **Performance Monitoring**: Built-in performance metrics tracking
- **Reduced Motion Support**: Respects user's motion preferences
- **Resource Optimization**: Optimized fonts, images, and asset loading

### 🎨 Design System Consistency

- **Component Library**: Comprehensive design system with consistent spacing
- **Typography Scale**: Professional typography hierarchy and scales
- **Color System**: Enhanced color palette with semantic color usage
- **Spacing System**: Consistent spacing patterns throughout the application
- **Icon System**: Unified icon usage with Lucide React

### 🎭 Micro-Interactions & Animations

- **Smooth Transitions**: Professional easing curves and timing
- **Hover States**: Subtle and meaningful hover interactions
- **Loading States**: Elegant loading animations and skeleton screens
- **Page Transitions**: Smooth page and view transitions
- **Interactive Feedback**: Immediate visual feedback for all interactions

### 🛡️ Error Handling & Resilience

- **Error Boundaries**: Comprehensive error boundary implementation
- **Graceful Degradation**: Fallbacks for failed components/resources
- **Loading States**: Professional loading indicators throughout
- **Network Resilience**: Proper handling of network failures
- **User Feedback**: Clear error messages and recovery options

### 🔍 SEO & Discoverability

- **Enhanced Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: Rich schema.org markup for better search results
- **Open Graph**: Optimized social media sharing previews
- **Canonical URLs**: Proper URL canonicalization
- **Sitemap & Robots**: SEO-optimized configuration

### Professional Design System

- **Enhanced Color Palette:** Improved accessibility with better contrast ratios and semantic color usage
- **Typography Scale:** Professional font hierarchy with optimized line heights and letter spacing
- **Consistent Spacing:** Systematic spacing scale for better visual rhythm
- **Component Library:** Reusable card styles, button variants, and focus states

### Accessibility Enhancements

- **WCAG Compliance:** Proper contrast ratios and focus indicators
- **Semantic HTML:** Screen reader friendly markup and ARIA labels
- **Keyboard Navigation:** Full keyboard accessibility support
- **Touch Targets:** Minimum 44px touch targets for mobile devices

### Mobile-First Optimizations

- **Responsive Design:** Optimized layouts for all screen sizes
- **Performance:** Reduced animations and effects on mobile for better performance
- **Touch Experience:** Improved button sizes and interaction patterns
- **Typography:** Mobile-optimized font sizes and line heights

### Interaction Design

- **Micro-animations:** Subtle, purposeful animations that enhance UX
- **Loading States:** Professional loading indicators with proper ARIA support
- **Hover States:** Consistent and accessible hover effects
- **Transitions:** Smooth, eased transitions using professional timing curves

## 🎨 Design System

### Colors

- **Primary:** Cyberpunk neon cyan (`#00ffff`)
- **Accent:** Hot pink (`#ff00ff`), Electric purple (`#8000ff`)
- **Background:** Deep blacks with gradient overlays
- **Typography:** JetBrains Mono, Orbitron, Inter

### Animations

- Glitch effects for dramatic reveals
- Parallax backgrounds
- Typewriter text animations
- Neon glow transitions
- Scanline overlays

## 🚀 Performance Features

- **Code Splitting:** Automatic chunking for optimal loading
- **Tree Shaking:** Dead code elimination
- **Image Optimization:** WebP support with fallbacks
- **PWA Ready:** Service worker and app manifest
- **SEO Optimized:** Meta tags, structured data, sitemap

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests

### Git Hooks

- **Pre-commit:** Runs linting and formatting automatically
- **Conventional Commits:** Enforced commit message format

## 🎯 Features

- [x] Responsive design (mobile-first)
- [x] Dark mode (cyberpunk theme)
- [x] Smooth animations with reduced motion support
- [x] SEO optimization
- [x] PWA capabilities
- [x] Performance monitoring
- [x] TypeScript strict mode
- [x] Modern CSS with Tailwind
- [x] Component-driven architecture

## 🌐 Deployment & CI/CD

### Automated Deployment

The site uses a professional CI/CD pipeline with GitHub Actions:

- **Production**: Deployed to [GitHub Pages](https://hhleroy97.github.io/hhl_site/) on pushes to `main` branch
- **Development**: Continuous integration testing on `dev` branch and pull requests

### Branch Strategy

- `main` - Production branch (protected, auto-deploys to GitHub Pages)
- `dev` - Development branch (protected, CI testing)
- Feature branches - Merge into `dev` first, then `dev` → `main`

### Workflow Details

**Development Workflow** (`.github/workflows/dev.yml`):

- Triggers on push/PR to `dev` branch
- Runs on Node.js 18.x and 20.x matrices
- Executes: lint → type-check → test → build
- Uploads build artifacts for 7 days
- Posts PR status comments

**Production Workflow** (`.github/workflows/deploy.yml`):

- Triggers on push to `main` branch
- Full CI pipeline: lint → type-check → test → build → deploy
- Automatic GitHub Pages deployment
- Creates versioned releases
- Zero-downtime deployment

### Manual Deployment

```bash
npm run build
npm run preview  # Test locally first
# Automatic deployment via GitHub Actions on push to main
```

## 📄 License

MIT © Hartley H. Leroy

---

## 🎨 Design Previews

Check out the cyberpunk hero section preview at: `docs/cyberpunk_hero_preview.html`

Built with ❤️ and ⚡ by Hartley H. Leroy
