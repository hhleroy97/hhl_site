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

  // Create data sources (left side)
  const createDataSources = (scene: THREE.Scene) => {
    const sources: THREE.Mesh[] = []
    const sourceTypes = [
      { name: 'Sensors', color: 0x00d4aa, y: 2 },
      { name: 'IoT Devices', color: 0x0ea5e9, y: 0.5 },
      { name: 'User Input', color: 0x8b5cf6, y: -1 },
      { name: 'API Data', color: 0x06b6d4, y: -2.5 }
    ]

    sourceTypes.forEach((source, index) => {
      // Main source node
      const geometry = new THREE.SphereGeometry(0.2, 16, 16)
      const material = new THREE.MeshStandardMaterial({
        color: source.color,
        emissive: source.color,
        emissiveIntensity: 0.1,
        metalness: 0.3,
        roughness: 0.4
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(-4, source.y, 0)
      node.userData = {
        type: 'source',
        name: source.name,
        color: source.color,
        index
      }

      // Add pulsing glow
      const glowGeometry = new THREE.SphereGeometry(0.3, 12, 12)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: source.color,
        transparent: true,
        opacity: 0.2
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      node.add(glow)

      scene.add(node)
      sources.push(node)
    })

    return sources
  }

  // Create data destinations (right side)
  const createDataTargets = (scene: THREE.Scene) => {
    const targets: THREE.Mesh[] = []
    const targetTypes = [
      { name: 'Cloud Database', color: 0xff6b6b, y: 1.5 },
      { name: 'Analytics Engine', color: 0xffd93d, y: 0 },
      { name: 'ML Pipeline', color: 0x6bcf7f, y: -1.5 }
    ]

    targetTypes.forEach((target, index) => {
      // Main target node
      const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
      const material = new THREE.MeshStandardMaterial({
        color: target.color,
        emissive: target.color,
        emissiveIntensity: 0.1,
        metalness: 0.4,
        roughness: 0.3
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(4, target.y, 0)
      node.userData = {
        type: 'target',
        name: target.name,
        color: target.color,
        index
      }

      // Add rotating glow
      const glowGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: target.color,
        transparent: true,
        opacity: 0.15,
        wireframe: true
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      node.add(glow)

      scene.add(node)
      targets.push(node)
    })

    return targets
  }

  // Create connection paths
  const createConnections = (scene: THREE.Scene, sources: THREE.Mesh[], targets: THREE.Mesh[]) => {
    const connections: THREE.Line[] = []

    sources.forEach(source => {
      targets.forEach(target => {
        // Create curved path
        const startPos = source.position.clone()
        const endPos = target.position.clone()
        const midPoint = new THREE.Vector3(
          (startPos.x + endPos.x) / 2,
          (startPos.y + endPos.y) / 2 + Math.random() * 1 - 0.5,
          Math.sin((startPos.y + endPos.y) * 0.5) * 0.5
        )

        const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos)
        const points = curve.getPoints(20)

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x404040,
          transparent: true,
          opacity: 0.3
        })

        const line = new THREE.Line(geometry, material)
        line.userData = {
          source,
          target,
          curve,
          points,
          active: false
        }

        scene.add(line)
        connections.push(line)
      })
    })

    return connections
  }

  // Create flowing data packets
  const createDataPackets = (scene: THREE.Scene, connections: THREE.Line[]) => {
    const packets: THREE.Mesh[] = []

    // Create multiple packets per connection
    connections.forEach((connection, connIndex) => {
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.SphereGeometry(0.04, 8, 8)
        const sourceColor = connection.userData.source.userData.color
        const material = new THREE.MeshBasicMaterial({
          color: sourceColor,
          transparent: true,
          opacity: 0.9
        })

        const packet = new THREE.Mesh(geometry, material)
        packet.userData = {
          connection,
          progress: (i / 3) + Math.random() * 0.2,
          speed: 0.008 + Math.random() * 0.004,
          sourceColor,
          active: false
        }

        scene.add(packet)
        packets.push(packet)
      }
    })

    return packets
  }

  // Add data labels
  const createLabels = (scene: THREE.Scene) => {
    // Source labels
    const sourceLabels = ['SENSORS', 'IoT', 'USERS', 'APIs']
    sourceLabels.forEach((label, index) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 128
      canvas.height = 32
      
      context.fillStyle = '#00d4aa'
      context.font = '14px monospace'
      context.textAlign = 'center'
      context.fillText(label, 64, 20)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(-4, 2 - index * 1.2 + 0.4, 0)
      sprite.scale.set(1, 0.25, 1)
      scene.add(sprite)
    })

    // Target labels
    const targetLabels = ['DATABASE', 'ANALYTICS', 'ML MODEL']
    targetLabels.forEach((label, index) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 128
      canvas.height = 32
      
      context.fillStyle = '#8b5cf6'
      context.font = '12px monospace'
      context.textAlign = 'center'
      context.fillText(label, 64, 20)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(4, 1.5 - index * 1.5 + 0.4, 0)
      sprite.scale.set(1, 0.25, 1)
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

    // Animate target nodes
    dataTargetsRef.current.forEach((target, index) => {
      target.rotation.y = time * 0.5 + index
      target.rotation.x = Math.sin(time + index) * 0.2
      
      if (target.material instanceof THREE.MeshStandardMaterial) {
        target.material.emissiveIntensity = 0.1 + Math.sin(time * 2.5 + index) * 0.1
      }
    })

    // Animate connections
    connectionsRef.current.forEach((connection, index) => {
      const activity = Math.sin(time * 1.5 + index * 0.3) * 0.5 + 0.5
      if (connection.material instanceof THREE.LineBasicMaterial) {
        connection.material.opacity = 0.3 + activity * 0.4
        if (activity > 0.7) {
          connection.material.color.setHex(connection.userData.source.userData.color)
        } else {
          connection.material.color.setHex(0x404040)
        }
      }
    })

    // Animate data packets
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

      // Pulse effect
      const pulse = 1 + Math.sin(time * 10 + index) * 0.3
      packet.scale.setScalar(pulse)

      // Flash when reaching target
      if (packet.userData.progress > 0.9) {
        const target = connection.userData.target
        if (target.material instanceof THREE.MeshStandardMaterial) {
          target.material.emissiveIntensity = 0.3
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

    // Create the data flow system
    dataSourcesRef.current = createDataSources(scene)
    dataTargetsRef.current = createDataTargets(scene)
    connectionsRef.current = createConnections(scene, dataSourcesRef.current, dataTargetsRef.current)
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
      
      {/* Data flow info */}
      <div className="absolute bottom-4 left-4 text-xs text-tech-text-muted font-mono">
        <div className="bg-tech-dark/90 px-3 py-2 rounded-lg border border-tech-teal/30">
          <div className="text-tech-teal font-semibold">Data Pipeline</div>
          <div className="text-tech-text-secondary">Real-time Processing</div>
          <div className="text-tech-text-muted text-[10px] mt-1">Multi-source → Multi-destination</div>
        </div>
      </div>
    </div>
  )
}

export default DataFlowViz