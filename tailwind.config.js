/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Professional color system with better accessibility
        cyberpunk: {
          // Primary brand colors - improved contrast
          neon: '#00e5ff', // Softer, more accessible cyan
          'neon-bright': '#00ffff', // Original for accents only
          pink: '#ff3d71', // Warmer, more accessible pink
          purple: '#9c27b0', // Material Design purple
          blue: '#2196f3', // Material Design blue
          green: '#4caf50', // Material Design green
          yellow: '#ffc107', // Material Design amber
          red: '#f44336', // Material Design red
          
          // Background system
          dark: '#0f0f0f', // Slightly lighter for better contrast
          'dark-alt': '#1a1a1a', // Better contrast
          'dark-cyan': '#0d1b1e', // Subtle cyan tint
          'dark-surface': '#262626', // Card backgrounds
          'dark-elevated': '#333333', // Elevated surfaces
          
          // Text colors for accessibility
          'text-primary': '#ffffff',
          'text-secondary': '#e0e0e0',
          'text-muted': '#9e9e9e',
          'text-disabled': '#616161',
        },
        // Enhanced primary palette
        primary: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', // Main brand color
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
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
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.0125em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.0125em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.0125em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.0125em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      spacing: {
        // Enhanced spacing system
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '74': '18.5rem',
        '78': '19.5rem',
        '82': '20.5rem',
        '86': '21.5rem',
        '90': '22.5rem',
        '94': '23.5rem',
        '98': '24.5rem',
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
