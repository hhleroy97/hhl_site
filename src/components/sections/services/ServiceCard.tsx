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
      className={`group relative h-full min-h-[200px] sm:min-h-[400px] ${
        isHighlighted
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/60'
          : 'bg-black/30 border border-white/20'
      } backdrop-blur-md rounded-lg p-3 sm:p-4 transition-all duration-300 shadow-xl sm:hover:shadow-2xl overflow-visible sm:hover:scale-[1.02] sm:hover:-translate-y-1`}
      initial={false}
      animate={{ opacity: 1 }}
    >
      {/* Enhanced depth effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/[0.05] pointer-events-none' />
      <div
        className={`absolute -top-10 -right-10 w-20 h-20 ${
          isHighlighted ? 'bg-purple-400/20' : 'bg-white/10'
        } rounded-full blur-2xl pointer-events-none sm:group-hover:opacity-75 transition-all duration-500`}
      />
      <div
        className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
          isHighlighted
            ? 'via-purple-400/70 sm:group-hover:via-purple-400/90'
            : 'via-white/50 sm:group-hover:via-white/70'
        } to-transparent transition-all duration-300`}
      />

      <div className='relative z-10 flex flex-col h-full'>
        {/* Mobile Layout - Horizontal */}
        <div className='sm:hidden'>
          <div className='flex items-start space-x-4'>
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-lg ${
                isHighlighted
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                  : 'bg-gradient-to-r from-purple-500/60 to-cyan-500/60'
              } text-white text-xl flex-shrink-0`}
            >
              <div className='flex items-center justify-center w-full h-full'>
                {icon}
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='text-base font-bold leading-tight text-left text-white transition-colors whitespace-pre-line'>
                {title}
              </h3>
              <div
                className={`text-sm font-bold mt-1 ${
                  isHighlighted ? 'text-purple-200' : 'text-cyan-400'
                }`}
              >
                {price}
                {price === 'FREE' && (
                  <span className='text-xs text-emerald-400 font-medium ml-2'>
                    Limited Time
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className='text-xs text-zinc-300 leading-relaxed text-left px-1 mt-3 mb-4 hyphens-auto'>
            {description}
          </p>

          <motion.button
            className={`w-full py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 ${
              isHighlighted
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-white/10 text-white border border-white/30'
            }`}
            onClick={e => {
              e.stopPropagation()
              onSelect?.()
            }}
          >
            {price === 'FREE'
              ? 'Schedule Call'
              : serviceId === 'advisory'
                ? 'Request Call'
                : serviceId === 'freelance' || serviceId === 'fulltime'
                  ? 'Schedule Call'
                  : 'Get Quote'}
          </motion.button>
        </div>

        {/* Desktop Layout - Original Slim Vertical */}
        <div className='hidden sm:flex sm:flex-col sm:h-full'>
          {/* Title */}
          <div className='text-center mb-4'>
            <h3
              className={`text-sm font-bold leading-tight ${
                isHighlighted
                  ? 'text-white sm:group-hover:text-purple-100'
                  : 'text-white sm:group-hover:text-cyan-100'
              } transition-colors whitespace-pre-line`}
            >
              {title}
            </h3>
          </div>

          {/* Icon and Description */}
          <div className='flex flex-col flex-grow justify-center items-center space-y-3'>
            {/* Small Icon */}
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-lg ${
                isHighlighted
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                  : 'bg-gradient-to-r from-purple-500/60 to-cyan-500/60'
              } text-white text-2xl flex-shrink-0`}
            >
              <div className='flex items-center justify-center w-full h-full'>
                {icon}
              </div>
            </div>

            {/* Compact Description */}
            <p className='text-xs text-zinc-300 leading-relaxed text-center px-1 hyphens-auto'>
              {description}
            </p>
          </div>

          {/* Price and Button */}
          <div className='mt-auto space-y-3'>
            <div
              className={`text-center ${
                isHighlighted ? 'text-purple-200' : 'text-cyan-400'
              }`}
            >
              <div className='text-sm font-bold'>{price}</div>
              {price === 'FREE' && (
                <div className='text-xs text-emerald-400 font-medium'>
                  Limited Time
                </div>
              )}
            </div>

            <motion.button
              className={`w-full py-2 px-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                isHighlighted
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 sm:hover:from-purple-400 sm:hover:to-cyan-400 text-white'
                  : 'bg-white/10 sm:hover:bg-white/20 text-white border border-white/30 sm:hover:border-white/50'
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
                  : serviceId === 'freelance' || serviceId === 'fulltime'
                    ? 'Schedule Call'
                    : 'Get Quote'}
            </motion.button>
          </div>
        </div>

        {/* Highlight indicator */}
        {isHighlighted && (
          <div className='absolute -top-6 sm:-top-8 -right-8 z-50'>
            <div className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
              POPULAR
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
