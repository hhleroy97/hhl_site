import { motion } from 'framer-motion'
import ExperienceCard from '@components/ui/ExperienceCard'

// Actual experience data from resume - formatted for ExperienceCard component
const experiences = [
  {
    id: '1',
    company: 'Lucid Bots',
    role: 'Software Engineer – Robotics Fleet Management',
    duration: 'Sep 2024 – Jul 2025',
    description: [
      'Managed the migration from a third-party fleet management offering to in-house AWS MAP–funded infrastructure worth 500 thousand dollars',
      'Engineered telemetry, OTA update, and log ingestion pipelines using AWS IoT Core, Kinesis, Firehose, Glue, S3, Athena',
      'Integrated pipelines with ROS2/PX4 drones, optimizing data ingestion and reliability',
    ],
    technologies: ['AWS IoT Core', 'Kinesis', 'ROS2', 'PX4', 'Python'],
    type: 'technical' as const,
  },
  {
    id: '2',
    company: 'Keep It Simple Storage',
    role: 'Product Manager (Software/Firmware)',
    duration: 'Oct 2023 – Sep 2024',
    description: [
      'Directed 6 engineers building internal tools and customer-facing systems',
      'Scoped, prioritized, and executed features via Agile/Scrum, aligning development with business goals',
      'Integrated firmware for NFC energy harvesting smart lock',
    ],
    technologies: ['Agile/Scrum', 'Product Management', 'Firmware', 'NFC'],
    type: 'leadership' as const,
  },
  {
    id: '3',
    company: 'First Turn Innovations',
    role: 'Prototype Engineer',
    duration: 'Jan 2023 – Oct 2023',
    description: [
      'Developed hardware/software prototypes and MVPs; built Python & embedded C tools',
      'Conducted hardware evaluations balancing performance, cost, and scalability',
    ],
    technologies: [
      'Python',
      'Embedded C',
      'Hardware Prototyping',
      'MVP Development',
    ],
    type: 'technical' as const,
  },
  {
    id: '4',
    company: 'Delphi Digital',
    role: 'Research Analyst',
    duration: 'Jun 2022 – Dec 2022',
    description: [
      'Published medical innovation research in JAMA (2023)',
      'Delivered institutional investor reports on blockchain tokenomics',
      'Developed Python/SQL research tools for data analysis',
    ],
    technologies: [
      'Python',
      'SQL',
      'Research',
      'Blockchain',
      'JAMA Publication',
    ],
    type: 'research' as const,
  },
]

export default function Experience() {
  return (
    <section
      id='experience'
      className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
    >
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-95' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentPurple/5 via-transparent to-accentWarm/5' />

      <div className='max-w-7xl mx-auto w-full relative z-10'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-h2 font-bold text-text-primary mb-4'>
            <span className='text-gradient'>offerings</span> that{' '}
            <span className='text-gradient'>inspire</span>
          </h2>
          <div className='w-24 h-1 bg-accentPurple mx-auto mb-6' />
          <p className='text-body text-text-secondary max-w-2xl mx-auto'>
            My professional journey and expertise to inspire your next project
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className='space-y-8'>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
