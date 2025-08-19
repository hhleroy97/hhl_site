import { motion } from 'framer-motion'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className='group relative bg-background-primary border border-neutral-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all duration-300'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      role='article'
      aria-labelledby={`project-${project.id}-title`}
      aria-describedby={`project-${project.id}-description`}
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className='absolute top-4 right-4 z-20 px-3 py-1 bg-primary-600 text-white 
                   text-xs font-semibold rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
        >
          Featured
        </motion.div>
      )}

      {/* Project image/placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-background-secondary to-neutral-100 overflow-hidden'>
        {/* Placeholder for project image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-3 rounded-xl bg-primary-100 border border-primary-200 flex items-center justify-center'>
              <span className='text-2xl'>💻</span>
            </div>
            <p className='text-sm text-text-muted font-medium'>
              Project Preview
            </p>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-t from-background-primary/90 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 flex items-end p-4'
          transition={{ duration: 0.2 }}
        >
          <div className='w-full'>
            <p className='text-primary-600 font-medium mb-2 text-sm'>
              Technologies
            </p>
            <div className='flex flex-wrap gap-1'>
              {project.technologies.slice(0, 3).map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md'
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className='px-2 py-1 bg-neutral-100 text-text-muted text-xs font-medium rounded-md'>
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project content */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <h3 className='text-xl font-semibold text-text-primary group-hover:text-primary-600 transition-colors duration-200'>
          {project.title}
        </h3>

        {/* Description */}
        <p className='text-text-secondary text-sm leading-relaxed line-clamp-3'>
          {project.description}
        </p>

        {/* Technology tags */}
        <div className='flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='px-3 py-1 text-xs font-medium bg-background-secondary border border-neutral-200 
                       text-text-secondary rounded-full hover:border-primary-300 hover:text-primary-600
                       transition-all duration-200'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='px-3 py-1 text-xs font-medium text-text-muted bg-background-secondary rounded-full'>
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
              className='px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors'
            >
              View Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 border border-neutral-300 text-text-primary text-sm font-medium rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors'
            >
              View Code
            </a>
          )}
        </div>
      </div>

      {/* Category indicator */}
      <div
        className='absolute top-4 left-4'
        aria-label={`Project category: ${project.category}`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            project.category === 'technical' ? 'bg-accent-blue' : 'bg-accent-purple'
          }`}
        />
      </div>
    </motion.article>
  )
}
