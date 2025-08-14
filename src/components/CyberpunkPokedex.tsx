import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PokedexProps {
  startDelay?: number
}

export default function CyberpunkPokedex({ startDelay = 0 }: PokedexProps) {
  const [scanningStep, setScanningStep] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    skills: [] as string[],
    stats: [] as { label: string; value: number; maxValue: number }[],
  })

  const finalData = {
    name: 'HARTLEY LEROY',
    title: 'ENGINEER • BUILDER • CREATIVE TECHNOLOGIST',
    skills: ['REACT', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'AI/ML', 'DEVOPS'],
    stats: [
      { label: 'ENGINEERING', value: 95, maxValue: 100 },
      { label: 'CREATIVITY', value: 88, maxValue: 100 },
      { label: 'LEADERSHIP', value: 92, maxValue: 100 },
      { label: 'INNOVATION', value: 96, maxValue: 100 },
    ],
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(true)
      setScanningStep(1)

      // Simulate scanning sequence
      const scanSequence = [
        { step: 1, delay: 500 },
        { step: 2, delay: 1500 },
        { step: 3, delay: 2500 },
        { step: 4, delay: 3500 },
      ]

      scanSequence.forEach(({ step, delay }) => {
        setTimeout(() => setScanningStep(step), delay)
      })

      // Complete scan and show data
      setTimeout(() => {
        setIsScanning(false)
        setScanningStep(5)
        setProfileData(finalData)
      }, 4500)
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [startDelay, finalData])

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className='relative max-w-md mx-auto'
      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Pokédex Device Frame */}
      <div
        className='relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-6 border-4 border-cyan-400 shadow-2xl'
        style={{
          boxShadow:
            '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
          imageRendering: 'pixelated',
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

        {/* Main Display Screen */}
        <div className='relative bg-black rounded-2xl p-4 mb-4 min-h-96 border-2 border-gray-600'>
          {/* Scanning Lines Overlay */}
          <motion.div
            className='absolute inset-0 z-10 pointer-events-none'
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
            }}
            animate={isScanning ? { y: [-100, 400] } : {}}
            transition={{
              duration: 2,
              repeat: isScanning ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* HUD Elements */}
          <div className='absolute top-2 left-2 text-cyan-400 font-mono text-xs opacity-60'>
            ◄ SCAN MODE ►
          </div>
          <div className='absolute top-2 right-2 text-green-400 font-mono text-xs'>
            {scanningStep < 5 ? 'ANALYZING...' : 'COMPLETE'}
          </div>

          {/* Profile Avatar Placeholder */}
          <div className='flex justify-center mb-4'>
            <motion.div
              className='relative w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white'
              animate={
                isScanning
                  ? {
                      boxShadow: [
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                        '0 0 40px rgba(255, 0, 255, 0.8)',
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
            >
              HL
              {isScanning && (
                <motion.div
                  className='absolute inset-0 border-2 border-yellow-400 rounded-full'
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>

          {/* Data Readout */}
          <AnimatePresence mode='wait'>
            {scanningStep >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='space-y-4'
              >
                {/* Name */}
                <div className='text-center mb-4'>
                  <motion.h2
                    className='text-2xl font-bold text-white font-mono'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {scanningStep >= 3
                      ? profileData.name || finalData.name
                      : '█████ █████'}
                  </motion.h2>
                  <motion.p
                    className='text-cyan-400 font-mono text-sm mt-1'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {scanningStep >= 3
                      ? profileData.title || finalData.title
                      : 'CLASSIFICATION: ████████'}
                  </motion.p>
                </div>

                {/* Stats */}
                {scanningStep >= 4 && (
                  <motion.div
                    className='space-y-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h3 className='text-green-400 font-mono text-sm font-bold'>
                      ◄ ATTRIBUTES ►
                    </h3>
                    {(profileData.stats.length > 0
                      ? profileData.stats
                      : finalData.stats
                    ).map((stat, index) => (
                      <div key={stat.label} className='flex items-center gap-2'>
                        <span className='text-white font-mono text-xs w-20'>
                          {stat.label}
                        </span>
                        <div className='flex-1 bg-gray-700 rounded h-2 overflow-hidden'>
                          <motion.div
                            className='h-full bg-gradient-to-r from-green-400 to-yellow-400'
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(stat.value / stat.maxValue) * 100}%`,
                            }}
                            transition={{
                              delay: 1 + index * 0.2,
                              duration: 0.8,
                            }}
                          />
                        </div>
                        <span className='text-cyan-400 font-mono text-xs'>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Skills */}
                {scanningStep >= 5 && (
                  <motion.div
                    className='space-y-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <h3 className='text-purple-400 font-mono text-sm font-bold'>
                      ◄ SKILLS ►
                    </h3>
                    <div className='grid grid-cols-3 gap-1'>
                      {finalData.skills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          className='bg-gray-800 text-cyan-400 font-mono text-xs p-1 rounded text-center border border-cyan-400/30'
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5 + index * 0.1 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanning Progress */}
          {isScanning && (
            <motion.div
              className='absolute bottom-4 left-4 right-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className='bg-gray-800 rounded p-2'>
                <div className='flex justify-between text-green-400 font-mono text-xs mb-1'>
                  <span>SCANNING...</span>
                  <span>{Math.min(scanningStep * 25, 100)}%</span>
                </div>
                <div className='bg-gray-700 rounded h-1 overflow-hidden'>
                  <motion.div
                    className='h-full bg-green-400'
                    animate={{ width: `${Math.min(scanningStep * 25, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Control Panel */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Contact Buttons */}
          {socialLinks.map((link, index) => (
            <motion.button
              key={link.id}
              className='relative p-3 bg-black rounded-lg border-2 border-gray-600 hover:border-cyan-400 transition-colors group'
              onClick={() => handleLinkClick(link.url)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scanningStep >= 5 ? 1 : 0.3, y: 0 }}
              transition={{ delay: 2 + index * 0.2 }}
              disabled={scanningStep < 5}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className='flex items-center gap-2'>
                <span className='text-xl'>{link.icon}</span>
                <div className='text-left'>
                  <div className='text-white font-mono text-sm font-bold'>
                    {link.name}
                  </div>
                  <div className='text-gray-400 font-mono text-xs'>CONNECT</div>
                </div>
              </div>
              <motion.div
                className='absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100'
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
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
