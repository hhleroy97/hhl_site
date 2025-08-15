import React from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Demo Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-cyber font-bold cyberpunk-glow'>
            CYBERPUNK PROFESSIONAL CARD
          </h1>
          <p className='text-cyberpunk-neon/80 font-mono text-sm'>
            Professional card with stacked work experience and achievement
            sections
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
              <span>Work experience section - 6 slots in 3x2 grid</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Achievement badges - 8 slots in 4x2 grid with metrics</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Properly stacked sections with full width</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Custom icons for each company and achievement</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Hover effects and neon glow styling</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Compact profile section with circuit patterns</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCardDemo
