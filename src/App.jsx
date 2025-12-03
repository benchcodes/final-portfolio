import Header from './components/Header'
import Profile from './components/Profile'
import NameSection from './components/NameSection'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center py-16 bg-linear-to-b from-slate-50 to-slate-100">
        <Profile />
        <NameSection />
      </div>
    </>
  )
}

export default App
