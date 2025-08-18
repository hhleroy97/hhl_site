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
    <section id='creative' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-cyber font-bold text-white mb-4'>
            CREATIVE <span className='text-tech-pink'>WORK</span>
          </h2>
          <div className='w-24 h-1 bg-tech-pink mx-auto mb-6' />
          <p className='text-lg text-gray-400 font-display max-w-2xl mx-auto'>
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
          <div className='flex bg-tech-dark-alt rounded-xl p-2 border border-tech-pink/30 min-w-max'>
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
                className={`relative px-4 py-2 font-cyber font-bold rounded-lg transition-all duration-300 text-sm ${
                  filter === filterType
                    ? 'text-black bg-tech-pink'
                    : 'text-tech-pink hover:text-white'
                }`}
                whileHover={{ scale: filter === filterType ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType.toUpperCase()}

                {filter === filterType && (
                  <motion.div
                    className='absolute inset-0 bg-tech-pink rounded-lg'
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
              className='group relative bg-tech-dark-alt rounded-xl overflow-hidden cursor-pointer
                       border border-tech-pink/20 hover:border-tech-pink/60 transition-all duration-300'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => openLightbox(work)}
            >
              {/* Image/Video preview */}
              <div className='relative aspect-square bg-gradient-to-br from-tech-dark to-tech-dark-alt overflow-hidden'>
                {/* Placeholder content */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-16 h-16 mx-auto mb-3 rounded-lg bg-tech-pink/20 flex items-center justify-center'>
                      <span className='text-2xl'>
                        {work.type === 'video' ? '🎬' : '🎨'}
                      </span>
                    </div>
                    <p className='text-xs text-gray-400 font-display'>
                      {work.category}
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className='absolute inset-0 bg-tech-pink/20 opacity-0 group-hover:opacity-100
                           flex items-center justify-center'
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className='text-center'
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='w-12 h-12 mx-auto mb-2 rounded-full bg-tech-pink flex items-center justify-center'>
                      <span className='text-white text-xl'>👁️</span>
                    </div>
                    <p className='text-white font-cyber font-bold text-sm'>
                      VIEW
                    </p>
                  </motion.div>
                </motion.div>

                {/* Glitch effect on hover */}
                <motion.div
                  className='absolute inset-0 bg-tech-neon/10'
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [-2, 2, -1, 1, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />

                {/* Type indicator */}
                <div className='absolute top-3 right-3 px-2 py-1 bg-tech-dark/80 rounded text-xs font-mono text-tech-pink'>
                  {work.type.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className='p-4 space-y-2'>
                <h3 className='font-cyber font-bold text-white group-hover:text-tech-pink transition-colors duration-300 text-sm'>
                  {work.title}
                </h3>

                <p className='text-gray-400 font-display text-xs leading-relaxed line-clamp-2'>
                  {work.description}
                </p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-1'>
                  {work.technologies.slice(0, 2).map(tech => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs font-mono bg-tech-dark border border-tech-pink/30 
                               text-tech-pink rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                  {work.technologies.length > 2 && (
                    <span className='px-2 py-1 text-xs font-mono text-gray-500'>
                      +{work.technologies.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Corner accents */}
              <div
                className='absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-tech-pink/30 
                            group-hover:border-tech-pink transition-colors duration-300'
              />
              <div
                className='absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-tech-pink/30 
                            group-hover:border-tech-pink transition-colors duration-300'
              />
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
            className='inline-flex items-center px-8 py-4 border-2 border-tech-pink text-tech-pink 
                     font-cyber font-bold rounded-lg hover:bg-tech-pink hover:text-black 
                     hover:shadow-lg hover:shadow-tech-pink/30 transition-all duration-300'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='mr-2'>VIEW ALL CREATIVE WORK</span>
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
