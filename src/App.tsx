import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerDossierDemo from '@components/CyberpunkTrainerDossierDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'

type AppView = 'trainer-card' | 'portfolio'

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('trainer-card')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  const handleEnterPortfolio = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('portfolio')
      setIsTransitioning(false)
    }, prefersReducedMotion ? 400 : 800)
  }

  const handleBackToTrainerCard = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('trainer-card')
      setIsTransitioning(false)
    }, prefersReducedMotion ? 400 : 800)
  }

  return (
    <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
      {/* Skip to main content link for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-gray-900 focus:rounded-lg focus:font-semibold'
      >
        Skip to main content
      </a>

      <main id='main-content' className='relative'>
        <AnimatePresence mode='wait'>
          {currentView === 'trainer-card' && (
            <motion.div
              key='trainer-card'
              className='relative'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                filter: 'blur(10px)',
              }}
              transition={{ 
                duration: prefersReducedMotion ? 0.4 : 0.8,
                ease: 'easeInOut'
              }}
              role='region'
              aria-label='Professional trainer dossier'
            >
              <CyberpunkTrainerDossierDemo
                onEnterPortfolio={handleEnterPortfolio}
              />
            </motion.div>
          )}

          {currentView === 'portfolio' && (
            <motion.div
              key='portfolio'
              initial={{ opacity: 0, scale: 1.1, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateY: -90,
                filter: 'blur(10px)',
              }}
              transition={{ 
                duration: prefersReducedMotion ? 0.4 : 0.8,
                ease: 'easeInOut'
              }}
              role='region'
              aria-label='Portfolio section'
            >
              <PortfolioSection />

              <Navigation
                onBackToCard={handleBackToTrainerCard}
                showBackButton={true}
                className='top-8 left-8'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Transition Overlay */}
      {isTransitioning && (
        <motion.div
          className='fixed inset-0 z-[100] bg-cyberpunk-dark flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
          role='status'
          aria-live='polite'
          aria-label='Loading portfolio section'
        >
          <LoadingSpinner size='lg' text='TRANSITIONING...' />
        </motion.div>
      )}

      {/* Focus management for screen readers */}
      <div className='sr-only' aria-live='polite'>
        {currentView === 'trainer-card' 
          ? 'Currently viewing professional trainer dossier' 
          : 'Currently viewing portfolio section'
        }
      </div>
    </div>
  )
}
