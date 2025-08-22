import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

export default function NewAbout() {
  return (
    <PageSection
      id='about'
      tagline='About'
      taglineColor='emerald'
      title='Bridging imagination and implementation'
      cardVariant='background'
    >
      <div className='max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-[1fr,350px] gap-16 items-center'>
          {/* Enhanced Content */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Bio Paragraphs */}
            <motion.div
              className='prose prose-invert prose-xl max-w-none space-y-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className='text-2xl text-zinc-300 leading-relaxed font-light mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300'
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
              >
                I'm a{' '}
                <span className='text-cyan-400 font-medium drop-shadow-lg shadow-cyan-400/50'>
                  creative technologist
                </span>{' '}
                who engineers systems that move — and move people.
              </motion.p>

              <motion.p
                className='text-lg text-zinc-400 leading-relaxed mb-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300'
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
              >
                With experience across robotics, cloud systems, and interactive
                visuals, I bring a rare blend of technical rigor and artistic
                vision to the table. Whether building autonomous fleets or
                crafting audio-reactive visuals, I help ideas become systems.
              </motion.p>
            </motion.div>

            {/* Enhanced Quote */}
            <motion.div
              className='relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <blockquote className='relative p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-400/30 backdrop-blur-sm shadow-xl'>
                {/* Quote decoration */}
                <div className='absolute top-4 left-4 w-8 h-8 text-emerald-400 opacity-60'>
                  <svg fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                  </svg>
                </div>

                <p className='text-xl text-white font-medium italic pl-8 leading-relaxed'>
                  "The future belongs to those who can bridge the gap between
                  imagination and implementation."
                </p>

                {/* Enhanced border effect */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500' />
              </blockquote>
            </motion.div>

            {/* Enhanced Skills Preview */}
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className='text-lg font-semibold text-white'>
                Core Strengths
              </h3>
              <div className='flex flex-wrap gap-3'>
                {[
                  {
                    skill: 'System Architecture',
                    color: 'from-cyan-500 to-blue-600',
                  },
                  {
                    skill: 'Creative Technology',
                    color: 'from-fuchsia-500 to-purple-600',
                  },
                  {
                    skill: 'Product Strategy',
                    color: 'from-emerald-500 to-green-600',
                  },
                  {
                    skill: 'Real-time Systems',
                    color: 'from-amber-500 to-orange-600',
                  },
                ].map((item, index) => (
                  <motion.span
                    key={item.skill}
                    className={`px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg backdrop-blur-sm border border-white/20`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                  >
                    {item.skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Photo/Avatar */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative'>
              {/* Enhanced floating frame */}
              <motion.div
                className='relative w-72 h-88'
                whileHover={{
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Main photo container with enhanced styling */}
                <div className='relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl'>
                  {/* Enhanced background gradient */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/20 to-emerald-500/20' />

                  {/* Photo placeholder - replace with actual photo */}
                  <div className='relative w-full h-full'>
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

                  {/* Enhanced overlay effects */}
                  <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent' />

                  {/* Floating geometric elements */}
                  <div className='absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50' />
                  <div
                    className='absolute bottom-4 left-4 w-4 h-4 rounded-full bg-fuchsia-500 animate-pulse shadow-lg shadow-fuchsia-500/50'
                    style={{ animationDelay: '1s' }}
                  />
                  <div
                    className='absolute top-1/2 -left-6 w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50'
                    style={{ animationDelay: '0.5s' }}
                  />
                </div>

                {/* Enhanced glow effect */}
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-xl -z-10' />

                {/* Floating border effect */}
                <div className='absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-border opacity-20 hover:opacity-40 transition-opacity duration-500' />
              </motion.div>

              {/* Enhanced floating elements around photo */}
              <motion.div
                className='absolute -top-8 -right-8 w-16 h-16 border border-cyan-400/30 rounded-full'
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className='absolute -bottom-6 -left-6 w-12 h-12 border border-fuchsia-400/30 rotate-45'
                animate={{
                  rotate: [45, 405],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className='absolute top-1/2 -right-12 w-8 h-8 border border-emerald-400/30'
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className='mt-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href='#contact'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group'
            whileHover={{
              scale: 1.05,
              y: -4,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-10'>
              Let's Create Something Together
            </span>
            {/* Enhanced glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
          </motion.a>
        </motion.div>
      </div>
    </PageSection>
  )
}
