import { useCallback, useState } from 'react'
import Header from './components/Header'
import Profile from './components/Profile'
import NameSection from './components/NameSection'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Project from './components/Project'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import InteractiveEffects from './components/InteractiveEffects'
import IntroSplash from './components/IntroSplash'
import PortfolioEditor from './components/PortfolioEditor'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const completeIntro = useCallback(() => setShowIntro(false), [])
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  if (currentPath === '/admin') {
    if (import.meta.env.DEV) {
      return <PortfolioEditor onClose={() => window.location.assign('/')} />
    }

    return (
      <main className="grid min-h-screen place-items-center bg-[#08080c] px-6 text-center text-white">
        <div>
          <h1 className="text-xl font-semibold">The editor runs locally</h1>
          <p className="mt-2 max-w-md text-sm text-slate-400">Run <code>npm run dev</code> and open <code>/admin</code> to edit content, then deploy your changes.</p>
        </div>
      </main>
    )
  }

  return (
    <>
      {showIntro && <IntroSplash onComplete={completeIntro} />}
      <InteractiveEffects />
      <Header />
      <div id="home" className="hero-section relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-black via-[#080808] to-black py-16 pt-32">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <ScrollReveal>
          <Profile />
        </ScrollReveal>
        <ScrollReveal className="scroll-reveal-delay-1">
          <NameSection />
        </ScrollReveal>
      </div>
      <div id="about">
        <ScrollReveal>
          <AboutMe />
        </ScrollReveal>
      </div>
      <div id="skills">
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
      </div>
      <div id="projects">
        <ScrollReveal>
          <Project />
        </ScrollReveal>
      </div>
      <div>
        <ScrollReveal>
          <Awards />
        </ScrollReveal>
      </div>
      <div id="contact">
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
      <Footer />
    </>
  )
}

export default App
