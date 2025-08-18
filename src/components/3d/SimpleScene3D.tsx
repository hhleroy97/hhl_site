import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'

interface SimpleScene3DProps {
  className?: string
}

function SimpleNetworkVisualization() {
  return (
    <group>
      {/* Simple floating spheres */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial
          color='#00d4aa'
          emissive='#00d4aa'
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial
          color='#0ea5e9'
          emissive='#0ea5e9'
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[2, -1, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial
          color='#8b5cf6'
          emissive='#8b5cf6'
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[0, 2, -1]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial
          color='#ff6b6b'
          emissive='#ff6b6b'
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Simple ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={0.6} color='#00d4aa' />
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

        {/* Simple Network Visualization */}
        <Suspense fallback={null}>
          <SimpleNetworkVisualization />
        </Suspense>
      </Canvas>
    </div>
  )
}
