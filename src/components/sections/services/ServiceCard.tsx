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
      className={`group relative h-full min-h-[200px] sm:min-h-[360px] md:min-h-[380px] ${
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
        {/* Title and Icon Section - Mobile: same line, Desktop: separate */}
        <div className='mb-0 sm:mb-6'>
          {/* Mobile Layout - Icon, Title, and Price */}
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
                <h3
                  className={`text-base font-bold leading-tight text-left ${
                    isHighlighted
                      ? 'text-white sm:group-hover:text-purple-100'
                      : 'text-white sm:group-hover:text-cyan-100'
                  } transition-colors whitespace-pre-line`}
                >
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
          </div>

          {/* Desktop Layout - Title centered, Icon below */}
          <div className='hidden sm:flex items-center justify-center mb-4'>
            <h3
              className={`text-base md:text-lg font-bold text-center leading-tight ${
                isHighlighted
                  ? 'text-white sm:group-hover:text-purple-100'
                  : 'text-white sm:group-hover:text-cyan-100'
              } transition-colors whitespace-pre-line`}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Description Container - Takes remaining space */}
        <div className='flex flex-col flex-grow justify-start sm:justify-center items-center mb-0 sm:mb-6 mt-3 sm:mt-0'>
          {/* Icon - Desktop only */}
          <div
            className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-lg ${
              isHighlighted
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                : 'bg-gradient-to-r from-purple-500/60 to-cyan-500/60'
            } text-white text-xl flex-shrink-0 mb-4`}
          >
            <div className='flex items-center justify-center w-full h-full'>
              {icon}
            </div>
          </div>

          {/* Description */}
          <p className='text-xs sm:text-sm text-zinc-300 leading-relaxed text-left sm:text-center px-1 sm:px-2 mb-0 sm:mb-0 hyphens-auto'>
            {description}
          </p>
        </div>

        {/* Pricing and CTA Section - Fixed at bottom */}
        <div className='flex flex-col items-center space-y-2 sm:space-y-4 mt-4 sm:mt-auto'>
          {/* Pricing - Desktop only (mobile shows price under title) */}
          <div
            className={`hidden sm:block text-center ${
              isHighlighted ? 'text-purple-200' : 'text-cyan-400'
            }`}
          >
            <div className='text-base md:text-lg font-bold'>{price}</div>
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
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 sm:hover:from-purple-400 sm:hover:to-cyan-400 text-white'
                : 'bg-white/10 sm:hover:bg-white/20 text-white border border-white/30 sm:hover:border-white/50'
            }`}
            whileHover={
              typeof window !== 'undefined' && window.innerWidth >= 640
                ? { scale: 1.02 }
                : {}
            }
            whileTap={
              typeof window !== 'undefined' && window.innerWidth >= 640
                ? { scale: 0.98 }
                : {}
            }
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

        {/* Highlight indicator for free consultation */}
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
