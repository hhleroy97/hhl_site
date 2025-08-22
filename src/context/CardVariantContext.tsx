import React, { createContext, useContext, useState, ReactNode } from 'react'

type CardVariant = 'floating' | 'rotated' | 'background' | 'cutcorner'

interface CardVariantContextType {
  variant: CardVariant
  setVariant: (variant: CardVariant) => void
}

const CardVariantContext = createContext<CardVariantContextType | undefined>(
  undefined
)

export function CardVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CardVariant>('floating')

  return (
    <CardVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </CardVariantContext.Provider>
  )
}

export function useCardVariant() {
  const context = useContext(CardVariantContext)
  if (context === undefined) {
    throw new Error('useCardVariant must be used within a CardVariantProvider')
  }
  return context
}
