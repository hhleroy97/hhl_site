import { motion } from 'framer-motion'
import DataPipeline from '../../3d/DataPipeline'

interface InteractiveElementsProps {
  showBorders?: boolean
  layerDistance?: number
  positionShift?: number
  verticalShift?: number
  rotationX?: number
  rotationY?: number
  rotationZ?: number
  positionX?: number
  positionY?: number
  positionZ?: number
  showBoundingBox?: boolean
  showOriginMarker?: boolean
}

export default function InteractiveElements({
  showBorders = false,
  layerDistance = 3.6,
  positionShift = 0,
  verticalShift = 0,
  rotationX = -8,
  rotationY = -3,
  rotationZ = 0,
  positionX = -1.4,
  positionY = 2,
  positionZ = -16.5,
  showBoundingBox = false,
  showOriginMarker = false,
}: InteractiveElementsProps) {
  return (
    <motion.div
      className={`flex flex-col gap-6 w-full h-full ${showBorders ? 'border-4 border-cyan-400' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.8,
        easing: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Desktop: Enhanced Social Icon Sub-container */}
      <div
        className={`hidden sm:flex gap-4 ${showBorders ? 'border-4 border-blue-500' : ''}`}
      >
        <a
          href='https://github.com/hhleroy97'
          target='_blank'
          rel='noopener noreferrer'
          className={`flex items-center justify-center gap-3 flex-1 h-14 rounded-tl-xl bg-black/30 backdrop-blur-md border border-white/20 hover:bg-purple-400/15 hover:border-purple-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-yellow-400' : ''}`}
          aria-label='GitHub profile'
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <svg className='w-7 h-7' fill='#B06AF7' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
              clipRule='evenodd'
            />
          </svg>
          <span className='hidden sm:block text-sm font-semibold text-purple-400 tracking-wide'>
            GitHub
          </span>
        </a>
        <a
          href='https://linkedin.com/in/hartley-leroy'
          target='_blank'
          rel='noopener noreferrer'
          className={`flex items-center justify-center gap-3 flex-1 h-14 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-cyan-400/15 hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-magenta-400' : ''}`}
          aria-label='LinkedIn profile'
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <svg className='w-7 h-7' fill='#7BC6FF' viewBox='0 0 24 24'>
            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
          </svg>
          <span className='hidden sm:block text-sm font-semibold text-cyan-400 tracking-wide'>
            LinkedIn
          </span>
        </a>
        <a
          href='mailto:hartley.leroy1997@gmail.com'
          className={`flex items-center justify-center gap-3 flex-1 h-14 rounded-tr-xl bg-black/30 backdrop-blur-md border border-white/20 hover:bg-teal-400/15 hover:border-teal-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-orange-400' : ''}`}
          aria-label='Email contact'
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <svg
            className='w-7 h-7'
            fill='none'
            stroke='#28E1B1'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
          <span className='hidden sm:block text-sm font-semibold text-teal-400 tracking-wide'>
            Email
          </span>
        </a>
      </div>

      {/* Mobile: 3D Visualization */}
      <motion.div
        className={`block sm:hidden h-64 -mt-8 translate-x-4 ${showBorders ? 'border-4 border-purple-500' : ''}`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          easing: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <DataPipeline
          className='w-full h-full'
          layerSpacing={layerDistance}
          positionShift={positionShift}
          verticalShift={verticalShift}
          cinematicMode={false}
          interactive={true}
          rotationX={rotationX}
          rotationY={rotationY}
          rotationZ={rotationZ}
          positionX={positionX}
          positionY={positionY}
          positionZ={positionZ}
          showBoundingBox={showBoundingBox}
          showOriginMarker={showOriginMarker}
          enableMouseParallax={true}
        />
      </motion.div>

      {/* Desktop: Enhanced Resume-Based Achievements */}
      <motion.div
        className={`hidden sm:block ${showBorders ? 'border-4 border-purple-500' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          easing: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Enhanced Achievement Card - Compact */}
        <motion.div
          className={`group relative p-6 md:p-8 bg-black/30 backdrop-blur-md border border-white/20 
              transition-all duration-300 cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl ${showBorders ? 'border-4 border-red-500' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            easing: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.02,
            y: -4,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Enhanced depth effects */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
          <div className='absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
          <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />

          <div className='relative z-10'>
            <div className='text-2xl font-semibold text-white mb-4 tracking-wide'>
              Open to freelance and full-time.
            </div>

            <ul className='space-y-3 text-base md:text-lg text-zinc-300 leading-relaxed'>
              <li className='flex items-start gap-3 group/item'>
                <span className='text-purple-400 font-bold text-lg group-hover/item:text-purple-300 transition-colors flex-shrink-0'>
                  •
                </span>
                <span className='group-hover/item:text-white transition-colors'>
                  Led $500K AWS-funded migration; ended vendor lock-in.
                </span>
              </li>
              <li className='flex items-start gap-3 group/item'>
                <span className='text-purple-400 font-bold text-lg group-hover/item:text-purple-300 transition-colors flex-shrink-0'>
                  •
                </span>
                <span className='group-hover/item:text-white transition-colors'>
                  Built real-time telemetry and over-the-air update pipeline for
                  robotic fleet.
                </span>
              </li>
              <li className='flex items-start gap-3 group/item'>
                <span className='text-purple-400 font-bold text-lg group-hover/item:text-purple-300 transition-colors flex-shrink-0'>
                  •
                </span>
                <span className='group-hover/item:text-white transition-colors'>
                  Led a 6-engineer international dev team.
                </span>
              </li>
              <li className='flex items-start gap-3 group/item'>
                <span className='text-purple-400 font-bold text-lg group-hover/item:text-purple-300 transition-colors flex-shrink-0'>
                  •
                </span>
                <span className='group-hover/item:text-white transition-colors'>
                  Programmed batteryless smart-lock firmware.
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile: Inline container for buttons under 3D visualization (scrolls with content) */}
      <div className='block sm:hidden -mt-12'>
        <div className='flex flex-col gap-2'>
          {/* Social buttons */}
          <div
            className={`flex gap-2 ${showBorders ? 'border-4 border-blue-500' : ''}`}
          >
            <a
              href='https://github.com/hhleroy97'
              target='_blank'
              rel='noopener noreferrer'
              className={`flex items-center justify-center gap-3 flex-1 h-12 rounded-tl-xl bg-black/30 backdrop-blur-md border border-white/20 hover:bg-purple-400/15 hover:border-purple-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-yellow-400' : ''}`}
              aria-label='GitHub profile'
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <svg className='w-6 h-6' fill='#B06AF7' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='https://linkedin.com/in/hartley-leroy'
              target='_blank'
              rel='noopener noreferrer'
              className={`flex items-center justify-center gap-3 flex-1 h-12 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-cyan-400/15 hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-magenta-400' : ''}`}
              aria-label='LinkedIn profile'
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <svg className='w-6 h-6' fill='#7BC6FF' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
              </svg>
            </a>
            <a
              href='mailto:hartley.leroy1997@gmail.com'
              className={`flex items-center justify-center gap-3 flex-1 h-12 rounded-tr-xl bg-black/30 backdrop-blur-md border border-white/20 hover:bg-teal-400/15 hover:border-teal-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 pointer-events-auto transform hover:scale-105 hover:-translate-y-1 ${showBorders ? 'border-4 border-orange-400' : ''}`}
              aria-label='Email contact'
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='#28E1B1'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </a>
          </div>

          {/* Action buttons */}
          <div className='flex flex-col gap-2'>
            <a
              href='#contact'
              className={`w-full h-12 px-4 bg-black/30 backdrop-blur-md border border-white/20 text-[#7BC6FF] font-semibold hover:bg-[#7BC6FF]/15 hover:border-[#7BC6FF]/40 hover:text-[#7BC6FF] transition-all duration-300 pointer-events-auto text-center flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:scale-105 hover:-translate-y-1 text-lg tracking-wide ${showBorders ? 'border-4 border-blue-500' : ''}`}
              onClick={() => {
                window.location.hash = 'contact'
              }}
            >
              Get in Touch
            </a>
            <button
              className={`w-full h-12 px-4 bg-black/30 backdrop-blur-md border border-white/20 text-[#7BC6FF] font-semibold rounded-b-xl hover:bg-[#7BC6FF]/15 hover:border-[#7BC6FF]/40 hover:text-[#7BC6FF] transition-all duration-300 pointer-events-auto text-center flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:scale-105 hover:-translate-y-1 text-lg tracking-wide ${showBorders ? 'border-4 border-purple-500' : ''}`}
              onClick={() => {
                const go = () => {
                  window.location.hash = 'about'
                  // Ensure in-page scroll after hash change
                  setTimeout(() => {
                    const el = document.getElementById('about')
                    if (el)
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 50)
                }
                go()
              }}
            >
              Continue to site
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Action buttons */}
      <motion.div
        className={`hidden sm:flex flex-col gap-3 sm:gap-4 ${showBorders ? 'border-4 border-green-500' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.8,
          easing: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Desktop: Get in Touch and View Experience buttons side by side */}
        <div className='flex flex-row gap-4'>
          <a
            href='#contact'
            className={`flex-1 h-14 px-6 bg-gradient-to-r from-purple-500 from-10% via-cyan-500 via-50% to-cyan-500 to-90% text-white font-semibold rounded-bl-xl hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 pointer-events-auto text-center flex items-center justify-center border border-white/20 text-xl tracking-wide ${showBorders ? 'border-4 border-blue-500' : ''}`}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Get in Touch
          </a>
          <a
            href='#experience'
            className={`flex-1 h-14 px-6 bg-black/30 backdrop-blur-md border border-white/20 text-teal-400 font-semibold rounded-br-xl hover:bg-teal-400/15 hover:border-teal-400/40 hover:text-teal-300 transition-all duration-300 pointer-events-auto text-center flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transform hover:scale-105 hover:-translate-y-1 text-xl tracking-wide ${showBorders ? 'border-4 border-purple-500' : ''}`}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            View Experience
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
