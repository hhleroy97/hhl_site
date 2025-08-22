import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function NewHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    const container = mountRef.current
    const size = Math.min(container.clientWidth, container.clientHeight)
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Data pipeline components
    const components: THREE.Group[] = []
    const dataFlows: THREE.Mesh[] = []

    // Pipeline stages
    const stages = [
      { name: 'IoT', position: [-4, 2, 0], color: 0x06b6d4, shape: 'sphere' },
      { name: 'Kinesis', position: [-2, 1, 0], color: 0xec4899, shape: 'box' },
      {
        name: 'Lambda',
        position: [0, 0, 0],
        color: 0x10b981,
        shape: 'cylinder',
      },
      { name: 'DynamoDB', position: [2, -1, 0], color: 0xf59e0b, shape: 'box' },
      {
        name: 'Athena',
        position: [4, -2, 0],
        color: 0x8b5cf6,
        shape: 'sphere',
      },
    ]

    // Create pipeline components
    stages.forEach((stage, _index) => {
      const group = new THREE.Group()

      let geometry: THREE.BufferGeometry
      switch (stage.shape) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.3, 16, 16)
          break
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16)
          break
        default:
          geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
      }

      const material = new THREE.MeshBasicMaterial({
        color: stage.color,
        transparent: true,
        opacity: 0.8,
      })

      const mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)

      // Add wireframe outline
      const wireframe = new THREE.WireframeGeometry(geometry)
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: stage.color,
        transparent: true,
        opacity: 0.4,
      })
      const wireframeMesh = new THREE.LineSegments(wireframe, wireframeMaterial)
      group.add(wireframeMesh)

      group.position.set(...stage.position)
      scene.add(group)
      components.push(group)
    })

    // Create data flow particles
    const particleCount = 20
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)

    for (let i = 0; i < particleCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: [0x06b6d4, 0xec4899, 0x10b981][Math.floor(Math.random() * 3)],
        transparent: true,
        opacity: 0.6,
      })

      const particle = new THREE.Mesh(particleGeometry, material)
      particle.position.set(
        -5 + Math.random() * 10,
        -3 + Math.random() * 6,
        -2 + Math.random() * 4
      )

      scene.add(particle)
      dataFlows.push(particle)
    }

    // Create connecting pipes
    const pipeGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8)
    const pipeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
    })

    for (let i = 0; i < stages.length - 1; i++) {
      const start = stages[i].position
      const end = stages[i + 1].position

      const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial.clone())
      const distance = Math.sqrt(
        Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
      )

      pipe.scale.y = distance
      pipe.position.set((start[0] + end[0]) / 2, (start[1] + end[1]) / 2, 0)

      const angle = Math.atan2(end[1] - start[1], end[0] - start[0])
      pipe.rotation.z = angle - Math.PI / 2

      scene.add(pipe)
    }

    camera.position.z = 8
    camera.position.y = 0

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the entire pipeline
      scene.rotation.y += 0.003
      scene.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1

      // Animate components
      components.forEach((component, i) => {
        component.rotation.y += 0.01 + i * 0.002
        const scale = 1 + Math.sin(Date.now() * 0.002 + i) * 0.1
        component.scale.setScalar(scale)
      })

      // Animate data flow particles
      dataFlows.forEach((particle, i) => {
        const time = Date.now() * 0.001
        particle.position.x = -5 + ((time * 0.5 + i * 0.5) % 10)
        particle.position.y += Math.sin(time + i) * 0.01
        particle.position.z += Math.cos(time + i) * 0.01

        // Reset particle when it reaches the end
        if (particle.position.x > 5) {
          particle.position.x = -5
          particle.position.y = -3 + Math.random() * 6
          particle.position.z = -2 + Math.random() * 4
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center py-24 overflow-hidden'
    >
      <div className='container-custom relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Text content - shifted left */}
          <div className='max-w-2xl'>
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Name */}
              <motion.h1
                className='text-6xl md:text-8xl font-bold tracking-tight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className='bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                  Hartley LeRoy
                </span>
              </motion.h1>

              {/* Main tagline */}
              <motion.h2
                className='text-2xl md:text-3xl font-light text-white leading-relaxed max-w-3xl'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Turning data into{' '}
                <span className='text-cyan-400 font-bold'>art</span>,{' '}
                <span className='text-fuchsia-400 font-bold'>insights</span>,
                and <span className='text-emerald-400 font-bold'>autonomy</span>
                .
                <br />
                Bridging <span className='font-bold'>
                  infrastructure
                </span> and <span className='font-bold'>imagination</span>.
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className='text-xl text-zinc-300 max-w-2xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Cloud & Creative Engineer — crafting end-to-end systems from
                edge to interface.
              </motion.p>

              {/* Status and contact info */}
              <motion.div
                className='flex flex-wrap items-center gap-6 text-sm text-zinc-400'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
                  <span>Charlotte, NC</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300' />
                  <span>Open to work</span>
                </div>
                <div className='flex items-center gap-4'>
                  <a
                    href='https://github.com/hhleroy97'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-zinc-400 hover:text-cyan-400 transition-colors'
                    aria-label='GitHub profile'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <a
                    href='https://linkedin.com/in/hartley-leroy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-zinc-400 hover:text-cyan-400 transition-colors'
                    aria-label='LinkedIn profile'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                    </svg>
                  </a>
                  <a
                    href='mailto:hartley.leroy1997@gmail.com'
                    className='text-zinc-400 hover:text-cyan-400 transition-colors'
                    aria-label='Email contact'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className='flex flex-wrap gap-4 pt-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <a
                  href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300'
                  onError={e => {
                    const target = e.target as HTMLAnchorElement
                    target.href = '/docs/Hartley_LeRoy_Resume_Aug25.docx'
                  }}
                >
                  View Resume
                </a>
                <a
                  href='#contact'
                  className='px-8 py-3 border border-cyan-400/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300'
                >
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Three.js Neural Network Visualization */}
          <div className='flex justify-center lg:justify-end'>
            <motion.div
              className='w-96 h-96 relative'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div
                ref={mountRef}
                className='w-full h-full rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border border-white/10'
              />
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 rounded-2xl pointer-events-none' />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background grid effect */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  )
}
