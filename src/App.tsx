import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroSection from '@components/IntroSection'
import PortfolioSection from '@components/PortfolioSection'
import CursorTrail from '@components/CursorTrail'
// import CyberpunkTrainerCardDemo from '@components/CyberpunkTrainerCardDemo'
// import SimpleTest from '@components/SimpleTest'

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [showTrainerCard] = useState(true) // TEMP: Show trainer card

  const handleEnterPortfolio = () => {
    setShowPortfolio(true)
  }

  // ULTRA SIMPLE TEST
  if (showTrainerCard) {
    // Add alert to confirm this code is running
    setTimeout(() => alert('APP.TSX IS RUNNING - SHOWTRAINERCARD IS TRUE'), 100)

    return (
      <div
        style={{
          backgroundColor: 'red',
          minHeight: '100vh',
          padding: '20px',
          border: '10px solid yellow',
        }}
      >
        <h1
          style={{ color: 'white', fontSize: '48px', backgroundColor: 'blue' }}
        >
          🚨 TESTING - IF YOU SEE THIS THE REACT APP IS WORKING 🚨
        </h1>
        <div
          style={{
            backgroundColor: 'red',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ color: 'white' }}>RED HEADER</h2>
        </div>
        <div
          style={{
            backgroundColor: 'purple',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ color: 'white' }}>PURPLE CONTAINER</h2>
          <div
            style={{
              backgroundColor: 'blue',
              padding: '15px',
              marginBottom: '10px',
            }}
          >
            <h3 style={{ color: 'white' }}>BLUE WORK EXPERIENCE</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 1
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 2
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 3
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 4
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 5
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Box 6
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'green', padding: '15px' }}>
            <h3 style={{ color: 'white' }}>GREEN ACHIEVEMENTS</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 1
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 2
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 3
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 4
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 5
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 6
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 7
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '10px',
                  color: 'black',
                }}
              >
                Badge 8
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'yellow', padding: '20px' }}>
          <h2 style={{ color: 'black' }}>YELLOW PROFILE</h2>
        </div>
      </div>
    )
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
