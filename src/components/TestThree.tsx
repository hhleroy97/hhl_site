import { Canvas } from '@react-three/fiber'
import { Line } from '@react-three/drei'

function TestLine() {
  const points = [
    [0, 0, 0],
    [2, 2, 0],
    [4, 0, 0]
  ]
  
  return (
    <Line
      points={points}
      color="cyan"
      lineWidth={3}
    />
  )
}

export default function TestThree() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-96 h-96 border border-white">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <TestLine />
        </Canvas>
      </div>
      <div className="text-white ml-4">
        <h2>Three.js Test</h2>
        <p>Should see a cyan line if Three.js is working</p>
      </div>
    </div>
  )
}