import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import CyberpunkBackground from './CyberpunkBackground'
import GlitchText from './GlitchText'

interface IntroSectionProps {
  onEnter: () => void
}

export default function IntroSection({ onEnter }: IntroSectionProps) {
  const [typewriterText, setTypewriterText] = useState('')
  const [showButton, setShowButton] = useState(false)
  const fullText = 'Engineer • Builder • Creative Technologist'

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypewriterText(fullText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowButton(true), 500)
        }
      }, 80)

      return () => clearInterval(interval)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <motion.div
      className='relative h-screen w-full flex items-center justify-center overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.8,
        rotateY: -90,
        filter: 'blur(10px)',
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Cyberpunk Background */}
      <CyberpunkBackground />

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-30'>
        <div className='scanlines h-full w-full' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
        {/* Main Name with Glitch Effect */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='mb-8'
        >
          <GlitchText
            text='HARTLEY H. LEROY'
            className='text-5xl md:text-7xl lg:text-8xl font-cyber font-black tracking-wider'
            glitchIntensity='high'
          />
        </motion.div>

        {/* Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className='mb-12'
        >
          <div className='text-xl md:text-2xl lg:text-3xl font-display text-gray-300 font-light tracking-wide'>
            <span className='inline-block'>
              {typewriterText}
              <motion.span
                className='inline-block w-0.5 h-6 md:h-8 bg-cyberpunk-neon ml-1'
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </div>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={showButton ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <motion.button
            onClick={onEnter}
            className='group relative px-8 py-4 text-lg font-cyber font-bold text-cyberpunk-neon 
                     border-2 border-cyberpunk-neon bg-transparent rounded-lg
                     transition-all duration-300 hover:bg-cyberpunk-neon hover:text-black
                     hover:shadow-lg hover:shadow-cyberpunk-neon/50'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className='absolute inset-0 bg-cyberpunk-neon rounded-lg opacity-0 group-hover:opacity-20'
              layoutId='buttonBackground'
            />

            {/* Glitch overlay for button */}
            <motion.div
              className='absolute inset-0 bg-cyberpunk-pink rounded-lg opacity-0'
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            />

            <span className='relative z-10 tracking-wider'>VIEW PORTFOLIO</span>

            {/* Neon glow effect */}
            <motion.div
              className='absolute inset-0 rounded-lg border-2 border-cyberpunk-neon opacity-0 group-hover:opacity-100'
              animate={{
                boxShadow: [
                  '0 0 0px #00ffff',
                  '0 0 20px #00ffff',
                  '0 0 0px #00ffff',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className='absolute top-1/4 left-1/4 w-2 h-2 bg-cyberpunk-pink rounded-full'
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        />

        <motion.div
          className='absolute bottom-1/3 right-1/3 w-1 h-1 bg-cyberpunk-neon rounded-full'
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 2 }}
        />
      </div>

      {/* Corner Decorations */}
      <div className='absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyberpunk-neon opacity-60' />
      <div className='absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyberpunk-neon opacity-60' />
      <div className='absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyberpunk-neon opacity-60' />
      <div className='absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyberpunk-neon opacity-60' />
    </motion.div>
  )
}
