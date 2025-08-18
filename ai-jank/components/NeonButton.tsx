'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  startDelay?: number
  disabled?: boolean
}

export default function NeonButton({
  children,
  onClick,
  startDelay = 0,
  disabled = false,
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create ripple effect
    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <motion.div
      className='relative'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: disabled ? 0 : 1, scale: disabled ? 0.8 : 1 }}
      transition={{ delay: startDelay, duration: 0.5 }}
    >
      <motion.button
        className='relative px-8 py-4 bg-black border-4 border-cyan-400 text-cyan-400 font-mono font-bold text-lg uppercase tracking-wider overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed'
        style={{
          imageRendering: 'pixelated',
          borderStyle: 'solid',
          boxShadow: '4px 4px 0px #ff00ff',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
      >
        {/* Animated border drawing effect */}
        <motion.div
          className='absolute inset-0 border-2 border-transparent'
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              #00ffff 50%, 
              transparent 100%) padding-box,
              linear-gradient(90deg, 
              transparent 0%, 
              #00ffff 50%, 
              transparent 100%) border-box`,
          }}
          animate={
            isHovered
              ? {
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: 'linear',
          }}
        />

        {/* Neon glow effect */}
        <motion.div
          className='absolute inset-0 border-2 border-cyan-400 rounded-none'
          animate={
            isHovered
              ? {
                  boxShadow: [
                    '0 0 10px #00ffff, inset 0 0 10px #00ffff',
                    '0 0 20px #00ffff, inset 0 0 20px #00ffff',
                    '0 0 30px #00ffff, inset 0 0 30px #00ffff',
                    '0 0 20px #00ffff, inset 0 0 20px #00ffff',
                    '0 0 10px #00ffff, inset 0 0 10px #00ffff',
                  ],
                }
              : {
                  boxShadow: '0 0 5px #00ffff, inset 0 0 5px #00ffff',
                }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Button content */}
        <motion.span
          className='relative z-10'
          animate={
            isHovered
              ? {
                  textShadow: [
                    '0 0 10px #00ffff',
                    '0 0 20px #00ffff',
                    '0 0 10px #00ffff',
                  ],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
          }}
        >
          {children}
        </motion.span>

        {/* Ripple effects */}
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className='absolute rounded-full border border-cyan-400 pointer-events-none'
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 20,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Hover fill effect */}
        <motion.div
          className='absolute inset-0 bg-cyan-400 opacity-0'
          animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  )
}
