import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import DataPipeline from '@components/3d/DataPipeline'
import PerformanceDisplay from '@components/ui/PerformanceDisplay'

export default function Hero() {
  const [activeMetric, setActiveMetric] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const metrics = [
    {
      value: '$500K',
      label: 'Cloud Infrastructure Optimized',
      detail:
        'Architected scalable AWS systems serving 10M+ requests/day with 99.9% uptime',
      color: 'tech-coral',
      bgColor: 'tech-coral/10',
      borderColor: 'tech-coral/30',
    },
    {
      value: 'ROS2',
      label: 'Autonomous Robotics',
      detail:
        'Built real-time navigation systems for autonomous drone fleets with computer vision',
      color: 'tech-amber',
      bgColor: 'tech-amber/10',
      borderColor: 'tech-amber/30',
    },
    {
      value: 'AI/ML',
      label: 'Production Pipelines',
      detail:
        'Deployed ML models processing 1TB+ sensor data daily with sub-100ms latency',
      color: 'tech-teal',
      bgColor: 'tech-teal/10',
      borderColor: 'tech-teal/30',
    },
  ]

  return (
    <section
      className='relative min-h-screen flex items-start overflow-hidden'
      aria-label='Hartley H. Leroy - Creative Technologist & AI Engineer'
    >
      {/* 3D Background - Full container */}
      <div className='absolute inset-0 pointer-events-auto'>
        {/* 3D Visualization - Data Pipeline */}
        <DataPipeline interactive={true} />

        {/* Mobile fallback - animated background */}
        <div className='md:hidden absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-80'>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tech-coral/20 via-transparent to-tech-teal/20 animate-pulse' />
          <div
            className='absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-tech-amber/10 via-transparent to-tech-magenta/10 animate-spin'
            style={{ animationDuration: '20s' }}
          />
        </div>
      </div>

      {/* Performance Display */}
      <PerformanceDisplay showDetails={true} />

      {/* Content Container - Above the fold positioning */}
      <div className='w-full md:w-1/2 h-full flex items-start justify-start px-6 md:px-16 py-8 md:py-16 relative z-20'>
        <motion.div
          className='space-y-6 md:space-y-10 w-full max-w-4xl pointer-events-auto bg-tech-dark/40 md:bg-tech-dark/30 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-tech-coral/20 shadow-2xl'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* Hero Statement */}
          <motion.div
            className='space-y-4 md:space-y-8'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='space-y-3 md:space-y-6'>
              <motion.h1
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-tech-text-primary leading-[0.9] tracking-tight'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                I build{' '}
                <span className='relative inline-block'>
                  <span className='text-transparent bg-gradient-to-r from-tech-coral via-tech-amber to-tech-coral bg-clip-text animate-text-shimmer bg-[length:200%_100%]'>
                    intelligent
                  </span>
                </span>{' '}
                systems
              </motion.h1>

              <motion.p
                className='text-base sm:text-lg md:text-xl lg:text-2xl text-tech-text-secondary font-light leading-relaxed max-w-3xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Real-time AI that powers autonomous robotics, scales cloud
                infrastructure, and processes terabytes of sensor data daily.
              </motion.p>
            </div>

            <motion.div
              className='flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0 text-tech-text-muted text-lg md:text-xl'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className='font-semibold text-tech-text-primary'>
                Hartley H. Leroy
              </span>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-tech-coral rounded-full animate-glow-pulse'></div>
                <span>Available for Senior Roles</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Impact Metrics */}
          <motion.div
            className='grid grid-cols-1 gap-4 md:gap-6'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className={`group relative p-4 md:p-8 rounded-xl md:rounded-2xl bg-${metric.bgColor} border border-${metric.borderColor} 
                    cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                    ${activeMetric === index ? 'ring-2 ring-' + metric.color + ' scale-[1.02]' : ''}`}
                onMouseEnter={() => setActiveMetric(index)}
                onMouseLeave={() => setActiveMetric(null)}
                onClick={() =>
                  setActiveMetric(activeMetric === index ? null : index)
                }
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className='flex items-center justify-between'>
                  <div className='space-y-1 md:space-y-2'>
                    <div
                      className={`text-2xl md:text-4xl font-black text-${metric.color} group-hover:animate-metric-flip`}
                    >
                      {metric.value}
                    </div>
                    <div className='text-base md:text-lg font-semibold text-tech-text-primary'>
                      {metric.label}
                    </div>
                  </div>
                  <motion.div
                    className={`w-3 h-3 rounded-full bg-${metric.color} flex-shrink-0`}
                    animate={{
                      scale: activeMetric === index ? [1, 1.5, 1] : 1,
                      opacity: activeMetric === index ? [1, 0.7, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: activeMetric === index ? Infinity : 0,
                    }}
                  />
                </div>

                <AnimatePresence>
                  {activeMetric === index && (
                    <motion.div
                      className='mt-3 md:mt-4 pt-3 md:pt-4 border-t border-tech-text-disabled/20'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className='text-sm md:text-base text-tech-text-secondary leading-relaxed'>
                        {metric.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTAs */}
          <motion.div
            className='flex flex-col sm:flex-row gap-4 md:gap-8 pt-6 md:pt-12'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href='#experience'
              className='group relative px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-tech-coral to-tech-magenta text-white font-bold text-lg md:text-xl text-center overflow-hidden transition-all duration-300 hover:shadow-2xl mobile-touch-target'
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => {}}
            >
              <div className='relative z-10'>View My Work</div>
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-tech-magenta to-tech-coral'
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href='#contact'
              className='group px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-tech-coral text-tech-coral font-semibold text-lg md:text-xl text-center hover:bg-tech-coral hover:text-white transition-all duration-300 relative overflow-hidden mobile-touch-target'
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className='relative z-10'>Hire Me</span>
              <motion.div
                className='absolute inset-0 bg-tech-coral'
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right half - 3D Visualization Space (hidden on mobile) */}
      <div className='hidden md:block w-1/2 h-full relative'>
        {/* Subtle gradient overlay for depth */}
        <div className='absolute inset-0 bg-gradient-to-l from-transparent via-tech-dark/20 to-tech-dark/60 pointer-events-none z-10' />
      </div>
    </section>
  )
}
