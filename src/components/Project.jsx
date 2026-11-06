import { useEffect, useState } from 'react'
import TiltCard from './TiltCard'
import portfolioContent from '../data/portfolioContent'

function Project() {
  const projects = portfolioContent.projects.items

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const activeProject = projects[activeIndex]
  const previousProject = projects[(activeIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(activeIndex + 1) % projects.length]

  function showPrevious() {
    setDirection('previous')
    setActiveIndex((index) => (index - 1 + projects.length) % projects.length)
  }

  function showNext() {
    setDirection('next')
    setActiveIndex((index) => (index + 1) % projects.length)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        setDirection('previous')
        setActiveIndex((index) => (index - 1 + projects.length) % projects.length)
      }
      if (event.key === 'ArrowRight') {
        setDirection('next')
        setActiveIndex((index) => (index + 1) % projects.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [projects.length])

  return (
    <div className="atmosphere-section projects-gallery w-full overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">{portfolioContent.projects.kicker}</p>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{portfolioContent.projects.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {portfolioContent.projects.description}
            </p>
          </div>
          <a href={portfolioContent.projects.moreLink} className="w-fit rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
            {portfolioContent.projects.moreLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="project-carousel" aria-roledescription="carousel" aria-label="Featured projects">
          <div key={activeIndex} className={`project-stage project-slide-${direction}`}>
            <button type="button" className="project-preview project-preview-left" onClick={showPrevious} aria-label={`View ${previousProject.title}`}>
              <img src={previousProject.image} alt="" loading="lazy" />
            </button>
            <TiltCard as="article" className="project-featured" aria-live="polite">
              <div className="project-featured-image">
                <img src={activeProject.image} alt={activeProject.title} />
              </div>
            </TiltCard>
            <button type="button" className="project-preview project-preview-right" onClick={showNext} aria-label={`View ${nextProject.title}`}>
              <img src={nextProject.image} alt="" loading="lazy" />
            </button>
          </div>

          <div className="project-controls">
            <div className="project-counter" aria-label={`Project ${activeIndex + 1} of ${projects.length}`}>
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="project-counter-line" />
              <span className="text-slate-500">{String(projects.length).padStart(2, '0')}</span>
            </div>
            <div className="project-arrows">
              <button type="button" onClick={showPrevious} aria-label="Previous project">←</button>
              <button type="button" onClick={showNext} aria-label="Next project">→</button>
            </div>
          </div>

          <div key={`details-${activeIndex}`} className={`project-details mx-auto mt-8 max-w-3xl text-center project-slide-${direction}`}>
            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{activeProject.title}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">{activeProject.description}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {activeProject.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{tag}</span>)}
            </div>
            <a href={activeProject.link} className="mt-5 inline-block text-sm font-medium text-white underline decoration-white/40 underline-offset-8 transition hover:text-purple-300">
              View Project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
