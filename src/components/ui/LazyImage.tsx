import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  fallback?: string
  onLoad?: () => void
  onError?: () => void
  priority?: boolean
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  fallback,
  onLoad,
  onError,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  const shouldShowPlaceholder = !isInView || (!isLoaded && !hasError)
  const shouldShowFallback = hasError && fallback
  const shouldShowImage = isInView && !hasError

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      role='img'
      aria-label={alt}
    >
      {/* Placeholder */}
      {shouldShowPlaceholder && (
        <motion.div
          className='absolute inset-0 bg-cyberpunk-dark-surface flex items-center justify-center'
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=''
              className='w-full h-full object-cover opacity-50'
              loading='eager'
            />
          ) : (
            <div className='loading-shimmer w-full h-full' />
          )}
        </motion.div>
      )}

      {/* Fallback */}
      {shouldShowFallback && (
        <motion.div
          className='absolute inset-0 bg-cyberpunk-dark-surface flex items-center justify-center text-cyberpunk-text-muted'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={fallback}
            alt={alt}
            className='w-full h-full object-cover'
            loading='lazy'
          />
        </motion.div>
      )}

      {/* Main Image */}
      {shouldShowImage && (
        <motion.img
          src={src}
          alt={alt}
          className='w-full h-full object-cover'
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <motion.div
          className='absolute inset-0 flex items-center justify-center bg-cyberpunk-dark-surface/50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='w-8 h-8 border-2 border-cyberpunk-neon/30 border-t-cyberpunk-neon rounded-full animate-spin' />
        </motion.div>
      )}
    </div>
  )
}

export default LazyImage
