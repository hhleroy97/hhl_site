import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import TechCard from './TechCard'
import { useCardVariant } from '../../context/CardVariantContext'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  tagline: string
  taglineColor?: 'purple' | 'cyan' | 'teal' | 'emerald'
  children: ReactNode
  className?: string
  cardVariant?: 'floating' | 'rotated' | 'background' | 'cutcorner'
  isHomePage?: boolean
}

export default function PageSection({
  id,
  title,
  subtitle,
  tagline,
  taglineColor = 'cyan',
  children,
  className = '',
  cardVariant,
  isHomePage = false,
}: PageSectionProps) {
  const { variant } = useCardVariant()
  const selectedVariant = cardVariant || variant

  return (
    <section
      id={id}
      className={`min-h-screen relative overflow-hidden flex items-start ${className}`}
    >
      {/* Glossy background effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black' />
      <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent' />
      <div className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' />

      <div
        className={`container-custom relative z-10 w-full pt-8 ${isHomePage ? 'pb-8' : 'pb-32'}`}
      >
        {/* Complete section wrapped in TechCard */}
        <motion.div
          className='h-full'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TechCard
            title={tagline}
            variant={selectedVariant}
            color={taglineColor}
            className='min-h-[80vh] flex flex-col'
          >
            {/* Section header */}
            <div className='text-center mb-6 flex-shrink-0'>
              <h2
                className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className='text-zinc-300'>
                      {subtitle
                        .split(/(\s+|—|[.!?])/)
                        .filter(part => part.trim())
                        .map((word, index, array) => {
                          const isLast = index === array.length - 1
                          if (word.toLowerCase() === 'creativity') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'computation') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'offerings') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'inspire') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'wired') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'together') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (word.toLowerCase() === 'idea') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          } else if (
                            word.toLowerCase() === 'reality' ||
                            word.toLowerCase() === 'reality?'
                          ) {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                                  {word}
                                </span>
                                {!isLast && ' '}
                              </span>
                            )
                          }
                          return (
                            <span key={index}>
                              {word}
                              {!isLast && ' '}
                            </span>
                          )
                        })}
                    </span>
                  </>
                )}
              </h2>
            </div>

            {/* Page content */}
            <div className='flex-1 flex flex-col justify-center'>
              {children}
            </div>
          </TechCard>
        </motion.div>
      </div>
    </section>
  )
}
