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
      className={`flex items-start gap-8 max-w-6xl mx-auto ${className}`}
      style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}
    >
      {/* Trainer Card */}
      <div>
        <CyberpunkTrainerCard
          trainerName={trainerName}
          onEnterPortfolio={onEnterPortfolio}
          coreServices={coreServices}
          skillsCapabilities={skillsCapabilities}
          onHoverItem={setHoveredItem}
        />
      </div>

      {/* Info Panel */}
      <div className='w-80 flex-shrink-0'>
        <DynamicInfoPanel
          hoveredItem={hoveredItem}
          className='w-full overflow-hidden'
          style={{
            height: '485px', // Back to the height that was working before
          }}
        />
      </div>
    </div>
  )
}

export default CyberpunkTrainerWithInfoPanel
