import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavigationProps {
  currentSection?: number
  onSectionChange?: (index: number) => void
  sections?: Array<{ id: string; label: string; component: any }>
}

const defaultNavItems = [
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation({
  currentSection = 0,
  onSectionChange,
  sections,
}: NavigationProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Use provided sections or fall back to default nav items
  const navItems = sections ? sections.slice(1) : defaultNavItems // Skip hero section for nav
  const isSlideshow = Boolean(sections && onSectionChange)

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try PDF first, fallback to DOCX if not found
    const link = e.currentTarget
    link.addEventListener('error', () => {
      link.href = '/docs/Hartley_LeRoy_Resume_Aug25.docx'
    })
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSlideshow
          ? 'bg-zinc-900/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='container-custom'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <motion.a
            href='#'
            className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent relative border-2 border-red-500 rounded px-2 py-1'
            whileHover={{ scale: 1.05 }}
            onClick={e => {
              e.preventDefault()
              if (isSlideshow && onSectionChange) {
                onSectionChange(0)
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            H.L
            {isSlideshow && currentSection === 0 && (
              <motion.div
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500'
                layoutId='activeTab'
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item, index) => {
              const itemIndex = sections ? index + 1 : index // Adjust for hero section
              const isActive = isSlideshow
                ? currentSection === itemIndex
                : false
              const label = sections ? item.label : item.label

              return (
                <button
                  key={sections ? item.id : item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative border-2 border-red-500 rounded ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-zinc-300 hover:text-cyan-400'
                  }`}
                  onClick={e => {
                    e.preventDefault()
                    if (isSlideshow && onSectionChange) {
                      onSectionChange(itemIndex)
                    } else {
                      const href = sections ? `#${item.id}` : item.href
                      document.querySelector(href)?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500'
                      layoutId='activeTab'
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Resume Button */}
          <div className='flex items-center gap-4'>
            <a
              href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleResumeClick}
              className='hidden sm:inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 ring-1 ring-white/20 hover:ring-white/40 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border-2 border-red-500'
            >
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-lg bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition-colors'
              aria-label='Toggle mobile menu'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className={`transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {isMobileMenuOpen ? (
                  <path d='M18 6 6 18M6 6l12 12' />
                ) : (
                  <path d='M3 12h18M3 6h18M3 18h18' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${
            isSlideshow
              ? 'bg-zinc-900/95 backdrop-blur-md'
              : 'bg-zinc-900/90 backdrop-blur-sm'
          }`}
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='py-4 space-y-2'>
            {navItems.map((item, index) => {
              const itemIndex = sections ? index + 1 : index // Adjust for hero section
              const isActive = isSlideshow
                ? currentSection === itemIndex
                : false
              const label = sections ? item.label : item.label

              return (
                <button
                  key={sections ? item.id : item.href}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-cyan-400 bg-white/10'
                      : 'text-zinc-300 hover:text-cyan-400 hover:bg-white/5'
                  } rounded-lg mx-2`}
                  onClick={e => {
                    e.preventDefault()
                    setIsMobileMenuOpen(false)
                    if (isSlideshow && onSectionChange) {
                      onSectionChange(itemIndex)
                    } else {
                      const href = sections ? `#${item.id}` : item.href
                      document.querySelector(href)?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
                  }}
                >
                  {label}
                </button>
              )
            })}
            <a
              href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleResumeClick}
              className='block mx-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 ring-1 ring-white/20 rounded-lg text-sm font-medium text-center transition-all duration-200'
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
