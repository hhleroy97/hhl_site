/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          neon: '#00ffff',
          pink: '#ff00ff',
          purple: '#8000ff',
          blue: '#0080ff',
          green: '#00ff80',
          yellow: '#ffff00',
          red: '#ff0080',
          dark: '#0a0a0a',
          'dark-alt': '#1a0a1a',
          'dark-cyan': '#0a1a1a',
        },
        primary: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99eefd',
          300: '#5ddefa',
          400: '#00d4f5',
          500: '#00b8db',
          600: '#0093b7',
          700: '#067593',
          800: '#0c5f78',
          900: '#104f65',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        cyber: ['Orbitron', 'Exo 2', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        glitch: 'glitch 0.3s ease-in-out infinite',
        scan: 'scan 2s linear infinite',
        flicker: 'flicker 0.15s linear infinite',
        float: 'float 6s ease-in-out infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
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
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
}
