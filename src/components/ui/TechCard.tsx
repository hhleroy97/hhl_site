import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TechCardProps {
  title: string
  children: ReactNode
  variant?: 'floating' | 'rotated' | 'background' | 'cutcorner'
  color?: 'cyan' | 'fuchsia' | 'emerald' | 'amber'
  className?: string
}

export default function TechCard({
  title,
  children,
  variant = 'floating',
  color = 'cyan',
  className = '',
}: TechCardProps) {
  const colorStyles = {
    cyan: {
      accent: 'from-cyan-400 to-teal-500',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    fuchsia: {
      accent: 'from-purple-400 to-fuchsia-500',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    emerald: {
      accent: 'from-teal-400 to-emerald-500',
      border: 'border-teal-500/30',
      glow: 'shadow-teal-500/20',
      text: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
    amber: {
      accent: 'from-purple-400 to-cyan-500',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  }

  const colors = colorStyles[color]

  // Floating Tag Style Header
  if (variant === 'floating') {
    return (
      <motion.div
        className={`relative bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} backdrop-blur-sm overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating Tag Header */}
        <motion.div
          className={`absolute top-0 left-12 z-10 px-8 py-4 bg-gradient-to-r ${colors.accent} rounded-b-lg shadow-lg flex items-center justify-center`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className='text-zinc-900 font-bold text-2xl tracking-wider uppercase'>
            {title}
          </span>
        </motion.div>

        {/* Circuit pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-4 right-4 w-16 h-16 border border-current rounded-full'></div>
          <div className='absolute bottom-4 left-4 w-8 h-8 border border-current'></div>
          <div className='absolute top-1/2 right-8 w-1 h-12 bg-current'></div>
        </div>

        {/* Content */}
        <div className='relative z-5 p-8 pt-20 flex-1 flex flex-col'>
          {children}
        </div>
      </motion.div>
    )
  }

  // Rotated Margin Header
  if (variant === 'rotated') {
    return (
      <motion.div
        className={`relative bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} backdrop-blur-sm overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
            <span className='text-zinc-900 font-bold text-sm tracking-widest uppercase whitespace-nowrap'>
              {title}
            </span>
          </div>
        </motion.div>

        {/* Tech grid pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='grid grid-cols-8 h-full'>
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className='border-r border-b border-current'></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='relative z-5 p-8 pl-12 flex-1 flex flex-col text-white'>
          {children}
        </div>
      </motion.div>
    )
  }

  // Background Text Header
  if (variant === 'background') {
    return (
      <motion.div
        className={`relative bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border ${colors.border} rounded-2xl shadow-2xl ${colors.glow} backdrop-blur-sm overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {title}
          </span>
        </motion.div>

        {/* Corner accent */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colors.accent} opacity-20 rounded-bl-full`}
        ></div>

        {/* Content with header overlay */}
        <div className='relative z-10 p-8 flex-1 flex flex-col'>
          <motion.h3
            className={`text-2xl font-bold ${colors.text} mb-6 tracking-wide uppercase flex-shrink-0`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
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
        className={`relative bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border ${colors.border} shadow-2xl ${colors.glow} backdrop-blur-sm overflow-hidden ${className}`}
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Block */}
        <motion.div
          className={`absolute top-0 left-0 right-16 h-16 bg-gradient-to-r ${colors.accent} flex items-center px-6`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            className='text-zinc-900 font-black text-xl tracking-widest uppercase'
            style={{ fontFamily: 'Russo One, sans-serif' }}
          >
            {title}
          </span>
        </motion.div>

        {/* Circuit lines */}
        <div className='absolute inset-0 opacity-20'>
          <div
            className={`absolute top-16 left-0 right-0 h-px bg-gradient-to-r ${colors.accent}`}
          ></div>
          <div
            className={`absolute top-20 left-4 w-px h-8 bg-gradient-to-b ${colors.accent}`}
          ></div>
          <div
            className={`absolute top-20 right-20 w-px h-8 bg-gradient-to-b ${colors.accent}`}
          ></div>
        </div>

        {/* Corner cut accent */}
        <div
          className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${colors.accent} opacity-50`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr ${colors.accent} opacity-50`}
        ></div>

        {/* Content */}
        <div className='relative z-5 p-8 pt-20 flex-1 flex flex-col'>
          {children}
        </div>
      </motion.div>
    )
  }

  return null
}
