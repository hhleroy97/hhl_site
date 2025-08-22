import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  tagline: string
  taglineColor?: 'cyan' | 'fuchsia' | 'emerald' | 'amber'
  children: ReactNode
  className?: string
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
  const colorStyles = {
    cyan: {
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      textColor: 'text-cyan-400',
      dotColor: 'bg-cyan-400',
    },
    fuchsia: {
      bgColor: 'bg-fuchsia-500/10',
      borderColor: 'border-fuchsia-500/20',
      textColor: 'text-fuchsia-400',
      dotColor: 'bg-fuchsia-400',
    },
    emerald: {
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      textColor: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
    },
    amber: {
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      textColor: 'text-amber-400',
      dotColor: 'bg-amber-400',
    },
  }

  const colors = colorStyles[taglineColor]

  return (
    <section
      id={id}
      className={`pt-32 pb-24 relative overflow-hidden ${className}`}
    >
      {/* Standard background effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-900/80' />
      <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' />
      <div className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent' />

      <div className='container-custom relative z-10'>
        {/* Standardized header section with fixed positioning */}
        <div className='text-center mb-16'>
          {/* Fixed position container for consistent placement */}
          <div className='relative'>
            {/* Rounded title card - fixed position from top */}
            <motion.div
              className={`inline-flex items-center gap-3 px-6 py-3 ${colors.bgColor} border ${colors.borderColor} border-red-500 border-2 rounded-full ${colors.textColor} text-lg font-medium`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                position: 'fixed',
                top: '96px', // Fixed distance from screen top
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
              }}
            >
              <div
                className={`w-3 h-3 ${colors.dotColor} rounded-full animate-pulse`}
              />
              {tagline}
            </motion.div>

            {/* Large heading with consistent sizing - fixed position */}
            <motion.div
              className='border-2 border-yellow-500 rounded-2xl p-6 bg-yellow-500/10'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                marginTop: '80px', // Fixed space for title card above
              }}
            >
              <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className='bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent'>
                      {subtitle}
                    </span>
                  </>
                )}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </section>
  )
}
