import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface RecursiveSubdivisionProps {
  performance?: 'low' | 'medium' | 'high'
  interactive?: boolean
  autoRotate?: boolean
  fractalType?: 'cube' | 'tetrahedron' | 'octahedron' | 'sphere'
}

const RecursiveSubdivision: React.FC<RecursiveSubdivisionProps> = ({
  performance: performanceLevel = 'medium',
  interactive = true,
  autoRotate = true,
  fractalType = 'cube',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [depth, setDepth] = useState(3)

  // Performance settings
  const getPerformanceSettings = useCallback(() => {
    switch (performanceLevel) {
      case 'low':
        return {
          maxDepth: 3,
          maxInstances: 500,
          enableShadows: false,
          pixelRatio: 1,
        }
      case 'high':
        return {
          maxDepth: 6,
          maxInstances: 5000,
          enableShadows: true,
          pixelRatio: 2,
        }
      default: // medium
        return {
          maxDepth: 4,
          maxInstances: 2000,
          enableShadows: false,
          pixelRatio: 1.5,
        }
    }
  }, [performanceLevel])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const settings = getPerformanceSettings()

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null

    // Camera setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(8, 8, 8)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: performanceLevel !== 'low',
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.pixelRatio))
    renderer.setSize(width, height)
    
    if (settings.enableShadows) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = interactive
    controls.enablePan = interactive
    controls.enableRotate = interactive
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1.0

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    if (settings.enableShadows) {
      directionalLight.castShadow = true
    }
    scene.add(directionalLight)

    // Fractal generation
    const generateFractal = (type: string, currentDepth: number) => {
      const group = new THREE.Group()
      let instanceCount = 0

      // Base geometry for different fractal types
      let baseGeometry: THREE.BufferGeometry
      switch (type) {
        case 'tetrahedron':
          baseGeometry = new THREE.TetrahedronGeometry(1)
          break
        case 'octahedron':
          baseGeometry = new THREE.OctahedronGeometry(1)
          break
        case 'sphere':
          baseGeometry = new THREE.SphereGeometry(1, 8, 6)
          break
        default: // cube
          baseGeometry = new THREE.BoxGeometry(1, 1, 1)
      }

      // Material with depth-based coloring
      const createMaterial = (depth: number, maxDepth: number) => {
        const hue = depth / maxDepth * 0.7 // Transition from red to blue
        const saturation = 0.8
        const lightness = 0.6 - (depth / maxDepth) * 0.2 // Deeper = darker
        return new THREE.MeshLambertMaterial({
          color: new THREE.Color().setHSL(hue, saturation, lightness),
          transparent: true,
          opacity: 0.8,
        })
      }

      // Recursive subdivision function
      const subdivide = (
        position: THREE.Vector3,
        scale: number,
        depth: number,
        maxDepth: number
      ) => {
        if (depth > maxDepth || instanceCount > settings.maxInstances) return

        // Create instance at current position
        const material = createMaterial(depth, maxDepth)
        const mesh = new THREE.Mesh(baseGeometry, material)
        mesh.position.copy(position)
        mesh.scale.setScalar(scale)
        
        if (settings.enableShadows) {
          mesh.castShadow = true
          mesh.receiveShadow = true
        }

        group.add(mesh)
        instanceCount++

        if (depth < maxDepth) {
          const newScale = scale * 0.33 // Each subdivision is 1/3 the size
          const offset = scale * 0.7 // Distance from center

          // Different subdivision patterns based on fractal type
          switch (type) {
            case 'cube': {
              // Menger Sponge pattern - 20 cubes (remove center cross)
              for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                  for (let z = -1; z <= 1; z++) {
                    // Skip center cross pattern
                    const crossCount = [x, y, z].filter(coord => coord === 0).length
                    if (crossCount >= 2) continue

                    const newPos = position.clone().add(
                      new THREE.Vector3(x * offset, y * offset, z * offset)
                    )
                    subdivide(newPos, newScale, depth + 1, maxDepth)
                  }
                }
              }
              break
            }
            
            case 'tetrahedron': {
              // Sierpinski Tetrahedron - 4 corners
              const height = offset * 0.816 // Tetrahedron height factor
              const positions = [
                new THREE.Vector3(0, height, 0),
                new THREE.Vector3(-offset * 0.5, -height * 0.33, offset * 0.433),
                new THREE.Vector3(offset * 0.5, -height * 0.33, offset * 0.433),
                new THREE.Vector3(0, -height * 0.33, -offset * 0.866),
              ]
              
              positions.forEach(relPos => {
                const newPos = position.clone().add(relPos)
                subdivide(newPos, newScale, depth + 1, maxDepth)
              })
              break
            }
            
            case 'octahedron': {
              // Octahedral subdivision - 6 directions
              const positions = [
                new THREE.Vector3(offset, 0, 0),
                new THREE.Vector3(-offset, 0, 0),
                new THREE.Vector3(0, offset, 0),
                new THREE.Vector3(0, -offset, 0),
                new THREE.Vector3(0, 0, offset),
                new THREE.Vector3(0, 0, -offset),
              ]
              
              positions.forEach(relPos => {
                const newPos = position.clone().add(relPos)
                subdivide(newPos, newScale, depth + 1, maxDepth)
              })
              break
            }
            
            case 'sphere': {
              // Spherical subdivision - dodecahedral pattern
              const phi = (1 + Math.sqrt(5)) / 2 // Golden ratio
              const positions = [
                // Vertices of a dodecahedron (scaled)
                new THREE.Vector3(1, 1, 1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(1, 1, -1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(1, -1, 1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(1, -1, -1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(-1, 1, 1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(-1, 1, -1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(-1, -1, 1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(-1, -1, -1).multiplyScalar(offset * 0.7),
                new THREE.Vector3(0, phi, 1/phi).multiplyScalar(offset * 0.7),
                new THREE.Vector3(0, phi, -1/phi).multiplyScalar(offset * 0.7),
                new THREE.Vector3(0, -phi, 1/phi).multiplyScalar(offset * 0.7),
                new THREE.Vector3(0, -phi, -1/phi).multiplyScalar(offset * 0.7),
              ]
              
              positions.slice(0, 8).forEach(relPos => { // Use only 8 for performance
                const newPos = position.clone().add(relPos)
                subdivide(newPos, newScale, depth + 1, maxDepth)
              })
              break
            }
          }
        }
      }

      // Start subdivision from origin
      subdivide(new THREE.Vector3(0, 0, 0), 2, 0, currentDepth)
      return group
    }

    // Generate initial fractal
    let fractalGroup = generateFractal(fractalType, depth)
    scene.add(fractalGroup)

    // Animation loop
    let animationId: number
    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      controls.update()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
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

    // Visibility handling
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Depth change handler
    const updateDepth = (newDepth: number) => {
      if (newDepth !== depth && newDepth >= 1 && newDepth <= settings.maxDepth) {
        scene.remove(fractalGroup)
        fractalGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose()
            child.material?.dispose()
          }
        })
        fractalGroup = generateFractal(fractalType, newDepth)
        scene.add(fractalGroup)
        setDepth(newDepth)
      }
    }

    // Keyboard controls for depth
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case '+':
        case '=':
          updateDepth(Math.min(depth + 1, settings.maxDepth))
          break
        case '-':
          updateDepth(Math.max(depth - 1, 1))
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      
      controls.dispose()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
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
  }, [performanceLevel, interactive, autoRotate, fractalType, depth, getPerformanceSettings, isVisible])

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          cursor: interactive ? 'grab' : 'default',
          background: 'transparent',
        }}
      />
      
      {/* Depth indicator */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-mono">
        Depth: {depth} | +/- to change
      </div>
    </div>
  )
}

export default RecursiveSubdivision