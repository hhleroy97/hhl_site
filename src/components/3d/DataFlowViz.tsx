import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DataFlowVizProps {
  className?: string
}

const DataFlowViz: React.FC<DataFlowVizProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const dataSourcesRef = useRef<THREE.Mesh[]>([])
  const dataTargetsRef = useRef<THREE.Mesh[]>([])
  const dataPacketsRef = useRef<THREE.Mesh[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])

  // Create data sources (leftmost)
  const createDataSources = (scene: THREE.Scene) => {
    const sources: THREE.Mesh[] = []
    const sourceTypes = [
      { name: 'Raw Data', color: 0x00d4aa, y: 1 },
      { name: 'Sensor Feed', color: 0x0ea5e9, y: -1 }
    ]

    sourceTypes.forEach((source, index) => {
      const geometry = new THREE.SphereGeometry(0.15, 16, 16)
      const material = new THREE.MeshStandardMaterial({
        color: source.color,
        emissive: source.color,
        emissiveIntensity: 0.1,
        metalness: 0.3,
        roughness: 0.4
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(-5, source.y, 0)
      node.userData = {
        type: 'source',
        name: source.name,
        color: source.color,
        index,
        stage: 0
      }

      scene.add(node)
      sources.push(node)
    })

    return sources
  }

  // Create processing stages (like golf course holes)
  const createProcessingStages = (scene: THREE.Scene) => {
    const stages: THREE.Mesh[] = []
    const stageTypes = [
      { name: 'Data Cleaning', color: 0x06b6d4, x: -2.5, shape: 'cylinder' },
      { name: 'AI Analysis', color: 0x8b5cf6, x: 0, shape: 'octahedron' },
      { name: 'ML Processing', color: 0xffd93d, x: 2.5, shape: 'cone' },
      { name: 'Output', color: 0xff6b6b, x: 5, shape: 'box' }
    ]

    stageTypes.forEach((stage, index) => {
      let geometry: THREE.BufferGeometry
      
      switch (stage.shape) {
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8)
          break
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.25)
          break
        case 'cone':
          geometry = new THREE.ConeGeometry(0.2, 0.6, 8)
          break
        default:
          geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
      }

      const material = new THREE.MeshStandardMaterial({
        color: stage.color,
        emissive: stage.color,
        emissiveIntensity: 0.15,
        metalness: 0.4,
        roughness: 0.3
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(stage.x, 0, 0)
      node.userData = {
        type: 'stage',
        name: stage.name,
        color: stage.color,
        index,
        stage: index + 1,
        isAI: stage.name.includes('AI') || stage.name.includes('ML')
      }

      // Add AI indicator for AI stages
      if (node.userData.isAI) {
        const aiGeometry = new THREE.RingGeometry(0.35, 0.4, 8)
        const aiMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.6
        })
        const aiRing = new THREE.Mesh(aiGeometry, aiMaterial)
        aiRing.rotation.x = Math.PI / 2
        node.add(aiRing)
      }

      scene.add(node)
      stages.push(node)
    })

    return stages
  }

  // Create stage-to-stage connections (pipeline flow)
  const createConnections = (scene: THREE.Scene, allNodes: THREE.Mesh[]) => {
    const connections: THREE.Line[] = []

    // Sort nodes by stage (x position)
    const sortedNodes = [...allNodes].sort((a, b) => a.position.x - b.position.x)

    // Connect each stage to the next
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const currentStage = sortedNodes[i]
      const nextStage = sortedNodes[i + 1]

      // Sources connect to first processing stage
      if (currentStage.userData.type === 'source') {
        const firstProcessingStage = sortedNodes.find(n => n.userData.type === 'stage')
        if (firstProcessingStage) {
          const connection = createConnection(scene, currentStage, firstProcessingStage)
          connections.push(connection)
        }
      }
      // Stages connect to next stage
      else if (currentStage.userData.type === 'stage' && nextStage.userData.type === 'stage') {
        const connection = createConnection(scene, currentStage, nextStage)
        connections.push(connection)
      }
    }

    return connections
  }

  // Helper function to create individual connections
  const createConnection = (scene: THREE.Scene, from: THREE.Mesh, to: THREE.Mesh) => {
    const startPos = from.position.clone()
    const endPos = to.position.clone()
    const midPoint = new THREE.Vector3(
      (startPos.x + endPos.x) / 2,
      (startPos.y + endPos.y) / 2 + Math.sin((startPos.x + endPos.x) * 0.5) * 0.3,
      Math.sin((startPos.x - endPos.x) * 0.3) * 0.2
    )

    const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos)
    const points = curve.getPoints(25)

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: 0x404040,
      transparent: true,
      opacity: 0.4
    })

    const line = new THREE.Line(geometry, material)
    line.userData = {
      from,
      to,
      curve,
      points,
      active: false,
      isAIStage: to.userData.isAI
    }

    scene.add(line)
    return line
  }

  // Create flowing data packets
  const createDataPackets = (scene: THREE.Scene, connections: THREE.Line[]) => {
    const packets: THREE.Mesh[] = []

    // Create packets for each connection
    connections.forEach((connection, connIndex) => {
      for (let i = 0; i < 2; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8)
        const sourceColor = connection.userData.from.userData.color
        
        // Special packet appearance for AI stages
        const material = connection.userData.isAIStage 
          ? new THREE.MeshStandardMaterial({
              color: 0x00ffff,
              emissive: 0x00ffff,
              emissiveIntensity: 0.3,
              transparent: true,
              opacity: 0.9
            })
          : new THREE.MeshBasicMaterial({
              color: sourceColor,
              transparent: true,
              opacity: 0.8
            })

        const packet = new THREE.Mesh(geometry, material)
        packet.userData = {
          connection,
          progress: (i / 2) + Math.random() * 0.3,
          speed: 0.01 + Math.random() * 0.005,
          sourceColor,
          isAIPacket: connection.userData.isAIStage,
          active: false
        }

        scene.add(packet)
        packets.push(packet)
      }
    })

    return packets
  }

  // Add stage labels
  const createLabels = (scene: THREE.Scene) => {
    const stageLabels = [
      { text: 'RAW DATA', x: -5, color: '#00d4aa' },
      { text: 'CLEANING', x: -2.5, color: '#06b6d4' },
      { text: 'AI ANALYSIS', x: 0, color: '#8b5cf6' },
      { text: 'ML PROCESS', x: 2.5, color: '#ffd93d' },
      { text: 'OUTPUT', x: 5, color: '#ff6b6b' }
    ]

    stageLabels.forEach((stage, index) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 128
      canvas.height = 32
      
      context.fillStyle = stage.color
      context.font = '11px monospace'
      context.textAlign = 'center'
      context.fillText(stage.text, 64, 20)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(stage.x, -1.8, 0)
      sprite.scale.set(1.2, 0.3, 1)
      scene.add(sprite)
    })
  }

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = clockRef.current.getElapsedTime()

    // Animate source nodes
    dataSourcesRef.current.forEach((source, index) => {
      const pulse = Math.sin(time * 2 + index * 0.5) * 0.1 + 1
      source.scale.setScalar(pulse)
      
      if (source.material instanceof THREE.MeshStandardMaterial) {
        source.material.emissiveIntensity = 0.1 + Math.sin(time * 3 + index) * 0.1
      }
    })

    // Animate processing stages
    dataTargetsRef.current.forEach((stage, index) => {
      // AI stages get special animation
      if (stage.userData.isAI) {
        stage.rotation.y = time * 1.5
        const aiPulse = Math.sin(time * 4 + index) * 0.2 + 1
        stage.scale.setScalar(aiPulse)
        
        if (stage.material instanceof THREE.MeshStandardMaterial) {
          stage.material.emissiveIntensity = 0.2 + Math.sin(time * 3 + index) * 0.2
        }
        
        // Animate AI ring
        if (stage.children.length > 0) {
          const aiRing = stage.children[0]
          aiRing.rotation.z = time * 2
        }
      } else {
        stage.rotation.y = time * 0.3 + index
        if (stage.material instanceof THREE.MeshStandardMaterial) {
          stage.material.emissiveIntensity = 0.1 + Math.sin(time * 2 + index) * 0.1
        }
      }
    })

    // Animate connections
    connectionsRef.current.forEach((connection, index) => {
      const activity = Math.sin(time * 1.5 + index * 0.3) * 0.5 + 0.5
      if (connection.material instanceof THREE.LineBasicMaterial) {
        connection.material.opacity = 0.4 + activity * 0.3
        
        // AI connections get special color treatment
        if (connection.userData.isAIStage && activity > 0.6) {
          connection.material.color.setHex(0x00ffff)
        } else if (activity > 0.7) {
          connection.material.color.setHex(connection.userData.from.userData.color)
        } else {
          connection.material.color.setHex(0x404040)
        }
      }
    })

    // Animate data packets flowing through pipeline
    dataPacketsRef.current.forEach((packet, index) => {
      const connection = packet.userData.connection
      const curve = connection.userData.curve
      
      // Update packet position along curve
      packet.userData.progress += packet.userData.speed
      if (packet.userData.progress >= 1) {
        packet.userData.progress = 0
      }

      const position = curve.getPoint(packet.userData.progress)
      packet.position.copy(position)

      // Special effects for AI packets
      if (packet.userData.isAIPacket) {
        const aiPulse = 1 + Math.sin(time * 8 + index) * 0.4
        packet.scale.setScalar(aiPulse)
        
        if (packet.material instanceof THREE.MeshStandardMaterial) {
          packet.material.emissiveIntensity = 0.3 + Math.sin(time * 6 + index) * 0.2
        }
      } else {
        const pulse = 1 + Math.sin(time * 10 + index) * 0.2
        packet.scale.setScalar(pulse)
      }

      // Flash destination when packet arrives
      if (packet.userData.progress > 0.9) {
        const target = connection.userData.to
        if (target.material instanceof THREE.MeshStandardMaterial) {
          target.material.emissiveIntensity = Math.max(target.material.emissiveIntensity, 0.4)
        }
      }
    })

    // Gentle camera movement
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(time * 0.1) * 0.5
      cameraRef.current.position.y = 1 + Math.cos(time * 0.15) * 0.3
      cameraRef.current.lookAt(0, 0, 0)
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
    animationRef.current = requestAnimationFrame(animate)
  }

  // Cleanup function
  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
    }

    rendererRef.current?.dispose()
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = null
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
    camera.position.set(0, 1, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(0xffffff, 1, 50)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    // Create the multi-stage data pipeline
    dataSourcesRef.current = createDataSources(scene)
    dataTargetsRef.current = createProcessingStages(scene)
    
    // Combine all nodes for connection creation
    const allNodes = [...dataSourcesRef.current, ...dataTargetsRef.current]
    connectionsRef.current = createConnections(scene, allNodes)
    dataPacketsRef.current = createDataPackets(scene, connectionsRef.current)
    createLabels(scene)

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
      
      {/* Data pipeline info */}
      <div className="absolute bottom-4 left-4 text-xs text-tech-text-muted font-mono">
        <div className="bg-tech-dark/90 px-3 py-2 rounded-lg border border-tech-teal/30">
          <div className="text-tech-teal font-semibold">AI Data Pipeline</div>
          <div className="text-tech-text-secondary">5-Stage Processing</div>
          <div className="text-tech-text-muted text-[10px] mt-1">Raw → Clean → AI → ML → Output</div>
        </div>
      </div>
    </div>
  )
}

export default DataFlowViz