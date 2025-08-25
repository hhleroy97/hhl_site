import { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

interface ControlsProps {
  density: number
  speed: number
  colorway: string
  onDensityChange: (value: number) => void
  onSpeedChange: (value: number) => void
  onColorwayChange: (value: string) => void
}

const colorways = {
  'Cyan Flow': { primary: [0, 1, 1], secondary: [0, 0.8, 1] },
  'Fuchsia Pulse': { primary: [1, 0, 1], secondary: [1, 0.3, 0.8] },
  'Emerald Wave': { primary: [0, 1, 0.6], secondary: [0, 0.8, 0.4] },
}

function NoiseCurves({
  density,
  speed,
  colorway,
  isVisible,
}: {
  density: number
  speed: number
  colorway: keyof typeof colorways
  isVisible: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)

  const curves = useMemo(() => {
    const curveData = []
    const colors = colorways[colorway]

    for (let i = 0; i < density; i++) {
      const points = []
      const startX = (Math.random() - 0.5) * 20
      const startY = (Math.random() - 0.5) * 15
      const startZ = (Math.random() - 0.5) * 10

      // Create noise-driven curve
      for (let j = 0; j < 32; j++) {
        const t = j / 32
        const noise = Math.sin(i * 0.3 + t * Math.PI * 4) * 2
        const noise2 = Math.cos(i * 0.2 + t * Math.PI * 3) * 1.5

        points.push([
          startX + noise + t * 10,
          startY + noise2,
          startZ + Math.sin(t * Math.PI * 2) * 3,
        ])
      }

      const colorMix = Math.random()
      const color = new THREE.Color(
        colors.primary[0] * colorMix + colors.secondary[0] * (1 - colorMix),
        colors.primary[1] * colorMix + colors.secondary[1] * (1 - colorMix),
        colors.primary[2] * colorMix + colors.secondary[2] * (1 - colorMix)
      )

      curveData.push({
        points,
        color,
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.5 + Math.random() * 1.5,
      })
    }

    return curveData
  }, [density, colorway])

  useFrame(({ clock }) => {
    if (!groupRef.current || !isVisible) return

    groupRef.current.children.forEach((line, i) => {
      if (line instanceof THREE.Line) {
        const curve = curves[i]
        const time = clock.elapsedTime * speed + curve.phase

        // Animate curves with controllable speed
        line.rotation.z = Math.sin(time) * 0.2
        line.position.y = Math.sin(time * 0.5) * curve.amplitude

        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.6 + Math.sin(time * 0.3) * 0.3
      }
    })
  })

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => (
        <Line
          key={i}
          points={curve.points}
          color={curve.color}
          lineWidth={2}
          transparent
          opacity={0.7}
        />
      ))}
    </group>
  )
}

function Controls({
  density,
  speed,
  colorway,
  onDensityChange,
  onSpeedChange,
  onColorwayChange,
}: ControlsProps) {
  return (
    <aside className='rounded-2xl ring-1 ring-white/10 p-4 bg-white/5 backdrop-blur-md space-y-4'>
      <div>
        <label className='block text-sm font-medium text-zinc-300 mb-2'>
          Density: {density}
        </label>
        <input
          type='range'
          min='10'
          max='80'
          value={density}
          onChange={e => onDensityChange(Number(e.target.value))}
          className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-zinc-300 mb-2'>
          Speed: {speed.toFixed(1)}x
        </label>
        <input
          type='range'
          min='0.1'
          max='3'
          step='0.1'
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-zinc-300 mb-2'>
          Colorway
        </label>
        <select
          value={colorway}
          onChange={e => onColorwayChange(e.target.value)}
          className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors'
        >
          {Object.keys(colorways).map(color => (
            <option key={color} value={color} className='bg-zinc-800'>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className='pt-2 text-xs text-zinc-400'>
        Interactive R3F visualization with real-time parameter control
      </div>
    </aside>
  )
}

export default function LiveDataLoom() {
  const [density, setDensity] = useState(40)
  const [speed, setSpeed] = useState(1.0)
  const [colorway, setColorway] = useState<keyof typeof colorways>('Cyan Flow')

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '100px' })

  return (
    <section id='showcase' ref={sectionRef} className='py-20 md:py-28'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='text-section-heading'>Live Data Loom</h2>
          <p className='mt-2 text-zinc-400'>
            Noise-driven cable paths with realtime controls.
          </p>
        </motion.div>

        <motion.div
          className='mt-6 grid md:grid-cols-[1fr,320px] gap-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='rounded-2xl ring-1 ring-white/10 overflow-hidden bg-white/5 backdrop-blur-md aspect-video'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center h-full'>
                  <div className='animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent' />
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
              >
                <NoiseCurves
                  density={density}
                  speed={speed}
                  colorway={colorway}
                  isVisible={isInView}
                />
                <ambientLight intensity={0.5} />
              </Canvas>
            </Suspense>
          </div>

          <Controls
            density={density}
            speed={speed}
            colorway={colorway}
            onDensityChange={setDensity}
            onSpeedChange={setSpeed}
            onColorwayChange={setColorway as (value: string) => void}
          />
        </motion.div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #d946ef);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #d946ef);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  )
}
