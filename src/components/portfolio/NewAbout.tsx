import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

export default function NewAbout() {
  return (
    <PageSection
      id='about'
      tagline='About'
      taglineColor='cyan'
      title='The Human Behind The Systems'
      subtitle='where creativity meets computation'
      cardVariant='background'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Hero Statement */}
        <motion.div
          className='text-center mb-8'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl md:text-5xl font-black mb-4 leading-tight'>
            I build systems that{' '}
            <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent'>
              move
            </span>
            <br />
            <span className='text-3xl md:text-4xl font-light'>
              and move people
            </span>
          </h2>

          <p className='text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed'>
            From autonomous fleets to audio-reactive visuals, I bridge the gap
            between
            <span className='text-purple-400 font-medium'>
              {' '}
              imagination and implementation
            </span>
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-[2fr,1fr] gap-16 items-start'>
          {/* Left Column - Story & Philosophy */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Core Identity */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                The Creative Technologist
              </h3>

              <div className='prose prose-invert prose-lg max-w-none'>
                <p className='text-lg text-zinc-300 leading-relaxed'>
                  I'm a{' '}
                  <span className='text-purple-400 font-semibold'>
                    creative technologist
                  </span>{' '}
                  who sees technology as a canvas for human imagination. My work
                  spans robotics, cloud systems, and interactive experiences —
                  always with the goal of making complex systems feel intuitive
                  and inspiring.
                </p>

                <p className='text-lg text-zinc-300 leading-relaxed'>
                  Whether I'm architecting autonomous fleets that navigate
                  continents or crafting audio-reactive visuals that respond to
                  music, I bring a unique blend of
                  <span className='text-cyan-400 font-medium'>
                    {' '}
                    technical rigor
                  </span>{' '}
                  and
                  <span className='text-emerald-400 font-medium'>
                    {' '}
                    artistic vision
                  </span>{' '}
                  to every project.
                </p>
              </div>
            </div>

            {/* Signature Quote */}
            <motion.div
              className='relative'
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <blockquote className='relative'>
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-cyan-400 to-emerald-400 rounded-full'></div>
                <div className='pl-8 py-6 bg-gradient-to-r from-white/5 via-white/3 to-transparent rounded-r-2xl border border-white/10'>
                  <p className='text-2xl text-white font-medium italic leading-relaxed'>
                    "The future belongs to those who can bridge the gap between
                    imagination and implementation."
                  </p>
                  <div className='mt-4 text-sm text-zinc-400 font-medium'>
                    — My Engineering Philosophy
                  </div>
                </div>
              </blockquote>
            </motion.div>

            {/* Key Strengths */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                What Sets Me Apart
              </h3>

              <div className='grid md:grid-cols-2 gap-4'>
                <motion.div
                  className='p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl border border-purple-500/20'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-3 h-3 bg-purple-400 rounded-full'></div>
                    <h4 className='text-lg font-semibold text-purple-400'>
                      Systems Thinking
                    </h4>
                  </div>
                  <p className='text-zinc-300 text-sm leading-relaxed'>
                    I architect solutions that scale from prototypes to
                    production, always considering the full ecosystem impact.
                  </p>
                </motion.div>

                <motion.div
                  className='p-4 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl border border-cyan-500/20'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-3 h-3 bg-cyan-400 rounded-full'></div>
                    <h4 className='text-lg font-semibold text-cyan-400'>
                      Creative Problem Solving
                    </h4>
                  </div>
                  <p className='text-zinc-300 text-sm leading-relaxed'>
                    Every technical challenge is an opportunity for innovation.
                    I thrive on finding elegant solutions to complex problems.
                  </p>
                </motion.div>

                <motion.div
                  className='p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl border border-emerald-500/20'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-3 h-3 bg-emerald-400 rounded-full'></div>
                    <h4 className='text-lg font-semibold text-emerald-400'>
                      Cross-Domain Expertise
                    </h4>
                  </div>
                  <p className='text-zinc-300 text-sm leading-relaxed'>
                    From robotics to cloud systems to interactive visuals, I
                    bring diverse perspectives to every project.
                  </p>
                </motion.div>

                <motion.div
                  className='p-4 bg-gradient-to-br from-zinc-500/10 to-zinc-600/5 rounded-xl border border-zinc-500/20'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-3 h-3 bg-zinc-400 rounded-full'></div>
                    <h4 className='text-lg font-semibold text-zinc-400'>
                      Human-Centered Design
                    </h4>
                  </div>
                  <p className='text-zinc-300 text-sm leading-relaxed'>
                    Technology should serve people. I build systems that are
                    both powerful and intuitive to use.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual Identity */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced Photo Section */}
            <div className='relative'>
              {/* Main photo container with enhanced styling */}
              <div className='relative w-72 h-88 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 border border-white/20 shadow-2xl'>
                {/* Photo with enhanced overlay */}
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20'>
                  <img
                    src='/src/assets/prof-pic-2.jpg'
                    alt='Hartley LeRoy - Creative Technologist'
                    className='w-full h-full object-cover object-center'
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20">
                          <div class="text-center">
                            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4 flex items-center justify-center">
                              <span class="text-4xl font-bold text-white">HL</span>
                            </div>
                            <p class="text-white text-lg font-medium">Hartley LeRoy</p>
                            <p class="text-zinc-300 text-sm">Creative Technologist</p>
                          </div>
                        </div>
                      `
                    }}
                  />
                </div>

                {/* Enhanced overlay effects */}
                <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-900/40' />
              </div>

              {/* Enhanced floating elements */}
              <motion.div
                className='absolute -top-6 -right-6 w-8 h-8 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className='absolute -bottom-6 -left-6 w-6 h-6 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50'
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
              <motion.div
                className='absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50'
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />

              {/* Enhanced glow effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 blur-2xl -z-10' />
            </div>

            {/* Quick Stats */}
            <motion.div
              className='grid grid-cols-2 gap-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className='text-center p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-purple-400 mb-1'>
                  $500K+
                </div>
                <div className='text-xs text-zinc-400'>AWS Migration</div>
              </div>
              <div className='text-center p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-cyan-400 mb-1'>6</div>
                <div className='text-xs text-zinc-400'>Engineer Teams</div>
              </div>
              <div className='text-center p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-emerald-400 mb-1'>
                  Multi
                </div>
                <div className='text-xs text-zinc-400'>Continent Fleet</div>
              </div>
              <div className='text-center p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-zinc-400 mb-1'>
                  Real
                </div>
                <div className='text-xs text-zinc-400'>Time Systems</div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button className='px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'>
                Let's Build Something Amazing
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
