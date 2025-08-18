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
      {/* Subtle Grid Background */}
      <div className='absolute inset-0 opacity-3'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 30s linear infinite',
          }}
        />
      </div>

      {/* Ambient Lighting Effects - Reduced intensity */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-neon/5 rounded-full filter blur-3xl' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-pink/5 rounded-full filter blur-3xl' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyberpunk-blue/3 rounded-full filter blur-3xl' />

      {/* Scanlines Overlay - Reduced opacity */}
      <div className='absolute inset-0 pointer-events-none opacity-5'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-4'>
        <div className='w-full max-w-7xl'>
          {/* Main Trainer Dossier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <CyberpunkTrainerDossier onEnterPortfolio={onEnterPortfolio} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossierDemo
