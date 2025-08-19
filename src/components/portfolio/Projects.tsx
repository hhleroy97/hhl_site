import { motion } from 'framer-motion'
import { useState } from 'react'
import ProjectCard from '@components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'technical' | 'creative'>('all')

  const filteredProjects = projects.filter(
    project => filter === 'all' || project.category === filter
  )

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const otherProjects = filteredProjects.filter(project => !project.featured)

  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8 bg-background-primary'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-bold text-text-primary mb-4'>
            My <span className='text-primary-600'>Projects</span>
          </h2>
          <div className='w-24 h-1 bg-primary-500 mx-auto mb-6' />
          <p className='text-lg text-text-secondary max-w-2xl mx-auto'>
            A collection of technical innovations and creative explorations
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className='flex justify-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='flex bg-background-secondary rounded-xl p-2 border border-neutral-200'>
            {(['all', 'technical', 'creative'] as const).map(filterType => (
              <motion.button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`relative px-6 py-2 font-semibold rounded-lg transition-all duration-300 ${
                  filter === filterType
                    ? 'text-white bg-primary-600'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                whileHover={{ scale: filter === filterType ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}

                {/* Active indicator */}
                {filter === filterType && (
                  <motion.div
                    className='absolute inset-0 bg-primary-600 rounded-lg'
                    layoutId='activeFilter'
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className='mb-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className='text-2xl font-bold text-primary-600 mb-8 text-center'>
              Featured Projects
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
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className='text-2xl font-bold text-text-primary mb-8 text-center'>
              Other Projects
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
          className='text-center mt-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href='https://github.com/hartleyhleroy'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 
                     font-semibold rounded-lg hover:bg-primary-600 hover:text-white 
                     transition-all duration-300'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='mr-2'>View All on GitHub</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
