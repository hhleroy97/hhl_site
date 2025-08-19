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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 2000)
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/hartleyhleroy',
      icon: '📱',
      color: 'primary',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/hartleyhleroy',
      icon: '💼',
      color: 'accent-blue',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/hartleyhleroy',
      icon: '🎨',
      color: 'accent-purple',
    },
    {
      name: 'Email',
      url: 'mailto:contact@hartleyleroy.dev',
      icon: '📧',
      color: 'accent-green',
    },
  ]

  return (
    <section id='contact' className='py-20 px-4 sm:px-6 lg:px-8 bg-background-primary'>
      <div className='max-w-7xl mx-auto'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-bold text-text-primary mb-4'>
            Get in <span className='text-primary-600'>Touch</span>
          </h2>
          <div className='w-24 h-1 bg-primary-500 mx-auto mb-6' />
          <p className='text-lg text-text-secondary max-w-2xl mx-auto'>
            Ready to collaborate on something amazing? Let's build the future
            together.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Contact Form */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className='text-2xl font-bold text-primary-600 mb-6'>
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name field */}
              <motion.div
                className='relative'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-background-secondary border border-neutral-300 
                           rounded-lg text-text-primary font-medium placeholder-text-muted
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           transition-all duration-300'
                  placeholder='Your Name'
                />
              </motion.div>

              {/* Email field */}
              <motion.div
                className='relative'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-background-secondary border border-neutral-300 
                           rounded-lg text-text-primary font-medium placeholder-text-muted
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           transition-all duration-300'
                  placeholder='Your Email'
                />
              </motion.div>

              {/* Subject field */}
              <motion.div
                className='relative'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-background-secondary border border-neutral-300 
                           rounded-lg text-text-primary font-medium placeholder-text-muted
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           transition-all duration-300'
                  placeholder='Subject'
                />
              </motion.div>

              {/* Message field */}
              <motion.div
                className='relative'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 bg-background-secondary border border-neutral-300 
                           rounded-lg text-text-primary font-medium placeholder-text-muted resize-none
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           transition-all duration-300'
                  placeholder='Your Message'
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                type='submit'
                disabled={isSubmitting}
                className='w-full px-6 py-4 bg-primary-600 text-white font-semibold rounded-lg
                         hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300'
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  y: isSubmitting ? 0 : -2,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className='flex items-center justify-center'
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className='mr-2'>⚡</span>
                    Sending...
                  </motion.div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>

            {/* Success message */}
            {submitStatus === 'success' && (
              <motion.div
                className='p-4 bg-accent-green/10 border border-accent-green rounded-lg text-accent-green font-medium'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className='text-2xl font-bold text-primary-600 mb-6'>
              Connect with Me
            </h3>

            {/* Direct contact info */}
            <div className='space-y-4'>
              <motion.div
                className='flex items-center space-x-4 p-4 bg-background-secondary rounded-lg border border-neutral-200'
                whileHover={{ scale: 1.02, borderColor: '#0ea5e9' }}
              >
                <span className='text-2xl'>📧</span>
                <div>
                  <p className='font-semibold text-primary-600'>Email</p>
                  <p className='text-text-secondary'>
                    contact@hartleyleroy.dev
                  </p>
                </div>
              </motion.div>

              <motion.div
                className='flex items-center space-x-4 p-4 bg-background-secondary rounded-lg border border-neutral-200'
                whileHover={{ scale: 1.02, borderColor: '#0ea5e9' }}
              >
                <span className='text-2xl'>📍</span>
                <div>
                  <p className='font-semibold text-primary-600'>
                    Location
                  </p>
                  <p className='text-text-secondary'>
                    Available Worldwide (Remote)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <h4 className='text-lg font-bold text-text-primary mb-4'>
                Social Links
              </h4>
              <div className='grid grid-cols-2 gap-4'>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-3 p-4 bg-background-secondary rounded-lg 
                             border border-neutral-200 hover:border-primary-500
                             transition-all duration-300'
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <span className='text-xl'>{link.icon}</span>
                    <span className='font-semibold text-text-primary'>
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <motion.div
              className='pt-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='/resume.pdf'
                download
                className='inline-flex items-center px-6 py-3 border-2 border-accent-purple text-accent-purple 
                         font-semibold rounded-lg hover:bg-accent-purple hover:text-white 
                         transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='mr-2'>📄</span>
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
