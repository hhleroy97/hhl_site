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
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-cyber font-bold text-white mb-4'>
            MY <span className='text-tech-neon'>EXPERIENCE</span>
          </h2>
          <div className='w-24 h-1 bg-tech-neon mx-auto mb-6' />
          <p className='text-lg text-gray-400 font-display max-w-2xl mx-auto'>
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

        {/* Section decoration */}
        <motion.div
          className='flex justify-center mt-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className='flex space-x-2'>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className='w-2 h-2 bg-tech-neon rounded-full'
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
