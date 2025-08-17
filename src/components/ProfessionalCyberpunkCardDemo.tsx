import React from 'react'
import { motion } from 'framer-motion'
import ProfessionalCyberpunkCard from './ProfessionalCyberpunkCard'

interface ProfessionalCyberpunkCardDemoProps {
  onEnterPortfolio?: () => void
}

const ProfessionalCyberpunkCardDemo: React.FC<
  ProfessionalCyberpunkCardDemoProps
> = ({ onEnterPortfolio }) => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark relative overflow-hidden'>
      {/* Minimal background elements for depth */}
      <div className='absolute inset-0 opacity-3'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Subtle ambient lighting */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-cyberpunk-neon/5 rounded-full filter blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-cyberpunk-pink/5 rounded-full filter blur-3xl' />

      {/* Clean scanlines overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-5'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-8'>
        <div className='w-full'>
          {/* Professional card with refined entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <ProfessionalCyberpunkCard onEnterPortfolio={onEnterPortfolio} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalCyberpunkCardDemo
