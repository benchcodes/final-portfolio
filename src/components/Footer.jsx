import portfolioContent from '../data/portfolioContent'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {portfolioContent.name}. All rights reserved.</p>
        <a
          href={`mailto:${portfolioContent.contact.email}`}
          className="transition hover:text-white"
        >
          {portfolioContent.contact.email}
        </a>
      </div>
    </footer>
  )
}

export default Footer
