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

          // Artistic accent colors
          coral: '#ff6b6b', // Warm coral accent
          purple: '#8b5cf6', // Creative purple
          gold: '#f59e0b', // Premium gold
          green: '#10b981', // Success green

          // Aliases for missing classes
          neon: '#00d4aa', // Alias for teal
          pink: '#ff6b6b', // Alias for coral
          yellow: '#f59e0b', // Alias for gold

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
