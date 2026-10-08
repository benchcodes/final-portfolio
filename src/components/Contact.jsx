function Contact() {
  return (
    <div className="w-full bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-8">
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
            <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-200">culubongbenchmatthew@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-200">09817454414</p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-slate-200">Municipality of Pateros, Philippines</p>
              </div>
            </div>

            {/* Let's Work Together Card */}
            <div className="bg-linear-to-r from-purple-600 to-slate-900 rounded-xl p-6 text-white">
              <h4 className="text-xl font-semibold mb-2">Let's Work Together</h4>
              <p className="text-purple-100 text-sm">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
            <h3 className="mb-2 text-lg font-semibold text-white">Send Me a Message</h3>
            <p className="text-slate-500 text-sm mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
