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
      className='relative min-h-screen flex items-start justify-start overflow-hidden pt-0'
      aria-label='Hartley H. Leroy - Creative Technologist & AI Engineer'
    >
      {/* 3D Background - Full container */}
      <div className='absolute inset-0 pointer-events-auto'>
        {/* 3D Visualization - Data Pipeline */}
        <DataPipeline interactive={false} />

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

      {/* Content Container - Fixed above the fold */}
      <div className='w-full md:w-1/2 flex items-start justify-start px-6 md:px-12 pt-4 md:pt-8 pb-8 relative z-20'>
        <motion.div
          className='space-y-4 md:space-y-8 w-full max-w-4xl pointer-events-auto bg-gradient-to-br from-tech-dark/60 via-tech-dark/40 to-tech-dark/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-tech-coral/20 shadow-2xl relative overflow-hidden'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* Premium lighting effects */}
          <div className='absolute inset-0 bg-gradient-to-tr from-tech-coral/5 via-transparent to-tech-amber/5 pointer-events-none' />
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-tech-coral/10 rounded-full blur-3xl pointer-events-none animate-pulse' />
          <div
            className='absolute -bottom-20 -left-20 w-60 h-60 bg-tech-teal/10 rounded-full blur-3xl pointer-events-none animate-pulse'
            style={{ animationDelay: '1s' }}
          />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-tech-coral/20 to-transparent blur-sm pointer-events-none' />
          {/* Hero Statement */}
          <motion.div
            className='space-y-3 md:space-y-6 relative z-10'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='space-y-2 md:space-y-4'>
              <motion.h1
                className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-tech-text-primary leading-[0.9] tracking-tight relative'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Text glow effect */}
                <span className='absolute inset-0 bg-gradient-to-r from-tech-coral via-tech-amber to-tech-coral bg-clip-text text-transparent opacity-30 blur-sm'>
                  I build intelligent systems
                </span>
                <span className='relative z-10'>
                  I build{' '}
                  <span className='relative inline-block'>
                    <span className='text-transparent bg-gradient-to-r from-tech-coral via-tech-amber to-tech-coral bg-clip-text animate-text-shimmer bg-[length:200%_100%] relative z-10'>
                      intelligent
                    </span>
                    {/* Word highlight glow */}
                    <span className='absolute inset-0 bg-gradient-to-r from-tech-coral/20 via-tech-amber/20 to-tech-coral/20 blur-lg'></span>
                  </span>{' '}
                  systems
                </span>
              </motion.h1>

              <motion.p
                className='text-sm sm:text-base md:text-lg lg:text-xl text-tech-text-secondary font-light leading-relaxed max-w-3xl relative z-10'
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

          {/* Premium Impact Metrics */}
          <motion.div
            className='grid grid-cols-1 gap-3 md:gap-4 relative z-10'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className={`group relative p-3 md:p-6 rounded-xl md:rounded-2xl bg-${metric.bgColor} border border-${metric.borderColor} 
                    transition-all duration-500 overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                {/* Premium lighting effects for each metric */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-${metric.color}/5 via-transparent to-${metric.color}/5 pointer-events-none`}
                />
                <div
                  className={`absolute -top-10 -right-10 w-20 h-20 bg-${metric.color}/10 rounded-full blur-2xl pointer-events-none`}
                />
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${metric.color}/30 to-transparent`}
                />
                <div className='flex items-center justify-between relative z-10'>
                  <div className='space-y-1 md:space-y-2'>
                    <div
                      className={`text-xl md:text-3xl font-black text-${metric.color} relative`}
                    >
                      {/* Glowing text effect */}
                      <span
                        className={`absolute inset-0 text-${metric.color} opacity-40 blur-sm`}
                      >
                        {metric.value}
                      </span>
                      <span className='relative z-10'>{metric.value}</span>
                    </div>
                    <div className='text-sm md:text-base font-semibold text-tech-text-primary'>
                      {metric.label}
                    </div>
                    <p className='text-xs md:text-sm text-tech-text-secondary leading-relaxed opacity-80'>
                      {metric.detail}
                    </p>
                  </div>
                  <div
                    className={`relative w-3 h-3 rounded-full bg-${metric.color} flex-shrink-0`}
                  >
                    <div
                      className={`absolute inset-0 bg-${metric.color} rounded-full animate-ping opacity-30`}
                    ></div>
                    <div
                      className={`absolute inset-0 bg-${metric.color} rounded-full blur-sm opacity-60`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTAs */}
          <motion.div
            className='flex flex-col sm:flex-row gap-3 md:gap-6 pt-4 md:pt-8 relative z-10'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.a
              href='#experience'
              className='group relative px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-tech-coral to-tech-magenta text-white font-bold text-base md:text-lg text-center overflow-hidden transition-all duration-300 mobile-touch-target'
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button lighting effects */}
              <div className='absolute inset-0 bg-gradient-to-r from-tech-coral/80 to-tech-magenta/80 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent'></div>
              <div className='relative z-10'>View My Work</div>
            </motion.a>

            <motion.a
              href='#contact'
              className='group relative px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-tech-coral text-tech-coral font-semibold text-base md:text-lg text-center hover:bg-tech-coral hover:text-white transition-all duration-300 overflow-hidden mobile-touch-target'
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Outline button glow effect */}
              <div className='absolute inset-0 bg-tech-coral/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-tech-coral/5 to-transparent'></div>
              <span className='relative z-10'>Hire Me</span>
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
