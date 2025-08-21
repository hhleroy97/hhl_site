import PortfolioSection from '@components/PortfolioSection'
import { VisualizationProvider } from './contexts/VisualizationContext'

export default function App() {
  return (
    <VisualizationProvider>
      <PortfolioSection />
    </VisualizationProvider>
  )
}
