import { useEffect, useRef, useState } from 'react'

function ScrollReveal({ children, className = '' }) {
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return undefined

    if (isVisible) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
