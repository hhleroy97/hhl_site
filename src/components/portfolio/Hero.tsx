import { motion } from 'framer-motion'
import { useState } from 'react'
import SimpleGrid from '@components/3d/SimpleGrid'
import DataflowRibbons from '@components/3d/DataflowRibbons'
import DataPipeline from '@components/3d/DataPipeline'
import PerformanceDisplay from '@components/ui/PerformanceDisplay'

export default function Hero() {
  const [currentVisualization, setCurrentVisualization] = useState<'grid' | 'ribbons' | 'pipeline'>('pipeline')
  const [performance, setPerformance] = useState<'low' | 'medium' | 'high'>('medium')
  const [autoRotate, setAutoRotate] = useState(false)

  return (
    <section
      className='relative pt-20 pb-16 px-6 lg:px-8 min-h-screen flex items-center'
      aria-label='Introduction and hero section'
    >
      {/* 3D Background - Full container */}
      <div className='absolute inset-0 pointer-events-auto'>
        {/* Control panel */}
        <div className='absolute top-24 right-6 z-20 flex flex-col gap-2'>
          {/* Visualization selector */}
          <select
            value={currentVisualization}
            onChange={(e) => setCurrentVisualization(e.target.value as 'grid' | 'ribbons' | 'pipeline')}
            className='px-3 py-1 text-xs bg-tech-dark/90 border border-tech-teal/40 text-tech-teal rounded hover:bg-tech-teal/20 transition-all backdrop-blur-sm'
          >
            <option value='pipeline'>Data Pipeline</option>
            <option value='grid'>Grid</option>
            <option value='ribbons'>PCB Traces</option>
          </select>

          {/* Performance selector - only show for ribbons */}
          {currentVisualization === 'ribbons' && (
            <div className='flex flex-col gap-1'>
              <select
                value={performance}
                onChange={(e) => setPerformance(e.target.value as 'low' | 'medium' | 'high')}
                className='px-2 py-1 text-xs bg-tech-dark/90 border border-tech-teal/40 text-tech-teal rounded hover:bg-tech-teal/20 transition-all backdrop-blur-sm'
              >
                <option value='low'>Low Performance</option>
                <option value='medium'>Medium Performance</option>
                <option value='high'>High Performance</option>
              </select>
              
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-2 py-1 text-xs border rounded transition-all backdrop-blur-sm ${
                  autoRotate 
                    ? 'bg-tech-teal/20 border-tech-teal text-tech-teal' 
                    : 'bg-tech-dark/90 border-tech-teal/40 text-tech-teal hover:bg-tech-teal/20'
                }`}
              >
                {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
              </button>
            </div>
          )}
        </div>

        {/* 3D Visualizations */}
        {currentVisualization === 'grid' && <SimpleGrid />}
        {currentVisualization === 'ribbons' && (
          <DataflowRibbons 
            performance={performance}
            interactive={true}
            autoRotate={autoRotate}
          />
        )}
        {currentVisualization === 'pipeline' && (
          <DataPipeline interactive={true} />
        )}
      </div>

      {/* Performance Display */}
      <PerformanceDisplay showDetails={true} />

      <div className='relative max-w-7xl mx-auto z-10 pointer-events-none'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-8 z-10 pointer-events-auto bg-tech-dark/30 backdrop-blur-sm rounded-2xl p-8 border border-tech-teal/10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Impact Statement */}
            <div className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-tech-text-primary leading-tight mb-4'>
                  Creative Technologist{' '}
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    & AI Engineer
                  </span>
                </h1>
                <p className='text-xl text-tech-text-secondary font-medium leading-relaxed'>
                  I architect intelligent systems that bridge AI, robotics, and
                  data engineering. Currently building autonomous drone fleets
                  with real-time ML pipelines at Lucid Bots.
                </p>
              </motion.div>

              <motion.div
                className='flex items-center space-x-4 text-tech-text-muted'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className='font-medium'>Hartley H. Leroy</span>
                <span className='w-2 h-2 bg-tech-teal rounded-full'></span>
                <span>Charlotte, NC</span>
                <span className='w-2 h-2 bg-tech-cyan rounded-full'></span>
                <span>Available for Opportunities</span>
              </motion.div>
            </div>

            {/* Key Achievements */}
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-teal/20'>
                <div className='text-2xl font-bold text-tech-teal'>$500K</div>
                <div className='text-sm text-tech-text-muted'>
                  AWS Infrastructure
                </div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-cyan/20'>
                <div className='text-2xl font-bold text-tech-cyan'>ROS2</div>
                <div className='text-sm text-tech-text-muted'>
                  Drone Systems
                </div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-purple/20'>
                <div className='text-2xl font-bold text-tech-purple'>AI/ML</div>
                <div className='text-sm text-tech-text-muted'>Pipelines</div>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 pt-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='#experience'
                className='px-8 py-4 rounded-lg bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-bold text-center transition-all hover:shadow-lg hover:shadow-tech-teal/25'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Impact
              </motion.a>
              <motion.a
                href='#contact'
                className='px-8 py-4 rounded-lg border border-tech-teal text-tech-teal font-semibold text-center hover:bg-tech-teal hover:text-tech-dark transition-all group'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Build Together
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Empty space for background interaction */}
          <div className='hidden lg:block'></div>
        </div>
      </div>
    </section>
  )
}
