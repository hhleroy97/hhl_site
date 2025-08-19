import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

interface RetroDataFlowProps {
  className?: string
}

const RetroDataFlow: React.FC<RetroDataFlowProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())

  // Professional color palette with subtle tech aesthetics
  const colors = {
    neonGreen: 0x00d4aa,      // tech-teal
    neonPink: 0x8b5cf6,       // tech-purple  
    neonBlue: 0x0ea5e9,       // tech-blue
    neonYellow: 0x06b6d4,     // tech-cyan
    neonCyan: 0x00d4aa,       // tech-teal
    neonOrange: 0x8b5cf6,     // tech-purple
    background: 0x000000      // pure black for transparency
  }

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    scene.fog = new THREE.Fog(0x000000, 20, 150)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(800, 600)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Create simple grid background
    const createGridBackground = () => {
      const gridElements: THREE.Line[] = []
      
      // Simple grid lines for background
      const gridSize = 20
      const gridSpacing = 0.5
      
      for (let i = -gridSize; i <= gridSize; i++) {
        // Horizontal lines
        const hPoints = [
          new THREE.Vector3(-gridSize * gridSpacing, i * gridSpacing, 0),
          new THREE.Vector3(gridSize * gridSpacing, i * gridSpacing, 0)
        ]
        const hGeometry = new THREE.BufferGeometry().setFromPoints(hPoints)
        const hMaterial = new THREE.LineBasicMaterial({
          color: colors.neonGreen,
          transparent: true,
          opacity: 0.1
        })
        const hLine = new THREE.Line(hGeometry, hMaterial)
        gridElements.push(hLine)
        scene.add(hLine)
        
        // Vertical lines
        const vPoints = [
          new THREE.Vector3(i * gridSpacing, -gridSize * gridSpacing, 0),
          new THREE.Vector3(i * gridSpacing, gridSize * gridSpacing, 0)
        ]
        const vGeometry = new THREE.BufferGeometry().setFromPoints(vPoints)
        const vMaterial = new THREE.LineBasicMaterial({
          color: colors.neonGreen,
          transparent: true,
          opacity: 0.1
        })
        const vLine = new THREE.Line(vGeometry, vMaterial)
        gridElements.push(vLine)
        scene.add(vLine)
      }
      
      return gridElements
    }

    // Initialize grid background
    const gridElements = createGridBackground()

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(colors.neonGreen, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Animation loop with subtle grid effects
    const animate = () => {
      const elapsedTime = clockRef.current.getElapsedTime()
      
      // Subtle grid animation
      gridElements.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial
        const pulse = Math.sin(elapsedTime * 0.5 + index * 0.1) * 0.05 + 0.1
        material.opacity = pulse
      })
      
      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
      
      renderer.dispose()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'transparent'
        }}
      />
    </div>
  )
}

export default RetroDataFlow