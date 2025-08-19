import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      className='fixed top-0 left-0 right-0 z-40 bg-tech-dark border-b border-tech-dark-elevated'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Name */}
          <motion.div
            className='flex items-center'
            whileHover={{ scale: 1.05 }}
          >
            <h1 className='text-xl font-display font-bold text-tech-text-primary tracking-wide'>
              Hartley H. Leroy
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {['Experience', 'Projects', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className='text-tech-text-secondary hover:text-tech-text-primary transition-colors duration-200 font-display tracking-wide'
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className='md:hidden p-2 rounded-md text-tech-text-secondary hover:text-tech-text-primary focus:outline-none'
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className='h-6 w-6'
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
