import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DataTransferArtProps {
  className?: string
}

const DataTransferArt: React.FC<DataTransferArtProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const dataStreamsRef = useRef<THREE.Line[]>([])
  const dataNodesRef = useRef<THREE.Mesh[]>([])

  // Create flowing data streams with elegant curves
  const createDataStreams = (scene: THREE.Scene) => {
    const streams: THREE.Line[] = []
    const colors = [0x00d4aa, 0x0ea5e9, 0x8b5cf6, 0x06b6d4]
    
    for (let i = 0; i < 12; i++) {
      const points = []
      const angle = (i / 12) * Math.PI * 2
      const radius = 3 + Math.sin(i * 0.5) * 1.5
      
      // Create curved data flow paths
      for (let j = 0; j <= 50; j++) {
        const t = j / 50
        const x = Math.cos(angle + t * Math.PI * 0.5) * (radius - t * 2)
        const y = Math.sin(t * Math.PI * 2) * 0.8 + t * 2 - 1
        const z = Math.sin(angle + t * Math.PI) * 0.5
        points.push(new THREE.Vector3(x, y, z))
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      })
      
      const line = new THREE.Line(geometry, material)
      line.userData = { 
        originalOpacity: 0.6,
        phase: i * 0.2,
        speed: 0.5 + Math.random() * 0.3
      }
      
      scene.add(line)
      streams.push(line)
    }
    
    return streams
  }

  // Create data nodes at intersection points
  const createDataNodes = (scene: THREE.Scene) => {
    const nodes: THREE.Mesh[] = []
    const colors = [0x00d4aa, 0x0ea5e9, 0x8b5cf6, 0x06b6d4]
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 2 + Math.cos(i * 0.8) * 1
      
      const geometry = new THREE.SphereGeometry(0.08, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.8
      })
      
      const node = new THREE.Mesh(geometry, material)
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(i * 0.3) * 0.5,
        Math.sin(angle) * radius * 0.3
      )
      
      node.userData = {
        originalPosition: node.position.clone(),
        phase: i * 0.3,
        amplitude: 0.1 + Math.random() * 0.05
      }
      
      scene.add(node)
      nodes.push(node)
    }
    
    return nodes
  }

  // Create flowing data particles
  const createDataParticles = (scene: THREE.Scene) => {
    const particles = new THREE.BufferGeometry()
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    const colorPalette = [
      new THREE.Color(0x00d4aa),
      new THREE.Color(0x0ea5e9),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4)
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Distribute particles in flowing patterns
      const angle = (i / particleCount) * Math.PI * 4
      const radius = 1 + Math.random() * 3
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = (Math.random() - 0.5) * 4
      positions[i3 + 2] = Math.sin(angle) * radius * 0.5
      
      const color = colorPalette[i % colorPalette.length]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      sizes[i] = Math.random() * 0.02 + 0.01
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    })
    
    const particleSystem = new THREE.Points(particles, material)
    particleSystem.userData = { 
      positions: positions,
      originalPositions: positions.slice()
    }
    
    scene.add(particleSystem)
    return particleSystem
  }

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = clockRef.current.getElapsedTime()

    // Animate data streams with flowing opacity waves
    dataStreamsRef.current.forEach((stream, index) => {
      const userData = stream.userData
      const wave = Math.sin(time * userData.speed + userData.phase) * 0.3 + 0.7
      if (stream.material instanceof THREE.LineBasicMaterial) {
        stream.material.opacity = userData.originalOpacity * wave
      }
      
      // Subtle rotation for dynamic effect
      stream.rotation.z = time * 0.1 + userData.phase
    })

    // Animate data nodes with gentle pulsing
    dataNodesRef.current.forEach((node, index) => {
      const userData = node.userData
      const pulse = Math.sin(time * 2 + userData.phase) * userData.amplitude
      
      node.position.copy(userData.originalPosition)
      node.position.y += pulse
      
      // Pulsing scale effect
      const scale = 1 + Math.sin(time * 3 + userData.phase) * 0.2
      node.scale.setScalar(scale)
      
      if (node.material instanceof THREE.MeshBasicMaterial) {
        node.material.opacity = 0.6 + Math.sin(time * 2.5 + userData.phase) * 0.2
      }
    })

    // Gentle camera movement for subtle dynamism
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(time * 0.1) * 0.2
      cameraRef.current.position.y = Math.cos(time * 0.15) * 0.1
      cameraRef.current.lookAt(0, 0, 0)
    }

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
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
    }

    rendererRef.current?.dispose()
    window.removeEventListener('resize', handleResize)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    sceneRef.current = scene

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    
    const width = canvasRef.current.clientWidth || 500
    const height = canvasRef.current.clientHeight || 500
    
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Setup camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.set(0, 1, 6)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4aa, 1, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Create the data transfer art elements
    dataStreamsRef.current = createDataStreams(scene)
    dataNodesRef.current = createDataNodes(scene)
    createDataParticles(scene)

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Start animation
    animate()

    return cleanup
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'transparent'
        }}
      />
    </div>
  )
}

export default DataTransferArt