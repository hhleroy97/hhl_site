import { motion } from 'framer-motion'

interface ExperienceToggleProps {
  activeTab: 'technical' | 'leadership'
  onToggle: (tab: 'technical' | 'leadership') => void
}

export default function ExperienceToggle({
  activeTab,
  onToggle,
}: ExperienceToggleProps) {
  return (
    <div className='flex justify-center mb-12'>
      <div className='relative bg-cyberpunk-dark-alt rounded-xl p-2 border border-cyberpunk-neon/30'>
        {/* Background slider */}
        <motion.div
          className='absolute top-2 h-12 bg-cyberpunk-neon rounded-lg'
          animate={{
            x: activeTab === 'technical' ? 2 : '100%',
            width:
              activeTab === 'technical' ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <div className='relative flex'>
          {/* Technical Focus Tab */}
          <motion.button
            onClick={() => onToggle('technical')}
            className={`relative z-10 px-8 py-3 font-cyber font-bold rounded-lg transition-colors duration-300 ${
              activeTab === 'technical'
                ? 'text-black'
                : 'text-cyberpunk-neon hover:text-white'
            }`}
            whileHover={{ scale: activeTab === 'technical' ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TECHNICAL FOCUS
          </motion.button>

          {/* Leadership Focus Tab */}
          <motion.button
            onClick={() => onToggle('leadership')}
            className={`relative z-10 px-8 py-3 font-cyber font-bold rounded-lg transition-colors duration-300 ${
              activeTab === 'leadership'
                ? 'text-black'
                : 'text-cyberpunk-neon hover:text-white'
            }`}
            whileHover={{ scale: activeTab === 'leadership' ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LEADERSHIP FOCUS
          </motion.button>
        </div>

        {/* Glitch effect overlay */}
        <motion.div
          className='absolute inset-0 bg-cyberpunk-pink rounded-xl opacity-0'
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 8 }}
        />
      </div>
    </div>
  )
}
