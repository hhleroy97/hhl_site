import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'

export default function LandingPage() {
  const [layerDistance, setLayerDistance] = useState(3.6)
  const [positionShift, setPositionShift] = useState(-12.5)
  const [verticalShift, setVerticalShift] = useState(0)
  const [showBorders, setShowBorders] = useState(false)
  return (
    <section
      id='hero'
      className={`relative min-h-screen py-12 overflow-hidden ${showBorders ? 'border-4 border-white' : ''}`}
    >
      {/* Interactive Data Pipeline Visualization - Main Layer */}
      <div
        className={`absolute inset-0 z-10 ${showBorders ? 'border-4 border-red-500' : ''}`}
      >
        <motion.div
          className={`w-full h-full ${showBorders ? 'border-4 border-lime-500' : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
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

      {/* Full-width content section with centered container */}
      <div
        className={`relative z-20 pointer-events-none w-full pt-8 overflow-visible ${showBorders ? 'border-4 border-cyan-500' : ''}`}
      >
        <div
          className={`w-full flex justify-center px-4 md:px-8 overflow-visible ${showBorders ? 'border-4 border-yellow-500' : ''}`}
        >
          <div
            className={`w-full max-w-7xl overflow-visible ${showBorders ? 'border-4 border-magenta-500' : ''}`}
          >
            <motion.div
              className={`space-y-6 overflow-visible ${showBorders ? 'border-4 border-orange-500' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Greeting and Name - Left aligned */}
              <motion.div
                className='text-left relative overflow-visible'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <div
                  className={`text-2xl md:text-3xl text-zinc-400 font-bold text-left mb-2 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
                >
                  Hi, I'm...
                </div>
                <div
                  className='text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight relative z-50 text-left'
                  style={{
                    lineHeight: '1',
                  }}
                >
                  <span style={{ color: '#d946ef' }}>Hartley</span>{' '}
                  <span style={{ color: '#22d3ee' }}>LeRoy</span>
                </div>

                {/* Sleek underline positioned below name */}
                <motion.div
                  className='absolute w-full h-1'
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                  style={{
                    bottom: '0px',
                    left: '-10%',
                    transformOrigin: 'center',
                    width: '120%',
                    zIndex: 0,
                    background:
                      'linear-gradient(to right, transparent 0%, #9ca3af 20%, #e5e7eb 80%, transparent 100%)',
                  }}
                />
              </motion.div>

              {/* Role/Title - Left aligned */}
              <motion.p
                className={`text-2xl md:text-3xl text-zinc-300 font-light text-left mb-8 ${showBorders ? 'border-4 border-blue-500' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className='font-bold'>Cloud & Creative Engineer</span> —
                Crafting end-to-end systems from edge to interface.
              </motion.p>
            </motion.div>

            {/* Social Icons - Vertical Stack */}
            <motion.div
              className={`flex flex-col gap-2 mb-8 w-[55%] mt-8 ${showBorders ? 'border-4 border-cyan-400' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* Social Icon Sub-container */}
              <div
                className={`flex gap-3 ${showBorders ? 'border-4 border-blue-500' : ''}`}
              >
                <a
                  href='https://github.com/hhleroy97'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`flex items-center justify-center flex-1 h-10 rounded-tl-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${showBorders ? 'border-4 border-yellow-400' : ''}`}
                  aria-label='GitHub profile'
                >
                  <svg className='w-5 h-5' fill='#22d3ee' viewBox='0 0 20 20'>
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
                  className={`flex items-center justify-center flex-1 h-10 rounded-none bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${showBorders ? 'border-4 border-magenta-400' : ''}`}
                  aria-label='LinkedIn profile'
                >
                  <svg className='w-5 h-5' fill='#d946ef' viewBox='0 0 24 24'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </a>
                <a
                  href='mailto:hartley.leroy1997@gmail.com'
                  className={`flex items-center justify-center flex-1 h-10 rounded-tr-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${showBorders ? 'border-4 border-orange-400' : ''}`}
                  aria-label='Email contact'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='#34d399'
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

              {/* Real Resume-Based Achievements */}
              <motion.div
                className={`mt-3 mb-3 ${showBorders ? 'border-4 border-purple-500' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Single Achievement Card */}
                <motion.div
                  className={`group relative p-6 md:p-8 rounded-none bg-black/20 backdrop-blur-sm border border-cyan-400/20 
                      transition-all duration-700 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl ${showBorders ? 'border-4 border-red-500' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    borderColor: 'rgba(34, 211, 238, 0.4)',
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Premium depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
                  <div className='absolute -top-16 -right-16 w-32 h-32 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/12 transition-all duration-700' />
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-cyan-400/60 transition-all duration-500' />

                  <div className='relative z-10'>
                    <div className='text-2xl md:text-3xl font-light text-white leading-relaxed mb-4'>
                      Turning data into{' '}
                      <span className='text-cyan-400 font-bold'>art</span>,{' '}
                      <span className='text-fuchsia-400 font-bold'>
                        insights
                      </span>
                      , and{' '}
                      <span className='text-emerald-400 font-bold'>
                        autonomy
                      </span>
                      .
                      <br />
                      Bridging <span className='font-bold'>
                        infrastructure
                      </span>{' '}
                      and <span className='font-bold'>imagination</span>.
                    </div>

                    <ul className='space-y-3 text-sm md:text-base text-zinc-300 leading-relaxed'>
                      <li className='flex items-center gap-3'>
                        <span className='text-gray-400 font-bold'>•</span>
                        <span>
                          Led a $500K AWS MAP-funded migration to in-house
                          infrastructure
                        </span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <span className='text-gray-400 font-bold'>•</span>
                        <span>
                          Built real-time telemetry and OTA pipelines processing
                          10M+ events/day
                        </span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <span className='text-gray-400 font-bold'>•</span>
                        <span>
                          Enabled bi-directional cloud-to-robot teleoperation
                        </span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <span className='text-gray-400 font-bold'>•</span>
                        <span>
                          Delivered firmware for NFC energy-harvesting smart
                          locks
                        </span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <span className='text-gray-400 font-bold'>•</span>
                        <span>
                          Directed a 6-person team building internal and
                          customer tools
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action buttons - moved inside social container */}
              <motion.div
                className={`flex gap-3 ${showBorders ? 'border-4 border-green-500' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <a
                  href='#experience'
                  onClick={e => {
                    e.preventDefault()
                    const element = document.getElementById('experience')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`flex-1 h-10 px-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium rounded-bl-lg hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 pointer-events-auto text-center flex items-center justify-center ${showBorders ? 'border-4 border-blue-500' : ''}`}
                >
                  View Experience
                </a>
                <a
                  href='#contact'
                  className={`flex-1 h-10 px-4 border border-cyan-400/50 text-cyan-400 font-medium rounded-br-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 pointer-events-auto text-center flex items-center justify-center ${showBorders ? 'border-4 border-purple-500' : ''}`}
                >
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Controls */}
      <div
        className={`fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 pointer-events-auto ${showBorders ? 'border-4 border-pink-500' : ''}`}
      >
        <div
          className={`space-y-4 ${showBorders ? 'border-4 border-teal-500' : ''}`}
        >
          {/* Layer Spacing Control */}
          <div className={showBorders ? 'border-4 border-red-400' : ''}>
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
          <div className={showBorders ? 'border-4 border-lime-400' : ''}>
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
          <div className={showBorders ? 'border-4 border-cyan-400' : ''}>
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

          {/* Border Toggle */}
          <div
            className={`pt-2 border-t border-gray-600 ${showBorders ? 'border-4 border-purple-400' : ''}`}
          >
            <label className='flex items-center gap-2 text-white text-sm cursor-pointer'>
              <input
                type='checkbox'
                checked={showBorders}
                onChange={e => setShowBorders(e.target.checked)}
                className='w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2'
              />
              Show Layout Borders
            </label>
          </div>
        </div>
      </div>

      {/* Background grid effect */}
      <div
        className={`absolute inset-0 opacity-5 ${showBorders ? 'border-4 border-yellow-500' : ''}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  )
}
