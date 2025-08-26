import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'
import InteractiveElements from './InteractiveElements'

interface LandingPageProps {
  onNextSection?: () => void
}

export default function LandingPage({ onNextSection }: LandingPageProps) {
  const [layerDistance, setLayerDistance] = useState(3.6)
  const [positionShift, setPositionShift] = useState(0)
  const [verticalShift, setVerticalShift] = useState(0)
  const [showBorders, setShowBorders] = useState(false)
  const [rotationX, setRotationX] = useState(-8)
  const [rotationY, setRotationY] = useState(-3)
  const [rotationZ, setRotationZ] = useState(0)
  const [positionX, setPositionX] = useState(-1.4)
  const [positionY, setPositionY] = useState(1)
  const [positionZ, setPositionZ] = useState(-16.5)
  const [showBoundingBox, setShowBoundingBox] = useState(false)
  const [togglesMinimized, setTogglesMinimized] = useState(true)
  const [overlayOffsetX] = useState(-7)
  const [overlayOffsetY] = useState(-3.5)
  const [showOverlayText, setShowOverlayText] = useState(false)
  const [showOriginMarker, setShowOriginMarker] = useState(false)
  const [nameTagOffsetX] = useState(-15)

  // Helper functions for number input controls
  const incrementValue = (
    setter: (value: number) => void,
    current: number,
    step: number = 0.1
  ) => {
    setter(Math.round((current + step) * 10) / 10)
  }

  const decrementValue = (
    setter: (value: number) => void,
    current: number,
    step: number = 0.1
  ) => {
    setter(Math.round((current - step) * 10) / 10)
  }

  const handleNumberInput = (
    setter: (value: number) => void,
    value: string
  ) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setter(num)
    }
  }

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
              {/* Enhanced colored name text with separate gradients */}
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
                    filter: 'drop-shadow(0 4px 8px rgba(176, 106, 247, 0.3))',
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
                    filter: 'drop-shadow(0 4px 8px rgba(106, 213, 255, 0.3))',
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

      {/* Enhanced Debug Toggles - Improved styling */}
      <div
        className={`fixed top-6 left-6 z-50 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 pointer-events-auto transition-all duration-300 shadow-2xl ${showBorders ? 'border-4 border-cyan-500' : ''} ${
          togglesMinimized ? 'p-3' : 'p-5'
        }`}
      >
        <div className='space-y-3 text-white text-xs'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-bold text-cyan-400 tracking-wide'>
              Debug Controls
            </h3>
            <button
              onClick={() => setTogglesMinimized(!togglesMinimized)}
              className='text-cyan-400 hover:text-cyan-300 transition-colors p-1 rounded hover:bg-white/5'
            >
              {togglesMinimized ? '▶' : '◀'}
            </button>
          </div>

          {!togglesMinimized && (
            <div className='space-y-3 pt-3 border-t border-white/20'>
              {/* Position Display - Enhanced styling */}
              <div className='text-xs text-cyan-400 font-mono space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Position X:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionX, positionX, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionX}
                      onChange={e =>
                        handleNumberInput(setPositionX, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionX, positionX, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Position Y:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionY, positionY, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionY}
                      onChange={e =>
                        handleNumberInput(setPositionY, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionY, positionY, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Position Z:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionZ, positionZ, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionZ}
                      onChange={e =>
                        handleNumberInput(setPositionZ, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionZ, positionZ, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Rotation X:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationX, rotationX, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationX}
                      onChange={e =>
                        handleNumberInput(setRotationX, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationX, rotationX, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Rotation Y:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationY, rotationY, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationY}
                      onChange={e =>
                        handleNumberInput(setRotationY, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationY, rotationY, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Rotation Z:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationZ, rotationZ, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationZ}
                      onChange={e =>
                        handleNumberInput(setRotationZ, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationZ, rotationZ, 1)}
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Layer Distance:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setLayerDistance, layerDistance, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={layerDistance}
                      onChange={e =>
                        handleNumberInput(setLayerDistance, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setLayerDistance, layerDistance, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Pos Shift:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionShift, positionShift, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionShift}
                      onChange={e =>
                        handleNumberInput(setPositionShift, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionShift, positionShift, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-zinc-300'>Vert Shift:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setVerticalShift, verticalShift, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={verticalShift}
                      onChange={e =>
                        handleNumberInput(setVerticalShift, e.target.value)
                      }
                      className='w-14 h-5 bg-zinc-800 text-cyan-400 text-[10px] border border-zinc-700 rounded px-2 focus:outline-none focus:border-cyan-500'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setVerticalShift, verticalShift, 0.1)
                      }
                      className='w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className='border-t border-white/20 pt-3 space-y-3'>
                <label className='flex items-center gap-3 text-white text-xs cursor-pointer hover:bg-white/5 p-1 rounded transition-colors'>
                  <input
                    type='checkbox'
                    checked={showBorders}
                    onChange={e => setShowBorders(e.target.checked)}
                    className='w-3 h-3 text-cyan-500 bg-zinc-800 border-zinc-600 rounded focus:ring-cyan-500 focus:ring-2'
                  />
                  Show Layout Borders
                </label>
                <label className='flex items-center gap-3 text-white text-xs cursor-pointer hover:bg-white/5 p-1 rounded transition-colors'>
                  <input
                    type='checkbox'
                    checked={showBoundingBox}
                    onChange={e => setShowBoundingBox(e.target.checked)}
                    className='w-3 h-3 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500 focus:ring-2'
                  />
                  Show Bounding Box
                </label>
                <label className='flex items-center gap-3 text-white text-xs cursor-pointer hover:bg-white/5 p-1 rounded transition-colors'>
                  <input
                    type='checkbox'
                    checked={showOverlayText}
                    onChange={e => setShowOverlayText(e.target.checked)}
                    className='w-3 h-3 text-purple-500 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500 focus:ring-2'
                  />
                  Show Overlay Text
                </label>
                <label className='flex items-center gap-3 text-white text-xs cursor-pointer hover:bg-white/5 p-1 rounded transition-colors'>
                  <input
                    type='checkbox'
                    checked={showOriginMarker}
                    onChange={e => setShowOriginMarker(e.target.checked)}
                    className='w-3 h-3 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500 focus:ring-2'
                  />
                  Show Origin Marker
                </label>
              </div>
            </div>
          )}
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
