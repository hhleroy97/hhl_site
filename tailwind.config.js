/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Engineering with Artistic Flair color system
        tech: {
          // Primary teals and blues
          teal: '#00d4aa', // Main teal accent
          'teal-bright': '#00ffcc', // Bright teal for highlights
          cyan: '#00e5ff', // Cyan blue
          blue: '#0ea5e9', // Engineering blue
          'blue-dark': '#0284c7', // Darker blue
          navy: '#1e3a8a', // Deep navy

          // Artistic accent colors - signature warm palette
          coral: '#ff4757', // Bold coral primary accent
          magenta: '#ff3838', // Electric magenta for CTAs
          amber: '#ffa726', // Warm amber for highlights
          crimson: '#e74c3c', // Deep crimson for emphasis
          purple: '#8b5cf6', // Creative purple (kept)
          gold: '#f59e0b', // Premium gold (kept)
          green: '#10b981', // Success green (kept)

          // Aliases for missing classes
          neon: '#00d4aa', // Alias for teal
          pink: '#ff4757', // Alias for coral
          yellow: '#ffa726', // Alias for amber
          accent: '#ff4757', // Primary warm accent

          // Background system - deep engineering blues
          dark: '#0a0f1c', // Very deep blue-black
          'dark-alt': '#1a1f35', // Slightly lighter blue-dark
          'dark-surface': '#1e2537', // Card backgrounds
          'dark-elevated': '#252b42', // Elevated surfaces
          'navy-deep': '#0f1729', // Deep navy background

          // Text colors for accessibility
          'text-primary': '#ffffff',
          'text-secondary': '#cbd5e1',
          'text-muted': '#94a3b8',
          'text-disabled': '#64748b',
        },
        // Enhanced primary teal palette
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00d4aa', // Main brand teal
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Coral accent palette for hierarchy
        accent: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff4757', // Primary coral accent
          600: '#ff3838', // Magenta CTA
          700: '#e74c3c', // Deep crimson
          800: '#c0392b',
          900: '#a93226',
        },
        // Semantic colors
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        cyber: ['Orbitron', 'Exo 2', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Professional typography scale
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        base: ['1rem', { lineHeight: '1.6', letterSpacing: '0.0125em' }],
        lg: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.0125em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.0125em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.0125em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      spacing: {
        // Enhanced spacing system
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        54: '13.5rem',
        58: '14.5rem',
        62: '15.5rem',
        66: '16.5rem',
        70: '17.5rem',
        74: '18.5rem',
        78: '19.5rem',
        82: '20.5rem',
        86: '21.5rem',
        90: '22.5rem',
        94: '23.5rem',
        98: '24.5rem',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'text-shimmer': 'textShimmer 2s ease-in-out infinite',
        'metric-flip': 'metricFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'cta-bounce': 'ctaBounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        glitch: 'glitch 0.3s ease-in-out infinite',
        scan: 'scan 2s linear infinite',
        flicker: 'flicker 0.15s linear infinite',
        float: 'float 6s ease-in-out infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
          },
          '100%': {
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(255, 71, 87, 0.4), 0 0 40px rgba(255, 71, 87, 0.2)',
          },
          '50%': {
            boxShadow:
              '0 0 30px rgba(255, 71, 87, 0.6), 0 0 60px rgba(255, 71, 87, 0.3)',
          },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        metricFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        ctaBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
