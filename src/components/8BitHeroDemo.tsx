import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import CyberpunkPokedex from './CyberpunkPokedex'

// 8-Bit Cyberpunk Background Component
function CyberpunkBackground() {
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
          imageRendering: 'pixelated' as const,
        }}
      />

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
              imageRendering: 'pixelated' as const,
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
            imageRendering: 'pixelated' as const,
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
    </div>
  )
}

// Main 8-Bit Hero Demo Component
export default function EightBitHeroDemo() {
  const [introStep, setIntroStep] = useState(0)

  useEffect(() => {
    // Start intro sequence
    const timer = setTimeout(() => setIntroStep(1), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden'>
      {/* 8-Bit Cyberpunk Background */}
      <CyberpunkBackground />

      {/* Glitch Flash Effect */}
      <motion.div
        className='absolute inset-0 bg-white mix-blend-overlay'
        animate={introStep >= 1 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.1, times: [0, 0.1, 1], delay: 1.5 }}
        onAnimationComplete={() => setIntroStep(2)}
      />

      {/* Main Content */}
      <div className='relative z-10 flex flex-col items-center justify-center space-y-8 px-4'>
        {/* Cyberpunk Pokédex Business Card */}
        <motion.div
          className='w-full flex justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: introStep >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <CyberpunkPokedex startDelay={0} />
        </motion.div>

        {/* Demo Note */}
        <motion.div
          className='text-center mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6 }}
        >
          <div className='px-4 py-2 bg-black border border-yellow-400 text-yellow-400 font-mono text-sm'>
            📱 CYBERPUNK POKÉDEX BUSINESS CARD
          </div>
        </motion.div>
      </div>

      {/* System status indicator */}
      <motion.div
        className='absolute top-4 left-1/2 transform -translate-x-1/2 text-cyan-400 font-mono text-sm opacity-60'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        SYSTEM ONLINE
      </motion.div>

      {/* Corner brackets */}
      <div className='absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-400 opacity-60' />
      <div className='absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-400 opacity-60' />
      <div className='absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-400 opacity-60' />
      <div className='absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-400 opacity-60' />
    </div>
  )
}
