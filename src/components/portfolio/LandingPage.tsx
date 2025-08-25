import { motion } from 'framer-motion'
import { useState } from 'react'
import DataPipeline from '../3d/DataPipeline'
import InteractiveElements from './InteractiveElements'

export default function LandingPage() {
  const [layerDistance] = useState(3.6)
  const [positionShift, setPositionShift] = useState(0)
  const [verticalShift, setVerticalShift] = useState(0)
  const [showBorders, setShowBorders] = useState(false)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [positionZ, setPositionZ] = useState(-10)
  const [showBoundingBox, setShowBoundingBox] = useState(false)
  const [controlsMinimized, setControlsMinimized] = useState(true)
  const [overlayOffsetX, setOverlayOffsetX] = useState(-7)
  const [overlayOffsetY, setOverlayOffsetY] = useState(-3.5)
  const [showOverlayText, setShowOverlayText] = useState(false)
  const [showOriginMarker, setShowOriginMarker] = useState(true)
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
          className={`text-center overflow-visible ${showBorders ? 'border-4 border-emerald-500' : ''}`}
        >
          <div className='inline-block text-left'>
            {/* Greeting */}
            <motion.div
              className={`w-full text-left mb-0 ${showBorders ? 'border-4 border-indigo-500' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <div className='text-2xl md:text-3xl text-zinc-400 font-bold'>
                Hi, I'm...
              </div>
            </motion.div>

            {/* Name section */}
            <motion.div
              className={`text-left relative inline-block overflow-visible ${showBorders ? 'border-4 border-purple-500' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
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
          className={`text-2xl md:text-3xl text-zinc-300 font-light text-center mb-8 ${showBorders ? 'border-4 border-blue-500' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className='font-bold'>Cloud & Creative Engineer</span> —
          Crafting end-to-end systems from edge to interface.
        </motion.p>

        {/* Interactive Elements - Two Column Layout */}
        <div
          className={`grid grid-cols-2 w-full ${showBorders ? 'border-4 border-orange-500' : ''}`}
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
              onOffsetChange={(x, y, z) => {
                setPositionX(prev => prev + x)
                setPositionY(prev => prev + y)
                setPositionZ(prev => prev + z)
              }}
              onRotationChange={(x, y, z) => {
                setRotationX(prev => prev + x)
                setRotationY(prev => prev + y)
                setRotationZ(prev => prev + z)
              }}
              showBoundingBox={showBoundingBox}
              showOriginMarker={showOriginMarker}
            />
          </motion.div>
        </div>
      </div>

      {/* Neural Network Transform Control - Top Left */}
      <div
        className={`fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg pointer-events-auto transition-all duration-300 ${showBorders ? 'border-4 border-cyan-500' : ''} ${
          controlsMinimized ? 'p-2' : 'p-4 max-w-xs'
        }`}
      >
        <div
          className={`space-y-4 text-white text-xs ${controlsMinimized ? 'space-y-2' : ''}`}
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-bold text-cyan-400'>
              Neural Network Controls
            </h3>
            <button
              onClick={() => setControlsMinimized(!controlsMinimized)}
              className='text-gray-400 hover:text-white transition-colors'
              title={
                controlsMinimized ? 'Expand controls' : 'Minimize controls'
              }
            >
              {controlsMinimized ? '⬆️' : '⬇️'}
            </button>
          </div>

          {!controlsMinimized && (
            <>
              {/* Drag Instructions */}
              <div className='bg-gray-800/50 rounded p-2 text-[10px] text-gray-400'>
                <div className='flex items-center gap-1'>
                  <span className='text-cyan-400'>🖱️</span>
                  <span>Left-click drag: Move position</span>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-orange-400'>🖱️</span>
                  <span>Middle-click drag: Rotate</span>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-yellow-400'>⇧+🖱️</span>
                  <span>Shift+drag: Also rotate</span>
                </div>
              </div>

              {/* Current Transform Display */}
              <div className='bg-gray-900/50 rounded p-3 space-y-2'>
                <h4 className='text-xs font-semibold text-gray-300 text-center'>
                  Current Transform
                </h4>
                <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]'>
                  <div className='text-red-400'>
                    Pos X: {positionX.toFixed(2)}
                  </div>
                  <div className='text-red-400'>
                    Rot X: {rotationX.toFixed(2)}°
                  </div>
                  <div className='text-green-400'>
                    Pos Y: {positionY.toFixed(2)}
                  </div>
                  <div className='text-green-400'>
                    Rot Y: {rotationY.toFixed(2)}°
                  </div>
                  <div className='text-blue-400'>
                    Pos Z: {positionZ.toFixed(2)}
                  </div>
                  <div className='text-blue-400'>
                    Rot Z: {rotationZ.toFixed(2)}°
                  </div>
                </div>
                <div className='pt-1 border-t border-gray-600 space-y-1'>
                  <div className='text-fuchsia-400 text-center'>
                    Shift: {positionShift.toFixed(2)}
                  </div>
                  <div className='text-emerald-400 text-center'>
                    Vertical: {verticalShift.toFixed(2)}
                  </div>
                  <div className='text-orange-400 text-center'>
                    Overlay X: {overlayOffsetX.toFixed(1)}
                  </div>
                  <div className='text-pink-400 text-center'>
                    Overlay Y: {overlayOffsetY.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Position Controls */}
              <div className='space-y-2'>
                <h4 className='text-xs font-semibold text-gray-300'>
                  Position
                </h4>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-red-400 w-4'>X:</label>
                  <input
                    type='range'
                    min='-20'
                    max='20'
                    step='0.01'
                    value={positionX}
                    onChange={e => setPositionX(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {positionX.toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-green-400 w-4'>Y:</label>
                  <input
                    type='range'
                    min='-20'
                    max='20'
                    step='0.01'
                    value={positionY}
                    onChange={e => setPositionY(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {positionY.toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-blue-400 w-4'>Z:</label>
                  <input
                    type='range'
                    min='-20'
                    max='20'
                    step='0.01'
                    value={positionZ}
                    onChange={e => setPositionZ(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {positionZ.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Rotation Controls */}
              <div className='space-y-2'>
                <h4 className='text-xs font-semibold text-gray-300'>
                  Rotation
                </h4>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-red-400 w-4'>X:</label>
                  <input
                    type='range'
                    min='-180'
                    max='180'
                    step='0.1'
                    value={rotationX}
                    onChange={e => setRotationX(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {rotationX.toFixed(2)}°
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-green-400 w-4'>Y:</label>
                  <input
                    type='range'
                    min='-180'
                    max='180'
                    step='0.1'
                    value={rotationY}
                    onChange={e => setRotationY(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {rotationY.toFixed(2)}°
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-blue-400 w-4'>Z:</label>
                  <input
                    type='range'
                    min='-180'
                    max='180'
                    step='0.1'
                    value={rotationZ}
                    onChange={e => setRotationZ(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {rotationZ.toFixed(2)}°
                  </span>
                </div>
              </div>

              {/* Overlay Text Offset Controls */}
              <div className='space-y-2'>
                <h4 className='text-xs font-semibold text-gray-300'>
                  Overlay Text Offset
                </h4>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-orange-400 w-4'>X:</label>
                  <input
                    type='range'
                    min='-50'
                    max='50'
                    step='0.5'
                    value={overlayOffsetX}
                    onChange={e => setOverlayOffsetX(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {overlayOffsetX.toFixed(1)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-pink-400 w-4'>Y:</label>
                  <input
                    type='range'
                    min='-50'
                    max='50'
                    step='0.5'
                    value={overlayOffsetY}
                    onChange={e => setOverlayOffsetY(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {overlayOffsetY.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Camera Reference Controls */}
              <div className='space-y-2'>
                <h4 className='text-xs font-semibold text-gray-300'>
                  Camera Reference
                </h4>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-fuchsia-400 w-4'>S:</label>
                  <input
                    type='range'
                    min='-20'
                    max='20'
                    step='0.01'
                    value={positionShift}
                    onChange={e => setPositionShift(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {positionShift.toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <label className='text-xs text-emerald-400 w-4'>V:</label>
                  <input
                    type='range'
                    min='-10'
                    max='10'
                    step='0.01'
                    value={verticalShift}
                    onChange={e => setVerticalShift(Number(e.target.value))}
                    className='flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <span className='text-xs text-gray-400 w-8 text-right'>
                    {verticalShift.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-2 pt-2'>
                <button
                  onClick={() => {
                    setPositionX(0)
                    setPositionY(0)
                    setPositionZ(-10)
                    setRotationX(0)
                    setRotationY(0)
                    setRotationZ(0)
                    setPositionShift(0)
                    setVerticalShift(0)
                    setOverlayOffsetX(-7)
                    setOverlayOffsetY(-3.5)
                  }}
                  className='flex-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors'
                >
                  Reset All
                </button>
                <button
                  onClick={() => {
                    console.log('Current Neural Network Transform:')
                    console.log(
                      `Position: X=${positionX}, Y=${positionY}, Z=${positionZ}`
                    )
                    console.log(
                      `Rotation: X=${rotationX}°, Y=${rotationY}°, Z=${rotationZ}°`
                    )
                    console.log(
                      `Camera: Shift=${positionShift}, Vertical=${verticalShift}`
                    )
                    alert(
                      `Transform logged to console!\nPos: (${positionX}, ${positionY}, ${positionZ})\nRot: (${rotationX}°, ${rotationY}°, ${rotationZ}°)`
                    )
                  }}
                  className='flex-1 px-2 py-1 text-xs bg-cyan-700 hover:bg-cyan-600 text-white rounded transition-colors'
                >
                  Log Values
                </button>
              </div>
            </>
          )}

          {/* Always visible toggles */}
          <div className='space-y-2 pt-2 border-t border-gray-600'>
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
        className='absolute bottom-16 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-auto'
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
