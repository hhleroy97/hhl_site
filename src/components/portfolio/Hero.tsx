import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className='relative pt-20 pb-16 px-6 lg:px-8'>
      {/* Subtle background accent - reduced intensity */}
      <div
        className='pointer-events-none absolute inset-0 opacity-10'
        aria-hidden='true'
        style={{
          backgroundImage:
            'radial-gradient(800px 400px at 20% 10%, rgba(0, 229, 255, 0.1), transparent 70%)',
        }}
      />

      <div className='relative max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Professional status badge */}
            <motion.div
              className='inline-flex items-center gap-3 card-surface px-4 py-2'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className='w-2 h-2 rounded-full bg-cyberpunk-neon animate-pulse' />
              <span className='text-sm font-medium text-cyberpunk-text-secondary tracking-wide'>
                Available for opportunities
              </span>
            </motion.div>

            {/* Main heading with better hierarchy */}
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-cyberpunk-text-primary leading-tight'>
                Hartley H.{' '}
                <span className='relative'>
                  <span className='text-cyberpunk-neon'>Leroy</span>
                  <span
                    className='absolute -bottom-2 left-0 right-0 h-1 bg-cyberpunk-neon/30 rounded-full'
                    aria-hidden='true'
                  />
                </span>
              </h1>
              
              <p className='text-xl text-cyberpunk-text-secondary font-medium'>
                Cloud & Data Engineer
              </p>
            </motion.div>

            {/* Enhanced description */}
            <motion.p
              className='text-lg text-cyberpunk-text-secondary leading-relaxed max-w-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Specializing in resilient cloud architectures, scalable data systems, 
              and innovative solutions that bridge engineering excellence with creative vision.
            </motion.p>

            <motion.div
              className='flex flex-wrap gap-3'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {[
                'AWS',
                'GCP',
                'Kubernetes',
                'PySpark',
                'TypeScript',
                'TouchDesigner',
              ].map(chip => (
                <span
                  key={chip}
                  className='rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-wide text-gray-300/90'
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              className='flex flex-wrap gap-4 pt-2'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <motion.a
                href='#projects'
                className='px-6 py-3 rounded-lg bg-primary-500 text-gray-900 font-display font-semibold shadow-sm shadow-primary-500/20 hover:bg-primary-400 transition-colors'
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Work
              </motion.a>
              <motion.a
                href='#contact'
                className='px-6 py-3 rounded-lg border border-white/15 text-white font-display hover:border-primary-400/60 hover:text-primary-200 transition-colors'
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
            </motion.div>

            <motion.div
              className='mt-6 grid grid-cols-3 gap-4 max-w-md'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              {[
                { k: 'Years', v: '8+' },
                { k: 'Projects', v: '40+' },
                { k: 'Installations', v: '12' },
              ].map(item => (
                <div
                  key={item.k}
                  className='rounded-lg border border-white/10 bg-white/5 p-3 text-center'
                >
                  <div className='text-xl font-semibold text-white'>
                    {item.v}
                  </div>
                  <div className='text-[11px] tracking-wider text-gray-400 uppercase'>
                    {item.k}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Data orbit visual */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='relative w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem]'>
              {/* aura */}
              <div
                className='absolute -inset-8 rounded-full bg-gradient-radial from-primary-500/25 to-transparent blur-2xl'
                aria-hidden='true'
              />

              {/* orbit container */}
              <motion.div
                className='relative w-full h-full'
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                aria-hidden='true'
              >
                {/* outer ring */}
                <div className='absolute inset-0 rounded-full border border-white/10' />
                {/* mid ring */}
                <div className='absolute inset-6 rounded-full border border-white/10' />
                {/* inner ring */}
                <div className='absolute inset-12 rounded-full border border-white/10' />

                {/* center node */}
                <motion.div
                  className='absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400 shadow-[0_0_20px_rgba(0,212,245,0.7)]'
                  animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* orbiting nodes */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2
                  const radius = 150
                  const x = 160 + Math.cos(angle) * radius
                  const y = 160 + Math.sin(angle) * radius
                  return (
                    <motion.div
                      key={i}
                      className='absolute h-2 w-2 rounded-full bg-white/80'
                      style={{ left: x, top: y }}
                      animate={{ y: [y, y - 8, y], opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                    />
                  )
                })}

                {/* data streaks */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent'
                    style={{ top: `${10 + i * 25}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
