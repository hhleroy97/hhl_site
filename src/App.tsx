import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroSection from '@components/IntroSection'
import PortfolioSection from '@components/PortfolioSection'
import CursorTrail from '@components/CursorTrail'

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  const handleEnterPortfolio = () => {
    setShowPortfolio(true)
  }

  return (
    <div className='relative min-h-screen bg-cyberpunk-dark overflow-hidden'>
      <CursorTrail />

      <AnimatePresence mode='wait'>
        {!showPortfolio ? (
          <IntroSection key='intro' onEnter={handleEnterPortfolio} />
        ) : (
          <PortfolioSection key='portfolio' />
        )}
      </AnimatePresence>
    </div>
  )
}
