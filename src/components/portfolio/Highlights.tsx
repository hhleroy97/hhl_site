import { motion } from 'framer-motion'
import { useHighlightsContent } from '@/hooks/useSiteContent'
import { useVisualizationTrigger } from '@/contexts/VisualizationContext'

export default function Highlights() {
  const { highlights, loading } = useHighlightsContent()
  const { triggerHighlight, clearHighlight } = useVisualizationTrigger()

  if (loading || !highlights) {
    return (
      <section
        id='highlights'
        className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto w-full'>
          <div className='space-y-8'>
            <div className='h-8 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='h-4 bg-tech-dark-surface/50 rounded animate-pulse max-w-md mx-auto'></div>
            <div className='grid gap-6 md:grid-cols-3'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='h-64 bg-tech-dark-surface/50 rounded-xl animate-pulse'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'infra':
        return 'accentWarm'
      case 'ros2':
        return 'accentCool'
      case 'ml':
        return 'accentPurple'
      default:
        return 'accentWarm'
    }
  }

  return (
    <section
      id='highlights'
      className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
    >
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-95' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentWarm/5 via-transparent to-accentCool/5' />

      <div className='max-w-7xl mx-auto w-full relative z-10'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-h2 font-bold text-text-primary mb-4'>
            Impact &{' '}
            <span className='text-accentWarm text-glow-warm'>Highlights</span>
          </h2>
          <div className='w-24 h-1 bg-accentWarm mx-auto mb-6' />
          <p className='text-body text-text-secondary max-w-2xl mx-auto'>
            Key achievements that demonstrate real-world impact across
            infrastructure, robotics, and AI
          </p>
        </motion.div>

        {/* Impact cards grid */}
        <div className='grid gap-6 md:grid-cols-3'>
          {highlights.map((highlight, index) => {
            const skillColor = getSkillColor(highlight.skill)

            return (
              <motion.div
                key={index}
                className={`group relative bg-tech-dark-surface/80 border border-${skillColor}/20 rounded-xl p-6 md:p-8 
                           backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 
                           focus-within:ring-2 focus-within:ring-${skillColor} focus-within:ring-offset-2 focus-within:ring-offset-tech-dark
                           cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  borderColor: `var(--tw-color-${skillColor}-500)`,
                  boxShadow: `0 0 20px rgba(var(--tw-color-${skillColor}-500), 0.2)`,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => triggerHighlight(highlight.skill)}
                onMouseLeave={clearHighlight}
              >
                {/* Premium depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 bg-${skillColor}/8 rounded-full blur-3xl pointer-events-none group-hover:bg-${skillColor}/12 transition-all duration-700`}
                />
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${skillColor}/40 to-transparent group-hover:via-${skillColor}/60 transition-all duration-500`}
                />

                {/* Content */}
                <div className='relative z-10 space-y-4'>
                  {/* Title */}
                  <motion.h3
                    className={`text-h3 font-bold text-${skillColor} relative`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                  >
                    <span className='relative z-10'>{highlight.title}</span>
                    <span
                      className={`absolute inset-0 text-${skillColor} blur-sm opacity-30`}
                    >
                      {highlight.title}
                    </span>
                  </motion.h3>

                  {/* How */}
                  <p className='text-body text-text-secondary leading-relaxed'>
                    {highlight.how}
                  </p>

                  {/* Proof points */}
                  <div className='space-y-2'>
                    <h4 className='text-sm font-semibold text-text-primary uppercase tracking-wide'>
                      Results
                    </h4>
                    <ul className='space-y-1'>
                      {highlight.proof.map((proof, proofIndex) => (
                        <motion.li
                          key={proofIndex}
                          className='flex items-center text-sm text-text-secondary'
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.2 + proofIndex * 0.05,
                          }}
                        >
                          <span className={`text-${skillColor} mr-2 text-xs`}>
                            ▶
                          </span>
                          {proof}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover reveal indicator */}
                  <motion.div
                    className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className={`w-2 h-2 bg-${skillColor} rounded-full`}>
                      <div
                        className={`absolute inset-0 bg-${skillColor} rounded-full animate-ping opacity-40`}
                      ></div>
                    </div>
                  </motion.div>
                </div>

                {/* Corner accents */}
                <div
                  className={`absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-${skillColor}/40 
                      group-hover:border-${skillColor} transition-colors duration-300`}
                />
                <div
                  className={`absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-${skillColor}/40 
                      group-hover:border-${skillColor} transition-colors duration-300`}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
