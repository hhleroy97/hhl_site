import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'

interface ContentItem {
  id: string
  title: string
  description: string
  details: string[]
}

interface UnifiedTrainerCardProps {
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
  title: 'About Me',
  description:
    'Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. I bridge the gap between hardware and software, building scalable solutions from embedded firmware to cloud analytics.',
  details: [
    '5+ years in robotics & IoT',
    'Led teams of 6+ engineers',
    'Deployed systems across 3 continents',
    'Expert in cloud-to-edge integration',
  ],
}

const UnifiedTrainerCard: React.FC<UnifiedTrainerCardProps> = ({
  className = '',
  onEnterPortfolio,
}) => {
  const [activeContent, setActiveContent] =
    useState<ContentItem>(defaultContent)

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <motion.div
        className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyberpunk-neon/30 rounded-2xl p-6 shadow-2xl'
        style={{
          boxShadow:
            '0 0 40px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cyberpunk glow overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-2xl pointer-events-none' />

        {/* Header Section with Avatar and Basic Info */}
        <div className='flex items-start gap-6 mb-6 relative z-10'>
          {/* Avatar */}
          <div className='relative flex-shrink-0'>
            <div className='relative w-24 h-24 lg:w-32 lg:h-32'>
              <img
                src={characterProfile}
                alt='Hartley H. Leroy'
                className='w-full h-full object-contain rounded-lg'
              />
              {/* Status indicator */}
              <div className='absolute -top-1 -right-1 w-4 h-4 bg-cyberpunk-green rounded-full animate-pulse border-2 border-slate-900' />
            </div>
          </div>

          {/* Basic Info */}
          <div className='flex-1 min-w-0'>
            <h1 className='text-2xl lg:text-3xl font-cyber font-bold text-cyberpunk-neon mb-2'>
              HARTLEY H. LEROY
            </h1>
            <p className='text-cyberpunk-neon/80 font-mono text-sm lg:text-base mb-3'>
              ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
            </p>
            <div className='flex items-center gap-1 text-cyberpunk-green font-cyber text-sm'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse' />
              AVAILABLE FOR HIRE
            </div>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-2'>
            <a
              href='https://github.com/hhleroy97'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-cyberpunk-green/20 hover:bg-cyberpunk-green/30 text-cyberpunk-green border border-cyberpunk-green/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </a>

            {onEnterPortfolio && (
              <button
                onClick={onEnterPortfolio}
                className='w-10 h-10 bg-cyberpunk-pink/20 hover:bg-cyberpunk-pink/30 text-cyberpunk-pink border border-cyberpunk-pink/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM18.92 8h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z' />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Services and Skills Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative z-10'>
          {/* Core Services */}
          <div>
            <h3 className='text-cyberpunk-pink font-cyber text-lg font-bold mb-4 flex items-center gap-2'>
              CORE SERVICES
              <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              {coreServices.map(service => (
                <motion.div
                  key={service.id}
                  className='p-3 bg-cyberpunk-purple/10 border border-cyberpunk-neon/20 rounded-lg cursor-pointer transition-all duration-200 hover:border-cyberpunk-pink/50 hover:bg-cyberpunk-purple/20'
                  onMouseEnter={() => setActiveContent(service)}
                  onMouseLeave={() => setActiveContent(defaultContent)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className='text-cyberpunk-neon text-sm font-cyber font-semibold leading-tight'>
                    {service.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Capabilities */}
          <div>
            <h3 className='text-cyberpunk-pink font-cyber text-lg font-bold mb-4 flex items-center gap-2'>
              SKILLS & CAPABILITIES
              <div className='w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              {skillsCapabilities.map(skill => (
                <motion.div
                  key={skill.id}
                  className='p-3 bg-cyberpunk-blue/10 border border-cyberpunk-neon/20 rounded-lg cursor-pointer transition-all duration-200 hover:border-cyberpunk-neon/50 hover:bg-cyberpunk-blue/20'
                  onMouseEnter={() => setActiveContent(skill)}
                  onMouseLeave={() => setActiveContent(defaultContent)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className='text-cyberpunk-neon text-sm font-cyber font-semibold leading-tight'>
                    {skill.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Info Panel */}
        <div className='relative z-10'>
          <div className='bg-gradient-to-r from-cyberpunk-dark/50 to-cyberpunk-dark/30 border border-cyberpunk-neon/30 rounded-xl p-6 min-h-[200px]'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className='text-xl font-cyber font-bold text-cyberpunk-neon mb-3'>
                  {activeContent.title}
                </h3>
                <p className='text-white/90 text-base leading-relaxed mb-4'>
                  {activeContent.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {activeContent.details.map((detail, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-cyberpunk-neon/10 border border-cyberpunk-neon/30 rounded-full text-cyberpunk-neon text-sm font-mono'
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scanlines overlay */}
        <div className='absolute inset-0 scanlines rounded-2xl pointer-events-none opacity-20' />
      </motion.div>
    </div>
  )
}

export default UnifiedTrainerCard
