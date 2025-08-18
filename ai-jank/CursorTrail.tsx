import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      setTrail(prevTrail => {
        const newPoint: TrailPoint = {
          x: e.clientX,
          y: e.clientY,
          id: trailId++,
        }

        const updatedTrail = [newPoint, ...prevTrail.slice(0, 15)]
        return updatedTrail
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className='fixed pointer-events-none z-50 mix-blend-difference'
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.1,
        }}
      >
        <div className='w-4 h-4 bg-cyberpunk-neon rounded-full shadow-lg shadow-cyberpunk-neon/50' />
      </motion.div>

      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className='fixed pointer-events-none z-40'
            initial={{
              x: point.x - 2,
              y: point.y - 2,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              x: point.x - 2,
              y: point.y - 2,
              opacity: Math.max(0, 0.8 - index * 0.05),
              scale: Math.max(0.3, 1 - index * 0.05),
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <div
              className='w-1 h-1 rounded-full'
              style={{
                backgroundColor:
                  index % 3 === 0
                    ? '#00ffff'
                    : index % 3 === 1
                      ? '#ff00ff'
                      : '#8000ff',
                boxShadow: `0 0 ${4 - index * 0.2}px currentColor`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer cursor ring */}
      <motion.div
        className='fixed pointer-events-none z-40 border border-cyberpunk-neon rounded-full opacity-50'
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.2,
        }}
        style={{
          width: '40px',
          height: '40px',
        }}
      />
    </>
  )
}
