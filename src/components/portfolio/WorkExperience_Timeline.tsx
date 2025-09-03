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

export default function WorkExperienceTimeline() {
  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='emerald'
      title='Building Systems That Scale'
      subtitle='and experiences that inspire'
      cardVariant='rotated'
    >
      <div className='max-w-4xl mx-auto'>
        {/* Timeline Container */}
        <div className='relative'>
          {/* Central Timeline Line */}
          <div className='absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-purple-400/50 to-emerald-400/50'></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className='relative flex items-start gap-8 mb-12 last:mb-0'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Node */}
              <div className='relative flex-shrink-0'>
                <motion.div
                  className='w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl shadow-xl'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${exp.color} rounded-full opacity-20`}
                  ></div>
                  <span className='relative z-10'>{exp.logo}</span>
                </motion.div>

                {/* Glowing ring effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} rounded-full opacity-30 blur-md`}
                ></div>
              </div>

              {/* Experience Content */}
              <motion.div
                className='flex-1 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300'
                whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4'>
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-2'>
                      {exp.company}
                    </h3>
                    <p className='text-lg text-cyan-400 font-medium mb-1'>
                      {exp.role}
                    </p>
                    <p className='text-zinc-400'>{exp.location}</p>
                  </div>
                  <div className='text-right'>
                    <div
                      className={`inline-block px-4 py-2 bg-gradient-to-r ${exp.color} rounded-full text-black font-bold text-sm`}
                    >
                      {exp.period}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className='mb-6'>
                  <h4 className='text-white font-semibold mb-4 text-lg'>
                    Key Achievements
                  </h4>
                  <ul className='space-y-3'>
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className='flex items-start gap-3'>
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className='text-zinc-300 leading-relaxed'>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className='text-white font-semibold mb-3'>
                    Technologies
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {exp.technologies.map(tech => (
                      <span
                        key={tech}
                        className='px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Career Summary */}
        <motion.div
          className='mt-16 text-center p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className='text-lg text-zinc-300'>
            <span className='text-emerald-400 font-bold text-xl'>4+ years</span>{' '}
            of experience building
            <span className='text-cyan-400 font-semibold'>
              {' '}
              scalable systems
            </span>
            ,
            <span className='text-purple-400 font-semibold'>
              {' '}
              robotics platforms
            </span>
            , and
            <span className='text-teal-400 font-semibold'>
              {' '}
              creative experiences
            </span>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
