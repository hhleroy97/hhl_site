import React from 'react'
import { motion } from 'framer-motion'
import UnifiedTrainerCard from './UnifiedTrainerCard'

interface UnifiedTrainerCardDemoProps {
  onEnterPortfolio?: () => void
}

const UnifiedTrainerCardDemo: React.FC<UnifiedTrainerCardDemoProps> = ({
  onEnterPortfolio,
}) => {
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

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-20'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10'>
        <div className='w-full max-w-5xl'>
          {/* Main Unified Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <UnifiedTrainerCard onEnterPortfolio={onEnterPortfolio} />
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

export default UnifiedTrainerCardDemo
