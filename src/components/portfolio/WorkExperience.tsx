import { motion } from 'framer-motion'

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
  },
]

export default function WorkExperience() {
  return (
    <section id='experience' className='py-24 relative'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-zinc-900/60' />
      <div className='absolute top-1/2 left-8 w-px h-32 bg-gradient-to-b from-cyan-400/30 to-transparent' />
      <div className='absolute top-1/4 right-12 w-px h-24 bg-gradient-to-b from-fuchsia-400/30 to-transparent' />

      <div className='container-custom relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='inline-flex items-center gap-3 px-6 py-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full text-fuchsia-400 text-lg font-medium mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className='w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse' />
            Experience
          </motion.div>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
            Building systems that scale
            <br />
            <span className='bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent'>
              and experiences that inspire
            </span>
          </h2>
        </motion.div>

        <div className='space-y-8'>
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className='relative group'
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Timeline connector */}
              {index > 0 && (
                <div className='absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent transform -translate-x-1/2' />
              )}

              {/* Experience card */}
              <div className='relative bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 hover:border-white/20 hover:from-white/10 hover:to-white/[0.05] transition-all duration-500'>
                {/* Company logo and title */}
                <div className='flex items-start justify-between mb-6'>
                  <div className='flex items-center gap-4'>
                    <div className='text-3xl'>{exp.logo}</div>
                    <div>
                      <h3 className='text-2xl font-bold text-white mb-1'>
                        {exp.company}
                      </h3>
                      <p className='text-xl text-cyan-400 font-medium'>
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <div className='text-right text-sm text-zinc-400'>
                    <div className='font-medium'>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className='mb-6'>
                  <ul className='space-y-3'>
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className='flex items-start gap-3 text-zinc-300'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + i * 0.1,
                          duration: 0.5,
                        }}
                      >
                        <div className='w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full mt-2.5 flex-shrink-0' />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className='flex flex-wrap gap-2'>
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className='px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + i * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Hover effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline end marker */}
        <motion.div
          className='flex justify-center mt-12'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className='w-4 h-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full animate-pulse' />
        </motion.div>
      </div>
    </section>
  )
}
