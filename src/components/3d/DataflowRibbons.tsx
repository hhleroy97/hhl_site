import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
function filletedPath3D(points3: THREE.Vector3[], r: number) {
  const path = new THREE.CurvePath()
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
    const lanes = 10
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

    // Create ribbons
    const curves: THREE.CurvePath<THREE.Vector3>[] = []
    const colors: THREE.Color[] = []
    const particles: THREE.Sprite[] = []

    for (let i = 0; i < lanes; i++) {
      const zLane = zStart + i * spacing
      const tubeR = Math.max(0.02, 0.18 * 0.5)

      const xB = xL + (xR - xL) * 0.18
      const xFan = xL + (xR - xL) * 0.45
      const xDown = xFan + tubeR * 2

      const pts3 = [
        new THREE.Vector3(xL, y, zLane),
        new THREE.Vector3(xB, y, zLane),
        new THREE.Vector3(xB, y, zLane),
        new THREE.Vector3(xFan, y, zLane),
        new THREE.Vector3(xDown, y, zLane),
        new THREE.Vector3(xR, y, zLane),
      ]

      const curve = filletedPath3D(pts3, tubeR * 0.8)
      const geom = new THREE.TubeGeometry(curve, 128, tubeR, 16, false)
      const tLane = lanes > 1 ? i / (lanes - 1) : 0.5
      const col = gradientColor(pal, tLane)
      const mat = new THREE.MeshToonMaterial({ color: col, gradientMap: GRAD4 })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.scale.y = Math.max(0.2, 0.04 / (tubeR * 2))
      scene.add(mesh)

      curves.push(curve)
      colors.push(col)

      // Add animated particles
      const glowTex = makeGlowTexture(32)
      const spriteMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: col,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.scale.setScalar(0.15)
      sprite.userData = {
        curve,
        t: Math.random(),
        speed: 0.3 + Math.random() * 0.4,
      }
      scene.add(sprite)
      particles.push(sprite)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      controls.update()

      // Animate particles along curves
      particles.forEach(particle => {
        particle.userData.t += particle.userData.speed * 0.01
        if (particle.userData.t > 1) particle.userData.t = 0

        const point = particle.userData.curve.getPointAt(particle.userData.t)
        particle.position.copy(point)
        particle.position.y += 0.05 // Slight elevation
      })

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      controls.dispose()
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
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
