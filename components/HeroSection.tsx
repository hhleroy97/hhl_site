'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CyberpunkBackground from './CyberpunkBackground'
import GlitchNameReveal from './GlitchNameReveal'
import TypewriterText from './TypewriterText'
import NeonButton from './NeonButton'
import AudioVisualizer from './AudioVisualizer'

interface HeroSectionProps {
  onEnterPortfolio?: () => void
}

export default function HeroSection({ onEnterPortfolio }: HeroSectionProps) {
  const [introStep, setIntroStep] = useState(0)

  // Intro sequence timing:
  // 0: Initial load + background animation (1s)
  // 1: Glitch flash (1.5s)
  // 2: Name reveal (3.5s)
  // 3: Tagline typewriter (6s)
  // 4: Button power on + visualizer (7s)

  const handleNameRevealComplete = () => {
    setIntroStep(3)
  }

  const handleTaglineComplete = () => {
    setIntroStep(4)
  }

  const handleButtonClick = () => {
    onEnterPortfolio?.()
  }

  return (
    <div className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden'>
      {/* Cyberpunk Background */}
      <CyberpunkBackground />

      {/* Glitch Flash Effect */}
      <motion.div
        className='absolute inset-0 bg-white mix-blend-overlay'
        animate={
          introStep >= 1
            ? {
                opacity: [0, 1, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 0.1,
          times: [0, 0.1, 1],
          delay: 1.5,
        }}
        onAnimationComplete={() => setIntroStep(2)}
      />

      {/* Main Content Container */}
      <div className='relative z-10 flex flex-col items-center justify-center space-y-8 md:space-y-12 px-4'>
        {/* Name Reveal */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: introStep >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlitchNameReveal
            text='HARTLEY H. LEROY'
            startDelay={0}
            onComplete={handleNameRevealComplete}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: introStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <TypewriterText
            text='Engineer • Builder • Creative Technologist'
            startDelay={0}
            typeSpeed={80}
            onComplete={handleTaglineComplete}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: introStep >= 4 ? 1 : 0,
            y: introStep >= 4 ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <NeonButton onClick={handleButtonClick} disabled={introStep < 4}>
            Enter Portfolio
          </NeonButton>
        </motion.div>
      </div>

      {/* Audio Visualizer - Bottom */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: introStep >= 4 ? 1 : 0,
          y: introStep >= 4 ? 0 : 50,
        }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <AudioVisualizer barCount={24} startDelay={0} />
      </motion.div>

      {/* Subtle scan lines overlay */}
      <motion.div
        className='absolute inset-0 pointer-events-none opacity-10'
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.1) 2px,
            rgba(0, 255, 255, 0.1) 4px
          )`,
        }}
        animate={{
          transform: ['translateY(0px)', 'translateY(4px)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner brackets for cyberpunk aesthetic */}
      <div className='absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-400 opacity-60' />
      <div className='absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-400 opacity-60' />
      <div className='absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-400 opacity-60' />
      <div className='absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-400 opacity-60' />

      {/* System status indicator */}
      <motion.div
        className='absolute top-4 left-1/2 transform -translate-x-1/2 text-cyan-400 font-mono text-sm opacity-60'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        SYSTEM ONLINE
      </motion.div>
    </div>
  )
}
