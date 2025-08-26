import { useState } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <PageSection
      id='contact'
      tagline='Contact'
      taglineColor='emerald'
      title="Let's Build Something That Moves"
      subtitle='and moves people'
      className='bg-gradient-to-br from-zinc-950 via-zinc-900 to-black'
    >
      {/* Ultra Compact Layout */}
      <div className='max-w-4xl mx-auto'>
        {/* Contact Methods - Horizontal */}
        <motion.div
          className='grid md:grid-cols-2 gap-3 mb-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Email */}
          <div className='flex items-center gap-3 p-3 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white'>
              <svg
                className='w-4 h-4'
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
            </div>
            <div className='text-left'>
              <div className='text-xs text-zinc-400'>Direct Email</div>
              <a
                href='mailto:hartley.leroy1997@gmail.com'
                className='text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors'
              >
                hartley.leroy1997@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Chat */}
          <div className='flex items-center gap-3 p-3 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-lg border border-fuchsia-500/20'>
            <div className='p-2 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-lg text-white'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z'
                />
              </svg>
            </div>
            <div className='text-left'>
              <div className='text-xs text-zinc-400'>Quick Chat</div>
              <div className='text-sm font-medium text-zinc-300'>
                20-min intro{' '}
                <span className='text-zinc-500'>(coming soon)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form - Ultra Compact */}
        <motion.div
          className='relative'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='relative bg-gradient-to-b from-white/5 to-white/[0.02] rounded-lg border border-white/10 p-4'>
            <form onSubmit={handleSubmit} className='space-y-3'>
              {/* Ultra Compact Form Grid */}
              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm'
                  placeholder='Your name'
                />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm'
                  placeholder='your@email.com'
                />
              </div>

              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm'
                placeholder='Project inquiry'
              />

              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={2}
                className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none text-sm'
                placeholder='Tell me about your project and timeline...'
              />

              <div className='flex items-center justify-between'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2'
                >
                  <span className='text-sm'>
                    {isSubmitting
                      ? 'Sending...'
                      : submitStatus === 'success'
                        ? 'Message Sent!'
                        : 'Send Message'}
                  </span>
                </button>

                {/* Status and tagline inline */}
                <div className='text-xs text-zinc-400 flex items-center gap-2'>
                  <span>Building the future, one system at a time</span>
                  <div className='flex gap-1'>
                    <div className='w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse'></div>
                    <div
                      className='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse'
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className='w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse'
                      style={{ animationDelay: '1s' }}
                    ></div>
                  </div>
                </div>
              </div>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-emerald-400 text-sm text-center'
                >
                  Thanks! I'll get back to you within 24 hours.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Animated grid background */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(176, 106, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 106, 247, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </PageSection>
  )
}
