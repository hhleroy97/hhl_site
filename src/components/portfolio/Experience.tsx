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
    role: 'Blockchain Research Analyst',
    duration: 'Nov 2021 – Jan 2023',
    description: [
      'Analyzed blockchain tokenomics, governance, and infrastructure',
      'Built Python/SQL research tools; delivered data-driven reports for institutional investors',
    ],
    technologies: ['Python', 'SQL', 'Blockchain', 'Data Analysis'],
    type: 'technical' as const,
  },
  {
    id: '5',
    company: 'Softhread Inc.',
    role: 'Software Engineer – Front End',
    duration: 'Nov 2020 – Nov 2021',
    description: [
      'Developed React/Vue/Next.js components for a privacy-focused blockchain platform',
      'Collaborated on API design for blockchain transactions',
    ],
    technologies: ['React', 'Vue', 'Next.js', 'JavaScript', 'API Design'],
    type: 'technical' as const,
  },
  {
    id: '6',
    company: 'FDA – CDRH',
    role: 'ORISE Fellow',
    duration: 'Aug 2020 – Nov 2021',
    description: [
      'Supported AI and blockchain strategy; coordinated cross-team projects',
      'Contributed to published medical innovation research (JAMA, 2023)',
    ],
    technologies: ['AI Strategy', 'Research', 'Cross-functional Collaboration'],
    type: 'technical' as const,
  },
]

export default function Experience() {
  return (
    <section id='experience' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tech-teal/5 via-transparent to-tech-coral/5' />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section header - Enhanced with disciplined glow */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl md:text-5xl font-black text-text-primary mb-6 relative'>
            <span className='relative z-10'>Professional Experience</span>
            <span className='absolute inset-0 text-tech-teal/20 blur-sm'>Professional Experience</span>
          </h2>
          <div className='w-24 h-1 bg-tech-teal mx-auto mb-6 relative'>
            {/* Glow effect on accent line */}
            <div className='absolute inset-0 bg-tech-teal blur-sm opacity-60'></div>
          </div>
          <p className='text-lg md:text-xl text-tech-text-secondary max-w-4xl mx-auto leading-relaxed mt-4'>
            Building scalable systems and leading technical teams across robotics,
            blockchain, and cloud infrastructure with a focus on real-world impact.
          </p>
        </motion.div>

        {/* Experience cards - Enhanced with floating containers */}
        <motion.div
          className='grid gap-8 md:gap-12 max-w-5xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
