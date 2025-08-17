import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'

interface ContentItem {
  id: string
  title: string
  description: string
  details: string[]
}

interface CyberpunkGameTrainerCardProps {
  className?: string
  onEnterPortfolio?: () => void
}

// Content data
const coreServices: ContentItem[] = [
  {
    id: 'cloud-data-infrastructure',
    title: 'Cloud & Data Infrastructure',
    description:
      'Designing real-time ingestion pipelines and analytics systems to scale with operations.',
    details: [
      'AWS IoT Core',
      'Kinesis',
      'Glue',
      'S3',
      'Athena',
      'Built telemetry pipelines for 500+ autonomous robots',
    ],
  },
  {
    id: 'robotics-integration',
    title: 'Robotics Systems Integration',
    description:
      'Bridging autonomous platforms with cloud services for telemetry, OTA updates, and monitoring.',
    details: [
      'ROS2',
      'PX4',
      'MQTT',
      'REST APIs',
      'Led integrations improving drone-to-cloud reliability',
    ],
  },
  {
    id: 'embedded-firmware',
    title: 'Embedded & Firmware Engineering',
    description:
      'Developing microcontroller and embedded solutions to connect hardware and software.',
    details: [
      'Embedded C',
      'Linux',
      'NFC energy-harvesting locks',
      'Delivered production firmware features under deadlines',
    ],
  },
  {
    id: 'web-dashboards',
    title: 'Web Applications & Dashboards',
    description:
      'Building intuitive frontends and dashboards that make complex data actionable.',
    details: [
      'React',
      'Vue',
      'Next.js',
      'Tailwind',
      'Flask APIs',
      'Developed fleet management tools used globally',
    ],
  },
  {
    id: 'prototyping-rd',
    title: 'Prototyping & R&D',
    description:
      'Rapidly validating new product ideas through proof-of-concepts and MVP builds.',
    details: [
      'Python',
      'Hardware/Software Prototyping',
      'Created prototypes that shaped product strategy',
    ],
  },
  {
    id: 'project-management',
    title: 'Project & Team Management',
    description:
      'Driving projects from scope to delivery using Agile workflows, Jira, and Notion.',
    details: [
      'Agile/Scrum',
      'Backlog Grooming',
      'Cross-team Coordination',
      'Directed a team of 6 engineers building tools and systems',
    ],
  },
]

const skillsCapabilities: ContentItem[] = [
  {
    id: 'aws-cloud',
    title: 'AWS & Cloud Tools',
    description:
      'Deploying and managing scalable cloud systems for IoT and data pipelines.',
    details: ['IoT Core', 'Kinesis', 'Glue', 'S3', 'Athena', 'Lambda'],
  },
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    description:
      'Writing reliable and maintainable code across backend, frontend, and embedded contexts.',
    details: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Embedded C'],
  },
  {
    id: 'frameworks-libraries',
    title: 'Frameworks & Libraries',
    description:
      'Developing modern web applications with performance-focused frameworks.',
    details: ['React', 'Vue', 'Next.js', 'Tailwind', 'Flask'],
  },
  {
    id: 'robotics-ecosystems',
    title: 'Robotics Ecosystems',
    description:
      'Working within robotics software stacks for telemetry, navigation, and control.',
    details: ['ROS2', 'PX4', 'MQTT'],
  },
  {
    id: 'data-etl',
    title: 'Data & ETL',
    description:
      'Building workflows for extracting, transforming, and loading structured/unstructured data.',
    details: ['Schema Design', 'Query Optimization', 'High-volume Pipelines'],
  },
  {
    id: 'collaboration-methods',
    title: 'Collaboration & Methods',
    description:
      'Coordinating teams and projects with effective processes and documentation.',
    details: [
      'Agile',
      'Scrum',
      'Cross-functional Teamwork',
      'Technical Documentation',
    ],
  },
]

const defaultContent: ContentItem = {
  id: 'about',
  title: 'HARTLEY H. LEROY',
  description:
    'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. I bridge the gap between hardware and software, building scalable solutions from embedded firmware to cloud analytics.',
  details: [
    '5+ years in robotics & IoT',
    'Led teams of 6+ engineers',
    'Deployed systems across 3 continents',
    'Expert in cloud-to-edge integration',
  ],
}

const CyberpunkGameTrainerCard: React.FC<CyberpunkGameTrainerCardProps> = ({
  className = '',
  onEnterPortfolio,
}) => {
  const [activeContent, setActiveContent] =
    useState<ContentItem>(defaultContent)

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <motion.div
        className='relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyberpunk-neon/50 rounded-3xl p-8 shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 0 60px rgba(0, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cyberpunk grid background */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Corner decorations */}
        <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyberpunk-neon' />
        <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyberpunk-neon' />
        <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyberpunk-neon' />
        <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyberpunk-neon' />

        {/* Header with Avatar and Status */}
        <div className='relative z-10 mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='w-16 h-16 lg:w-20 lg:h-20 border-2 border-cyberpunk-neon rounded-lg overflow-hidden'>
                  <img
                    src={characterProfile}
                    alt='Hartley H. Leroy'
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='absolute -top-1 -right-1 w-4 h-4 bg-cyberpunk-green rounded-full animate-pulse border-2 border-slate-900' />
              </div>
              <div>
                <div className='flex items-center gap-2 text-cyberpunk-green font-cyber text-sm'>
                  <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
                  STATUS: AVAILABLE FOR HIRE
                </div>
                <div className='text-cyberpunk-neon/60 font-mono text-xs mt-1'>
                  ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex gap-2'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border border-cyberpunk-green/50 rounded flex items-center justify-center transition-all duration-200 hover:scale-105'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>

              {onEnterPortfolio && (
                <button
                  onClick={onEnterPortfolio}
                  className='px-4 py-2 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border border-cyberpunk-pink/50 rounded font-cyber text-sm transition-all duration-200 hover:scale-105'
                >
                  PORTFOLIO
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Game-like Layout: Central Info Panel Surrounded by Skills/Services */}
        <div className='relative z-10 grid grid-cols-1 lg:grid-cols-7 gap-6 h-full'>
          {/* Left Column - Core Services */}
          <div className='lg:col-span-2 space-y-3'>
            <h3 className='text-cyberpunk-pink font-cyber text-lg font-bold mb-4 flex items-center gap-2'>
              <div className='w-3 h-3 bg-cyberpunk-pink rounded-full animate-pulse' />
              CORE SERVICES
            </h3>
            <div className='space-y-2'>
              {coreServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`p-3 bg-cyberpunk-purple/10 border border-cyberpunk-neon/30 rounded-lg cursor-pointer transition-all duration-200 hover:border-cyberpunk-pink/70 hover:bg-cyberpunk-purple/20 ${
                    activeContent.id === service.id
                      ? 'border-cyberpunk-pink bg-cyberpunk-purple/20'
                      : ''
                  }`}
                  onMouseEnter={() => setActiveContent(service)}
                  onMouseLeave={() => setActiveContent(defaultContent)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-cyberpunk-neon rounded-full' />
                    <h4 className='text-cyberpunk-neon text-sm font-cyber font-semibold leading-tight'>
                      {service.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Central Info Panel */}
          <div className='lg:col-span-3 flex items-center justify-center'>
            <div className='w-full h-full bg-gradient-to-br from-cyberpunk-dark/80 to-cyberpunk-dark/60 border-2 border-cyberpunk-neon/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden'>
              {/* Central panel decoration */}
              <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-2xl' />

              {/* Animated connection lines */}
              <div className='absolute top-1/2 left-0 w-px h-16 bg-gradient-to-b from-transparent via-cyberpunk-neon to-transparent' />
              <div className='absolute top-1/2 right-0 w-px h-16 bg-gradient-to-b from-transparent via-cyberpunk-neon to-transparent' />

              <div className='relative z-10 h-full flex flex-col justify-center'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='text-center'
                  >
                    <h3 className='text-2xl lg:text-3xl font-cyber font-bold text-cyberpunk-neon mb-4'>
                      {activeContent.title}
                    </h3>
                    <p className='text-white/90 text-base lg:text-lg leading-relaxed mb-6'>
                      {activeContent.description}
                    </p>
                    <div className='flex flex-wrap gap-2 justify-center'>
                      {activeContent.details.map((detail, index) => (
                        <motion.span
                          key={index}
                          className='px-3 py-1 bg-cyberpunk-neon/10 border border-cyberpunk-neon/30 rounded-full text-cyberpunk-neon text-sm font-mono'
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {detail}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Capabilities */}
          <div className='lg:col-span-2 space-y-3'>
            <h3 className='text-cyberpunk-pink font-cyber text-lg font-bold mb-4 flex items-center gap-2'>
              <div className='w-3 h-3 bg-cyberpunk-pink rounded-full animate-pulse' />
              SKILLS & CAPABILITIES
            </h3>
            <div className='space-y-2'>
              {skillsCapabilities.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className={`p-3 bg-cyberpunk-blue/10 border border-cyberpunk-neon/30 rounded-lg cursor-pointer transition-all duration-200 hover:border-cyberpunk-neon/70 hover:bg-cyberpunk-blue/20 ${
                    activeContent.id === skill.id
                      ? 'border-cyberpunk-neon bg-cyberpunk-blue/20'
                      : ''
                  }`}
                  onMouseEnter={() => setActiveContent(skill)}
                  onMouseLeave={() => setActiveContent(defaultContent)}
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-cyberpunk-neon rounded-full' />
                    <h4 className='text-cyberpunk-neon text-sm font-cyber font-semibold leading-tight'>
                      {skill.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scanlines overlay */}
        <div className='absolute inset-0 scanlines rounded-3xl pointer-events-none opacity-10' />
      </motion.div>
    </div>
  )
}

export default CyberpunkGameTrainerCard
