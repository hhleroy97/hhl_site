import React from 'react'
import { motion } from 'framer-motion'
import CyberpunkGameTrainerCard from './CyberpunkGameTrainerCard'

interface CyberpunkGameTrainerCardDemoProps {
  onEnterPortfolio?: () => void
}

const CyberpunkGameTrainerCardDemo: React.FC<
  CyberpunkGameTrainerCardDemoProps
> = ({ onEnterPortfolio }) => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-4 lg:p-8 relative overflow-hidden'>
      {/* Animated Background Grid */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Cyberpunk HUD Elements */}
      <div className='absolute top-8 left-8 text-cyberpunk-neon font-mono text-xs opacity-60'>
        <div>NEURAL INTERFACE v2.077</div>
        <div>STATUS: CONNECTED</div>
      </div>

      <div className='absolute top-8 right-8 text-cyberpunk-neon font-mono text-xs opacity-60 text-right'>
        <div>SYS_ID: HHL_TRAINER</div>
        <div>
          BUILD: {new Date().getFullYear()}.
          {String(new Date().getMonth() + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-20'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10'>
        <div className='w-full'>
          {/* Main Game-Style Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          >
            <CyberpunkGameTrainerCard onEnterPortfolio={onEnterPortfolio} />
          </motion.div>

          {/* Additional HUD Info */}
          <motion.div
            className='flex justify-center mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className='text-cyberpunk-neon/60 font-mono text-xs text-center'>
              <div>← HOVER OVER SERVICES & SKILLS TO ANALYZE →</div>
              <div className='mt-1'>
                NEURAL SCAN COMPLETE • ALL SYSTEMS OPERATIONAL
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkGameTrainerCardDemo
