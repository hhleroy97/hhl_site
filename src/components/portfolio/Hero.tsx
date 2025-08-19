import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className='relative py-20 px-6 lg:px-8 min-h-screen flex items-center bg-background-primary'
      aria-label='Introduction and hero section'
    >
      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-8 z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Professional status badge */}
            <motion.div
              className='inline-flex items-center gap-3 bg-primary-50 text-primary-700 rounded-full px-4 py-2 border border-primary-200'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className='w-2 h-2 rounded-full bg-primary-500' />
              <span className='text-sm font-medium tracking-wide'>
                Software Engineer
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight'>
                Hartley H.{' '}
                <span className='text-primary-600'>
                  Leroy
                </span>
              </h1>

              <div className='space-y-2'>
                <p className='text-xl font-semibold text-text-primary'>
                  Software Engineer
                </p>
                <p className='text-lg text-text-secondary'>
                  Specializing in Complex Systems & Technical Communication
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className='text-lg text-text-secondary leading-relaxed max-w-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bridging technical complexity with clear communication. I solve
              intricate engineering challenges in robotics, cloud
              infrastructure, and data systems while ensuring stakeholders at
              every level understand the impact.
            </motion.p>

            {/* Tech stack */}
            <motion.div
              className='flex flex-wrap gap-3'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {[
                { label: 'AWS IoT', color: 'bg-accent-blue text-white' },
                { label: 'ROS2/PX4', color: 'bg-accent-green text-white' },
                { label: 'Python', color: 'bg-accent-purple text-white' },
                { label: 'React', color: 'bg-accent-orange text-white' },
                { label: 'Embedded C', color: 'bg-neutral-700 text-white' },
                { label: 'Product Mgmt', color: 'bg-neutral-600 text-white' },
              ].map(chip => (
                <span
                  key={chip.label}
                  className={`rounded-lg px-3 py-2 text-sm font-medium tracking-wide ${chip.color} hover:opacity-80 transition-opacity`}
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
                className='px-8 py-4 rounded-lg bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700 transition-colors text-center'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label='View my engineering projects'
              >
                Explore My Work
              </motion.a>
              <motion.a
                href='#contact'
                className='px-8 py-4 rounded-lg border border-neutral-300 text-text-primary font-semibold hover:border-primary-500 hover:text-primary-600 transition-colors text-center'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label='Get in touch about opportunities'
              >
                Let's Connect
              </motion.a>
            </motion.div>

            {/* Achievement stats */}
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
                  className='rounded-lg border border-neutral-200 bg-background-secondary p-4 text-center hover:bg-neutral-50 transition-colors'
                  role='img'
                  aria-label={`${item.v} ${item.desc}`}
                >
                  <div className='text-xl font-bold text-primary-600'>
                    {item.v}
                  </div>
                  <div className='text-xs tracking-wide text-text-muted uppercase leading-tight mt-1'>
                    {item.k}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Simple illustration */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className='relative w-full max-w-[500px] h-[500px]'>
              {/* Simple geometric illustration */}
              <div className='w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <div className='w-32 h-32 mx-auto bg-primary-500 rounded-full flex items-center justify-center'>
                    <span className='text-4xl font-bold text-white'>
                      HHL
                    </span>
                  </div>
                  <p className='text-text-secondary font-medium'>
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
