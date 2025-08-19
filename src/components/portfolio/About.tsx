import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-bold text-text-primary mb-4'>
            About <span className='text-primary-600'>Me</span>
          </h2>
          <div className='w-24 h-1 bg-primary-500 mx-auto' />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Photo/Avatar Section */}
          <motion.div
            className='flex justify-center lg:justify-start'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative'>
              {/* Main photo container */}
              <motion.div
                className='relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Placeholder avatar */}
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-32 h-32 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center'>
                      <span className='text-4xl font-bold text-white'>
                        HHL
                      </span>
                    </div>
                    <p className='text-sm text-text-secondary font-medium'>
                      Professional Photo
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='space-y-4 text-text-secondary text-lg leading-relaxed'>
              <p>
                I'm a passionate{' '}
                <span className='text-primary-600 font-semibold'>engineer</span>{' '}
                and{' '}
                <span className='text-accent-purple font-semibold'>
                  creative technologist
                </span>{' '}
                with over 8 years of experience building scalable systems and
                leading high-performing teams.
              </p>

              <p>
                My journey spans from architecting enterprise-level backend
                services to creating immersive digital art installations using
                TouchDesigner and generative algorithms. I believe the best
                solutions emerge at the intersection of technical precision and
                creative vision.
              </p>

              <p>
                When I'm not coding, you'll find me exploring the latest in{' '}
                <span className='text-accent-green font-semibold'>
                  generative art
                </span>
                , contributing to open-source projects, or experimenting with
                new technologies that push the boundaries of what's possible.
              </p>
            </div>

            {/* Skills highlight */}
            <motion.div
              className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                'Leadership',
                'System Design',
                'Creative Coding',
                'DevOps',
                'Team Building',
                'Innovation',
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  className='px-4 py-2 bg-background-primary border border-neutral-200 rounded-lg text-center hover:border-primary-300 transition-colors'
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <span className='text-sm font-semibold text-text-primary'>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Personal touch */}
            <motion.div
              className='pt-6 border-t border-neutral-200'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className='text-text-muted italic'>
                "The future belongs to those who can bridge the gap between
                imagination and implementation."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
