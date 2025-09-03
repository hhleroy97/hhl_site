import { motion } from 'framer-motion'

interface JobCardProps {
  logo: string
  company: string
  title: string
  location: string
  index?: number
  onClick?: () => void
}

export default function JobCard({
  logo,
  company,
  title,
  location,
  index = 0,
  onClick,
}: JobCardProps) {
  return (
    <motion.div
      className='flex flex-col items-center cursor-pointer group relative'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Company Logo Node */}
      <motion.div
        className='w-20 h-20 rounded-full bg-white backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl mb-8 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300'
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
        <div className='relative z-10 flex items-center justify-center'>
          {typeof logo === 'string' &&
          (logo.startsWith('/') ||
            logo.startsWith('data:') ||
            logo.includes('.') ||
            logo.startsWith('blob:')) ? (
            <img
              src={logo}
              alt={`${company} logo`}
              className='w-12 h-12 object-contain'
            />
          ) : (
            <span className='text-2xl'>{logo}</span>
          )}
        </div>
      </motion.div>

      {/* Job Details */}
      <div className='text-center w-full px-1'>
        <h3 className='text-sm font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight whitespace-nowrap'>
          {company}
        </h3>
        <p className='text-xs text-zinc-300 leading-tight mb-1 font-medium'>
          {title}
        </p>
        <p className='text-xs text-zinc-500 leading-tight'>{location}</p>
      </div>

      {/* Hover glow effect */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300'></div>
    </motion.div>
  )
}
