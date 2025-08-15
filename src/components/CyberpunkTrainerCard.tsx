import React from 'react'

interface CyberpunkTrainerCardProps {
  trainerName?: string
  className?: string
}

const CyberpunkTrainerCard: React.FC<CyberpunkTrainerCardProps> = ({
  trainerName = 'NAME',
  className = '',
}) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan rounded-xl p-6 cyberpunk-border ${className}`}
    >
      {/* Top Banner */}
      <div className='flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 rounded-lg border border-cyberpunk-neon/30'>
        <div className='w-8 h-8 bg-cyberpunk-neon/20 border border-cyberpunk-neon rounded flex items-center justify-center'>
          <div className='w-4 h-4 bg-cyberpunk-neon animate-pulse rounded-sm'></div>
        </div>

        <h1 className='text-xl font-cyber font-bold cyberpunk-glow tracking-wider'>
          TRAINER CARD
        </h1>

        <div className='w-8 h-8 bg-cyberpunk-pink/20 border border-cyberpunk-pink rounded flex items-center justify-center'>
          <div className='w-4 h-4 bg-cyberpunk-pink animate-pulse rounded-sm'></div>
        </div>
      </div>

      {/* Trainer Name Section */}
      <div className='text-right mb-6'>
        <div className='inline-block p-2 bg-cyberpunk-neon/10 border border-cyberpunk-neon/50 rounded-lg'>
          <span className='text-cyberpunk-neon font-mono text-lg font-bold'>
            {trainerName}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='grid grid-cols-2 gap-6'>
        {/* Left Column - Pokemon and Badges */}
        <div className='space-y-4'>
          {/* Pokemon Slots */}
          <div className='space-y-3'>
            <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider'>
              POKEMON
            </h3>
            <div className='grid grid-cols-3 gap-2'>
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className='aspect-square bg-gradient-to-br from-cyberpunk-purple/20 to-cyberpunk-blue/20 border border-cyberpunk-neon/40 rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-transparent via-cyberpunk-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <span className='text-cyberpunk-neon/60 font-mono text-xs z-10'>
                    #{i + 1}
                  </span>
                  <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-neon/30 to-transparent'></div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Section */}
          <div className='space-y-3'>
            <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider'>
              BADGES
            </h3>
            <div className='flex justify-between gap-1'>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className='w-8 h-8 bg-gradient-to-br from-cyberpunk-yellow/20 to-cyberpunk-red/20 border border-cyberpunk-yellow/50 rounded-full flex items-center justify-center relative overflow-hidden group hover:border-cyberpunk-pink/60 transition-all duration-300'
                >
                  <div className='w-3 h-3 bg-cyberpunk-yellow/30 rounded-full animate-pulse'></div>
                  <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Trainer Silhouette */}
        <div className='relative'>
          <h3 className='text-cyberpunk-pink font-cyber text-sm font-bold tracking-wider mb-3'>
            TRAINER
          </h3>
          <div className='relative h-64 bg-gradient-to-b from-cyberpunk-blue/10 via-cyberpunk-purple/10 to-cyberpunk-dark/20 border border-cyberpunk-neon/40 rounded-lg overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 opacity-30'>
                <div className='absolute top-4 left-4 w-2 h-2 bg-cyberpunk-neon rounded-full animate-pulse'></div>
                <div
                  className='absolute top-8 right-6 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse'
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className='absolute bottom-12 left-6 w-1 h-1 bg-cyberpunk-blue rounded-full animate-pulse'
                  style={{ animationDelay: '1s' }}
                ></div>
                <div
                  className='absolute bottom-6 right-4 w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse'
                  style={{ animationDelay: '1.5s' }}
                ></div>
              </div>

              {/* Circuit pattern */}
              <div className='absolute inset-0 opacity-20'>
                <svg
                  className='w-full h-full'
                  viewBox='0 0 100 100'
                  fill='none'
                >
                  <path
                    d='M10 50 L30 50 L35 45 L35 35 L40 30 L60 30 L65 35 L65 55 L70 60 L90 60'
                    stroke='currentColor'
                    strokeWidth='0.5'
                    className='text-cyberpunk-neon'
                  />
                  <circle
                    cx='35'
                    cy='35'
                    r='1'
                    fill='currentColor'
                    className='text-cyberpunk-pink'
                  />
                  <circle
                    cx='65'
                    cy='55'
                    r='1'
                    fill='currentColor'
                    className='text-cyberpunk-blue'
                  />
                </svg>
              </div>
            </div>

            {/* Trainer Placeholder */}
            <div className='absolute inset-4 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-16 h-20 mx-auto bg-gradient-to-b from-cyberpunk-neon/30 to-cyberpunk-blue/30 rounded-full mb-2 relative'>
                  <div className='absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-cyberpunk-neon/20 rounded-full'></div>
                  <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-cyberpunk-blue/20 rounded-lg'></div>
                </div>
                <span className='text-cyberpunk-neon/60 font-mono text-xs'>
                  TRAINER IMAGE
                </span>
              </div>
            </div>

            {/* Scanlines effect */}
            <div className='absolute inset-0 scanlines'></div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className='mt-6 flex justify-between items-center p-3 bg-gradient-to-r from-cyberpunk-dark via-cyberpunk-purple/10 to-cyberpunk-dark border border-cyberpunk-neon/30 rounded-lg'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-cyberpunk-green rounded-full animate-pulse'></div>
          <span className='text-cyberpunk-green font-mono text-xs'>ACTIVE</span>
        </div>

        <div className='text-cyberpunk-neon/60 font-mono text-xs'>
          ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
        </div>

        <div className='flex items-center space-x-2'>
          <span className='text-cyberpunk-blue font-mono text-xs'>LVL</span>
          <span className='text-cyberpunk-neon font-mono text-xs font-bold'>
            ∞
          </span>
        </div>
      </div>

      {/* Holographic overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-neon/5 via-transparent to-cyberpunk-pink/5 rounded-xl pointer-events-none'></div>

      {/* Corner accents */}
      <div className='absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyberpunk-neon'></div>
      <div className='absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyberpunk-neon'></div>
      <div className='absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyberpunk-neon'></div>
      <div className='absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyberpunk-neon'></div>
    </div>
  )
}

export default CyberpunkTrainerCard
