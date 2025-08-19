import { motion } from 'framer-motion'
import ExperienceCard from '@components/ui/ExperienceCard'

// Actual experience data from resume - formatted for ExperienceCard component
const experiences = [
  {
    id: "1",
    company: "Lucid Bots",
    role: "Software Engineer – Robotics Fleet Management",
    duration: "Sep 2024 – Jul 2025",
    description: [
      "Managed the migration from a third-party fleet management offering to in-house AWS MAP–funded infrastructure worth 500 thousand dollars",
      "Engineered telemetry, OTA update, and log ingestion pipelines using AWS IoT Core, Kinesis, Firehose, Glue, S3, Athena",
      "Integrated pipelines with ROS2/PX4 drones, optimizing data ingestion and reliability"
    ],
    technologies: ["AWS IoT Core", "Kinesis", "ROS2", "PX4", "Python"],
    type: "technical" as const
  },
  {
    id: "2",
    company: "Keep It Simple Storage",
    role: "Product Manager (Software/Firmware)",
    duration: "Oct 2023 – Sep 2024",
    description: [
      "Directed 6 engineers building internal tools and customer-facing systems",
      "Scoped, prioritized, and executed features via Agile/Scrum, aligning development with business goals",
      "Integrated firmware for NFC energy harvesting smart lock"
    ],
    technologies: ["Agile/Scrum", "Product Management", "Firmware", "NFC"],
    type: "leadership" as const
  },
  {
    id: "3",
    company: "First Turn Innovations",
    role: "Prototype Engineer",
    duration: "Jan 2023 – Oct 2023",
    description: [
      "Developed hardware/software prototypes and MVPs; built Python & embedded C tools",
      "Conducted hardware evaluations balancing performance, cost, and scalability"
    ],
    technologies: ["Python", "Embedded C", "Hardware Prototyping", "MVP Development"],
    type: "technical" as const
  },
  {
    id: "4",
    company: "Delphi Digital",
    role: "Blockchain Research Analyst",
    duration: "Nov 2021 – Jan 2023",
    description: [
      "Analyzed blockchain tokenomics, governance, and infrastructure",
      "Built Python/SQL research tools; delivered data-driven reports for institutional investors"
    ],
    technologies: ["Python", "SQL", "Blockchain", "Data Analysis"],
    type: "technical" as const
  },
  {
    id: "5",
    company: "Softhread Inc.",
    role: "Software Engineer – Front End",
    duration: "Nov 2020 – Nov 2021",
    description: [
      "Developed React/Vue/Next.js components for a privacy-focused blockchain platform",
      "Collaborated on API design for blockchain transactions"
    ],
    technologies: ["React", "Vue", "Next.js", "JavaScript", "API Design"],
    type: "technical" as const
  },
  {
    id: "6",
    company: "FDA – CDRH",
    role: "ORISE Fellow",
    duration: "Aug 2020 – Nov 2021",
    description: [
      "Supported AI and blockchain strategy; coordinated cross-team projects",
      "Contributed to published medical innovation research (JAMA, 2023)"
    ],
    technologies: ["AI Strategy", "Research", "Cross-functional Collaboration"],
    type: "technical" as const
  }
]

export default function Experience() {

  return (
    <section id='experience' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl font-bold text-tech-text-primary mb-4'>
            Experience
          </h2>
        </motion.div>

        {/* Experience cards */}
        <motion.div
          className='grid gap-8 max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </motion.div>

        {/* Section decoration */}
        <motion.div
          className='flex justify-center mt-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className='flex space-x-2'>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className='w-2 h-2 bg-tech-neon rounded-full'
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
