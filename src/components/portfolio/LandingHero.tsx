import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function LandingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Transform values based on scroll progress
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -200])
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -300])

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.15])
  const photoX = useTransform(scrollYProgress, [0, 1], [0, 300])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -300])

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])

  return (
    <>
      {/* Header background that appears on scroll */}
      <motion.div
        className='fixed top-0 left-0 right-0 z-40 bg-tech-dark/95 backdrop-blur-md border-b border-tech-teal/20 h-16'
        style={{ opacity: headerOpacity }}
      />

      {/* Navigation that appears on scroll */}
      <motion.nav
        className='fixed top-0 right-0 z-50 p-4'
        style={{ opacity: headerOpacity }}
      >
        <div className='flex items-center space-x-6'>
          {['About', 'Skills', 'Experience', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className='text-tech-text-secondary hover:text-tech-teal transition-colors duration-300'
            >
              {item}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Main Hero Section */}
      <section
        ref={containerRef}
        className='relative min-h-screen flex items-center justify-center px-8 lg:px-16'
      >
        <div className='max-w-7xl mx-auto w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            {/* Left column - Content */}
            <motion.div
              className='space-y-12 text-center lg:text-left'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Name - morphs to header position */}
              <motion.div
                className='space-y-8'
                style={{
                  scale: nameScale,
                  x: nameX,
                  y: nameY,
                  transformOrigin: 'left center',
                }}
              >
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-tech-text-primary leading-tight'>
                  Hartley H.{' '}
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    Leroy
                  </span>
                </h1>

                <motion.div
                  className='space-y-4'
                  style={{ opacity: contentOpacity }}
                >
                  <p className='text-2xl sm:text-3xl font-semibold text-tech-text-secondary'>
                    Software Engineer
                  </p>

                  <p className='text-xl text-tech-text-muted'>
                    Robotics Fleet Management
                  </p>

                  <p className='text-lg text-tech-text-muted'>Charlotte, NC</p>
                </motion.div>
              </motion.div>

              {/* Contact Actions */}
              <motion.div
                className='flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-12'
                style={{ opacity: contentOpacity }}
              >
                <motion.a
                  href='#experience'
                  className='px-10 py-5 rounded-lg bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-bold text-center transition-all hover:shadow-lg text-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Experience
                </motion.a>
                <motion.a
                  href='#contact'
                  className='px-10 py-5 rounded-lg border border-tech-teal text-tech-teal font-semibold text-center hover:bg-tech-teal hover:text-tech-dark transition-all text-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right column - Photo - morphs to header position */}
            <motion.div
              className='flex justify-center lg:justify-end'
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                scale: photoScale,
                x: photoX,
                y: photoY,
                transformOrigin: 'center',
              }}
            >
              <div className='relative w-96 h-96 rounded-full bg-gradient-to-br from-tech-teal/20 to-tech-cyan/20 border-2 border-tech-teal/30 flex items-center justify-center overflow-hidden shadow-2xl'>
                <img
                  src='/src/assets/prof-pic-2.jpg'
                  alt='Hartley H. Leroy - Professional Photo'
                  className='w-full h-full object-cover'
                  style={{
                    imageRendering: 'optimizeQuality' as const,
                    transform: 'translateX(-20px) scale(1.2)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            className='w-6 h-10 border-2 border-tech-teal rounded-full flex justify-center'
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className='w-1 h-3 bg-tech-teal rounded-full mt-2'
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
