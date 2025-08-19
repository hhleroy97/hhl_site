import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DataFlowBackgroundProps {
  className?: string
}

const DataFlowBackground: React.FC<DataFlowBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const particleSystemsRef = useRef<THREE.Points[]>([])
  const dataNodesRef = useRef<THREE.Mesh[]>([])
  const connectionLinesRef = useRef<THREE.Line[]>([])

  // Create subtle floating particles
  const createSubtleParticles = (scene: THREE.Scene) => {
    const particles: THREE.Mesh[] = []
    const particleCount = 15 // Much fewer, very subtle
    
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.01, 6, 6)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00d4aa),
        transparent: true,
        opacity: 0.1 // Very subtle
      })
      
      const particle = new THREE.Mesh(geometry, material)
      
      // Distribute particles more sparsely
      particle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      )
      
      // Store original position for gentle animation
      particle.userData = {
        originalPosition: particle.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3 // Slower movement
      }
      
      scene.add(particle)
      particles.push(particle)
    }
    
    return particles
  }

  // Create minimal grid overlay (very subtle)
  const createMinimalGrid = (scene: THREE.Scene) => {
    const gridSize = 80
    const gridDivisions = 16
    
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00d4aa, 0x00d4aa)
    gridHelper.position.y = -15
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.03 // Extremely subtle
    scene.add(gridHelper)
  }


  // Minimal animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = clockRef.current.getElapsedTime()

    // Animate subtle particles
    dataNodesRef.current.forEach((particle) => {
      const userData = particle.userData
      const phase = userData.phase + time * userData.speed * 0.1 // Much slower
      
      // Very gentle floating motion
      particle.position.x = userData.originalPosition.x + Math.sin(phase) * 0.2
      particle.position.y = userData.originalPosition.y + Math.cos(phase * 0.8) * 0.15
      particle.position.z = userData.originalPosition.z + Math.sin(phase * 0.6) * 0.1
      
      // Subtle opacity variation
      if (particle.material instanceof THREE.MeshBasicMaterial) {
        particle.material.opacity = 0.05 + Math.sin(phase) * 0.03 // Very subtle
      }
    })

    // Static camera - no movement
    rendererRef.current.render(sceneRef.current, cameraRef.current)
    animationRef.current = requestAnimationFrame(animate)
  }

  // Cleanup function
  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Dispose of all geometries and materials
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          }
        }
      })
    }

    rendererRef.current?.dispose()
    window.removeEventListener('resize', handleResize)
  }

  // Resize handler
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight

    cameraRef.current.aspect = width / height
    cameraRef.current.updateProjectionMatrix()

    rendererRef.current.setSize(width, height)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Prevent double initialization
    if (rendererRef.current) return

    // Initializing data flow background

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0f1c) // Back to dark, subtle background
    scene.fog = new THREE.FogExp2(0x0a0f1c, 0.015)
    sceneRef.current = scene

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    // Setup camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 5, 15)
    cameraRef.current = camera

    // Create minimal, elegant elements
    dataNodesRef.current = createSubtleParticles(scene)
    createMinimalGrid(scene)

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0x002244, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00d4aa, 0.6)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Mount to DOM
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '-1'
    renderer.domElement.style.pointerEvents = 'none'
    canvasRef.current.appendChild(renderer.domElement)

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Start animation
    animate()

    return cleanup
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div 
      ref={canvasRef} 
      className={className}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  )
}

export default DataFlowBackground