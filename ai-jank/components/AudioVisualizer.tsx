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
            className='w-full relative overflow-visible'
            style={{
              backgroundColor: '#00ff00',
              boxShadow: isActive
                ? '0 0 8px rgba(0, 255, 0, 0.8), inset 0 0 4px rgba(255, 255, 255, 0.3)'
                : 'none',
              imageRendering: 'pixelated',
              border: isActive ? '1px solid #00ffff' : '1px solid #004400',
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
            {/* 8-bit style peak indicator */}
            {bar.height > 60 && (
              <motion.div
                className='absolute -top-1 left-0 right-0 h-1 bg-yellow-400'
                style={{
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 4px #ffff00',
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  backgroundColor: ['#ffff00', '#ff00ff', '#ffff00'],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}

            {/* Particle effect */}
            {isActive && generateParticle(index, bar.height)}
          </motion.div>

          {/* 8-bit base indicator */}
          <div
            className='w-full h-1 bg-gray-700 mt-1 border border-gray-500'
            style={{ imageRendering: 'pixelated' }}
          />
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
