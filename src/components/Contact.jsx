import { lazy, Suspense, useState } from 'react'
import { usePortfolioContent } from '../context/usePortfolioContent'
import { canUse3D } from '../lib/canUse3D'

const ContactGlobe = lazy(() => import('./ContactGlobe'))
const show3D = canUse3D()

function Contact() {
  const portfolioContent = usePortfolioContent()
  const [status, setStatus] = useState('')
  const { contact } = portfolioContent

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    setStatus('Opening your email app...')
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="atmosphere-section w-full bg-[#080808] py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-white">Get In Touch</h2>
          <p className="text-lg text-slate-400">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Information */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact Information</h3>
            
            {/* Email */}
            <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Email</p>
                <a href={`mailto:${contact.email}`} className="block break-all font-medium text-slate-200 transition-colors hover:text-purple-300">
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4 flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Phone</p>
                <a href={`tel:${contact.phoneLink}`} className="font-medium text-slate-200 transition-colors hover:text-purple-300">
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Location</p>
                <p className="break-words font-medium text-slate-200">{contact.location}</p>
              </div>
            </div>

            {/* 3D location globe */}
            <div className="contact-globe-card">
              {show3D && (
                <Suspense fallback={null}>
                  <ContactGlobe />
                </Suspense>
              )}
              <div className="contact-globe-coordinates" aria-hidden="true">
                <span className="contact-globe-ping" />
                14.55°N · 121.07°E
              </div>
              <div className="contact-globe-copy">
                <h4>Let&apos;s work together</h4>
                <p>
                  Based in Pateros, Philippines — open to remote work and new projects worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="rounded-xl border border-white/10 bg-black p-6">
            <h3 className="mb-2 text-lg font-semibold text-white">Send Me a Message</h3>
            <p className="text-slate-500 text-sm mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#0b0b0b] px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </button>
              <p className="text-sm text-slate-400" aria-live="polite">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
