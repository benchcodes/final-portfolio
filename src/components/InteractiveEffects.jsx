import { useEffect, useState } from 'react'

function InteractiveEffects() {
  const [progress, setProgress] = useState(0)
  const [pointer, setPointer] = useState({ x: 50, y: 20 })

  useEffect(() => {
    const updateEffects = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    const updatePointer = (event) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      })
    }

    updateEffects()
    window.addEventListener('scroll', updateEffects, { passive: true })
    window.addEventListener('resize', updateEffects)
    window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateEffects)
      window.removeEventListener('resize', updateEffects)
      window.removeEventListener('pointermove', updatePointer)
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div
        className="pointer-glow"
        style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }}
        aria-hidden="true"
      />
    </>
  )
}

export default InteractiveEffects
