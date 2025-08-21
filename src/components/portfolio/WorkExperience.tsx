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
    >
      {/* Carousel Container with Navigation */}
      <div className='relative max-w-6xl mx-auto flex items-center gap-8'>
        {/* Left Navigation Arrow */}
        <button
          onClick={prevExperience}
          className='flex-shrink-0 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm'
        >
          <svg
            className='w-6 h-6'
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
        </button>

        {/* Carousel Content */}
        <div className='flex-1 relative max-w-4xl'>
          {/* Experience Cards */}
          <div className='overflow-hidden rounded-2xl'>
            <motion.div
              className='flex transition-transform duration-500 ease-out'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experiences.map(exp => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className='w-full flex-shrink-0 px-2'
                >
                  <div className='relative bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-6 hover:border-white/20 hover:from-white/10 hover:to-white/[0.05] transition-all duration-500 h-full'>
                    {/* Company logo and title */}
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-4'>
                        <div className='text-2xl'>{exp.logo}</div>
                        <div>
                          <h3 className='text-xl font-bold text-white mb-1'>
                            {exp.company}
                          </h3>
                          <p className='text-lg text-cyan-400 font-medium'>
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
                    <div className='mb-4'>
                      <ul className='space-y-2'>
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className='flex items-start gap-3 text-zinc-300 text-sm'
                          >
                            <div className='w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full mt-2 flex-shrink-0' />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className='flex flex-wrap gap-1.5'>
                      {exp.technologies.map(tech => (
                        <span
                          key={tech}
                          className='px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hover effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className='flex justify-center gap-2 mt-6'>
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToExperience(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Counter */}
          <div className='text-center mt-4'>
            <span className='text-sm text-zinc-400'>
              {currentIndex + 1} of {experiences.length}
            </span>
          </div>
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextExperience}
          className='flex-shrink-0 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm'
        >
          <svg
            className='w-6 h-6'
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
        </button>
      </div>
    </PageSection>
  )
}
