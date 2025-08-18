import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
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
    xl: 'w-24 h-24',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role='status'
      aria-live='polite'
      aria-label='Loading content'
    >
      {/* Enhanced spinner design with cyberpunk aesthetic */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer ring */}
        <div className='absolute inset-0 rounded-full border-2 border-cyberpunk-text-disabled/20' />

        {/* Animated ring */}
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-cyberpunk-neon' />

        {/* Inner glow effect */}
        <div className='absolute inset-1 rounded-full bg-gradient-to-br from-cyberpunk-neon/10 to-transparent' />

        {/* Center dot */}
        <div className='absolute top-1/2 left-1/2 w-1 h-1 bg-cyberpunk-neon rounded-full transform -translate-x-1/2 -translate-y-1/2' />
      </motion.div>

      {text && (
        <motion.p
          className={`text-cyberpunk-text-secondary font-body ${textSizes[size]} mt-4 font-medium tracking-wide`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
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
