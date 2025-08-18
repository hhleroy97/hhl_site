import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

interface NetworkNode {
  id: string
  position: [number, number, number]
  label: string
  color: string
  size: number
  connections: string[]
}

interface NetworkVisualizationProps {
  mousePosition: { x: number; y: number }
}

export default function NetworkVisualization({
  mousePosition,
}: NetworkVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const dataFlowRef = useRef<THREE.Group>(null)

  // Create network nodes representing different tech domains
  const nodes: NetworkNode[] = useMemo(
    () => [
      {
        id: 'cloud',
        position: [0, 2, 0],
        label: 'Cloud',
        color: '#00d4aa',
        size: 0.3,
        connections: ['data', 'robotics', 'ml'],
      },
      {
        id: 'data',
        position: [-2, 0, 1],
        label: 'Data',
        color: '#0ea5e9',
        size: 0.25,
        connections: ['cloud', 'ml', 'analytics'],
      },
      {
        id: 'robotics',
        position: [2, 0, -1],
        label: 'Robotics',
        color: '#8b5cf6',
        size: 0.25,
        connections: ['cloud', 'iot', 'control'],
      },
      {
        id: 'ml',
        position: [0, -1, 2],
        label: 'ML/AI',
        color: '#ff6b6b',
        size: 0.2,
        connections: ['data', 'cloud', 'analytics'],
      },
      {
        id: 'iot',
        position: [3, 1, 0],
        label: 'IoT',
        color: '#f59e0b',
        size: 0.2,
        connections: ['robotics', 'edge', 'sensors'],
      },
      {
        id: 'edge',
        position: [-1, 1, -2],
        label: 'Edge',
        color: '#10b981',
        size: 0.2,
        connections: ['iot', 'cloud', 'real-time'],
      },
      {
        id: 'analytics',
        position: [-3, -1, 0],
        label: 'Analytics',
        color: '#00e5ff',
        size: 0.2,
        connections: ['data', 'ml', 'insights'],
      },
      {
        id: 'control',
        position: [1, -2, -1],
        label: 'Control',
        color: '#e879f9',
        size: 0.15,
        connections: ['robotics', 'real-time'],
      },
      {
        id: 'sensors',
        position: [2, 2, 1],
        label: 'Sensors',
        color: '#fbbf24',
        size: 0.15,
        connections: ['iot', 'data'],
      },
      {
        id: 'real-time',
        position: [0, 0, -3],
        label: 'Real-time',
        color: '#06b6d4',
        size: 0.15,
        connections: ['edge', 'control'],
      },
      {
        id: 'insights',
        position: [-2, -2, 1],
        label: 'Insights',
        color: '#a855f7',
        size: 0.15,
        connections: ['analytics', 'ml'],
      },
    ],
    []
  )

  // Create connections between nodes
  const connections = useMemo(() => {
    const conns: { from: NetworkNode; to: NetworkNode; distance: number }[] = []
    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const targetNode = nodes.find(n => n.id === connId)
        if (targetNode) {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - targetNode.position[0], 2) +
              Math.pow(node.position[1] - targetNode.position[1], 2) +
              Math.pow(node.position[2] - targetNode.position[2], 2)
          )
          conns.push({ from: node, to: targetNode, distance })
        }
      })
    })
    return conns
  }, [nodes])

  // Animation frame
  useFrame(state => {
    if (groupRef.current) {
      // Subtle rotation based on time
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1

      // Interactive tilt based on mouse
      const mouseInfluence = 0.1
      groupRef.current.rotation.x +=
        (mousePosition.y * mouseInfluence - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y +=
        (mousePosition.x * mouseInfluence - groupRef.current.rotation.y) * 0.05
    }

    if (dataFlowRef.current) {
      // Animate data flow particles
      dataFlowRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime + i * 0.5
          const connection = connections[i % connections.length]
          if (connection) {
            const progress = (Math.sin(time) + 1) / 2 // 0 to 1
            child.position.lerpVectors(
              new THREE.Vector3(...connection.from.position),
              new THREE.Vector3(...connection.to.position),
              progress
            )

            // Pulse effect
            const scale = 0.02 + Math.sin(time * 4) * 0.01
            child.scale.setScalar(scale)
          }
        }
      })
    }
  })

  // Create data flow particles
  const dataParticles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => (
      <Sphere key={i} args={[0.02]} position={[0, 0, 0]}>
        <meshBasicMaterial color='#00ffcc' transparent opacity={0.8} />
      </Sphere>
    ))
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Connection lines with layered depth */}
      {connections.map((conn, i) => (
        <group key={`connection-${i}`}>
          {/* Main connection line */}
          <Line
            points={[conn.from.position, conn.to.position]}
            color={new THREE.Color(conn.from.color).lerp(
              new THREE.Color(conn.to.color),
              0.5
            )}
            lineWidth={2}
            transparent
            opacity={0.3 + Math.sin(i * 0.1) * 0.1}
          />
          {/* Layered lines for depth */}
          <Line
            points={[
              [
                conn.from.position[0] + 0.05,
                conn.from.position[1],
                conn.from.position[2],
              ],
              [
                conn.to.position[0] + 0.05,
                conn.to.position[1],
                conn.to.position[2],
              ],
            ]}
            color={conn.from.color}
            lineWidth={1}
            transparent
            opacity={0.15}
          />
          <Line
            points={[
              [
                conn.from.position[0] - 0.05,
                conn.from.position[1],
                conn.from.position[2],
              ],
              [
                conn.to.position[0] - 0.05,
                conn.to.position[1],
                conn.to.position[2],
              ],
            ]}
            color={conn.to.color}
            lineWidth={1}
            transparent
            opacity={0.15}
          />
        </group>
      ))}

      {/* Network nodes */}
      {nodes.map(node => (
        <group key={node.id} position={node.position}>
          {/* Main node sphere */}
          <Sphere args={[node.size]}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </Sphere>

          {/* Node glow effect */}
          <Sphere args={[node.size * 1.5]}>
            <meshBasicMaterial color={node.color} transparent opacity={0.1} />
          </Sphere>

          {/* Node labels */}
          <Text
            position={[0, node.size + 0.3, 0]}
            fontSize={0.15}
            color='#ffffff'
            anchorX='center'
            anchorY='middle'
            font='/fonts/inter-medium.woff'
          >
            {node.label}
          </Text>
        </group>
      ))}

      {/* Flowing data particles */}
      <group ref={dataFlowRef}>{dataParticles}</group>

      {/* Ambient lighting for the network */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={0.6} color='#00d4aa' />
      <pointLight position={[0, 0, -5]} intensity={0.4} color='#8b5cf6' />
    </group>
  )
}
