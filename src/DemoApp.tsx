import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EightBitHeroDemo from './components/8BitHeroDemo'
import PortfolioSection from '@components/PortfolioSection'

export default function DemoApp() {
  const [showDemo, setShowDemo] = useState(true)

  const toggleDemo = () => {
    setShowDemo(!showDemo)
  }

  return (
    <div className='relative min-h-screen bg-gray-900 overflow-hidden'>
      {/* Demo Toggle Button */}
      <button
        onClick={toggleDemo}
        className='fixed top-4 right-4 z-50 px-4 py-2 bg-cyan-400 text-black font-mono font-bold rounded hover:bg-cyan-300 transition-colors'
      >
        {showDemo ? 'SHOW ORIGINAL' : 'SHOW 8-BIT DEMO'}
      </button>

      <AnimatePresence mode='wait'>
        {showDemo ? (
          <EightBitHeroDemo key='8bit-demo' />
        ) : (
          <PortfolioSection key='portfolio' />
        )}
      </AnimatePresence>
    </div>
  )
}
