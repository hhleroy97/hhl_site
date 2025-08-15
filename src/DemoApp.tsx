import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EightBitHeroDemo from './components/8BitHeroDemo'
import PortfolioSection from '@components/PortfolioSection'
import CyberpunkTrainerCardDemo from '@components/CyberpunkTrainerCardDemo'

export default function DemoApp() {
  const [showDemo, setShowDemo] = useState(true)
  const [showTrainerCard, setShowTrainerCard] = useState(true) // Show trainer card by default

  const toggleDemo = () => {
    setShowDemo(!showDemo)
  }

  // Show trainer card demo
  if (showTrainerCard) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <button
          onClick={() => setShowTrainerCard(false)}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '8px 16px',
            fontSize: '12px',
            backgroundColor: '#00ffff',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          BACK TO ORIGINAL DEMO
        </button>
        <CyberpunkTrainerCardDemo />
      </div>
    )
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
