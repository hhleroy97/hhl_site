import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface DataPipelineProps {
  interactive?: boolean
}

const DataPipeline: React.FC<DataPipelineProps> = ({
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [zOffset, setZOffset] = useState(0)
  const [cameraXOffset, setCameraXOffset] = useState(0)
  const [layerSpacing, setLayerSpacing] = useState(6)
  const [nodeSpacing, setNodeSpacing] = useState(2.5)
  const [inputLayerSpacing, setInputLayerSpacing] = useState(2)
  const [cameraDistance, setCameraDistance] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [enableRotation, setEnableRotation] = useState(true)
  
  // Store refs to update positions without recreating scene
  const sceneRef = useRef<THREE.Scene | null>(null)
  const nodeBoxesRef = useRef<THREE.Mesh[]>([])
  const containerWireframeRef = useRef<THREE.LineSegments | null>(null)
  const particlesRef = useRef<THREE.Mesh[]>([])
  const connectionLinesRef = useRef<THREE.Line[]>([])
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    scene.background = null
    
    // Clear refs for new scene
    nodeBoxesRef.current = []
    connectionLinesRef.current = []
    particlesRef.current = []

    // Camera setup centered on origin
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    
    // Position camera to view centered network
    camera.position.set(0, 0, cameraDistance)
    camera.lookAt(0, 0, 0)
    
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

    // Add orbit controls for free rotation
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = true
    controls.enableRotate = enableRotation
    controls.target.set(0, 0, 0)
    controls.maxDistance = 50
    controls.minDistance = 5
    controls.maxPolarAngle = Math.PI
    controls.minPolarAngle = 0
    controlsRef.current = controls

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
    containerWireframe.position.set(0, 0, 0)
    // Don't add to scene - just keep reference for positioning
    
    // Store wireframe reference
    containerWireframeRef.current = containerWireframe
    sceneRef.current = scene

    // Multi-layer perceptron with 2D input grid and dynamic spacing
    const nodes = [
      // Input Layer (3x3 grid = 9 nodes) - evenly spaced grid
      { name: 'Pixel(0,0)', x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(0,1)', x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(0,2)', x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,0)', x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,1)', x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(1,2)', x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,0)', x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,1)', x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: 0 + zOffset, color: 0x00ff88, type: 'input' },
      { name: 'Pixel(2,2)', x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0x00ff88, type: 'input' },
      
      // Hidden Layer 1 (12 nodes) - Feature extraction (4x3 grid, 12 nodes)
      { name: 'Feature 1', x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing * 2 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 2', x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 3', x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 4', x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 5', x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: nodeSpacing * 2 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 6', x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 7', x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 8', x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 9', x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing * 2 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 10', x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 11', x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: 0 + zOffset, color: 0x0088ff, type: 'hidden' },
      { name: 'Feature 12', x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset, color: 0x0088ff, type: 'hidden' },
      
      // Hidden Layer 2 (9 nodes) - Pattern recognition (3x3 grid, 9 nodes - complete)
      { name: 'Pattern 1', x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 2', x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 3', x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 4', x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 5', x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 6', x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 7', x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 8', x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: 0 + zOffset, color: 0x8800ff, type: 'hidden' },
      { name: 'Pattern 9', x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset, color: 0x8800ff, type: 'hidden' },
      
      // Hidden Layer 3 (4 nodes) - Abstract concepts (2x2 grid, 4 nodes - complete)
      { name: 'Concept 1', x: layerSpacing * 0.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0xff8800, type: 'hidden' },
      { name: 'Concept 2', x: layerSpacing * 0.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0xff8800, type: 'hidden' },
      { name: 'Concept 3', x: layerSpacing * 0.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0xff8800, type: 'hidden' },
      { name: 'Concept 4', x: layerSpacing * 0.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0xff8800, type: 'hidden' },
      
      // Output Layer (10 nodes) - Classification (5x2 grid, 10 nodes - complete)
      { name: 'Class 1', x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing * 2 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 2', x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 3', x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: 0 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 4', x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 5', x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing * 2 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 6', x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing * 2 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 7', x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 8', x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: 0 + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 9', x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset, color: 0xff0088, type: 'output' },
      { name: 'Class 10', x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing * 2 + zOffset, color: 0xff0088, type: 'output' }
    ]

    // Create node boxes
    const nodeBoxes: THREE.Mesh[] = []
    console.log('Creating nodes with spacing:', { layerSpacing, nodeSpacing, inputLayerSpacing })
    nodes.forEach((node, index) => {
      // Different sizes based on node type
      const size = node.type === 'transform' ? 1.2 : 1.0
      console.log(`Node ${index}: ${node.name} at (${node.x}, ${node.y}, ${node.z})`)
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
    
    // Input layer (0-8: 3x3 grid) to Hidden layer 1 (9-20: 12 nodes) - clear layer connections
    const inputToHidden1 = [
      // Each input connects to 3-4 hidden nodes in a pattern
      [0, 9], [0, 10], [0, 11], [0, 12],
      [1, 9], [1, 10], [1, 11], [1, 13],
      [2, 10], [2, 11], [2, 12], [2, 14],
      [3, 9], [3, 13], [3, 14], [3, 15],
      [4, 10], [4, 11], [4, 13], [4, 14], [4, 16], // Center pixel connects to more
      [5, 11], [5, 12], [5, 14], [5, 17],
      [6, 13], [6, 14], [6, 15], [6, 18],
      [7, 14], [7, 15], [7, 16], [7, 19],
      [8, 15], [8, 16], [8, 17], [8, 20]
    ]
    connections.push(...inputToHidden1)
    
    // Hidden layer 1 (9-20: 12 nodes) to Hidden layer 2 (21-29: 9 nodes) - ensure all nodes connected
    const hidden1ToHidden2 = [
      // Each hidden1 node connects to 2-3 hidden2 nodes
      [9, 21], [9, 22], [9, 23],
      [10, 21], [10, 22], [10, 24],
      [11, 22], [11, 23], [11, 24],
      [12, 23], [12, 24], [12, 25],
      [13, 21], [13, 25], [13, 26],
      [14, 22], [14, 24], [14, 25], [14, 26],
      [15, 23], [15, 25], [15, 26],
      [16, 21], [16, 22], [16, 27],
      [17, 22], [17, 23], [17, 24],
      [18, 23], [18, 24], [18, 25],
      [19, 24], [19, 25], [19, 26],
      [20, 21], [20, 25], [20, 26],
      // Ensure all hidden2 nodes receive at least one connection
      [9, 28], [10, 28], [11, 28], [12, 28], [13, 28], [14, 28], [15, 28], [16, 28], [17, 28], [18, 28], [19, 28], [20, 28],
      [9, 29], [10, 29], [11, 29], [12, 29], [13, 29], [14, 29], [15, 29], [16, 29], [17, 29], [18, 29], [19, 29], [20, 29]
    ]
    connections.push(...hidden1ToHidden2)
    
    // Hidden layer 2 (21-29: 9 nodes) to Hidden layer 3 (30-33: 4 nodes) - ensure all nodes connected
    const hidden2ToHidden3 = [
      // Each hidden2 node connects to 2-3 hidden3 nodes
      [21, 30], [21, 31],
      [22, 30], [22, 31], [22, 32],
      [23, 31], [23, 32], [23, 33], // Middle node connects to all
      [24, 30], [24, 31], [24, 32],
      [25, 31], [25, 32], [25, 33],
      [26, 32], [26, 33],
      [27, 30], [27, 31],
      [28, 31], [28, 32],
      [29, 32], [29, 33],
      // Ensure all hidden3 nodes receive at least one connection from each hidden2 node
      [21, 30], [21, 31], [21, 32], [21, 33],
      [22, 30], [22, 31], [22, 32], [22, 33],
      [23, 30], [23, 31], [23, 32], [23, 33],
      [24, 30], [24, 31], [24, 32], [24, 33],
      [25, 30], [25, 31], [25, 32], [25, 33],
      [26, 30], [26, 31], [26, 32], [26, 33],
      [27, 30], [27, 31], [27, 32], [27, 33],
      [28, 30], [28, 31], [28, 32], [28, 33],
      [29, 30], [29, 31], [29, 32], [29, 33]
    ]
    connections.push(...hidden2ToHidden3)
    
    // Hidden layer 3 (30-33: 4 nodes) to Output layer (34-43: 10 nodes) - fully connected (40 connections)
    for (let i = 30; i < 34; i++) {
      for (let j = 34; j < 44; j++) {
        connections.push([i, j])
      }
    }


    // Create simple connection lines (consistent color)
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
        color: 0x666666, // Consistent gray color for all lines
        transparent: true,
        opacity: 0.4
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
      const particleGeometry = new THREE.SphereGeometry(0.08, 8, 6) // Slightly larger particles
      
      // Assign each particle to a random connection path
      const connectionIndex = Math.floor(Math.random() * connections.length)
      const [fromIdx, toIdx] = connections[connectionIndex]
      const from = nodes[fromIdx]
      const to = nodes[toIdx]
      
      // Start with the color from the source node
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

    // Mouse interaction for click-and-drag
    let mouseX = 0
    let mouseY = 0
    let isDraggingInternal = false
    let dragStartX = 0
    let dragStartY = 0
    
    const handleMouseDown = (event: MouseEvent) => {
      if (!interactive) return
      isDraggingInternal = true
      dragStartX = event.clientX
      dragStartY = event.clientY
      setIsDragging(true)
      setDragStart({ x: event.clientX, y: event.clientY })
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return
      
      if (isDraggingInternal) {
        // Calculate drag delta
        const deltaX = event.clientX - dragStartX
        const deltaY = event.clientY - dragStartY
        
        // Update network position based on drag
        setXOffset(prev => prev + deltaX * 0.1)
        setYOffset(prev => prev - deltaY * 0.1)
        
        // Update drag start position
        dragStartX = event.clientX
        dragStartY = event.clientY
      } else {
        // Regular mouse movement for camera sway
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    const handleMouseUp = () => {
      if (!interactive) return
      isDraggingInternal = false
      setIsDragging(false)
    }

    // Only add custom mouse handlers if rotation is disabled
    if (interactive && !enableRotation) {
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      // Gentle node box animation - use refs and account for box+outline pairs
      nodeBoxesRef.current.forEach((box, index) => {
        // Remove rotation to fix parallax issues
        box.rotation.set(0, 0, 0)
      })

      // Keep connection lines stable
      connectionLinesRef.current.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.4
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
            
            // Update particle color as it moves along the connection
            const fromNode = nodes[userData.fromNodeIndex]
            const toNode = nodes[userData.toNodeIndex]
            const fromColor = new THREE.Color(fromNode.color)
            const toColor = new THREE.Color(toNode.color)
            const interpolatedColor = fromColor.clone().lerp(toColor, userData.progress)
            
            if (particle.material instanceof THREE.MeshLambertMaterial) {
              particle.material.color.copy(interpolatedColor)
            }
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

      // Update orbit controls
      if (controlsRef.current) {
        controlsRef.current.update()
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
      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
      if (interactive && !enableRotation) {
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
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

    // Update camera position
    cameraRef.current.position.set(cameraXOffset, yOffset, cameraDistance)
    cameraRef.current.lookAt(0, 0, 0)
    
    // Update wireframe container position (invisible reference)
    if (containerWireframeRef.current) {
      containerWireframeRef.current.position.set(0, 0, 0)
    }
    
    // Update node positions (boxes and outlines - every 2 items is a pair)
    const basePositions = [
      // Input Layer (3x3 grid = 9 nodes)
      { x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 3 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 3 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 3 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset },
      // Hidden Layer 1 (12 nodes) - 4x3 grid
      { x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing * 2 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: nodeSpacing * 2 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing * 2 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 1.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset },
      // Hidden Layer 2 (9 nodes) - 3x3 grid
      { x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: -nodeSpacing + zOffset },
      { x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: nodeSpacing + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: 0 + zOffset }, { x: -layerSpacing * 0.75 + xOffset, y: -nodeSpacing * 2 + yOffset, z: -nodeSpacing + zOffset },
      // Hidden Layer 3 (4 nodes) - 2x2 grid
      { x: layerSpacing * 0.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: layerSpacing * 0.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset },
      { x: layerSpacing * 0.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: layerSpacing * 0.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset },
      // Output Layer (10 nodes) - 5x2 grid
      { x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing * 2 + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: 0 + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: nodeSpacing + yOffset, z: -nodeSpacing * 2 + zOffset },
      { x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing * 2 + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: nodeSpacing + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: 0 + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing + zOffset }, { x: layerSpacing * 1.25 + xOffset, y: -nodeSpacing + yOffset, z: -nodeSpacing * 2 + zOffset }
    ]
    
    nodeBoxesRef.current.forEach((box, index) => {
      const nodeIndex = Math.floor(index / 2) // Each node has box + outline
      if (basePositions[nodeIndex]) {
        const pos = basePositions[nodeIndex]
        box.position.set(pos.x, pos.y, pos.z)
      }
    })
    
    // Update connection lines using neural network connections
    connectionLinesRef.current.forEach((line, index) => {
      // Get connections from the neural network pattern (selective connections)
      const connectionPattern = []
      
      // Input to Hidden 1 - selective connections (0-8 to 9-20)
      const inputToHidden1 = [
        [0, 9], [0, 10], [0, 11], [0, 12],
        [1, 9], [1, 10], [1, 11], [1, 13],
        [2, 10], [2, 11], [2, 12], [2, 14],
        [3, 9], [3, 13], [3, 14], [3, 15],
        [4, 10], [4, 11], [4, 13], [4, 14], [4, 16],
        [5, 11], [5, 12], [5, 14], [5, 17],
        [6, 13], [6, 14], [6, 15], [6, 18],
        [7, 14], [7, 15], [7, 16], [7, 19],
        [8, 15], [8, 16], [8, 17], [8, 20]
      ]
      connectionPattern.push(...inputToHidden1)
      
      // Hidden 1 to Hidden 2 - ensure all nodes connected (9-20 to 21-29)
      const hidden1ToHidden2 = [
        [9, 21], [9, 22], [9, 23],
        [10, 21], [10, 22], [10, 24],
        [11, 22], [11, 23], [11, 24],
        [12, 23], [12, 24], [12, 25],
        [13, 21], [13, 25], [13, 26],
        [14, 22], [14, 24], [14, 25], [14, 26],
        [15, 23], [15, 25], [15, 26],
        [16, 21], [16, 22], [16, 27],
        [17, 22], [17, 23], [17, 24],
        [18, 23], [18, 24], [18, 25],
        [19, 24], [19, 25], [19, 26],
        [20, 21], [20, 25], [20, 26],
        // Ensure all hidden2 nodes receive at least one connection
        [9, 28], [10, 28], [11, 28], [12, 28], [13, 28], [14, 28], [15, 28], [16, 28], [17, 28], [18, 28], [19, 28], [20, 28],
        [9, 29], [10, 29], [11, 29], [12, 29], [13, 29], [14, 29], [15, 29], [16, 29], [17, 29], [18, 29], [19, 29], [20, 29]
      ]
      connectionPattern.push(...hidden1ToHidden2)
      
      // Hidden 2 to Hidden 3 - ensure all nodes connected (21-29 to 30-33)
      const hidden2ToHidden3 = [
        [21, 30], [21, 31],
        [22, 30], [22, 31], [22, 32],
        [23, 31], [23, 32], [23, 33],
        [24, 30], [24, 31], [24, 32],
        [25, 31], [25, 32], [25, 33],
        [26, 32], [26, 33],
        [27, 30], [27, 31],
        [28, 31], [28, 32],
        [29, 32], [29, 33],
        // Ensure all hidden3 nodes receive at least one connection from each hidden2 node
        [21, 30], [21, 31], [21, 32], [21, 33],
        [22, 30], [22, 31], [22, 32], [22, 33],
        [23, 30], [23, 31], [23, 32], [23, 33],
        [24, 30], [24, 31], [24, 32], [24, 33],
        [25, 30], [25, 31], [25, 32], [25, 33],
        [26, 30], [26, 31], [26, 32], [26, 33],
        [27, 30], [27, 31], [27, 32], [27, 33],
        [28, 30], [28, 31], [28, 32], [28, 33],
        [29, 30], [29, 31], [29, 32], [29, 33]
      ]
      connectionPattern.push(...hidden2ToHidden3)
      
      // Hidden 3 to Output - fully connected (30-33 to 34-43)
      for (let i = 30; i < 34; i++) {
        for (let j = 34; j < 44; j++) {
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
    
  }, [xOffset, yOffset, zOffset, cameraXOffset, layerSpacing, nodeSpacing, inputLayerSpacing, cameraDistance])

  // Separate effect to handle rotation toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = enableRotation
    }
  }, [enableRotation])

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
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

      {/* Spacing Control Sliders */}
      <div className="absolute top-4 right-4 text-xs text-tech-text-muted font-mono bg-tech-dark/80 px-3 py-2 rounded border border-tech-teal/20" style={{ top: '200px' }}>
        <div className="mb-2 text-tech-teal font-semibold">Network Spacing</div>
        <div className="flex flex-col gap-2 w-48">
          <div className="flex items-center gap-2">
            <label className="w-12">Layer: {layerSpacing}</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={layerSpacing}
              onChange={(e) => setLayerSpacing(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Node: {nodeSpacing}</label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.1"
              value={nodeSpacing}
              onChange={(e) => setNodeSpacing(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Input: {inputLayerSpacing}</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={inputLayerSpacing}
              onChange={(e) => setInputLayerSpacing(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Dist: {cameraDistance}</label>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={cameraDistance}
              onChange={(e) => setCameraDistance(Number(e.target.value))}
              className="flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-12">Rotate</label>
            <input
              type="checkbox"
              checked={enableRotation}
              onChange={(e) => setEnableRotation(e.target.checked)}
              className="w-4 h-4 bg-tech-dark rounded border border-tech-teal/30"
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