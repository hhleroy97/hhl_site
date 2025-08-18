import { useState, useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerDossierDemo from '@components/CyberpunkTrainerDossierDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import ErrorBoundary from '@components/ui/ErrorBoundary'
import {
  performanceMonitor,
  prefersReducedMotion as checkReducedMotion,
} from '@/utils/performance'

type AppView = 'trainer-card' | 'portfolio'

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('trainer-card')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    setPrefersReducedMotion(checkReducedMotion())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        performanceMonitor.logMetrics()
      }, 3000)
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleEnterPortfolio = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('portfolio')
      setIsTransitioning(false)
    }, 800)
  }

  const handleBackToTrainerCard = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('trainer-card')
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <ErrorBoundary>
      <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
        {/* Improved background with subtle gradient */}
        <div
          className='fixed inset-0 bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan opacity-80'
          aria-hidden='true'
        />

        {/* Subtle grid pattern - less intrusive */}
        <div
          className='fixed inset-0 opacity-[0.02] pointer-events-none'
          aria-hidden='true'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyberpunk-neon text-black font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
        >
          Skip to main content
        </a>

        <AnimatePresence mode='wait'>
          {currentView === 'trainer-card' && (
            <motion.div
              key='trainer-card'
              id='main-content'
              className='relative z-10'
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -20,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.6,
                ease: [0.4, 0.0, 0.2, 1], // Professional easing curve
              }}
            >
              <Suspense
                fallback={
                  <LoadingSpinner size='lg' text='Loading profile...' />
                }
              >
                <CyberpunkTrainerDossierDemo
                  onEnterPortfolio={handleEnterPortfolio}
                />
              </Suspense>
            </motion.div>
          )}

          {currentView === 'portfolio' && (
            <motion.div
              key='portfolio'
              id='main-content'
              className='relative z-10'
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -40,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <Suspense
                fallback={
                  <LoadingSpinner size='lg' text='Loading portfolio...' />
                }
              >
                <PortfolioSection />
              </Suspense>

              <Navigation
                onBackToCard={handleBackToTrainerCard}
                showBackButton={true}
                className='top-6 left-6 md:top-8 md:left-8'
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Improved loading state */}
        {isTransitioning && (
          <motion.div
            className='fixed inset-0 z-[100] bg-cyberpunk-dark/95 backdrop-blur-sm flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='text-center'>
              <LoadingSpinner size='lg' text='Loading...' />
              <p className='mt-4 text-cyberpunk-text-muted text-sm'>
                Preparing your experience
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  )
}
