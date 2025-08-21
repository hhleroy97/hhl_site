import { motion } from 'framer-motion'

export default function NewAbout() {
  return (
    <section id='about' className='py-24 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-zinc-900/70' />
      <div className='absolute top-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-emerald-500/30 to-transparent' />
      <div className='absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-cyan-500/30 to-transparent' />

      <div className='container-custom relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
            About
          </motion.div>
          <h2 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
            About
          </h2>
        </motion.div>

        <div className='max-w-5xl mx-auto'>
          <div className='grid lg:grid-cols-[1fr,300px] gap-16 items-center'>
            {/* Content */}
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='prose prose-invert prose-xl max-w-none'>
                <p className='text-2xl text-zinc-300 leading-relaxed font-light mb-8'>
                  I'm a{' '}
                  <span className='text-cyan-400 font-medium'>
                    creative technologist
                  </span>{' '}
                  who engineers systems that move — and move people.
                </p>

                <p className='text-lg text-zinc-400 leading-relaxed mb-6'>
                  With experience across robotics, cloud systems, and
                  interactive visuals, I bring a rare blend of technical rigor
                  and artistic vision to the table. Whether building autonomous
                  fleets or crafting audio-reactive visuals, I help ideas become
                  systems.
                </p>

                <blockquote className='border-l-4 border-gradient-to-b border-cyan-400 pl-6 py-4 bg-white/5 rounded-r-lg'>
                  <p className='text-xl text-white font-medium italic'>
                    "The future belongs to those who can bridge the gap between
                    imagination and implementation."
                  </p>
                </blockquote>
              </div>
            </motion.div>

            {/* Photo/Avatar */}
            <motion.div
              className='relative flex justify-center lg:justify-end'
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className='relative'>
                {/* Main photo container */}
                <div className='w-64 h-80 relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20'>
                  {/* Photo placeholder - replace with actual photo */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/20 to-emerald-500/20'>
                    <img
                      src='/src/assets/prof-pic-2.jpg'
                      alt='Hartley Leroy'
                      className='w-full h-full object-cover object-center'
                      onError={e => {
                        // Fallback if image doesn't exist
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-80"></div>
                          </div>
                        `
                      }}
                    />
                  </div>

                  {/* Overlay effects */}
                  <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent' />
                </div>

                {/* Floating elements */}
                <div className='absolute -top-4 -right-4 w-6 h-6 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50' />
                <div
                  className='absolute -bottom-4 -left-4 w-4 h-4 rounded-full bg-fuchsia-500 animate-pulse shadow-lg shadow-fuchsia-500/50'
                  style={{ animationDelay: '1s' }}
                />
                <div
                  className='absolute top-1/2 -left-6 w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50'
                  style={{ animationDelay: '0.5s' }}
                />

                {/* Glow effect */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-xl -z-10' />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
