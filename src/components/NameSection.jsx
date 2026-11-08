import { usePortfolioContent } from '../context/usePortfolioContent'

function NameSection() {
  const portfolioContent = usePortfolioContent()
  return (
    <div className="hero-copy mt-8 max-w-3xl px-6 text-center">
      <p className="hero-eyebrow mb-4"><span /> Hello, I&apos;m</p>
      <h1 className="hero-title text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {portfolioContent.name}
      </h1>
      <p className="hero-role mt-4 text-xl font-medium text-slate-300">{portfolioContent.role}</p>
      <p className="hero-intro mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
        {portfolioContent.intro}
      </p>
      <div className="hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="#projects"
          className="hero-button hero-button-primary rounded-lg px-6 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          View my projects <span aria-hidden="true">↗</span>
        </a>
        <a
          href="#contact"
          className="hero-button hero-button-secondary rounded-lg px-6 py-3 font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          Let&apos;s connect <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="hero-scroll-hint" aria-hidden="true"><span /> Scroll to explore</div>
    </div>
  )
}

export default NameSection
