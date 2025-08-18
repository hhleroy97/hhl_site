import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Project } from '@/types'
import { useReducedMotion } from '@/hooks/useAccessibility'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleHover = () => {
    if (prefersReducedMotion) return
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 300)
  }

  const handleMouseEnter = () => {
    handleHover()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (project.demoUrl) {
        window.open(project.demoUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <motion.article
      className='group relative card-elevated hover:border-cyberpunk-neon/60 transition-all duration-300 
                 focus-within:ring-2 focus-within:ring-cyberpunk-neon focus-within:ring-offset-2 focus-within:ring-offset-cyberpunk-dark
                 cursor-pointer'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              scale: 1.01,
              transition: { duration: 0.2 },
            }
      }
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='article'
      aria-labelledby={`project-title-${project.id}`}
      aria-describedby={`project-description-${project.id}`}
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className='absolute top-4 right-4 z-20 px-3 py-1 bg-cyberpunk-neon text-black 
                   text-xs font-cyber font-bold rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
          aria-label='Featured project'
        >
          FEATURED
        </motion.div>
      )}

      {/* Project image/placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-cyberpunk-dark-surface to-cyberpunk-dark-elevated overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-xl bg-cyberpunk-neon/10 border border-cyberpunk-neon/20 flex items-center justify-center'>
              <span className='text-2xl' role='img' aria-label='Computer emoji'>
                💻
              </span>
            </div>
            <p className='text-sm text-cyberpunk-text-muted font-body'>
              Project Preview
            </p>
          </div>
        </div>

        {/* Professional hover overlay */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-t from-cyberpunk-dark/90 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 flex items-end p-4'
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          aria-hidden='true'
        >
          <div className='w-full'>
            <p className='text-cyberpunk-neon font-medium mb-2 text-sm'>
              Technologies
            </p>
            <div className='flex flex-wrap gap-1'>
              {project.technologies.slice(0, 3).map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-cyberpunk-neon/20 text-cyberpunk-text-primary text-xs font-medium rounded-md backdrop-blur-sm'
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className='px-2 py-1 bg-cyberpunk-text-muted/20 text-cyberpunk-text-muted text-xs font-medium rounded-md backdrop-blur-sm'>
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Subtle glitch effect - reduced intensity */}
        {isGlitching && !prefersReducedMotion && (
          <motion.div
            className='absolute inset-0 bg-cyberpunk-neon/5'
            animate={{
              opacity: [0, 0.3, 0],
              x: [-1, 1, 0],
            }}
            transition={{ duration: 0.3 }}
            aria-hidden='true'
          />
        )}

        {/* Action buttons overlay */}
        <motion.div
          className='absolute inset-0 bg-cyberpunk-dark/80 opacity-0 group-hover:opacity-100 
                     flex items-center justify-center gap-4 transition-opacity duration-200'
          aria-hidden='true'
        >
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-cyberpunk-neon text-cyberpunk-dark rounded-lg hover:bg-cyberpunk-neon/90 
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2'
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View live project: ${project.title}`}
              onClick={e => e.stopPropagation()}
            >
              <Eye size={20} />
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-cyberpunk-dark-surface border border-cyberpunk-neon/40 text-cyberpunk-text-primary 
                       rounded-lg hover:bg-cyberpunk-dark-elevated hover:border-cyberpunk-neon/60 
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2'
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View source code: ${project.title}`}
              onClick={e => e.stopPropagation()}
            >
              <Github size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Project content */}
      <div className='p-6'>
        <div className='mb-4'>
          <h3
            id={`project-title-${project.id}`}
            className='text-xl font-bold text-cyberpunk-text-primary mb-2 font-display'
          >
            {project.title}
          </h3>
          <p
            id={`project-description-${project.id}`}
            className='text-cyberpunk-text-secondary text-sm leading-relaxed'
          >
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className='mb-4'>
          <p className='text-cyberpunk-text-muted text-xs font-medium mb-2 uppercase tracking-wider'>
            Technologies
          </p>
          <div className='flex flex-wrap gap-1'>
            {project.technologies.map(tech => (
              <span
                key={tech}
                className='px-2 py-1 bg-cyberpunk-dark-surface border border-cyberpunk-text-disabled/30 
                         text-cyberpunk-text-muted text-xs font-medium rounded-md'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project links */}
        <div className='flex gap-3'>
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-4 py-2 bg-cyberpunk-neon text-cyberpunk-dark font-medium 
                       rounded-lg hover:bg-cyberpunk-neon/90 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2'
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Visit live project: ${project.title}`}
              onClick={e => e.stopPropagation()}
            >
              <Eye size={16} />
              <span>Live Demo</span>
              <ExternalLink size={14} />
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-4 py-2 bg-cyberpunk-dark-surface border border-cyberpunk-neon/40 
                       text-cyberpunk-text-primary font-medium rounded-lg hover:bg-cyberpunk-dark-elevated 
                       hover:border-cyberpunk-neon/60 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon focus:ring-offset-2'
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View source code: ${project.title}`}
              onClick={e => e.stopPropagation()}
            >
              <Github size={16} />
              <span>Source</span>
              <ExternalLink size={14} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div className='sr-only'>Press Enter or Space to open project</div>
    </motion.article>
  )
}
