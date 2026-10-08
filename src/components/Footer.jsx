function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Bench Matthew Culubong. All rights reserved.</p>
        <a
          href="mailto:culubongbenchmatthew@gmail.com"
          className="transition hover:text-white"
        >
          culubongbenchmatthew@gmail.com
        </a>
      </div>
    </footer>
  )
}

export default Footer
