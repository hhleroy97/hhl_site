import SlideshowPortfolio from '@components/SlideshowPortfolio'
import { VisualizationProvider } from './context/VisualizationContext'
import { CardVariantProvider } from './context/CardVariantContext'

export default function App() {
  return (
    <VisualizationProvider>
      <CardVariantProvider>
        <SlideshowPortfolio />
      </CardVariantProvider>
    </VisualizationProvider>
  )
}
