import React from 'react'
import { motion } from 'framer-motion'
import CyberpunkTrainerDossier from './CyberpunkTrainerDossier'

interface CyberpunkTrainerDossierDemoProps {
  onEnterPortfolio?: () => void
}

const CyberpunkTrainerDossierDemo: React.FC<
  CyberpunkTrainerDossierDemoProps
> = ({ onEnterPortfolio }) => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark relative overflow-hidden'>
      {/* Animated Grid Background */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Ambient Lighting Effects */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-neon/10 rounded-full filter blur-3xl' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-pink/10 rounded-full filter blur-3xl' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyberpunk-blue/5 rounded-full filter blur-3xl' />

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-10'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-2'>
        <div className='w-full max-w-7xl'>
          {/* Main Trainer Dossier - No Delays */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <CyberpunkTrainerDossier onEnterPortfolio={onEnterPortfolio} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossierDemo
