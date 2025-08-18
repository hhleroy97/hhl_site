import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className='relative pt-28 pb-20 px-4 sm:px-6 lg:px-8'>
      {/* soft radial glow */}
      <div
        className='pointer-events-none absolute inset-0 opacity-30'
        aria-hidden='true'
        style={{
          backgroundImage:
            'radial-gradient(600px 300px at 10% 10%, rgba(0, 212, 245, 0.15), transparent 60%), radial-gradient(600px 300px at 90% 20%, rgba(0, 212, 245, 0.08), transparent 60%)',
        }}
      />

      {/* scanning line accent */}
      <motion.div
        className='pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent'
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        aria-hidden='true'
      />

      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className='h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(0,212,245,0.6)]' />
              <span className='text-xs font-mono tracking-widest text-gray-300'>CLOUD + DATA ENGINEER</span>
            </motion.div>

            <motion.h1
              className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-white leading-tight'
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Hartley H.{' '}
              <span className='relative inline-block'>
                Leroy
                <span className='absolute -bottom-1 left-0 right-0 h-3 rounded-md bg-primary-400/20' aria-hidden='true' />
              </span>
            </motion.h1>

            <motion.p
              className='max-w-2xl text-lg text-gray-300/90 font-display'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              I design resilient cloud architectures, expressive data systems, and interactive tools that merge engineering rigor with creative intent.
            </motion.p>

            <motion.div
              className='flex flex-wrap gap-3'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {['AWS', 'GCP', 'Kubernetes', 'PySpark', 'TypeScript', 'TouchDesigner'].map((chip, index) => (
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
                <div key={item.k} className='rounded-lg border border-white/10 bg-white/5 p-3 text-center'>
                  <div className='text-xl font-semibold text-white'>{item.v}</div>
                  <div className='text-[11px] tracking-wider text-gray-400 uppercase'>{item.k}</div>
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
              <div className='absolute -inset-8 rounded-full bg-gradient-radial from-primary-500/25 to-transparent blur-2xl' aria-hidden='true' />

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
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.08 }}
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
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
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