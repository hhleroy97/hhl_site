import { motion } from 'framer-motion'
import { Music, Gamepad2, MapPin } from 'lucide-react'
import PageSection from '../../ui/PageSection'
import profileImage from '../../../assets/prof-pic-no-bg.png'
import pickleballImage from '../../../assets/pickleball.png'
import hikeImage from '../../../assets/hike.png'
import snowboardImage from '../../../assets/snowboard.png'

export default function NewAbout() {
  const positionX = 19
  const positionY = 94
  const scale = 188

  return (
    <PageSection
      id='about'
      tagline='About'
      taglineColor='cyan'
      title='The man behind the systems where'
      subtitle='creativity meets computation'
      cardVariant='floating'
      flipMobileCorners={false}
    >
      <div className='w-full max-w-[95vw] mx-auto px-2 sm:px-4'>
        {/* Mobile-only Creative Technologist heading first */}
        <div className='md:hidden text-center pb-4'>
          <h3
            className='text-xl font-bold text-white'
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            The Creative Technologist
          </h3>
        </div>

        {/* Mobile-only Profile Picture after Creative Technologist */}
        <div className='md:hidden flex justify-center pb-4'>
          <div className='relative w-64'>
            <div className='w-64 h-64 rounded-t-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 p-3 shadow-xl relative overflow-hidden'>
              {/* Animated gradient background */}
              <div
                className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-emerald-500/10 animate-pulse'
                style={{ animationDuration: '4s' }}
              />
              <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent' />

              <div className='relative w-full h-full overflow-hidden'>
                <div
                  className='relative w-full h-full'
                  style={{
                    transform: `translate(${positionX}px, ${positionY}px) scale(${scale / 100})`,
                    transformOrigin: 'center',
                  }}
                >
                  <img
                    src={profileImage}
                    alt='Hartley LeRoy - Creative Technologist'
                    className='w-full h-full object-contain'
                    loading='lazy'
                  />
                </div>
                {/* Enhanced gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5' />
              </div>
            </div>

            {/* Profile Info */}
            <div className='w-64 text-center p-2 pb-4 rounded-b-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border-x border-b border-white/20 shadow-xl'>
              <h3
                className='text-lg font-semibold text-white mb-1'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Hartley LeRoy
              </h3>

              {/* Enhanced Location */}
              <div className='flex items-center justify-center gap-1 text-zinc-400 text-xs'>
                <MapPin className='w-3 h-3 text-cyan-400' />
                <span>Charlotte, NC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only taglines after profile picture */}
        <div className='md:hidden text-center pb-4'>
          <h2
            className='text-sm font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            The man behind the systems where
            <br />
            <span className='text-zinc-300'>
              <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                creativity
              </span>{' '}
              meets{' '}
              <span className='bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent'>
                computation
              </span>
            </span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-[3fr,1fr] gap-6 sm:gap-8 md:gap-12 items-start relative'>
          {/* Left Column - Story & Philosophy */}
          <motion.div
            className='space-y-4 sm:space-y-5 md:space-y-6'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Core Identity */}
            <div className='space-y-3'>
              <h3
                className='hidden md:block text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-5 md:mb-6'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                The Creative Technologist
              </h3>

              <div className='prose prose-invert prose-lg max-w-none'>
                <p className='text-base sm:text-lg text-zinc-300 leading-relaxed mb-4 sm:mb-5 md:mb-6'>
                  I'm a{' '}
                  <span className='text-cyan-400 font-semibold'>
                    software developer
                  </span>{' '}
                  and{' '}
                  <span className='text-purple-400 font-semibold'>
                    creative technologist
                  </span>{' '}
                  who helps bring ambitious ideas to life at the crossroads of
                  technology and creativity. From leading a $500K AWS migration
                  to replace third-party systems and avoid vendor lock-in, to
                  crafting immersive real-time data art and visualizations — my
                  work blends engineering rigor with creative problem-solving.
                </p>

                <p className='text-base sm:text-lg text-zinc-300 leading-relaxed mb-4 sm:mb-5 md:mb-6'>
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
            className='flex flex-col items-center justify-start sticky top-8 lg:sticky'
            style={{ height: 'fit-content' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Profile Photo - Desktop only */}
            <div className='hidden lg:block relative w-64 sm:w-72'>
              <div className='w-64 sm:w-72 h-64 sm:h-72 rounded-t-2xl lg:rounded-tl-2xl lg:rounded-tr-2xl lg:rounded-bl-none lg:rounded-br-none bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 p-3 sm:p-4 shadow-xl relative overflow-hidden'>
                {/* Animated gradient background */}
                <div
                  className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-emerald-500/10 animate-pulse'
                  style={{ animationDuration: '4s' }}
                />
                <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent' />

                <div className='relative w-full h-full overflow-hidden'>
                  <div
                    className='relative w-full h-full'
                    style={{
                      transform: `translate(${positionX}px, ${positionY}px) scale(${scale / 100})`,
                      transformOrigin: 'center',
                    }}
                  >
                    <img
                      src={profileImage}
                      alt='Hartley LeRoy - Creative Technologist'
                      className='w-full h-full object-contain'
                      loading='lazy'
                    />
                  </div>
                  {/* Enhanced gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5' />
                </div>
              </div>
            </div>

            {/* Profile Info - Desktop only */}
            <div className='hidden lg:block w-64 sm:w-72 text-center p-2 sm:p-3 bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border-x border-white/20 shadow-xl rounded-none'>
              <h3
                className='text-lg sm:text-xl font-semibold text-white mb-1'
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Hartley LeRoy
              </h3>

              {/* Enhanced Location */}
              <div className='flex items-center justify-center gap-1 sm:gap-2 text-zinc-400 text-xs sm:text-sm'>
                <MapPin className='w-3 h-3 sm:w-4 sm:h-4 text-cyan-400' />
                <span>Charlotte, NC</span>
              </div>
            </div>

            {/* Work Status - Both mobile and desktop */}
            <div className='w-64 sm:w-72 p-3 pb-4 rounded-2xl lg:rounded-t-none lg:rounded-b-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-md border border-white/20 shadow-xl flex flex-col justify-between'>
              <div>
                <div className='text-center mb-3'>
                  <p className='text-sm font-medium text-white mb-1'>
                    Open to opportunities
                  </p>
                  <p className='text-xs text-zinc-400'>
                    Available for new projects
                  </p>
                </div>

                {/* Status Pills */}
                <div className='flex gap-2 justify-center mb-4'>
                  <div className='px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-medium'>
                    Freelance
                  </div>
                  <div className='px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium'>
                    Full-time
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <div className='mt-2 lg:-mx-3 lg:-mb-6'>
                <a
                  href='#contact'
                  className='block w-full px-4 py-3 rounded-2xl lg:rounded-t-none lg:rounded-b-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg text-center transition-all duration-300 hover:from-cyan-400 hover:to-purple-400 hover:shadow-lg hover:shadow-cyan-400/25'
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
