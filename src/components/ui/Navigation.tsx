import React from 'react'
import { motion } from 'framer-motion'

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
  return (
    <nav aria-label='In-page navigation' className={`fixed z-50 ${className}`}>
      {/* Back to Trainer Card Button */}
      {showBackButton && onBackToCard && (
        <motion.button
          onClick={onBackToCard}
          type='button'
          aria-label='Back to trainer card'
          title='Back to trainer card'
          className='group relative px-4 py-2 text-xs font-cyber font-bold 
                   text-cyberpunk-pink border border-cyberpunk-pink bg-cyberpunk-dark/60 
                   backdrop-blur-sm rounded transition-all duration-300 
                   hover:bg-cyberpunk-pink hover:text-black hover:shadow-lg hover:shadow-cyberpunk-pink/50 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-cyberpunk-pink focus-visible:ring-offset-2 focus-visible:ring-offset-cyberpunk-dark'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className='relative z-10'>← BACK TO CARD</span>
          <div
            className='absolute inset-0 bg-gradient-to-r from-cyberpunk-pink/20 to-cyberpunk-purple/20 
                        rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          />
        </motion.button>
      )}

      {/* Enter Portfolio Button */}
      {showEnterButton && onEnterPortfolio && (
        <motion.button
          onClick={onEnterPortfolio}
          type='button'
          aria-label='Explore site'
          title='Explore site'
          className='group relative px-6 py-3 text-sm font-cyber font-bold 
                   text-cyberpunk-neon border-2 border-cyberpunk-neon bg-cyberpunk-dark/80 
                   backdrop-blur-sm rounded-lg transition-all duration-300 
                   hover:bg-cyberpunk-neon hover:text-black hover:shadow-lg hover:shadow-cyberpunk-neon/50 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-cyberpunk-neon focus-visible:ring-offset-2 focus-visible:ring-offset-cyberpunk-dark'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className='relative z-10'>EXPLORE SITE</span>
          <div
            className='absolute inset-0 bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-pink/20 
                        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          />
        </motion.button>
      )}
    </nav>
  )
}

export default Navigation
