import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'

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
    <nav 
      className={`fixed z-50 ${className}`}
      role='navigation'
      aria-label='Site navigation'
    >
      {/* Back to Trainer Card Button */}
      {showBackButton && onBackToCard && (
        <motion.button
          onClick={onBackToCard}
          className='group relative px-4 py-3 text-sm font-semibold 
                   text-white/90 border border-white/20 bg-slate-800/60 
                   backdrop-blur-sm rounded-lg transition-all duration-300 
                   hover:bg-slate-700/60 hover:border-primary-400/40 hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label='Return to trainer dossier'
        >
          <span className='relative z-10 flex items-center gap-2'>
            <ArrowLeft className='w-4 h-4' />
            BACK TO CARD
          </span>
          <div
            className='absolute inset-0 bg-gradient-to-r from-primary-400/10 to-transparent 
                        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          />
        </motion.button>
      )}

      {/* Enter Portfolio Button */}
      {showEnterButton && onEnterPortfolio && (
        <motion.button
          onClick={onEnterPortfolio}
          className='group relative px-6 py-3 text-sm font-semibold 
                   text-gray-900 bg-primary-500 hover:bg-primary-400
                   border border-transparent rounded-lg transition-all duration-300 
                   hover:scale-[1.02] shadow-lg shadow-primary-500/30
                   focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label='Explore portfolio section'
        >
          <span className='relative z-10 flex items-center gap-2'>
            EXPLORE SITE
            <ExternalLink className='w-4 h-4' />
          </span>
          <div
            className='absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          />
        </motion.button>
      )}
    </nav>
  )
}

export default Navigation
