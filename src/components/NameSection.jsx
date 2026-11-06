import portfolioContent from '../data/portfolioContent'

function NameSection() {
  return (
    <div className="mt-8 max-w-2xl px-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
        Hello, I&apos;m
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {portfolioContent.name}
      </h1>
      <p className="mt-3 text-xl font-medium text-slate-300">{portfolioContent.role}</p>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
        {portfolioContent.intro}
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="#projects"
          className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          View my projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:border-purple-400 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          Let&apos;s connect
        </a>
      </div>
    </div>
  )
}

export default NameSection
