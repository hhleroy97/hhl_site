import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface DataPipelineProps {
  interactive?: boolean
  cameraDistance?: number
  layerSpacing?: number
  cinematicMode?: boolean
  positionShift?: number
  verticalShift?: number
  className?: string
  rotationX?: number
  rotationY?: number
  rotationZ?: number
  positionX?: number
  positionY?: number
  positionZ?: number
  showBoundingBox?: boolean
  showOriginMarker?: boolean
  enableMouseParallax?: boolean
  onTransformChange?: (transform: {
    rotationX: number
    rotationY: number
    rotationZ: number
    positionX: number
    positionY: number
    positionZ: number
  }) => void
}

const DataPipeline: React.FC<DataPipelineProps> = ({
  interactive = true,
  cameraDistance: externalCameraDistance,
  layerSpacing: externalLayerSpacing,
  cinematicMode = false,
  positionShift = 0,
  verticalShift = 0,
  className: _className = '',
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  showBoundingBox = false,
  showOriginMarker = true,
  enableMouseParallax = true,
  onTransformChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cameraXOffset] = useState(0)
  const [layerSpacing] = useState(externalLayerSpacing || 6)
  const [nodeSpacing] = useState(2.5)
  const [inputLayerSpacing] = useState(2)
  const [cameraDistance] = useState(15)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const smoothMousePositionRef = useRef({ x: 0, y: 0 })

  // Store refs to update positions without recreating scene
  const sceneRef = useRef<THREE.Scene | null>(null)
  const neuralNetworkGroupRef = useRef<THREE.Group | null>(null)
  const nodeBoxesRef = useRef<THREE.Mesh[]>([])
  const containerWireframeRef = useRef<THREE.LineSegments | null>(null)
  const particlesRef = useRef<THREE.Mesh[]>([])
  const connectionLinesRef = useRef<THREE.Line[]>([])
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const connectionsRef = useRef<[number, number][]>([]) // Store connections for cross-effect access

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
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)

    // Position camera based on mode
    const finalCameraDistance = externalCameraDistance || cameraDistance

    if (cinematicMode) {
      // Cinematic 3/4 angle view - move camera right so vis appears more to the left
      const offsetX = finalCameraDistance * 0.8 // Move camera to the right
      const offsetY = finalCameraDistance * 0.3 // Slightly above
      const offsetZ = finalCameraDistance * 0.8 // Pull back slightly
      camera.position.set(offsetX, offsetY, offsetZ)

      // Look at a fixed point with adjustable position shift for consistent framing
      const fixedLookAtPoint = new THREE.Vector3(
        -4 + positionShift,
        verticalShift,
        0
      )
      camera.lookAt(fixedLookAtPoint)
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

    // Disable all user controls - we'll use mouse parallax instead
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false

    // Allow vertical page scrolling on touch devices while interacting with the canvas
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function'
      ) {
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
        if (isCoarsePointer) {
          renderer.domElement.style.touchAction = 'pan-y'
          container.style.touchAction = 'pan-y'
        }
      }
    } catch {
      void 0
    }

    if (cinematicMode) {
      controls.target.set(-4 + positionShift, verticalShift, 0) // Match camera look-at target - fixed reference
    } else {
      controls.target.set(0, 0, 0)
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

    // Create a group for neural network content that can be transformed
    const neuralNetworkGroup = new THREE.Group()
    scene.add(neuralNetworkGroup)
    neuralNetworkGroupRef.current = neuralNetworkGroup

    // Add origin marker to world space (not transformed with neural network)
    if (showOriginMarker) {
      const originGeometry = new THREE.SphereGeometry(0.2, 16, 12)
      const originMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000, // Red color
        transparent: true,
        opacity: 0.8,
      })
      const originMarker = new THREE.Mesh(originGeometry, originMaterial)
      originMarker.position.set(0, 0, 0) // Explicitly set to origin
      scene.add(originMarker) // Add directly to scene, not to neuralNetworkGroup
    }

    // Apply cinematic transformations to the neural network group only
    if (cinematicMode) {
      // Reduce scale by 25%
      neuralNetworkGroup.scale.setScalar(0.75)

      // Apply initial rotation for depth (25-30° on Y-axis, slight X tilt) + external rotation
      neuralNetworkGroup.rotation.set(
        THREE.MathUtils.degToRad(-5) + THREE.MathUtils.degToRad(rotationX), // Slight downward tilt + external X rotation
        THREE.MathUtils.degToRad(25) + THREE.MathUtils.degToRad(rotationY), // 25° rotation for depth + external Y rotation
        THREE.MathUtils.degToRad(rotationZ) // External Z rotation
      )

      // Apply external position offset
      neuralNetworkGroup.position.set(positionX, positionY, positionZ)

      // Call transform change callback with current values
      if (onTransformChange) {
        const currentRotX = THREE.MathUtils.radToDeg(
          neuralNetworkGroup.rotation.x
        )
        const currentRotY = THREE.MathUtils.radToDeg(
          neuralNetworkGroup.rotation.y
        )
        const currentRotZ = THREE.MathUtils.radToDeg(
          neuralNetworkGroup.rotation.z
        )
        onTransformChange({
          rotationX: currentRotX,
          rotationY: currentRotY,
          rotationZ: currentRotZ,
          positionX: neuralNetworkGroup.position.x,
          positionY: neuralNetworkGroup.position.y,
          positionZ: neuralNetworkGroup.position.z,
        })
      }
    }

    // Network spans from -1.75 to 3 layerSpacing units, so center is at 0.625
    const centerOffset = -0.625 * layerSpacing // Keep network centered at origin consistently

    // Calculate actual neural network bounds
    const networkMinX = layerSpacing * -1.75 + centerOffset + positionX
    const networkMaxX = layerSpacing * 3 + centerOffset + positionX
    const networkMinY = -nodeSpacing * 2 + positionY
    const networkMaxY = nodeSpacing * 2 + positionY
    const networkMinZ = -nodeSpacing * 2 + positionZ
    const networkMaxZ = nodeSpacing * 2 + positionZ

    const networkWidth = networkMaxX - networkMinX
    const networkHeight = networkMaxY - networkMinY
    const networkDepth = networkMaxZ - networkMinZ

    // Create red bounding box wireframe (standard size, will be scaled later)
    const containerGeometry = new THREE.BoxGeometry(1, 1, 1) // Unit cube
    const containerEdges = new THREE.EdgesGeometry(containerGeometry)
    const containerMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 3,
      visible: true,
    })
    const containerWireframe = new THREE.LineSegments(
      containerEdges,
      containerMaterial
    )

    // Scale to actual network dimensions
    containerWireframe.scale.set(networkWidth, networkHeight, networkDepth)

    // Position the bounding box at the center of the network
    const centerX = (networkMinX + networkMaxX) / 2
    const centerY = (networkMinY + networkMaxY) / 2
    const centerZ = (networkMinZ + networkMaxZ) / 2
    containerWireframe.position.set(centerX, centerY, centerZ)

    // Add bounding box to scene only if showBoundingBox is true
    if (showBoundingBox) {
      neuralNetworkGroup.add(containerWireframe)
    }

    // Store wireframe reference
    containerWireframeRef.current = containerWireframe
    sceneRef.current = scene

    // Fixed center offset to keep visualization stable when spacing changes
    // Use a fixed reference point so camera doesn't jump when spacing changes
    // centerOffset already calculated above

    // AI/ML System Architecture - representing your tech stack
    const nodes = [
      // Data Sources (3x3 grid = 9 nodes) - Real-time sensor inputs
      {
        name: 'LiDAR',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Camera',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: 0 + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'IMU',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'GPS',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Radar',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Sonar',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Thermal',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Telemetry',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: 0 + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },
      {
        name: 'Encoder',
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x34d399, // Emerald-400 - Input layer (back)
        type: 'input',
      },

      // Processing Layer (12 nodes) - Real-time data processing (4x3 grid, 12 nodes)
      {
        name: 'SLAM',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing * 2 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'CV Pipeline',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Object Detect',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Path Planning',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Kalman Filter',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing * 2 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Feature Map',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'ML Inference',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Sensor Fusion',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'State Estimation',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing * 2 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Motion Control',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Safety Check',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },
      {
        name: 'Cloud Sync',
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x2bd5c3, // Cyan-Emerald blend - Processing layer
        type: 'hidden',
      },

      // Intelligence Layer (9 nodes) - AI decision making (3x3 grid, 9 nodes - complete)
      {
        name: 'Navigation AI',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (fourth)
        type: 'hidden',
      },
      {
        name: 'Obstacle Avoid',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Mission Plan',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Behavior Tree',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Deep RL',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Fleet Coord',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Anomaly Detect',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Predictive',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },
      {
        name: 'Optimization',
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
        color: 0x22d3ee, // Cyan-400 - Intelligence layer (middle)
        type: 'hidden',
      },

      // Control Layer (4 nodes) - High-level system control (2x2 grid, 4 nodes - complete)
      {
        name: 'System Monitor',
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0xdb7edf, // Fuchsia-Cyan blend - Control layer
        type: 'hidden',
      },
      {
        name: 'Health Check',
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0xdb7edf, // Fuchsia-Cyan blend - Control layer
        type: 'hidden',
      },
      {
        name: 'Load Balance',
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0xdb7edf, // Fuchsia-Cyan blend - Control layer
        type: 'hidden',
      },
      {
        name: 'Auto Scale',
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0xdb7edf, // Fuchsia-Cyan blend - Control layer
        type: 'hidden',
      },

      // Output Layer (10 nodes) - Real-world actions (5x2 grid, 10 nodes - complete)
      {
        name: 'Motor Control',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing * 2 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Navigation',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Data Capture',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: 0 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Communication',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Emergency Stop',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing * 2 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Mission Execute',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing * 2 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Status Report',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Cloud Upload',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: 0 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'Fleet Sync',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
        type: 'output',
      },
      {
        name: 'RTL Mode',
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing * 2 + positionZ,
        color: 0xd946ef, // Fuchsia-500 - Output layer (front)
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
      neuralNetworkGroup.add(box)
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
      neuralNetworkGroup.add(outline)
      nodeBoxesRef.current.push(outline) // Track outline as well
    })

    // Neural network connections (proper left-to-right MLP flow)
    // Layer positions: Input(-1.75) → Intelligence(-0.75) → Processing(0.75) → Control(1.75) → Output(3)
    const connections: [number, number][] = [
      // Input layer (0-8: 3x3 grid) to Intelligence layer (21-29: 9 nodes) - first hidden layer
      [0, 21],
      [0, 22],
      [0, 23],
      [1, 21],
      [1, 22],
      [1, 23],
      [1, 24],
      [2, 22],
      [2, 23],
      [2, 24],
      [3, 21],
      [3, 24],
      [3, 25],
      [3, 26],
      [4, 22],
      [4, 23],
      [4, 24],
      [4, 25],
      [4, 26],
      [5, 23],
      [5, 24],
      [5, 25],
      [5, 26],
      [5, 27],
      [6, 24],
      [6, 25],
      [6, 26],
      [6, 27],
      [7, 25],
      [7, 26],
      [7, 27],
      [7, 28],
      [8, 26],
      [8, 27],
      [8, 28],
      [8, 29],

      // Intelligence layer (21-29: 9 nodes) to Processing layer (9-20: 12 nodes) - second hidden layer
      [21, 9],
      [21, 10],
      [21, 11],
      [21, 12],
      [22, 9],
      [22, 10],
      [22, 11],
      [22, 13],
      [23, 10],
      [23, 11],
      [23, 12],
      [23, 14],
      [24, 11],
      [24, 12],
      [24, 13],
      [24, 14],
      [24, 15],
      [25, 12],
      [25, 13],
      [25, 14],
      [25, 15],
      [25, 16],
      [26, 13],
      [26, 14],
      [26, 15],
      [26, 16],
      [26, 17],
      [27, 14],
      [27, 15],
      [27, 16],
      [27, 17],
      [27, 18],
      [28, 15],
      [28, 16],
      [28, 17],
      [28, 18],
      [28, 19],
      [29, 17],
      [29, 18],
      [29, 19],
      [29, 20],

      // Processing layer (9-20: 12 nodes) to Control layer (30-33: 4 nodes)
      [9, 30],
      [9, 31],
      [10, 30],
      [10, 31],
      [11, 30],
      [11, 31],
      [11, 32],
      [12, 31],
      [12, 32],
      [13, 30],
      [13, 31],
      [13, 32],
      [14, 31],
      [14, 32],
      [14, 33],
      [15, 30],
      [15, 32],
      [15, 33],
      [16, 31],
      [16, 32],
      [16, 33],
      [17, 30],
      [17, 32],
      [17, 33],
      [18, 31],
      [18, 32],
      [18, 33],
      [19, 32],
      [19, 33],
      [20, 33],

      // Control layer (30-33: 4 nodes) to Output layer (34-43: 10 nodes)
      [30, 34],
      [30, 35],
      [30, 36],
      [30, 37],
      [30, 38],
      [31, 35],
      [31, 36],
      [31, 37],
      [31, 38],
      [31, 39],
      [32, 37],
      [32, 38],
      [32, 39],
      [32, 40],
      [32, 41],
      [33, 39],
      [33, 40],
      [33, 41],
      [33, 42],
      [33, 43],
    ]

    // Store connections in ref for access from position update effect
    connectionsRef.current = connections

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
        color: 0x374151, // Subtle gray-700 color for all lines
        transparent: true,
        opacity: 0.1, // Start with subtle visibility for all connections
      })
      const line = new THREE.Line(geometry, material)
      neuralNetworkGroup.add(line)
      connectionLines.push(line)
      connectionLinesRef.current.push(line)
    })

    // Data particles flowing through complex mesh network (created after connection lines)
    const particles: THREE.Mesh[] = []
    const particleCount = 120 // Doubled particle count for more data flow

    // Ensure even distribution across all connections for consistent data flow
    const connectionsPerParticle = Math.ceil(particleCount / connections.length)
    let particleIndex = 0

    // Create particles with even distribution across all connections
    for (
      let connectionIdx = 0;
      connectionIdx < connections.length && particleIndex < particleCount;
      connectionIdx++
    ) {
      const [fromIdx, toIdx] = connections[connectionIdx]
      const particlesForThisConnection = Math.min(
        connectionsPerParticle,
        particleCount - particleIndex
      )

      for (let i = 0; i < particlesForThisConnection; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.06, 8, 6) // Slightly smaller for more particles

        const from = nodes[fromIdx]
        const to = nodes[toIdx]

        // Start with the color from the source node with subtle glow
        const particleMaterial = new THREE.MeshLambertMaterial({
          color: from.color,
          emissive: from.color,
          emissiveIntensity: 0.25, // Slightly reduced glow for more particles
          transparent: true,
          opacity: cinematicMode ? 0.675 : 0.85, // Slightly reduced opacity for cleaner look
        })
        const particle = new THREE.Mesh(particleGeometry, particleMaterial)

        // Stagger starting positions along the connection path for more natural flow
        const startProgress =
          i / particlesForThisConnection + (Math.random() * 0.3 - 0.15) // Spread particles along path
        const startX = from.x + (to.x - from.x) * startProgress
        const startY = from.y + (to.y - from.y) * startProgress
        const startZ = from.z + (to.z - from.z) * startProgress
        particle.position.set(startX, startY, startZ)

        // Store path information using node indices instead of node objects
        particle.userData = {
          fromNodeIndex: fromIdx,
          toNodeIndex: toIdx,
          progress: startProgress, // Start at staggered position
          speed: 0.0003 + Math.random() * 0.0004, // Slightly varied speeds
          connectionIndex: connectionIdx,
          sourceColor: from.color, // Store the original source node color
          particleId: particleIndex, // Unique ID for varied behaviors
          sizeVariation: 0.8 + Math.random() * 0.4, // Random size that stays constant (0.8 to 1.2)
        }

        neuralNetworkGroup.add(particle)
        particles.push(particle)
        particlesRef.current.push(particle)
        particleIndex++
      }
    }

    // Text labels are handled via HTML overlay

    // Mouse parallax interaction - track entire screen
    const handleParallaxMouseMove = (event: MouseEvent) => {
      if (!enableMouseParallax) return

      // Use entire screen area for smoother, continuous parallax
      const x = (event.clientX / window.innerWidth) * 2 - 1 // -1 to 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1 // -1 to 1

      // Update ref directly for immediate use in animation loop
      mousePositionRef.current = { x, y }
    }

    // Touch parallax support on mobile/tablets
    const getIsScrollLocked = () => {
      try {
        const { overflow, position } = document.body.style
        return overflow === 'hidden' || position === 'fixed'
      } catch {
        return false
      }
    }

    const applyTouchActionForState = () => {
      try {
        const locked = getIsScrollLocked()
        if (renderer?.domElement) {
          renderer.domElement.style.touchAction = locked ? 'none' : 'pan-y'
        }
        if (container) {
          container.style.touchAction = locked ? 'none' : 'pan-y'
        }
      } catch {
        void 0
      }
    }

    const handleParallaxTouchStart = (event: TouchEvent) => {
      if (!enableMouseParallax) return
      if (event.touches && event.touches.length > 0) {
        const t = event.touches[0]
        const x = (t.clientX / window.innerWidth) * 2 - 1
        const y = -(t.clientY / window.innerHeight) * 2 + 1
        mousePositionRef.current = { x, y }
      }
      // Update touch-action based on lock state at interaction start
      applyTouchActionForState()
    }

    const handleParallaxTouchMove = (event: TouchEvent) => {
      if (!enableMouseParallax) return
      if (event.touches && event.touches.length > 0) {
        const t = event.touches[0]
        const x = (t.clientX / window.innerWidth) * 2 - 1
        const y = -(t.clientY / window.innerHeight) * 2 + 1
        mousePositionRef.current = { x, y }
      }
      // Only block scrolling if the landing page has scroll locked
      if (getIsScrollLocked()) {
        event.preventDefault()
      }
    }

    // Add mouse parallax listener to entire window for smooth tracking
    if (enableMouseParallax) {
      window.addEventListener('mousemove', handleParallaxMouseMove)
    }

    // Add touch listeners on container for coarse pointers
    try {
      const isCoarsePointer =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(pointer: coarse)').matches
      if (isCoarsePointer && enableMouseParallax) {
        container.addEventListener('touchstart', handleParallaxTouchStart, {
          passive: true,
        })
        // Need passive: false so we can conditionally preventDefault when locked
        container.addEventListener('touchmove', handleParallaxTouchMove, {
          passive: false,
        })
        // Sync touch-action to current lock state on mount
        applyTouchActionForState()
      }
    } catch {
      void 0
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      const time = Date.now() * 0.001

      // Apply rotations with mouse parallax effect
      if (neuralNetworkGroupRef.current) {
        // Smooth interpolation for buttery-smooth parallax
        const lerpFactor = 0.08 // Controls smoothing speed
        const targetMousePos = mousePositionRef.current
        const currentSmoothPos = smoothMousePositionRef.current

        // Lerp towards target position for smooth movement
        currentSmoothPos.x +=
          (targetMousePos.x - currentSmoothPos.x) * lerpFactor
        currentSmoothPos.y +=
          (targetMousePos.y - currentSmoothPos.y) * lerpFactor

        // Mouse parallax effect - inverted movement (object moves away from cursor)
        const parallaxIntensity = 0.08 // Moderate intensity (between 0.06 and 0.12)
        // Much tighter top constraint to prevent cutoff
        const clampedMouseY = Math.max(-0.95, Math.min(0.4, currentSmoothPos.y)) // Much tighter top (-0.4), looser bottom (-0.95)
        const shiftedMouseY = clampedMouseY * 0.6 // Moderate vertical rotation
        const parallaxX = enableMouseParallax
          ? -shiftedMouseY * parallaxIntensity
          : 0 // Inverted Y movement
        // Horizontal rotation with increased sensitivity and inversion
        const clampedMouseX = Math.max(-0.8, Math.min(0.8, currentSmoothPos.x)) // Constrain horizontal movement
        const shiftedMouseX = clampedMouseX * 0.8 // Increased horizontal sensitivity
        const parallaxY = enableMouseParallax
          ? -shiftedMouseX * parallaxIntensity * -1
          : 0 // Double inverted X movement (reversed direction)

        if (cinematicMode) {
          // Base cinematic rotation
          const baseRotationY = THREE.MathUtils.degToRad(25)
          const baseRotationX = THREE.MathUtils.degToRad(-5)

          // Cinematic idle motion - subtle breathing effect
          const breathingIntensity = 0.002
          const breathingSpeed = 0.0005
          const breathingY =
            Math.sin(time * breathingSpeed) * breathingIntensity
          const breathingX =
            Math.cos(time * breathingSpeed * 0.7) * breathingIntensity * 0.5

          neuralNetworkGroupRef.current.rotation.x =
            baseRotationX +
            breathingX +
            THREE.MathUtils.degToRad(rotationX) +
            parallaxX
          neuralNetworkGroupRef.current.rotation.y =
            baseRotationY +
            breathingY +
            THREE.MathUtils.degToRad(rotationY) +
            parallaxY
          neuralNetworkGroupRef.current.rotation.z =
            THREE.MathUtils.degToRad(rotationZ)
        } else {
          // Direct rotation control with parallax in non-cinematic mode
          neuralNetworkGroupRef.current.rotation.x =
            THREE.MathUtils.degToRad(rotationX) + parallaxX
          neuralNetworkGroupRef.current.rotation.y =
            THREE.MathUtils.degToRad(rotationY) + parallaxY
          neuralNetworkGroupRef.current.rotation.z =
            THREE.MathUtils.degToRad(rotationZ)
        }
      }

      // Very dramatic camera drift/breathing effect
      if (cameraRef.current && !cinematicMode) {
        const driftIntensity = 1.2 // Much more intense drift
        const driftSpeed = 0.008 // Faster and more noticeable
        const driftX = Math.sin(time * driftSpeed) * driftIntensity
        const driftY = Math.cos(time * driftSpeed * 1.3) * driftIntensity * 0.7
        const driftZ = Math.sin(time * driftSpeed * 0.7) * driftIntensity * 0.5

        // Apply drift to camera position (additive to the base position)
        const baseZ = externalCameraDistance || cameraDistance
        cameraRef.current.position.set(driftX, driftY, baseZ + driftZ)

        // Debug: log occasionally to verify it's running
        if (Math.random() < 0.01) {
          console.warn(
            'Camera drift - X:',
            driftX.toFixed(3),
            'Y:',
            driftY.toFixed(3),
            'Z:',
            driftZ.toFixed(3)
          )
        }
      }

      // Gentle node box animation with slow drift and depth-based color shifting
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

      // Track which connections have active particles for line visibility
      const activeConnections = new Set<number>()

      // Animate data particles through network with varied, consistent motion
      particlesRef.current.forEach(particle => {
        const userData = particle.userData
        // Varied particle speeds based on particle ID for more natural flow
        const speedMultiplier = 0.6 + (userData.particleId % 3) * 0.2 // Vary speed by particle type
        userData.progress += userData.speed * speedMultiplier

        // Mark this connection as active
        activeConnections.add(userData.connectionIndex)

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
              // Update emissive to match for consistent glow
              particle.material.emissive.copy(interpolatedColor)
            }
          }
        } else {
          // Particle reached destination, assign new path ensuring consistent layer-to-layer flow
          // Prefer connections that continue the forward flow through the network
          const currentToNode = userData.toNodeIndex

          // Find connections that start from the current destination node (forward flow)
          const forwardConnections = connections
            .map((conn, idx) => ({ conn, idx }))
            .filter(({ conn }) => conn[0] === currentToNode)

          let newConnectionIndex
          if (forwardConnections.length > 0) {
            // Prefer forward connections for consistent flow
            const forwardConn =
              forwardConnections[
                Math.floor(Math.random() * forwardConnections.length)
              ]
            newConnectionIndex = forwardConn.idx
          } else {
            // Fallback to random connection if no forward connection exists
            newConnectionIndex = Math.floor(Math.random() * connections.length)
          }

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

          // Start at new 'from' node position with slight offset for natural flow
          const fromBox = nodeBoxesRef.current[newFromIdx * 2]
          if (fromBox) {
            particle.position.set(
              fromBox.position.x,
              fromBox.position.y,
              fromBox.position.z
            )
          }
        }

        // Varied particle rotation with constant size for better performance
        const rotationSpeed = 0.003 + (userData.particleId % 4) * 0.002 // Vary rotation speeds
        particle.rotation.x += rotationSpeed
        particle.rotation.y += rotationSpeed * 1.5
        particle.rotation.z += rotationSpeed * 0.7

        // Apply constant size variation (calculated once, stored in userData)
        particle.scale.setScalar(userData.sizeVariation)
      })

      // Update connection line visibility based on active particles
      connectionLinesRef.current.forEach((line, index) => {
        const isActive = activeConnections.has(index)
        const targetOpacity = isActive ? 0.4 : 0.15 // Show connections with active particles more prominently

        if (line.material instanceof THREE.LineBasicMaterial) {
          // Smooth opacity transition
          const currentOpacity = line.material.opacity
          const opacityDiff = targetOpacity - currentOpacity
          line.material.opacity = currentOpacity + opacityDiff * 0.15 // Smooth transition
        }
      })

      // Update orbit controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Mouse tracking disabled for stable cinematic mode
    // const handleParallaxMouseMove = (event: MouseEvent) => {
    //   if (cinematicMode) {
    //     const x = event.clientX / window.innerWidth
    //     const y = event.clientY / window.innerHeight
    //     setMousePosition({ x, y })
    //   }
    // }

    // if (cinematicMode) {
    //   window.addEventListener('mousemove', handleParallaxMouseMove)
    // }

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
      if (enableMouseParallax) {
        window.removeEventListener('mousemove', handleParallaxMouseMove)
      }
      try {
        container.removeEventListener('touchstart', handleParallaxTouchStart)
        container.removeEventListener('touchmove', handleParallaxTouchMove)
      } catch {
        void 0
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
    inputLayerSpacing,
    layerSpacing,
    nodeSpacing,
    positionX,
    positionY,
    positionZ,
    cinematicMode,
    positionShift,
    verticalShift,
    rotationX,
    rotationY,
    rotationZ,
    positionX,
    positionY,
    positionZ,
    enableMouseParallax,
    onTransformChange,
    showBoundingBox,
    showOriginMarker,
    // mousePosition.x,
    // mousePosition.y,
  ])

  // Separate effect to update positions when offsets change
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return

    // Update camera position and maintain consistent look-at target
    if (cinematicMode) {
      // Maintain cinematic positioning
      const finalCameraDistance = externalCameraDistance || cameraDistance
      const offsetX = finalCameraDistance * 0.8 + cameraXOffset
      const offsetY = finalCameraDistance * 0.3 + positionY
      const offsetZ = finalCameraDistance * 0.8
      cameraRef.current.position.set(offsetX, offsetY, offsetZ)

      // Consistent look-at target
      const fixedLookAtPoint = new THREE.Vector3(
        -4 + positionShift,
        verticalShift,
        0
      )
      cameraRef.current.lookAt(fixedLookAtPoint)

      // Update controls target to match
      if (controlsRef.current) {
        controlsRef.current.target.set(-4 + positionShift, verticalShift, 0)
      }
    } else {
      cameraRef.current.position.set(cameraXOffset, positionY, cameraDistance)
      cameraRef.current.lookAt(0, 0, 0)
    }

    // Update bounding box position and size based on current network bounds
    if (containerWireframeRef.current) {
      // Recalculate network bounds with current positions
      const centerOffset = -0.625 * layerSpacing
      const networkMinX = layerSpacing * -1.75 + centerOffset + positionX
      const networkMaxX = layerSpacing * 3 + centerOffset + positionX
      const networkMinY = -nodeSpacing * 2 + positionY
      const networkMaxY = nodeSpacing * 2 + positionY
      const networkMinZ = -nodeSpacing * 2 + positionZ
      const networkMaxZ = nodeSpacing * 2 + positionZ

      // Update bounding box position to center of network
      const centerX = (networkMinX + networkMaxX) / 2
      const centerY = (networkMinY + networkMaxY) / 2
      const centerZ = (networkMinZ + networkMaxZ) / 2
      containerWireframeRef.current.position.set(centerX, centerY, centerZ)

      // Update bounding box scale to match current network size
      const networkWidth = networkMaxX - networkMinX
      const networkHeight = networkMaxY - networkMinY
      const networkDepth = networkMaxZ - networkMinZ

      // Update scale to match new bounds (unit cube scaled to actual dimensions)
      containerWireframeRef.current.scale.set(
        networkWidth,
        networkHeight,
        networkDepth
      )
    }

    // Fixed center offset to keep visualization stable when spacing changes
    // Use a fixed reference point so camera doesn't jump when spacing changes
    // Network spans from -1.75 to 3 layerSpacing units, so center is at 0.625
    const centerOffset = -0.625 * layerSpacing // Keep network centered at origin consistently

    // Update node positions (boxes and outlines - every 2 items is a pair)
    const basePositions = [
      // Input Layer (3x3 grid = 9 nodes)
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      // Hidden Layer 1 (12 nodes) - Processing Layer - 4x3 grid
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * 0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
      },
      // Hidden Layer 2 (9 nodes) - Intelligence Layer - 3x3 grid
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: 0 + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * -0.75 + centerOffset + positionX,
        y: -nodeSpacing * 2 + positionY,
        z: -nodeSpacing + positionZ,
      },
      // Hidden Layer 3 (4 nodes) - Control Layer (2x2 grid)
      {
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 1.75 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      // Output Layer (10 nodes) - 5x2 grid
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: nodeSpacing + positionY,
        z: -nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing * 2 + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: 0 + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing + positionZ,
      },
      {
        x: layerSpacing * 3 + centerOffset + positionX,
        y: -nodeSpacing + positionY,
        z: -nodeSpacing * 2 + positionZ,
      },
    ]

    nodeBoxesRef.current.forEach((box, index) => {
      const nodeIndex = Math.floor(index / 2) // Each node has box + outline
      if (basePositions[nodeIndex]) {
        const pos = basePositions[nodeIndex]
        box.position.set(pos.x, pos.y, pos.z)
      }
    })

    // Update connection lines using the same connections array from scene creation
    connectionLinesRef.current.forEach((line, index) => {
      if (connectionsRef.current[index]) {
        const [fromIdx, toIdx] = connectionsRef.current[index]
        const fromNodeIndex = fromIdx * 2 // Multiply by 2 since we have box+outline pairs
        const toNodeIndex = toIdx * 2
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
    positionX,
    positionY,
    positionZ,
    cameraXOffset,
    layerSpacing,
    nodeSpacing,
    inputLayerSpacing,
    cameraDistance,
    cinematicMode,
    positionShift,
    verticalShift,
    externalCameraDistance,
  ])

  // Handle bounding box visibility changes
  useEffect(() => {
    if (containerWireframeRef.current && sceneRef.current) {
      if (showBoundingBox) {
        // Add bounding box to scene if not already present
        if (
          !sceneRef.current.children.includes(containerWireframeRef.current)
        ) {
          sceneRef.current.add(containerWireframeRef.current)
        }
      } else {
        // Remove bounding box from scene
        sceneRef.current.remove(containerWireframeRef.current)
      }
    }
  }, [showBoundingBox])

  // Sync external offset values with internal state
  // useEffect(() => {
  //   setXOffset(externalXOffset)
  //   setYOffset(externalYOffset)
  //   setZOffset(externalZOffset)
  // }, [externalXOffset, externalYOffset, externalZOffset])

  return (
    <div className='relative w-full h-full'>
      <div
        ref={containerRef}
        className='absolute inset-0 w-full h-full overflow-hidden'
        style={{
          cursor: 'default',
          background: 'transparent',
        }}
      />
    </div>
  )
}

export default DataPipeline
