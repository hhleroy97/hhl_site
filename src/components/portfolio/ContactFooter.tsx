import { useState } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'
import { AnimatePresence } from 'framer-motion'

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
      taglineColor='cyan'
      title="Let's build something that moves —"
      subtitle='and moves people'
      className='bg-gradient-to-b from-zinc-900/70 to-zinc-900/90'
    >
      {/* Enhanced animated grid background */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className='grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto'>
        {/* Enhanced Contact Info */}
        <motion.div
          className='space-y-8'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='space-y-6'>
            <motion.p
              className='text-xl text-zinc-300 leading-relaxed p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300'
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
            >
              Have a complex technical challenge? Ready to turn ambitious vision
              into scalable reality?
            </motion.p>

            {/* Enhanced Email with emphasis */}
            <motion.div
              className='p-6 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group'
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
            >
              <div className='flex items-center gap-4'>
                <motion.div
                  className='p-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300'
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                >
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
                </motion.div>
                <div>
                  <div className='text-sm text-zinc-400 mb-1'>Direct Email</div>
                  <a
                    href='mailto:hartley.leroy1997@gmail.com'
                    className='text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors group-hover:drop-shadow-lg'
                  >
                    hartley.leroy1997@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Contact Methods */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {[
                {
                  icon: (
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
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Charlotte, NC',
                  color: 'from-emerald-500 to-green-600',
                },
                {
                  icon: (
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
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  ),
                  label: 'Response Time',
                  value: '< 24 hours',
                  color: 'from-fuchsia-500 to-purple-600',
                },
              ].map((method, index) => (
                <motion.div
                  key={method.label}
                  className='p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group'
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div className='flex items-center gap-3'>
                    <motion.div
                      className={`p-2 bg-gradient-to-r ${method.color} rounded-lg text-white shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                    >
                      {method.icon}
                    </motion.div>
                    <div>
                      <div className='text-sm text-zinc-400'>
                        {method.label}
                      </div>
                      <div className='text-white font-medium'>
                        {method.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className='text-lg font-semibold text-white'>Connect</h3>
              <div className='flex gap-4'>
                {[
                  {
                    name: 'GitHub',
                    href: 'https://github.com/hhleroy97',
                    icon: (
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ),
                    color: 'from-gray-500 to-gray-700',
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://linkedin.com/in/hartley-leroy',
                    icon: (
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                      </svg>
                    ),
                    color: 'from-blue-500 to-blue-700',
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group'
                    whileHover={{
                      y: -4,
                      scale: 1.05,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div
                      className={`p-2 bg-gradient-to-r ${social.color} rounded-lg text-white shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                    >
                      {social.icon}
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Contact Form */}
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className='space-y-6'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Enhanced Form Fields */}
            {[
              { name: 'name', label: 'Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              {
                name: 'subject',
                label: 'Subject',
                type: 'text',
                required: true,
              },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                className='relative group'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20'
                  placeholder={field.label}
                />
                {/* Enhanced focus glow effect */}
                <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none' />
              </motion.div>
            ))}

            {/* Enhanced Message Field */}
            <motion.div
              className='relative group'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20 resize-none'
                placeholder='Tell me about your project...'
              />
              {/* Enhanced focus glow effect */}
              <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none' />
            </motion.div>

            {/* Enhanced Submit Button */}
            <motion.button
              type='submit'
              disabled={isSubmitting}
              className='relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed'
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                {isSubmitting ? (
                  <>
                    <motion.div
                      className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full'
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </span>
              {/* Enhanced glow effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
            </motion.button>

            {/* Enhanced Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  className='p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-xl text-emerald-400 text-center'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  className='p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl text-red-400 text-center'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Something went wrong. Please try again or email directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>

      {/* Enhanced Footer */}
      <motion.div
        className='mt-16 pt-8 border-t border-white/10 text-center'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className='text-zinc-400'>
          © 2024 Hartley LeRoy. Crafted with{' '}
          <span className='text-red-400'>♥</span> and{' '}
          <span className='text-cyan-400'>code</span>
        </p>
      </motion.div>
    </PageSection>
  )
}
