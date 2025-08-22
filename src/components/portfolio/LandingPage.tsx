import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'

export default function LandingPage() {
  const [layerDistance, setLayerDistance] = useState(3.6)
  const [positionShift, setPositionShift] = useState(-12.5)
  const [verticalShift, setVerticalShift] = useState(0)
  return (
    <section id='hero' className='relative min-h-screen py-24 overflow-hidden'>
      {/* Interactive Data Pipeline Visualization - Main Layer */}
      <div className='absolute inset-0 z-10'>
        <motion.div
          className='w-full h-full'
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

      {/* Full-width header section */}
      <div className='relative z-20 pointer-events-none w-full pt-20'>
        <div className='w-full pl-8 md:pl-16 lg:pl-24 pr-4 md:pr-8'>
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name - Full Width */}
            <motion.h1
              className='text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className='bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                Hartley LeRoy
              </span>
            </motion.h1>

            {/* Role/Title - Full Width */}
            <motion.p
              className='text-xl md:text-2xl text-zinc-300 font-light w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Cloud & Creative Engineer — crafting end-to-end systems from edge
              to interface.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content section - vertical layout */}
      <div className='relative z-20 pointer-events-none mt-12 pl-8 md:pl-16 lg:pl-24 pr-4 md:pr-8'>
        <motion.div
          className='space-y-8 max-w-4xl'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Main tagline */}
          <motion.h2
            className='text-2xl md:text-3xl font-light text-white leading-relaxed max-w-3xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Turning data into{' '}
            <span className='text-cyan-400 font-bold'>art</span>,{' '}
            <span className='text-fuchsia-400 font-bold'>insights</span>, and{' '}
            <span className='text-emerald-400 font-bold'>autonomy</span>
            .
            <br />
            Bridging <span className='font-bold'>infrastructure</span> and{' '}
            <span className='font-bold'>imagination</span>.
          </motion.h2>

          {/* Status and contact info */}
          <motion.div
            className='flex flex-wrap items-center gap-6 text-sm text-zinc-400'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
              <span>Charlotte, NC</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300' />
              <span>Open to work</span>
            </div>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='text-zinc-400 hover:text-cyan-400 transition-colors'
                aria-label='GitHub profile'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
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
                className='text-zinc-400 hover:text-cyan-400 transition-colors'
                aria-label='LinkedIn profile'
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
                className='text-zinc-400 hover:text-cyan-400 transition-colors'
                aria-label='Email contact'
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
                    strokeWidth={2}
                    d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className='flex flex-wrap gap-4 pt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 pointer-events-auto'
              onError={e => {
                const target = e.target as HTMLAnchorElement
                target.href = '/docs/Hartley_LeRoy_Resume_Aug25.docx'
              }}
            >
              View Resume
            </a>
            <a
              href='#contact'
              className='px-8 py-3 border border-cyan-400/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 pointer-events-auto'
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Controls */}
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

      {/* Background grid effect */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  )
}
