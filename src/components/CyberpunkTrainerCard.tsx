import React from 'react'
import characterProfile from '../assets/character-profile.png'
import cloudBadge from '../assets/cloud-badge.png'
import pythonBadge from '../assets/python-badge.png'
import databaseBadge from '../assets/database-badge.png'
import pipeBadge from '../assets/pipe-badge.png'
import robotBadge from '../assets/robot-badge.png'
import etlBadge from '../assets/etl-badge.png'
import collabBadge from '../assets/collab-badge.png'
import checklistBadge from '../assets/checklist-badge.png'

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
  trainerName: _trainerName = 'HARTLEY H. LEROY',
  className = '',
  coreServices = [
    {
      title: 'Cloud & Data Systems',
      description: 'AWS IoT Core, Kinesis, Glue, S3, Athena, Lambda',
      icon: '☁️',
    },
    {
      title: 'Robotics Integration',
      description: 'ROS2, PX4, IoT devices, telemetry pipelines',
      icon: '🤖',
    },
    {
      title: 'Product & Firmware',
      description: 'Hardware-software synergy for connected devices',
      icon: '⚡',
    },
    {
      title: 'Data Visualization',
      description: 'Dashboards, real-time monitoring, insight delivery',
      icon: '📊',
    },
    {
      title: 'Frontend Engineering',
      description: 'React, Vue, Next.js interfaces for data-rich apps',
      icon: '💻',
    },
    {
      title: 'Prototyping & R&D',
      description: 'From proof-of-concept to production-ready MVP',
      icon: '🔬',
    },
  ],
  skillsCapabilities = [
    {
      title: 'AWS Cloud Services',
      description: 'IoT Core, Kinesis, Firehose, Glue, S3, Athena, Lambda',
      icon: '☁️',
    },
    {
      title: 'Python Development',
      description: 'Data pipelines, automation, analytics tooling',
      icon: '🐍',
    },
    {
      title: 'SQL & Data Modeling',
      description: 'Querying, transformations, schema design',
      icon: '🗃️',
    },
    {
      title: 'Data Streaming Pipelines',
      description: 'Real-time ingestion & processing at scale',
      icon: '📊',
    },
    {
      title: 'Robotics Data Integration',
      description: 'ROS2, PX4 telemetry, IoT devices',
      icon: '🤖',
    },
    {
      title: 'ETL & Data Transformation',
      description: 'Building and optimizing ETL workflows',
      icon: '⚙️',
    },
    {
      title: 'Cross-Disciplinary Collaboration',
      description: 'Bridging hardware, software, and cloud teams',
      icon: '🤝',
    },
    {
      title: 'Agile Project Management',
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
      className={`relative bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan p-8 transform scale-x-150 rounded-lg shadow-2xl ${className}`}
      style={{
        boxShadow:
          '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)',
      }}
    >
      {/* Background texture */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.05) 50%, transparent 60%)
          `,
            backgroundSize: '50px 50px, 60px 60px, 100px 100px',
          }}
        ></div>
      </div>

      {/* Subtle grid overlay */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      {/* Angular border effect */}
      <div
        className='absolute inset-0 border-2 border-cyberpunk-neon rounded-lg'
        style={{
          boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.2)',
        }}
      ></div>

      {/* Top Header with Name and Tagline */}
      <div className='flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 rounded-lg border border-cyberpunk-neon/30 relative overflow-hidden'>
        {/* Geometric corner accents */}
        <div className='absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyberpunk-neon opacity-50'></div>
        <div className='absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyberpunk-neon opacity-50'></div>
        <div className='absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyberpunk-neon opacity-50'></div>
        <div className='absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyberpunk-neon opacity-50'></div>

        <div className='flex items-center space-x-3 relative z-10'>
          <div className='w-10 h-10 bg-cyberpunk-neon/20 border border-cyberpunk-neon rounded flex items-center justify-center'>
            <div className='w-6 h-6 bg-cyberpunk-neon animate-pulse rounded-sm'></div>
          </div>
          <div>
            <h1 className='text-xl font-cyber font-bold cyberpunk-glow tracking-wider'>
              {_trainerName}
            </h1>
            <p className='text-cyberpunk-neon/60 font-mono text-xs'>
              ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
            </p>
          </div>
        </div>

        <div className='text-right relative z-10'>
          <div className='text-cyberpunk-pink font-cyber text-sm font-bold'>
            PROFESSIONAL CARD
          </div>
          <div className='text-cyberpunk-neon/60 font-mono text-xs'>
            ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='w-full space-y-8'>
        {/* Top Row - Profile and Core Services */}
        <div className='w-full grid grid-cols-4 gap-8'>
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
                  {/* Character Image */}
                  <img
                    src={characterProfile}
                    alt='Character Profile'
                    className='w-full h-full object-contain object-center rounded-lg'
                  />

                  {/* Status indicator */}
                  <div className='absolute -top-1 -right-1 w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse'></div>

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
          <div className='col-span-3 bg-gradient-to-r from-cyberpunk-purple/5 to-cyberpunk-blue/5 border border-cyberpunk-neon/20 p-6 relative overflow-hidden'>
            {/* Geometric corner accents */}
            <div className='absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyberpunk-purple/50'></div>
            <div className='absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyberpunk-purple/50'></div>
            <div className='absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyberpunk-purple/50'></div>
            <div className='absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyberpunk-purple/50'></div>

            <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-4 flex items-center space-x-2 relative z-10'>
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
                    <div className='text-lg mb-1 filter drop-shadow-[0_0_8px_currentColor] text-cyberpunk-neon'>
                      {getPlaceholderIcon(service.icon)}
                    </div>
                    <h4
                      className='font-cyber text-xs font-bold leading-tight text-cyberpunk-neon'
                      style={{
                        opacity: 0.9,
                      }}
                    >
                      {service.title}
                    </h4>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Skills & Capabilities Section */}
        <div className='w-full bg-gradient-to-r from-cyberpunk-blue/5 to-cyberpunk-purple/5 border border-cyberpunk-neon/30 p-6 relative overflow-hidden'>
          {/* Geometric corner accents */}
          <div className='absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyberpunk-pink/50'></div>
          <div className='absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyberpunk-pink/50'></div>
          <div className='absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyberpunk-pink/50'></div>
          <div className='absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyberpunk-pink/50'></div>

          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-4 flex items-center space-x-2 relative z-10'>
            <span>SKILLS & CAPABILITIES</span>
            <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse'></div>
          </h3>
          <div className='grid grid-cols-4 gap-3'>
            {skillsCapabilities.map((skill, i) => (
              <div
                key={i}
                className='w-full h-28 bg-gradient-to-br from-cyberpunk-neon/10 to-cyberpunk-blue/20 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 p-4 pt-6 pb-6'
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                }}
                title={skill.description}
              >
                {/* Angular border */}
                <div
                  className='absolute inset-0 border border-cyberpunk-neon/50 group-hover:border-cyberpunk-pink/60 transition-colors duration-300'
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                  }}
                ></div>
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='text-center z-10'>
                  {i === 0 ? (
                    <div className='flex flex-col items-center space-y-2'>
                      <h4 className='font-mono text-xs font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center min-h-[2.5rem] flex items-center justify-center'>
                        AWS Cloud
                        <br />
                        Services
                      </h4>
                      <div className='flex items-center justify-center h-12'>
                        <img
                          src={cloudBadge}
                          alt='Cloud Badge'
                          className='w-12 h-12 flex-shrink-0'
                        />
                      </div>
                    </div>
                  ) : i === 1 ? (
                    <div className='flex flex-col items-center space-y-2'>
                      <h4 className='font-mono text-xs font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center min-h-[2.5rem] flex items-center justify-center'>
                        Python
                        <br />
                        Development
                      </h4>
                      <div className='flex items-center justify-center h-12'>
                        <img
                          src={pythonBadge}
                          alt='Python Badge'
                          className='w-12 h-12 flex-shrink-0'
                        />
                      </div>
                    </div>
                  ) : i === 2 ? (
                    <div className='flex flex-col items-center space-y-2'>
                      <h4 className='font-mono text-xs font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center min-h-[2.5rem] flex items-center justify-center'>
                        SQL & Data Modeling
                      </h4>
                      <div className='flex items-center justify-center h-12'>
                        <img
                          src={databaseBadge}
                          alt='Database Badge'
                          className='w-12 h-12 flex-shrink-0'
                        />
                      </div>
                    </div>
                  ) : i === 3 ? (
                    <div className='flex flex-col items-center space-y-2'>
                      <h4 className='font-mono text-xs font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center min-h-[2.5rem] flex items-center justify-center'>
                        Data Streaming
                        <br />
                        Pipelines
                      </h4>
                      <div className='flex items-center justify-center h-12'>
                        <img
                          src={pipeBadge}
                          alt='Pipeline Badge'
                          className='w-12 h-12 flex-shrink-0'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center space-y-2'>
                      <h4 className='font-mono text-xs font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center min-h-[2.5rem] flex items-center justify-center'>
                        {i === 4 ? (
                          <>
                            Robotics Data
                            <br />
                            Integration
                          </>
                        ) : i === 5 ? (
                          <>
                            ETL & Data
                            <br />
                            Transformation
                          </>
                        ) : i === 6 ? (
                          <>
                            Cross-Team
                            <br />
                            Communication
                          </>
                        ) : i === 7 ? (
                          <>
                            Agile Project
                            <br />
                            Management
                          </>
                        ) : (
                          skill.title
                        )}
                      </h4>
                      <div className='flex items-center justify-center h-12'>
                        {i === 4 ? (
                          <img
                            src={robotBadge}
                            alt='Robot Badge'
                            className='w-12 h-12 flex-shrink-0'
                          />
                        ) : i === 5 ? (
                          <img
                            src={etlBadge}
                            alt='ETL Badge'
                            className='w-12 h-12 flex-shrink-0'
                          />
                        ) : i === 6 ? (
                          <img
                            src={collabBadge}
                            alt='Collaboration Badge'
                            className='w-12 h-12 flex-shrink-0'
                          />
                        ) : i === 7 ? (
                          <img
                            src={checklistBadge}
                            alt='Agile Badge'
                            className='w-12 h-12 flex-shrink-0'
                          />
                        ) : (
                          <span className='text-4xl text-cyberpunk-neon flex-shrink-0 w-12 h-12 flex items-center justify-center'>
                            {skill.icon}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            ))}
          </div>
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
