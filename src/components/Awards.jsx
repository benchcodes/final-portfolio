import { useState } from 'react'
import portfolioContent from '../data/portfolioContent'

function Awards() {
  const [activeAward, setActiveAward] = useState(0)
  const { awards } = portfolioContent
  const award = awards.items[activeAward]

  return (
    <section id="awards" className="atmosphere-section awards-dashboard w-full overflow-hidden bg-[#080808] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">{awards.kicker}</p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{awards.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{awards.description}</p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="awards-photo-grid" aria-label="Award memories">
            {awards.photos.map((photo, index) => (
              <img key={`${photo}-${index}`} src={photo} alt={`Award memory ${index + 1}`} loading="lazy" decoding="async" />
            ))}
            <div className="awards-play" aria-hidden="true">▶</div>
          </div>

          <div className="space-y-3">
            {awards.items.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setActiveAward(index)}
                className={`award-item ${activeAward === index ? 'award-item-active' : ''}`}
                aria-pressed={activeAward === index}
              >
                <span className="award-icon" aria-hidden="true">{item.icon}</span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-semibold text-white">{item.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{item.category}</span>
                </span>
                <span className="text-slate-500" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-2xl border-l border-purple-400/50 pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Currently highlighted</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{award.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{award.detail}</p>
        </div>
      </div>
    </section>
  )
}

export default Awards
