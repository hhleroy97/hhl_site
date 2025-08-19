import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DataFlowVizProps {
  className?: string
}

const DataFlowViz: React.FC<DataFlowVizProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    console.log('Starting Three.js setup')

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 8

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(500, 500)
    mountRef.current.appendChild(renderer.domElement)

    // Create grid
    const gridGroup = new THREE.Group()

    // Create simple grid - fewer lines for testing
    const gridSize = 11 // Odd number
    const step = 0.5

    console.log('Creating grid with size:', gridSize)

    for (
      let i = -Math.floor(gridSize / 2);
      i <= Math.floor(gridSize / 2);
      i++
    ) {
      // Horizontal lines
      const hPoints = [
        new THREE.Vector3(-Math.floor(gridSize / 2) * step, i * step, 0),
        new THREE.Vector3(Math.floor(gridSize / 2) * step, i * step, 0),
      ]
      const hGeometry = new THREE.BufferGeometry().setFromPoints(hPoints)
      const hLine = new THREE.Line(
        hGeometry,
        new THREE.LineBasicMaterial({ color: 0x000000 })
      )
      gridGroup.add(hLine)

      // Vertical lines
      const vPoints = [
        new THREE.Vector3(i * step, -Math.floor(gridSize / 2) * step, 0),
        new THREE.Vector3(i * step, Math.floor(gridSize / 2) * step, 0),
      ]
      const vGeometry = new THREE.BufferGeometry().setFromPoints(vPoints)
      const vLine = new THREE.Line(
        vGeometry,
        new THREE.LineBasicMaterial({ color: 0x000000 })
      )
      gridGroup.add(vLine)
    }

    // Add red center point
    const centerGeometry = new THREE.PlaneGeometry(0.3, 0.3)
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    })
    const centerPoint = new THREE.Mesh(centerGeometry, centerMaterial)
    centerPoint.position.set(0, 0, 0.01)
    gridGroup.add(centerPoint)

    scene.add(gridGroup)
    console.log('Grid added to scene')

    // Camera orbit variables
    let isMouseDown = false
    let mouseX = 0
    let mouseY = 0
    let cameraTheta = 0 // Horizontal rotation
    let cameraPhi = Math.PI / 4 // Vertical angle (45 degrees)
    const cameraRadius = 8 // Distance from grid

    const updateCameraPosition = () => {
      // Convert spherical coordinates to cartesian
      const x = cameraRadius * Math.sin(cameraPhi) * Math.cos(cameraTheta)
      const y = cameraRadius * Math.cos(cameraPhi)
      const z = cameraRadius * Math.sin(cameraPhi) * Math.sin(cameraTheta)

      camera.position.set(x, y, z)
      camera.lookAt(0, 0, 0) // Always look at grid center
    }

    // Mouse event handlers for camera orbiting
    const onMouseDown = (event: MouseEvent) => {
      console.log('Starting orbit')
      isMouseDown = true
      mouseX = event.clientX
      mouseY = event.clientY
      canvas.style.cursor = 'grabbing'
      event.preventDefault()
      event.stopPropagation()
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) {
        return
      }

      console.log('Orbiting camera')

      const deltaX = event.clientX - mouseX
      const deltaY = event.clientY - mouseY

      // Update camera orbit angles
      cameraTheta -= deltaX * 0.01 // Horizontal orbit
      cameraPhi += deltaY * 0.01 // Vertical orbit

      // Clamp vertical angle to prevent flipping
      cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraPhi))

      // Update camera position
      updateCameraPosition()

      mouseX = event.clientX
      mouseY = event.clientY
      event.preventDefault()
      event.stopPropagation()
    }

    const onMouseUp = (event: MouseEvent) => {
      console.log('Orbit complete')
      isMouseDown = false
      canvas.style.cursor = 'grab'
      event.preventDefault()
      event.stopPropagation()
    }

    // Add event listeners to the canvas directly
    const canvas = renderer.domElement
    canvas.style.cursor = 'grab'
    canvas.style.userSelect = 'none'
    canvas.style.webkitUserDrag = 'none'
    canvas.style.touchAction = 'none'

    canvas.addEventListener('mousedown', onMouseDown, { passive: false })
    canvas.addEventListener('contextmenu', e => e.preventDefault())
    canvas.addEventListener('dragstart', e => e.preventDefault())
    canvas.addEventListener('selectstart', e => e.preventDefault())
    document.addEventListener('mousemove', onMouseMove, { passive: false })
    document.addEventListener('mouseup', onMouseUp, { passive: false })

    console.log('Event listeners added')

    // Set initial camera position
    updateCameraPosition()
    console.log('Initial camera position set')

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    console.log('Animation started')

    // Cleanup
    return () => {
      console.log('Cleaning up')
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('contextmenu', e => e.preventDefault())
      canvas.removeEventListener('dragstart', e => e.preventDefault())
      canvas.removeEventListener('selectstart', e => e.preventDefault())
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (mountRef.current && mountRef.current.contains(canvas)) {
        mountRef.current.removeChild(canvas)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`w-full h-full ${className}`}
      style={{
        userSelect: 'none',
        width: '500px',
        height: '500px',
        cursor: 'grab',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitUserDrag: 'none',
        WebkitTouchCallout: 'none',
        touchAction: 'none',
      }}
    />
  )
}

export default DataFlowViz
