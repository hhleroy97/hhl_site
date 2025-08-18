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

        {/* Enlarged Sprite - Central Anchor */}
        <motion.div
          className='absolute -top-8 left-1/2 transform -translate-x-1/2 z-30'
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <div className='relative'>
            {/* Sprite Glow Effect */}
            <div className='absolute inset-0 bg-cyberpunk-neon/30 rounded-2xl blur-xl animate-pulse scale-110' />
            <div className='absolute inset-0 bg-cyberpunk-pink/20 rounded-2xl blur-2xl animate-pulse scale-125' />

            {/* Main Sprite Container */}
            <div className='relative w-32 h-32 lg:w-40 lg:h-40 border-4 border-cyberpunk-neon rounded-2xl overflow-hidden bg-gradient-to-br from-cyberpunk-neon/20 via-cyberpunk-dark/80 to-cyberpunk-blue/20 backdrop-blur-sm'>
              <img
                src={characterProfile}
                alt='Hartley H. Leroy'
                className='w-full h-full object-contain relative z-10'
              />
              <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/20 via-transparent to-cyberpunk-pink/20 animate-pulse' />

              {/* Level Badge */}
              <div className='absolute -top-2 -right-2 bg-cyberpunk-pink border-3 border-cyberpunk-neon rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg shadow-cyberpunk-pink/50'>
                ∞
              </div>

              {/* Status Indicator */}
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyberpunk-green/90 border-2 border-cyberpunk-green rounded-full px-3 py-1'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-ping' />
                  <span className='text-cyberpunk-green font-mono text-xs font-bold'>
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className='relative z-10 pt-20 lg:pt-24 px-6 pb-6'>
          {/* Header Section */}
          <motion.div
            className='text-center mb-8 pb-6 border-b border-cyberpunk-neon/30'
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Name + Tagline */}
            <h1 className='text-3xl lg:text-4xl font-bold text-cyberpunk-neon mb-2 tracking-wider font-mono'>
              HARTLEY H. LEROY
            </h1>
            <div className='text-cyberpunk-pink text-lg lg:text-xl font-semibold tracking-wide mb-4'>
              CREATIVE TECHNOLOGIST • SYSTEMS ARCHITECT
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center gap-4 mt-6'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='group px-6 py-3 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border-2 border-cyberpunk-green/50 hover:border-cyberpunk-green rounded-xl font-mono text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-green/30'
              >
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                  GITHUB
                </div>
              </a>

              <a
                href='https://linkedin.com/in/hartley-h-leroy'
                target='_blank'
                rel='noopener noreferrer'
                className='group px-6 py-3 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/30 text-cyberpunk-blue border-2 border-cyberpunk-blue/50 hover:border-cyberpunk-blue rounded-xl font-mono text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-blue/30'
              >
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                  LINKEDIN
                </div>
              </a>

              {onEnterPortfolio && (
                <button
                  onClick={onEnterPortfolio}
                  className='group px-6 py-3 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border-2 border-cyberpunk-pink/50 hover:border-cyberpunk-pink rounded-xl font-mono text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-pink/30'
                >
                  ENTER PORTFOLIO
                </button>
              )}
            </div>
          </motion.div>

          {/* Main Content - Layered Layout */}
          <div className='relative space-y-6'>
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

            <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-6'>
              {/* Left Panel: Core Services Navigation */}
              <motion.div
                className='lg:col-span-4 relative'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {/* Services Panel with Inset Effect */}
                <div className='relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-cyberpunk-neon/30 rounded-2xl p-6 backdrop-blur-sm'>
                  {/* Inset Glow */}
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyberpunk-neon/5 to-cyberpunk-purple/5' />
                  <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/60 to-transparent' />

                  <div className='relative z-10'>
                    <h2 className='text-cyberpunk-pink font-mono text-xl font-bold mb-6 flex items-center gap-3'>
                      <div className='w-4 h-4 bg-cyberpunk-pink rounded-full animate-pulse shadow-lg shadow-cyberpunk-pink/50' />
                      CORE SERVICES
                    </h2>

                    <div className='space-y-3'>
                      {services.map((service, index) => (
                        <motion.button
                          key={service.id}
                          className={`group w-full text-left relative p-4 cursor-pointer transition-all duration-300 rounded-xl border-2 overflow-hidden ${
                            selectedItem === `service-${service.id}`
                              ? 'bg-cyberpunk-purple/40 border-cyberpunk-pink shadow-lg shadow-cyberpunk-pink/30 scale-105'
                              : 'bg-cyberpunk-purple/10 hover:bg-cyberpunk-purple/25 border-cyberpunk-neon/30 hover:border-cyberpunk-pink/60 hover:scale-102'
                          }`}
                          onMouseEnter={() => handleServiceHover(service)}
                          onMouseLeave={resetToProfile}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 1 }}
                        >
                          {/* Button Glow Effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${
                              selectedItem === `service-${service.id}`
                                ? 'from-cyberpunk-pink/20 to-cyberpunk-purple/20 opacity-100'
                                : 'from-cyberpunk-neon/10 to-cyberpunk-blue/10 opacity-0 group-hover:opacity-100'
                            }`}
                          />

                          <div className='relative z-10 flex items-center justify-between'>
                            <div>
                              <div className='text-cyberpunk-neon font-mono text-sm font-bold mb-1'>
                                {service.title}
                              </div>
                              <div className='text-cyberpunk-neon/60 font-mono text-xs'>
                                LVL {service.level}
                              </div>
                            </div>

                            <div
                              className={`text-cyberpunk-pink text-lg font-mono transition-all duration-300 ${
                                selectedItem === `service-${service.id}`
                                  ? 'opacity-100 translate-x-0'
                                  : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                              }`}
                            >
                              ▶
                            </div>
                          </div>

                          {/* Glowing Divider */}
                          <div
                            className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r transition-opacity duration-300 ${
                              selectedItem === `service-${service.id}`
                                ? 'from-cyberpunk-pink/60 via-cyberpunk-neon/40 to-cyberpunk-pink/60 opacity-100'
                                : 'from-cyberpunk-neon/30 via-cyberpunk-neon/10 to-cyberpunk-neon/30 opacity-30 group-hover:opacity-60'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel: Dominant Info Display */}
              <motion.div
                className='lg:col-span-8 relative'
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className='relative bg-gradient-to-br from-cyberpunk-dark/95 to-slate-900/95 border-3 border-cyberpunk-neon/60 rounded-2xl p-8 backdrop-blur-sm overflow-hidden min-h-[350px]'>
                  {/* Animated Background Pattern */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-2xl' />
                  <div className='absolute inset-0 opacity-10'>
                    <div
                      className='w-full h-full'
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                        animation: 'pulse 4s ease-in-out infinite',
                      }}
                    />
                  </div>

                  {/* Scanning Lines */}
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyberpunk-neon to-transparent animate-pulse' />
                  <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyberpunk-pink to-transparent animate-pulse' />

                  {/* Info Content with Clear Hierarchy */}
                  <div className='relative z-10 h-full flex flex-col justify-center'>
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
            </div>

            {/* Skills Section - Collectible Badge Grid */}
            <motion.div
              className='relative mt-8'
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {/* Skills Panel with Breathing Room */}
              <div className='relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-2 border-cyberpunk-blue/30 rounded-2xl p-6 backdrop-blur-sm'>
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyberpunk-blue/5 to-cyberpunk-purple/5' />
                <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-blue/60 to-transparent' />

                <div className='relative z-10'>
                  <h2 className='text-cyberpunk-blue font-mono text-xl font-bold mb-6 flex items-center gap-3'>
                    <div className='w-4 h-4 bg-cyberpunk-blue rounded-full animate-pulse shadow-lg shadow-cyberpunk-blue/50' />
                    SKILL BADGES
                  </h2>

                  {/* Badge Grid with Proper Spacing */}
                  <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
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
                          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                            selectedItem === `skill-${skill.id}`
                              ? 'bg-cyberpunk-neon/25 border-cyberpunk-neon shadow-xl shadow-cyberpunk-neon/40'
                              : 'bg-cyberpunk-blue/10 hover:bg-cyberpunk-blue/20 border-cyberpunk-neon/30 hover:border-cyberpunk-neon/60'
                          }`}
                        >
                          {/* Badge Glow Effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                              selectedItem === `skill-${skill.id}`
                                ? 'from-cyberpunk-neon/20 to-cyberpunk-blue/20 opacity-100'
                                : 'from-cyberpunk-blue/10 to-cyberpunk-neon/10 opacity-0 group-hover:opacity-100'
                            }`}
                          />

                          {/* Idle Shimmer Effect */}
                          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out' />

                          <div className='relative z-10 text-center'>
                            {/* Icon */}
                            <div className='w-12 h-12 mx-auto mb-3 relative'>
                              <img
                                src={skill.icon}
                                alt={skill.title}
                                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                              />
                              {selectedItem === `skill-${skill.id}` && (
                                <div className='absolute inset-0 bg-cyberpunk-neon/20 rounded-full animate-ping' />
                              )}
                            </div>

                            {/* Title */}
                            <div className='text-cyberpunk-neon font-mono text-sm font-bold leading-tight mb-1'>
                              {skill.title}
                            </div>

                            {/* Level Badge */}
                            <div
                              className={`inline-block px-2 py-1 rounded-full border transition-all duration-300 ${
                                selectedItem === `skill-${skill.id}`
                                  ? 'bg-cyberpunk-neon/20 border-cyberpunk-neon text-cyberpunk-neon'
                                  : 'bg-cyberpunk-blue/20 border-cyberpunk-blue/50 text-cyberpunk-blue'
                              }`}
                            >
                              <span className='font-mono text-xs font-bold'>
                                {skill.level}
                              </span>
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
            className='mt-8 pt-4 border-t border-cyberpunk-neon/30 text-center'
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
