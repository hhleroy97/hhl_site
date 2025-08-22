import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DataPipeline from '../3d/DataPipeline'

export default function LandingPage() {
  const [layerDistance, setLayerDistance] = useState(3.2)
  const [positionShift, setPositionShift] = useState(-10)
  const [verticalShift, setVerticalShift] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Subtle parallax mouse tracking
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16
      const y = (e.clientY / window.innerHeight - 0.5) * 16
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])
  return (
    <section id='hero' className='relative min-h-[92vh] pt-24 overflow-hidden'>
      {/* Subtle parallax grid background */}
      <div
        className='absolute inset-0 opacity-[0.07] pointer-events-none'
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: prefersReducedMotion
            ? 'none'
            : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />

      {/* Main container with 12-column grid */}
      <div className='relative z-10 mx-auto max-w-[1180px] px-6'>
        <div className='grid grid-cols-12 gap-28 min-h-[calc(92vh-6rem)] items-center'>
          {/* Left content column - spans 7 columns */}
          <div className='col-span-12 lg:col-span-7 space-y-6 ml-2'>
            {/* Hero heading - reduced size by ~15% */}
            <motion.h1
              className='font-bold tracking-[-0.02em] leading-[1.05] bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent'
              style={{
                fontSize: 'clamp(56px, 8vw, 92px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Hartley LeRoy
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className='font-medium text-lg md:text-xl text-zinc-300 leading-[1.35] max-w-[520px]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Cloud & Creative Engineer — crafting end-to-end systems from edge
              to interface.
            </motion.p>

            {/* Tagline - reduced emphasis, only one keyword per line */}
            <motion.div
              className='space-y-4 text-lg md:text-xl leading-[1.4] max-w-[480px]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <p className='text-zinc-200'>
                Turning data into art, insight, and{' '}
                <span className='font-semibold text-white'>autonomy</span>.
              </p>
              <p className='text-zinc-200'>
                Bridging{' '}
                <span className='font-semibold text-white'>infrastructure</span>{' '}
                and imagination.
              </p>
            </motion.div>

            {/* Optional micro-credentials */}
            <motion.div
              className='text-sm text-zinc-400 font-medium'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ex-robotics • AWS/GCP • realtime UX
            </motion.div>

            {/* Status badge - improved design */}
            <motion.div
              className='flex items-center gap-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className='flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 text-emerald-300 text-sm font-medium rounded-full'>
                <div className='w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse' />
                Available now
              </div>
            </motion.div>

            {/* CTA buttons - swapped priority */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 pt-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Primary CTA - Get in touch is now primary */}
              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='group h-11 px-5 bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 hover:-translate-y-[1px] pointer-events-auto'
              >
                Get in touch
              </button>

              {/* Secondary CTA - Resume is now secondary */}
              <a
                href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='group h-11 px-5 border border-zinc-600 text-zinc-200 hover:text-white hover:border-zinc-500 font-medium rounded-2xl transition-all duration-200 hover:-translate-y-[1px] flex items-center justify-center pointer-events-auto'
                onError={e => {
                  const target = e.target as HTMLAnchorElement
                  target.href = '/docs/Hartley_LeRoy_Resume_Aug25.docx'
                }}
              >
                View résumé
              </a>

              {/* Tertiary link */}
              <button
                onClick={() =>
                  document
                    .getElementById('services')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='text-zinc-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 flex items-center gap-1 self-start sm:self-center pointer-events-auto'
              >
                See work
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
              </button>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              className='text-sm text-zinc-500 pt-1'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Charlotte, NC · Open to freelance/contract
            </motion.p>

            {/* Social links - improved hit areas */}
            <motion.div
              className='flex items-center gap-2 pt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub profile'
                className='group w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all duration-200 pointer-events-auto'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>

              <a
                href='https://linkedin.com/in/hartley-leroy'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn profile'
                className='group w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all duration-200 pointer-events-auto'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>

              <a
                href='mailto:hartley.leroy1997@gmail.com'
                aria-label='Email contact'
                className='group w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all duration-200 pointer-events-auto'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right visualization column - spans 5 columns */}
          <div className='hidden lg:block col-span-5 h-full relative'>
            {/* Gradient mask to separate from content */}
            <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none' />

            <div className='h-[600px] relative'>
              <motion.div
                className='w-full h-full'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 0.9 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <DataPipeline
                  className='w-full h-full'
                  layerSpacing={layerDistance}
                  positionShift={positionShift}
                  verticalShift={verticalShift}
                  cinematicMode={true}
                  interactive={false}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Dev controls - only in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className='fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 pointer-events-auto'>
          <div className='space-y-4'>
            {/* Layer Spacing Control */}
            <div>
              <label className='block text-white text-sm mb-2'>
                Layer Spacing: {layerDistance.toFixed(1)}
              </label>
              <input
                type='range'
                min='0.5'
                max='25'
                step='0.1'
                value={layerDistance}
                onChange={e => setLayerDistance(Number(e.target.value))}
                className='w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
              />
            </div>

            {/* Position Shift Control */}
            <div>
              <label className='block text-white text-sm mb-2'>
                Position Shift: {positionShift.toFixed(1)}
              </label>
              <input
                type='range'
                min='-15'
                max='15'
                step='0.1'
                value={positionShift}
                onChange={e => setPositionShift(Number(e.target.value))}
                className='w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
              />
            </div>

            {/* Vertical Shift Control */}
            <div>
              <label className='block text-white text-sm mb-2'>
                Vertical Shift: {verticalShift.toFixed(1)}
              </label>
              <input
                type='range'
                min='-10'
                max='10'
                step='0.1'
                value={verticalShift}
                onChange={e => setVerticalShift(Number(e.target.value))}
                className='w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
