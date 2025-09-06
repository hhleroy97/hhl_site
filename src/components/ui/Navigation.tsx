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
  isTransitioning?: boolean
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
  isTransitioning: _isTransitioning = false,
}: NavigationProps = {}) {
  // Color morphing state
  const [colorTransition, setColorTransition] = useState({
    isTransitioning: false,
    progress: 0,
    fromSection: 0,
    toSection: 0,
  })

  // Color interpolation function
  const interpolateColor = (
    color1: string,
    color2: string,
    progress: number
  ) => {
    // Simple color interpolation for common Tailwind colors
    const colorMap = {
      'text-white': [255, 255, 255],
      'text-cyan-400': [34, 211, 238],
      'text-emerald-400': [52, 211, 153],
      'text-purple-400': [196, 181, 253],
    }

    const c1 = colorMap[color1 as keyof typeof colorMap] || [255, 255, 255]
    const c2 = colorMap[color2 as keyof typeof colorMap] || [255, 255, 255]

    const r = Math.round(c1[0] + (c2[0] - c1[0]) * progress)
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * progress)
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * progress)

    return `rgb(${r}, ${g}, ${b})`
  }

  // Get dynamic text color based on transition state - always return inline style for consistency
  const getDynamicTextColor = () => {
    if (colorTransition.isTransitioning) {
      // Use internal transition state for individual section changes
      const fromColors = getSectionColors(colorTransition.fromSection)
      const toColors = getSectionColors(colorTransition.toSection)

      return {
        style: {
          color: interpolateColor(
            fromColors.text,
            toColors.text,
            colorTransition.progress
          ),
        },
      }
    }

    // Always use inline style to prevent style/className switching lag
    const currentColors = getCurrentSectionColors()
    const colorValue = getColorValue(currentColors.text)
    return { style: { color: colorValue } }
  }

  // Convert Tailwind color class to actual color value
  const getColorValue = (colorClass: string) => {
    const colorMap = {
      'text-white': 'rgb(255, 255, 255)',
      'text-cyan-400': 'rgb(34, 211, 238)',
      'text-emerald-400': 'rgb(52, 211, 153)',
      'text-purple-400': 'rgb(196, 181, 253)',
    }
    return colorMap[colorClass as keyof typeof colorMap] || 'rgb(255, 255, 255)'
  }

  // Get section colors by index
  const getSectionColors = (sectionIndex: number) => {
    const sectionColorMap = {
      0: { text: 'text-white' }, // hero
      1: { text: 'text-cyan-400' }, // about
      2: { text: 'text-emerald-400' }, // experience
      3: { text: 'text-purple-400' }, // skills
      4: { text: 'text-cyan-400' }, // services
      5: { text: 'text-emerald-400' }, // contact
    }
    return (
      sectionColorMap[sectionIndex as keyof typeof sectionColorMap] || {
        text: 'text-white',
      }
    )
  }

  // Get current section's colors based on currentSection index
  const getCurrentSectionColors = () => {
    const sectionColorMap = {
      0: {
        text: 'text-white',
        border: 'border-white/20',
        hoverBorder: 'hover:border-white/50',
      }, // hero
      1: {
        text: 'text-cyan-400',
        border: 'border-cyan-400/30',
        hoverBorder: 'hover:border-cyan-400/50',
      }, // about
      2: {
        text: 'text-emerald-400',
        border: 'border-emerald-400/30',
        hoverBorder: 'hover:border-emerald-400/50',
      }, // experience
      3: {
        text: 'text-purple-400',
        border: 'border-purple-400/30',
        hoverBorder: 'hover:border-purple-400/50',
      }, // skills
      4: {
        text: 'text-cyan-400',
        border: 'border-cyan-400/30',
        hoverBorder: 'hover:border-cyan-400/50',
      }, // services
      5: {
        text: 'text-emerald-400',
        border: 'border-emerald-400/30',
        hoverBorder: 'hover:border-emerald-400/50',
      }, // contact
    }
    return (
      sectionColorMap[currentSection as keyof typeof sectionColorMap] || {
        text: 'text-white',
        border: 'border-white/20',
        hoverBorder: 'hover:border-white/50',
      }
    )
  }

  const [isSlideshow] = useState(Boolean(sections && onSectionChange))
  const [isNavReady, setIsNavReady] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [prevCurrentSection, setPrevCurrentSection] = useState<number | null>(
    null
  )

  // Track section changes and trigger color morphing
  useEffect(() => {
    // Initialize prevCurrentSection on first render
    if (prevCurrentSection === null) {
      setPrevCurrentSection(currentSection)
      return
    }

    // Trigger animation when section changes
    if (prevCurrentSection !== currentSection) {
      console.log(
        'Section changed from',
        prevCurrentSection,
        'to',
        currentSection
      )

      setColorTransition({
        isTransitioning: true,
        progress: 0,
        fromSection: prevCurrentSection,
        toSection: currentSection,
      })

      // Animate the color transition over 200ms
      const startTime = Date.now()
      const duration = 200

      const animateColor = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth transition
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        setColorTransition(prev => ({
          ...prev,
          progress: easeProgress,
        }))

        if (progress < 1) {
          requestAnimationFrame(animateColor)
        } else {
          setColorTransition({
            isTransitioning: false,
            progress: 0,
            fromSection: currentSection,
            toSection: currentSection,
          })
        }
      }

      requestAnimationFrame(animateColor)
      setPrevCurrentSection(currentSection)
    }
  }, [currentSection, prevCurrentSection])

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
      <div className='max-w-[90vw] sm:max-w-[80vw] md:max-w-[72vw] mx-auto px-3 md:px-4 relative'>
        {/* Glassmorphism background */}
        <div className='absolute inset-0 bg-gradient-to-bl from-white/10 via-white/5 to-black/20 backdrop-blur-md rounded-t-full border-t border-l border-r border-white/20 shadow-xl' />

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

            {/* Center Inline Navigation */}
            <div className='flex items-center justify-center'>
              {/* Horizontal Pill with Up/Down buttons */}
              <div className='relative bg-black/20 backdrop-blur-sm border-2 border-white/20 rounded-full px-2 py-2 flex items-center gap-2'>
                {/* Up arrow button */}
                <motion.button
                  onClick={onPrevSection}
                  disabled={currentSection === 0 || !isNavReady}
                  className={`px-4 py-2 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    currentSection === 0 || !isNavReady
                      ? 'opacity-50 cursor-not-allowed text-zinc-500'
                      : 'text-zinc-300 hover:text-white hover:bg-black/30 cursor-pointer'
                  }`}
                  whileHover={
                    currentSection > 0 && isNavReady ? { scale: 1.02 } : {}
                  }
                  whileTap={
                    currentSection > 0 && isNavReady ? { scale: 0.98 } : {}
                  }
                >
                  <ChevronUp
                    {...getDynamicTextColor()}
                    className='w-5 h-5 transition-all duration-200 group-hover:scale-110'
                  />
                </motion.button>

                {/* Vertical separator line */}
                <div className='w-px h-8 bg-white/10' />

                {/* Down arrow button */}
                <motion.button
                  onClick={onNextSection}
                  disabled={
                    currentSection === (sections?.length || 1) - 1 ||
                    !isNavReady
                  }
                  className={`px-4 py-2 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    currentSection === (sections?.length || 1) - 1 ||
                    !isNavReady
                      ? 'opacity-50 cursor-not-allowed text-zinc-500'
                      : 'text-zinc-300 hover:text-white hover:bg-black/30 cursor-pointer'
                  }`}
                  whileHover={
                    currentSection < (sections?.length || 1) - 1 && isNavReady
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    currentSection < (sections?.length || 1) - 1 && isNavReady
                      ? { scale: 0.98 }
                      : {}
                  }
                >
                  <ChevronDown
                    {...getDynamicTextColor()}
                    className='w-5 h-5 transition-all duration-200 group-hover:scale-110'
                  />
                </motion.button>
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
                className={`relative px-4 py-2 rounded-full transition-all duration-200 border-2 ${
                  isActive('contact', 4)
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-400/25 ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-black/50 border-white/30'
                    : isNavReady
                      ? 'text-zinc-300 bg-black/20 backdrop-blur-sm border-white/20 hover:border-white/50 hover:text-white hover:shadow-md hover:bg-black/30 cursor-pointer'
                      : 'text-zinc-300 bg-black/20 backdrop-blur-sm border-white/20 opacity-50 cursor-not-allowed'
                }`}
                whileHover={isNavReady ? { scale: 1.02 } : {}}
                whileTap={isNavReady ? { scale: 0.98 } : {}}
              >
                {isActive('contact', 4) ? (
                  <span
                    className='text-sm font-bold text-black'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Contact
                  </span>
                ) : (
                  <span
                    className='text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Contact
                  </span>
                )}
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
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-400/25 ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-black/50'
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
                    className='text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent'
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Contact
                  </span>
                )}
              </motion.button>
            </div>

            {/* Mobile Center Navigation */}
            <div className='md:hidden flex items-center justify-center'>
              {/* Horizontal Pill with Up/Down buttons (Mobile) */}
              <div className='relative bg-black/20 backdrop-blur-sm border-2 border-white/20 rounded-full px-1 py-1 flex items-center gap-1'>
                {/* Up arrow button */}
                <motion.button
                  onClick={onPrevSection}
                  disabled={currentSection === 0}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    currentSection === 0
                      ? 'opacity-50 cursor-not-allowed text-zinc-500'
                      : 'text-zinc-300 hover:text-white hover:bg-black/30 cursor-pointer'
                  }`}
                  whileHover={currentSection > 0 ? { scale: 1.02 } : {}}
                  whileTap={currentSection > 0 ? { scale: 0.98 } : {}}
                >
                  <ChevronUp
                    {...getDynamicTextColor()}
                    className='w-4 h-4 transition-all duration-200 group-hover:scale-110'
                  />
                </motion.button>

                {/* Vertical separator line */}
                <div className='w-px h-6 bg-white/10' />

                {/* Down arrow button */}
                <motion.button
                  onClick={onNextSection}
                  disabled={currentSection === (sections?.length || 1) - 1}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    currentSection === (sections?.length || 1) - 1
                      ? 'opacity-50 cursor-not-allowed text-zinc-500'
                      : 'text-zinc-300 hover:text-white hover:bg-black/30 cursor-pointer'
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
                  <ChevronDown
                    {...getDynamicTextColor()}
                    className='w-4 h-4 transition-all duration-200 group-hover:scale-110'
                  />
                </motion.button>
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
