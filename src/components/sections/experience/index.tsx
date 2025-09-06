import { useState } from 'react'
import PageSection from '../../ui/PageSection'
import JobCard from './JobCard'
import JobView from './JobView'
import fdaLogo from '../../assets/fda-logo.png'
import softhreadLogo from '../../assets/Softhread_Logo.jpg'
import delphiLogo from '../../assets/DELPHI-DIGITAL-MASTER-LOGO.jpg'
import firstTurnLogo from '../../assets/first_turn_innovations_llc_logo.jpg'
import kissLogo from '../../assets/kiss_logo.png'
import lucidBotsLogo from '../../assets/lucid-bots-logo.png'

const experiences = [
  {
    company: 'FDA',
    title: 'Research Fellow',
    timeframe: 'Aug 2020 - Aug 2021',
    location: 'Oakridge, VA, USA',
    workType: 'Remote',
    logo: fdaLogo,
    industry: 'Healthcare & Government',
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
    location: 'Miami, FL, USA',
    workType: 'Remote',
    logo: softhreadLogo,
    industry: 'Healthcare Technology',
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
    title: 'Research Analyst',
    timeframe: 'Aug 2021 - Oct 2022',
    location: 'New York City, NY, USA',
    workType: 'Remote',
    logo: delphiLogo,
    industry: 'Financial Services',
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
    location: 'Huntersville, NC, USA',
    workType: 'Hybrid',
    logo: firstTurnLogo,
    industry: 'Product Development',
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
    location: 'Charlotte, NC, USA',
    workType: 'Hybrid',
    logo: kissLogo,
    industry: 'Storage Solutions',
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
    title: 'Software Engineer - Fleet Management',
    timeframe: 'Sep 2024 - Jul 2025',
    location: 'Charlotte, NC, USA',
    workType: 'Hybrid',
    logo: lucidBotsLogo,
    industry: 'Robotics & Automation',
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
  const [clickedCardPosition, setClickedCardPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const closeExpanded = () => {
    setSelectedIndex(null)
    setClickedCardPosition(null)
  }

  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='Building systems that scale'
      subtitle='and offerings that inspire'
      cardVariant='floating'
    >
      <div className='max-w-full mx-auto px-1 sm:px-2 h-full flex flex-col justify-center'>
        {/* Main Container - Centered Timeline with Job Cards */}
        <div className='flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8'>
          {/* Timeline Container - Centered */}
          <div className='relative w-full'>
            {/* Main Timeline Line - Extended to 2026 with arrow */}
            <div className='relative h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/60 to-cyan-400/40 mx-2 sm:mx-4'>
              {/* Extended line for 2026 */}
              <div className='absolute right-0 top-0 w-16 h-px bg-gradient-to-r from-cyan-400/60 to-cyan-400/30'></div>

              {/* Arrow pointing right at the very end - aligned with line */}
              <div className='absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-cyan-400/60 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent'></div>

              {/* Year markers with dots - centered on line */}
              <div className='absolute left-0 right-16 top-1/2 transform -translate-y-1/2 flex justify-between items-center'>
                {/* Year marker dots */}
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2020
                  </span>
                </div>
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2021
                  </span>
                </div>
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2022
                  </span>
                </div>
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2023
                  </span>
                </div>
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2024
                  </span>
                </div>
                <div className='relative'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full border border-black/50 shadow-lg'></div>
                  <span
                    className='absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    2025
                  </span>
                </div>
              </div>

              {/* Experience dots positioned along the line */}
              <div className='absolute left-0 right-16 top-1/2 transform -translate-y-1/2 flex justify-between items-center'>
                {experiences.map((_, index) => (
                  <div
                    key={`exp-dot-${index}`}
                    className='w-3 h-3 bg-cyan-400 rounded-full border-2 border-black/50 shadow-lg'
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Cards Grid - Centered below Timeline */}
          <div className='group/cards grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 w-full'>
            {experiences.map((exp, index) => (
              <div key={`${exp.company}-${index}`} className='relative'>
                {/* Connecting line from timeline to job card */}
                <div className='absolute left-1/2 -top-12 sm:-top-16 w-px h-10 sm:h-14 bg-gradient-to-b from-cyan-400/60 to-cyan-400/20 transform -translate-x-1/2'></div>

                <JobCard
                  logo={exp.logo}
                  company={exp.company}
                  title={exp.title}
                  location={exp.location}
                  workType={exp.workType}
                  industry={exp.industry}
                  index={index}
                  onClick={event => {
                    const rect = event.currentTarget.getBoundingClientRect()
                    setClickedCardPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                    })
                    setSelectedIndex(index)
                  }}
                />
              </div>
            ))}
          </div>

          {/* Click hint - Centered */}
          <div
            className='text-center text-white text-sm sm:text-base md:text-xl font-bold flex items-center justify-center gap-1 sm:gap-2'
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className='text-xl sm:text-2xl md:text-3xl text-white'>
              [
            </span>
            <span>Click on any company to learn more</span>
            <span className='text-xl sm:text-2xl md:text-3xl text-white'>
              ]
            </span>
          </div>
        </div>
      </div>

      {/* Job View Modal */}
      <JobView
        isOpen={selectedIndex !== null}
        onClose={closeExpanded}
        experience={selectedIndex !== null ? experiences[selectedIndex] : null}
        clickedPosition={clickedCardPosition}
      />
    </PageSection>
  )
}
