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

  // Create data sources (left side) - Real cloud systems you've used
  const createDataSources = (scene: THREE.Scene) => {
    const sources: THREE.Mesh[] = []
    const sourceTypes = [
      { name: 'IoT Devices', color: 0x00d4aa, y: 2, aws: 'IoT Core' },
      { name: 'Drone Telemetry', color: 0x0ea5e9, y: 0.5, aws: 'Kinesis' },
      { name: 'ROS2 Sensors', color: 0x8b5cf6, y: -1, aws: 'MQTT Bridge' },
      { name: 'API Streams', color: 0x06b6d4, y: -2.5, aws: 'API Gateway' },
    ]

    sourceTypes.forEach((source, index) => {
      // Main source node
      const geometry = new THREE.SphereGeometry(0.2, 16, 16)
      const material = new THREE.MeshStandardMaterial({
        color: source.color,
        emissive: source.color,
        emissiveIntensity: 0.1,
        metalness: 0.3,
        roughness: 0.4,
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(-4, source.y, 0)
      node.userData = {
        type: 'source',
        name: source.name,
        color: source.color,
        awsService: source.aws,
        index,
      }

      // Add AWS cloud indicator
      const cloudGeometry = new THREE.RingGeometry(0.25, 0.3, 8)
      const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xff9500, // AWS orange
        transparent: true,
        opacity: 0.4,
      })
      const cloudRing = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloudRing.rotation.x = Math.PI / 2
      node.add(cloudRing)

      scene.add(node)
      sources.push(node)
    })

    return sources
  }

  // Create cloud data destinations (right side) - Real AWS services you've architected
  const createCloudDestinations = (scene: THREE.Scene) => {
    const destinations: THREE.Mesh[] = []
    const destTypes = [
      {
        name: 'S3 Data Lake',
        color: 0xff6b6b,
        y: 1.5,
        aws: 'S3 + Athena',
        value: '$500K',
      },
      {
        name: 'Real-time Analytics',
        color: 0xffd93d,
        y: 0,
        aws: 'Kinesis + Glue',
        value: 'Pipeline',
      },
      {
        name: 'ML Training',
        color: 0x6bcf7f,
        y: -1.5,
        aws: 'SageMaker',
        value: 'ROS2',
      },
    ]

    destTypes.forEach((dest, index) => {
      // Main destination node
      const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
      const material = new THREE.MeshStandardMaterial({
        color: dest.color,
        emissive: dest.color,
        emissiveIntensity: 0.1,
        metalness: 0.4,
        roughness: 0.3,
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.set(4, dest.y, 0)
      node.userData = {
        type: 'destination',
        name: dest.name,
        color: dest.color,
        awsService: dest.aws,
        businessValue: dest.value,
        index,
      }

      // Add AWS cloud infrastructure indicator
      const awsGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      const awsMaterial = new THREE.MeshBasicMaterial({
        color: 0xff9500, // AWS orange
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      })
      const awsFrame = new THREE.Mesh(awsGeometry, awsMaterial)
      node.add(awsFrame)

      scene.add(node)
      destinations.push(node)
    })

    return destinations
  }

  // Create cloud connections between sources and destinations
  const createConnections = (
    scene: THREE.Scene,
    sources: THREE.Mesh[],
    destinations: THREE.Mesh[]
  ) => {
    const connections: THREE.Line[] = []

    sources.forEach(source => {
      destinations.forEach(destination => {
        // Create curved cloud data flow path
        const startPos = source.position.clone()
        const endPos = destination.position.clone()
        const midPoint = new THREE.Vector3(
          (startPos.x + endPos.x) / 2,
          (startPos.y + endPos.y) / 2 + Math.random() * 1 - 0.5,
          Math.sin((startPos.y + endPos.y) * 0.5) * 0.5
        )

        const curve = new THREE.QuadraticBezierCurve3(
          startPos,
          midPoint,
          endPos
        )
        const points = curve.getPoints(20)

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x404040,
          transparent: true,
          opacity: 0.3,
        })

        const line = new THREE.Line(geometry, material)
        line.userData = {
          source,
          destination,
          curve,
          points,
          active: false,
          awsService: destination.userData.awsService,
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

    // Create packets for each connection
    connections.forEach((connection, _connIndex) => {
      for (let i = 0; i < 2; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8)
        const sourceColor = connection.userData.source.userData.color

        // Cloud data packets with AWS styling
        const material = new THREE.MeshBasicMaterial({
          color: sourceColor,
          transparent: true,
          opacity: 0.8,
        })

        const packet = new THREE.Mesh(geometry, material)
        packet.userData = {
          connection,
          progress: i / 2 + Math.random() * 0.3,
          speed: 0.01 + Math.random() * 0.005,
          sourceColor,
          awsService: connection.userData.awsService,
          active: false,
        }

        scene.add(packet)
        packets.push(packet)
      }
    })

    return packets
  }

  // Add cloud architecture labels
  const createLabels = (scene: THREE.Scene) => {
    const cloudLabels = [
      { text: 'EDGE DEVICES', x: -4, y: 2.8, color: '#00d4aa' },
      { text: 'AWS CLOUD', x: 4, y: 2.8, color: '#ff9500' },
      {
        text: 'IoT → S3 Pipeline',
        x: 0,
        y: -2.8,
        color: '#0ea5e9',
        size: '9px',
      },
    ]

    cloudLabels.forEach((label, _index) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 160
      canvas.height = 32

      context.fillStyle = label.color
      context.font = `${label.size || '11px'} monospace`
      context.textAlign = 'center'
      context.fillText(label.text, 80, 20)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(label.x, label.y, 0)
      sprite.scale.set(1.4, 0.35, 1)
      scene.add(sprite)
    })
  }

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = clockRef.current.getElapsedTime()

    // Animate source nodes (Edge devices)
    dataSourcesRef.current.forEach((source, index) => {
      const pulse = Math.sin(time * 2 + index * 0.5) * 0.1 + 1
      source.scale.setScalar(pulse)

      if (source.material instanceof THREE.MeshStandardMaterial) {
        source.material.emissiveIntensity =
          0.1 + Math.sin(time * 3 + index) * 0.1
      }

      // Animate AWS cloud indicators
      if (source.children.length > 0) {
        const cloudRing = source.children[0]
        cloudRing.rotation.z = time * 1.2 + index * 0.3
      }
    })

    // Animate cloud destinations (AWS services)
    dataTargetsRef.current.forEach((destination, index) => {
      destination.rotation.y = time * 0.4 + index * 0.6

      if (destination.material instanceof THREE.MeshStandardMaterial) {
        destination.material.emissiveIntensity =
          0.1 + Math.sin(time * 2 + index) * 0.1
      }

      // Animate AWS infrastructure indicators
      if (destination.children.length > 0) {
        const awsFrame = destination.children[0]
        awsFrame.rotation.x = time * 0.5
        awsFrame.rotation.y = time * 0.3
      }
    })

    // Animate cloud connections
    connectionsRef.current.forEach((connection, index) => {
      const activity = Math.sin(time * 1.5 + index * 0.3) * 0.5 + 0.5
      if (connection.material instanceof THREE.LineBasicMaterial) {
        connection.material.opacity = 0.3 + activity * 0.4

        // AWS connections get special color treatment
        if (activity > 0.7) {
          connection.material.color.setHex(0xff9500) // AWS orange for active connections
        } else if (activity > 0.5) {
          connection.material.color.setHex(
            connection.userData.source.userData.color
          )
        } else {
          connection.material.color.setHex(0x404040)
        }
      }
    })

    // Animate data packets flowing through cloud
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

      // Cloud data packet effects
      const pulse = 1 + Math.sin(time * 8 + index) * 0.3
      packet.scale.setScalar(pulse)

      // Add AWS glow when packet is in transit
      if (packet.userData.progress > 0.3 && packet.userData.progress < 0.7) {
        if (packet.material instanceof THREE.MeshBasicMaterial) {
          packet.material.opacity = 0.9
        }
      } else {
        if (packet.material instanceof THREE.MeshBasicMaterial) {
          packet.material.opacity = 0.6
        }
      }

      // Flash AWS destination when packet arrives
      if (packet.userData.progress > 0.9) {
        const target = connection.userData.destination
        if (target.material instanceof THREE.MeshStandardMaterial) {
          target.material.emissiveIntensity = Math.max(
            target.material.emissiveIntensity,
            0.4
          )
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
      sceneRef.current.traverse(object => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Sprite
        ) {
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
      alpha: true,
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

    // Create the cloud data flow architecture
    dataSourcesRef.current = createDataSources(scene)
    dataTargetsRef.current = createCloudDestinations(scene)

    // Create connections between sources and cloud destinations
    connectionsRef.current = createConnections(
      scene,
      dataSourcesRef.current,
      dataTargetsRef.current
    )
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
        className='w-full h-full'
        style={{
          background: 'transparent',
        }}
      />

      {/* Cloud architecture info */}
      <div className='absolute bottom-4 left-4 text-xs text-tech-text-muted font-mono'>
        <div className='bg-tech-dark/90 px-3 py-2 rounded-lg border border-tech-teal/30'>
          <div className='text-tech-teal font-semibold'>
            Cloud Data Architecture
          </div>
          <div className='text-tech-text-secondary'>IoT → AWS Pipeline</div>
          <div className='text-tech-text-muted text-[10px] mt-1'>
            Edge → Cloud → Analytics
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataFlowViz
