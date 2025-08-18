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
  TrendingUp,
  Globe,
  ArrowRight,
  Mail,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

interface ProfessionalLandingProps {
  onEnterPortfolio?: () => void
}

const services = [
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description:
      'Infrastructure deployment, data pipelines, and AWS cloud architecture. Building scalable systems that process millions of events daily.',
    icon: Cloud,
    color: 'accent-electric',
    details: [
      'AWS IoT Core & Kinesis',
      'S3 Data Lakes',
      'CloudFormation IaC',
      '10M+ events/day',
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics Integration',
    description:
      'Telemetry systems, OTA updates, and fleet control for autonomous platforms. Bridging hardware and cloud infrastructure.',
    icon: Cpu,
    color: 'accent-coral',
    details: [
      'ROS2 Communication',
      'PX4 Flight Control',
      'MQTT Protocols',
      '500+ robots deployed',
    ],
  },
  {
    id: 'data',
    title: 'Data Engineering',
    description:
      'ETL pipelines, real-time processing, and analytics infrastructure. Transforming raw data into actionable insights.',
    icon: Database,
    color: 'accent-mint',
    details: [
      'Stream Processing',
      'ETL Pipelines',
      'Schema Design',
      'High-volume Processing',
    ],
  },
  {
    id: 'web',
    title: 'Web Applications',
    description:
      'Modern web applications with real-time data visualization. Dashboards, operator tools, and customer platforms.',
    icon: Globe,
    color: 'accent-lavender',
    details: [
      'React/Vue Frameworks',
      'Real-time Dashboards',
      'Fleet Management UI',
      '200+ operators',
    ],
  },
]

const skills = [
  'Python Development',
  'Cloud Architecture',
  'Data Engineering',
  'Robotics Systems',
  'Web Applications',
  'Team Leadership',
]

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Robots Deployed', value: '500+' },
  { label: 'Events/Day', value: '10M+' },
  { label: 'Team Members Led', value: '6+' },
]

const ProfessionalLanding: React.FC<ProfessionalLandingProps> = ({
  onEnterPortfolio,
}) => {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating geometric shapes for artistic flair */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-4 lg:left-20 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-4 lg:right-32 w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-lg rotate-45"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-4 lg:left-32 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-violet-400/20 to-blue-400/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  Cloud & Data Engineer
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                >
                  Building the{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    infrastructure
                  </span>{' '}
                  that powers innovation
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed"
                >
                  Full-stack engineer specializing in robotics, cloud infrastructure, and data systems. 
                  Expert at bridging hardware and software domains to build scalable, production-ready solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <button
                    onClick={onEnterPortfolio}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/25"
                  >
                    View Portfolio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200">
                    <Mail className="w-5 h-5" />
                    Get in Touch
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl lg:text-2xl font-bold text-slate-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-white to-slate-100 rounded-3xl p-8 shadow-2xl border border-slate-200">
                  {/* Skill tags floating around */}
                  <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.1,
                        }}
                        className="px-3 py-2 lg:px-4 lg:py-3 bg-white border border-slate-200 rounded-lg text-xs lg:text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full opacity-60" />
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-emerald-400 rounded-full opacity-60" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-6 py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Specialized Services
              </h2>
              <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
                From cloud infrastructure to robotics integration, I build the technical foundation 
                that enables innovation and scales with your ambitions.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="h-full bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4 mb-6">
                                        <div className={`p-3 rounded-xl ${
                    service.color === 'accent-electric' ? 'bg-blue-50' :
                    service.color === 'accent-coral' ? 'bg-orange-50' :
                    service.color === 'accent-mint' ? 'bg-emerald-50' :
                    'bg-violet-50'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.color === 'accent-electric' ? 'text-blue-600' :
                      service.color === 'accent-coral' ? 'text-orange-600' :
                      service.color === 'accent-mint' ? 'text-emerald-600' :
                      'text-violet-600'
                    }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-slate-100 pt-6"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {service.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-slate-600"
                              >
                                <CheckSquare className="w-4 h-4 text-emerald-600" />
                                {detail}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Ready to build something{' '}
                <span className="bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">
                  extraordinary
                </span>
                ?
              </h2>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can leverage cutting-edge technology to solve your 
                most complex engineering challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onEnterPortfolio}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200"
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200">
                  <ExternalLink className="w-5 h-5" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProfessionalLanding