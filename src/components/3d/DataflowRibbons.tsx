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

    // Circuit board layout system
    const curves: THREE.CurvePath<THREE.Vector3>[] = []
    const colors: THREE.Color[] = []

    // All ribbons stay on same Y level
    const ribbonY = y + 0.05

    // Tron-style routing eliminates need for collision detection

    // Tron-style trace routing - each lane gets dedicated paths with no crossings
    for (let i = 0; i < lanes; i++) {
      const zLane = zStart + i * spacing
      const tubeR = Math.max(0.02, 0.18 * 0.4)

      // Calculate lane position relative to center
      const laneNormalized = i / (lanes - 1) - 0.5 // Range from -0.5 to 0.5
      const laneFromCenter = Math.abs(laneNormalized)

      // Assign routing type based on position from center to avoid crossings
      let routingType = 'direct'
      if (laneFromCenter > 0.7) {
        routingType = 'outer_bend'
      } else if (laneFromCenter > 0.4) {
        routingType = 'middle_bend'
      } else if (laneFromCenter > 0.2) {
        routingType = 'inner_curve'
      }

      let pts3: THREE.Vector3[] = []

      switch (routingType) {
        case 'direct': {
          // Center traces go straight - no crossing possible
          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.3, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.7, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }

        case 'inner_curve': {
          // Inner traces make gentle curves away from center, no crossing
          const curveDirection = laneNormalized > 0 ? 1 : -1
          const curveAmount = spacing * 0.8

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.2, ribbonY, zLane),
            new THREE.Vector3(
              xL + (xR - xL) * 0.35,
              ribbonY,
              zLane + curveAmount * curveDirection
            ),
            new THREE.Vector3(
              xL + (xR - xL) * 0.65,
              ribbonY,
              zLane + curveAmount * curveDirection
            ),
            new THREE.Vector3(xL + (xR - xL) * 0.8, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }

        case 'middle_bend': {
          // Middle traces make L-bends in dedicated lanes, no crossing
          const bendDirection = laneNormalized > 0 ? 1 : -1
          const bendDistance = spacing * (1.5 + laneFromCenter)
          const bendX = xL + (xR - xL) * (0.4 + laneFromCenter * 0.1)

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.25, ribbonY, zLane),
            new THREE.Vector3(bendX, ribbonY, zLane),
            new THREE.Vector3(
              bendX,
              ribbonY,
              zLane + bendDistance * bendDirection
            ),
            new THREE.Vector3(
              xL + (xR - xL) * 0.6,
              ribbonY,
              zLane + bendDistance * bendDirection
            ),
            new THREE.Vector3(xL + (xR - xL) * 0.6, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.75, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }

        case 'outer_bend': {
          // Outer traces get the longest paths to avoid all others
          const bendDirection = laneNormalized > 0 ? 1 : -1
          const bendDistance = spacing * (2.0 + laneFromCenter * 0.5)
          const bendX1 = xL + (xR - xL) * (0.3 + laneFromCenter * 0.05)
          const bendX2 = xL + (xR - xL) * (0.7 - laneFromCenter * 0.05)

          pts3 = [
            new THREE.Vector3(xL, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.15, ribbonY, zLane),
            new THREE.Vector3(bendX1, ribbonY, zLane),
            new THREE.Vector3(
              bendX1,
              ribbonY,
              zLane + bendDistance * bendDirection * 0.7
            ),
            new THREE.Vector3(
              xL + (xR - xL) * 0.5,
              ribbonY,
              zLane + bendDistance * bendDirection
            ),
            new THREE.Vector3(
              bendX2,
              ribbonY,
              zLane + bendDistance * bendDirection * 0.7
            ),
            new THREE.Vector3(bendX2, ribbonY, zLane),
            new THREE.Vector3(xL + (xR - xL) * 0.85, ribbonY, zLane),
            new THREE.Vector3(xR, ribbonY, zLane),
          ]
          break
        }
      }

      const curve = filletedPath3D(pts3, tubeR * 1.2)
      const geom = new THREE.TubeGeometry(curve, 96, tubeR, 12, false)
      const tLane = lanes > 1 ? i / (lanes - 1) : 0.5

      // Color based on routing type and distance from center
      let colorMultiplier = 1.0

      switch (routingType) {
        case 'direct':
          colorMultiplier = 1.2 // Brightest for center traces
          break
        case 'inner_curve':
          colorMultiplier = 1.0
          break
        case 'middle_bend':
          colorMultiplier = 0.9
          break
        case 'outer_bend':
          colorMultiplier = 0.8
          break
      }

      const col = gradientColor(pal, tLane).multiplyScalar(colorMultiplier)

      const mat = new THREE.MeshToonMaterial({
        color: col,
        gradientMap: GRAD4,
        transparent: true,
        opacity: 0.9,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.scale.y = Math.max(0.15, 0.03 / (tubeR * 2))

      // Add emissive glow for direct traces
      if (routingType === 'direct') {
        mat.emissive = col.clone().multiplyScalar(0.15)
      }

      scene.add(mesh)
      curves.push(curve)
      colors.push(col)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      controls.update()
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
