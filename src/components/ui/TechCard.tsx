import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TechCardProps {
  title: string
  children: ReactNode
  variant?: 'floating' | 'rotated' | 'background' | 'cutcorner'
  color?: 'purple' | 'cyan' | 'teal' | 'emerald'
  className?: string
  /**
   * Controls title alignment on desktop/tablet (md+). On mobile (sm) the title
   * will center by default for better balance unless centerOnMobile is false.
   */
  titleAlign?: 'left' | 'center' | 'right'
  /** Center the title on small/mobile viewports. Default: true */
  centerOnMobile?: boolean
}

export default function TechCard({
  title,
  children,
  variant = 'floating',
  color = 'cyan',
  className = '',
  titleAlign = 'left',
  centerOnMobile = true,
}: TechCardProps) {
  const colorStyles = {
    purple: {
      accent: 'from-purple-400 to-cyan-500',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    cyan: {
      accent: 'from-cyan-400 to-teal-500',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    teal: {
      accent: 'from-teal-400 to-emerald-500',
      border: 'border-teal-500/30',
      glow: 'shadow-teal-500/20',
      text: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
    emerald: {
      accent: 'from-emerald-400 to-green-500',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  }

  const colors = colorStyles[color]

  const mobileCenterPos = centerOnMobile
    ? 'left-1/2 -translate-x-1/2'
    : 'left-12 translate-x-0'

  const desktopPosForFloating =
    titleAlign === 'left'
      ? 'md:left-12 md:translate-x-0 md:right-auto'
      : titleAlign === 'center'
        ? 'md:left-1/2 md:-translate-x-1/2'
        : 'md:right-12 md:left-auto md:translate-x-0'

  const textAlignClasses =
    titleAlign === 'left'
      ? 'md:text-left'
      : titleAlign === 'center'
        ? 'md:text-center'
        : 'md:text-right'

  const headerJustifyCutCorner =
    titleAlign === 'left'
      ? 'md:justify-start'
      : titleAlign === 'center'
        ? 'md:justify-center'
        : 'md:justify-end'

  // Floating Tag Style Header
  if (variant === 'floating') {
    return (
      <motion.div
        className={`relative bg-black/30 backdrop-blur-md border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Floating Tag Header */}
        <motion.div
          className={`absolute top-0 z-10 px-8 py-4 bg-gradient-to-r ${colors.accent} rounded-b-lg shadow-lg flex items-center justify-center transform ${mobileCenterPos} ${desktopPosForFloating}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            className={`text-zinc-900 font-black text-2xl tracking-wider uppercase text-center ${textAlignClasses}`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </motion.div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-20 flex-1 flex flex-col'>
          {children}
        </div>
      </motion.div>
    )
  }

  // Rotated Margin Header
  if (variant === 'rotated') {
    return (
      <motion.div
        className={`relative bg-black/30 backdrop-blur-md border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Rotated Header - positioned as a side tab */}
        <motion.div
          className='absolute left-2 top-12 z-10'
          initial={{ opacity: 0, rotate: -90, x: -20 }}
          whileInView={{ opacity: 1, rotate: -90, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ transformOrigin: 'center center' }}
        >
          <div
            className={`px-4 py-2 bg-gradient-to-r ${colors.accent} rounded-lg shadow-lg`}
          >
            <span
              className='text-zinc-900 font-black text-sm tracking-widest uppercase whitespace-nowrap'
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
            >
              {title}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-20 pl-12 flex-1 flex flex-col text-white'>
          {children}
        </div>
      </motion.div>
    )
  }

  // Background Text Header
  if (variant === 'background') {
    return (
      <motion.div
        className={`relative bg-black/30 backdrop-blur-md border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Oversized Background Text */}
        <motion.div
          className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <span
            className={`text-8xl md:text-9xl font-black ${colors.text} opacity-5 tracking-wider uppercase transform -rotate-12`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </motion.div>

        {/* Content with header overlay */}
        <div className='relative z-10 p-8 pt-20 flex-1 flex flex-col'>
          <motion.h3
            className={`text-2xl font-black ${colors.text} mb-4 tracking-wide uppercase flex-shrink-0 ${centerOnMobile ? 'text-center' : 'text-left'} ${textAlignClasses}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </motion.h3>
          <div className='flex-1 flex flex-col'>{children}</div>
        </div>
      </motion.div>
    )
  }

  // Cut Corner Card
  if (variant === 'cutcorner') {
    return (
      <motion.div
        className={`relative bg-black/30 backdrop-blur-md border ${colors.border} shadow-2xl ${colors.glow} overflow-hidden ${className}`}
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />
        {/* Header Block */}
        <motion.div
          className={`absolute top-0 left-0 right-16 h-16 bg-gradient-to-r ${colors.accent} flex items-center px-6 ${centerOnMobile ? 'justify-center' : 'justify-start'} ${headerJustifyCutCorner}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            className={`text-zinc-900 font-black text-xl tracking-widest uppercase ${centerOnMobile ? 'text-center' : 'text-left'} ${textAlignClasses}`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </motion.div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-20 flex-1 flex flex-col'>
          {children}
        </div>
      </motion.div>
    )
  }

  return null
}
