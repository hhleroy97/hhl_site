import { motion } from 'framer-motion'

export default function NewHero() {
  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse' />
        <div className='absolute top-1/2 right-20 w-1 h-24 bg-gradient-to-b from-fuchsia-500 to-transparent animate-pulse delay-700' />
        <div className='absolute bottom-1/4 left-1/3 w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent animate-pulse delay-1000' />
      </div>

      <div className='container-custom relative z-10'>
        <div className='max-w-4xl'>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name */}
            <motion.h1
              className='text-6xl md:text-8xl font-bold tracking-tight'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className='bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
                Hartley LeRoy
              </span>
            </motion.h1>

            {/* Main tagline */}
            <motion.h2
              className='text-2xl md:text-3xl font-light text-white leading-relaxed max-w-3xl'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Turning data into{' '}
              <span className='text-cyan-400 font-bold'>art</span>,{' '}
              <span className='text-fuchsia-400 font-bold'>insight</span>, and{' '}
              <span className='text-emerald-400 font-bold'>autonomy</span> —
              bridging infrastructure and imagination.
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className='text-xl text-zinc-300 max-w-2xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Cloud & Creative Engineer — robotics fleet management, data
              pipelines, and real-time visuals.
            </motion.p>

            {/* Status and contact info */}
            <motion.div
              className='flex flex-wrap items-center gap-6 text-sm text-zinc-400'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
                <span>Charlotte, NC</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300' />
                <span>Open to work</span>
              </div>
              <div className='flex items-center gap-4'>
                <a
                  href='https://github.com/hhleroy97'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-zinc-400 hover:text-cyan-400 transition-colors'
                  aria-label='GitHub profile'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
                <a
                  href='https://linkedin.com/in/hartley-leroy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-zinc-400 hover:text-cyan-400 transition-colors'
                  aria-label='LinkedIn profile'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z' />
                  </svg>
                </a>
                <a
                  href='mailto:hartley.leroy1997@gmail.com'
                  className='text-zinc-400 hover:text-cyan-400 transition-colors'
                  aria-label='Email contact'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className='flex flex-wrap gap-4 pt-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a
                href='/docs/Hartley_LeRoy_Resume_Aug25.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300'
                onError={e => {
                  const target = e.target as HTMLAnchorElement
                  target.href = '/docs/Hartley_LeRoy_Resume_Aug25.docx'
                }}
              >
                View Resume
              </a>
              <a
                href='#contact'
                className='px-8 py-3 border border-cyan-400/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300'
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background grid effect */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  )
}
