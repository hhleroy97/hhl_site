import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './ui/Navigation'
import LandingPage from './portfolio/LandingPage'
import Services from './portfolio/Services'
import Experience from './portfolio/Experience'
import About from './portfolio/About'
import Skills from './portfolio/Skills'
import Contact from './portfolio/Contact'

const sections = [
  {
    id: 'hero',
    label: 'Home',
    component: LandingPage,
    props: (nextSection: () => void) => ({ onNextSection: nextSection }),
  },
  { id: 'about', label: 'About', component: About },
  { id: 'experience', label: 'Experience', component: Experience },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'services', label: 'Services', component: Services },
  { id: 'contact', label: 'Contact', component: Contact },
]

export default function SlideshowPortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateToSection = useCallback(
    (index: number) => {
      if (
        index !== currentSection &&
        index >= 0 &&
        index < sections.length &&
        !isTransitioning
      ) {
        const newDirection = index > currentSection ? 1 : -1
        setDirection(newDirection)
        setIsTransitioning(true)

        // Immediate section change - no progressive animation
        setCurrentSection(index)

        // Update URL hash
        window.history.pushState(null, '', `#${sections[index].id}`)

        // Extended transition state to match navigation color morphing duration
        setTimeout(() => {
          setIsTransitioning(false)
        }, 200)
      }
    },
    [currentSection, isTransitioning]
  )

  // Navigate by section ID (for hash routing)
  const navigateToSectionById = useCallback(
    (sectionId: string) => {
      const index = sections.findIndex(section => section.id === sectionId)
      if (index !== -1) {
        navigateToSection(index)
      }
    },
    [navigateToSection]
  )

  const nextSection = useCallback(() => {
    if (currentSection < sections.length - 1 && !isTransitioning) {
      navigateToSection(currentSection + 1)
    }
  }, [currentSection, navigateToSection, isTransitioning])

  const prevSection = useCallback(() => {
    if (currentSection > 0 && !isTransitioning) {
      navigateToSection(currentSection - 1)
    }
  }, [currentSection, navigateToSection, isTransitioning])

  // Handle initial hash and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the '#'
      if (hash) {
        navigateToSectionById(hash)
      }
    }

    // Handle initial hash on mount
    const initialHash = window.location.hash.slice(1)
    if (initialHash) {
      navigateToSectionById(initialHash)
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [navigateToSectionById])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        nextSection()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        prevSection()
      } else if (e.key >= '1' && e.key <= '6') {
        e.preventDefault()
        navigateToSection(parseInt(e.key) - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSection, prevSection, navigateToSection])

  // Touch navigation for mobile section transitions
  useEffect(() => {
    if (currentSection !== 0) return // Only active on landing page

    let touchStartY = 0
    let touchEndY = 0
    let isScrollAtBottom = false

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY

      // Check if we're at the bottom of the landing page
      const container = document.documentElement || document.body
      isScrollAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50

      const deltaY = touchStartY - touchEndY

      // If scrolling down and we're at the bottom, go to next section
      if (deltaY > 50 && isScrollAtBottom && currentSection === 0) {
        nextSection()
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSection, nextSection])

  // Wheel navigation with improved sensitivity control
  useEffect(() => {
    let isScrolling = false
    let scrollAccumulator = 0
    const scrollThreshold = 100
    const cooldownTime = 1500

    const handleWheel = (e: WheelEvent) => {
      // Allow natural scrolling on landing page (mobile and desktop)
      if (currentSection === 0) return

      if (isScrolling || isTransitioning) return

      e.preventDefault()

      scrollAccumulator += Math.abs(e.deltaY)

      if (scrollAccumulator >= scrollThreshold) {
        isScrolling = true
        scrollAccumulator = 0

        if (e.deltaY > 0) {
          nextSection()
        } else {
          prevSection()
        }

        setTimeout(() => {
          isScrolling = false
        }, cooldownTime)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [nextSection, prevSection, isTransitioning, currentSection])

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const CurrentComponent = sections[currentSection].component
  const currentSection_obj = sections[currentSection]
  const componentProps = currentSection_obj.props
    ? currentSection_obj.props(nextSection)
    : {}

  return (
    <div className='relative h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white overflow-y-auto sm:overflow-hidden'>
      {/* Navigation - Hidden on landing page */}
      {currentSection !== 0 && (
        <Navigation
          currentSection={currentSection}
          onSectionChange={navigateToSection}
          onSectionChangeById={navigateToSectionById}
          sections={sections}
          onPrevSection={prevSection}
          onNextSection={nextSection}
          isTransitioning={isTransitioning}
        />
      )}

      {/* Main Content Area */}
      <div className='relative h-full'>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className='absolute inset-0 h-full'
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className='h-screen overflow-y-auto pb-24'
              style={{ pointerEvents: 'auto' }}
            >
              <CurrentComponent {...componentProps} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background elements */}
      <div className='fixed inset-0 pointer-events-none opacity-30'>
        {/* Animated grid */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage:
              'linear-gradient(rgba(176, 106, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 106, 247, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating data streams */}
        <div
          className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '3s' }}
        />
        <div
          className='absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
        <div
          className='absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        />
      </div>
    </div>
  )
}
