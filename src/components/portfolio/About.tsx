import { motion } from 'framer-motion'

// Abstract Data Flow Visualization Component
function DataFlowVisualization() {
  return (
    <div className='relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-tech-dark-alt to-tech-dark border-2 border-tech-neon/30'>
      {/* Background grid pattern */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Central data hub */}
      <motion.div
        className='absolute top-1/2 left-1/2 w-16 h-16 bg-tech-neon rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2'
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(0, 255, 255, 0.5)',
            '0 0 40px rgba(0, 255, 255, 0.8)',
            '0 0 20px rgba(0, 255, 255, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className='w-8 h-8 bg-tech-dark rounded-full flex items-center justify-center'>
          <span className='text-tech-neon text-lg font-bold'>⚡</span>
        </div>
      </motion.div>

      {/* Data nodes */}
      {[
        { x: '20%', y: '20%', color: 'tech-pink', delay: 0 },
        { x: '80%', y: '20%', color: 'tech-purple', delay: 0.5 },
        { x: '20%', y: '80%', color: 'tech-cyan', delay: 1 },
        { x: '80%', y: '80%', color: 'tech-teal', delay: 1.5 },
      ].map((node, index) => (
        <motion.div
          key={index}
          className={`absolute w-6 h-6 bg-${node.color} rounded-full`}
          style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: node.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Data flow lines */}
      {[
        { from: { x: '20%', y: '20%' }, to: { x: '50%', y: '50%' }, color: 'tech-pink' },
        { from: { x: '80%', y: '20%' }, to: { x: '50%', y: '50%' }, color: 'tech-purple' },
        { from: { x: '20%', y: '80%' }, to: { x: '50%', y: '50%' }, color: 'tech-cyan' },
        { from: { x: '80%', y: '80%' }, to: { x: '50%', y: '50%' }, color: 'tech-teal' },
      ].map((line, index) => (
        <svg
          key={index}
          className='absolute inset-0 w-full h-full pointer-events-none'
          style={{ zIndex: 1 }}
        >
          <motion.line
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={`var(--color-${line.color})`}
            strokeWidth='2'
            strokeDasharray='5,5'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: 'easeInOut',
            }}
          />
        </svg>
      ))}

      {/* Floating data particles */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          className='absolute w-2 h-2 bg-tech-neon rounded-full'
          style={{
            left: `${20 + (index * 10) % 60}%`,
            top: `${30 + (index * 15) % 40}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Processing indicators */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-4 h-4 border-2 border-tech-pink rounded-full'
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute bottom-1/4 right-1/4 w-4 h-4 border-2 border-tech-cyan rounded-full'
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner brackets */}
      <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-tech-neon' />
      <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-tech-neon' />
      <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-tech-neon' />
      <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-tech-neon' />

      {/* Overlay text */}
      <div className='absolute bottom-4 left-4 right-4 text-center'>
        <p className='text-xs text-tech-neon font-mono tracking-wider'>
          DATA FLOW SYSTEM
        </p>
      </div>
    </div>
  )
}

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
          {/* Data Flow Visualization Section */}
          <motion.div
            className='flex justify-center lg:justify-start'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative'>
              <DataFlowVisualization />

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
                <span className='text-white text-xl'>🔗</span>
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
                <span className='text-white text-xl'>📊</span>
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
