import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'
import pythonBadge from '../assets/python-badge.png'
import cloudBadge from '../assets/cloud-badge.png'
import databaseBadge from '../assets/database-badge.png'
import etlBadge from '../assets/etl-badge.png'
import robotBadge from '../assets/robot-badge.png'
import pipeBadge from '../assets/pipe-badge.png'
import collabBadge from '../assets/collab-badge.png'
import checklistBadge from '../assets/checklist-badge.png'

interface CoreService {
  id: string
  name: string
  icon: string
  type: 'infrastructure' | 'development' | 'management'
  description: string
  details: string[]
  level: number
}

interface SkillBadge {
  id: string
  name: string
  icon: string
  level: string
  description: string
  category: string
}

interface CharacterInfo {
  id: string
  title: string
  description: string
  stats: string[]
}

interface GameCharacterSheetProps {
  className?: string
  onEnterPortfolio?: () => void
}

// Professional Core Services
const coreServices: CoreService[] = [
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure',
    icon: '☁️',
    type: 'infrastructure',
    description:
      'Infrastructure deployment, data pipelines, and AWS cloud architecture. Building scalable systems that process millions of events daily.',
    details: [
      'AWS IoT Core',
      'Kinesis Data Streams',
      'S3 Data Lakes',
      'CloudFormation IaC',
      '10M+ events processed daily',
    ],
    level: 95,
  },
  {
    id: 'robotics-integration',
    name: 'Robotics Integration',
    icon: '🤖',
    type: 'development',
    description:
      'Telemetry systems, OTA updates, and fleet control for autonomous platforms. Bridging hardware and cloud infrastructure.',
    details: [
      'ROS2 Communication',
      'PX4 Flight Control',
      'MQTT Protocols',
      'Fleet Management',
      '500+ robots deployed',
    ],
    level: 88,
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    icon: '⚡',
    type: 'development',
    description:
      'Firmware development and hardware-software bridge solutions. Low-level programming for production devices.',
    details: [
      'Embedded C/C++',
      'FreeRTOS',
      'STM32/ESP32',
      'Production Firmware',
      'Zero field failures',
    ],
    level: 82,
  },
  {
    id: 'web-applications',
    name: 'Web Applications',
    icon: '🖥️',
    type: 'development',
    description:
      'Dashboards, operator tools, and customer platforms. Modern web applications with real-time data visualization.',
    details: [
      'React/Vue Frameworks',
      'Real-time Dashboards',
      'Fleet Management UI',
      'Global Deployment',
      '200+ operators',
    ],
    level: 85,
  },
  {
    id: 'prototyping-rd',
    name: 'Prototyping & R&D',
    icon: '🔬',
    type: 'development',
    description:
      'MVPs, proof-of-concepts, and rapid prototyping. Validating product ideas through working demonstrations.',
    details: [
      'Hardware Prototyping',
      'AI/ML Integration',
      'MVP Development',
      '3D Printing',
      '$2M+ funding secured',
    ],
    level: 91,
  },
  {
    id: 'team-leadership',
    name: 'Team Leadership',
    icon: '👥',
    type: 'management',
    description:
      'Project management, Agile methodologies, and cross-team delivery. Leading engineering teams through complex projects.',
    details: [
      'Agile/Scrum',
      'Cross-functional Teams',
      'Technical Leadership',
      'Global Coordination',
      '6+ engineers led',
    ],
    level: 78,
  },
]

// Professional Skill Badges
const skillBadges: SkillBadge[] = [
  {
    id: 'python',
    name: 'Python Development',
    icon: pythonBadge,
    level: 'Expert',
    description: 'Data workflows, automation, backend scripting',
    category: 'Programming',
  },
  {
    id: 'cloud',
    name: 'Cloud Architecture',
    icon: cloudBadge,
    level: 'Expert',
    description: 'AWS IoT Core, Kinesis, Glue, S3, Lambda',
    category: 'Infrastructure',
  },
  {
    id: 'data',
    name: 'Data Engineering',
    icon: databaseBadge,
    level: 'Advanced',
    description: 'ETL pipelines, schema design, high-volume processing',
    category: 'Data',
  },
  {
    id: 'etl',
    name: 'ETL Pipelines',
    icon: etlBadge,
    level: 'Advanced',
    description: 'Data transformation, pipeline orchestration',
    category: 'Data',
  },
  {
    id: 'robotics',
    name: 'Robotics Systems',
    icon: robotBadge,
    level: 'Advanced',
    description: 'ROS2, PX4, MQTT protocols',
    category: 'Hardware',
  },
  {
    id: 'pipes',
    name: 'Data Pipelines',
    icon: pipeBadge,
    level: 'Advanced',
    description: 'Stream processing, real-time data flows',
    category: 'Infrastructure',
  },
  {
    id: 'agile',
    name: 'Collaboration & Agile',
    icon: collabBadge,
    level: 'Intermediate',
    description: 'Jira, Notion, Scrum workflows',
    category: 'Process',
  },
  {
    id: 'checklist',
    name: 'Project Management',
    icon: checklistBadge,
    level: 'Intermediate',
    description: 'Task coordination, delivery management',
    category: 'Process',
  },
]

const characterBio: CharacterInfo = {
  id: 'bio',
  title: 'PROFESSIONAL PROFILE',
  description:
    'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. Expert at bridging hardware and software domains to build scalable, production-ready solutions.',
  stats: [
    '5+ years robotics & IoT experience',
    'Led engineering teams across 3 continents',
    'Zero failures across 10K+ devices',
    'Expert in cloud-to-edge integration',
  ],
}

const GameCharacterSheet: React.FC<GameCharacterSheetProps> = ({
  className = '',
  onEnterPortfolio,
}) => {
  const [selectedService, setSelectedService] = useState<CoreService | null>(
    null
  )
  const [inspectedBadge, setInspectedBadge] = useState<SkillBadge | null>(null)
  const [activeInfo, setActiveInfo] = useState<CharacterInfo>(characterBio)

  const handleServiceHover = (service: CoreService) => {
    setSelectedService(service)
    setActiveInfo({
      id: service.id,
      title: service.name.toUpperCase(),
      description: service.description,
      stats: service.details,
    })
  }

  const handleBadgeHover = (badge: SkillBadge) => {
    setInspectedBadge(badge)
    setActiveInfo({
      id: badge.id,
      title: badge.name.toUpperCase(),
      description: badge.description,
      stats: [badge.level, badge.category.toUpperCase(), 'PRODUCTION READY'],
    })
  }

  const resetToDefault = () => {
    setSelectedService(null)
    setInspectedBadge(null)
    setActiveInfo(characterBio)
  }

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyberpunk-neon/60 rounded-3xl shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 0 60px rgba(0, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Holographic Grid Background */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'hologramShift 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner Brackets (Game UI Style) */}
        <div className='absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-cyberpunk-neon animate-pulse' />

        <div className='relative z-10 p-8'>
          {/* Game HUD Header */}
          <motion.div
            className='mb-8'
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className='flex items-center gap-6 mb-4'>
              {/* Character Portrait */}
              <div className='relative'>
                <div className='w-20 h-20 border-3 border-cyberpunk-neon rounded-xl overflow-hidden bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-blue/20 relative'>
                  <img
                    src={characterProfile}
                    alt='Character Portrait'
                    className='w-full h-full object-contain'
                  />
                  {/* Holographic overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/20 via-transparent to-cyberpunk-pink/20 animate-pulse' />
                </div>
                {/* Level indicator */}
                <div className='absolute -top-2 -right-2 bg-cyberpunk-pink border-2 border-cyberpunk-neon rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold'>
                  ∞
                </div>
              </div>

              {/* Character Nameplate */}
              <div className='flex-1'>
                <h1 className='text-4xl font-bold text-cyberpunk-neon mb-2 tracking-wider font-mono'>
                  HARTLEY H. LEROY
                </h1>
                <div className='text-cyberpunk-pink text-lg font-semibold mb-2 tracking-wide'>
                  CREATIVE TECHNOLOGIST • SYSTEMS ARCHITECT
                </div>
                <div className='flex items-center gap-2 text-cyberpunk-green font-mono text-sm'>
                  <div className='w-3 h-3 bg-cyberpunk-green rounded-full animate-ping' />
                  <span>AVAILABLE FOR HIRE</span>
                </div>
              </div>

              {/* Action Terminals */}
              <div className='flex flex-col gap-3'>
                <a
                  href='https://github.com/hhleroy97'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group px-4 py-2 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border-2 border-cyberpunk-green/50 hover:border-cyberpunk-green rounded-lg font-mono text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-green/30'
                >
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                    <span>GITHUB</span>
                  </div>
                </a>

                <a
                  href='https://linkedin.com/in/hartley-h-leroy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group px-4 py-2 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/30 text-cyberpunk-blue border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue rounded-lg font-mono text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-blue/30'
                >
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                    </svg>
                    <span>LINKEDIN</span>
                  </div>
                </a>

                {onEnterPortfolio && (
                  <button
                    onClick={onEnterPortfolio}
                    className='group px-4 py-2 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border-2 border-cyberpunk-pink/50 hover:border-cyberpunk-pink rounded-lg font-mono text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-pink/30'
                  >
                    <div className='flex items-center gap-2'>
                      <svg
                        className='w-4 h-4'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm1-8.5c0-.83-.67-1.5-1.5-1.5S7 7.67 7 8.5 7.67 10 8.5 10s1.5-.67 1.5-1.5zM17 17h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2v-7h2v1.2c.5-.8 1.3-1.2 2.2-1.2 1.9 0 3.8 1.5 3.8 3.5V17z' />
                      </svg>
                      <span>PORTFOLIO</span>
                      <svg
                        className='w-3 h-3 group-hover:translate-x-1 transition-transform'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Skills Row */}
          <motion.div
            className='mb-6'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='flex justify-center'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 w-full max-w-6xl'>
                {skillBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className={`group relative px-3 py-2 bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-blue/20 border-2 border-cyberpunk-neon/40 hover:border-cyberpunk-neon/80 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-cyberpunk-neon/30 ${
                      inspectedBadge?.id === badge.id
                        ? 'border-cyberpunk-neon bg-cyberpunk-neon/20 shadow-lg shadow-cyberpunk-neon/30'
                        : ''
                    }`}
                    onMouseEnter={() => handleBadgeHover(badge)}
                    onMouseLeave={resetToDefault}
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <div className='flex flex-col items-center gap-1'>
                      <div className='w-8 h-8 flex items-center justify-center'>
                        <img
                          src={badge.icon}
                          alt={badge.name}
                          className='w-full h-full object-contain'
                        />
                      </div>
                      <div className='text-center'>
                        <div className='text-cyberpunk-neon font-mono text-xs font-bold leading-tight'>
                          {badge.name}
                        </div>
                        <div className='text-cyberpunk-neon/60 font-mono text-xs'>
                          {badge.level}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Interface */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6'>
            {/* Core Services Menu (Left Side) */}
            <motion.div
              className='lg:col-span-1 space-y-3'
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className='text-cyberpunk-pink font-mono text-lg font-bold mb-4 text-center'>
                CORE SERVICES
              </h2>

              <div className='space-y-2'>
                {coreServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className={`group relative p-3 cursor-pointer transition-all duration-200 ${
                      selectedService?.id === service.id
                        ? 'bg-cyberpunk-purple/30 border-cyberpunk-pink'
                        : 'bg-cyberpunk-purple/10 hover:bg-cyberpunk-purple/20 border-cyberpunk-neon/30 hover:border-cyberpunk-pink/60'
                    } border-2 rounded-lg`}
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                    onMouseEnter={() => handleServiceHover(service)}
                    onMouseLeave={resetToDefault}
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          service.type === 'infrastructure'
                            ? 'bg-cyberpunk-blue'
                            : service.type === 'development'
                              ? 'bg-cyberpunk-pink'
                              : 'bg-cyberpunk-green'
                        }`}
                      />
                      <div className='flex items-center gap-2 flex-1'>
                        <span className='text-lg'>{service.icon}</span>
                        <span className='text-cyberpunk-neon font-mono text-sm font-bold'>
                          {service.name}
                        </span>
                      </div>
                      {selectedService?.id === service.id && (
                        <div className='text-cyberpunk-pink text-xs font-mono'>
                          &gt;
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Service Details (Center) */}
            <motion.div
              className='lg:col-span-3'
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className='h-full bg-gradient-to-br from-cyberpunk-dark/80 to-cyberpunk-dark/60 border-2 border-cyberpunk-neon/40 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden'>
                {/* Scanning line effect */}
                <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-neon to-transparent animate-pulse' />

                <div className='relative z-10 h-full flex flex-col justify-center'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={activeInfo.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='text-center lg:text-left'
                    >
                      <h3 className='text-2xl lg:text-3xl font-bold text-cyberpunk-neon mb-4 font-mono tracking-wider'>
                        {activeInfo.title}
                      </h3>
                      <p className='text-white/90 text-lg leading-relaxed mb-6 max-w-3xl'>
                        {activeInfo.description}
                      </p>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                        {activeInfo.stats.map((stat, index) => (
                          <motion.div
                            key={index}
                            className='flex items-center gap-3 text-cyberpunk-neon/80 font-mono text-sm'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                            {stat}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scanlines overlay */}
        <div className='absolute inset-0 scanlines rounded-3xl pointer-events-none opacity-10' />
      </motion.div>

      <style>{`
        @keyframes hologramShift {
          0%, 100% { opacity: 0.1; transform: translate(0, 0); }
          50% { opacity: 0.3; transform: translate(2px, 2px); }
        }
      `}</style>
    </div>
  )
}

export default GameCharacterSheet
