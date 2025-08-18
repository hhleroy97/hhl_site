import { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerDossierDemo from '@components/CyberpunkTrainerDossierDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'

// Lazy load components for better performance
const ErrorBoundary = lazy(() => import('@components/ui/ErrorBoundary'))

type AppView = 'trainer-card' | 'portfolio'

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('trainer-card')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterPortfolio = () => {
    setIsTransitioning(true)
    setTimeout(
      () => {
        setCurrentView('portfolio')
        setIsTransitioning(false)
      },
      prefersReducedMotion ? 300 : 800
    )
  }

  const handleBackToTrainerCard = () => {
    setIsTransitioning(true)
    setTimeout(
      () => {
        setCurrentView('trainer-card')
        setIsTransitioning(false)
      },
      prefersReducedMotion ? 300 : 800
    )
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentView === 'portfolio') {
        handleBackToTrainerCard()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentView])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-cyberpunk-dark flex items-center justify-center'>
        <div className='text-center'>
          <LoadingSpinner size='xl' text='Initializing...' />
          <p className='mt-4 text-cyberpunk-text-muted text-sm'>
            Loading Hartley's Portfolio
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
      {/* Enhanced background with better performance */}
      <div className='fixed inset-0 bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan opacity-80' />

      {/* Optimized grid pattern with reduced motion support */}
      <div
        className='fixed inset-0 opacity-[0.02] pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: prefersReducedMotion
            ? 'none'
            : 'gridMove 20s linear infinite',
        }}
      />

      {/* Skip to main content link for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-cyberpunk-neon text-cyberpunk-dark px-4 py-2 rounded-lg font-medium'
      >
        Skip to main content
      </a>

      <main id='main-content' className='relative z-10'>
        <AnimatePresence mode='wait'>
          {currentView === 'trainer-card' && (
            <motion.div
              key='trainer-card'
              className='relative'
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -20,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <Suspense
                fallback={<LoadingSpinner size='lg' text='Loading...' />}
              >
                <ErrorBoundary>
                  <CyberpunkTrainerDossierDemo
                    onEnterPortfolio={handleEnterPortfolio}
                  />
                </ErrorBoundary>
              </Suspense>
            </motion.div>
          )}

          {currentView === 'portfolio' && (
            <motion.div
              key='portfolio'
              className='relative'
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -40,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <Suspense
                fallback={
                  <LoadingSpinner size='lg' text='Loading portfolio...' />
                }
              >
                <ErrorBoundary>
                  <PortfolioSection />
                </ErrorBoundary>
              </Suspense>

              <Navigation
                onBackToCard={handleBackToTrainerCard}
                showBackButton={true}
                className='top-6 left-6 md:top-8 md:left-8'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Enhanced loading state with better UX */}
      {isTransitioning && (
        <motion.div
          className='fixed inset-0 z-[100] bg-cyberpunk-dark/95 backdrop-blur-sm flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.3 }}
          role='status'
          aria-live='polite'
        >
          <div className='text-center'>
            <LoadingSpinner size='lg' text='Loading...' />
            <p className='mt-4 text-cyberpunk-text-muted text-sm'>
              {currentView === 'trainer-card'
                ? 'Preparing portfolio...'
                : 'Returning to card...'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Keyboard navigation hint */}
      <div className='fixed bottom-4 right-4 z-40 opacity-60 hover:opacity-100 transition-opacity duration-300'>
        <div className='bg-cyberpunk-dark-surface/80 backdrop-blur-sm border border-cyberpunk-neon/20 rounded-lg px-3 py-2 text-xs text-cyberpunk-text-muted'>
          <span className='font-mono'>ESC</span> to go back
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
