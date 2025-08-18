'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroSection from './HeroSection'

// Example of how to integrate the HeroSection into your Next.js app
export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  const handleEnterPortfolio = () => {
    setShowPortfolio(true)
    // You can also add smooth scrolling to your portfolio section
    // document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='min-h-screen'>
      <AnimatePresence mode='wait'>
        {!showPortfolio ? (
          <HeroSection key='hero' onEnterPortfolio={handleEnterPortfolio} />
        ) : (
          <div key='portfolio' className='min-h-screen bg-gray-900 p-8'>
            {/* Your existing portfolio content goes here */}
            <h1 className='text-white text-4xl'>Portfolio Section</h1>
            <p className='text-gray-300 mt-4'>
              This is where your portfolio content would be displayed after the
              intro.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Alternative integration approach - keeping intro as overlay
export function AppWithOverlay() {
  const [showIntro, setShowIntro] = useState(true)

  const handleEnterPortfolio = () => {
    setShowIntro(false)
  }

  return (
    <div className='relative min-h-screen'>
      {/* Your main portfolio content */}
      <div className='min-h-screen bg-gray-900 p-8'>
        <h1 className='text-white text-4xl'>Portfolio Section</h1>
        <p className='text-gray-300 mt-4'>
          This approach keeps your portfolio always rendered underneath.
        </p>
      </div>

      {/* Hero overlay */}
      <AnimatePresence>
        {showIntro && (
          <div className='fixed inset-0 z-50'>
            <HeroSection onEnterPortfolio={handleEnterPortfolio} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
