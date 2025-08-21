import { motion } from 'framer-motion'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useVisualizationTrigger } from '@/contexts/VisualizationContext'

export default function Highlights() {
  const { content, loading } = useSiteContent()
  const { triggerHighlight, clearHighlight } = useVisualizationTrigger()

  if (loading || !content?.highlights) {
    return (
      <section id='highlights' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='space-y-8'>
            <div className='h-8 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='grid gap-6 md:grid-cols-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-48 bg-tech-dark-surface/50 rounded-xl animate-pulse'></div>
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
    <section id='highlights' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentWarm/5 via-transparent to-accentCool/5' />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-h2 font-black text-text-primary mb-6 relative'>
            <span className='relative z-10'>Impact & Highlights</span>
            <span className='absolute inset-0 text-accentWarm/20 blur-sm'>Impact & Highlights</span>
          </h2>
          <div className='w-24 h-1 bg-accentWarm mx-auto mb-6 relative'>
            {/* Glow effect on accent line */}
            <div className='absolute inset-0 bg-accentWarm blur-sm opacity-60'></div>
          </div>
          <p className='text-body text-tech-text-secondary max-w-3xl mx-auto'>
            Real-world results from building intelligent systems at scale
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className='grid gap-6 md:grid-cols-3'>
          {content.highlights.map((highlight, index) => {
            const skillColor = getSkillColor(highlight.skill)

            return (
              <motion.div
                key={index}
                className={`group relative p-6 rounded-2xl bg-tech-dark-surface/80 border border-${skillColor}/20 
                    transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  borderColor: `var(--tw-color-${skillColor}-500)`,
                  boxShadow: `0 0 20px rgba(var(--tw-color-${skillColor}-500), 0.2)`,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                onMouseEnter={() => triggerHighlight(highlight.skill)}
                onMouseLeave={clearHighlight}
              >
                {/* Depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
                <div
                  className={`absolute -top-8 -right-8 w-16 h-16 bg-${skillColor}/8 rounded-full blur-2xl pointer-events-none group-hover:bg-${skillColor}/12 transition-all duration-300`}
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
                    <span className={`absolute inset-0 text-${skillColor} blur-sm opacity-30`}>
                      {highlight.title}
                    </span>
                  </motion.h3>

                  {/* How */}
                  <p className='text-body text-tech-text-secondary leading-relaxed'>
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
                          className='flex items-center text-sm text-tech-text-secondary'
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 + proofIndex * 0.05 }}
                        >
                          <span className={`text-${skillColor} mr-2 text-xs`}>▶</span>
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
                      <div className={`absolute inset-0 bg-${skillColor} rounded-full animate-ping opacity-40`}></div>
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