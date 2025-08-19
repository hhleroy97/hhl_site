import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className='relative pt-24 pb-12 px-6 lg:px-8 flex items-center'
      aria-label='Introduction and hero section'
    >
      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 gap-8 items-center'>
          {/* Content */}
          <motion.div
            className='space-y-6 z-10'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Simple status badge */}
            <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 border border-tech-dark-elevated'>
              <div className='w-2 h-2 rounded-full bg-tech-teal' />
              <span className='text-sm text-tech-text-secondary'>
                Available
              </span>
            </div>

            {/* Main heading */}
            <div className='space-y-3'>
              <h1 className='text-5xl font-display font-bold text-tech-text-primary leading-tight'>
                Hartley H. Leroy
              </h1>
              <div className='space-y-1'>
                <p className='text-xl font-semibold text-tech-text-primary'>
                  Software Engineer
                </p>
                <p className='text-lg text-tech-coral font-medium'>
                  Complex Systems · Clear Communication
                </p>
              </div>
            </div>

            {/* Short description */}
            <p className='text-lg text-tech-text-secondary leading-relaxed max-w-xl'>
              Software engineer focused on clear systems, reliable delivery, and
              practical impact across cloud, data, and robotics.
            </p>

            {/* Tech stack simplified */}
            <div className='flex flex-wrap gap-2'>
              {['AWS', 'Python', 'React', 'ROS2'].map(label => (
                <span
                  key={label}
                  className='rounded-md border border-tech-dark-elevated px-3 py-1 text-sm text-tech-text-secondary'
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTA Buttons simplified */}
            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <a
                href='#projects'
                className='px-6 py-3 rounded-md bg-tech-teal text-tech-dark font-display font-semibold text-center'
              >
                Explore Work
              </a>
              <a
                href='#contact'
                className='px-6 py-3 rounded-md border border-tech-dark-elevated text-tech-text-primary text-center'
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
