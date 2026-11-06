import { useState } from 'react'
import portfolioContent from '../data/portfolioContent'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-3 pt-2 text-white sm:px-5">
      <nav className={`site-nav-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${isOpen ? 'site-nav-shell-open' : ''}`}>
        <div className="site-nav-row flex h-11 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <a href="#home" onClick={closeMenu} className="site-logo font-mono text-xs font-medium tracking-[0.16em] text-slate-400 sm:text-sm">
              {portfolioContent.brand}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="site-nav hidden items-center gap-6 md:flex lg:gap-8">
            <a href="#home" className="site-nav-link">Home</a>
            <a href="#about" className="site-nav-link">About</a>
            <a href="#projects" className="site-nav-link">Portfolio</a>
            <a href="#awards" className="site-nav-link">Awards</a>
            <a href="#contact" className="site-nav-link">Contact</a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            className="menu-toggle inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 md:hidden"
          >
            <svg
              className={`h-6 w-6 menu-icon ${isOpen ? 'menu-icon-open' : ''}`}
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
        <div
          className={`mobile-nav ${isOpen ? 'mobile-nav-open' : ''} md:hidden`}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <div className="mobile-nav-inner">
            <a href="#home" onClick={closeMenu} className="mobile-nav-link">Home</a>
            <a href="#about" onClick={closeMenu} className="mobile-nav-link">About</a>
            <a href="#projects" onClick={closeMenu} className="mobile-nav-link">Portfolio</a>
            <a href="#awards" onClick={closeMenu} className="mobile-nav-link">Awards</a>
            <a href="#contact" onClick={closeMenu} className="mobile-nav-link">Contact</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
