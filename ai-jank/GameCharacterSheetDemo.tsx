import React from 'react'
import { motion } from 'framer-motion'
import GameCharacterSheet from './GameCharacterSheet'

interface GameCharacterSheetDemoProps {
  onEnterPortfolio?: () => void
}

const GameCharacterSheetDemo: React.FC<GameCharacterSheetDemoProps> = ({
  onEnterPortfolio,
}) => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark relative overflow-hidden'>
      {/* Cyberpunk grid background */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'hologramShift 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Ambient lighting effects */}
      <div className='absolute top-0 left-1/3 w-96 h-96 bg-cyberpunk-neon/10 rounded-full filter blur-3xl' />
      <div className='absolute bottom-0 right-1/3 w-96 h-96 bg-cyberpunk-pink/10 rounded-full filter blur-3xl' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyberpunk-blue/5 rounded-full filter blur-3xl' />

      {/* Enhanced scanlines overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-15'>
        <div className='scanlines h-full w-full' />
      </div>

      <div className='flex items-center justify-center min-h-screen relative z-10 p-4'>
        <div className='w-full'>
          {/* Game character sheet with dramatic entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <GameCharacterSheet onEnterPortfolio={onEnterPortfolio} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes hologramShift {
          0%, 100% { opacity: 0.1; transform: translate(0, 0); }
          25% { opacity: 0.3; transform: translate(1px, 1px); }
          50% { opacity: 0.15; transform: translate(2px, -1px); }
          75% { opacity: 0.25; transform: translate(-1px, 2px); }
        }
      `}</style>
    </div>
  )
}

export default GameCharacterSheetDemo
