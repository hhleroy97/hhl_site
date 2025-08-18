import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import ProfessionalLandingDemo from '@components/ProfessionalLandingDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'

type AppView = 'landing' | 'portfolio'

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnterPortfolio = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('portfolio')
      setIsTransitioning(false)
    }, 800)
  }

  const handleBackToLanding = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('landing')
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <div className='relative min-h-screen bg-slate-50 overflow-hidden'>
      <AnimatePresence mode='wait'>
        {currentView === 'landing' && (
          <motion.div
            key='landing'
            className='relative'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)',
            }}
            transition={{ duration: 0.8 }}
          >
            <ProfessionalLandingDemo
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
            transition={{ duration: 0.8 }}
          >
            <PortfolioSection />

            <Navigation
              onBackToCard={handleBackToLanding}
              showBackButton={true}
              className='top-8 left-8'
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      {isTransitioning && (
        <motion.div
          className='fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LoadingSpinner size='lg' text='TRANSITIONING...' />
        </motion.div>
      )}
    </div>
  )
}
