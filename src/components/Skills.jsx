function Skills() {
  const skillCategories = [
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Frontend Development",
      subtitle: "React, TypeScript, Next.js, Tailwind CSS",
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Motion animations"]
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      title: "Backend Development",
      subtitle: "Node.js, Python, PostgreSQL",
      skills: ["Node.js & Express", "Python & Django", "PostgreSQL", "REST & GraphQL APIs"]
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "UI/UX Design",
      subtitle: "Figma, Adobe Photoshop, Framer, Canva",
      skills: ["Figma & Adobe Photoshop", "Framer", "Prototyping", "Design Systems"]
    },
  ];

  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-slate-600">
            A diverse skill set that allows me to tackle projects from concept to deployment
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {category.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-slate-500 mb-4">
                {category.subtitle}
              </p>

              {/* Skills List */}
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills