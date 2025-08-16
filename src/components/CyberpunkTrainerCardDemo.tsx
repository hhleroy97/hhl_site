import React from 'react'
import { motion } from 'framer-motion'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8 relative overflow-hidden'>
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

      <div className='max-w-4xl mx-auto space-y-8 relative z-10'>
        {/* Main Demo Card */}
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <CyberpunkTrainerCard
            trainerName='HARTLEY H. LEROY'
            className='max-w-3xl w-full'
          />
        </motion.div>

        {/* Social Links - Outside the Card */}
        <motion.div
          className='flex justify-center space-x-6 mt-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <a
            href='https://linkedin.com/in/hartley-leroy'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative px-8 py-4 bg-gradient-to-r from-cyberpunk-blue/20 to-cyberpunk-purple/20 text-cyberpunk-blue font-cyber font-bold text-lg transition-all duration-300 hover:bg-cyberpunk-blue/30 hover:shadow-lg hover:shadow-cyberpunk-blue/30 hover:scale-105'
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            {/* Angular border */}
            <div
              className='absolute inset-0 border border-cyberpunk-blue/50 group-hover:border-cyberpunk-blue transition-colors duration-300'
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            ></div>
            <span className='relative z-10'>LINKEDIN</span>
            <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/10 to-cyberpunk-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </a>

          <a
            href='https://github.com/hartley-leroy'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative px-8 py-4 bg-gradient-to-r from-cyberpunk-green/20 to-cyberpunk-blue/20 text-cyberpunk-green font-cyber font-bold text-lg transition-all duration-300 hover:bg-cyberpunk-green/30 hover:shadow-lg hover:shadow-cyberpunk-green/30 hover:scale-105'
            style={{
              clipPath:
                'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >
            {/* Angular border */}
            <div
              className='absolute inset-0 border border-cyberpunk-green/50 group-hover:border-cyberpunk-green transition-colors duration-300'
              style={{
                clipPath:
                  'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            ></div>
            <span className='relative z-10'>GITHUB</span>
            <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-green/10 to-cyberpunk-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </a>
        </motion.div>
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

export default CyberpunkTrainerCardDemo
