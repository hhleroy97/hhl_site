import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

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
  const shouldReduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocusedElementRef = useRef<Element | null>(null)

  // Accessibility: trap focus, close on Escape, set/restore focus
  useEffect(() => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input[type="text"]:not([disabled])',
      'input[type="radio"]:not([disabled])',
      'input[type="checkbox"]:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        ).filter(el => !el.hasAttribute('inert'))

        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null

        if (!active) return

        if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      // Focus the close button, fallback to dialog container
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus()
        } else if (dialogRef.current) {
          dialogRef.current.focus()
        }
      }, 0)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      const prev = previouslyFocusedElementRef.current as HTMLElement | null
      if (prev && typeof prev.focus === 'function') prev.focus()
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
            animate={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 300, damping: 30 }
            }
            role='dialog'
            aria-modal='true'
            aria-labelledby='lightbox-title'
            aria-describedby={
              content.description ? 'lightbox-description' : undefined
            }
          >
            <div
              ref={dialogRef}
              className='relative max-w-6xl max-h-[90vh] w-full'
              tabIndex={-1}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                ref={closeButtonRef}
                className='absolute -top-12 right-0 text-white hover:text-cyberpunk-neon 
                         transition-colors duration-300 z-10'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type='button'
                aria-label='Close dialog'
                title='Close'
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
                className='relative bg-cyberpunk-dark-alt border-2 border-cyberpunk-neon rounded-xl overflow-hidden'
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotateY: 90, x: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, rotateY: 0, x: 0 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.2, ease: 'easeOut' }
                    : { duration: 0.6, ease: 'easeOut' }
                }
              >
                {/* Glitch effect during open */}
                {!shouldReduceMotion && (
                  <motion.div
                    className='absolute inset-0 bg-cyberpunk-pink/20 z-10'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0, 0.5, 0],
                      x: [-5, 5, -3, 3, 0],
                    }}
                    transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
                    aria-hidden='true'
                  />
                )}

                {/* Media content */}
                <div className='relative'>
                  {content.type === 'image' ? (
                    <motion.div
                      className='relative bg-gradient-to-br from-cyberpunk-dark to-cyberpunk-dark-alt'
                      style={{ aspectRatio: '16/9' }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
                    >
                      {/* Placeholder for creative work */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='w-24 h-24 mx-auto mb-4 rounded-lg bg-cyberpunk-neon/20 flex items-center justify-center'>
                            <span className='text-4xl'>🎨</span>
                          </div>
                          <p className='text-lg text-gray-400 font-display'>
                            Creative Work Preview
                          </p>
                        </div>
                      </div>

                      {/* Scan line effect */}
                      {!shouldReduceMotion && (
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-b from-transparent via-cyberpunk-neon to-transparent opacity-20'
                          animate={{
                            y: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{ height: '4px' }}
                          aria-hidden='true'
                        />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      className='relative bg-black'
                      style={{ aspectRatio: '16/9' }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
                    >
                      {/* Video placeholder */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='w-24 h-24 mx-auto mb-4 rounded-lg bg-cyberpunk-pink/20 flex items-center justify-center'>
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
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.6,
                    delay: shouldReduceMotion ? 0 : 0.3,
                  }}
                >
                  <h3
                    id='lightbox-title'
                    className='text-2xl font-cyber font-bold text-cyberpunk-neon'
                  >
                    {content.title}
                  </h3>

                  {content.description && (
                    <p
                      id='lightbox-description'
                      className='text-gray-300 font-display leading-relaxed'
                    >
                      {content.description}
                    </p>
                  )}

                  {content.technologies && (
                    <div className='flex flex-wrap gap-2'>
                      {content.technologies.map(tech => (
                        <span
                          key={tech}
                          className='px-3 py-1 text-xs font-mono bg-cyberpunk-dark border border-cyberpunk-neon/30 
                                   text-cyberpunk-neon rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Corner brackets */}
                <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyberpunk-neon' />
                <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyberpunk-neon' />
                <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyberpunk-neon' />
                <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyberpunk-neon' />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
