import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function CyberpunkPokedex() {
  const finalData = useMemo(
    () => ({
      name: 'HARTLEY LEROY',
      title: 'ENGINEER • BUILDER • CREATIVE TECHNOLOGIST',
      skills: ['REACT', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'AI/ML', 'DEVOPS'],
      stats: [
        { label: 'ENGINEERING', value: 95, maxValue: 100 },
        { label: 'CREATIVITY', value: 88, maxValue: 100 },
        { label: 'LEADERSHIP', value: 92, maxValue: 100 },
        { label: 'INNOVATION', value: 96, maxValue: 100 },
      ],
    }),
    []
  )

  const socialLinks = [
    {
      id: 'github',
      name: 'GITHUB',
      url: 'https://github.com/hhleroy97',
      icon: '⚡',
      color: '#00ff00',
    },
    {
      id: 'linkedin',
      name: 'LINKEDIN',
      url: 'https://linkedin.com/in/hartleyhleroy',
      icon: '🔗',
      color: '#00ffff',
    },
  ]

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className='relative max-w-4xl mx-auto'
      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Horizontal Business Card Frame */}
      <div
        className='relative bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 border-4 border-cyan-400 shadow-2xl'
        style={{
          boxShadow:
            '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
          imageRendering: 'pixelated',
          aspectRatio: '16 / 9',
        }}
      >
        {/* Top Status Bar */}
        <div className='flex justify-between items-center mb-4 p-2 bg-black rounded-lg border border-green-400'>
          <div className='flex items-center gap-2'>
            <motion.div
              className='w-3 h-3 bg-green-400 rounded-full'
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-green-400 font-mono text-xs'>ONLINE</span>
          </div>
          <div className='text-cyan-400 font-mono text-xs'>DEX: 001</div>
          <div className='text-yellow-400 font-mono text-xs'>⚡ 100%</div>
        </div>

        {/* Main Horizontal Layout - Business Card Style */}
        <div className='grid grid-cols-5 gap-4 h-64'>
          {/* Left Section - Avatar & Name */}
          <div className='col-span-1 relative bg-black rounded-xl p-4 border-2 border-gray-600 flex flex-col justify-center items-center'>
            <div className='relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg mb-3'>
              HL
            </div>
            <h2 className='text-lg font-bold text-white font-mono text-center leading-tight'>
              HARTLEY LEROY
            </h2>
            <p className='text-cyan-400 font-mono text-xs mt-1 text-center'>
              DEV • BUILDER
            </p>
          </div>

          {/* Middle Section - Professional Info & Stats */}
          <div className='col-span-2 relative bg-black rounded-xl p-4 border-2 border-gray-600'>
            {/* Title */}
            <div className='mb-4'>
              <h3 className='text-green-400 font-mono text-sm font-bold mb-2'>
                ◄ PROFESSIONAL PROFILE ►
              </h3>
              <p className='text-white font-mono text-sm'>
                ENGINEER • BUILDER • CREATIVE TECHNOLOGIST
              </p>
            </div>

            {/* Stats - Compact horizontal bars */}
            <div className='space-y-2'>
              {finalData.stats.map(stat => (
                <div key={stat.label} className='flex items-center gap-3'>
                  <span className='text-white font-mono text-xs w-16 shrink-0'>
                    {stat.label.slice(0, 8)}
                  </span>
                  <div className='flex-1 bg-gray-700 rounded h-1.5 overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-green-400 to-yellow-400'
                      style={{
                        width: `${(stat.value / stat.maxValue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className='text-cyan-400 font-mono text-xs w-6'>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Skills & Contact */}
          <div className='col-span-2 relative bg-black rounded-xl p-4 border-2 border-gray-600'>
            {/* Skills */}
            <div className='mb-4'>
              <h3 className='text-purple-400 font-mono text-sm font-bold mb-2'>
                ◄ TECH STACK ►
              </h3>
              <div className='grid grid-cols-2 gap-1'>
                {finalData.skills.map(skill => (
                  <div
                    key={skill}
                    className='bg-gray-800 text-cyan-400 font-mono text-xs px-2 py-1 rounded text-center border border-cyan-400/30'
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Links */}
            <div>
              <h3 className='text-yellow-400 font-mono text-sm font-bold mb-2'>
                ◄ CONNECT ►
              </h3>
              <div className='grid grid-cols-2 gap-2'>
                {socialLinks.map(link => (
                  <motion.button
                    key={link.id}
                    className='p-2 bg-gray-800 rounded border border-gray-600 hover:border-cyan-400 transition-colors group'
                    onClick={() => handleLinkClick(link.url)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>{link.icon}</span>
                      <div className='text-left'>
                        <div className='text-white font-mono text-xs font-bold'>
                          {link.name}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Details */}
        <div className='mt-4 text-center'>
          <div className='text-gray-500 font-mono text-xs'>
            POKEDEX v2.1 | DIGITAL BUSINESS CARD
          </div>
        </div>

        {/* Corner LEDs */}
        <motion.div
          className='absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full'
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className='absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full'
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Holographic Glow Effect */}
      <motion.div
        className='absolute inset-0 -z-10 bg-gradient-to-b from-cyan-400/20 to-purple-500/20 rounded-3xl blur-xl'
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
