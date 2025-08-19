import { motion } from 'framer-motion'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className='group relative card-elevated transition-all duration-200'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      role='article'
      aria-labelledby={`project-${project.id}-title`}
      aria-describedby={`project-${project.id}-description`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className='absolute top-4 right-4 z-20 px-2 py-0.5 bg-tech-teal text-tech-dark text-xs font-display font-semibold rounded-full'>
          Featured
        </div>
      )}

      {/* Project image/placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-tech-dark-surface to-tech-dark-elevated overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-xl bg-tech-neon/10 border border-tech-neon/20 flex items-center justify-center'>
              <span className='text-2xl'>💻</span>
            </div>
            <p className='text-sm text-tech-text-muted font-body'>
              Project Preview
            </p>
          </div>
        </div>
      </div>

      {/* Project content */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <h3
          className='text-xl font-display font-semibold text-tech-text-primary'
          id={`project-${project.id}-title`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className='text-tech-text-secondary font-body text-sm leading-relaxed line-clamp-3'
          id={`project-${project.id}-description`}
        >
          {project.description}
        </p>

        {/* Technology tags */}
        <div className='flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='px-3 py-1 text-xs font-medium bg-tech-dark-surface border border-tech-dark-elevated text-tech-text-secondary rounded-full'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='px-3 py-1 text-xs font-medium text-tech-text-muted bg-tech-dark-surface rounded-full'>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
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
    </motion.article>
  )
}
