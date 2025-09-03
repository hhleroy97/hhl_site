import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import PageSection from '../ui/PageSection'

// Company Logo Component with Fallback
const CompanyLogo = ({
  logo,
  logoFallback,
  company,
  className = '',
}: {
  logo: string
  logoFallback: string
  company: string
  className?: string
}) => {
  const [imageError, setImageError] = useState(false)

  if (imageError || !logo) {
    return <span className={`text-2xl ${className}`}>{logoFallback}</span>
  }

  return (
    <img
      src={logo}
      alt={`${company} logo`}
      className={`w-8 h-8 object-contain ${className}`}
      onError={() => setImageError(true)}
    />
  )
}

const experiences = [
  {
    company: 'FDA (ORISE Fellow)',
    role: 'Research Fellow',
    period: 'Aug 2020 - Aug 2021',
    location: 'Miami, FL',
    description:
      "Supported the research and planning for FDA's AI and blockchain initiatives. Assisted in data coordination across multiple medical device registries and internal working groups.",
    keyContributions: [
      'Helped design AI and blockchain strategies for healthcare data',
      'Coordinated meetings across multiple FDA initiatives',
      'Contributed to published research in medical innovation',
      'Supported data coordination across medical device registries',
    ],
    technologies: [
      'AI Strategy',
      'Blockchain Strategy',
      'Healthcare Data',
      'Research',
      'Medical Innovation',
    ],
    logo: '/images/logos/fda-logo.svg',
    logoFallback: '🏛️',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    company: 'Softhread',
    role: 'Software Engineer',
    period: 'Nov 2020 - Nov 2021',
    location: 'Miami, FL',
    description:
      'Built front-end components and interfaces for a privacy-focused blockchain platform designed to protect health information. Collaborated across engineering teams to deliver performant, modular portals.',
    keyContributions: [
      'Developed reusable UI components using React, Vue, and Next.js',
      'Built end-user portals for interacting with private blockchain systems',
      'Helped design and refine APIs for managing blockchain-based transactions',
      'Improved performance and user experience across critical interfaces',
    ],
    technologies: [
      'React',
      'Vue.js',
      'Next.js',
      'Blockchain',
      'API Design',
      'UI/UX',
    ],
    logo: '/images/logos/softhread-logo.png',
    logoFallback: '🔐',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    company: 'Delphi Digital',
    role: 'Web 3.0 Infrastructure Research Analyst',
    period: 'Aug 2021 - Oct 2022',
    location: 'Remote',
    description:
      'Performed technical and economic research on blockchain protocols. Delivered actionable insights to institutional investors through reports and data visualizations.',
    keyContributions: [
      'Analyzed tokenomics, governance models, and blockchain design',
      'Built custom research tools in Python and SQL',
      'Synthesized complex topics into digestible formats for clients',
      'Supported internal strategy and trend identification',
    ],
    technologies: [
      'Python',
      'SQL',
      'Blockchain Analysis',
      'Research',
      'Data Visualization',
    ],
    logo: '/images/logos/delphi-digital-logo.png',
    logoFallback: '🔍',
    color: 'from-emerald-500 to-blue-500',
  },
  {
    company: 'First Turn Innovations',
    role: 'Prototype Engineer',
    period: 'Feb 2023 - Sep 2023',
    location: 'Huntersville, NC',
    description:
      'Developed hardware/software prototypes for early-stage products. Translated vague design ideas into testable MVPs and conducted feasibility studies to validate technical direction.',
    keyContributions: [
      'Built embedded and Python-based tools for rapid prototyping',
      'Conducted hardware evaluations and spec analysis',
      'Balanced performance, cost, and scalability in design',
      'Created proofs-of-concept with minimal supervision',
    ],
    technologies: [
      'Python',
      'Embedded Systems',
      'Hardware Design',
      'Rapid Prototyping',
      'Feasibility Studies',
    ],
    logo: '/images/logos/first-turn-logo.png',
    logoFallback: '🔧',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    company: 'Keep it Simple Storage',
    role: 'Project Manager - Software',
    period: 'Sep 2023 - Sep 2024',
    location: 'Charlotte, NC',
    description:
      'Led product development for internal tools and customer-facing systems. Managed a team of 6 engineers, aligning technical implementation with business and operational goals.',
    keyContributions: [
      'Directed development across software and embedded systems',
      'Managed sprint planning and resource allocation',
      'Integrated firmware processes with cloud-based tooling',
      'Authored documentation for onboarding and knowledge transfer',
      'Aligned executive priorities with development timelines',
    ],
    technologies: [
      'Agile',
      'Sprint Planning',
      'Embedded Systems',
      'Cloud Tooling',
      'Documentation',
    ],
    logo: '/images/logos/keep-it-simple-logo.png',
    logoFallback: '📦',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    company: 'Lucid Bots',
    role: 'Software Engineer - Robotics Fleet Management',
    period: 'Sep 2024 - Jul 2025',
    location: 'Charlotte, NC',
    description:
      'Led coordination of functional requirements, data ingestion architecture, and knowledge transfer between internal teams and external developers to build out cloud infrastructure for a drone fleet management system enabling the company to move away from 3rd party offerings.',
    keyContributions: [
      'Lead creation of ROS2/PX4 robotic systems data ingestion pipelines leveraging various AWS Services (IoT Core, Kinesis, Firehose, AWS Glue, S3, Athena, etc.)',
      'Architected and aided in developing telemetry, OTA update, and log ingestion pipelines',
      'Scoped and translated cross-functional requirements into dev-ready tasks',
      'Documented architecture and led onboarding for external development partners',
    ],
    technologies: [
      'AWS IoT Core',
      'Kinesis',
      'Firehose',
      'AWS Glue',
      'S3',
      'Athena',
      'ROS2',
      'PX4',
    ],
    logo: '/images/logos/lucid-bots-logo.png',
    logoFallback: '🤖',
    color: 'from-purple-500 to-cyan-500',
  },
]

export default function WorkExperienceTimelineHorizontal() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeExpanded = () => setSelectedIndex(null)

  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='offerings that inspire'
      subtitle=''
      cardVariant='rotated'
    >
      <div className='max-w-7xl mx-auto px-4'>
        {/* Horizontal Timeline - Full Width */}
        <div className='relative'>
          {/* Timeline Line */}
          <div className='absolute top-20 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent'></div>

          {/* Timeline Nodes - Spread Wider */}
          <div className='grid grid-cols-6 gap-4 px-8'>
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                className='flex flex-col items-center cursor-pointer group relative'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedIndex(index)}
              >
                {/* Node */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${exp.color} rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                  <div className='relative z-10'>
                    <CompanyLogo
                      logo={exp.logo}
                      logoFallback={exp.logoFallback}
                      company={exp.company}
                    />
                  </div>
                </motion.div>

                {/* Company & Period */}
                <div className='text-center max-w-full px-2'>
                  <h3 className='text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight'>
                    {exp.company}
                  </h3>
                  <p className='text-sm text-zinc-400 leading-tight mb-1'>
                    {exp.period}
                  </p>
                  <p className='text-xs text-zinc-500 leading-tight'>
                    {exp.location}
                  </p>
                </div>

                {/* Hover glow */}
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${exp.color} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Simple Click hint */}
        <div className='text-center text-zinc-400 text-sm mt-8'>
          Click any company to explore details
        </div>
      </div>

      {/* Expanded Experience Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpanded}
          >
            <motion.div
              className='bg-black/90 backdrop-blur-md rounded-3xl border border-white/20 p-8 max-w-6xl w-[90vw] max-h-[85vh] overflow-y-auto shadow-2xl'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {(() => {
                const exp = experiences[selectedIndex]
                return (
                  <>
                    {/* Close Button */}
                    <button
                      onClick={closeExpanded}
                      className='absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <X className='w-5 h-5 text-white' />
                    </button>

                    {/* Background Effects */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 rounded-3xl`}
                    ></div>
                    <div className='absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl'></div>

                    <div className='relative z-10'>
                      {/* Header */}
                      <div className='flex items-start gap-6 mb-8'>
                        <div className='text-5xl'>{exp.logo}</div>
                        <div className='flex-1'>
                          <h2 className='text-3xl font-bold text-white mb-2'>
                            {exp.company}
                          </h2>
                          <p className='text-xl text-cyan-400 font-semibold mb-2'>
                            {exp.role}
                          </p>
                          <div className='flex items-center gap-4 text-zinc-400'>
                            <span className='font-medium'>{exp.period}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className='mb-8'>
                        <p className='text-zinc-300 leading-relaxed text-lg'>
                          {exp.description}
                        </p>
                      </div>

                      {/* Key Contributions */}
                      <div className='mb-8'>
                        <h3 className='text-white font-bold mb-4 text-xl'>
                          Key Contributions
                        </h3>
                        <ul className='space-y-3'>
                          {exp.keyContributions.map((contribution, i) => (
                            <li key={i} className='flex items-start gap-3'>
                              <div
                                className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full mt-2 flex-shrink-0`}
                              ></div>
                              <span className='text-zinc-300 leading-relaxed'>
                                {contribution}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className='text-white font-bold mb-4 text-xl'>
                          Technologies & Skills
                        </h3>
                        <div className='flex flex-wrap gap-3'>
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className='px-4 py-2 bg-white/10 border border-white/20 rounded-xl font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageSection>
  )
}
