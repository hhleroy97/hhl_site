'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CyberpunkBackground() {
  const [floatingParticles, setFloatingParticles] = useState<
    Array<{ id: number; initialX: number; initialY: number }>
  >([])

  useEffect(() => {
    // Generate random floating particles
    const particleArray = Array.from({ length: 15 }, (_, particleIndex) => ({
      id: particleIndex,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    }))
    setFloatingParticles(particleArray)
  }, [])

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Base gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-purple-900/50 to-black' />

      {/* Animated moving gridlines */}
      <motion.div
        className='absolute inset-0 opacity-20'
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Parallax neon skyline silhouette */}
      <div className='absolute bottom-0 left-0 w-full h-64 opacity-40'>
        <motion.svg
          viewBox='0 0 1200 300'
          className='w-full h-full'
          preserveAspectRatio='none'
          animate={{
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <defs>
            <linearGradient
              id='neonSkylineGradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#00ffff' stopOpacity='0.8' />
              <stop offset='50%' stopColor='#ff00ff' stopOpacity='0.6' />
              <stop offset='100%' stopColor='#000000' stopOpacity='0.9' />
            </linearGradient>
          </defs>

          {/* Building silhouettes with varied heights */}
          {Array.from({ length: 20 }, (_, buildingIndex) => {
            const buildingWidth = 30 + Math.random() * 40
            const buildingHeight = 100 + Math.random() * 150
            const buildingXPosition = buildingIndex * 60
            const buildingYPosition = 300 - buildingHeight

            return (
              <motion.rect
                key={buildingIndex}
                x={buildingXPosition}
                y={buildingYPosition}
                width={buildingWidth}
                height={buildingHeight}
                fill='url(#neonSkylineGradient)'
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: buildingIndex * 0.2,
                }}
              />
            )
          })}
        </motion.svg>
      </div>

      {/* Floating neon particles */}
      {floatingParticles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50'
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.id * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Glitch scanlines effect */}
      <motion.div
        className='absolute inset-0'
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 3 + Math.random() * 5,
        }}
      >
        <div className='absolute top-1/4 left-0 w-full h-0.5 bg-cyan-400' />
        <div className='absolute top-3/4 left-0 w-full h-0.5 bg-pink-500' />
      </motion.div>

      {/* RGB split shimmer effect */}
      <motion.div
        className='absolute inset-0 mix-blend-overlay'
        animate={{
          background: [
            'linear-gradient(45deg, transparent 40%, rgba(255,0,0,0.1) 45%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 55%, transparent 60%)',
            'linear-gradient(45deg, transparent 30%, rgba(255,0,0,0.1) 35%, rgba(0,255,0,0.1) 40%, rgba(0,0,255,0.1) 45%, transparent 50%)',
            'linear-gradient(45deg, transparent 40%, rgba(255,0,0,0.1) 45%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 55%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4 + Math.random() * 6,
        }}
      />
    </div>
  )
}
