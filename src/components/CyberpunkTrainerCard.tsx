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
  onEnterPortfolio?: () => void
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
  onEnterPortfolio,
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
  const getPlaceholderIcon = (icon?: string) => {
    return icon || '📦'
  }

  return (
    <div className={className}>
      <div
        className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-[2rem] shadow-2xl transform scale-150`}
        style={{
          aspectRatio: '3.5 / 2',
          maxWidth: '1000px',
          width: '100%',
          height: 'auto',
          boxShadow:
            '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
          background: `
            linear-gradient(145deg, #1e293b, #0f172a),
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
          border: '1px solid rgba(148, 163, 184, 0.2)',
        }}
      >
        {/* Holographic overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 rounded-[2rem] pointer-events-none' />

        {/* Top Header with Name and Tagline */}
        <div
          className='flex items-center mb-2 px-3 py-1 bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 rounded-md border border-cyberpunk-neon/30 relative overflow-hidden shadow-2xl'
          style={{
            transform: 'translateZ(120px)',
            boxShadow:
              '0 60px 120px rgba(0, 0, 0, 0.4), 0 30px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className='flex items-center justify-between w-full relative z-10'>
            <div className='flex items-center space-x-2'>
              <div
                className='w-6 h-6 bg-cyberpunk-neon/20 border border-cyberpunk-neon rounded flex items-center justify-center shadow-2xl'
                style={{}}
              >
                <div
                  className='w-3 h-3 bg-cyberpunk-neon animate-pulse rounded-sm shadow-xl'
                  style={{}}
                />
              </div>
              <div className='shadow-xl' style={{}}>
                <h1
                  className='text-sm font-cyber font-bold cyberpunk-glow tracking-wider shadow-lg'
                  style={{}}
                >
                  {_trainerName}
                </h1>
                <p
                  className='text-cyberpunk-neon/60 font-mono text-[8px] shadow-md'
                  style={{}}
                >
                  ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div
              className='flex items-center space-x-1 mr-2 shadow-2xl'
              style={{}}
            >
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative w-6 h-6 bg-gradient-to-r from-cyberpunk-green/20 to-cyberpunk-blue/20 text-cyberpunk-green font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-green/30 hover:shadow-lg hover:shadow-cyberpunk-green/30 hover:scale-105 flex items-center justify-center rounded'
              >
                <svg
                  className='w-3 h-3 relative z-10'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
                <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-green/10 to-cyberpunk-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded' />
              </a>

              <a
                href='https://linkedin.com/in/hartley-leroy'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative w-6 h-6 bg-gradient-to-r from-cyberpunk-blue/20 to-cyberpunk-purple/20 text-cyberpunk-blue font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-blue/30 hover:shadow-lg hover:shadow-cyberpunk-blue/30 hover:scale-105 flex items-center justify-center rounded'
              >
                <svg
                  className='w-3 h-3 relative z-10'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
                <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/10 to-cyberpunk-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded' />
              </a>

              {/* Portfolio Website Button */}
              {onEnterPortfolio && (
                <button
                  onClick={onEnterPortfolio}
                  className='group relative w-6 h-6 bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-pink/20 text-cyberpunk-neon font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-neon/30 hover:shadow-lg hover:shadow-cyberpunk-neon/30 hover:scale-105 flex items-center justify-center rounded'
                >
                  <svg
                    className='w-3 h-3 relative z-10'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM18.92 8h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z' />
                  </svg>
                  <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-neon/10 to-cyberpunk-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded' />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className='w-full space-y-4 relative z-10' style={{}}>
          {/* Top Row - Profile and Core Services */}
          <div className='w-full grid grid-cols-4 gap-4'>
            {/* Profile Section - 1/4 width */}
            <div className='col-span-1 relative'>
              <div
                className='relative h-64 bg-gradient-to-r from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 rounded-lg overflow-hidden shadow-xl'
                style={{}}
              >
                {/* Character Image with Status */}
                <div className='absolute inset-2 flex items-center justify-center'>
                  <div className='relative w-full h-full'>
                    <img
                      src={characterProfile}
                      alt='Character Profile'
                      className='w-full h-full object-contain object-center rounded-lg'
                      style={{}}
                    />
                    <div
                      className='absolute -top-1 -right-1 w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse'
                      style={{}}
                    />
                    <div
                      className='absolute bottom-2 left-0 right-0 text-center'
                      style={{}}
                    >
                      <div
                        className='text-cyberpunk-green font-cyber text-xs font-bold mb-1'
                        style={{}}
                      >
                        AVAILABLE FOR HIRE
                      </div>
                      <div
                        className='text-cyberpunk-neon/60 font-mono text-[10px] leading-tight'
                        style={{ transform: 'translateZ(5px)' }}
                      >
                        Full-Stack Engineer
                      </div>
                    </div>
                  </div>
                </div>
                <div className='absolute inset-0 scanlines' />
              </div>

              {/* Vertical separator line */}
              <div className='absolute top-0 -right-2 h-full w-px bg-gradient-to-b from-transparent via-cyberpunk-neon/40 to-transparent'></div>
            </div>

            {/* Core Services Section - 3/4 width */}
            <div
              className='col-span-3 bg-gradient-to-r from-cyberpunk-purple/5 to-cyberpunk-blue/5 border border-cyberpunk-neon/20 p-4 relative overflow-hidden shadow-lg'
              style={{}}
            >
              <h3
                className='text-cyberpunk-pink font-cyber text-xs font-bold tracking-wider mb-3 flex items-center space-x-2 relative z-10'
                style={{}}
              >
                <span>CORE SERVICES</span>
                <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
              </h3>
              <div className='grid grid-cols-3 gap-1'>
                {coreServices.map((service, i) => (
                  <div
                    key={i}
                    className='aspect-[5/3] bg-gradient-to-br from-cyberpunk-purple/20 to-cyberpunk-blue/20 border border-cyberpunk-neon/40 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300 p-1'
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
                    <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row - Skills & Capabilities Section */}
          <div
            className='w-full bg-gradient-to-r from-cyberpunk-blue/5 to-cyberpunk-purple/5 border border-cyberpunk-neon/30 p-4 relative overflow-hidden shadow-md rounded-b-2xl'
            style={{}}
          >
            <h3
              className='text-cyberpunk-pink font-cyber text-xs font-bold tracking-wider mb-3 flex items-center space-x-2 relative z-10'
              style={{}}
            >
              <span>SKILLS & CAPABILITIES</span>
              <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
            </h3>
            <div className='grid grid-cols-8 gap-2'>
              {skillsCapabilities.map((skill, i) => (
                <div
                  key={i}
                  className='w-full h-16 bg-gradient-to-br from-cyberpunk-neon/10 to-cyberpunk-blue/20 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 p-2'
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                  }}
                  title={skill.description}
                >
                  <div
                    className='absolute inset-0 border border-cyberpunk-neon/50 group-hover:border-cyberpunk-pink/60 transition-colors duration-300'
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <div className='text-center z-10'>
                    <div className='flex flex-col items-center space-y-1'>
                      <div className='flex items-center justify-center h-8'>
                        {i === 0 ? (
                          <img
                            src={cloudBadge}
                            alt='Cloud Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 1 ? (
                          <img
                            src={pythonBadge}
                            alt='Python Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 2 ? (
                          <img
                            src={databaseBadge}
                            alt='Database Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 3 ? (
                          <img
                            src={pipeBadge}
                            alt='Pipeline Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 4 ? (
                          <img
                            src={robotBadge}
                            alt='Robot Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 5 ? (
                          <img
                            src={etlBadge}
                            alt='ETL Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 6 ? (
                          <img
                            src={collabBadge}
                            alt='Collaboration Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : i === 7 ? (
                          <img
                            src={checklistBadge}
                            alt='Agile Badge'
                            className='w-8 h-8 flex-shrink-0'
                          />
                        ) : (
                          <span className='text-xl text-cyberpunk-neon flex-shrink-0 w-8 h-8 flex items-center justify-center'>
                            {skill.icon}
                          </span>
                        )}
                      </div>
                      <h4 className='font-mono text-[8px] font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center'>
                        {i === 0
                          ? 'AWS'
                          : i === 1
                            ? 'PYTHON'
                            : i === 2
                              ? 'SQL'
                              : i === 3
                                ? 'PIPELINES'
                                : i === 4
                                  ? 'ROBOTICS'
                                  : i === 5
                                    ? 'ETL'
                                    : i === 6
                                      ? 'COLLAB'
                                      : i === 7
                                        ? 'AGILE'
                                        : skill.title.split(' ')[0]}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCard
