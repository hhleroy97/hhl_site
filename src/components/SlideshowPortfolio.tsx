import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './ui/Navigation'
import SlideshowNavigation from './ui/SlideshowNavigation'
import LandingPage from './portfolio/LandingPage'
import Services from './portfolio/Services'
import WorkExperience from './portfolio/WorkExperience'
import NewAbout from './portfolio/NewAbout'
import SkillsTools from './portfolio/SkillsTools'
import ContactFooter from './portfolio/ContactFooter'

const sections = [
  {
    id: 'hero',
    label: 'Home',
    component: LandingPage,
    props: (nextSection: () => void) => ({ onNextSection: nextSection }),
  },
  { id: 'about', label: 'About', component: NewAbout },
  { id: 'experience', label: 'Experience', component: WorkExperience },
  { id: 'skills', label: 'Skills', component: SkillsTools },
  { id: 'services', label: 'Services', component: Services },
  { id: 'contact', label: 'Contact', component: ContactFooter },
]

export default function SlideshowPortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigateToSection = useCallback(
    (index: number) => {
      if (index !== currentSection && index >= 0 && index < sections.length) {
        setDirection(index > currentSection ? 1 : -1)
        setCurrentSection(index)
      }
    },
    [currentSection]
  )

  const nextSection = useCallback(() => {
    if (currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1)
    }
  }, [currentSection, navigateToSection])

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1)
    }
  }, [currentSection, navigateToSection])

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

  // Wheel navigation with improved sensitivity control
  useEffect(() => {
    let isScrolling = false
    let scrollAccumulator = 0
    const scrollThreshold = 100
    const cooldownTime = 1500

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

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
  }, [nextSection, prevSection])

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
    <div className='relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white'>
      {/* Navigation - Hidden on landing page */}
      {currentSection !== 0 && (
        <Navigation
          currentSection={currentSection}
          onSectionChange={navigateToSection}
          sections={sections}
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
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className='absolute inset-0 h-full'
          >
            <div className='h-screen overflow-y-auto'>
              <CurrentComponent {...componentProps} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Combined Navigation - Hidden on landing page */}
      {currentSection !== 0 && (
        <SlideshowNavigation
          currentSection={currentSection}
          sections={sections}
          onSectionChange={navigateToSection}
          onPrevSection={prevSection}
          onNextSection={nextSection}
        />
      )}

      {/* Section Counter - Hidden on landing page */}
      {currentSection !== 0 && (
        <div className='fixed bottom-8 right-8 z-40'>
          <div className='px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-zinc-300'>
            {currentSection + 1} / {sections.length}
          </div>
        </div>
      )}

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
