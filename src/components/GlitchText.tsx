import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: 'low' | 'medium' | 'high'
}

export default function GlitchText({
  text,
  className = '',
  glitchIntensity = 'medium',
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'

  const intensitySettings = {
    low: { frequency: 8000, duration: 100, charChangePercent: 0.1 },
    medium: { frequency: 5000, duration: 150, charChangePercent: 0.2 },
    high: { frequency: 3000, duration: 200, charChangePercent: 0.3 },
  }

  const settings = intensitySettings[glitchIntensity]

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance to glitch
        setIsGlitching(true)

        // Create glitched version
        const glitchedText = text
          .split('')
          .map(char => {
            if (char === ' ') return char
            if (Math.random() < settings.charChangePercent) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join('')

        setDisplayText(glitchedText)

        // Restore original text after duration
        setTimeout(() => {
          setDisplayText(text)
          setIsGlitching(false)
        }, settings.duration)
      }
    }, settings.frequency)

    return () => clearInterval(interval)
  }, [text, settings])

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {/* Main text with cyberpunk glow */}
      <motion.h1
        className='relative z-10 cyberpunk-glow'
        animate={
          isGlitching
            ? {
                x: [0, -2, 2, 0],
                textShadow: [
                  '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
                  '2px 0 #ff00ff, -2px 0 #00ffff, 0 0 20px #ffffff',
                  '-2px 0 #ff00ff, 2px 0 #00ffff, 0 0 20px #ffffff',
                  '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
                ],
              }
            : {}
        }
        transition={{ duration: 0.1 }}
      >
        {displayText}
      </motion.h1>

      {/* RGB split layers for glitch effect */}
      <motion.h1
        className={`absolute top-0 left-0 ${className.replace('cyberpunk-glow', '')} text-cyberpunk-pink opacity-0`}
        animate={
          isGlitching
            ? {
                opacity: [0, 0.7, 0],
                x: [0, -3, 0],
                y: [0, 1, 0],
              }
            : {}
        }
        transition={{ duration: 0.1 }}
        aria-hidden='true'
      >
        {displayText}
      </motion.h1>

      <motion.h1
        className={`absolute top-0 left-0 ${className.replace('cyberpunk-glow', '')} text-cyberpunk-blue opacity-0`}
        animate={
          isGlitching
            ? {
                opacity: [0, 0.7, 0],
                x: [0, 3, 0],
                y: [0, -1, 0],
              }
            : {}
        }
        transition={{ duration: 0.1 }}
        aria-hidden='true'
      >
        {displayText}
      </motion.h1>

      {/* Scan line effect */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-b from-transparent via-cyberpunk-neon to-transparent opacity-0'
        animate={
          isGlitching
            ? {
                opacity: [0, 0.3, 0],
                height: ['0%', '100%', '0%'],
                y: ['-100%', '100%', '200%'],
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        style={{ height: '2px' }}
      />
    </motion.div>
  )
}
