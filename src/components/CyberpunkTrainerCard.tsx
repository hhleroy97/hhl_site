import React from 'react'

interface CyberpunkTrainerCardProps {
  trainerName?: string
  className?: string
  professionalCards?: Array<{
    title: string
    description: string
    type: 'experience' | 'project' | 'achievement'
  }>
  techStack?: Array<{
    name: string
    category: string
    level: string
  }>
}

const CyberpunkTrainerCard: React.FC<CyberpunkTrainerCardProps> = ({
  trainerName = 'HARTLEY H. LEROY',
  className = '',
  professionalCards = [
    {
      title: 'Senior Engineer',
      description: 'Technical Leadership & Architecture',
      type: 'experience',
    },
    {
      title: 'Full-Stack Developer',
      description: 'End-to-end application development',
      type: 'experience',
    },
    {
      title: 'AI Integration Specialist',
      description: 'Machine learning & automation',
      type: 'project',
    },
    {
      title: 'System Architect',
      description: 'Scalable infrastructure design',
      type: 'achievement',
    },
  ],
  techStack = [
    { name: 'TypeScript', category: 'Language', level: 'Expert' },
    { name: 'React', category: 'Frontend', level: 'Expert' },
    { name: 'Node.js', category: 'Backend', level: 'Expert' },
    { name: 'Python', category: 'Language', level: 'Advanced' },
    { name: 'AWS', category: 'Cloud', level: 'Advanced' },
    { name: 'Docker', category: 'DevOps', level: 'Advanced' },
    { name: 'PostgreSQL', category: 'Database', level: 'Advanced' },
    { name: 'GraphQL', category: 'API', level: 'Intermediate' },
  ],
}) => {
  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return '💼'
      case 'project':
        return '🚀'
      case 'achievement':
        return '🏆'
      default:
        return '⚡'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-cyberpunk-neon'
      case 'Advanced':
        return 'text-cyberpunk-blue'
      case 'Intermediate':
        return 'text-cyberpunk-purple'
      default:
        return 'text-cyberpunk-pink'
    }
  }

  return (
    <div
      className={`relative bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan rounded-xl p-6 cyberpunk-border ${className}`}
    >
      {/* Top Banner with Name in Left Corner */}
      <div className='flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 rounded-lg border border-cyberpunk-neon/30'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-cyberpunk-neon/20 border border-cyberpunk-neon rounded flex items-center justify-center'>
            <div className='w-6 h-6 bg-cyberpunk-neon animate-pulse rounded-sm'></div>
          </div>
          <div>
            <h1 className='text-xl font-cyber font-bold cyberpunk-glow tracking-wider'>
              {trainerName}
            </h1>
            <p className='text-cyberpunk-neon/60 font-mono text-xs'>
              ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
            </p>
          </div>
        </div>

        <div className='text-right'>
          <div className='text-cyberpunk-pink font-cyber text-sm font-bold'>
            PROFESSIONAL CARD
          </div>
          <div className='text-cyberpunk-neon/60 font-mono text-xs'>
            ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content Layout - Single Column */}
      <div className='space-y-6'>
        {/* Professional Cards Section */}
        <div className='space-y-4'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider flex items-center space-x-2'>
            <span>PROFESSIONAL PORTFOLIO</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='space-y-3'>
            {professionalCards.map((card, i) => (
              <div
                key={i}
                className='w-full bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 border border-cyberpunk-neon/40 rounded-lg p-4 relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='flex items-center justify-between z-10 relative'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-xl'>
                      {getCardTypeIcon(card.type)}
                    </span>
                    <div>
                      <h4 className='text-cyberpunk-neon font-cyber text-sm font-bold'>
                        {card.title}
                      </h4>
                      <p className='text-cyberpunk-neon/70 font-mono text-xs'>
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className='text-cyberpunk-pink font-mono text-xs uppercase tracking-wider'>
                    {card.type}
                  </div>
                </div>
                <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className='space-y-4'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider flex items-center space-x-2'>
            <span>TECH STACK</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='space-y-2'>
            {techStack.map((tech, i) => (
              <div
                key={i}
                className='w-full bg-gradient-to-r from-cyberpunk-yellow/10 to-cyberpunk-red/10 border border-cyberpunk-yellow/40 rounded-lg p-3 relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='flex items-center justify-between z-10 relative'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-cyberpunk-yellow/50 rounded-full animate-pulse'></div>
                    <div>
                      <h4 className='text-cyberpunk-neon font-cyber text-sm font-bold'>
                        {tech.name}
                      </h4>
                      <p className='text-cyberpunk-neon/60 font-mono text-xs'>
                        {tech.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${getLevelColor(tech.level)}`}
                  >
                    {tech.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image Section */}
        <div className='relative'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-3 flex items-center space-x-2'>
            <span>PROFILE</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='relative h-32 bg-gradient-to-r from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 rounded-lg overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 opacity-30'>
                <div className='absolute top-3 left-4 w-2 h-2 bg-cyberpunk-neon rounded-full animate-pulse'></div>
                <div
                  className='absolute top-6 right-6 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse'
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className='absolute bottom-8 left-6 w-1 h-1 bg-cyberpunk-blue rounded-full animate-pulse'
                  style={{ animationDelay: '1s' }}
                ></div>
                <div
                  className='absolute bottom-4 right-4 w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse'
                  style={{ animationDelay: '1.5s' }}
                ></div>
              </div>

              {/* Circuit pattern */}
              <div className='absolute inset-0 opacity-20'>
                <svg
                  className='w-full h-full'
                  viewBox='0 0 100 100'
                  fill='none'
                >
                  <path
                    d='M10 50 L30 50 L35 45 L35 35 L40 30 L60 30 L65 35 L65 55 L70 60 L90 60'
                    stroke='currentColor'
                    strokeWidth='0.5'
                    className='text-cyberpunk-neon'
                  />
                  <circle
                    cx='35'
                    cy='35'
                    r='1'
                    fill='currentColor'
                    className='text-cyberpunk-pink'
                  />
                  <circle
                    cx='65'
                    cy='55'
                    r='1'
                    fill='currentColor'
                    className='text-cyberpunk-blue'
                  />
                </svg>
              </div>
            </div>

            {/* Profile Placeholder */}
            <div className='absolute inset-4 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto bg-gradient-to-b from-cyberpunk-neon/30 to-cyberpunk-blue/30 rounded-full mb-2 relative'>
                  <div className='absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyberpunk-neon/20 rounded-full'></div>
                </div>
                <span className='text-cyberpunk-neon/60 font-mono text-xs'>
                  PROFILE IMAGE
                </span>
              </div>
            </div>

            {/* Scanlines effect */}
            <div className='absolute inset-0 scanlines'></div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className='mt-6 flex justify-between items-center p-3 bg-gradient-to-r from-cyberpunk-dark via-cyberpunk-purple/10 to-cyberpunk-dark border border-cyberpunk-neon/30 rounded-lg'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse'></div>
          <span className='text-cyberpunk-green font-mono text-xs'>
            AVAILABLE FOR HIRE
          </span>
        </div>

        <div className='flex items-center space-x-4'>
          <span className='text-cyberpunk-neon/60 font-mono text-xs'>
            EXPERIENCE: {professionalCards.length} ROLES
          </span>
          <span className='text-cyberpunk-neon/60 font-mono text-xs'>
            TECH: {techStack.length} SKILLS
          </span>
        </div>
      </div>

      {/* Holographic overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-xl pointer-events-none'></div>

      {/* Corner accents */}
      <div className='absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyberpunk-neon'></div>
      <div className='absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyberpunk-neon'></div>
      <div className='absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyberpunk-neon'></div>
      <div className='absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyberpunk-neon'></div>
    </div>
  )
}

export default CyberpunkTrainerCard
