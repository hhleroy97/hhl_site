import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Helper functions
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

function getPalette(theme = 'neon') {
  switch (theme) {
    case 'mono':
      return ['#e6ebff', '#c8d2ff', '#aeb8f0', '#8d96d8', '#6c75bf', '#4d569f']
    case 'sunset':
      return ['#ff8a5b', '#ff6e6e', '#ffd166', '#ffe6a7', '#f4a261', '#c1121f']
    case 'cyber':
      return ['#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#fee440', '#00bfb2']
    case 'neon':
    default:
      return ['#00eaff', '#7cff00', '#ff6ec7', '#ffd166', '#8a5cff', '#ff8a5b']
  }
}

function gradientColor(pal: string[], t: number) {
  t = clamp(t, 0, 1)
  if (!pal || pal.length === 0) return new THREE.Color(0xffffff)
  if (pal.length === 1) return new THREE.Color(pal[0])
  const scaled = t * (pal.length - 1)
  const i0 = Math.floor(scaled)
  const i1 = Math.min(pal.length - 1, Math.ceil(scaled))
  const f = scaled - i0
  const c0 = new THREE.Color(pal[i0])
  const c1 = new THREE.Color(pal[i1])
  return c0.lerp(c1, f)
}

// Toon gradient texture
function makeToonGradient(levels = 4) {
  const c = document.createElement('canvas')
  c.width = 1
  c.height = levels
  const ctx = c.getContext('2d')!
  for (let i = 0; i < levels; i++) {
    const v = Math.round((255 * i) / Math.max(1, levels - 1))
    ctx.fillStyle = `rgb(${v},${v},${v})`
    ctx.fillRect(0, levels - 1 - i, 1, 1)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  return tex
}

// Filleted path using curves
function filletedPath3D(
  points3: THREE.Vector3[],
  r: number
): THREE.CurvePath<THREE.Vector3> {
  const path = new THREE.CurvePath<THREE.Vector3>()
  const P = points3.map(p => p.clone())
  let curr = P[0].clone()

  for (let k = 1; k < P.length - 1; k++) {
    const a = P[k - 1]
    const b = P[k]
    const c = P[k + 1]
    const dirIn = b.clone().sub(a)
    const lenIn = dirIn.length()
    dirIn.normalize()
    const dirOut = c.clone().sub(b)
    const lenOut = dirOut.length()
    dirOut.normalize()
    const rEff = Math.max(
      0.001,
      Math.min(r, lenIn * 0.5 - 1e-3, lenOut * 0.5 - 1e-3)
    )
    const pIn = b.clone().sub(dirIn.clone().multiplyScalar(rEff))
    const pOut = b.clone().add(dirOut.clone().multiplyScalar(rEff))

    if (curr.distanceTo(pIn) > 1e-6) {
      path.add(new THREE.LineCurve3(curr.clone(), pIn))
    }
    path.add(new THREE.QuadraticBezierCurve3(pIn, b.clone(), pOut))
    curr = pOut
  }

  const last = P[P.length - 1]
  if (curr.distanceTo(last) > 1e-6) {
    path.add(new THREE.LineCurve3(curr.clone(), last.clone()))
  }
  return path
}

// Glow texture for particles
function makeGlowTexture(size = 96) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  return tex
}

const DataflowRibbons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null

    // Camera setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
    camera.position.set(0, 6.5, 26)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.05)
    keyLight.position.set(10, 18, 14)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x6fd6ff, 0.75)
    rimLight.position.set(-8, 12, -10)
    scene.add(rimLight)

    // Build ribbons
    const GRAD4 = makeToonGradient(4)
    const GRAD5 = makeToonGradient(5)
    const pal = getPalette('neon')
    const board = [18, 6]
    const lanes = 20
    const [W, D] = board
    const padX = Math.max(0.6, W * 0.06)
    const padZ = Math.max(0.6, D * 0.06)

    // Substrate board
    const subGeom = new THREE.BoxGeometry(W, 0.16, D)
    const subMat = new THREE.MeshToonMaterial({
      color: 0x0b0f24,
      gradientMap: GRAD4,
    })
    const sub = new THREE.Mesh(subGeom, subMat)
    sub.position.set(0, -0.08, 0)
    scene.add(sub)

    // Edge outline
    const edgeG = new THREE.EdgesGeometry(subGeom, 1)
    const edgeM = new THREE.LineBasicMaterial({
      color: 0x1f2a5a,
      transparent: true,
      opacity: 0.6,
    })
    const outline = new THREE.LineSegments(edgeG, edgeM)
    outline.position.copy(sub.position)
    scene.add(outline)

    // Calculate lane positions
    const xL = -W / 2 + padX
    const xR = W / 2 - padX
    const auto = lanes > 1 ? (D - 2 * padZ) / (lanes - 1) : 0
    const spacing = clamp(
      auto,
      Math.max(0.18 * 1.2, 0.06),
      Math.max(Math.max(0.18 * 1.2, 0.06), auto)
    )
    const zSpan = lanes > 1 ? (lanes - 1) * spacing : 0
    const zStart = -zSpan / 2

    // Node positions
    const zMin = zStart
    const zMax = zStart + (lanes > 1 ? (lanes - 1) * spacing : 0)
    const nodeLen = zMax - zMin + Math.max(0.3, spacing * 0.2)
    const nodeGeom = new THREE.BoxGeometry(
      0.24,
      Math.max(0.04 * 1.6, 0.05),
      Math.max(0.2, nodeLen)
    )
    const nodeMat = new THREE.MeshToonMaterial({
      color: 0xffc65a,
      gradientMap: GRAD5,
    })
    const y = 0.02

    const nL = new THREE.Mesh(nodeGeom, nodeMat)
    nL.position.set(xL, y, (zMin + zMax) / 2)
    scene.add(nL)

    const nR = new THREE.Mesh(nodeGeom, nodeMat)
    nR.position.set(xR, y, (zMin + zMax) / 2)
    scene.add(nR)

    // Circuit board layout system with fanning patterns
    const curves: THREE.CurvePath<THREE.Vector3>[] = []
    const colors: THREE.Color[] = []
    const particles: THREE.Sprite[] = []

    // All ribbons stay on same Y level
    const ribbonY = y + 0.05

    // Create grid of occupied positions to prevent overlaps
    const gridSize = 0.3
    const occupiedGrid = new Set<string>()

    // Helper to check and mark grid positions
    const markGridPosition = (x: number, z: number) => {
      const gx = Math.round(x / gridSize)
      const gz = Math.round(z / gridSize)
      const key = `${gx},${gz}`
      occupiedGrid.add(key)
      return key
    }

    const isGridOccupied = (x: number, z: number, buffer = 1) => {
      const gx = Math.round(x / gridSize)
      const gz = Math.round(z / gridSize)
      for (let dx = -buffer; dx <= buffer; dx++) {
        for (let dz = -buffer; dz <= buffer; dz++) {
          const key = `${gx + dx},${gz + dz}`
          if (occupiedGrid.has(key)) return true
        }
      }
      return false
    }

    // Circuit routing patterns
    for (let i = 0; i < lanes; i++) {
      const zLane = zStart + i * spacing
      const tubeR = Math.max(0.02, 0.18 * 0.4)

      // Determine circuit routing type based on lane position
      const laneType = Math.floor((i / lanes) * 4) // 4 routing zones
      let pts3: THREE.Vector3[] = []

      switch (laneType) {
        case 0: {
          // Direct traces (top quarter)
          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.2, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.8, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }

        case 1: {
          // Fan-out pattern (upper middle)
          const fanDirection = i % 2 === 0 ? 1 : -1
          const fanOffset = fanDirection * spacing * 0.8
          const midX = xL + (xR - xL) * 0.5

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.15, ribbonY, zLane),
            new THREE.Vector3(
              xL + (xR - xL) * 0.25,
              ribbonY,
              zLane + fanOffset * 0.3
            ),
            new THREE.Vector3(midX, ribbonY, zLane + fanOffset),
            new THREE.Vector3(
              xL + (xR - xL) * 0.75,
              ribbonY,
              zLane + fanOffset * 0.3
            ),
            new THREE.Vector3(xL + (xR - xL) * 0.85, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }

        case 2: {
          // L-shaped routing (lower middle)
          const routeUp = i % 2 === 0
          const bendPoint = routeUp
            ? zLane + spacing * 1.2
            : zLane - spacing * 1.2

          // Ensure no overlap by checking bend position
          const safeBendPoint = isGridOccupied(xL + (xR - xL) * 0.4, bendPoint)
            ? routeUp
              ? zLane + spacing * 0.6
              : zLane - spacing * 0.6
            : bendPoint

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.2, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.4, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.4, ribbonY, safeBendPoint),
            new THREE.Vector3(xL + (xR - xL) * 0.6, ribbonY, safeBendPoint),
            new THREE.Vector3(xL + (xR - xL) * 0.6, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.8, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]

          // Mark grid positions for this L-route
          markGridPosition(xL + (xR - xL) * 0.4, safeBendPoint)
          markGridPosition(xL + (xR - xL) * 0.6, safeBendPoint)
          break
        }

        case 3: // Via-style routing (bottom quarter)
        default: {
          // Create stepped routing pattern
          const steps = 3
          const stepZ = spacing * 0.4 * (i % 2 === 0 ? 1 : -1)

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.2, ribbonY, zLane),
          ]

          // Add stepped segments
          for (let step = 1; step <= steps; step++) {
            const stepX = xL + (xR - xL) * (0.2 + (step * 0.6) / steps)
            const currentStepZ = step % 2 === 1 ? zLane + stepZ : zLane

            if (!isGridOccupied(stepX, currentStepZ, 0)) {
              pts3.push(new THREE.Vector3(stepX, ribbonY, currentStepZ))
              markGridPosition(stepX, currentStepZ)
            }
          }

          pts3.push(
            new THREE.Vector3(xL + (xR - xL) * 0.8, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane)
          )
          break
        }
      }

      const curve = filletedPath3D(pts3, tubeR * 1.2)
      const geom = new THREE.TubeGeometry(curve, 96, tubeR, 12, false)
      const tLane = lanes > 1 ? i / (lanes - 1) : 0.5

      // Color based on circuit function
      const circuitColors = [
        gradientColor(pal, tLane).multiplyScalar(1.1), // Direct - bright
        gradientColor(pal, tLane).multiplyScalar(0.9), // Fan-out - medium
        gradientColor(pal, tLane).multiplyScalar(0.8), // L-route - dimmer
        gradientColor(pal, tLane).multiplyScalar(0.7), // Via - dimmest
      ]
      const col = circuitColors[laneType] || gradientColor(pal, tLane)

      const mat = new THREE.MeshToonMaterial({
        color: col,
        gradientMap: GRAD4,
        transparent: true,
        opacity: 0.9,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.scale.y = Math.max(0.15, 0.03 / (tubeR * 2))

      // Add emissive glow for direct traces
      if (laneType === 0) {
        mat.emissive = col.clone().multiplyScalar(0.15)
      }

      scene.add(mesh)
      curves.push(curve)
      colors.push(col)

      // Add circuit-style particles
      const glowTex = makeGlowTexture(24)
      const particleSizes = [0.16, 0.14, 0.12, 0.1] // Size by circuit type
      const particleSpeeds = [0.7, 0.5, 0.4, 0.3] // Speed by circuit type

      const spriteMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: col,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.scale.setScalar(particleSizes[laneType])
      sprite.userData = {
        curve,
        t: Math.random(),
        speed: particleSpeeds[laneType] + Math.random() * 0.2,
        laneType,
        baseOpacity: 0.8,
      }
      scene.add(sprite)
      particles.push(sprite)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      controls.update()

      // Animate circuit particles with realistic electronic flow
      particles.forEach((particle, index) => {
        particle.userData.t += particle.userData.speed * 0.008
        if (particle.userData.t > 1) particle.userData.t = 0

        const point = particle.userData.curve.getPointAt(particle.userData.t)
        particle.position.copy(point)

        // Keep particles slightly above circuit traces
        particle.position.y = ribbonY + 0.04

        // Circuit-specific visual effects
        const time = Date.now() * 0.001
        const laneType = particle.userData.laneType
        const baseOpacity = particle.userData.baseOpacity

        switch (laneType) {
          case 0: {
            // Direct traces - steady high-speed flow
            const pulse = 1 + Math.sin(time * 3 + index * 0.5) * 0.2
            particle.scale.setScalar(0.16 * pulse)

            if (particle.material instanceof THREE.SpriteMaterial) {
              particle.material.opacity =
                baseOpacity + Math.sin(time * 2 + index) * 0.15
            }
            break
          }

          case 1: {
            // Fan-out - variable intensity based on curve position
            const progress = particle.userData.t
            const fanIntensity = Math.sin(progress * Math.PI) // Peak at middle of curve
            const pulse = 1 + fanIntensity * 0.4
            particle.scale.setScalar(0.14 * pulse)

            if (particle.material instanceof THREE.SpriteMaterial) {
              particle.material.opacity =
                baseOpacity * (0.7 + fanIntensity * 0.3)
            }
            break
          }

          case 2: {
            // L-routes - pulse at corners
            const progress = particle.userData.t
            const cornerPulse = Math.abs(Math.sin(progress * Math.PI * 4)) // Multiple pulses along route
            const scale = 0.12 * (1 + cornerPulse * 0.3)
            particle.scale.setScalar(scale)

            if (particle.material instanceof THREE.SpriteMaterial) {
              particle.material.opacity = baseOpacity + cornerPulse * 0.2
            }
            break
          }

          case 3: // Via-style - discrete packet-like movement
          default: {
            // Stepped movement to simulate digital packets
            const stepProgress = Math.floor(particle.userData.t * 8) / 8
            const stepIntensity = 1 + Math.sin(stepProgress * Math.PI * 8) * 0.5
            particle.scale.setScalar(0.1 * stepIntensity)

            if (particle.material instanceof THREE.SpriteMaterial) {
              // Blink effect for digital packets
              const blinkRate = time * 4 + index * 0.3
              particle.material.opacity =
                baseOpacity * (0.6 + Math.abs(Math.sin(blinkRate)) * 0.4)
            }
            break
          }
        }
      })

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      controls.dispose()
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material: THREE.Material) =>
              material.dispose()
            )
          } else {
            object.material?.dispose()
          }
        }
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 w-full h-full overflow-hidden'
      style={{
        cursor: 'grab',
        background: 'transparent',
      }}
    />
  )
}

export default DataflowRibbons
