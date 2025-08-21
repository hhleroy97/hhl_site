import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DataPipeline from '@components/3d/DataPipeline'
import PerformanceDisplay from '@components/ui/PerformanceDisplay'

export default function Hero() {
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
      className='relative min-h-screen flex items-center justify-center overflow-hidden pt-0'
      aria-label='Hartley H. Leroy - Creative Technologist & AI Engineer'
    >
      {/* 3D Background Layer - Dynamic background integration */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Desktop 3D Visualization - Integrated as background */}
        <div className='hidden md:block absolute inset-0 opacity-40'>
          <DataPipeline interactive={false} />
          {/* Depth gradient overlay for text readability */}
          <div className='absolute inset-0 bg-gradient-to-r from-tech-dark/60 via-transparent to-tech-dark/40 pointer-events-none' />
          <div className='absolute inset-0 bg-gradient-to-t from-tech-dark/50 via-transparent to-tech-dark/30 pointer-events-none' />
        </div>

        {/* Mobile fallback - Enhanced animated background */}
        <div className='md:hidden absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tech-coral/15 via-transparent to-tech-teal/15 animate-pulse' />
          <div
            className='absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-tech-amber/8 via-transparent to-tech-magenta/8 animate-spin'
            style={{ animationDuration: '30s' }}
          />
          {/* Mobile depth overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-tech-dark/70 via-tech-dark/20 to-tech-dark/70 pointer-events-none' />
        </div>
      </div>

      {/* Performance Display */}
      <PerformanceDisplay showDetails={true} />

      {/* Content Container - Above the fold positioning */}
      <div className='w-full flex items-center justify-center px-6 md:px-16 py-8 md:py-12 relative z-30'>
        <motion.div
          className='w-full max-w-6xl pointer-events-auto relative'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* Hero Statement */}
          <motion.div
            className='space-y-3 md:space-y-6 relative z-10'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='space-y-2 md:space-y-4'>
              <motion.h1
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-tech-text-primary leading-[0.85] tracking-tight relative'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                I build{' '}
                <span className='relative inline-block'>
                  <span className='text-tech-coral relative z-10'>
                    intelligent
                  </span>
                  {/* Single accent color glow */}
                  <span className='absolute inset-0 text-tech-coral blur-sm opacity-40'>
                    intelligent
                  </span>
                </span>{' '}
                systems
              </motion.h1>

              <motion.p
                className='text-base sm:text-lg md:text-xl lg:text-2xl text-tech-text-secondary font-normal leading-[1.6] max-w-4xl relative z-10 mt-6 md:mt-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Real-time AI that powers autonomous robotics, scales cloud
                infrastructure, and processes terabytes of sensor data daily.
              </motion.p>
            </div>

            <motion.div
              className='flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0 text-tech-text-muted text-base md:text-lg relative z-10'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className='font-semibold text-tech-text-primary'>
                Hartley H. Leroy
              </span>
              <div className='flex items-center space-x-3'>
                <div className='relative w-2 h-2 bg-tech-coral rounded-full'>
                  <div className='absolute inset-0 bg-tech-coral rounded-full animate-ping'></div>
                  <div className='absolute inset-0 bg-tech-coral rounded-full animate-glow-pulse'></div>
                </div>
                <span>Available for Senior Roles</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Impact Metrics - Interactive Cards */}
          <motion.div
            className='grid grid-cols-1 gap-4 md:gap-5 relative z-10 mt-6 md:mt-8'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className={`group relative p-4 md:p-6 rounded-2xl bg-gradient-to-r from-${metric.bgColor} to-${metric.bgColor}/60 border border-${metric.borderColor} 
                    transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Premium depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 bg-${metric.color}/8 rounded-full blur-3xl pointer-events-none group-hover:bg-${metric.color}/12 transition-all duration-700`}
                />
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${metric.color}/40 to-transparent group-hover:via-${metric.color}/60 transition-all duration-500`}
                />

                <div className='flex items-center justify-between relative z-10'>
                  <div className='space-y-2 md:space-y-3 flex-1'>
                    <div
                      className={`text-xl md:text-3xl font-black text-${metric.color} relative group-hover:scale-105 transition-transform duration-300`}
                    >
                      <span className='relative z-10'>{metric.value}</span>
                      <span
                        className={`absolute inset-0 text-${metric.color} opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300`}
                      >
                        {metric.value}
                      </span>
                    </div>
                    <div className='text-base md:text-lg font-bold text-tech-text-primary group-hover:text-white transition-colors duration-300'>
                      {metric.label}
                    </div>
                    <p className='text-xs md:text-sm text-tech-text-secondary leading-[1.5] group-hover:text-tech-text-primary transition-colors duration-300'>
                      {metric.detail}
                    </p>
                  </div>
                  <div
                    className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-${metric.color} flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300`}
                  >
                    <div
                      className={`absolute inset-0 bg-${metric.color} rounded-full animate-ping opacity-40 group-hover:opacity-60`}
                    ></div>
                    <div
                      className={`absolute -inset-1 bg-${metric.color} rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Refined CTAs - Clear Hierarchy */}
          <motion.div
            className='flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8 relative z-10'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {/* Primary CTA */}
            <motion.a
              href='#experience'
              className='group relative px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-tech-coral text-white font-bold text-base md:text-lg text-center overflow-hidden transition-all duration-400 mobile-touch-target shadow-lg hover:shadow-2xl'
              whileHover={{
                scale: 1.03,
                y: -3,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Primary button glow */}
              <div className='absolute inset-0 bg-tech-coral blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
              <span className='relative z-10'>View My Work</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href='#contact'
              className='group relative px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-tech-text-muted/30 text-tech-text-primary font-semibold text-base md:text-lg text-center hover:border-tech-coral hover:text-tech-coral transition-all duration-400 overflow-hidden mobile-touch-target backdrop-blur-sm'
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Ghost button subtle glow */}
              <div className='absolute inset-0 bg-tech-coral/5 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-400'></div>
              <span className='relative z-10'>Hire Me</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
