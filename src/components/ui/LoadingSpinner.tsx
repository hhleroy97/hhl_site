import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      role='status'
      aria-live='polite'
      aria-label={text || 'Loading'}
    >
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Outer ring */}
        <div className='absolute inset-0 rounded-full border-2 border-slate-600' />
        
        {/* Animated spinner */}
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-primary-400' />
        
        {/* Inner glow */}
        <div className='absolute inset-1 rounded-full bg-primary-400/10' />
      </motion.div>

      {text && (
        <motion.div
          className={`font-mono font-semibold text-white/80 ${textSizes[size]} tracking-wider`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.div>
      )}

      {/* Screen reader only text */}
      <span className='sr-only'>
        {text || 'Loading, please wait'}
      </span>
    </div>
  )
}

export default LoadingSpinner
