import { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import NetworkVisualization from './NetworkVisualization'

interface Scene3DProps {
  className?: string
  interactive?: boolean
}

export default function Scene3D({
  className = '',
  interactive = false,
}: Scene3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [interactive])

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
      >
        {/* Camera setup */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Controls (only if interactive) */}
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}

        {/* Scene lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Atmospheric fog */}
        <fog attach='fog' args={['#0a0f1c', 5, 15]} />

        {/* Main 3D Network Visualization */}
        <Suspense fallback={null}>
          <NetworkVisualization mousePosition={mousePosition} />
        </Suspense>

        {/* Subtle background particles */}
        <Suspense fallback={null}>
          <BackgroundParticles />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Simplified background particles for ambiance
function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
    }))
  }, [])

  return (
    <group>
      {particles.map(particle => (
        <mesh key={particle.key} position={particle.position}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color='#00d4aa' transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  )
}
