import React from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Demo Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-cyber font-bold cyberpunk-glow'>
            PROFESSIONAL IMPACT CARD
          </h1>
          <p className='text-cyberpunk-neon/80 font-mono text-sm'>
            Core services and proof points for maximum visitor engagement
          </p>
        </div>

        {/* Main Demo Card */}
        <div className='flex justify-center'>
          <CyberpunkTrainerCard
            trainerName='HARTLEY H. LEROY'
            className='max-w-3xl w-full'
          />
        </div>

        {/* Features List */}
        <div className='bg-gradient-to-r from-cyberpunk-purple/10 to-cyberpunk-blue/10 border border-cyberpunk-neon/30 rounded-lg p-6 mt-12'>
          <h2 className='text-xl font-cyber font-bold text-cyberpunk-pink mb-4'>
            FEATURES
          </h2>
          <ul className='space-y-2 text-cyberpunk-neon/80 font-mono text-sm'>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Name in top left corner with professional tagline</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Core services section - 6 offerings in 3x2 grid</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Proof points badges - 8 credibility metrics in 4x2 grid
              </span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Professional status display with availability indicator
              </span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Service-focused icons optimized for visitor engagement
              </span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Hover effects and neon glow styling</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Professional tools display with 'Available for Hire' status
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCardDemo
