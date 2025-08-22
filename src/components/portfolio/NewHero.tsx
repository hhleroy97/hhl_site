import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DataPipeline from '../3d/DataPipeline'

export default function NewHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center py-24 overflow-hidden'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0'>
        {/* Animated gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90' />

        {/* Floating geometric shapes */}
        <motion.div
          className='absolute top-20 left-20 w-32 h-32 border border-cyan-400/20 rounded-full'
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute bottom-20 right-20 w-24 h-24 border border-fuchsia-400/20 rotate-45'
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute top-1/2 left-1/2 w-16 h-16 border border-emerald-400/20'
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Interactive Data Pipeline Visualization - Enhanced */}
      <motion.div
        className='absolute inset-0 z-10'
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      >
        <motion.div
          className='w-full h-full'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <DataPipeline
            className='w-full h-full'
            layerSpacing={3.6}
            positionShift={-12.5}
            verticalShift={0}
            cinematicMode={true}
            interactive={false}
          />
        </motion.div>
      </motion.div>

      <div className='container-custom relative z-20 pointer-events-none'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Enhanced Text content */}
          <div className='max-w-2xl'>
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Name with dramatic typography */}
              <motion.h1
                className='text-7xl md:text-9xl font-black tracking-tight leading-none'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className='bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl'>
                  Hartley
                </span>
                <br />
                <span className='bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl'>
                  LeRoy
                </span>
              </motion.h1>

              {/* Enhanced Main tagline with better hierarchy */}
              <motion.h2
                className='text-3xl md:text-4xl font-light text-white leading-relaxed max-w-3xl'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Turning data into{' '}
                <span className='text-cyan-400 font-bold drop-shadow-lg shadow-cyan-400/50'>
                  art
                </span>
                ,{' '}
                <span className='text-fuchsia-400 font-bold drop-shadow-lg shadow-fuchsia-400/50'>
                  insights
                </span>
                , and{' '}
                <span className='text-emerald-400 font-bold drop-shadow-lg shadow-emerald-400/50'>
                  autonomy
                </span>
                .
                <br />
                Bridging{' '}
                <span className='font-bold text-white drop-shadow-lg'>
                  infrastructure
                </span>{' '}
                and{' '}
                <span className='font-bold text-white drop-shadow-lg'>
                  imagination
                </span>
                .
              </motion.h2>

              {/* Enhanced Subtitle */}
              <motion.p
                className='text-xl text-zinc-300 max-w-2xl font-light'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Cloud & Creative Engineer — crafting end-to-end systems from
                edge to interface.
              </motion.p>

              {/* Enhanced Status and contact info */}
              <motion.div
                className='flex flex-wrap items-center gap-6 text-sm text-zinc-400'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.div
                  className='flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm'
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50' />
                  <span>Charlotte, NC</span>
                </motion.div>
                <motion.div
                  className='flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm'
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50' />
                  <span>Open to work</span>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className='flex flex-wrap items-center gap-4 pt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.a
                  href='#contact'
                  className='relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group'
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='relative z-10'>Let's Build Together</span>
                  {/* Enhanced glow effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
                </motion.a>

                <motion.a
                  href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                  className='relative px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 group'
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='relative z-10'>View Resume</span>
                  {/* Subtle glow effect */}
                  <div className='absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Right side content */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Floating stats cards */}
            <div className='space-y-6'>
              <motion.div
                className='p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl'
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className='text-3xl font-bold text-cyan-400 mb-2'>
                  10M+
                </div>
                <div className='text-sm text-zinc-400'>
                  Daily Telemetry Events
                </div>
              </motion.div>

              <motion.div
                className='p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl'
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className='text-3xl font-bold text-fuchsia-400 mb-2'>
                  &lt;100ms
                </div>
                <div className='text-sm text-zinc-400'>System Latency</div>
              </motion.div>

              <motion.div
                className='p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl'
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <div className='text-3xl font-bold text-emerald-400 mb-2'>
                  500+
                </div>
                <div className='text-sm text-zinc-400'>Live Events</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced floating elements */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className='w-6 h-6 border-2 border-white/30 rounded-full'
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  )
}
