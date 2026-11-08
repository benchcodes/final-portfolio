import TiltCard from './TiltCard'
import { usePortfolioContent } from '../context/usePortfolioContent'

const skillIcons = {
  code: (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  database: (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

function Skills() {
  const portfolioContent = usePortfolioContent()
  return (
    <div className="atmosphere-section w-full bg-linear-to-b from-[#080808] to-black py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-white">{portfolioContent.skillsSection.title}</h2>
          <p className="text-lg text-slate-400">{portfolioContent.skillsSection.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioContent.skills.map((category) => (
            <TiltCard
              key={category.title}
              className="skill-card rounded-xl border border-white/10 bg-[#0b0b0b] p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                {skillIcons[category.icon]}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{category.title}</h3>
              <p className="mb-4 text-sm text-slate-400">{category.subtitle}</p>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-sm text-slate-300">
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
