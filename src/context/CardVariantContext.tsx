import { createContext, useContext, ReactNode } from 'react'

type CardVariant = 'floating' | 'rotated' | 'background' | 'cutcorner'

interface CardVariantContextType {
  variant: CardVariant
  setVariant: (variant: CardVariant) => void
}

const CardVariantContext = createContext<CardVariantContextType | undefined>(
  undefined
)

export function CardVariantProvider({ children }: { children: ReactNode }) {
  const variant = 'floating' as const
  const setVariant = () => {} // No-op since we're using floating only

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
