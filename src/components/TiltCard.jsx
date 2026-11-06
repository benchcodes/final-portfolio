import { createElement } from 'react'

function TiltCard({ as: Element = 'div', className = '', children, ...props }) {
  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    card.style.setProperty('--tilt-x', `${y * -8}deg`)
    card.style.setProperty('--tilt-y', `${x * 8}deg`)
    card.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`)
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    createElement(
      Element,
      {
        className: `tilt-card ${className}`,
        onPointerMove: handlePointerMove,
        onPointerLeave: resetTilt,
        ...props,
      },
      children,
    )
  )
}

export default TiltCard
