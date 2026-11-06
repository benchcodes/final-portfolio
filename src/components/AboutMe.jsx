import portfolioContent from '../data/portfolioContent'

function AboutMe() {
  return (
    <div className="atmosphere-section w-full bg-black py-16">
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="mb-6 text-3xl font-bold text-white">{portfolioContent.about.title}</h2>
        {portfolioContent.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-lg leading-relaxed text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export default AboutMe
