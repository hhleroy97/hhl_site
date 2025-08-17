import React, { useState } from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'
import DynamicInfoPanel from './DynamicInfoPanel'

interface ServiceItem {
  id: string
  type: 'service' | 'skill'
  title: string
  description: string
  technologies: string[]
  highlight: string
  icon?: string
  deliverables?: string[]
  timeline?: string
  category?: string
  proficiency?: 'Expert' | 'Advanced' | 'Proficient'
}

interface CyberpunkTrainerWithInfoPanelProps {
  trainerName?: string
  className?: string
  onEnterPortfolio?: () => void
  coreServices?: ServiceItem[]
  skillsCapabilities?: ServiceItem[]
}

const CyberpunkTrainerWithInfoPanel: React.FC<
  CyberpunkTrainerWithInfoPanelProps
> = ({
  trainerName,
  className = '',
  onEnterPortfolio,
  coreServices,
  skillsCapabilities,
}) => {
  const [hoveredItem, setHoveredItem] = useState<ServiceItem | null>(null)

  return (
    <div
      className={`cyberpunk-trainer-container flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8 max-w-6xl mx-auto px-4 ${className}`}
      style={{
        transform: 'scale(0.8)',
        transformOrigin: 'center',
      }}
    >
      {/* Info Panel */}
      <div className='w-full max-w-80 lg:w-80 flex-shrink-0 order-2 lg:order-1'>
        <DynamicInfoPanel
          hoveredItem={hoveredItem}
          className='w-full overflow-hidden'
          style={{
            height: '485px',
          }}
        />
      </div>

      {/* Trainer Card */}
      <div className='order-1 lg:order-2'>
        <CyberpunkTrainerCard
          trainerName={trainerName}
          onEnterPortfolio={onEnterPortfolio}
          coreServices={coreServices}
          skillsCapabilities={skillsCapabilities}
          onHoverItem={setHoveredItem}
        />
      </div>
    </div>
  )
}

export default CyberpunkTrainerWithInfoPanel
