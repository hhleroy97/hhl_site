import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerDossierDemo from '@components/CyberpunkTrainerDossierDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'

type AppView = 'trainer-card' | 'portfolio'

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const transitionDuration = shouldReduceMotion ? 0.2 : 0.8
  const overlayDuration = shouldReduceMotion ? 0.1 : 0.4
  const transitionMs = shouldReduceMotion ? 200 : 800
  const [currentView, setCurrentView] = useState<AppView>('trainer-card')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnterPortfolio = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('portfolio')
      setIsTransitioning(false)
    }, transitionMs)
  }

  const handleBackToTrainerCard = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('trainer-card')
      setIsTransitioning(false)
    }, transitionMs)
  }

  return (
    <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
      <a href='#main-content' className='skip-link'>
        Skip to content
      </a>
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
            transition={{ duration: transitionDuration }}
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
            transition={{ duration: transitionDuration }}
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

      {/* Transition Overlay */}
      {isTransitioning && (
        <motion.div
          className='fixed inset-0 z-[100] bg-cyberpunk-dark flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: overlayDuration }}
        >
          <LoadingSpinner size='lg' text='TRANSITIONING...' />
        </motion.div>
      )}
    </div>
  )
}
