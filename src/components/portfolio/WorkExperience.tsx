import { motion } from 'framer-motion'
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

export default function WorkExperience() {
  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='Building Systems That Scale'
      subtitle='and experiences that inspire'
      cardVariant='rotated'
    >
      {/* Professional Timeline Layout */}
      <div className='max-w-6xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-4'>
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className='group relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Experience Card */}
              <div className='relative bg-gradient-to-r from-white/5 to-white/[0.02] rounded-xl border border-white/10 p-4 hover:border-white/20 hover:from-white/10 hover:to-white/[0.05] transition-all duration-300 h-full'>
                {/* Header with Company & Role */}
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='text-lg'>{exp.logo}</div>
                    <div className='min-w-0'>
                      <h3 className='text-base font-bold text-white truncate'>
                        {exp.company}
                      </h3>
                      <p className='text-sm text-cyan-400 font-medium'>
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <div className='text-right text-xs text-zinc-400 flex-shrink-0 ml-2'>
                    <div className='font-medium'>{exp.period}</div>
                    <div className='opacity-75'>{exp.location}</div>
                  </div>
                </div>

                {/* Highlights - Compact */}
                <div className='mb-3'>
                  <ul className='space-y-1'>
                    {exp.highlights.slice(0, 2).map((highlight, i) => (
                      <li
                        key={i}
                        className='flex items-start gap-2 text-zinc-300 text-xs leading-relaxed'
                      >
                        <div className='w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-1.5 flex-shrink-0' />
                        <span>{highlight}</span>
                      </li>
                    ))}
                    {exp.highlights.length > 2 && (
                      <li className='flex items-start gap-2 text-zinc-400 text-xs'>
                        <div className='w-1 h-1 bg-zinc-500 rounded-full mt-1.5 flex-shrink-0' />
                        <span>
                          +{exp.highlights.length - 2} more achievements
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Technologies - Compact Grid */}
                <div className='flex flex-wrap gap-1'>
                  {exp.technologies.slice(0, 6).map(tech => (
                    <span
                      key={tech}
                      className='px-2 py-0.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 6 && (
                    <span className='px-2 py-0.5 bg-zinc-700/50 border border-zinc-600/50 rounded-full text-xs text-zinc-400'>
                      +{exp.technologies.length - 6}
                    </span>
                  )}
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career Progression Summary */}
        <motion.div
          className='mt-6 p-4 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-xl border border-white/10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className='flex items-center justify-between text-sm'>
            <div className='text-zinc-300'>
              <span className='text-emerald-400 font-medium'>4+ years</span> of
              experience across
              <span className='text-cyan-400 font-medium'> cloud systems</span>,
              <span className='text-purple-400 font-medium'> robotics</span>,
              and
              <span className='text-teal-400 font-medium'>
                {' '}
                creative technology
              </span>
            </div>
            <div className='flex gap-2'>
              <div className='w-2 h-2 bg-emerald-400 rounded-full opacity-60'></div>
              <div className='w-2 h-2 bg-cyan-400 rounded-full opacity-60'></div>
              <div className='w-2 h-2 bg-purple-400 rounded-full opacity-60'></div>
              <div className='w-2 h-2 bg-teal-400 rounded-full opacity-60'></div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
