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
          <form onSubmit={handleSubmit}>
            {/* 2x2 Grid Layout */}
            <div className='grid grid-cols-2 gap-6 mb-8'>
              {/* Left Column */}
              <div className='space-y-6'>
                {/* First Name */}
                <div>
                  <label className='text-white text-sm font-medium block mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300'
                    placeholder='Your first name'
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className='text-white text-sm font-medium block mb-2'>
                    Subject
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300'
                    placeholder='Brief description of your inquiry'
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                {/* Email Address */}
                <div>
                  <label className='text-white text-sm font-medium block mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300'
                    placeholder='your@company.com'
                  />
                </div>

                {/* Service of Interest */}
                <div>
                  <label className='text-white text-sm font-medium block mb-2'>
                    Service of Interest
                  </label>
                  <select
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300'
                  >
                    <option value='' className='bg-gray-800 text-white'>
                      Select a service
                    </option>
                    <option
                      value='fullstack'
                      className='bg-gray-800 text-white'
                    >
                      Full Stack Development
                    </option>
                    <option value='frontend' className='bg-gray-800 text-white'>
                      Frontend Development
                    </option>
                    <option value='backend' className='bg-gray-800 text-white'>
                      Backend Development
                    </option>
                    <option value='ai' className='bg-gray-800 text-white'>
                      AI/ML Solutions
                    </option>
                    <option
                      value='consulting'
                      className='bg-gray-800 text-white'
                    >
                      Technical Consulting
                    </option>
                    <option value='other' className='bg-gray-800 text-white'>
                      Other
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message Field - Full Width Below */}
            <div className='mb-8'>
              <label className='text-white text-sm font-medium block mb-2'>
                Message
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 resize-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300'
                placeholder='Tell me about your project, timeline, and any specific requirements...'
              />
            </div>

            {/* Submit Button - Bottom of Card */}
            <div className='mt-8'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-lg'
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
