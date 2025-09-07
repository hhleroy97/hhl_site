import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

interface JobViewProps {
  isOpen: boolean
  onClose: () => void
  experience: {
    company: string
    title: string
    timeframe: string
    location: string
    workType?: string
    logo: string
    description: string
    keyContributions: string[]
    technologies: string[]
    color: string
    industry?: string
  } | null
  clickedPosition?: { x: number; y: number } | null
}

export default function JobView({
  isOpen,
  onClose,
  experience,
  clickedPosition,
}: JobViewProps) {
  const [isClosing, setIsClosing] = useState(false)

  if (!experience) return null

  // Calculate center of screen for fallback
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  // Use clicked position or center as fallback
  const startX = clickedPosition?.x || centerX
  const startY = clickedPosition?.y || centerY

  const handleClose = () => {
    setIsClosing(true)
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (isClosing) {
          onClose()
          setIsClosing(false)
        }
      }}
    >
      {isOpen && !isClosing && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className='bg-black/90 backdrop-blur-md rounded-none sm:rounded-3xl border-0 sm:border sm:border-white/20 p-4 sm:p-8 max-w-6xl w-full sm:w-[90vw] h-full sm:h-auto shadow-2xl overflow-y-auto sm:overflow-visible overflow-x-hidden'
            initial={{
              scale: 0,
              opacity: 0,
              x: startX - centerX,
              y: startY - centerY,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              x: startX - centerX,
              y: startY - centerY,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
              exit: {
                type: 'spring',
                damping: 20,
                stiffness: 150,
              },
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Background Effects */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-5 rounded-3xl`}
              style={{ pointerEvents: 'none' }}
            ></div>
            <div
              className='absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl'
              style={{ pointerEvents: 'none' }}
            ></div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className='absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 z-20'
              style={{ pointerEvents: 'auto' }}
            >
              <X className='w-5 h-5 text-white' />
            </button>

            <div className='relative z-10 mt-12 sm:mt-0'>
              {/* Header Container */}
              <div className='mb-4 sm:mb-6'>
                <div className='flex flex-col items-center text-center mb-4'>
                  <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl shadow-xl relative flex-shrink-0 mb-4'>
                    <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full opacity-20'></div>
                    <div className='relative z-10 flex items-center justify-center'>
                      {typeof experience.logo === 'string' &&
                      (experience.logo.startsWith('/') ||
                        experience.logo.startsWith('data:') ||
                        experience.logo.includes('.') ||
                        experience.logo.startsWith('blob:')) ? (
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className='w-12 h-12 sm:w-16 sm:h-16 object-contain'
                        />
                      ) : (
                        <span className='text-2xl'>{experience.logo}</span>
                      )}
                    </div>
                  </div>
                  <h2
                    className='text-2xl sm:text-3xl font-bold text-white mb-2'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {experience.company}
                  </h2>
                  <p className='text-lg sm:text-xl text-cyan-400 font-semibold'>
                    {experience.title}
                  </p>
                </div>

                {/* Date, location, industry - left aligned under header */}
                <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-zinc-400 text-sm sm:text-base'>
                  <span className='font-medium'>{experience.timeframe}</span>
                  <span className='hidden sm:inline'>•</span>
                  <span>{experience.location}</span>
                  <span className='hidden sm:inline'>•</span>
                  <span>{experience.industry}</span>
                </div>
              </div>

              {/* Description */}
              <div className='mb-4 sm:mb-6'>
                <p className='text-zinc-300 leading-relaxed text-base sm:text-lg'>
                  {experience.description}
                </p>
              </div>

              {/* Key Contributions */}
              <div className='mb-4 sm:mb-6'>
                <h3 className='text-white font-bold mb-2 sm:mb-3 text-lg sm:text-xl'>
                  Key Contributions
                </h3>
                <ul className='space-y-2 sm:space-y-3'>
                  {experience.keyContributions.map((contribution, i) => (
                    <li key={i} className='flex items-start gap-2 sm:gap-3'>
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${experience.color} rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      <span className='text-zinc-300 leading-relaxed text-sm sm:text-base'>
                        {contribution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className='text-white font-bold mb-2 sm:mb-3 text-lg sm:text-xl'>
                  Technologies & Skills
                </h3>
                <div className='flex flex-wrap gap-2 sm:gap-3'>
                  {experience.technologies.map(tech => (
                    <span
                      key={tech}
                      className='px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl font-medium text-zinc-300 text-xs sm:text-sm'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
