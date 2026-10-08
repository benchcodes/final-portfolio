import Header from './components/Header'
import Profile from './components/Profile'
import NameSection from './components/NameSection'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Project from './components/Project'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <div id="home" className="flex flex-col items-center justify-center bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-16 pt-32">
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
