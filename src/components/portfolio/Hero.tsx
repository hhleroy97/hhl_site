import { motion } from 'framer-motion'
import DataPipeline from '@components/3d/DataPipeline'
import PerformanceDisplay from '@components/ui/PerformanceDisplay'

export default function Hero() {
  return (
    <section
      className='relative py-16 px-8 lg:px-16 min-h-screen flex items-center'
      aria-label='Introduction and hero section'
    >
      {/* 3D Background - Full container */}
      <div className='absolute inset-0 pointer-events-auto'>
        {/* 3D Visualization - Data Pipeline */}
        <DataPipeline interactive={true} />
      </div>

      {/* Performance Display */}
      <PerformanceDisplay showDetails={true} />

      <div className='relative max-w-7xl mx-auto z-10 pointer-events-none'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-12 z-10 pointer-events-auto bg-tech-dark/40 backdrop-blur-md rounded-3xl p-12 border border-tech-teal/20 shadow-2xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Impact Statement */}
            <div className='space-y-10'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-tech-text-primary leading-tight mb-8'>
                  Creative Technologist{' '}
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    & AI Engineer
                  </span>
                </h1>
                <p className='text-2xl text-tech-text-secondary font-medium leading-relaxed'>
                  I architect intelligent systems that bridge AI, robotics, and
                  data engineering. Currently building autonomous drone fleets
                  with real-time ML pipelines at Lucid Bots.
                </p>
              </motion.div>

              <motion.div
                className='flex items-center space-x-6 text-tech-text-muted text-lg'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className='font-medium'>Hartley H. Leroy</span>
                <span className='w-3 h-3 bg-tech-teal rounded-full'></span>
                <span>Charlotte, NC</span>
                <span className='w-3 h-3 bg-tech-cyan rounded-full'></span>
                <span>Available for Opportunities</span>
              </motion.div>
            </div>

            {/* Key Achievements */}
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-6 py-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className='text-center p-6 rounded-xl bg-tech-dark-alt/60 border border-tech-teal/30 shadow-lg'>
                <div className='text-3xl font-bold text-tech-teal'>$500K</div>
                <div className='text-base text-tech-text-muted mt-2'>
                  AWS Infrastructure
                </div>
              </div>
              <div className='text-center p-6 rounded-xl bg-tech-dark-alt/60 border border-tech-cyan/30 shadow-lg'>
                <div className='text-3xl font-bold text-tech-cyan'>ROS2</div>
                <div className='text-base text-tech-text-muted mt-2'>
                  Drone Systems
                </div>
              </div>
              <div className='text-center p-6 rounded-xl bg-tech-dark-alt/60 border border-tech-purple/30 shadow-lg'>
                <div className='text-3xl font-bold text-tech-purple'>AI/ML</div>
                <div className='text-base text-tech-text-muted mt-2'>Pipelines</div>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              className='flex flex-col sm:flex-row gap-6 pt-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='#experience'
                className='px-12 py-6 rounded-xl bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-bold text-center transition-all hover:shadow-xl hover:shadow-tech-teal/25 text-lg'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Impact
              </motion.a>
              <motion.a
                href='#contact'
                className='px-12 py-6 rounded-xl border-2 border-tech-teal text-tech-teal font-semibold text-center hover:bg-tech-teal hover:text-tech-dark transition-all group text-lg'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Build Together
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Empty space for background interaction */}
          <div className='hidden lg:block'></div>
        </div>
      </div>
    </section>
  )
}
