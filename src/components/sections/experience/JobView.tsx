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
  clickedPosition: _clickedPosition,
}: JobViewProps) {
  const [isClosing, setIsClosing] = useState(false)

  if (!experience) return null

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
          className='fixed inset-0 z-50 bg-black/80 backdrop-blur-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div className='min-h-screen flex items-center justify-center p-4'>
            <motion.div
              className='bg-black/90 backdrop-blur-md rounded-3xl border border-white/20 p-8 w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-y-auto overflow-x-hidden'
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
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
                className='absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 z-20'
                style={{ pointerEvents: 'auto' }}
              >
                <X className='w-5 h-5 text-white' />
              </button>

              <div className='relative z-10'>
                {/* Header */}
                <div className='flex items-start gap-6 mb-8'>
                  <div className='w-24 h-24 rounded-full bg-white backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl shadow-xl relative'>
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
                          className='w-16 h-16 object-contain'
                        />
                      ) : (
                        <span className='text-2xl'>{experience.logo}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h2 className='text-3xl font-bold text-white mb-2'>
                      {experience.company}
                    </h2>
                    <p className='text-xl text-cyan-400 font-semibold mb-2'>
                      {experience.title}
                    </p>
                    <div className='flex items-center gap-4 text-zinc-400'>
                      <span className='font-medium'>
                        {experience.timeframe}
                      </span>
                      <span>•</span>
                      <span>{experience.location}</span>
                      <span>•</span>
                      <span>{experience.workType}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className='mb-8'>
                  <p className='text-zinc-300 leading-relaxed text-lg'>
                    {experience.description}
                  </p>
                </div>

                {/* Key Contributions */}
                <div className='mb-8'>
                  <h3 className='text-white font-bold mb-4 text-xl'>
                    Key Contributions
                  </h3>
                  <ul className='space-y-3'>
                    {experience.keyContributions.map((contribution, i) => (
                      <li key={i} className='flex items-start gap-3'>
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${experience.color} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className='text-zinc-300 leading-relaxed'>
                          {contribution}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className='text-white font-bold mb-4 text-xl'>
                    Technologies & Skills
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                    {experience.technologies.map(tech => (
                      <span
                        key={tech}
                        className='px-4 py-2 bg-white/10 border border-white/20 rounded-xl font-medium text-zinc-300'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
