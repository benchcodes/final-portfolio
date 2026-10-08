function NameSection() {
  return (
    <div className="mt-8 max-w-2xl px-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
        Hello, I&apos;m
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Bench Matthew Culubong
      </h1>
      <p className="mt-3 text-xl font-medium text-slate-300">Software Developer</p>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
        I build responsive, user-focused web experiences with modern technologies
        and thoughtful interface design.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="#projects"
          className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
        >
          View my projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:border-purple-400 hover:text-white"
        >
          Let&apos;s connect
        </a>
      </div>
    </div>
  )
}

export default NameSection
