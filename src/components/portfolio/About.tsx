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
              {/* Professional Photo with 3D-inspired border */}
              <div className='relative w-80 h-80'>
                {/* Main border ring - matches 3D design */}
                <div className='absolute inset-2 rounded-full border-2 border-tech-teal/80 animate-pulse'></div>

                {/* Secondary border rings */}
                <div className='absolute inset-0 rounded-full border border-tech-cyan/40'></div>
                <div className='absolute inset-4 rounded-full border border-tech-purple/30'></div>

                {/* Octahedral accent points - positioned on circular perimeter */}
                {/* Top - 0° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                  style={{
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                  }}
                ></div>
                {/* Top-right - 45° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse'
                  style={{ top: '25px', right: '25px', animationDelay: '0.2s' }}
                ></div>
                {/* Right - 90° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-purple bg-tech-purple/30 animate-pulse'
                  style={{
                    top: '50%',
                    right: '8px',
                    transform: 'translateY(-50%) rotate(45deg)',
                    animationDelay: '0.4s',
                  }}
                ></div>
                {/* Bottom-right - 135° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                  style={{
                    bottom: '25px',
                    right: '25px',
                    animationDelay: '0.6s',
                  }}
                ></div>
                {/* Bottom - 180° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse'
                  style={{
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    animationDelay: '0.8s',
                  }}
                ></div>
                {/* Bottom-left - 225° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-purple bg-tech-purple/30 animate-pulse'
                  style={{ bottom: '25px', left: '25px', animationDelay: '1s' }}
                ></div>
                {/* Left - 270° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse'
                  style={{
                    top: '50%',
                    left: '8px',
                    transform: 'translateY(-50%) rotate(45deg)',
                    animationDelay: '1.2s',
                  }}
                ></div>
                {/* Top-left - 315° */}
                <div
                  className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse'
                  style={{ top: '25px', left: '25px', animationDelay: '1.4s' }}
                ></div>

                {/* Corner L-shaped brackets - positioned on the circle */}
                <div
                  className='absolute w-6 h-6 border-l-2 border-t-2 border-tech-cyan/60 animate-pulse'
                  style={{ top: '60px', left: '60px' }}
                ></div>
                <div
                  className='absolute w-6 h-6 border-r-2 border-t-2 border-tech-cyan/60 animate-pulse'
                  style={{ top: '60px', right: '60px', animationDelay: '0.3s' }}
                ></div>
                <div
                  className='absolute w-6 h-6 border-l-2 border-b-2 border-tech-cyan/60 animate-pulse'
                  style={{
                    bottom: '60px',
                    left: '60px',
                    animationDelay: '0.6s',
                  }}
                ></div>
                <div
                  className='absolute w-6 h-6 border-r-2 border-b-2 border-tech-cyan/60 animate-pulse'
                  style={{
                    bottom: '60px',
                    right: '60px',
                    animationDelay: '0.9s',
                  }}
                ></div>

                {/* Image container */}
                <div className='relative w-full h-full rounded-full bg-gradient-to-br from-tech-teal/20 to-tech-cyan/20 flex items-center justify-center overflow-hidden shadow-2xl'>
                  <img
                    src='/src/assets/prof-pic-2.jpg'
                    alt='Hartley H. Leroy - Creative Technologist & AI Engineer'
                    className='w-full h-full object-cover'
                    style={{
                      imageRendering: 'optimize-quality',
                      transform: 'translateX(-20px) scale(1.2)',
                    }}
                  />
                </div>
              </div>
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
                <span className='text-tech-neon font-semibold'>
                  creative technologist
                </span>{' '}
                passionate about building intelligent systems that merge AI,
                robotics, and data engineering. Currently at Lucid Bots, I
                architect autonomous drone fleets with real-time machine
                learning capabilities that revolutionize how robots perceive and
                interact with the world.
              </p>

              <p>
                My unique approach combines{' '}
                <span className='text-tech-pink font-semibold'>
                  creative problem-solving
                </span>{' '}
                with cutting-edge technology. From engineering{' '}
                <span className='text-tech-purple font-semibold'>
                  $500K AWS IoT infrastructures
                </span>{' '}
                to designing ROS2-based autonomous systems, I bridge the gap
                between visionary concepts and production-ready solutions.
              </p>

              <p>
                I thrive at the intersection of{' '}
                <span className='text-tech-cyan font-semibold'>
                  AI innovation and practical engineering
                </span>
                . Whether it's optimizing real-time telemetry pipelines,
                implementing computer vision algorithms, or leading
                cross-functional teams, I bring both technical expertise and
                creative vision to every challenge.
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
