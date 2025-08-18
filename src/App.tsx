import { useEffect, Suspense } from 'react'
import PortfolioSection from '@components/PortfolioSection'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import ErrorBoundary from '@components/ui/ErrorBoundary'
import { performanceMonitor } from '@/utils/performance'

export default function App() {
  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        performanceMonitor.logMetrics()
      }, 3000)
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className='relative min-h-screen bg-tech-dark overflow-hidden'>
        {/* Engineering-inspired background gradient */}
        <div
          className='fixed inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-navy-deep'
          aria-hidden='true'
        />

        {/* Subtle circuit-pattern background */}
        <div
          className='fixed inset-0 opacity-[0.03] pointer-events-none'
          aria-hidden='true'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 170, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-500 text-tech-dark font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
        >
          Skip to main content
        </a>

        <main id='main-content' className='relative z-10'>
          <Suspense
            fallback={
              <div className='flex items-center justify-center min-h-screen'>
                <LoadingSpinner size='lg' text='Loading portfolio...' />
              </div>
            }
          >
            <PortfolioSection />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  )
}
