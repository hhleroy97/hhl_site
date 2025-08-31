import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'
import profileImage from '../../assets/prof-pic-no-bg.png'

export default function NewAbout() {
  const positionX = 62
  const positionY = 72
  const scale = 144
  return (
    <PageSection
      id='about'
      tagline='About'
      taglineColor='cyan'
      title='The human behind the systems'
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
                className='text-2xl font-bold text-white mb-6'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                The Creative Technologist
              </h3>

              <div className='prose prose-invert prose-lg max-w-none'>
                <p className='text-lg text-zinc-300 leading-relaxed mb-6'>
                  I'm a{' '}
                  <span className='text-purple-400 font-semibold'>
                    creative technologist
                  </span>{' '}
                  who helps bring ambitious ideas to life at the crossroads of
                  technology and creativity. From leading a $500K AWS migration
                  to replace third-party systems and avoid vendor lock-in, to
                  crafting immersive real-time data art and visualizations — my
                  work blends engineering rigor with creative problem-solving.
                </p>

                <p className='text-lg text-zinc-300 leading-relaxed mb-6'>
                  I love making complexity approachable, whether that means
                  developing real-time data pipelines for connecting edge
                  devices to the cloud, optimizing infrastructure for cost and
                  latency, or designing visuals that make data feel alive.
                  Clients and collaborators know me for versatility: I can
                  architect backend pipelines in the morning and prototype
                  engaging user-facing experiences in the afternoon.
                </p>

                <p className='text-lg text-zinc-300 leading-relaxed'>
                  If you're tackling a project that requires both{' '}
                  <span className='text-cyan-400 font-medium'>
                    technical depth
                  </span>{' '}
                  and{' '}
                  <span className='text-emerald-400 font-medium'>
                    creative vision
                  </span>
                  , let's talk — I specialize in bridging infrastructure and
                  imagination.
                </p>
              </div>
            </div>

            {/* Hobbies and Interests */}
            <div className='space-y-3 mt-12'>
              <h3
                className='text-2xl font-bold text-white mb-6'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Beyond Code
              </h3>

              {/* Hobbies Grid */}
              <div className='grid grid-cols-3 md:grid-cols-5 gap-4 justify-start'>
                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <svg
                    className='w-8 h-8 mb-2 text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
                    />
                  </svg>
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Music Production
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <svg
                    className='w-8 h-8 mb-2 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l4.414 4.414a1 1 0 00.707.293H17M6 10a2 2 0 112-2 2 2 0 01-2 2zm0 0v2a2 2 0 002 2h2m2-6a2 2 0 012-2 2 2 0 01-2-2m0 6h.01'
                    />
                  </svg>
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Video Games
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <svg
                    className='w-8 h-8 mb-2 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Pickleball
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <svg
                    className='w-8 h-8 mb-2 text-orange-400 group-hover:scale-110 group-hover:text-orange-300 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z'
                    />
                  </svg>
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Hiking
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <svg
                    className='w-8 h-8 mb-2 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 3l14 9-9 3-1 6-3-6z'
                    />
                  </svg>
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Snowboarding
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual Identity */}
          <motion.div
            className='flex flex-col items-center justify-center h-full space-y-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced Photo Section */}
            <div className='relative'>
              {/* Main photo container with enhanced styling */}
              <div className='relative w-80 h-80 overflow-hidden rounded-full bg-gradient-to-br from-white/10 via-white/5 to-black/20 border border-white/20 shadow-2xl'>
                {/* Photo with enhanced overlay */}
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20'>
                  <div
                    className='relative w-full h-full'
                    style={{
                      transform: `translate(${(positionX - 50) * 2}px, ${(positionY - 50) * 2}px) scale(${scale / 100})`,
                      transformOrigin: 'center',
                    }}
                  >
                    <img
                      src={profileImage}
                      alt='Hartley LeRoy - Creative Technologist'
                      className='w-full h-full object-contain'
                      style={{
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                      loading='lazy'
                      onLoad={e => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onError={e => {
                        console.error(
                          'Error loading profile image from:',
                          profileImage,
                          e
                        )
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

            {/* Location and Availability Tags */}
            <div className='flex flex-col items-center space-y-3 mt-6'>
              {/* Location Tag */}
              <div className='flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20 shadow-lg'>
                <span className='text-lg'>📍</span>
                <span className='text-sm font-medium text-zinc-300'>
                  Charlotte, NC
                </span>
              </div>

              {/* Availability Tag */}
              <div className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-md rounded-full border border-emerald-400/30 shadow-lg'>
                <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-emerald-300'>
                  Open to freelance & full-time
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
