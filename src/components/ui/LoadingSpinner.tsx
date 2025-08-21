import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Loading...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role='status'
      aria-live='polite'
      aria-label='Loading content'
    >
      {/* Modern spinner design */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        <div className='absolute inset-0 rounded-full border-2 border-zinc-600/20' />
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400' />
      </motion.div>

      {text && (
        <motion.p
          className={`text-zinc-300 ${textSizes[size]} mt-4 font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}

      {/* Screen reader only text */}
      <span className='sr-only'>Loading, please wait...</span>
    </div>
  )
}

export default LoadingSpinner
