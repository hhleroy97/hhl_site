import { motion } from 'framer-motion'
import profilePic from '../../assets/prof-pic.png'

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
          {/* Abstract Data Flow Visual (replaces previous photo area) */}
          <motion.div
            className='flex justify-center lg:justify-start'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative'>
              {/* Abstract data movement container */}
              <motion.div
                className='relative w-80 h-80 rounded-2xl overflow-hidden bg-tech-dark border-2 border-tech-neon/30'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Ambient gradients */}
                <div
                  className='absolute inset-0 opacity-80'
                  style={{
                    backgroundImage: `radial-gradient(600px 400px at 20% 30%, rgba(0, 212, 170, 0.10), transparent 70%),
                      radial-gradient(800px 600px at 80% 70%, rgba(139, 92, 246, 0.10), transparent 70%)`,
                  }}
                />

                {/* Flow lines */}
                <motion.div
                  className='absolute top-10 left-[-20%] h-0.5 w-[60%] bg-gradient-to-r from-tech-teal/0 via-tech-teal/60 to-tech-teal/0'
                  animate={{ x: ['-20%', '120%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className='absolute top-1/3 left-[-30%] h-0.5 w-[70%] bg-gradient-to-r from-tech-cyan/0 via-tech-cyan/60 to-tech-cyan/0'
                  animate={{ x: ['-30%', '130%'] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                />
                <motion.div
                  className='absolute top-1/2 left-[-25%] h-0.5 w-[65%] bg-gradient-to-r from-tech-purple/0 via-tech-purple/60 to-tech-purple/0'
                  animate={{ x: ['-25%', '125%'] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: 'linear', delay: 1.4 }}
                />
                <motion.div
                  className='absolute bottom-12 left-[-35%] h-0.5 w-[75%] bg-gradient-to-r from-tech-pink/0 via-tech-pink/60 to-tech-pink/0'
                  animate={{ x: ['-35%', '135%'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }}
                />

                {/* Moving data nodes */}
                <motion.div
                  className='absolute top-16 left-0 w-2 h-2 rounded-full bg-tech-teal shadow-[0_0_12px_rgba(0,212,170,0.6)]'
                  animate={{ x: [0, 320] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                />
                <motion.div
                  className='absolute top-1/2 left-0 w-2 h-2 rounded-full bg-tech-purple shadow-[0_0_12px_rgba(139,92,246,0.6)]'
                  animate={{ x: [0, 320] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1 }}
                />
                <motion.div
                  className='absolute bottom-16 left-0 w-2 h-2 rounded-full bg-tech-pink shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                  animate={{ x: [0, 320] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 1.8 }}
                />

                {/* Subtle scan overlay on hover */}
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

          {/* Bio Content with circular profile image */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='flex items-center gap-4'>
              <img
                src={profilePic}
                alt='Hartley H. Leroy profile'
                className='w-20 h-20 rounded-full object-cover border-2 border-tech-neon/40 shadow-md'
              />
              <div>
                <p className='text-tech-text-secondary text-sm'>About Me</p>
                <p className='text-white font-display font-semibold'>Hartley H. Leroy</p>
              </div>
            </div>
            <div className='space-y-4 text-gray-300 font-display text-lg leading-relaxed'>
              <p>
                I'm a passionate{' '}
                <span className='text-tech-neon font-semibold'>engineer</span>{' '}
                and
                <span className='text-tech-pink font-semibold'>
                  {' '}
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
                When I'm not coding, you'll find me exploring the latest in
                <span className='text-tech-purple font-semibold'>
                  {' '}
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
