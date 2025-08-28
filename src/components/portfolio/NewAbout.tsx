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
        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-[3fr,1fr] gap-12 items-start'>
          {/* Left Column - Story & Philosophy */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Core Identity */}
            <div className='space-y-3'>
              <h3
                className='text-2xl font-bold text-white mb-4'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
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

            {/* Key Strengths */}
            <div className='space-y-3'>
              <h3 className='text-xl font-bold text-white mb-3'>
                What Sets Me Apart
              </h3>

              <div className='grid md:grid-cols-2 gap-3'>
                <motion.div
                  className='group p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative'
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Enhanced depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
                  <div className='relative z-10'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
                      <h4 className='text-base font-semibold text-purple-400'>
                        Systems Thinking
                      </h4>
                    </div>
                    <p className='text-zinc-300 text-xs leading-relaxed'>
                      I architect solutions that scale from prototypes to
                      production, always considering the full ecosystem impact.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className='group p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative'
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Enhanced depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
                  <div className='relative z-10'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-2 h-2 bg-cyan-400 rounded-full'></div>
                      <h4 className='text-base font-semibold text-cyan-400'>
                        Creative Problem Solving
                      </h4>
                    </div>
                    <p className='text-zinc-300 text-xs leading-relaxed'>
                      Every technical challenge is an opportunity for
                      innovation. I thrive on finding elegant solutions to
                      complex problems.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className='group p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative'
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {/* Enhanced depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
                  <div className='relative z-10'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
                      <h4 className='text-base font-semibold text-emerald-400'>
                        Cross-Domain Expertise
                      </h4>
                    </div>
                    <p className='text-zinc-300 text-xs leading-relaxed'>
                      From robotics to cloud systems to interactive visuals, I
                      bring diverse perspectives to every project.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className='group p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative'
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {/* Enhanced depth effects */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
                  <div className='relative z-10'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-2 h-2 bg-zinc-400 rounded-full'></div>
                      <h4 className='text-base font-semibold text-zinc-400'>
                        Human-Centered Design
                      </h4>
                    </div>
                    <p className='text-zinc-300 text-xs leading-relaxed'>
                      Technology should serve people. I build systems that are
                      both powerful and intuitive to use.
                    </p>
                  </div>
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
              <div className='relative w-64 h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 border border-white/20 shadow-2xl'>
                {/* Photo with enhanced overlay */}
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20'>
                  <img
                    src='/prof-pic-2.jpg'
                    alt='Hartley LeRoy - Creative Technologist'
                    className='w-full h-full object-cover object-center'
                    loading='lazy'
                    onLoad={e => {
                      e.currentTarget.style.opacity = '1'
                    }}
                    onError={e => {
                      console.error('Error loading profile image:', e)
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
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
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
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
