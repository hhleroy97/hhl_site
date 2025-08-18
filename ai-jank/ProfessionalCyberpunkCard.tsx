import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'

interface ContentItem {
  id: string
  title: string
  description: string
  highlights: string[]
  level?: number
}

interface SkillBadge {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

interface ProfessionalCyberpunkCardProps {
  className?: string
  onEnterPortfolio?: () => void
}

// Professional Core Abilities with XP levels
const coreAbilities: ContentItem[] = [
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description:
      'Infrastructure deployment, data pipelines, and AWS cloud architecture. Building scalable systems that process millions of events daily.',
    highlights: [
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
    title: 'Robotics Integration',
    description:
      'Telemetry systems, OTA updates, and fleet control for autonomous platforms. Bridging hardware and cloud infrastructure.',
    highlights: [
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
    title: 'Embedded Systems',
    description:
      'Firmware development and hardware-software bridge solutions. Low-level programming for production devices.',
    highlights: [
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
    title: 'Web Applications',
    description:
      'Dashboards, operator tools, and customer platforms. Modern web applications with real-time data visualization.',
    highlights: [
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
    title: 'Prototyping & R&D',
    description:
      'MVPs, proof-of-concepts, and rapid prototyping. Validating product ideas through working demonstrations.',
    highlights: [
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
    title: 'Team Leadership',
    description:
      'Project management, Agile methodologies, and cross-team delivery. Leading engineering teams through complex projects.',
    highlights: [
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
    description: 'Data workflows, automation, backend scripting',
    icon: '🐍',
    category: 'Programming',
  },
  {
    id: 'cloud',
    name: 'Cloud Architecture',
    description: 'AWS IoT Core, Kinesis, Glue, S3, Lambda',
    icon: '☁️',
    category: 'Infrastructure',
  },
  {
    id: 'data',
    name: 'Data Engineering',
    description: 'ETL, schema design, high-volume pipelines',
    icon: '📊',
    category: 'Data',
  },
  {
    id: 'web',
    name: 'Web Frameworks',
    description: 'React, Vue, Next.js, Tailwind, Flask',
    icon: '⚛️',
    category: 'Frontend',
  },
  {
    id: 'robotics',
    name: 'Robotics Systems',
    description: 'ROS2, PX4, MQTT',
    icon: '🤖',
    category: 'Hardware',
  },
  {
    id: 'embedded',
    name: 'Embedded Programming',
    description: 'C, Embedded Linux, microcontrollers',
    icon: '⚡',
    category: 'Hardware',
  },
  {
    id: 'agile',
    name: 'Collaboration & Agile',
    description: 'Jira, Notion, Scrum workflows',
    icon: '🔄',
    category: 'Process',
  },
  {
    id: 'visualization',
    name: 'Visualization Tools',
    description: 'Grafana, Tableau, D3.js',
    icon: '📈',
    category: 'Analytics',
  },
]

const defaultContent: ContentItem = {
  id: 'overview',
  title: 'Hartley H. Leroy',
  description:
    'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. I bridge the gap between hardware and software, building scalable solutions from embedded firmware to cloud analytics.',
  highlights: [
    '5+ years robotics & IoT experience',
    'Led engineering teams across 3 continents',
    'Expert in cloud-to-edge integration',
    'Zero failures across 10K+ devices',
  ],
}

const ProfessionalCyberpunkCard: React.FC<ProfessionalCyberpunkCardProps> = ({
  className = '',
  onEnterPortfolio,
}) => {
  const [activeContent, setActiveContent] =
    useState<ContentItem>(defaultContent)

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <motion.div
        className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyberpunk-neon/40 rounded-3xl shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 0 40px rgba(0, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Subtle animated background grid */}
        <div className='absolute inset-0 opacity-5'>
          <div
            className='w-full h-full animate-pulse'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className='relative z-10 p-6'>
          {/* Header Row - Avatar + Name + Status */}
          <motion.div
            className='flex items-center justify-between mb-6 pb-6 border-b border-cyberpunk-neon/20'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className='flex items-center gap-6'>
              {/* Avatar */}
              <div className='relative'>
                <div className='w-20 h-20 border-2 border-cyberpunk-neon/60 rounded-2xl overflow-hidden bg-gradient-to-br from-cyberpunk-neon/10 to-cyberpunk-blue/10'>
                  <img
                    src={characterProfile}
                    alt='Hartley H. Leroy'
                    className='w-full h-full object-contain'
                  />
                </div>
                {/* Status indicator */}
                <div className='absolute -top-1 -right-1 flex items-center gap-1 bg-cyberpunk-green/20 border border-cyberpunk-green/60 rounded-full px-2 py-0.5'>
                  <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                  <span className='text-cyberpunk-green font-mono text-xs font-medium'>
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Identity */}
              <div>
                <h1 className='text-3xl font-bold text-cyberpunk-neon mb-1 tracking-tight'>
                  Hartley H. Leroy
                </h1>
                <p className='text-cyberpunk-neon/80 text-lg font-medium mb-2'>
                  Creative Technologist • Systems Architect
                </p>
                <div className='flex items-center gap-2 text-cyberpunk-green text-sm font-medium'>
                  <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                  Available for hire
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='group px-4 py-2 bg-cyberpunk-green/10 hover:bg-cyberpunk-green/20 text-cyberpunk-green border border-cyberpunk-green/40 hover:border-cyberpunk-green/60 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105'
              >
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-4 h-4'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                  GitHub
                </div>
              </a>

              {onEnterPortfolio && (
                <button
                  onClick={onEnterPortfolio}
                  className='group px-6 py-2 bg-cyberpunk-pink/10 hover:bg-cyberpunk-pink/20 text-cyberpunk-pink border border-cyberpunk-pink/40 hover:border-cyberpunk-pink/60 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105'
                >
                  <div className='flex items-center gap-2'>
                    Portfolio
                    <svg
                      className='w-4 h-4 group-hover:translate-x-0.5 transition-transform'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </motion.div>

          {/* Info Panel - Full Width */}
          <motion.div
            className='mb-6'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='h-[180px] bg-gradient-to-br from-cyberpunk-dark/60 to-cyberpunk-dark/40 border border-cyberpunk-neon/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden'>
              {/* Subtle parallax background */}
              <div className='absolute inset-0 bg-gradient-to-r from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-2xl' />

              <div className='relative z-10 h-full flex flex-col justify-center'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <h3 className='text-2xl font-bold text-cyberpunk-neon mb-3 tracking-tight'>
                      {activeContent.title}
                    </h3>
                    <p className='text-white/90 text-base leading-relaxed mb-4 max-w-4xl'>
                      {activeContent.description}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {activeContent.highlights.map((highlight, index) => (
                        <motion.span
                          key={index}
                          className='px-3 py-1 bg-cyberpunk-neon/10 border border-cyberpunk-neon/20 rounded-full text-cyberpunk-neon/80 text-sm font-medium'
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Left Column - Core Abilities (XP Bars) */}
            <motion.div
              className='space-y-4'
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className='text-xl font-bold text-cyberpunk-pink mb-4 tracking-tight'>
                Core Abilities
              </h2>

              <div className='space-y-4'>
                {coreAbilities.map((ability, index) => (
                  <motion.div
                    key={ability.id}
                    className='group p-4 bg-cyberpunk-purple/5 hover:bg-cyberpunk-purple/10 border border-cyberpunk-neon/20 hover:border-cyberpunk-pink/40 rounded-xl cursor-pointer transition-all duration-200'
                    onMouseEnter={() => setActiveContent(ability)}
                    onMouseLeave={() => setActiveContent(defaultContent)}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <h3 className='text-cyberpunk-neon font-semibold text-base tracking-tight'>
                        {ability.title}
                      </h3>
                      <span className='text-cyberpunk-neon/80 font-mono text-sm font-medium'>
                        {ability.level}%
                      </span>
                    </div>

                    {/* XP Bar with gradient fill and shimmer */}
                    <div className='relative w-full bg-cyberpunk-dark/40 rounded-full h-2 overflow-hidden'>
                      <motion.div
                        className='h-full bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-neon to-cyberpunk-pink rounded-full relative'
                        style={{ width: `${ability.level}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${ability.level}%` }}
                        transition={{
                          delay: index * 0.1 + 1.2,
                          duration: 1,
                          ease: 'easeOut',
                        }}
                      >
                        {/* Shimmer effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]' />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Skill Badges */}
            <motion.div
              className='space-y-4'
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className='text-xl font-bold text-cyberpunk-pink mb-4 tracking-tight'>
                Technical Skills
              </h2>

              <div className='grid grid-cols-2 gap-3'>
                {skillBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className='group min-w-[120px] p-4 bg-cyberpunk-blue/5 hover:bg-cyberpunk-blue/10 border border-cyberpunk-neon/20 hover:border-cyberpunk-neon/50 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-cyberpunk-neon/20'
                    onMouseEnter={() =>
                      setActiveContent({
                        id: badge.id,
                        title: badge.name,
                        description: badge.description,
                        highlights: [
                          badge.category,
                          'Professional experience',
                          'Production systems',
                        ],
                      })
                    }
                    onMouseLeave={() => setActiveContent(defaultContent)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <div className='text-center'>
                      <motion.div
                        className='text-2xl mb-2 group-hover:scale-110 transition-transform duration-200'
                        animate={{
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {badge.icon}
                      </motion.div>
                      <h3 className='text-cyberpunk-neon font-semibold text-sm leading-tight mb-1'>
                        {badge.name}
                      </h3>
                      <p className='text-cyberpunk-neon/60 text-xs font-medium'>
                        {badge.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Status Strip */}
          <motion.div
            className='mt-6 pt-4 border-t border-cyberpunk-neon/20 text-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <p className='text-cyberpunk-neon/60 text-sm font-medium'>
              Hover over abilities and skills to explore • Neural interface
              active
            </p>
          </motion.div>
        </div>

        {/* Subtle scanlines overlay */}
        <div className='absolute inset-0 scanlines rounded-3xl pointer-events-none opacity-5' />
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

export default ProfessionalCyberpunkCard
