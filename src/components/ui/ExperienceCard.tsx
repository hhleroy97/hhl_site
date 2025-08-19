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
      className='relative bg-tech-dark-alt border border-tech-neon/20 rounded-xl p-6 
                 hover:border-tech-neon/60 transition-all duration-150 group'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3, scale: 1.01 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className='absolute inset-0 bg-tech-neon/5 rounded-xl opacity-0 group-hover:opacity-100'
        transition={{ duration: 0.15 }}
      />

      {/* Card content */}
      <div className='relative z-10'>
        {/* Header */}
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h3 className='text-xl font-cyber font-bold text-tech-neon mb-1'>
              {experience.role}
            </h3>
            <p className='text-white font-display font-semibold'>
              {experience.company}
            </p>
          </div>
          <span className='text-sm text-gray-400 font-mono bg-tech-dark px-3 py-1 rounded-full'>
            {experience.duration}
          </span>
        </div>

        {/* Description */}
        <ul className='space-y-2 mb-6'>
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              className='text-gray-300 font-display text-sm leading-relaxed flex items-start'
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.02 + i * 0.02 }}
            >
              <span className='text-tech-neon mr-3 mt-0.5 text-xs'>▶</span>
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className='flex flex-wrap gap-2'>
          {experience.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              className='px-3 py-1 text-xs font-mono bg-tech-dark border border-tech-neon/30 
                       text-tech-neon rounded-full hover:border-tech-neon/60 
                       hover:bg-tech-neon/10 transition-all duration-150'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, delay: index * 0.02 + i * 0.01 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <div
        className='absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-tech-neon/30 
                    group-hover:border-tech-neon transition-colors duration-150'
      />
      <div
        className='absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-tech-neon/30 
                    group-hover:border-tech-neon transition-colors duration-150'
      />

      {/* Glitch effect on hover */}
      <motion.div
        className='absolute inset-0 bg-tech-pink/10 rounded-xl opacity-0'
        whileHover={{
          opacity: [0, 0.3, 0],
          transition: { duration: 0.1, repeat: 1 },
        }}
      />
    </motion.div>
  )
}
