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
      className={`relative min-h-screen overflow-hidden flex flex-col justify-between ${showBorders ? 'border-4 border-white' : ''}`}
    >
      {/* Enhanced Background with subtle gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black' />

      {/* Top content container */}
      <div
        className={`relative z-20 pointer-events-none w-[95%] sm:w-[90%] md:w-[85%] max-w-7xl mx-auto pt-2 sm:pt-3 md:pt-4 overflow-visible ${showBorders ? 'border-4 border-cyan-500' : ''}`}
      >
        {/* Greeting and Name container - Enhanced spacing */}
        <div
          className={`text-left overflow-visible mb-2 sm:mb-3 md:mb-4 ${showBorders ? 'border-4 border-emerald-500' : ''}`}
        >
          <div className='inline-block text-left'>
            {/* Greeting - Improved typography and spacing */}
            <motion.div
              className={`w-full text-center sm:text-left mb-2 sm:mb-3 md:mb-4 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                easing: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 font-semibold tracking-wide'>
                Hi, I'm ...
              </div>
            </motion.div>

            {/* Name section - Enhanced visual impact */}
            <motion.div
              className={`text-center sm:text-left relative inline-block overflow-visible ${showBorders ? 'border-4 border-purple-500' : ''}`}
              initial={{ opacity: 0, y: 30, x: 0 }}
              animate={{ opacity: 1, y: 0, x: nameTagOffsetX }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                x: { duration: 0.1 },
                easing: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Clean gradient name text - responsive layout */}
              <div className='font-black tracking-tighter relative z-50 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start'>
                <span
                  style={{
                    lineHeight: '0.85',
                    fontSize: 'clamp(2.8rem, 7vw, 5rem)',
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
                <span className='mr-4 hidden sm:inline'></span>
                <span
                  style={{
                    lineHeight: '0.85',
                    fontSize: 'clamp(2.8rem, 7vw, 5rem)',
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
          className={`text-center sm:text-left mb-2 sm:mb-3 md:mb-4 ${showBorders ? 'border-4 border-purple-500' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            easing: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200 font-light leading-relaxed'>
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
      </div>

      {/* Center content container - Interactive elements and 3D visuals */}
      <div
        className={`relative z-20 pointer-events-none w-[95%] sm:w-[90%] md:w-[85%] max-w-7xl mx-auto flex-1 flex items-center justify-center overflow-visible -mt-2 sm:-mt-3 md:-mt-4 mb-4 sm:mb-6 md:mb-8 ${showBorders ? 'border-4 border-green-500' : ''}`}
      >
        {/* Interactive Elements - Enhanced two column layout with better spacing */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 w-full gap-4 sm:gap-6 lg:gap-16 items-center ${showBorders ? 'border-4 border-orange-500' : ''}`}
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

      {/* Enhanced Navigation Area at bottom */}
      <div className='fixed bottom-0 left-0 right-0 z-[80] flex flex-col items-center pointer-events-auto px-4 sm:px-6 md:px-8'>
        {/* Call-to-action text with side arrows */}
        <motion.div
          className='mb-4 text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            easing: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className='flex flex-col items-center gap-2 group'>
            {/* Main text */}
            <motion.button
              onClick={() => {
                if (onNextSection) {
                  // Use hash routing instead
                  window.location.hash = 'about'
                } else {
                  const element = document.getElementById('experience')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
              className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-zinc-500 hover:text-purple-400 px-2 sm:px-4 transition-colors duration-300 cursor-pointer uppercase relative group'
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {/* Enhanced bottom glow effect */}
              <div className='absolute bottom-[-8rem] left-1/2 transform -translate-x-1/2 w-screen h-32 bg-purple-400/30 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none' />
              <span
                style={{
                  fontSize: '2.2em',
                  verticalAlign: 'middle',
                  lineHeight: '1',
                }}
              >
                [
              </span>{' '}
              Continue to site{' '}
              <span
                style={{
                  fontSize: '2.2em',
                  verticalAlign: 'middle',
                  lineHeight: '1',
                }}
              >
                ]
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
