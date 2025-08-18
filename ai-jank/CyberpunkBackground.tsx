import { motion } from 'framer-motion'

export default function CyberpunkBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyberpunk-dark via-cyberpunk-dark-alt to-cyberpunk-dark-cyan' />

      {/* Animated Grid */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 bg-cyberpunk-neon rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [-50, 0, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Cyberpunk Skyline Silhouette */}
      <div className='absolute bottom-0 left-0 w-full h-64 opacity-30'>
        <svg
          viewBox='0 0 1200 300'
          className='w-full h-full'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient
              id='buildingGradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#00ffff' stopOpacity='0.8' />
              <stop offset='50%' stopColor='#ff00ff' stopOpacity='0.6' />
              <stop offset='100%' stopColor='#000000' stopOpacity='0.9' />
            </linearGradient>
          </defs>

          {/* Building silhouettes with neon gradients */}
          <rect
            x='50'
            y='150'
            width='40'
            height='150'
            fill='url(#buildingGradient)'
          />
          <rect
            x='120'
            y='100'
            width='60'
            height='200'
            fill='url(#buildingGradient)'
          />
          <rect
            x='200'
            y='120'
            width='35'
            height='180'
            fill='url(#buildingGradient)'
          />
          <rect
            x='260'
            y='80'
            width='50'
            height='220'
            fill='url(#buildingGradient)'
          />
          <rect
            x='340'
            y='110'
            width='45'
            height='190'
            fill='url(#buildingGradient)'
          />
          <rect
            x='410'
            y='60'
            width='55'
            height='240'
            fill='url(#buildingGradient)'
          />
          <rect
            x='490'
            y='90'
            width='40'
            height='210'
            fill='url(#buildingGradient)'
          />
          <rect
            x='560'
            y='70'
            width='48'
            height='230'
            fill='url(#buildingGradient)'
          />
          <rect
            x='640'
            y='110'
            width='42'
            height='190'
            fill='url(#buildingGradient)'
          />
          <rect
            x='710'
            y='85'
            width='38'
            height='215'
            fill='url(#buildingGradient)'
          />
          <rect
            x='780'
            y='95'
            width='52'
            height='205'
            fill='url(#buildingGradient)'
          />
          <rect
            x='860'
            y='75'
            width='44'
            height='225'
            fill='url(#buildingGradient)'
          />
          <rect
            x='930'
            y='105'
            width='46'
            height='195'
            fill='url(#buildingGradient)'
          />
          <rect
            x='1000'
            y='90'
            width='40'
            height='210'
            fill='url(#buildingGradient)'
          />
          <rect
            x='1070'
            y='120'
            width='38'
            height='180'
            fill='url(#buildingGradient)'
          />
        </svg>
      </div>

      {/* Parallax Moving Elements */}
      <motion.div
        className='absolute inset-0 opacity-10'
        animate={{ x: [-100, 100] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div
          className='w-full h-full bg-gradient-to-r from-transparent via-cyberpunk-neon to-transparent'
          style={{ width: '200%', height: '2px', top: '30%' }}
        />
      </motion.div>

      <motion.div
        className='absolute inset-0 opacity-5'
        animate={{ x: [100, -100] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div
          className='w-full h-full bg-gradient-to-r from-transparent via-cyberpunk-pink to-transparent'
          style={{ width: '200%', height: '1px', top: '70%' }}
        />
      </motion.div>

      {/* Glitch Lines */}
      <motion.div
        className='absolute left-0 w-full h-0.5 bg-cyberpunk-neon'
        style={{ top: '20%' }}
        animate={{
          opacity: [0, 1, 0],
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      <motion.div
        className='absolute left-0 w-full h-0.5 bg-cyberpunk-pink'
        style={{ top: '80%' }}
        animate={{
          opacity: [0, 1, 0],
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 7,
        }}
      />
    </div>
  )
}
