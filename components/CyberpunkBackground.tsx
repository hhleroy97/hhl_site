'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CyberpunkBackground() {
  const [floatingParticles, setFloatingParticles] = useState<
    Array<{ id: number; initialX: number; initialY: number }>
  >([])
  const [pixelClouds, setPixelClouds] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([])

  useEffect(() => {
    // Generate random floating particles (8-bit style)
    const particleArray = Array.from({ length: 12 }, (_, particleIndex) => ({
      id: particleIndex,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    }))
    setFloatingParticles(particleArray)

    // Generate pixel clouds
    const cloudArray = Array.from({ length: 6 }, (_, cloudIndex) => ({
      id: cloudIndex,
      x: Math.random() * 100,
      y: Math.random() * 40 + 10,
      size: Math.random() * 20 + 15,
    }))
    setPixelClouds(cloudArray)
  }, [])

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* 8-bit style base background with dithering effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' />

      {/* Pixel dithering overlay */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #00ffff 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #ff00ff 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 4px 4px',
        }}
      />

      {/* 8-bit pixel grid */}
      <motion.div
        className='absolute inset-0 opacity-15'
        animate={{
          backgroundPosition: ['0px 0px', '16px 16px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated',
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

      {/* 8-bit pixel clouds */}
      {pixelClouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className='absolute'
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
          }}
          animate={{
            x: [-10, 10, -10],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + cloud.id,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className='w-full h-full bg-cyan-300'
            style={{
              clipPath:
                'polygon(20% 0%, 80% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)',
              imageRendering: 'pixelated',
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      {/* 8-bit style floating particles */}
      {floatingParticles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute w-2 h-2 bg-cyan-400 shadow-lg shadow-cyan-400/50'
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            imageRendering: 'pixelated',
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.id * 0.4,
            ease: 'linear',
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
