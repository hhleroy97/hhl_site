import { motion } from 'framer-motion'

interface SlideshowNavigationProps {
  currentSection: number
  sections: Array<{ id: string; label: string; component: any }>
  onSectionChange: (index: number) => void
  onPrevSection: () => void
  onNextSection: () => void
}

export default function SlideshowNavigation({
  currentSection,
  sections,
  onSectionChange,
  onPrevSection,
  onNextSection,
}: SlideshowNavigationProps) {
  // Color mapping for each section based on their tagline colors
  const sectionColors = {
    0: 'purple', // Home/Landing
    1: 'purple', // About
    2: 'cyan', // Experience
    3: 'teal', // Skills
    4: 'cyan', // Services
    5: 'emerald', // Contact
  }

  const getSectionColor = (index: number) => {
    return sectionColors[index as keyof typeof sectionColors] || 'purple'
  }
  return (
    <div className='fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4'>
      {/* Up Arrow */}
      <motion.button
        onClick={onPrevSection}
        disabled={currentSection === 0}
        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
          currentSection === 0
            ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
            : 'bg-white/10 text-white hover:bg-white/20 hover:text-purple-400'
        }`}
        whileHover={currentSection > 0 ? { scale: 1.1 } : {}}
        whileTap={currentSection > 0 ? { scale: 0.95 } : {}}
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 15l7-7 7 7'
          />
        </svg>
      </motion.button>

      {/* Section Indicators */}
      <div className='flex flex-col gap-3 py-4'>
        {sections.map((section, index) => {
          const sectionColor = getSectionColor(index)
          const colorClass =
            index === currentSection
              ? `bg-${sectionColor}-400 scale-125`
              : 'bg-white/30 hover:bg-white/50'

          return (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${colorClass}`}
              whileHover={{ scale: index === currentSection ? 1.25 : 1.1 }}
              aria-label={`Go to ${section.label}`}
            />
          )
        })}
      </div>

      {/* Down Arrow */}
      <motion.button
        onClick={onNextSection}
        disabled={currentSection === sections.length - 1}
        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
          currentSection === sections.length - 1
            ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
            : 'bg-white/10 text-white hover:bg-white/20 hover:text-purple-400'
        }`}
        whileHover={currentSection < sections.length - 1 ? { scale: 1.1 } : {}}
        whileTap={currentSection < sections.length - 1 ? { scale: 0.95 } : {}}
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </motion.button>
    </div>
  )
}
