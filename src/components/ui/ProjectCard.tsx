import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  slug: string
  title: string
  tags: string[]
  problem: string
  solution: string
  results: string[]
  stack: string[]
  role: string
  period: string
  links: {
    demo: string
    repo: string
  }
  featured: boolean
}

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

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Infra':
        return 'accentWarm'
      case 'Robotics':
        return 'accentCool'
      case 'ML':
        return 'accentPurple'
      default:
        return 'accentWarm'
    }
  }

  return (
    <motion.article
      className='group relative bg-tech-dark-surface/80 border border-accentCool/20 rounded-xl overflow-hidden
                 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 
                 focus-within:ring-2 focus-within:ring-accentCool focus-within:ring-offset-2 focus-within:ring-offset-tech-dark'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        borderColor: '#00d4aa',
        boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onHoverStart={handleHover}
      role='article'
      aria-labelledby={`project-${project.slug}-title`}
      aria-describedby={`project-${project.slug}-description`}
    >
      {/* Depth effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none' />
      <div className='absolute -top-8 -right-8 w-16 h-16 bg-accentCool/8 rounded-full blur-2xl pointer-events-none group-hover:bg-accentCool/12 transition-all duration-300' />

      {/* Featured badge - Enhanced with glow */}
      {project.featured && (
        <motion.div
          className='absolute top-4 right-4 z-20 px-3 py-1 bg-accentCool text-tech-dark 
                   text-xs font-semibold rounded-full shadow-lg'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
        >
          <span className='relative z-10'>Featured</span>
          <div className='absolute inset-0 bg-accentCool blur-sm opacity-60 rounded-full'></div>
        </motion.div>
      )}

      {/* Project image/placeholder - Enhanced with floating styling */}
      <div className='relative h-48 bg-gradient-to-br from-tech-dark-surface/80 to-tech-dark-elevated/80 overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-xl bg-accentCool/10 border border-accentCool/20 flex items-center justify-center backdrop-blur-sm'>
              <span className='text-2xl relative z-10'>💻</span>
              <div className='absolute inset-0 bg-accentCool/5 blur-sm rounded-xl'></div>
            </div>
            <p className='text-sm text-tech-text-muted font-body'>
              Project Preview
            </p>
          </div>
        </div>

        {/* Professional hover overlay - Enhanced */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-t from-tech-dark/90 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 flex items-end p-4'
          transition={{ duration: 0.3 }}
        >
          <div className='w-full'>
            <p className='text-accentCool font-medium mb-2 text-sm relative'>
              <span className='relative z-10'>Technologies</span>
              <span className='absolute inset-0 text-accentCool blur-sm opacity-30'>Technologies</span>
            </p>
            <div className='flex flex-wrap gap-1'>
              {project.stack.slice(0, 3).map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-accentCool/20 text-text-primary text-xs font-medium rounded-md backdrop-blur-sm border border-accentCool/30'
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className='px-2 py-1 bg-text-muted/20 text-text-muted text-xs font-medium rounded-md backdrop-blur-sm'>
                  +{project.stack.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Subtle glow effect - refined */}
        {isGlitching && (
          <motion.div
            className='absolute inset-0 bg-accentWarm/5'
            animate={{
              opacity: [0, 0.3, 0],
              x: [-1, 1, 0],
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Project content - Enhanced spacing */}
      <div className='p-6 space-y-5'>
        {/* Title - Enhanced with glow */}
        <motion.h3 
          className='text-xl font-semibold text-text-primary group-hover:text-accentCool transition-colors duration-300 relative'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
        >
          <span className='relative z-10'>{project.title}</span>
          <span className='absolute inset-0 text-accentCool blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300'>{project.title}</span>
        </motion.h3>

        {/* Problem/Solution preview */}
        <div className='space-y-3'>
          <div>
            <h4 className='text-sm font-semibold text-text-primary mb-1'>Problem</h4>
            <p className='text-sm text-text-secondary leading-relaxed line-clamp-2'>
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className='text-sm font-semibold text-text-primary mb-1'>Solution</h4>
            <p className='text-sm text-text-secondary leading-relaxed line-clamp-2'>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technology tags - Enhanced floating design */}
        <div className='flex flex-wrap gap-2'>
          {project.tags.slice(0, 3).map(tag => {
            const tagColor = getTagColor(tag)
            return (
              <motion.span
                key={tag}
                className={`group/tag relative px-3 py-1 text-xs font-medium bg-tech-dark-surface/80 border border-${tagColor}/20 
                         text-text-secondary rounded-full hover:border-${tagColor}/40 hover:text-text-primary
                         transition-all duration-300 backdrop-blur-sm`}
                whileHover={{ 
                  scale: 1.05,
                  y: -1,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
              >
                {/* Tech badge glow effect */}
                <div className={`absolute inset-0 bg-${tagColor}/5 rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                <span className='relative z-10'>{tag}</span>
              </motion.span>
            )
          })}
          {project.tags.length > 3 && (
            <span className='px-3 py-1 text-xs font-medium text-text-muted bg-tech-dark-surface/80 rounded-full backdrop-blur-sm'>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Results preview */}
        <div>
          <h4 className='text-sm font-semibold text-text-primary mb-2'>Results</h4>
          <div className='flex flex-wrap gap-1'>
            {project.results.slice(0, 2).map((result, resultIndex) => (
              <span
                key={resultIndex}
                className='px-2 py-1 bg-accentWarm/20 text-accentWarm text-xs font-medium rounded-md backdrop-blur-sm border border-accentWarm/30'
              >
                {result}
              </span>
            ))}
            {project.results.length > 2 && (
              <span className='px-2 py-1 bg-text-muted/20 text-text-muted text-xs font-medium rounded-md backdrop-blur-sm'>
                +{project.results.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Action buttons - Enhanced premium styling */}
        <div className='flex gap-3 pt-3'>
          {project.links.demo && (
            <motion.a
              href={project.links.demo}
              target='_blank'
              rel='noopener noreferrer'
              className='group/btn relative px-4 py-2 bg-accentWarm text-tech-dark font-medium text-sm rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm'
              whileHover={{ 
                scale: 1.03,
                y: -2,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button glow effects */}
              <div className='absolute inset-0 bg-accentWarm blur-xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-400'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
              <span className='relative z-10'>View Demo</span>
            </motion.a>
          )}

          {project.links.repo && (
            <motion.a
              href={project.links.repo}
              target='_blank'
              rel='noopener noreferrer'
              className='group/btn relative px-4 py-2 bg-tech-dark-surface/80 text-text-primary border border-accentCool/40 font-medium text-sm rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm hover:border-accentCool/60'
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Ghost button subtle glow */}
              <div className='absolute inset-0 bg-accentCool/5 blur-xl opacity-0 group-hover/btn:opacity-60 transition-opacity duration-400'></div>
              <span className='relative z-10'>View Code</span>
            </motion.a>
          )}
        </div>

        {/* Project metadata */}
        <div className='pt-3 border-t border-text-muted/20'>
          <div className='flex justify-between items-center text-xs text-text-muted'>
            <span>{project.role}</span>
            <span>{project.period}</span>
          </div>
        </div>
      </div>

      {/* Corner indicators - Enhanced with glow */}
      <div className='absolute top-4 left-4 w-2 h-2 bg-accentCool/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute inset-0 bg-accentCool blur-sm opacity-60'></div>
      </div>
      <div className='absolute bottom-4 right-4 w-2 h-2 bg-accentCool/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute inset-0 bg-accentCool blur-sm opacity-60'></div>
      </div>

      {/* Category indicator - Enhanced */}
      <div
        className='absolute top-4 right-4'
        aria-label={`Project category: ${project.tags[0]}`}
      >
        <div
          className={`w-2 h-2 rounded-full bg-${getTagColor(project.tags[0])}`}
        >
          <div className={`absolute inset-0 bg-${getTagColor(project.tags[0])} blur-sm opacity-60 rounded-full`}></div>
        </div>
      </div>
    </motion.article>
  )
}
