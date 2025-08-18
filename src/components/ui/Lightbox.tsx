import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  content: {
    type: 'image' | 'video'
    src: string
    title: string
    description?: string
    technologies?: string[]
  }
}

export default function Lightbox({ isOpen, onClose, content }: LightboxProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Lightbox content */}
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='relative max-w-6xl max-h-[90vh] w-full'>
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className='absolute -top-12 right-0 text-white hover:text-tech-neon 
                         transition-colors duration-300 z-10'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className='w-8 h-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </motion.button>

              {/* Main content container */}
              <motion.div
                className='relative bg-tech-dark-alt border-2 border-tech-neon rounded-xl overflow-hidden'
                initial={{
                  opacity: 0,
                  rotateY: 90,
                  x: 0,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                {/* Glitch effect during open */}
                <motion.div
                  className='absolute inset-0 bg-tech-pink/20 z-10'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0, 0.5, 0],
                    x: [-5, 5, -3, 3, 0],
                  }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
                />

                {/* Media content */}
                <div className='relative'>
                  {content.type === 'image' ? (
                    <motion.div
                      className='relative bg-gradient-to-br from-tech-dark to-tech-dark-alt'
                      style={{ aspectRatio: '16/9' }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Placeholder for creative work */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='w-24 h-24 mx-auto mb-4 rounded-lg bg-tech-neon/20 flex items-center justify-center'>
                            <span className='text-4xl'>🎨</span>
                          </div>
                          <p className='text-lg text-gray-400 font-display'>
                            Creative Work Preview
                          </p>
                        </div>
                      </div>

                      {/* Scan line effect */}
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-b from-transparent via-tech-neon to-transparent opacity-20'
                        animate={{
                          y: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{ height: '4px' }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className='relative bg-black'
                      style={{ aspectRatio: '16/9' }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Video placeholder */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='w-24 h-24 mx-auto mb-4 rounded-lg bg-tech-pink/20 flex items-center justify-center'>
                            <span className='text-4xl'>▶️</span>
                          </div>
                          <p className='text-lg text-gray-400 font-display'>
                            Video Content
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Content info */}
                <motion.div
                  className='p-6 space-y-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className='text-2xl font-cyber font-bold text-tech-neon'>
                    {content.title}
                  </h3>

                  {content.description && (
                    <p className='text-gray-300 font-display leading-relaxed'>
                      {content.description}
                    </p>
                  )}

                  {content.technologies && (
                    <div className='flex flex-wrap gap-2'>
                      {content.technologies.map(tech => (
                        <span
                          key={tech}
                          className='px-3 py-1 text-xs font-mono bg-tech-dark border border-tech-neon/30 
                                   text-tech-neon rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Corner brackets */}
                <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-tech-neon' />
                <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-tech-neon' />
                <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-tech-neon' />
                <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-tech-neon' />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
