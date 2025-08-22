import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './ui/Navigation'
import NewHero from './portfolio/NewHero'
import Services from './portfolio/Services'
import WorkExperience from './portfolio/WorkExperience'
import NewAbout from './portfolio/NewAbout'
import SkillsTools from './portfolio/SkillsTools'
import ContactFooter from './portfolio/ContactFooter'

const sections = [
  { id: 'hero', label: 'Home', component: NewHero },
  { id: 'services', label: 'Services', component: Services },
  { id: 'experience', label: 'Experience', component: WorkExperience },
  { id: 'about', label: 'About', component: NewAbout },
  { id: 'skills', label: 'Skills', component: SkillsTools },
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

  return (
    <div className='relative h-screen overflow-hidden bg-zinc-900 text-white'>
      {/* Navigation - Updated to work with slideshow */}
      <Navigation
        currentSection={currentSection}
        onSectionChange={navigateToSection}
        sections={sections}
      />

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
            <div className='h-screen flex flex-col justify-center overflow-y-auto'>
              <CurrentComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className='fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4'>
        {/* Up Arrow */}
        <motion.button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border-2 border-red-500 ${
            currentSection === 0
              ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400'
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

        {/* Down Arrow */}
        <motion.button
          onClick={nextSection}
          disabled={currentSection === sections.length - 1}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border-2 border-red-500 ${
            currentSection === sections.length - 1
              ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400'
          }`}
          whileHover={
            currentSection < sections.length - 1 ? { scale: 1.1 } : {}
          }
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

      {/* Section Indicators */}
      <div className='fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3'>
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-red-500 ${
              index === currentSection
                ? 'bg-cyan-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: index === currentSection ? 1.25 : 1.1 }}
            aria-label={`Go to ${section.label}`}
          />
        ))}
      </div>

      {/* Section Counter */}
      <div className='fixed bottom-8 right-8 z-40'>
        <div className='px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-zinc-300 border-2 border-red-500'>
          {currentSection + 1} / {sections.length}
        </div>
      </div>

      {/* Background elements */}
      <div className='fixed inset-0 pointer-events-none opacity-30'>
        {/* Animated grid */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage:
              'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating data streams */}
        <div
          className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '3s' }}
        />
        <div
          className='absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
        <div
          className='absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-pulse'
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        />
      </div>
    </div>
  )
}
