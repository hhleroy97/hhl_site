import { motion } from 'framer-motion'
import { useState } from 'react'
import ProjectCard from '@components/ui/ProjectCard'
import { useProjectsContent } from '@/hooks/useSiteContent'

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'Infra' | 'Robotics' | 'ML'>('all')
  const { projects, loading } = useProjectsContent()

  if (loading || !projects) {
    return (
      <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='space-y-8'>
            <div className='h-8 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='h-4 bg-tech-dark-surface/50 rounded animate-pulse max-w-md mx-auto'></div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {[...Array(6)].map((_, i) => (
                <div key={i} className='h-64 bg-tech-dark-surface/50 rounded-xl animate-pulse'></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const filteredProjects = projects.filter(
    project => filter === 'all' || project.tags.includes(filter)
  )

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const otherProjects = filteredProjects.filter(project => !project.featured)

  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentCool/5 via-transparent to-accentWarm/5' />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section header - Enhanced with disciplined glow */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-h2 font-black text-text-primary mb-6 relative'>
            <span className='relative z-10'>Case Studies</span>
            <span className='absolute inset-0 text-accentCool/20 blur-sm'>Case Studies</span>
          </h2>
          <div className='w-24 h-1 bg-accentCool mx-auto mb-6 relative'>
            {/* Glow effect on accent line */}
            <div className='absolute inset-0 bg-accentCool blur-sm opacity-60'></div>
          </div>
          <p className='text-body text-tech-text-secondary max-w-2xl mx-auto'>
            Detailed case studies of real-world projects and their impact
          </p>
        </motion.div>

        {/* Filter buttons - Enhanced floating cards */}
        <motion.div
          className='flex justify-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='relative p-2 bg-tech-dark-surface/80 rounded-xl border border-accentCool/20 backdrop-blur-sm shadow-lg'>
            {/* Depth effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
            <div className='absolute -top-8 -right-8 w-16 h-16 bg-accentCool/8 rounded-full blur-2xl pointer-events-none'></div>
            
            <div className='relative flex bg-transparent rounded-lg'>
              {(['all', 'Infra', 'Robotics', 'ML'] as const).map(filterType => (
                <motion.button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`relative px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                    filter === filterType
                      ? 'text-tech-dark bg-accentCool shadow-lg'
                      : 'text-accentCool hover:text-white hover:bg-accentCool/10'
                  }`}
                  whileHover={{ 
                    scale: filter === filterType ? 1 : 1.02,
                    y: filter === filterType ? 0 : -2,
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {filterType === 'all' ? 'All' : filterType}

                  {/* Active indicator with glow */}
                  {filter === filterType && (
                    <motion.div
                      className='absolute inset-0 bg-accentCool rounded-lg'
                      layoutId='activeFilter'
                      style={{ zIndex: -1 }}
                    >
                      {/* Glow effect for active state */}
                      <div className='absolute inset-0 bg-accentCool blur-sm opacity-60 rounded-lg'></div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured projects - Enhanced with floating containers */}
        {featuredProjects.length > 0 && (
          <motion.div
            className='mb-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3 
              className='text-h3 font-bold text-accentCool mb-8 text-center relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className='relative z-10'>Featured Projects</span>
              <span className='absolute inset-0 text-accentCool blur-sm opacity-30'>Featured Projects</span>
            </motion.h3>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Other projects - Enhanced with floating containers */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h3 
              className='text-h3 font-bold text-text-primary mb-8 text-center relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className='relative z-10'>Other Projects</span>
              <span className='absolute inset-0 text-white blur-sm opacity-20'>Other Projects</span>
            </motion.h3>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* View more link - Enhanced with premium styling */}
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
            className='group relative inline-flex items-center px-8 py-4 border-2 border-accentCool text-accentCool 
                     font-semibold rounded-xl hover:bg-accentCool hover:text-tech-dark 
                     transition-all duration-300 overflow-hidden backdrop-blur-sm'
            whileHover={{ 
              scale: 1.03,
              y: -3,
              transition: { duration: 0.2, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button glow effects */}
            <div className='absolute inset-0 bg-accentCool blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
            
            <span className='relative z-10 mr-2'>View All on GitHub</span>
            <motion.span
              className='relative z-10'
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Section decoration - Enhanced with glow */}
        <motion.div
          className='flex justify-center mt-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className='flex space-x-2'>
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className='relative w-1 h-1 bg-accentCool rounded-full'
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                {/* Glow effect on decoration dots */}
                <div className='absolute inset-0 bg-accentCool blur-sm opacity-60'></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
