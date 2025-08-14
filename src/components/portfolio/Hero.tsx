import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Text content */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <motion.h1
                className='text-4xl sm:text-5xl lg:text-6xl font-cyber font-bold text-white mb-4'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className='text-cyberpunk-neon'>HARTLEY</span>
                <br />
                <span className='text-white'>H. LEROY</span>
              </motion.h1>

              <motion.div
                className='text-xl sm:text-2xl text-gray-300 font-display'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Engineer • Builder • Creative Technologist
              </motion.div>
            </div>

            <motion.p
              className='text-lg text-gray-400 leading-relaxed max-w-2xl font-display'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Bridging the gap between technical excellence and creative
              innovation. I build scalable systems, lead cross-functional teams,
              and create immersive digital experiences that push the boundaries
              of what's possible.
            </motion.p>

            <motion.div
              className='flex flex-wrap gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href='#projects'
                className='px-6 py-3 bg-cyberpunk-neon text-black font-cyber font-bold rounded-lg
                         hover:bg-cyberpunk-pink hover:shadow-lg hover:shadow-cyberpunk-pink/30
                         transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW PROJECTS
              </motion.a>

              <motion.a
                href='#contact'
                className='px-6 py-3 border-2 border-cyberpunk-neon text-cyberpunk-neon font-cyber font-bold rounded-lg
                         hover:bg-cyberpunk-neon hover:text-black hover:shadow-lg hover:shadow-cyberpunk-neon/30
                         transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                GET IN TOUCH
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className='relative'>
              {/* Main geometric shape */}
              <motion.div
                className='w-80 h-80 relative'
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Outer ring */}
                <motion.div
                  className='absolute inset-0 border-2 border-cyberpunk-neon rounded-full'
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Inner hexagon */}
                <motion.div
                  className='absolute inset-8 border-2 border-cyberpunk-pink'
                  style={{
                    clipPath:
                      'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  }}
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Center dot */}
                <motion.div
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           w-4 h-4 bg-cyberpunk-neon rounded-full'
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              {/* Floating particles around the shape */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className='absolute w-2 h-2 bg-cyberpunk-purple rounded-full'
                  style={{
                    top: `${30 + Math.sin(i * 0.785) * 150}px`,
                    left: `${30 + Math.cos(i * 0.785) * 150}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
