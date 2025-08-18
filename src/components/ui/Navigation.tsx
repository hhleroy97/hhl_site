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
    <nav className={`fixed z-50 ${className}`} aria-label="Navigation">
      {/* Back to Trainer Card Button */}
      {showBackButton && onBackToCard && (
        <motion.button
          onClick={onBackToCard}
          className='btn-ghost group flex items-center gap-2 focus-ring'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Go back to trainer card"
        >
          <ArrowLeft size={16} />
          <span className='font-medium'>Back to Card</span>
        </motion.button>
      )}

      {/* Enter Portfolio Button */}
      {showEnterButton && onEnterPortfolio && (
        <motion.button
          onClick={onEnterPortfolio}
          className='btn-primary group flex items-center gap-2 focus-ring'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Explore full portfolio"
        >
          <span className='font-medium'>Explore Portfolio</span>
          <ExternalLink size={16} />
        </motion.button>
      )}
    </nav>
  )
}

export default Navigation
