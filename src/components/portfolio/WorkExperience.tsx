import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
    color: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-500/10 to-blue-600/10',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
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
    color: 'from-fuchsia-500 to-purple-600',
    bgGradient: 'from-fuchsia-500/10 to-purple-600/10',
    borderColor: 'border-fuchsia-500/30',
    glowColor: 'shadow-fuchsia-500/20',
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
    color: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/10 to-green-600/10',
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-emerald-500/20',
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
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20',
  },
]

export default function WorkExperience() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextExperience = () => {
    setCurrentIndex(prev => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setCurrentIndex(
      prev => (prev - 1 + experiences.length) % experiences.length
    )
  }

  const goToExperience = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevExperience()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextExperience()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <PageSection
      id='experience'
      tagline='Experience'
      taglineColor='fuchsia'
      title='Building systems that scale'
      subtitle='and experiences that inspire'
      cardVariant='rotated'
    >
      <div className='max-w-6xl mx-auto'>
        {/* Enhanced Timeline Navigation */}
        <motion.div
          className='flex justify-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex items-center space-x-2 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl'>
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/50'
                    : 'bg-white/20 hover:bg-white/40 border border-white/30'
                }`}
                whileHover={{
                  scale: 1.3,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToExperience(index)}
              >
                {/* Active indicator glow */}
                {currentIndex === index && (
                  <motion.div
                    className='absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30 blur-md'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Timeline Layout */}
        <div className='relative'>
          {/* Timeline Line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/30 to-transparent' />

          {/* Experience Cards */}
          <div className='space-y-16'>
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.company}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${experience.color} shadow-lg shadow-fuchsia-500/50 z-10 ${
                    currentIndex === index ? 'scale-125' : 'scale-100'
                  } transition-transform duration-300`}
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Glow effect for active item */}
                  {currentIndex === index && (
                    <motion.div
                      className='absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30 blur-md'
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Enhanced Experience Card */}
                <motion.div
                  className={`relative w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                >
                  <motion.div
                    className={`relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/60 border ${experience.borderColor} shadow-2xl ${experience.glowColor} overflow-hidden group hover:shadow-2xl transition-all duration-500 ${
                      currentIndex === index ? 'ring-2 ring-fuchsia-500/50' : ''
                    }`}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    {/* Animated background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${experience.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Floating geometric elements */}
                    <div className='absolute top-4 right-4 w-12 h-12 border border-current opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500' />
                    <div className='absolute bottom-4 left-4 w-6 h-6 border border-current opacity-10 group-hover:opacity-20 transition-opacity duration-500' />

                    {/* Enhanced Header */}
                    <div className='relative z-10 space-y-4'>
                      <div className='flex items-center gap-4'>
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${experience.color} flex items-center justify-center text-2xl shadow-lg`}
                          whileHover={{
                            rotate: 5,
                            scale: 1.1,
                            transition: { duration: 0.2, ease: 'easeOut' },
                          }}
                        >
                          {experience.logo}
                        </motion.div>
                        <div>
                          <h3 className='text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300'>
                            {experience.company}
                          </h3>
                          <p className='text-fuchsia-400 font-semibold'>
                            {experience.role}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Period and Location */}
                      <div className='flex items-center gap-4 text-sm text-zinc-400'>
                        <span className='flex items-center gap-1'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          {experience.period}
                        </span>
                        <span className='flex items-center gap-1'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                          {experience.location}
                        </span>
                      </div>

                      {/* Enhanced Highlights */}
                      <div className='space-y-3'>
                        <h4 className='text-sm font-semibold text-zinc-400 uppercase tracking-wide'>
                          Key Achievements
                        </h4>
                        <ul className='space-y-2'>
                          {experience.highlights.map(
                            (highlight, highlightIndex) => (
                              <motion.li
                                key={highlightIndex}
                                className='flex items-start gap-3 text-sm text-zinc-300'
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.3,
                                  delay: highlightIndex * 0.1,
                                }}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${experience.color} mt-2 flex-shrink-0`}
                                />
                                <span>{highlight}</span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Enhanced Technology Stack */}
                      <div className='space-y-3'>
                        <h4 className='text-sm font-semibold text-zinc-400 uppercase tracking-wide'>
                          Technologies
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${experience.color} text-white shadow-md backdrop-blur-sm border border-white/20`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: techIndex * 0.05,
                              }}
                              whileHover={{
                                scale: 1.1,
                                y: -2,
                                transition: { duration: 0.2, ease: 'easeOut' },
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced glow effect on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${experience.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <motion.div
          className='flex justify-center items-center gap-6 mt-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={prevExperience}
            className='p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group'
            whileHover={{
              scale: 1.1,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className='w-6 h-6 text-white group-hover:text-fuchsia-400 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </motion.button>

          <div className='text-center'>
            <div className='text-sm text-zinc-400 mb-1'>
              Experience {currentIndex + 1} of {experiences.length}
            </div>
            <div className='text-lg font-semibold text-white'>
              {experiences[currentIndex].company}
            </div>
          </div>

          <motion.button
            onClick={nextExperience}
            className='p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group'
            whileHover={{
              scale: 1.1,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className='w-6 h-6 text-white group-hover:text-fuchsia-400 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </PageSection>
  )
}
