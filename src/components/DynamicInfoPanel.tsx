import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cloudBadge from '../assets/cloud-badge.png'
import pythonBadge from '../assets/python-badge.png'
import databaseBadge from '../assets/database-badge.png'
import pipeBadge from '../assets/pipe-badge.png'
import robotBadge from '../assets/robot-badge.png'
import etlBadge from '../assets/etl-badge.png'
import collabBadge from '../assets/collab-badge.png'
import checklistBadge from '../assets/checklist-badge.png'

interface ServiceItem {
  id: string
  type: 'service' | 'skill'
  title: string
  description: string
  technologies: string[]
  highlight: string
  icon?: string
  deliverables?: string[]
  timeline?: string
  category?: string
  proficiency?: 'Expert' | 'Advanced' | 'Proficient'
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

  // Get skill badge image based on skill ID
  const getSkillBadge = (skillId: string) => {
    const skillBadges: { [key: string]: string } = {
      aws: cloudBadge,
      python: pythonBadge,
      sql: databaseBadge,
      pipelines: pipeBadge,
      robotics: robotBadge,
      etl: etlBadge,
      collaboration: collabBadge,
      agile: checklistBadge,
    }
    return skillBadges[skillId]
  }
  const defaultContent: ServiceItem = {
    id: 'about',
    type: 'service',
    title: 'Welcome',
    description:
      'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. I help startups and companies bridge the gap between hardware and software with proven, production-ready solutions.',
    technologies: ['Problem Solver', 'Team Player', 'Innovation Driver'],
    highlight:
      '$2M+ in infrastructure cost savings and product funding secured',
    deliverables: [
      'Production-ready solutions',
      'Complete documentation',
      'Knowledge transfer',
    ],
    timeline: 'Fast turnaround',
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
      {/* Enhanced parallax background grid */}
      <motion.div
        className='absolute inset-0 opacity-25 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px, 80px 80px',
          borderRadius: '2rem',
        }}
        animate={{
          x: mousePosition.x * 0.6,
          y: mousePosition.y * 0.6,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      />

      {/* Secondary grid layer for depth */}
      <motion.div
        className='absolute inset-0 opacity-15 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          borderRadius: '2rem',
        }}
        animate={{
          x: mousePosition.x * -0.4,
          y: mousePosition.y * -0.4,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      {/* Enhanced holographic overlay with parallax */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-emerald-500/15 pointer-events-none'
        style={{ borderRadius: '2rem' }}
        animate={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      {/* Dynamic glow that follows mouse with color shifting */}
      <motion.div
        className='absolute w-40 h-40 rounded-full blur-2xl pointer-events-none'
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.8,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 100, damping: 25 },
          y: { type: 'spring', stiffness: 100, damping: 25 },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Floating particles effect */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        style={{ borderRadius: '2rem' }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-cyberpunk-blue/40 rounded-full'
            style={{
              left: `${25 + i * 25}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: mousePosition.x * (0.1 + i * 0.05),
              y: mousePosition.y * (0.1 + i * 0.05),
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              x: { type: 'spring', stiffness: 80, damping: 20 },
              y: { type: 'spring', stiffness: 80, damping: 20 },
              opacity: { duration: 2 + i, repeat: Infinity, ease: 'easeInOut' },
              scale: {
                duration: 1.5 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </motion.div>

      <div className='relative z-10 h-full flex flex-col justify-between'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              type: 'tween',
            }}
            className='space-y-4'
          >
            {/* Title with glow effect and skill badge - Enhanced Hierarchy */}
            <div className='flex items-center space-x-4 mb-2'>
              {content.type === 'skill' && getSkillBadge(content.id) && (
                <motion.img
                  src={getSkillBadge(content.id)}
                  alt={`${content.title} Badge`}
                  className='w-14 h-14 flex-shrink-0'
                  initial={{ opacity: 0, scale: 0.8, x: -15 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    filter: 'brightness(1.2)',
                    transition: { duration: 0.2 },
                  }}
                />
              )}
              <div className='flex-1'>
                <motion.h3
                  className='text-cyberpunk-pink font-cyber text-2xl font-bold filter drop-shadow-[0_0_12px_currentColor] leading-tight'
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {content.title}
                </motion.h3>
                <motion.div
                  className='w-full h-0.5 bg-gradient-to-r from-cyberpunk-pink/60 via-cyberpunk-blue/40 to-transparent mt-1'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>

            {/* Type badge - Enhanced with pill shape */}
            <motion.div
              className='inline-block'
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <motion.span
                className={`px-4 py-2 rounded-full text-xs font-cyber font-bold border-2 ${
                  content.type === 'service'
                    ? 'bg-cyberpunk-purple/20 text-cyberpunk-purple border-cyberpunk-purple/50'
                    : 'bg-cyberpunk-blue/20 text-cyberpunk-blue border-cyberpunk-blue/50'
                } backdrop-blur-sm`}
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    content.type === 'service'
                      ? 'rgba(147, 51, 234, 0.3)'
                      : 'rgba(59, 130, 246, 0.3)',
                  boxShadow: `0 0 15px ${content.type === 'service' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                  transition: { duration: 0.2 },
                }}
              >
                {content.type.toUpperCase()}
              </motion.span>
            </motion.div>

            {/* Description - Enhanced readability */}
            <motion.p
              className='text-cyberpunk-neon/70 text-sm leading-relaxed font-medium'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {content.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Middle Section */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`tech-${contentKey}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1,
            }}
            className='space-y-4 flex-1 flex flex-col justify-center'
          >
            {/* Content varies based on service vs skill */}
            {content.type === 'service' ? (
              <>
                {/* Deliverables Section for Services */}
                {content.deliverables && (
                  <div className='space-y-3 mb-6'>
                    <div className='flex items-center space-x-3'>
                      <motion.h4
                        className='text-cyberpunk-green text-sm font-cyber font-bold uppercase tracking-wider'
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        What You Get
                      </motion.h4>
                      <motion.div
                        className='flex-1 h-px bg-gradient-to-r from-cyberpunk-green/40 to-transparent'
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                    <div className='space-y-2'>
                      {content.deliverables.map((deliverable, i) => (
                        <motion.div
                          key={`${content.id}-deliverable-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + i * 0.1,
                            ease: 'easeOut',
                          }}
                          className='flex items-center space-x-3'
                        >
                          <motion.span
                            className='text-cyberpunk-green text-sm'
                            whileHover={{ scale: 1.2 }}
                          >
                            ✓
                          </motion.span>
                          <span className='text-cyberpunk-neon/80 text-sm'>
                            {deliverable}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline for Services */}
                {content.timeline && (
                  <div className='flex items-center space-x-3 mb-6'>
                    <div className='px-3 py-2 bg-cyberpunk-purple/20 border border-cyberpunk-purple/40 rounded-lg'>
                      <div className='flex items-center space-x-2'>
                        <span className='text-cyberpunk-purple text-xs font-bold'>
                          ⏱️ TIMELINE
                        </span>
                        <span className='text-cyberpunk-purple text-sm font-bold'>
                          {content.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technologies for Services */}
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <motion.h4
                      className='text-cyberpunk-blue text-sm font-cyber font-bold uppercase tracking-wider'
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Tech Stack
                    </motion.h4>
                    <motion.div
                      className='flex-1 h-px bg-gradient-to-r from-cyberpunk-blue/40 to-transparent'
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {content.technologies.map((tech, i) => (
                      <motion.span
                        key={`${content.id}-${tech}-${i}`}
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + i * 0.1,
                          ease: 'easeOut',
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: 'rgba(59, 130, 246, 0.25)',
                          boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                          y: -2,
                          transition: { duration: 0.2 },
                        }}
                        className='px-3 py-1.5 bg-cyberpunk-neon/15 border border-cyberpunk-neon/40 rounded-full text-cyberpunk-neon text-xs font-mono font-medium cursor-default backdrop-blur-sm'
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Skills display with proficiency and category */}
                <div className='space-y-4'>
                  {/* Proficiency and Category for Skills */}
                  <div className='flex items-center gap-3'>
                    {content.proficiency && (
                      <div
                        className={`px-3 py-1.5 rounded-lg border-2 ${
                          content.proficiency === 'Expert'
                            ? 'bg-cyberpunk-green/20 border-cyberpunk-green/50 text-cyberpunk-green'
                            : content.proficiency === 'Advanced'
                              ? 'bg-cyberpunk-blue/20 border-cyberpunk-blue/50 text-cyberpunk-blue'
                              : 'bg-cyberpunk-purple/20 border-cyberpunk-purple/50 text-cyberpunk-purple'
                        }`}
                      >
                        <span className='text-xs font-bold uppercase tracking-wider'>
                          {content.proficiency}
                        </span>
                      </div>
                    )}
                    {content.category && (
                      <div className='px-3 py-1.5 bg-cyberpunk-neon/10 border border-cyberpunk-neon/30 rounded-lg'>
                        <span className='text-cyberpunk-neon/80 text-xs font-medium'>
                          {content.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Technologies for Skills */}
                  <div className='space-y-3'>
                    <div className='flex items-center space-x-3'>
                      <motion.h4
                        className='text-cyberpunk-blue text-sm font-cyber font-bold uppercase tracking-wider'
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        Technologies
                      </motion.h4>
                      <motion.div
                        className='flex-1 h-px bg-gradient-to-r from-cyberpunk-blue/40 to-transparent'
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {content.technologies.map((tech, i) => (
                        <motion.span
                          key={`${content.id}-${tech}-${i}`}
                          initial={{ opacity: 0, y: 15, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + i * 0.1,
                            ease: 'easeOut',
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: 'rgba(59, 130, 246, 0.25)',
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                            y: -2,
                            transition: { duration: 0.2 },
                          }}
                          className='px-3 py-1.5 bg-cyberpunk-neon/15 border border-cyberpunk-neon/40 rounded-full text-cyberpunk-neon text-xs font-mono font-medium cursor-default backdrop-blur-sm'
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Section */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`achievement-${contentKey}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2,
            }}
            className='border-t border-cyberpunk-neon/30 pt-4'
          >
            <div className='flex items-center space-x-3 mb-3'>
              <motion.h4
                className='text-cyberpunk-green text-sm font-cyber font-bold uppercase tracking-wider'
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Key Achievement
              </motion.h4>
              <motion.div
                className='flex-1 h-px bg-gradient-to-r from-cyberpunk-green/40 to-transparent'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            <motion.div
              className='flex items-start space-x-3 p-3 bg-cyberpunk-green/5 border border-cyberpunk-green/20 rounded-lg backdrop-blur-sm'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.span
                className='text-cyberpunk-green text-lg flex-shrink-0 mt-0.5'
                initial={{ opacity: 0, scale: 0.8, x: -5 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.2,
                  filter: 'brightness(1.3)',
                  transition: { duration: 0.2 },
                }}
              >
                ▶
              </motion.span>
              <motion.span
                className='text-cyberpunk-green text-sm font-bold leading-relaxed'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {content.highlight}
              </motion.span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DynamicInfoPanel
