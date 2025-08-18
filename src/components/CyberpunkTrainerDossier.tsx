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

interface Service {
  id: string
  title: string
  description: string
  details: string[]
  level: number
}

interface Skill {
  id: string
  title: string
  description: string
  category: string
  level: string
  icon: string
}

interface InfoContent {
  type: 'profile' | 'service' | 'skill'
  title: string
  description: string
  stats: string[]
  level?: number
}

interface CyberpunkTrainerDossierProps {
  onEnterPortfolio?: () => void
}

const profile = {
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

const services: Service[] = [
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
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
    id: 'robotics',
    title: 'Robotics Integration',
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
    id: 'embedded',
    title: 'Embedded Systems',
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
    id: 'web',
    title: 'Web Applications',
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
    id: 'prototyping',
    title: 'Prototyping & R&D',
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
    id: 'leadership',
    title: 'Team Leadership',
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

const skills: Skill[] = [
  {
    id: 'python',
    title: 'Python Development',
    description: 'Data workflows, automation, backend scripting',
    category: 'Programming',
    level: 'Expert',
    icon: pythonBadge,
  },
  {
    id: 'cloud',
    title: 'Cloud Architecture',
    description: 'AWS IoT Core, Kinesis, Glue, S3, Lambda',
    category: 'Infrastructure',
    level: 'Expert',
    icon: cloudBadge,
  },
  {
    id: 'dataEng',
    title: 'Data Engineering',
    description: 'ETL pipelines, schema design, high-volume processing',
    category: 'Data',
    level: 'Advanced',
    icon: databaseBadge,
  },
  {
    id: 'etl',
    title: 'ETL Pipelines',
    description: 'Data transformation, pipeline orchestration',
    category: 'Data',
    level: 'Advanced',
    icon: etlBadge,
  },
  {
    id: 'robotics',
    title: 'Robotics Systems',
    description: 'ROS2, PX4, MQTT protocols',
    category: 'Hardware',
    level: 'Advanced',
    icon: robotBadge,
  },
  {
    id: 'dataPipes',
    title: 'Data Pipelines',
    description: 'Stream processing, real-time data flows',
    category: 'Infrastructure',
    level: 'Advanced',
    icon: pipeBadge,
  },
  {
    id: 'collab',
    title: 'Collaboration & Agile',
    description: 'Jira, Notion, Scrum workflows',
    category: 'Process',
    level: 'Intermediate',
    icon: collabBadge,
  },
  {
    id: 'pm',
    title: 'Project Management',
    description: 'Task coordination, delivery management',
    category: 'Process',
    level: 'Intermediate',
    icon: checklistBadge,
  },
]

const CyberpunkTrainerDossier: React.FC<CyberpunkTrainerDossierProps> = ({
  onEnterPortfolio,
}) => {
  const [activeContent, setActiveContent] = useState<InfoContent>({
    type: 'profile',
    title: profile.title,
    description: profile.description,
    stats: profile.stats,
  })

  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleServiceHover = (service: Service) => {
    setActiveContent({
      type: 'service',
      title: service.title.toUpperCase(),
      description: service.description,
      stats: service.details,
      level: service.level,
    })
    setSelectedItem(`service-${service.id}`)
  }

  const handleSkillHover = (skill: Skill) => {
    setActiveContent({
      type: 'skill',
      title: skill.title.toUpperCase(),
      description: skill.description,
      stats: [skill.level, skill.category, 'Production Ready'],
    })
    setSelectedItem(`skill-${skill.id}`)
  }

  const resetToProfile = () => {
    setActiveContent({
      type: 'profile',
      title: profile.title,
      description: profile.description,
      stats: profile.stats,
    })
    setSelectedItem(null)
  }

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <motion.div
        className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyberpunk-neon/60 rounded-3xl shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 0 80px rgba(0, 255, 255, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Grid Background */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'gridPulse 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner Brackets */}
        <div className='absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-cyberpunk-neon animate-pulse' />

        <div className='relative z-10 p-6'>
          {/* Header Section */}
          <motion.div
            className='flex items-center justify-between mb-6 pb-4 border-b border-cyberpunk-neon/30'
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Left: Avatar */}
            <div className='relative'>
              <div className='w-16 h-16 border-3 border-cyberpunk-neon rounded-xl overflow-hidden bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-blue/20 relative'>
                <img
                  src={characterProfile}
                  alt='Hartley H. Leroy'
                  className='w-full h-full object-contain'
                />
                <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/20 via-transparent to-cyberpunk-pink/20 animate-pulse' />
              </div>
              <div className='absolute -top-1 -right-1 bg-cyberpunk-pink border-2 border-cyberpunk-neon rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
                ∞
              </div>
            </div>

            {/* Center: Name + Tagline */}
            <div className='flex-1 text-center mx-6'>
              <h1 className='text-2xl lg:text-3xl font-bold text-cyberpunk-neon mb-1 tracking-wider font-mono'>
                HARTLEY H. LEROY
              </h1>
              <div className='text-cyberpunk-pink text-base font-semibold tracking-wide'>
                CREATIVE TECHNOLOGIST • SYSTEMS ARCHITECT
              </div>
            </div>

            {/* Right: Status + Links */}
            <div className='flex flex-col items-end gap-3'>
              <div className='flex items-center gap-2 bg-cyberpunk-green/20 border border-cyberpunk-green/60 rounded-full px-4 py-2'>
                <div className='w-3 h-3 bg-cyberpunk-green rounded-full animate-ping' />
                <span className='text-cyberpunk-green font-mono text-sm font-bold'>
                  AVAILABLE FOR HIRE
                </span>
              </div>

              <div className='flex gap-2'>
                <a
                  href='https://github.com/hhleroy97'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border border-cyberpunk-green/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                </a>

                <a
                  href='https://linkedin.com/in/hartley-h-leroy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/30 text-cyberpunk-blue border border-cyberpunk-blue/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </a>

                {onEnterPortfolio && (
                  <button
                    onClick={onEnterPortfolio}
                    className='px-4 py-2 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border border-cyberpunk-pink/50 rounded-lg font-mono text-sm transition-all duration-200 hover:scale-105'
                  >
                    PORTFOLIO
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='space-y-6'>
            {/* Top Row: Core Services and Professional Profile */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Left: Core Services */}
              <motion.div
                className='space-y-4'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className='text-cyberpunk-pink font-mono text-lg font-bold mb-3 flex items-center gap-2'>
                  <div className='w-3 h-3 bg-cyberpunk-pink rounded-full animate-pulse' />
                  CORE SERVICES
                </h2>
                <div className='space-y-2'>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      className={`group relative p-2.5 cursor-pointer transition-all duration-200 rounded-lg border-2 ${
                        selectedItem === `service-${service.id}`
                          ? 'bg-cyberpunk-purple/30 border-cyberpunk-pink shadow-lg shadow-cyberpunk-pink/30'
                          : 'bg-cyberpunk-purple/10 hover:bg-cyberpunk-purple/20 border-cyberpunk-neon/30 hover:border-cyberpunk-pink/60'
                      }`}
                      onMouseEnter={() => handleServiceHover(service)}
                      onMouseLeave={resetToProfile}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <div className='flex items-center justify-between'>
                        <span className='text-cyberpunk-neon font-mono text-sm font-bold'>
                          {service.title}
                        </span>
                        <div className='flex items-center gap-2'>
                          <span className='text-cyberpunk-neon/60 font-mono text-xs'>
                            LVL {service.level}
                          </span>
                          {selectedItem === `service-${service.id}` && (
                            <div className='text-cyberpunk-pink text-xs font-mono'>
                              &gt;
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Info Panel (Professional Profile) */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className='h-full bg-gradient-to-br from-cyberpunk-dark/90 to-cyberpunk-dark/70 border-3 border-cyberpunk-neon/60 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden min-h-[280px]'>
                  {/* Parallax Background */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-2xl' />

                  {/* Scanning Line */}
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-neon to-transparent animate-pulse' />

                  {/* Info Content */}
                  <div className='relative z-10 h-full flex flex-col justify-center'>
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeContent.title}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className='flex items-center gap-4 mb-4'>
                          <h3 className='text-2xl lg:text-3xl font-bold text-cyberpunk-neon font-mono tracking-wider'>
                            {activeContent.title}
                          </h3>
                          {activeContent.level && (
                            <div className='bg-cyberpunk-pink/20 border border-cyberpunk-pink rounded-full px-3 py-1'>
                              <span className='text-cyberpunk-pink font-mono text-sm font-bold'>
                                LVL {activeContent.level}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className='text-white/90 text-base leading-relaxed mb-4'>
                          {activeContent.description}
                        </p>

                        <div className='grid grid-cols-1 gap-2'>
                          {activeContent.stats.map((stat, index) => (
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

                  {/* Depth Effects */}
                  <div className='absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyberpunk-neon/10 to-transparent rounded-tl-full' />
                  <div className='absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyberpunk-pink/10 to-transparent rounded-br-full' />
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: Skills in Single Row */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className='text-cyberpunk-pink font-mono text-lg font-bold mb-3 flex items-center gap-2'>
                <div className='w-3 h-3 bg-cyberpunk-pink rounded-full animate-pulse' />
                SKILLS
              </h2>
              <div className='grid grid-cols-4 lg:grid-cols-8 gap-3'>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className={`group relative p-2.5 cursor-pointer transition-all duration-200 rounded-xl border-2 ${
                      selectedItem === `skill-${skill.id}`
                        ? 'bg-cyberpunk-neon/20 border-cyberpunk-neon shadow-lg shadow-cyberpunk-neon/30'
                        : 'bg-cyberpunk-blue/10 hover:bg-cyberpunk-blue/20 border-cyberpunk-neon/30 hover:border-cyberpunk-neon/60'
                    }`}
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={resetToProfile}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 1 }}
                  >
                    <div className='text-center'>
                      <div className='w-6 h-6 mx-auto mb-1'>
                        <img
                          src={skill.icon}
                          alt={skill.title}
                          className='w-full h-full object-contain'
                        />
                      </div>
                      <div className='text-cyberpunk-neon font-mono text-xs font-bold leading-tight'>
                        {skill.title.split(' ')[0]}
                      </div>
                      <div className='text-cyberpunk-neon/60 font-mono text-xs'>
                        {skill.level}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className='mt-6 pt-3 border-t border-cyberpunk-neon/30 text-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className='text-cyberpunk-neon/60 font-mono text-sm'>
              [ Hover or select a service or skill to analyze capabilities ]
            </div>
          </motion.div>
        </div>

        {/* Scanlines Overlay */}
        <div className='absolute inset-0 scanlines rounded-3xl pointer-events-none opacity-10' />
      </motion.div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossier
