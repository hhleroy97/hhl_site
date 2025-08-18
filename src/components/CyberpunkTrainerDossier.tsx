import React, { useState, useEffect } from 'react'
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
  Award,
  Globe,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import profPic from '../assets/prof-pic.png'

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
    id: 'data',
    title: 'Data Engineering',
    description:
      'Real-time data processing, analytics pipelines, and machine learning infrastructure. Building systems that turn data into insights.',
    details: [
      'Apache Kafka',
      'TensorFlow/PyTorch',
      'Time Series Analysis',
      'ML Model Deployment',
      'Real-time Analytics',
    ],
    level: 85,
  },
]

const skills: Skill[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern web applications and user interfaces',
    category: 'Development',
    level: 'Expert',
    iconType: 'code',
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'Scalable server architecture and APIs',
    category: 'Development',
    level: 'Expert',
    iconType: 'database',
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    description: 'AWS, Azure, and hybrid cloud solutions',
    category: 'Infrastructure',
    level: 'Expert',
    iconType: 'cloud',
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD',
    description: 'Automated deployment and infrastructure',
    category: 'Process',
    level: 'Advanced',
    iconType: 'workflow',
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    description: 'Firmware and hardware integration',
    category: 'Hardware',
    level: 'Advanced',
    iconType: 'cpu',
  },
  {
    id: 'data',
    title: 'Data Engineering',
    description: 'ETL pipelines and analytics',
    category: 'Data',
    level: 'Advanced',
    iconType: 'pipeline',
  },
  {
    id: 'leadership',
    title: 'Technical Leadership',
    description: 'Team management and project delivery',
    category: 'Leadership',
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
    className: 'w-full h-full text-primary-400',
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleServiceClick = (service: Service) => {
    setActiveContent({
      type: 'service',
      title: service.title.toUpperCase(),
      description: service.description,
      stats: service.details,
      level: service.level,
    })
    setSelectedItem(`service-${service.id}`)
  }

  const handleSkillClick = (skill: Skill) => {
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
        className='relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/20 rounded-3xl shadow-2xl overflow-hidden'
        style={{
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.4 : 0.8 }}
      >
        {/* Subtle Grid Background */}
        <div className='absolute inset-0 opacity-5'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: prefersReducedMotion
                ? 'none'
                : 'gridPulse 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner Brackets */}
        <div className='absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/20' />
        <div className='absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20' />
        <div className='absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/20' />
        <div className='absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/20' />

        <div className='relative z-10 p-6'>
          {/* Header */}
          <motion.div
            className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-6 border-b border-white/15'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
          >
            {/* Header Content */}
            <div className='flex-1 mb-4 lg:mb-0'>
              <h1 className='text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight font-display'>
                HARTLEY H. LEROY
              </h1>
              <div className='text-white/90 text-base lg:text-lg font-medium tracking-wide mb-2'>
                Creative Technologist • Systems Architect
              </div>
              <div className='text-white/70 text-sm lg:text-base font-medium'>
                Bridging hardware and software for scalable solutions
              </div>
            </div>

            {/* Metrics */}
            <div className='flex lg:flex-col items-center gap-6 lg:gap-4 lg:mr-6'>
              <div className='text-center'>
                <div className='text-xl lg:text-2xl font-bold text-primary-400'>5+</div>
                <div className='text-white/70 text-sm'>Years</div>
              </div>
              <div className='text-center'>
                <div className='text-xl lg:text-2xl font-bold text-primary-400'>10K+</div>
                <div className='text-white/70 text-sm'>Devices</div>
              </div>
              <div className='text-center'>
                <div className='text-xl lg:text-2xl font-bold text-primary-400'>$2M+</div>
                <div className='text-white/70 text-sm'>Funding</div>
              </div>
            </div>

            {/* Social */}
            <div className='flex items-center gap-3'>
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white/10 hover:bg-white/15 text-white/90 border border-white/20 hover:border-primary-400/60 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900'
                aria-label='GitHub Profile'
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
                className='w-10 h-10 bg-white/10 hover:bg-white/15 text-white/90 border border-white/20 hover:border-primary-400/60 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900'
                aria-label='LinkedIn Profile'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            className='flex flex-wrap gap-3 mb-6'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
          >
            <div className='flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2'>
              <CheckSquare className='w-4 h-4 text-primary-400' />
              <span className='text-white/90 text-sm font-medium'>
                10K+ Devices Deployed
              </span>
            </div>
            <div className='flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2'>
              <Award className='w-4 h-4 text-primary-400' />
              <span className='text-white/90 text-sm font-medium'>
                Zero Field Failures
              </span>
            </div>
            <div className='flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2'>
              <Globe className='w-4 h-4 text-primary-400' />
              <span className='text-white/90 text-sm font-medium'>
                3 Continents
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='relative space-y-6'>
            <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start'>
              {/* Left Panel: Services */}
              <motion.div
                className='lg:col-span-3 relative'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                }}
              >
                <div className='relative bg-slate-800/50 border border-white/20 rounded-xl p-5 backdrop-blur-sm'>
                  <div className='relative z-10'>
                    <h2 className='text-primary-400 font-mono text-sm tracking-widest font-semibold mb-4'>
                      CORE SERVICES
                    </h2>

                    <div className='space-y-3'>
                      {services.map((service, index) => (
                        <motion.button
                          key={service.id}
                          className={`group w-full text-left relative p-4 cursor-pointer transition-all duration-200 rounded-lg border ${
                            selectedItem === `service-${service.id}`
                              ? 'bg-primary-500/15 border-primary-400/60 text-white shadow-lg shadow-primary-400/20'
                              : 'bg-slate-800/30 hover:bg-slate-700/40 border-white/20 hover:border-primary-400/40 text-slate-200'
                          }`}
                          onClick={() => handleServiceClick(service)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleServiceClick(service)
                            }
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 1,
                            duration: prefersReducedMotion ? 0.2 : 0.4,
                          }}
                          aria-label={`View ${service.title} details`}
                          tabIndex={0}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='font-mono text-sm font-medium'>
                              {service.title}
                            </div>
                            <div
                              className={`text-sm transition-opacity duration-200 ${
                                selectedItem === `service-${service.id}`
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover:opacity-60'
                              }`}
                            >
                              <ChevronRight className='w-4 h-4' />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Panel: Info */}
              <motion.div
                className='lg:col-span-6 relative'
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 1,
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                }}
              >
                <div className='relative bg-slate-800/50 border border-white/20 rounded-xl p-6 backdrop-blur-sm min-h-[400px] flex flex-col'>
                  <div className='relative z-10 flex-1 flex flex-col overflow-hidden'>
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeContent.title}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{
                          duration: prefersReducedMotion ? 0.2 : 0.3,
                          ease: 'easeInOut',
                        }}
                        className='space-y-5'
                      >
                        {/* Section Header */}
                        <div className='flex items-center gap-3'>
                          <div className='w-1 h-8 bg-primary-400 rounded-full' />
                          <h3 className='text-xl lg:text-2xl font-bold text-white font-display'>
                            {activeContent.title}
                          </h3>
                          {activeContent.level && (
                            <div className='bg-primary-500/15 border border-primary-400/40 rounded-lg px-3 py-1'>
                              <span className='text-primary-300 font-mono text-sm font-bold'>
                                {activeContent.level}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div className='bg-slate-800/50 rounded-lg p-4 border border-white/15'>
                          <p className='text-white/90 text-base leading-relaxed'>
                            {activeContent.description}
                          </p>
                        </div>

                        {/* Highlights */}
                        <div className='flex-1 flex flex-col min-h-0'>
                          <div className='text-white/70 font-mono text-xs font-bold mb-3 tracking-wider'>
                            HIGHLIGHTS
                          </div>
                          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-y-auto flex-1'>
                            {activeContent.stats.map((stat, index) => (
                              <div
                                key={index}
                                className='group flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-all duration-200'
                              >
                                <div className='w-2 h-2 bg-primary-400 rounded-full shadow-lg shadow-primary-400/40' />
                                <span className='text-white/90 font-mono text-sm font-medium'>
                                  {stat}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Corner Effects */}
                  <div className='absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-400/10 to-transparent rounded-tl-full' />
                  <div className='absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-transparent rounded-br-full' />
                </div>
              </motion.div>

              {/* Right Panel: Photo */}
              <motion.div
                className='lg:col-span-3 relative'
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 1.2,
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                }}
              >
                <div className='relative bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-white/20 rounded-xl p-5 backdrop-blur-sm min-h-[400px] flex items-center justify-center'>
                  {/* Aura */}
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-primary-500/10' />
                  <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent' />

                  {/* Photo */}
                  <div className='relative w-full h-full flex items-center justify-center'>
                    <div className='w-full h-full max-w-[90%] max-h-[90%] aspect-square border border-white/20 rounded-2xl overflow-hidden shadow-xl shadow-black/30'>
                      <img
                        src={profPic}
                        alt='Hartley H. Leroy - Professional headshot'
                        className='w-full h-full object-cover cyberpunk-id-photo'
                      />
                    </div>
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/15 via-transparent to-white/10' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills */}
            <motion.div
              className='relative'
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: prefersReducedMotion ? 0.3 : 0.6,
              }}
            >
              <div className='relative bg-slate-800/50 border border-white/20 rounded-xl p-5 backdrop-blur-sm'>
                <div className='relative z-10'>
                  <h2 className='text-primary-400 font-mono text-base font-bold mb-5'>
                    SKILLS & EXPERTISE
                  </h2>

                  <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3'>
                    {skills.map((skill, index) => (
                      <motion.button
                        key={skill.id}
                        className={`group relative cursor-pointer transition-all duration-300 ${
                          selectedItem === `skill-${skill.id}`
                            ? 'scale-105 z-10'
                            : 'hover:scale-105'
                        }`}
                        onClick={() => handleSkillClick(skill)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleSkillClick(skill)
                          }
                        }}
                        whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{
                          delay: index * 0.1 + 1.4,
                          duration: prefersReducedMotion ? 0.3 : 0.5,
                        }}
                        aria-label={`View ${skill.title} details`}
                        tabIndex={0}
                      >
                        {/* Badge */}
                        <div
                          className={`relative p-3 rounded-lg border transition-all duration-200 aspect-square flex flex-col items-center justify-center ${
                            selectedItem === `skill-${skill.id}`
                              ? 'bg-primary-500/15 border-primary-400/60 shadow-lg shadow-primary-400/20'
                              : 'bg-slate-800/40 hover:bg-slate-700/50 border-white/20 hover:border-primary-400/40'
                          }`}
                        >
                          <div className='relative z-10 flex flex-col items-center justify-center h-full'>
                            <div className='w-7 h-7 mb-2 relative flex-shrink-0'>
                              <div className='transition-transform duration-300 group-hover:scale-110'>
                                {renderSkillIcon(skill.iconType)}
                              </div>
                            </div>

                            <div className='text-primary-300 font-mono text-xs font-bold leading-tight text-center'>
                              {skill.title.split(' ')[0]}
                            </div>
                            <div className='text-white/70 text-xs mt-1'>
                              {skill.level}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call-to-Action */}
          {onEnterPortfolio && (
            <motion.div
              className='flex justify-center mt-8'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.6,
                duration: prefersReducedMotion ? 0.3 : 0.6,
              }}
            >
              <button
                onClick={onEnterPortfolio}
                className='group relative px-8 py-4 bg-primary-500 hover:bg-primary-400 text-gray-900 font-display font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary-500/30 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900'
                aria-label='Enter portfolio section'
              >
                <span className='relative z-10 flex items-center gap-2'>
                  ENTER PORTFOLIO
                  <ExternalLink className='w-4 h-4' />
                </span>
                <div className='absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </button>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            className='mt-6 pt-4 border-t border-white/15 text-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.8,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
          >
            <div className='text-white/50 font-mono text-sm'>
              [ Click services and skills to explore focus areas ]
            </div>
          </motion.div>
        </div>

        {/* Scanlines */}
        <div className='absolute inset-0 scanlines rounded-3xl pointer-events-none opacity-5' />
      </motion.div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        @keyframes gridFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(8px, 8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.2); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.4); }
        }
        .cyberpunk-id-photo {
          filter: 
            contrast(1.1) 
            brightness(1.05) 
            saturate(0.9) 
            hue-rotate(3deg) 
            sepia(0.05);
          background: linear-gradient(135deg, 
            rgba(0,255,255,0.03) 0%, 
            transparent 20%, 
            transparent 80%, 
            rgba(255,0,255,0.03) 100%);
        }
      `}</style>
    </div>
  )
}

export default CyberpunkTrainerDossier
