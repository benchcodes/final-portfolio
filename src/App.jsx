import Header from './components/Header'
import Profile from './components/Profile'
import NameSection from './components/NameSection'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Project from './components/Project'
import Contact from './components/Contact'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id="home" className="flex flex-col items-center justify-center py-16 pt-32 bg-linear-to-b from-slate-50 to-slate-100">
        <Profile />
        <NameSection />
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <div id="projects">
        <Project />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  )
}

export default App
