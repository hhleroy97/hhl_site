import { motion } from 'framer-motion'
import { useNavigationContent } from '@/hooks/useSiteContent'
import { GitHubLoginButton } from '@/components/ui/GitHubLoginButton'
import { env } from '@/utils/env'

export default function Header() {
  const { navigation, loading } = useNavigationContent()

  if (loading || !navigation) {
    return (
      <motion.header
        className='fixed top-0 left-0 right-0 z-40 bg-tech-dark/95 backdrop-blur-xl border-b border-accentWarm/20 shadow-glow-warm'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='h-6 w-24 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='hidden md:flex space-x-8'>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className='h-4 w-16 bg-tech-dark-surface/50 rounded animate-pulse'
                ></div>
              ))}
            </div>
            <div className='h-8 w-20 bg-tech-dark-surface/50 rounded animate-pulse'></div>
          </div>
        </div>
      </motion.header>
    )
  }

  return (
    <motion.header
      className='fixed top-0 left-0 right-0 z-40 bg-tech-dark/95 backdrop-blur-xl border-b border-accentWarm/20 shadow-glow-warm'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Name - Enhanced with disciplined glow */}
          <motion.a
            href='#'
            className='flex items-center group'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h1 className='text-xl font-black text-accentWarm tracking-wider relative'>
              <span className='relative z-10'>{navigation.logo}</span>
              {/* Single accent glow matching hero */}
              <span className='absolute inset-0 text-accentWarm blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300'>
                {navigation.logo}
              </span>
            </h1>
          </motion.a>

          {/* Navigation - Floating elements with premium hover states */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigation.links.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className='relative px-4 py-2 text-tech-text-secondary hover:text-accentWarm transition-all duration-300 font-semibold tracking-wide group rounded-lg'
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <span className='relative z-10'>{item.label}</span>
                {/* Floating background with glow */}
                <div className='absolute inset-0 bg-accentWarm/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm'></div>
                {/* Subtle glow on hover */}
                <div className='absolute inset-0 bg-accentWarm/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl'></div>
              </motion.a>
            ))}
          </nav>

          {/* GitHub Login Button */}
          {env.features.githubAuth && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <GitHubLoginButton className='mr-4' />
            </motion.div>
          )}

          {/* Resume CTA - Enhanced with glow */}
          <motion.a
            href={navigation.cta.href}
            target={navigation.cta.external ? '_blank' : undefined}
            rel={navigation.cta.external ? 'noopener noreferrer' : undefined}
            className='group relative px-4 py-2 bg-accentWarm text-tech-dark font-semibold rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm'
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {/* Button glow effects */}
            <div className='absolute inset-0 bg-accentWarm blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>

            <span className='relative z-10'>{navigation.cta.label}</span>
          </motion.a>

          {/* Mobile menu button - Enhanced with glow */}
          <motion.button
            className='md:hidden relative p-2 rounded-xl text-tech-text-secondary hover:text-accentWarm focus:outline-none backdrop-blur-sm hover:bg-accentWarm/10 transition-all duration-300 group focus-ring-warm'
            whileHover={{
              scale: 1.05,
              y: -1,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle glow background */}
            <div className='absolute inset-0 bg-accentWarm/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
            <svg
              className='h-6 w-6 relative z-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
