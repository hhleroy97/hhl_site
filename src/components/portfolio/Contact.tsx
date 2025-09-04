import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

const services = [
  { id: 'consultation', name: 'Free 15-Minute Consultation', price: 'FREE' },
  { id: 'advisory', name: 'Technical Advisory Call', price: '$199/hr' },
  { id: 'code-review', name: 'Code Review & Optimization', price: '$499+' },
  { id: 'mvp', name: 'MVP Development', price: '$4,999-9,999' },
  { id: 'fullstack', name: 'Full-Stack Web Application', price: '$9,999+' },
  {
    id: 'interactive',
    name: 'Real-Time Interactive Systems',
    price: '$9,999+',
  },
]

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  // Pre-populate service selection from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const serviceParam = urlParams.get('service')
    if (serviceParam && services.find(s => s.id === serviceParam)) {
      setFormData(prev => ({ ...prev, service: serviceParam }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', service: '', message: '' })

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const getPlaceholderText = () => {
    switch (formData.service) {
      case 'consultation':
        return 'What would you like to discuss during our free consultation?'
      case 'advisory':
        return 'What technical challenges are you facing?'
      case 'code-review':
        return 'Tell me about your codebase and what you would like reviewed...'
      default:
        return 'Describe your project, timeline, and any specific requirements...'
    }
  }

  return (
    <PageSection
      id='contact'
      tagline='Contact'
      taglineColor='emerald'
      title='Ready to Transform Your Vision?'
      subtitle="Let's discuss your project and bring your ideas to life"
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
          <motion.div
            className='group flex items-center gap-3 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.01,
              y: -2,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
            <div className='relative z-10 flex items-center gap-3'>
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
          </motion.div>

          {/* Response Time */}
          <motion.div
            className='group flex items-center gap-3 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.01,
              y: -2,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
            <div className='relative z-10 flex items-center gap-3'>
              <div className='p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white'>
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
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='text-left'>
                <div className='text-xs text-zinc-400'>Fast Response</div>
                <div className='text-sm font-medium text-emerald-300'>
                  Within 24 hours
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form - Ultra Compact */}
        <motion.div
          className='relative'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className='group relative bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden'
            whileHover={{
              scale: 1.005,
              y: -3,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            {/* Enhanced depth effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
            <div className='relative z-10'>
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
                    placeholder='Your full name'
                  />
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm'
                    placeholder='your@company.com'
                  />
                </div>

                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm'
                >
                  <option value='' className='bg-zinc-900 text-zinc-300'>
                    Select a service you're interested in
                  </option>
                  {services.map(service => (
                    <option
                      key={service.id}
                      value={service.id}
                      className='bg-zinc-900 text-zinc-300'
                    >
                      {service.name}
                    </option>
                  ))}
                </select>

                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className='w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none text-sm'
                  placeholder={getPlaceholderText()}
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

                  {/* Business tagline */}
                  <div className='text-xs text-zinc-400 flex items-center gap-2'>
                    <span>
                      Ready to bring your vision to life?
                      <span className='bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent font-medium'>
                        {' '}
                        Let's build it together.
                      </span>
                    </span>
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
                    Perfect! I'll review your request and get back to you within
                    24 hours with next steps.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
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
