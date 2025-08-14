'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface RetroBusinessCardProps {
  startDelay?: number
}

export default function RetroBusinessCard({
  startDelay = 0,
}: RetroBusinessCardProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    {
      id: 'github',
      name: 'GITHUB',
      url: 'https://github.com/hhleroy97',
      icon: '[]',
      color: '#00ff00',
      hoverColor: '#ff00ff',
    },
    {
      id: 'linkedin',
      name: 'LINKEDIN',
      url: 'https://linkedin.com/in/hartleyhleroy',
      icon: 'IN',
      color: '#00ffff',
      hoverColor: '#ffff00',
    },
  ]

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className='relative'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: startDelay, duration: 0.8, ease: 'easeOut' }}
    >
      {/* Business card container with 8-bit border */}
      <motion.div
        className='relative bg-gray-900 border-4 border-cyan-400 p-6 md:p-8'
        style={{
          borderStyle: 'solid',
          borderImage:
            'linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #ffff00) 1',
          imageRendering: 'pixelated',
          boxShadow: '8px 8px 0px #ff00ff, 16px 16px 0px #00ffff',
        }}
        animate={{
          boxShadow: [
            '8px 8px 0px #ff00ff, 16px 16px 0px #00ffff',
            '12px 12px 0px #ff00ff, 20px 20px 0px #00ffff',
            '8px 8px 0px #ff00ff, 16px 16px 0px #00ffff',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Card header */}
        <motion.div
          className='text-center mb-6'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: startDelay + 0.3, duration: 0.6 }}
        >
          <div
            className='inline-block px-4 py-2 bg-black border-2 border-green-400 text-green-400 font-mono text-sm tracking-wider'
            style={{ imageRendering: 'pixelated' }}
          >
            [DIGITAL BUSINESS CARD]
          </div>
        </motion.div>

        {/* Professional info */}
        <motion.div
          className='text-center mb-8'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: startDelay + 0.5, duration: 0.6 }}
        >
          <div className='text-white font-mono text-lg md:text-xl mb-2 tracking-wide'>
            {'> '}CONTACT_INFO.exe
          </div>
          <div className='text-cyan-400 font-mono text-sm tracking-wider'>
            EMAIL: contact@hartleyleroy.dev
          </div>
          <div className='text-cyan-400 font-mono text-sm tracking-wider'>
            STATUS: AVAILABLE_FOR_HIRE
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className='flex justify-center gap-6'
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: startDelay + 0.7, duration: 0.6 }}
        >
          {socialLinks.map((link, index) => (
            <motion.button
              key={link.id}
              className='relative group'
              onClick={() => handleLinkClick(link.url)}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{
                delay: startDelay + 0.8 + index * 0.2,
                duration: 0.5,
              }}
            >
              {/* Link container */}
              <div
                className='flex flex-col items-center p-4 border-2 border-current transition-all duration-300'
                style={{
                  color: hoveredLink === link.id ? link.hoverColor : link.color,
                  backgroundColor:
                    hoveredLink === link.id
                      ? `${link.hoverColor}10`
                      : 'transparent',
                  imageRendering: 'pixelated',
                }}
              >
                {/* Icon */}
                <motion.div
                  className='text-2xl font-mono font-bold mb-2'
                  animate={
                    hoveredLink === link.id
                      ? {
                          textShadow: [
                            `0 0 5px ${link.hoverColor}`,
                            `0 0 15px ${link.hoverColor}`,
                            `0 0 5px ${link.hoverColor}`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {link.icon}
                </motion.div>

                {/* Label */}
                <div className='text-xs font-mono tracking-wider'>
                  {link.name}
                </div>

                {/* Hover effect particles */}
                {hoveredLink === link.id && (
                  <motion.div
                    className='absolute inset-0 pointer-events-none'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Array.from({ length: 4 }).map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className='absolute w-1 h-1'
                        style={{
                          backgroundColor: link.hoverColor,
                          left: '50%',
                          top: '50%',
                        }}
                        animate={{
                          x: [0, (particleIndex - 1.5) * 30],
                          y: [0, ((particleIndex % 2) - 0.5) * 30],
                          opacity: [1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: particleIndex * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Scanning line effect */}
              {hoveredLink === link.id && (
                <motion.div
                  className='absolute inset-0 border-2 border-transparent'
                  style={{
                    background: `linear-gradient(90deg, transparent, ${link.hoverColor}50, transparent)`,
                  }}
                  animate={{
                    backgroundPosition: ['-100% 0', '200% 0'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* QR code placeholder (8-bit style) */}
        <motion.div
          className='mt-8 flex justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: startDelay + 1.2, duration: 0.8 }}
        >
          <div className='relative'>
            <div
              className='w-16 h-16 bg-white border-2 border-gray-700'
              style={{
                backgroundImage: `
                  repeating-conic-gradient(
                    from 0deg,
                    #000 0deg 90deg,
                    #fff 90deg 180deg
                  )
                `,
                backgroundSize: '4px 4px',
                imageRendering: 'pixelated',
              }}
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-black font-mono text-xs font-bold'>QR</span>
            </div>
          </div>
        </motion.div>

        {/* Corner decorations */}
        <div className='absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-green-400' />
        <div className='absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-green-400' />
        <div className='absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-green-400' />
        <div className='absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-green-400' />
      </motion.div>

      {/* Glowing outline effect */}
      <motion.div
        className='absolute inset-0 -z-10'
        animate={{
          boxShadow: [
            '0 0 20px #00ffff30',
            '0 0 40px #ff00ff30',
            '0 0 20px #00ffff30',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
