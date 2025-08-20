import React, { useState, useEffect } from 'react'
import { performanceMonitor } from '@/utils/performance'

interface PerformanceDisplayProps {
  className?: string
  showDetails?: boolean
}

const PerformanceDisplay: React.FC<PerformanceDisplayProps> = ({
  className = '',
  showDetails = false,
}) => {
  const [metrics, setMetrics] = useState<{
    fps: number
    frameTime: number
    memoryUsage?: number
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMetrics = () => {
      const current = performanceMonitor.getCurrentMetrics()
      if (current) {
        setMetrics({
          fps: current.fps,
          frameTime: current.frameTime,
          memoryUsage: current.memoryUsage,
        })
      }
    }

    // Update metrics every 100ms
    const interval = setInterval(updateMetrics, 100)
    updateMetrics() // Initial update

    return () => clearInterval(interval)
  }, [])

      // Only show in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
      return null
    }

  if (!metrics) {
    return null
  }

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400'
    if (fps >= 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getFrameTimeColor = (frameTime: number) => {
    if (frameTime <= 16.67) return 'text-green-400'
    if (frameTime <= 33.33) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatMemory = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)}MB`
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 bg-tech-dark/90 backdrop-blur-sm border border-tech-teal/20 rounded-lg p-3 text-xs font-mono ${
        isVisible ? 'opacity-100' : 'opacity-30 hover:opacity-100'
      } transition-opacity duration-300 ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className='flex items-center gap-4'>
        <div>
          <div className='text-tech-text-muted'>FPS</div>
          <div className={`font-bold ${getFpsColor(metrics.fps)}`}>
            {metrics.fps.toFixed(0)}
          </div>
        </div>
        
        <div>
          <div className='text-tech-text-muted'>Frame</div>
          <div className={`font-bold ${getFrameTimeColor(metrics.frameTime)}`}>
            {metrics.frameTime.toFixed(1)}ms
          </div>
        </div>

        {showDetails && metrics.memoryUsage && (
          <div>
            <div className='text-tech-text-muted'>Memory</div>
            <div className='font-bold text-tech-cyan'>
              {formatMemory(metrics.memoryUsage)}
            </div>
          </div>
        )}
      </div>

      {showDetails && (
        <div className='mt-2 pt-2 border-t border-tech-teal/20'>
          <div className='text-tech-text-muted text-xs'>
            Performance: {metrics.fps >= 55 ? 'Excellent' : metrics.fps >= 30 ? 'Good' : 'Poor'}
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceDisplay
