import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  icon: ReactNode
  isHighlighted?: boolean
  onSelect?: () => void
}

export default function ServiceCard({
  title,
  description,
  price,
  icon,
  isHighlighted = false,
  onSelect,
}: ServiceCardProps) {
  return (
    <motion.div
      className={`group relative ${
        isHighlighted
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/60'
          : 'bg-black/30 border border-white/20'
      } backdrop-blur-md rounded-lg p-6 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden`}
      whileHover={{
        scale: 1.02,
        y: -4,
        borderColor: isHighlighted
          ? 'rgba(147, 51, 234, 0.8)'
          : 'rgba(255, 255, 255, 0.4)',
        boxShadow: isHighlighted
          ? '0 20px 40px rgba(147, 51, 234, 0.3)'
          : '0 15px 30px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced depth effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/[0.05] pointer-events-none' />
      <div
        className={`absolute -top-10 -right-10 w-20 h-20 ${
          isHighlighted ? 'bg-purple-400/20' : 'bg-white/10'
        } rounded-full blur-2xl pointer-events-none group-hover:opacity-75 transition-all duration-500`}
      />
      <div
        className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
          isHighlighted
            ? 'via-purple-400/70 group-hover:via-purple-400/90'
            : 'via-white/50 group-hover:via-white/70'
        } to-transparent transition-all duration-300`}
      />

      <div className='relative z-10 flex flex-col h-full'>
        {/* Icon and Price */}
        <div className='flex items-start justify-between mb-4'>
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-lg ${
              isHighlighted
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                : 'bg-gradient-to-r from-purple-500/60 to-cyan-500/60'
            } text-white text-xl`}
          >
            {icon}
          </div>
          <div
            className={`text-right ${
              isHighlighted ? 'text-purple-200' : 'text-cyan-400'
            }`}
          >
            <div className='text-lg font-bold'>{price}</div>
            {price === 'FREE' && (
              <div className='text-xs text-emerald-400 font-medium'>
                Limited Time
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold mb-3 ${
            isHighlighted
              ? 'text-white group-hover:text-purple-100'
              : 'text-white group-hover:text-cyan-100'
          } transition-colors`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className='text-sm text-zinc-300 leading-relaxed flex-grow mb-4'>
          {description}
        </p>

        {/* CTA Button */}
        <motion.button
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
            isHighlighted
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {price === 'FREE' ? 'Schedule Free Call' : 'Get Quote'}
        </motion.button>

        {/* Highlight indicator for free consultation */}
        {isHighlighted && (
          <div className='absolute -top-2 -right-2'>
            <div className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
              POPULAR
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
