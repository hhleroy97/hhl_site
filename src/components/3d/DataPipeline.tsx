import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface DataPipelineProps {
  interactive?: boolean
}

const DataPipeline: React.FC<DataPipelineProps> = ({
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [xOffset, setXOffset] = useState(29)
  const [yOffset, setYOffset] = useState(-1)
  const [zOffset, setZOffset] = useState(0)
  const [cameraXOffset, setCameraXOffset] = useState(3)
  
  // Store refs to update positions without recreating scene
  const sceneRef = useRef<THREE.Scene | null>(null)
  const nodeBoxesRef = useRef<THREE.Mesh[]>([])
  const containerWireframeRef = useRef<THREE.LineSegments | null>(null)
  const particlesRef = useRef<THREE.Mesh[]>([])
  const connectionLinesRef = useRef<THREE.Line[]>([])
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    scene.background = null
    
    // Clear refs for new scene
    nodeBoxesRef.current = []
    connectionLinesRef.current = []
    particlesRef.current = []

    // Camera setup with offset to shift view to right side of screen
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    
    // Shift the camera view to show content on right side of screen
    camera.setViewOffset(width, height, -width * 0.25, 0, width, height)
    
    // Position controlled by sliders
    const rightCenterOffset = xOffset
    
    camera.position.set(rightCenterOffset + cameraXOffset, yOffset, 15)
    camera.lookAt(rightCenterOffset, yOffset, zOffset)
    
    // Store camera reference
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create invisible wireframe container (for reference positioning only)
    const containerGeometry = new THREE.BoxGeometry(12, 6, 6)
    const containerEdges = new THREE.EdgesGeometry(containerGeometry)
    const containerMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2, visible: false })
    const containerWireframe = new THREE.LineSegments(containerEdges, containerMaterial)
    containerWireframe.position.set(rightCenterOffset, yOffset, zOffset)
    // Don't add to scene - just keep reference for positioning
    
    // Store wireframe reference
    containerWireframeRef.current = containerWireframe
    sceneRef.current = scene

    // Multi-layer perceptron with 2D input grid and increased spacing
    const nodes = [
      // Input Layer (3x3 grid = 9 nodes) - 2D data representation
      { name: 'Pixel(0,0)', x: rightCenterOffset - 9, y: 2 + yOffset, z: 1 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(0,1)', x: rightCenterOffset - 9, y: 2 + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(0,2)', x: rightCenterOffset - 9, y: 2 + yOffset, z: -1 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,0)', x: rightCenterOffset - 9, y: 0 + yOffset, z: 1 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,1)', x: rightCenterOffset - 9, y: 0 + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,2)', x: rightCenterOffset - 9, y: 0 + yOffset, z: -1 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,0)', x: rightCenterOffset - 9, y: -2 + yOffset, z: 1 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,1)', x: rightCenterOffset - 9, y: -2 + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,2)', x: rightCenterOffset - 9, y: -2 + yOffset, z: -1 + zOffset, color: 0x00ff88, type: 'input' },
      
      // Hidden Layer 1 (8 nodes) - Feature extraction
      { name: 'Feature 1', x: rightCenterOffset - 7, y: 5.5 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 2', x: rightCenterOffset - 7, y: 4.0 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 3', x: rightCenterOffset - 7, y: 2.5 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 4', x: rightCenterOffset - 7, y: 1.0 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 5', x: rightCenterOffset - 7, y: -0.5 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 6', x: rightCenterOffset - 7, y: -2.0 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 7', x: rightCenterOffset - 7, y: -3.5 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 8', x: rightCenterOffset - 7, y: -5.0 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      
      // Hidden Layer 2 (5 nodes) - Pattern recognition
      { name: 'Pattern 1', x: rightCenterOffset - 3, y: 3 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 2', x: rightCenterOffset - 3, y: 1.5 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 3', x: rightCenterOffset - 3, y: 0 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 4', x: rightCenterOffset - 3, y: -1.5 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 5', x: rightCenterOffset - 3, y: -3 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      
      // Hidden Layer 3 (3 nodes) - Abstract concepts
      { name: 'Concept 1', x: rightCenterOffset + 1, y: 2 + yOffset, z: 0 + zOffset, color: 0xff8800, type: 'hidden' },
      { name: 'Concept 2', x: rightCenterOffset + 1, y: 0 + yOffset, z: 0 + zOffset, color: 0xff8800, type: 'hidden' },
      { name: 'Concept 3', x: rightCenterOffset + 1, y: -2 + yOffset, z: 0 + zOffset, color: 0xff8800, type: 'hidden' },
      
      // Output Layer (2 nodes) - Classification
      { name: 'Class A', x: rightCenterOffset + 5, y: 1.5 + yOffset, z: 0 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class B', x: rightCenterOffset + 5, y: -1.5 + yOffset, z: 0 + zOffset, color: 0xff0088, type: 'output' }
    ]

    // Create node boxes
    const nodeBoxes: THREE.Mesh[] = []
    nodes.forEach((node) => {
      // Different sizes based on node type
      const size = node.type === 'transform' ? 0.9 : 0.6
      const geometry = new THREE.BoxGeometry(size, size, size)
      const material = new THREE.MeshLambertMaterial({ 
        color: node.color,
        transparent: true,
        opacity: 0.9
      })
      const box = new THREE.Mesh(geometry, material)
      box.position.set(node.x, node.y, node.z)
      scene.add(box)
      nodeBoxes.push(box)
      nodeBoxesRef.current.push(box)

      // Glow outline
      const outlineGeometry = new THREE.BoxGeometry(size + 0.1, size + 0.1, size + 0.1)
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      })
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial)
      outline.position.copy(box.position)
      scene.add(outline)
      nodeBoxesRef.current.push(outline) // Track outline as well
    })

    // Neural network connections (selective connections for cleaner visualization)
    const connections = []
    
    // Input layer (0-8: 3x3 grid) to Hidden layer 1 (9-16: 8 nodes) - selective connections
    // Only connect each input to 3-4 hidden nodes instead of all 8
    const inputToHidden1 = [
      [0, 9], [0, 10], [0, 11],
      [1, 9], [1, 10], [1, 12],
      [2, 10], [2, 11], [2, 12],
      [3, 9], [3, 13], [3, 14],
      [4, 10], [4, 11], [4, 13], [4, 14], // Center pixel connects to more
      [5, 11], [5, 12], [5, 14],
      [6, 13], [6, 14], [6, 15],
      [7, 14], [7, 15], [7, 16],
      [8, 15], [8, 16], [8, 12]
    ]
    connections.push(...inputToHidden1)
    
    // Hidden layer 1 (9-16) to Hidden layer 2 (17-21: 5 nodes) - reduced connections
    const hidden1ToHidden2 = [
      [9, 17], [9, 18],
      [10, 17], [10, 18], [10, 19],
      [11, 18], [11, 19],
      [12, 18], [12, 19], [12, 20],
      [13, 19], [13, 20],
      [14, 19], [14, 20], [14, 21],
      [15, 20], [15, 21],
      [16, 21], [16, 20]
    ]
    connections.push(...hidden1ToHidden2)
    
    // Hidden layer 2 (17-21) to Hidden layer 3 (22-24: 3 nodes) - selective connections
    const hidden2ToHidden3 = [
      [17, 22], [17, 23],
      [18, 22], [18, 23], [18, 24],
      [19, 22], [19, 23], [19, 24], // Middle node connects to all
      [20, 23], [20, 24],
      [21, 24], [21, 23]
    ]
    connections.push(...hidden2ToHidden3)
    
    // Hidden layer 3 (22-24) to Output layer (25-26: 2 nodes) - fully connected (only 6 connections)
    for (let i = 22; i < 25; i++) {
      for (let j = 25; j < 27; j++) {
        connections.push([i, j])
      }
    }


    // Create simple connection lines
    const connectionLines: THREE.Line[] = []
    
    connections.forEach(([fromIdx, toIdx]) => {
      const from = nodes[fromIdx]
      const to = nodes[toIdx]
      
      // Simple direct line connection
      const points = [
        new THREE.Vector3(from.x, from.y, from.z),
        new THREE.Vector3(to.x, to.y, to.z)
      ]
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ 
        color: from.color,
        transparent: true,
        opacity: 0.6
      })
      const line = new THREE.Line(geometry, material)
      scene.add(line)
      connectionLines.push(line)
      connectionLinesRef.current.push(line)
    })

    // Data particles flowing through complex mesh network (created after connection lines)
    const particles: THREE.Mesh[] = []
    const particleCount = 60 // More particles for complex network
    
    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.06, 6, 4)
      
      // Assign each particle to a random connection path
      const connectionIndex = Math.floor(Math.random() * connections.length)
      const [fromIdx, toIdx] = connections[connectionIndex]
      const from = nodes[fromIdx]
      const to = nodes[toIdx]
      
      // Use the color from the source node
      const particleMaterial = new THREE.MeshLambertMaterial({
        color: from.color,
        transparent: true,
        opacity: 0.9
      })
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      
      // Start at the 'from' node
      particle.position.set(from.x, from.y, from.z)
      
      // Store path information using node indices instead of node objects
      particle.userData = {
        fromNodeIndex: fromIdx,
        toNodeIndex: toIdx,
        progress: Math.random(), // Random starting progress along path
        speed: 0.002 + Math.random() * 0.004,
        connectionIndex: connectionIndex,
        sourceColor: from.color // Store the original source node color
      }
      
      scene.add(particle)
      particles.push(particle)
      particlesRef.current.push(particle)
    }

    // Text labels are handled via HTML overlay

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      // Gentle node box animation - use refs and account for box+outline pairs
      nodeBoxesRef.current.forEach((box, index) => {
        box.rotation.y += 0.005
        box.rotation.x += 0.003
        // No floating motion here - Y position is controlled by sliders only
      })

      // Connection line pulsing
      connectionLinesRef.current.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.4 + Math.sin(Date.now() * 0.002 + index * 0.3) * 0.2
      })

      // Animate data particles through network
      particlesRef.current.forEach(particle => {
        const userData = particle.userData
        userData.progress += userData.speed
        
        if (userData.progress <= 1) {
          // Get current node positions from the actual scene objects
          const fromNodeIndex = userData.fromNodeIndex * 2 // Main box index (not outline)
          const toNodeIndex = userData.toNodeIndex * 2
          const fromBox = nodeBoxesRef.current[fromNodeIndex]
          const toBox = nodeBoxesRef.current[toNodeIndex]
          
          if (fromBox && toBox) {
            particle.position.x = fromBox.position.x + (toBox.position.x - fromBox.position.x) * userData.progress
            particle.position.y = fromBox.position.y + (toBox.position.y - fromBox.position.y) * userData.progress
            particle.position.z = fromBox.position.z + (toBox.position.z - fromBox.position.z) * userData.progress
          }
        } else {
          // Particle reached destination, assign new random path from neural network connections
          const newConnectionIndex = Math.floor(Math.random() * connections.length)
          const [newFromIdx, newToIdx] = connections[newConnectionIndex]
          userData.fromNodeIndex = newFromIdx
          userData.toNodeIndex = newToIdx
          userData.progress = 0
          userData.connectionIndex = newConnectionIndex
          
          // Update particle color to match new source node
          const newFromNode = nodes[newFromIdx]
          if (particle.material instanceof THREE.MeshLambertMaterial) {
            particle.material.color.setHex(newFromNode.color)
          }
          
          // Start at new 'from' node position
          const fromBox = nodeBoxesRef.current[newFromIdx * 2]
          if (fromBox) {
            particle.position.set(fromBox.position.x, fromBox.position.y, fromBox.position.z)
          }
        }
        
        // Particle glow effect
        particle.rotation.x += 0.03
        particle.rotation.y += 0.04
      })

      // Camera sway with mouse
      if (interactive) {
        camera.position.x += (mouseX * 2 + rightCenterOffset + cameraXOffset - camera.position.x) * 0.05
        camera.position.y += (mouseY * 2 + yOffset - camera.position.y) * 0.05
        camera.lookAt(rightCenterOffset, yOffset, zOffset)
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth
      const newHeight = container.clientHeight || window.innerHeight
      
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
      
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
  }, [interactive])

  // Separate effect to update positions when offsets change
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return

    const rightCenterOffset = xOffset
    
    // Update camera position
    cameraRef.current.position.set(rightCenterOffset + cameraXOffset, yOffset, 15)
    cameraRef.current.lookAt(rightCenterOffset, yOffset, zOffset)
    
    // Update wireframe container position (invisible reference)
    if (containerWireframeRef.current) {
      containerWireframeRef.current.position.set(rightCenterOffset, yOffset, zOffset)
    }
    
    // Update node positions (boxes and outlines - every 2 items is a pair)
    const basePositions = [
      // Input Layer (3x3 grid = 9 nodes)
      { x: -9, y: 2, z: 1 }, { x: -9, y: 2, z: 0 }, { x: -9, y: 2, z: -1 },
      { x: -9, y: 0, z: 1 }, { x: -9, y: 0, z: 0 }, { x: -9, y: 0, z: -1 },
      { x: -9, y: -2, z: 1 }, { x: -9, y: -2, z: 0 }, { x: -9, y: -2, z: -1 },
      // Hidden Layer 1 (8 nodes)
      { x: -5, y: 3.5, z: 0 }, { x: -5, y: 2.5, z: 0 }, { x: -5, y: 1.5, z: 0 }, { x: -5, y: 0.5, z: 0 },
      { x: -5, y: -0.5, z: 0 }, { x: -5, y: -1.5, z: 0 }, { x: -5, y: -2.5, z: 0 }, { x: -5, y: -3.5, z: 0 },
      // Hidden Layer 2 (5 nodes)
      { x: -1, y: 2, z: 0 }, { x: -1, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }, { x: -1, y: -1, z: 0 }, { x: -1, y: -2, z: 0 },
      // Hidden Layer 3 (3 nodes)
      { x: 3, y: 1, z: 0 }, { x: 3, y: 0, z: 0 }, { x: 3, y: -1, z: 0 },
      // Output Layer (2 nodes)
      { x: 7, y: 0.75, z: 0 }, { x: 7, y: -0.75, z: 0 }
    ]
    
    nodeBoxesRef.current.forEach((box, index) => {
      const nodeIndex = Math.floor(index / 2) // Each node has box + outline
      if (basePositions[nodeIndex]) {
        const pos = basePositions[nodeIndex]
        box.position.set(
          rightCenterOffset + pos.x,
          yOffset + pos.y,
          zOffset + pos.z
        )
      }
    })
    
    // Update connection lines using neural network connections
    connectionLinesRef.current.forEach((line, index) => {
      // Get connections from the neural network pattern (selective connections)
      const connectionPattern = []
      
      // Input to Hidden 1 - selective connections
      const inputToHidden1 = [
        [0, 9], [0, 10], [0, 11],
        [1, 9], [1, 10], [1, 12],
        [2, 10], [2, 11], [2, 12],
        [3, 9], [3, 13], [3, 14],
        [4, 10], [4, 11], [4, 13], [4, 14],
        [5, 11], [5, 12], [5, 14],
        [6, 13], [6, 14], [6, 15],
        [7, 14], [7, 15], [7, 16],
        [8, 15], [8, 16], [8, 12]
      ]
      connectionPattern.push(...inputToHidden1)
      
      // Hidden 1 to Hidden 2 - reduced connections
      const hidden1ToHidden2 = [
        [9, 17], [9, 18],
        [10, 17], [10, 18], [10, 19],
        [11, 18], [11, 19],
        [12, 18], [12, 19], [12, 20],
        [13, 19], [13, 20],
        [14, 19], [14, 20], [14, 21],
        [15, 20], [15, 21],
        [16, 21], [16, 20]
      ]
      connectionPattern.push(...hidden1ToHidden2)
      
      // Hidden 2 to Hidden 3 - selective connections
      const hidden2ToHidden3 = [
        [17, 22], [17, 23],
        [18, 22], [18, 23], [18, 24],
        [19, 22], [19, 23], [19, 24],
        [20, 23], [20, 24],
        [21, 24], [21, 23]
      ]
      connectionPattern.push(...hidden2ToHidden3)
      
      // Hidden 3 to Output - fully connected
      for (let i = 22; i < 25; i++) {
        for (let j = 25; j < 27; j++) {
          connectionPattern.push([i, j])
        }
      }
      
      if (connectionPattern[index]) {
        const fromNodeIndex = connectionPattern[index][0] * 2 // Multiply by 2 since we have box+outline pairs
        const toNodeIndex = connectionPattern[index][1] * 2
        const fromNode = nodeBoxesRef.current[fromNodeIndex]
        const toNode = nodeBoxesRef.current[toNodeIndex]
        
        if (fromNode && toNode) {
          const points = [
            new THREE.Vector3(fromNode.position.x, fromNode.position.y, fromNode.position.z),
            new THREE.Vector3(toNode.position.x, toNode.position.y, toNode.position.z)
          ]
          
          line.geometry.setFromPoints(points)
        }
      }
    })
    
  }, [xOffset, yOffset, zOffset, cameraXOffset])

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          cursor: interactive ? 'default' : 'default',
          background: 'transparent',
        }}
      />
      
      {/* Position Control Sliders */}
      <div className="absolute top-4 right-4 text-xs text-tech-text-muted font-mono bg-tech-dark/80 px-3 py-2 rounded border border-tech-teal/20">
        <div className="mb-2 text-tech-teal font-semibold">Network Position</div>
        <div className="flex flex-col gap-2 w-48">
          <div className="flex items-center gap-2">
            <label className="w-12">X: {xOffset}</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="0.5"
              value={xOffset}
              onChange={(e) => setXOffset(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Y: {yOffset}</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="0.5"
              value={yOffset}
              onChange={(e) => setYOffset(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Z: {zOffset}</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="0.5"
              value={zOffset}
              onChange={(e) => setZOffset(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Cam: {cameraXOffset}</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="0.5"
              value={cameraXOffset}
              onChange={(e) => setCameraXOffset(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      {/* System architecture labels */}
      <div className="absolute top-4 left-4 text-xs text-tech-text-muted font-mono bg-tech-dark/50 px-2 py-1 rounded">
        <div className="mb-1">Deep Learning Architecture</div>
        <div className="text-tech-teal">27 nodes • 3×3→8→5→3→2 layers</div>
      </div>
      
      {/* Network type indicators */}
      <div className="absolute bottom-4 left-4 text-xs text-tech-text-muted font-mono bg-tech-dark/50 px-2 py-1 rounded">
        <div className="flex flex-col gap-1">
          <div><span className="text-green-400">●</span> Input Grid (3×3)</div>
          <div><span className="text-blue-400">●</span> Features (8)</div>
          <div><span className="text-purple-400">●</span> Patterns (5)</div>
          <div><span className="text-orange-400">●</span> Concepts (3)</div>
          <div><span className="text-pink-400">●</span> Classes (2)</div>
        </div>
      </div>
      
      {/* Network characteristics */}
      <div className="absolute bottom-4 right-4 text-xs text-tech-text-muted font-mono bg-tech-dark/50 px-2 py-1 rounded">
        <div className="flex flex-col gap-1">
          <div>Feedforward Network</div>
          <div>Fully Connected</div>
          <div>Multi-Layer Perceptron</div>
        </div>
      </div>
    </div>
  )
}

export default DataPipeline