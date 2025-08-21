/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Global aesthetic system - 3-color system
        accentWarm: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff4757', // Primary warm accent (coral)
          600: '#ff3838', // Electric magenta for CTAs
          700: '#e74c3c', // Deep crimson
          800: '#c0392b',
          900: '#a93226',
          DEFAULT: '#ff4757',
        },
        accentCool: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00d4aa', // Primary cool accent (teal)
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          DEFAULT: '#00d4aa',
        },
        accentPurple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8b5cf6', // Purple for AI/ML
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          DEFAULT: '#8b5cf6',
        },
        // Background system - deep engineering blues
        tech: {
          dark: '#0a0f1c', // Very deep blue-black
          'dark-alt': '#1a1f35', // Slightly lighter blue-dark
          'dark-surface': '#1e2537', // Card backgrounds
          'dark-elevated': '#252b42', // Elevated surfaces
          'navy-deep': '#0f1729', // Deep navy background
          teal: '#00d4aa',
          'teal-bright': '#00ffcc',
          cyan: '#00e5ff',
          blue: '#0ea5e9',
          'blue-dark': '#0284c7',
          navy: '#1e3a8a',
          coral: '#ff4757',
          magenta: '#ff3838',
          amber: '#ffa726',
          crimson: '#e74c3c',
          purple: '#8b5cf6',
          gold: '#f59e0b',
          green: '#10b981',
          neon: '#00d4aa',
          pink: '#ff4757',
          yellow: '#ffa726',
          accent: '#ff4757',
        },
        // Text colors for accessibility - direct access
        'text-primary': '#ffffff',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        'text-disabled': '#64748b',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        cyber: ['Orbitron', 'Exo 2', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography scale
        'h1': ['clamp(3.5rem, 8vw, 4rem)', { 
          lineHeight: '1.25', 
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }],
        'h2': ['clamp(2rem, 5vw, 2.5rem)', { 
          lineHeight: '1.3', 
          fontWeight: '600',
          letterSpacing: '-0.0125em'
        }],
        'h3': ['clamp(1.375rem, 3vw, 1.5rem)', { 
          lineHeight: '1.35', 
          fontWeight: '600',
          letterSpacing: '0em'
        }],
        'body': ['clamp(1rem, 2vw, 1.125rem)', { 
          lineHeight: '1.6', 
          fontWeight: '400',
          letterSpacing: '0.0125em'
        }],
        'body-lg': ['clamp(1.125rem, 2.5vw, 1.25rem)', { 
          lineHeight: '1.7', 
          fontWeight: '500',
          letterSpacing: '0.0125em'
        }],
        // Legacy support
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
      boxShadow: {
        // Depth model shadows
        'glow-warm': '0 0 12px rgba(255, 71, 87, 0.4)',
        'glow-cool': '0 0 12px rgba(0, 212, 170, 0.4)',
        'glow-purple': '0 0 12px rgba(139, 92, 246, 0.4)',
        'glow-warm-lg': '0 0 20px rgba(255, 71, 87, 0.3)',
        'glow-cool-lg': '0 0 20px rgba(0, 212, 170, 0.3)',
        'glow-purple-lg': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        // Motion system
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s linear infinite',
      },
      keyframes: {
        // Motion keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 71, 87, 0.4), 0 0 40px rgba(255, 71, 87, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 71, 87, 0.6), 0 0 60px rgba(255, 71, 87, 0.3)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(0px) translateY(-20px)' },
          '75%': { transform: 'translateX(-10px) translateY(-10px)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
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
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    // Custom utilities plugin
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Text glow utilities
        '.text-glow-warm': {
          'text-shadow': '0 0 10px rgba(255, 71, 87, 0.6)',
        },
        '.text-glow-cool': {
          'text-shadow': '0 0 10px rgba(0, 212, 170, 0.6)',
        },
        '.text-glow-purple': {
          'text-shadow': '0 0 10px rgba(139, 92, 246, 0.6)',
        },
        '.text-glow-warm-lg': {
          'text-shadow': '0 0 20px rgba(255, 71, 87, 0.4), 0 0 40px rgba(255, 71, 87, 0.2)',
        },
        '.text-glow-cool-lg': {
          'text-shadow': '0 0 20px rgba(0, 212, 170, 0.4), 0 0 40px rgba(0, 212, 170, 0.2)',
        },
        '.text-glow-purple-lg': {
          'text-shadow': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
        },
        // Focus ring utilities
        '.focus-ring-warm': {
          '&:focus': {
            outline: 'none',
            'box-shadow': '0 0 0 3px rgba(255, 71, 87, 0.5)',
          },
        },
        '.focus-ring-cool': {
          '&:focus': {
            outline: 'none',
            'box-shadow': '0 0 0 3px rgba(0, 212, 170, 0.5)',
          },
        },
        '.focus-ring-purple': {
          '&:focus': {
            outline: 'none',
            'box-shadow': '0 0 0 3px rgba(139, 92, 246, 0.5)',
          },
        },
        // Motion utilities
        '.motion-safe': {
          '@media (prefers-reduced-motion: no-preference)': {
            '&': {
              'transition-duration': '300ms',
              'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        '.motion-reduce': {
          '@media (prefers-reduced-motion: reduce)': {
            '&': {
              'animation-duration': '0.01ms !important',
              'animation-iteration-count': '1 !important',
              'transition-duration': '0.01ms !important',
            },
          },
        },
        // Depth utilities
        '.depth-foreground': {
          'z-index': '10',
          'position': 'relative',
        },
        '.depth-midground': {
          'z-index': '5',
          'position': 'relative',
        },
        '.depth-background': {
          'z-index': '1',
          'position': 'relative',
        },
        // Card utilities
        '.card-surface': {
          'background': 'rgba(30, 37, 55, 0.8)',
          'backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': '0.75rem',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        '.card-surface-hover': {
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
