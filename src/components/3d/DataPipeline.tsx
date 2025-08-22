import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface DataPipelineProps {
  interactive?: boolean
  cameraDistance?: number
  layerSpacing?: number
  cinematicMode?: boolean
  className?: string
}

const DataPipeline: React.FC<DataPipelineProps> = ({
  interactive = true,
  cameraDistance: externalCameraDistance,
  layerSpacing: externalLayerSpacing,
  cinematicMode = false,
  className: _className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [zOffset, setZOffset] = useState(0)
  const [cameraXOffset, setCameraXOffset] = useState(0)
  const [layerSpacing, setLayerSpacing] = useState(externalLayerSpacing || 6)
  const [nodeSpacing, setNodeSpacing] = useState(2.5)
  const [inputLayerSpacing, setInputLayerSpacing] = useState(2)
  const [cameraDistance, setCameraDistance] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [enableRotation, setEnableRotation] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

    // Position camera based on mode
    const finalCameraDistance = externalCameraDistance || cameraDistance

    if (cinematicMode) {
      // Cinematic 3/4 angle view - offset to right and above
      const offsetX = finalCameraDistance * 0.6 // Offset to the right
      const offsetY = finalCameraDistance * 0.3 // Slightly above
      const offsetZ = finalCameraDistance * 0.8 // Pull back slightly
      camera.position.set(offsetX, offsetY, offsetZ)

      // Look at a point slightly offset from center to create dynamic framing
      camera.lookAt(2, 0, 0)
    } else {
      camera.position.set(0, 0, finalCameraDistance)
      camera.lookAt(0, 0, 0)
    }

    // Store camera reference
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Configure controls based on mode
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    if (cinematicMode) {
      // Disable user controls in cinematic mode to maintain framing
      controls.enableZoom = false
      controls.enablePan = false
      controls.enableRotate = false
      controls.target.set(2, 0, 0) // Match camera look-at target
    } else {
      controls.enableZoom = true
      controls.enablePan = true
      controls.enableRotate = enableRotation
      controls.target.set(0, 0, 0)
      controls.maxDistance = 50
      controls.minDistance = 5
      controls.maxPolarAngle = Math.PI
      controls.minPolarAngle = 0
    }

    controlsRef.current = controls

    // Lighting adjusted for cinematic mode
    if (cinematicMode) {
      scene.add(new THREE.AmbientLight(0xffffff, 0.4)) // Dimmer ambient light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6) // Softer directional light
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)
    } else {
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)
    }

    // Apply cinematic transformations to the entire scene
    if (cinematicMode) {
      // Reduce scale by 25%
      scene.scale.setScalar(0.75)

      // Apply initial rotation for depth (25-30° on Y-axis, slight X tilt)
      scene.rotation.set(
        THREE.MathUtils.degToRad(-5), // Slight downward tilt
        THREE.MathUtils.degToRad(25), // 25° rotation for depth
        0
      )
    }

    // Create invisible wireframe container (for reference positioning only)
    const containerGeometry = new THREE.BoxGeometry(12, 6, 6)
    const containerEdges = new THREE.EdgesGeometry(containerGeometry)
    const containerMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 2,
      visible: false,
    })
    const containerWireframe = new THREE.LineSegments(
      containerEdges,
      containerMaterial
    )
    containerWireframe.position.set(0, 0, 0)
    // Don't add to scene - just keep reference for positioning

    // Store wireframe reference
    containerWireframeRef.current = containerWireframe
    sceneRef.current = scene

    // AI/ML System Architecture - representing your tech stack
    const nodes = [
      // Data Sources (3x3 grid = 9 nodes) - Real-time sensor inputs
      {
        name: 'LiDAR',
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Camera',
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: 0 + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'IMU',
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'GPS',
        x: layerSpacing * 3 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Radar',
        x: layerSpacing * 3 + xOffset,
        y: 0 + yOffset,
        z: 0 + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Sonar',
        x: layerSpacing * 3 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Thermal',
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Telemetry',
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: 0 + zOffset,
        color: 0xff4757,
        type: 'input',
      },
      {
        name: 'Encoder',
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xff4757,
        type: 'input',
      },

      // Processing Layer (12 nodes) - Real-time data processing (4x3 grid, 12 nodes)
      {
        name: 'SLAM',
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing * 2 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'CV Pipeline',
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Object Detect',
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Path Planning',
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Kalman Filter',
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing * 2 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Feature Map',
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'ML Inference',
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: 0 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Sensor Fusion',
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'State Estimation',
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing * 2 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Motion Control',
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Safety Check',
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },
      {
        name: 'Cloud Sync',
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0xffa726,
        type: 'hidden',
      },

      // Intelligence Layer (9 nodes) - AI decision making (3x3 grid, 9 nodes - complete)
      {
        name: 'Navigation AI',
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Obstacle Avoid',
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Mission Plan',
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Behavior Tree',
        x: layerSpacing * 0.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Deep RL',
        x: layerSpacing * 0.75 + xOffset,
        y: 0 + yOffset,
        z: 0 + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Fleet Coord',
        x: layerSpacing * 0.75 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Anomaly Detect',
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Predictive',
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },
      {
        name: 'Optimization',
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x00d4aa,
        type: 'hidden',
      },

      // Control Layer (4 nodes) - High-level system control (2x2 grid, 4 nodes - complete)
      {
        name: 'System Monitor',
        x: -layerSpacing * 0.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x8b5cf6,
        type: 'hidden',
      },
      {
        name: 'Health Check',
        x: -layerSpacing * 0.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x8b5cf6,
        type: 'hidden',
      },
      {
        name: 'Load Balance',
        x: -layerSpacing * 0.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x8b5cf6,
        type: 'hidden',
      },
      {
        name: 'Auto Scale',
        x: -layerSpacing * 0.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x8b5cf6,
        type: 'hidden',
      },

      // Output Layer (10 nodes) - Real-world actions (5x2 grid, 10 nodes - complete)
      {
        name: 'Motor Control',
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing * 2 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Navigation',
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Data Capture',
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: 0 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Communication',
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Emergency Stop',
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing * 2 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Mission Execute',
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing * 2 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Status Report',
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Cloud Upload',
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: 0 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'Fleet Sync',
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
      {
        name: 'RTL Mode',
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing * 2 + zOffset,
        color: 0x00e5ff,
        type: 'output',
      },
    ]

    // Create node boxes
    const nodeBoxes: THREE.Mesh[] = []
    nodes.forEach(node => {
      // Different sizes based on node type
      const size = node.type === 'transform' ? 1.2 : 1.0
      const geometry = new THREE.BoxGeometry(size, size, size)
      const material = new THREE.MeshLambertMaterial({
        color: node.color,
        transparent: true,
        opacity: cinematicMode ? 0.675 : 0.9, // 75% of original opacity for cinematic mode
      })
      const box = new THREE.Mesh(geometry, material)
      box.position.set(node.x, node.y, node.z)
      scene.add(box)
      nodeBoxes.push(box)
      nodeBoxesRef.current.push(box)

      // Glow outline
      const outlineGeometry = new THREE.BoxGeometry(
        size + 0.1,
        size + 0.1,
        size + 0.1
      )
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: cinematicMode ? 0.225 : 0.3, // 75% of original opacity for cinematic mode
        side: THREE.BackSide,
      })
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial)
      outline.position.copy(box.position)
      scene.add(outline)
      nodeBoxesRef.current.push(outline) // Track outline as well
    })

    // Neural network connections (selective connections for cleaner visualization)
    const connections: [number, number][] = []

    // Input layer (0-8: 3x3 grid) to Hidden layer 1 (9-20: 12 nodes) - clear layer connections
    const inputToHidden1 = [
      // Each input connects to 3-4 hidden nodes in a pattern
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
      [1, 9],
      [1, 10],
      [1, 11],
      [1, 13],
      [2, 10],
      [2, 11],
      [2, 12],
      [2, 14],
      [3, 9],
      [3, 13],
      [3, 14],
      [3, 15],
      [4, 10],
      [4, 11],
      [4, 13],
      [4, 14],
      [4, 16], // Center pixel connects to more
      [5, 11],
      [5, 12],
      [5, 14],
      [5, 17],
      [6, 13],
      [6, 14],
      [6, 15],
      [6, 18],
      [7, 14],
      [7, 15],
      [7, 16],
      [7, 19],
      [8, 15],
      [8, 16],
      [8, 17],
      [8, 20],
    ]
    connections.push(...inputToHidden1)

    // Hidden layer 1 (9-20: 12 nodes) to Hidden layer 2 (21-29: 9 nodes) - ensure all nodes connected
    const hidden1ToHidden2 = [
      // Each hidden1 node connects to 2-3 hidden2 nodes
      [9, 21],
      [9, 22],
      [9, 23],
      [10, 21],
      [10, 22],
      [10, 24],
      [11, 22],
      [11, 23],
      [11, 24],
      [12, 23],
      [12, 24],
      [12, 25],
      [13, 21],
      [13, 25],
      [13, 26],
      [14, 22],
      [14, 24],
      [14, 25],
      [14, 26],
      [15, 23],
      [15, 25],
      [15, 26],
      [16, 21],
      [16, 22],
      [16, 27],
      [17, 22],
      [17, 23],
      [17, 24],
      [18, 23],
      [18, 24],
      [18, 25],
      [19, 24],
      [19, 25],
      [19, 26],
      [20, 21],
      [20, 25],
      [20, 26],
      // Ensure all hidden2 nodes receive at least one connection
      [9, 28],
      [10, 28],
      [11, 28],
      [12, 28],
      [13, 28],
      [14, 28],
      [15, 28],
      [16, 28],
      [17, 28],
      [18, 28],
      [19, 28],
      [20, 28],
      [9, 29],
      [10, 29],
      [11, 29],
      [12, 29],
      [13, 29],
      [14, 29],
      [15, 29],
      [16, 29],
      [17, 29],
      [18, 29],
      [19, 29],
      [20, 29],
    ]
    connections.push(...hidden1ToHidden2)

    // Hidden layer 2 (21-29: 9 nodes) to Hidden layer 3 (30-33: 4 nodes) - ensure all nodes connected
    const hidden2ToHidden3 = [
      // Each hidden2 node connects to 2-3 hidden3 nodes
      [21, 30],
      [21, 31],
      [22, 30],
      [22, 31],
      [22, 32],
      [23, 31],
      [23, 32],
      [23, 33], // Middle node connects to all
      [24, 30],
      [24, 31],
      [24, 32],
      [25, 31],
      [25, 32],
      [25, 33],
      [26, 32],
      [26, 33],
      [27, 30],
      [27, 31],
      [28, 31],
      [28, 32],
      [29, 32],
      [29, 33],
      // Ensure all hidden3 nodes receive at least one connection from each hidden2 node
      [21, 30],
      [21, 31],
      [21, 32],
      [21, 33],
      [22, 30],
      [22, 31],
      [22, 32],
      [22, 33],
      [23, 30],
      [23, 31],
      [23, 32],
      [23, 33],
      [24, 30],
      [24, 31],
      [24, 32],
      [24, 33],
      [25, 30],
      [25, 31],
      [25, 32],
      [25, 33],
      [26, 30],
      [26, 31],
      [26, 32],
      [26, 33],
      [27, 30],
      [27, 31],
      [27, 32],
      [27, 33],
      [28, 30],
      [28, 31],
      [28, 32],
      [28, 33],
      [29, 30],
      [29, 31],
      [29, 32],
      [29, 33],
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
        new THREE.Vector3(to.x, to.y, to.z),
      ]

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x666666, // Consistent gray color for all lines
        transparent: true,
        opacity: cinematicMode ? 0.3 : 0.4, // 75% of original opacity for cinematic mode
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

      // Start with the color from the source node
      const particleMaterial = new THREE.MeshLambertMaterial({
        color: from.color,
        transparent: true,
        opacity: cinematicMode ? 0.675 : 0.9, // 75% of original opacity for cinematic mode
      })
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)

      // Start at the 'from' node
      particle.position.set(from.x, from.y, from.z)

      // Store path information using node indices instead of node objects
      particle.userData = {
        fromNodeIndex: fromIdx,
        toNodeIndex: toIdx,
        progress: Math.random(), // Random starting progress along path
        speed: 0.0005 + Math.random() * 0.001,
        connectionIndex: connectionIndex,
        sourceColor: from.color, // Store the original source node color
      }

      scene.add(particle)
      particles.push(particle)
      particlesRef.current.push(particle)
    }

    // Text labels are handled via HTML overlay

    // Mouse interaction for click-and-drag
    let isDraggingInternal = false
    let dragStartX = 0
    let dragStartY = 0

    const handleMouseDown = (event: MouseEvent) => {
      if (!interactive) return
      isDraggingInternal = true
      dragStartX = event.clientX
      dragStartY = event.clientY
      setIsDragging(true)
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
      const time = Date.now() * 0.001

      if (cinematicMode) {
        // Cinematic idle motion - subtle breathing effect
        const breathingIntensity = 0.002
        const breathingSpeed = 0.0005
        scene.rotation.y += Math.sin(time * breathingSpeed) * breathingIntensity
        scene.rotation.x +=
          Math.cos(time * breathingSpeed * 0.7) * breathingIntensity * 0.5

        // Gentle parallax based on mouse position (very low sensitivity)
        const parallaxStrength = 0.0001
        scene.rotation.y += (mousePosition.x - 0.5) * parallaxStrength
        scene.rotation.x += (mousePosition.y - 0.5) * parallaxStrength * 0.5
      }

      // Gentle node box animation with slow drift for background layer
      nodeBoxesRef.current.forEach((box, index) => {
        // Minimal rotation for premium, subtle motion
        const nodeTime = Date.now() * 0.00005
        const isMainBox = index % 2 === 0 // Every other is main box (not outline)
        if (isMainBox) {
          const intensity = cinematicMode ? 0.01 : 0.02 // Reduce motion in cinematic mode
          box.rotation.y = Math.sin(nodeTime + index * 0.05) * intensity
          box.rotation.x =
            Math.cos(nodeTime * 0.5 + index * 0.03) * intensity * 0.75
        }
      })

      // Keep connection lines stable
      connectionLinesRef.current.forEach(line => {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.4
      })

      // Animate data particles through network with slower, graceful motion
      particlesRef.current.forEach(particle => {
        const userData = particle.userData
        // Even slower particle speed for premium background feel
        userData.progress += userData.speed * 0.5

        if (userData.progress <= 1) {
          // Get current node positions from the actual scene objects
          const fromNodeIndex = userData.fromNodeIndex * 2 // Main box index (not outline)
          const toNodeIndex = userData.toNodeIndex * 2
          const fromBox = nodeBoxesRef.current[fromNodeIndex]
          const toBox = nodeBoxesRef.current[toNodeIndex]

          if (fromBox && toBox) {
            particle.position.x =
              fromBox.position.x +
              (toBox.position.x - fromBox.position.x) * userData.progress
            particle.position.y =
              fromBox.position.y +
              (toBox.position.y - fromBox.position.y) * userData.progress
            particle.position.z =
              fromBox.position.z +
              (toBox.position.z - fromBox.position.z) * userData.progress

            // Update particle color as it moves along the connection
            const fromNode = nodes[userData.fromNodeIndex]
            const toNode = nodes[userData.toNodeIndex]
            const fromColor = new THREE.Color(fromNode.color)
            const toColor = new THREE.Color(toNode.color)
            const interpolatedColor = fromColor
              .clone()
              .lerp(toColor, userData.progress)

            if (particle.material instanceof THREE.MeshLambertMaterial) {
              particle.material.color.copy(interpolatedColor)
            }
          }
        } else {
          // Particle reached destination, assign new random path from neural network connections
          const newConnectionIndex = Math.floor(
            Math.random() * connections.length
          )
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
            particle.position.set(
              fromBox.position.x,
              fromBox.position.y,
              fromBox.position.z
            )
          }
        }

        // Subtle particle motion for elegant background
        particle.rotation.x += 0.005
        particle.rotation.y += 0.008
      })

      // Update orbit controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Mouse tracking for parallax (only in cinematic mode)
    const handleParallaxMouseMove = (event: MouseEvent) => {
      if (cinematicMode) {
        const x = event.clientX / window.innerWidth
        const y = event.clientY / window.innerHeight
        setMousePosition({ x, y })
      }
    }

    if (cinematicMode) {
      window.addEventListener('mousemove', handleParallaxMouseMove)
    }

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
      if (cinematicMode) {
        window.removeEventListener('mousemove', handleParallaxMouseMove)
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
  }, [
    interactive,
    cameraDistance,
    externalCameraDistance,
    externalLayerSpacing,
    enableRotation,
    inputLayerSpacing,
    layerSpacing,
    nodeSpacing,
    xOffset,
    yOffset,
    zOffset,
    cinematicMode,
    mousePosition.x,
    mousePosition.y,
  ])

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
      {
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
      },
      { x: layerSpacing * 3 + xOffset, y: 0 + yOffset, z: 0 + zOffset },
      {
        x: layerSpacing * 3 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 3 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      // Hidden Layer 1 (12 nodes) - 4x3 grid
      {
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing * 2 + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing * 2 + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
      },
      { x: layerSpacing * 1.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing * 2 + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 1.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      // Hidden Layer 2 (9 nodes) - 3x3 grid
      {
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: 0 + yOffset,
        z: nodeSpacing + zOffset,
      },
      { x: layerSpacing * 0.75 + xOffset, y: 0 + yOffset, z: 0 + zOffset },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: 0 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: 0 + zOffset,
      },
      {
        x: layerSpacing * 0.75 + xOffset,
        y: -nodeSpacing * 2 + yOffset,
        z: -nodeSpacing + zOffset,
      },
      // Hidden Layer 3 (4 nodes) - 2x2 grid
      {
        x: -layerSpacing * 0.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 0.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 0.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 0.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      // Output Layer (10 nodes) - 5x2 grid
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing * 2 + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: 0 + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: nodeSpacing + yOffset,
        z: -nodeSpacing * 2 + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing * 2 + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: 0 + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing + zOffset,
      },
      {
        x: -layerSpacing * 1.25 + xOffset,
        y: -nodeSpacing + yOffset,
        z: -nodeSpacing * 2 + zOffset,
      },
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
        [0, 9],
        [0, 10],
        [0, 11],
        [0, 12],
        [1, 9],
        [1, 10],
        [1, 11],
        [1, 13],
        [2, 10],
        [2, 11],
        [2, 12],
        [2, 14],
        [3, 9],
        [3, 13],
        [3, 14],
        [3, 15],
        [4, 10],
        [4, 11],
        [4, 13],
        [4, 14],
        [4, 16],
        [5, 11],
        [5, 12],
        [5, 14],
        [5, 17],
        [6, 13],
        [6, 14],
        [6, 15],
        [6, 18],
        [7, 14],
        [7, 15],
        [7, 16],
        [7, 19],
        [8, 15],
        [8, 16],
        [8, 17],
        [8, 20],
      ]
      connectionPattern.push(...inputToHidden1)

      // Hidden 1 to Hidden 2 - ensure all nodes connected (9-20 to 21-29)
      const hidden1ToHidden2 = [
        [9, 21],
        [9, 22],
        [9, 23],
        [10, 21],
        [10, 22],
        [10, 24],
        [11, 22],
        [11, 23],
        [11, 24],
        [12, 23],
        [12, 24],
        [12, 25],
        [13, 21],
        [13, 25],
        [13, 26],
        [14, 22],
        [14, 24],
        [14, 25],
        [14, 26],
        [15, 23],
        [15, 25],
        [15, 26],
        [16, 21],
        [16, 22],
        [16, 27],
        [17, 22],
        [17, 23],
        [17, 24],
        [18, 23],
        [18, 24],
        [18, 25],
        [19, 24],
        [19, 25],
        [19, 26],
        [20, 21],
        [20, 25],
        [20, 26],
        // Ensure all hidden2 nodes receive at least one connection
        [9, 28],
        [10, 28],
        [11, 28],
        [12, 28],
        [13, 28],
        [14, 28],
        [15, 28],
        [16, 28],
        [17, 28],
        [18, 28],
        [19, 28],
        [20, 28],
        [9, 29],
        [10, 29],
        [11, 29],
        [12, 29],
        [13, 29],
        [14, 29],
        [15, 29],
        [16, 29],
        [17, 29],
        [18, 29],
        [19, 29],
        [20, 29],
      ]
      connectionPattern.push(...hidden1ToHidden2)

      // Hidden 2 to Hidden 3 - ensure all nodes connected (21-29 to 30-33)
      const hidden2ToHidden3 = [
        [21, 30],
        [21, 31],
        [22, 30],
        [22, 31],
        [22, 32],
        [23, 31],
        [23, 32],
        [23, 33],
        [24, 30],
        [24, 31],
        [24, 32],
        [25, 31],
        [25, 32],
        [25, 33],
        [26, 32],
        [26, 33],
        [27, 30],
        [27, 31],
        [28, 31],
        [28, 32],
        [29, 32],
        [29, 33],
        // Ensure all hidden3 nodes receive at least one connection from each hidden2 node
        [21, 30],
        [21, 31],
        [21, 32],
        [21, 33],
        [22, 30],
        [22, 31],
        [22, 32],
        [22, 33],
        [23, 30],
        [23, 31],
        [23, 32],
        [23, 33],
        [24, 30],
        [24, 31],
        [24, 32],
        [24, 33],
        [25, 30],
        [25, 31],
        [25, 32],
        [25, 33],
        [26, 30],
        [26, 31],
        [26, 32],
        [26, 33],
        [27, 30],
        [27, 31],
        [27, 32],
        [27, 33],
        [28, 30],
        [28, 31],
        [28, 32],
        [28, 33],
        [29, 30],
        [29, 31],
        [29, 32],
        [29, 33],
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
            new THREE.Vector3(
              fromNode.position.x,
              fromNode.position.y,
              fromNode.position.z
            ),
            new THREE.Vector3(
              toNode.position.x,
              toNode.position.y,
              toNode.position.z
            ),
          ]

          line.geometry.setFromPoints(points)
        }
      }
    })
  }, [
    xOffset,
    yOffset,
    zOffset,
    cameraXOffset,
    layerSpacing,
    nodeSpacing,
    inputLayerSpacing,
    cameraDistance,
  ])

  // Separate effect to handle rotation toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = enableRotation
    }
  }, [enableRotation])

  // Update internal layerSpacing when external prop changes
  useEffect(() => {
    if (externalLayerSpacing !== undefined) {
      setLayerSpacing(externalLayerSpacing)
    }
  }, [externalLayerSpacing])

  return (
    <div className='relative w-full h-full'>
      <div
        ref={containerRef}
        className='absolute inset-0 w-full h-full overflow-hidden'
        style={{
          cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
          background: 'transparent',
        }}
      />

      {/* Controls Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className='absolute top-4 right-4 px-3 py-2 text-xs font-mono bg-tech-dark/80 text-tech-teal border border-tech-teal/20 rounded hover:bg-tech-teal/10 transition-all'
      >
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </button>

      {/* Position Control Sliders */}
      {showControls && (
        <div className='absolute top-16 right-4 text-xs text-tech-text-muted font-mono bg-tech-dark/80 px-3 py-2 rounded border border-tech-teal/20'>
          <div className='mb-2 text-tech-teal font-semibold'>
            Network Position
          </div>
          <div className='flex flex-col gap-2 w-48'>
            <div className='flex items-center gap-2'>
              <label className='w-12'>X: {xOffset}</label>
              <input
                type='range'
                min='-50'
                max='50'
                step='0.5'
                value={xOffset}
                onChange={e => setXOffset(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Y: {yOffset}</label>
              <input
                type='range'
                min='-50'
                max='50'
                step='0.5'
                value={yOffset}
                onChange={e => setYOffset(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Z: {zOffset}</label>
              <input
                type='range'
                min='-50'
                max='50'
                step='0.5'
                value={zOffset}
                onChange={e => setZOffset(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Cam: {cameraXOffset}</label>
              <input
                type='range'
                min='-50'
                max='50'
                step='0.5'
                value={cameraXOffset}
                onChange={e => setCameraXOffset(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
          </div>
        </div>
      )}

      {/* Spacing Control Sliders */}
      {showControls && (
        <div
          className='absolute top-16 right-4 text-xs text-tech-text-muted font-mono bg-tech-dark/80 px-3 py-2 rounded border border-tech-teal/20'
          style={{ top: '212px' }}
        >
          <div className='mb-2 text-tech-teal font-semibold'>
            Network Spacing
          </div>
          <div className='flex flex-col gap-2 w-48'>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Layer: {layerSpacing}</label>
              <input
                type='range'
                min='1'
                max='10'
                step='0.5'
                value={layerSpacing}
                onChange={e => setLayerSpacing(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Node: {nodeSpacing}</label>
              <input
                type='range'
                min='0.5'
                max='4'
                step='0.1'
                value={nodeSpacing}
                onChange={e => setNodeSpacing(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Input: {inputLayerSpacing}</label>
              <input
                type='range'
                min='0.5'
                max='3'
                step='0.1'
                value={inputLayerSpacing}
                onChange={e => setInputLayerSpacing(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Dist: {cameraDistance}</label>
              <input
                type='range'
                min='5'
                max='30'
                step='1'
                value={cameraDistance}
                onChange={e => setCameraDistance(Number(e.target.value))}
                className='flex-1 h-1 bg-tech-dark rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-12'>Rotate</label>
              <input
                type='checkbox'
                checked={enableRotation}
                onChange={e => setEnableRotation(e.target.checked)}
                className='w-4 h-4 bg-tech-dark rounded border border-tech-teal/30'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataPipeline
