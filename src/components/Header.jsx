import { useState } from 'react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
              Bench Culubong
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-blue-400 transition">Home</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-800 transition"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#home" className="block px-3 py-2 rounded-md hover:bg-slate-800 transition">Home</a>
            <a href="#about" className="block px-3 py-2 rounded-md hover:bg-slate-800 transition">About</a>
            <a href="#projects" className="block px-3 py-2 rounded-md hover:bg-slate-800 transition">Projects</a>
            <a href="#contact" className="block px-3 py-2 rounded-md hover:bg-slate-800 transition">Contact</a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
