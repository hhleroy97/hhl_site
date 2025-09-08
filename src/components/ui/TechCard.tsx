import { ReactNode } from 'react'

interface TechCardProps {
  title: string
  children: ReactNode
  variant?: 'floating' | 'rotated' | 'background' | 'cutcorner'
  color?: 'purple' | 'cyan' | 'teal' | 'emerald'
  className?: string
  /** Control corner rounding for the outer card */
  rounded?: boolean
  /** Use rounded corners on mobile only, and square on md+ */
  roundedOnMobileOnly?: boolean
  /**
   * Controls title alignment on desktop/tablet (md+). On mobile (sm) the title
   * will center by default for better balance unless centerOnMobile is false.
   */
  titleAlign?: 'left' | 'center' | 'right'
  /** Center the title on small/mobile viewports. Default: true */
  centerOnMobile?: boolean
  /**
   * On mobile only, invert diagonal background highlights/corners to alternate
   * visual rhythm in stacked view. Desktop/tablet remain unchanged.
   */
  flipMobileCorners?: boolean
}

export default function TechCard({
  title,
  children,
  variant = 'floating',
  color = 'cyan',
  className = '',
  rounded = true,
  roundedOnMobileOnly = false,
  titleAlign = 'left',
  centerOnMobile = false,
  flipMobileCorners = false,
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

  // Mobile: title bubble spans full width; text is centered by default.

  const desktopPosForFloating =
    titleAlign === 'left'
      ? 'md:left-32 md:translate-x-0 md:right-auto'
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

  const cornerClass = roundedOnMobileOnly
    ? 'rounded-2xl md:rounded-none'
    : rounded
      ? 'rounded-2xl'
      : 'rounded-none'

  // Floating Tag Style Header
  if (variant === 'floating') {
    return (
      <div
        className={`relative bg-black/30 backdrop-blur-md border-2 md:border ${colors.border} border-b-0 md:border-b ${cornerClass} shadow-2xl ${colors.glow} overflow-hidden ${className}`}
      >
        {/* Enhanced depth effects */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            flipMobileCorners
              ? 'bg-gradient-to-bl md:bg-gradient-to-br'
              : 'bg-gradient-to-br'
          } from-white/[0.03] via-transparent to-black/[0.03]`}
        />
        <div
          className={`absolute -top-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none ${
            flipMobileCorners
              ? '-left-32 md:left-auto md:-right-32'
              : '-right-32'
          }`}
        />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Floating Tag Header - sticky on mobile, absolute on md+ */}
        <div
          className={`sticky top-0 md:absolute z-20 px-8 py-4 bg-gradient-to-r ${colors.accent} rounded-br-none rounded-bl-none md:rounded-b-lg shadow-lg flex items-center justify-center w-full max-w-full md:w-auto md:right-auto md:left-auto border-b border-white/10 md:border-b-0 ${desktopPosForFloating}`}
          style={{ top: 'env(safe-area-inset-top, 0px)' }}
        >
          <span
            className={`text-zinc-900 font-black text-2xl tracking-wider uppercase text-center ${textAlignClasses} pl-2 sm:pl-3 md:pl-4`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-10 flex-1 flex flex-col'>
          {children}
        </div>
      </div>
    )
  }

  // Rotated Margin Header
  if (variant === 'rotated') {
    return (
      <div
        className={`relative bg-black/30 backdrop-blur-md border-2 md:border ${colors.border} border-b-0 md:border-b ${cornerClass} shadow-2xl ${colors.glow} overflow-hidden ${className}`}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Rotated Header - positioned as a side tab */}
        <div
          className='absolute left-8 top-12 z-10'
          style={{
            transformOrigin: 'center center',
            transform: 'rotate(-90deg)',
          }}
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
        </div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-10 pl-16 flex-1 flex flex-col text-white'>
          {children}
        </div>
      </div>
    )
  }

  // Background Text Header
  if (variant === 'background') {
    return (
      <div
        className={`relative bg-black/30 backdrop-blur-md border-2 md:border ${colors.border} border-b-0 md:border-b ${cornerClass} shadow-2xl ${colors.glow} overflow-hidden ${className}`}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Oversized Background Text */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden'>
          <span
            className={`text-8xl md:text-9xl font-black ${colors.text} opacity-5 tracking-wider uppercase transform -rotate-12`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </div>

        {/* Content with header overlay */}
        <div className='relative z-10 p-8 pt-10 flex-1 flex flex-col'>
          <h3
            className={`text-2xl font-black ${colors.text} mb-4 tracking-wide uppercase flex-shrink-0 ${centerOnMobile ? 'text-center' : 'text-left'} ${textAlignClasses}`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </h3>
          <div className='flex-1 flex flex-col'>{children}</div>
        </div>
      </div>
    )
  }

  // Cut Corner Card
  if (variant === 'cutcorner') {
    return (
      <div
        className={`relative bg-black/30 backdrop-blur-md border-2 md:border ${colors.border} border-b-0 md:border-b shadow-2xl ${colors.glow} overflow-hidden ${className}`}
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))',
        }}
      >
        {/* Enhanced depth effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
        <div className='absolute -top-32 -right-32 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent' />
        {/* Header Block */}
        <div
          className={`absolute top-0 left-0 right-16 h-16 bg-gradient-to-r ${colors.accent} flex items-center px-6 ${centerOnMobile ? 'justify-center' : 'justify-start'} ${headerJustifyCutCorner}`}
        >
          <span
            className={`text-zinc-900 font-black text-xl tracking-widest uppercase ${centerOnMobile ? 'text-center' : 'text-left'} ${textAlignClasses}`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '900' }}
          >
            {title}
          </span>
        </div>

        {/* Content */}
        <div className='relative z-10 p-8 pt-10 flex-1 flex flex-col'>
          {children}
        </div>
      </div>
    )
  }

  return null
}
