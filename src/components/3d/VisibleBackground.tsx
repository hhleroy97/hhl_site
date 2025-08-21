import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

function TestLines() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Simple test lines
  const lines = [
    {
      points: [[-5, -2, 0], [-3, 0, 0], [-1, 2, 0], [1, 0, 0], [3, -2, 0], [5, 0, 0]],
      color: 'cyan'
    },
    {
      points: [[-4, 2, -2], [-2, 0, -1], [0, 3, 0], [2, 1, 1], [4, -1, 2]],
      color: 'fuchsia'
    },
    {
      points: [[-3, -3, 1], [-1, -1, 0], [1, -2, -1], [3, 0, 0], [5, 1, 1]],
      color: 'lime'
    }
  ]
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.2
    }
  })
  
  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={3}
          transparent
          opacity={0.8}
        />
      ))}
    </group>
  )
}

export default function VisibleBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-zinc-900">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <TestLines />
      </Canvas>
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded">
        Three.js Background Active
      </div>
    </div>
  )
}