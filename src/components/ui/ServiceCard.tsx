import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  icon: ReactNode
  isHighlighted?: boolean
  onSelect?: () => void
  serviceId?: string
}

export default function ServiceCard({
  title,
  description,
  price,
  icon,
  isHighlighted = false,
  onSelect,
  serviceId,
}: ServiceCardProps) {
  return (
    <motion.div
      className={`group relative h-full min-h-[320px] sm:min-h-[360px] md:min-h-[380px] ${
        isHighlighted
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/60'
          : 'bg-black/30 border border-white/20'
      } backdrop-blur-md rounded-lg p-3 sm:p-4 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-visible hover:scale-[1.02] hover:-translate-y-1`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
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
        {/* Title Section */}
        <div className='flex items-center justify-center mb-6'>
          <h3
            className={`text-sm sm:text-base md:text-lg font-bold text-center leading-tight ${
              isHighlighted
                ? 'text-white group-hover:text-purple-100'
                : 'text-white group-hover:text-cyan-100'
            } transition-colors whitespace-pre-line`}
          >
            {title}
          </h3>
        </div>

        {/* Icon and Description Container - Takes remaining space */}
        <div className='flex flex-col flex-grow justify-center items-center mb-6 space-y-4'>
          {/* Icon - Fixed position */}
          <div
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${
              isHighlighted
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                : 'bg-gradient-to-r from-purple-500/60 to-cyan-500/60'
            } text-white text-lg sm:text-xl flex-shrink-0`}
          >
            <div className='flex items-center justify-center w-full h-full'>
              {icon}
            </div>
          </div>

          {/* Description */}
          <p className='text-xs sm:text-sm text-zinc-300 leading-relaxed text-center px-1 sm:px-2 flex-grow flex items-center hyphens-auto'>
            {description}
          </p>
        </div>

        {/* Pricing and CTA Section - Fixed at bottom */}
        <div className='flex flex-col items-center space-y-4 mt-auto'>
          {/* Pricing */}
          <div
            className={`text-center ${
              isHighlighted ? 'text-purple-200' : 'text-cyan-400'
            }`}
          >
            <div className='text-sm sm:text-base md:text-lg font-bold'>
              {price}
            </div>
            {price === 'FREE' && (
              <div className='text-xs text-emerald-400 font-medium'>
                Limited Time
              </div>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            className={`w-full py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 ${
              isHighlighted
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={e => {
              e.stopPropagation()
              onSelect?.()
            }}
          >
            {price === 'FREE'
              ? 'Schedule Call'
              : serviceId === 'advisory'
                ? 'Request Call'
                : 'Get Quote'}
          </motion.button>
        </div>

        {/* Highlight indicator for free consultation */}
        {isHighlighted && (
          <div className='absolute -top-8 -right-8 z-50'>
            <div className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
              POPULAR
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
