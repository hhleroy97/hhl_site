import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ExperienceToggle from '@components/ui/ExperienceToggle'
import ExperienceCard from '@components/ui/ExperienceCard'
import { technicalExperience, leadershipExperience } from '@/data/experience'

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'technical' | 'leadership'>(
    'technical'
  )

  const currentExperience =
    activeTab === 'technical' ? technicalExperience : leadershipExperience

  return (
    <section id='experience' className='py-20 px-4 sm:px-6 lg:px-8 bg-background-primary'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-bold text-text-primary mb-4'>
            My <span className='text-primary-600'>Experience</span>
          </h2>
          <div className='w-24 h-1 bg-primary-500 mx-auto mb-6' />
          <p className='text-lg text-text-secondary max-w-2xl mx-auto'>
            Explore my journey through technical innovation and leadership
            excellence
          </p>
        </motion.div>

        {/* Toggle between Technical and Leadership */}
        <ExperienceToggle activeTab={activeTab} onToggle={setActiveTab} />

        {/* Experience cards */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            className='grid gap-8 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto'
            initial={{ opacity: 0, x: activeTab === 'technical' ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'technical' ? 100 : -100 }}
            transition={{ duration: 0.5 }}
          >
            {currentExperience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
