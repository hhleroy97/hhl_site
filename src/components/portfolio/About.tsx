import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tech-coral/5 via-transparent to-tech-teal/5' />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-cyber font-bold text-white mb-4 relative'>
            ABOUT{' '}
            <span className='relative inline-block'>
              <span className='text-tech-coral relative z-10'>ME</span>
              {/* Disciplined glow matching hero */}
              <span className='absolute inset-0 text-tech-coral blur-sm opacity-40'>
                ME
              </span>
            </span>
          </h2>
          <div className='w-24 h-1 bg-tech-coral mx-auto relative'>
            {/* Glow effect on accent line */}
            <div className='absolute inset-0 bg-tech-coral blur-sm opacity-60'></div>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Photo/Avatar Section - Enhanced floating card */}
          <motion.div
            className='flex justify-center lg:justify-start'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative group'>
              {/* Floating container with premium shadows */}
              <div className='relative w-80 h-80 p-6 rounded-3xl bg-gradient-to-br from-tech-dark-surface/80 to-tech-dark-elevated/80 border border-tech-coral/20 backdrop-blur-sm shadow-2xl hover:shadow-[0_25px_50px_rgba(255,71,87,0.15)] transition-all duration-700'>
                {/* Depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-3xl pointer-events-none' />
                <div className='absolute -top-16 -right-16 w-32 h-32 bg-tech-coral/8 rounded-full blur-3xl pointer-events-none group-hover:bg-tech-coral/12 transition-all duration-700' />
                
                {/* Professional Photo with refined 3D-inspired border */}
                <div className='relative w-full h-full'>
                  {/* Main border ring - simplified and more elegant */}
                  <div className='absolute inset-2 rounded-full border-2 border-tech-coral/60 animate-pulse'></div>
                  <div className='absolute inset-0 rounded-full border border-tech-teal/40'></div>

                  {/* Corner accent points - refined positioning */}
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-coral bg-tech-coral/30 animate-pulse'
                    style={{ top: '8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                    style={{ top: '25px', right: '25px', animationDelay: '0.2s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-coral bg-tech-coral/30 animate-pulse'
                    style={{ top: '50%', right: '8px', transform: 'translateY(-50%) rotate(45deg)', animationDelay: '0.4s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                    style={{ bottom: '25px', right: '25px', animationDelay: '0.6s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-coral bg-tech-coral/30 animate-pulse'
                    style={{ bottom: '8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.8s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                    style={{ bottom: '25px', left: '25px', animationDelay: '1s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-coral bg-tech-coral/30 animate-pulse'
                    style={{ top: '50%', left: '8px', transform: 'translateY(-50%) rotate(45deg)', animationDelay: '1.2s' }}></div>
                  <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                    style={{ top: '25px', left: '25px', animationDelay: '1.4s' }}></div>

                  {/* Image container */}
                  <div className='relative w-full h-full rounded-full bg-gradient-to-br from-tech-coral/10 to-tech-teal/10 flex items-center justify-center overflow-hidden shadow-xl'>
                    <img
                      src='/src/assets/prof-pic-2.jpg'
                      alt='Hartley H. Leroy - Creative Technologist & AI Engineer'
                      className='w-full h-full object-cover'
                      style={{
                        imageRendering: 'optimizeQuality' as const,
                        transform: 'translateX(-20px) scale(1.2)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Content - Enhanced with floating elements */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='space-y-6 text-gray-300 font-display text-lg leading-relaxed'>
              <motion.p
                className='relative p-4 rounded-xl bg-tech-dark-surface/50 border border-tech-coral/10 backdrop-blur-sm hover:border-tech-coral/20 transition-all duration-300'
                whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                I'm a{' '}
                <span className='text-tech-coral font-semibold relative'>
                  <span className='relative z-10'>creative technologist</span>
                  <span className='absolute inset-0 text-tech-coral blur-sm opacity-30'>creative technologist</span>
                </span>{' '}
                passionate about building intelligent systems that merge AI,
                robotics, and data engineering. Currently at Lucid Bots, I
                architect autonomous drone fleets with real-time machine
                learning capabilities that revolutionize how robots perceive and
                interact with the world.
              </motion.p>

              <motion.p
                className='relative p-4 rounded-xl bg-tech-dark-surface/50 border border-tech-teal/10 backdrop-blur-sm hover:border-tech-teal/20 transition-all duration-300'
                whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                My unique approach combines{' '}
                <span className='text-tech-teal font-semibold relative'>
                  <span className='relative z-10'>creative problem-solving</span>
                  <span className='absolute inset-0 text-tech-teal blur-sm opacity-30'>creative problem-solving</span>
                </span>{' '}
                with cutting-edge technology. From engineering{' '}
                <span className='text-tech-coral font-semibold relative'>
                  <span className='relative z-10'>$500K AWS IoT infrastructures</span>
                  <span className='absolute inset-0 text-tech-coral blur-sm opacity-30'>$500K AWS IoT infrastructures</span>
                </span>{' '}
                to designing ROS2-based autonomous systems, I bridge the gap
                between visionary concepts and production-ready solutions.
              </motion.p>

              <motion.p
                className='relative p-4 rounded-xl bg-tech-dark-surface/50 border border-tech-coral/10 backdrop-blur-sm hover:border-tech-coral/20 transition-all duration-300'
                whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                I thrive at the intersection of{' '}
                <span className='text-tech-teal font-semibold relative'>
                  <span className='relative z-10'>AI innovation and practical engineering</span>
                  <span className='absolute inset-0 text-tech-teal blur-sm opacity-30'>AI innovation and practical engineering</span>
                </span>
                . Whether it's optimizing real-time telemetry pipelines,
                implementing computer vision algorithms, or leading
                cross-functional teams, I bring both technical expertise and
                creative vision to every challenge.
              </motion.p>
            </div>

            {/* Skills highlight - Floating cards */}
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
                  className='group relative p-4 bg-tech-dark-surface/80 border border-tech-coral/20 rounded-xl text-center backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    borderColor: '#ff4757',
                    boxShadow: '0 0 20px rgba(255, 71, 87, 0.2)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {/* Depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-tech-coral/8 rounded-full blur-2xl pointer-events-none group-hover:bg-tech-coral/12 transition-all duration-300' />
                  
                  <span className='text-sm font-cyber font-semibold text-tech-coral relative z-10 group-hover:text-white transition-colors duration-300'>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Personal touch - Enhanced with glow */}
            <motion.div
              className='pt-6 border-t border-tech-coral/20 relative'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className='relative p-4 rounded-xl bg-tech-dark-surface/30 border border-tech-coral/10 backdrop-blur-sm'>
                <p className='text-gray-400 font-display italic relative z-10'>
                  "The future belongs to those who can bridge the gap between
                  imagination and implementation."
                </p>
                {/* Subtle glow accent */}
                <div className='absolute inset-0 bg-tech-coral/5 rounded-xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
