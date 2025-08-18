import { Suspense, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface SimpleScene3DProps {
  className?: string
}

// Network node component with pulsing animation
function NetworkNode({
  position,
  color,
  size = 0.2,
}: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(state => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      )
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  )
}

// Animated data particle that moves along connections
function DataParticle({
  start,
  end,
  speed = 1,
  color = '#00d4aa',
  delay = 0,
}: {
  start: [number, number, number]
  end: [number, number, number]
  speed?: number
  color?: string
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(state => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime * speed + delay) % 2) / 2
      const x = start[0] + (end[0] - start[0]) * t
      const y = start[1] + (end[1] - start[1]) * t
      const z = start[2] + (end[2] - start[2]) * t

      meshRef.current.position.set(x, y, z)
      meshRef.current.scale.setScalar(
        0.8 + Math.sin(state.clock.elapsedTime * 4 + delay) * 0.2
      )
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

// Connection line between nodes
function Connection({
  start,
  end,
  color = '#00d4aa',
  opacity = 0.6,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  opacity?: number
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  )

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={opacity}
    />
  )
}

// Rotating orbital component for dynamic network activity
function OrbitalRing({
  radius = 3,
  speed = 0.5,
  particleCount = 8,
  color = '#00d4aa',
}: {
  radius?: number
  speed?: number
  particleCount?: number
  color?: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function DataTransferVisualization() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  // Network topology representing tech infrastructure
  const nodes = [
    {
      position: [0, 0, 0] as [number, number, number],
      color: '#00d4aa',
      size: 0.25,
      label: 'Core',
    },
    {
      position: [-2, 1.5, 0] as [number, number, number],
      color: '#0ea5e9',
      size: 0.2,
      label: 'Cloud',
    },
    {
      position: [2, 1.5, 0] as [number, number, number],
      color: '#8b5cf6',
      size: 0.2,
      label: 'Data',
    },
    {
      position: [-1.5, -1.5, 0] as [number, number, number],
      color: '#ff6b6b',
      size: 0.18,
      label: 'ML',
    },
    {
      position: [1.5, -1.5, 0] as [number, number, number],
      color: '#f59e0b',
      size: 0.18,
      label: 'API',
    },
    {
      position: [0, 2.5, -1] as [number, number, number],
      color: '#10b981',
      size: 0.15,
      label: 'IoT',
    },
    {
      position: [0, -2.5, -1] as [number, number, number],
      color: '#ef4444',
      size: 0.15,
      label: 'Edge',
    },
  ]

  // Define connections between nodes
  const connections = [
    { start: nodes[0].position, end: nodes[1].position, color: '#0ea5e9' },
    { start: nodes[0].position, end: nodes[2].position, color: '#8b5cf6' },
    { start: nodes[0].position, end: nodes[3].position, color: '#ff6b6b' },
    { start: nodes[0].position, end: nodes[4].position, color: '#f59e0b' },
    { start: nodes[1].position, end: nodes[5].position, color: '#10b981' },
    { start: nodes[2].position, end: nodes[6].position, color: '#ef4444' },
    { start: nodes[3].position, end: nodes[4].position, color: '#fbbf24' },
  ]

  return (
    <group ref={groupRef}>
      {/* Background orbital rings showing network activity */}
      <OrbitalRing
        radius={3.5}
        speed={0.3}
        particleCount={12}
        color='#00d4aa'
      />
      <OrbitalRing
        radius={4.2}
        speed={-0.2}
        particleCount={8}
        color='#0ea5e9'
      />
      <OrbitalRing radius={2.8} speed={0.5} particleCount={6} color='#8b5cf6' />

      {/* Render network nodes */}
      {nodes.map((node, i) => (
        <NetworkNode
          key={i}
          position={node.position}
          color={node.color}
          size={node.size}
        />
      ))}

      {/* Render connections */}
      {connections.map((conn, i) => (
        <Connection
          key={i}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          opacity={0.4}
        />
      ))}

      {/* Animated data particles flowing between nodes */}
      {connections.map((conn, i) => (
        <DataParticle
          key={`particle-${i}-1`}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          speed={0.8 + Math.random() * 0.4}
          delay={i * 0.3}
        />
      ))}

      {/* Additional particles going reverse direction */}
      {connections.slice(0, 4).map((conn, i) => (
        <DataParticle
          key={`particle-${i}-2`}
          start={conn.end}
          end={conn.start}
          color={conn.color}
          speed={1.2 + Math.random() * 0.3}
          delay={i * 0.5 + 1}
        />
      ))}

      {/* Burst data transfers - rapid particle streams */}
      {connections
        .slice(0, 3)
        .map((conn, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <DataParticle
              key={`burst-${i}-${j}`}
              start={conn.start}
              end={conn.end}
              color={conn.color}
              speed={2 + Math.random() * 1}
              delay={i * 2 + j * 0.1 + 3}
            />
          ))
        )}

      {/* Atmospheric lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={0.8} color='#00d4aa' />
      <pointLight position={[-3, 3, 2]} intensity={0.5} color='#0ea5e9' />
      <pointLight position={[3, -3, 2]} intensity={0.5} color='#8b5cf6' />
    </group>
  )
}

export default function SimpleScene3D({ className = '' }: SimpleScene3DProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Loading fallback */}
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-tech-dark-alt/50 rounded-lg'>
          <div className='flex flex-col items-center space-y-3'>
            <div className='w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin'></div>
            <span className='text-tech-text-muted text-sm'>
              Initializing 3D Network...
            </span>
          </div>
        </div>
      )}

      <Canvas
        className='rounded-lg'
        onCreated={() => setIsLoaded(true)}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        {/* Scene lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        {/* Atmospheric fog */}
        <fog attach='fog' args={['#0a0f1c', 5, 15]} />

        {/* Data Transfer Network Visualization */}
        <Suspense fallback={null}>
          <DataTransferVisualization />
        </Suspense>
      </Canvas>
    </div>
  )
}
