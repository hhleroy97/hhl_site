import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function WorkExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextExperience = () => {
    setCurrentIndex(prev => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setCurrentIndex(
      prev => (prev - 1 + experiences.length) % experiences.length
    )
  }

  const currentExp = experiences[currentIndex]

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
        {/* Main Experience Card */}
        <div className='relative mb-8'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              className='bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-2xl overflow-hidden'
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Background Effects */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentExp.color} opacity-5`}
              ></div>
              <div className='absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl'></div>
              <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl'></div>

              <div className='relative z-10'>
                {/* Header */}
                <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-6'>
                  <div className='flex items-start gap-6'>
                    <motion.div
                      className='text-6xl'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {currentExp.logo}
                    </motion.div>
                    <div>
                      <h3 className='text-4xl font-bold text-white mb-3'>
                        {currentExp.company}
                      </h3>
                      <p className='text-xl text-cyan-400 font-semibold mb-2'>
                        {currentExp.role}
                      </p>
                      <p className='text-zinc-400 text-lg'>
                        {currentExp.location}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div
                      className={`inline-block px-6 py-3 bg-gradient-to-r ${currentExp.color} rounded-2xl text-black font-bold text-lg shadow-lg`}
                    >
                      {currentExp.period}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className='mb-8'>
                  <h4 className='text-white font-bold mb-6 text-2xl'>
                    Key Achievements
                  </h4>
                  <ul className='space-y-4'>
                    {currentExp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className='flex items-start gap-4'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${currentExp.color} rounded-full mt-2 flex-shrink-0 shadow-lg`}
                        ></div>
                        <span className='text-zinc-300 leading-relaxed text-lg'>
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className='text-white font-bold mb-4 text-2xl'>
                    Technologies
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {currentExp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className='px-4 py-2 bg-white/10 border border-white/20 rounded-xl font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300 text-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevExperience}
            className='absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-white/40 transition-all duration-300 shadow-xl'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className='w-6 h-6' />
          </motion.button>

          <motion.button
            onClick={nextExperience}
            className='absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-white/40 transition-all duration-300 shadow-xl'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className='w-6 h-6' />
          </motion.button>
        </div>

        {/* Progress Indicators */}
        <div className='flex justify-center gap-3 mb-8'>
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-12 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${experiences[index].color}`
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Career Summary */}
        <motion.div
          className='text-center p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='text-lg text-zinc-300'>
            <span className='text-emerald-400 font-bold text-xl'>4+ years</span>{' '}
            across
            <span className='text-cyan-400 font-semibold'>
              {' '}
              {experiences.length} roles
            </span>{' '}
            building
            <span className='text-purple-400 font-semibold'>
              {' '}
              scalable systems
            </span>{' '}
            and
            <span className='text-teal-400 font-semibold'>
              {' '}
              innovative experiences
            </span>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
