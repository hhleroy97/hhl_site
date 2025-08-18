// Performance monitoring and optimization utilities

export interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics()
    }
  }

  private initializeMetrics() {
    // First Contentful Paint
    this.observePerformanceEntry('first-contentful-paint', entry => {
      this.metrics.fcp = entry.startTime
    })

    // Largest Contentful Paint
    this.observeLCP()

    // First Input Delay
    this.observeFID()

    // Cumulative Layout Shift
    this.observeCLS()

    // Time to First Byte
    this.observeTTFB()
  }

  private observePerformanceEntry(
    entryType: string,
    callback: (entry: PerformanceEntry) => void
  ) {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries()
      entries.forEach(callback)
    })

    try {
      observer.observe({ entryTypes: [entryType] })
    } catch {
      // Fallback for browsers that don't support the entry type
      console.warn(`Performance observer for ${entryType} not supported`)
    }
  }

  private observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.lcp = lastEntry.startTime
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch {
        console.warn('LCP observation not supported')
      }
    }
  }

  private observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        entries.forEach(
          (entry: PerformanceEntry & { processingStart?: number }) => {
            if (entry.processingStart && entry.startTime) {
              this.metrics.fid = entry.processingStart - entry.startTime
            }
          }
        )
      })

      try {
        observer.observe({ entryTypes: ['first-input'] })
      } catch {
        console.warn('FID observation not supported')
      }
    }
  }

  private observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        entries.forEach(
          (
            entry: PerformanceEntry & {
              hadRecentInput?: boolean
              value?: number
            }
          ) => {
            if (!entry.hadRecentInput && entry.value) {
              clsValue += entry.value
              this.metrics.cls = clsValue
            }
          }
        )
      })

      try {
        observer.observe({ entryTypes: ['layout-shift'] })
      } catch {
        console.warn('CLS observation not supported')
      }
    }
  }

  private observeTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0) {
        this.metrics.ttfb =
          navigationEntries[0].responseStart - navigationEntries[0].requestStart
      }
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public logMetrics() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.table(this.metrics)
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Utility functions for performance optimization
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export const preloadImages = async (sources: string[]): Promise<void> => {
  const promises = sources.map(preloadImage)
  await Promise.allSettled(promises)
}

// Debounce utility for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer utility for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  })
}

// Memory usage monitoring
export const getMemoryUsage = (): Record<string, number> | null => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as unknown as { memory: Record<string, number> }).memory
  }
  return null
}

// Connection quality detection
export const getConnectionQuality = (): string => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (
      navigator as unknown as { connection: { effectiveType?: string } }
    ).connection
    return connection.effectiveType || 'unknown'
  }
  return 'unknown'
}

// Reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Prefers color scheme
export const prefersColorScheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Resource hints
export const addResourceHint = (
  href: string,
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch',
  as?: string
) => {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  if (as) link.setAttribute('as', as)

  document.head.appendChild(link)
}

// Critical resource loading
export const loadCriticalResources = async (
  resources: Array<{ src: string; type: 'image' | 'font' | 'script' }>
) => {
  const promises = resources.map(resource => {
    switch (resource.type) {
      case 'image':
        return preloadImage(resource.src)
      case 'font':
        addResourceHint(resource.src, 'preload', 'font')
        return Promise.resolve()
      case 'script':
        return import(resource.src)
      default:
        return Promise.resolve()
    }
  })

  await Promise.allSettled(promises)
}
