import { motion } from 'framer-motion'
import { useState } from 'react'
import { ContactFormData } from '@/types'

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 2000)
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/hartleyhleroy', icon: '📱' },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/hartleyhleroy',
      icon: '💼',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/hartleyhleroy',
      icon: '🎨',
    },
    { name: 'Email', url: 'mailto:contact@hartleyleroy.dev', icon: '📧' },
  ]

  return (
    <section id='contact' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-10'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-4xl font-display font-bold text-tech-text-primary'>
            Contact
          </h2>
          <p className='text-base text-tech-text-secondary mt-2'>Let's talk</p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className='text-xl font-display font-semibold text-tech-text-primary mb-4'>
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name field */}
              <div className='relative'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-alt border border-tech-dark-elevated rounded-lg text-white font-display placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tech-teal/30'
                  placeholder='Your Name'
                />
              </div>

              {/* Email field */}
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-alt border border-tech-dark-elevated rounded-lg text-white font-display placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tech-teal/30'
                  placeholder='Your Email'
                />
              </div>

              {/* Subject field */}
              <div className='relative'>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-alt border border-tech-dark-elevated rounded-lg text-white font-display placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tech-teal/30'
                  placeholder='Subject'
                />
              </div>

              {/* Message field */}
              <div className='relative'>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 bg-tech-dark-alt border border-tech-dark-elevated rounded-lg text-white font-display placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-tech-teal/30'
                  placeholder='Your Message'
                />
              </div>

              {/* Submit button */}
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full px-6 py-3 bg-tech-teal text-black font-display font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </form>

            {/* Success message */}
            {submitStatus === 'success' && (
              <div className='p-3 bg-green-900/40 border border-green-700 rounded-lg text-green-300 font-display'>
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className='text-xl font-display font-semibold text-tech-text-primary mb-4'>
              Connect
            </h3>

            {/* Direct contact info */}
            <div className='space-y-3'>
              <div className='flex items-center space-x-4 p-4 bg-tech-dark-alt rounded-lg border border-tech-dark-elevated'>
                <span className='text-2xl'>📧</span>
                <div>
                  <p className='font-display font-semibold text-tech-text-primary'>
                    Email
                  </p>
                  <p className='text-tech-text-secondary'>
                    contact@hartleyleroy.dev
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-4 p-4 bg-tech-dark-alt rounded-lg border border-tech-dark-elevated'>
                <span className='text-2xl'>📍</span>
                <div>
                  <p className='font-display font-semibold text-tech-text-primary'>
                    Location
                  </p>
                  <p className='text-tech-text-secondary'>
                    Available Worldwide (Remote)
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className='text-base font-display font-semibold text-tech-text-primary mb-3'>
                Social
              </h4>
              <div className='grid grid-cols-2 gap-3'>
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-3 p-4 bg-tech-dark-alt rounded-lg border border-tech-dark-elevated hover:border-tech-teal/40 transition-colors'
                  >
                    <span className='text-xl'>{link.icon}</span>
                    <span className='font-display text-tech-text-primary'>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className='pt-2'>
              <a
                href='/resume.pdf'
                download
                className='inline-flex items-center px-6 py-3 border border-tech-dark-elevated text-tech-text-primary rounded-lg'
              >
                <span className='mr-2'>📄</span>
                Download resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
