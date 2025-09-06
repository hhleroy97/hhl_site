import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
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
    subject: '',
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

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS configuration missing. Please check your environment variables.'
        )
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        service:
          services.find(s => s.id === formData.service)?.name ||
          formData.service,
        message: formData.message,
        to_email: 'hartley.leroy1997@gmail.com',
      }

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        service: '',
        subject: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <>
      {/* Top-screen alert for email copied */}

      <PageSection
        id='contact'
        tagline='Contact'
        taglineColor='emerald'
        title=''
        subtitle='Ready to bring your idea into reality?'
        className='bg-gradient-to-br from-zinc-950 via-zinc-900 to-black'
      >
        <div className='max-w-7xl mx-auto w-full px-4'>
          <div className='relative bg-gradient-to-br from-white/[0.08] via-black/50 to-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/20 p-6 shadow-2xl overflow-hidden flex items-center'>
            {/* Glassmorphism effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-teal-500/[0.03] pointer-events-none' />
            <div className='absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none' />

            {submitStatus === 'success' ? (
              <div className='relative z-10 text-center w-full py-8'>
                <div className='mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-8 h-8 text-white'
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
                  </div>
                  <h3 className='text-2xl font-semibold text-white mb-2'>
                    Message Sent Successfully!
                  </h3>
                  <p className='text-zinc-300 text-lg'>
                    Thank you for reaching out! I'll review your request and get
                    back to you within 24 hours with next steps.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitStatus('idle')
                    setFormData({
                      name: '',
                      email: '',
                      service: '',
                      subject: '',
                      message: '',
                    })
                  }}
                  className='inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white font-medium transition-all duration-300'
                >
                  Send Another Message
                </button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className='relative z-10 text-center w-full py-8'>
                <div className='mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-semibold text-white mb-2'>
                    Message Failed to Send
                  </h3>
                  <p className='text-zinc-300 text-lg mb-4'>
                    Sorry, there was an issue sending your message. Please try
                    again or contact me directly at{' '}
                    <a
                      href='mailto:hartley.leroy1997@gmail.com'
                      className='text-emerald-400 hover:text-emerald-300 transition-colors'
                    >
                      hartley.leroy1997@gmail.com
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className='inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white font-medium transition-all duration-300'
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='relative z-10 w-full'>
                {/* Form Fields in Row Layout */}
                <div className='space-y-5 mb-6'>
                  {/* Name and Email Row */}
                  <div className='grid grid-cols-2 gap-6'>
                    {/* First Name */}
                    <div>
                      <label className='text-zinc-300 text-base font-medium block mb-3'>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30'
                        placeholder='Your first name'
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className='text-zinc-300 text-base font-medium block mb-3'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30'
                        placeholder='your@company.com'
                      />
                    </div>
                  </div>

                  {/* Subject and Service Row */}
                  <div className='grid grid-cols-2 gap-6'>
                    {/* Subject */}
                    <div>
                      <label className='text-zinc-300 text-base font-medium block mb-3'>
                        Subject
                      </label>
                      <input
                        type='text'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-zinc-400 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30'
                        placeholder='Brief description of your inquiry'
                      />
                    </div>

                    {/* Service of Interest */}
                    <div>
                      <label className='text-zinc-300 text-base font-medium block mb-3'>
                        Service of Interest
                      </label>
                      <div className='relative'>
                        <select
                          name='service'
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className='w-full px-4 py-3 pr-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30 appearance-none cursor-pointer'
                        >
                          <option
                            value=''
                            className='bg-zinc-900 text-zinc-300'
                          >
                            Select a service
                          </option>
                          {services.map(service => (
                            <option
                              key={service.id}
                              value={service.id}
                              className='bg-zinc-900 text-zinc-300 py-2'
                            >
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <svg
                            className='w-5 h-5 text-zinc-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 9l-7 7-7-7'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Field - Full Width Below */}
                <div className='mb-6'>
                  <label className='text-zinc-300 text-base font-medium block mb-3'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-zinc-400 resize-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30'
                    placeholder='Tell me about your project, timeline, and any specific requirements...'
                  />
                </div>

                {/* Submit Button */}
                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-lg'
                  >
                    {isSubmitting ? (
                      <div className='flex items-center justify-center gap-3'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        <span>Sending Your Message...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </PageSection>
    </>
  )
}
