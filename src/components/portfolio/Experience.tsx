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
    <section id='experience' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-10'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-4xl font-display font-bold text-tech-text-primary'>
            Experience
          </h2>
          <p className='text-base text-tech-text-secondary mt-2'>
            Technical and leadership
          </p>
        </motion.div>

        {/* Toggle between Technical and Leadership */}
        <ExperienceToggle activeTab={activeTab} onToggle={setActiveTab} />

        {/* Experience cards */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            className='grid gap-8 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto'
            initial={{ opacity: 0, x: activeTab === 'technical' ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'technical' ? 60 : -60 }}
            transition={{ duration: 0.35 }}
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
