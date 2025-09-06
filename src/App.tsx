import SlideshowPortfolio from '@components/SlideshowPortfolio'
import MobileStack from '@components/sections/MobileStack'
import { useEffect } from 'react'
import { VisualizationProvider } from './context/VisualizationContext'
import { CardVariantProvider } from './context/CardVariantContext'

export default function App() {
  // Lock scroll on mobile when on the landing (no hash or #hero). Unlock elsewhere.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const applyLock = () => {
      const isMobile = mq.matches
      const hash = window.location.hash
      const onLanding = hash === '' || hash === '#hero'
      if (isMobile && onLanding) {
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
      } else {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
      }
    }
    applyLock()
    const onHash = () => applyLock()
    const onChange = () => applyLock()
    window.addEventListener('hashchange', onHash)
    mq.addEventListener?.('change', onChange)
    return () => {
      window.removeEventListener('hashchange', onHash)
      mq.removeEventListener?.('change', onChange)
      // ensure unlock on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [])
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
