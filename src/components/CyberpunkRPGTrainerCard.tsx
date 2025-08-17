import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'

interface ServiceItem {
  id: string
  category: 'ability' | 'specialmove' | 'equipment'
  title: string
  subtitle: string
  description: string
  details: string[]
  level: number
  unlocked: boolean
}

interface SkillBadge {
  id: string
  name: string
  category: 'programming' | 'cloud' | 'hardware' | 'data'
  level: number
  maxLevel: number
  description: string
  icon: string
}

interface CyberpunkRPGTrainerCardProps {
  className?: string
  onEnterPortfolio?: () => void
}

// Game-style Services (Abilities/Skills/Equipment)
const gameServices: ServiceItem[] = [
  {
    id: 'cloud-infrastructure',
    category: 'equipment',
    title: 'CLOUD ARSENAL',
    subtitle: 'Infrastructure Deployment',
    description:
      'Deploy production-ready cloud pipelines and data processing systems',
    details: [
      'AWS IoT Core',
      'Kinesis Data Streams',
      'Lambda Functions',
      'S3 Data Lakes',
      '500+ Robots Connected',
    ],
    level: 95,
    unlocked: true,
  },
  {
    id: 'robotics-integration',
    category: 'specialmove',
    title: 'NEURAL LINK',
    subtitle: 'Robotics Integration',
    description: 'Bridge autonomous systems with cloud infrastructure',
    details: [
      'ROS2 Communication',
      'PX4 Flight Control',
      'MQTT Protocols',
      'OTA Updates',
      'Fleet Management',
    ],
    level: 88,
    unlocked: true,
  },
  {
    id: 'embedded-firmware',
    category: 'ability',
    title: 'CODE INJECTION',
    subtitle: 'Embedded Systems',
    description: 'Low-level firmware and embedded Linux development',
    details: [
      'Embedded C/C++',
      'FreeRTOS',
      'STM32/ESP32',
      'Zero Field Failures',
      '10K+ Devices',
    ],
    level: 82,
    unlocked: true,
  },
  {
    id: 'web-applications',
    category: 'equipment',
    title: 'INTERFACE MATRIX',
    subtitle: 'Web Applications',
    description: 'Modern web applications and real-time dashboards',
    details: [
      'React/Vue',
      'Real-time Data',
      'Fleet Dashboards',
      'Global Deployment',
      '200+ Operators',
    ],
    level: 79,
    unlocked: true,
  },
  {
    id: 'rapid-prototyping',
    category: 'specialmove',
    title: 'RAPID SYNTHESIS',
    subtitle: 'Prototyping & R&D',
    description: 'Quick validation of product concepts and MVP development',
    details: [
      'Hardware Prototyping',
      'AI/ML Integration',
      '3D Printing',
      '$2M+ Funding Secured',
    ],
    level: 91,
    unlocked: true,
  },
  {
    id: 'team-leadership',
    category: 'ability',
    title: 'SQUAD COMMAND',
    subtitle: 'Team Leadership',
    description: 'Leading engineering teams through complex technical projects',
    details: [
      'Agile/Scrum',
      'Cross-functional Teams',
      '6+ Engineers Led',
      'Global Coordination',
    ],
    level: 75,
    unlocked: true,
  },
]

// Skill Badges (Pokémon-style collectibles)
const skillBadges: SkillBadge[] = [
  {
    id: 'python',
    name: 'PYTHON MASTER',
    category: 'programming',
    level: 9,
    maxLevel: 10,
    description: 'Expert in Python development',
    icon: '🐍',
  },
  {
    id: 'aws',
    name: 'CLOUD ARCHITECT',
    category: 'cloud',
    level: 9,
    maxLevel: 10,
    description: 'AWS infrastructure specialist',
    icon: '☁️',
  },
  {
    id: 'sql',
    name: 'DATA ORACLE',
    category: 'data',
    level: 8,
    maxLevel: 10,
    description: 'Database optimization expert',
    icon: '🗃️',
  },
  {
    id: 'react',
    name: 'UI ARTIFICER',
    category: 'programming',
    level: 8,
    maxLevel: 10,
    description: 'Modern frontend frameworks',
    icon: '⚛️',
  },
  {
    id: 'robotics',
    name: 'MECH PILOT',
    category: 'hardware',
    level: 8,
    maxLevel: 10,
    description: 'Robotics integration specialist',
    icon: '🤖',
  },
  {
    id: 'embedded',
    name: 'CHIP WHISPERER',
    category: 'hardware',
    level: 7,
    maxLevel: 10,
    description: 'Embedded systems expert',
    icon: '⚡',
  },
  {
    id: 'docker',
    name: 'CONTAINER LORD',
    category: 'cloud',
    level: 7,
    maxLevel: 10,
    description: 'DevOps and containerization',
    icon: '📦',
  },
  {
    id: 'data-pipelines',
    name: 'FLOW MASTER',
    category: 'data',
    level: 9,
    maxLevel: 10,
    description: 'Data pipeline architecture',
    icon: '🌊',
  },
]

const missionBriefing = {
  title: 'OPERATIVE PROFILE',
  status: 'ACTIVE',
  clearanceLevel: 'ALPHA',
  bio: 'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. Bridges hardware-software gap with scalable solutions from embedded firmware to cloud analytics.',
  achievements: [
    'Led engineering teams across 3 continents',
    'Zero field failures across 10K+ deployed devices',
    'Secured $2M+ in follow-on product funding',
    'Processing 50M+ events daily with 99.8% reliability',
  ],
}

const CyberpunkRPGTrainerCard: React.FC<CyberpunkRPGTrainerCardProps> = ({
  className = '',
  onEnterPortfolio,
}) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null)
  const [selectedBadge, setSelectedBadge] = useState<SkillBadge | null>(null)
  const [scanlinePosition, setScanlinePosition] = useState(0)

  // Animated scanline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`w-full max-w-8xl mx-auto ${className}`}>
      <motion.div
        className='relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyberpunk-neon/60 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 0 80px rgba(0, 255, 255, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Animated grid background */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              animation: 'gridPulse 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Animated scanline */}
        <div
          className='absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-neon to-transparent opacity-60'
          style={{
            top: `${scanlinePosition}%`,
            transition: 'top 0.05s linear',
          }}
        />

        {/* Corner HUD elements */}
        <div className='absolute top-6 left-6 w-12 h-12 border-l-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute top-6 right-6 w-12 h-12 border-r-3 border-t-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-6 left-6 w-12 h-12 border-l-3 border-b-3 border-cyberpunk-neon animate-pulse' />
        <div className='absolute bottom-6 right-6 w-12 h-12 border-r-3 border-b-3 border-cyberpunk-neon animate-pulse' />

        {/* HUD System Info */}
        <div className='absolute top-8 left-20 text-cyberpunk-neon font-mono text-xs opacity-70'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
            <span>NEURAL_INTERFACE v3.077</span>
          </div>
          <div>STATUS: OPERATIONAL</div>
          <div>CLEARANCE: {missionBriefing.clearanceLevel}</div>
        </div>

        <div className='absolute top-8 right-20 text-cyberpunk-neon font-mono text-xs opacity-70 text-right'>
          <div>ID: HHL_OPERATIVE</div>
          <div>
            BUILD: {new Date().getFullYear()}.
            {String(new Date().getMonth() + 1).padStart(2, '0')}
          </div>
          <div className='flex items-center gap-2 justify-end'>
            <span>SYNC: ACTIVE</span>
            <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-ping' />
          </div>
        </div>

        {/* Main Layout */}
        <div className='relative z-10 mt-16'>
          {/* Header - Trainer Card Style */}
          <motion.div
            className='mb-8 bg-gradient-to-r from-cyberpunk-dark/80 to-cyberpunk-dark/60 border-2 border-cyberpunk-neon/40 rounded-2xl p-6 backdrop-blur-sm'
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-6'>
                {/* Avatar with holographic frame */}
                <div className='relative'>
                  <div className='w-24 h-24 lg:w-32 lg:h-32 border-3 border-cyberpunk-neon rounded-2xl overflow-hidden relative'>
                    <img
                      src={characterProfile}
                      alt='Hartley H. Leroy'
                      className='w-full h-full object-contain'
                    />
                    {/* Holographic overlay */}
                    <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/20 via-transparent to-cyberpunk-pink/20 animate-pulse' />
                  </div>
                  {/* Status indicator */}
                  <div className='absolute -top-2 -right-2 flex items-center gap-1 bg-cyberpunk-green/20 border border-cyberpunk-green rounded-full px-2 py-1'>
                    <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                    <span className='text-cyberpunk-green font-mono text-xs'>
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Identity */}
                <div>
                  <h1 className='text-3xl lg:text-4xl font-cyber font-bold text-cyberpunk-neon mb-2'>
                    HARTLEY H. LEROY
                  </h1>
                  <div className='text-cyberpunk-neon/80 font-mono text-lg mb-3'>
                    CREATIVE TECHNOLOGIST • SYSTEMS ARCHITECT
                  </div>
                  <div className='flex items-center gap-2 text-cyberpunk-green font-cyber text-sm'>
                    <div className='w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse' />
                    STATUS: AVAILABLE FOR HIRE
                  </div>
                </div>
              </div>

              {/* Action Terminal */}
              <div className='flex flex-col gap-3'>
                <a
                  href='https://github.com/hhleroy97'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group px-4 py-3 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border-2 border-cyberpunk-green/50 hover:border-cyberpunk-green rounded-lg font-cyber text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-green/30'
                >
                  <div className='flex items-center gap-2'>
                    <span>ACCESS_GITHUB</span>
                    <svg
                      className='w-4 h-4 group-hover:animate-pulse'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                  </div>
                </a>

                {onEnterPortfolio && (
                  <button
                    onClick={onEnterPortfolio}
                    className='group px-6 py-3 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border-2 border-cyberpunk-pink/50 hover:border-cyberpunk-pink rounded-lg font-cyber text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyberpunk-pink/30'
                  >
                    <div className='flex items-center gap-2'>
                      <span>ENTER_PORTFOLIO</span>
                      <svg
                        className='w-4 h-4 group-hover:translate-x-1 transition-transform'
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

          {/* Main Game Interface Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Abilities Menu */}
            <motion.div
              className='space-y-4'
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className='text-xl font-cyber font-bold text-cyberpunk-pink mb-4 flex items-center gap-3'>
                <div className='w-4 h-4 bg-cyberpunk-pink rounded-full animate-pulse' />
                CORE_ABILITIES
              </h2>

              <div className='space-y-3'>
                {gameServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className={`group relative bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 border-2 border-cyberpunk-neon/30 hover:border-cyberpunk-pink/70 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyberpunk-pink/20 ${
                      activeService?.id === service.id
                        ? 'border-cyberpunk-pink bg-cyberpunk-purple/30'
                        : ''
                    }`}
                    onMouseEnter={() => setActiveService(service)}
                    onMouseLeave={() => setActiveService(null)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='flex items-center gap-2 mb-1'>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              service.category === 'ability'
                                ? 'bg-cyberpunk-blue'
                                : service.category === 'specialmove'
                                  ? 'bg-cyberpunk-pink'
                                  : 'bg-cyberpunk-green'
                            }`}
                          />
                          <span className='text-cyberpunk-neon font-cyber text-sm font-bold'>
                            {service.title}
                          </span>
                        </div>
                        <div className='text-cyberpunk-neon/70 font-mono text-xs'>
                          {service.subtitle}
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-cyberpunk-neon font-cyber text-lg font-bold'>
                          {service.level}
                        </div>
                        <div className='text-cyberpunk-neon/50 font-mono text-xs'>
                          LVL
                        </div>
                      </div>
                    </div>

                    {/* Level bar */}
                    <div className='mt-3 w-full bg-cyberpunk-dark/50 rounded-full h-1.5'>
                      <motion.div
                        className={`h-full rounded-full ${
                          service.category === 'ability'
                            ? 'bg-cyberpunk-blue'
                            : service.category === 'specialmove'
                              ? 'bg-cyberpunk-pink'
                              : 'bg-cyberpunk-green'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${service.level}%` }}
                        transition={{ delay: index * 0.1 + 1.5, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center Column - Mission Briefing */}
            <motion.div
              className='space-y-6'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className='bg-gradient-to-br from-cyberpunk-dark/90 to-cyberpunk-dark/70 border-2 border-cyberpunk-neon/40 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden'>
                {/* Briefing Header */}
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-cyber font-bold text-cyberpunk-neon'>
                    {missionBriefing.title}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <span className='text-cyberpunk-green font-mono text-sm'>
                      {missionBriefing.status}
                    </span>
                    <div className='w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse' />
                  </div>
                </div>

                {/* Dynamic Content Area */}
                <AnimatePresence mode='wait'>
                  {activeService ? (
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className='text-2xl font-cyber font-bold text-cyberpunk-neon mb-3'>
                        {activeService.title}
                      </h3>
                      <p className='text-white/90 text-base leading-relaxed mb-4'>
                        {activeService.description}
                      </p>
                      <div className='grid grid-cols-2 gap-2'>
                        {activeService.details.map((detail, index) => (
                          <motion.div
                            key={index}
                            className='flex items-center gap-2 text-cyberpunk-neon/80 text-sm'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className='w-1 h-1 bg-cyberpunk-neon rounded-full' />
                            {detail}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key='default'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className='text-white/90 text-base leading-relaxed mb-6'>
                        {missionBriefing.bio}
                      </p>
                      <div className='space-y-3'>
                        <h4 className='text-cyberpunk-neon font-cyber font-bold'>
                          MISSION_ACHIEVEMENTS:
                        </h4>
                        {missionBriefing.achievements.map(
                          (achievement, index) => (
                            <motion.div
                              key={index}
                              className='flex items-center gap-3 text-cyberpunk-neon/80'
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + 1.5 }}
                            >
                              <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                              {achievement}
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Column - Skill Badges */}
            <motion.div
              className='space-y-4'
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <h2 className='text-xl font-cyber font-bold text-cyberpunk-pink mb-4 flex items-center gap-3'>
                <div className='w-4 h-4 bg-cyberpunk-pink rounded-full animate-pulse' />
                SKILL_BADGES
              </h2>

              <div className='grid grid-cols-2 gap-3'>
                {skillBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className={`group relative bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-blue/20 border-2 border-cyberpunk-neon/40 hover:border-cyberpunk-neon/80 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyberpunk-neon/30 ${
                      selectedBadge?.id === badge.id
                        ? 'border-cyberpunk-neon bg-cyberpunk-neon/20'
                        : ''
                    }`}
                    onMouseEnter={() => setSelectedBadge(badge)}
                    onMouseLeave={() => setSelectedBadge(null)}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 1.6 }}
                  >
                    <div className='text-center'>
                      <div className='text-2xl mb-2'>{badge.icon}</div>
                      <div className='text-cyberpunk-neon font-cyber text-xs font-bold mb-1'>
                        {badge.name}
                      </div>
                      <div className='flex justify-center gap-1 mb-2'>
                        {Array.from({ length: badge.maxLevel }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < badge.level
                                ? 'bg-cyberpunk-neon'
                                : 'bg-cyberpunk-neon/20'
                            }`}
                          />
                        ))}
                      </div>
                      <div className='text-cyberpunk-neon/60 font-mono text-xs'>
                        LVL {badge.level}/{badge.maxLevel}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scanlines overlay */}
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

export default CyberpunkRPGTrainerCard
