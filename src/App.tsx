import SlideshowPortfolio from '@components/SlideshowPortfolio'
import MobileStack from '@components/sections/MobileStack'
import { VisualizationProvider } from './context/VisualizationContext'
import { CardVariantProvider } from './context/CardVariantContext'

export default function App() {
  return (
    <VisualizationProvider>
      <CardVariantProvider>
        {/* Mobile: stacked scrolling; Desktop/Tablet: slideshow */}
        <div className='md:hidden'>
          <MobileStack />
        </div>
        <div className='hidden md:block'>
          <SlideshowPortfolio />
        </div>
      </CardVariantProvider>
    </VisualizationProvider>
  )
}
