import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SimpleGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background

    // Camera setup - below and tilted up 45 degrees toward user
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.set(0, -7, 7) // Below and forward, creating 45° angle
    camera.lookAt(0, 0, 0) // Look at center of grid

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(800, 600)
    renderer.setClearColor(0x000000, 0) // Transparent
    container.appendChild(renderer.domElement)

    // Create grid group
    const gridGroup = new THREE.Group()

    // Create white grid helper with even number of divisions for proper centering
    const gridHelper = new THREE.GridHelper(15, 14, 0xffffff, 0xffffff) // 14 divisions = even number for centering
    gridHelper.rotation.x = Math.PI // Rotate 90 degrees more around x-axis
    gridGroup.add(gridHelper)

    // Add center tile with height (3D cube) - sized to take up 4 grid spaces (2x2)
    const centerGeometry = new THREE.BoxGeometry(2, 0.6, 2, 8, 8, 8) // Width, Height, Depth with rounded segments
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.8,
      roughness: 0.2,
    })
    const centerCube = new THREE.Mesh(centerGeometry, centerMaterial)
    centerCube.position.set(0, 0.3, 0) // Raise it up by half its height
    gridGroup.add(centerCube)

    // Add 5 other colored tiles aligned with grid spacing (15 units / 14 divisions = 1.07 per division)
    const gridSpacing = 15 / 14 // 1.07 units per grid division
    const coloredTiles = [
      { color: 0x00ff00, x: gridSpacing * 3, z: gridSpacing * -2 }, // Green - 3 divisions right, 2 down
      { color: 0x0000ff, x: gridSpacing * -4, z: gridSpacing * 2 }, // Blue - 4 divisions left, 2 up
      { color: 0xffff00, x: gridSpacing * 2, z: gridSpacing * 4 }, // Yellow - 2 divisions right, 4 up
      { color: 0xff00ff, x: gridSpacing * -2, z: gridSpacing * -5 }, // Magenta - 2 divisions left, 5 down
      { color: 0x00ffff, x: gridSpacing * 5, z: gridSpacing * 1 }, // Cyan - 5 divisions right, 1 up
    ]

    coloredTiles.forEach(tile => {
      const tileGeometry = new THREE.BoxGeometry(2, 0.6, 2, 8, 8, 8) // Sized to take up 4 grid spaces (2x2) with rounded segments
      const tileMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2,
      })
      const tileCube = new THREE.Mesh(tileGeometry, tileMaterial)
      tileCube.position.set(tile.x, 0.3, tile.z) // Adjusted Y position for taller cubes
      gridGroup.add(tileCube)
    })

    // Add lighting for metallic materials
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    scene.add(gridGroup)

    // Mouse controls
    let mouseDown = false
    let mouseX = 0
    let mouseY = 0

    const handleMouseDown = (event: MouseEvent) => {
      mouseDown = true
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseDown) return

      const deltaX = event.clientX - mouseX
      const deltaY = event.clientY - mouseY

      gridGroup.rotation.y += deltaX * 0.01
      gridGroup.rotation.x += deltaY * 0.01

      mouseX = event.clientX
      mouseY = event.clientY
    }

    const handleMouseUp = () => {
      mouseDown = false
    }

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '800px',
        height: '600px',
        cursor: 'grab',
      }}
    />
  )
}

export default SimpleGrid
