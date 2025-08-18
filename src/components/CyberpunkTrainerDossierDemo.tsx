import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CyberpunkTrainerDossier from './CyberpunkTrainerDossier'

interface CyberpunkTrainerDossierDemoProps {
  onEnterPortfolio?: () => void
}

const CyberpunkTrainerDossierDemo: React.FC<
  CyberpunkTrainerDossierDemoProps
> = ({ onEnterPortfolio }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-screen bg-cyberpunk-dark relative overflow-hidden'>
      {/* Optimized Animated Grid Background */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: prefersReducedMotion
              ? 'none'
              : 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Enhanced Ambient Lighting Effects with reduced motion support */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-neon/10 rounded-full filter blur-3xl'
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-pink/10 rounded-full filter blur-3xl'
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.12, 0.1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyberpunk-blue/5 rounded-full filter blur-3xl'
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.08, 0.05],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Optimized Scanlines Overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-10'>
        <div className='scanlines h-full w-full' />
      </div>

      {/* Main Content Container */}
      <div className='flex items-center justify-center min-h-screen relative z-10 p-4'>
        <div className='w-full max-w-6xl'>
          {/* Main Trainer Dossier with enhanced loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.95,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.4 : 0.6,
              ease: 'easeOut',
              delay: 0.2,
            }}
          >
            <CyberpunkTrainerDossier onEnterPortfolio={onEnterPortfolio} />
          </motion.div>
        </div>
      </div>

      {/* Enhanced keyboard navigation hints */}
      <div className='fixed bottom-4 left-4 z-40 opacity-60 hover:opacity-100 transition-opacity duration-300'>
        <div className='bg-cyberpunk-dark-surface/80 backdrop-blur-sm border border-cyberpunk-neon/20 rounded-lg px-3 py-2 text-xs text-cyberpunk-text-muted'>
          <span className='font-mono'>TAB</span> to navigate
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        /* Optimized scanlines animation */
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.03) 2px,
            rgba(0, 255, 255, 0.03) 4px
          );
          animation: ${prefersReducedMotion ? 'none' : 'flicker 0.15s linear infinite'};
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossierDemo
