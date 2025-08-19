import { motion } from 'framer-motion'
import SimpleGrid from '@components/3d/SimpleGrid'

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
            {/* Impact Statement */}
            <div className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-tech-text-primary leading-tight mb-4'>
                  Creative Technologist{' '}
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    & AI Engineer
                  </span>
                </h1>
                <p className='text-xl text-tech-text-secondary font-medium leading-relaxed'>
                  I architect intelligent systems that bridge AI, robotics, and
                  data engineering. Currently building autonomous drone fleets
                  with real-time ML pipelines at Lucid Bots.
                </p>
              </motion.div>

              <motion.div
                className='flex items-center space-x-4 text-tech-text-muted'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className='font-medium'>Hartley H. Leroy</span>
                <span className='w-2 h-2 bg-tech-teal rounded-full'></span>
                <span>Charlotte, NC</span>
                <span className='w-2 h-2 bg-tech-cyan rounded-full'></span>
                <span>Available for Opportunities</span>
              </motion.div>
            </div>

            {/* Key Achievements */}
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-teal/20'>
                <div className='text-2xl font-bold text-tech-teal'>$500K</div>
                <div className='text-sm text-tech-text-muted'>
                  AWS Infrastructure
                </div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-cyan/20'>
                <div className='text-2xl font-bold text-tech-cyan'>ROS2</div>
                <div className='text-sm text-tech-text-muted'>
                  Drone Systems
                </div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-purple/20'>
                <div className='text-2xl font-bold text-tech-purple'>AI/ML</div>
                <div className='text-sm text-tech-text-muted'>Pipelines</div>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 pt-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='#experience'
                className='px-8 py-4 rounded-lg bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-bold text-center transition-all hover:shadow-lg hover:shadow-tech-teal/25'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Impact
              </motion.a>
              <motion.a
                href='#contact'
                className='px-8 py-4 rounded-lg border border-tech-teal text-tech-teal font-semibold text-center hover:bg-tech-teal hover:text-tech-dark transition-all group'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Build Together
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Data Flow Visualization */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='relative w-full flex items-center justify-center'>
              <SimpleGrid />

              {/* Professional frame */}
              <div className='absolute inset-4 border border-tech-teal/20 rounded-lg pointer-events-none' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
