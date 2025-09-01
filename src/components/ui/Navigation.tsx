import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface NavigationProps {
  currentSection?: number
  onSectionChange?: (index: number) => void
  sections?: Array<{ id: string; label: string; component: any }>
  onPrevSection?: () => void
  onNextSection?: () => void
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({
  currentSection = 0,
  onSectionChange,
  sections,
  onPrevSection,
  onNextSection,
}: NavigationProps = {}) {
  const [isSlideshow] = useState(Boolean(sections && onSectionChange))
  const [isNavReady, setIsNavReady] = useState(false)
  const yOffset = -70
  const arcLength = 0

  const handleNavClick = (itemId: string, index: number) => {
    if (isSlideshow && onSectionChange) {
      onSectionChange(index + 1) // +1 because we skip hero section
    } else {
      const element = document.getElementById(itemId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isActive = (itemId: string, index: number) => {
    if (isSlideshow) {
      return currentSection === index + 1 // +1 because we skip hero section
    }
    return false // For non-slideshow mode, we'll implement scroll detection later
  }

  return (
    <motion.nav
      className='fixed bottom-0 left-0 right-0 z-50'
      initial={{ y: 150 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      onAnimationComplete={() => setIsNavReady(true)}
    >
      {/* Glassmorphism container */}
      <div className='max-w-[72vw] mx-auto px-3 md:px-4 relative'>
        {/* Glassmorphism background */}
        <div className='absolute inset-0 bg-black/30 backdrop-blur-md rounded-t-full border-t border-l border-r border-white/20 shadow-lg shadow-cyan-400/20' />

        {/* Content */}
        <div className='relative py-4'>
          <div className='flex justify-between items-center w-full'>
            {/* Left Navigation Items */}
            <div className='hidden md:flex items-center justify-evenly w-[calc(50%-4rem)] space-x-4'>
              {/* Home Button */}
              <motion.button
                onClick={() => {
                  if (isSlideshow && onSectionChange) {
                    onSectionChange(0)
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                disabled={!isNavReady}
                className={`relative px-4 py-2 rounded-full text-zinc-300 bg-black/20 backdrop-blur-sm border border-white/20 transition-all duration-200 ${
                  isNavReady
                    ? 'hover:border-cyan-400/50 hover:text-white hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                whileHover={isNavReady ? { scale: 1.05 } : {}}
                whileTap={isNavReady ? { scale: 0.95 } : {}}
              >
                <span className='text-sm font-medium'>Home</span>
              </motion.button>

              {navItems.slice(0, 2).map((item, index) => {
                const active = isActive(item.id, index)

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, index)}
                    disabled={!isNavReady}
                    className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                      active
                        ? 'text-cyan-400 bg-black/40 backdrop-blur-sm border-2 border-cyan-400/60 shadow-lg shadow-cyan-400/20'
                        : `text-zinc-300 bg-black/20 backdrop-blur-sm border border-white/20 ${
                            isNavReady
                              ? 'hover:border-cyan-400/50 hover:text-white hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`
                    }`}
                    whileHover={isNavReady ? { scale: 1.05 } : {}}
                    whileTap={isNavReady ? { scale: 0.95 } : {}}
                  >
                    <span className='text-sm font-medium'>{item.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Center Semi-Circle Navigation */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2`}
              style={{ top: `${yOffset}px` }}
            >
              <div className='relative w-32 h-32 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-400/15'>
                <div
                  className='absolute inset-0 rounded-full'
                  style={{
                    background: `conic-gradient(from 0deg, rgba(255,255,255,0.2) 0deg, rgba(255,255,255,0.2) ${(arcLength / 100) * 180}deg, transparent ${(arcLength / 100) * 180}deg, transparent 360deg)`,
                    mask: 'radial-gradient(circle, transparent 15px, black 16px)',
                    WebkitMask:
                      'radial-gradient(circle, transparent 15px, black 16px)',
                  }}
                />
                <div className='relative w-24 h-24'>
                  {/* Top half - Up arrow */}
                  <motion.button
                    onClick={onPrevSection}
                    disabled={currentSection === 0 || !isNavReady}
                    className={`absolute top-0 left-0 w-24 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-t-full flex items-center justify-center transition-all duration-300 ${
                      currentSection === 0 || !isNavReady
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 cursor-pointer'
                    }`}
                    whileHover={
                      currentSection > 0 && isNavReady ? { scale: 1.05 } : {}
                    }
                    whileTap={
                      currentSection > 0 && isNavReady ? { scale: 0.95 } : {}
                    }
                  >
                    <ChevronUp className='w-6 h-6 text-white' />
                  </motion.button>

                  {/* Bottom half - Down arrow */}
                  <motion.button
                    onClick={onNextSection}
                    disabled={
                      currentSection === (sections?.length || 1) - 1 ||
                      !isNavReady
                    }
                    className={`absolute bottom-0 left-0 w-24 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-b-full flex items-center justify-center transition-all duration-300 ${
                      currentSection === (sections?.length || 1) - 1 ||
                      !isNavReady
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 cursor-pointer'
                    }`}
                    whileHover={
                      currentSection < (sections?.length || 1) - 1 && isNavReady
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={
                      currentSection < (sections?.length || 1) - 1 && isNavReady
                        ? { scale: 0.95 }
                        : {}
                    }
                  >
                    <ChevronDown className='w-6 h-6 text-white' />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Right Navigation Items */}
            <div className='hidden md:flex items-center justify-evenly w-[calc(50%-4rem)] space-x-4'>
              {navItems.slice(2, 4).map((item, index) => {
                const actualIndex = index + 2 // Adjust for the slice
                const active = isActive(item.id, actualIndex)

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, actualIndex)}
                    disabled={!isNavReady}
                    className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                      active
                        ? 'text-cyan-400 bg-black/40 backdrop-blur-sm border-2 border-cyan-400/60 shadow-lg shadow-cyan-400/20'
                        : `text-zinc-300 bg-black/20 backdrop-blur-sm border border-white/20 ${
                            isNavReady
                              ? 'hover:border-cyan-400/50 hover:text-white hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`
                    }`}
                    whileHover={isNavReady ? { scale: 1.05 } : {}}
                    whileTap={isNavReady ? { scale: 0.95 } : {}}
                  >
                    <span className='text-sm font-medium'>{item.label}</span>
                  </motion.button>
                )
              })}

              {/* Contact CTA */}
              <motion.button
                onClick={() => handleNavClick('contact', 4)}
                disabled={!isNavReady}
                className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                  isNavReady
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:shadow-cyan-400/40 cursor-pointer'
                    : 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-400/25 opacity-50 cursor-not-allowed'
                }`}
                whileHover={isNavReady ? { scale: 1.05 } : {}}
                whileTap={isNavReady ? { scale: 0.95 } : {}}
              >
                <span className='text-sm font-medium'>Contact</span>
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className='md:hidden flex items-center justify-around w-full space-x-1'>
              {/* Mobile Home Button */}
              <motion.button
                onClick={() => {
                  if (isSlideshow && onSectionChange) {
                    onSectionChange(0)
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className='relative flex flex-col items-center p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='text-xs font-medium'>Home</span>
              </motion.button>

              {navItems.map((item, index) => {
                const active = isActive(item.id, index)

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, index)}
                    className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-400/25'
                        : 'text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className='text-xs font-medium'>{item.label}</span>
                  </motion.button>
                )
              })}

              {/* Mobile Contact CTA */}
              <motion.button
                onClick={() => handleNavClick('contact', 4)}
                className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                  isActive('contact', 4)
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-400/25'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='text-xs font-medium'>Contact</span>
              </motion.button>
            </div>

            {/* Mobile Center Semi-Circle Navigation */}
            <div
              className={`md:hidden absolute left-1/2 transform -translate-x-1/2`}
              style={{ top: `${yOffset}px` }}
            >
              <div className='relative w-20 h-20 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center'>
                <div
                  className='absolute inset-0 rounded-full'
                  style={{
                    background: `conic-gradient(from 0deg, rgba(255,255,255,0.2) 0deg, rgba(255,255,255,0.2) ${arcLength}deg, transparent ${arcLength}deg, transparent 360deg)`,
                    mask: 'radial-gradient(circle, transparent 9px, black 10px)',
                    WebkitMask:
                      'radial-gradient(circle, transparent 9px, black 10px)',
                  }}
                />
                <div className='relative w-16 h-16'>
                  {/* Top half - Up arrow */}
                  <motion.button
                    onClick={onPrevSection}
                    disabled={currentSection === 0}
                    className={`absolute top-0 left-0 w-16 h-8 bg-black/40 backdrop-blur-sm border border-white/20 rounded-t-full flex items-center justify-center transition-all duration-300 ${
                      currentSection === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 cursor-pointer'
                    }`}
                    whileHover={currentSection > 0 ? { scale: 1.05 } : {}}
                    whileTap={currentSection > 0 ? { scale: 0.95 } : {}}
                  >
                    <ChevronUp className='w-4 h-4 text-white' />
                  </motion.button>

                  {/* Bottom half - Down arrow */}
                  <motion.button
                    onClick={onNextSection}
                    disabled={currentSection === (sections?.length || 1) - 1}
                    className={`absolute bottom-0 left-0 w-16 h-8 bg-black/40 backdrop-blur-sm border border-white/20 rounded-b-full flex items-center justify-center transition-all duration-300 ${
                      currentSection === (sections?.length || 1) - 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 cursor-pointer'
                    }`}
                    whileHover={
                      currentSection < (sections?.length || 1) - 1
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={
                      currentSection < (sections?.length || 1) - 1
                        ? { scale: 0.95 }
                        : {}
                    }
                  >
                    <ChevronDown className='w-4 h-4 text-white' />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle shadow/glow under nav */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none' />
    </motion.nav>
  )
}
