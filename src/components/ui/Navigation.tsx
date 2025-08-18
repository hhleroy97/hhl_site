import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Home } from 'lucide-react'

interface NavigationProps {
  onBackToCard?: () => void
  onEnterPortfolio?: () => void
  showBackButton?: boolean
  showEnterButton?: boolean
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({
  onBackToCard,
  onEnterPortfolio,
  showBackButton = false,
  showEnterButton = false,
  className = '',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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

  // Show navigation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showBackButton && onBackToCard) {
        onBackToCard()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showBackButton, onBackToCard])

  if (!isVisible) return null

  return (
    <nav
      className={`fixed z-50 ${className}`}
      aria-label='Navigation'
      role='navigation'
    >
      {/* Back to Trainer Card Button */}
      {showBackButton && onBackToCard && (
        <motion.button
          onClick={onBackToCard}
          className='group flex items-center gap-2 px-4 py-2 bg-cyberpunk-dark-surface/80 backdrop-blur-sm text-cyberpunk-text-primary border border-cyberpunk-neon/40 rounded-lg font-medium transition-all duration-200 hover:bg-cyberpunk-dark-elevated hover:border-cyberpunk-neon/60 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2 focus:ring-offset-cyberpunk-dark'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.5,
            duration: prefersReducedMotion ? 0.2 : 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          whileHover={prefersReducedMotion ? {} : { x: -4 }}
          whileTap={{ scale: 0.98 }}
          aria-label='Go back to trainer card'
          title='Go back to trainer card (ESC)'
        >
          <ArrowLeft
            size={16}
            className='transition-transform group-hover:-translate-x-0.5'
          />
          <span className='font-medium hidden sm:inline'>Back to Card</span>
          <span className='font-medium sm:hidden'>Back</span>
        </motion.button>
      )}

      {/* Enter Portfolio Button */}
      {showEnterButton && onEnterPortfolio && (
        <motion.button
          onClick={onEnterPortfolio}
          className='group flex items-center gap-2 px-6 py-3 bg-cyberpunk-neon text-cyberpunk-dark font-medium rounded-lg transition-all duration-200 hover:bg-cyberpunk-neon/90 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2 focus:ring-offset-cyberpunk-dark'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: prefersReducedMotion ? 0.2 : 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          whileHover={prefersReducedMotion ? {} : { y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label='Explore full portfolio'
          title='Explore full portfolio'
        >
          <span className='font-medium hidden sm:inline'>
            Explore Portfolio
          </span>
          <span className='font-medium sm:hidden'>Portfolio</span>
          <ExternalLink
            size={16}
            className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          />
        </motion.button>
      )}

      {/* Home button for quick navigation */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='group flex items-center gap-2 px-3 py-2 bg-cyberpunk-dark-surface/60 backdrop-blur-sm text-cyberpunk-text-muted border border-cyberpunk-text-disabled/20 rounded-lg font-medium transition-all duration-200 hover:bg-cyberpunk-dark-surface hover:text-cyberpunk-text-primary hover:border-cyberpunk-neon/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2 focus:ring-offset-cyberpunk-dark ml-2'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.7,
          duration: prefersReducedMotion ? 0.2 : 0.4,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label='Scroll to top'
        title='Scroll to top'
      >
        <Home size={16} />
        <span className='hidden sm:inline text-xs'>Top</span>
      </motion.button>
    </nav>
  )
}

export default Navigation
