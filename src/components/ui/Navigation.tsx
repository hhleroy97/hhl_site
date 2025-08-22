import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

interface NavigationProps {
  currentSection?: number
  onSectionChange?: (index: number) => void
  sections?: Array<{
    id: string
    label: string
    component: React.ComponentType
  }>
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

  // Helper function to get item key
  const getItemKey = (item: any, index: number) => {
    if ('id' in item) return item.id
    if ('href' in item) return item.href
    return index.toString()
  }

  // Helper function to get item label
  const getItemLabel = (item: any) => {
    return item.label
  }

  // Helper function to get item href
  const getItemHref = (item: any) => {
    if ('id' in item) return `#${item.id}`
    if ('href' in item) return item.href
    return '#'
  }

  return (
    <>
      {/* Enhanced Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSlideshow
            ? 'bg-zinc-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='container-custom'>
          <div className='flex items-center justify-between h-20'>
            {/* Enhanced Logo */}
            <motion.a
              href='#'
              className='text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent relative group'
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              onClick={e => {
                e.preventDefault()
                if (isSlideshow && onSectionChange) {
                  onSectionChange(0)
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              <span className='relative z-10'>H.L</span>
              {/* Enhanced glow effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/20 to-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              {isSlideshow && currentSection === 0 && (
                <motion.div
                  className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 rounded-full shadow-lg shadow-cyan-400/50'
                  layoutId='activeTab'
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>

            {/* Enhanced Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-2'>
              {navItems.map((item, index) => {
                const itemIndex = sections ? index + 1 : index // Adjust for hero section
                const isActive = isSlideshow
                  ? currentSection === itemIndex
                  : false
                const label = getItemLabel(item)

                return (
                  <motion.button
                    key={getItemKey(item, index)}
                    className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-400/20'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={e => {
                      e.preventDefault()
                      if (isSlideshow && onSectionChange) {
                        onSectionChange(itemIndex)
                      } else {
                        const href = getItemHref(item)
                        document.querySelector(href)?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                    }}
                  >
                    <span className='relative z-10'>{label}</span>
                    {/* Hover glow effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
                  </motion.button>
                )
              })}

              {/* Enhanced Resume Button */}
              <motion.a
                href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                className='relative px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group'
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeClick}
              >
                <span className='relative z-10'>Resume</span>
                {/* Enhanced glow effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className='md:hidden p-2 text-zinc-300 hover:text-white transition-colors'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Progress Indicator */}
      {isSlideshow && (
        <motion.div
          className='fixed top-24 left-1/2 transform -translate-x-1/2 z-40'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className='flex items-center space-x-3 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-xl'>
            <span className='text-xs text-zinc-400 font-medium'>
              {currentSection + 1} / {sections?.length || navItems.length + 1}
            </span>
            <div className='w-24 h-1 bg-zinc-700 rounded-full overflow-hidden'>
              <motion.div
                className='h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full'
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentSection + 1) / (sections?.length || navItems.length + 1)) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Floating Navigation Dots */}
      {isSlideshow && (
        <motion.div
          className='fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {(sections || defaultNavItems).map((_, index) => {
            const isActive = currentSection === index
            return (
              <motion.button
                key={index}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-lg shadow-cyan-400/50'
                    : 'bg-white/20 hover:bg-white/40 border border-white/30'
                }`}
                whileHover={{
                  scale: 1.3,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSectionChange?.(index)}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-fuchsia-500/30 blur-md'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='fixed inset-0 z-50 md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='absolute inset-0 bg-zinc-900/95 backdrop-blur-xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className='absolute top-20 left-4 right-4 bg-zinc-800/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl'
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className='p-6 space-y-4'>
                {navItems.map((item, index) => {
                  const itemIndex = sections ? index + 1 : index
                  const isActive = isSlideshow
                    ? currentSection === itemIndex
                    : false

                  return (
                    <motion.button
                      key={getItemKey(item, index)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white border border-cyan-400/30'
                          : 'text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        if (isSlideshow && onSectionChange) {
                          onSectionChange(itemIndex)
                        } else {
                          const href = getItemHref(item)
                          document.querySelector(href)?.scrollIntoView({
                            behavior: 'smooth',
                          })
                        }
                      }}
                    >
                      {getItemLabel(item)}
                    </motion.button>
                  )
                })}
                <motion.a
                  href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                  className='block w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold'
                  whileHover={{ x: 4 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
