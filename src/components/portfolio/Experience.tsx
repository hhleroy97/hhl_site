import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import PageSection from '../ui/PageSection'
import JobCard from '../ui/JobCard'
import fdaLogo from '../../assets/fda-logo.png'
import softhreadLogo from '../../assets/Softhread_Logo.jpg'
import delphiLogo from '../../assets/DELPHI-DIGITAL-MASTER-LOGO.jpg'
import firstTurnLogo from '../../assets/first_turn_innovations_llc_logo.jpg'
import kissLogo from '../../assets/kiss_logo.png'
import lucidBotsLogo from '../../assets/lucid-bots-logo.png'

const experiences = [
  {
    company: 'FDA (ORISE Fellow)',
    title: 'Research Fellow',
    timeframe: 'Aug 2020 - Aug 2021',
    location: 'Remote',
    logo: fdaLogo,
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
    color: 'from-indigo-500 to-purple-500',
  },
  {
    company: 'Softhread',
    title: 'Software Engineer',
    timeframe: 'Nov 2020 - Nov 2021',
    location: 'Remote',
    logo: softhreadLogo,
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
    color: 'from-blue-500 to-indigo-500',
  },
  {
    company: 'Delphi Digital',
    title: 'Web 3.0 Infrastructure Research Analyst',
    timeframe: 'Aug 2021 - Oct 2022',
    location: 'Remote',
    logo: delphiLogo,
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
    color: 'from-emerald-500 to-blue-500',
  },
  {
    company: 'First Turn Innovations',
    title: 'Prototype Engineer',
    timeframe: 'Feb 2023 - Sep 2023',
    location: 'Huntersville, NC',
    logo: firstTurnLogo,
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
    color: 'from-teal-500 to-emerald-500',
  },
  {
    company: 'Keep it Simple Storage',
    title: 'Project Manager - Software',
    timeframe: 'Sep 2023 - Sep 2024',
    location: 'Charlotte, NC',
    logo: kissLogo,
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
    color: 'from-cyan-500 to-teal-500',
  },
  {
    company: 'Lucid Bots',
    title: 'Software Engineer - Robotics Fleet Management',
    timeframe: 'Sep 2024 - Jul 2025',
    location: 'Charlotte, NC',
    logo: lucidBotsLogo,
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
      title='Building systems that scale'
      subtitle='and offerings that inspire'
      cardVariant='floating'
    >
      <div className='max-w-full mx-auto px-2'>
        {/* Click hint */}
        <div className='text-center text-zinc-400 text-sm mb-12'>
          Click any company to explore details
        </div>

        {/* Timeline Container */}
        <div className='relative mb-16'>
          {/* Main Timeline Line - Extended to 2026 with arrow */}
          <div className='relative h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/60 to-cyan-400/40 mx-4'>
            {/* Extended line for 2026 */}
            <div className='absolute right-0 top-0 w-16 h-px bg-gradient-to-r from-cyan-400/60 to-cyan-400/30'></div>

            {/* Arrow pointing right at the very end - aligned with line */}
            <div className='absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-cyan-400/60 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent'></div>

            {/* Year markers with dots - centered on line */}
            <div className='absolute left-0 right-16 top-1/2 transform -translate-y-1/2 flex justify-between items-center'>
              {/* Year marker dots */}
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2020
                </span>
              </div>
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2021
                </span>
              </div>
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2022
                </span>
              </div>
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2023
                </span>
              </div>
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2024
                </span>
              </div>
              <div className='relative'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-medium'>
                  2025
                </span>
              </div>
            </div>

            {/* Experience dots positioned along the line */}
            <div className='absolute left-0 right-16 top-1/2 transform -translate-y-1/2 flex justify-between items-center'>
              {experiences.map((exp, index) => (
                <div
                  key={`exp-dot-${index}`}
                  className='w-3 h-3 bg-orange-400 rounded-full border-2 border-black/50 shadow-lg'
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards Grid - Below Timeline */}
        <div className='grid grid-cols-6 gap-6 px-4'>
          {experiences.map((exp, index) => (
            <div key={`${exp.company}-${index}`} className='relative'>
              {/* Connecting line from timeline to job card */}
              <div className='absolute left-1/2 -top-16 w-px h-14 bg-gradient-to-b from-cyan-400/60 to-cyan-400/20 transform -translate-x-1/2'></div>

              <JobCard
                logo={exp.logo}
                company={exp.company}
                title={exp.title}
                location={exp.location}
                index={index}
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          ))}
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
                        <div className='flex items-center justify-center'>
                          {typeof exp.logo === 'string' &&
                          (exp.logo.startsWith('/') ||
                            exp.logo.startsWith('data:') ||
                            exp.logo.includes('.') ||
                            exp.logo.startsWith('blob:')) ? (
                            <img
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              className='w-20 h-20 object-contain'
                            />
                          ) : (
                            <span className='text-5xl'>{exp.logo}</span>
                          )}
                        </div>
                        <div className='flex-1'>
                          <h2 className='text-3xl font-bold text-white mb-2'>
                            {exp.company}
                          </h2>
                          <p className='text-xl text-cyan-400 font-semibold mb-2'>
                            {exp.title}
                          </p>
                          <div className='flex items-center gap-4 text-zinc-400'>
                            <span className='font-medium'>{exp.timeframe}</span>
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
