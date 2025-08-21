import React, { createContext, useContext, useState, useCallback } from 'react'

interface VisualizationContextType {
  highlightedSkill: string | null
  highlightSkill: (skill: string | null) => void
  isVisualizationActive: boolean
  setVisualizationActive: (active: boolean) => void
  visualizationIntensity: number
  updateVisualizationIntensity: (intensity: number) => void
}

const VisualizationContext = createContext<
  VisualizationContextType | undefined
>(undefined)

export function VisualizationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null)
  const [isVisualizationActive, setIsVisualizationActive] = useState(true)
  const [visualizationIntensity, setVisualizationIntensity] = useState(0.4)

  const highlightSkill = useCallback((skill: string | null) => {
    setHighlightedSkill(skill)
  }, [])

  const setVisualizationActive = useCallback((active: boolean) => {
    setIsVisualizationActive(active)
  }, [])

  const updateVisualizationIntensity = useCallback((intensity: number) => {
    setVisualizationIntensity(Math.max(0, Math.min(1, intensity)))
  }, [])

  const value: VisualizationContextType = {
    highlightedSkill,
    highlightSkill,
    isVisualizationActive,
    setVisualizationActive,
    visualizationIntensity,
    updateVisualizationIntensity,
  }

  return (
    <VisualizationContext.Provider value={value}>
      {children}
    </VisualizationContext.Provider>
  )
}

export function useVisualization() {
  const context = useContext(VisualizationContext)
  if (context === undefined) {
    throw new Error(
      'useVisualization must be used within a VisualizationProvider'
    )
  }
  return context
}

// Hook for components that need to trigger visualization highlights
export function useVisualizationTrigger() {
  const { highlightSkill } = useVisualization()

  const triggerHighlight = useCallback(
    (skill: string) => {
      highlightSkill(skill)
    },
    [highlightSkill]
  )

  const clearHighlight = useCallback(() => {
    highlightSkill(null)
  }, [highlightSkill])

  return { triggerHighlight, clearHighlight }
}
