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

    // Create white grid helper with odd divisions for center tile
    const gridHelper = new THREE.GridHelper(15, 15, 0xffffff, 0xffffff) // 15 divisions = 16 lines = odd number of squares
    gridHelper.rotation.x = Math.PI / 2 // Rotate to face camera
    gridGroup.add(gridHelper)

    // Add red center tile with height (3D cube)
    const centerGeometry = new THREE.BoxGeometry(1, 0.3, 1) // Width, Height, Depth
    const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const centerCube = new THREE.Mesh(centerGeometry, centerMaterial)
    centerCube.position.set(0, 0.15, 0) // Raise it up by half its height
    gridGroup.add(centerCube)

    // Add 5 other colored tiles positioned off-axis for more interesting layout
    const coloredTiles = [
      { color: 0x00ff00, x: 2, z: 1 }, // Green - off-axis position
      { color: 0x0000ff, x: -1, z: 3 }, // Blue - off-axis position
      { color: 0xffff00, x: 3, z: -2 }, // Yellow - off-axis position
      { color: 0xff00ff, x: -3, z: -1 }, // Magenta - off-axis position
      { color: 0x00ffff, x: 1, z: -3 }, // Cyan - off-axis position
    ]

    coloredTiles.forEach(tile => {
      const tileGeometry = new THREE.BoxGeometry(1, 0.3, 1)
      const tileMaterial = new THREE.MeshBasicMaterial({ color: tile.color })
      const tileCube = new THREE.Mesh(tileGeometry, tileMaterial)
      tileCube.position.set(tile.x, 0.15, tile.z)
      gridGroup.add(tileCube)
    })

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
