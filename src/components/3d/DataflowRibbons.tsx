import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Helper functions

// Optimized toon gradient texture - cached
const gradientTextures = new Map<number, THREE.CanvasTexture>()
function makeToonGradient(levels = 4) {
  if (gradientTextures.has(levels)) {
    return gradientTextures.get(levels)!
  }

  const c = document.createElement('canvas')
  c.width = 1
  c.height = levels
  const ctx = c.getContext('2d')!
  for (let i = 0; i < levels; i++) {
    const v = Math.round((255 * i) / Math.max(1, levels - 1))
    ctx.fillStyle = `rgb(${v},${v},${v})`
    ctx.fillRect(0, levels - 1 - i, 1, 1)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true

  gradientTextures.set(levels, tex)
  return tex
}

interface DataflowRibbonsProps {
  performance?: 'low' | 'medium' | 'high'
  interactive?: boolean
  autoRotate?: boolean
}

const DataflowRibbons: React.FC<DataflowRibbonsProps> = ({
  performance: performanceLevel = 'medium',
  interactive = true,
  autoRotate = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Performance settings based on level
  const getPerformanceSettings = useCallback(() => {
    switch (performanceLevel) {
      case 'low':
        return {
          lanes: 4,
          tubeSegments: 32,
          tubeRadialSegments: 6,
          curveSegments: 48,
          enableShadows: false,
          pixelRatio: 1,
        }
      case 'high':
        return {
          lanes: 8,
          tubeSegments: 128,
          tubeRadialSegments: 16,
          curveSegments: 96,
          enableShadows: true,
          pixelRatio: 2,
        }
      default: // medium
        return {
          lanes: 6,
          tubeSegments: 64,
          tubeRadialSegments: 8,
          curveSegments: 64,
          enableShadows: false,
          pixelRatio: 1.5,
        }
    }
  }, [performanceLevel])

  useEffect(() => {
    if (!containerRef.current) return
    if (typeof globalThis.performance === 'undefined') {
      console.warn(
        'Performance API not available, falling back to basic timing'
      )
      return
    }

    const container = containerRef.current
    const settings = getPerformanceSettings()

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null

    // Camera setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
    camera.position.set(0, 8, 20) // Moved camera closer and higher to see all traces

    // Renderer setup with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: performanceLevel !== 'low',
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, settings.pixelRatio)
    )
    renderer.setSize(width, height)

    // Performance optimizations
    if (settings.enableShadows) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }

    container.appendChild(renderer.domElement)

    // Controls with performance settings
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = interactive
    controls.enablePan = interactive
    controls.enableRotate = interactive
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 0.5

    // Optimized lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.05)
    keyLight.position.set(10, 18, 14)
    if (settings.enableShadows) {
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
    }
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x6fd6ff, 0.75)
    rimLight.position.set(-8, 12, -10)
    scene.add(rimLight)

    // Build ribbons with performance optimizations
    const GRAD4 = makeToonGradient(4)
    const board = [18, 6]
    const [W] = board
    const padX = Math.max(0.6, W * 0.06)

    // Calculate lane positions
    const xL = -W / 2 + padX
    const xR = W / 2 - padX

    // Base Y position for traces
    const y = 0.02

    // Circuit board layout system with performance optimizations
    const meshes: THREE.Mesh[] = []

    // Each ribbon gets its own Y-level to guarantee zero overlap
    const baseRibbonY = y + 0.05

    // Simple trace creation without zones
    const tubeRadius = 0.15 // Much larger radius to make traces clearly visible
    const maxTraces = 20 // Create 20 traces
    
    // Collision detection and avoidance for clean PCB routing
    const occupiedRegions: Array<{x1: number, x2: number, z1: number, z2: number}> = []
    const traceWidth = tubeRadius * 2 + 0.2 // Tube diameter plus clearance
    
    const checkCollision = (x1: number, x2: number, z1: number, z2: number): boolean => {
      return occupiedRegions.some(region => 
        !(x2 < region.x1 || x1 > region.x2 || z2 < region.z1 || z1 > region.z2)
      )
    }
    
    const addOccupiedRegion = (x1: number, x2: number, z1: number, z2: number) => {
      occupiedRegions.push({x1, x2, z1, z2})
    }
    
    const createPCBRoute = (
      startX: number,
      endX: number,
      traceIndex: number
    ): THREE.Vector3[] => {
      const ribbonY = baseRibbonY
      
      // Start with preferred Z position
      let baseZ = traceIndex * 1.2 // Increased spacing
      
      // Try different routing strategies until we find a clear path
      for (let attempt = 0; attempt < 5; attempt++) {
        const routePoints: THREE.Vector3[] = []
        const segments: Array<{x1: number, x2: number, z1: number, z2: number}> = []
        let hasCollision = false
        
        // Strategy varies by attempt - start with more interesting patterns
        if (attempt === 0) {
          // Attempt 1: Simple step pattern (preferred PCB style)
          const stepZ = baseZ + 2.0
          routePoints.push(new THREE.Vector3(startX, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.3, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.3, ribbonY, stepZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.7, ribbonY, stepZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.7, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(endX, ribbonY, baseZ))
          
          segments.push(
            {x1: startX, x2: startX + (endX - startX) * 0.3, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.3, x2: startX + (endX - startX) * 0.3, z1: Math.min(baseZ, stepZ) - traceWidth/2, z2: Math.max(baseZ, stepZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.3, x2: startX + (endX - startX) * 0.7, z1: stepZ - traceWidth/2, z2: stepZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.7, x2: startX + (endX - startX) * 0.7, z1: Math.min(baseZ, stepZ) - traceWidth/2, z2: Math.max(baseZ, stepZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.7, x2: endX, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2}
          )
        } else if (attempt === 1) {
          // Attempt 2: Direct horizontal route (fallback)
          routePoints.push(new THREE.Vector3(startX, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(endX, ribbonY, baseZ))
          segments.push({
            x1: startX, x2: endX,
            z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2
          })
        } else if (attempt === 2) {
          // Attempt 3: Step down
          const stepZ = baseZ - 2.0
          routePoints.push(new THREE.Vector3(startX, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.3, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.3, ribbonY, stepZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.7, ribbonY, stepZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.7, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(endX, ribbonY, baseZ))
          
          segments.push(
            {x1: startX, x2: startX + (endX - startX) * 0.3, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.3, x2: startX + (endX - startX) * 0.3, z1: Math.min(baseZ, stepZ) - traceWidth/2, z2: Math.max(baseZ, stepZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.3, x2: startX + (endX - startX) * 0.7, z1: stepZ - traceWidth/2, z2: stepZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.7, x2: startX + (endX - startX) * 0.7, z1: Math.min(baseZ, stepZ) - traceWidth/2, z2: Math.max(baseZ, stepZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.7, x2: endX, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2}
          )
        } else if (attempt === 3) {
          // Attempt 4: Large detour up
          const detourZ = baseZ + 4.0
          routePoints.push(new THREE.Vector3(startX, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.2, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.2, ribbonY, detourZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.8, ribbonY, detourZ))
          routePoints.push(new THREE.Vector3(startX + (endX - startX) * 0.8, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(endX, ribbonY, baseZ))
          
          segments.push(
            {x1: startX, x2: startX + (endX - startX) * 0.2, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.2, x2: startX + (endX - startX) * 0.2, z1: Math.min(baseZ, detourZ) - traceWidth/2, z2: Math.max(baseZ, detourZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.2, x2: startX + (endX - startX) * 0.8, z1: detourZ - traceWidth/2, z2: detourZ + traceWidth/2},
            {x1: startX + (endX - startX) * 0.8, x2: startX + (endX - startX) * 0.8, z1: Math.min(baseZ, detourZ) - traceWidth/2, z2: Math.max(baseZ, detourZ) + traceWidth/2},
            {x1: startX + (endX - startX) * 0.8, x2: endX, z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2}
          )
        } else {
          // Attempt 5: Force a different Z level
          baseZ = traceIndex * 1.2 + (attempt - 4) * 3.0
          routePoints.push(new THREE.Vector3(startX, ribbonY, baseZ))
          routePoints.push(new THREE.Vector3(endX, ribbonY, baseZ))
          segments.push({
            x1: startX, x2: endX,
            z1: baseZ - traceWidth/2, z2: baseZ + traceWidth/2
          })
        }
        
        // Check for collisions with existing traces
        for (const segment of segments) {
          if (checkCollision(segment.x1, segment.x2, segment.z1, segment.z2)) {
            hasCollision = true
            break
          }
        }
        
        if (!hasCollision) {
          // Found a clear path, reserve the space and return the route
          for (const segment of segments) {
            addOccupiedRegion(segment.x1, segment.x2, segment.z1, segment.z2)
          }
          return routePoints
        }
      }
      
      // Fallback: force trace to a higher Z level
      baseZ = traceIndex * 1.2 + Math.ceil(traceIndex / 5) * 6.0
      const fallbackPoints = [
        new THREE.Vector3(startX, ribbonY, baseZ),
        new THREE.Vector3(endX, ribbonY, baseZ)
      ]
      addOccupiedRegion(startX, endX, baseZ - traceWidth/2, baseZ + traceWidth/2)
      return fallbackPoints
    }

    for (let i = 0; i < maxTraces; i++) {
      const tubeR = tubeRadius
      
      // Generate proper PCB routing points
      const pts3 = createPCBRoute(xL, xR, i)

      // Create path from discrete points (no curves for sharp PCB angles)
      const curve = new THREE.CatmullRomCurve3(pts3, false, 'centripetal', 0.0)
      const geom = new THREE.TubeGeometry(
        curve,
        settings.tubeSegments,
        tubeR,
        settings.tubeRadialSegments,
        false
      )
      // Simple color progression across all traces
      const hue = (i / maxTraces) * 0.8 // Spread across most of the color spectrum
      const col = new THREE.Color().setHSL(hue, 0.8, 0.6)

      const mat = new THREE.MeshToonMaterial({
        color: col,
        gradientMap: GRAD4,
        transparent: true,
        opacity: 1.0, // Full opacity to see traces clearly
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.scale.y = Math.max(0.15, 0.03 / (tubeR * 2))

      // Add emissive glow for more complex paths
      if (pts3.length > 5) {
        mat.emissive = col.clone().multiplyScalar(0.12)
      }

      if (settings.enableShadows) {
        mesh.castShadow = true
      }

      // Set proper depth ordering - deeper traces rendered first
      mesh.renderOrder = i
      mesh.material.depthTest = true
      mesh.material.depthWrite = true

      scene.add(mesh)
      meshes.push(mesh)
    }

    // Performance monitoring
    let frameCount = 0
    let lastTime = globalThis.performance?.now() || Date.now()
    let fps = 60

    // Optimized animation loop
    let animationId: number
    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      // FPS monitoring
      frameCount++
      const currentTime = globalThis.performance?.now() || Date.now()
      if (currentTime - lastTime >= 1000) {
        fps = frameCount
        frameCount = 0
        lastTime = currentTime

        // Adaptive quality adjustment
        if (fps < 30 && performanceLevel === 'high') {
          console.warn(
            'Low FPS detected, consider switching to medium performance'
          )
        }
      }

      controls.update()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const newWidth = container.clientWidth || window.innerWidth
        const newHeight = container.clientHeight || window.innerHeight

        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    // Visibility API for performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (resizeTimeout) clearTimeout(resizeTimeout)

      controls.dispose()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      // Dispose geometries and materials
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material: THREE.Material) =>
              material.dispose()
            )
          } else {
            object.material?.dispose()
          }
        }
      })

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [
    performanceLevel,
    interactive,
    autoRotate,
    getPerformanceSettings,
    isVisible,
  ])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 w-full h-full overflow-hidden'
      style={{
        cursor: interactive ? 'grab' : 'default',
        background: 'transparent',
      }}
    />
  )
}

export default DataflowRibbons
