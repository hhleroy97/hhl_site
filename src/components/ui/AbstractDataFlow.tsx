import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface DataFlowProps {
  className?: string
}

export default function AbstractDataFlow({ className = '' }: DataFlowProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; delay: number; path: string }>
  >([])

  useEffect(() => {
    // Generate random data particles with different paths
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      path: i % 3 === 0 ? 'path1' : i % 3 === 1 ? 'path2' : 'path3',
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background gradient mesh */}
      <div className='absolute inset-0 opacity-30'>
        <svg width='100%' height='100%' className='absolute inset-0'>
          <defs>
            <linearGradient
              id='flowGradient1'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#00d4aa' stopOpacity='0.8' />
              <stop offset='50%' stopColor='#8b5cf6' stopOpacity='0.6' />
              <stop offset='100%' stopColor='#06b6d4' stopOpacity='0.4' />
            </linearGradient>
            <linearGradient
              id='flowGradient2'
              x1='100%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#f59e0b' stopOpacity='0.7' />
              <stop offset='50%' stopColor='#ef4444' stopOpacity='0.5' />
              <stop offset='100%' stopColor='#8b5cf6' stopOpacity='0.3' />
            </linearGradient>
            <radialGradient id='nodeGradient' cx='50%' cy='50%' r='50%'>
              <stop offset='0%' stopColor='#00d4aa' stopOpacity='0.9' />
              <stop offset='70%' stopColor='#00d4aa' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#00d4aa' stopOpacity='0' />
            </radialGradient>
          </defs>

          {/* Abstract flowing paths */}
          <motion.path
            d='M50,100 Q150,50 250,80 T450,60'
            stroke='url(#flowGradient1)'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          <motion.path
            d='M100,200 Q200,150 300,180 T500,160'
            stroke='url(#flowGradient2)'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
          />

          <motion.path
            d='M20,300 Q120,250 220,280 T420,260'
            stroke='url(#flowGradient1)'
            strokeWidth='2.5'
            fill='none'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Data nodes */}
      <div className='absolute inset-0'>
        {[
          { x: '15%', y: '25%', size: 'w-4 h-4', color: 'bg-tech-teal' },
          { x: '35%', y: '45%', size: 'w-6 h-6', color: 'bg-tech-purple' },
          { x: '60%', y: '30%', size: 'w-3 h-3', color: 'bg-tech-cyan' },
          { x: '80%', y: '50%', size: 'w-5 h-5', color: 'bg-tech-coral' },
          { x: '25%', y: '70%', size: 'w-4 h-4', color: 'bg-tech-gold' },
          { x: '70%', y: '75%', size: 'w-3 h-3', color: 'bg-tech-blue' },
        ].map((node, i) => (
          <motion.div
            key={i}
            className={`absolute ${node.size} ${node.color} rounded-full opacity-80 shadow-lg`}
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div
              className={`w-full h-full rounded-full ${node.color} animate-pulse`}
            />
            <div
              className={`absolute inset-0 rounded-full ${node.color} blur-sm opacity-60`}
            />
          </motion.div>
        ))}
      </div>

      {/* Flowing data particles */}
      <div className='absolute inset-0'>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className='absolute w-2 h-2 bg-tech-teal rounded-full shadow-lg opacity-80'
            initial={{
              x:
                particle.path === 'path1'
                  ? '10%'
                  : particle.path === 'path2'
                    ? '5%'
                    : '15%',
              y:
                particle.path === 'path1'
                  ? '20%'
                  : particle.path === 'path2'
                    ? '60%'
                    : '80%',
            }}
            animate={{
              x:
                particle.path === 'path1'
                  ? ['10%', '30%', '60%', '90%']
                  : particle.path === 'path2'
                    ? ['5%', '25%', '55%', '85%']
                    : ['15%', '35%', '65%', '95%'],
              y:
                particle.path === 'path1'
                  ? ['20%', '40%', '25%', '45%']
                  : particle.path === 'path2'
                    ? ['60%', '40%', '65%', '35%']
                    : ['80%', '60%', '75%', '55%'],
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className='w-full h-full bg-tech-teal rounded-full animate-pulse' />
            <div className='absolute inset-0 bg-tech-teal rounded-full blur-sm opacity-60' />
          </motion.div>
        ))}
      </div>

      {/* Abstract geometric shapes representing data structures */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-1/4 left-1/3 w-16 h-16 border-2 border-tech-purple/40 rotate-45'
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className='absolute bottom-1/3 right-1/4 w-12 h-12 border border-tech-cyan/50 rounded-full'
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className='absolute top-1/2 left-1/5 w-8 h-20 bg-gradient-to-b from-tech-coral/30 to-transparent'
          animate={{ height: ['20px', '80px', '20px'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle grid overlay for tech aesthetic */}
      <div
        className='absolute inset-0 opacity-5 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Central focus element */}
      <motion.div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className='relative'>
          <motion.div
            className='w-20 h-20 border-4 border-tech-teal/60 rounded-full'
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className='absolute inset-2 border-2 border-tech-purple/40 rounded-full'
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />
          <div className='absolute inset-6 bg-gradient-to-br from-tech-teal/20 to-tech-purple/20 rounded-full blur-sm' />
        </div>
      </motion.div>
    </div>
  )
}
