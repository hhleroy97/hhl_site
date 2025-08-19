import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface NeuralNetworkVizProps {
  className?: string
}

const NeuralNetworkViz: React.FC<NeuralNetworkVizProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const neuronsRef = useRef<THREE.Mesh[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])
  const dataPacketsRef = useRef<THREE.Mesh[]>([])

  // Network architecture: Input -> Hidden1 -> Hidden2 -> Hidden3 -> Output
  const networkStructure = [8, 12, 16, 12, 6] // nodes per layer
  const layerSpacing = 3.5
  const nodeSpacing = 0.6

  // Create neural network nodes
  const createNeurons = (scene: THREE.Scene) => {
    const neurons: THREE.Mesh[] = []
    const layers: THREE.Mesh[][] = []

    networkStructure.forEach((nodeCount, layerIndex) => {
      const layerNodes: THREE.Mesh[] = []
      const x = (layerIndex - (networkStructure.length - 1) / 2) * layerSpacing
      
      for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
        // Create 3D arrangement in cylindrical formation
        const angle = (nodeIndex / nodeCount) * Math.PI * 2
        const radius = Math.min(nodeCount * 0.12, 2.5)
        const y = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        // Larger neurons with better 3D geometry
        const geometry = new THREE.SphereGeometry(0.12, 20, 20)
        
        // Dynamic colors based on layer depth
        let color: number
        if (layerIndex === 0) color = 0x00d4aa // Input - teal
        else if (layerIndex === networkStructure.length - 1) color = 0xff6b6b // Output - red
        else if (layerIndex === 1) color = 0x0ea5e9 // Hidden 1 - blue
        else if (layerIndex === 2) color = 0x8b5cf6 // Hidden 2 - purple
        else color = 0x06b6d4 // Hidden 3 - cyan
        
        const material = new THREE.MeshStandardMaterial({
          color,
          metalness: 0.3,
          roughness: 0.4,
          emissive: color,
          emissiveIntensity: 0.1,
          transparent: true,
          opacity: 0.9
        })

        const neuron = new THREE.Mesh(geometry, material)
        neuron.position.set(x, y, z)
        neuron.userData = {
          layerIndex,
          nodeIndex,
          originalPosition: neuron.position.clone(),
          originalScale: 1,
          activation: 0,
          angle,
          radius
        }

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.18, 12, 12)
        const glowMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.1
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        neuron.add(glow)

        scene.add(neuron)
        neurons.push(neuron)
        layerNodes.push(neuron)
      }
      layers.push(layerNodes)
    })

    return { neurons, layers }
  }

  // Create connections between layers
  const createConnections = (scene: THREE.Scene, layers: THREE.Mesh[][]) => {
    const connections: THREE.Line[] = []

    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayer = layers[layerIndex]
      const nextLayer = layers[layerIndex + 1]

      currentLayer.forEach(fromNeuron => {
        nextLayer.forEach(toNeuron => {
          const points = [
            fromNeuron.position.clone(),
            toNeuron.position.clone()
          ]

          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          const material = new THREE.LineBasicMaterial({
            color: 0x404040,
            transparent: true,
            opacity: 0.15,
            linewidth: 2
          })

          const connection = new THREE.Line(geometry, material)
          connection.userData = {
            fromNeuron,
            toNeuron,
            weight: Math.random() * 0.5 + 0.25,
            active: false
          }

          scene.add(connection)
          connections.push(connection)
        })
      })
    }

    return connections
  }

  // Create data packets that flow through the network
  const createDataPackets = (scene: THREE.Scene) => {
    const packets: THREE.Mesh[] = []
    
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.04, 12, 12)
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ffcc,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x00ffcc,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9
      })

      const packet = new THREE.Mesh(geometry, material)
      packet.userData = {
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
        currentLayer: 0,
        targetLayer: 1,
        path: [],
        active: false
      }

      scene.add(packet)
      packets.push(packet)
    }

    return packets
  }

  // Simulate forward propagation animation
  const simulateForwardPass = (time: number) => {
    const cycle = (time * 0.3) % (networkStructure.length + 1) // Slower, more dramatic

    // Reset all activations
    neuronsRef.current.forEach(neuron => {
      neuron.userData.activation = 0
      neuron.scale.setScalar(neuron.userData.originalScale)
      
      // Add subtle rotation to neurons
      neuron.rotation.x = time * 0.5 + neuron.userData.nodeIndex * 0.2
      neuron.rotation.y = time * 0.3 + neuron.userData.layerIndex * 0.4
      
      if (neuron.material instanceof THREE.MeshStandardMaterial) {
        neuron.material.opacity = 0.7
        neuron.material.emissiveIntensity = 0.05
      }
    })

    // Activate layers progressively with wave effects
    const currentLayer = Math.floor(cycle)
    const layerProgress = cycle - currentLayer

    // Activate current layer with dramatic effects
    neuronsRef.current.forEach(neuron => {
      if (neuron.userData.layerIndex === currentLayer) {
        const wave = Math.sin(time * 2 + neuron.userData.angle * 3) * 0.5 + 0.5
        const activation = wave * (0.8 + Math.sin(time * 4 + neuron.userData.nodeIndex) * 0.2)
        
        neuron.userData.activation = activation
        neuron.scale.setScalar(1 + activation * 0.6)
        
        // Pulse neuron positions outward
        const pulseFactor = 1 + activation * 0.2
        neuron.position.copy(neuron.userData.originalPosition).multiplyScalar(pulseFactor)
        
        if (neuron.material instanceof THREE.MeshStandardMaterial) {
          neuron.material.opacity = 0.7 + activation * 0.3
          neuron.material.emissiveIntensity = 0.1 + activation * 0.4
        }
      }
    })

    // Animate connections
    connectionsRef.current.forEach(connection => {
      const fromLayer = connection.userData.fromNeuron.userData.layerIndex
      const toLayer = connection.userData.toNeuron.userData.layerIndex
      
      connection.userData.active = (fromLayer === currentLayer && toLayer === currentLayer + 1)
      
      if (connection.material instanceof THREE.LineBasicMaterial) {
        if (connection.userData.active) {
          const intensity = layerProgress * connection.userData.weight
          connection.material.opacity = 0.1 + intensity * 0.8
          connection.material.color.setHex(0x00d4aa)
        } else {
          connection.material.opacity = 0.1
          connection.material.color.setHex(0x404040)
        }
      }
    })

    // Animate data packets along connections
    dataPacketsRef.current.forEach((packet, index) => {
      const packetCycle = (time * 0.5 + index * 0.5) % 4
      const packetLayer = Math.floor(packetCycle)
      const packetProgress = packetCycle - packetLayer

      if (packetLayer < networkStructure.length - 1) {
        packet.visible = true
        
        // Find source and target neurons
        const layerStart = neuronsRef.current.filter(n => n.userData.layerIndex === packetLayer)
        const layerEnd = neuronsRef.current.filter(n => n.userData.layerIndex === packetLayer + 1)
        
        if (layerStart.length > 0 && layerEnd.length > 0) {
          const sourceNeuron = layerStart[index % layerStart.length]
          const targetNeuron = layerEnd[index % layerEnd.length]
          
          // Interpolate position
          packet.position.lerpVectors(
            sourceNeuron.position,
            targetNeuron.position,
            packetProgress
          )
          
          // Vary opacity for flow effect
          if (packet.material instanceof THREE.MeshBasicMaterial) {
            packet.material.opacity = 0.8 + Math.sin(packetProgress * Math.PI) * 0.2
          }
        }
      } else {
        packet.visible = false
      }
    })
  }

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = clockRef.current.getElapsedTime()

    // Run forward propagation simulation
    simulateForwardPass(time)

    // Dynamic camera movement for maximum impact
    if (cameraRef.current) {
      const radius = 12 + Math.sin(time * 0.2) * 2
      cameraRef.current.position.x = Math.sin(time * 0.1) * radius * 0.7
      cameraRef.current.position.y = 4 + Math.cos(time * 0.15) * 2
      cameraRef.current.position.z = Math.cos(time * 0.1) * radius
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
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
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

    // Setup camera for dramatic 3D view
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(8, 4, 12)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Setup dramatic lighting
    const ambientLight = new THREE.AmbientLight(0x111111, 0.3)
    scene.add(ambientLight)

    // Multiple colored lights for depth
    const light1 = new THREE.PointLight(0x00d4aa, 2, 50)
    light1.position.set(10, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x8b5cf6, 1.5, 50)
    light2.position.set(-10, -5, 5)
    scene.add(light2)

    const light3 = new THREE.PointLight(0x0ea5e9, 1, 50)
    light3.position.set(0, 10, -5)
    scene.add(light3)

    // Directional light for overall illumination
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create the neural network
    const { neurons, layers } = createNeurons(scene)
    neuronsRef.current = neurons
    
    connectionsRef.current = createConnections(scene, layers)
    dataPacketsRef.current = createDataPackets(scene)

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
      
      {/* Network architecture labels */}
      <div className="absolute bottom-4 left-4 text-xs text-tech-text-muted font-mono">
        <div className="bg-tech-dark/90 px-3 py-2 rounded-lg border border-tech-teal/30">
          <div className="text-tech-teal font-semibold">Deep Neural Network</div>
          <div className="text-tech-text-secondary">[8-12-16-12-6] Architecture</div>
          <div className="text-tech-text-muted text-[10px] mt-1">Forward Propagation Active</div>
        </div>
      </div>
    </div>
  )
}

export default NeuralNetworkViz