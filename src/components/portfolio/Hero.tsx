import { motion } from 'framer-motion'
import AbstractDataFlow from '../ui/AbstractDataFlow'

export default function Hero() {
  return (
    <section
      className='relative pt-20 pb-16 px-6 lg:px-8 min-h-screen flex items-center'
      aria-label='Introduction and hero section'
    >
      {/* Artistic background accent */}
      <div
        className='pointer-events-none absolute inset-0 opacity-20'
        aria-hidden='true'
        style={{
          backgroundImage: `
            radial-gradient(600px 400px at 20% 30%, rgba(0, 212, 170, 0.15), transparent 70%),
            radial-gradient(800px 600px at 80% 70%, rgba(139, 92, 246, 0.1), transparent 70%)
          `,
        }}
      />

      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-8 z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Professional status badge */}
            <motion.div
              className='inline-flex items-center gap-3 bg-tech-dark-surface/80 backdrop-blur-sm border border-primary-500/20 rounded-full px-4 py-2'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className='w-2 h-2 rounded-full bg-tech-teal animate-pulse' />
              <span className='text-sm font-medium text-tech-text-secondary tracking-wide'>
                Innovative Problem Solver
              </span>
            </motion.div>

            {/* Main heading with emphasis on problem solving */}
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-tech-text-primary leading-tight'>
                Hartley H.{' '}
                <span className='relative'>
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    Leroy
                  </span>
                  <motion.span
                    className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-tech-teal to-tech-cyan rounded-full'
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    aria-hidden='true'
                  />
                </span>
              </h1>

              <div className='space-y-2'>
                <p className='text-xl font-semibold text-tech-text-primary'>
                  Software Engineer
                </p>
                <p className='text-lg text-tech-coral font-medium'>
                  Specializing in Complex Systems & Technical Communication
                </p>
              </div>
            </motion.div>

            {/* Enhanced description focusing on problem solving */}
            <motion.p
              className='text-lg text-tech-text-secondary leading-relaxed max-w-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bridging technical complexity with clear communication. I solve
              intricate engineering challenges in robotics, cloud
              infrastructure, and data systems while ensuring stakeholders at
              every level understand the impact.
            </motion.p>

            {/* Tech stack with new colors */}
            <motion.div
              className='flex flex-wrap gap-3'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {[
                { label: 'AWS IoT', color: 'tech-teal' },
                { label: 'ROS2/PX4', color: 'tech-purple' },
                { label: 'Python', color: 'tech-blue' },
                { label: 'React', color: 'tech-cyan' },
                { label: 'Embedded C', color: 'tech-coral' },
                { label: 'Product Mgmt', color: 'tech-gold' },
              ].map(chip => (
                <span
                  key={chip.label}
                  className='rounded-lg border border-tech-dark-elevated bg-tech-dark-surface/60 backdrop-blur-sm px-3 py-2 text-sm font-mono tracking-wide text-tech-text-secondary hover:border-primary-400/40 transition-colors'
                >
                  {chip.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 pt-4'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <motion.a
                href='#projects'
                className='px-8 py-4 rounded-lg bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-display font-bold shadow-lg hover:shadow-tech-teal/25 transition-all text-center'
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label='View my engineering projects'
              >
                Explore My Work
              </motion.a>
              <motion.a
                href='#contact'
                className='px-8 py-4 rounded-lg border border-tech-text-muted/30 text-tech-text-primary font-display font-semibold hover:border-tech-teal/60 hover:text-tech-teal transition-all text-center backdrop-blur-sm'
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label='Get in touch about opportunities'
              >
                Let's Connect
              </motion.a>
            </motion.div>

            {/* Achievement stats updated with real data */}
            <motion.div
              className='mt-8 grid grid-cols-3 gap-4 max-w-md'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              {[
                { k: 'Experience', v: '4+', desc: 'Years' },
                { k: 'Migration', v: '$500K', desc: 'AWS Project' },
                { k: 'Team', v: '6', desc: 'Engineers Led' },
              ].map(item => (
                <div
                  key={item.k}
                  className='rounded-lg border border-tech-dark-elevated bg-tech-dark-surface/40 backdrop-blur-sm p-4 text-center hover:bg-tech-dark-elevated/60 transition-colors'
                  role='img'
                  aria-label={`${item.v} ${item.desc}`}
                >
                  <div className='text-xl font-bold text-tech-teal'>
                    {item.v}
                  </div>
                  <div className='text-xs tracking-wide text-tech-text-muted uppercase leading-tight mt-1'>
                    {item.k}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Abstract Data Flow Visualization */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='relative w-full max-w-[500px] h-[500px]'>
              {/* Abstract Data Flow Container */}
              <div className='w-full h-full bg-gradient-to-br from-tech-dark-surface/20 to-tech-dark-elevated/30 rounded-2xl border border-tech-dark-elevated/50 backdrop-blur-sm overflow-hidden'>
                <AbstractDataFlow className='w-full h-full' />
              </div>

              {/* Artistic glow effect around visualization */}
              <div
                className='absolute -inset-8 rounded-full opacity-40 blur-3xl pointer-events-none'
                style={{
                  background: `
                    radial-gradient(circle, rgba(0, 212, 170, 0.4) 0%, transparent 70%),
                    radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.2) 0%, transparent 60%)
                  `,
                }}
                aria-hidden='true'
              />

              {/* Additional floating elements for artistic effect */}
              <motion.div
                className='absolute -top-4 -right-4 w-3 h-3 bg-tech-coral rounded-full opacity-80'
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className='absolute -bottom-6 -left-6 w-2 h-2 bg-tech-cyan rounded-full opacity-70'
                animate={{
                  y: [0, -8, 0],
                  x: [0, 4, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
