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
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)
  const [positionX, setPositionX] = useState(-1.6)
  const [positionY, setPositionY] = useState(0)
  const [positionZ, setPositionZ] = useState(-10)
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
      className={`relative min-h-screen py-12 overflow-hidden flex justify-center ${showBorders ? 'border-4 border-white' : ''}`}
    >
      {/* Main content container - 80% width */}
      <div
        className={`relative z-20 pointer-events-none w-[80%] pt-8 overflow-visible ${showBorders ? 'border-4 border-cyan-500' : ''}`}
      >
        {/* Greeting and Name container */}
        <div
          className={`text-left overflow-visible ${showBorders ? 'border-4 border-emerald-500' : ''}`}
        >
          <div className='inline-block text-left'>
            {/* Greeting */}
            <motion.div
              className={`w-full text-left mb-0 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <div className='text-2xl md:text-3xl text-zinc-200 font-bold'>
                Hi, I'm ...
              </div>
            </motion.div>

            {/* Name section */}
            <motion.div
              className={`text-left relative inline-block overflow-visible ${showBorders ? 'border-4 border-purple-500' : ''}`}
              initial={{ opacity: 0, y: 30, x: 0 }}
              animate={{ opacity: 1, y: 0, x: nameTagOffsetX }}
              transition={{ delay: 0.2, duration: 0.8, x: { duration: 0.1 } }}
            >
              {/* Colored name text */}
              <div
                className='font-bold tracking-tight relative z-50 text-left'
                style={{
                  lineHeight: '1',
                  fontSize: 'clamp(7.5rem, 15vw, 12.5rem)',
                  background:
                    'linear-gradient(90deg, #d946ef 0%, #22d3ee 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                <span>
                  <span style={{ fontSize: '1.1em' }}>H</span>
                  <span style={{ fontSize: '0.8em' }}>ARTLEY</span>
                </span>{' '}
                <span>
                  <span style={{ fontSize: '1.1em' }}>L</span>
                  <span style={{ fontSize: '0.8em' }}>E</span>
                  <span style={{ fontSize: '1.1em' }}>R</span>
                  <span style={{ fontSize: '0.8em' }}>OY</span>
                </span>
              </div>

              {/* Background color overlay text */}
              {showOverlayText && (
                <div
                  className='font-bold tracking-tight absolute pointer-events-none'
                  style={{
                    lineHeight: '1',
                    fontSize: 'clamp(7.5rem, 15vw, 12.5rem)',
                    color: 'rgb(24, 24, 27)',
                    zIndex: 100,
                    top: `${overlayOffsetY}px`,
                    left: `${overlayOffsetX}px`,
                  }}
                >
                  <span>
                    <span style={{ fontSize: '1.1em' }}>H</span>
                    <span style={{ fontSize: '0.8em' }}>ARTLEY</span>
                  </span>{' '}
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

        {/* Role/Title - Above Interactive Elements */}
        <motion.p
          className={`text-2xl md:text-3xl text-zinc-200 font-light text-left mb-8 ${showBorders ? 'border-4 border-blue-500' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className='font-bold'>Cloud & Creative Engineer</span> —
          Crafting end-to-end systems from edge to interface.
        </motion.p>

        {/* Interactive Elements - Two Column Layout */}
        <div
          className={`grid grid-cols-2 w-full gap-16 ${showBorders ? 'border-4 border-orange-500' : ''}`}
        >
          <div className='w-full h-full'>
            <InteractiveElements showBorders={showBorders} />
          </div>
          {/* Neural Network Visualization */}
          <motion.div
            className={`w-full h-full pointer-events-auto ${showBorders ? 'border-4 border-lime-500' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
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

      {/* Debug Toggles - Top Left */}
      <div
        className={`fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg pointer-events-auto transition-all duration-300 ${showBorders ? 'border-4 border-cyan-500' : ''} ${
          togglesMinimized ? 'p-2' : 'p-4'
        }`}
      >
        <div className='space-y-2 text-white text-xs'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-bold text-cyan-400'>Debug Controls</h3>
            <button
              onClick={() => setTogglesMinimized(!togglesMinimized)}
              className='text-cyan-400 hover:text-cyan-300 transition-colors'
            >
              {togglesMinimized ? '▶' : '◀'}
            </button>
          </div>

          {!togglesMinimized && (
            <div className='space-y-2 pt-2 border-t border-gray-600'>
              {/* Position Display */}
              <div className='text-xs text-cyan-400 font-mono space-y-2'>
                <div className='flex items-center justify-between'>
                  <span>Position X:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionX, positionX, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionX}
                      onChange={e =>
                        handleNumberInput(setPositionX, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionX, positionX, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Position Y:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionY, positionY, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionY}
                      onChange={e =>
                        handleNumberInput(setPositionY, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionY, positionY, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Position Z:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionZ, positionZ, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionZ}
                      onChange={e =>
                        handleNumberInput(setPositionZ, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionZ, positionZ, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Rotation X:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationX, rotationX, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationX}
                      onChange={e =>
                        handleNumberInput(setRotationX, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationX, rotationX, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Rotation Y:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationY, rotationY, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationY}
                      onChange={e =>
                        handleNumberInput(setRotationY, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationY, rotationY, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Rotation Z:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => decrementValue(setRotationZ, rotationZ, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={rotationZ}
                      onChange={e =>
                        handleNumberInput(setRotationZ, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='1'
                    />
                    <button
                      onClick={() => incrementValue(setRotationZ, rotationZ, 1)}
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Layer Distance:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setLayerDistance, layerDistance, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={layerDistance}
                      onChange={e =>
                        handleNumberInput(setLayerDistance, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setLayerDistance, layerDistance, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Pos Shift:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setPositionShift, positionShift, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={positionShift}
                      onChange={e =>
                        handleNumberInput(setPositionShift, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setPositionShift, positionShift, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Vert Shift:</span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() =>
                        decrementValue(setVerticalShift, verticalShift, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={verticalShift}
                      onChange={e =>
                        handleNumberInput(setVerticalShift, e.target.value)
                      }
                      className='w-12 h-4 bg-gray-700 text-cyan-400 text-[10px] border border-gray-600 rounded px-1'
                      step='0.1'
                    />
                    <button
                      onClick={() =>
                        incrementValue(setVerticalShift, verticalShift, 0.1)
                      }
                      className='w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded text-[10px]'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className='border-t border-gray-600 pt-2 space-y-2'>
                <label className='flex items-center gap-2 text-white text-xs cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={showBorders}
                    onChange={e => setShowBorders(e.target.checked)}
                    className='w-3 h-3 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2'
                  />
                  Show Layout Borders
                </label>
                <label className='flex items-center gap-2 text-white text-xs cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={showBoundingBox}
                    onChange={e => setShowBoundingBox(e.target.checked)}
                    className='w-3 h-3 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2'
                  />
                  Show Bounding Box
                </label>
                <label className='flex items-center gap-2 text-white text-xs cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={showOverlayText}
                    onChange={e => setShowOverlayText(e.target.checked)}
                    className='w-3 h-3 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2'
                  />
                  Show Overlay Text
                </label>
                <label className='flex items-center gap-2 text-white text-xs cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={showOriginMarker}
                    onChange={e => setShowOriginMarker(e.target.checked)}
                    className='w-3 h-3 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2'
                  />
                  Show Origin Marker
                </label>
              </div>
            </div>
          )}
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

      {/* Scroll indicator at bottom */}
      <motion.div
        className='absolute bottom-4 z-[80] pointer-events-auto'
        style={{ left: 'calc(50% - 24px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
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
          className='p-0 text-zinc-400 hover:text-cyan-400 transition-colors duration-300 relative group'
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
          {/* Bottom glow effect */}
          <div className='absolute bottom-[-12rem] left-1/2 transform -translate-x-1/2 w-screen h-48 bg-cyan-400/20 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none' />

          {/* Main arrow */}
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

          {/* Small arrow variations that pop out on hover */}
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
