import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Custom hook to detect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}

// Custom hook for scroll-based parallax
const useScrollParallax = (disabled: boolean) => {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    if (disabled) return
    
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.4) // 0.4x parallax factor
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [disabled])
  
  return scrollY
}

// Data lines component with improved performance
function DataLines({ heroPosition = [0, 0, 0] }: { heroPosition?: number[] }) {
  const groupRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Generate lines with distance-based opacity
  const lines = useMemo(() => {
    const lineData = []
    const heroVec = new THREE.Vector3(...heroPosition)
    
    for (let i = 0; i < 80; i++) { // Reduced from typical 120+ lines
      const points = []
      const startX = (Math.random() - 0.5) * 40
      const startY = (Math.random() - 0.5) * 30
      const startZ = (Math.random() - 0.5) * 20
      
      // Calculate distance from hero area for alpha modulation
      const startVec = new THREE.Vector3(startX, startY, startZ)
      const distance = heroVec.distanceTo(startVec)
      const centerDistance = Math.max(0, Math.min(1, distance / 15))
      const baseAlpha = 0.1 + (centerDistance * 0.3) // Calmer in center
      
      for (let j = 0; j < 8; j++) {
        const noise = Math.sin(i * 0.1 + j * 0.5) * 2
        points.push([
          startX + noise,
          startY + j * 2 + noise * 0.5,
          startZ + noise * 0.3
        ])
      }
      
      lineData.push({
        points,
        color: new THREE.Color().setHSL(
          0.5 + Math.sin(i * 0.1) * 0.2, // Cyan to blue hues
          0.8,
          0.4 + centerDistance * 0.3
        ),
        alpha: 1.0, // Make fully visible
        speed: 0.3 + Math.random() * 0.4, // Clamped speed
        offset: Math.random() * Math.PI * 2
      })
    }
    
    return lineData
  }, [heroPosition])
  
  useFrame(({ clock }) => {
    if (!groupRef.current || prefersReducedMotion) return
    
    groupRef.current.children.forEach((line, i) => {
      if (line instanceof THREE.Line) {
        const lineData = lines[i]
        const time = clock.elapsedTime * lineData.speed + lineData.offset
        
        // Gentle animation with clamped amplitude
        line.rotation.y = Math.sin(time) * 0.1
        line.position.y = Math.sin(time * 0.5) * 0.5
        
        // Subtle breathing effect
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = lineData.alpha * (0.8 + Math.sin(time * 0.3) * 0.2)
      }
    })
  })
  
  return (
    <group ref={groupRef}>
      {lines.map((lineData, i) => (
        <Line
          key={i}
          points={lineData.points}
          color={lineData.color}
          lineWidth={8}
          transparent
          opacity={lineData.alpha}
        />
      ))}
    </group>
  )
}

// Main 3D scene
function Scene() {
  return <DataLines />
}

export default function ImprovedBackground() {
  const prefersReducedMotion = useReducedMotion()
  const scrollY = useScrollParallax(prefersReducedMotion)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Disable heavy 3D on reduced motion only (temporarily remove mobile check)
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-fuchsia-900/10" />
      </div>
    )
  }
  
  return (
    <motion.div 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ y: scrollY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {/* Ultra-low materiality overlays */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />
      
      <Suspense fallback={null}>
        <Canvas
          dpr={[1.0, 1.25]} // Clamped DPR
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </motion.div>
  )
}