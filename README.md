# Hartley H. Leroy - Portfolio Website

> ENGINEER - BUILDER - CREATIVE TECHNOLOGIST

[![Deploy to GitHub Pages](https://github.com/hhleroy97/hhl_site/actions/workflows/deploy.yml/badge.svg)](https://github.com/hhleroy97/hhl_site/actions/workflows/deploy.yml)
[![Development Build](https://github.com/hhleroy97/hhl_site/actions/workflows/dev.yml/badge.svg)](https://github.com/hhleroy97/hhl_site/actions/workflows/dev.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-hartleyleroy.dev-brightgreen)](https://hartleyleroy.dev/)

A modern, high-performance portfolio website built with React, TypeScript, and advanced web technologies. Features a cyberpunk-inspired design with accessibility-first approach, smooth animations, and optimal user experience across all devices.

## Quick Start

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

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Sass
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Email Service:** EmailJS
- **Linting:** ESLint + Prettier
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **PWA:** Vite PWA Plugin

## Project Structure

```
src/
├── components/
│   ├── ui/             # Reusable UI components
│   ├── sections/       # Page section components
│   └── 3d/             # Three.js components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── styles/             # Global styles and utilities
├── assets/             # Images, fonts, and static assets
├── utils/              # Utility functions and helpers
└── main.tsx           # Application entry point

docs/                   # Documentation and resume files
scripts/                # Build and deployment scripts
public/                 # Static assets and PWA manifest
```

## Features

### Design and User Experience

- **Accessibility**: WCAG-compliant with comprehensive ARIA labeling, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-first approach with fluid layouts and adaptive components
- **Performance**: Lazy loading, code splitting, and optimized asset delivery
- **Animations**: Smooth transitions with reduced motion support and professional easing curves

### Technical Implementation

- **Component Architecture**: Modular design system with reusable UI components
- **State Management**: React Context for global state and component communication
- **3D Graphics**: Interactive Three.js visualizations integrated with React
- **Error Handling**: Comprehensive error boundaries and graceful degradation
- **SEO Optimization**: Enhanced meta tags, structured data, and social media optimization

## Design System

### Color Palette

- **Primary:** Cyberpunk neon cyan (#00ffff)
- **Accent:** Hot pink (#ff00ff), Electric purple (#8000ff)
- **Background:** Deep blacks with gradient overlays
- **Typography:** JetBrains Mono, Orbitron, Inter

### Visual Effects

- Glitch effects and dramatic reveals
- Parallax backgrounds
- Typewriter text animations
- Neon glow transitions
- Scanline overlays

## Performance Features

- **Code Splitting:** Automatic chunking for optimal loading
- **Tree Shaking:** Dead code elimination
- **Image Optimization:** WebP support with fallbacks
- **PWA Ready:** Service worker and app manifest
- **SEO Optimized:** Meta tags, structured data, sitemap

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:no-replace` - Build without environment variable replacement
- `npm run replace-env-vars` - Replace environment variables in built files
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface

### Development Tools

- **Git Hooks:** Pre-commit linting and formatting with Husky
- **Environment Variables:** Custom script for build-time variable replacement
- **Path Aliases:** Configured for clean imports (@components, @utils, etc.)
- **TypeScript:** Strict mode with comprehensive type checking

## Deployment and CI/CD

### Automated Deployment

The site uses GitHub Actions for continuous integration and deployment:

- **Production**: Deployed to [hartleyleroy.dev](https://hartleyleroy.dev/) on pushes to `main` branch
- **Development**: CI testing on `dev` branch and pull requests

### Branch Strategy

- `main` - Production branch (protected, auto-deploys)
- `dev` - Development branch (protected, CI testing)
- Feature branches merge into `dev`, then `dev` merges into `main`

### Workflows

- **Development** (`.github/workflows/dev.yml`): Tests on Node.js 18.x and 20.x, uploads build artifacts
- **Production** (`.github/workflows/deploy.yml`): Full CI pipeline with automatic deployment
- **Sync** (`.github/workflows/sync-dev.yml`): Syncs dev with main after successful deployments

## License

MIT © Hartley H. Leroy

---

Built by Hartley H. Leroy
