import SlideshowPortfolio from '@components/SlideshowPortfolio'
import { VisualizationProvider } from './contexts/VisualizationContext'

export default function App() {
  return (
    <VisualizationProvider>
      <SlideshowPortfolio />
    </VisualizationProvider>
  )
}
