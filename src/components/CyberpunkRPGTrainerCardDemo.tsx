import React from 'react'
import { motion } from 'framer-motion'
import CyberpunkRPGTrainerCard from './CyberpunkRPGTrainerCard'

interface CyberpunkRPGTrainerCardDemoProps {
  onEnterPortfolio?: () => void
}

const CyberpunkRPGTrainerCardDemo: React.FC<
  CyberpunkRPGTrainerCardDemoProps
> = ({ onEnterPortfolio }) => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark relative overflow-hidden'>
      {/* Animated Background Grid */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 30s linear infinite',
          }}
        />
      </div>

      {/* Floating particles effect */}
      <div className='absolute inset-0'>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-cyberpunk-neon rounded-full opacity-30'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Global HUD overlay */}
      <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-pink to-cyberpunk-blue opacity-60' />
      <div className='absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-pink to-cyberpunk-neon opacity-60' />

      {/* System Status */}
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2 text-cyberpunk-neon font-mono text-xs opacity-50 text-center'>
        <div>CYBERPUNK NEURAL INTERFACE SYSTEM</div>
        <div>INITIALIZING... LOADING OPERATIVE DATA...</div>
      </div>

      {/* Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-15'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-4'>
        <div className='w-full'>
          {/* Boot-up sequence */}
          <motion.div
            className='text-center mb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className='text-cyberpunk-neon font-mono text-sm mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              [ ACCESSING OPERATIVE DATABASE... ]
            </motion.div>
            <motion.div
              className='text-cyberpunk-green font-mono text-sm'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              [ CONNECTION ESTABLISHED ]
            </motion.div>
          </motion.div>

          {/* Main RPG Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
          >
            <CyberpunkRPGTrainerCard onEnterPortfolio={onEnterPortfolio} />
          </motion.div>

          {/* Instructions */}
          <motion.div
            className='text-center mt-8'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <div className='text-cyberpunk-neon/60 font-mono text-sm mb-2'>
              [ HOVER OVER ABILITIES TO ANALYZE CAPABILITIES ]
            </div>
            <div className='text-cyberpunk-pink/60 font-mono text-xs'>
              NEURAL SCAN COMPLETE • ALL SYSTEMS OPERATIONAL • READY FOR MISSION
            </div>
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

export default CyberpunkRPGTrainerCardDemo
