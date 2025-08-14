import { motion } from 'framer-motion'
import { useState } from 'react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  const handleHover = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 300)
  }

  return (
    <motion.div
      className='group relative bg-cyberpunk-dark-alt border border-cyberpunk-neon/20 rounded-xl overflow-hidden
                 hover:border-cyberpunk-neon/60 transition-all duration-300'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={handleHover}
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className='absolute top-4 right-4 z-20 px-3 py-1 bg-cyberpunk-neon text-black 
                   text-xs font-cyber font-bold rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
        >
          FEATURED
        </motion.div>
      )}

      {/* Project image/placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-cyberpunk-dark to-cyberpunk-dark-alt overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-lg bg-cyberpunk-neon/20 flex items-center justify-center'>
              <span className='text-2xl'>📱</span>
            </div>
            <p className='text-sm text-gray-400 font-display'>
              Project Screenshot
            </p>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className='absolute inset-0 bg-cyberpunk-neon/10 opacity-0 group-hover:opacity-100'
          transition={{ duration: 0.3 }}
        />

        {/* Glitch overlay */}
        <motion.div
          className='absolute inset-0 bg-cyberpunk-pink/20'
          animate={
            isGlitching
              ? {
                  opacity: [0, 0.7, 0],
                  x: [-2, 2, -1, 1, 0],
                }
              : { opacity: 0 }
          }
          transition={{ duration: 0.3 }}
        />

        {/* Tech stack overlay on hover */}
        <motion.div
          className='absolute inset-0 bg-black/80 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100'
          transition={{ duration: 0.3 }}
        >
          <div className='text-center'>
            <p className='text-cyberpunk-neon font-cyber font-bold mb-2 text-sm'>
              TECH STACK
            </p>
            <div className='flex flex-wrap gap-1 justify-center'>
              {project.technologies.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-cyberpunk-neon text-black text-xs font-mono rounded'
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className='px-2 py-1 bg-cyberpunk-pink text-white text-xs font-mono rounded'>
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project content */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <motion.h3
          className='text-xl font-cyber font-bold text-white group-hover:text-cyberpunk-neon transition-colors duration-300'
          animate={
            isGlitching
              ? {
                  x: [-1, 1, -1, 1, 0],
                  textShadow: [
                    '0 0 0px #00ffff',
                    '2px 0 #ff00ff, -2px 0 #00ffff',
                    '0 0 0px #00ffff',
                  ],
                }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className='text-gray-300 font-display text-sm leading-relaxed line-clamp-3'>
          {project.description}
        </p>

        {/* Technology tags */}
        <div className='flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='px-2 py-1 text-xs font-mono bg-cyberpunk-dark border border-cyberpunk-neon/30 
                       text-cyberpunk-neon rounded hover:border-cyberpunk-neon/60 transition-colors duration-300'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='px-2 py-1 text-xs font-mono text-gray-400'>
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className='flex gap-3 pt-2'>
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 bg-cyberpunk-neon text-black font-cyber font-bold text-sm rounded-lg
                       hover:bg-cyberpunk-pink hover:shadow-lg hover:shadow-cyberpunk-pink/30
                       transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW DEMO
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 border border-cyberpunk-neon text-cyberpunk-neon font-cyber font-bold text-sm rounded-lg
                       hover:bg-cyberpunk-neon hover:text-black hover:shadow-lg hover:shadow-cyberpunk-neon/30
                       transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW CODE
            </motion.a>
          )}
        </div>
      </div>

      {/* Corner accents */}
      <div
        className='absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyberpunk-neon/30 
                    group-hover:border-cyberpunk-neon transition-colors duration-300'
      />
      <div
        className='absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyberpunk-neon/30 
                    group-hover:border-cyberpunk-neon transition-colors duration-300'
      />

      {/* Category indicator */}
      <div className='absolute bottom-3 left-3'>
        <span
          className={`w-3 h-3 rounded-full ${
            project.category === 'technical'
              ? 'bg-cyberpunk-neon'
              : 'bg-cyberpunk-pink'
          }`}
        />
      </div>
    </motion.div>
  )
}
