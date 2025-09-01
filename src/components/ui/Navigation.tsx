import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface NavigationProps {
  currentSection?: number
  onSectionChange?: (index: number) => void
  onSectionChangeById?: (sectionId: string) => void
  sections?: Array<{ id: string; label: string; component: any }>
  onPrevSection?: () => void
  onNextSection?: () => void
}

const navItems = [
  { id: 'about', label: 'About', gradient: 'from-cyan-400 to-teal-400' },
  {
    id: 'experience',
    label: 'Experience',
    gradient: 'from-emerald-400 to-teal-500',
  },
  { id: 'skills', label: 'Skills', gradient: 'from-purple-400 to-pink-500' },
  { id: 'services', label: 'Services', gradient: 'from-cyan-400 to-blue-500' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({
  currentSection = 0,
  onSectionChange,
  onSectionChangeById,
  sections,
  onPrevSection,
  onNextSection,
}: NavigationProps = {}) {
  const [isSlideshow] = useState(Boolean(sections && onSectionChange))
  const [isNavReady, setIsNavReady] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const yOffset = -70
  const arcLength = 0

  // Scroll-based active section detection for non-slideshow mode
  useEffect(() => {
    if (isSlideshow) return

    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            console.log(
              'Setting active section:',
              sections[i],
              'scrollPosition:',
              scrollPosition,
              'elementTop:',
              elementTop,
              'elementBottom:',
              elementBottom
            )
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial position
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSlideshow])

  const handleNavClick = (itemId: string, index: number) => {
    if (isSlideshow && onSectionChangeById) {
      // Use hash-based routing for slideshow mode
      window.location.hash = itemId
    } else if (isSlideshow && onSectionChange) {
      // Fallback to index-based navigation
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
    const active = activeSection === itemId
    if (itemId === 'contact') {
      console.log(
        'Contact active check:',
        active,
        'activeSection:',
        activeSection,
        'itemId:',
        itemId
      )
    }
    return active
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
                  if (isSlideshow) {
                    window.location.hash = 'hero'
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                disabled={!isNavReady}
                className={`relative px-4 py-2 rounded-full text-zinc-300 bg-black/20 backdrop-blur-sm border-2 border-white/20 transition-all duration-200 ${
                  isNavReady
                    ? 'hover:border-cyan-400/50 hover:text-white hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                whileHover={isNavReady ? { scale: 1.02 } : {}}
                whileTap={isNavReady ? { scale: 0.98 } : {}}
              >
                <span
                  className='text-sm font-bold'
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Home
                </span>
              </motion.button>

              {navItems.slice(0, 2).map((item, index) => {
                const active = isActive(item.id, index)
                const gradient = item.gradient || 'from-cyan-400 to-purple-500'

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, index)}
                    disabled={!isNavReady}
                    className={`relative px-4 py-2 rounded-full transition-all duration-200 border-2 ${
                      active
                        ? `bg-gradient-to-r ${gradient} shadow-lg border-white/30 ring-2 ring-white/20 ring-offset-2 ring-offset-black/50`
                        : `text-zinc-300 bg-black/20 backdrop-blur-sm border-white/20 ${
                            isNavReady
                              ? 'hover:border-white/50 hover:text-white hover:shadow-md hover:bg-black/30 cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`
                    }`}
                    whileHover={isNavReady ? { scale: 1.02 } : {}}
                    whileTap={isNavReady ? { scale: 0.98 } : {}}
                  >
                    {active ? (
                      <span
                        className='text-sm font-bold text-black'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <span
                        className='text-sm font-bold'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    )}
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
                  {/* Full circle - Up arrow (when on last section) */}
                  {currentSection === (sections?.length || 1) - 1 ? (
                    <motion.button
                      onClick={onPrevSection}
                      disabled={!isNavReady}
                      className={`absolute inset-0 w-24 h-24 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group ${
                        !isNavReady
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                      }`}
                      whileHover={isNavReady ? { scale: 1.02 } : {}}
                      whileTap={isNavReady ? { scale: 0.98 } : {}}
                    >
                      <ChevronUp className='w-6 h-6 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                    </motion.button>
                  ) : (
                    <>
                      {/* Top half - Up arrow */}
                      <motion.button
                        onClick={onPrevSection}
                        disabled={currentSection === 0 || !isNavReady}
                        className={`absolute top-0 left-0 w-24 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-t-full flex items-center justify-center transition-all duration-300 group ${
                          currentSection === 0 || !isNavReady
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                        }`}
                        whileHover={
                          currentSection > 0 && isNavReady
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          currentSection > 0 && isNavReady
                            ? { scale: 0.98 }
                            : {}
                        }
                      >
                        <ChevronUp className='w-6 h-6 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                      </motion.button>

                      {/* Bottom half - Down arrow */}
                      <motion.button
                        onClick={onNextSection}
                        disabled={
                          currentSection === (sections?.length || 1) - 1 ||
                          !isNavReady
                        }
                        className={`absolute bottom-0 left-0 w-24 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-b-full flex items-center justify-center transition-all duration-300 group ${
                          currentSection === (sections?.length || 1) - 1 ||
                          !isNavReady
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                        }`}
                        whileHover={
                          currentSection < (sections?.length || 1) - 1 &&
                          isNavReady
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          currentSection < (sections?.length || 1) - 1 &&
                          isNavReady
                            ? { scale: 0.98 }
                            : {}
                        }
                      >
                        <ChevronDown className='w-6 h-6 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Navigation Items */}
            <div className='hidden md:flex items-center justify-evenly w-[calc(50%-4rem)] space-x-4'>
              {navItems.slice(2, 4).map((item, index) => {
                const actualIndex = index + 2 // Adjust for the slice
                const active = isActive(item.id, actualIndex)
                const gradient = item.gradient || 'from-cyan-400 to-purple-500'

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, actualIndex)}
                    disabled={!isNavReady}
                    className={`relative px-4 py-2 rounded-full transition-all duration-200 border-2 ${
                      active
                        ? `bg-gradient-to-r ${gradient} shadow-lg border-white/30 ring-2 ring-white/20 ring-offset-2 ring-offset-black/50`
                        : `text-zinc-300 bg-black/20 backdrop-blur-sm border-white/20 ${
                            isNavReady
                              ? 'hover:border-white/50 hover:text-white hover:shadow-md hover:bg-black/30 cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          }`
                    }`}
                    whileHover={isNavReady ? { scale: 1.02 } : {}}
                    whileTap={isNavReady ? { scale: 0.98 } : {}}
                  >
                    {active ? (
                      <span
                        className='text-sm font-bold text-black'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <span
                        className='text-sm font-bold'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    )}
                  </motion.button>
                )
              })}

              {/* Contact CTA */}
              <motion.button
                onClick={() => handleNavClick('contact', 4)}
                disabled={!isNavReady}
                className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive('contact', 4)
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/25 ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-black/50'
                    : isNavReady
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:shadow-cyan-400/40 cursor-pointer'
                      : 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/25 opacity-50 cursor-not-allowed'
                }`}
                whileHover={isNavReady ? { scale: 1.02 } : {}}
                whileTap={isNavReady ? { scale: 0.98 } : {}}
              >
                <span
                  className='text-sm font-bold text-black'
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Contact
                </span>
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className='md:hidden flex items-center justify-around w-full space-x-1'>
              {/* Mobile Home Button */}
              <motion.button
                onClick={() => {
                  if (isSlideshow) {
                    window.location.hash = 'hero'
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className='relative flex flex-col items-center p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className='text-xs font-bold'
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Home
                </span>
              </motion.button>

              {navItems.map((item, index) => {
                const active = isActive(item.id, index)

                const gradient = item.gradient || 'from-cyan-400 to-purple-500'

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, index)}
                    className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                      active
                        ? `bg-gradient-to-r ${gradient} shadow-lg ring-2 ring-white/20 ring-offset-2 ring-offset-black/50`
                        : 'text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {active ? (
                      <span
                        className='text-xs font-bold text-black'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <span
                        className='text-xs font-bold'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    )}
                  </motion.button>
                )
              })}

              {/* Mobile Contact CTA */}
              <motion.button
                onClick={() => handleNavClick('contact', 4)}
                className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                  isActive('contact', 4)
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/25 ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-black/50'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive('contact', 4) ? (
                  <span
                    className='text-xs font-bold text-black'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Contact
                  </span>
                ) : (
                  <span
                    className='text-xs font-bold'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Contact
                  </span>
                )}
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
                  {/* Full circle - Up arrow (when on last section) */}
                  {currentSection === (sections?.length || 1) - 1 ? (
                    <motion.button
                      onClick={onPrevSection}
                      className={`absolute inset-0 w-16 h-16 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ChevronUp className='w-4 h-4 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                    </motion.button>
                  ) : (
                    <>
                      {/* Top half - Up arrow */}
                      <motion.button
                        onClick={onPrevSection}
                        disabled={currentSection === 0}
                        className={`absolute top-0 left-0 w-16 h-8 bg-black/40 backdrop-blur-sm border border-white/20 rounded-t-full flex items-center justify-center transition-all duration-300 group ${
                          currentSection === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                        }`}
                        whileHover={currentSection > 0 ? { scale: 1.02 } : {}}
                        whileTap={currentSection > 0 ? { scale: 0.98 } : {}}
                      >
                        <ChevronUp className='w-4 h-4 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                      </motion.button>

                      {/* Bottom half - Down arrow */}
                      <motion.button
                        onClick={onNextSection}
                        disabled={
                          currentSection === (sections?.length || 1) - 1
                        }
                        className={`absolute bottom-0 left-0 w-16 h-8 bg-black/40 backdrop-blur-sm border border-white/20 rounded-b-full flex items-center justify-center transition-all duration-300 group ${
                          currentSection === (sections?.length || 1) - 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-md hover:shadow-cyan-400/10 hover:bg-black/30 cursor-pointer'
                        }`}
                        whileHover={
                          currentSection < (sections?.length || 1) - 1
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          currentSection < (sections?.length || 1) - 1
                            ? { scale: 0.98 }
                            : {}
                        }
                      >
                        <ChevronDown className='w-4 h-4 text-white transition-colors duration-200 group-hover:text-cyan-400' />
                      </motion.button>
                    </>
                  )}
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
