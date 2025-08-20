// Performance monitoring and optimization utilities
export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage?: number
  gpuMemory?: number
  drawCalls?: number
  triangles?: number
  timestamp: number
}

export interface PerformanceThresholds {
  lowFps: number
  targetFps: number
  maxFrameTime: number
  maxMemoryUsage: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  private maxMetrics = 60 // Keep last 60 frames
  private isMonitoring = false
  private frameCount = 0
  private lastTime = globalThis.performance?.now() || Date.now()
  private thresholds: PerformanceThresholds = {
    lowFps: 30,
    targetFps: 60,
    maxFrameTime: 16.67, // 60fps = 16.67ms per frame
    maxMemoryUsage: 100 * 1024 * 1024, // 100MB
  }

  // Start monitoring
  start() {
    if (this.isMonitoring) return
    this.isMonitoring = true
    this.metrics = []
    this.frameCount = 0
    this.lastTime = globalThis.performance?.now() || Date.now()
    this.monitorFrame()
  }

  // Stop monitoring
  stop() {
    this.isMonitoring = false
  }

  // Monitor a single frame
  private monitorFrame = () => {
    if (!this.isMonitoring) return

    const currentTime = globalThis.performance?.now() || Date.now()
    const frameTime = currentTime - this.lastTime
    const fps = 1000 / frameTime

    const metric: PerformanceMetrics = {
      fps,
      frameTime,
      timestamp: currentTime,
    }

    // Add memory usage if available
    if (globalThis.performance && 'memory' in globalThis.performance) {
      const memory = (globalThis.performance as any).memory
      metric.memoryUsage = memory.usedJSHeapSize
    }

    this.metrics.push(metric)
    this.frameCount++

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift()
    }

    this.lastTime = currentTime
    requestAnimationFrame(this.monitorFrame)
  }

  // Get current performance metrics
  getCurrentMetrics(): PerformanceMetrics | null {
    if (this.metrics.length === 0) return null
    return this.metrics[this.metrics.length - 1]
  }

  // Get average metrics over the last N frames
  getAverageMetrics(frames: number = 30): PerformanceMetrics | null {
    if (this.metrics.length === 0) return null

    const recentMetrics = this.metrics.slice(-frames)
    const avgFps = recentMetrics.reduce((sum, m) => sum + m.fps, 0) / recentMetrics.length
    const avgFrameTime = recentMetrics.reduce((sum, m) => sum + m.frameTime, 0) / recentMetrics.length

    return {
      fps: avgFps,
      frameTime: avgFrameTime,
      timestamp: globalThis.performance?.now() || Date.now(),
    }
  }

  // Check if performance is acceptable
  isPerformanceAcceptable(): boolean {
    const avgMetrics = this.getAverageMetrics()
    if (!avgMetrics) return true

    return avgMetrics.fps >= this.thresholds.lowFps
  }

  // Get performance recommendations
  getRecommendations(): string[] {
    const avgMetrics = this.getAverageMetrics()
    if (!avgMetrics) return []

    const recommendations: string[] = []

    if (avgMetrics.fps < this.thresholds.lowFps) {
      recommendations.push('Consider reducing 3D complexity or switching to lower performance mode')
    }

    if (avgMetrics.frameTime > this.thresholds.maxFrameTime) {
      recommendations.push('Frame time is high - consider optimizing render settings')
    }

    if (avgMetrics.memoryUsage && avgMetrics.memoryUsage > this.thresholds.maxMemoryUsage) {
      recommendations.push('Memory usage is high - consider cleaning up unused resources')
    }

    return recommendations
  }

  // Log performance metrics
  logMetrics() {
    const current = this.getCurrentMetrics()
    const average = this.getAverageMetrics()
    const recommendations = this.getRecommendations()

    console.group('Performance Metrics')
    if (current) {
      console.log('Current FPS:', current.fps.toFixed(1))
      console.log('Current Frame Time:', current.frameTime.toFixed(2) + 'ms')
    }
    if (average) {
      console.log('Average FPS:', average.fps.toFixed(1))
      console.log('Average Frame Time:', average.frameTime.toFixed(2) + 'ms')
    }
    if (recommendations.length > 0) {
      console.warn('Recommendations:', recommendations)
    }
    console.groupEnd()
  }

  // Set performance thresholds
  setThresholds(thresholds: Partial<PerformanceThresholds>) {
    this.thresholds = { ...this.thresholds, ...thresholds }
  }

  // Get all metrics for analysis
  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  // Clear metrics
  clear() {
    this.metrics = []
  }
}

// 3D-specific performance utilities
export class ThreeJSPerformanceMonitor {
  private renderer: THREE.WebGLRenderer | null = null
  private info: any = null

  constructor(renderer?: THREE.WebGLRenderer) {
    if (renderer) {
      this.setRenderer(renderer)
    }
  }

  setRenderer(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer
    // Access Three.js info if available
    if ('info' in THREE) {
      this.info = (THREE as any).info
    }
  }

  getThreeJSMetrics(): Partial<PerformanceMetrics> {
    if (!this.renderer) return {}

    const metrics: Partial<PerformanceMetrics> = {}

    // Get renderer info
    if (this.info) {
      metrics.drawCalls = this.info.render.calls
      metrics.triangles = this.info.render.triangles
    }

    // Get memory info if available
    if ('memory' in performance) {
      const memory = (performance as any).memory
      metrics.memoryUsage = memory.usedJSHeapSize
    }

    return metrics
  }

  // Optimize renderer settings based on performance
  optimizeRenderer(performanceLevel: 'low' | 'medium' | 'high') {
    if (!this.renderer) return

    switch (performanceLevel) {
      case 'low':
        this.renderer.setPixelRatio(1)
        this.renderer.shadowMap.enabled = false
        break
      case 'medium':
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        this.renderer.shadowMap.enabled = false
        break
      case 'high':
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.shadowMap.enabled = true
        break
    }
  }

  // Get optimization suggestions for Three.js
  getThreeJSOptimizations(): string[] {
    const metrics = this.getThreeJSMetrics()
    const suggestions: string[] = []

    if (metrics.drawCalls && metrics.drawCalls > 100) {
      suggestions.push('High draw calls - consider using instancing or merging geometries')
    }

    if (metrics.triangles && metrics.triangles > 50000) {
      suggestions.push('High triangle count - consider using LOD or reducing geometry complexity')
    }

    if (metrics.memoryUsage && metrics.memoryUsage > 100 * 1024 * 1024) {
      suggestions.push('High memory usage - dispose unused geometries and materials')
    }

    return suggestions
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  performanceMonitor.start()
  
  // Log metrics every 5 seconds in development
  setInterval(() => {
    performanceMonitor.logMetrics()
  }, 5000)
}

export default performanceMonitor
