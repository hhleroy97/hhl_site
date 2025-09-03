import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageSection from '../ui/PageSection'

const experiences = [
  {
    company: 'Lucid Bots',
    role: 'Senior Software Engineer',
    period: '2023 - Present',
    location: 'Remote',
    highlights: [
      'Built robotics fleet management platform handling 10M+ telemetry events/day',
      'Architected real-time data pipeline with sub-100ms latency using AWS Kinesis',
      'Reduced infrastructure costs 40% through optimized storage and query patterns',
    ],
    technologies: ['AWS', 'IoT Core', 'Kinesis', 'Python', 'React', 'ROS2'],
    logo: '🤖',
    color: 'from-purple-500 to-cyan-500',
  },
  {
    company: 'Keep It Simple',
    role: 'Technical Product Manager',
    period: '2022 - 2023',
    location: 'Charlotte, NC',
    highlights: [
      'Led product strategy for 3 major feature launches serving 10k+ users',
      'Implemented agile processes reducing time-to-market by 30%',
      'Coordinated cross-functional teams of 8 engineers and designers',
    ],
    technologies: ['Agile', 'Notion', 'Figma', 'Analytics', 'Roadmapping'],
    logo: '💼',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    company: 'TouchDesigner Projects',
    role: 'Creative Technologist',
    period: '2021 - Present',
    location: 'Freelance',
    highlights: [
      'Created immersive audio-reactive visuals for 500+ person events',
      'Developed real-time MIDI/Kinect integration systems',
      'Maintained 99.9% uptime across live performance installations',
    ],
    technologies: ['TouchDesigner', 'MIDI', 'Kinect', 'WebGL', 'Python'],
    logo: '🎨',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    company: 'Previous Roles',
    role: 'Software Engineer',
    period: '2019 - 2022',
    location: 'Various',
    highlights: [
      'Full-stack development across multiple industries',
      'Cloud infrastructure and DevOps automation',
      'Data engineering and analytics platforms',
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    logo: '💻',
    color: 'from-emerald-500 to-amber-500',
  },
]

export default function WorkExperienceExpandable() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='Building Systems That Scale'
      subtitle='and experiences that inspire'
      cardVariant='rotated'
    >
      <div className='max-w-4xl mx-auto space-y-6'>
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            className='group'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <motion.div
              className={`bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden transition-all duration-500 ${
                expandedIndex === index ? 'shadow-2xl border-white/40' : ''
              }`}
              layout
            >
              {/* Compact Header */}
              <motion.button
                onClick={() => toggleExpanded(index)}
                className='w-full p-6 text-left focus:outline-none'
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-6'>
                    <motion.div
                      className='text-3xl'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {exp.logo}
                    </motion.div>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-xl font-bold text-white mb-1'>
                        {exp.company}
                      </h3>
                      <p className='text-cyan-400 font-medium mb-1'>
                        {exp.role}
                      </p>
                      <p className='text-sm text-zinc-400'>{exp.location}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div
                      className={`px-4 py-2 bg-gradient-to-r ${exp.color} rounded-full text-black font-bold text-sm`}
                    >
                      {exp.period}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className='text-white/60'
                    >
                      <ChevronDown className='w-6 h-6' />
                    </motion.div>
                  </div>
                </div>

                {/* Quick Preview */}
                {expandedIndex !== index && (
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {exp.technologies.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className='px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-400'
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 4 && (
                      <span className='px-3 py-1 bg-zinc-700/50 border border-zinc-600/50 rounded-full text-xs text-zinc-500'>
                        +{exp.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='px-6 pb-6'>
                      {/* Background Effects */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 pointer-events-none`}
                      ></div>

                      <div className='relative z-10 space-y-6'>
                        {/* Highlights */}
                        <div>
                          <h4 className='text-white font-bold mb-4 text-lg'>
                            Key Achievements
                          </h4>
                          <ul className='space-y-3'>
                            {exp.highlights.map((highlight, i) => (
                              <motion.li
                                key={i}
                                className='flex items-start gap-3'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full mt-2 flex-shrink-0`}
                                ></div>
                                <span className='text-zinc-300 leading-relaxed'>
                                  {highlight}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className='text-white font-bold mb-3 text-lg'>
                            Technologies & Skills
                          </h4>
                          <div className='flex flex-wrap gap-2'>
                            {exp.technologies.map((tech, i) => (
                              <motion.span
                                key={tech}
                                className='px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}

        {/* Career Summary */}
        <motion.div
          className='mt-12 text-center p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className='text-lg text-zinc-300'>
            <span className='text-emerald-400 font-bold text-xl'>4+ years</span>{' '}
            building
            <span className='text-cyan-400 font-semibold'> cloud systems</span>,
            <span className='text-purple-400 font-semibold'>
              {' '}
              robotics platforms
            </span>
            , and
            <span className='text-teal-400 font-semibold'>
              {' '}
              creative technology
            </span>
          </div>

          <div className='mt-4 text-sm text-zinc-400'>
            Click any experience above to explore details
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
