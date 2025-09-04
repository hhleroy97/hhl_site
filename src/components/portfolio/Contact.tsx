import { useState, useEffect } from 'react'
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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', service: '', subject: '', message: '' })

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
          <div className='relative bg-gradient-to-br from-white/[0.08] via-black/50 to-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl overflow-hidden'>
            {/* Glassmorphism effects */}
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-teal-500/[0.03] pointer-events-none' />
            <div className='absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none' />

            <form onSubmit={handleSubmit} className='relative z-10'>
              {/* 2x2 Grid Layout */}
              <div className='grid grid-cols-2 gap-6 mb-8'>
                {/* Left Column */}
                <div className='space-y-6'>
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
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
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

                  {/* Service of Interest */}
                  <div>
                    <label className='text-zinc-300 text-base font-medium block mb-3'>
                      Service of Interest
                    </label>
                    <select
                      name='service'
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-black/60 transition-all duration-300 hover:border-white/30'
                    >
                      <option value='' className='bg-zinc-900 text-zinc-300'>
                        Select a service
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
              </div>

              {/* Message Field - Full Width Below */}
              <div className='mb-8'>
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
          </div>

          {submitStatus === 'success' && (
            <div className='mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg text-center'>
              <p className='text-emerald-300 font-medium text-lg mb-2'>
                🎉 Thank you for reaching out!
              </p>
              <p className='text-zinc-300'>
                I'll review your request and get back to you within 24 hours
                with next steps. Check your email for confirmation.
              </p>
            </div>
          )}
        </div>
      </PageSection>
    </>
  )
}
