import { motion } from 'framer-motion'
import { useState } from 'react'

interface JobCardProps {
  logo: string
  company: string
  title: string
  location: string
  workType?: string
  industry?: string
  index?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function JobCard({
  logo,
  company,
  title,
  location,
  workType,
  industry,
  index = 0,
  onClick,
}: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className='flex flex-col items-center cursor-pointer relative'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Company Logo Node */}
      <motion.div
        className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 shadow-xl relative z-10 transition-transform duration-300'
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        style={{
          transformOrigin: 'center center',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <div
          className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full opacity-20 transition-opacity duration-300'
          style={{ opacity: isHovered ? 0.3 : 0.2 }}
        ></div>
        <div className='relative z-10 flex items-center justify-center'>
          {typeof logo === 'string' &&
          (logo.startsWith('/') ||
            logo.startsWith('data:') ||
            logo.includes('.') ||
            logo.startsWith('blob:')) ? (
            <img
              src={logo}
              alt={`${company} logo`}
              className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain'
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <span className='text-lg sm:text-xl md:text-2xl'>{logo}</span>
          )}
        </div>
      </motion.div>

      {/* Job Details */}
      <div className='text-center w-full px-1'>
        <h3
          className='text-xs sm:text-sm font-bold mb-1 sm:mb-2 transition-colors duration-300 leading-tight whitespace-nowrap'
          style={{ color: isHovered ? '#22d3ee' : '#ffffff' }}
        >
          {company}
        </h3>
        <p className='text-xs text-zinc-300 leading-tight mb-1 font-medium'>
          {title}
        </p>
        <div className='w-16 h-px bg-zinc-500/50 mx-auto mb-1'></div>
        <p className='text-xs text-zinc-500 leading-tight mb-1'>
          {industry || 'Technology'}
        </p>
        <p className='text-xs text-zinc-500 leading-tight mb-1'>{location}</p>
        <p className='text-xs text-zinc-500 leading-tight'>{workType}</p>
      </div>

      {/* Hover glow effect */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-xl transition-opacity duration-300'
        style={{ pointerEvents: 'none', opacity: isHovered ? 0.2 : 0 }}
      ></div>
    </motion.div>
  )
}
