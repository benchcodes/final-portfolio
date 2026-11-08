import { useEffect, useState } from 'react'
import { usePortfolioContent } from '../context/usePortfolioContent'

function IntroSplash({ onComplete }) {
  const portfolioContent = usePortfolioContent()
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    document.body.classList.add('intro-active')

    const timer = window.setTimeout(() => {
      setIsLeaving(true)
      window.setTimeout(onComplete, 650)
    }, 2200)

    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('intro-active')
    }
  }, [onComplete])

  function skipIntro() {
    setIsLeaving(true)
    window.setTimeout(onComplete, 350)
  }

  return (
    <div className={`intro-splash ${isLeaving ? 'intro-splash-leaving' : ''}`}>
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-glow intro-glow-one" aria-hidden="true" />
      <div className="intro-glow intro-glow-two" aria-hidden="true" />

      <div className="intro-content">
        <p className="intro-kicker">Welcome to my portfolio</p>
        <div className="intro-name-wrap">
          <span className="intro-line" aria-hidden="true" />
          <h1 className="intro-name">{portfolioContent.name}</h1>
          <span className="intro-line" aria-hidden="true" />
        </div>
        <p className="intro-role">{portfolioContent.role}</p>
        <div className="intro-loader" aria-hidden="true">
          <span />
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={skipIntro}>
        Skip intro
      </button>
    </div>
  )
}

export default IntroSplash
