import React from 'react'

interface CyberpunkTrainerCardProps {
  trainerName?: string
  className?: string
  coreServices?: Array<{
    title: string
    description: string
    icon?: string
  }>
  skillsCapabilities?: Array<{
    title: string
    description: string
    icon?: string
  }>
}

const CyberpunkTrainerCard: React.FC<CyberpunkTrainerCardProps> = ({
  trainerName = 'HARTLEY H. LEROY',
  className = '',
  coreServices = [
    {
      title: 'Cloud & Data',
      description: 'AWS IoT, Pipelines, Analytics',
      icon: '☁️',
    },
    {
      title: 'Robotics',
      description: 'ROS2, PX4, Custom Control',
      icon: '🤖',
    },
    {
      title: 'Product & FW',
      description: 'Hardware-Software Synergy',
      icon: '⚡',
    },
    {
      title: 'Blockchain',
      description: 'Smart Contracts, Tokenomics',
      icon: '⛓️',
    },
    {
      title: 'Frontend',
      description: 'React, Vue, Next.js',
      icon: '💻',
    },
    {
      title: 'Proto & R&D',
      description: 'MVP to Production',
      icon: '🔬',
    },
  ],
  skillsCapabilities = [
    {
      title: '☁️ AWS',
      description: 'IoT Core, Kinesis, Firehose, Glue, S3, Athena, Lambda',
      icon: '☁️',
    },
    {
      title: '🐍 PYTHON',
      description: 'Data pipelines, automation, analytics tooling',
      icon: '🐍',
    },
    {
      title: '🗃️ SQL',
      description: 'Querying, transformations, schema design',
      icon: '🗃️',
    },
    {
      title: '📊 STREAM',
      description: 'Real-time ingestion & processing at scale',
      icon: '📊',
    },
    {
      title: '🤖 ROS2',
      description: 'ROS2, PX4 telemetry, IoT devices',
      icon: '🤖',
    },
    {
      title: '💡 PROTO',
      description: 'From proof-of-concept to production MVP',
      icon: '💡',
    },
    {
      title: '🤝 COLLAB',
      description: 'Bridging hardware, software, and cloud',
      icon: '🤝',
    },
    {
      title: '📋 AGILE',
      description: 'Prioritization, delivery, and stakeholder alignment',
      icon: '📋',
    },
  ],
}) => {
  // Helper function to get placeholder icon
  const getPlaceholderIcon = (icon?: string) => {
    return icon || '📦'
  }

  // Remove debug logging

  return (
    <div
      className={`relative bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan rounded-xl p-6 cyberpunk-border transform scale-x-150 ${className}`}
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

      {/* Main Content Layout */}
      <div className='w-full space-y-6'>
        {/* Top Row - Profile and Core Services */}
        <div className='w-full grid grid-cols-4 gap-6'>
          {/* Profile Section - 1/4 width */}
          <div className='col-span-1'>
            <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-3 flex items-center space-x-2'>
              <span>PROFESSIONAL</span>
              <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
            </h3>
            <div className='relative h-80 bg-gradient-to-r from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 rounded-lg overflow-hidden'>
              {/* Background Pattern */}
              <div className='absolute inset-0'>
                <div className='absolute inset-0 opacity-30'>
                  <div className='absolute top-4 left-6 w-1 h-1 bg-cyberpunk-neon rounded-full animate-pulse'></div>
                  <div
                    className='absolute top-8 right-8 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse'
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                  <div
                    className='absolute bottom-8 left-8 w-1 h-1 bg-cyberpunk-blue rounded-full animate-pulse'
                    style={{ animationDelay: '1s' }}
                  ></div>
                  <div
                    className='absolute bottom-4 right-6 w-1 h-1 bg-cyberpunk-green rounded-full animate-pulse'
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
                    <path
                      d='M20 20 L25 15 L35 15 L40 20 L40 30'
                      stroke='currentColor'
                      strokeWidth='0.5'
                      className='text-cyberpunk-pink'
                    />
                    <path
                      d='M60 70 L65 75 L75 75 L80 70 L80 60'
                      stroke='currentColor'
                      strokeWidth='0.5'
                      className='text-cyberpunk-blue'
                    />
                    <circle
                      cx='35'
                      cy='35'
                      r='1.5'
                      fill='currentColor'
                      className='text-cyberpunk-pink'
                    />
                    <circle
                      cx='65'
                      cy='55'
                      r='1.5'
                      fill='currentColor'
                      className='text-cyberpunk-blue'
                    />
                    <circle
                      cx='50'
                      cy='75'
                      r='1'
                      fill='currentColor'
                      className='text-cyberpunk-green'
                    />
                  </svg>
                </div>
              </div>

              {/* Character Image with Status */}
              <div className='absolute inset-2 flex items-center justify-center'>
                <div className='relative w-full h-full'>
                  {/* Character placeholder/silhouette */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-24 h-32 bg-gradient-to-b from-cyberpunk-neon/30 to-cyberpunk-blue/30 rounded-lg relative'>
                      {/* Head */}
                      <div className='absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-cyberpunk-neon/40 rounded-full'></div>
                      {/* Body */}
                      <div className='absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-cyberpunk-blue/40 rounded-lg'></div>
                      {/* Status indicator */}
                      <div className='absolute -top-1 -right-1 w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse'></div>
                    </div>
                  </div>

                  {/* Status overlay */}
                  <div className='absolute bottom-2 left-0 right-0 text-center'>
                    <div className='text-cyberpunk-green font-cyber text-xs font-bold mb-1'>
                      AVAILABLE FOR HIRE
                    </div>
                    <div className='text-cyberpunk-neon/60 font-mono text-[10px] leading-tight'>
                      Full-Stack Engineer
                    </div>
                  </div>
                </div>
              </div>

              {/* Scanlines effect */}
              <div className='absolute inset-0 scanlines'></div>
            </div>
          </div>

          {/* Core Services Section - 3/4 width */}
          <div className='col-span-3 bg-gradient-to-r from-cyberpunk-purple/5 to-cyberpunk-blue/5 border border-cyberpunk-neon/20 p-6 rounded-lg'>
            <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-4 flex items-center space-x-2'>
              <span>CORE SERVICES</span>
              <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
            </h3>
            <div className='grid grid-cols-3 gap-1'>
              {coreServices.map((service, i) => (
                <div
                  key={i}
                  className='aspect-[4/3] bg-gradient-to-br from-cyberpunk-purple/20 to-cyberpunk-blue/20 border border-cyberpunk-neon/40 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300 p-1'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='text-center z-10 space-y-1'>
                    <div className='text-2xl mb-1'>
                      {getPlaceholderIcon(service.icon)}
                    </div>
                    <h4 className='text-cyberpunk-neon font-cyber text-xs font-bold leading-tight'>
                      {service.title}
                    </h4>
                    <p className='text-cyberpunk-neon/70 font-mono text-[10px] leading-tight'>
                      {service.description}
                    </p>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Skills & Capabilities Section */}
        <div className='w-full bg-gradient-to-r from-cyberpunk-blue/5 to-cyberpunk-purple/5 border border-cyberpunk-neon/30 p-6 rounded-lg'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-4 flex items-center space-x-2'>
            <span>SKILLS & CAPABILITIES</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='grid grid-cols-4 gap-2'>
            {skillsCapabilities.map((skill, i) => (
              <div
                key={i}
                className='w-full h-10 bg-gradient-to-br from-cyberpunk-neon/10 to-cyberpunk-blue/20 border border-cyberpunk-neon/50 rounded flex items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='text-center z-10'>
                  <h4 className='text-cyberpunk-neon font-mono text-sm font-bold leading-tight'>
                    {skill.title}
                  </h4>
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            ))}
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
            ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
          </span>
          <span className='text-cyberpunk-neon/60 font-mono text-xs'>
            EXP: 10+ YRS
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
