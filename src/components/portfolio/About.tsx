import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-cyber font-bold text-white mb-4'>
            ABOUT <span className='text-tech-neon'>ME</span>
          </h2>
          <div className='w-24 h-1 bg-tech-neon mx-auto' />
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
                className='relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-tech-dark-alt to-tech-dark border-2 border-tech-neon/30'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Placeholder avatar - you can replace with actual photo */}
                <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-tech-neon/20 to-tech-pink/20'>
                  <div className='text-center'>
                    <div className='w-32 h-32 mx-auto mb-4 rounded-full bg-tech-neon/30 flex items-center justify-center'>
                      <span className='text-4xl font-cyber font-bold text-tech-neon'>
                        HHL
                      </span>
                    </div>
                    <p className='text-sm text-gray-400 font-display'>
                      Professional Photo
                    </p>
                  </div>
                </div>

                {/* Cyberpunk overlay effects */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-t from-tech-neon/10 to-transparent opacity-0'
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner brackets */}
                <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-tech-neon' />
                <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-tech-neon' />
                <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-tech-neon' />
                <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-tech-neon' />
              </motion.div>

              {/* Floating tech icons */}
              <motion.div
                className='absolute -top-4 -right-4 w-12 h-12 bg-tech-pink rounded-lg flex items-center justify-center'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0,
                }}
              >
                <span className='text-white text-xl'>⚡</span>
              </motion.div>

              <motion.div
                className='absolute -bottom-4 -left-4 w-12 h-12 bg-tech-purple rounded-lg flex items-center justify-center'
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <span className='text-white text-xl'>🚀</span>
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
            <div className='space-y-4 text-gray-300 font-display text-lg leading-relaxed'>
              <p>
                I'm a{' '}
                <span className='text-tech-neon font-semibold'>creative technologist</span>{' '}
                passionate about building intelligent systems that merge AI, robotics, and data engineering. 
                Currently at Lucid Bots, I architect autonomous drone fleets with real-time machine learning 
                capabilities that revolutionize how robots perceive and interact with the world.
              </p>

              <p>
                My unique approach combines{' '}
                <span className='text-tech-pink font-semibold'>creative problem-solving</span>{' '}
                with cutting-edge technology. From engineering{' '}
                <span className='text-tech-purple font-semibold'>$500K AWS IoT infrastructures</span>{' '}
                to designing ROS2-based autonomous systems, I bridge the gap between 
                visionary concepts and production-ready solutions.
              </p>

              <p>
                I thrive at the intersection of{' '}
                <span className='text-tech-cyan font-semibold'>AI innovation and practical engineering</span>. 
                Whether it's optimizing real-time telemetry pipelines, implementing computer vision algorithms, 
                or leading cross-functional teams, I bring both technical expertise and creative vision 
                to every challenge.
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
                'AI/ML Engineering',
                'Robotics (ROS2)',
                'Creative Technology',
                'AWS IoT Architecture',
                'Computer Vision',
                'Autonomous Systems',
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  className='px-4 py-2 bg-tech-dark-alt border border-tech-neon/30 rounded-lg text-center'
                  whileHover={{
                    scale: 1.05,
                    borderColor: '#00ffff',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <span className='text-sm font-cyber font-semibold text-tech-neon'>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Personal touch */}
            <motion.div
              className='pt-6 border-t border-tech-neon/20'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className='text-gray-400 font-display italic'>
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
