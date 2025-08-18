import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Cloud,
  Database,
  GitBranch,
  Cpu,
  Zap,
  Users,
  CheckSquare,
} from 'lucide-react'
import characterProfile from '../assets/character-profile.png'

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
  iconType: string
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
    iconType: 'code',
  },
  {
    id: 'cloud',
    title: 'Cloud Architecture',
    description: 'AWS IoT Core, Kinesis, Glue, S3, Lambda',
    category: 'Infrastructure',
    level: 'Expert',
    iconType: 'cloud',
  },
  {
    id: 'dataEng',
    title: 'Data Engineering',
    description: 'ETL pipelines, schema design, high-volume processing',
    category: 'Data',
    level: 'Advanced',
    iconType: 'database',
  },
  {
    id: 'etl',
    title: 'ETL Pipelines',
    description: 'Data transformation, pipeline orchestration',
    category: 'Data',
    level: 'Advanced',
    iconType: 'workflow',
  },
  {
    id: 'robotics',
    title: 'Robotics Systems',
    description: 'ROS2, PX4, MQTT protocols',
    category: 'Hardware',
    level: 'Advanced',
    iconType: 'cpu',
  },
  {
    id: 'dataPipes',
    title: 'Data Pipelines',
    description: 'Stream processing, real-time data flows',
    category: 'Infrastructure',
    level: 'Advanced',
    iconType: 'pipeline',
  },
  {
    id: 'collab',
    title: 'Collaboration & Agile',
    description: 'Jira, Notion, Scrum workflows',
    category: 'Process',
    level: 'Intermediate',
    iconType: 'users',
  },
  {
    id: 'pm',
    title: 'Project Management',
    description: 'Task coordination, delivery management',
    category: 'Process',
    level: 'Intermediate',
    iconType: 'checklist',
  },
]

// Professional Lucide React icons
const renderSkillIcon = (iconType: string) => {
  const iconProps = {
    className: 'w-full h-full text-cyberpunk-neon',
    strokeWidth: 1.5,
  }

  switch (iconType) {
    case 'code':
      return <Code2 {...iconProps} />
    case 'cloud':
      return <Cloud {...iconProps} />
    case 'database':
      return <Database {...iconProps} />
    case 'workflow':
      return <GitBranch {...iconProps} />
    case 'cpu':
      return <Cpu {...iconProps} />
    case 'pipeline':
      return <Zap {...iconProps} />
    case 'users':
      return <Users {...iconProps} />
    case 'checklist':
      return <CheckSquare {...iconProps} />
    default:
      return <Code2 {...iconProps} />
  }
}

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
    <div className='w-full max-w-7xl mx-auto relative'>
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

        <div className='relative z-10 p-2'>
          {/* Compact Header Section */}
          <motion.div
            className='flex items-center gap-3 mb-2 pb-2 border-b border-cyberpunk-neon/30'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Header Content */}
            <div className='flex-1'>
              {/* Name + Tagline */}
              <h1 className='text-lg lg:text-xl font-bold text-cyberpunk-neon mb-1 tracking-wider font-mono'>
                HARTLEY H. LEROY
              </h1>
              <div className='text-cyberpunk-pink text-sm lg:text-base font-semibold tracking-wide'>
                CREATIVE TECHNOLOGIST • SYSTEMS ARCHITECT
              </div>
            </div>

            {/* Compact Action Buttons - Right Aligned */}
            <div className='flex items-center gap-3'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border-2 border-cyberpunk-green/50 hover:border-cyberpunk-green rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105'
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
                className='w-10 h-10 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/30 text-cyberpunk-blue border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105'
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
                  className='px-3 py-2 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border-2 border-cyberpunk-pink/50 hover:border-cyberpunk-pink rounded-lg font-mono text-xs font-bold transition-all duration-300 hover:scale-105'
                >
                  PORTFOLIO
                </button>
              )}
            </div>
          </motion.div>

          {/* Main Content - Layered Layout */}
          <div className='relative space-y-2'>
            {/* Background Grid Pattern for Depth */}
            <div className='absolute inset-0 opacity-5 pointer-events-none'>
              <div
                className='w-full h-full'
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                  animation: 'gridFloat 8s ease-in-out infinite',
                }}
              />
            </div>

            <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-2 lg:items-stretch'>
              {/* Left Panel: Core Services Navigation */}
              <motion.div
                className='lg:col-span-3 relative'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {/* Services Panel */}
                <div className='relative bg-slate-800/60 border border-slate-600/40 rounded-xl p-4 backdrop-blur-sm h-full'>
                  <div className='relative z-10'>
                    <h2 className='text-cyberpunk-neon font-mono text-lg font-bold mb-4'>
                      CORE SERVICES
                    </h2>

                    <div className='space-y-2'>
                      {services.map((service, index) => (
                        <motion.button
                          key={service.id}
                          className={`group w-full text-left relative p-3 cursor-pointer transition-all duration-200 rounded-lg border ${
                            selectedItem === `service-${service.id}`
                              ? 'bg-cyberpunk-neon/15 border-cyberpunk-neon text-white'
                              : 'bg-slate-700/30 hover:bg-slate-600/40 border-slate-600/50 hover:border-cyberpunk-neon/40 text-slate-200'
                          }`}
                          onMouseEnter={() => handleServiceHover(service)}
                          onMouseLeave={resetToProfile}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 1 }}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='font-mono text-sm font-medium'>
                              {service.title}
                            </div>
                            <div
                              className={`text-xs transition-opacity duration-200 ${
                                selectedItem === `service-${service.id}`
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover:opacity-60'
                              }`}
                            >
                              →
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Panel: Dominant Info Display */}
              <motion.div
                className='lg:col-span-6 relative'
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className='relative bg-slate-800/60 border border-slate-600/40 rounded-xl p-4 backdrop-blur-sm h-full'>
                  {/* Info Content with Clear Hierarchy */}
                  <div className='relative z-10'>
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeContent.title}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {/* Section Label */}
                        <div className='text-cyberpunk-neon/60 font-mono text-sm font-bold mb-2 tracking-wider'>
                          {activeContent.type === 'profile'
                            ? 'PROFESSIONAL OVERVIEW'
                            : activeContent.type === 'service'
                              ? 'SERVICE DETAILS'
                              : 'SKILL ANALYSIS'}
                        </div>

                        {/* Main Title - Big, Bold, Glowing */}
                        <div className='flex items-center gap-4 mb-6'>
                          <h3 className='text-3xl lg:text-4xl font-bold text-cyberpunk-neon font-mono tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]'>
                            {activeContent.title}
                          </h3>
                          {activeContent.level && (
                            <div className='bg-cyberpunk-pink/30 border-2 border-cyberpunk-pink rounded-full px-4 py-2 shadow-lg shadow-cyberpunk-pink/30'>
                              <span className='text-cyberpunk-pink font-mono text-sm font-bold'>
                                LVL {activeContent.level}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description - Subdued but Clear */}
                        <div className='mb-6'>
                          <div className='text-cyberpunk-neon/70 font-mono text-xs font-bold mb-2 tracking-wider'>
                            DESCRIPTION
                          </div>
                          <p className='text-white/90 text-lg leading-relaxed max-w-none'>
                            {activeContent.description}
                          </p>
                        </div>

                        {/* Highlights - Glowing Bullets/Tags */}
                        <div>
                          <div className='text-cyberpunk-neon/70 font-mono text-xs font-bold mb-3 tracking-wider'>
                            HIGHLIGHTS
                          </div>
                          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            {activeContent.stats.map((stat, index) => (
                              <motion.div
                                key={index}
                                className='group flex items-center gap-3 p-2 rounded-lg bg-cyberpunk-neon/5 hover:bg-cyberpunk-neon/10 transition-all duration-200'
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className='w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse shadow-lg shadow-cyberpunk-green/50' />
                                <span className='text-cyberpunk-neon/90 font-mono text-sm font-medium'>
                                  {stat}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Depth Corner Effects */}
                  <div className='absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-cyberpunk-neon/10 to-transparent rounded-tl-full' />
                  <div className='absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyberpunk-pink/10 to-transparent rounded-br-full' />
                </div>
              </motion.div>

              {/* Right Panel: Character Sprite */}
              <motion.div
                className='lg:col-span-3 relative'
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className='relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-2 border-cyberpunk-pink/30 rounded-xl p-4 backdrop-blur-sm h-full flex items-center justify-center'>
                  {/* Sprite Glow */}
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyberpunk-pink/5 to-cyberpunk-neon/5' />
                  <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-pink/60 to-transparent' />

                  {/* Character Sprite - Large */}
                  <div className='relative w-full h-full flex items-center justify-center'>
                    <div className='w-full h-full max-w-[90%] max-h-[90%] aspect-square border-3 border-cyberpunk-neon rounded-2xl overflow-hidden shadow-2xl shadow-cyberpunk-neon/30'>
                      <img
                        src={characterProfile}
                        alt='Hartley H. Leroy'
                        className='w-full h-full object-contain bg-gradient-to-br from-slate-900 to-slate-800'
                      />
                    </div>
                    {/* Sprite Glow Effect */}
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyberpunk-neon/20 via-transparent to-cyberpunk-pink/20 animate-pulse' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills Section - Collectible Badge Grid */}
            <motion.div
              className='relative mt-4'
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {/* Skills Panel */}
              <div className='relative bg-slate-800/60 border border-slate-600/40 rounded-xl p-4 backdrop-blur-sm'>
                <div className='relative z-10'>
                  <h2 className='text-cyberpunk-neon font-mono text-lg font-bold mb-4'>
                    SKILLS
                  </h2>

                  {/* Badge Grid with Proper Spacing */}
                  <div className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2'>
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        className={`group relative cursor-pointer transition-all duration-300 ${
                          selectedItem === `skill-${skill.id}`
                            ? 'scale-110 z-10'
                            : 'hover:scale-105'
                        }`}
                        onMouseEnter={() => handleSkillHover(skill)}
                        onMouseLeave={resetToProfile}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: index * 0.1 + 1.4, duration: 0.5 }}
                      >
                        {/* Badge Container */}
                        <div
                          className={`relative p-4 rounded-lg border transition-all duration-200 aspect-square flex flex-col items-center justify-center ${
                            selectedItem === `skill-${skill.id}`
                              ? 'bg-cyberpunk-neon/15 border-cyberpunk-neon'
                              : 'bg-slate-800/30 hover:bg-slate-700/40 border-slate-600/50 hover:border-cyberpunk-neon/40'
                          }`}
                        >
                          <div className='relative z-10 flex flex-col items-center justify-center h-full'>
                            {/* Icon */}
                            <div className='w-12 h-12 mb-2 relative flex-shrink-0'>
                              <div className='transition-transform duration-300 group-hover:scale-110'>
                                {renderSkillIcon(skill.iconType)}
                              </div>
                            </div>

                            {/* Title */}
                            <div className='text-cyberpunk-neon font-mono text-sm font-bold leading-tight text-center'>
                              {skill.title.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className='mt-2 pt-2 border-t border-cyberpunk-neon/30 text-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className='text-cyberpunk-neon/60 font-mono text-sm'>
              [ Interactive Analysis Ready • Hover Services & Skills for Details
              ]
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
        @keyframes gridFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(12px, 12px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6); }
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossier
