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
      taglineColor='purple'
      title="Let's build something that moves —"
      subtitle='and moves people'
      className='bg-gradient-to-br from-zinc-950 via-zinc-900 to-black'
    >
      {/* Animated grid background */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(176, 106, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 106, 247, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className='grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto'>
        {/* Contact Info */}
        <motion.div
          className='space-y-8'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='space-y-6'>
            <p className='text-xl text-zinc-300 leading-relaxed'>
              Have a complex technical challenge? Ready to turn ambitious vision
              into scalable reality?
            </p>

            {/* Email with emphasis */}
            <div className='p-6 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white'>
                  <svg
                    className='w-6 h-6'
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
                <div>
                  <div className='text-sm text-zinc-400 mb-1'>Direct Email</div>
                  <a
                    href='mailto:hartley.leroy1997@gmail.com'
                    className='text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors'
                  >
                    hartley.leroy1997@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Optional booking CTA */}
            <div className='p-6 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-2xl border border-fuchsia-500/20'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-xl text-white'>
                  <svg
                    className='w-6 h-6'
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
                <div>
                  <div className='text-sm text-zinc-400 mb-1'>Quick Chat</div>
                  <div className='text-lg font-medium text-zinc-300'>
                    Book a 20-min intro{' '}
                    <span className='text-sm text-zinc-500'>(coming soon)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className='relative'
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='relative bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-zinc-300 mb-2'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-zinc-300 mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm'
                    placeholder='your@email.com'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-zinc-300 mb-2'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors'
                  placeholder='Project inquiry'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-zinc-300 mb-2'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none'
                  placeholder="Tell me about your project, timeline, and what you're hoping to achieve..."
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span>
                  {isSubmitting
                    ? 'Sending...'
                    : submitStatus === 'success'
                      ? 'Message Sent!'
                      : 'Send Message'}
                </span>
              </button>

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
    </PageSection>
  )
}
