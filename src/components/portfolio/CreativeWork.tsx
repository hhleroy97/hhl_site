import { motion } from 'framer-motion'
import { useState } from 'react'
import Lightbox from '@components/ui/Lightbox'
import { creativeWorks } from '@/data/creativeWork'

export default function CreativeWork() {
  const [selectedWork, setSelectedWork] = useState<
    (typeof creativeWorks)[0] | null
  >(null)
  const [filter, setFilter] = useState<
    'all' | 'touchdesigner' | 'generative' | 'installation' | 'performance'
  >('all')

  const filteredWorks = creativeWorks.filter(
    work => filter === 'all' || work.category === filter
  )

  const openLightbox = (work: (typeof creativeWorks)[0]) => {
    setSelectedWork(work)
  }

  const closeLightbox = () => {
    setSelectedWork(null)
  }

  return (
    <section id='creative' className='py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary'>
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
            Creative <span className='text-accent-purple'>Work</span>
          </h2>
          <div className='w-24 h-1 bg-accent-purple mx-auto mb-6' />
          <p className='text-lg text-text-secondary max-w-2xl mx-auto'>
            Exploring the intersection of art, technology, and human experience
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className='flex justify-center mb-12 overflow-x-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='flex bg-background-primary rounded-xl p-2 border border-neutral-200 min-w-max'>
            {(
              [
                'all',
                'touchdesigner',
                'generative',
                'installation',
                'performance',
              ] as const
            ).map(filterType => (
              <motion.button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`relative px-4 py-2 font-semibold rounded-lg transition-all duration-300 text-sm ${
                  filter === filterType
                    ? 'text-white bg-accent-purple'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                whileHover={{ scale: filter === filterType ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}

                {filter === filterType && (
                  <motion.div
                    className='absolute inset-0 bg-accent-purple rounded-lg'
                    layoutId='activeCreativeFilter'
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Creative work grid */}
        <motion.div
          className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              className='group relative bg-background-primary rounded-xl overflow-hidden cursor-pointer
                       border border-neutral-200 hover:border-accent-purple/60 transition-all duration-300'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => openLightbox(work)}
            >
              {/* Image/Video preview */}
              <div className='relative aspect-square bg-gradient-to-br from-background-secondary to-neutral-100 overflow-hidden'>
                {/* Placeholder content */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-16 h-16 mx-auto mb-3 rounded-lg bg-accent-purple/20 flex items-center justify-center'>
                      <span className='text-2xl'>
                        {work.type === 'video' ? '🎬' : '🎨'}
                      </span>
                    </div>
                    <p className='text-xs text-text-muted font-medium'>
                      {work.category}
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className='absolute inset-0 bg-accent-purple/20 opacity-0 group-hover:opacity-100
                           flex items-center justify-center'
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className='text-center'
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='w-12 h-12 mx-auto mb-2 rounded-full bg-accent-purple flex items-center justify-center'>
                      <span className='text-white text-xl'>👁️</span>
                    </div>
                    <p className='text-white font-semibold text-sm'>
                      View
                    </p>
                  </motion.div>
                </motion.div>

                {/* Type indicator */}
                <div className='absolute top-3 right-3 px-2 py-1 bg-background-primary/80 rounded text-xs font-mono text-accent-purple'>
                  {work.type.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className='p-4 space-y-2'>
                <h3 className='font-semibold text-text-primary group-hover:text-accent-purple transition-colors duration-300 text-sm'>
                  {work.title}
                </h3>

                <p className='text-text-secondary text-xs leading-relaxed line-clamp-2'>
                  {work.description}
                </p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-1'>
                  {work.technologies.slice(0, 2).map(tech => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs font-mono bg-background-secondary border border-accent-purple/30 
                               text-accent-purple rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                  {work.technologies.length > 2 && (
                    <span className='px-2 py-1 text-xs font-mono text-text-muted'>
                      +{work.technologies.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more link */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href='https://instagram.com/hartleyhleroy'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-8 py-4 border-2 border-accent-purple text-accent-purple 
                     font-semibold rounded-lg hover:bg-accent-purple hover:text-white 
                     transition-all duration-300'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='mr-2'>View All Creative Work</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedWork && (
        <Lightbox
          isOpen={!!selectedWork}
          onClose={closeLightbox}
          content={{
            type: selectedWork.type,
            src: selectedWork.src,
            title: selectedWork.title,
            description: selectedWork.description,
            technologies: selectedWork.technologies,
          }}
        />
      )}
    </section>
  )
}
