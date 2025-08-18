import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerDossierDemo from '@components/CyberpunkTrainerDossierDemo'
import Navigation from '@components/ui/Navigation'
import LoadingSpinner from '@components/ui/LoadingSpinner'

type AppView = 'trainer-card' | 'portfolio'

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('trainer-card')
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
      {/* Improved background with subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan opacity-80" />
      
      {/* Subtle grid pattern - less intrusive */}
      <div
        className='fixed inset-0 opacity-[0.02] pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <AnimatePresence mode='wait'>
        {currentView === 'trainer-card' && (
          <motion.div
            key='trainer-card'
            className='relative z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0.0, 0.2, 1] // Professional easing curve
            }}
          >
            <CyberpunkTrainerDossierDemo
              onEnterPortfolio={handleEnterPortfolio}
            />
          </motion.div>
        )}

        {currentView === 'portfolio' && (
          <motion.div
            key='portfolio'
            className='relative z-10'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.98,
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0.0, 0.2, 1] 
            }}
          >
            <PortfolioSection />

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
          <div className="text-center">
            <LoadingSpinner size='lg' text='Loading...' />
            <p className="mt-4 text-cyberpunk-text-muted text-sm">
              Preparing your experience
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
