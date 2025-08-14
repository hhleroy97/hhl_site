'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AudioVisualizerProps {
  barCount?: number
  startDelay?: number
}

export default function AudioVisualizer({
  barCount = 20,
  startDelay = 0,
}: AudioVisualizerProps) {
  const [bars, setBars] = useState<Array<{ id: number; height: number }>>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Initialize bars
    const initialBars = Array.from({ length: barCount }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 20, // Random height between 20-80
    }))
    setBars(initialBars)

    // Start animation after delay
    const timer = setTimeout(() => {
      setIsActive(true)
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [barCount, startDelay])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setBars(prevBars =>
        prevBars.map(bar => ({
          ...bar,
          height: Math.random() * 80 + 10, // Random height between 10-90
        }))
      )
    }, 150) // Update every 150ms for smooth animation

    return () => clearInterval(interval)
  }, [isActive])

  const generateParticle = (barIndex: number, height: number) => {
    // Only generate particles for taller bars (> 60)
    if (height > 60 && Math.random() > 0.7) {
      return (
        <motion.div
          key={`particle-${barIndex}-${Date.now()}`}
          className='absolute w-1 h-1 bg-cyan-400 rounded-full'
          style={{
            left: '50%',
            bottom: '100%',
            transform: 'translateX(-50%)',
          }}
          initial={{
            y: 0,
            opacity: 1,
            scale: 0.5,
          }}
          animate={{
            y: -30,
            opacity: 0,
            scale: 1.5,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        />
      )
    }
    return null
  }

  return (
    <div className='w-full max-w-md mx-auto h-24 flex items-end justify-center gap-1 relative'>
      {bars.map((bar, index) => (
        <div key={bar.id} className='relative flex-1 max-w-4'>
          <motion.div
            className='w-full bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-300 relative overflow-visible'
            style={{
              boxShadow: isActive ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none',
            }}
            animate={
              isActive
                ? {
                    height: `${bar.height}%`,
                  }
                : {
                    height: '20%',
                  }
            }
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            {/* Glow effect at the top of taller bars */}
            {bar.height > 50 && (
              <motion.div
                className='absolute -top-1 left-0 right-0 h-2 bg-cyan-400 blur-sm'
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Particle effect */}
            {isActive && generateParticle(index, bar.height)}
          </motion.div>

          {/* Base indicator */}
          <div className='w-full h-1 bg-gray-600 mt-1' />
        </div>
      ))}

      {/* Frequency spectrum simulation lines */}
      <div className='absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30' />

      {/* Status indicator */}
      {isActive && (
        <motion.div
          className='absolute -top-6 right-0 flex items-center gap-2 text-cyan-400 text-xs font-mono'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className='w-2 h-2 bg-cyan-400 rounded-full'
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          ACTIVE
        </motion.div>
      )}
    </div>
  )
}
