import React from 'react'

interface CyberpunkTrainerCardProps {
  trainerName?: string
  className?: string
  workExperience?: Array<{
    company: string
    role: string
    years: string
    icon?: string
  }>
  achievements?: Array<{
    title: string
    description: string
    value?: string
    icon?: string
  }>
}

const CyberpunkTrainerCard: React.FC<CyberpunkTrainerCardProps> = ({
  trainerName = 'HARTLEY H. LEROY',
  className = '',
  workExperience = [
    {
      company: 'Company A',
      role: 'Senior Engineer',
      years: '2021-2023',
      icon: '🏢',
    },
    {
      company: 'Company B',
      role: 'Full-Stack Developer',
      years: '2019-2021',
      icon: '💻',
    },
    {
      company: 'Company C',
      role: 'Software Engineer',
      years: '2017-2019',
      icon: '⚡',
    },
    {
      company: 'Company D',
      role: 'Junior Developer',
      years: '2016-2017',
      icon: '🚀',
    },
    {
      company: 'Freelance',
      role: 'Consultant',
      years: '2015-2016',
      icon: '🎯',
    },
    {
      company: 'Startup X',
      role: 'Co-Founder',
      years: '2014-2015',
      icon: '💡',
    },
  ],
  achievements = [
    {
      title: 'Projects Led',
      description: 'Major projects delivered',
      value: '25+',
      icon: '🎯',
    },
    {
      title: 'Years Experience',
      description: 'Professional development',
      value: '8+',
      icon: '⏰',
    },
    {
      title: 'Technologies',
      description: 'Programming languages',
      value: '12+',
      icon: '💻',
    },
    {
      title: 'Team Size',
      description: 'Largest team managed',
      value: '15',
      icon: '👥',
    },
    {
      title: 'Certifications',
      description: 'Industry certifications',
      value: '6',
      icon: '🏆',
    },
    {
      title: 'Open Source',
      description: 'Contributions made',
      value: '50+',
      icon: '🌟',
    },
    {
      title: 'Awards',
      description: 'Recognition received',
      value: '3',
      icon: '🥇',
    },
    {
      title: 'Mentored',
      description: 'Developers coached',
      value: '20+',
      icon: '📚',
    },
  ],
}) => {
  // Helper function to get placeholder icon
  const getPlaceholderIcon = (icon?: string) => {
    return icon || '📦'
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

      {/* Main Content Layout - Stacked Sections */}
      <div className='space-y-6'>
        {/* Work Experience Section - 6 Slots (3x2 grid) */}
        <div className='w-full space-y-4'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider flex items-center space-x-2'>
            <span>WORK EXPERIENCE</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='grid grid-cols-3 gap-3'>
            {workExperience.map((work, i) => (
              <div
                key={i}
                className='aspect-square bg-gradient-to-br from-cyberpunk-purple/20 to-cyberpunk-blue/20 border border-cyberpunk-neon/40 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300 p-2'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='text-center z-10 space-y-1'>
                  <div className='text-2xl mb-1'>
                    {getPlaceholderIcon(work.icon)}
                  </div>
                  <h4 className='text-cyberpunk-neon font-cyber text-xs font-bold leading-tight'>
                    {work.company}
                  </h4>
                  <p className='text-cyberpunk-neon/70 font-mono text-[10px] leading-tight'>
                    {work.role}
                  </p>
                  <p className='text-cyberpunk-neon/50 font-mono text-[9px]'>
                    {work.years}
                  </p>
                </div>
                <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges Section - 8 Slots */}
        <div className='w-full space-y-4'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider flex items-center space-x-2'>
            <span>ACHIEVEMENTS & METRICS</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='grid grid-cols-4 gap-3'>
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className='aspect-square bg-gradient-to-br from-cyberpunk-yellow/20 to-cyberpunk-red/20 border border-cyberpunk-yellow/50 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300 p-2'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='text-center z-10 space-y-1'>
                  <div className='text-xl mb-1'>
                    {getPlaceholderIcon(achievement.icon)}
                  </div>
                  <div className='text-cyberpunk-neon font-cyber text-lg font-bold leading-none'>
                    {achievement.value}
                  </div>
                  <h4 className='text-cyberpunk-yellow font-cyber text-[10px] font-bold leading-tight'>
                    {achievement.title}
                  </h4>
                  <p className='text-cyberpunk-neon/60 font-mono text-[8px] leading-tight'>
                    {achievement.description}
                  </p>
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image Section - Compact */}
        <div className='w-full'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-3 flex items-center space-x-2'>
            <span>PROFILE</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='relative h-24 bg-gradient-to-r from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 rounded-lg overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 opacity-30'>
                <div className='absolute top-2 left-4 w-1 h-1 bg-cyberpunk-neon rounded-full animate-pulse'></div>
                <div
                  className='absolute top-4 right-6 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse'
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className='absolute bottom-4 left-6 w-1 h-1 bg-cyberpunk-blue rounded-full animate-pulse'
                  style={{ animationDelay: '1s' }}
                ></div>
                <div
                  className='absolute bottom-2 right-4 w-1 h-1 bg-cyberpunk-green rounded-full animate-pulse'
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
            <div className='absolute inset-2 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-8 h-8 mx-auto bg-gradient-to-b from-cyberpunk-neon/30 to-cyberpunk-blue/30 rounded-full mb-1 relative'>
                  <div className='absolute top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyberpunk-neon/20 rounded-full'></div>
                </div>
                <span className='text-cyberpunk-neon/60 font-mono text-[10px]'>
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
            EXPERIENCE: {workExperience.length} ROLES
          </span>
          <span className='text-cyberpunk-neon/60 font-mono text-xs'>
            ACHIEVEMENTS: {achievements.length} METRICS
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
