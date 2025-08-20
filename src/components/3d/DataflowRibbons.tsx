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

    // Authentic PCB-style pattern generation with maximum 5 bends per line
    const generatePCBSegment = (
      progress: number,
      patternType: number
    ): number => {
      const patternAmplitude = 2.5

      switch (patternType) {
        case 0: // Simple 3-bend pattern: horizontal → up → horizontal → down → horizontal
          if (progress < 0.2) {
            return 0 // Straight horizontal
          } else if (progress < 0.3) {
            return (patternAmplitude * (progress - 0.2)) / 0.1 // 90-degree turn up
          } else if (progress < 0.7) {
            return patternAmplitude // Straight horizontal
          } else if (progress < 0.8) {
            return (
              patternAmplitude - (patternAmplitude * (progress - 0.7)) / 0.1
            ) // 90-degree turn down
          } else {
            return 0 // Straight horizontal
          }
        case 1: // 5-bend zigzag: horizontal → up → horizontal → down → horizontal → up → horizontal
          if (progress < 0.15) {
            return 0 // Straight horizontal
          } else if (progress < 0.25) {
            return (patternAmplitude * (progress - 0.15)) / 0.1 // 90-degree turn up
          } else if (progress < 0.35) {
            return patternAmplitude // Straight horizontal
          } else if (progress < 0.45) {
            return (
              patternAmplitude - (patternAmplitude * (progress - 0.35)) / 0.1
            ) // 90-degree turn down
          } else if (progress < 0.55) {
            return 0 // Straight horizontal
          } else if (progress < 0.65) {
            return (patternAmplitude * (progress - 0.55)) / 0.1 // 90-degree turn up
          } else if (progress < 0.75) {
            return patternAmplitude // Straight horizontal
          } else if (progress < 0.85) {
            return (
              patternAmplitude - (patternAmplitude * (progress - 0.75)) / 0.1
            ) // 90-degree turn down
          } else {
            return 0 // Straight horizontal
          }
        case 2: // 3-bend step pattern: horizontal → up → horizontal → down → horizontal
          if (progress < 0.3) {
            return 0 // Straight horizontal
          } else if (progress < 0.4) {
            return (patternAmplitude * (progress - 0.3)) / 0.1 // 90-degree turn up
          } else if (progress < 0.6) {
            return patternAmplitude // Straight horizontal
          } else if (progress < 0.7) {
            return (
              patternAmplitude - (patternAmplitude * (progress - 0.6)) / 0.1
            ) // 90-degree turn down
          } else {
            return 0 // Straight horizontal
          }
        case 3: // 5-bend staircase: horizontal → up → horizontal → up → horizontal → down → horizontal → down → horizontal
          if (progress < 0.1) {
            return 0 // Straight horizontal
          } else if (progress < 0.2) {
            return (patternAmplitude * 0.5 * (progress - 0.1)) / 0.1 // 90-degree turn up
          } else if (progress < 0.3) {
            return patternAmplitude * 0.5 // Straight horizontal
          } else if (progress < 0.4) {
            return (
              patternAmplitude * 0.5 +
              (patternAmplitude * 0.5 * (progress - 0.3)) / 0.1
            ) // 90-degree turn up
          } else if (progress < 0.5) {
            return patternAmplitude // Straight horizontal
          } else if (progress < 0.6) {
            return (
              patternAmplitude -
              (patternAmplitude * 0.5 * (progress - 0.5)) / 0.1
            ) // 90-degree turn down
          } else if (progress < 0.7) {
            return patternAmplitude * 0.5 // Straight horizontal
          } else if (progress < 0.8) {
            return (
              patternAmplitude * 0.5 -
              (patternAmplitude * 0.5 * (progress - 0.7)) / 0.1
            ) // 90-degree turn down
          } else {
            return 0 // Straight horizontal
          }
        case 4: // Simple L-shape: horizontal → 90-degree turn → vertical
          if (progress < 0.5) {
            return 0 // Horizontal leg
          } else if (progress < 0.6) {
            return (patternAmplitude * (progress - 0.5)) / 0.1 // 90-degree turn
          } else {
            return patternAmplitude // Vertical leg
          }
        default:
          return 0
      }
    }

    // Simple trace creation without zones
    const tubeRadius = 0.15 // Much larger radius to make traces clearly visible
    const maxTraces = 20 // Create 20 traces

    for (let i = 0; i < maxTraces; i++) {
      const tubeR = tubeRadius

      // All traces on the same Y-level, side by side
      const ribbonY = baseRibbonY

      // Simple trace positioning without zones
      const groupIndex = Math.floor(i / 4)

      const pts3: THREE.Vector3[] = []

      // Create PCB-style traces with specific angles - more segments for sharper angles
      const numSegments =
        performanceLevel === 'low' ? 32 : performanceLevel === 'high' ? 64 : 48

      for (let seg = 0; seg <= numSegments; seg++) {
        const progress = seg / numSegments

        // X position - same for all traces
        const baseX = xL + (xR - xL) * progress
        const xVariation = (Math.random() - 0.5) * 0.4 // Reduced X variation for cleaner PCB look
        const x = baseX + xVariation

        // Z position - PCB pattern with specific angles, same shape for each group
        const groupIndex = Math.floor(i / 4)
        const traceInGroup = i % 4

        // Each group gets its own unique pattern shape
        const groupPatternType = groupIndex % 5 // Each of the 5 groups uses a different pattern
        const basePatternZ = generatePCBSegment(progress, groupPatternType)
        // Add slight individual variation to each trace within the group
        const individualVariation =
          Math.sin(progress * Math.PI * 3 + traceInGroup) * 0.2
        const patternZ = basePatternZ + individualVariation

        // Shift each subsequent line up by trace width + buffer to avoid overlap
        const traceWidth = tubeR * 2 // Diameter of the trace
        const buffer = 0.5 // Increased buffer for better separation
        const traceSpacing = traceWidth + buffer // Total spacing between traces

        // Group base position (groups are well separated)
        const groupBaseZ = groupIndex * 15.0 // Increased group separation to 15 units
        // Trace position within group (tightly packed but with better spacing)
        const traceZ = traceInGroup * traceSpacing

        const z = groupBaseZ + traceZ + patternZ // Same pattern shape, different Z positions

        const finalPoint = new THREE.Vector3(x, ribbonY, z)
        pts3.push(finalPoint)
      }

      // Create sharp angles for authentic PCB traces
      const curve = new THREE.CatmullRomCurve3(pts3, false, 'centripetal', 0.5)
      const geom = new THREE.TubeGeometry(
        curve,
        settings.tubeSegments,
        tubeR,
        settings.tubeRadialSegments,
        false
      )
      // Group-based coloring system
      const groupColors = [
        new THREE.Color(0xff4444), // Group 1: Red tones
        new THREE.Color(0x44ff44), // Group 2: Green tones
        new THREE.Color(0x4444ff), // Group 3: Blue tones
        new THREE.Color(0xffff44), // Group 4: Yellow tones
        new THREE.Color(0xff44ff), // Group 5: Magenta tones
      ]

      // Create 5 groups of 4 traces each
      const groupColor = groupColors[groupIndex % groupColors.length]

      // Add slight variation within each group
      const variation = (i % 4) * 0.15 // 0, 0.15, 0.3, 0.45
      const col = groupColor.clone().multiplyScalar(0.7 + variation)

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
