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
  /** Alternates corner highlight on mobile view only */
  flipMobileCorners?: boolean
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
  flipMobileCorners = false,
}: PageSectionProps) {
  const { variant } = useCardVariant()
  const selectedVariant = cardVariant || variant

  const bgGradientClass = flipMobileCorners
    ? 'bg-gradient-to-tl md:bg-gradient-to-br'
    : 'bg-gradient-to-br'

  const firstLineClass = flipMobileCorners
    ? 'md:left-1/4 md:right-auto right-1/4'
    : 'left-1/4'

  const secondLineClass = flipMobileCorners
    ? 'md:right-1/3 md:left-auto left-1/3'
    : 'right-1/3'

  return (
    <section
      id={id}
      className={`min-h-[100svh] md:min-h-screen relative overflow-hidden flex items-stretch md:items-center bg-black md:bg-transparent ${className}`}
    >
      {/* Glossy background effects */}
      <div
        className={`absolute inset-0 ${bgGradientClass} from-zinc-950 via-zinc-900 to-black`}
      />
      <div
        className={`absolute top-0 ${firstLineClass} w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent`}
      />
      <div
        className={`absolute top-0 ${secondLineClass} w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent`}
      />

      <div
        className={`relative z-10 w-full pt-0 sm:pt-0 md:pt-2 px-0 max-w-none md:max-w-[90vw] md:mx-auto md:px-4 ${isHomePage ? 'pb-0 sm:pb-0 md:pb-2' : 'pb-0 sm:pb-0 md:pb-24'}`}
      >
        {/* Complete section wrapped in TechCard */}
        <div className='h-full'>
          <TechCard
            title={tagline}
            variant={selectedVariant}
            color={taglineColor}
            flipMobileCorners={flipMobileCorners}
            rounded={false}
            className='w-full min-h-[100svh] md:min-h-0 md:h-[85svh] flex flex-col rounded-none md:rounded-2xl'
          >
            {/* Section header */}
            <div className='text-center mb-4 sm:mb-5 md:mb-6 flex-shrink-0'>
              <h2
                className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {title
                  .split(/(\s+|—|[.!?])/)
                  .filter(part => part.trim())
                  .map((word, index, array) => {
                    const isLast = index === array.length - 1
                    const nextPart = array[index + 1]
                    const isPunctuation = /^[.!?]$/.test(nextPart)
                    if (word.toLowerCase() === 'idea') {
                      return (
                        <span key={index}>
                          <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                            {word}
                          </span>
                          {!isLast && ' '}
                        </span>
                      )
                    } else if (word.toLowerCase() === 'reality') {
                      return (
                        <span key={index}>
                          <span className='bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                            {word}
                            {isPunctuation ? nextPart : ''}
                          </span>
                          {!isLast && !isPunctuation && ' '}
                        </span>
                      )
                    } else if (
                      /^[.!?]$/.test(word) &&
                      array[index - 1]?.toLowerCase() === 'reality'
                    ) {
                      // Skip rendering punctuation that's already included with 'reality'
                      return null
                    }
                    return (
                      <span key={index}>
                        {word}
                        {!isLast && ' '}
                      </span>
                    )
                  })}
                {subtitle && (
                  <>
                    <br />
                    <span className='text-zinc-300'>
                      {subtitle
                        .split(/(\s+|—|[.!?])/)
                        .filter(part => part.trim())
                        .map((word, index, array) => {
                          const isLast = index === array.length - 1
                          const nextPart = array[index + 1]
                          const isPunctuation = /^[.!?]$/.test(nextPart)
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
                          } else if (word.toLowerCase() === 'reality') {
                            return (
                              <span key={index}>
                                <span className='bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                                  {word}
                                  {isPunctuation ? nextPart : ''}
                                </span>
                                {!isLast && !isPunctuation && ' '}
                              </span>
                            )
                          } else if (
                            /^[.!?]$/.test(word) &&
                            array[index - 1]?.toLowerCase() === 'reality'
                          ) {
                            // Skip rendering punctuation that's already included with 'reality'
                            return null
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
        </div>
      </div>
    </section>
  )
}
