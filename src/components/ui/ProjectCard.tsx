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
    <motion.article
      className='group relative card-elevated hover:border-tech-neon/60 transition-all duration-300 
                 focus-within:ring-2 focus-within:ring-tech-neon focus-within:ring-offset-2 focus-within:ring-offset-tech-dark'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      onHoverStart={handleHover}
      role='article'
      aria-labelledby={`project-${project.id}-title`}
      aria-describedby={`project-${project.id}-description`}
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className='absolute top-4 right-4 z-20 px-3 py-1 bg-tech-neon text-black 
                   text-xs font-cyber font-bold rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
        >
          FEATURED
        </motion.div>
      )}

      {/* Project image/placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-tech-dark-surface to-tech-dark-elevated overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-xl bg-tech-neon/10 border border-tech-neon/20 flex items-center justify-center'>
              <span className='text-2xl'>💻</span>
            </div>
            <p className='text-sm text-cyberpunk-text-muted font-body'>
              Project Preview
            </p>
          </div>
        </div>

        {/* Professional hover overlay */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-t from-tech-dark/90 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 flex items-end p-4'
          transition={{ duration: 0.2 }}
        >
          <div className='w-full'>
            <p className='text-tech-neon font-medium mb-2 text-sm'>
              Technologies
            </p>
            <div className='flex flex-wrap gap-1'>
              {project.technologies.slice(0, 3).map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-tech-neon/20 text-tech-text-primary text-xs font-medium rounded-md backdrop-blur-sm'
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
        {isGlitching && (
          <motion.div
            className='absolute inset-0 bg-tech-neon/5'
            animate={{
              opacity: [0, 0.3, 0],
              x: [-1, 1, 0],
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Project content */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <h3 className='text-xl font-display font-semibold text-tech-text-primary group-hover:text-tech-neon transition-colors duration-200'>
          {project.title}
        </h3>

        {/* Description */}
        <p className='text-tech-text-secondary font-body text-sm leading-relaxed line-clamp-3'>
          {project.description}
        </p>

        {/* Technology tags - cleaner design */}
        <div className='flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='px-3 py-1 text-xs font-medium bg-tech-dark-surface border border-tech-neon/20 
                       text-tech-text-secondary rounded-full hover:border-tech-neon/40 hover:text-tech-text-primary
                       transition-all duration-200'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='px-3 py-1 text-xs font-medium text-cyberpunk-text-muted bg-tech-dark-surface rounded-full'>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons - professional design */}
        <div className='flex gap-3 pt-2'>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='btn-primary text-sm focus-ring'
            >
              View Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='btn-secondary text-sm focus-ring'
            >
              View Code
            </a>
          )}
        </div>
      </div>

      {/* Subtle corner indicators - less intrusive */}
      <div className='absolute top-4 left-4 w-2 h-2 bg-tech-neon/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      <div className='absolute bottom-4 right-4 w-2 h-2 bg-tech-neon/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      {/* Category indicator - improved accessibility */}
      <div
        className='absolute top-4 right-4'
        aria-label={`Project category: ${project.category}`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            project.category === 'technical' ? 'bg-tech-blue' : 'bg-tech-pink'
          }`}
        />
      </div>
    </motion.article>
  )
}
