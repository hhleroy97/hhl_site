import { motion } from 'framer-motion'
import { Music, Gamepad2 } from 'lucide-react'
import PageSection from '../ui/PageSection'
import profileImage from '../../assets/prof-pic-no-bg.png'
import pickleballImage from '../../assets/pickleball.png'
import hikeImage from '../../assets/hike.png'
import snowboardImage from '../../assets/snowboard.png'

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
                  <Music className='w-8 h-8 mb-2 text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300' />
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Music Production
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <Gamepad2 className='w-8 h-8 mb-2 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300' />
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Video Games
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <img
                    src={pickleballImage}
                    alt='Pickleball'
                    className='w-8 h-8 mb-2 group-hover:scale-110 transition-all duration-300'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(67%) sepia(32%) saturate(1292%) hue-rotate(124deg) brightness(91%) contrast(85%)',
                    }}
                  />
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Pickleball
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <img
                    src={hikeImage}
                    alt='Hiking'
                    className='w-8 h-8 mb-2 group-hover:scale-110 transition-all duration-300'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(68%) sepia(57%) saturate(606%) hue-rotate(359deg) brightness(99%) contrast(88%)',
                    }}
                  />
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Hiking
                  </span>
                </div>

                <div className='flex flex-col items-center group p-3 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300'>
                  <img
                    src={snowboardImage}
                    alt='Snowboarding'
                    className='w-8 h-8 mb-2 group-hover:scale-110 transition-all duration-300'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(59%) sepia(92%) saturate(1686%) hue-rotate(182deg) brightness(97%) contrast(94%)',
                    }}
                  />
                  <span className='text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors text-center'>
                    Snowboarding
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Professional Profile */}
          <motion.div
            className='flex flex-col items-center justify-start h-full'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Profile Photo */}
            <div className='relative mb-6'>
              <div className='w-72 h-72 rounded-2xl bg-gradient-to-br from-white/5 via-white/2 to-black/10 backdrop-blur-md border border-white/10 p-4 shadow-lg'>
                <div className='relative w-full h-full overflow-hidden rounded-xl'>
                  <div
                    className='relative w-full h-full'
                    style={{
                      transform: `translate(${(positionX - 50) * 1.5}px, ${(positionY - 50) * 1.5}px) scale(${scale / 100})`,
                      transformOrigin: 'center',
                    }}
                  >
                    <img
                      src={profileImage}
                      alt='Hartley LeRoy - Creative Technologist'
                      className='w-full h-full object-contain'
                      loading='lazy'
                      onLoad={e => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      style={{
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                  </div>
                  {/* Subtle gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl' />
                </div>
              </div>

              {/* Available Status */}
              <div className='absolute -top-2 -right-2'>
                <div className='flex items-center gap-1.5 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-md border border-emerald-400/30'>
                  <div className='w-1.5 h-1.5 bg-white rounded-full' />
                  <span className='text-xs font-medium text-white'>
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className='text-center mb-6'>
              <h3 className='text-xl font-semibold text-white mb-1'>
                Hartley LeRoy
              </h3>
              <p className='text-sm text-zinc-400 mb-3'>
                Creative Technologist
              </p>

              {/* Location */}
              <div className='flex items-center justify-center gap-1.5 text-zinc-500 text-sm'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Charlotte, NC</span>
              </div>
            </div>

            {/* Work Status */}
            <div className='w-full max-w-xs p-4 rounded-xl bg-gradient-to-br from-white/5 via-white/2 to-black/10 backdrop-blur-sm border border-white/10'>
              <div className='text-center mb-3'>
                <p className='text-sm font-medium text-white mb-1'>
                  Open to opportunities
                </p>
                <p className='text-xs text-zinc-400'>
                  Available for new projects
                </p>
              </div>

              {/* Status Pills */}
              <div className='flex gap-2 justify-center'>
                <div className='px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-medium'>
                  Freelance
                </div>
                <div className='px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium'>
                  Full-time
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
