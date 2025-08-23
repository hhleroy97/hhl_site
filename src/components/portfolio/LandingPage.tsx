import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'
import InteractiveElements from './InteractiveElements'

export default function LandingPage() {
  const [layerDistance, setLayerDistance] = useState(3.6)
  const [positionShift, setPositionShift] = useState(-12.5)
  const [verticalShift, setVerticalShift] = useState(0)
  const [showBorders, setShowBorders] = useState(false)

  // Neural network positioning and rotation controls
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [positionZ, setPositionZ] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)
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
            positionX={positionX}
            positionY={positionY}
            positionZ={positionZ}
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
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
                  className={`text-2xl md:text-3xl text-zinc-400 font-bold text-left mb-2 ml-0 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
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

            {/* Interactive Elements */}
            <InteractiveElements showBorders={showBorders} />
          </div>
        </div>
      </div>

      {/* Top-right Controls */}
      <div
        className={`fixed top-16 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 pointer-events-auto ${showBorders ? 'border-4 border-pink-500' : ''}`}
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

      {/* Neural Network Controls - Bottom Right */}
      <div
        className={`fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 pointer-events-auto ${showBorders ? 'border-4 border-green-500' : ''}`}
      >
        <div className='space-y-3 text-white text-xs'>
          <h3 className='text-sm font-bold text-cyan-400 mb-3'>
            Neural Network Controls
          </h3>

          {/* Position Controls */}
          <div className='space-y-2'>
            <h4 className='text-xs font-semibold text-gray-300'>Position</h4>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-red-400'>X:</label>
                <input
                  type='range'
                  min='-20'
                  max='20'
                  step='0.1'
                  value={positionX}
                  onChange={e => setPositionX(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {positionX.toFixed(1)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-green-400'>Y:</label>
                <input
                  type='range'
                  min='-20'
                  max='20'
                  step='0.1'
                  value={positionY}
                  onChange={e => setPositionY(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {positionY.toFixed(1)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-blue-400'>Z:</label>
                <input
                  type='range'
                  min='-20'
                  max='20'
                  step='0.1'
                  value={positionZ}
                  onChange={e => setPositionZ(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {positionZ.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Rotation Controls */}
          <div className='space-y-2'>
            <h4 className='text-xs font-semibold text-gray-300'>Rotation</h4>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-red-400'>X:</label>
                <input
                  type='range'
                  min='-180'
                  max='180'
                  step='1'
                  value={rotationX}
                  onChange={e => setRotationX(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>{rotationX}°</span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-green-400'>Y:</label>
                <input
                  type='range'
                  min='-180'
                  max='180'
                  step='1'
                  value={rotationY}
                  onChange={e => setRotationY(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>{rotationY}°</span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-4 text-blue-400'>Z:</label>
                <input
                  type='range'
                  min='-180'
                  max='180'
                  step='1'
                  value={rotationZ}
                  onChange={e => setRotationZ(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>{rotationZ}°</span>
              </div>
            </div>
          </div>

          {/* Layer Controls */}
          <div className='space-y-2 pt-2 border-t border-gray-600'>
            <h4 className='text-xs font-semibold text-gray-300'>
              Layer Settings
            </h4>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <label className='w-12 text-xs text-cyan-400'>Spacing:</label>
                <input
                  type='range'
                  min='0.5'
                  max='25'
                  step='0.1'
                  value={layerDistance}
                  onChange={e => setLayerDistance(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {layerDistance.toFixed(1)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-12 text-xs text-fuchsia-400'>Shift:</label>
                <input
                  type='range'
                  min='-15'
                  max='15'
                  step='0.1'
                  value={positionShift}
                  onChange={e => setPositionShift(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {positionShift.toFixed(1)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <label className='w-12 text-xs text-emerald-400'>
                  Vertical:
                </label>
                <input
                  type='range'
                  min='-10'
                  max='10'
                  step='0.1'
                  value={verticalShift}
                  onChange={e => setVerticalShift(Number(e.target.value))}
                  className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
                <span className='w-8 text-xs text-gray-400'>
                  {verticalShift.toFixed(1)}
                </span>
              </div>
            </div>
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

      {/* Scroll indicator at bottom */}
      <motion.div
        className='absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 pointer-events-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={() => {
            const element = document.getElementById('experience')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className='p-3 text-zinc-400 hover:text-cyan-400 transition-colors duration-300'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className='w-8 h-8'
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
              strokeWidth={4}
              initial={{ d: 'M5 10l7 7 7-7' }}
              animate={{
                d: ['M5 10l7 7 7-7', 'M6 12l6 6 6-6'],
                strokeWidth: [4, 2],
                transition: {
                  duration: 0.8,
                  times: [0, 1],
                  ease: 'easeInOut',
                  delay: 1.5,
                },
              }}
            />
          </motion.svg>
        </motion.button>
      </motion.div>
    </section>
  )
}
