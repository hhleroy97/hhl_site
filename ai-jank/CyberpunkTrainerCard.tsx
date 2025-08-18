import React from 'react'
import { motion } from 'framer-motion'
import characterProfile from '../assets/character-profile.png'
import cloudBadge from '../assets/cloud-badge.png'
import pythonBadge from '../assets/python-badge.png'
import databaseBadge from '../assets/database-badge.png'
import pipeBadge from '../assets/pipe-badge.png'
import robotBadge from '../assets/robot-badge.png'
import etlBadge from '../assets/etl-badge.png'
import collabBadge from '../assets/collab-badge.png'
import checklistBadge from '../assets/checklist-badge.png'

interface ServiceItem {
  id: string
  type: 'service' | 'skill'
  title: string
  description: string
  technologies: string[]
  highlight: string
  icon?: string
  deliverables?: string[]
  timeline?: string
  category?: string
  proficiency?: 'Expert' | 'Advanced' | 'Proficient'
}

interface CyberpunkTrainerCardProps {
  trainerName?: string
  className?: string
  onEnterPortfolio?: () => void
  coreServices?: ServiceItem[]
  skillsCapabilities?: ServiceItem[]
  onHoverItem?: (item: ServiceItem | null) => void
}

const CyberpunkTrainerCard: React.FC<CyberpunkTrainerCardProps> = ({
  trainerName: _trainerName = 'HARTLEY H. LEROY',
  className = '',
  onEnterPortfolio,
  onHoverItem,
  coreServices = [
    {
      id: 'cloud-infrastructure',
      type: 'service' as const,
      title: 'Cloud & Data Infrastructure Setup',
      description:
        'Deploy production-ready cloud pipelines for data ingestion, processing, and storage. Perfect for startups who need reliable infrastructure without hiring a full cloud team.',
      technologies: ['AWS IoT', 'Kinesis', 'Glue', 'S3', 'CloudFormation'],
      highlight:
        'Built telemetry infrastructure processing 10M+ events daily with 99.9% uptime',
      deliverables: [
        'AWS IoT + Kinesis + S3 pipeline setup',
        'ETL workflows with dashboards',
        'Complete documentation & handoff',
      ],
      timeline: '2-4 weeks',
      icon: '☁️',
    },
    {
      id: 'robotics-connectivity',
      type: 'service' as const,
      title: 'Robotics & IoT Connectivity',
      description:
        'Bridge the gap between hardware and cloud teams. Get your robots, drones, and IoT devices talking to the cloud with secure telemetry and remote updates.',
      technologies: ['ROS2', 'PX4', 'MQTT', 'OTA Updates', 'Device APIs'],
      highlight:
        'Deployed secure OTA pipeline serving 500+ autonomous vehicles in production',
      deliverables: [
        'ROS2/PX4 cloud integration',
        'Secure remote update system',
        'Device-to-dashboard connectivity',
      ],
      timeline: '3-6 weeks',
      icon: '🤖',
    },
    {
      id: 'embedded-firmware',
      type: 'service' as const,
      title: 'Embedded Software Development',
      description:
        'Reliable firmware for microcontrollers and embedded Linux systems. From bare-metal to production deployment with OTA capabilities.',
      technologies: ['C/C++', 'Embedded Linux', 'FreeRTOS', 'STM32', 'ESP32'],
      highlight:
        'Delivered 15+ firmware releases with zero field failures across 10K+ devices',
      deliverables: [
        'Production firmware development',
        'Debugging & optimization',
        'OTA update workflows',
      ],
      timeline: '4-8 weeks',
      icon: '⚡',
    },
    {
      id: 'data-dashboards',
      type: 'service' as const,
      title: 'Custom Dashboards & Monitoring',
      description:
        'Turn your data into actionable insights with real-time dashboards. Monitor fleet performance, catch issues early, and make data-driven decisions.',
      technologies: ['Grafana', 'Tableau', 'React', 'D3.js', 'InfluxDB'],
      highlight:
        'Reduced incident response time by 60% with real-time monitoring dashboards',
      deliverables: [
        'Real-time monitoring setup',
        'Custom visualization dashboards',
        'Alerting & reporting tools',
      ],
      timeline: '1-3 weeks',
      icon: '📊',
    },
    {
      id: 'web-development',
      type: 'service' as const,
      title: 'Web Apps & Internal Tools',
      description:
        'Fast, reliable web applications and internal tools. From MVP to production, built with modern frameworks and solid API foundations.',
      technologies: ['React', 'Vue', 'Node.js', 'Python', 'REST APIs'],
      highlight:
        'Built fleet management platform used by 200+ operators across 3 continents',
      deliverables: [
        'MVP web applications',
        'API integrations',
        'Production-ready UI/UX',
      ],
      timeline: '2-6 weeks',
      icon: '💻',
    },
    {
      id: 'rapid-prototyping',
      type: 'service' as const,
      title: 'Rapid Prototyping & POCs',
      description:
        'Quickly validate product ideas with working prototypes. Get evidence before committing big budget to full product development.',
      technologies: [
        'Python',
        'Arduino',
        'TouchDesigner',
        '3D Printing',
        'AI/ML',
      ],
      highlight:
        'Delivered 12+ POCs that secured $2M+ in follow-on product funding',
      deliverables: [
        'Working proof-of-concepts',
        'Technical feasibility reports',
        'Demo-ready prototypes',
      ],
      timeline: '1-2 weeks',
      icon: '🔬',
    },
  ],
  skillsCapabilities = [
    {
      id: 'aws',
      type: 'skill' as const,
      title: 'AWS Cloud',
      description:
        'Enterprise-grade cloud infrastructure deployment and optimization. Specializing in IoT, data processing, and serverless architectures.',
      technologies: ['EC2', 'Lambda', 'IoT Core', 'Kinesis', 'CloudFormation'],
      highlight: 'Managed $50K+/month AWS infrastructure with 99.9% uptime',
      category: 'Cloud Platforms',
      proficiency: 'Expert' as const,
      icon: '☁️',
    },
    {
      id: 'python',
      type: 'skill' as const,
      title: 'Python Development',
      description:
        'Full-stack Python development for data processing, APIs, and automation. From scripts to production services.',
      technologies: ['FastAPI', 'Django', 'Pandas', 'NumPy', 'pytest'],
      highlight: 'Built 25+ production systems processing TB-scale data daily',
      category: 'Programming',
      proficiency: 'Expert' as const,
      icon: '🐍',
    },
    {
      id: 'sql',
      type: 'skill' as const,
      title: 'Database & Analytics',
      description:
        'Database design, query optimization, and analytics pipeline development across SQL and NoSQL systems.',
      technologies: ['PostgreSQL', 'MySQL', 'Athena', 'BigQuery', 'MongoDB'],
      highlight: 'Optimized queries reducing costs by $10K+/month',
      category: 'Data',
      proficiency: 'Expert' as const,
      icon: '🗃️',
    },
    {
      id: 'data-pipelines',
      type: 'skill' as const,
      title: 'Data Pipelines',
      description:
        'End-to-end data pipeline architecture for real-time and batch processing at scale.',
      technologies: ['Airflow', 'Kinesis', 'Kafka', 'Spark', 'dbt'],
      highlight: 'Processing 50M+ events daily with 99.8% reliability',
      category: 'Data',
      proficiency: 'Expert' as const,
      icon: '📊',
    },
    {
      id: 'robotics',
      type: 'skill' as const,
      title: 'Robotics Integration',
      description:
        'Connecting autonomous systems to cloud infrastructure for telemetry, control, and fleet management.',
      technologies: ['ROS2', 'PX4', 'MAVLINK', 'MQTT', 'OTA Updates'],
      highlight: 'Deployed across 1000+ autonomous vehicles worldwide',
      category: 'Hardware',
      proficiency: 'Advanced' as const,
      icon: '🤖',
    },
    {
      id: 'embedded',
      type: 'skill' as const,
      title: 'Embedded Systems',
      description:
        'Low-level firmware development and embedded Linux systems for production hardware.',
      technologies: ['C/C++', 'FreeRTOS', 'STM32', 'ESP32', 'Yocto'],
      highlight: 'Zero field failures across 10K+ deployed devices',
      category: 'Hardware',
      proficiency: 'Advanced' as const,
      icon: '⚙️',
    },
    {
      id: 'web-dev',
      type: 'skill' as const,
      title: 'Web Development',
      description:
        'Modern web applications and APIs. From prototypes to production-scale systems.',
      technologies: ['React', 'Vue', 'Node.js', 'REST APIs', 'WebSockets'],
      highlight: 'Built platforms serving 1000+ daily active users',
      category: 'Web',
      proficiency: 'Advanced' as const,
      icon: '💻',
    },
    {
      id: 'devops',
      type: 'skill' as const,
      title: 'DevOps & CI/CD',
      description:
        'Automated deployment pipelines, infrastructure as code, and production monitoring.',
      technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
      highlight: 'Reduced deployment time from hours to minutes',
      category: 'Infrastructure',
      proficiency: 'Proficient' as const,
      icon: '🔧',
    },
  ],
}) => {
  const getPlaceholderIcon = (icon?: string) => {
    return icon || '📦'
  }

  return (
    <div className={className}>
      <div
        className={`cyberpunk-trainer-card-mobile relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-4 shadow-2xl`}
        style={{
          borderRadius: '2rem',
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
        <div
          className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none'
          style={{ borderRadius: '2rem' }}
        />

        {/* Top Header with Name and Tagline */}
        <div
          className='flex items-center mb-2 lg:mb-2 px-3 py-2 lg:py-1 bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 rounded-t-2xl border border-cyberpunk-neon/30 relative overflow-hidden shadow-2xl'
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
                  className='text-sm lg:text-sm mobile-header-text font-cyber font-bold cyberpunk-glow tracking-wider shadow-lg mobile-high-contrast'
                  style={{}}
                >
                  {_trainerName}
                </h1>
                <p
                  className='text-cyberpunk-neon/60 font-mono text-xs lg:text-[8px] mobile-subheader-text shadow-md mobile-medium-contrast'
                  style={{}}
                >
                  ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div
              className='flex items-center space-x-2 lg:space-x-1 mr-2 shadow-2xl'
              style={{}}
            >
              <a
                href='https://github.com/hhleroy97'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative w-8 h-8 lg:w-6 lg:h-6 mobile-touch-target bg-gradient-to-r from-cyberpunk-green/20 to-cyberpunk-blue/20 text-cyberpunk-green font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-green/30 hover:shadow-lg hover:shadow-cyberpunk-green/30 hover:scale-105 flex items-center justify-center rounded'
              >
                <svg
                  className='w-4 h-4 lg:w-3 lg:h-3 relative z-10'
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
                className='group relative w-8 h-8 lg:w-6 lg:h-6 mobile-touch-target bg-gradient-to-r from-cyberpunk-blue/20 to-cyberpunk-purple/20 text-cyberpunk-blue font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-blue/30 hover:shadow-lg hover:shadow-cyberpunk-blue/30 hover:scale-105 flex items-center justify-center rounded'
              >
                <svg
                  className='w-4 h-4 lg:w-3 lg:h-3 relative z-10'
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
                  className='group relative w-8 h-8 lg:w-6 lg:h-6 mobile-touch-target bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-pink/20 text-cyberpunk-neon font-cyber font-bold transition-all duration-300 hover:bg-cyberpunk-neon/30 hover:shadow-lg hover:shadow-cyberpunk-neon/30 hover:scale-105 flex items-center justify-center rounded'
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
        <div className='w-full space-y-2 relative z-10'>
          {/* Top Row - Core Services and Profile */}
          <div className='w-full space-y-1'>
            {/* Core Services Header */}
            <h3 className='text-cyberpunk-pink font-cyber text-sm lg:text-sm mobile-section-header font-bold tracking-wider relative z-10'>
              <span>CORE SERVICES</span>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
            </h3>
            <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-4 mobile-spacing-normal'>
              {/* Core Services Section - 3/4 width on desktop, full width on mobile */}
              <div className='col-span-1 lg:col-span-3 h-auto lg:h-64 bg-gradient-to-r from-cyberpunk-purple/5 to-cyberpunk-blue/5 border border-cyberpunk-neon/20 p-4 relative overflow-hidden shadow-lg'>
                {/* Vertical separator line */}
                <div className='absolute top-0 -right-2 h-full w-px bg-gradient-to-b from-transparent via-cyberpunk-neon/40 to-transparent'></div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-1 h-full mobile-service-grid'>
                  {coreServices.map(service => (
                    <motion.div
                      key={service.id}
                      className='h-full lg:h-full mobile-service-card bg-gradient-to-br from-cyberpunk-purple/20 to-cyberpunk-blue/20 flex flex-col lg:flex-col items-center lg:items-center justify-center relative overflow-hidden group p-3 lg:p-1 cursor-pointer mobile-touch-target'
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => onHoverItem?.(service)}
                      onMouseLeave={() => onHoverItem?.(null)}
                    >
                      <motion.div
                        className='absolute inset-0 border border-cyberpunk-neon/40'
                        style={{
                          clipPath:
                            'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                        }}
                        whileHover={{
                          borderColor: 'rgba(236, 72, 153, 0.8)',
                          boxShadow: [
                            '0 0 0 rgba(236, 72, 153, 0)',
                            '0 0 25px rgba(236, 72, 153, 0.4)',
                            '0 0 35px rgba(236, 72, 153, 0.2)',
                            '0 0 15px rgba(59, 130, 246, 0.3)',
                          ],
                          filter: 'brightness(1.2)',
                          transition: { duration: 0.3, ease: 'easeOut' },
                        }}
                      />
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-br from-cyberpunk-pink/0 via-transparent to-cyberpunk-blue/0'
                        whileHover={{
                          background:
                            'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                          transition: { duration: 0.3 },
                        }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      <div className='text-center z-10 space-y-1'>
                        <motion.div
                          className='text-lg mb-1 filter drop-shadow-[0_0_8px_currentColor] text-cyberpunk-neon'
                          whileHover={{
                            scale: 1.2,
                            rotate: [0, -5, 5, 0],
                            filter:
                              'drop-shadow(0 0 12px currentColor) brightness(1.3)',
                            transition: { duration: 0.3 },
                          }}
                        >
                          {getPlaceholderIcon(service.icon)}
                        </motion.div>
                        <motion.h4
                          className='font-cyber text-sm lg:text-xs mobile-body-text font-bold leading-tight text-cyberpunk-neon mobile-high-contrast'
                          style={{
                            opacity: 0.9,
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.05,
                            color: '#ec4899',
                            transition: { duration: 0.2 },
                          }}
                        >
                          {service.title}
                        </motion.h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Profile Section - 1/4 width on desktop, moved to top on mobile */}
              <div className='col-span-1 lg:col-span-1 relative mobile-profile-section order-first lg:order-last'>
                <div className='relative h-48 lg:h-64 mobile-profile-card bg-gradient-to-r from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 overflow-hidden shadow-xl'>
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
                          className='text-cyberpunk-green font-cyber text-sm lg:text-xs mobile-body-text font-bold mb-1 mobile-high-contrast'
                          style={{}}
                        >
                          AVAILABLE FOR HIRE
                        </div>
                        <div
                          className='text-cyberpunk-neon/60 font-mono text-xs lg:text-[10px] mobile-small-text leading-tight mobile-medium-contrast'
                          style={{ transform: 'translateZ(5px)' }}
                        >
                          Full-Stack Engineer
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='absolute inset-0 scanlines' />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Skills & Capabilities Section */}
          <div className='w-full space-y-1'>
            {/* Skills & Capabilities Header */}
            <h3 className='text-cyberpunk-pink font-cyber text-sm lg:text-sm mobile-section-header font-bold tracking-wider relative z-10'>
              <span>SKILLS & CAPABILITIES</span>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyberpunk-pink rounded-full animate-pulse' />
            </h3>
            <div
              className='w-full bg-gradient-to-r from-cyberpunk-blue/5 to-cyberpunk-purple/5 border border-cyberpunk-neon/30 p-4 relative overflow-hidden shadow-md rounded-b-2xl'
              style={{}}
            >
              <div className='grid grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-2 mobile-skills-container'>
                {skillsCapabilities.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    className='w-full h-14 lg:w-full lg:h-16 mobile-skill-badge bg-gradient-to-br from-cyberpunk-neon/10 to-cyberpunk-blue/20 flex flex-col items-center justify-center relative overflow-hidden group p-1 lg:p-2 cursor-pointer mobile-touch-target'
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => onHoverItem?.(skill)}
                    onMouseLeave={() => onHoverItem?.(null)}
                  >
                    <motion.div
                      className='absolute inset-0 border border-cyberpunk-neon/50'
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                      }}
                      whileHover={{
                        borderColor: 'rgba(59, 130, 246, 0.9)',
                        boxShadow: [
                          '0 0 0 rgba(59, 130, 246, 0)',
                          '0 0 20px rgba(59, 130, 246, 0.5)',
                          '0 0 30px rgba(59, 130, 246, 0.3)',
                          '0 0 10px rgba(236, 72, 153, 0.2)',
                        ],
                        filter: 'brightness(1.3)',
                        transition: { duration: 0.25, ease: 'easeOut' },
                      }}
                    />
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-cyberpunk-blue/0 via-transparent to-cyberpunk-neon/0'
                      whileHover={{
                        background:
                          'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
                        transition: { duration: 0.25 },
                      }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='text-center z-10'>
                      <div className='flex flex-col items-center space-y-1'>
                        <motion.div
                          className='flex items-center justify-center h-8'
                          whileHover={{
                            scale: 1.15,
                            rotate: [0, -3, 3, 0],
                            transition: { duration: 0.25 },
                          }}
                        >
                          {i === 0 ? (
                            <motion.img
                              src={cloudBadge}
                              alt='Cloud Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 1 ? (
                            <motion.img
                              src={pythonBadge}
                              alt='Python Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(255, 212, 59, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 2 ? (
                            <motion.img
                              src={databaseBadge}
                              alt='Database Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 3 ? (
                            <motion.img
                              src={pipeBadge}
                              alt='Pipeline Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 4 ? (
                            <motion.img
                              src={robotBadge}
                              alt='Robot Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 5 ? (
                            <motion.img
                              src={etlBadge}
                              alt='ETL Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 6 ? (
                            <motion.img
                              src={collabBadge}
                              alt='Collaboration Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : i === 7 ? (
                            <motion.img
                              src={checklistBadge}
                              alt='Agile Badge'
                              className='w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px rgba(245, 101, 101, 0.6))',
                                transition: { duration: 0.2 },
                              }}
                            />
                          ) : (
                            <motion.span
                              className='text-lg lg:text-xl text-cyberpunk-neon flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center'
                              whileHover={{
                                filter:
                                  'brightness(1.3) drop-shadow(0 0 8px currentColor)',
                                transition: { duration: 0.2 },
                              }}
                            >
                              {skill.icon}
                            </motion.span>
                          )}
                        </motion.div>
                        <h4 className='font-mono text-xs lg:text-[8px] mobile-small-text font-bold leading-tight filter drop-shadow-[0_0_4px_currentColor] text-cyberpunk-neon text-center mobile-high-contrast'>
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCard
