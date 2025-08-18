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

      {/* HUD Elements */}
      <div className='absolute top-8 left-8 text-cyberpunk-neon font-mono text-xs opacity-60'>
        <div>DOSSIER SYSTEM v4.1</div>
        <div>STATUS: CONNECTED</div>
      </div>

      <div className='absolute top-8 right-8 text-cyberpunk-neon font-mono text-xs opacity-60 text-right'>
        <div>ID: HHL_OPERATIVE</div>
        <div>
          BUILD: {new Date().getFullYear()}.
          {String(new Date().getMonth() + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Top/Bottom Neon Strips */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-pink to-cyberpunk-blue opacity-60' />
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-pink to-cyberpunk-neon opacity-60' />

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-10'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-6'>
        <div className='w-full'>
          {/* Boot Sequence */}
          <motion.div
            className='text-center mb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className='text-cyberpunk-neon font-mono text-sm mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              [ INITIALIZING DOSSIER INTERFACE... ]
            </motion.div>
            <motion.div
              className='text-cyberpunk-green font-mono text-sm'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              [ NEURAL LINK ESTABLISHED ]
            </motion.div>
          </motion.div>

          {/* Main Trainer Dossier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          >
            <CyberpunkTrainerDossier onEnterPortfolio={onEnterPortfolio} />
          </motion.div>

          {/* Footer Instructions */}
          <motion.div
            className='text-center mt-6'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <div className='text-cyberpunk-neon/60 font-mono text-sm'>
              INTERACTIVE DOSSIER SYSTEM ONLINE • DATA ANALYSIS READY
            </div>
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
