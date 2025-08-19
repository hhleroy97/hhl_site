export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Name */}
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Hartley H. Leroy
            </h1>
          </div>

          {/* Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className='text-gray-600 hover:text-gray-900 transition-colors duration-200'
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none'>
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
          </button>
        </div>
      </div>
    </header>
  )
}
