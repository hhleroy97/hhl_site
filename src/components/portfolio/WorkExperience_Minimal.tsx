import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import PageSection from '../ui/PageSection'

const experiences = [
  {
    company: 'Lucid Bots',
    role: 'Senior Software Engineer',
    period: '2023 - Present',
    location: 'Remote',
    keyHighlight:
      'Built robotics fleet management platform handling 10M+ telemetry events/day',
    impact: 'Real-time robotics data at scale',
    technologies: ['AWS', 'IoT Core', 'Kinesis', 'Python', 'React', 'ROS2'],
    logo: '🤖',
    color: 'from-purple-500 to-cyan-500',
  },
  {
    company: 'Keep It Simple',
    role: 'Technical Product Manager',
    period: '2022 - 2023',
    location: 'Charlotte, NC',
    keyHighlight:
      'Led product strategy for 3 major feature launches serving 10k+ users',
    impact: 'Product strategy & team leadership',
    technologies: ['Agile', 'Notion', 'Figma', 'Analytics'],
    logo: '💼',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    company: 'TouchDesigner Projects',
    role: 'Creative Technologist',
    period: '2021 - Present',
    location: 'Freelance',
    keyHighlight:
      'Created immersive audio-reactive visuals for 500+ person events',
    impact: 'Live performance technology',
    technologies: ['TouchDesigner', 'MIDI', 'Kinect', 'WebGL'],
    logo: '🎨',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    company: 'Previous Roles',
    role: 'Software Engineer',
    period: '2019 - 2022',
    location: 'Various',
    keyHighlight: 'Full-stack development across multiple industries',
    impact: 'Cross-industry experience',
    technologies: ['React', 'Node.js', 'AWS', 'Docker'],
    logo: '💻',
    color: 'from-emerald-500 to-amber-500',
  },
]

export default function WorkExperienceMinimal() {
  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='Building Systems That Scale'
      subtitle='and experiences that inspire'
      cardVariant='rotated'
    >
      <div className='max-w-5xl mx-auto'>
        {/* Clean Experience List */}
        <div className='space-y-1'>
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className='group relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className='p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-black/30 cursor-pointer'
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <div className='relative z-10'>
                  {/* Main Content Row */}
                  <div className='flex items-start justify-between gap-8'>
                    {/* Left Side - Company Info */}
                    <div className='flex items-start gap-6 flex-1 min-w-0'>
                      <div className='text-3xl flex-shrink-0'>{exp.logo}</div>
                      <div className='min-w-0 flex-1'>
                        <div className='flex flex-col lg:flex-row lg:items-baseline lg:gap-4 mb-3'>
                          <h3 className='text-2xl font-bold text-white truncate'>
                            {exp.company}
                          </h3>
                          <p className='text-lg text-cyan-400 font-medium'>
                            {exp.role}
                          </p>
                        </div>

                        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-6 text-zinc-400 mb-4'>
                          <span className='font-medium'>{exp.period}</span>
                          <span className='hidden lg:block'>•</span>
                          <span>{exp.location}</span>
                        </div>

                        {/* Key Highlight */}
                        <p className='text-zinc-300 leading-relaxed mb-4 lg:text-lg'>
                          {exp.keyHighlight}
                        </p>

                        {/* Impact Badge */}
                        <div className='flex items-center gap-3 mb-4'>
                          <div
                            className={`px-4 py-2 bg-gradient-to-r ${exp.color} rounded-full text-black font-bold text-sm`}
                          >
                            {exp.impact}
                          </div>
                          <motion.div
                            className='text-zinc-400 group-hover:text-white transition-colors duration-300'
                            whileHover={{ scale: 1.1 }}
                          >
                            <ExternalLink className='w-4 h-4' />
                          </motion.div>
                        </div>

                        {/* Technologies - Horizontal */}
                        <div className='flex flex-wrap gap-2'>
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className='px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-all duration-300'
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          className='mt-16 grid grid-cols-1 md:grid-cols-4 gap-6'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className='text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10'>
            <div className='text-3xl font-bold text-emerald-400 mb-2'>4+</div>
            <div className='text-zinc-400'>Years Experience</div>
          </div>
          <div className='text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10'>
            <div className='text-3xl font-bold text-cyan-400 mb-2'>10M+</div>
            <div className='text-zinc-400'>Events Processed</div>
          </div>
          <div className='text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10'>
            <div className='text-3xl font-bold text-purple-400 mb-2'>500+</div>
            <div className='text-zinc-400'>People Reached</div>
          </div>
          <div className='text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10'>
            <div className='text-3xl font-bold text-teal-400 mb-2'>40%</div>
            <div className='text-zinc-400'>Cost Reduction</div>
          </div>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          className='mt-12 text-center p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className='text-lg text-zinc-300'>
            From{' '}
            <span className='text-emerald-400 font-semibold'>
              robotics platforms
            </span>{' '}
            to
            <span className='text-cyan-400 font-semibold'>
              {' '}
              creative technology
            </span>{' '}
            — building systems that work at scale.
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
