'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlitchNameRevealProps {
  text: string
  startDelay?: number
  onComplete?: () => void
}

export default function GlitchNameReveal({
  text,
  startDelay = 0,
  onComplete,
}: GlitchNameRevealProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________'
  const finalText = text

  useEffect(() => {
    const revealText = () => {
      let currentIndex = 0
      const totalDuration = 2000 // 2 seconds total
      const intervalTime = totalDuration / finalText.length

      const interval = setInterval(() => {
        if (currentIndex < finalText.length) {
          // Glitch effect for current character
          let glitchCount = 0
          const maxGlitches = 5

          const glitchInterval = setInterval(() => {
            if (glitchCount < maxGlitches) {
              const randomChar =
                glitchChars[Math.floor(Math.random() * glitchChars.length)]
              setDisplayText(
                finalText.substring(0, currentIndex) +
                  randomChar +
                  finalText.substring(currentIndex + 1)
              )
              glitchCount++
            } else {
              clearInterval(glitchInterval)
              setDisplayText(finalText.substring(0, currentIndex + 1))
              currentIndex++
            }
          }, 50)
        } else {
          clearInterval(interval)
          setIsComplete(true)
          onComplete?.()
        }
      }, intervalTime)

      return () => clearInterval(interval)
    }

    const timer = setTimeout(() => {
      setIsRevealing(true)
      revealText()
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [startDelay, finalText, glitchChars, onComplete])

  return (
    <div className='relative'>
      <motion.h1
        className='text-5xl md:text-7xl lg:text-8xl font-bold text-center pixel-font'
        style={{
          fontFamily: 'monospace, "Courier New", monospace',
          textShadow: isComplete
            ? '4px 0 0 #ff00ff, -4px 0 0 #00ffff, 0 0 20px #00ffff'
            : 'none',
          imageRendering: 'pixelated',
          letterSpacing: '0.1em',
        }}
        animate={
          isComplete
            ? {
                textShadow: [
                  '4px 0 0 #ff00ff, -4px 0 0 #00ffff, 0 0 20px #00ffff',
                  '6px 0 0 #ff00ff, -6px 0 0 #00ffff, 0 0 30px #00ffff',
                  '4px 0 0 #ff00ff, -4px 0 0 #00ffff, 0 0 20px #00ffff',
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className='bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          {displayText}
        </span>
      </motion.h1>

      {/* Additional glitch overlay for RGB split effect */}
      {isRevealing && !isComplete && (
        <motion.div
          className='absolute inset-0 pointer-events-none'
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: 0.3,
          }}
        >
          <h1
            className='text-6xl md:text-8xl lg:text-9xl font-bold text-center text-red-500 absolute inset-0'
            style={{
              fontFamily: 'monospace',
              transform: 'translateX(-2px)',
              opacity: 0.7,
            }}
          >
            {displayText}
          </h1>
          <h1
            className='text-6xl md:text-8xl lg:text-9xl font-bold text-center text-blue-500 absolute inset-0'
            style={{
              fontFamily: 'monospace',
              transform: 'translateX(2px)',
              opacity: 0.7,
            }}
          >
            {displayText}
          </h1>
        </motion.div>
      )}
    </div>
  )
}
