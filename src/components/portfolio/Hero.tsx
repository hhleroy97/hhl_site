import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DataPipeline from '@components/3d/DataPipeline'
import PerformanceDisplay from '@components/ui/PerformanceDisplay'
import { useHeroContent } from '@/hooks/useSiteContent'
import { useVisualizationTrigger } from '@/contexts/VisualizationContext'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { hero, loading } = useHeroContent()
  const { triggerHighlight, clearHighlight } = useVisualizationTrigger()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (loading || !hero) {
    return (
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-16'>
        <div className='w-full max-w-6xl px-6 md:px-16 py-4 md:py-6'>
          <div className='space-y-6'>
            <div className='h-12 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='h-6 bg-tech-dark-surface/50 rounded animate-pulse max-w-2xl'></div>
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='h-20 bg-tech-dark-surface/50 rounded-xl animate-pulse'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className='relative min-h-screen flex items-center justify-center overflow-hidden pt-16'
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
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentWarm/15 via-transparent to-accentCool/15 animate-pulse' />
          <div
            className='absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-accentPurple/8 via-transparent to-accentWarm/8 animate-spin'
            style={{ animationDuration: '30s' }}
          />
          {/* Mobile depth overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-tech-dark/70 via-tech-dark/20 to-tech-dark/70 pointer-events-none' />
        </div>
      </div>

      {/* Performance Display */}
      <PerformanceDisplay showDetails={true} />

      {/* Content Container - Above the fold positioning */}
      <div className='w-full flex items-center justify-center px-6 md:px-16 py-4 md:py-6 relative z-30'>
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
                className='text-h1 font-black text-text-primary leading-[0.85] tracking-tight relative'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {hero.headline
                  .split('intelligent')
                  .map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className='relative inline-block'>
                          <span className='text-accentWarm relative z-10 text-glow-warm'>
                            intelligent
                          </span>
                          {/* Single accent color glow */}
                          <span className='absolute inset-0 text-accentWarm blur-sm opacity-40'>
                            intelligent
                          </span>
                        </span>
                      )}
                    </span>
                  ))}
              </motion.h1>

              <motion.p
                className='text-body-lg text-tech-text-secondary font-normal leading-[1.6] max-w-4xl relative z-10 mt-6 md:mt-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {hero.subhead}
              </motion.p>
            </div>

            <motion.div
              className='flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0 text-tech-text-muted text-base md:text-lg relative z-10'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className='font-semibold text-text-primary'>
                Hartley H. Leroy
              </span>
              <div className='flex items-center space-x-3'>
                <div className='relative w-2 h-2 bg-accentWarm rounded-full'>
                  <div className='absolute inset-0 bg-accentWarm rounded-full animate-ping'></div>
                  <div className='absolute inset-0 bg-accentWarm rounded-full animate-glow-pulse'></div>
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
            {/* AWS MAP Migration Achievement */}
            <motion.div
              className={`group relative p-4 md:p-6 rounded-2xl bg-tech-dark-surface/80 border border-accentWarm/20 
                  transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'var(--tw-color-accentWarm-500)',
                boxShadow: '0 0 20px rgba(var(--tw-color-accentWarm-500), 0.2)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => triggerHighlight('infra')}
              onMouseLeave={clearHighlight}
            >
              {/* Premium depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
              <div className='absolute -top-16 -right-16 w-32 h-32 bg-accentWarm/8 rounded-full blur-3xl pointer-events-none group-hover:bg-accentWarm/12 transition-all duration-700' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accentWarm/40 to-transparent group-hover:via-accentWarm/60 transition-all duration-500' />

              <div className='flex items-center justify-between relative z-10'>
                <div className='space-y-2 md:space-y-3 flex-1'>
                  <div className='text-xl md:text-3xl font-black text-accentWarm relative group-hover:scale-105 transition-transform duration-300'>
                    <span className='relative z-10'>$500K</span>
                    <span className='absolute inset-0 text-accentWarm opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300'>
                      $500K
                    </span>
                  </div>
                  <div className='text-base md:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300'>
                    AWS MAP Migration
                  </div>
                  <p className='text-xs md:text-sm text-text-secondary leading-[1.5] group-hover:text-text-primary transition-colors duration-300'>
                    Led AWS MAP–funded migration replacing third-party fleet
                    manager with in-house cloud infrastructure.
                  </p>
                </div>
                <div className='relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-accentWarm flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-accentWarm rounded-full animate-ping opacity-40 group-hover:opacity-60'></div>
                  <div className='absolute -inset-1 bg-accentWarm rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>

            {/* Real-Time Drone Telemetry Achievement */}
            <motion.div
              className={`group relative p-4 md:p-6 rounded-2xl bg-tech-dark-surface/80 border border-accentCool/20 
                  transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'var(--tw-color-accentCool-500)',
                boxShadow: '0 0 20px rgba(var(--tw-color-accentCool-500), 0.2)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => triggerHighlight('ros2')}
              onMouseLeave={clearHighlight}
            >
              {/* Premium depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
              <div className='absolute -top-16 -right-16 w-32 h-32 bg-accentCool/8 rounded-full blur-3xl pointer-events-none group-hover:bg-accentCool/12 transition-all duration-700' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accentCool/40 to-transparent group-hover:via-accentCool/60 transition-all duration-500' />

              <div className='flex items-center justify-between relative z-10'>
                <div className='space-y-2 md:space-y-3 flex-1'>
                  <div className='text-xl md:text-3xl font-black text-accentCool relative group-hover:scale-105 transition-transform duration-300'>
                    <span className='relative z-10'>10M+</span>
                    <span className='absolute inset-0 text-accentCool opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300'>
                      10M+
                    </span>
                  </div>
                  <div className='text-base md:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300'>
                    Real-Time Drone Telemetry
                  </div>
                  <p className='text-xs md:text-sm text-text-secondary leading-[1.5] group-hover:text-text-primary transition-colors duration-300'>
                    Built OTA, log ingestion, and telemetry pipelines via AWS
                    IoT Core, Kinesis, S3, and Athena—scaling to 10M+
                    requests/day at 99.9% uptime.
                  </p>
                </div>
                <div className='relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-accentCool flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-accentCool rounded-full animate-ping opacity-40 group-hover:opacity-60'></div>
                  <div className='absolute -inset-1 bg-accentCool rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>

            {/* Bi-Directional Teleoperation Achievement */}
            <motion.div
              className={`group relative p-4 md:p-6 rounded-2xl bg-tech-dark-surface/80 border border-accentPurple/20 
                  transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'var(--tw-color-accentPurple-500)',
                boxShadow:
                  '0 0 20px rgba(var(--tw-color-accentPurple-500), 0.2)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => triggerHighlight('ml')}
              onMouseLeave={clearHighlight}
            >
              {/* Premium depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
              <div className='absolute -top-16 -right-16 w-32 h-32 bg-accentPurple/8 rounded-full blur-3xl pointer-events-none group-hover:bg-accentPurple/12 transition-all duration-700' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accentPurple/40 to-transparent group-hover:via-accentPurple/60 transition-all duration-500' />

              <div className='flex items-center justify-between relative z-10'>
                <div className='space-y-2 md:space-y-3 flex-1'>
                  <div className='text-xl md:text-3xl font-black text-accentPurple relative group-hover:scale-105 transition-transform duration-300'>
                    <span className='relative z-10'>Real-Time</span>
                    <span className='absolute inset-0 text-accentPurple opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300'>
                      Real-Time
                    </span>
                  </div>
                  <div className='text-base md:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300'>
                    Bi-Directional Teleoperation
                  </div>
                  <p className='text-xs md:text-sm text-text-secondary leading-[1.5] group-hover:text-text-primary transition-colors duration-300'>
                    Engineered bi-directional links for cloud-to-robot
                    teleoperation, enabling real-time control and future
                    autonomy.
                  </p>
                </div>
                <div className='relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-accentPurple flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-accentPurple rounded-full animate-ping opacity-40 group-hover:opacity-60'></div>
                  <div className='absolute -inset-1 bg-accentPurple rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>

            {/* Smart Lock Firmware Achievement */}
            <motion.div
              className={`group relative p-4 md:p-6 rounded-2xl bg-tech-dark-surface/80 border border-accentWarm/20 
                  transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.65 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'var(--tw-color-accentWarm-500)',
                boxShadow: '0 0 20px rgba(var(--tw-color-accentWarm-500), 0.2)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => triggerHighlight('infra')}
              onMouseLeave={clearHighlight}
            >
              {/* Premium depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
              <div className='absolute -top-16 -right-16 w-32 h-32 bg-accentWarm/8 rounded-full blur-3xl pointer-events-none group-hover:bg-accentWarm/12 transition-all duration-700' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accentWarm/40 to-transparent group-hover:via-accentWarm/60 transition-all duration-500' />

              <div className='flex items-center justify-between relative z-10'>
                <div className='space-y-2 md:space-y-3 flex-1'>
                  <div className='text-xl md:text-3xl font-black text-accentWarm relative group-hover:scale-105 transition-transform duration-300'>
                    <span className='relative z-10'>Production</span>
                    <span className='absolute inset-0 text-accentWarm opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300'>
                      Production
                    </span>
                  </div>
                  <div className='text-base md:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300'>
                    Batteryless Smart Lock Firmware
                  </div>
                  <p className='text-xs md:text-sm text-text-secondary leading-[1.5] group-hover:text-text-primary transition-colors duration-300'>
                    Delivered production firmware for NFC energy-harvesting
                    smart lock systems—deployed in real-world customer settings.
                  </p>
                </div>
                <div className='relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-accentWarm flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-accentWarm rounded-full animate-ping opacity-40 group-hover:opacity-60'></div>
                  <div className='absolute -inset-1 bg-accentWarm rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>

            {/* Team Leadership Achievement */}
            <motion.div
              className={`group relative p-4 md:p-6 rounded-2xl bg-tech-dark-surface/80 border border-accentCool/20 
                  transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'var(--tw-color-accentCool-500)',
                boxShadow: '0 0 20px rgba(var(--tw-color-accentCool-500), 0.2)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => triggerHighlight('ros2')}
              onMouseLeave={clearHighlight}
            >
              {/* Premium depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
              <div className='absolute -top-16 -right-16 w-32 h-32 bg-accentCool/8 rounded-full blur-3xl pointer-events-none group-hover:bg-accentCool/12 transition-all duration-700' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accentCool/40 to-transparent group-hover:via-accentCool/60 transition-all duration-500' />

              <div className='flex items-center justify-between relative z-10'>
                <div className='space-y-2 md:space-y-3 flex-1'>
                  <div className='text-xl md:text-3xl font-black text-accentCool relative group-hover:scale-105 transition-transform duration-300'>
                    <span className='relative z-10'>6 Engineers</span>
                    <span className='absolute inset-0 text-accentCool opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300'>
                      6 Engineers
                    </span>
                  </div>
                  <div className='text-base md:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300'>
                    Team & Project Leadership
                  </div>
                  <p className='text-xs md:text-sm text-text-secondary leading-[1.5] group-hover:text-text-primary transition-colors duration-300'>
                    Directed 6 engineers and shipped customer-facing systems
                    from scope to release at early-stage startup.
                  </p>
                </div>
                <div className='relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-accentCool flex-shrink-0 ml-6 group-hover:scale-125 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-accentCool rounded-full animate-ping opacity-40 group-hover:opacity-60'></div>
                  <div className='absolute -inset-1 bg-accentCool rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>
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
              href='#about'
              className='group relative px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-accentWarm text-tech-dark font-bold text-base md:text-lg text-center overflow-hidden transition-all duration-400 mobile-touch-target shadow-lg hover:shadow-xl'
              whileHover={{
                scale: 1.03,
                y: -3,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Primary button glow */}
              <div className='absolute inset-0 bg-accentWarm blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
              <span className='relative z-10'>{hero.primaryCta}</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href='#contact'
              className='group relative px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-text-muted/30 text-text-primary font-semibold text-base md:text-lg text-center hover:border-accentWarm hover:text-accentWarm transition-all duration-400 overflow-hidden mobile-touch-target backdrop-blur-sm'
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Ghost button subtle glow */}
              <div className='absolute inset-0 bg-accentWarm/5 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-400'></div>
              <span className='relative z-10'>{hero.secondaryCta}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
