import React from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Demo Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-cyber font-bold cyberpunk-glow'>
            CYBERPUNK TRAINER CARD
          </h1>
          <p className='text-cyberpunk-neon/80 font-mono text-sm'>
            A futuristic trainer card with cyberpunk aesthetics and modular
            design
          </p>
        </div>

        {/* Main Demo Card */}
        <div className='flex justify-center'>
          <CyberpunkTrainerCard
            trainerName='HARTLEY'
            className='max-w-2xl w-full'
          />
        </div>

        {/* Additional Examples */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
          <CyberpunkTrainerCard
            trainerName='PLAYER_01'
            className='transform scale-90'
          />
          <CyberpunkTrainerCard
            trainerName='CYBER_MASTER'
            className='transform scale-90'
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
              <span>Six modular Pokémon portrait slots (3x2 grid)</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Eight badge slots with hover effects</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Full-body trainer silhouette area</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Animated scanlines and holographic effects</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Neon glow borders and cyberpunk color scheme</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Circuit pattern background textures</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Customizable trainer name</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCardDemo
