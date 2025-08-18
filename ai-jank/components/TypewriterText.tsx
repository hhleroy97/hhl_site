'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  startDelay?: number
  typeSpeed?: number
  onComplete?: () => void
}

export default function TypewriterText({
  text,
  startDelay = 0,
  typeSpeed = 100,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTyping = () => {
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)

          // Keep cursor blinking for a moment, then fade it out
          setTimeout(() => {
            setIsComplete(true)
            setShowCursor(false)
            onComplete?.()
          }, 1000)
        }
      }, typeSpeed)

      return () => clearInterval(typeInterval)
    }

    const timer = setTimeout(() => {
      setShowCursor(true)
      startTyping()
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [startDelay, text, typeSpeed, onComplete])

  return (
    <div className='relative'>
      <motion.p
        className='text-xl md:text-2xl lg:text-3xl text-center text-gray-300 font-mono'
        initial={{ opacity: 0 }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {displayText}
        {showCursor && !isComplete && (
          <motion.span
            className='inline-block ml-1 w-3 h-6 bg-cyan-400'
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.p>

      {/* Subtle glow effect when complete */}
      {isComplete && (
        <motion.div
          className='absolute inset-0 pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className='text-xl md:text-2xl lg:text-3xl text-center text-cyan-400 font-mono'
            style={{
              textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
            }}
          >
            {text}
          </p>
        </motion.div>
      )}
    </div>
  )
}
