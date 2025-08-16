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
      className={`grid grid-cols-3 gap-8 items-center h-full w-full ${className}`}
    >
      {/* Trainer Card - 2/3 width */}
      <div className='col-span-2 flex justify-center'>
        <CyberpunkTrainerCard
          trainerName={trainerName}
          onEnterPortfolio={onEnterPortfolio}
          coreServices={coreServices}
          skillsCapabilities={skillsCapabilities}
          onHoverItem={setHoveredItem}
        />
      </div>

      {/* Info Panel - 1/3 width */}
      <div className='col-span-1'>
        <DynamicInfoPanel
          hoveredItem={hoveredItem}
          className='w-full'
          style={{
            height: '857px', // Exact match: 1000px ÷ 3.5 × 2 × 1.5 = 857px
          }}
        />
      </div>
    </div>
  )
}

export default CyberpunkTrainerWithInfoPanel
