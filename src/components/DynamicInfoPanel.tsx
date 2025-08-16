import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ServiceItem {
  id: string
  type: 'service' | 'skill'
  title: string
  description: string
  technologies: string[]
  highlight: string
  icon?: string
}

interface DynamicInfoPanelProps {
  hoveredItem: ServiceItem | null
  className?: string
  style?: React.CSSProperties
}

const DynamicInfoPanel: React.FC<DynamicInfoPanelProps> = ({
  hoveredItem,
  className = '',
  style = {},
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [contentKey, setContentKey] = useState(0)
  const defaultContent: ServiceItem = {
    id: 'about',
    type: 'service',
    title: 'Welcome',
    description:
      'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. Hover over any service or skill to learn more.',
    technologies: ['Problem Solver', 'Team Player', 'Innovation Driver'],
    highlight: '5+ years building scalable tech solutions',
  }

  const content = hoveredItem || defaultContent

  // Track mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePosition({ x: x * 20, y: y * 20 }) // Subtle 20px max movement
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  // Update content key when content changes for smooth transitions
  useEffect(() => {
    setContentKey(prev => prev + 1)
  }, [content.id])

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex flex-col overflow-hidden ${className}`}
      style={{
        borderRadius: '2rem',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow:
          '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated parallax background grid */}
      <motion.div
        className='absolute inset-0 opacity-20 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          borderRadius: '2rem',
        }}
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      {/* Holographic overlay with parallax */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none'
        style={{ borderRadius: '2rem' }}
        animate={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      {/* Subtle glow that follows mouse */}
      <motion.div
        className='absolute w-32 h-32 bg-gradient-radial from-cyberpunk-blue/20 to-transparent rounded-full blur-xl pointer-events-none'
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.8,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      />

      <div className='relative z-10 h-full flex flex-col justify-between'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='space-y-4'
          >
            {/* Title with glow effect */}
            <motion.h3
              className='text-cyberpunk-pink font-cyber text-xl font-bold filter drop-shadow-[0_0_8px_currentColor]'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {content.title}
            </motion.h3>

            {/* Type badge */}
            <motion.div
              className='inline-block'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              <span
                className={`px-3 py-1 rounded-full text-xs font-cyber font-bold ${
                  content.type === 'service'
                    ? 'bg-cyberpunk-purple/20 text-cyberpunk-purple border border-cyberpunk-purple/40'
                    : 'bg-cyberpunk-blue/20 text-cyberpunk-blue border border-cyberpunk-blue/40'
                }`}
              >
                {content.type.toUpperCase()}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className='text-cyberpunk-neon/80 text-sm leading-relaxed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {content.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Middle Section */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`tech-${contentKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.25 }}
            className='space-y-4 flex-1 flex flex-col justify-center'
          >
            {/* Tech badges */}
            <div className='space-y-2'>
              <motion.h4
                className='text-cyberpunk-neon text-sm font-cyber font-bold'
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.25 }}
              >
                Technologies
              </motion.h4>
              <div className='flex flex-wrap gap-2'>
                {content.technologies.map((tech, i) => (
                  <motion.span
                    key={`${content.id}-${tech}-${i}`}
                    initial={{ opacity: 0, y: 15, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.05,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                      transition: { duration: 0.15 },
                    }}
                    className='px-3 py-1 bg-cyberpunk-neon/20 border border-cyberpunk-neon/40 rounded-lg text-cyberpunk-neon text-sm font-mono cursor-default'
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Section */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`achievement-${contentKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className='border-t border-cyberpunk-neon/30 pt-4'
          >
            <motion.h4
              className='text-cyberpunk-green text-sm font-cyber font-bold mb-2'
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.25 }}
            >
              Key Achievement
            </motion.h4>
            <div className='flex items-start space-x-2'>
              <motion.span
                className='text-cyberpunk-green text-lg'
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.3, ease: 'easeOut' }}
              >
                ▶
              </motion.span>
              <motion.span
                className='text-cyberpunk-green text-sm font-bold'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.3 }}
              >
                {content.highlight}
              </motion.span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DynamicInfoPanel
