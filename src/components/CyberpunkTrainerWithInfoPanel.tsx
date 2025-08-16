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
    <div className={`flex gap-8 items-start ${className}`}>
      {/* Trainer Card */}
      <div className='flex-shrink-0'>
        <CyberpunkTrainerCard
          trainerName={trainerName}
          onEnterPortfolio={onEnterPortfolio}
          coreServices={coreServices}
          skillsCapabilities={skillsCapabilities}
          onHoverItem={setHoveredItem}
        />
      </div>

      {/* Info Panel */}
      <div className='flex-shrink-0 w-80'>
        <DynamicInfoPanel hoveredItem={hoveredItem} className='relative' />
      </div>
    </div>
  )
}

export default CyberpunkTrainerWithInfoPanel
