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
      className={`flex gap-8 items-start h-full w-full ${className}`}
      style={{ alignItems: 'stretch' }}
    >
      {/* Trainer Card - 2/3 width */}
      <div className='flex-[2] flex justify-center'>
        <CyberpunkTrainerCard
          trainerName={trainerName}
          onEnterPortfolio={onEnterPortfolio}
          coreServices={coreServices}
          skillsCapabilities={skillsCapabilities}
          onHoverItem={setHoveredItem}
        />
      </div>

      {/* Info Panel - 1/3 width */}
      <div className='flex-[1] flex items-stretch'>
        <DynamicInfoPanel
          hoveredItem={hoveredItem}
          className='w-full h-full'
          style={{ height: '480px' }} // Adjusted to better match card scaling
        />
      </div>
    </div>
  )
}

export default CyberpunkTrainerWithInfoPanel
