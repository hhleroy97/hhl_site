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
      title=''
      subtitle='Ready to bring your idea into reality?'
      className='bg-gradient-to-br from-zinc-950 via-zinc-900 to-black'
    >
      {/* Professional Contact Layout */}
      <div className='max-w-7xl mx-auto'>
        {/* Contact Methods - Above Form */}
        <motion.div
          className='grid md:grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Email */}
          <motion.div
            className='group relative p-6 bg-gradient-to-br from-purple-500/10 via-black/40 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden'
            whileHover={{
              scale: 1.02,
              y: -4,
              borderColor: 'rgba(147, 51, 234, 0.3)',
              boxShadow: '0 25px 50px rgba(147, 51, 234, 0.15)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-black/5 pointer-events-none' />
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/30 transition-all duration-500' />
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/80 to-transparent group-hover:via-purple-400 transition-all duration-300' />
            <div className='relative z-10 flex items-center gap-4'>
              <div className='p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white shadow-lg'>
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
              <div className='text-left'>
                <div className='text-sm text-zinc-400 font-medium'>
                  Direct Email
                </div>
                <a
                  href='mailto:hartley.leroy1997@gmail.com'
                  className='text-lg font-semibold text-purple-300 hover:text-purple-200 transition-colors'
                >
                  hartley.leroy1997@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.div
            className='group relative p-6 bg-gradient-to-br from-emerald-500/10 via-black/40 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/20 cursor-pointer overflow-hidden'
            whileHover={{
              scale: 1.02,
              y: -4,
              borderColor: 'rgba(16, 185, 129, 0.3)',
              boxShadow: '0 25px 50px rgba(16, 185, 129, 0.15)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-black/5 pointer-events-none' />
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-500' />
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent group-hover:via-emerald-400 transition-all duration-300' />
            <div className='relative z-10 flex items-center gap-4'>
              <div className='p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white shadow-lg'>
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
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='text-left'>
                <div className='text-sm text-zinc-400 font-medium'>
                  Fast Response
                </div>
                <div className='text-lg font-semibold text-emerald-300'>
                  Within 24 hours
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Contact Form - Professional & Prominent */}
        <motion.div
          className='relative'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className='group relative bg-gradient-to-br from-white/[0.08] via-black/50 to-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/20 p-6 md:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden'
            whileHover={{
              scale: 1.002,
              borderColor: 'rgba(147, 51, 234, 0.3)',
              boxShadow:
                '0 30px 60px rgba(147, 51, 234, 0.1), 0 0 0 1px rgba(147, 51, 234, 0.1)',
              transition: { duration: 0.4, ease: 'easeOut' },
            }}
          >
            {/* Professional Glassmorphism Effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none' />
            <div className='absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-700' />
            <div className='absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-700' />
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/60 through-cyan-400/60 to-transparent group-hover:via-purple-400/80 group-hover:through-cyan-400/80 transition-all duration-300' />
            <div className='relative z-10'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Professional Form Grid */}
                <div className='grid md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-zinc-300 text-sm font-medium block'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm text-base'
                      placeholder='Your full name'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-zinc-300 text-sm font-medium block'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm text-base'
                      placeholder='your@company.com'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-zinc-300 text-sm font-medium block'>
                      Service Interest
                    </label>
                    <select
                      name='service'
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm text-base'
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
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-zinc-300 text-sm font-medium block'>
                    Message Contents
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm resize-none text-base'
                    placeholder={getPlaceholderText()}
                  />
                </div>

                <div className='pt-2'>
                  <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full py-3 px-8 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-base'
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className='flex items-center justify-center gap-3'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        <span>Sending Your Message...</span>
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className='flex items-center justify-center gap-3'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                        <span>Message Sent Successfully!</span>
                      </div>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </motion.button>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className='mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/20 rounded-xl text-center'
                  >
                    <p className='text-emerald-400 text-base font-medium mb-1'>
                      🎉 Thank you for reaching out!
                    </p>
                    <p className='text-zinc-300 text-sm'>
                      I'll review your request and get back to you within 24
                      hours with next steps. Check your email for confirmation.
                    </p>
                  </motion.div>
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
