import React from 'react'

interface ServiceItem {
  id: string
  type: 'service' | 'skill'
  title: string
  description: string
  technologies: string[]
  highlight: string
  icon?: string
}

interface DynamicInfoPanelProps {
  hoveredItem: ServiceItem | null
  className?: string
  style?: React.CSSProperties
}

const DynamicInfoPanel: React.FC<DynamicInfoPanelProps> = ({
  hoveredItem,
  className = '',
  style = {},
}) => {
  const defaultContent: ServiceItem = {
    id: 'about',
    type: 'service',
    title: 'Welcome',
    description:
      'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. Hover over any service or skill to learn more.',
    technologies: ['Problem Solver', 'Team Player', 'Innovation Driver'],
    highlight: '5+ years building scalable tech solutions',
  }

  const content = hoveredItem || defaultContent

  return (
    <div
      className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex flex-col ${className}`}
      style={{
        borderRadius: '0 2rem 2rem 0',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow:
          '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
    >
      {/* Holographic overlay */}
      <div
        className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none'
        style={{ borderRadius: '0 2rem 2rem 0' }}
      />

      <div className='relative z-10 h-full flex flex-col justify-between'>
        {/* Top Section */}
        <div className='space-y-4'>
          {/* Title with glow effect */}
          <h3 className='text-cyberpunk-pink font-cyber text-xl font-bold filter drop-shadow-[0_0_8px_currentColor] transition-all duration-300'>
            {content.title}
          </h3>

          {/* Type badge */}
          <div className='inline-block'>
            <span
              className={`px-3 py-1 rounded-full text-xs font-cyber font-bold ${
                content.type === 'service'
                  ? 'bg-cyberpunk-purple/20 text-cyberpunk-purple border border-cyberpunk-purple/40'
                  : 'bg-cyberpunk-blue/20 text-cyberpunk-blue border border-cyberpunk-blue/40'
              }`}
            >
              {content.type.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <p className='text-cyberpunk-neon/80 text-sm leading-relaxed transition-all duration-300'>
            {content.description}
          </p>
        </div>

        {/* Middle Section */}
        <div className='space-y-4 flex-1 flex flex-col justify-center'>
          {/* Tech badges */}
          <div className='space-y-2'>
            <h4 className='text-cyberpunk-neon text-sm font-cyber font-bold'>
              Technologies
            </h4>
            <div className='flex flex-wrap gap-2'>
              {content.technologies.map((tech, i) => (
                <span
                  key={i}
                  className='px-3 py-1 bg-cyberpunk-neon/20 border border-cyberpunk-neon/40 rounded-lg text-cyberpunk-neon text-sm font-mono transition-all duration-300 hover:bg-cyberpunk-neon/30'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-cyberpunk-neon/30 pt-4'>
          <h4 className='text-cyberpunk-green text-sm font-cyber font-bold mb-2'>
            Key Achievement
          </h4>
          <div className='flex items-start space-x-2'>
            <span className='text-cyberpunk-green text-lg'>▶</span>
            <span className='text-cyberpunk-green text-sm font-bold transition-all duration-300'>
              {content.highlight}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicInfoPanel
