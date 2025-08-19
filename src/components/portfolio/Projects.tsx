import { motion } from 'framer-motion'
import ProjectCard from '@components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-10'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-4xl font-display font-bold text-tech-text-primary'>
            Projects
          </h2>
          <p className='text-base text-tech-text-secondary mt-2'>
            Selected work
          </p>
        </motion.div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className='mb-10'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className='text-xl font-display font-semibold text-tech-text-primary mb-6 text-center'>
              Featured
            </h3>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className='text-xl font-display font-semibold text-tech-text-primary mb-6 text-center'>
              More
            </h3>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* View more link */}
        <motion.div
          className='text-center mt-12'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <a
            href='https://github.com/hartleyhleroy'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-6 py-3 border border-tech-dark-elevated text-tech-text-primary rounded-md'
          >
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
