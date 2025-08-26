import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import TechCard from './TechCard'
import { useCardVariant } from '../../context/CardVariantContext'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  tagline: string
  taglineColor?: 'cyan' | 'fuchsia' | 'emerald' | 'amber'
  children: ReactNode
  className?: string
  cardVariant?: 'floating' | 'rotated' | 'background' | 'cutcorner'
}

export default function PageSection({
  id,
  title,
  subtitle,
  tagline,
  taglineColor = 'cyan',
  children,
  className = '',
}: PageSectionProps) {
  const { variant } = useCardVariant()

  return (
    <section
      id={id}
      className={`min-h-screen relative overflow-hidden flex items-center ${className}`}
    >
      {/* Glossy background effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black' />
      <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent' />
      <div className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' />

      <div className='container-custom relative z-10 w-full py-16'>
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
            variant={variant}
            color={taglineColor}
            className='min-h-[80vh] flex flex-col'
          >
            {/* Section header */}
            <div className='text-center mb-12 flex-shrink-0'>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className='bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent'>
                      {subtitle}
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
