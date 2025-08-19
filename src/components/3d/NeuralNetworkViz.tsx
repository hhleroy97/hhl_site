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

  // Network architecture: Input -> Hidden1 -> Hidden2 -> Output
  const networkStructure = [4, 6, 4, 2] // nodes per layer
  const layerSpacing = 2.5
  const nodeSpacing = 0.8

  // Create neural network nodes
  const createNeurons = (scene: THREE.Scene) => {
    const neurons: THREE.Mesh[] = []
    const layers: THREE.Mesh[][] = []

    networkStructure.forEach((nodeCount, layerIndex) => {
      const layerNodes: THREE.Mesh[] = []
      const x = (layerIndex - (networkStructure.length - 1) / 2) * layerSpacing
      
      for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
        const y = (nodeIndex - (nodeCount - 1) / 2) * nodeSpacing
        
        const geometry = new THREE.SphereGeometry(0.08, 16, 16)
        const material = new THREE.MeshBasicMaterial({
          color: layerIndex === 0 ? 0x00d4aa : // Input layer - teal
                 layerIndex === networkStructure.length - 1 ? 0x8b5cf6 : // Output layer - purple
                 0x0ea5e9, // Hidden layers - blue
          transparent: true,
          opacity: 0.8
        })

        const neuron = new THREE.Mesh(geometry, material)
        neuron.position.set(x, y, 0)
        neuron.userData = {
          layerIndex,
          nodeIndex,
          originalScale: 1,
          activation: 0
        }

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
            opacity: 0.2
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
    
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.SphereGeometry(0.03, 8, 8)
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.9
      })

      const packet = new THREE.Mesh(geometry, material)
      packet.userData = {
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.01,
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
    const cycle = (time * 0.5) % 4 // 4-second cycle

    // Reset all activations
    neuronsRef.current.forEach(neuron => {
      neuron.userData.activation = 0
      neuron.scale.setScalar(neuron.userData.originalScale)
      if (neuron.material instanceof THREE.MeshBasicMaterial) {
        neuron.material.opacity = 0.6
      }
    })

    // Activate layers progressively
    const currentLayer = Math.floor(cycle)
    const layerProgress = cycle - currentLayer

    // Activate current layer
    neuronsRef.current.forEach(neuron => {
      if (neuron.userData.layerIndex === currentLayer) {
        const activation = Math.sin(time * 3 + neuron.userData.nodeIndex * 0.5) * 0.5 + 0.5
        neuron.userData.activation = activation
        neuron.scale.setScalar(1 + activation * 0.3)
        if (neuron.material instanceof THREE.MeshBasicMaterial) {
          neuron.material.opacity = 0.6 + activation * 0.4
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

    // Gentle camera rotation for 3D effect
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(time * 0.1) * 1
      cameraRef.current.position.y = Math.cos(time * 0.15) * 0.5
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

    // Setup camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(2, 1, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4aa, 0.5, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

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
        <div className="bg-tech-dark/80 px-2 py-1 rounded">
          Neural Network: [4-6-4-2]
        </div>
      </div>
    </div>
  )
}

export default NeuralNetworkViz