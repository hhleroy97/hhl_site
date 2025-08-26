import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'
import InteractiveElements from './InteractiveElements'

interface LandingPageProps {
  onNextSection?: () => void
}

export default function LandingPage({ onNextSection }: LandingPageProps) {
  const [layerDistance] = useState(3.6)
  const [positionShift] = useState(0)
  const [verticalShift] = useState(0)
  const [showBorders] = useState(false)
  const [rotationX] = useState(-8)
  const [rotationY] = useState(-3)
  const [rotationZ] = useState(0)
  const [positionX] = useState(-1.4)
  const [positionY] = useState(2)
  const [positionZ] = useState(-16.5)
  const [showBoundingBox] = useState(false)
  const [overlayOffsetX] = useState(-7)
  const [overlayOffsetY] = useState(-3.5)
  const [showOverlayText] = useState(false)
  const [showOriginMarker] = useState(false)
  const [nameTagOffsetX] = useState(-15)

  return (
    <section
      id='hero'
      className={`relative min-h-screen overflow-hidden flex justify-center ${showBorders ? 'border-4 border-white' : ''}`}
    >
      {/* Enhanced Background with subtle gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black' />

      {/* Main content container - Improved spacing and layout */}
      <div
        className={`relative z-20 pointer-events-none w-[85%] max-w-7xl pt-16 pb-8 overflow-visible ${showBorders ? 'border-4 border-cyan-500' : ''}`}
      >
        {/* Greeting and Name container - Enhanced spacing */}
        <div
          className={`text-left overflow-visible mb-8 ${showBorders ? 'border-4 border-emerald-500' : ''}`}
        >
          <div className='inline-block text-left'>
            {/* Greeting - Improved typography and spacing */}
            <motion.div
              className={`w-full text-left mb-6 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                easing: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className='text-3xl md:text-4xl text-zinc-300 font-semibold tracking-wide'>
                Hi, I'm ...
              </div>
            </motion.div>

            {/* Name section - Enhanced visual impact */}
            <motion.div
              className={`text-left relative inline-block overflow-visible ${showBorders ? 'border-4 border-purple-500' : ''}`}
              initial={{ opacity: 0, y: 30, x: 0 }}
              animate={{ opacity: 1, y: 0, x: nameTagOffsetX }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                x: { duration: 0.1 },
                easing: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Clean gradient name text */}
              <div className='font-black tracking-tighter relative z-50 text-left flex'>
                <span
                  style={{
                    lineHeight: '0.85',
                    fontSize: 'clamp(5.5rem, 10vw, 9rem)',
                    fontFamily: 'Orbitron, sans-serif',
                    letterSpacing: '-0.02em',
                    background:
                      'linear-gradient(18deg, #B06AF7 0%, #7BC6FF 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                  className='inline-block'
                >
                  <span style={{ fontSize: '1.1em' }}>H</span>
                  <span style={{ fontSize: '0.8em' }}>ARTLEY</span>
                </span>
                <span className='mr-4'></span>
                <span
                  style={{
                    lineHeight: '0.85',
                    fontSize: 'clamp(5.5rem, 10vw, 9rem)',
                    fontFamily: 'Orbitron, sans-serif',
                    letterSpacing: '-0.02em',
                    background:
                      'linear-gradient(18deg, #6AD5FF 0%, #28E1B1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                  className='inline-block'
                >
                  <span style={{ fontSize: '1.1em' }}>L</span>
                  <span style={{ fontSize: '0.8em' }}>E</span>
                  <span style={{ fontSize: '1.1em' }}>R</span>
                  <span style={{ fontSize: '0.8em' }}>OY</span>
                </span>
              </div>

              {/* Enhanced background color overlay text */}
              {showOverlayText && (
                <div
                  className='font-black tracking-tighter absolute pointer-events-none flex'
                  style={{
                    lineHeight: '0.85',
                    fontSize: 'clamp(5.5rem, 10vw, 9rem)',
                    fontFamily: 'Orbitron, sans-serif',
                    letterSpacing: '-0.02em',
                    color: 'rgb(24, 24, 27)',
                    zIndex: 100,
                    top: `${overlayOffsetY}px`,
                    left: `${overlayOffsetX}px`,
                  }}
                >
                  <span>
                    <span style={{ fontSize: '1.1em' }}>H</span>
                    <span style={{ fontSize: '0.8em' }}>ARTLEY</span>
                  </span>
                  <span className='mr-4'></span>
                  <span>
                    <span style={{ fontSize: '1.1em' }}>L</span>
                    <span style={{ fontSize: '0.8em' }}>E</span>
                    <span style={{ fontSize: '1.1em' }}>R</span>
                    <span style={{ fontSize: '0.8em' }}>OY</span>
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Role/Title - Harmonized colors */}
        <motion.div
          className={`text-left mb-12 ${showBorders ? 'border-4 border-purple-500' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            easing: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className='text-2xl md:text-3xl text-zinc-200 font-light leading-relaxed'>
            <span
              className='font-bold'
              style={{
                background: 'linear-gradient(18deg, #B06AF7 0%, #7BC6FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Cloud & Creative Engineer
            </span>
            <span className='text-zinc-400 mx-3'>—</span>
            <span className='text-zinc-300'>
              Crafting end-to-end systems from edge to interface.
            </span>
          </p>
        </motion.div>

        {/* Interactive Elements - Enhanced two column layout with better spacing */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 w-full gap-6 lg:gap-16 items-start ${showBorders ? 'border-4 border-orange-500' : ''}`}
        >
          <div className='w-full'>
            <InteractiveElements showBorders={showBorders} />
          </div>
          {/* Enhanced Neural Network Visualization */}
          <motion.div
            className={`w-full h-full pointer-events-auto ${showBorders ? 'border-4 border-lime-500' : ''}`}
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
        </div>
      </div>

      {/* Enhanced Background grid effect */}
      <div
        className={`absolute inset-0 opacity-5 ${showBorders ? 'border-4 border-yellow-500' : ''}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(176, 106, 247, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 106, 247, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Enhanced Scroll indicator at bottom */}
      <motion.div
        className='absolute bottom-8 z-[80] pointer-events-auto'
        style={{ left: 'calc(50% - 24px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          easing: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.button
          onClick={() => {
            if (onNextSection) {
              onNextSection()
            } else {
              const element = document.getElementById('experience')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }
          }}
          className='p-0 text-zinc-400 hover:text-purple-400 transition-colors duration-300 relative group'
          whileHover={{
            scale: 1.1,
            transition: {
              scale: {
                duration: 0.2,
              },
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Enhanced bottom glow effect */}
          <div className='absolute bottom-[-12rem] left-1/2 transform -translate-x-1/2 w-screen h-48 bg-purple-400/20 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none' />

          {/* Enhanced main arrow */}
          <motion.svg
            className='w-12 h-12 relative z-10'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            style={{ filter: 'none' }}
            initial={{ scale: 1.2 }}
            animate={{
              scale: [1.2, 1],
              transition: {
                duration: 0.8,
                times: [0, 1],
                ease: 'easeInOut',
                delay: 1.5,
              },
            }}
          >
            <motion.path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={6}
              initial={{ d: 'M2 10l10 7 10-7' }}
              animate={{
                d: ['M2 10l10 7 10-7', 'M4 12l8 6 8-6'],
                strokeWidth: [6, 3],
                transition: {
                  duration: 0.8,
                  times: [0, 1],
                  ease: 'easeInOut',
                  delay: 1.5,
                },
              }}
            />
          </motion.svg>

          {/* Enhanced small arrow variations */}
          <svg
            className='w-10 h-10 absolute bottom-3 left-1/2 transform -translate-x-1/2 z-5 opacity-0 group-hover:opacity-60 transition-all duration-300 delay-100 group-hover:-translate-y-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeWidth={2}
              d='M4 12l8 6 8-6'
            />
          </svg>

          <svg
            className='w-8 h-8 absolute bottom-5 left-1/2 transform -translate-x-1/2 z-5 opacity-0 group-hover:opacity-40 transition-all duration-300 delay-200 group-hover:-translate-y-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeWidth={1.5}
              d='M4 12l8 6 8-6'
            />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}
