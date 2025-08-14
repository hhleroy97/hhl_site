# 8-Bit Cyberpunk Hero Section Components

A high-impact, animated 8-bit cyberpunk-themed intro/business card section built with Next.js, Tailwind CSS, and Framer Motion. Features retro pixel art aesthetics mixed with modern cyberpunk elements.

## Features

- 🎨 **8-Bit Cyberpunk Background**: Parallax neon skyline, pixel clouds, floating particles, retro dithering effects
- ⚡ **Glitch Name Reveal**: Random character flickering with 8-bit styling and RGB split effects
- ⌨️ **Typewriter Animation**: Character-by-character text reveal with pixelated cursor
- 💳 **Retro Business Card**: Interactive 8-bit business card with LinkedIn and GitHub links
- 🔘 **Pixel Perfect CTA Button**: 8-bit styled button with neon effects and retro shadows
- 📊 **8-Bit Audio Visualizer**: Pixelated bars with retro peak indicators and particle effects
- 🎬 **Orchestrated Timing**: Smooth sequence of intro animations with retro transitions
- 📱 **Responsive Design**: Optimized for desktop and mobile with pixel-perfect scaling

## Installation

### Prerequisites

```bash
npm install framer-motion
# or
yarn add framer-motion
```

Ensure you have Tailwind CSS configured in your Next.js project.

### Component Files

Copy these components to your project:

- `CyberpunkBackground.tsx` - Animated background with skyline and effects
- `GlitchNameReveal.tsx` - Glitch text animation component
- `TypewriterText.tsx` - Typewriter effect with cursor
- `NeonButton.tsx` - Interactive neon-styled button
- `AudioVisualizer.tsx` - Animated bar graph visualizer
- `HeroSection.tsx` - Main orchestrator component

## Usage

### Basic Implementation

```tsx
import HeroSection from './components/HeroSection'

export default function Home() {
  const handleEnterPortfolio = () => {
    // Navigate to portfolio section
    console.log('Entering portfolio...')
  }

  return (
    <div className='min-h-screen'>
      <HeroSection onEnterPortfolio={handleEnterPortfolio} />
    </div>
  )
}
```

### With Portfolio Transition

```tsx
'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  const handleEnterPortfolio = () => {
    setShowPortfolio(true)
  }

  return (
    <div className='min-h-screen'>
      <AnimatePresence mode='wait'>
        {!showPortfolio ? (
          <HeroSection key='hero' onEnterPortfolio={handleEnterPortfolio} />
        ) : (
          <div key='portfolio' className='min-h-screen bg-gray-900 p-8'>
            {/* Your portfolio content */}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

## Component API

### HeroSection

```tsx
interface HeroSectionProps {
  onEnterPortfolio?: () => void
}
```

### GlitchNameReveal

```tsx
interface GlitchNameRevealProps {
  text: string
  startDelay?: number // Delay in seconds
  onComplete?: () => void
}
```

### TypewriterText

```tsx
interface TypewriterTextProps {
  text: string
  startDelay?: number // Delay in seconds
  typeSpeed?: number // Milliseconds per character
  onComplete?: () => void
}
```

### NeonButton

```tsx
interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  startDelay?: number // Delay in seconds
  disabled?: boolean
}
```

### AudioVisualizer

```tsx
interface AudioVisualizerProps {
  barCount?: number // Number of bars (default: 20)
  startDelay?: number // Delay in seconds
}
```

## Customization

### Colors

The components use Tailwind CSS classes for cyberpunk theming. Main colors used:

- `cyan-400` - Primary neon cyan
- `pink-500` - Secondary neon pink
- `purple-900` - Background purple
- `gray-900` - Dark background

### Timing Sequence

The intro sequence follows this timeline:

1. **0s**: Background animation starts
2. **1.5s**: Glitch flash effect
3. **2s**: Name reveal begins
4. **6s**: Tagline typewriter starts
5. **7s**: Button and visualizer activate

Modify timing in `HeroSection.tsx` by adjusting the `startDelay` props and `introStep` transitions.

### Performance

- Uses `will-change` CSS property for smooth animations
- Particles are limited to prevent performance issues
- Animations are optimized for 60fps
- Mobile-optimized with reduced particle counts

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers with CSS transforms support

## License

MIT License - feel free to use in your projects.
