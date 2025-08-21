import { motion } from 'framer-motion'
import { Experience } from '@/types'

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export default function ExperienceCard({
  experience,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      className='group relative bg-tech-dark-surface/80 border border-tech-teal/20 rounded-xl p-6 
                 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        borderColor: '#00d4aa',
        boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Depth effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
      <div className='absolute -top-8 -right-8 w-16 h-16 bg-tech-teal/8 rounded-full blur-2xl pointer-events-none group-hover:bg-tech-teal/12 transition-all duration-300' />
      
      {/* Card content */}
      <div className='relative z-10'>
        {/* Header */}
        <div className='flex justify-between items-start mb-6'>
          <div>
            <motion.h3 
              className='text-xl font-cyber font-bold text-tech-teal mb-2 relative'
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
            >
              <span className='relative z-10'>{experience.role}</span>
              <span className='absolute inset-0 text-tech-teal blur-sm opacity-30'>{experience.role}</span>
            </motion.h3>
            <p className='text-white font-display font-semibold'>
              {experience.company}
            </p>
          </div>
          <span className='text-sm text-gray-400 font-mono bg-tech-dark-surface/80 px-3 py-1 rounded-full border border-tech-teal/20 backdrop-blur-sm'>
            {experience.duration}
          </span>
        </div>

        {/* Description */}
        <ul className='space-y-3 mb-6'>
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              className='text-gray-300 font-display text-sm leading-relaxed flex items-start'
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 + i * 0.05 }}
            >
              <span className='text-tech-teal mr-3 mt-0.5 text-xs relative'>
                <span className='relative z-10'>▶</span>
                <span className='absolute inset-0 text-tech-teal blur-sm opacity-30'>▶</span>
              </span>
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className='flex flex-wrap gap-2'>
          {experience.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              className='group/tech relative px-3 py-1 text-xs font-mono bg-tech-dark-surface/80 border border-tech-teal/30 
                       text-tech-teal rounded-full hover:border-tech-teal/60 
                       hover:bg-tech-teal/10 transition-all duration-300 backdrop-blur-sm'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.02 }}
              whileHover={{ 
                scale: 1.05,
                y: -1,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
            >
              {/* Tech badge glow effect */}
              <div className='absolute inset-0 bg-tech-teal/5 rounded-full opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 blur-sm'></div>
              <span className='relative z-10'>{tech}</span>
            </motion.span>
          ))}
        </div>
      </div>

      {/* Corner accents - Enhanced with glow */}
      <div
        className='absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-tech-teal/40 
                    group-hover:border-tech-teal transition-colors duration-300'
      >
        <div className='absolute inset-0 bg-tech-teal/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
      <div
        className='absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-tech-teal/40 
                    group-hover:border-tech-teal transition-colors duration-300'
      >
        <div className='absolute inset-0 bg-tech-teal/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      {/* Subtle glow effect on hover */}
      <motion.div
        className='absolute inset-0 bg-tech-coral/5 rounded-xl opacity-0'
        whileHover={{
          opacity: [0, 0.3, 0],
          transition: { duration: 0.3, repeat: 1 },
        }}
      />
    </motion.div>
  )
}
