import { motion } from 'framer-motion'
import { useAboutContent } from '@/hooks/useSiteContent'

export default function About() {
  const { about, loading } = useAboutContent()

  if (loading || !about) {
    return (
      <section id='about' className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        <div className='max-w-7xl mx-auto w-full'>
          <div className='space-y-8'>
            <div className='h-8 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='h-4 bg-tech-dark-surface/50 rounded animate-pulse max-w-md mx-auto'></div>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='h-64 bg-tech-dark-surface/50 rounded-xl animate-pulse'></div>
              <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='h-4 bg-tech-dark-surface/50 rounded animate-pulse'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='about' className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-95' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentCool/5 via-transparent to-accentPurple/5' />

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
            About <span className='text-accentCool text-glow-cool'>Me</span>
          </h2>
          <div className='w-24 h-1 bg-accentCool mx-auto mb-6' />
          <p className='text-body text-text-secondary max-w-2xl mx-auto'>
            {about.positioning}
          </p>
        </motion.div>

        <div className='grid gap-12 lg:grid-cols-2 items-center'>
          {/* Left column - Bio */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {about.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                className='text-body text-text-secondary leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quote */}
            <motion.blockquote
              className='relative pl-6 border-l-4 border-accentCool/40 italic text-body-lg text-text-primary'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              "{about.quote}"
            </motion.blockquote>
          </motion.div>

          {/* Right column - Skills breakdown */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* What I'm best at */}
            <div className='space-y-4'>
              <h3 className='text-h3 font-semibold text-text-primary'>What I'm best at</h3>
              <div className='space-y-3'>
                {about.bestAt.map((skill, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className='w-2 h-2 bg-accentCool rounded-full'></div>
                    <span className='text-body text-text-secondary'>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What I avoid */}
            <div className='space-y-4'>
              <h3 className='text-h3 font-semibold text-text-primary'>What I avoid</h3>
              <div className='space-y-3'>
                {about.avoid.map((item, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <div className='w-2 h-2 bg-text-muted rounded-full'></div>
                    <span className='text-body text-text-muted'>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
