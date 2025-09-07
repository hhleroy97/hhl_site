import { motion } from 'framer-motion'
import { useState } from 'react'

interface MobileJobCardProps {
  logo: string
  company: string
  title: string
  timeframe: string
  location: string
  industry?: string
  index?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function MobileJobCard({
  logo,
  company,
  title,
  timeframe,
  location,
  industry,
  index = 0,
  onClick,
}: MobileJobCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.div
      className='w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40 hover:border-white/30 relative overflow-hidden'
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      {/* Timeframe pill in top right - aligned with card border */}
      <div className='absolute top-0 right-0 z-10'>
        <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30 rounded-bl-full rounded-tr-2xl pl-4 pr-2 py-1 shadow-lg flex items-center justify-center min-w-0'>
          <span
            className='text-xs text-cyan-300 font-bold leading-none text-center'
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem' }}
          >
            {timeframe}
          </span>
        </div>
      </div>

      <div className='p-4 pt-8'>
        <div className='flex flex-col gap-2'>
          {/* Company header row - icon and name with details */}
          <div className='flex items-center gap-3'>
            {/* Company Logo */}
            <div className='w-12 h-12 rounded-full bg-white backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 shadow-lg'>
              <div className='relative z-10 flex items-center justify-center'>
                {typeof logo === 'string' &&
                (logo.startsWith('/') ||
                  logo.startsWith('data:') ||
                  logo.includes('.') ||
                  logo.startsWith('blob:')) ? (
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className='w-8 h-8 object-contain'
                    style={{ pointerEvents: 'none' }}
                  />
                ) : (
                  <span className='text-sm font-bold'>{logo}</span>
                )}
              </div>
            </div>

            {/* Company Name and Job Details */}
            <div className='flex-1 min-w-0'>
              <h3
                className='text-sm font-bold text-white leading-tight mb-1'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {company}
              </h3>
              <div className='space-y-1'>
                <p className='text-xs text-cyan-300 font-medium leading-tight'>
                  {title}
                </p>
                {industry && (
                  <p className='text-xs text-zinc-400 leading-tight'>
                    {industry}
                  </p>
                )}
                <p className='text-xs text-zinc-500 leading-tight'>
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div
        className='absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none'
        style={{ opacity: isPressed ? 0.1 : 0 }}
      ></div>
    </motion.div>
  )
}
