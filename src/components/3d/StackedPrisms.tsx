import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface StackedPrismsProps {
  className?: string
}

const StackedPrisms: React.FC<StackedPrismsProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())

  const [isLoaded, setIsLoaded] = useState(false)

  // Create stack of rounded prisms
  const createStackedPrisms = (scene: THREE.Scene) => {
    const prisms = []
    const colors = [0xff6ec7, 0x7cff00, 0x00eaff, 0x8b5cf6, 0xf59e0b] // 5 different colors
    const spacing = 1.5 // Space between each prism

    for (let i = 0; i < 5; i++) {
      // Create cylinder geometry (tall and wide, not very deep)
      const geometry = new THREE.CylinderGeometry(
        2.5, // radiusTop - wide
        2.5, // radiusBottom - wide
        0.4, // height - not very deep
        32, // radialSegments - smooth rounded edges
        1 // heightSegments
      )

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors[i]),
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color(colors[i]),
        emissiveIntensity: 0.1,
        metalness: 0.3,
        roughness: 0.4,
      })

      const prism = new THREE.Mesh(geometry, material)

      // Position each prism with spacing
      prism.position.set(0, i * spacing - 3, 0) // Stack vertically with spacing

      scene.add(prism)
      prisms.push(prism)
    }

    return prisms
  }

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    // Gentle rotation for the whole scene
    sceneRef.current.rotation.y =
      Math.sin(clockRef.current.elapsedTime * 0.2) * 0.1

    // Update controls
    controlsRef.current?.update()

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current)

    animationRef.current = requestAnimationFrame(animate)
  }

  // Resize handler
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return

    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight

    cameraRef.current.aspect = width / height
    cameraRef.current.updateProjectionMatrix()

    rendererRef.current.setSize(width, height)
  }

  // Cleanup function
  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
    }

    controlsRef.current?.dispose()
    rendererRef.current?.dispose()

    window.removeEventListener('resize', handleResize)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Initializing stacked prisms

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0f1c)
    sceneRef.current = scene

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })

    const containerWidth = canvasRef.current.clientWidth || 500
    const containerHeight = canvasRef.current.clientHeight || 500

    renderer.setSize(containerWidth, containerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerWidth / containerHeight,
      0.1,
      100
    )
    camera.position.set(0, 2, 8)
    cameraRef.current = camera

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 5
    controls.maxDistance = 20
    controls.enablePan = false
    controlsRef.current = controls

    // Setup lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-3, 2, -2)
    scene.add(fillLight)

    // Create the stacked prisms
    createStackedPrisms(scene)

    // Mount to DOM
    canvasRef.current.appendChild(renderer.domElement)

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Start animation
    setIsLoaded(true)
    animate()

    return cleanup
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`relative ${className}`}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    >
      {/* Loading indicator */}
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-10'>
          <div className='flex flex-col items-center gap-4 text-slate-300'>
            <div className='w-8 h-8 border-2 border-slate-600 border-t-cyan-400 rounded-full animate-spin' />
            <span className='text-sm font-medium'>Loading 3D Stack...</span>
          </div>
        </div>
      )}

      {/* Three.js canvas mount */}
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Debug info */}
      <div className='absolute top-2 left-2 text-xs text-white/50 z-20'>
        {isLoaded ? '3D Stack Loaded' : 'Loading...'}
      </div>
    </div>
  )
}

export default StackedPrisms
