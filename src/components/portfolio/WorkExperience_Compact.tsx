import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PageSection from '../ui/PageSection'

const experiences = [
  {
    company: 'Lucid Bots',
    role: 'Software Engineer - Robotics Fleet Management',
    period: 'Sep 2024 - Jul 2025',
    keyHighlight:
      'Led cloud infrastructure for drone fleet management system enabling move away from 3rd party offerings',
    technologies: ['AWS IoT Core', 'Kinesis', 'ROS2', 'PX4'],
    logo: '🤖',
    color: 'from-purple-500 to-cyan-500',
  },
  {
    company: 'Keep it Simple Storage',
    role: 'Project Manager - Software',
    period: 'Sep 2023 - Sep 2024',
    keyHighlight:
      'Led product development managing 6 engineers, aligning technical implementation with business goals',
    technologies: ['Sprint Planning', 'Embedded Systems', 'Cloud Tooling'],
    logo: '📦',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    company: 'First Turn Innovations',
    role: 'Prototype Engineer',
    period: 'Feb 2023 - Sep 2023',
    keyHighlight:
      'Developed hardware/software prototypes translating vague design ideas into testable MVPs',
    technologies: ['Python', 'Embedded Systems', 'Hardware'],
    logo: '🔧',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    company: 'Delphi Digital',
    role: 'Web 3.0 Infrastructure Research Analyst',
    period: 'Aug 2021 - Oct 2022',
    keyHighlight:
      'Performed technical research on blockchain protocols, delivering insights to institutional investors',
    technologies: ['Python', 'SQL', 'Blockchain', 'Research'],
    logo: '🔍',
    color: 'from-emerald-500 to-blue-500',
  },
  {
    company: 'Softhread',
    role: 'Software Engineer',
    period: 'Nov 2020 - Nov 2021',
    keyHighlight:
      'Built privacy-focused blockchain platform components for secure health data management',
    technologies: ['React', 'Vue', 'Next.js', 'Blockchain'],
    logo: '🔐',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    company: 'FDA (ORISE Fellow)',
    role: 'Research Fellow',
    period: 'Aug 2020 - Aug 2021',
    keyHighlight:
      'Supported AI and blockchain initiatives for healthcare data coordination',
    technologies: ['AI Strategy', 'Healthcare Data', 'Research'],
    logo: '🏛️',
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function WorkExperienceCompact() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleExperiences = 2
  const maxIndex = experiences.length - visibleExperiences

  const nextExperience = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevExperience = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
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
      <div className='max-w-5xl mx-auto'>
        {/* Compact Experience Cards - Show 2 at a time */}
        <div className='relative'>
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            {experiences
              .slice(currentIndex, currentIndex + visibleExperiences)
              .map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${currentIndex + index}`}
                  className='group'
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className='p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-black/30 h-full'
                    whileHover={{ y: -3 }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>

                    <div className='relative z-10'>
                      {/* Header */}
                      <div className='flex items-start gap-4 mb-4'>
                        <div className='text-2xl'>{exp.logo}</div>
                        <div className='min-w-0 flex-1'>
                          <h3 className='text-lg font-bold text-white mb-1 truncate'>
                            {exp.company}
                          </h3>
                          <p className='text-cyan-400 font-medium text-sm mb-1'>
                            {exp.role}
                          </p>
                          <p className='text-zinc-400 text-xs'>{exp.period}</p>
                        </div>
                      </div>

                      {/* Key highlight */}
                      <p className='text-zinc-300 text-sm leading-relaxed mb-4'>
                        {exp.keyHighlight}
                      </p>

                      {/* Technologies - compact */}
                      <div className='flex flex-wrap gap-1'>
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className='px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-medium text-zinc-400'
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

          {/* Navigation */}
          <div className='flex justify-center items-center gap-4 mb-6'>
            <motion.button
              onClick={prevExperience}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
              whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className='w-5 h-5' />
            </motion.button>

            {/* Page indicators */}
            <div className='flex gap-2'>
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextExperience}
              disabled={currentIndex === maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === maxIndex
                  ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={currentIndex < maxIndex ? { scale: 1.1 } : {}}
              whileTap={currentIndex < maxIndex ? { scale: 0.9 } : {}}
            >
              <ChevronRight className='w-5 h-5' />
            </motion.button>
          </div>
        </div>

        {/* Compact Stats */}
        <motion.div
          className='flex justify-center items-center gap-8 p-4 bg-black/10 backdrop-blur-sm rounded-xl border border-white/10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='text-center'>
            <div className='text-xl font-bold text-emerald-400'>5+</div>
            <div className='text-xs text-zinc-400'>Years</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-cyan-400'>6</div>
            <div className='text-xs text-zinc-400'>Companies</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-purple-400'>$7K+</div>
            <div className='text-xs text-zinc-400'>Funding</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-teal-400'>Eagle</div>
            <div className='text-xs text-zinc-400'>Scout</div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
