import { useRef } from 'react'

function TiltCard({ as: Element = 'div', className = '', children, ...props }) {
  const cardRef = useRef(null)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bounds = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    cardRef.current.style.setProperty('--tilt-x', `${y * -8}deg`)
    cardRef.current.style.setProperty('--tilt-y', `${x * 8}deg`)
    cardRef.current.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`)
    cardRef.current.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`)
  }

  function resetTilt() {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--tilt-x', '0deg')
    cardRef.current.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Element
      ref={cardRef}
      className={`tilt-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      {...props}
    >
      {children}
    </Element>
  )
}

export default TiltCard
